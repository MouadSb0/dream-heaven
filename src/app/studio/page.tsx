'use client';

import { useState } from 'react';
import ThreeScene from '@/components/ThreeScene';
import {
    Send,
    Palette,
    Layers,
    Maximize2,
    Box,
    Check,
    ChevronLeft,
    Sparkles,
    Download,
    Play
} from 'lucide-react';
import Link from 'next/link';
import FloorPlan from '@/components/FloorPlan';
import DesignReviewer from '@/components/studio/DesignReviewer';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { generateCinematicPrompt, getVideoAsset } from '@/utils/cinematicPromptGenerator';

function StudioContent() {
    const searchParams = useSearchParams();
    const initialPrompt = searchParams.get('prompt') || '';
    const [prompt, setPrompt] = useState(initialPrompt);
    const [isGenerating, setIsGenerating] = useState(false);
    const [houseColor, setHouseColor] = useState('#c4a484');
    const [roofColor, setRoofColor] = useState('#1a1a1a');
    const [activeTab, setActiveTab] = useState('prompt');
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
    const [showTutorial, setShowTutorial] = useState(true);
    const [params, setParams] = useState({ floors: '2', bedrooms: '3', style: 'Modernist', roof: 'Gabled' });
    const [refinementHistory, setRefinementHistory] = useState<string[]>([]);
    const [videoStatus, setVideoStatus] = useState<'idle' | 'rendering' | 'ready'>('idle');
    const [videoProgress, setVideoProgress] = useState(0);
    const [isNight, setIsNight] = useState(true);
    const [hasPool, setHasPool] = useState(false);
    const [hasSkylight, setHasSkylight] = useState(false);
    const [hasGarden, setHasGarden] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState('MP4');

    const handleVideoGenerate = () => {
        setVideoStatus('rendering');
        setVideoProgress(0);
        const interval = setInterval(() => {
            setVideoProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setVideoStatus('ready');
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
    };

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);

        // Simulated AI extraction logic
        setTimeout(() => {
            const lowerPrompt = prompt.toLowerCase();
            const newParams = { ...params };

            if (lowerPrompt.includes('3 bedrooms')) newParams.bedrooms = '3';
            if (lowerPrompt.includes('2 bedrooms')) newParams.bedrooms = '2';
            if (lowerPrompt.includes('3 floors') || lowerPrompt.includes('3 story')) newParams.floors = '3';
            if (lowerPrompt.includes('1 floor') || lowerPrompt.includes('single story')) newParams.floors = '1';

            if (lowerPrompt.includes('flat roof')) newParams.roof = 'Flat';

            // Style Detection
            if (lowerPrompt.includes('classic') || lowerPrompt.includes('traditional') || lowerPrompt.includes('gabled')) {
                newParams.style = 'Traditional';
                if (!lowerPrompt.includes('flat roof')) newParams.roof = 'Gabled';
            } else if (lowerPrompt.includes('mid-century') || lowerPrompt.includes('midcentury') || lowerPrompt.includes('ranch')) {
                newParams.style = 'Mid-century';
            } else if (lowerPrompt.includes('modern') || lowerPrompt.includes('contemporary') || lowerPrompt.includes('cubic')) {
                newParams.style = 'Modernist';
            }

            if (lowerPrompt.includes('pool') || lowerPrompt.includes('swimming')) setHasPool(true);
            if (lowerPrompt.includes('skylight')) setHasSkylight(true);
            if (lowerPrompt.includes('garden') || lowerPrompt.includes('landscape') || lowerPrompt.includes('trees')) setHasGarden(true);

            setParams(newParams);
            setRefinementHistory([prompt, ...refinementHistory]);
            setIsGenerating(false);
        }, 1500);
    };

    const handleFeedback = (feedback: { rating: 'good' | 'bad', comment: string }) => {
        const feedbackItem = {
            id: Date.now().toString(),
            prompt,
            params,
            materials: { houseColor, roofColor, hasPool, hasSkylight, hasGarden },
            feedback,
            timestamp: new Date().toISOString()
        };

        // Save to Local Storage for now (can be shifted to API later)
        const existing = JSON.parse(localStorage.getItem('dh_training_feedback') || '[]');
        localStorage.setItem('dh_training_feedback', JSON.stringify([...existing, feedbackItem]));
        console.log('Feedback saved for training:', feedbackItem);
    };

    // Simulate API process on load if there's an initial prompt
    useEffect(() => {
        if (initialPrompt && !refinementHistory.length) {
            setIsGenerating(true);
            setTimeout(() => {
                const lowerPrompt = initialPrompt.toLowerCase();
                const newParams = { floors: '2', bedrooms: '3', style: 'Modernist', roof: 'Gabled' };

                if (lowerPrompt.includes('3 bedrooms')) newParams.bedrooms = '3';
                if (lowerPrompt.includes('2 bedrooms')) newParams.bedrooms = '2';
                if (lowerPrompt.includes('3 floors') || lowerPrompt.includes('3 story')) newParams.floors = '3';
                if (lowerPrompt.includes('1 floor') || lowerPrompt.includes('single story')) newParams.floors = '1';

                if (lowerPrompt.includes('flat roof')) newParams.roof = 'Flat';

                // Style Detection
                if (lowerPrompt.includes('classic') || lowerPrompt.includes('traditional') || lowerPrompt.includes('gabled') || lowerPrompt.includes('cottage')) {
                    newParams.style = 'Traditional';
                    if (!lowerPrompt.includes('flat roof')) newParams.roof = 'Gabled';
                } else if (lowerPrompt.includes('mid-century') || lowerPrompt.includes('midcentury') || lowerPrompt.includes('ranch')) {
                    newParams.style = 'Mid-century';
                } else if (lowerPrompt.includes('modern') || lowerPrompt.includes('contemporary') || lowerPrompt.includes('cubic')) {
                    newParams.style = 'Modernist';
                }

                if (lowerPrompt.includes('pool') || lowerPrompt.includes('swimming')) setHasPool(true);
                if (lowerPrompt.includes('skylight')) setHasSkylight(true);
                if (lowerPrompt.includes('garden') || lowerPrompt.includes('landscape') || lowerPrompt.includes('trees')) setHasGarden(true);

                setParams(newParams);
                setRefinementHistory([initialPrompt]);
                setIsGenerating(false);
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialPrompt]);

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Tutorial Modal */}
            {showTutorial && (
                <div className="glass" style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}>
                    <div className="glass" style={{ width: '450px', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <Sparkles color="#000" size={32} />
                        </div>
                        <h2 style={{ marginBottom: '12px' }}>Welcome to DreamHaven</h2>
                        <p style={{ color: '#888', marginBottom: '32px' }}>
                            Describe your vision in the prompt box, adjust materials, and see your dream home come to life in 3D.
                        </p>
                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowTutorial(false)}>
                            Start Designing
                        </button>
                    </div>
                </div>
            )}

            {/* Studio Header */}
            <header className="glass" style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
                        <ChevronLeft size={20} />
                        Exit Studio
                    </Link>
                    <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
                    <span style={{ fontWeight: 600 }}>DreamHaven Studio / <span style={{ color: 'var(--primary)' }}>Untitled Project</span></span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => setShowExport(true)}>
                        <Download size={18} /> Export
                    </button>
                    <button
                        onClick={handleVideoGenerate}
                        disabled={videoStatus === 'rendering'}
                        className="btn-primary"
                        style={{ padding: '0.5rem 1rem' }}>
                        <Play size={18} /> {videoStatus === 'rendering' ? 'Rendering...' : 'Generate Video'}
                    </button>
                </div>
            </header>

            {videoStatus !== 'idle' && (
                <div className="glass" style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)' }}>
                    <div className="glass" style={{ width: '600px', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
                        {videoStatus === 'rendering' ? (
                            <>
                                <h2 style={{ marginBottom: '24px' }}>Rendering Cinematic Walkthrough</h2>
                                <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                                    <div style={{ width: `${videoProgress}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.2s ease' }} />
                                </div>
                                <p style={{ color: '#888' }}>{videoProgress}% • Integrating global illumination and materials...</p>
                            </>
                        ) : (
                            <>
                                <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', borderRadius: '16px', marginBottom: '24px', overflow: 'hidden', position: 'relative', border: '1px solid var(--border)' }}>
                                    <video
                                        key={getVideoAsset(params.style).url}
                                        src={getVideoAsset(params.style).url}
                                        poster={getVideoAsset(params.style).poster}
                                        controls
                                        autoPlay
                                        muted
                                        playsInline
                                        preload="metadata"
                                        loop
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <h2 style={{ marginBottom: '12px' }}>Video Walkthrough Complete</h2>
                                <p style={{ color: '#888', marginBottom: '24px' }}>Your cinematic 4K tour has been generated based on your design descriptions.</p>

                                <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                                    <label style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '8px' }}>Select Export Format</label>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {['MP4', 'MOV', 'AVI', 'WEBM'].map(fmt => (
                                            <button
                                                key={fmt}
                                                onClick={() => setSelectedFormat(fmt)}
                                                className={selectedFormat === fmt ? 'btn-primary' : 'btn-outline'}
                                                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', borderRadius: '8px' }}
                                            >
                                                {fmt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        className="btn-primary"
                                        style={{ flex: 1, justifyContent: 'center' }}
                                        onClick={() => {
                                            const videoAsset = getVideoAsset(params.style);
                                            // Direct download via window.open is more reliable for external CDN assets
                                            // that might have CORS restrictions preventing fetch()
                                            const link = document.createElement('a');
                                            link.href = videoAsset.url;
                                            link.target = '_blank';
                                            link.download = `DreamHaven_Walkthrough_${params.style.replace(/\s+/g, '_')}.mp4`;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        }}
                                    >Download {selectedFormat}</button>
                                    <button className="btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setVideoStatus('idle')}>Close</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {showExport && (
                <div className="glass" style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.9)' }}>
                    <div className="container" style={{ maxWidth: '1000px', background: '#fff', color: '#000', padding: '60px', borderRadius: '4px', position: 'relative', overflowY: 'auto', maxHeight: '90vh' }}>
                        <button onClick={() => setShowExport(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#000' }}>×</button>

                        <div style={{ border: '2px solid #000', padding: '40px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '40px' }}>
                                <div>
                                    <h1 style={{ fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 900 }}>Design Specification</h1>
                                    <p style={{ opacity: 0.6 }}>DreamHaven Generative Architectural Systems</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 600 }}>PROJECT ID: DH-2026-X92</p>
                                    <p>DATE: FEB 21, 2026</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px' }}>
                                <div>
                                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Primary Floor Plan</h3>
                                    <div style={{ border: '1px solid #eee', padding: '20px' }}>
                                        <FloorPlan rooms={parseInt(params.bedrooms) || 3} />
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Technical Data</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.9rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Area:</span><strong>{parseInt(params.bedrooms) * 450 + 800} sq ft</strong></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Number of Storeys:</span><strong>{params.floors}</strong></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Architectural Style:</span><strong>{params.style}</strong></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Roof Configuration:</span><strong>{params.roof}</strong></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Main Materials:</span><strong>Wood Composite / Glass</strong></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Thermal Efficiency:</span><strong>A+ Certified</strong></div>
                                    </div>
                                    <div style={{ marginTop: '40px', padding: '15px', background: '#f5f5f5', fontSize: '0.75rem', lineHeight: '1.5', borderLeft: '4px solid #000' }}>
                                        <strong>Architectural Note:</strong> This document is a generated conceptual design. Structural engineering validation is required before permitting.
                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '10px', borderBottom: '1px solid #000' }}>Estimated Materials List</h4>
                                        <div style={{ fontSize: '0.7rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <span>Framing Timber:</span><strong>1,250 LF</strong>
                                            <span>External Glass:</span><strong>{parseInt(params.bedrooms) * 85 + 200} SQ FT</strong>
                                            <span>Roof Slate/Tile:</span><strong>{parseInt(params.floors) * 400 + 1200} SQ FT</strong>
                                            <span>Exterior Finish:</span><strong>{houseColor === '#ffffff' ? 'White Stucco' : 'Wood Composite'}</strong>
                                            {hasPool && <><span>Concrete (Pool):</span><strong>45 CU YD</strong></>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '40px', borderTop: '2px solid #000', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>
                                    OFFICIAL DREAMHAVEN AI DOCUMENT • NON-TRANSFERABLE
                                </div>
                                <div style={{ border: '1px solid #000', padding: '10px 20px', fontWeight: 'bold', transform: 'rotate(-5deg)', borderColor: 'rgba(0,0,0,0.3)', color: 'rgba(0,0,0,0.5)' }}>
                                    CERTIFIED AI DESIGN
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
                            <button className="btn-primary" style={{ background: '#000', color: '#fff', borderRadius: '0', padding: '12px 24px' }} onClick={() => window.print()}>Print Technical Set</button>
                            <button
                                className="btn-outline"
                                style={{ borderColor: '#000', color: '#000', borderRadius: '0', padding: '12px 24px' }}
                                onClick={() => {
                                    const link = document.createElement('a');
                                    const content = "DREAMHAVEN CAD DATA VERSION 1.0\nGENERATE DATE: " + new Date().toISOString();
                                    const blob = new Blob([content], { type: 'text/plain' });
                                    link.href = URL.createObjectURL(blob);
                                    link.download = `DH_Design_CAD_${Date.now()}.dxf`;
                                    link.click();
                                }}
                            >Download DXF/CAD</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
                {/* Sidebar Controls */}
                <aside className="glass" style={{ width: '400px', display: 'flex', flexDirection: 'column', borderTop: 'none', borderLeft: 'none' }}>
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                        <button
                            onClick={() => setActiveTab('prompt')}
                            style={{ flex: 1, padding: '15px', background: activeTab === 'prompt' ? 'var(--glass)' : 'transparent', border: 'none', color: activeTab === 'prompt' ? 'var(--primary)' : '#888', cursor: 'pointer', borderBottom: activeTab === 'prompt' ? '2px solid var(--primary)' : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Sparkles size={18} /> Design
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('style')}
                            style={{ flex: 1, padding: '15px', background: activeTab === 'style' ? 'var(--glass)' : 'transparent', border: 'none', color: activeTab === 'style' ? 'var(--primary)' : '#888', cursor: 'pointer', borderBottom: activeTab === 'style' ? '2px solid var(--primary)' : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Palette size={18} /> Materials
                            </div>
                        </button>
                    </div>

                    <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                        {activeTab === 'prompt' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: '#888' }}>Describe your dream home</label>
                                    <textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="e.g. A mid-century modern ranch house with 3 bedrooms and a flat roof..."
                                        style={{ width: '100%', height: '150px', resize: 'none' }}
                                    />
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        className="btn-primary"
                                        style={{ width: '100%', marginTop: '10px', justifyContent: 'center' }}>
                                        {isGenerating ? 'Analyzing Vision...' : <><Send size={18} /> Update Design</>}
                                    </button>
                                </div>

                                <div style={{ marginTop: '10px' }}>
                                    <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Derived Parameters</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <ParamInput label="Floors" value={params.floors} />
                                        <ParamInput label="Bedrooms" value={params.bedrooms} />
                                        <ParamInput label="Style" value={params.style} />
                                        <ParamInput label="Roof" value={params.roof} />
                                    </div>
                                </div>

                                {refinementHistory.length > 0 && (
                                    <div style={{ marginTop: '20px' }}>
                                        <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#888' }}>Refinement History</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {refinementHistory.map((h, i) => (
                                                <div key={i} className="glass" style={{ padding: '12px', fontSize: '0.8rem', borderRadius: '8px', opacity: 0.7 }}>
                                                    {h.length > 80 ? h.substring(0, 80) + '...' : h}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <DesignReviewer
                                    prompt={prompt}
                                    designId="current-design"
                                    onSave={handleFeedback}
                                />
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <h4 style={{ marginBottom: '15px' }}>Exterior Palette</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                                        <ColorOption color="#c4a484" active={houseColor === '#c4a484'} onClick={() => setHouseColor('#c4a484')} />
                                        <ColorOption color="#8b7355" active={houseColor === '#8b7355'} onClick={() => setHouseColor('#8b7355')} />
                                        <ColorOption color="#ffffff" active={houseColor === '#ffffff'} onClick={() => setHouseColor('#ffffff')} />
                                        <ColorOption color="#1a1a1a" active={houseColor === '#1a1a1a'} onClick={() => setHouseColor('#1a1a1a')} />
                                        <ColorOption color="#3a4f41" active={houseColor === '#3a4f41'} onClick={() => setHouseColor('#3a4f41')} />
                                    </div>
                                    <div style={{ marginTop: '15px' }}>
                                        <input type="color" value={houseColor} onChange={(e) => setHouseColor(e.target.value)} style={{ width: '100%', height: '40px', background: 'none', border: '1px solid var(--border)', cursor: 'pointer', borderRadius: '8px' }} />
                                    </div>
                                </div>

                                <div>
                                    <h4 style={{ marginBottom: '15px' }}>Roof Material</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                                        <ColorOption color="#1a1a1a" active={roofColor === '#1a1a1a'} onClick={() => setRoofColor('#1a1a1a')} />
                                        <ColorOption color="#4a4a4a" active={roofColor === '#4a4a4a'} onClick={() => setRoofColor('#4a4a4a')} />
                                        <ColorOption color="#2c3e50" active={roofColor === '#2c3e50'} onClick={() => setRoofColor('#2c3e50')} />
                                        <ColorOption color="#7f8c8d" active={roofColor === '#7f8c8d'} onClick={() => setRoofColor('#7f8c8d')} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="glass" style={{ padding: '20px', borderBottom: 'none', borderRight: 'none', borderLeft: 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: '#666' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isGenerating ? '#fbbf24' : '#4ade80' }} />
                            {isGenerating ? 'AI Architect Processing...' : 'AI Engine Ready • Premium Tier'}
                        </div>
                    </div>
                </aside>

                <main style={{ flex: 1, background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 5, display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setViewMode('3d')}
                            className={viewMode === '3d' ? 'btn-primary' : 'glass'}
                            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            3D Perspective
                        </button>
                        <button
                            onClick={() => setViewMode('2d')}
                            className={viewMode === '2d' ? 'btn-primary' : 'glass'}
                            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', color: viewMode === '2d' ? 'var(--primary-foreground)' : '#fff' }}>
                            2D Blueprints
                        </button>
                    </div>

                    {viewMode === '3d' ? (
                        <ThreeScene
                            houseColor={houseColor}
                            roofColor={roofColor}
                            floors={parseInt(params.floors) || 2}
                            roofStyle={params.roof}
                            isNight={isNight}
                            hasPool={hasPool}
                            hasSkylight={hasSkylight}
                            hasGarden={hasGarden}
                            style={params.style}
                        />
                    ) : (
                        <div style={{ width: '80%', maxWidth: '700px' }}>
                            <FloorPlan rooms={parseInt(params.bedrooms) || 3} />
                        </div>
                    )}

                    <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => setIsNight(!isNight)}
                            className="glass"
                            style={{ padding: '0 12px', height: '40px', borderRadius: '8px', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                            {isNight ? 'Night Mode' : 'Day Mode'}
                        </button>
                        <button className="glass" style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Maximize2 size={18} />
                        </button>
                        <button className="glass" style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Layers size={18} />
                        </button>
                        <button className="glass" style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid var(--border)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box size={18} />
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

function ParamInput({ label, value }: { label: string, value: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.9rem', color: '#888' }}>{label}</span>
            <span style={{ fontWeight: 600 }}>{value}</span>
        </div>
    );
}

function ColorOption({ color, active, onClick }: { color: string, active: boolean, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: color,
                cursor: 'pointer',
                border: active ? '2px solid var(--primary)' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
            }}>
            {active && <Check size={16} color={color === '#ffffff' ? '#000' : '#fff'} />}
        </div>
    );
}

export default function StudioPage() {
    return (
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#fff' }}>Loading Studio...</div>}>
            <StudioContent />
        </Suspense>
    );
}
