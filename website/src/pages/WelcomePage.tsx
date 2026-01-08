import { Menu, ArrowUpRight, ChevronDown, LayoutGrid, Ruler, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WelcomePage() {
    return (
        <div className="bg-[#080808] text-white font-sans overflow-x-hidden selection:bg-orange-900/50 selection:text-white">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#080808]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                            <path d="M2 20h20"></path>
                            <path d="m12 4-8 16"></path>
                            <path d="m12 4 8 16"></path>
                            <path d="M8 12h8"></path>
                        </svg>
                        <span className="text-lg font-medium tracking-tight">Tiyuni Peaks</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <a href="/pricing" className="hover:text-white transition-colors">Available Plots</a>
                        <a href="/pricing" className="text-orange-200 transition-colors">Pricing and Payments</a>
                        <a href="#" className="hover:text-white transition-colors">About Us</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/contact" className="bg-white text-black px-5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
                            Contact Us
                        </Link>
                        {/* External link to Admin Portal running on port 5173 */}
                        <a href="http://localhost:5173/login" className="text-gray-400 text-sm font-medium hover:text-white transition-colors px-3">
                            Login to Dashboard
                        </a>
                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="md:hidden text-white">
                        <Menu />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-900/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="max-w-2xl">
                        <p className="text-lg text-gray-400 font-medium mb-4">Premium Security and Lifestyle</p>
                        <h1 className="text-5xl lg:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
                            Affordable Payments for Secure Lifestyle Plots
                        </h1>
                        <p className="text-xl text-gray-400 mb-10 font-light leading-relaxed max-w-lg">
                            Buy your dream house at the Tiyuni Peaks Estate Development with local amenities and thriving communities.
                        </p>
                        <Link to="/pricing" className="bg-white text-black pl-6 pr-5 py-4 rounded-lg text-base font-medium inline-flex items-center gap-2 hover:bg-gray-100 transition-transform hover:scale-[1.02]">
                            <ArrowUpRight className="w-5 h-5" />
                            View Calculator
                        </Link>
                    </div>

                    {/* Dashboard Mockup */}
                    <div className="relative">
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0F0F0F] flex flex-col md:flex-row max-w-full md:max-w-[650px] mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            {/* Left Side (White Form) */}
                            <div className="bg-white p-6 md:p-8 flex-1">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-gray-900 font-medium text-sm">Outcome calculator simulator</h3>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <p className="text-gray-400 text-xs mb-6 leading-relaxed">Maths is confusing. However, maths are a crucial part of your compensation. This tool will help you estimate.</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-400 text-[10px] uppercase font-semibold mb-1">Company Name</label>
                                        <div className="h-8 bg-gray-50 border border-gray-200 rounded w-full"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-[10px] uppercase font-semibold mb-1">Country</label>
                                            <div className="flex items-center gap-2 h-8 border border-gray-200 rounded px-2">
                                                <div className="w-4 h-4 rounded-full bg-blue-900 flex items-center justify-center text-[8px] text-white">UK</div>
                                                <span className="text-gray-800 text-xs">United Kingdom</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-[10px] uppercase font-semibold mb-1">Currency</label>
                                            <div className="flex items-center justify-between h-8 border border-gray-200 rounded px-2">
                                                <span className="text-gray-800 text-xs">£ GBP</span>
                                                <ChevronDown className="w-3 h-3 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Mock Sliders */}
                                    <div className="pt-2">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-[10px] font-semibold text-gray-400">Annual amount</span>
                                            <span className="text-[10px] text-gray-900">£</span>
                                        </div>
                                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-400 w-1/3"></div>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-[10px] font-semibold text-gray-400">Strike Price</span>
                                            <span className="text-[10px] text-gray-900">£</span>
                                        </div>
                                        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gray-300 w-0"></div>
                                        </div>
                                    </div>
                                    <div className="pt-4 pb-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-semibold text-gray-400">Expected additional dilution</span>
                                            <div className="border rounded px-1 text-xs text-gray-600">10 %</div>
                                        </div>
                                        <div className="relative h-1 w-full bg-gray-200 rounded-full">
                                            <div className="absolute top-1/2 -translate-y-1/2 left-[10%] w-3 h-3 bg-white border border-gray-300 shadow rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side (Black Totals) */}
                            <div className="bg-black text-white p-6 w-full md:w-48 flex flex-col justify-between border-l border-white/10">
                                <div>
                                    <h4 className="text-sm font-medium text-white mb-1">Totals</h4>
                                    <p className="text-[10px] text-gray-500 mb-6">Pre and post tax estimates</p>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] text-gray-500 mb-1">Pre-tax value</p>
                                            <p className="text-lg font-medium">£9,316</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 mb-1">Cost to exercise</p>
                                            <p className="text-lg font-medium">£2,670</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 mb-1">Total profit</p>
                                            <p className="text-lg font-medium">£1,987,500</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/20 mt-6">
                                    <p className="text-[10px] text-gray-400 mb-1">Pre-tax value estimate</p>
                                    <p className="text-base font-medium text-white">£1,564.21</p>
                                    <p className="text-[10px] text-gray-400 mt-3 mb-1">Pre-tax value</p>
                                    <p className="text-base font-medium text-white">£1,987,500</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Plot Pricing Section */}
            <section className="py-20 bg-[#080808]">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-medium tracking-tight mb-4">Plot Pricing and Sizes</h2>
                    <p className="text-xl text-gray-400 mb-12 font-light">Learn about plot sizes and pricing<br />below</p>

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="bg-[#8a3c30] text-white px-5 py-2.5 rounded text-sm font-medium transition-colors whitespace-nowrap">
                            Small Plots 0.20 Ha
                        </button>
                        <button className="text-gray-500 hover:text-white px-5 py-2.5 rounded text-sm font-medium transition-colors whitespace-nowrap">
                            Medium Plot 0.35 Ha
                        </button>
                        <button className="text-gray-500 hover:text-white px-5 py-2.5 rounded text-sm font-medium transition-colors whitespace-nowrap">
                            Large Plots 0.55 Ha
                        </button>
                        <button className="text-gray-500 hover:text-white px-5 py-2.5 rounded text-sm font-medium transition-colors whitespace-nowrap">
                            X-Large Plots 0.85 Ha
                        </button>
                        <button className="text-gray-500 hover:text-white px-5 py-2.5 rounded text-sm font-medium transition-colors whitespace-nowrap">
                            Grandé Plots 1.00 Ha
                        </button>
                    </div>

                    {/* Content Card */}
                    <div className="relative bg-[#5e4d44] rounded-2xl overflow-hidden min-h-[500px] flex flex-col lg:flex-row">
                        {/* Text Content */}
                        <div className="p-8 lg:p-12 lg:w-1/2 z-10 flex flex-col justify-center">
                            <div className="mb-2 flex items-center gap-2">
                                <h3 className="text-2xl font-medium text-white">Small Plot</h3>
                                <span className="text-white/60 text-lg font-light flex items-center gap-1">
                                    <LayoutGrid className="w-4 h-4" /> 0.20 Ha
                                </span>
                            </div>
                            <p className="text-orange-200/80 text-sm mb-6 flex items-center gap-2">
                                <Ruler className="w-4 h-4" />
                                Architectural Design Support and Planning Included
                            </p>

                            <p className="text-gray-200 text-lg leading-relaxed mb-10 font-light">
                                Ideal for small developments, couples, young professionals, retirees. Adequate for comfortable living and off street parking. Plots are situated close to shops and community facilities such as the club house, driving range and pool.
                            </p>

                            <div className="flex items-end justify-between mb-8 border-t border-white/10 pt-6">
                                <div>
                                    <p className="text-gray-300 text-lg font-light mb-1">Starting from</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-semibold text-white">MWK 16,500,000.</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <button className="bg-white text-black px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                                    View Plot Prices on Map
                                </button>
                                <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                                    Calculate Payments
                                </button>
                            </div>
                        </div>

                        {/* Image Background */}
                        <div className="absolute inset-0 lg:left-1/3 bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30 lg:opacity-60 pointer-events-none"></div>
                        {/* Gradient Fade */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5e4d44] via-[#5e4d44]/90 to-transparent lg:w-2/3 pointer-events-none"></div>
                    </div>
                </div>
            </section>

            {/* Installment Calculator */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-medium tracking-tight mb-4">Instalment Calculator</h2>
                    <p className="text-lg text-gray-400 font-light mb-2">Maths is confusing. However, maths are a crucial part of your compensation.</p>
                    <p className="text-lg text-gray-400 font-light mb-12">This tool will help you estimate the value of your generic package.</p>

                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 lg:p-10">
                        <h3 className="text-xl font-medium mb-8">Plot Selection</h3>

                        <div className="space-y-8">
                            {/* Dropdown */}
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Plot Size</label>
                                <div className="relative">
                                    <select className="w-full bg-[#1a1a1a] border border-white/10 text-gray-400 rounded-lg h-12 px-4 appearance-none focus:outline-none focus:border-white/30 transition-colors">
                                        <option>Small Plot</option>
                                        <option>Medium Plot</option>
                                        <option>Large Plot</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>

                            {/* Slider 1 */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-gray-400 text-sm">Period</label>
                                    <span className="text-white font-medium">3 Months</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-full h-1 bg-[#262626] rounded-full">
                                        <div className="absolute left-0 top-0 h-full bg-[#dca57d] rounded-full" style={{ width: '15%' }}></div>
                                        <input type="range" min="1" max="12" defaultValue="3" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-6 h-6 bg-white rounded-full shadow-lg cursor-pointer transform -translate-x-1/2"></div>
                                    </div>
                                    <div className="flex items-center border border-white/10 rounded px-3 py-2 w-24 bg-[#1a1a1a]">
                                        <span className="text-white text-sm">10</span>
                                        <span className="ml-auto text-gray-500 text-sm">%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Inputs Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Annual amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                                        <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg h-12 pl-8 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Quantity of options</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                                        <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg h-12 pl-8 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Strike price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                                        <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg h-12 pl-8 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Total amount of outstanding shares</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                                        <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg h-12 pl-8 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Slider 2 */}
                            <div className="border-t border-white/10 pt-8 mt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-white font-medium text-sm">Expected additional dilution</label>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-full h-1 bg-[#262626] rounded-full">
                                        <div className="absolute left-0 top-0 h-full bg-[#dca57d] rounded-full" style={{ width: '25%' }}></div>
                                        <input type="range" min="0" max="100" defaultValue="25" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <div className="absolute top-1/2 -translate-y-1/2 left-[25%] w-6 h-6 bg-white rounded-full shadow-lg cursor-pointer transform -translate-x-1/2"></div>
                                    </div>
                                    <div className="flex items-center border border-white/10 rounded px-3 py-2 w-24 bg-[#1a1a1a]">
                                        <span className="text-white text-sm">10</span>
                                        <span className="ml-auto text-gray-500 text-sm">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Commercial Section */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-medium tracking-tight mb-4">Retail, Restaurant and Corporate Inquiries</h2>
                <p className="text-lg text-gray-400 font-light mb-12 max-w-2xl">
                    Inquires regarding corporate, commercial, investor and business related ventures can find information below
                </p>

                <div className="grid lg:grid-cols-12 gap-6">
                    {/* Left Menu */}
                    <div className="lg:col-span-3 space-y-2">
                        <button className="w-full text-left bg-[#262626] text-white px-4 py-3 rounded-lg text-sm font-semibold border border-white/5">
                            Commercial
                        </button>
                        <button className="w-full text-left text-gray-400 px-4 py-3 rounded-lg text-sm hover:text-white transition-colors">
                            Restaurant & Food
                        </button>
                        <button className="w-full text-left text-gray-400 px-4 py-3 rounded-lg text-sm hover:text-white transition-colors">
                            Corporate
                        </button>
                        <button className="w-full text-left text-gray-400 px-4 py-3 rounded-lg text-sm hover:text-white transition-colors">
                            Education & Daycare
                        </button>
                        <button className="w-full text-left text-gray-400 px-4 py-3 rounded-lg text-sm hover:text-white transition-colors">
                            Investor Relations
                        </button>
                    </div>

                    {/* Middle Content */}
                    <div className="lg:col-span-6 bg-[#5e4d44] rounded-xl p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-medium mb-6">Commercial Inquires</h3>
                            <p className="text-gray-200 text-lg leading-relaxed font-light mb-6">
                                Tiyuni Peaks will have a wide variety of mixed use areas available to both residents and non-residents bringing access and convenience to this new area. Benefiting from easy main road access, retail spaces at Tiyuni Peaks promise to be highly sought after.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                                <Mail className="w-4 h-4" /> Send Us an Email
                            </button>
                            <button className="border border-white/30 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors">
                                <MessageCircle className="w-4 h-4" /> Connect Via WhatsApp
                            </button>
                        </div>
                    </div>

                    {/* Right List */}
                    <div className="lg:col-span-3 bg-[#111111] border border-white/5 rounded-xl p-8">
                        <h3 className="text-base font-semibold mb-6">Planned Commercial Spaces</h3>
                        <ul className="space-y-4 text-gray-300 text-base font-light">
                            <li className="hover:text-white transition-colors cursor-default">Grocery Shops</li>
                            <li className="hover:text-white transition-colors cursor-default">Gift Stores</li>
                            <li className="hover:text-white transition-colors cursor-default">Pet Care</li>
                            <li className="hover:text-white transition-colors cursor-default">Dental Care</li>
                            <li className="hover:text-white transition-colors cursor-default">Gym and Fitness</li>
                            <li className="hover:text-white transition-colors cursor-default">Clothing</li>
                            <li className="hover:text-white transition-colors cursor-default">Accessories and Decor</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-32 relative overflow-hidden">
                {/* SVG Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="lines" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 20 Q 25 5, 50 20 T 100 20" fill="none" stroke="white" strokeWidth="1"></path>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#lines)"></rect>
                    </svg>
                </div>

                <div className="relative z-10 text-center px-6">
                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4 block">Build a Home</span>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Ready for your New Home?</h2>
                    <p className="text-xl text-gray-400 font-light mb-10">Get started today with your plot</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="bg-white text-black px-6 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                            <Mail className="w-4 h-4" /> Send Us an Email
                        </button>
                        <button className="bg-[#111] border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#222] transition-colors">
                            <MessageCircle className="w-4 h-4" /> Connect Via WhatsApp
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-[#080808] pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    <div className="flex flex-col justify-between h-full min-h-[200px] bg-[#111] rounded-2xl p-8 border border-white/5">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                                    <path d="M2 20h20"></path>
                                    <path d="m12 4-8 16"></path>
                                    <path d="m12 4 8 16"></path>
                                    <path d="M8 12h8"></path>
                                </svg>
                                <span className="text-xl font-medium">Tiyuni Peaks</span>
                            </div>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                Tiyuni Peaks Lifestyle is a subsidiary of Tiyuni Group of Companies
                            </p>
                        </div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-12">All Rights Reserved</p>
                    </div>

                    <div className="bg-[#111] rounded-2xl p-8 border border-white/5 lg:col-span-2">
                        <h4 className="text-sm font-semibold text-gray-300 mb-8">Site Map</h4>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-lg font-light text-gray-300">
                            <a href="#" className="hover:text-white">Home</a>
                            <a href="#" className="hover:text-white">Interactive Page</a>
                            <a href="#" className="hover:text-white">Available Plots</a>
                            <a href="http://localhost:5173/login" className="hover:text-white">Login</a>
                            <a href="#" className="hover:text-white">Pricing and Payments</a>
                            <a href="#" className="hover:text-white">My Account</a>
                            <a href="#" className="hover:text-white">About Us</a>
                            <div className="hidden md:block"></div>
                            <a href="#" className="hover:text-white">Contact Us</a>
                        </div>
                    </div>

                    <div className="bg-[#111] rounded-2xl p-8 border border-white/5 flex flex-col justify-between">
                        <div>
                            <p className="text-lg text-gray-300 font-light mb-1">Designed and</p>
                            <p className="text-lg text-gray-300 font-light mb-8">Built By</p>

                            <p className="text-white font-semibold text-lg leading-tight">Surge<br />Technology LT</p>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-8">Innovated Brilliance</p>
                    </div>

                </div>
            </footer>
        </div>
    );
}
