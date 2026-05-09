'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Save, CheckCircle } from 'lucide-react';

interface DesignReviewerProps {
    prompt: string;
    designId: string;
    onSave: (feedback: { rating: 'good' | 'bad', comment: string }) => void;
}

export default function DesignReviewer({ prompt, designId, onSave }: DesignReviewerProps) {
    const [rating, setRating] = useState<'good' | 'bad' | null>(null);
    const [comment, setComment] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        if (!rating) return;
        onSave({ rating, comment });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="glass" style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--primary)', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <div style={{ padding: '8px', background: 'rgba(var(--primary-rgb), 0.1)', borderRadius: '8px' }}>
                    <CheckCircle size={20} color="var(--primary)" />
                </div>
                <h3 style={{ fontSize: '1rem', margin: 0 }}>AI Architect Feedback</h3>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '15px' }}>
                Help train your AI Architect! How well does this design match your vision?
            </p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button
                    onClick={() => setRating('good')}
                    className={rating === 'good' ? 'btn-primary' : 'btn-outline'}
                    style={{ flex: 1, justifyContent: 'center', height: '40px' }}
                >
                    <ThumbsUp size={16} /> High Quality
                </button>
                <button
                    onClick={() => setRating('bad')}
                    className={rating === 'bad' ? 'btn-primary' : 'btn-outline'}
                    style={{ flex: 1, justifyContent: 'center', height: '40px', background: rating === 'bad' ? '#ef4444' : 'transparent', borderColor: rating === 'bad' ? '#ef4444' : 'var(--border)' }}
                >
                    <ThumbsDown size={16} /> Needs Work
                </button>
            </div>

            <div style={{ position: 'relative', marginBottom: '15px' }}>
                <MessageSquare size={16} style={{ position: 'absolute', top: '12px', left: '12px', opacity: 0.5 }} />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Specific corrections (e.g. 'Acoustics look poor here')"
                    style={{ width: '100%', minHeight: '80px', padding: '10px 10px 10px 35px', fontSize: '0.85rem' }}
                />
            </div>

            <button
                onClick={handleSave}
                disabled={!rating || isSaved}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', opacity: (!rating || isSaved) ? 0.5 : 1 }}
            >
                {isSaved ? 'Feedback Stored!' : <><Save size={16} /> Save to Training Set</>}
            </button>
        </div>
    );
}
