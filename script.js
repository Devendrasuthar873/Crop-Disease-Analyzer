const languageSelect = document.getElementById("languageSelect");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusMessage = document.getElementById("statusMessage");

const resultSection = document.getElementById("resultSection");
const cropResult = document.getElementById("cropResult");
const diseaseResult = document.getElementById("diseaseResult");
const confidenceResult = document.getElementById("confidenceResult");
const recommendationResult = document.getElementById("recommendationResult");
const dateResult = document.getElementById("dateResult");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const cropCards = document.querySelectorAll(".crop-card");
const selectedCropText = document.getElementById("selectedCrop");

let selectedImage = null;
let selectedCrop = null;
let currentLanguage = "en";

const translations = {
    en: {
        pageTitle: "Crop Disease Analyzer",
        logo: "🌿 Crop Disease Analyzer",
        heading: "Crop Disease Analyzer",
        subheading: "Select a crop and upload its leaf image to identify possible diseases.",
        cropSelectionHeading: "Select Crop",
        selectedCropLabel: "Selected Crop:",
        uploadHeading: "Upload Crop Image",
        chooseImage: "Choose Leaf Image",
        analyzeButton: "Analyze Image",
        resultHeading: "Analysis Result",
        cropLabel: "Crop:",
        diseaseLabel: "Disease:",
        confidenceLabel: "Confidence:",
        recommendationLabel: "Recommendation:",
        dateLabel: "Date:",
        historyHeading: "Analysis History",
        clearHistory: "Clear History",
        noHistory: "No analysis history available.",
        selectCrop: "Please select a crop first.",
        selectImage: "Please select a leaf image first.",
        analyzing: "Analyzing image...",
        analysisComplete: "Analysis completed successfully.",
        footerText: "Crop Disease Analyzer | Smart Agriculture Project",

        wheat: "Wheat",
        rice: "Rice",
        cotton: "Cotton",
        tomato: "Tomato",
        maize: "Maize",
        potato: "Potato",
sugarcane: "Sugarcane",
mustard: "Mustard",
groundnut: "Groundnut",
soybean: "Soybean",
chickpea: "Chickpea",
onion: "Onion",
chilli: "Chilli",
brinjal: "Brinjal",
apple: "Apple",

        healthy: "Healthy Leaf",
        disease1: "Leaf Blight",
        disease2: "Powdery Mildew",
        disease3: "Leaf Spot",

        recommendationHealthy:
            "The crop appears healthy. Continue regular monitoring.",

        recommendationDisease:
            "Remove infected leaves and consult an agricultural expert.",

        historyCrop: "Crop",
        historyDisease: "Disease",
        historyConfidence: "Confidence",
        historyRecommendation: "Recommendation",
        historyDate: "Date",
        historyCleared: "History cleared successfully."
    },

    hi: {
        pageTitle: "फसल रोग विश्लेषक",
        logo: "🌿 फसल रोग विश्लेषक",
        heading: "फसल रोग विश्लेषक",
        subheading: "फसल चुनें और संभावित रोग पहचानने के लिए उसकी पत्ती की तस्वीर अपलोड करें।",
        cropSelectionHeading: "फसल चुनें",
        selectedCropLabel: "चयनित फसल:",
        uploadHeading: "फसल की तस्वीर अपलोड करें",
        chooseImage: "पत्ती की तस्वीर चुनें",
        analyzeButton: "तस्वीर का विश्लेषण करें",
        resultHeading: "विश्लेषण का परिणाम",
        cropLabel: "फसल:",
        diseaseLabel: "रोग:",
        confidenceLabel: "विश्वसनीयता:",
        recommendationLabel: "सलाह:",
        dateLabel: "दिनांक:",
        historyHeading: "विश्लेषण इतिहास",
        clearHistory: "इतिहास साफ करें",
        noHistory: "अभी कोई विश्लेषण इतिहास उपलब्ध नहीं है।",
        selectCrop: "कृपया पहले एक फसल चुनें।",
        selectImage: "कृपया पहले पत्ती की तस्वीर चुनें।",
        analyzing: "तस्वीर का विश्लेषण हो रहा है...",
        analysisComplete: "विश्लेषण सफलतापूर्वक पूरा हुआ।",
        footerText: "फसल रोग विश्लेषक | स्मार्ट कृषि प्रोजेक्ट",

        wheat: "गेहूँ",
        rice: "चावल",
        cotton: "कपास",
        tomato: "टमाटर",
        maize: "मक्का",
        potato: "आलू",
sugarcane: "गन्ना",
mustard: "सरसों",
groundnut: "मूंगफली",
soybean: "सोयाबीन",
chickpea: "चना",
onion: "प्याज",
chilli: "मिर्च",
brinjal: "बैंगन",
apple: "सेब",

        healthy: "स्वस्थ पत्ती",
        disease1: "पत्ती झुलसा रोग",
        disease2: "पाउडरी मिल्ड्यू",
        disease3: "पत्ती धब्बा रोग",

        recommendationHealthy:
            "फसल स्वस्थ दिखाई दे रही है। नियमित निगरानी जारी रखें।",

        recommendationDisease:
            "संक्रमित पत्तियों को हटाएँ और कृषि विशेषज्ञ से सलाह लें।",

        historyCrop: "फसल",
        historyDisease: "रोग",
        historyConfidence: "विश्वसनीयता",
        historyRecommendation: "सलाह",
        historyDate: "दिनांक",
        historyCleared: "इतिहास सफलतापूर्वक साफ कर दिया गया है।"
    }
};

const cropNames = {
    wheat: "wheat",
    rice: "rice",
    cotton: "cotton",
    tomato: "tomato",
    maize: "maize"
};

// Crop select karna
cropCards.forEach((card) => {
    card.addEventListener("click", function () {
        cropCards.forEach((item) => {
            item.classList.remove("selected");
        });

        this.classList.add("selected");

        selectedCrop = this.getAttribute("data-crop");

        selectedCropText.textContent =
            translations[currentLanguage][selectedCrop];
    });
});

// Language change
languageSelect.addEventListener("change", function () {
    translatePage(this.value);
});

function translatePage(language) {
    currentLanguage = language;

    const elements = document.querySelectorAll("[data-key]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-key");

        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    document.title = translations[language].pageTitle;

    if (selectedCrop) {
        selectedCropText.textContent =
            translations[language][selectedCrop];
    }

    renderHistory();
}

// Image select karna
imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    selectedImage = file;

    const imageURL = URL.createObjectURL(file);
    previewImage.src = imageURL;
    previewImage.style.display = "block";

    statusMessage.textContent = "";
});

// Analyze button
analyzeBtn.addEventListener("click", function () {
    if (!selectedCrop) {
        statusMessage.textContent =
            translations[currentLanguage].selectCrop;

        statusMessage.style.color = "red";
        return;
    }

    if (!selectedImage) {
        statusMessage.textContent =
            translations[currentLanguage].selectImage;

        statusMessage.style.color = "red";
        return;
    }

    statusMessage.textContent =
        translations[currentLanguage].analyzing;

    statusMessage.style.color = "#176b3a";
    analyzeBtn.disabled = true;

    setTimeout(function () {
        const diseases = [
            "healthy",
            "disease1",
            "disease2",
            "disease3"
        ];

        const randomDisease =
            diseases[Math.floor(Math.random() * diseases.length)];

        let diseaseName;
        let recommendation;

        if (randomDisease === "healthy") {
            diseaseName = translations[currentLanguage].healthy;
            recommendation =
                translations[currentLanguage].recommendationHealthy;
        } else {
            diseaseName =
                translations[currentLanguage][randomDisease];

            recommendation =
                translations[currentLanguage].recommendationDisease;
        }

        const confidence = Math.floor(Math.random() * 16) + 80;

        const date = new Date().toLocaleString(
            currentLanguage === "hi" ? "hi-IN" : "en-IN"
        );

        const cropName =
            translations[currentLanguage][selectedCrop];

        cropResult.textContent = cropName;
        diseaseResult.textContent = diseaseName;
        confidenceResult.textContent = confidence + "%";
        recommendationResult.textContent = recommendation;
        dateResult.textContent = date;

        resultSection.style.display = "block";

        const historyItem = {
            cropKey: selectedCrop,
            diseaseKey: randomDisease,
            confidence: confidence,
            date: new Date().toISOString()
        };

        let history =
            JSON.parse(localStorage.getItem("cropHistory")) || [];

        history.unshift(historyItem);

        localStorage.setItem(
            "cropHistory",
            JSON.stringify(history)
        );

        renderHistory();

        statusMessage.textContent =
            translations[currentLanguage].analysisComplete;

        analyzeBtn.disabled = false;
    }, 1500);
});

// History render karna
function renderHistory() {
    let history =
        JSON.parse(localStorage.getItem("cropHistory")) || [];

    if (history.length === 0) {
        historyList.innerHTML = `
            <p>${translations[currentLanguage].noHistory}</p>
        `;
        return;
    }

    historyList.innerHTML = "";

    history.forEach((item) => {
        const cropName =
            translations[currentLanguage][item.cropKey];

        let diseaseName;
        let recommendation;

        if (item.diseaseKey === "healthy") {
            diseaseName = translations[currentLanguage].healthy;
            recommendation =
                translations[currentLanguage].recommendationHealthy;
        } else {
            diseaseName =
                translations[currentLanguage][item.diseaseKey];

            recommendation =
                translations[currentLanguage].recommendationDisease;
        }

        const formattedDate = new Date(item.date).toLocaleString(
            currentLanguage === "hi" ? "hi-IN" : "en-IN"
        );

        const historyDiv = document.createElement("div");
        historyDiv.className = "history-item";

        historyDiv.innerHTML = `
            <p>
                <strong>${translations[currentLanguage].historyCrop}:</strong>
                ${cropName}
            </p>

            <p>
                <strong>${translations[currentLanguage].historyDisease}:</strong>
                ${diseaseName}
            </p>

            <p>
                <strong>${translations[currentLanguage].historyConfidence}:</strong>
                ${item.confidence}%
            </p>

            <p>
                <strong>${translations[currentLanguage].historyRecommendation}:</strong>
                ${recommendation}
            </p>

            <p>
                <strong>${translations[currentLanguage].historyDate}:</strong>
                ${formattedDate}
            </p>
        `;

        historyList.appendChild(historyDiv);
    });
}

// History clear karna
clearHistoryBtn.addEventListener("click", function () {
    localStorage.removeItem("cropHistory");
    renderHistory();

    statusMessage.textContent =
        translations[currentLanguage].historyCleared;

    statusMessage.style.color = "#176b3a";
});

// Initial page load
translatePage("en");
