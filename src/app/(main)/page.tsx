"use client";

import { Suspense } from "react";
import MoimPage from "./_component/MoimPage";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoimPage />
    </Suspense>
  );
}
