const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const webcam = new Webcam(webcamElement, 'user', canvasElement);

async function run() {
await webcam.start();
console.log("Webcam started");

const takePhotoButton = document.getElementById('take-photo');
takePhotoButton.onclick = async () => {
const imgDataUrl = await webcam.snap();
const img = new Image();
img.src = imgDataUrl;
img.onload = async () => {
  const resultsDiv = document.getElementById('results');
  resultsDiv.textContent = 'Detecting...';

  await predictObjects(img);
};
canvas.style.display = 'flex';

};
}

async function predictObjects(img) {
  const mobilenetModel = await mobilenet.load();
  const predictions = await mobilenetModel.classify(img);

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  predictions.forEach(prediction => {
    const p = document.createElement('p');
    p.textContent = `${prediction.className} - ${Math.round(prediction.probability * 100)}%`;
    resultsDiv.appendChild(p);
  });
}

run();