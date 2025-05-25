let currentMessages = [];
let currentIndex = 0;
let synth = window.speechSynthesis;

let voices = [];
let selectedVoice = null;

// Load available voices and populate the dropdown
function loadVoices() {
  voices = synth.getVoices();
  const voiceSelect = document.getElementById('voiceSelect');
  if (!voiceSelect) return;

  voiceSelect.innerHTML = '';
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  selectedVoice = voices[0] || null;
}

// Ensure voices are loaded (some browsers delay loading)
window.speechSynthesis.onvoiceschanged = loadVoices;
window.addEventListener('load', loadVoices);

document.getElementById('voiceSelect')?.addEventListener('change', (e) => {
  selectedVoice = voices[e.target.value];
});

let isMuted = false;

function toggleMute() {
  isMuted = !isMuted;
  const muteButton = document.getElementById('muteButton');
  muteButton.textContent = isMuted ? '🔈 Unmute' : '🔇 Mute';

  if (isMuted) {
    speechSynthesis.cancel();
  } else {
    replayAlert();
  }
}

function speak(text) {
  if (isMuted) return;
  if (synth.speaking) synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = 1;
  utterance.pitch = 2;
  utterance.volume = 1;
  synth.speak(utterance);
}

function replayAlert() {
  if (currentMessages.length === 0 || currentIndex === 0) return;

  const inputField = document.getElementById('userPrediction');
  const alertBox = document.getElementById('customAlert');
  const nextBtn = alertBox.querySelector("button[onclick='nextAlertMessage()']");

  inputField.value = '';
  inputField.style.display = 'block';
  inputField.focus();

  if (nextBtn) {
    nextBtn.textContent = "Submit Guess";
    nextBtn.onclick = nextAlertMessage;
  }

  const messageBox = document.getElementById('customAlertMessage');
  messageBox.textContent = '';

  currentIndex--; // Step back one
}

function showCustomAlert(messages) {
  currentMessages = messages;
  currentIndex = 0;

  const alertBox = document.getElementById('customAlert');
  const messageBox = document.getElementById('customAlertMessage');
  const progress = document.getElementById('progressBarContainer');

  if (!alertBox || !messageBox || !progress) return;

  alertBox.classList.remove('hidden');
  progress.style.display = 'block';
  nextAlertMessage();
}

function nextAlertMessage() {
  const messageBox = document.getElementById('customAlertMessage');
  const progressBar = document.getElementById('progressBar');
  const progress = document.getElementById('progressBarContainer');
  const alertBox = document.getElementById('customAlert');
  const inputField = document.getElementById('userPrediction');

  if (currentIndex >= currentMessages.length) {
    alertBox.classList.add('hidden');
    progress.style.display = 'none';
    synth.cancel();
    return;
  }

  // Step 1: Clear message and show input field
  messageBox.textContent = '';
  inputField.value = '';
  inputField.style.display = 'block';
  inputField.focus();

  // Step 2: Replace Next button with Confirm Prediction until they press enter
  const nextBtn = alertBox.querySelector("button[onclick='nextAlertMessage()']");
  if (nextBtn) {
    nextBtn.textContent = "Submit Guess";
    nextBtn.onclick = function () {
      const userGuess = inputField.value.trim();
      console.log("User guessed:", userGuess); // Optional: process guess

      const message = currentMessages[currentIndex];
      messageBox.textContent = message;

      inputField.style.display = 'none';
      nextBtn.textContent = "Next";
      nextBtn.onclick = nextAlertMessage;

      progressBar.style.width = '0%';
      setTimeout(() => {
        progressBar.style.transition = 'width 1.2s linear';
        progressBar.style.width = '100%';
      }, 100);

      speak(message);
      currentIndex++;
    };
  }
}

// --- Custom alert message sequences ---

function showAlertOpening() {
  showCustomAlert([
    "It was 2010 when I stumbled into a Toastmaster Meeting",
    "I listened to a few speakers, my heart pounding - then before anyone could even notice I was there, I bolted for the exit",
    "The fear of public speaking had its grip on me, and I didn't look back... until two years later, in February of 2012"
  ]);
}

function showAlertIntro() {
  showCustomAlert([
    "I interviewed for a position as a Business Development Specialist with the state of Florida - great opportunity, great hours.",
    "A three-person panel fired questions at me, but one stopped me cold: Public speaking is required for this role. Are you comfortable with that?",
    "Without another minute of hesitation I said, I'll be sharpening those skills at Toastmasters.",
    "What I didn't know? The head interviewer was a Toastmaster... The next day I was hired! - Thank You Toastmasters!!!"
  ]);
}

function showAlertBody1() {
  showCustomAlert([
    "The hidden gifts of Toastmasters... Progress I could see and growth you can measure.",
    "Evaluations that point out the good and the bad, for me to work on.",
    "Toastmasters provides a roadmap, Pathways, so you continue leveling up your skills"
  ]);
}

function showAlertBody2() {
  showCustomAlert([
    "Growth you can measure",
    "Toastmasters gives you a roadmap, for growth - the proof your leveling up. Now called Pathways",
    "You can see your progress, and the skills you are developing",
    "Evaluations that help sharpen your speech skills",
  ]);
}

function showAlertBody3() {
  showCustomAlert([
    "Simply put, because it works...because of the compound effect.",
    "Think of Toastmasters like a gym. You wouldn't cancel your membership after one workout because you're not ripped yet, right?",
    "The real benefit comes from showing up week after week, when impromtu answers flow effortlessly, your evaluations help members to grow, and speeches become second nature.",
    "Where's the magic...it compounds!!!"
  ]);
}

function showAlertClose() {
  showCustomAlert([
    "This isn't just a club.",
    "It's the launchpad for the person you're becoming.",
    "Let's grow together."
  ]);
}

function exitAlert() {
  synth.cancel();
  document.getElementById('customAlert').classList.add('hidden');
  currentMessages = [];
  currentIndex = 0;
}


