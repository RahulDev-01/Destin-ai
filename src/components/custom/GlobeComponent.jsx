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

        // Generate flight route arcs with BRIGHTER, more visible colors
        const N = 20
        const arcs = [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 160,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 160,
            endLng: (Math.random() - 0.5) * 360,
            color: [
                ['rgba(168, 85, 247, 0.9)', 'rgba(236, 72, 153, 1)'],     // Bright Purple to Hot Pink
                ['rgba(236, 72, 153, 0.9)', 'rgba(251, 146, 60, 1)'],     // Hot Pink to Orange
                ['rgba(99, 102, 241, 0.9)', 'rgba(168, 85, 247, 1)'],     // Indigo to Purple
                ['rgba(147, 51, 234, 0.9)', 'rgba(219, 39, 119, 1)'],     // Deep Purple to Pink
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
            {/* Bright glow effect behind globe */}
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-[450px] h-[450px] rounded-full bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-orange-400/30 blur-3xl animate-pulse'></div>
            </div>

            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                // NO background - removed the dark starfield that made it hard to see

                // Animated flight route arcs - now BRIGHTER and more visible
                arcsData={arcsData}
                arcColor={'color'}
                arcDashLength={0.5}
                arcDashGap={0.2}
                arcDashAnimateTime={2500}
                arcStroke={1.2}  // Thicker for better visibility
                arcAltitudeAutoScale={0.35}

                // Bright destination points
                pointsData={pointsData}
                pointAltitude={0.01}
                pointRadius={0.2}  // Slightly larger
                pointColor={() => '#ff1493'}  // Bright deep pink
                pointLabel={(d) => `
                    <div style="
                        background: linear-gradient(135deg, rgba(147, 51, 234, 0.98), rgba(236, 72, 153, 0.98));
                        color: white;
                        padding: 10px 18px;
                        border-radius: 14px;
                        font-weight: bold;
                        font-size: 15px;
                        box-shadow: 0 10px 20px rgba(147, 51, 234, 0.4);
                        backdrop-filter: blur(12px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    ">
                        ✈️ ${d.city}
                    </div>
                `}

                // Brighter, more visible atmosphere
                atmosphereColor="rgba(168, 85, 247, 0.4)"  // Brighter purple
                atmosphereAltitude={0.2}

                // Settings
                width={600}
                height={600}
                animateIn={true}
            />
        </div>
    )
}

export default GlobeComponent
