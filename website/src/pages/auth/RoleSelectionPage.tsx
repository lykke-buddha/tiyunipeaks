import { motion } from 'framer-motion';
import { User, Briefcase, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RoleSelectionPage() {
    const adminUrl = import.meta.env.VITE_ADMIN_PLATFORM_URL;

    const cards = [
        {
            icon: User,
            title: "I want to buy a plot",
            desc: "Browse available plots, make purchases, and manage your property.",
            action: "/auth/signup",
            btnText: "Continue as Buyer",
            internal: true
        },
        {
            icon: Briefcase,
            title: "I'm an Employee",
            desc: "Manage sales, assist customers, and process transactions.",
            action: `${adminUrl}/login`,
            btnText: "Employee Sign In",
            internal: false
        },
        {
            icon: Shield,
            title: "Administrator",
            desc: "Full system access and management capabilities.",
            action: `${adminUrl}/login`,
            btnText: "Admin Sign In",
            internal: false
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-medium mb-4">Welcome back</h1>
                    <p className="text-gray-400 text-lg">How would you like to continue today?</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#111] p-8 rounded-2xl border border-white/10 hover:border-orange-500/50 hover:bg-[#151515] transition-all group flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-400 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-colors">
                                <card.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-3">{card.title}</h3>
                            <p className="text-gray-400 mb-8 font-light flex-grow">{card.desc}</p>

                            {card.internal ? (
                                <Link
                                    to={card.action}
                                    className="w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-gray-200 transition"
                                >
                                    {card.btnText}
                                </Link>
                            ) : (
                                <a
                                    href={card.action}
                                    className="w-full bg-[#222] text-white py-4 rounded-lg font-bold hover:bg-[#333] transition"
                                >
                                    {card.btnText}
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/" className="text-gray-500 hover:text-white transition">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
