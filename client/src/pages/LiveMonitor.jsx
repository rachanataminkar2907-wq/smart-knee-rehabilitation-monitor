import { useEffect, useState } from "react";
import { Activity, Radio, Wifi, WifiOff } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { socket, connectSocket } from "../services/socket";

export default function LiveMonitor() {
  const [sensor, setSensor] = useState(null);
  const [history, setHistory] = useState([]);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);

    const handleSensorData = (data) => {
      setSensor(data);

      setHistory((previous) => [
        ...previous.slice(-39),
        {
          time: new Date(data.timestamp).toLocaleTimeString("en-IN", {
            minute: "2-digit",
            second: "2-digit",
          }),
          angle: data.kneeAngle,
        },
      ]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("sensorData", handleSensorData);

    connectSocket();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("sensorData", handleSensorData);
    };
  }, []);

  const value = (number) =>
    typeof number === "number" ? number.toFixed(1) : "--";

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">REHABILITATION WORKSPACE</p>
          <h1>Live Monitor</h1>
          <p className="page-description">
            Receiving knee movement data from the backend.
          </p>
        </div>

        <span className="demo-badge">
          <span
            className="status-dot"
            style={{ background: connected ? "#16b889" : "#e05b66" }}
          />
          {connected ? "CONNECTED" : "DISCONNECTED"}
        </span>
      </header>

      <section className="metrics-grid">
        <article className="metric-card accent-blue">
          <div className="metric-top">
            <span className="metric-title">Knee Angle</span>
            <Activity size={20} />
          </div>
          <div className="metric-value">
            {value(sensor?.kneeAngle)}<span>°</span>
          </div>
          <p className="metric-subtitle">Relative joint angle</p>
        </article>

        <article className="metric-card accent-purple">
          <div className="metric-top">
            <span className="metric-title">Thigh Inclination</span>
          </div>
          <div className="metric-value">
            {value(sensor?.thighAngle)}<span>°</span>
          </div>
          <p className="metric-subtitle">Segment inclination</p>
        </article>

        <article className="metric-card accent-green">
          <div className="metric-top">
            <span className="metric-title">Shank Inclination</span>
          </div>
          <div className="metric-value">
            {value(sensor?.shankAngle)}<span>°</span>
          </div>
          <p className="metric-subtitle">Segment inclination</p>
        </article>

        <article className="metric-card accent-orange">
          <div className="metric-top">
            <span className="metric-title">Repetitions</span>
            <Radio size={20} />
          </div>
          <div className="metric-value">
            {sensor?.repetitions ?? "--"}
          </div>
          <p className="metric-subtitle">Completed simulated cycles</p>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Knee Angle Over Time</h2>
            <p>Latest 40 backend measurements</p>
          </div>
          {connected ? <Wifi color="#16b889" /> : <WifiOff color="#e05b66" />}
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="4 4" stroke="#e8edf4" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis
                domain={[0, 120]}
                tick={{ fontSize: 11 }}
                tickFormatter={(number) => `${number}°`}
              />
              <Tooltip
                formatter={(number) => [`${number}°`, "Knee angle"]}
              />
              <Line
                dataKey="angle"
                stroke="#3867f4"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel coming-soon">
        <h2>Data source</h2>
        <p>
          Mode: {sensor?.mode ?? "Waiting for data"}.
          {" "}These are simulated readings from your backend, not actual
          MPU6050 measurements.
        </p>
        <p>
          Last update:{" "}
          {sensor?.timestamp
            ? new Date(sensor.timestamp).toLocaleTimeString()
            : "Waiting for first packet"}
        </p>
      </section>
    </div>
  );
}