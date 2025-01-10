import { getDefaultData, gatheringCreateSchema } from "@/schemas/gatheringCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Form } from "@/components/ui/form";
import { ONLINE_PLATFORM } from "@/constants/options";
import FormOnlineAddress from "./FormOnlineAddress";

const mockChange = jest.fn();

function FormOnlineAddressComponent() {
  const form = useForm({
    resolver: zodResolver(gatheringCreateSchema(false)),
    defaultValues: getDefaultData(),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormFieldWrapper
          control={form.control}
          name="onlinePlatform"
          label="플랫폼"
          renderContent={(field) => <FormOnlineAddress form={form} field={{ ...field, onChange: mockChange }} />}
        />
      </form>
    </Form>
  );
}

describe("FormOnlineAddress 컴포넌트", () => {
  beforeEach(() => {
    render(<FormOnlineAddressComponent />);
  });

  it("온라인 플랫폼에 대한 select가 랜더링 되어야한다.", () => {
    const onlineSelcet = screen.getByRole("combobox");
    expect(onlineSelcet).toBeInTheDocument();
  });

  it("select 영역 클릭 시 온라인 플랫폼 요소들이 랜더링 되어야한다.", async () => {
    const onlineSelcet = screen.getByRole("combobox");
    fireEvent.click(onlineSelcet);

    expect(onlineSelcet).toHaveAttribute("aria-expanded", "true");

    const onlinePlatformSection = screen.getByTestId("onlinePlatform-section");
    ONLINE_PLATFORM.forEach(({ label }) => {
      expect(within(onlinePlatformSection).getByText(label)).toBeInTheDocument();
    });
  });

  it("온라인 플랫폼을 선택하면 onchange가 호출되어야 한다.", () => {
    const onlineSelect = screen.getByRole("combobox");
    fireEvent.click(onlineSelect);

    const selectPlatform = screen.getByRole("option", { name: ONLINE_PLATFORM[0].label });
    fireEvent.click(selectPlatform);

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith(ONLINE_PLATFORM[0].value);
  });
});
