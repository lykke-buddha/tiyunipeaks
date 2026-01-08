import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, CreditCard, FileText, User, LogOut, Search, Bell } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function CustomerDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            navigate('/auth/login');
            return;
        }
        setUser(user);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: Map },
        { id: 'plots', label: 'My Plots', icon: Map },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'deeds', label: 'Title Deeds', icon: FileText },
        { id: 'profile', label: 'Settings', icon: User },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col fixed h-full z-20 hidden md:flex">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg rotate-45 flex items-center justify-center">
                            <div className="w-4 h-4 bg-black rotate-45" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Tiyuni Peaks</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 bg-[#050505]">
                {/* Header */}
                <header className="h-20 border-b border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-medium text-white">
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'plots' && 'My Properties'}
                            {activeTab === 'payments' && 'Financial History'}
                            {activeTab === 'deeds' && 'Digital Deeds'}
                            {activeTab === 'profile' && 'Account Settings'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden sm:block">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input className="bg-[#111] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-orange-500 focus:outline-none w-64" placeholder="Search..." />
                        </div>
                        <button className="relative text-gray-400 hover:text-white transition">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-purple-600 border border-white/20"></div>
                    </div>
                </header>

                <div className="p-8">
                    {/* Content Area */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-6xl mx-auto"
                    >
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Welcome Banner */}
                                <div className="bg-gradient-to-r from-orange-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Friend'}!</h2>
                                        <p className="text-gray-300 max-w-xl">Your journey to the peaks is just beginning. You currently have 0 active property applications.</p>
                                        <button className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">Browse New Plots</button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        { label: "Total Plots", val: "0", bg: "bg-blue-500/10", text: "text-blue-500" },
                                        { label: "Pending Applications", val: "0", bg: "bg-orange-500/10", text: "text-orange-500" },
                                        { label: "Next Payment", val: "MWK 0.00", bg: "bg-emerald-500/10", text: "text-emerald-500" }
                                    ].map((stat, i) => (
                                        <div key={i} className={`p-6 rounded-2xl border border-white/5 ${stat.bg}`}>
                                            <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
                                            <h3 className={`text-3xl font-bold ${stat.text}`}>{stat.val}</h3>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'plots' && (
                            <div className="text-center py-20">
                                <Map className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-300">No plots yet</h3>
                                <p className="text-gray-500 mt-2 mb-6">Start your collection by browsing available plots.</p>
                                <button onClick={() => navigate('/home#available-plots')} className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition">View Catalog</button>
                            </div>
                        )}

                        {/* Placeholders for other tabs */}
                        {(activeTab === 'payments' || activeTab === 'deeds' || activeTab === 'profile') && (
                            <div className="text-center py-20 text-gray-500">
                                Feature coming soon.
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
