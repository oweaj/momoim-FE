import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEditor, EditorContent } from "@tiptap/react";
import ImageResize from "tiptap-extension-resize-image";

export default function Viewer({ content }: { content: string | undefined }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageResize,
      Underline,
      Link.extend({
        inclusive: false,
      }).configure({
        defaultProtocol: "https",
        protocols: ["http", "https"],
        openOnClick: false,
        autolink: true,
      }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} className="prose max-w-[56rem]" />;
}
