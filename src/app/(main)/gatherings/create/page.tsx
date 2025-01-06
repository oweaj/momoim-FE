import GatheringForm from "./_component/GatheringForm";
import FormLayout from "../_component/FormLayout";

export default function GatheringCreate() {
  return (
    <FormLayout title="모임 만들기">
      <GatheringForm mode="create" />
    </FormLayout>
  );
}
