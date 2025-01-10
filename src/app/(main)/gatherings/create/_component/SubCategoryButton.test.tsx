import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaultData, gatheringCreateSchema } from "@/schemas/gatheringCreate";
import { COMMON_CATEGORIES, SUB_CATEGORIES } from "@/constants/options";
import SubCategoryButton from "./SubCategoryButton";

const defaultCategory = COMMON_CATEGORIES[0]?.value;

function SubCategotyComponent({ multiple }: { multiple: boolean }) {
  const form = useForm({
    resolver: zodResolver(gatheringCreateSchema(false)),
    defaultValues: getDefaultData(),
  });

  return (
    <form onSubmit={form.handleSubmit(() => {})}>
      <SubCategoryButton form={form} category={defaultCategory} multiple={multiple} />
    </form>
  );
}

describe("SubCategoryButton 컴포넌트", () => {
  beforeEach(() => {
    render(<SubCategotyComponent multiple={false} />);
  });

  it("카테고리 초기값 '문화'에 맞는 서브 카테고리 요소의 기본값으로 랜더링 되어야한다.", () => {
    const defaultSubcategory = SUB_CATEGORIES[defaultCategory] || [];

    defaultSubcategory.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("클릭하면 서브 카테고리 값이 단일 선택된다.", () => {
    const movieButton = screen.getByText("영화");
    const concertButton = screen.getByText("콘서트");
    expect(movieButton).toBeInTheDocument();
    expect(concertButton).toBeInTheDocument();

    fireEvent.click(movieButton);
    expect(movieButton).toHaveClass("bg-gray-250 text-main");

    fireEvent.click(concertButton);
    expect(concertButton).toHaveClass("bg-gray-250 text-main");

    expect(movieButton).not.toHaveClass("bg-gray-250 text-main");
  });
});

it("props multiple 값이 true면 서브 카테고리 다중 선택이 가능하고 선택된 값을 다시 클릭하면 해제되어야한다.", () => {
  render(<SubCategotyComponent multiple />);

  const movieButton = screen.getByText("영화");
  const concertButton = screen.getByText("콘서트");
  expect(movieButton).toBeInTheDocument();
  expect(concertButton).toBeInTheDocument();

  fireEvent.click(movieButton);
  expect(movieButton).toHaveClass("bg-gray-250 text-main");

  fireEvent.click(concertButton);
  expect(concertButton).toHaveClass("bg-gray-250 text-main");

  fireEvent.click(movieButton);
  expect(movieButton).not.toHaveClass("bg-gray-250 text-main");
});
