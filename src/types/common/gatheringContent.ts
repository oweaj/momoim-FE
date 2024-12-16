import { Members } from "./members";

export interface GatheringContent {
  gatheringId?: number; // 홈
  id?: number; // 디테일
  managerId?: number; // 디테일
  managerName?: string; // 디테일
  managerProfileImage?: string; // 디테일
  category: string;
  subCategory: string;
  name: string;
  gatheringType: string;
  status: string;
  image: string;
  description?: string; // 디테일
  address?: string; // 디테일
  tags: string[];
  location: string;
  capacity: number;
  participantCount: number;
  isWishList?: boolean; // 홈
  isPeriodic: boolean;
  nextGatheringAt: string;
  wishlistCount?: number; // 홈
  members?: Members[]; // 홈
}
