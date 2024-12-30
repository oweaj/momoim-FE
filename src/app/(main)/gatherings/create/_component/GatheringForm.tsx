"use client";

import { DateTimePicker } from "@/app/(main)/gatherings/create/_component/DateTimePicker";
import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldError, useForm } from "react-hook-form";
import { DEFAULT_GATHERING_CREATE_VALUES, gatheringCreateSchema } from "@/schemas/gatheringCreate";
import inputDataFormat from "@/lib/inputDataFormat";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreate } from "@/queries/gathering/useCreate";
import { CategoryKey, GatheringCreateFormData } from "@/types/category";
import { useRouter } from "next/navigation";
import Tiptab from "@/components/common/editor/Tiptab";
import { COMMON_CATEGORIES } from "@/constants/options";
import { Select } from "@/components/common/select/Select";
import FormOnlineAddress from "./FormOnlineAddress";
import FormTypeButton from "./FormTypeButton";
import GatheringUploadImage from "./GatheringUploadImage";
import AddressInput from "./AddressInput";
import SubCategoryButton from "./SubCategoryButton";

export default function GatheringForm() {
  const { mutate: gatheringCreate } = useCreate();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(gatheringCreateSchema),
    defaultValues: DEFAULT_GATHERING_CREATE_VALUES,
  });

  const onSubmit = (values: GatheringCreateFormData) => {
    const getAddress = form.getValues("address");
    const getDetailAddress = form.getValues("detailAddress");
    const fullAddress = getAddress ? `${getAddress} ${getDetailAddress}`.trim() : "";
    const updateAddressData = { ...values, address: fullAddress };

    const { gatheringType, detailAddress, onlinePlatform, ...submitFormData } = updateAddressData;
    gatheringCreate(submitFormData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
        <FormFieldWrapper
          control={form.control}
          name="name"
          label="모임 이름"
          placeholder="모임 이름을 입력해주세요."
          customStyle="border-gray-500 text-gray-700 font-medium"
        />
        <FormFieldWrapper
          control={form.control}
          name="image"
          type="text"
          label="대표 이미지"
          renderContent={(field) => <GatheringUploadImage form={form} field={field} />}
        />
        <div className="flex items-center max-xs:flex-col max-xs:items-baseline max-xs:gap-14">
          <div className="flex-1">
            <FormFieldWrapper
              control={form.control}
              name="isPeriodic"
              label="모임 주기"
              renderContent={(field) => (
                <div className="space-x-4">
                  <FormTypeButton
                    activeValue={false}
                    buttonText="단기 모임"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                  <FormTypeButton
                    activeValue
                    buttonText="정기 모임"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex-1">
            <FormFieldWrapper
              control={form.control}
              name="gatheringType"
              label="모임 유형"
              renderContent={(field) => (
                <div className="space-x-4">
                  <FormTypeButton
                    activeValue="OFFLINE"
                    buttonText="오프라인"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      form.setValue("location", "");
                      form.setValue("onlinePlatform", "");
                    }}
                  />
                  <FormTypeButton
                    activeValue="ONLINE"
                    buttonText="온라인"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      form.setValue("location", "ONLINE");
                      form.setValue("detailAddress", "");
                    }}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <FormFieldWrapper
          control={form.control}
          name="category"
          label="카테고리"
          renderContent={(field) => {
            const defaultCategory = COMMON_CATEGORIES[0]?.value;
            return (
              <>
                <div className="space-y-4">
                  <Select
                    data={COMMON_CATEGORIES}
                    size="w-full h-12 border-gray-500 text-gray-700 font-medium"
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  />
                  <SubCategoryButton form={form} category={(field.value as CategoryKey) || defaultCategory} />
                </div>
                {form.formState.errors.subCategory && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {(form.formState.errors.subCategory as FieldError).message}
                  </p>
                )}
              </>
            );
          }}
        />
        {form.watch("gatheringType") === "OFFLINE" ? (
          <FormFieldWrapper
            control={form.control}
            name="address"
            label="주소"
            placeholder="모임을 진행할 주소를 입력해주세요."
            customStyle="border-gray-500 text-gray-700 font-medium"
            renderContent={(field) => <AddressInput form={form} field={field} />}
          />
        ) : (
          <FormFieldWrapper
            control={form.control}
            name="onlinePlatform"
            label="플랫폼"
            renderContent={(field) => <FormOnlineAddress form={form} field={field} />}
          />
        )}
        <FormFieldWrapper
          control={form.control}
          name="nextGatheringAt"
          label="날짜"
          renderContent={(field) => (
            <div>
              <DateTimePicker field={field} />
            </div>
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="capacity"
          label="모집 정원"
          renderContent={(field) => (
            <Input
              type="number"
              className="inputCountButton border-gray-500 pl-4 text-gray-700"
              value={field.value}
              min={2}
              max={50}
              onChange={(e) => field.onChange(inputDataFormat(e.target.value))}
            />
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="description"
          label="모임 설명"
          renderContent={(field) => <Tiptab field={field} />}
        />
        <div className="flex items-center justify-center gap-2">
          <Button type="button" className="flex-1" size="lg" variant="outline" onClick={() => router.push("/")}>
            작성 취소
          </Button>
          <Button type="submit" className="flex-1" size="lg">
            모임 생성 완료
          </Button>
        </div>
      </form>
    </Form>
  );
}
