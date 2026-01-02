import { ColorOption } from './types';

export const TEXT_COLORS: ColorOption[] = [
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

export const HIGHLIGHT_COLORS: ColorOption[] = [
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
