let time_limit = 60;

let text_array = [
  "We can do anything we want to if we stick to it long enough.",
  "Don't tell people your plans. Show them your results.",
  "Good things happen to those who hustle.",
  "Life isn't a matter of milestones, but of moments.",
  "Keep your eyes on the stars and your feet on the ground.",
  "Believe you can and you're halfway there.",
  "Change your thoughts and you change your world.",
  "The average men consume. The wise create.",
];

let timer_text = document.querySelector(".time_actual");
let accuracy_text = document.querySelector(".accuracy_actual");
let error_text = document.querySelector(".errors_actual");
let cpm_text = document.querySelector(".cpm_actual");
let wpm_text = document.querySelector(".wpm_actual");
let test_text = document.querySelector(".test_text");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = time_limit;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_text = "";
let textNo = 0;
let timer = null;

function updateText() {
  test_text.textContent = null;
  current_text = text_array[textNo];

  current_text.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    test_text.appendChild(charSpan);
  });

  if (textNo < text_array.length - 1) textNo++;
  else textNo = 0;
}

function checkInput() {
  curr_input = input_area.value;
  curr_input_array = curr_input.split("");

  characterTyped++;

  errors = 0;

  textSpanArray = test_text.querySelectorAll("span");
  textSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index];

    if (typedChar == null) {
      char.classList.remove("correct_input");
      char.classList.remove("incorrect_input");
    } else if (typedChar === char.innerText) {
      char.classList.add("correct_input");
      char.classList.remove("incorrect_input");
    } else {
      char.classList.add("incorrect_input");
      char.classList.remove("correct_input");

      errors++;
    }
  });

  error_text.textContent = total_errors + errors;

  let correctCharacters = characterTyped - (total_errors + errors);
  let accuracyVal = (correctCharacters / characterTyped) * 100;
  accuracy_text.textContent = Math.round(accuracyVal);

  if (curr_input.length == current_text.length) {
    updateText();

    total_errors += errors;

    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;

    timeElapsed++;

    timer_text.textContent = timeLeft + "s";
  } else {
    finishTest();
  }
}

function finishTest() {
  clearInterval(timer);

  input_area.disabled = true;

  test_text.textContent = "Click on restart to start a new game.";

  restart_btn.style.display = "block";

  cpm = Math.round((characterTyped / timeElapsed) * 60);
  wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}

function startTest() {
  restart();
  updateText();

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function restart() {
  timeLeft = time_limit;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  textNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  test_text.textContent = "Click on the area below to start the game.";
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}
