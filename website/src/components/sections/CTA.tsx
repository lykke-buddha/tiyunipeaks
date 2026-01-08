import { Mail, MessageCircle } from 'lucide-react';

export function CTA() {
    return (
        <section className="relative py-24 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 text-center">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Build a Home</p>
                <h2 className="text-4xl font-semibold text-white mb-8 tracking-tight">Ready for your New Home?</h2>
                <p className="text-lg text-gray-400 mb-8">Get started today with your plot</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="bg-white text-black px-6 py-3 rounded text-sm font-semibold flex items-center gap-2 hover:bg-gray-100 transition min-w-[160px] justify-center">
                        <Mail className="w-4 h-4" />
                        Send Us an Email
                    </button>
                    <button className="bg-transparent border border-white/20 text-white px-6 py-3 rounded text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition min-w-[160px] justify-center">
                        <MessageCircle className="w-4 h-4" />
                        Connect Via WhatsApp
                    </button>
                </div>
            </div>
        </section>
    );
}
