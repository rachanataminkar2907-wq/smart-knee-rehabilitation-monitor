export default function MetricCard({
  title,
  value,
  unit = "",
  subtitle,
  icon: Icon,
  accent = "blue",
}) {
  return (
    <article className={`metric-card accent-${accent}`}>
      <div className="metric-top">
        <span className="metric-title">{title}</span>
        {Icon && (
          <div className="metric-icon">
            <Icon size={20} />
          </div>
        )}
      </div>

      <div className="metric-value">
        {value}
        <span>{unit}</span>
      </div>

      <p className="metric-subtitle">{subtitle}</p>
    </article>
  );
}