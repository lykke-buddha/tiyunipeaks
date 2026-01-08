import { MapPin, Map, Ruler } from 'lucide-react';

export function PlotSection() {
    return (
        <>
            {/* Map & Invest Section */}
            <section className="max-w-[1400px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5 rounded-2xl overflow-hidden bg-[#0f0f0f]">
                    {/* Map Graphic Left */}
                    <div className="relative bg-[#1a1a1a] h-[400px] lg:h-auto overflow-hidden">
                        {/* Abstract Map Representation */}
                        <svg className="absolute inset-0 w-full h-full stroke-gray-600 opacity-40" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)"></rect>
                            <path d="M 0 100 L 400 300 M 50 0 L 200 400 M 300 0 L 100 400" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                            <path d="M 400 50 L 0 350 M 150 0 L 250 400" stroke="white" strokeWidth="1.5" vectorEffect="non-scaling-stroke" opacity="0.7"></path>
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f0f0f]"></div>
                    </div>

                    {/* Content Right */}
                    <div className="p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-red-400 mb-4">
                            <MapPin className="w-5 h-5" />
                            <span className="font-medium">Location</span>
                        </div>
                        <h3 className="text-4xl font-semibold text-red-400 mb-6 tracking-tight">Invest in the future of <br />lifestyle in Malawi</h3>
                        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                            Tiyuni Peaks is open to support from diaspora, international investors, venture capital and more to develop a new standard in living, safety and community.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-white text-black px-6 py-3 rounded text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2">
                                <Map className="w-4 h-4" />
                                View Interactive Map
                            </button>
                            <button className="bg-transparent border border-white/10 text-white px-6 py-3 rounded text-sm font-medium hover:bg-white/5 transition">
                                Contact Investor Relations
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="max-w-[1400px] mx-auto px-6 pb-24">
                <h2 className="text-4xl font-semibold text-white tracking-tight mb-4">Plot Pricing and Sizes</h2>
                <p className="text-xl text-gray-400 mb-10">Learn about plot sizes and pricing below</p>

                {/* Tabs */}
                <div className="flex flex-wrap gap-1 mb-6">
                    <button className="bg-[#7f2e2e] text-white px-5 py-2.5 rounded text-sm font-medium">Small Plots 0.20 Ha</button>
                    <button className="bg-[#1a1a1a] text-gray-400 hover:text-white px-5 py-2.5 rounded text-sm font-medium transition">Medium Plot 0.35 Ha</button>
                    <button className="bg-[#1a1a1a] text-gray-400 hover:text-white px-5 py-2.5 rounded text-sm font-medium transition">Large Plots 0.55 Ha</button>
                    <button className="bg-[#1a1a1a] text-gray-400 hover:text-white px-5 py-2.5 rounded text-sm font-medium transition">X-Large Plots 0.85 Ha</button>
                    <button className="bg-[#1a1a1a] text-gray-400 hover:text-white px-5 py-2.5 rounded text-sm font-medium transition">Grandé Plots 1.00 Ha</button>
                </div>

                {/* Pricing Card */}
                <div className="relative bg-[#4a3b32] rounded-2xl overflow-hidden min-h-[400px] flex items-center">
                    {/* Background Image overlaying right side */}
                    <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop"
                            alt="Plots"
                            className="w-full h-full object-cover mix-blend-overlay opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#4a3b32]"></div>
                    </div>

                    <div className="relative z-10 p-10 md:w-3/5">
                        <div className="flex items-baseline gap-3 mb-2">
                            <h3 className="text-2xl font-semibold text-white">Small Plot</h3>
                            <span className="text-gray-300 text-lg">◳ 0.20 Ha</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6">
                            <Ruler className="w-4 h-4 text-gray-300" />
                            <span className="text-gray-300 text-sm">Architectural Design Support and Planning Included</span>
                        </div>

                        <p className="text-lg text-gray-200 mb-10 leading-relaxed max-w-xl">
                            Ideal for small developments, couples, young professionals, retirees. Adequate for comfortable living and off street parking. Plots are situated close to shops and community facilities such as the club house, driving range and pool.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-t border-white/10 pt-6">
                            <div>
                                <span className="text-gray-300 text-base block mb-1">Starting from</span>
                                <span className="text-3xl font-semibold text-white tracking-tight">MWK 16,500,000.</span>
                            </div>
                            <button className="bg-white text-black px-6 py-3 rounded text-sm font-semibold hover:bg-gray-100 transition">
                                View Plot Prices on Map
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
