import { useState, useEffect } from 'react';
import { X, DollarSign, Search, CreditCard, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../data/plots';
import type { Payment } from '../../context/DataContext';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
    const { plots, users, addPayment } = useData();
    const [step, setStep] = useState(1);

    // Form State
    const [selectedPlotId, setSelectedPlotId] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [method, setMethod] = useState<Payment['method']>('Bank Transfer');
    const [type, setType] = useState<Payment['type']>('Installment');
    const [reference, setReference] = useState('');
    const [notes, setNotes] = useState('');

    // Search State
    const [plotSearch, setPlotSearch] = useState('');

    // Reset on open
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setSelectedPlotId('');
            setSelectedUserId('');
            setAmount('');
            setDate(new Date().toISOString().split('T')[0]);
            setMethod('Bank Transfer');
            setType('Installment');
            setReference('');
            setNotes('');
            setPlotSearch('');
        }
    }, [isOpen]);

    // Derived State
    const validPlots = plots.filter(p =>
        (p.status === 'Sold' || p.status === 'Reserved') &&
        p.plotNumber.toLowerCase().includes(plotSearch.toLowerCase())
    );

    const selectedPlot = plots.find(p => p.id === selectedPlotId);
    const selectedUser = users.find(u => u.id === selectedUserId);

    // Auto-select user when plot is selected
    useEffect(() => {
        if (selectedPlot) {
            // Try to find user by name if linked (legacy) or just use name to find user in list
            // Ideally plot would have userId, but currently it has buyerName.
            // users have purchasedPlots array.
            const owner = users.find(u => u.purchasedPlots.includes(selectedPlot.id) || u.name === selectedPlot.buyerName);
            if (owner) {
                setSelectedUserId(owner.id);
            }
        }
    }, [selectedPlot, users]);


    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPlotId || !selectedUserId || !amount) return;

        addPayment({
            plotId: selectedPlotId,
            userId: selectedUserId,
            amount: parseFloat(amount),
            date: new Date(date).toISOString(),
            method,
            type,
            status: 'Completed',
            reference,
            notes
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl ring-1 ring-gray-200 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-50 rounded-full">
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Record Payment</h2>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                        <X width={20} />
                    </button>
                </div>

                <div className="p-5 overflow-y-auto">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 mb-4">
                                Select a plot to record a payment for. Only Sold or Reserved plots are listed.
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search plot number..."
                                    className="w-full rounded-md border border-gray-300 pl-9 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    value={plotSearch}
                                    onChange={e => setPlotSearch(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="max-h-64 overflow-y-auto border rounded-md divide-y">
                                {validPlots.map(plot => (
                                    <div
                                        key={plot.id}
                                        onClick={() => {
                                            setSelectedPlotId(plot.id);
                                            setStep(2);
                                        }}
                                        className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors group"
                                    >
                                        <div>
                                            <span className="font-medium text-gray-900">{plot.plotNumber}</span>
                                            <div className="text-xs text-gray-500">{plot.buyerName || 'Unknown Buyer'}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-gray-900">{formatCurrency(plot.finalValue)}</div>
                                            <div className={`text-xs ${plot.status === 'Sold' ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                {plot.status}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {validPlots.length === 0 && (
                                    <div className="p-8 text-center text-gray-500 text-sm">No matching plots found.</div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Selected Plot</p>
                                    <p className="font-semibold text-gray-900">{selectedPlot?.plotNumber}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                                >
                                    Change
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Payer Name</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={selectedUser?.name || selectedPlot?.buyerName || 'Unknown'}
                                        className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500 sm:text-sm cursor-not-allowed"
                                    />
                                    {/* Ideally allow changing user if incorrect, but for now stick to linked user */}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Amount (MWK)</label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">MWK</span>
                                        </div>
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={amount}
                                            onChange={e => setAmount(e.target.value)}
                                            className="block w-full rounded-md border border-gray-300 pl-12 py-2 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                                    <select
                                        value={method}
                                        onChange={e => setMethod(e.target.value as Payment['method'])}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                    >
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Mobile Money">Mobile Money</option>
                                        <option value="Check">Check</option>
                                        <option value="Credit Card">Credit Card</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Payment Type</label>
                                    <select
                                        value={type}
                                        onChange={e => setType(e.target.value as Payment['type'])}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                    >
                                        <option value="Installment">Installment</option>
                                        <option value="Deposit">Deposit</option>
                                        <option value="Full Payment">Full Payment</option>
                                    </select>
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Reference / Notes</label>
                                    <input
                                        type="text"
                                        value={reference}
                                        onChange={e => setReference(e.target.value)}
                                        placeholder="e.g. Transaction ID, Check Number"
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                    Record Payment
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
