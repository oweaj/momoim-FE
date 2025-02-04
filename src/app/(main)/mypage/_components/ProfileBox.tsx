"use client";

import Image from "next/image";
import { Modal } from "@/components/common/modal/Modal";
import { Button } from "@/components/ui/button";
import thumbnail from "@/assets/images/thumbnail.png";
import { useState } from "react";
import { ProfileData } from "@/types/profile";
import { useUser } from "@/queries/auth/useUser";
import ProfileEdit from "./ProfileEdit";
import MyPageProfileBoxSkeleton from "./skeletons/MyPageProfileBoxSkeleton";

export default function ProfileBox() {
  const { data, isLoading, error } = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const sortedData: ProfileData = {
    name: data?.name || "",
    email: data?.email || "",
    regions: (data?.regions?.every((region) =>
      [
        "ALL",
        "SEOUL",
        "BUSAN",
        "DAEGU",
        "INCHEON",
        "GWANGJU",
        "DAEJEON",
        "ULSAN",
        "SEJONG",
        "GYEONGGI",
        "GANGWON",
        "CHUNGCHEONGBUK",
        "CHUNGCHEONGNAM",
        "JEONBUK",
        "JEOLLANAM",
        "GYEONGSANGBUK",
        "GYEONGNAM",
        "JEJU",
      ].includes(region),
    )
      ? data?.regions
      : ["ALL"]) as (
      | "ALL"
      | "SEOUL"
      | "BUSAN"
      | "DAEGU"
      | "INCHEON"
      | "GWANGJU"
      | "DAEJEON"
      | "ULSAN"
      | "SEJONG"
      | "GYEONGGI"
      | "GANGWON"
      | "CHUNGCHEONGBUK"
      | "CHUNGCHEONGNAM"
      | "JEONBUK"
      | "JEOLLANAM"
      | "GYEONGSANGBUK"
      | "GYEONGNAM"
      | "JEJU"
    )[],
    profileImage: (data?.profileImage !== "DEFAULT_PROFILE_IMAGE" ? data?.profileImage : null) || "",
    subCategory: (data?.interestCategories && data?.interestCategories[0].length > 1 && data?.interestCategories) || [],
    selectedCategory: ["CULTURE"],
  };

  if (!data || isLoading) return <MyPageProfileBoxSkeleton />;
  if (error) return <div>다시 로그인 해주세요</div>;

  return (
    <div className="my-6 w-full rounded-[20px] border-2 border-solid border-[#F0F1F6] p-8">
      <div>
        <div className="text-lg font-black">내 프로필</div>
        <div className="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between">
          <div className="my-6 flex w-full items-center">
            <div className="relative flex aspect-square w-[40%] max-w-32 items-center justify-center overflow-hidden rounded-xl border-2 border-solid border-gray-200 bg-gray-100 sm:w-32">
              <Image
                alt="thumbnail"
                src={
                  data?.profileImage && data?.profileImage !== "DEFAULT_PROFILE_IMAGE"
                    ? data?.profileImage
                    : thumbnail.src
                }
                fill
                sizes="100%"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center p-6">
              <div className="font-bold">{data?.name}</div>
              <div>{data?.email}</div>
            </div>
          </div>
          <Modal
            title="프로필 수정"
            content={<ProfileEdit data={sortedData} openSwitch={setModalOpen} />}
            size="h-[95%] md:max-w-5xl max-w-none w-full p-8 sm:p-14"
            showFooter={false}
            open={modalOpen}
            action={setModalOpen}
            triggerButton={
              <Button
                variant="outline"
                className="w-full rounded-lg border border-solid border-black px-[16px] py-[12px] font-bold sm:w-auto"
              >
                프로필 수정
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
