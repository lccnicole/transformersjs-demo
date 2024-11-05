import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@latest';

// Set the execution provider (e.g., 'cpu' or 'gpu')
const options = {
    executionProviders: ['gpu'], // or ['cpu'] for CPU execution provider
};

//env.allowLocalModels = true;

const status = document.getElementById('status');
const fileUpload = document.getElementById('file-upload');
const imageContainer = document.getElementById('image-container');

// Create a new object detection pipeline
status.textContent = 'Loading model...';
//const pipe = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
const prediction = await pipeline('image-to-text', 'Xenova/trocr-small-handwritten', null, options);
status.textContent = 'Ready';
/*const image1 = './text_sample.png';
const prediction_printer = await pipeline('image-to-text', 'Xenova/trocr-base-printed');
prediction_printer(image1).then(result => {
    console.log("prediction result", result)
    const generatedText = result[0].generated_text;
    console.log(generatedText);
}).catch(console => {
    console.error('Error:', error);
});*/


fileUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();

    // Set up a callback when the file is loaded
    reader.onload = function (e2) {
        imageContainer.innerHTML = '';
        const image = document.createElement('img');
        image.src = e2.target.result;
        imageContainer.appendChild(image);
        console.log("image src:", image.src);
        predict(image.src);
    };
    reader.readAsDataURL(file);
});



// Detect objects in the image
async function predict(image) {
    status.textContent = 'Analysing...';
    //const output = await prediction(file);
    prediction(image).then(result => {
        console.log(result)
        const generatedText = result[0].generated_text;
        console.log(generatedText);
        status.textContent = generatedText;
    }).catch(console => {
        console.error('Error:', error);
    });
}
