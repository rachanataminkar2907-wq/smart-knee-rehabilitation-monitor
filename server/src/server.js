require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const healthRoutes = require("./routes/healthRoutes");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Smart Knee Rehabilitation Monitoring System",
    status: "running",
  });
});

app.use("/api/health", healthRoutes);

let elapsed = 0;
let repetitions = 0;
let previousAngle = 8;

function generateSensorData() {
  elapsed += 0.2;

  const cycle = (elapsed % 8) / 8;
  const kneeAngle = 8 + 82 * Math.pow(Math.sin(Math.PI * cycle), 2);

  // Illustrative segment angles for software testing only.
  const thighAngle = 20 * Math.sin(elapsed / 3);
  const shankAngle = thighAngle + kneeAngle;

  if (previousAngle < 15 && kneeAngle >= 45) {
    // Count is intentionally handled on the return to extension below.
  }

  if (previousAngle >= 45 && kneeAngle < 15) {
    repetitions += 1;
  }

  previousAngle = kneeAngle;

  return {
    timestamp: new Date().toISOString(),
    kneeAngle: Number(kneeAngle.toFixed(1)),
    thighAngle: Number(thighAngle.toFixed(1)),
    shankAngle: Number(shankAngle.toFixed(1)),
    minAngle: 8,
    maxAngle: 90,
    rom: 82,
    repetitions,
    mode: "simulation",
  };
}

io.on("connection", (socket) => {
  console.log("Dashboard connected:", socket.id);

  socket.emit("sensorData", {
    ...generateSensorData(),
    mode: "simulation",
  });

  socket.on("disconnect", () => {
    console.log("Dashboard disconnected:", socket.id);
  });
});

const sensorInterval = setInterval(() => {
  const data = generateSensorData();
  io.emit("sensorData", data);
}, 200);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Knee Rehabilitation API running on port ${PORT}`);
  console.log("Simulated sensor stream enabled");
});

process.on("SIGINT", () => {
  clearInterval(sensorInterval);
  httpServer.close(() => process.exit(0));
});