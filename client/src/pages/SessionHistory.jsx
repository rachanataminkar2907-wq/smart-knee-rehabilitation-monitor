export default function SessionHistory() {
  return (
    <div className="dashboard-page">
      <p className="eyebrow">REHABILITATION WORKSPACE</p>
      <h1>Session History</h1>
      <p className="page-description">
        Review and compare saved rehabilitation sessions.
      </p>
      <div className="panel coming-soon">
        <h2>No saved sessions yet</h2>
        <p>
          Session storage, historical graphs, and CSV export will be added
          when we implement the backend and database.
        </p>
      </div>
    </div>
  );
}