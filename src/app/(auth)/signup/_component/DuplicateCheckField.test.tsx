import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DuplicateCheckType, SignUpFormData } from "@/types/auth";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import { DEFAULT_SIGNUP_VALUES, signUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORM_LABELS } from "@/constants/formLabels";
import { DuplicateCheckField } from "./DuplicateCheckField";

function Wrapper(props: Omit<React.ComponentProps<typeof DuplicateCheckField>, "control">) {
  const form = useForm<SignUpFormData>({
    defaultValues: DEFAULT_SIGNUP_VALUES,
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Form {...form}>
      <DuplicateCheckField control={form.control} {...props} />
    </Form>
  );
}

describe("DuplicateCheckField", () => {
  const defaultProps = {
    type: "name" as DuplicateCheckType,
    result: null,
    onCheck: jest.fn(),
    isDisabled: false,
    label: FORM_LABELS.name.label,
    placeholder: FORM_LABELS.name.placeholder,
    duplicateMessage: null,
  };

  it("중복 확인 버튼이 비활성화되면 클릭할 수 없다", () => {
    render(<Wrapper {...defaultProps} isDisabled />);
    const button = screen.getByRole("button", { name: "중복 확인" });
    expect(button).toBeDisabled();
  });

  it("사용 가능한 닉네임 결과 메시지가 표시된다", () => {
    const result = { isAvailable: true, message: "사용 가능한 닉네임입니다" };
    render(<Wrapper {...defaultProps} result={result} />);
    expect(screen.getByText(result.message)).toBeInTheDocument();
  });

  it("닉네임 중복확인이 실패하면 사용불가 메시지를 표시한다", () => {
    render(<Wrapper {...defaultProps} result={{ isAvailable: false, message: "이미 사용중인 닉네임입니다" }} />);
    expect(screen.getByText("이미 사용중인 닉네임입니다")).toBeInTheDocument();
  });

  it("입력 필드에서 공백 입력이 방지된다", async () => {
    render(<Wrapper {...defaultProps} />);
    const input = screen.getByPlaceholderText(defaultProps.placeholder);

    // mockPreventDefault 설정
    const mockPreventDefault = jest.fn();
    input.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        mockPreventDefault();
        event.preventDefault();
      }
    });

    await userEvent.type(input, " ");
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  });

  it("입력 필드에서 공백 외의 키 입력 시 preventDefault가 호출되지 않는다", async () => {
    render(<Wrapper {...defaultProps} />);
    const input = screen.getByPlaceholderText(defaultProps.placeholder);

    const mockPreventDefault = jest.fn();
    input.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        mockPreventDefault();
        event.preventDefault();
      }
    });

    await userEvent.type(input, "A");

    expect(mockPreventDefault).not.toHaveBeenCalled();
  });
});
