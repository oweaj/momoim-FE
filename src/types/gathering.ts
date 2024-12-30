export interface GatheringMember {
  gatheringMemberId: number;
  userId: number;
  email: string;
  name: string;
  profileImage: string;
  joinedAt: string;
}

export interface Gathering {
  gatheringId: number;
  image: string;
  name: string;
  status: string;
  category: string;
  subCategory: string;
  location: string;
  nextGatheringAt: string;
  tags: string[];
  capacity: number;
  participantCount: number;
  isWishlist: boolean;
  isPeriodic: boolean;
  members: GatheringMember[];
}

export interface GatheringResponse {
  success: boolean;
  data: Gathering[];
}

export interface GatheringParams {
  category?: string[];
  subCategory?: string[];
  location?: string;
  gatheringDate?: string;
  offset: number;
  limit: number;
  sortType: string;
  sortOrder: string;
}

export interface MoimListQueryParams {
  category: string;
  subCategory: string;
  location: string;
  gatheringDate?: Date | null;
  sortType: string;
  sortOrder: string;
}
