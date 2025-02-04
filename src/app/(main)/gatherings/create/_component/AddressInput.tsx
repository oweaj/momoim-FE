import { Input } from "@/components/ui/input";
import { FormFieldProps } from "@/types/common/formFieldprops";
import DaumPostcode from "react-daum-postcode";
import { Modal } from "@/components/common/modal/Modal";
import { useState } from "react";

interface AddressDataType {
  address: string;
  sidoEnglish: string;
}

export default function AddressInput({ form, field }: FormFieldProps) {
  const [open, setOpen] = useState(false);

  const handleComplete = ({ address, sidoEnglish }: AddressDataType) => {
    if (sidoEnglish.includes("-do") || sidoEnglish.includes("-si")) {
      const formatSidoText = sidoEnglish.replace(/-do|-si/g, "").toUpperCase();
      form.setValue("location", formatSidoText);
    } else {
      form.setValue("location", sidoEnglish.toUpperCase());
    }

    field.onChange(address);
  };

  const handleAddressClose = (state: string) => {
    if (state === "FORCE_CLOSE" || state === "COMPLETE_CLOSE") setOpen(false);
  };

  return (
    <div className="space-y-4">
      <Modal
        size="w-[30rem] max-sm:w-11/12 max-xs:w-full"
        open={open}
        action={setOpen}
        triggerButton={
          <Input
            type="text"
            name="address"
            value={field.value}
            className="h-12 w-full cursor-pointer rounded-md border border-gray-500 px-3 py-1 font-medium text-gray-700"
            placeholder="클릭을 통해 주소를 검색해주세요."
            aria-label="주소 검색"
            role="button"
            readOnly
          />
        }
        content={
          <DaumPostcode
            style={{ width: "100%", height: "480px" }}
            onComplete={handleComplete}
            onClose={handleAddressClose}
          />
        }
        showFooter={false}
      />
      <Input
        type="text"
        className="border-gray-500 font-medium text-gray-700"
        placeholder="상세주소를 입력해주세요."
        onChange={(e) => {
          form.setValue("detailAddress", e.target.value);
        }}
      />
    </div>
  );
}
