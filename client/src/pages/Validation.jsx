export default function Validation() {
  return (
    <div className="dashboard-page">
      <p className="eyebrow">RESEARCH WORKSPACE</p>
      <h1>Research & Validation</h1>
      <p className="page-description">
        Evaluate IMU measurements against reference goniometer readings.
      </p>
      <div className="panel coming-soon">
        <h2>Measurement validation</h2>
        <p>
          We will implement MAE, RMSE, Pearson correlation, and Bland–Altman
          analysis after the measurement data workflow is ready.
        </p>
      </div>
    </div>
  );
}