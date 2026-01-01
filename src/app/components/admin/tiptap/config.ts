import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';

export const getEditorExtensions = () => [
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
    TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
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
];

export const getEditorProps = () => ({
    attributes: {
        class: 'tiptap-editor',
    },
});
