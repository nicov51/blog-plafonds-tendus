'use client';

import { useState } from 'react';
import { ImageData } from '@/types/article';

interface ImageUploadProps {
    value: ImageData | null;
    onChange: (image: ImageData | null) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith('image/')) {
            setError('Le fichier doit être une image');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('L\'image ne doit pas dépasser 5 Mo');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Erreur lors de l\'upload');
            }

            const data = await res.json();
            onChange({
                url: data.url,
                publicId: data.publicId,
                alt: file.name,
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange(null);
    };

    return (
        <div className="image-upload">
            {value ? (
                <div className="image-preview">
                    <img src={value.url} alt={value.alt || 'Image'} />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="btn-remove"
                    >
                        ✕ Supprimer
                    </button>
                </div>
            ) : (
                <label className="upload-zone">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                    <div className="upload-content">
                        {uploading ? (
                            <p>⏳ Upload en cours...</p>
                        ) : (
                            <>
                                <p>📷 Cliquez pour ajouter une image</p>
                                <span>JPG, PNG, WebP (max 5 Mo)</span>
                            </>
                        )}
                    </div>
                </label>
            )}

            {error && <p className="error-text">{error}</p>}
        </div>
    );
}


