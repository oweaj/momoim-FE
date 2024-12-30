import { Modal } from "@/components/common/modal/Modal";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const mockClick = jest.fn();

function TestModal() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      title="모임 신청"
      open={open}
      action={setOpen}
      content="해당 모임을 신청하시겠습니까?"
      triggerButton={<Button type="button">신청하기</Button>}
      onSubmit={mockClick}
    />
  );
}

describe("모달 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<TestModal />);
  });

  it("트리거 버튼이 랜더링 되고 버튼을 클릭하면 열리고 관련 요소가 나와야한다.", () => {
    const applyBtn = screen.getByRole("button", { name: "신청하기" });
    expect(applyBtn).toBeInTheDocument();
    fireEvent.click(applyBtn);

    expect(applyBtn).toHaveAttribute("data-state", "open");

    expect(screen.getByText("해당 모임을 신청하시겠습니까?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("submit 버튼을 클릭하면 해당 onSubmit이 호출되어야 한다.", () => {
    const applyBtn = screen.getByRole("button", { name: "신청하기" });
    expect(applyBtn).toBeInTheDocument();
    fireEvent.click(applyBtn);

    const clickBtn = screen.getByRole("button", { name: "확인" });
    expect(clickBtn).toBeInTheDocument();
    fireEvent.click(clickBtn);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it("X 아이콘 버튼을 클릭하면 모달이 닫혀야한다.", () => {
    const applyBtn = screen.getByRole("button", { name: "신청하기" });
    expect(applyBtn).toBeInTheDocument();
    fireEvent.click(applyBtn);

    const closeIcon = screen.getByRole("button", { name: "Close" });
    expect(closeIcon).toBeInTheDocument();
    fireEvent.click(closeIcon);

    expect(closeIcon).not.toBeInTheDocument();
    expect(applyBtn).toHaveAttribute("data-state", "closed");
  });

  it("취소 버튼 클릭하면 모달이 닫혀야한다.", () => {
    const applyBtn = screen.getByRole("button", { name: "신청하기" });
    expect(applyBtn).toBeInTheDocument();
    fireEvent.click(applyBtn);

    const cancleBtn = screen.getByRole("button", { name: "취소" });
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    fireEvent.click(cancleBtn);

    expect(cancleBtn).not.toBeInTheDocument();
    expect(applyBtn).toHaveAttribute("data-state", "closed");
  });
});
