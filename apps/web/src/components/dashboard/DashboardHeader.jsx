import { LogoutIcon, MenuIcon } from '../icons';

function DashboardHeader({ user, onOpenMenu, onLogout }) {
  const initials = (user?.name || 'U')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 -ml-2"
          aria-label="Open menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-gray-900">
            Welcome back, <span className="text-primary">{user?.name}</span>
          </h1>
          <p className="text-sm text-gray-500 hidden sm:block">{today}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-white shrink-0">
          {initials}
        </div>
        <button
          onClick={onLogout}
          className="hidden sm:flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          <LogoutIcon className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;