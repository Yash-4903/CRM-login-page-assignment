import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';

const stats = [
  { label: 'Total Customers', value: '1,248', delta: '+12.4% this month', icon: 'customers' },
  { label: 'Active Deals', value: '86', delta: '+8 new this week', icon: 'deals' },
  { label: 'Revenue', value: '$84,920', delta: '+18.2% vs last quarter', icon: 'revenue' },
];

const activities = [
  { title: 'Deal won — Acme Corp', detail: 'Enterprise plan · $24,000 ARR', time: '2m ago', initials: 'AC', color: 'bg-primary-100 text-primary' },
  { title: 'Call with Sarah Kim', detail: 'Discovery call · 28 minutes', time: '1h ago', initials: 'SK', color: 'bg-green-100 text-green-600' },
  { title: 'Proposal sent', detail: 'Q3 proposal to Globex Inc.', time: '3h ago', initials: 'GI', color: 'bg-amber-100 text-amber-600' },
  { title: 'Task completed', detail: 'Onboard new customer', time: '5h ago', initials: 'NC', color: 'bg-purple-100 text-purple-600' },
];

function DashboardPage() {
  const { user, logout } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('dashboard');

  const handleLogout = async () => {
    await logout();
    success('You have been signed out.', 'Logged out');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        active={active}
        onNavigate={setActive}
        onLogout={handleLogout}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="lg:pl-64">
        <DashboardHeader
          user={user}
          onOpenMenu={() => setMenuOpen(true)}
          onLogout={handleLogout}
        />

        <main className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={`${100 + index * 100}ms`} />
            ))}
          </div>

          <div className="mt-8 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Recent Activity
            </h2>
            <ul>
              {activities.map((activity, index) => (
                <ActivityItem key={activity.title} activity={activity} index={index} />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;