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

  it("select를 클릭하면 펼쳐지고 data에 맞는 요소들이 렌더링 되어야한다.", () => {
    const triggerBtn = screen.getByRole("combobox");
    fireEvent.click(triggerBtn);
    expect(triggerBtn).toHaveAttribute("data-state", "open");

    expect(screen.getByText("전체")).toBeInTheDocument();
    expect(screen.getByText("서울")).toBeInTheDocument();
    expect(screen.getByText("경기")).toBeInTheDocument();
  });

  it("아이템을 클릭하면 해당 아이템이 value가 되고 또 새로운 아이템을 클릭하면 해당 아이템이 value가 되어야한다.", () => {
    const triggerBtn = screen.getByRole("combobox");
    fireEvent.click(triggerBtn);
    expect(triggerBtn).toHaveAttribute("data-state", "open");

    const selectOne = screen.getByText("서울");
    fireEvent.click(selectOne);
    expect(mockChange).toHaveBeenCalledWith("SEOUL");

    const tryTriggerBtn = screen.getByRole("combobox");
    fireEvent.click(tryTriggerBtn);

    const selectTwo = screen.getByText("경기");
    fireEvent.click(selectTwo);
    expect(mockChange).toHaveBeenCalledWith("GYEONGGI");
  });

  it("props placeholder가 있다면 select에 표시되어야한다.", () => {
    const triggerBtn = screen.getByRole("combobox");
    expect(triggerBtn).toBeInTheDocument();
    expect(screen.getByText("테스트 입니다")).toBeInTheDocument();
  });
});

describe("props값 firstItem에 따른 select 렌더링", () => {
  it.each([{ firstItem: true }, { firstItem: false }])(
    "firstItem이 true면 select 리스트 첫 아이템은 제외되고 나머지 요소들이 렌더링 되어야한다.",
    ({ firstItem }) => {
      const mockChange = jest.fn();
      render(<Select data={REGIONS} firstItem={firstItem} value="" onChange={mockChange} />);

      const categoryBtn = screen.getByRole("combobox");
      fireEvent.click(categoryBtn);
      expect(categoryBtn).toHaveAttribute("data-state", "open");

      if (firstItem) {
        expect(screen.queryByText("전체")).not.toBeInTheDocument();
      } else {
        expect(screen.queryByText("전체")).toBeInTheDocument();
      }
      expect(screen.getByText("서울")).toBeInTheDocument();
      expect(screen.getByText("경기")).toBeInTheDocument();
    },
  );
});
