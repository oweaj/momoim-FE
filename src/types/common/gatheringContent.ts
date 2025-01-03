import { Members } from "./members";

export interface GatheringContent extends DetailContent {
  gatheringId?: number;
  isWishlist?: boolean;
  members?: Members[];
}

interface DetailContent {
  address?: string;
  location: string;
  capacity: number;
  image: string;
  description?: string;
  id?: number;
  tags?: string[];
  participantCount: number;
  managerId?: number;
  managerName?: string;
  managerProfileImage?: string;
  category: string;
  subCategory: string;
  name: string;
  isPeriodic: boolean;
  nextGatheringAt: string;
  wishlistCount?: number;
  status: string;
}

export interface GatheringDetail {
  gatheringContent: DetailContent;
  isJoined: boolean;
  isManager: boolean;
  members: Members[];
  isWishlist: boolean;
}
