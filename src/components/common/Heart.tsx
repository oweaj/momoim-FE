"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  likeTask: () => void;
  isWishList: boolean;
}

export default function Heart({ likeTask, isWishList }: Props) {
  const [isLiked, setIsLiked] = useState(isWishList);
  return (
    <motion.div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsLiked((prev) => !prev);
        likeTask();
      }}
      initial={false}
      animate={{
        scale: isLiked ? 1.2 : 1,
        rotate: isLiked ? 360 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      }}
    >
      <motion.svg
        strokeWidth="2px"
        initial={{ stroke: "#636267", fill: "transparent" }}
        animate={{ stroke: isLiked ? "transparent" : "#636267", fill: isLiked ? "#FF0000" : "transparent" }}
        width="19"
        height="14"
        viewBox="0 -1 19 18"
      >
        <path
          clipRule="evenodd"
          d="M10.478 1.21961C10.416 1.27732 10.355 1.33708 10.2954 1.39889L9.33713 2.39392L8.37889 1.39889C8.31914 1.33715 8.25816 1.27746 8.19604 1.21982C6.38185 -0.4636 3.59323 -0.403911 1.85265 1.39889C0.0478147 3.26341 0.0478147 6.28572 1.85265 8.1549L2.81089 9.14993L8.74867 15.2968C9.07032 15.6297 9.60394 15.6297 9.92559 15.2968L15.8634 9.14993L16.8216 8.1549C18.6218 6.29037 18.6218 3.26341 16.8216 1.39889C15.0811 -0.403836 12.2883 -0.463595 10.478 1.21961ZM9.92559 14.1599L9.92482 14.1591L9.92559 14.1599Z"
        />
      </motion.svg>
    </motion.div>
  );
}