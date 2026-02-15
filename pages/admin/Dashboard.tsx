
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { DollarSign, Users, Calendar, ShoppingBag, ArrowUpRight, PlusCircle, Settings, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-wide">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
    </div>
    <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: color.replace('bg-', 'text-'), size: 28 })}
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { menuItems, reservations } = useStore();

  const pendingReservations = reservations.filter(r => r.status === 'Pending').length;
  const totalItems = menuItems.length;
  const activeItems = menuItems.filter(i => i.isAvailable).length;

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="text-sm font-medium text-gray-400 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hidden md:block">
           {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link to="/admin/menu" className="group p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
            <PlusCircle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Add Dish</h4>
            <p className="text-xs text-gray-500">Update Menu</p>
          </div>
        </Link>
        <Link to="/admin/blog" className="group p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <FileText size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Write Post</h4>
            <p className="text-xs text-gray-500">Blog Update</p>
          </div>
        </Link>
        <Link to="/admin/config" className="group p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <Settings size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Config</h4>
            <p className="text-xs text-gray-500">Settings</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Pending Bookings" 
          value={pendingReservations.toString()} 
          icon={<Calendar />} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Total Menu Items" 
          value={totalItems.toString()} 
          icon={<ShoppingBag />} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="Active Dishes" 
          value={activeItems.toString()} 
          icon={<DollarSign />} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Daily Views" 
          value="1.2k" 
          icon={<Users />} 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reservations */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-gray-900">Recent Reservations</h3>
            <Link to="/admin/reservations" className="text-orange-600 text-sm font-bold hover:text-orange-700 flex items-center gap-1">View All <ArrowUpRight size={16}/></Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                <tr>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.slice(0, 5).map(res => (
                  <tr key={res.id}>
                    <td className="py-4 font-bold text-gray-900">{res.name}</td>
                    <td className="py-4 text-sm text-gray-500">{res.date}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        res.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        res.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        res.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400 italic">No reservations yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Controls */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="font-bold text-xl text-gray-900 mb-6">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-green-50 rounded-2xl border border-green-100">
                <div className="flex items-center gap-4">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></span>
                  <span className="text-green-900 font-bold">Website is Live</span>
                </div>
                <span className="text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">v1.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
