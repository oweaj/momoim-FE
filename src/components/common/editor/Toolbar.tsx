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
          aria-label="제목 크기 1"
        >
          <Heading1 className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="제목 크기 2"
        >
          <Heading2 className="h-5 w-5 cursor-pointer" />
        </button>
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="제목 크기 3"
        >
          <Heading3 className="h-5 w-5 cursor-pointer" />
        </button>
        <div className="h-5 w-[1px] bg-gray-400" />
      </div>
      <div className="flex items-center gap-4 transition-all max-sm:gap-1">
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="텍스트 진하게"
        >
          <Bold className="h-5 w-5 cursor-pointer" />
        </button>
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="텍스트 기울기"
        >
          <Italic className="h-5 w-5 cursor-pointer" />
        </button>
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="텍스트 밑줄"
        >
          <Underline className="h-5 w-5 cursor-pointer" />
        </button>
        <div className="h-5 w-[1px] bg-gray-400" />
      </div>
      <div className="flex items-center gap-4 transition-all max-sm:gap-1">
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="순서가 없는 리스트 정렬"
        >
          <List className="h-5 w-5 cursor-pointer" />
        </button>
        <button
          type="button"
          className="toolbarBtn"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="순서가 있는 리스트 정렬"
        >
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
