import { Editor } from '@tiptap/react';
import { TEXT_COLORS, HIGHLIGHT_COLORS } from './colors';
import React from "react";

interface ToolbarProps {
    editor: Editor;
}

export function Toolbar({ editor }: ToolbarProps) {
    const addLink = () => {
        const url = prompt('URL du lien:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = prompt("URL de l'image:");
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
        <div className="tiptap-toolbar">
            {/* Format */}
            <select
                className="format-select"
                onChange={(e) => {
                    const level = e.target.value;
                    if (level === 'p') {
                        editor.chain().focus().setParagraph().run();
                    } else {
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: parseInt(level) as 2 | 3 | 4 })
                            .run();
                    }
                    e.target.value = '';
                }}
                defaultValue=""
            >
                <option value="" disabled>
                    Format
                </option>
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

            {/* Alignement */}
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                title="Aligner à gauche"
            >
                ⬅
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                title="Centrer"
            >
                ⬌
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                title="Aligner à droite"
            >
                ➡
            </button>

            <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                title="Justifier"
            >
                ≡
            </button>

            <div className="toolbar-divider"></div>

            {/* Couleur de texte */}
            <select
                className="format-select color-select"
                onChange={handleTextColorChange}
                defaultValue=""
            >
                <option value="" disabled>
                    🎨 Couleur texte
                </option>
                {TEXT_COLORS.map((color, index) =>
                    color.name.startsWith('─') ? (
                        <option key={index} disabled>
                            {color.name}
                        </option>
                    ) : (
                        <option key={index} value={color.value}>
                            {color.name}
                        </option>
                    )
                )}
            </select>

            {/* Surlignage */}
            <select
                className="format-select color-select"
                onChange={handleHighlightChange}
                defaultValue=""
            >
                <option value="" disabled>
                    ✨ Surligner
                </option>
                {HIGHLIGHT_COLORS.map((color, index) =>
                    color.name.startsWith('─') ? (
                        <option key={index} disabled>
                            {color.name}
                        </option>
                    ) : (
                        <option key={index} value={color.value}>
                            {color.name}
                        </option>
                    )
                )}
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
    );
}
