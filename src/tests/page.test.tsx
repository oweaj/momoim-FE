import Page from "@/app/(main)/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("jest test code", () => {
  it("home", () => {
    render(<Page />);
    expect(screen.getByText("momoim")).toBeInTheDocument();
  });
});
