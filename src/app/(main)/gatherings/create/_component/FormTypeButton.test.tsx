import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormTypeButton from "./FormTypeButton";

describe("FormTypeButton 컴포넌트", () => {
  const mockChange = jest.fn();

  beforeEach(() => {
    render(<FormTypeButton activeValue buttonText="정기 모임" value="정기 모임" onChange={mockChange} />);
  });

  it("button 요소가 랜더링 되어야한다.", () => {
    const formTypeButton = screen.getByRole("button", { name: "정기 모임" });
    expect(formTypeButton).toBeInTheDocument();
  });

  it("버튼을 클릭하면 onChagne가 호출되고 값이 정확히 호출되어야 한다.", () => {
    const formTypeButton = screen.getByRole("button", { name: "정기 모임" });
    fireEvent.click(formTypeButton);
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith(true);
  });
});
