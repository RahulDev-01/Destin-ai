import React, { useRef, useEffect, useState } from 'react'
import Globe from 'react-globe.gl'

function GlobeComponent() {
    const globeEl = useRef()
    const [arcsData, setArcsData] = useState([])
    const [pointsData, setPointsData] = useState([])

    useEffect(() => {
        // Popular travel destinations
        const destinations = [
            { lat: 48.8566, lng: 2.3522, city: 'Paris', size: 0.8 },
            { lat: 51.5074, lng: -0.1278, city: 'London', size: 0.7 },
            { lat: 40.7128, lng: -74.0060, city: 'New York', size: 0.9 },
            { lat: 35.6762, lng: 139.6503, city: 'Tokyo', size: 0.8 },
            { lat: -33.8688, lng: 151.2093, city: 'Sydney', size: 0.6 },
            { lat: 25.2048, lng: 55.2708, city: 'Dubai', size: 0.7 },
            { lat: 1.3521, lng: 103.8198, city: 'Singapore', size: 0.6 },
            { lat: -22.9068, lng: -43.1729, city: 'Rio', size: 0.5 },
            { lat: 41.9028, lng: 12.4964, city: 'Rome', size: 0.6 },
            { lat: 19.4326, lng: -99.1332, city: 'Mexico City', size: 0.5 },
            { lat: 13.7563, lng: 100.5018, city: 'Bangkok', size: 0.6 },
            { lat: 37.5665, lng: 126.978, city: 'Seoul', size: 0.6 },
        ]
        setPointsData(destinations)

        // Generate flight route arcs with gradient colors
        const N = 25
        const arcs = [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 160,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 160,
            endLng: (Math.random() - 0.5) * 360,
            color: [
                ['rgba(147, 51, 234, 0.6)', 'rgba(236, 72, 153, 0.8)'],  // Purple to Pink
                ['rgba(99, 102, 241, 0.6)', 'rgba(168, 85, 247, 0.8)'],  // Indigo to Purple
                ['rgba(236, 72, 153, 0.6)', 'rgba(251, 146, 60, 0.8)'],  // Pink to Orange
                ['rgba(168, 85, 247, 0.6)', 'rgba(147, 51, 234, 0.8)'],  // Purple variants
            ][Math.round(Math.random() * 3)]
        }))
        setArcsData(arcs)

        // Enhanced auto-rotate with smoother settings
        const timer = setTimeout(() => {
            if (globeEl.current && globeEl.current.controls) {
                globeEl.current.controls().autoRotate = true
                globeEl.current.controls().autoRotateSpeed = 0.8
                globeEl.current.controls().enableZoom = false
                globeEl.current.controls().enablePan = false
                globeEl.current.controls().rotateSpeed = 0.5
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='w-full h-full flex items-center justify-center relative'>
            {/* Glow effect behind globe */}
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-3xl animate-pulse'></div>
            </div>

            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

                // Animated flight route arcs
                arcsData={arcsData}
                arcColor={'color'}
                arcDashLength={0.6}
                arcDashGap={0.3}
                arcDashAnimateTime={3000}
                arcStroke={0.8}
                arcAltitudeAutoScale={0.3}

                // Destination points
                pointsData={pointsData}
                pointAltitude={0.01}
                pointRadius={0.15}
                pointColor={() => '#ec4899'}
                pointLabel={(d) => `
                    <div style="
                        background: linear-gradient(135deg, rgba(147, 51, 234, 0.95), rgba(236, 72, 153, 0.95));
                        color: white;
                        padding: 8px 16px;
                        border-radius: 12px;
                        font-weight: bold;
                        font-size: 14px;
                        box-shadow: 0 8px 16px rgba(0,0,0,0.3);
                        backdrop-filter: blur(10px);
                    ">
                        ✈️ ${d.city}
                    </div>
                `}

                // Enhanced atmosphere with gradient
                atmosphereColor="rgba(147, 51, 234, 0.7)"
                atmosphereAltitude={0.25}

                // Settings
                width={600}
                height={600}
                animateIn={true}
            />
        </div>
    )
}

export default GlobeComponent
