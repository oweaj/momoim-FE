import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Toolbar from "./Toolbar";

interface FormDescriptionProps {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
}

function TipTab({ field }: FormDescriptionProps) {
  const [isLoading, setIsLoading] = useState(true);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose m-4 focus:outline-none tiptap",
      },
    },
    extensions: [
      StarterKit,
      Underline,
      ImageResize,
      Placeholder.configure({
        placeholder:
          "모임에 대한 설명을 작성해주세요.\n※ 이미지 선택 후 에디터에 표시된 이미지를 클릭하여 사이즈를 조정할 수 있습니다.",
      }),
      Link.extend({
        inclusive: false,
      }).configure({
        defaultProtocol: "https",
        protocols: ["http", "https"],
        openOnClick: true,
        autolink: false,
      }),
    ],
    content: field.value,
    onUpdate: ({ editor: updatedEditor }) => {
      field.onChange(updatedEditor.getHTML());
    },
    immediatelyRender: false,
  });

  const handleEditorClick = () => {
    if (editor) {
      const { isFocused, isEmpty } = editor;
      if (isEmpty && !isFocused) {
        editor.chain().focus().setTextSelection(1).run();
      }
    }
  };

  useEffect(() => {
    if (editor) {
      setIsLoading(false);
    }
  }, [editor]);

  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-[600px] bg-gray-100" />
      ) : (
        <div
          className="h-auto min-h-[600px] rounded-md border border-gray-500"
          onClick={handleEditorClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleEditorClick();
          }}
          role="textbox"
          aria-label="텍스트 에디터"
          tabIndex={0}
        >
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}
    </div>
  );
}

export default TipTab;
