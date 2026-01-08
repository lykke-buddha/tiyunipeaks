import { Mountain } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">

                {/* Logo Col */}
                <div className="md:col-span-4 flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Mountain className="text-white w-6 h-6 stroke-[1.5]" />
                            <span className="text-white font-medium text-xl tracking-tight">Tiyuni Peaks</span>
                        </div>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            Tiyuni Peaks Lifestyle is a subsidiary of Tiyuni Group of Companies
                        </p>
                    </div>
                    <div className="mt-12">
                        <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest">All Rights Reserved</p>
                    </div>
                </div>

                {/* Links Col */}
                <div className="md:col-span-6">
                    <h4 className="text-white font-medium mb-8">Site Map</h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                        <a href="#" className="text-gray-400 hover:text-white transition text-sm">Home</a>
                        <a href="#" className="text-gray-400 hover:text-white transition text-sm">Interactive Page</a>
                        <a href="#" className="text-gray-400 hover:text-white transition text-sm">Available Plots</a>
                        <a href="#" className="text-gray-400 hover:text-white transition text-sm">Login</a>
                        <a href="#" className="text-gray-400 hover:text-white transition text-sm">Pricing and Payments</a>
                        <a href="#" className="text-gray-400 hover:text-white transition text-sm">My Account</a>
                        <a href="#" className="text-gray-400 hover:text-white transition text-sm">About Us</a>
                        <span className="block"></span>
                        <a href="#" className="text-gray-400 hover:text-white transition text-sm">Contact Us</a>
                    </div>
                </div>

                {/* Credits Col */}
                <div className="md:col-span-2 bg-[#111] rounded-lg p-6 flex flex-col justify-between h-full min-h-[200px]">
                    <p className="text-gray-400 text-sm">Designed and <br />Built By</p>
                    <div>
                        <p className="text-white font-semibold text-lg leading-tight mb-8">Surge <br />Technology LT</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Innovated Brilliance</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
