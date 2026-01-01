'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

// Palette de couleurs étendue
const TEXT_COLORS = [
    { name: '─ Texte par défaut', value: '' },
    { name: 'Noir', value: '#000000' },
    { name: 'Blanc', value: '#FFFFFF' },
    { name: 'Gris foncé', value: '#333333' },
    { name: 'Gris', value: '#808080' },
    { name: 'Gris clair', value: '#C0C0C0' },
    { name: '─ Thème Or', value: '' },
    { name: 'Or principal', value: '#D4AF37' },
    { name: 'Or clair', value: '#F4E4C1' },
    { name: 'Or foncé', value: '#B8941F' },
    { name: 'Or accent', value: '#FFD700' },
    { name: '─ Couleurs vives', value: '' },
    { name: 'Rouge', value: '#E74C3C' },
    { name: 'Bleu', value: '#3498DB' },
    { name: 'Vert', value: '#2ECC71' },
    { name: 'Orange', value: '#E67E22' },
    { name: 'Violet', value: '#9B59B6' },
];

const HIGHLIGHT_COLORS = [
    { name: '─ Aucun surlignage', value: '' },
    { name: 'Or très léger', value: 'rgba(212, 175, 55, 0.15)' },
    { name: 'Or léger', value: 'rgba(212, 175, 55, 0.25)' },
    { name: 'Or moyen', value: 'rgba(212, 175, 55, 0.4)' },
    { name: 'Or intense', value: 'rgba(212, 175, 55, 0.6)' },
    { name: 'Jaune pastel', value: 'rgba(255, 215, 0, 0.2)' },
    { name: 'Jaune', value: 'rgba(255, 215, 0, 0.4)' },
    { name: 'Vert pastel', value: 'rgba(46, 204, 113, 0.2)' },
    { name: 'Bleu pastel', value: 'rgba(52, 152, 219, 0.2)' },
    { name: 'Rose pastel', value: 'rgba(231, 76, 60, 0.2)' },
];

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3, 4],
                },
            }),
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
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

    const addLink = () => {
        const url = prompt('URL du lien:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = prompt('URL de l\'image:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const handleTextColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const color = e.target.value;
        if (color) {
            editor.chain().focus().setColor(color).run();
        } else {
            editor.chain().focus().unsetColor().run();
        }
        e.target.value = '';
    };

    const handleHighlightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const color = e.target.value;
        if (color) {
            editor.chain().focus().toggleHighlight({ color }).run();
        } else {
            editor.chain().focus().unsetHighlight().run();
        }
        e.target.value = '';
    };

    return (
        <div className="tiptap-container">
            {/* TOOLBAR */}
            <div className="tiptap-toolbar">
                {/* Format */}
                <select
                    className="format-select"
                    onChange={(e) => {
                        const level = e.target.value;
                        if (level === 'p') {
                            editor.chain().focus().setParagraph().run();
                        } else {
                            editor.chain().focus().toggleHeading({ level: parseInt(level) as 2 | 3 | 4 }).run();
                        }
                        e.target.value = '';
                    }}
                    defaultValue=""
                >
                    <option value="" disabled>Format</option>
                    <option value="p">Paragraphe</option>
                    <option value="2">Titre 2</option>
                    <option value="3">Titre 3</option>
                    <option value="4">Titre 4</option>
                </select>

                <div className="toolbar-divider"></div>

                {/* Formatage texte */}
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                    title="Gras"
                >
                    <strong>G</strong>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                    title="Italique"
                >
                    <em>I</em>
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                    title="Barré"
                >
                    <s>S</s>
                </button>

                <div className="toolbar-divider"></div>

                {/* Couleur de texte */}
                <select
                    className="format-select color-select"
                    onChange={handleTextColorChange}
                    defaultValue=""
                >
                    <option value="" disabled>🎨 Couleur texte</option>
                    {TEXT_COLORS.map((color, index) => (
                        color.name.startsWith('─') ? (
                            <option key={index} disabled>{color.name}</option>
                        ) : (
                            <option key={index} value={color.value}>
                                {color.name}
                            </option>
                        )
                    ))}
                </select>

                {/* Surlignage */}
                <select
                    className="format-select color-select"
                    onChange={handleHighlightChange}
                    defaultValue=""
                >
                    <option value="" disabled>✨ Surligner</option>
                    {HIGHLIGHT_COLORS.map((color, index) => (
                        color.name.startsWith('─') ? (
                            <option key={index} disabled>{color.name}</option>
                        ) : (
                            <option key={index} value={color.value}>
                                {color.name}
                            </option>
                        )
                    ))}
                </select>

                <div className="toolbar-divider"></div>

                {/* Listes */}
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                    title="Liste à puces"
                >
                    • Liste
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                    title="Liste numérotée"
                >
                    1. Liste
                </button>

                <div className="toolbar-divider"></div>

                {/* Citation */}
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                    title="Citation"
                >
                    " Citation
                </button>

                <div className="toolbar-divider"></div>

                {/* Liens & Images */}
                <button
                    onClick={addLink}
                    className={editor.isActive('link') ? 'is-active' : ''}
                    title="Ajouter un lien"
                >
                    🔗 Lien
                </button>

                <button onClick={addImage} title="Ajouter une image">
                    🖼️ Image
                </button>

                <div className="toolbar-divider"></div>

                {/* Séparateur */}
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Ligne de séparation"
                >
                    ─ Séparer
                </button>
            </div>

            {/* ÉDITEUR */}
            <EditorContent editor={editor} />

            {/* FOOTER */}
            <div className="tiptap-footer">
                <span>{editor.storage.characterCount?.characters() || 0} caractères</span>
                <span>{editor.storage.characterCount?.words() || 0} mots</span>
            </div>
        </div>
    );
}


