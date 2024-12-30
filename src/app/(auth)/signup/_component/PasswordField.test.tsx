import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FORM_LABELS } from "@/constants/formLabels";
import { PasswordField } from "./PasswordField";

function Wrapper({ name, label, placeholder }: { name: string; label: string; placeholder: string }) {
  const form = useForm();

  return (
    <Form {...form}>
      <PasswordField control={form.control} name={name} label={label} placeholder={placeholder} />
    </Form>
  );
}

describe("PasswordField", () => {
  const defaultProps = {
    name: "password",
    label: FORM_LABELS.password.label,
    placeholder: FORM_LABELS.password.placeholder,
  };

  it("비밀번호 토글 버튼을 클릭하면 input type이 변경된다", async () => {
    render(<Wrapper {...defaultProps} />);

    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    const toggleButton = screen.getByLabelText(`${defaultProps.label} 보기/숨기기 토글`);

    expect(input).toHaveAttribute("type", "password");
    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
  });
});
