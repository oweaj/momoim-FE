import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select } from "@/components/common/select/Select";
import { REGIONS } from "@/constants/options";

describe("select 컴포넌트", () => {
  let mockChange: jest.Mock;

  beforeEach(() => {
    mockChange = jest.fn();
    render(<Select data={REGIONS} placeholder="테스트 입니다" value="" onChange={mockChange} />);
  });

  it("placeholder가 랜더링 됩니다.", () => {
    expect(screen.getByText("테스트 입니다")).toBeInTheDocument();
  });

  it("select 클릭시 펼쳐지고 data에 맞는 요소들이 렌더링 되어야한다.", () => {
    const triggerBtn = screen.getByRole("combobox");
    fireEvent.click(triggerBtn);

    expect(triggerBtn).toHaveAttribute("aria-expanded", "true");

    REGIONS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("select를 클릭시 onChange가 호출되고 선택한 값으로 업데이트 됩니다.", () => {
    const triggerBtn = screen.getByRole("combobox");
    fireEvent.click(triggerBtn);
    expect(triggerBtn).toHaveAttribute("aria-expanded", "true");

    const selectOne = screen.getByText("서울");
    fireEvent.click(selectOne);
    expect(mockChange).toHaveBeenCalledWith("SEOUL");
    expect(triggerBtn).toHaveAttribute("aria-expanded", "false");

    expect(mockChange).toHaveBeenCalledTimes(1);
  });
});
