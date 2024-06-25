import { Toggle } from "../ui/toggle"
import { FiAlignJustify } from "react-icons/fi";
import { FiAlignRight } from "react-icons/fi";
import { FiAlignLeft } from "react-icons/fi";
import { FaHighlighter } from "react-icons/fa";
import { LuItalic } from "react-icons/lu";
import { FaBold } from "react-icons/fa";
import { BsParagraph } from "react-icons/bs";
import { MdOutlineTitle } from "react-icons/md";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading1 } from "react-icons/lu";

export function MenuBar({editor}:{editor:any}) {
    if (!editor) {
      return null
    }

    return (
      <div className="control-group bg-white">
        <div className="Toggle-group">
          <Toggle
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
           <LuHeading2 />
        </Toggle>
          <Toggle onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
          <BsParagraph />
          </Toggle>
          <Toggle onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
          <FaBold />
          </Toggle>
          <Toggle onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
          <LuItalic />

          </Toggle>
          <Toggle onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
          <FaHighlighter />
          </Toggle>
          <Toggle onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
          <FiAlignLeft />
          </Toggle>
          <Toggle onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
          <FiAlignJustify />
          </Toggle>
          <Toggle onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
          <FiAlignRight />
          </Toggle>
        </div>
      </div>
    )
  }