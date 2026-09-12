const cropSelect = document.getElementById("cropSelect");
const languageSelect = document.getElementById("languageSelect");
const imageInput = document.getElementById("imageInput");
const uploadText = document.getElementById("uploadText");
const previewImage = document.getElementById("previewImage");
const analyzeButton = document.getElementById("analyzeButton");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const resultCrop = document.getElementById("resultCrop");
const diseaseElement = document.getElementById("disease");
const confidenceElement = document.getElementById("confidence");
const recommendationElement = document.getElementById("recommendation");
const historyList = document.getElementById("historyList");
const clearHistoryButton = document.getElementById("clearHistoryButton");

const cropNames = {
  rice: { en: "Rice", hi: "चावल" },
  wheat: { en: "Wheat", hi: "गेहूं" },
  tomato: { en: "Tomato", hi: "टमाटर" },
  potato: { en: "Potato", hi: "आलू" },
  maize: { en: "Maize", hi: "मक्का" },
  cotton: { en: "Cotton", hi: "कपास" },
  barley: { en: "Barley", hi: "जौ" },
  groundnut: { en: "Groundnut", hi: "मूंगफली" },
  chickpea: { en: "Chickpea", hi: "चना" },
  mustard: { en: "Mustard", hi: "सरसों" },
  soybean: { en: "Soybean", hi: "सोयाबीन" },
  onion: { en: "Onion", hi: "प्याज" },
  brinjal: { en: "Brinjal", hi: "बैंगन" },
  chilli: { en: "Chilli", hi: "मिर्च" },
  apple: { en: "Apple", hi: "सेब" },
  grape: { en: "Grape", hi: "अंगूर" },
  sugarcane: { en: "Sugarcane", hi: "गन्ना" },
  banana: { en: "Banana", hi: "केला" },
  mango: { en: "Mango", hi: "आम" }
};

const demoDiseases = {
  rice: [
    ["Rice Blast", "Use disease-free seed and consult an agriculture expert for suitable fungicide."],
    ["Bacterial Leaf Blight", "Maintain field sanitation and avoid excessive nitrogen fertilizer."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  wheat: [
    ["Wheat Rust", "Remove heavily infected plants and consult an expert for recommended fungicide."],
    ["Powdery Mildew", "Improve air circulation and seek suitable disease-management advice."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  tomato: [
    ["Early Blight", "Remove infected leaves and avoid watering the foliage."],
    ["Late Blight", "Improve ventilation and consult an expert for suitable treatment."],
    ["Leaf Mold", "Avoid excess humidity and remove affected leaves."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  potato: [
    ["Late Blight", "Remove infected foliage and consult an expert about suitable fungicide."],
    ["Early Blight", "Use crop rotation and remove severely affected leaves."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  maize: [
    ["Northern Corn Leaf Blight", "Remove crop residue and consult an expert for management."],
    ["Common Rust", "Monitor the crop and seek suitable treatment if symptoms increase."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  cotton: [
    ["Bacterial Blight", "Remove severely affected plant parts and maintain field sanitation."],
    ["Leaf Spot", "Avoid excess moisture on leaves and consult an expert."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  barley: [
    ["Barley Rust", "Use resistant varieties where available and seek expert advice."],
    ["Powdery Mildew", "Improve air circulation and monitor disease spread."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  groundnut: [
    ["Early Leaf Spot", "Use crop rotation and consult an expert for suitable fungicide."],
    ["Late Leaf Spot", "Remove infected residue and follow recommended crop protection."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  chickpea: [
    ["Ascochyta Blight", "Use clean seed and remove severely infected plant debris."],
    ["Fusarium Wilt", "Use resistant varieties and maintain proper crop rotation."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  mustard: [
    ["Alternaria Blight", "Remove infected residue and consult an expert for treatment."],
    ["White Rust", "Monitor affected leaves and use recommended disease management."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  soybean: [
    ["Frogeye Leaf Spot", "Use clean seed and consult an expert for suitable fungicide."],
    ["Downy Mildew", "Improve field drainage and monitor disease development."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  onion: [
    ["Purple Blotch", "Avoid overhead irrigation and remove infected plant debris."],
    ["Downy Mildew", "Improve air circulation and consult an expert."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  brinjal: [
    ["Phomopsis Blight", "Remove affected plant parts and maintain field hygiene."],
    ["Bacterial Wilt", "Remove infected plants and avoid moving contaminated soil."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  chilli: [
    ["Leaf Curl", "Control insect vectors and consult an agriculture expert."],
    ["Anthracnose", "Remove infected fruits and avoid excess leaf wetness."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  apple: [
    ["Apple Scab", "Remove fallen leaves and consult an expert for disease management."],
    ["Powdery Mildew", "Prune affected parts and improve air circulation."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  grape: [
    ["Downy Mildew", "Improve canopy ventilation and seek suitable treatment advice."],
    ["Powdery Mildew", "Prune dense growth and monitor humidity."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  sugarcane: [
    ["Red Rot", "Remove affected clumps and use healthy planting material."],
    ["Smut", "Use disease-free setts and consult an expert."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  banana: [
    ["Sigatoka Leaf Spot", "Remove severely affected leaves and improve field sanitation."],
    ["Panama Disease", "Use healthy planting material and avoid spreading contaminated soil."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ],
  mango: [
    ["Powdery Mildew", "Improve canopy ventilation and consult an expert for treatment."],
    ["Anthracnose", "Remove infected plant material and avoid excess moisture."],
    ["Healthy Leaf", "The leaf appears healthy. Continue regular monitoring."]
  ]
};

const hindiText = {
  chooseCrop: "कृपया पहले फसल चुनें।",
  chooseImage: "कृपया पहले पत्ती की तस्वीर चुनें।",
  analyzing: "तस्वीर का विश्लेषण हो रहा है...",
  recommendation: "सलाह",
  confidence: "विश्वास स्तर",
  noHistory: "अभी कोई विश्लेषण इतिहास नहीं है।"
};

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  uploadText.textContent = `Selected: ${file.name}`;
  previewImage.src = URL.createObjectURL(file);
  previewImage.classList.remove("hidden");
});

analyzeButton.addEventListener("click", () => {
  const lang = languageSelect.value;
  const crop = cropSelect.value;

  if (!crop) {
    alert(lang === "hi" ? hindiText.chooseCrop : "Please select a crop first.");
    return;
  }

  if (!imageInput.files[0]) {
    alert(lang === "hi" ? hindiText.chooseImage : "Please choose a leaf image first.");
    return;
  }

  result.classList.add("hidden");
  loading.textContent = lang === "hi" ? hindiText.analyzing : "Analyzing image...";
  loading.classList.remove("hidden");
  analyzeButton.disabled = true;

  setTimeout(() => {
    const options = demoDiseases[crop] || [["Healthy Leaf", "Continue regular monitoring."]];
    const selected = options[Math.floor(Math.random() * options.length)];
    const confidence = `${Math.floor(Math.random() * 16) + 80}%`;
    const cropName = cropNames[crop][lang];

    resultCrop.textContent = cropName;
    diseaseElement.textContent = selected[0];
    confidenceElement.textContent = confidence;
    recommendationElement.textContent = selected[1];

    loading.classList.add("hidden");
    result.classList.remove("hidden");
    analyzeButton.disabled = false;

    saveHistory({
      date: new Date().toLocaleString(),
      crop: cropName,
      disease: selected[0],
      confidence,
      recommendation: selected[1]
    });
  }, 1500);
});

function saveHistory(item) {
  const history = JSON.parse(localStorage.getItem("cropDiseaseHistory") || "[]");
  history.unshift(item);
  localStorage.setItem("cropDiseaseHistory", JSON.stringify(history.slice(0, 20)));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("cropDiseaseHistory") || "[]");

  if (history.length === 0) {
    historyList.innerHTML = `<p class="empty-history">${languageSelect.value === "hi" ? hindiText.noHistory : "No analysis history yet."}</p>`;
    return;
  }

  historyList.innerHTML = history.map(item => `
    <div class="history-item">
      <p><strong>Date:</strong> ${escapeHTML(item.date)}</p>
      <p><strong>Crop:</strong> ${escapeHTML(item.crop)}</p>
      <p><strong>Disease:</strong> ${escapeHTML(item.disease)}</p>
      <p><strong>Confidence:</strong> ${escapeHTML(item.confidence)}</p>
    </div>
  `).join("");
}

clearHistoryButton.addEventListener("click", () => {
  localStorage.removeItem("cropDiseaseHistory");
  renderHistory();
});

languageSelect.addEventListener("change", renderHistory);
renderHistory();

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
