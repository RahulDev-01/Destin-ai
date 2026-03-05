import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getCityTheme } from '@/constants/cities';
import { getRelevantImageUrl, buildSeededPhotoURL } from '@/service/Globalapi';
import { useSEO } from '@/lib/seo';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';

function DestinationPage() {
    const { cityName } = useParams();
    const [bgImage, setBgImage] = useState(null);

    // Get theme based on URL parameter
    const theme = getCityTheme(cityName);

    // Dynamic SEO
    useSEO({
        title: `Explore ${theme.name} | AI Travel Planner`,
        description: `Plan your perfect trip to ${theme.name} with our AI-powered itinerary generator.`,
        image: bgImage || theme.defaultImage,
    });

    useEffect(() => {
        // Fetch a dynamic high-res image for the background
        const fetchHeroImage = async () => {
            try {
                const url = await getRelevantImageUrl(`${theme.name} city skyline architecture`, { width: 1920, height: 1080 });
                setBgImage(url);
            } catch (e) {
                setBgImage(theme.defaultImage);
            }
        };

        fetchHeroImage();
    }, [theme.name]);

    return (
        <div className={`min-h-screen flex flex-col ${theme.bgClasses}`}>
            <Header />

            {/* Hero Section */}
            <section className='relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden'>
                {/* Background Image with Parallax & Gradient Overlay */}
                <div className='absolute inset-0 z-0'>
                    <img
                        src={bgImage || theme.defaultImage}
                        alt={`Beautiful view of ${theme.name}`}
                        className='w-full h-full object-cover animate-image-pan'
                    />
                    <div className='absolute inset-0 bg-black/40 backdrop-blur-[2px]'></div>
                    <div className={`absolute inset-0 bg-gradient-to-t from-${theme.themeColor}-900/80 via-transparent to-transparent`}></div>
                </div>

                {/* Ambient Blobs */}
                <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
                    <div className={`absolute top-20 left-10 w-96 h-96 ${theme.bgBlob1} rounded-full mix-blend-overlay filter blur-[100px] opacity-40 animate-blob`}></div>
                    <div className={`absolute top-40 right-10 w-96 h-96 ${theme.bgBlob2} rounded-full mix-blend-overlay filter blur-[100px] opacity-40 animate-blob animation-delay-2000`}></div>
                    <div className={`absolute -bottom-8 left-1/3 w-96 h-96 ${theme.bgBlob3} rounded-full mix-blend-overlay filter blur-[100px] opacity-40 animate-blob animation-delay-4000`}></div>
                </div>

                {/* Content */}
                <div className='relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8 mt-16'>
                    <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full text-white shadow-xl animate-fade-in'>
                        <span className='text-2xl'>{theme.emoji}</span>
                        <span className='font-bold tracking-widest uppercase text-sm'>{theme.description}</span>
                    </div>

                    <h1 className='text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight drop-shadow-2xl'>
                        Discover <br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText} drop-shadow-lg`}>
                            {theme.name}
                        </span>
                    </h1>

                    <p className='text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-md leading-relaxed'>
                        Experience {theme.name} like never before. Let our AI craft your personalized, day-by-day itinerary tailored to your unique style.
                    </p>

                    <div className='pt-8 flex flex-col sm:flex-row items-center justify-center gap-5'>
                        <Link to='/create-trip' className='w-full sm:w-auto'>
                            <Button className={`w-full sm:w-auto h-16 px-10 text-xl text-white font-black rounded-full transition-all duration-300 hover:scale-105 ${theme.btnPrimary}`}>
                                Plan My Trip to {theme.name.split(',')[0]}
                            </Button>
                        </Link>
                    </div>

                    {/* Social Proof Stats */}
                    <div className='pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 max-w-3xl mx-auto'>
                        <div className='text-white space-y-1'>
                            <div className='text-3xl font-black'>{theme.reviews}</div>
                            <div className='text-sm text-gray-300 font-medium'>Trips Planned</div>
                        </div>
                        <div className='text-white space-y-1'>
                            <div className='text-3xl font-black flex items-center justify-center gap-1'>
                                {theme.rating} <span className='text-yellow-400 text-xl'>★</span>
                            </div>
                            <div className='text-sm text-gray-300 font-medium'>User Rating</div>
                        </div>
                        <div className='text-white space-y-1'>
                            <div className='text-3xl font-black'>100%</div>
                            <div className='text-sm text-gray-300 font-medium'>Powered by AI</div>
                        </div>
                        <div className='text-white space-y-1'>
                            <div className='text-3xl font-black'>Free</div>
                            <div className='text-sm text-gray-300 font-medium'>To Start</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default DestinationPage;
