'use client';

import { useState } from 'react';

export default function TestPage() {
    const [result, setResult] = useState('');

    const testListe = async () => {
        const res = await fetch('/api/articles');
        const data = await res.json();
        setResult(JSON.stringify(data, null, 2));
    };

    return (
        <div style={{ padding: '2rem' }}>
            <button onClick={testListe} style={{ padding: '1rem', fontSize: '16px' }}>
                Tester GET /api/articles
            </button>
            <pre style={{ background: '#000', color: '#0f0', padding: '1rem', marginTop: '1rem' }}>
        {result}
      </pre>
        </div>
    );
}
