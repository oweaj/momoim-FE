"use client";

import { Suspense } from "react";
import MoimPage from "../_component/MoimPage";

export default function CategoryPage({ params }: { params: { category: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoimPage initialCategory={params.category.toUpperCase()} />
    </Suspense>
  );
}
