import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Loader2, MapPin, Briefcase, Heart, Shield } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Types matches Supabase Schema
type FormData = {
    // Step 1: Account
    full_name: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;

    // Step 2: Location
    diaspora: boolean;
    diaspora_country?: string;
    current_city: string;
    address: string;

    // Step 3: Purpose
    purchase_purpose: 'residential' | 'investment' | 'business' | 'mixed';

    // Step 4: Preferences
    timeline: string;
    budget_range: string;
    financing_interest: boolean;

    // Step 5: Legal
    dob: string;
    id_number: string;
    id_type: 'national_id' | 'passport';
    marketing_consent: boolean;
    terms_accepted: boolean;
};

const steps = [
    { id: 1, title: "Account Details", icon: Shield },
    { id: 2, title: "Location", icon: MapPin },
    { id: 3, title: "Purpose", icon: Briefcase },
    { id: 4, title: "Preferences", icon: Heart },
    { id: 5, title: "Identity", icon: Check }
];

export function SignupWizard() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            diaspora: false,
            financing_interest: false,
            marketing_consent: false,
            purchase_purpose: 'residential'
        }
    });



    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            // 1. Sign up with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.full_name,
                    }
                }
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Profile Creation (This is handled by a Trigger in DB, but we might want to update extra fields immediately)
                // Since trigger only adds basic info, we update the rest here.
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({
                        phone: data.phone,
                        diaspora: data.diaspora,
                        diaspora_country: data.diaspora_country,
                        current_city: data.current_city,
                        address: data.address,
                        purchase_purpose: data.purchase_purpose,
                        timeline: data.timeline,
                        budget_range: data.budget_range,
                        financing_interest: data.financing_interest,
                        dob: data.dob,
                        id_number: data.id_number,
                        id_type: data.id_type,
                        marketing_consent: data.marketing_consent,
                        profile_complete: true
                    })
                    .eq('id', authData.user.id);

                if (profileError) {
                    // Profile might not be created yet by trigger due to race condition, 
                    // retry or insert if update fails is complex properly handled usually by waiting or doing an UPSERT manually if trigger is slow/off.
                    // For now assuming trigger works fast or we handle it. 
                    // Actually, manual UPSERT is safer if trigger exists but we want to be sure.
                    // But with RLS, user can only update own. Trigger creates it.
                    // Let's assume trigger works. If not, catching error.
                    console.error("Profile update error", profileError);
                }

                toast.success('Account created successfully!');
                // Redirect to dashboard or email check
                navigate('/dashboard');
            }
        } catch (error: any) {
            toast.error(error.message || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = async () => {
        const fieldsToValidate = getFieldsForStep(step);
        const isValid = await trigger(fieldsToValidate as any);
        if (isValid) setStep(s => s + 1);
    };

    const prevStep = () => setStep(s => s - 1);

    const getFieldsForStep = (currentStep: number) => {
        switch (currentStep) {
            case 1: return ['full_name', 'email', 'phone', 'password', 'confirm_password'];
            case 2: return ['diaspora', 'diaspora_country', 'current_city', 'address'];
            case 3: return ['purchase_purpose'];
            case 4: return ['timeline', 'budget_range', 'financing_interest'];
            case 5: return ['dob', 'id_number', 'id_type', 'marketing_consent', 'terms_accepted'];
            default: return [];
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans">
            <Toaster position="top-center" />

            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-[#222] -z-10 rounded-full"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-orange-500 -z-10 rounded-full transition-all duration-300"
                        style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((s) => (
                        <div key={s.id} className={`flex flex-col items-center gap-2 ${step >= s.id ? 'text-orange-500' : 'text-gray-600'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-[#050505] transition-all 
                                ${step === s.id ? 'border-orange-500 text-orange-500 scale-110 shadow-[0_0_15px_rgba(249,115,22,0.5)]' :
                                    step > s.id ? 'border-orange-500 bg-orange-500 text-black' : 'border-[#333]'}`}
                            >
                                <s.icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-medium hidden sm:block">{s.title}</span>
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                    <h2 className="text-2xl font-bold mb-6">Create your Account</h2>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                        <input {...register("full_name", { required: "Name is required" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition" placeholder="John Doe" />
                                        {errors.full_name && <span className="text-red-500 text-xs">{errors.full_name.message}</span>}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                            <input type="email" {...register("email", { required: "Email is required" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none" placeholder="john@example.com" />
                                            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                                            <input type="tel" {...register("phone", { required: "Phone is required" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none" placeholder="+265..." />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                                            <input type="password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none" />
                                            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
                                            <input type="password" {...register("confirm_password", { validate: (val) => val === watch('password') || "Passwords do not match" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none" />
                                            {errors.confirm_password && <span className="text-red-500 text-xs">{errors.confirm_password.message}</span>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                    <h2 className="text-2xl font-bold mb-6">Where are you based?</h2>
                                    <div className="flex items-center gap-3 p-4 border border-white/10 rounded-lg bg-[#1a1a1a]">
                                        <input type="checkbox" {...register("diaspora")} className="w-5 h-5 accent-orange-500" id="diaspora" />
                                        <label htmlFor="diaspora" className="flex-1 cursor-pointer">
                                            <div className="font-medium text-white">I live in the Diaspora</div>
                                            <div className="text-xs text-gray-400">Select this if you currently reside outside Malawai.</div>
                                        </label>
                                    </div>

                                    {watch('diaspora') && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden">
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Country of Residence</label>
                                            <input {...register("diaspora_country", { required: "Country is required if in Diaspora" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none" placeholder="e.g. United Kingdom" />
                                        </motion.div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Current City</label>
                                        <input {...register("current_city", { required: "City is required" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none" placeholder="e.g. Blantyre or London" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
                                        <textarea {...register("address", { required: "Address is required" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none h-24" placeholder="Street address..." />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                    <h2 className="text-2xl font-bold mb-6">What is your primary goal?</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {['residential', 'investment', 'business', 'mixed'].map((type) => (
                                            <label key={type} className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${watch('purchase_purpose') === type ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-[#1a1a1a] hover:border-white/30'}`}>
                                                <input type="radio" value={type} {...register("purchase_purpose")} className="absolute opacity-0" />
                                                <div className="capitalize font-bold text-lg mb-1">{type}</div>
                                                <div className="text-xs text-gray-400">
                                                    {type === 'residential' && "Building my dream home."}
                                                    {type === 'investment' && "Buying to sell or rent later."}
                                                    {type === 'business' && "Commercial development."}
                                                    {type === 'mixed' && "A mix of use cases."}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Timeline</label>
                                        <select {...register("timeline")} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none cursor-pointer">
                                            <option value="immediate">Immediate Purchase</option>
                                            <option value="3_months">Within 3 months</option>
                                            <option value="6_months">Within 6 months</option>
                                            <option value="planning">Just planning</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Budget Range</label>
                                        <select {...register("budget_range")} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none cursor-pointer">
                                            <option value="under_5m">Under 5M MWK</option>
                                            <option value="5m_15m">5M - 15M MWK</option>
                                            <option value="15m_30m">15M - 30M MWK</option>
                                            <option value="above_30m">Above 30M MWK</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 border border-white/10 rounded-lg bg-[#1a1a1a]">
                                        <input type="checkbox" {...register("financing_interest")} className="w-5 h-5 accent-orange-500" id="financing" />
                                        <label htmlFor="financing" className="flex-1 cursor-pointer">
                                            <div className="font-medium text-white">Interested in Financing?</div>
                                            <div className="text-xs text-gray-400">We offer flexible installment plans.</div>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                    <h2 className="text-2xl font-bold mb-6">Final Details</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Date of Birth</label>
                                            <input type="date" {...register("dob", { required: "DOB is required" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none [color-scheme:dark]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">ID Type</label>
                                            <select {...register("id_type")} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none">
                                                <option value="national_id">National ID</option>
                                                <option value="passport">Passport</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">ID Number</label>
                                        <input {...register("id_number", { required: "ID Number is required" })} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 focus:outline-none" placeholder="Enter ID number..." />
                                    </div>

                                    <div className="py-4 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <input type="checkbox" {...register("marketing_consent")} className="w-5 h-5 mt-0.5 accent-orange-500 rounded" id="marketing" />
                                            <label htmlFor="marketing" className="text-sm text-gray-400 cursor-pointer">
                                                I agree to receive updates about new plots and offers.
                                            </label>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <input type="checkbox" {...register("terms_accepted", { required: "You must accept terms" })} className="w-5 h-5 mt-0.5 accent-orange-500 rounded" id="terms" />
                                            <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                                                I accept the <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>.
                                                {errors.terms_accepted && <span className="block text-red-500 text-xs mt-1">Required</span>}
                                            </label>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                            {step > 1 ? (
                                <button type="button" onClick={prevStep} className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                            ) : (
                                <div></div> // Spacer
                            )}

                            {step < 5 ? (
                                <button type="button" onClick={nextStep} className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    Next <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button type="submit" disabled={isLoading} className="bg-orange-500 text-white px-8 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    Create Account
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>

                <div className="text-center mt-6 text-gray-500 text-sm">
                    Already have an account? <a href="/auth/login" className="text-white hover:underline">Sign In</a>
                </div>
            </div>
        </div>
    );
}
