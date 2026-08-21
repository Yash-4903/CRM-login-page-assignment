import { ShieldIcon } from '../icons';

function RightPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#14249C] min-h-screen flex-col justify-center items-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-[440px] mx-auto px-8">
        {/* Glass Dashboard Card */}
        <div className="bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-[20px] p-5 shadow-2xl shadow-black/20 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.12]">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[10px] bg-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
              </div>
              <span className="text-[13px] font-medium text-white/90 tracking-wide">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-7 rounded-lg bg-white/10" />
              <div className="w-7 h-7 rounded-full bg-white/15" />
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            {[
              { label: 'Contacts', value: '2,847', color: 'bg-emerald-500/15' },
              { label: 'Deals', value: '156', color: 'bg-blue-400/15' },
              { label: 'Revenue', value: '$48.2K', color: 'bg-violet-500/15' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.04] rounded-[12px] p-3 border border-white/[0.05] transition-all duration-300 hover:bg-white/[0.07] hover:-translate-y-0.5"
              >
                <p className="text-[9px] font-medium text-white/40 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-[18px] font-semibold text-white tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white/[0.03] rounded-[14px] p-4 mb-4 border border-white/[0.05] transition-all duration-300 hover:bg-white/[0.05]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-medium text-white/60">Pipeline Overview</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <div className="w-2 h-2 rounded-full bg-violet-400" />
              </div>
            </div>
            <div className="flex items-end gap-[6px] h-[72px]">
              {[40, 65, 45, 80, 55, 90, 70, 60, 85, 50, 75, 65].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                  <div
                    className="w-full rounded-t-[3px] bg-white/15 group-hover/bar:bg-white/30 transition-all duration-300"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
                <span key={m} className="text-[9px] text-white/30 font-medium">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white/[0.03] rounded-[14px] p-4 border border-white/[0.05] transition-all duration-300 hover:bg-white/[0.05]">
            <p className="text-[12px] font-medium text-white/60 mb-3">Recent Contacts</p>
            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', email: 'sarah@techcorp.com', status: 'Active', initials: 'SC' },
                { name: 'Marcus Johnson', email: 'marcus@design.io', status: 'Lead', initials: 'MJ' },
                { name: 'Emily Davis', email: 'emily@startup.co', status: 'Active', initials: 'ED' },
              ].map((contact) => (
                <div key={contact.name} className="flex items-center gap-3 group/row">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-semibold text-white/80 transition-all duration-200 group-hover/row:bg-white/20">
                    {contact.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-white/90 truncate">{contact.name}</p>
                    <p className="text-[10px] text-white/35 truncate">{contact.email}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all duration-200 ${
                      contact.status === 'Active' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
                    }`}
                  >
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-[13px] text-white/30 mt-6 font-medium tracking-wide">
          Everything you need to manage customer relationships
        </p>
      </div>
    </div>
  );
}

function AuthLayout({ children }) {
  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden min-h-screen bg-[#14249C] flex flex-col">
        {/* Blue Header */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center px-6 pt-12 pb-8 relative">
          <div className="w-[52px] h-[52px] bg-white/10 backdrop-blur-sm rounded-[16px] flex items-center justify-center border border-white/15 mb-4 transition-transform duration-300 hover:scale-105">
            <ShieldIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-white tracking-tight">CRM Dashboard</h2>
          <p className="text-sm text-white/50 mt-1 font-normal">Secure authentication for modern teams</p>
        </div>

        {/* White Form Card */}
        <div className="flex-1 bg-white rounded-t-[28px] px-6 pt-8 pb-10 -mt-4 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>
          {children('mobile')}
        </div>
      </div>

      {/* Desktop — True 50/50 split, no gaps */}
      <div className="hidden lg:flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-white flex-col justify-center px-16 xl:px-20">
          <div className="max-w-[420px] w-full mx-auto">{children('desktop')}</div>
        </div>
        <RightPanel />
      </div>
    </>
  );
}

export default AuthLayout;
