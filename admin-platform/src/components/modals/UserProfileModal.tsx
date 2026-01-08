import { X, User, MapPin, Phone, Mail, FileText, CreditCard } from 'lucide-react';
import type { User as UserType } from '../../context/DataContext';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../data/plots';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string | null;
}

export function UserProfileModal({ isOpen, onClose, userId }: UserProfileModalProps) {
    const { users, plots, payments } = useData();

    if (!isOpen || !userId) return null;

    const user = users.find(u => u.id === userId);
    if (!user) return null;

    const userPlots = plots.filter(p => user.purchasedPlots.includes(p.id) || p.buyerName === user.name); // Fallback to name match for legacy
    const userPayments = payments.filter(p => p.userId === userId);

    const totalSpent = userPayments
        .filter(p => p.status === 'Completed')
        .reduce((sum, p) => sum + p.amount, 0);

    const totalPlotValue = userPlots.reduce((sum, p) => sum + p.finalValue, 0);
    const balanceDue = totalPlotValue - totalSpent;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl ring-1 ring-gray-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-6 sticky top-0 bg-white z-10">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700' :
                                    user.role === 'Sales Agent' ? 'bg-blue-50 text-blue-700' :
                                        'bg-green-50 text-green-700'
                                }`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                        <X width={24} />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Info & Stats */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{user.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{user.address || 'No address provided'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-50 p-4 rounded-lg space-y-4 border border-emerald-100">
                            <h3 className="text-sm font-semibold text-emerald-900 uppercase tracking-wider">Financial Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-emerald-700">Total Plot Value</span>
                                    <span className="font-medium text-emerald-900">{formatCurrency(totalPlotValue)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-emerald-700">Total Paid</span>
                                    <span className="font-medium text-emerald-900">{formatCurrency(totalSpent)}</span>
                                </div>
                                <div className="pt-2 border-t border-emerald-200 flex justify-between text-sm font-bold">
                                    <span className="text-emerald-800">Outstanding Balance</span>
                                    <span className="text-emerald-900">{formatCurrency(balanceDue)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Plots & Payments Tabs/Lists */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Purchased Plots */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-gray-500" />
                                <h3 className="text-lg font-medium text-gray-900">Property Portfolio</h3>
                            </div>
                            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plot #</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size (Ha)</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Value</th>
                                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {userPlots.map(plot => (
                                            <tr key={plot.id}>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{plot.plotNumber}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500">{plot.size.toFixed(4)}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(plot.finalValue)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                                                        {plot.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {userPlots.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                                                    No properties purchased yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Payments */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-gray-500" />
                                <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
                            </div>
                            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {userPayments.map(pay => (
                                            <tr key={pay.id}>
                                                <td className="px-4 py-3 text-sm text-gray-500">{new Date(pay.date).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 text-sm text-gray-900">{pay.type}</td>
                                                <td className="px-4 py-3 text-sm text-gray-500">{pay.method}</td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(pay.amount)}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${pay.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                            pay.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {pay.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {userPayments.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                                                    No payment history found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
