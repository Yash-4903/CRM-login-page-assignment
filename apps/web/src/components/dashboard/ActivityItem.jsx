function ActivityItem({ activity, index }) {
  const initials = activity.initials || activity.title.slice(0, 2).toUpperCase();

  return (
    <li
      className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0 animate-slide-up"
      style={{ animationDelay: `${200 + index * 100}ms` }}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${activity.color}`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
        <p className="text-xs text-gray-500 truncate">{activity.detail}</p>
      </div>
      <span className="text-xs text-gray-400 shrink-0">{activity.time}</span>
    </li>
  );
}

export default ActivityItem;