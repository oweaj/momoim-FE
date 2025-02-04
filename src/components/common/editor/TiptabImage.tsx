import { ImageUploadApi } from "@/api/file/imageFile";
import { TextSelection } from "@tiptap/pm/state";
import { Editor } from "@tiptap/react";
import { Image as ImageIcon } from "lucide-react";
import { ChangeEvent } from "react";

export default function TiptabImage({ editor }: { editor: Editor | null }) {
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectFile = files ? files[0] : null;

    if (selectFile && editor) {
      const uploadImage = await ImageUploadApi("editorImage", selectFile);
      editor.chain().focus().setImage({ src: uploadImage, alt: "에디터 첨부 이미지" }).run();

      const { to } = editor.state.selection;
      const tr = editor.state.tr.insert(to, editor.schema.nodes.paragraph.create());
      editor.view.dispatch(tr.setSelection(TextSelection.create(tr.doc, to + 1)));

      editor.view.focus();
    }
  };

  return (
    <label htmlFor="description-file" className="toolbarBtn">
      <input type="file" id="description-file" onChange={handleImageUpload} className="hidden" />
      <ImageIcon className="h-5 w-5 cursor-pointer" />
    </label>
  );
}
