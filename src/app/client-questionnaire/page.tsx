'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronLeft, Send, Sparkles } from 'lucide-react';

export default function QuestionnairePage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        dreamStatement: '',
        feelingWords: '',
        targetAudience: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate processing time
        setTimeout(() => {
            setIsGenerating(false);
            setShowResult(true);
        }, 2000);
    };

    const isStep1Valid = formData.dreamStatement.length > 10;
    const isStep2Valid = formData.feelingWords.split(',').filter(w => w.trim()).length >= 1;
    const isStep3Valid = formData.targetAudience.length > 5;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050505' }}>
            {/* Header */}
            <header className="glass" style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', zIndex: 10 }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '1.2rem', color: '#fff', textDecoration: 'none' }}>
                    <Home color="var(--primary)" />
                    <span>DreamHaven</span>
                </Link>
                <div style={{ fontSize: '0.9rem', color: '#888' }}>
                    Client Consultation • Step {step} of 3
                </div>
            </header>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
                <div style={{ maxWidth: '600px', width: '100%' }}>
                    {!showResult ? (
                        <div className="glass" style={{ padding: '40px', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                            {/* Progress Bar */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.05)' }}>
                                <div style={{
                                    width: `${(step / 3) * 100}%`,
                                    height: '100%',
                                    background: 'var(--primary)',
                                    transition: 'width 0.3s ease'
                                }} />
                            </div>

                            {/* Step 1: The Dream Statement */}
                            {step === 1 && (
                                <div className="fade-in">
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>The Dream Statement</h2>
                                    <p style={{ color: '#888', marginBottom: '32px', lineHeight: '1.6' }}>
                                        Describe your perfect home in a sentence or two. Focus on how you want to live in the space, not just the architectural style.
                                    </p>
                                    <div style={{ marginBottom: '32px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>
                                            Example: &quot;A serene, light-filled sanctuary that feels like a modern treehouse, perfect for quiet weekends and hosting intimate dinner parties for close friends.&quot;
                                        </label>
                                        <textarea
                                            value={formData.dreamStatement}
                                            onChange={(e) => setFormData({ ...formData, dreamStatement: e.target.value })}
                                            placeholder="Your vision..."
                                            style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: '#fff', resize: 'vertical', fontSize: '1rem', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button
                                            onClick={handleNext}
                                            disabled={!isStep1Valid}
                                            className="btn-primary"
                                        >
                                            Next Step
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: The Feeling */}
                            {step === 2 && (
                                <div className="fade-in">
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>The Feeling</h2>
                                    <p style={{ color: '#888', marginBottom: '32px', lineHeight: '1.6' }}>
                                        Choose 3-5 words that capture the exact emotional essence you want this home to evoke.
                                    </p>
                                    <div style={{ marginBottom: '32px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#ccc' }}>
                                            Examples: Serene, Warm, Organic, Minimalist, Vibrant, Cozy, Majestic
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.feelingWords}
                                            onChange={(e) => setFormData({ ...formData, feelingWords: e.target.value })}
                                            placeholder="e.g. Serene, Warm, Organic..."
                                            style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: '#fff', fontSize: '1rem' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button onClick={handleBack} className="btn-outline">
                                            <ChevronLeft size={18} /> Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={!isStep2Valid}
                                            className="btn-primary"
                                        >
                                            Next Step
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Target Audience */}
                            {step === 3 && (
                                <div className="fade-in">
                                    <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Target Audience</h2>
                                    <p style={{ color: '#888', marginBottom: '32px', lineHeight: '1.6' }}>
                                        Who is this space primarily for? Understanding the inhabitants helps our engine tune the emotional resonance of the generated content.
                                    </p>
                                    <div style={{ marginBottom: '32px' }}>
                                        <textarea
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                            placeholder="e.g. My growing family of four, plus our two large dogs. We need space for messy play and quiet adult retreats."
                                            style={{ width: '100%', height: '120px', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', color: '#fff', resize: 'vertical', fontSize: '1rem', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button onClick={handleBack} className="btn-outline">
                                            <ChevronLeft size={18} /> Back
                                        </button>
                                        <button
                                            onClick={handleGenerate}
                                            disabled={!isStep3Valid || isGenerating}
                                            className="btn-primary"
                                            style={{ position: 'relative', overflow: 'hidden' }}
                                        >
                                            {isGenerating ? (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                                                    Synthesizing Vision...
                                                </span>
                                            ) : (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Sparkles size={18} /> Finalize Consultation
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Results View
                        <div className="glass fade-in" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                <Sparkles size={40} />
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Vision Captured</h2>
                            <p style={{ color: '#888', marginBottom: '32px', lineHeight: '1.6' }}>
                                Your core essence has been translated into precise directives for the DreamHaven generation engine. We are ready to build your cinematic preview.
                            </p>

                            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '24px', textAlign: 'left', marginBottom: '32px', border: '1px solid var(--border)' }}>
                                <div style={{ marginBottom: '16px' }}>
                                    <strong style={{ display: 'block', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Style Directive</strong>
                                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{formData.feelingWords}</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#ccc', fontStyle: 'italic', borderLeft: '3px solid var(--border)', paddingLeft: '16px' }}>
                                    &quot;{formData.dreamStatement}&quot;
                                </div>
                            </div>

                            <Link href={`/studio?prompt=${encodeURIComponent(formData.dreamStatement)}&feelings=${encodeURIComponent(formData.feelingWords)}&audience=${encodeURIComponent(formData.targetAudience)}`} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem' }}>
                                Direct to Engine <Send size={20} style={{ marginLeft: '8px' }} />
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
