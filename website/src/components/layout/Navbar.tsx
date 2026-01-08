import { useState, useEffect } from 'react';
import { Mountain, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname === path) return true;
        return false;
    };

    const getLinkClass = (path: string) => {
        return isActive(path)
            ? "text-orange-400 hover:text-orange-300 transition"
            : "text-gray-300 hover:text-white transition";
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 border-b border-white/5 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-black/20 backdrop-blur-sm'}`}>
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        {/* Logo: User provided image or fallback icon matching HTML */}
                        <img src="/tiyuni-logo.png" alt="Tiyuni Peaks Logo" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                        <Mountain className="text-white w-6 h-6 stroke-[1.5] hidden" />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <Link to="/" className={getLinkClass('/')}>Home</Link>
                    <Link to="/#available-plots" className="hover:text-white transition">Available Plots</Link>
                    <Link to="/pricing" className={getLinkClass('/pricing')}>Pricing and Payments</Link>
                    <Link to="/#about" className="hover:text-white transition">About Us</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/contact"
                        className={`hidden sm:block px-4 py-2 rounded text-sm font-medium transition ${isActive('/contact') ? 'bg-zinc-200 text-black' : 'bg-white text-black hover:bg-gray-200'}`}
                    >
                        Contact Us
                    </Link>
                    <a href="http://localhost:5173" className="bg-[#1a1a1a] text-white border border-white/10 px-4 py-2 rounded text-sm font-medium hover:bg-[#252525] transition">Login to Dashboard</a>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-[#050505] border-b border-white/10 overflow-hidden"
                    >
                        <div className="p-4 space-y-4 flex flex-col items-center">
                            <Link to="/" className={isActive('/') ? "text-orange-400 text-lg font-medium" : "text-gray-300 hover:text-white text-lg font-medium"} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                            <Link to="/#available-plots" className="text-gray-300 hover:text-white text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Available Plots</Link>
                            <Link to="/pricing" className={isActive('/pricing') ? "text-orange-400 text-lg font-medium" : "text-gray-300 hover:text-white text-lg font-medium"} onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                            <Link to="/#about" className="text-gray-300 hover:text-white text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                            <hr className="w-full border-white/10" />
                            <Link to="/contact" className={`w-full py-3 rounded font-medium text-center ${isActive('/contact') ? 'bg-zinc-200 text-black' : 'bg-white text-black'}`} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                            <a href="http://localhost:5173" className="w-full text-white border border-white/10 py-3 rounded font-medium text-center inline-block">Login</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
