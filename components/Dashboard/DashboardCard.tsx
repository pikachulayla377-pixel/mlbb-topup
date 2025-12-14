interface DashboardCardProps {
  tab: {
    key: string;
    label: string;
    value: string | number;
  };
  activeTab: string;
  onClick: () => void;
}

export default function DashboardCard({ tab, activeTab, onClick }: DashboardCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 shadow-sm hover:shadow-lg ${
        activeTab === tab.key
          ? "border-[var(--accent)] bg-[var(--card)]"
          : "border-[var(--border)] bg-[var(--card)]/60 hover:bg-[var(--card)]"
      }`}
    >
      <p className="text-sm text-[var(--muted)]">{tab.label}</p>
      <h2 className="text-2xl font-bold mt-1">{tab.value}</h2>
    </div>
  );
}