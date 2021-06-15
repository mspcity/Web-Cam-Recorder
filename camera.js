// dom
const recordButton = document.querySelector(".record-button")
const stopButton = document.querySelector(".stop-button")
const playButton = document.querySelector(".play-button")
const downloadButton = document.querySelector(".download-button")
const previewPlayer = document.querySelector("#preview")
const recordingPlayer = document.querySelector("#recording")

let recorder;
let recordedChunks = [];

// functions
function videoStart() {
  navigator.mediaDevices.getUserMedia({video:true, audio:true})
  .then(stream => {
      previewPlayer.srcObject = stream;
      startRecording(previewPlayer.captureStream())
      
  });
}

function startRecording(stream) {
     recorder = new MediaRecorder(stream);
     recorder.ondataavailable = (e) => { recordedChunks.push(e.data)}
     recorder.start()
}
function stopRecording() {
      previewPlayer.srcObject.getTracks().forEach(track => track.stop());
      recorder.stop()
      console.log(recordedChunks)


}

// event
recordButton.addEventListener("click", videoStart)
stopButton.addEventListener("click", stopRecording)