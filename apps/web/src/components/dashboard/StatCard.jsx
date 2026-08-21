const statIcons = {
  customers: 'M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 4-4 4 4 0 1 1 4-4c.57 0 1.12.12 1.6.34',
  deals: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
  revenue: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
};

function StatCard({ label, value, delta, icon, delay }) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">{value}</p>
          <p className="mt-1 text-xs font-medium text-green-600">{delta}</p>
        </div>
        <div className="w-11 h-11 rounded-lg bg-primary-50 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
            <path d={statIcons[icon]} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default StatCard;