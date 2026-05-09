'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Plus, Clock, LayoutGrid, List, Search, Settings, CreditCard, ChevronRight, LogOut } from 'lucide-react';

interface Design {
    id: string;
    title: string;
    created: string;
    thumbnail: string;
}

export default function Dashboard() {
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const designs: Design[] = [
        { id: '1', title: 'Modern Lakeside Villa', created: '20 mins ago', thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
        { id: '2', title: 'Cedar Ridge Retreat', created: '2 days ago', thumbnail: 'https://images.unsplash.com/photo-1600607687940-4e2a2269622e' },
        { id: '3', title: 'Minimalist Monochrome', created: 'Jan 15, 2026', thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e' },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', background: '#050505' }}>
            {/* Side Nav */}
            <aside className="glass" style={{ width: '260px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px', fontWeight: 'bold', fontSize: '1.25rem' }}>
                    <Home style={{ color: 'var(--primary)' }} />
                    <span>DreamHaven</span>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <NavLink active icon={<LayoutGrid size={18} />} label="Designs" />
                    <NavLink icon={<Clock size={18} />} label="Recent" />
                    <div style={{ height: '1px', background: 'var(--border)', margin: '16px 0' }} />
                    <NavLink icon={<CreditCard size={18} />} label="Subscription" />
                    <NavLink icon={<Settings size={18} />} label="Settings" />
                </nav>

                {/* User Profile Summary */}
                <div className="glass" style={{ padding: '16px', borderRadius: '12px', marginTop: 'auto' }}>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '8px' }}>Active Plan</div>
                    <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '12px' }}>Premium Tier</div>
                    <div style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '60%', height: '100%', background: 'var(--primary)' }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>18 / 30 Prompts</span>
                        <Link href="/#pricing" style={{ color: '#fff' }}>Upgrade</Link>
                    </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', color: '#ff4444', textDecoration: 'none', fontSize: '0.9rem' }}>
                        <LogOut size={18} />
                        <span>Log out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                <header style={{ padding: '32px 48px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Project Dashboard</h1>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage and organize your architectural visions.</p>
                    </div>
                    <Link href="/studio" className="btn-primary">
                        <Plus size={18} /> New Design
                    </Link>
                </header>

                <div style={{ padding: '48px' }}>
                    {/* Controls */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                            <input
                                type="text"
                                placeholder="Search designs..."
                                style={{ width: '100%', paddingLeft: '40px', fontSize: '0.9rem' }}
                            />
                        </div>
                        <div className="glass" style={{ display: 'flex', padding: '4px', borderRadius: '8px' }}>
                            <IconButton active={view === 'grid'} onClick={() => setView('grid')}><LayoutGrid size={18} /></IconButton>
                            <IconButton active={view === 'list'} onClick={() => setView('list')}><List size={18} /></IconButton>
                        </div>
                    </div>

                    {/* Design Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
                        gap: '24px'
                    }}>
                        {designs.map(design => (
                            <DesignCard key={design.id} design={design} view={view} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavLink({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            background: active ? 'var(--glass)' : 'transparent',
            color: active ? 'var(--primary)' : '#888',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}>
            {icon}
            <span style={{ fontWeight: active ? 600 : 400 }}>{label}</span>
        </div>
    );
}

function IconButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: '8px',
                borderRadius: '6px',
                background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                color: active ? '#fff' : '#666',
                cursor: 'pointer'
            }}>
            {children}
        </button>
    );
}

function DesignCard({ design, view }: { design: Design, view: 'grid' | 'list' }) {
    if (view === 'list') {
        return (
            <div className="glass" style={{ padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '80px', height: '60px', borderRadius: '8px', background: `url(${design.thumbnail}) center/cover` }} />
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '2px' }}>{design.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Created {design.created}</p>
                </div>
                <Link href="/studio" style={{ color: 'var(--primary)' }}><ChevronRight /></Link>
            </div>
        );
    }

    return (
        <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
            <div style={{ height: '200px', background: `url(${design.thumbnail}) center/cover` }} />
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{design.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>{design.created}</p>
                    </div>
                    <div className="glass" style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', border: '1px solid rgba(196, 164, 132, 0.3)', color: 'var(--primary)' }}>
                        PRO
                    </div>
                </div>
                <Link href="/studio" className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}>
                    Open Studio
                </Link>
            </div>
        </div>
    );
}
