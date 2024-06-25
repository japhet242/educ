import React, { useCallback } from 'react'
import { Toggle } from "../ui/toggle"
import { RiStrikethrough2 } from "react-icons/ri"
import { FaFileCode, FaBold, FaHighlighter } from "react-icons/fa"
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuItalic } from "react-icons/lu"
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai"
import { BiCodeBlock } from "react-icons/bi"
import { GrBlockQuote } from "react-icons/gr"
import { VscHorizontalRule } from "react-icons/vsc"
import { IoIosColorWand } from "react-icons/io"
import { FiCornerDownLeft, FiAlignJustify, FiAlignRight, FiAlignLeft } from "react-icons/fi"
import { BsParagraph } from "react-icons/bs"
import { MdOutlineTitle } from "react-icons/md"
import Link from '@tiptap/extension-link'

export function MenuBarChapitre({ editor }: { editor: any }) {
  if (!editor) {
    return null
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    editor.chain().focus().setColor('#2337ea').run()
  }, [editor])

  return (
    <div className="control-group bg-white">
      <div className="Toggle-group">
        <Toggle onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
          <RiStrikethrough2 />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'is-active' : ''}>
          <FaFileCode />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
          <LuHeading1 />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
          <LuHeading2 />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
          <LuHeading3 />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
          <LuHeading4 />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>
          <AiOutlineUnorderedList />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>
          <AiOutlineOrderedList />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
          <BiCodeBlock />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>
          <GrBlockQuote />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <VscHorizontalRule />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().setHardBreak().run()}>
          <FiCornerDownLeft />
        </Toggle>
        <Toggle onClick={() => editor.chain().focus().setColor('#00ab56').run()} className={editor.isActive('textStyle', { color: '#00ab56' }) ? 'is-active' : ''}>
          <IoIosColorWand />
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
        <Toggle onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
          lien
        </Toggle>
      </div>
    </div>
  )
}
