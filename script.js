const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const fileName = document.getElementById("fileName");

const analyzeButton = document.getElementById("analyzeButton");
const loading = document.getElementById("loading");
const result = document.getElementById("result");

const disease = document.getElementById("disease");
const confidence = document.getElementById("confidence");
const recommendation = document.getElementById("recommendation");


// When user selects image

imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    if (!file) {
        return;
    }

    fileName.textContent = file.name;

    const imageURL = URL.createObjectURL(file);

    previewImage.src = imageURL;

    previewImage.style.display = "block";

    result.style.display = "none";
});


// Analyze button

analyzeButton.addEventListener("click", function () {

    if (!imageInput.files[0]) {

        alert("Please upload a leaf image first.");

        return;
    }


    // Show loading

    loading.style.display = "block";

    result.style.display = "none";


    // Demo analysis delay

    setTimeout(function () {

        loading.style.display = "none";

        /*
         * DEMO AI RESULT
         *
         * This is NOT a real AI model yet.
         */

        const diseases = [

            {
                name: "Tomato Early Blight",
                confidence: "94%",
                recommendation:
                "Remove infected leaves and maintain good air circulation."
            },

            {
                name: "Potato Late Blight",
                confidence: "91%",
                recommendation:
                "Remove affected leaves and avoid excessive moisture."
            },

            {
                name: "Healthy Leaf",
                confidence: "97%",
                recommendation:
                "The leaf appears healthy. Continue regular monitoring."
            },

            {
                name: "Leaf Spot",
                confidence: "89%",
                recommendation:
                "Remove heavily infected leaves and monitor the crop."
            }

        ];


        // Random demo result

        const randomIndex =
            Math.floor(Math.random() * diseases.length);

        const resultData =
            diseases[randomIndex];


        disease.textContent =
            resultData.name;

        confidence.textContent =
            resultData.confidence;

        recommendation.textContent =
            resultData.recommendation;


        result.style.display = "block";

    }, 2000);

});