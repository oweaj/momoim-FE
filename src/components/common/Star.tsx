import EmptyStar from "@/assets/svg/empty-star.svg";
import HalfStar from "@/assets/svg/half-star.svg";
import Star from "@/assets/svg/star.svg";

interface Props {
  score: number;
}

export default function Stars({ score }: Props) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (score >= i) {
      stars.push(<Star key={i} />);
    } else if (score > i - 1 && score < i) {
      stars.push(<HalfStar key={i} />);
    } else {
      stars.push(<EmptyStar key={i} />);
    }
  }

  return <div className="flex">{stars}</div>;
}
