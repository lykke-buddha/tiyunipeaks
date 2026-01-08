import { useRef } from 'react';
import { Download, Printer, X } from 'lucide-react';
import { formatCurrency } from '../../data/plots';
import { useData } from '../../context/DataContext';
import type { User, Payment } from '../../context/DataContext';
import type { Plot } from '../../data/plots';

interface ReceiptGeneratorProps {
    payment: Payment;
    user: User;
    plot: Plot;
    onClose: () => void;
}

export function ReceiptGenerator({ payment, user, plot, onClose }: ReceiptGeneratorProps) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto print:p-0 print:absolute print:inset-0 print:bg-white print:z-[100]">
            <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none print:w-full print:max-w-none print:rounded-none">
                {/* Controls - Hidden when printing */}
                <div className="bg-gray-900 text-white p-4 flex justify-between items-center print:hidden">
                    <h2 className="text-lg font-semibold">Payment Receipt</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            <Printer className="w-4 h-4" />
                            Print Receipt
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-800 hover:bg-gray-700 p-2 rounded-md transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Receipt Content */}
                <div ref={receiptRef} className="p-12 print:p-8 space-y-8 text-gray-900">
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-gray-200 pb-8">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 mb-2">
                                TIYUNI PEAKS
                            </h1>
                            <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Official Receipt</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-sm text-gray-600">Receipt #: <span className="font-mono font-medium text-gray-900">{payment.id.slice(0, 8).toUpperCase()}</span></p>
                            <p className="text-sm text-gray-600">Date: <span className="font-medium text-gray-900">{new Date(payment.date).toLocaleDateString()}</span></p>
                        </div>
                    </div>

                    {/* From / To Section */}
                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">Received From</h3>
                            <div>
                                <p className="text-lg font-bold text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                                <p className="text-sm text-gray-600">{user.phone}</p>
                                {user.address && <p className="text-sm text-gray-600">{user.address}</p>}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">Payment For</h3>
                            <div>
                                <p className="text-lg font-bold text-gray-900">Plot {plot.plotNumber}</p>
                                <p className="text-sm text-gray-600">Size: {plot.size.toFixed(4)} Ha</p>
                                <p className="text-sm text-gray-600">Total Value: {formatCurrency(plot.finalValue)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1 mb-4">Transaction Details</h3>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                                    <th className="px-4 py-3 font-medium">Description</th>
                                    <th className="px-4 py-3 font-medium">Method</th>
                                    <th className="px-4 py-3 font-medium">Reference</th>
                                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="px-4 py-4 text-sm text-gray-900">{payment.type} - {plot.plotNumber}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600">{payment.method}</td>
                                    <td className="px-4 py-4 text-sm font-mono text-gray-500">{payment.reference || '-'}</td>
                                    <td className="px-4 py-4 text-sm font-bold text-gray-900 text-right">{formatCurrency(payment.amount)}</td>
                                </tr>
                            </tbody>
                            <tfoot className="border-t-2 border-gray-900">
                                <tr>
                                    <td colSpan={3} className="px-4 py-4 text-right text-sm font-bold text-gray-900">TOTAL PAID</td>
                                    <td className="px-4 py-4 text-right text-lg font-bold text-emerald-600">{formatCurrency(payment.amount)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Footer / Signature */}
                    <div className="pt-16 grid grid-cols-2 gap-12 mt-auto">
                        <div className="border-t border-gray-300 pt-4">
                            <p className="text-sm font-medium text-gray-900">Authorized Signature</p>
                            <p className="text-xs text-gray-500 mt-1">Tiyuni Peaks Administration</p>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                            <p>This is a computer-generated receipt.</p>
                            <p>Generated on {new Date().toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
