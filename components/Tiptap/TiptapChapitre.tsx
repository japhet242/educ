'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import { MenuBarChapitre } from './menuBarChapitre'

const TiptapChapitre = ({ description, onChange }: { description: string | undefined, onChange: (richText: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure(),
      ListItem,
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "min-h-[120px] w-full rounded-md border border-input shadow-sm bg-white"
      }
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
      console.log(editor.getHTML())
    }
  })

  return (
    <div>
      <MenuBarChapitre editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapChapitre
