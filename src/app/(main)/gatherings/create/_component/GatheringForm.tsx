"use client";

import { FormFieldWrapper } from "@/components/common/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldError, useForm } from "react-hook-form";
import { getDefaultData, gatheringCreateSchema } from "@/schemas/gatheringCreate";
import inputDataFormat from "@/lib/inputDataFormat";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryKey, GatheringCreateFormData } from "@/types/category";
import { useRouter } from "next/navigation";
import Tiptab from "@/components/common/editor/Tiptab";
import { COMMON_CATEGORIES } from "@/constants/options";
import { Select } from "@/components/common/select/Select";
import { useGatheringCreate } from "@/queries/gatherings-workspace/useGatheringCreate";
import { DatePicker } from "@/components/common/DatePicker";
import { useGatheringPatch } from "@/queries/gatherings-workspace/useGatheringPatch";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/modal/Modal";
import FormOnlineAddress from "./FormOnlineAddress";
import FormTypeButton from "./FormTypeButton";
import GatheringUploadImage from "./GatheringUploadImage";
import AddressInput from "./AddressInput";
import SubCategoryButton from "./SubCategoryButton";

interface GatheringFormProps {
  mode?: boolean;
  id?: number;
  defaultData?: Partial<GatheringCreateFormData>;
}

export default function GatheringForm({ mode = false, id, defaultData }: GatheringFormProps) {
  const router = useRouter();
  const { mutate: gatheringCreate } = useGatheringCreate();
  const { mutate: gatheringPatch } = useGatheringPatch();
  const [open, setOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const defaultFormData = () => {
    return id && mode ? getDefaultData(defaultData) : getDefaultData();
  };

  useEffect(() => window.scrollTo(0, 0), []);

  const form = useForm({
    resolver: zodResolver(gatheringCreateSchema(mode)),
    defaultValues: defaultFormData(),
    shouldFocusError: false, // zod 유효성 기본 스크롤 방지
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const onSubmit = (values: GatheringCreateFormData) => {
    const getAddress = form.getValues("address");
    const getDetailAddress = form.getValues("detailAddress");
    const fullAddress = getAddress ? `${getAddress} ${getDetailAddress}`.trim() : "";
    const updateAddressData = { ...values, address: fullAddress };
    const { gatheringType, detailAddress, onlinePlatform, ...submitFormData } = updateAddressData;

    if (id && mode) {
      const updateEditFormData = {
        ...submitFormData,
        status: defaultData?.status,
      };
      gatheringPatch({ formData: updateEditFormData, id });
    } else {
      gatheringCreate(submitFormData);
    }
  };

  const onError = (errors: any) => {
    const errorFields = Object.keys(errors);
    // 에러필드 순서정렬
    let sortErrorFields = [...errorFields.filter((field) => field !== "description"), "description"];
    if (errors.onlinePlatform) {
      sortErrorFields = sortErrorFields.filter((field) => field !== "address");
      const onlinePlatformIndex = sortErrorFields.indexOf("onlinePlatform");
      sortErrorFields.splice(onlinePlatformIndex, 1);
      sortErrorFields.unshift("onlinePlatform");
    }
    if (sortErrorFields.length > 0) {
      const firstErrorField = sortErrorFields[0];
      const element =
        document.querySelector(`[data-testid="${firstErrorField}-section"]`) ||
        document.querySelector(`#${firstErrorField}-section`);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setOpen(true);
      if (mode) {
        setNextUrl(`/gatherings/${id}`);
      } else {
        setNextUrl("/");
      }
    } else {
      router.back();
    }
  };

  const handleModalCheck = () => {
    setOpen(false);
    if (nextUrl) {
      router.push(nextUrl);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-14">
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
                <DatePicker
                  value={field.value}
                  onChange={(value) => {
                    const formattedValue = value ? format(value, "yyyy-MM-dd HH:mm:ss") : undefined;
                    field.onChange(formattedValue);
                  }}
                  triggerClassName="h-12 w-full border-gray-500"
                  showTimePicker
                />
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
                name="capacity"
                className="inputCountButton border-gray-500 pl-4 text-gray-700"
                value={field.value}
                min={2}
                max={50}
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
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
            {isDirty ? (
              <Modal
                open={open}
                action={setOpen}
                triggerButton={
                  <Button type="button" className="flex-1" size="lg" variant="outline" onClick={handleCancel}>
                    작성 취소
                  </Button>
                }
                content={
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-semibold text-main">작성된 사항이 저장되지 않습니다.</span>
                    <span>그래도 취소 하시겠습니까?</span>
                  </div>
                }
                onSubmit={handleModalCheck}
              />
            ) : (
              <Button type="button" className="flex-1" size="lg" variant="outline" onClick={handleCancel}>
                작성 취소
              </Button>
            )}
            <Button type="submit" className="flex-1" size="lg">
              {mode ? "모임 수정하기" : "모임 만들기"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
