import { Filter, ArrowUpDown, MoreHorizontal } from 'lucide-react';

const users = [
    { id: 'USR-102', name: 'Alice Freeman', location: 'Lilongwe, MW', role: 'Super Admin', status: 'Active', color: 'bg-emerald-500' },
    { id: 'USR-004', name: 'John Banda', location: 'Blantyre, MW', role: 'Editor', status: 'Offline', color: 'bg-blue-500' },
    { id: 'USR-105', name: 'Mary Phiri', location: 'Mzuzu, MW', role: 'Viewer', status: 'Active', color: 'bg-emerald-500' },
    { id: 'USR-021', name: 'Steve K.', location: 'Zomba, MW', role: 'Support', status: 'Suspended', color: 'bg-amber-500' },
];

export function UserTable() {
    return (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-medium text-gray-900">User Management</h2>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">12,450 Total</span>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:border-gray-300">
                        <Filter width={12} />
                        Filter
                    </button>
                    <button className="flex items-center gap-1.5 rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:border-gray-300">
                        <ArrowUpDown width={12} />
                        Sort
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="border-b border-gray-100 px-6 py-3 text-xs font-medium text-gray-400 font-normal">User ID</th>
                            <th className="border-b border-gray-100 px-6 py-3 text-xs font-medium text-gray-400 font-normal">Name & Location</th>
                            <th className="border-b border-gray-100 px-6 py-3 text-xs font-medium text-gray-400 font-normal">Role</th>
                            <th className="border-b border-gray-100 px-6 py-3 text-xs font-medium text-gray-400 font-normal">Status</th>
                            <th className="border-b border-gray-100 px-6 py-3 text-xs font-medium text-gray-400 font-normal"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-sm text-gray-900">{user.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`h-1.5 w-1.5 rounded-full ${user.color}`}></span>
                                        <div>
                                            <p className="text-sm text-gray-900 font-medium">{user.name}</p>
                                            <p className="text-xs text-gray-400">{user.location}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${user.status === 'Active' ? 'border-green-200 bg-green-50 text-green-700' :
                                        user.status === 'Offline' ? 'border-gray-200 bg-gray-50 text-gray-600' :
                                            'border-amber-200 bg-amber-50 text-amber-700'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-900">
                                        <MoreHorizontal width={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-3">
                <p className="text-xs text-gray-400">Showing 1-4 of 12,450 results</p>
                <div className="flex gap-1">
                    <button className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50">Prev</button>
                    <button className="rounded border border-gray-200 px-2 py-1 text-xs text-gray-500 hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    );
}
