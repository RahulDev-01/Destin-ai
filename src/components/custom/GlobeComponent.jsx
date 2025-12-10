import React, { useRef, useEffect, useState } from 'react'
import Globe from 'react-globe.gl'

function GlobeComponent() {
    const globeEl = useRef()
    const [arcsData, setArcsData] = useState([])

    useEffect(() => {
        // Generate random arcs for orbital effect
        const N = 20
        const arcs = [...Array(N).keys()].map(() => ({
            startLat: (Math.random() - 0.5) * 180,
            startLng: (Math.random() - 0.5) * 360,
            endLat: (Math.random() - 0.5) * 180,
            endLng: (Math.random() - 0.5) * 360,
            color: [
                ['#00FFFF', '#0096FF'],
                ['#64C8FF', '#00FFC8'],
                ['#3296FF', '#00C8FF']
            ][Math.round(Math.random() * 2)]
        }))
        setArcsData(arcs)

        // Set auto-rotate after a short delay
        const timer = setTimeout(() => {
            if (globeEl.current && globeEl.current.controls) {
                globeEl.current.controls().autoRotate = true
                globeEl.current.controls().autoRotateSpeed = 1.2
                globeEl.current.controls().enableZoom = false
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

                // Arcs for orbital rings effect
                arcsData={arcsData}
                arcColor={'color'}
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={4000}
                arcStroke={0.5}

                // Atmosphere
                atmosphereColor="#64C8FF"
                atmosphereAltitude={0.15}

                // Settings
                width={600}
                height={600}
                animateIn={true}
            />
        </div>
    )
}

export default GlobeComponent
