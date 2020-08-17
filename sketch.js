// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/1-teachable-machine.html
// https://editor.p5js.org/codingtrain/sketches/PoZXqbu4v

// The video
let video;
let mySound;
// For displaying the label
let label = "waiting...";
let confidence;
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/UrHmWyja0/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  soundFormats('mp3', 'ogg');
  mySound = loadSound('Store.mp3');
  mySound.playMode('untilDone');
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
  if (label == "scissors") {
    if (confidence > .95)
    {
      mySound.play();
    }
  }


}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  console.log(results);
  confidence = results[0].confidence;
  classifyVideo();
}
