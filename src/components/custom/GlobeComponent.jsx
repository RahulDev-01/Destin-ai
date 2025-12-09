import React, { useRef, useEffect, useState } from 'react'
import Globe from 'react-globe.gl'

function GlobeComponent() {
    const globeEl = useRef()
    const [countries, setCountries] = useState({ features: [] })

    useEffect(() => {
        // Load country data
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(data => {
                setCountries(data)
            })
            .catch(err => {
                console.log('Failed to load country data:', err)
            })

        // Set auto-rotate after a short delay to ensure globe is mounted
        const timer = setTimeout(() => {
            if (globeEl.current && globeEl.current.controls) {
                globeEl.current.controls().autoRotate = true
                globeEl.current.controls().autoRotateSpeed = 0.5
                globeEl.current.controls().enableZoom = false
            }
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonMargin={0.3}
                hexPolygonColor={() => `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 0.7)`}
                atmosphereColor="lightskyblue"
                atmosphereAltitude={0.25}
                width={600}
                height={600}
                animateIn={true}
            />
        </div>
    )
}

export default GlobeComponent
