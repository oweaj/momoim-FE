"use client";

import { ImageUploadApi } from "@/api/imageFile";
import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { FormFieldProps } from "@/types/common/formFieldprops";
import { Button } from "@/components/ui/button";
import DefaultThumbnail from "@/assets/images/thumbnail.png";

export default function GatheringUploadImage({ form, field }: FormFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imageValue = form.watch("image");

  const handleGetImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectFile = files ? files[0] : null;

    if (selectFile) {
      const uploadImage = await ImageUploadApi("thumbnail", selectFile);
      field.onChange(uploadImage);
    }
  };

  const handleImageReset = () => {
    field.onChange(null);
  };

  return (
    <div className="flex items-end gap-4 transition-all max-sm:flex-col max-sm:items-baseline">
      <div className="flex h-56 w-3/4 items-end rounded-xl border border-gray-500 transition-all max-sm:h-64 max-sm:w-full">
        <Image
          src={imageValue || DefaultThumbnail}
          className="h-full w-full rounded-xl object-cover"
          width={500}
          height={500}
          alt="모임 생성 이미지"
          priority={!imageValue}
        />
      </div>
      <div className="flex w-full gap-2">
        <div className="relative w-1/2">
          <input type="file" ref={inputRef} onChange={handleGetImage} hidden data-testid="file-input" />
          <Button
            type="button"
            size="lg"
            className="absolute left-0 top-0 w-full"
            onClick={() => inputRef.current?.click()}
          >
            이미지 변경
          </Button>
        </div>
        <Button type="button" size="lg" variant="outline" className="flex-1" onClick={handleImageReset}>
          초기화
        </Button>
      </div>
    </div>
  );
}
