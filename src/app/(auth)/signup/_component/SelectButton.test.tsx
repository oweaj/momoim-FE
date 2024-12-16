import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SelectButton } from "./SelectButton";

describe("SelectButton 컴포넌트", () => {
  it("버튼이 렌더링된다", () => {
    render(<SelectButton>셀렉트 버튼 테스트</SelectButton>);
    expect(screen.getByText("셀렉트 버튼 테스트")).toBeInTheDocument();
  });

  it("selected 상태에 따라 스타일이 변경된다", () => {
    const { rerender } = render(<SelectButton>테스트</SelectButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-gray-100", "text-gray-900");

    rerender(<SelectButton selected>테스트</SelectButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-gray-250", "text-main");
  });

  it("클릭 시 onClick 핸들러가 호출된다", () => {
    const handleClick = jest.fn();
    render(<SelectButton onClick={handleClick}>테스트</SelectButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
