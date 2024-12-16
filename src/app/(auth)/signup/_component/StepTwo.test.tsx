import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "@/types/auth";
import { Form } from "@/components/ui/form";
import { REGIONS, CATEGORIES } from "@/constants/options";
import { StepTwo } from "./StepTwo";

function StepTwoWrapper() {
  const form = useForm<SignUpFormData>({
    defaultValues: {
      name: "테스트",
      email: "",
      password: "",
      passwordConfirm: "",
      regions: ["ALL"],
      interestCategories: ["ALL"],
    },
  });

  return (
    <Form {...form}>
      <StepTwo form={form} />
    </Form>
  );
}

beforeEach(() => {
  render(<StepTwoWrapper />);
});

describe("StepTwo 컴포넌트", () => {
  describe("UI 렌더링", () => {
    it("사용자 이름이 표시된다", () => {
      expect(screen.getByText("테스트 님의 관심 카테고리")).toBeInTheDocument();
    });

    it("활동할 지역과 카테고리 필드가 표시된다", () => {
      expect(screen.getByText("활동할 지역")).toBeInTheDocument();
      expect(screen.getByText("관심 카테고리")).toBeInTheDocument();

      const regionSection = screen.getByTestId("regions-section");
      REGIONS.forEach(({ label }) => {
        const button = within(regionSection).getByRole("button", { name: label });
        expect(button).toBeInTheDocument();
      });

      const interestCategoriesSection = screen.getByTestId("interestCategories-section");
      CATEGORIES.forEach(({ label }) => {
        const button = within(interestCategoriesSection).getByRole("button", { name: label });
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("버튼 선택 동작", () => {
    describe("지역 선택", () => {
      it("특정 지역 선택 시 '전체' 선택이 해제된다", async () => {
        const regionSection = screen.getByTestId("regions-section");
        const seoulButton = within(regionSection).getByRole("button", { name: "서울" });
        await userEvent.click(seoulButton);

        const allButton = within(regionSection).getByRole("button", { name: "전체" });
        expect(allButton).not.toHaveClass("bg-gray-250");
        expect(seoulButton).toHaveClass("bg-gray-250");
      });

      it("'전체' 선택 시 다른 모든 지역 선택이 해제된다", async () => {
        const regionSection = screen.getByTestId("regions-section");
        const seoulButton = within(regionSection).getByRole("button", { name: "서울" });
        const busanButton = within(regionSection).getByRole("button", { name: "부산" });

        await userEvent.click(seoulButton);
        await userEvent.click(busanButton);

        const allButton = within(regionSection).getByRole("button", { name: "전체" });
        await userEvent.click(allButton);

        expect(allButton).toHaveClass("bg-gray-250");
        expect(seoulButton).not.toHaveClass("bg-gray-250");
        expect(busanButton).not.toHaveClass("bg-gray-250");
      });

      it("선택된 지역을 모두 해제하면 자동으로 '전체'가 선택된다", async () => {
        const regionSection = screen.getByTestId("regions-section");
        const seoulButton = within(regionSection).getByRole("button", { name: "서울" });
        await userEvent.click(seoulButton);
        await userEvent.click(seoulButton);

        const allButton = within(regionSection).getByRole("button", { name: "전체" });
        expect(allButton).toHaveClass("bg-gray-250");
      });
    });
  });
});
