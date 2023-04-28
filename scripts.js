// Local Storage
localStorage.setItem("plan", "Arcade");
localStorage.setItem("billing", "Monthly");
localStorage.setItem("Add", JSON.stringify(``));

// Helps to get all the canvas
let canvas = document.querySelector("#mobile");

// Get all steps elements
let steps = document.querySelector("#steps");

// Step1
let name = document.getElementById("name");
let emailAddr = document.getElementById("emailAddress");
let phoneNr = document.getElementById("phoneNumber");

// Step2
let plans;
let selectedPlan;
let selectedPlanAmount;

let thePlan = ["Arcade", "Advanced", "Pro"];
let monthly = ["$9/mo", "$12/mo", "$15/mo"];
let yearly = ["$90/yr", "$120/yr", "$150/yr"];

// Step 3
let adds;
let monthlyAdd = ["$1/mo", "$2/mo", "$2/mo"];
let yearlyAdd = ["$10/yr", "$20/yr", "$20/yr"];

// Buttons
const nextStep = document.getElementById("next");
const backStep = document.getElementById("back");

// To know at what step we are at
let s = 1;

// Billing is monthly (and if changed to yearly)
let b = 1;

var addOns = [];

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

  //  Step 2
  if (s === 2) {
    // Changing the plan
    plans = document.querySelectorAll("div.plan");

    for (let i = 0; i < plans.length; i++) {
      plans[i].addEventListener("click", function () {
        for (j = 0; j < plans.length; j++) {
          plans[j].classList.remove("selected");
        }
        plans[i].classList.add("selected");
        console.log(plans);
        // console.log("i clicked the plans", i);
        localStorage.setItem(
          "plan",
          `${plans[i].children[1].children[0].innerHTML}`
        );
        // Getting the amount
        console.log(`${plans[i].children[1].children[1].innerHTML}`);
      });
    }

    // Changing the Billing from monthly to yearly
    let bill = document.querySelector("div.billing");
    // console.log(`${bill.children[0].classList.add("select")}`);
    let check = document.getElementById("checkbox");
    check.addEventListener("click", function () {
      b++;
      console.log(`The new b value is ${b}`);
      if (b % 2 == 0) {
        bill.children[0].classList.remove("select");
        bill.children[2].classList.add("select");
        localStorage.setItem("billing", "Yearly");
        // Changing from Monthly to Yearly

        for (i = 0; i < 3; i++) {
          console.log(`${plans[i].children[1].children[1].innerHTML}`);
          plans[
            i
          ].children[1].innerHTML = `<p>${thePlan[i]}</p> <p>${yearly[i]}</p>  <p class='freeMonths'>2 months free</p>`;
        }
      } else if (b % 2 == 1) {
        bill.children[2].classList.remove("select");
        bill.children[0].classList.add("select");
        localStorage.setItem("billing", "Monthly");
        // Changing from Yearly to Monthly
        for (i = 0; i < 3; i++) {
          console.log(`${plans[i].children[1].children[1].innerHTML}`);
          plans[
            i
          ].children[1].innerHTML = `<p>${thePlan[i]}</p> <p>${monthly[i]}</p>`;
        }
      }
    });
  }

  // Step 3
  if (s === 3) {
    bill = localStorage.getItem("billing");
    console.log(`${bill}`);

    adds = document.querySelectorAll("div.add");
    for (i = 0; i < 3; i++) {
      // Changing the amount needed to pay for adds for yearly
      if (`${bill}` === "Yearly") {
        console.log(`${adds[i].children[2].innerHTML}`);
        adds[i].children[2].innerHTML = `${yearlyAdd[i]}`;
      }
      adds[i].children[0].addEventListener("click", function (e) {
        // console.log(`Input was clicked`);
        console.log(
          `${e.target.parentElement.children[1].children[0].innerHTML}`
        );
        console.log(`${e.target.parentElement.children[2].innerHTML}`);
        // e.target.classList.add("selected");
        // localStorage.setItem(
        //   "Add",
        //   `${e.target.parentElement.children[1].children[0].innerHTML}`
        // );
        addOns.push(
          `${e.target.parentElement.children[1].children[0].innerHTML}`
        );

        console.log(`${addOns}`);
      });
    }
  }

  localStorage.Add = JSON.stringify(addOns);
  // Step 4
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
