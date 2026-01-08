import { Instagram, Linkedin, Facebook, Twitter, ChevronDown, Mountain } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/sections/Footer';

export function ContactPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-[#9CA3AF] topographic-bg antialiased selection:bg-orange-500 selection:text-white font-sans">
            <Navbar />

            <main className="relative pt-20 min-h-screen flex flex-col justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2666&auto=format&fit=crop" alt="Modern Architecture" className="w-full h-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Content & Socials */}
                    <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12">
                        <div className="space-y-6 mt-10">
                            <h1 className="text-5xl lg:text-6xl font-medium text-white tracking-tight">
                                Contact Us
                            </h1>
                            <p className="text-xl text-zinc-400 leading-relaxed max-w-md">
                                Get in touch with our qualified sales team to help you with any queries you might have about Tiyuni Peaks Secure Lifestyle Estate.
                            </p>
                        </div>

                        {/* Social Card */}
                        <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 mt-auto">
                            <div className="flex justify-between items-center px-4">
                                <a href="#" className="group flex flex-col items-center gap-2">
                                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/5 transition-all text-white">
                                        <Instagram className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium group-hover:text-zinc-300">Instagram</span>
                                </a>
                                <a href="#" className="group flex flex-col items-center gap-2">
                                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/5 transition-all text-white">
                                        <Linkedin className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium group-hover:text-zinc-300">LinkedIn</span>
                                </a>
                                <a href="#" className="group flex flex-col items-center gap-2">
                                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/5 transition-all text-white">
                                        <Facebook className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium group-hover:text-zinc-300">Facebook</span>
                                </a>
                                <a href="#" className="group flex flex-col items-center gap-2">
                                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/5 transition-all text-white">
                                        <Twitter className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium group-hover:text-zinc-300">Twitter</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-black/50">
                            <div className="flex justify-between items-baseline mb-8">
                                <h2 className="text-2xl font-medium text-white tracking-tight">Contact Us</h2>
                                <span className="text-lg text-zinc-500">Sign Up Now</span>
                            </div>

                            <form className="space-y-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Your Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all" />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Your Email Address</label>
                                    <input type="email" placeholder="surname@example.com" className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all" />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Your Phone Number</label>
                                    <input type="tel" placeholder="+XXX-XXXXX-XX-XX" className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all" />
                                </div>

                                {/* Select */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Select an Option</label>
                                    <div className="relative">
                                        <select className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-lg text-zinc-400 focus:text-white focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all appearance-none cursor-pointer">
                                            <option>- Select An Option -</option>
                                            <option>Sales Inquiry</option>
                                            <option>Support</option>
                                            <option>Partnership</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">Select an Option</label>
                                    <textarea placeholder="Your Message" rows={4} className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all resize-none"></textarea>
                                </div>

                                {/* Submit */}
                                <button type="button" className="w-full bg-white text-black font-medium text-lg py-4 rounded-lg hover:bg-zinc-200 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black transition-all mt-4">
                                    Contact Us
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
