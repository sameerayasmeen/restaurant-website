
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Reservation } from '../../types';
import { Check, X, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const ReservationManager: React.FC = () => {
  const { reservations, updateReservationStatus, deleteReservation } = useStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteReservation(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
        <p className="text-gray-500">Manage table bookings. Confirm requests or remove old ones.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Guest</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Party Size</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reservations.map((res) => (
              <tr key={res.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{res.name}</div>
                  {res.notes && <div className="text-xs text-orange-600 mt-1 max-w-[150px] truncate" title={res.notes}>Note: {res.notes}</div>}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div>{res.date}</div>
                  <div className="text-xs">{res.time}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{res.guests} Guests</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div>{res.phone}</div>
                  <div className="text-xs text-gray-400">{res.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(res.status)}`}>
                    {res.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    {res.status === 'Pending' && (
                      <>
                        <button type="button" onClick={() => updateReservationStatus(res.id, 'Confirmed')} className="p-1.5 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors" title="Confirm">
                          <Check size={16} />
                        </button>
                        <button type="button" onClick={() => updateReservationStatus(res.id, 'Cancelled')} className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors" title="Decline">
                          <X size={16} />
                        </button>
                      </>
                    )}
                    {(res.status === 'Confirmed' || res.status === 'Completed') && (
                         <button type="button" onClick={() => updateReservationStatus(res.id, 'Completed')} className={`text-xs border px-2 py-1 rounded transition-colors ${res.status === 'Completed' ? 'bg-gray-100 text-gray-400 border-transparent cursor-default' : 'border-gray-300 hover:bg-gray-50'}`} disabled={res.status === 'Completed'}>
                           {res.status === 'Completed' ? 'Done' : 'Complete'}
                         </button>
                    )}
                    <button 
                      type="button"
                      onClick={() => setDeleteId(res.id)} 
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors" 
                      title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Booking?</h3>
            <p className="text-gray-500 mb-6">Are you sure you want to delete this reservation? This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button variant="danger" onClick={confirmDelete}>Yes, Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationManager;
