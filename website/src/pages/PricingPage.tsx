import { Mail, MessageCircle, Calculator, Check, X, Loader2, LayoutGrid, Ruler } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/sections/Footer';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function PricingPage() {
    // Calculator State
    const [price, setPrice] = useState(2500000);
    const [depositPercent, setDepositPercent] = useState(20);
    const [months, setMonths] = useState(24);
    const interestRate = 15; // 15% annual interest example

    const depositAmount = price * (depositPercent / 100);
    const loanAmount = price - depositAmount;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    // Application Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-MW', { style: 'currency', currency: 'MWK', maximumFractionDigits: 0 }).format(val);
    };

    const handleApplyClick = () => {
        setIsModalOpen(true);
        setSubmitSuccess(false);
        setErrorMessage('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const { error } = await supabase
                .from('applications')
                .insert([
                    {
                        applicant_name: formData.name,
                        applicant_email: formData.email,
                        applicant_phone: formData.phone,
                        deposit_amount: depositAmount,
                        loan_duration_months: months,
                        status: 'pending',
                        notes: `Applied for financing. Price: ${price}, Deposit: ${depositPercent}%. ${formData.notes}`
                    }
                ]);

            if (error) throw error;
            setSubmitSuccess(true);
        } catch (error: any) {
            console.error('Error submitting application:', error);
            setErrorMessage(error.message || 'Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#9CA3AF] topographic-bg antialiased selection:bg-orange-500 selection:text-white font-sans">
            <Navbar />

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
                            Buy your dream plot at the Tiyuni Peaks Estate Development with flexible payment plans tailored to your needs.
                        </p>
                        <a href="#calculator" className="bg-white text-black pl-6 pr-5 py-4 rounded-lg text-base font-medium inline-flex items-center gap-2 hover:bg-gray-100 transition-transform hover:scale-[1.02]">
                            <Calculator className="w-5 h-5" />
                            Calculate Payments
                        </a>
                    </div>

                    {/* Right Side Image/Visual */}
                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
                                alt="Luxury Estate"
                                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute bottom-6 left-6 right-6 z-20">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">SELLING FAST</div>
                                    <div className="bg-white/10 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded border border-white/20">PHASE 1</div>
                                </div>
                                <h3 className="text-2xl text-white font-medium">Tiyuni Peaks Estate</h3>
                                <p className="text-gray-300 text-sm">Valid until 31st Dec 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Plot Pricing Section */}
            <section className="py-20 bg-[#080808]" id="available-plots">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-medium tracking-tight mb-4">Plot Pricing and Sizes</h2>
                    <p className="text-xl text-gray-400 mb-12 font-light">Choose the perfect size for your dream home.</p>

                    {/* Tabs - Static for now but could be interactive */}
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

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-sm">Access to water and electricity</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-sm">24/7 Security Patrols</span>
                                </li>
                            </ul>

                            <div className="flex items-end justify-between mb-8 border-t border-white/10 pt-6">
                                <div>
                                    <p className="text-gray-300 text-lg font-light mb-1">Starting from</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-semibold text-white">MWK 16,500,000</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Background */}
                        <div className="absolute inset-0 lg:left-1/3 bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30 lg:opacity-60 pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5e4d44] via-[#5e4d44]/90 to-transparent lg:w-2/3 pointer-events-none"></div>
                    </div>
                </div>
            </section>

            {/* Installment Calculator */}
            <section className="py-20 px-6" id="calculator">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-medium tracking-tight mb-4">Plot Financing Calculator</h2>
                    <p className="text-lg text-gray-400 font-light mb-12">Estimate your monthly payments. Adjust the deposit and duration to find a plan that suits you.</p>

                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 lg:p-10 grid md:grid-cols-2 gap-12">
                        {/* Inputs */}
                        <div className="space-y-8">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Plot Price (MWK)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg h-12 px-4 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-gray-400 text-sm">Deposit ({depositPercent}%)</label>
                                    <span className="text-white font-medium">{formatCurrency(depositAmount)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="50"
                                    value={depositPercent}
                                    onChange={(e) => setDepositPercent(Number(e.target.value))}
                                    className="w-full h-1 bg-[#262626] rounded-full appearance-none cursor-pointer accent-orange-500"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <label className="block text-gray-400 text-sm">Repayment Period</label>
                                    <span className="text-white font-medium">{months} Months</span>
                                </div>
                                <input
                                    type="range"
                                    min="6"
                                    max="60"
                                    step="6"
                                    value={months}
                                    onChange={(e) => setMonths(Number(e.target.value))}
                                    className="w-full h-1 bg-[#262626] rounded-full appearance-none cursor-pointer accent-orange-500"
                                />
                            </div>
                        </div>

                        {/* Results */}
                        <div className="bg-[#1a1a1a] rounded-xl p-8 flex flex-col justify-center border border-white/5">
                            <div className="text-center mb-8">
                                <p className="text-gray-400 text-sm mb-2">Estimated Monthly Payment</p>
                                <p className="text-4xl font-bold text-white">{formatCurrency(monthlyPayment)}</p>
                                <span className="text-xs text-orange-400 mt-2 block">*Includes {interestRate}% Annual Interest</span>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Loan Amount</span>
                                    <span className="text-white">{formatCurrency(loanAmount)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Total Interest</span>
                                    <span className="text-white">{formatCurrency((monthlyPayment * months) - loanAmount)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 pt-4 border-t border-white/10">
                                    <span>Total Repayment</span>
                                    <span className="text-orange-200">{formatCurrency(monthlyPayment * months)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleApplyClick}
                                className="w-full mt-8 bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition"
                            >
                                Apply for Finance
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#111111] border border-white/10 w-full max-w-lg rounded-2xl relative overflow-hidden shadow-2xl">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-2xl font-medium text-white mb-2">
                                    {submitSuccess ? 'Application Received' : 'Apply for Financing'}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {submitSuccess
                                        ? 'Thank you! Our team will review your application and contact you shortly.'
                                        : 'Fill in your details to start your journey to owning a plot at Tiyuni Peaks.'
                                    }
                                </p>
                            </div>

                            {submitSuccess ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Check className="w-8 h-8 text-green-500" />
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="mt-4 bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-200 transition"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1.5">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1.5">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1.5">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg h-11 px-4 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                                            placeholder="+265..."
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1.5">Additional Notes (Optional)</label>
                                        <textarea
                                            className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors resize-none h-24"
                                            placeholder="Any specific plot preferences or questions?"
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        />
                                    </div>

                                    {/* Summary of Selection within Form */}
                                    <div className="bg-[#1a1a1a] p-4 rounded-lg border border-white/5 text-sm space-y-2 mt-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Selected Plan</span>
                                            <span className="text-gray-300">{formatCurrency(price)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Deposit</span>
                                            <span className="text-gray-300">{formatCurrency(depositAmount)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Monthly</span>
                                            <span className="text-orange-400 font-medium">{formatCurrency(monthlyPayment)}/mo</span>
                                        </div>
                                    </div>

                                    {errorMessage && (
                                        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-white text-black h-12 rounded-lg font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Submit Request'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Commercial Section - Kept as is mostly */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-medium tracking-tight mb-4">Retail, Restaurant and Corporate Inquiries</h2>
                <div className="grid lg:grid-cols-12 gap-6 mt-12">
                    <div className="lg:col-span-12 bg-[#5e4d44] rounded-xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-medium mb-4 text-white">Commercial Opportunities</h3>
                            <p className="text-gray-200 text-lg leading-relaxed font-light max-w-2xl">
                                Tiyuni Peaks will have a wide variety of mixed use areas available.
                                Secure your retail space in this thriving new community.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-white text-black px-5 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                                <Mail className="w-4 h-4" /> Email Us
                            </button>
                            <button className="border border-white/30 text-white px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors">
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
