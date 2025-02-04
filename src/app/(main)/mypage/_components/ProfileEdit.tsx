"use client";

import thumbnail from "@/assets/images/thumbnail.png";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useEditUser } from "@/queries/auth/useEditUser";
import { DEFAULT_PROFILE_EDIT_VALUES, profileEditSchema } from "@/schemas/profileEdit";
import { ProfileData } from "@/types/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Select } from "@/components/common/select/Select";
import { COMMON_CATEGORIES } from "@/constants/options";
import { CategoryKey } from "@/types/category";
import { ImageUploadApi } from "@/api/file/imageFile";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import SubCategoryButton from "../../gatherings/create/_component/SubCategoryButton";
import RegionButtons from "./RegionButtons";

interface Props {
  data: ProfileData;
  openSwitch: (boolean: boolean) => void;
}

interface Field {
  value: string;
  onChange: (value: string | null) => void;
}

export default function ProfileEdit({ data, openSwitch }: Props) {
  const [filename, setFilename] = useState("파일을 선택해주세요.");
  const [currentProfileImage, setCurrentProfileImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const profileForm = useForm({
    resolver: zodResolver(profileEditSchema),
    defaultValues: DEFAULT_PROFILE_EDIT_VALUES,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: Field) => {
    if (e.target.files) {
      const { files } = e.target;
      setFilename(files[0].name);
      const selectFile = files ? files[0] : null;
      if (selectFile) {
        try {
          const uploadImage = await ImageUploadApi("profile", selectFile);
          field.onChange(uploadImage);
          setCurrentProfileImage(uploadImage);
        } catch (error) {
          console.error("Image upload failed", error);
        }
      }
    }
  };

  const handleFileDelete = () => {
    setFilename("파일을 선택해주세요.");
    setCurrentProfileImage("");
    profileForm.setValue("profileImage", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const { mutate: edit } = useEditUser();

  const onSubmit = (values: ProfileData) => {
    edit({
      email: values.email,
      name: values.name,
      profileImage: (values.profileImage as string) || "DEFAULT_PROFILE_IMAGE",
      interestCategories: values.subCategory,
      regions: values.regions,
    });
    openSwitch(false);
  };

  useEffect(() => {
    setCurrentProfileImage(data.profileImage as string);
    profileForm.setValue("profileImage", (data.profileImage as string) || null);
    profileForm.setValue("subCategory", data.subCategory);
    profileForm.setValue("name", data.name);
    profileForm.setValue("email", data.email);
    profileForm.setValue("regions", data.regions);
  }, []);

  return (
    <>
      <input className="h-0 w-0" />
      <Form {...profileForm}>
        <form onSubmit={profileForm.handleSubmit(onSubmit)}>
          <div className="flex h-full w-full flex-col">
            <div className="flex flex-col items-center gap-8 p-6 sm:flex-row">
              <div className="relative flex aspect-square w-52 items-center justify-start">
                <div className="relative h-full w-full">
                  <Image
                    alt="thumbnail"
                    fill
                    sizes="100%"
                    className="rounded-[20px] border-2 border-solid border-gray-200 object-cover"
                    src={currentProfileImage || thumbnail.src}
                  />
                  {currentProfileImage && (
                    <Button
                      type="button"
                      className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white"
                      onClick={handleFileDelete}
                    >
                      <X />
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-1 flex-col gap-6 sm:w-auto">
                <div className="w-full">
                  <div className="w-full">
                    <div className="flex w-full items-end justify-between">
                      <FormFieldWrapper
                        control={profileForm.control}
                        name="dummy"
                        label="프로필 이미지"
                        placeholder=""
                        formItemCustomStyle="w-full"
                        customStyle="w-full"
                        renderContent={(field) => (
                          <Input
                            {...field}
                            value={filename}
                            placeholder="파일을 선택해주세요."
                            readOnly
                            className="border-r-1 pointer-events-none h-12 w-full flex-grow rounded-l-md rounded-r-none border-y-2 border-l-2 bg-transparent px-3 text-sm text-muted-foreground placeholder:text-sm focus-visible:outline-none focus-visible:ring-0"
                          />
                        )}
                      />
                      <FormFieldWrapper
                        control={profileForm.control}
                        name="profileImage"
                        label=""
                        type="text"
                        placeholder=""
                        renderContent={(field) => (
                          <Label
                            htmlFor="file"
                            className="inline-block flex h-12 min-w-32 cursor-pointer items-center justify-center rounded-r-md border-y-2 border-l border-r-2 border-gray-300 focus-visible:outline-none focus-visible:ring-0"
                          >
                            파일 선택
                            <Input
                              ref={fileInputRef}
                              onChange={(e) => {
                                handleFileUpload(e, field);
                              }}
                              type="file"
                              id="file"
                              className="absolute hidden h-0 w-0 overflow-hidden border-0 p-0"
                            />
                          </Label>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <FormFieldWrapper
                      control={profileForm.control}
                      name="name"
                      label="닉네임"
                      placeholder="닉네임을 선택해주세요."
                      customStyle="h-12 w-full rounded-md border-2 bg-transparent px-3 text-sm text-muted-foreground placeholder:text-sm focus-visible:outline-none focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-12 p-6">
              <div>
                <div className="space-y-4">
                  <FormFieldWrapper
                    control={profileForm.control}
                    name="selectedCategory"
                    label="내 관심 카테고리"
                    placeholder=""
                    customStyle="border-2 focus-visible:outline-none focus-visible:ring-0"
                    renderContent={(field) => (
                      <Select
                        data={COMMON_CATEGORIES}
                        size="w-full h-12 border-gray-500 text-gray-700 font-medium"
                        value={field.value[0]}
                        onChange={(value) => field.onChange([value])}
                      />
                    )}
                  />
                  <FormFieldWrapper
                    control={profileForm.control}
                    name="subCategory"
                    label=""
                    placeholder=""
                    customStyle="border-2 focus-visible:outline-none focus-visible:ring-0"
                    renderContent={() => {
                      const defaultCategory = COMMON_CATEGORIES[0]?.value;
                      return (
                        <SubCategoryButton
                          multiple
                          form={profileForm}
                          category={(profileForm.watch().selectedCategory[0] as CategoryKey) || defaultCategory}
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="py-4">
                <FormFieldWrapper
                  control={profileForm.control}
                  name="regions"
                  label="활동 지역"
                  placeholder=""
                  renderContent={() => <RegionButtons multiple form={profileForm} />}
                />
              </div>
              <Button type="submit">변경 내용 저장</Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
