'use client';

export default function FloorPlan({ rooms = 3 }: { rooms?: number }) {
    const isSmall = rooms <= 2;
    const isLarge = rooms >= 4;

    return (
        <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', color: '#000', width: '100%', aspectRatio: '1/1', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                {/* Exterior Walls */}
                <rect x="10" y="10" width="80" height="80" fill="none" stroke="#222" strokeWidth="2" />

                {/* Main Shared Wall */}
                <line x1="10" y1="40" x2="90" y2="40" stroke="#444" strokeWidth="1.5" />

                {/* Room Layouts */}
                {isSmall ? (
                    <>
                        <line x1="50" y1="40" x2="50" y2="90" stroke="#444" strokeWidth="1" />
                        <text x="25" y="28" fontSize="4" fontWeight="bold">Living Area</text>
                        <text x="60" y="28" fontSize="4" fontWeight="bold">Kitchen/Dining</text>
                        <text x="25" y="65" fontSize="4" fontWeight="bold">Master Suite</text>
                        <text x="65" y="65" fontSize="4" fontWeight="bold">Bath/Storage</text>
                    </>
                ) : isLarge ? (
                    <>
                        <line x1="40" y1="40" x2="40" y2="90" stroke="#444" strokeWidth="1" />
                        <line x1="40" y1="65" x2="10" y2="65" stroke="#444" strokeWidth="1" />
                        <line x1="65" y1="10" x2="65" y2="40" stroke="#444" strokeWidth="1" />
                        <line x1="65" y1="40" x2="65" y2="90" stroke="#444" strokeWidth="1" />

                        <text x="25" y="25" fontSize="3.5" fontWeight="bold">Great Room</text>
                        <text x="70" y="25" fontSize="3.5" fontWeight="bold">Gourmet Kitchen</text>
                        <text x="18" y="55" fontSize="3" fontWeight="bold">Bedroom 1</text>
                        <text x="18" y="80" fontSize="3" fontWeight="bold">Bedroom 2</text>
                        <text x="45" y="65" fontSize="4" fontWeight="bold">Master Suite</text>
                        <text x="70" y="65" fontSize="3.5" fontWeight="bold">Study</text>
                    </>
                ) : (
                    <>
                        <line x1="50" y1="10" x2="50" y2="90" stroke="#444" strokeWidth="1" />
                        <line x1="50" y1="65" x2="90" y2="65" stroke="#444" strokeWidth="1" />

                        <text x="25" y="25" fontSize="4" fontWeight="bold">Living Room</text>
                        <text x="65" y="25" fontSize="4" fontWeight="bold">Kitchen/Dining</text>
                        <text x="25" y="65" fontSize="4" fontWeight="bold">Master Suite</text>
                        <text x="65" y="52" fontSize="3.5" fontWeight="bold">Bedroom 1</text>
                        <text x="65" y="80" fontSize="3.5" fontWeight="bold">Bedroom 2</text>
                    </>
                )}

                {/* Details */}
                <rect x="15" y="15" width="12" height="6" fill="#f0f0f0" stroke="#ccc" strokeWidth="0.5" /> {/* Sofa */}
                <circle cx="75" cy="18" r="4" fill="#fcfcfc" stroke="#ccc" strokeWidth="0.5" /> {/* Table */}

                {/* Doors */}
                <line x1="10" y1="25" x2="10" y2="32" stroke="#fff" strokeWidth="2.5" /> {/* Entrance */}
                <line x1="45" y1="40" x2="55" y2="40" stroke="#fff" strokeWidth="2" /> {/* Int Door */}
            </svg>
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', fontSize: '10px', textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold' }}>VERSION {rooms}.0 | AI GENERATED</div>
                <div style={{ opacity: 0.6 }}>{rooms} BEDROOM ARCHITECTURE</div>
            </div>
        </div>
    );
}
