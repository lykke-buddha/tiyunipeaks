import { Store, ShieldCheck, Armchair } from 'lucide-react';

export function Amenities() {
    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-12 lg:py-20">
            <div className="mb-12 lg:mb-16">
                <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                    Tiyuni Peaks <span className="text-red-400">Lifestyle</span> and <br className="hidden md:block" />Amenities
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
                    Discover the multitude of amenities and lifestyle we offer at Tiyuni Peaks.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="grid grid-rows-2 gap-4 md:gap-6">
                    {/* Card 1 */}
                    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 md:p-10 flex flex-col justify-between hover:border-white/10 transition group">
                        <div>
                            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-6 text-orange-400">
                                <Store className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4 tracking-tight">Shops and Restaurants for the Family</h3>
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                                Safe, clean and modern facilities for you and the family, ranging from recreational activities to sports and community activities
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 md:p-10 flex flex-col justify-between hover:border-white/10 transition group">
                        <div>
                            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-6 text-orange-400">
                                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4 tracking-tight">Ease and Secure Estate Access</h3>
                            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                                World Class security and easy access via the main road, our estate offers the best of all worlds with security, and ease all year access
                            </p>
                        </div>
                    </div>
                </div>

                {/* Large Image Card */}
                <div className="relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-auto group">
                    <img
                        src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop"
                        alt="Golf Course"
                        className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-6 text-white">
                            <Armchair className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4 tracking-tight">Club House and <br />Community Activities</h3>
                        <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-md">
                            Safe, clean and modern facilities for you and the family, ranging from recreational activities to sports and community activities
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
