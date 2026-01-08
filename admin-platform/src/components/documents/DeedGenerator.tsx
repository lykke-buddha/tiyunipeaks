import { useRef } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../data/plots';

interface DeedGeneratorProps {
    buyerName: string;
    plotNumber: string;
    size: number;
    value: number;
    date: string;
    onClose?: () => void;
}

export function DeedGenerator({ buyerName, plotNumber, size, value, date, onClose }: DeedGeneratorProps) {
    const deedRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="w-full max-w-3xl bg-white shadow-2xl relative">
                {/* Actions Bar */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-3 print:hidden">
                    <h3 className="font-semibold text-gray-900">Generated Title Deed</h3>
                    <div className="flex gap-2">
                        <button onClick={onClose} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900">
                            Close
                        </button>
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
                        >
                            <Download width={16} />
                            Print / Save PDF
                        </button>
                    </div>
                </div>

                {/* Deed Content */}
                <div ref={deedRef} className="p-12 md:p-16 text-center space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] bg-amber-50/30">
                    <div className="border-4 border-double border-gray-800 p-8 h-full relative">
                        {/* Decorative Borders/Corners could go here */}

                        <div className="space-y-2 mb-12">
                            <h1 className="text-4xl font-serif font-bold text-gray-900 uppercase tracking-widest">Certificate of Title</h1>
                            <p className="text-gray-500 font-serif italic text-lg">Republic of Malawi - Land Registry</p>
                        </div>

                        <div className="space-y-6 text-lg font-serif leading-relaxed text-gray-800 text-left px-8">
                            <p>
                                THIS IS TO CERTIFY that <span className="font-bold underline decoration-dotted">{buyerName}</span> is the registered proprietor of an estate in fee simple in the land described below:
                            </p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 my-8 border-t border-b border-gray-300 py-8">
                                <div>
                                    <span className="block text-sm text-gray-500 uppercase tracking-wider font-sans">Plot Number</span>
                                    <span className="text-2xl font-bold">{plotNumber}</span>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-500 uppercase tracking-wider font-sans">Estate Name</span>
                                    <span className="text-2xl font-bold">Tiyuni Peaks</span>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-500 uppercase tracking-wider font-sans">Plot Size</span>
                                    <span className="text-xl font-bold">{size.toFixed(4)} Hectares</span>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-500 uppercase tracking-wider font-sans">Valuation</span>
                                    <span className="text-xl font-bold">{formatCurrency(value)}</span>
                                </div>
                            </div>

                            <p>
                                SUBJECT TO such reservations, restrictions, encumbrances, liens, and interests as are notified by memorial underwritten or endorsed hereon.
                            </p>

                            <p>
                                IN WITNESS WHEREOF, the said Company has hereunto set its hand and seal this <span className="font-bold">{new Date(date).toLocaleDateString()}</span>.
                            </p>
                        </div>

                        <div className="mt-20 flex justify-between items-end px-8">
                            <div className="text-center">
                                <div className="h-0.5 w-48 bg-gray-900 mb-2"></div>
                                <p className="text-sm uppercase font-serif tracking-wider">Registrar of Titles</p>
                            </div>

                            <div className="text-center group relative cursor-help">
                                {/* Digital Seal */}
                                <div className="w-24 h-24 rounded-full border-4 border-emerald-800 text-emerald-800 flex items-center justify-center p-2 rotate-[-15deg] opacity-80 mix-blend-multiply">
                                    <div className="text-[10px] font-bold uppercase text-center leading-tight">
                                        Official Seal<br />Tiyuni Peaks<br />Verified
                                    </div>
                                    <CheckCircle className="absolute w-8 h-8 text-emerald-600 bg-white rounded-full" />
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-mono w-max opacity-0 group-hover:opacity-100 transition-opacity">
                                    DSIG: {Math.random().toString(36).substr(2, 16).toUpperCase()}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="font-signature text-3xl mb-1 text-gray-800" style={{ fontFamily: 'cursive' }}>J. Banda</div>
                                <div className="h-0.5 w-48 bg-gray-900 mb-2"></div>
                                <p className="text-sm uppercase font-serif tracking-wider">Company Director</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
