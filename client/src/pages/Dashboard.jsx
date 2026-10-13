import { useEffect, useState } from "react";
import {
  Activity,
  Repeat2,
  TrendingUp,
  Target,
  Wifi,
  Clock3,
  Play,
  Square,
} from "lucide-react";
import MetricCard from "../components/MetricCard";
import KneeAngleChart from "../components/KneeAngleChart";

function generateAngle(t) {
  // Simulates repeated knee flexion and extension.
  // This is demo data, not a real sensor measurement.
  const cycle = (t % 12) / 12;
  const angle = 8 + 82 * Math.pow(Math.sin(Math.PI * cycle), 2);
  return Number(angle.toFixed(1));
}

export default function Dashboard() {
  const [running, setRunning] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [angle, setAngle] = useState(8);
  const [repetitions, setRepetitions] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      const now = Date.now() / 1000;
      const nextAngle = generateAngle(now % 120);

      setAngle(nextAngle);
      setChartData((previous) => [
        ...previous.slice(-29),
        {
          time: new Date().toLocaleTimeString("en-IN", {
            minute: "2-digit",
            second: "2-digit",
          }),
          angle: nextAngle,
        },
      ]);

      // Approximate demo counter; actual counting will use
      // the validated repetition state machine from the firmware.
      if (nextAngle < 12 && Math.random() > 0.8) {
        setRepetitions((r) => r + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const minAngle = 8;
  const maxAngle = 90;
  const rom = maxAngle - minAngle;

  const formatDuration = (total) => {
    const minutes = Math.floor(total / 60).toString().padStart(2, "0");
    const secs = (total % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">REHABILITATION WORKSPACE</p>
          <h1>Dashboard</h1>
          <p className="page-description">
            Monitor knee mobility and exercise performance.
          </p>
        </div>

        <div className="header-actions">
          <span className="demo-badge">
            <span className="status-dot" />
            DEMO MODE
          </span>
          <button
            className={`session-button ${running ? "stop" : "start"}`}
            onClick={() => setRunning((value) => !value)}
          >
            {running ? <Square size={16} /> : <Play size={16} />}
            {running ? "Pause demo" : "Resume demo"}
          </button>
        </div>
      </header>

      <section className="session-banner">
        <div className="session-icon">
          <Activity size={23} />
        </div>
        <div className="session-info">
          <strong>Home Knee Flexion & Extension</strong>
          <span>Session 001 · Simulated exercise</span>
        </div>
        <div className="session-duration">
          <Clock3 size={16} />
          <span>{formatDuration(seconds)}</span>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard
          title="Current Knee Angle"
          value={angle.toFixed(1)}
          unit="°"
          subtitle="Simulated live reading"
          icon={Activity}
          accent="blue"
        />
        <MetricCard
          title="Total Repetitions"
          value={repetitions}
          subtitle="Demo counter"
          icon={Repeat2}
          accent="purple"
        />
        <MetricCard
          title="Maximum Angle"
          value="90"
          unit="°"
          subtitle="Simulated peak flexion"
          icon={Target}
          accent="green"
        />
        <MetricCard
          title="Dynamic ROM"
          value={rom}
          unit="°"
          subtitle="Illustrative excursion"
          icon={TrendingUp}
          accent="orange"
        />
      </section>

      <section className="content-grid">
        <article className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h2>Knee Angle Over Time</h2>
              <p>Real-time-style flexion and extension trace</p>
            </div>
            <span className="chart-legend">
              <span />
              Knee angle
            </span>
          </div>
          {chartData.length > 0 ? (
            <KneeAngleChart data={chartData} />
          ) : (
            <div className="chart-placeholder">
              Waiting for simulated readings...
            </div>
          )}
          <div className="chart-footer">
            <span>Angle (degrees)</span>
            <span>Last 30 samples</span>
          </div>
        </article>

        <article className="panel status-panel">
          <div className="panel-heading">
            <div>
              <h2>System Status</h2>
              <p>Software simulation</p>
            </div>
            <Wifi size={21} className="status-icon" />
          </div>

          <div className="status-row">
            <div>
              <strong>ESP32 connection</strong>
              <span>Hardware not connected</span>
            </div>
            <span className="status-tag offline">Offline</span>
          </div>

          <div className="status-row">
            <div>
              <strong>Thigh IMU</strong>
              <span>Waiting for hardware</span>
            </div>
            <span className="status-tag pending">Pending</span>
          </div>

          <div className="status-row">
            <div>
              <strong>Shank IMU</strong>
              <span>Waiting for hardware</span>
            </div>
            <span className="status-tag pending">Pending</span>
          </div>

          <div className="calibration-box">
            <Target size={20} />
            <div>
              <strong>Calibration required</strong>
              <p>Actual zero calibration will be available after integration.</p>
            </div>
          </div>
        </article>
      </section>

      <p className="demo-disclaimer">
        DEMONSTRATION ONLY — All readings are simulated. This dashboard is
        not connected to a patient or medical device.
      </p>
    </div>
  );
}