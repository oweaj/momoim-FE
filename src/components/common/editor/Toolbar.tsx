import { Editor } from "@tiptap/react";
import { Heading1, Heading2, Heading3, Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import TiptabImage from "./TiptabImage";
import TiptabLink from "./TiptabLink";

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-3 border-b border-gray-500 p-2 max-sm:gap-1 max-sm:overflow-x-auto">
      <div className="flex items-center gap-4 transition-all max-sm:gap-1">
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-5 w-5 cursor-pointer" />
        </button>
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-5 w-5 cursor-pointer" />
        </button>
        <div className="h-5 w-[1px] bg-gray-400" />
      </div>
      <div className="flex items-center gap-4 transition-all max-sm:gap-1">
        <button type="button" className="toolbarBtn" onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-5 w-5 cursor-pointer" />
        </button>
        <button type="button" className="toolbarBtn" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-5 w-5 cursor-pointer" />
        </button>
        <button type="button" className="toolbarBtn" onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <Underline className="h-5 w-5 cursor-pointer" />
        </button>
        <div className="h-5 w-[1px] bg-gray-400" />
      </div>
      <div className="flex items-center gap-4 transition-all max-sm:gap-1">
        <button type="button" className="toolbarBtn" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-5 w-5 cursor-pointer" />
        </button>
        <button type="button" className="toolbarBtn" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-5 w-5 cursor-pointer" />
        </button>
        <div className="h-5 w-[1px] bg-gray-400" />
      </div>
      <div className="flex gap-4 transition-all max-sm:gap-1">
        <TiptabImage editor={editor} />
        <TiptabLink editor={editor} />
      </div>
    </div>
  );
}
