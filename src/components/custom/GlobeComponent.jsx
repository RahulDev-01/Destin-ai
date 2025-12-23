import React, { useRef, useEffect, useState } from 'react'
import Globe from 'react-globe.gl'

function GlobeComponent() {
    const globeEl = useRef()
    const [arcsData, setArcsData] = useState([])

    useEffect(() => {
        // Generate bright, visible arcs
        const N = 30
        const arcs = [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: [
                ['#00FFFF', '#00D4FF'],  // Bright Cyan to Blue
                ['#00D4FF', '#00FFC8'],  // Blue to Teal
                ['#00FFC8', '#00FFE5'],  // Teal to Aqua
                ['#00E5FF', '#00FFFF'],  // Light Blue to Cyan
            ][Math.round(Math.random() * 3)]
        }))
        setArcsData(arcs)

        // Auto-rotate
        const timer = setTimeout(() => {
            if (globeEl.current && globeEl.current.controls) {
                globeEl.current.controls().autoRotate = true
                globeEl.current.controls().autoRotateSpeed = 1.0
                globeEl.current.controls().enableZoom = false
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing'>
            {/* Bright cyan glow */}
            <div className='absolute inset-0 flex items-center justify-center'>
                <div className='w-[600px] h-[600px] rounded-full bg-cyan-400/20 blur-3xl animate-pulse'></div>
            </div>

            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                // Bright cyan/blue arcs
                arcsData={arcsData}
                arcColor={'color'}
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={3000}
                arcStroke={1.0}
                arcAltitudeAutoScale={0.3}

                // Bright cyan atmosphere
                atmosphereColor="#00FFFF"
                atmosphereAltitude={0.2}

                // Settings
                backgroundColor="rgba(0,0,0,0)"
                width={globeEl.current?.parentElement?.clientWidth || 700}
                height={globeEl.current?.parentElement?.clientHeight || 700}
                animateIn={true}
            />
        </div>
    )
}

export default GlobeComponent
