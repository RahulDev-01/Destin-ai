import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';

const destinationsData = [
    {
        title: "Top Trending Destinations",
        subtitle: "Catch the hottest holiday packages while prices are still low!",
        items: [
            { id: 1, title: "Thailand", image: "https://loremflickr.com/400/600/thailand" },
            { id: 2, title: "Goa", image: "https://loremflickr.com/400/600/goa,beach" },
            { id: 3, title: "Europe", image: "https://loremflickr.com/400/600/europe,city" },
            { id: 4, title: "Kerala", image: "https://loremflickr.com/400/600/kerala" },
            { id: 5, title: "Vietnam", image: "https://loremflickr.com/400/600/vietnam" },
            { id: 6, title: "Andaman", image: "https://loremflickr.com/400/600/andaman" },
            { id: 7, title: "Dubai", image: "https://loremflickr.com/400/600/dubai" },
        ]
    },
    {
        title: "Last-Minute Deals",
        subtitle: "Use code: LASTMINUTE for big savings on last-minute holidays!",
        items: [
            { id: 8, title: "Goa", image: "https://loremflickr.com/400/600/goa" },
            { id: 9, title: "Kerala", image: "https://loremflickr.com/400/600/kerala,boat" },
            { id: 10, title: "Ooty", image: "https://loremflickr.com/400/600/ooty" },
            { id: 11, title: "Manali", image: "https://loremflickr.com/400/600/manali" },
            { id: 12, title: "Rajasthan", image: "https://loremflickr.com/400/600/rajasthan" },
            { id: 13, title: "Andaman", image: "https://loremflickr.com/400/600/andaman,beach" },
        ]
    },
    {
        title: "Visa Free Destinations",
        subtitle: "Dream Destinations, Zero Paperwork!",
        items: [
            { id: 14, title: "Maldives", price: "₹39,300", image: "https://loremflickr.com/400/600/maldives" },
            { id: 15, title: "Thailand", price: "₹33,700", image: "https://loremflickr.com/400/600/thailand,temple" },
            { id: 16, title: "Sri Lanka", price: "₹12,800", image: "https://loremflickr.com/400/600/srilanka" },
            { id: 17, title: "Vietnam", price: "₹25,000", image: "https://loremflickr.com/400/600/vietnam,nature" },
            { id: 18, title: "Malaysia", price: "₹11,700", image: "https://loremflickr.com/400/600/malaysia" },
            { id: 19, title: "Seychelles", price: "₹82,700", image: "https://loremflickr.com/400/600/seychelles" },
        ]
    }
];

function DestinationsSection({ section }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className='space-y-8 animate-fade-in'>
            {/* Header */}
            <div className='flex items-end justify-between px-2'>
                <div>
                    <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
                        {section.title}
                    </h2>
                    <p className='text-lg text-gray-600 mt-2 max-w-2xl font-medium'>
                        {section.subtitle}
                    </p>
                </div>
                <div className='hidden sm:flex gap-3'>
                    <Button
                        variant='outline'
                        size='icon'
                        className='rounded-full h-12 w-12 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all shadow-sm'
                        onClick={() => scroll('left')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </Button>
                    <Button
                        variant='outline'
                        size='icon'
                        className='rounded-full h-12 w-12 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all shadow-sm'
                        onClick={() => scroll('right')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </Button>
                </div>
            </div>

            {/* Scrolling List */}
            <div
                ref={scrollRef}
                className='flex gap-6 overflow-x-auto pb-10 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x snap-mandatory'
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {section.items.map((item) => (
                    <div
                        key={item.id}
                        className='min-w-[280px] md:min-w-[320px] relative group snap-start cursor-pointer hover:-translate-y-2 transition-transform duration-300'
                    >
                        <div className='relative h-[420px] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300'>
                            <img
                                src={item.image}
                                alt={item.title}
                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
                                loading="lazy"
                            />
                            {/* Gradient Overlay */}
                            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity'></div>

                            {/* Content */}
                            <div className='absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                                <h3 className='text-2xl font-bold leading-tight mb-2'>{item.title}</h3>
                                {item.price ? (
                                    <div className='flex items-center justify-between mt-2 pt-4 border-t border-white/20'>
                                        <div>
                                            <p className='text-xs opacity-80 uppercase tracking-wider font-semibold'>Starting at</p>
                                            <p className='text-xl font-bold text-blue-300'>{item.price}</p>
                                        </div>
                                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                                            Book Now
                                        </Badge>
                                    </div>
                                ) : (
                                    <div className='flex items-center gap-2 text-sm font-medium text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100'>
                                        <span>Explore deals</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Simple Badge component internal to this file for now or import from ui (sticking to standard HTML/Tailwind for speed if not present)
function Badge({ children, className }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
            {children}
        </span>
    );
}

function Destinations() {
    return (
        <div className='py-20 bg-white'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-24'>
                {destinationsData.map((section, index) => (
                    <DestinationsSection key={index} section={section} />
                ))}
            </div>
        </div>
    );
}

export default Destinations;
