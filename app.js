let currentMessages = [];
let currentIndex = 0;
let synth = window.speechSynthesis;

function speak(text) {
  if (synth.speaking) synth.cancel(); // Stop previous speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1; // Normal speed
  utterance.pitch = 1; // Normal pitch
  utterance.lang = 'en-US'; // Adjust as needed
  synth.speak(utterance);
}

function showCustomAlert(messages) {
  currentMessages = messages;
  currentIndex = 0;
  const firstMessage = currentMessages[currentIndex];
  document.getElementById('customAlertMessage').textContent = firstMessage;
  document.getElementById('customAlert').classList.remove('hidden');
  speak(firstMessage);
}

function nextAlertMessage() {
  currentIndex++;
  if (currentIndex < currentMessages.length) {
    const message = currentMessages[currentIndex];
    document.getElementById('customAlertMessage').textContent = message;
    speak(message);
  } else {
    document.getElementById('customAlert').classList.add('hidden');
    synth.cancel(); // Stop speaking when done
  }
}

// Reuse your message functions from before
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

function showAlertStage() {
  showCustomAlert([
    "The hidden gifts of Toastmasters... Progress I could see and growth you can measure.",
    "Evaluations that point out the good and the bad, for me to work on.",
    "Toastmasters provides a roadmap, Pathways, so you continue leveling up your skills"
  ]);
}

function showAlertEye() {
  showCustomAlert([
    "The compound effect of Toastmasters... Think of Toastmasters as a gym.",
    "You bonded with the audience...",
    "You communicated passion and strengthened your message"
  ]);
}

function showAlertGestures() {
  showCustomAlert(["Pending"]);
}

function showAlertClose() {
  showCustomAlert([
    "Because this isn't just a club.",
    "It's the launchpad for the person you're becoming.",
    "Let's grow together."
  ]);
}

