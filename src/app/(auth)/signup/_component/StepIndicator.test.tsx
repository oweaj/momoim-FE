import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { StepIndicator } from "./StepIndicator";

describe("StepIndicator 컴포넌트", () => {
  it("전달받은 steps 수 만큼 indicator가 렌더링된다", () => {
    const { container } = render(<StepIndicator steps={3} currentStep={1} />);
    const indicators = container.querySelectorAll(".rounded-full");
    expect(indicators).toHaveLength(3);
  });

  it("현재 단계에 해당하는 인디케이터에 활성화 클래스가 적용된다", () => {
    const { container } = render(<StepIndicator steps={3} currentStep={2} />);
    const indicators = container.querySelectorAll(".rounded-full");

    expect(indicators[1]).toHaveClass("bg-main");
    expect(indicators[0]).toHaveClass("bg-gray-300");
    expect(indicators[2]).toHaveClass("bg-gray-300");
  });
});
