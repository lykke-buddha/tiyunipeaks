import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../data/plots';
import { DeedGenerator } from '../documents/DeedGenerator';

interface NewSaleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewSaleModal({ isOpen, onClose }: NewSaleModalProps) {
    const { plots, users, addPayment, updatePlot } = useData();
    const [step, setStep] = useState(1);
    const [selectedPlotId, setSelectedPlotId] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [showDeed, setShowDeed] = useState(false);

    // Filters for selection
    const [plotSearch, setPlotSearch] = useState('');
    const [custSearch, setCustSearch] = useState('');

    if (!isOpen) return null;

    const availablePlots = plots.filter(p =>
        p.status === 'Available' &&
        p.plotNumber.toLowerCase().includes(plotSearch.toLowerCase())
    );

    const activeUsers = users.filter(u =>
        u.name.toLowerCase().includes(custSearch.toLowerCase())
    );

    const handleConfirmSale = () => {
        const plot = plots.find(p => p.id === selectedPlotId);
        const user = users.find(u => u.id === selectedUserId);

        if (plot && user) {
            updatePlot(plot.id, {
                status: 'Sold',
                buyerName: user.name,
                soldDate: new Date().toISOString()
            });
            addPayment({
                plotId: plot.id,
                userId: user.id,
                amount: plot.finalValue,
                status: 'Completed',
                method: 'Bank Transfer', // Default for now
                type: 'Full Payment',
                date: new Date().toISOString()
            });
            setShowDeed(true);
        }
    };

    if (showDeed) {
        const plot = plots.find(p => p.id === selectedPlotId)!;
        const user = users.find(u => u.id === selectedUserId)!;

        return (
            <DeedGenerator
                buyerName={user.name}
                plotNumber={plot.plotNumber}
                size={plot.size}
                value={plot.finalValue}
                date={new Date().toISOString()}
                onClose={() => {
                    setShowDeed(false);
                    onClose();
                    setStep(1);
                    setSelectedPlotId('');
                    setSelectedUserId('');
                }}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl ring-1 ring-gray-200">
                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <h2 className="text-lg font-semibold text-gray-900">Record New Sale</h2>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                        <X width={20} />
                    </button>
                </div>

                <div className="p-4 space-y-6">
                    {/* Stepper */}
                    <div className="flex items-center justify-center gap-2">
                        <div className={`h-2 w-12 rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-2 w-12 rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-2 w-12 rounded-full ${step >= 3 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                    </div>

                    {step === 1 && (
                        <div className="space-y-4">
                            <h3 className="text-md font-medium text-gray-900">Select Plot</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search plot number..."
                                    className="w-full rounded-md border border-gray-300 pl-9 py-2 text-sm"
                                    value={plotSearch}
                                    onChange={e => setPlotSearch(e.target.value)}
                                />
                            </div>
                            <div className="max-h-60 overflow-y-auto border rounded-md divide-y">
                                {availablePlots.slice(0, 50).map(plot => (
                                    <div
                                        key={plot.id}
                                        onClick={() => setSelectedPlotId(plot.id)}
                                        className={`p-3 flex justify-between cursor-pointer hover:bg-gray-50 ${selectedPlotId === plot.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : ''}`}
                                    >
                                        <span className="font-medium">{plot.plotNumber}</span>
                                        <span className="text-gray-600">{formatCurrency(plot.finalValue)}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                disabled={!selectedPlotId}
                                onClick={() => setStep(2)}
                                className="w-full bg-gray-900 text-white py-2 rounded-md disabled:opacity-50"
                            >
                                Next: Select Customer
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <h3 className="text-md font-medium text-gray-900">Select Buyer</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search specific customer..."
                                    className="w-full rounded-md border border-gray-300 pl-9 py-2 text-sm"
                                    value={custSearch}
                                    onChange={e => setCustSearch(e.target.value)}
                                />
                            </div>
                            {activeUsers.length === 0 ? (
                                <p className="text-gray-500 text-sm text-center py-4">No filtered customers found.</p>
                            ) : (
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {activeUsers.map(user => (
                                        <div
                                            key={user.id}
                                            onClick={() => setSelectedUserId(user.id)}
                                            className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedUserId === user.id
                                                ? 'border-emerald-500 bg-emerald-50'
                                                : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-3">
                                <button onClick={() => setStep(1)} className="w-1/3 border py-2 rounded-md">Back</button>
                                <button
                                    disabled={!selectedUserId}
                                    onClick={() => setStep(3)}
                                    className="w-2/3 bg-gray-900 text-white py-2 rounded-md disabled:opacity-50"
                                >
                                    Review & Confirm
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 text-center">
                            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg">
                                <h4 className="font-semibold mb-2">Transaction Summary</h4>
                                <p>Plot: <span className="font-bold">{plots.find(p => p.id === selectedPlotId)?.plotNumber}</span></p>
                                <p>Buyer: <span className="font-bold">{users.find(c => c.id === selectedUserId)?.name}</span></p>
                                <p className="text-xl font-bold mt-2">{formatCurrency(plots.find(p => p.id === selectedPlotId)?.finalValue || 0)}</p>
                            </div>

                            <p className="text-sm text-gray-500">
                                This will generate a digital Deed of Transfer signed by the company director.
                            </p>

                            <div className="flex gap-3">
                                <button onClick={() => setStep(2)} className="w-1/3 border py-2 rounded-md">Back</button>
                                <button
                                    onClick={handleConfirmSale}
                                    className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md font-medium shadow-md transition-colors"
                                >
                                    Confirm Sale & Generate Deed
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
