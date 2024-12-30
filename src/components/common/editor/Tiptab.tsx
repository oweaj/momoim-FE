import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";

interface FormDescriptionProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

function TipTab({ field }: FormDescriptionProps) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose m-4 focus:outline-none tiptap",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder:
          "모임에 대한 설명을 작성해주세요.\n※ 이미지 선택 후 에디터에 표시된 이미지를 클릭하여 사이즈를 조정할 수 있습니다.",
      }),
      Underline,
      ImageResize,
      Link.extend({
        inclusive: false,
      }).configure({
        defaultProtocol: "https",
        protocols: ["http", "https"],
        openOnClick: false,
        autolink: true,
      }),
    ],
    content: field.value,
    onUpdate: ({ editor: updatedEditor }) => {
      field.onChange(updatedEditor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="h-auto min-h-[600px] rounded-md border border-gray-500">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default TipTab;
