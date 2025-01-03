import { Category, Region } from "./auth";

export interface ProfileData {
  name: string;
  email: string;
  regions: Region[];
  profileImage: string | null;
  subCategory: string[];
  selectedCategory: Category[];
}
