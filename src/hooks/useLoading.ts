"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useLoading = (data: boolean) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let time: NodeJS.Timeout | number;

    const startLoading = () => {
      time = setTimeout(() => setLoading(true), 500);
    };

    const endLoading = () => {
      clearTimeout(time);
      setLoading(false);
    };

    if (!data) {
      endLoading();
    } else {
      startLoading();
    }

    return () => {
      endLoading();
    };
  }, [pathname, data]);

  return { loading };
};
