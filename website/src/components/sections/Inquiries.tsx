import { Mail, MessageCircle } from 'lucide-react';

export function Inquiries() {
    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-6 pb-12 lg:pb-20">
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">Retail, Restaurant and Corporate Inquiries</h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl">
                Inquires regarding corporate, commercial, investor and business related ventures can find information below
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-3 bg-[#111] rounded-xl p-2 h-fit border border-white/5">
                    <button className="w-full text-left bg-[#262626] text-white px-4 py-3 rounded-lg text-sm font-medium mb-1">Commercial</button>
                    <button className="w-full text-left text-gray-400 hover:bg-[#1a1a1a] hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition">Restaurant & Food</button>
                    <button className="w-full text-left text-gray-400 hover:bg-[#1a1a1a] hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition">Corporate</button>
                    <button className="w-full text-left text-gray-400 hover:bg-[#1a1a1a] hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition">Education & Daycare</button>
                    <button className="w-full text-left text-gray-400 hover:bg-[#1a1a1a] hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition">Investor Relations</button>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-6 bg-[#5c463a] rounded-xl p-6 md:p-10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-6">Commercial Inquires</h3>
                        <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-8">
                            Tiyuni Peaks will have a wide variety of mixed use areas available to both residents and non-residents bringing access and convenience to this new area. Benefiting from easy main road access, retail spaces at Tiyuni Peaks promise to be highly sought after.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <button className="bg-white text-black px-5 py-3 rounded text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                            <Mail className="w-4 h-4" />
                            Send Us an Email
                        </button>
                        <button className="bg-transparent border border-white/20 text-white px-5 py-3 rounded text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition">
                            <MessageCircle className="w-4 h-4" />
                            Connect Via WhatsApp
                        </button>
                    </div>
                </div>

                {/* Right List */}
                <div className="lg:col-span-3 bg-[#111] rounded-xl p-6 md:p-8 border border-white/5">
                    <h4 className="text-white font-medium mb-6">Planned Commercial Spaces</h4>
                    <ul className="space-y-4">
                        <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">Grocery Shops</li>
                        <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">Gift Stores</li>
                        <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">Pet Care</li>
                        <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">Dental Care</li>
                        <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">Gym and Fitness</li>
                        <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">Clothing</li>
                        <li className="text-gray-400 text-sm hover:text-white transition cursor-pointer">Accessories and Decor</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
