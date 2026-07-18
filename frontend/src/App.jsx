import { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { jsPDF } from "jspdf";
import {
  FaFlask,
  FaTint,
  FaBolt,
  FaLeaf,
  FaWater,
  FaDownload,
  FaHistory,
  FaCheckCircle,
  FaExclamationTriangle,
  FaChartBar,
  FaPlay,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./App.css";

const API_URL = "https://aquasense-ai-aw3x.onrender.com/predict";

function App() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    ph: "",
    Hardness: "",
    Solids: "",
    Chloramines: "",
    Sulfate: "",
    Conductivity: "",
    Organic_carbon: "",
    Trihalomethanes: "",
    Turbidity: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fields = [
    {
      key: "ph",
      label: "pH",
      icon: <FaFlask />,
      range: "6.5 - 8.5",
    },
    {
      key: "Hardness",
      label: "Hardness",
      icon: <FaTint />,
      range: "80 - 200",
    },
    {
      key: "Solids",
      label: "Total Solids",
      icon: <FaWater />,
      range: "500 - 1000",
    },
    {
      key: "Chloramines",
      label: "Chloramines",
      icon: <FaBolt />,
      range: "0 - 4",
    },
    {
      key: "Sulfate",
      label: "Sulfate",
      icon: <FaLeaf />,
      range: "200 - 400",
    },
    {
      key: "Conductivity",
      label: "Conductivity",
      icon: <FaBolt />,
      range: "300 - 700",
    },
    {
      key: "Organic_carbon",
      label: "Organic Carbon",
      icon: <FaLeaf />,
      range: "5 - 25",
    },
    {
      key: "Trihalomethanes",
      label: "Trihalomethanes",
      icon: <FaTint />,
      range: "20 - 120",
    },
    {
      key: "Turbidity",
      label: "Turbidity",
      icon: <FaWater />,
      range: "1 - 10",
    },
  ];

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("waterHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("waterHistory", JSON.stringify(history));
  }, [history]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key] === "") {
        alert("Please fill all fields.");
        return false;
      }

      if (isNaN(formData[key])) {
        alert("Only numeric values are allowed.");
        return false;
      }
    }

    return true;
  };

  const generatePDF = () => {
    if (!result) return;

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("AquaSense AI", 20, 20);

    doc.setFontSize(14);
    doc.text("Water Quality Analysis Report", 20, 30);

    doc.line(20, 35, 190, 35);

    doc.text(`Prediction : ${result.prediction}`, 20, 50);
    doc.text(`Confidence : ${result.confidence}%`, 20, 60);
    doc.text(
      `Quality Score : ${result.water_quality_score}`,
      20,
      70
    );
    doc.text(`Risk Level : ${result.risk_level}`, 20, 80);

    doc.text("Recommendations:", 20, 95);

    let y = 105;

    result.recommendations.forEach((item) => {
      doc.text(`• ${item}`, 25, y);
      y += 10;
    });

    doc.save("AquaSense_Report.pdf");
  };

  const handlePredict = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        ph: Number(formData.ph),
        Hardness: Number(formData.Hardness),
        Solids: Number(formData.Solids),
        Chloramines: Number(formData.Chloramines),
        Sulfate: Number(formData.Sulfate),
        Conductivity: Number(formData.Conductivity),
        Organic_carbon: Number(formData.Organic_carbon),
        Trihalomethanes: Number(formData.Trihalomethanes),
        Turbidity: Number(formData.Turbidity),
      });

      setResult(response.data);

      const newItem = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        prediction: response.data.prediction,
        score: response.data.water_quality_score,
        confidence: response.data.confidence,
      };

      setHistory((prev) => [newItem, ...prev].slice(0, 10));
    } catch (error) {
      console.error(error);
      alert("Prediction failed. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = fields.map((field) => ({
    name: field.label,
    value: Number(formData[field.key]) || 0,
  }));
  return (
    <div className="app">

      {/* ================= LANDING PAGE ================= */}

      {!showForm ? (
        <section className="landing">

          <nav className="navbar">
            <div className="logo">
              <FaWater />
              <span>AquaSense AI</span>
            </div>

            <button
              className="nav-btn"
              onClick={() => setShowForm(true)}
            >
              Get Started
            </button>
          </nav>

          <div className="hero">

            <div className="hero-left">

              <h1>
                AI Powered
                <br />
                Water Quality
                <span> Prediction</span>
              </h1>

              <p>
                AquaSense AI uses Machine Learning to analyze
                water quality based on multiple chemical
                parameters and instantly predicts whether
                the water is safe for drinking.
              </p>

              <button
                className="start-btn"
                onClick={() => setShowForm(true)}
              >
                <FaPlay />
                Start Analysis
              </button>

            </div>

            <div className="hero-right">

              <div className="glass-card">

                <h3>Why AquaSense AI?</h3>

                <ul>

                  <li>
                    <FaCheckCircle />
                    AI Powered Prediction
                  </li>

                  <li>
                    <FaCheckCircle />
                    Instant Water Analysis
                  </li>

                  <li>
                    <FaCheckCircle />
                    Confidence Score
                  </li>

                  <li>
                    <FaCheckCircle />
                    Risk Assessment
                  </li>

                  <li>
                    <FaCheckCircle />
                    PDF Report Generation
                  </li>

                  <li>
                    <FaCheckCircle />
                    Prediction History
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </section>
      ) : (

        /* ================= DASHBOARD ================= */

        <section className="dashboard">

          <header className="dashboard-header">

            <div>

              <h1>
                <FaWater />
                AquaSense AI Dashboard
              </h1>

              <p>
                Predict drinking water quality using Artificial
                Intelligence.
              </p>

            </div>

            <button
              className="back-btn"
              onClick={() => setShowForm(false)}
            >
              Home
            </button>

          </header>

          <div className="dashboard-grid">

            {/* ================= LEFT PANEL ================= */}

            <div className="input-panel">

              <h2>
                <FaFlask />
                Water Parameters
              </h2>

              {fields.map((field) => (

                <div
                  className="input-card"
                  key={field.key}
                >

                  <label>

                    <span className="icon">
                      {field.icon}
                    </span>

                    <div>

                      <strong>{field.label}</strong>

                      <small>
                        Recommended: {field.range}
                      </small>

                    </div>

                  </label>

                  <input
                    type="number"
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label}`}
                  />

                </div>

              ))}

              <button
                className="predict-btn"
                onClick={handlePredict}
                disabled={loading}
              >

                {loading
                  ? "Analyzing..."
                  : "Predict Water Quality"}

              </button>

            </div>

            {/* ================= RIGHT PANEL ================= */}

            <div className="result-panel">

              {!result ? (

                <div className="empty-card">

                  <FaChartBar className="empty-icon" />

                  <h2>
                    No Prediction Yet
                  </h2>

                  <p>
                    Enter all parameters and click
                    <strong> Predict Water Quality</strong>.
                  </p>

                </div>

              ) : (

                <div className="result-card">

                  <div className="score-section">

                    <div className="progress-wrapper">

                      <CircularProgressbar
                        value={result.water_quality_score}
                        text={`${result.water_quality_score}`}
                        styles={buildStyles({
                          textSize: "16px",
                          pathColor:
                            result.water_quality_score >= 70
                              ? "#00d084"
                              : result.water_quality_score >= 50
                              ? "#ffb400"
                              : "#ff4d4f",
                        })}
                      />

                    </div>

                    <h2>{result.prediction}</h2>

                    <p>
                      AI Water Quality Score
                    </p>

                  </div>                  <div className="stats-grid">

                    <div className="stat-box">
                      <h4>Confidence</h4>
                      <p>{result.confidence}%</p>
                    </div>

                    <div className="stat-box">
                      <h4>Risk Level</h4>
                      <p
                        className={
                          result.risk_level.toLowerCase() === "low"
                            ? "safe"
                            : result.risk_level.toLowerCase() === "medium"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {result.risk_level}
                      </p>
                    </div>

                  </div>

                  <div className="recommendation-section">

                    <h3>
                      <FaCheckCircle />
                      Recommendations
                    </h3>

                    <div className="recommendation-list">

                      {result.recommendations.map((item, index) => (

                        <div
                          className="recommendation-card"
                          key={index}
                        >
                          <FaCheckCircle />
                          <span>{item}</span>
                        </div>

                      ))}

                    </div>

                  </div>

                  <button
                    className="download-btn"
                    onClick={generatePDF}
                  >
                    <FaDownload />
                    Download PDF Report
                  </button>

                </div>

              )}

              <div className="chart-card">

                <h2>
                  <FaChartBar />
                  Parameter Overview
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <BarChart data={chartData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      radius={[6, 6, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

          <div className="history-section">

            <h2>
              <FaHistory />
              Prediction History
            </h2>

            {history.length === 0 ? (

              <div className="history-empty">

                No previous predictions available.

              </div>

            ) : (

              <div className="history-grid">

                {history.map((item) => (

                  <div
                    className="history-card"
                    key={item.id}
                  >

                    <h3>{item.prediction}</h3>

                    <p>
                      <strong>Score:</strong> {item.score}
                    </p>

                    <p>
                      <strong>Confidence:</strong>{" "}
                      {item.confidence}%
                    </p>

                    <small>{item.date}</small>

                  </div>

                ))}

              </div>

            )}

          </div>

        </section>

      )}

    </div>

  );
}

export default App;