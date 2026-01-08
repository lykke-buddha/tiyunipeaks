import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <>
            <header className="relative w-full h-screen min-h-[700px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2068&auto=format&fit=crop"
                        alt="Aerial Estate View"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 w-full pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <p className="text-gray-400 text-lg font-medium mb-4">New Lifestyle Development</p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-6">
                            <span className="text-orange-400">Buy</span> Your Future <br />
                            <span className="text-orange-400">Home</span>, Today
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                            Buy your dream house at the Tiyuni Peaks Estate Development with local amenities and thriving communities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <button className="bg-white text-black px-6 py-3 rounded text-base font-medium flex items-center gap-2 hover:bg-gray-100 transition">
                                <ArrowUpRight className="w-4 h-4" />
                                View Your Plot Now
                            </button>
                            <button className="text-white px-6 py-3 rounded text-base font-medium hover:text-gray-300 transition">
                                Learn More about Tiyuni
                            </button>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="w-full bg-[#3f1d1d] border-y border-white/5 relative z-20">
                <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-white font-medium text-lg">Plots are Now Up for Sale</span>
                    <div className="flex items-center gap-6">
                        <div className="flex items-baseline gap-2">
                            <span className="text-white text-2xl font-semibold">213</span>
                            <span className="text-red-200 text-lg">Plots Remain</span>
                        </div>
                        <button className="bg-[#5c2b2b] hover:bg-[#6e3535] text-white text-sm font-medium px-4 py-2 rounded border border-white/10 transition">
                            View Remaining Plots
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
