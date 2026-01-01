'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false, // FIX SSR
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'article-link',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'article-image',
                },
            }),
            Placeholder.configure({
                placeholder: 'Commencez à écrire votre article...',
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'tiptap-editor',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const url = window.prompt('URL du lien:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('URL de l\'image:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="tiptap-wrapper">
            {/* Toolbar */}
            <div className="tiptap-toolbar">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                    title="Gras (Ctrl+B)"
                >
                    <strong>B</strong>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                    title="Italique (Ctrl+I)"
                >
                    <em>I</em>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                    title="Barré"
                >
                    <s>S</s>
                </button>

                <div className="toolbar-divider" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    title="Titre 2"
                >
                    H2
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    title="Titre 3"
                >
                    H3
                </button>

                <div className="toolbar-divider" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                    title="Liste à puces"
                >
                    • Liste
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                    title="Liste numérotée"
                >
                    1. Liste
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                    title="Citation"
                >
                    " Citation
                </button>

                <div className="toolbar-divider" />

                <button
                    type="button"
                    onClick={setLink}
                    className={editor.isActive('link') ? 'is-active' : ''}
                    title="Ajouter un lien"
                >
                    🔗 Lien
                </button>

                <button
                    type="button"
                    onClick={addImage}
                    title="Ajouter une image"
                >
                    🖼️ Image
                </button>

                <div className="toolbar-divider" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Annuler (Ctrl+Z)"
                >
                    ↶ Annuler
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Refaire (Ctrl+Y)"
                >
                    ↷ Refaire
                </button>
            </div>

            {/* Éditeur */}
            <EditorContent editor={editor} />

            {/* Compteur de mots */}
            <div className="tiptap-footer">
                {editor.storage.characterCount?.words() || 0} mots
            </div>
        </div>
    );
}
