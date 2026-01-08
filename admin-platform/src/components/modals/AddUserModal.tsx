import { useState, useEffect } from 'react';
import { X, UserPlus, MapPin, BadgeCheck } from 'lucide-react';
import type { User } from '../../context/DataContext';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (user: Omit<User, 'id' | 'registeredDate' | 'purchasedPlots' | 'paymentIds'>) => void;
    onEdit?: (id: string, user: Partial<User>) => void;
    userToEdit?: User | null;
}

export function AddUserModal({ isOpen, onClose, onAdd, onEdit, userToEdit }: AddUserModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState<User['role']>('Customer');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setPhone(userToEdit.phone);
            setAddress(userToEdit.address || '');
            setRole(userToEdit.role);
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setRole('Customer');
        }
    }, [userToEdit, isOpen]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userToEdit && onEdit) {
            onEdit(userToEdit.id, { name, email, phone, address, role });
        } else {
            onAdd({ name, email, phone, address, role, status: 'Active' });
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-gray-200">
                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 rounded-full">
                            <UserPlus className="w-5 h-5 text-gray-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">{userToEdit ? 'Edit User' : 'Add New User'}</h2>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                        <X width={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:text-sm"
                                placeholder="e.g. John Banda"
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:text-sm"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:text-sm"
                                placeholder="+265..."
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> Address
                            </label>
                            <input
                                type="text"
                                required
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:text-sm"
                                placeholder="Physical Address"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                                <BadgeCheck className="w-3 h-3" /> Role
                            </label>
                            <select
                                value={role}
                                onChange={e => setRole(e.target.value as User['role'])}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:text-sm"
                            >
                                <option value="Customer">Customer</option>
                                <option value="Sales Agent">Sales Agent</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 pt-2 border-t border-gray-50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none"
                        >
                            {userToEdit ? 'Save Changes' : `Add ${role}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
