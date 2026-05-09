'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float, Sky, Stars, BakeShadows } from '@react-three/drei';
import { Suspense } from 'react';

function House({
    color,
    roof,
    floors,
    roofStyle,
    isNight,
    hasPool,
    hasSkylight,
    hasGarden,
    style
}: {
    color: string,
    roof: string,
    floors: number,
    roofStyle: string,
    isNight: boolean,
    hasPool: boolean,
    hasSkylight: boolean,
    hasGarden: boolean,
    style?: string
}) {
    const floorHeight = 3;
    const totalHeight = floors * floorHeight;
    const width = 6;
    const depth = 4;

    const currentStyle = style || 'Modernist';

    return (
        <group>
            {/* Foundation Plinth */}
            <mesh position={[0, -0.1, 0]} receiveShadow>
                <boxGeometry args={[width + 1, 0.4, depth + 1]} />
                <meshStandardMaterial color="#444" roughness={0.9} />
            </mesh>

            {/* Render different geometry based on the architectural style */}
            {currentStyle === 'Modernist' && (
                <ModernistHouse color={color} roof={roof} floors={floors} floorHeight={floorHeight} hasSkylight={hasSkylight} isNight={isNight} width={width} depth={depth} />
            )}

            {currentStyle === 'Mid-century' && (
                <MidCenturyHouse color={color} roof={roof} floors={floors} floorHeight={floorHeight} hasSkylight={hasSkylight} isNight={isNight} width={width} depth={depth} />
            )}

            {currentStyle === 'Traditional' && (
                <TraditionalHouse color={color} roof={roof} floors={floors} floorHeight={floorHeight} roofStyle={roofStyle} hasSkylight={hasSkylight} isNight={isNight} width={width} depth={depth} />
            )}

            {/* Shared Environment Features */}
            {hasGarden && <GardenFeatures width={width} depth={depth} />}

            {hasPool && (
                <group position={[width + 2, -0.4, 0]}>
                    <mesh receiveShadow>
                        <boxGeometry args={[6, 0.8, 8]} />
                        <meshStandardMaterial color="#222" />
                    </mesh>
                    <mesh position={[0, 0.41, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[5.6, 7.6]} />
                        <meshPhysicalMaterial color="#00ffff" transmission={0.6} roughness={0.1} />
                    </mesh>
                </group>
            )}

            {/* Entry Path */}
            <mesh position={[0, 0.01, depth / 2 + 2]} receiveShadow>
                <boxGeometry args={[2, 0.05, 4]} />
                <meshStandardMaterial color="#555" roughness={0.9} />
            </mesh>

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
                <circleGeometry args={[25, 64]} />
                <meshStandardMaterial color="#0b100d" roughness={1} />
            </mesh>

            {/* Lighting */}
            <pointLight position={[1.5, totalHeight / 2, 0]} intensity={isNight ? 5 : 0.5} color="#ffcc88" distance={15} decay={2} castShadow />
            {isNight && <pointLight position={[-1.5, totalHeight - 1, 0]} intensity={2} color="#ffffff" distance={10} />}
        </group>
    );
}

// Ensure the main entry passes the style
export default function ThreeScene({
    houseColor = '#c4a484',
    roofColor = '#1a1a1a',
    floors = 2,
    style = 'Modernist',
    roofStyle = 'Gabled',
    isNight = true,
    hasPool = false,
    hasSkylight = false,
    hasGarden = false
}: {
    houseColor?: string,
    roofColor?: string,
    floors?: number,
    style?: string,
    roofStyle?: string,
    isNight?: boolean,
    hasPool?: boolean,
    hasSkylight?: boolean,
    hasGarden?: boolean
}) {
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', background: isNight ? '#050505' : '#87ceeb' }}>
            <Canvas shadows gl={{ antialias: true, stencil: false, depth: true }}>
                <fog attach="fog" args={[isNight ? '#050505' : '#87ceeb', 30, 100]} />
                <PerspectiveCamera makeDefault position={[15, 12, 15]} />
                <OrbitControls makeDefault enableDamping dampingFactor={0.05} minDistance={5} maxDistance={60} />

                <ambientLight intensity={isNight ? 0.2 : 0.8} />
                <directionalLight
                    position={[10, 20, 10]}
                    intensity={isNight ? 0.4 : 1.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />

                {isNight ? (
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                ) : (
                    <Sky distance={450000} sunPosition={[10, 20, 10]} inclination={0} azimuth={0.25} />
                )}

                <Suspense fallback={null}>
                    <BakeShadows />
                    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                        <House
                            color={houseColor}
                            roof={roofColor}
                            floors={floors}
                            roofStyle={roofStyle}
                            isNight={isNight}
                            hasPool={hasPool}
                            hasSkylight={hasSkylight}
                            hasGarden={hasGarden}
                            style={style}
                        />
                    </Float>
                    <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={30} blur={2.5} far={4.5} />
                </Suspense>
            </Canvas>
            <div style={{ position: 'absolute', top: '20px', left: '20px', color: '#fff', opacity: 0.5 }}>
                Real-time 3D Preview: {style}
            </div>
        </div>
    );
}

function Window({ position, args }: { position: [number, number, number], args: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Glass */}
            <mesh>
                <boxGeometry args={args} />
                <meshPhysicalMaterial color="#ffffff" transmission={0.9} thickness={0.5} roughness={0.1} transparent opacity={0.4} />
            </mesh>
            {/* Frame */}
            <mesh position={[0, 0, (args[2] / 2) + 0.01]}>
                <boxGeometry args={[args[0] + 0.1, args[1] + 0.1, 0.05]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0, 0, (args[2] / 2) + 0.02]}>
                <boxGeometry args={[args[0] - 0.1, args[1] - 0.1, 0.06]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    );
}

interface HouseProps {
    color: string;
    roof: string;
    floors: number;
    floorHeight: number;
    width: number;
    depth: number;
    isNight: boolean;
    hasSkylight?: boolean;
    roofStyle?: string;
}

function ModernistHouse({ color, roof, floors, floorHeight, width, depth }: HouseProps) {
    const totalHeight = floors * floorHeight;
    return (
        <group>
            {/* Massive Concrete Volume */}
            <mesh position={[-width / 4, totalHeight / 2, 0]} castShadow>
                <boxGeometry args={[width / 2, totalHeight, depth]} />
                <meshStandardMaterial color={color} roughness={0.8} />
            </mesh>

            {/* Intersecting Glass Volume */}
            <mesh position={[width / 4, totalHeight / 2 + 0.5, 0.5]} castShadow>
                <boxGeometry args={[width / 2 + 1, totalHeight - 1, depth]} />
                <meshPhysicalMaterial color="#ffffff" transmission={0.95} thickness={0.5} roughness={0} metalness={0.2} transparent opacity={0.3} />
            </mesh>

            {/* Thick Flat Roof / Overhang */}
            <mesh position={[0, totalHeight + 0.2, 0.2]} castShadow>
                <boxGeometry args={[width + 1.5, 0.4, depth + 1.5]} />
                <meshStandardMaterial color={roof} roughness={0.9} />
            </mesh>

            {/* Front Door */}
            <mesh position={[-width / 4, 1.2, depth / 2 + 0.01]}>
                <boxGeometry args={[1.2, 2.4, 0.1]} />
                <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
}

function MidCenturyHouse({ color, roof, floors, floorHeight, width, depth }: HouseProps) {
    const adjustedFloors = Math.min(floors, 2); // Mid-century usually 1 or 2
    const totalHeight = adjustedFloors * floorHeight;
    return (
        <group>
            {/* Main Long Volume */}
            <mesh position={[0, totalHeight / 2, 0]} castShadow>
                <boxGeometry args={[width * 1.5, totalHeight, depth]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>

            {/* Wood Slatted Accent Wall */}
            <mesh position={[-width / 2, totalHeight / 2, depth / 2 + 0.02]}>
                <boxGeometry args={[2, totalHeight, 0.1]} />
                <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
            </mesh>

            {/* Large Horizontal Windows */}
            <Window position={[width * 0.3, totalHeight / 2, depth / 2]} args={[width * 0.6, totalHeight * 0.6, 0.2]} />

            {/* Asymmetrical Low-Pitch Roof */}
            <group position={[0, totalHeight, 0]}>
                <mesh position={[-width * 0.3, 0.5, 0]} rotation={[0, 0, Math.PI / 16]} castShadow>
                    <boxGeometry args={[width * 1.2, 0.2, depth + 1.5]} />
                    <meshStandardMaterial color={roof} roughness={0.8} />
                </mesh>
                <mesh position={[width * 0.5, 0.2, 0]} rotation={[0, 0, -Math.PI / 24]} castShadow>
                    <boxGeometry args={[width, 0.2, depth + 1.5]} />
                    <meshStandardMaterial color={roof} roughness={0.8} />
                </mesh>
            </group>

            {/* Front Door */}
            <mesh position={[-width / 4, 1.2, depth / 2 + 0.01]}>
                <boxGeometry args={[1.5, 2.4, 0.1]} />
                <meshStandardMaterial color="#cd853f" roughness={0.6} /> {/* Orange-tinted wood */}
            </mesh>
        </group>
    );
}

function TraditionalHouse({ color, roof, floors, floorHeight, width, depth }: HouseProps) {
    const totalHeight = floors * floorHeight;
    return (
        <group>
            {/* Main Symmetrical Volume */}
            <mesh position={[0, totalHeight / 2, 0]} castShadow>
                <boxGeometry args={[width, totalHeight, depth]} />
                <meshStandardMaterial color={color} roughness={0.9} />
            </mesh>

            {/* Punched Windows */}
            <Window position={[-width * 0.25, floorHeight / 2, depth / 2]} args={[1, 1.5, 0.2]} />
            <Window position={[width * 0.25, floorHeight / 2, depth / 2]} args={[1, 1.5, 0.2]} />

            {floors > 1 && (
                <>
                    <Window position={[-width * 0.25, floorHeight * 1.5, depth / 2]} args={[1, 1.5, 0.2]} />
                    <Window position={[width * 0.25, floorHeight * 1.5, depth / 2]} args={[1, 1.5, 0.2]} />
                </>
            )}

            {/* Symmetrical Gabled Roof */}
            <group position={[0, totalHeight, 0]}>
                {/* Roof Triangle Base */}
                <mesh position={[0, heightForRoof(width) / 2, 0]}>
                    <PrismGeometry args={[width, heightForRoof(width), depth]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                {/* Slanted Roof Panels */}
                <mesh position={[-width / 4, heightForRoof(width) / 2 + 0.1, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
                    <boxGeometry args={[width * 0.8, 0.1, depth + 1]} />
                    <meshStandardMaterial color={roof} roughness={0.9} />
                </mesh>
                <mesh position={[width / 4, heightForRoof(width) / 2 + 0.1, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
                    <boxGeometry args={[width * 0.8, 0.1, depth + 1]} />
                    <meshStandardMaterial color={roof} roughness={0.9} />
                </mesh>
            </group>

            {/* Front Door */}
            <mesh position={[0, 1.2, depth / 2 + 0.01]}>
                <boxGeometry args={[1.2, 2.4, 0.2]} />
                <meshStandardMaterial color="#6b2c2c" roughness={0.7} />
            </mesh>
        </group>
    );
}

function heightForRoof(width: number) {
    return width * 0.5; // simple 45 degree pitch equivalent
}

// Add custom geometry builder for prism
function PrismGeometry(props: { args: [number, number, number] }) {
    // Basic wrapper, actual three.js needs shape extrusion for a true prism. 
    // Simulating the gable ends with a box for now as standard geometries don't have triangular prisms out of the box without ShapeGeometry.
    return <boxGeometry args={[props.args[0] * 0.9, props.args[1] * 0.9, props.args[2] - 0.1]} />;
}


function GardenFeatures({ width, depth }: { width: number, depth: number }) {
    return (
        <group position={[0, 0, 0]}>
            {/* Tree 1 */}
            <Tree position={[-width - 2, 0, depth]} />
            {/* Tree 2 */}
            <Tree position={[width + 3, 0, -depth]} scale={1.2} />
            {/* Bushes */}
            <mesh position={[-width / 2 + 1, 0.5, depth / 2 + 1]} castShadow>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#1a2e1a" />
            </mesh>
            <mesh position={[-width / 2 + 2, 0.4, depth / 2 + 1]} castShadow>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color="#2d5a27" />
            </mesh>
        </group>
    );
}

function Tree({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    return (
        <group position={position} scale={[scale, scale, scale]}>
            {/* Trunk */}
            <mesh position={[0, 1.5, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.3, 3, 8]} />
                <meshStandardMaterial color="#3d2817" />
            </mesh>
            {/* Canopy Layers */}
            <mesh position={[0, 3, 0]} castShadow>
                <sphereGeometry args={[1.5, 16, 16]} />
                <meshStandardMaterial color="#2d5a27" />
            </mesh>
            <mesh position={[0.5, 4, 0.5]} castShadow>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial color="#1a2e1a" />
            </mesh>
            <mesh position={[-0.5, 3.5, -0.5]} castShadow>
                <sphereGeometry args={[1.3, 16, 16]} />
                <meshStandardMaterial color="#3a6632" />
            </mesh>
        </group>
    );
}
