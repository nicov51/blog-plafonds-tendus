interface ImageData {
    url: string;
    publicId: string;
}

export const uploadService = {
    async upload(file: File): Promise<ImageData> {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');

        const { data } = await res.json();
        return data;
    },

    async delete(publicId: string): Promise<void> {
        const res = await fetch('/api/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId }),
        });

        if (!res.ok) throw new Error('Delete failed');
    }
};
