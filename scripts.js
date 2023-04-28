// Helps to get all the canvas
let canvas = document.querySelector("#mobile");

// Get all steps elements
let steps = document.querySelector("#steps");

// Step1
let name = document.getElementById("name");
let emailAddr = document.getElementById("emailAddress");
let phoneNr = document.getElementById("phoneNumber");

// Step2

const nextStep = document.getElementById("next");
const backStep = document.getElementById("back");

// To know at what step we are at
let s = 1;

nextStep.addEventListener("click", function () {
  s++;
  console.log(s);
  console.log("Next Step button was pressed");
  //   Back button appears
  if (s >= 2) {
    backStep.classList.remove("hidden");
  }
  //  To change the step and the canvas forward
  let children = steps.querySelectorAll("p");
  let canvasChildren = canvas.querySelectorAll("div.canvas");
  canvasChildren[s - 2].classList.add("notDisplaying");
  canvasChildren[s - 1].classList.remove("notDisplaying");

  if (s === 5) {
  } else {
    children[s - 2].classList.remove("stepsColor");
    children[s - 1].classList.add("stepsColor");
  }
  ////////////////////////////////////////

  //   Step 2
  if (s === 2) {
    // Changing the plan
    let plans = document.querySelectorAll("div.plan");
    console.log(plans);
    for (let i = 0; i < plans.length; i++) {
      plans[i].addEventListener("click", function () {
        for (j = 0; j < plans.length; j++) {
          plans[j].classList.remove("selected");
        }
        plans[i].classList.add("selected");
        console.log("i clicked the plans", i);
      });
    }

    // Changing the Billing from monthly to yearly
    let v = 1;
    let check = document.getElementById("checkbox");
    check.addEventListener("click", function () {
      v++;
      console.log(`The new v value is ${v}`);
      if (v % 2 == 0) {
        console.log(plans);
        console.log("Yearly plan");
      } else if (v % 2 == 1) {
        console.log("Monthly plan");
      }
    });
  }
});

backStep.addEventListener("click", function () {
  s--;
  console.log(s);
  console.log("Back step button was pressed");
  //   Back button dissapears at first step
  if (s === 1) {
    backStep.classList.add("hidden");
  }

  //To change the step and the canvas backwards
  let children = steps.querySelectorAll("p");
  let canvasChildren = canvas.querySelectorAll("div.canvas");
  canvasChildren[s - 1].classList.remove("notDisplaying");
  canvasChildren[s].classList.add("notDisplaying");

  if (s === 4) {
  } else {
    children[s - 1].classList.add("stepsColor");
    children[s].classList.remove("stepsColor");
  }
  ////////////////////////////////////////
});
