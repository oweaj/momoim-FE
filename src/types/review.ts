export interface Review {
  title: string;
  comment: string;
  score: number;
  createdAt: string;
  reviewId: number;
}

export interface GatheringReview extends Review {
  writer: string;
  writerId: number;
  writerProfileImage: string;
}

export interface ReviewAverage {
  oneScoreCount: number;
  twoScoreCount: number;
  threeScoreCount: number;
  fourScoreCount: number;
  fiveScoreCount: number;
  averageScore: number;
}
