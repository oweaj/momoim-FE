import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import { getDefaultData, gatheringCreateSchema } from "@/schemas/gatheringCreate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import AddressInput from "./AddressInput";

const mockChange = jest.fn();
const mockOnComplete = jest.fn();

let mockProps: any;
jest.mock("react-daum-postcode", () => {
  return jest.fn().mockImplementation((props) => {
    mockProps = props;
    return <div data-testid="daum-postcode" />;
  });
});

function AddressInputComponent() {
  const form = useForm({
    resolver: zodResolver(gatheringCreateSchema(false)),
    defaultValues: getDefaultData(),
  });

  form.setValue = mockOnComplete;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormFieldWrapper
          control={form.control}
          name="address"
          label="주소"
          placeholder="모임을 진행할 주소를 입력해주세요."
          customStyle="border-gray-500 text-gray-700 font-medium"
          renderContent={(field) => <AddressInput form={form} field={{ ...field, onChange: mockChange }} />}
        />
      </form>
    </Form>
  );
}

describe("AddressInput 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProps = null;
    render(<AddressInputComponent />);
  });

  it("input을 클릭하면 도로명 주소를 검색할 수 있는 모달이 open 되어야한다.", () => {
    const addressInput = screen.getByPlaceholderText("클릭을 통해 주소를 검색해주세요.");
    expect(addressInput).toBeInTheDocument();
    fireEvent.click(addressInput);

    expect(addressInput).toHaveAttribute("data-state", "open");

    const postcode = screen.getByTestId("daum-postcode");
    expect(postcode).toBeInTheDocument();
  });

  describe("도로명 주소 검색 후 선택 시 조건에 따른 location 값 설정", () => {
    beforeEach(() => {
      const addressInput = screen.getByPlaceholderText("클릭을 통해 주소를 검색해주세요.");
      fireEvent.click(addressInput);
    });

    it("sidoEnglish에 si가 포함된 경우 포멧팅해야 합니다.", () => {
      mockProps.onComplete({ address: "서울시 동대문구", sidoEnglish: "seoul-si" });

      expect(mockOnComplete).toHaveBeenCalledWith("location", "SEOUL");
      expect(mockChange).toHaveBeenCalledWith("서울시 동대문구");
    });

    it("sidoEnglish에 do가 포함된 경우 포멧팅해야 합니다.", () => {
      mockProps.onComplete({ address: "경기도 성남시", sidoEnglish: "gyeonggi-do" });

      expect(mockOnComplete).toHaveBeenCalledWith("location", "GYEONGGI");
      expect(mockChange).toHaveBeenCalledWith("경기도 성남시");
    });

    it("sidoEnglish의 포멧팅 조건에 걸리지 않으면 대문자로만 변환되어야 합니다.", () => {
      mockProps.onComplete({ address: "제주특별자치도 제주시", sidoEnglish: "jeju" });

      expect(mockOnComplete).toHaveBeenCalledWith("location", "JEJU");
      expect(mockChange).toHaveBeenCalledWith("제주특별자치도 제주시");
    });
  });

  it("상세주소를 입력하면 detailAddress 값이 업데이트 되어야합니다.", () => {
    const detailAddressInput = screen.getByPlaceholderText("상세주소를 입력해주세요.");
    expect(detailAddressInput).toBeInTheDocument();

    fireEvent.change(detailAddressInput, { target: { value: "중앙 공원" } });

    expect(mockOnComplete).toHaveBeenCalledWith("detailAddress", "중앙 공원");
  });

  it("모달이 닫힐 때 closeModal이 호출되어야 합니다.", () => {
    const addressInput = screen.getByPlaceholderText("클릭을 통해 주소를 검색해주세요.");
    fireEvent.click(addressInput);
    expect(addressInput).toHaveAttribute("data-state", "open");

    mockProps.onClose("COMPLETE_CLOSE");

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(addressInput).toHaveAttribute("data-state", "closed");
  });
});
