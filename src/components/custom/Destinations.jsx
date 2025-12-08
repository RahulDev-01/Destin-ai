import React from 'react';
import { Button } from '@/components/ui/button';

const destinationsData = [
    {
        title: "Top trending destinations",
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
        title: "Last-minute Deals",
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
        title: "Visa Free Destinations!",
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

function Destinations() {
    return (
        <div className='py-16 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-16'>
                {destinationsData.map((section, index) => (
                    <div key={index} className='space-y-6'>
                        {/* Header */}
                        <div className='flex items-center justify-between'>
                            <div>
                                <h2 className='text-3xl font-extrabold text-gray-900'>{section.title}</h2>
                                <p className='text-gray-600 mt-2'>{section.subtitle}</p>
                            </div>
                            <div className='flex gap-2'>
                                <Button variant='outline' size='icon' className='rounded-full h-10 w-10'>
                                    &lt;
                                </Button>
                                <Button variant='outline' size='icon' className='rounded-full h-10 w-10'>
                                    &gt;
                                </Button>
                            </div>
                        </div>

                        {/* Scrolling List */}
                        <div className='flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory'>
                            {section.items.map((item) => (
                                <div key={item.id} className='min-w-[200px] md:min-w-[240px] relative group snap-start cursor-pointer'>
                                    <div className='relative h-[320px] rounded-xl overflow-hidden shadow-md transition-all duration-300'>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                            loading="lazy"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent'></div>

                                        {/* Content */}
                                        <div className='absolute bottom-4 left-4 text-white'>
                                            <h3 className='text-xl font-bold leading-tight'>{item.title}</h3>
                                            {item.price && (
                                                <div className='mt-1 text-sm'>
                                                    <p className='opacity-90'>Starting at {item.price}</p>
                                                    <p className='text-xs opacity-75'>Per person</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Destinations;
