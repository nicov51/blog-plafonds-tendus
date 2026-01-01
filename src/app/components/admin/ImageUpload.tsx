'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { uploadService } from '@/services/uploadService';

interface ImageData {
    url: string;
    publicId: string;
}

interface Props {
    value?: ImageData;
    onChange: (image?: ImageData) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Bloquer les SVG
        if (file.type === 'image/svg+xml') {
            alert('Les fichiers SVG ne sont pas acceptés');
            return;
        }

        setUploading(true);
        try {
            const data = await uploadService.upload(file);
            onChange(data);
        } catch {
            alert('Erreur upload');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!value) return;
        try {
            await uploadService.delete(value.publicId);
            onChange(undefined);
        } catch {
            alert('Erreur suppression');
        }
    };

    if (value) {
        return (
            <div className="image-preview">
                <Image src={value.url} alt="Preview" width={600} height={400} />
                <button type="button" onClick={handleDelete} className="btn-delete">
                    🗑️
                </button>
            </div>
        );
    }

    return (
        <label className="image-upload">
            <input type="file" accept="image/jpeg,image/png,image/webp,image/jpg" onChange={handleUpload} disabled={uploading} />
            <span className="upload-label">{uploading ? '⏳' : '📷 Choisir'}</span>
        </label>
    );
}

