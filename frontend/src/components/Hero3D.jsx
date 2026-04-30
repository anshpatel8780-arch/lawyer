import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Torus, Icosahedron, Edges, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Advanced abstract geometric shape (Startup/Premium feel)
const AdvancedCore = () => {
    const meshRef = useRef();
    const innerRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
        if (innerRef.current) {
            innerRef.current.rotation.x = state.clock.elapsedTime * -0.3;
            innerRef.current.rotation.y = state.clock.elapsedTime * -0.4;

            // Pulsing effect
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            innerRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* Inner Glowing Core */}
                <mesh ref={innerRef}>
                    <Icosahedron args={[1.2, 0]}>
                        <meshStandardMaterial
                            color="#0b50da"
                            emissive="#0328a0"
                            emissiveIntensity={2}
                            roughness={0.1}
                            metalness={0.9}
                            transparent
                            opacity={0.9}
                        />
                    </Icosahedron>
                </mesh>

                {/* Outer Wireframe Cage */}
                <mesh>
                    <Icosahedron args={[1.6, 1]}>
                        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
                        <Edges threshold={15} color="#4d7cf4" />
                    </Icosahedron>
                </mesh>
            </Float>
        </group>
    );
};

// Orbital data rings
const DataRings = () => {
    const ringsRef = useRef();

    useFrame((state) => {
        if (ringsRef.current) {
            ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1;
            ringsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 + 1.2;
        }
    });

    return (
        <group ref={ringsRef}>
            <Torus args={[2.5, 0.005, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#4d7cf4" transparent opacity={0.4} />
            </Torus>
            <Torus args={[3.2, 0.008, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial color="#f2b90d" transparent opacity={0.3} />
            </Torus>
        </group>
    );
};

// Pre-generate particle positions to avoid impurity during render
const PARTICLE_COUNT = 150;
const PARTICLE_POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = 4 + Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    PARTICLE_POSITIONS[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    PARTICLE_POSITIONS[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    PARTICLE_POSITIONS[i * 3 + 2] = r * Math.cos(phi);
}

// Connecting Particles
const NeuralNetwork = () => {
    const ref = useRef();
    useFrame((state) => {
        if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={PARTICLE_POSITIONS} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#ffffff" size={0.03} transparent opacity={0.6} sizeAttenuation />
        </points>
    );
};


const Hero3D = () => {
    return (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ antialias: false, alpha: true }} // False antialias for postprocessing bloom
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.2} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-5, 0, -5]} intensity={2} color="#4d7cf4" />
                <pointLight position={[5, -3, 3]} intensity={1.5} color="#f2b90d" />

                <Stars radius={50} depth={50} count={3000} factor={4} saturation={0.8} fade speed={1} />
                <NeuralNetwork />

                <group position={[0, -0.5, 0]}>
                    <AdvancedCore />
                    <DataRings />
                </group>

                {/* Advanced Postprocessing */}
                <EffectComposer disableNormalPass multisampling={4}>
                    <Bloom
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        intensity={1.5}
                        mipmapBlur
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL} // Default
                        offset={[0.002, 0.002]}
                        radialModulation={false}
                        modulationOffset={0}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default Hero3D;
