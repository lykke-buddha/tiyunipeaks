import { useState } from 'react';
import { X, Map, User, CreditCard, Calendar, Scroll } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency, type Plot } from '../../data/plots';
// import { DeedGenerator } from '../documents/DeedGenerator';

interface PlotDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    plotId: string | null;
}

export function PlotDetailsModal({ isOpen, onClose, plotId }: PlotDetailsModalProps) {
    const { plots, users, payments } = useData();
    const [showDeed, setShowDeed] = useState(false);

    if (!isOpen || !plotId) return null;

    const plot = plots.find(p => p.id === plotId);
    if (!plot) return null;

    const buyer = users.find(u => u.name === plot.buyerName || u.purchasedPlots.includes(plot.id));
    const plotPayments = payments.filter(p => p.plotId === plotId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const totalPaid = plotPayments.reduce((sum, p) => p.status === 'Completed' ? sum + p.amount : sum, 0);
    const balance = plot.finalValue - totalPaid;
    const progress = Math.min((totalPaid / plot.finalValue) * 100, 100);

    const canViewDeed = plot.status === 'Sold' && balance <= 1; // Tolerance for float

    /*
    if (showDeed && plot.buyerName) {
        return (
            <DeedGenerator
                buyerName={plot.buyerName}
                plotNumber={plot.plotNumber}
                size={plot.size}
                value={plot.finalValue}
                date={plot.soldDate || new Date().toISOString()} // Use soldDate if available
                onClose={() => setShowDeed(false)}
            />
        );
    }
    */

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl ring-1 ring-gray-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-6 sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                            <Map className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Plot {plot.plotNumber}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${plot.status === 'Available' ? 'bg-emerald-50 text-emerald-700' :
                                    plot.status === 'Sold' ? 'bg-gray-50 text-gray-600' :
                                        'bg-amber-50 text-amber-700'
                                    }`}>
                                    {plot.status}
                                </span>
                                {canViewDeed && (
                                    <button
                                        onClick={() => setShowDeed(true)}
                                        className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
                                    >
                                        <Scroll width={12} />
                                        View Deed
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                        <X width={24} />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Total Value</p>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(plot.finalValue)}</p>
                            <p className="text-xs text-gray-400">{plot.size.toFixed(4)} Ha @ {formatCurrency(plot.pricePerHa)}/Ha</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-500">Balance Due</p>
                            <p className={`text-lg font-bold ${balance > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                {formatCurrency(Math.max(0, balance))}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Buyer Info */}
                    {buyer ? (
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-3">
                                <User className="w-4 h-4 text-gray-500" />
                                Owner Information
                            </h3>
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <p className="font-medium text-gray-900">{buyer.name}</p>
                                <div className="mt-1 text-sm text-gray-500 grid grid-cols-2 gap-2">
                                    <p>{buyer.email}</p>
                                    <p>{buyer.phone}</p>
                                </div>
                            </div>
                        </div>
                    ) : plot.buyerName ? (
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-3">
                                <User className="w-4 h-4 text-gray-500" />
                                Owner Information (Legacy)
                            </h3>
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <p className="font-medium text-gray-900">{plot.buyerName}</p>
                            </div>
                        </div>
                    ) : null}

                    {/* Payment History */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-3">
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            Payment History
                        </h3>
                        {plotPayments.length > 0 ? (
                            <div className="flow-root">
                                <ul className="-mb-8">
                                    {plotPayments.map((payment, idx) => (
                                        <li key={payment.id}>
                                            <div className="relative pb-8">
                                                {idx !== plotPayments.length - 1 ? (
                                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                                ) : null}
                                                <div className="relative flex space-x-3">
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${payment.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'
                                                        }`}>
                                                        <Calendar className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                        <div>
                                                            <p className="text-sm text-gray-900 font-medium">
                                                                {payment.type} <span className="text-gray-500 font-normal">via {payment.method}</span>
                                                            </p>
                                                            {payment.reference && (
                                                                <p className="text-xs text-gray-500 font-mono mt-0.5">Ref: {payment.reference}</p>
                                                            )}
                                                        </div>
                                                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                            <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                                                            <time className="text-xs" dateTime={payment.date}>{new Date(payment.date).toLocaleDateString()}</time>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                <p className="text-sm text-gray-500">No payment records found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
