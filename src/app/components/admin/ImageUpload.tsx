'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
    currentImage?: { url: string; publicId: string; alt: string };
    onImageUploaded: (image: { url: string; publicId: string; alt: string }) => void;
}

export default function ImageUpload({ currentImage, onImageUploaded }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage?.url || '');
    const [alt, setAlt] = useState(currentImage?.alt || '');

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setPreview(data.url);
                onImageUploaded({
                    url: data.url,
                    publicId: data.publicId,
                    alt: alt || 'Image article'
                });
            }
        } catch (error) {
            console.error('Erreur upload:', error);
            alert('Erreur lors de l\'upload');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="form-group">
            <label>Image de l&apos;article</label>

            {preview && (
                <div style={{ marginBottom: '1rem', position: 'relative', width: '100%', height: '300px' }}>
                    <Image
                        src={preview}
                        alt="Preview"
                        fill
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                style={{ marginBottom: '0.5rem' }}
            />

            {uploading && <p>Upload en cours...</p>}

            <input
                type="text"
                placeholder="Texte alternatif (SEO)"
                value={alt}
                onChange={(e) => {
                    setAlt(e.target.value);
                    if (preview) {
                        onImageUploaded({
                            url: preview,
                            publicId: currentImage?.publicId || '',
                            alt: e.target.value
                        });
                    }
                }}
            />
        </div>
    );
}
