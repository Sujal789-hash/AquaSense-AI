import pandas as pd
import joblib
import warnings

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score

from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

warnings.filterwarnings("ignore")

print("=" * 60)
print("         AQUASENSE AI - MODEL TRAINING")
print("=" * 60)

# -----------------------
# Load Dataset
# -----------------------
df = pd.read_csv("../dataset/water_potability.csv")

print("\nDataset Loaded Successfully!")
print("Shape :", df.shape)

# -----------------------
# Features & Target
# -----------------------
X = df.drop("Potability", axis=1)
y = df["Potability"]

# -----------------------
# Train Test Split
# -----------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# -----------------------
# Models
# -----------------------
models = {
    "Random Forest": RandomForestClassifier(
        n_estimators=300,
        random_state=42
    ),

    "Extra Trees": ExtraTreesClassifier(
        n_estimators=300,
        random_state=42
    ),

    "Logistic Regression": LogisticRegression(
        max_iter=1000
    ),

    "Support Vector Machine": SVC()
}

best_accuracy = 0
best_model = None
best_name = ""

print("\nTraining Models...\n")

# -----------------------
# Train Every Model
# -----------------------
for name, model in models.items():

    pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("model", model)
    ])

    pipeline.fit(X_train, y_train)

    predictions = pipeline.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print(f"{name:25} : {accuracy*100:.2f}%")

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = pipeline
        best_name = name

print("\n" + "=" * 60)
print(f"Best Model : {best_name}")
print(f"Accuracy   : {best_accuracy*100:.2f}%")
print("=" * 60)

# -----------------------
# Save Best Model
# -----------------------
joblib.dump(best_model, "../backend/model.pkl")

print("\nModel Saved Successfully!")
print("Location : backend/model.pkl")