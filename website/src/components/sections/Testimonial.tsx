export function Testimonial() {
    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 pb-12 lg:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
                <h2 className="text-3xl md:text-5xl font-normal text-white mb-2">From our Growing</h2>
                <h2 className="text-3xl md:text-5xl font-semibold text-orange-200 mb-6">Community</h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-md">
                    Read what our customers have to say about our project and community.
                </p>
            </div>

            <div className="relative bg-gradient-to-br from-[#7f2e2e] to-[#451a1a] p-8 md:p-10 rounded-2xl overflow-hidden">
                {/* Large quote mark bg */}
                <div className="absolute bottom-[-20px] right-[-20px] text-white/5 text-[150px] md:text-[200px] font-serif leading-none">”</div>

                <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-1">Damien Charles Monét</h3>
                    <p className="text-xs font-medium text-red-200 uppercase tracking-wider mb-6">Father of 2, Head of Business Intelligence</p>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                        An Amazing place, we're excited to start building, we can see our future and an amazing lifestyle, we definitely see our future here.
                    </p>
                </div>
            </div>
        </section>
    );
}
