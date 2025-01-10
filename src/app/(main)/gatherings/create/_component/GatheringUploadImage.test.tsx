import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultData, gatheringCreateSchema } from "@/schemas/gatheringCreate";
import { ImageUploadApi } from "@/api/imageFile";
import GatheringUploadImage from "./GatheringUploadImage";

const mockChange = jest.fn();

function ImageUploadComponent() {
  const form = useForm({
    resolver: zodResolver(gatheringCreateSchema(false)),
    defaultValues: getDefaultData(),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormFieldWrapper
          control={form.control}
          name="image"
          type="text"
          label="대표 이미지"
          renderContent={(field) => <GatheringUploadImage form={form} field={{ ...field, onChange: mockChange }} />}
        />
      </form>
    </Form>
  );
}

jest.mock("@/api/imageFile", () => ({
  ImageUploadApi: jest.fn(),
}));

describe("GatheringUploadImage 컴포넌트", () => {
  beforeEach(() => {
    render(<ImageUploadComponent />);
  });

  it("이미지 변경 버튼과 초기화 버튼이 랜더링되어 있어야한다.", () => {
    expect(screen.getByText("이미지 변경")).toBeInTheDocument();
    expect(screen.getByText("초기화")).toBeInTheDocument();
  });

  it("이미지 변경 버튼을 클릭하면 파일을 선택하고 업로드 api를 호출해야한다.", async () => {
    const file = new Blob(["test file"], { type: "image/png" });
    const fileList = { 0: file, length: 1 };
    const mockImageUrl = "https://example.com/testImage.png";
    (ImageUploadApi as jest.Mock).mockResolvedValue(mockImageUrl);

    fireEvent.click(screen.getByText("이미지 변경"));
    fireEvent.change(screen.getByTestId("file-input"), { target: { files: fileList } });

    await waitFor(() => {
      expect(ImageUploadApi).toHaveBeenCalledTimes(1);
      expect(mockChange).toHaveBeenCalledWith(mockImageUrl);
    });
  });

  it("초기화 버튼을 클릭하면 값이 null로 변경되어야한다.", () => {
    fireEvent.click(screen.getByText("초기화"));

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith(null);
  });
});
