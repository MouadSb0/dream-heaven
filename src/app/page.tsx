'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Sparkles, Box, Play, Palette, Layout, Download, ChevronRight, Check } from 'lucide-react';

export default function LandingPage() {
  const [showAuth, setShowAuth] = React.useState(false);

  return (
    <div className="landing-wrapper">
      <div className="hero-gradient" />

      {/* Auth Modal */}
      {showAuth && (
        <div className="glass" style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)' }}>
          <div className="glass" style={{ width: '400px', padding: '40px', borderRadius: '24px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '12px' }}>Welcome Back</h2>
            <p style={{ color: '#888', marginBottom: '32px' }}>Sign in to access your dashboard and designs.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#666', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input type="email" placeholder="name@example.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#666', display: 'block', marginBottom: '4px' }}>Password</label>
                <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)' }} />
              </div>
              <Link href="/dashboard" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>
                Sign In
              </Link>
              <button className="btn-outline" style={{ border: 'none' }} onClick={() => setShowAuth(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderTop: 'none' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem' }}>
            <Home className="text-primary" style={{ color: 'var(--primary)' }} />
            <span>DreamHaven</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <button onClick={() => setShowAuth(true)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Sign In</button>
            <Link href="/client-questionnaire" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '100px', textAlign: 'center' }}>
        <div className="container">
          <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
              Transform Your <span style={{ color: 'var(--primary)' }}>Dream Home</span> into Reality
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#888', marginBottom: '2.5rem' }}>
              Describe your vision, pick your palette, and let our AI architect generate floor plans,
              3D models, and cinematic walkthroughs in minutes.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <Link href="/client-questionnaire" className="btn-primary">
                Start Consultation <ChevronRight size={20} />
              </Link>
              <Link href="/studio" className="btn-outline">
                Direct to Studio
              </Link>
            </div>
          </div>

          {/* Hero Visual Block */}
          <div className="glass fade-in" style={{
            marginTop: '60px',
            height: '500px',
            borderRadius: '24px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url("/hero-placeholder.jpg") center/cover'
          }}>
            <div style={{ position: 'absolute', bottom: '40px', left: '40px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Modern Lakeside Villa</h3>
              <p style={{ color: '#aaa' }}>Generated in 45 seconds</p>
            </div>
            <div className="glass" style={{ width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Play fill="white" size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '100px 0', background: 'var(--secondary)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Architectural Excellence, Automated</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <FeatureCard
              icon={<Sparkles />}
              title="AI Prompt Interpretation"
              desc="Our advanced LLM understands everything from style preferences to specific room requirements."
            />
            <FeatureCard
              icon={<Layout />}
              title="2D Floor Plans"
              desc="Professional blueprints with precise dimensions, room labels, and optimized furniture layouts."
            />
            <FeatureCard
              icon={<Box />}
              title="Interactive 3D Models"
              desc="Explore your design in real-time. Walk through rooms and view exteriors from any angle."
            />
            <FeatureCard
              icon={<Palette />}
              title="Custom Color Palettes"
              desc="Apply hex codes or curated themes to instantly update materials, walls, and cabinetry."
            />
            <FeatureCard
              icon={<Play />}
              title="Cinematic Walkthroughs"
              desc="Generate high-fidelity 4K video tours that showcase your dream home in motion."
            />
            <FeatureCard
              icon={<Download />}
              title="Professional Exports"
              desc="Export to GLTF, OBJ, FBX, or PDF. Get a complete materials list for cost estimation."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>Choose Your Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <PricingCard
              name="Basic"
              price="$0"
              prompts="3 Prompts/mo"
              features={["Low-res 3D preview", "No video generation", "Standard exports", "Community support"]}
            />
            <PricingCard
              name="Premium"
              price="$10"
              highlight
              prompts="30 Prompts/mo"
              features={["Medium-res 3D preview", "2 Videos per month", "Priority processing", "Email support", "Cloud saving"]}
            />
            <PricingCard
              name="Super"
              price="$30"
              prompts="100 Prompts/mo"
              features={["High-res 3D preview", "10 Videos per month", "High quality renders", "Chat support", "Early access"]}
            />
            <PricingCard
              name="Extra"
              price="$50"
              prompts="Unlimited"
              features={["Highest-res preview", "Unlimited videos", "Commercial license", "API access", "Dedicated manager"]}
            />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" style={{ padding: '100px 0', background: 'black' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem' }}>User Showcase</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            <ShowcaseCard
              image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              title="The Glass Pavilion"
              location="Aitutaki, Cook Islands"
            />
            <ShowcaseCard
              image="https://images.unsplash.com/photo-1600607687940-4e2a2269622e"
              title="Cedar Ridge Retreat"
              location="Aspen, Colorado"
            />
            <ShowcaseCard
              image="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e"
              title="Minimalist Monochrome"
              location="Tokyo, Japan"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', color: '#666' }}>
          <p>&copy; 2026 DreamHaven Architect AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass" style={{ padding: '30px', borderRadius: '16px' }}>
      <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
        {icon}
      </div>
      <h3 style={{ marginBottom: '0.8rem' }}>{title}</h3>
      <p style={{ color: '#888' }}>{desc}</p>
    </div>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  prompts: string;
  features: string[];
  highlight?: boolean;
}

function PricingCard({ name, price, prompts, features, highlight = false }: PricingCardProps) {
  return (
    <div className="glass" style={{
      padding: '40px',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      border: highlight ? '2px solid var(--primary)' : '1px solid var(--border)',
      transform: highlight ? 'scale(1.05)' : 'none',
      zIndex: highlight ? 1 : 0,
      background: highlight ? 'rgba(196, 164, 132, 0.05)' : 'var(--glass)'
    }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{name}</h3>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>{price}</div>
      <p style={{ color: highlight ? 'var(--primary)' : '#888', marginBottom: '2rem' }}>{prompts}</p>

      <ul style={{ listStyle: 'none', marginBottom: '2.5rem', flex: 1 }}>
        {features.map((f: string, i: number) => (
          <li key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem', color: '#ccc' }}>
            <Check size={18} style={{ color: 'var(--primary)' }} /> {f}
          </li>
        ))}
      </ul>

      <button className={highlight ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', justifyContent: 'center' }}>
        Get Started
      </button>
    </div>
  );
}

function ShowcaseCard({ image, title, location }: { image: string, title: string, location: string }) {
  return (
    <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
      <div style={{ height: '240px', background: `url(${image}) center/cover` }} />
      <div style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '0.4rem' }}>{title}</h3>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>{location}</p>
      </div>
    </div>
  );
}
