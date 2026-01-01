'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { getEditorExtensions, getEditorProps } from './tiptap/config';
import { Toolbar } from './tiptap/toolbar';
import { TiptapEditorProps } from './tiptap/types';

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: getEditorExtensions(),
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: getEditorProps(),
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="tiptap-container">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
            <div className="tiptap-footer">
                <span>{editor.storage.characterCount?.characters() || 0} caractères</span>
                <span>{editor.storage.characterCount?.words() || 0} mots</span>
            </div>
        </div>
    );
}



