import { useState } from 'react';
import { Search, Mail, Plus, Eye, Pencil } from 'lucide-react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../data/plots';
import { AddUserModal } from '../components/modals/AddUserModal';
import { UserProfileModal } from '../components/modals/UserProfileModal';
import type { User } from '../context/DataContext';

export function Customers() {
    const { users, addUser, updateUser, plots } = useData();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // For editing, we reuse AddUserModal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Helper to calculate total spend per user
    const getUserSpend = (userPlots: string[]) => {
        return userPlots.reduce((total, plotId) => {
            const plot = plots.find(p => p.id === plotId);
            return total + (plot ? plot.finalValue : 0);
        }, 0);
    };

    // Helper to get plot numbers for display
    const getUserPlotNumbers = (userPlots: string[]) => {
        return userPlots.map(id => plots.find(p => p.id === id)?.plotNumber || 'Unknown');
    };

    const handleEditClick = (user: User) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleViewClick = (user: User) => {
        setSelectedUser(user);
        setIsProfileModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight text-gray-900">Customers</h1>
                    <p className="mt-1 text-sm text-gray-500">View and manage your client base.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="block w-full rounded-md border border-gray-200 bg-white py-1.5 pl-10 pr-3 text-sm placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:text-sm"
                            placeholder="Search customers..."
                        />
                    </div>
                    <button
                        onClick={() => {
                            setSelectedUser(null);
                            setIsAddModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors"
                    >
                        <Plus width={16} />
                        Add Customer
                    </button>
                </div>
            </div>

            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={addUser}
            />

            {/* Edit Modal reusing AddUserModal */}
            <AddUserModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedUser(null);
                }}
                onAdd={() => { }} // Not used in edit mode
                onEdit={updateUser}
                userToEdit={selectedUser}
            />

            <UserProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                userId={selectedUser?.id || null}
            />

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Customer</th>
                                <th className="px-6 py-3 font-medium">Plots Owned</th>
                                <th className="px-6 py-3 font-medium">Total Investment</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => {
                                const plotNumbers = getUserPlotNumbers(user.purchasedPlots);
                                const totalSpend = getUserSpend(user.purchasedPlots);

                                return (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Mail width={12} /> {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {plotNumbers.slice(0, 3).map((plotNum: string) => (
                                                    <span key={plotNum} className="inline-flex rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                        {plotNum}
                                                    </span>
                                                ))}
                                                {plotNumbers.length > 3 && (
                                                    <span className="inline-flex rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                        +{plotNumbers.length - 3}
                                                    </span>
                                                )}
                                                {plotNumbers.length === 0 && <span className="text-gray-400 italic">None</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-emerald-600">
                                            {formatCurrency(totalSpend)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${user.status === 'Active' ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-50 text-gray-600'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleViewClick(user)}
                                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                    title="View Profile"
                                                >
                                                    <Eye width={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleEditClick(user)}
                                                    className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                                                    title="Edit User"
                                                >
                                                    <Pencil width={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                        No customers found matching search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
