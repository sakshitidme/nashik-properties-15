import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import { NASHIK_LOCATIONS } from '../../data/mockData';
import { MapPin, ArrowUpRight, TrendingUp, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Spatial coordinates mapping for Nashik Localities in 3D Space
const LOCATION_NODES_3D = [
  { id: 'gangapur-road', x: -2.5, z: -1.5, y: 0.2 },
  { id: 'college-road', x: -1.2, z: -0.8, y: 0.2 },
  { id: 'govind-nagar', x: 0.2, z: 0.2, y: 0.2 },
  { id: 'indira-nagar', x: 1.5, z: 0.8, y: 0.2 },
  { id: 'cidco', x: 0.5, z: 1.8, y: 0.2 },
  { id: 'satpur', x: -3.2, z: 1.2, y: 0.2 },
  { id: 'panchavati', x: 1.8, z: -2.2, y: 0.2 },
  { id: 'nashik-road', x: 3.2, z: 1.5, y: 0.2 },
  { id: 'pathardi', x: 2.2, z: 2.4, y: 0.2 },
  { id: 'makhmalabad', x: -1.8, z: -3.0, y: 0.2 },
  { id: 'trimbak-road', x: -4.5, z: 0.5, y: 0.2 }
];

const MapPin3DNode = ({ locationData, nodePos, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[nodePos.x, nodePos.y, nodePos.z]}>
      {/* Vertical Laser Beam Ring */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
        <meshStandardMaterial
          color={hovered || isSelected ? '#f3d068' : '#d4af37'}
          emissive="#d4af37"
          emissiveIntensity={hovered || isSelected ? 2 : 0.8}
        />
      </mesh>

      {/* Pulsing Beacon Base */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.35, 32]} />
        <meshBasicMaterial
          color={hovered || isSelected ? '#e6c667' : '#d4af37'}
          side={2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Floating Interactive 3D Sphere Marker */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          position={[0, 1.0, 0]}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => { e.stopPropagation(); onSelect(locationData); }}
        >
          <sphereGeometry args={[hovered || isSelected ? 0.35 : 0.25, 32, 32]} />
          <meshStandardMaterial
            color={hovered || isSelected ? '#ffffff' : '#d4af37'}
            metalness={0.9}
            roughness={0.1}
            emissive={hovered || isSelected ? '#ffe89c' : '#8c6b0a'}
            emissiveIntensity={1}
          />
        </mesh>
      </Float>

      {/* HTML Overlay Tooltip Marker */}
      <Html position={[0, 1.6, 0]} center distanceFactor={12}>
        <button
          onClick={() => onSelect(locationData)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 shadow-xl border cursor-pointer ${
            isSelected || hovered
              ? 'bg-amber-400 text-black border-white scale-110 shadow-amber-500/30'
              : 'bg-slate-900/90 text-amber-300 border-amber-500/30 hover:border-amber-400 hover:scale-105 backdrop-blur-md'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
          <span>{locationData.name}</span>
          <span className="bg-amber-500/20 px-1.5 py-0.5 rounded text-[10px] text-amber-200">
            {locationData.propertiesCount}
          </span>
        </button>
      </Html>
    </group>
  );
};

export const NashikMap3D = ({ onLocationClick }) => {
  const navigate = useNavigate();
  const [activeLoc, setActiveLoc] = useState(NASHIK_LOCATIONS[0]);

  const handleSelect = (loc) => {
    setActiveLoc(loc);
    if (onLocationClick) onLocationClick(loc);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* 3D Map Canvas Container */}
      <div className="lg:col-span-8 h-[500px] sm:h-[550px] relative rounded-3xl overflow-hidden glass-panel-gold border border-amber-500/20 shadow-2xl">
        {/* Canvas Header & Instructions */}
        <div className="absolute top-4 left-4 z-10 glass-panel px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-white/10 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive 3D Grid • Drag to rotate, scroll to zoom</span>
        </div>

        <Canvas gl={{ antialias: true }} camera={{ position: [0, 6, 8], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 20, 15]} intensity={1.2} />
          <pointLight position={[0, 5, 0]} intensity={1.5} color="#d4af37" />

          {/* 3D Topographic Terrain Grid Plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[14, 12, 32, 32]} />
            <meshStandardMaterial
              color="#0d131f"
              wireframe={true}
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Glowing Godavari River Curve Representation */}
          <mesh rotation={[-Math.PI / 2, 0, -0.4]} position={[-0.5, 0.05, -0.5]}>
            <planeGeometry args={[12, 0.4]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
          </mesh>

          {/* Render 3D Location Markers */}
          {NASHIK_LOCATIONS.map((loc) => {
            const pos = LOCATION_NODES_3D.find((n) => n.id === loc.id) || { x: 0, y: 0.2, z: 0 };
            return (
              <MapPin3DNode
                key={loc.id}
                locationData={loc}
                nodePos={pos}
                isSelected={activeLoc?.id === loc.id}
                onSelect={handleSelect}
              />
            );
          })}

          <OrbitControls
            enableZoom={true}
            maxDistance={14}
            minDistance={4}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </div>

      {/* Selected Location Details Card Panel */}
      <div className="lg:col-span-4 h-full flex flex-col justify-center">
        {activeLoc && (
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />

            <div className="relative z-10 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Nashik Prime Locality</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {activeLoc.name}
                </h3>
                <p className="text-xs text-amber-200/80 mt-1 font-medium">{activeLoc.tagline}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="glass-panel p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[11px] text-slate-400 block">Available Listings</span>
                  <span className="text-xl font-bold text-white font-mono">
                    {activeLoc.propertiesCount} <span className="text-xs font-normal text-amber-400">Units</span>
                  </span>
                </div>

                <div className="glass-panel p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[11px] text-slate-400 block">Starting Price</span>
                  <span className="text-xl font-bold text-amber-300 font-mono">
                    {activeLoc.startingPrice}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Avg. Price / sq.ft:</span>
                  <span className="font-semibold text-white">{activeLoc.avgPricePerSqft}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Annual Growth:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {activeLoc.priceGrowth}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {activeLoc.description}
              </p>

              <button
                onClick={() => navigate(`/location/${activeLoc.slug}`)}
                className="w-full py-3.5 px-6 rounded-2xl gold-gradient-bg text-black font-bold text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <span>Explore {activeLoc.name} Properties</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
