'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { MenuBar } from './menuBar'

const Tiptap = ({description,onChange}:{
    description:string | undefined,onChange:(richText:string)=>void
}) => {
  const editor = useEditor({
    extensions: [
        StarterKit.configure(),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
      ],
    content: description,
    editorProps:{
      attributes:{
        class: "min-h-[120px] w-full rounded-md  border border-input shadow-sm bg-white"
      } 
    },
    onUpdate: ({editor}) => {
      onChange(editor.getHTML())
      console.log(editor.getHTML())
    }
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap