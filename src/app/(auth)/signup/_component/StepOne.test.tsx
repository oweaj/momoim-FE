import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormData } from "@/types/auth";
import { DEFAULT_SIGNUP_VALUES, signUpSchema } from "@/schemas/auth";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FORM_LABELS } from "@/constants/formLabels";
import { VALIDATION_ERRORS } from "@/constants/messages";
import { StepOne } from "./StepOne";

function StepOneWrapper() {
  const form = useForm<SignUpFormData>({
    defaultValues: DEFAULT_SIGNUP_VALUES,
    resolver: zodResolver(signUpSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <StepOne form={form} />
        <Button type="submit">다음으로</Button>
      </form>
    </Form>
  );
}

beforeEach(() => {
  render(<StepOneWrapper />);
});

describe("StepOne 컴포넌트", () => {
  describe("UI 렌더링", () => {
    it("닉네임, 이메일, 비밀번호 입력 필드가 화면에 나타난다", () => {
      const fields = [
        { label: FORM_LABELS.name.label, placeholder: FORM_LABELS.name.placeholder },
        { label: FORM_LABELS.email.label, placeholder: FORM_LABELS.email.placeholder },
        { label: FORM_LABELS.password.label, placeholder: FORM_LABELS.password.placeholder },
        { label: FORM_LABELS.passwordConfirm.label, placeholder: FORM_LABELS.passwordConfirm.placeholder },
      ];

      fields.forEach(({ label, placeholder }) => {
        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
      });
    });

    it("로그인 링크가 존재하고 올바른 href를 가진다", () => {
      const loginLink = screen.getByRole("link", { name: "로그인" });
      expect(loginLink).toHaveAttribute("href", "/login");
    });
  });

  describe("비밀번호 토글 기능", () => {
    const passwordFields = [
      {
        toggleName: "비밀번호 보기/숨기기 토글",
        placeholder: FORM_LABELS.password.placeholder,
      },
      {
        toggleName: "비밀번호 확인 보기/숨기기 토글",
        placeholder: FORM_LABELS.passwordConfirm.placeholder,
      },
    ];

    passwordFields.forEach(({ toggleName, placeholder }) => {
      it(`${toggleName} 버튼이 정상적으로 작동한다`, async () => {
        const input = screen.getByPlaceholderText(placeholder) as HTMLInputElement;
        const toggleButton = screen.getByRole("button", {
          name: toggleName,
        });

        expect(input.type).toBe("password");
        expect(toggleButton).toBeInTheDocument();

        await userEvent.click(toggleButton);
        expect(input.type).toBe("text");

        await userEvent.click(toggleButton);
        expect(input.type).toBe("password");
      });
    });
  });

  describe("유효성 검사", () => {
    const errorTestCases = [
      {
        description: "닉네임이 2자 미만이면 에러 메시지가 표시된다",
        placeholder: FORM_LABELS.name.placeholder,
        errorMessage: VALIDATION_ERRORS.name.min,
        invalidValue: "김",
      },
      {
        description: "닉네임이 10자 초과이면 에러 메시지가 표시된다",
        placeholder: FORM_LABELS.name.placeholder,
        errorMessage: VALIDATION_ERRORS.name.max,
        invalidValue: "매우긴닉네임테스트중입니다",
      },
      {
        description: "이메일 형식이 올바르지 않으면 에러 메시지가 표시된다",
        placeholder: FORM_LABELS.email.placeholder,
        errorMessage: VALIDATION_ERRORS.email.invalid,
        invalidValue: "invalid-email",
      },
      {
        description: "비밀번호 형식이 올바르지 않으면 에러 메시지가 표시된다",
        placeholder: FORM_LABELS.password.placeholder,
        errorMessage: VALIDATION_ERRORS.password.requirements,
        invalidValue: "error!",
      },
    ];

    errorTestCases.forEach(({ description, placeholder, invalidValue, errorMessage }) => {
      it(description, async () => {
        const input = screen.getByPlaceholderText(placeholder);
        const submitButton = screen.getByRole("button", { name: "다음으로" });

        await userEvent.type(input, invalidValue);
        await userEvent.click(submitButton);

        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
      });
    });

    it("비밀번호가 일치하지 않으면 에러 메시지가 표시된다", async () => {
      const passwordInput = screen.getByPlaceholderText(FORM_LABELS.password.placeholder);
      const confirmInput = screen.getByPlaceholderText(FORM_LABELS.passwordConfirm.placeholder);
      const submitButton = screen.getByRole("button", { name: "다음으로" });

      await userEvent.type(passwordInput, "Valid123!");
      await userEvent.type(confirmInput, "Wrong123!");
      await userEvent.click(submitButton);

      expect(await screen.findByText(VALIDATION_ERRORS.password.notMatch)).toBeInTheDocument();
    });

    it("올바른 값을 입력하면 에러 메시지가 표시되지 않는다", async () => {
      await userEvent.type(screen.getByPlaceholderText(FORM_LABELS.name.placeholder), "테스트");
      await userEvent.type(screen.getByPlaceholderText(FORM_LABELS.email.placeholder), "test@example.com");
      await userEvent.type(screen.getByPlaceholderText(FORM_LABELS.password.placeholder), "Valid123!");
      await userEvent.type(screen.getByPlaceholderText(FORM_LABELS.passwordConfirm.placeholder), "Valid123!");

      await userEvent.click(screen.getByRole("button", { name: "다음으로" }));

      const errorMessages = [
        VALIDATION_ERRORS.name.min,
        VALIDATION_ERRORS.name.max,
        VALIDATION_ERRORS.email.invalid,
        VALIDATION_ERRORS.password.notMatch,
        VALIDATION_ERRORS.password.requirements,
      ];

      errorMessages.forEach((message) => {
        expect(screen.queryByText(message)).not.toBeInTheDocument();
      });
    });
  });
});