# 💧 AquaSense AI

An AI-powered water quality prediction system that uses Machine Learning to determine whether water is safe for drinking based on various water quality parameters.

🌐 **Live Demo:** https://aqua-sense-ai-eosin.vercel.app

---

## 📖 Overview

AquaSense AI is a full-stack web application that predicts water potability using a trained Machine Learning model. Users can enter water quality parameters and receive an instant prediction along with confidence score, water quality score, risk level, AI analysis, recommendations, charts, and downloadable PDF reports.

---

## ✨ Features

- 🤖 Machine Learning-based water quality prediction
- 📊 Water Quality Score visualization
- 📈 Confidence Score
- ⚠️ Risk Level Detection
- 📝 AI Analysis Summary
- 💡 Personalized Recommendations
- 📄 PDF Report Generation
- 📚 Prediction History
- 📊 Interactive Charts
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- Recharts
- React Circular Progressbar
- jsPDF
- CSS3

### Backend
- Flask
- Flask-CORS
- Gunicorn

### Machine Learning
- Scikit-learn
- NumPy
- Pandas
- Joblib

---

## 📂 Project Structure

```
AquaSense-AI/
│
├── backend/
│   ├── app.py
│   ├── model.pkl
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
├── dataset/
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Sujal789-hash/AquaSense-AI.git

cd AquaSense-AI
```

---

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```
http://127.0.0.1:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📥 Input Parameters

The model predicts water quality using:

- pH
- Hardness
- Solids
- Chloramines
- Sulfate
- Conductivity
- Organic Carbon
- Trihalomethanes
- Turbidity

---

## 📤 Output

The application provides:

- Safe / Unsafe Prediction
- Confidence Score
- Water Quality Score
- Risk Level
- AI Analysis Summary
- Recommendations
- Downloadable PDF Report

---

## 🚀 Deployment

### Frontend

Hosted on **Vercel**

### Backend

Hosted on **Render**

---

## 📸 Screenshots

### Landing Page

> Add screenshot here

---

### Prediction Dashboard

> Add screenshot here

---

### Prediction Result

> Add screenshot here

---

### PDF Report

> Add screenshot here

---

## 📌 Future Improvements

- User Authentication
- Water Quality Trends
- Real-time IoT Sensor Integration
- Multi-language Support
- Cloud Database
- Advanced AI Explanations

---

## 👨‍💻 Author

**Sujal**

GitHub: https://github.com/Sujal789-hash

LinkedIn: *(Add your LinkedIn profile link here)*

---

## 📜 License

This project is developed for educational purposes.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
