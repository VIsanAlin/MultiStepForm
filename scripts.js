// Local Storage
localStorage.setItem("plan", "Arcade");
localStorage.setItem("billing", "Monthly");
localStorage.setItem("planValue", "$9/mo");

// Helps to get all the canvas
let canvas = document.querySelector("#mobile");
let canvasDesktop = document.querySelector("#desktop");

// Get all steps elements
let steps = document.querySelector("#steps");
let stepsDesktop = document.querySelector("#stepsDesktop");

// Step1
let name = document.getElementById("name");
let emailAddr = document.getElementById("emailAddress");
let phoneNr = document.getElementById("phoneNumber");

// Step2
let plans;
let selectedPlan;
let selectedPlanAmount;

let thePlan = ["Arcade", "Advanced", "Pro"];
let monthly = [9, 12, 15];
let yearly = [90, 120, 150];

// Step 3
let adds;
let monthlyAdd = ["$1/mo", "$2/mo", "$2/mo"];
let yearlyAdd = ["$10/yr", "$20/yr", "$20/yr"];

// Step 4
let costs;

// Buttons
const buttons = document.querySelector(".buttons");
const nextStep = document.getElementById("next");
const nextStepDesktop = document.getElementById("nextDesktop");
const backStep = document.getElementById("back");
const backStepDesktop = document.getElementById("backDesktop");

// To know at what step we are at
let s = 1;

// Billing is monthly (and if changed to yearly)
let b = 1;

let addOns = [];
let addOnsValue = [];

nextStep.addEventListener("click", function () {
  s++;

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
          // console.log(`${plans[i].children[1].children[1].innerHTML}`);
          plans[
            i
          ].children[1].innerHTML = `<p>${thePlan[i]}</p> <p>$${yearly[i]}/yr</p>  <p class='freeMonths'>2 months free</p>`;
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
          ].children[1].innerHTML = `<p>${thePlan[i]}</p> <p>$${monthly[i]}/mo</p>`;
        }
      }
    });

    for (let i = 0; i < plans.length; i++) {
      plans[i].addEventListener("click", function () {
        for (j = 0; j < plans.length; j++) {
          plans[j].classList.remove("selected");
        }
        plans[i].classList.add("selected");
        // console.log(plans);
        // console.log("i clicked the plans", i);
        localStorage.setItem(
          "plan",
          `${plans[i].children[1].children[0].innerHTML}`
        );
        localStorage.setItem(
          "planValue",
          `${plans[i].children[1].children[1].innerHTML}`
        );
        // Getting the amount
        // console.log(`${plans[i].children[1].children[1].innerHTML}`);
      });
    }
  }

  // Step 3
  if (s === 3) {
    bill = localStorage.getItem("billing");
    console.log(`${bill}`);

    adds = document.querySelectorAll("div.add");
    for (i = 0; i < 3; i++) {
      // Changing the amount needed to pay for adds for yearly
      if (`${bill}` === "Yearly") {
        // console.log(`${adds[i].children[2].innerHTML}`);
        adds[i].children[2].innerHTML = `${yearlyAdd[i]}`;
      }
      adds[i].children[0].addEventListener("click", function (e) {
        // console.log(`Input was clicked`);
        console.log(`${e.target.checked}`);
        if (e.target.checked === true) {
          console.log("Item checked");
          e.target.parentElement.classList.add("selected");
        } else if (e.target.checked === false) {
          console.log("Item unchecked");
          e.target.parentElement.classList.remove("selected");
        }
        // console.log(
        //   `${e.target.parentElement.children[1].children[0].innerHTML}`
        // );
        // console.log(`${e.target.parentElement.children[2].innerHTML}`);
        // e.target.classList.add("selected");
        // localStorage.setItem(
        //   "Add",
        //   `${e.target.parentElement.children[1].children[0].innerHTML}`
        // );
        addOns.push(
          `${e.target.parentElement.children[1].children[0].innerHTML}`
        );
        addOnsValue.push(`${e.target.parentElement.children[2].innerHTML}`);

        console.log(`${addOns}`);
        console.log(`${addOnsValue}`);
      });
    }
  }
  localStorage.AddValue = JSON.stringify(addOnsValue);
  localStorage.Add = JSON.stringify(addOns);

  addOns = [];
  addOnsValue = [];
  // Step 4
  if (s === 4) {
    nextStep.innerHTML = "Confirm";
    nextStep.classList.remove("next");
    nextStep.classList.add("confirm");
    let finalPlan = localStorage.getItem("plan");
    let finalPlanValue = localStorage.getItem("planValue");
    let finalBill = localStorage.getItem("billing");
    let finalAdds = JSON.parse(localStorage.getItem("Add"));
    let finalAddsValue = JSON.parse(localStorage.getItem("AddValue"));
    let adduri = "";

    costs = document.querySelector("div.costs");
    console.log(costs.children);

    // Plan
    if (finalBill === "Yearly") {
      costs.children[0].innerHTML = `
      <div> <span class="finalPlan"> ${finalPlan}(Yearly)</span> <p> Change </p> 
      </div> <p> ${finalPlanValue} </p>`;
    } else {
      costs.children[0].innerHTML = `
      <div> <span class="finalPlan"> ${finalPlan}(Monthly)</span> <p> Change </p> 
      </div> <p> ${finalPlanValue} </p>`;
    }

    // Add
    for (i = 0; i < finalAdds.length; i++) {
      adduri += `<div class="chosenAdd"> <p>${finalAdds[i]}</p> <p>${finalAddsValue[i]}</p> </div> `;
    }
    costs.children[1].innerHTML = adduri;
    // Total
    const total = [finalPlanValue, finalAddsValue];
    let fpv = Number(finalPlanValue.match(/\d+/));
    let fad = 0;
    let fadNr = 0;
    for (i = 0; i < finalAddsValue.length; i++) {
      fad = finalAddsValue[i].match(/(\d+)/);
      fadNr += Number(fad[0]);
      console.log(fad);
      console.log(fadNr);
    }
    // let fav = finalAddsValue.match(/\d+/);

    console.log(fad);
    let totalPay = fpv + fadNr;
    console.log(totalPay);
    if (finalBill === "Yearly") {
      costs.children[2].children[1].innerHTML = `$${totalPay}/yr`;
    } else {
      costs.children[2].children[1].innerHTML = `$${totalPay}/mo`;
    }
  }

  // Thank you
  if (s === 5) {
    nextStep.classList.add("hidden");
    backStep.classList.add("hidden");
    buttons.classList.add("hidden");
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

  if (s === 2) {
    for (i = 0; i < adds.length; i++) {
      adds[i].classList.remove("selected");
      adds[i].children[0].checked = false;
    }
  }

  if (s === 3) {
    for (i = 0; i < adds.length; i++) {
      adds[i].classList.remove("selected");
      adds[i].children[0].checked = false;
    }
  }
  if (s === 4) {
    nextStep.innerHTML = "Confirm";
    nextStep.classList.remove("hidden");
    nextStep.classList.remove("next");
    nextStep.classList.add("confirm");
  } else {
    children[s - 1].classList.add("stepsColor");
    children[s].classList.remove("stepsColor");
    nextStep.innerHTML = "Next Step";
    nextStep.classList.add("next");
    nextStep.classList.remove("confirm");
  }
  ////////////////////////////////////////
});

/////////////////////////////////////////////////////////////////
//Destkop

nextStepDesktop.addEventListener("click", function () {
  s++;
  console.log(s);
  //   Back button appears
  if (s >= 2) {
    backStepDesktop.classList.remove("hidden");
  }
  //  To change the step and the canvas forward
  let children = stepsDesktop.querySelectorAll("div.step");
  let canvasChildren = canvasDesktop.querySelectorAll("div.canvasD");

  canvasChildren[s - 2].classList.add("notDisplaying");
  canvasChildren[s - 1].classList.remove("notDisplaying");

  if (s === 5) {
  } else {
    children[s - 2].children[0].classList.remove("stepsColor");
    children[s - 1].children[0].classList.add("stepsColor");
  }
  ////////////////////////////////////////

  //  Step 2
  if (s === 2) {
    // Changing the plan
    plans = document.querySelectorAll("div>div.plan");
    console.log(plans);
    // Changing the Billing from monthly to yearly
    let bill = document.querySelector("div.billing");
    // console.log(`${bill.children[0].classList.add("select")}`);
    let checkDesktop = document.getElementById("checkboxDesktop");
    checkDesktop.addEventListener("click", function () {
      b++;
      console.log(`The new b value is ${b}`);
      if (b % 2 == 0) {
        bill.children[0].classList.remove("select");
        bill.children[2].classList.add("select");
        localStorage.setItem("billing", "Yearly");
        // Changing from Monthly to Yearly

        for (i = 0; i < 3; i++) {
          // console.log(`${plans[i].children[1].children[1].innerHTML}`);
          plans[
            i
          ].children[1].innerHTML = `<p>${thePlan[i]}</p> <p>$${yearly[i]}/yr</p>  <p class='freeMonths'>2 months free</p>`;
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
          ].children[1].innerHTML = `<p>${thePlan[i]}</p> <p>$${monthly[i]}/mo</p>`;
        }
      }
    });

    for (let i = 0; i < plans.length; i++) {
      plans[i].addEventListener("click", function () {
        for (j = 0; j < plans.length; j++) {
          plans[j].classList.remove("selected");
        }
        plans[i].classList.add("selected");
        // console.log(plans);
        // console.log("i clicked the plans", i);
        localStorage.setItem(
          "plan",
          `${plans[i].children[1].children[0].innerHTML}`
        );
        localStorage.setItem(
          "planValue",
          `${plans[i].children[1].children[1].innerHTML}`
        );
        // Getting the amount
        console.log(`${plans[i].children[1].children[1].innerHTML}`);
      });
    }
  }

  // Step 3
  if (s === 3) {
    bill = localStorage.getItem("billing");
    console.log(`${bill}`);

    adds = document.querySelectorAll("div.addDesktop");
    for (i = 0; i < 3; i++) {
      // Changing the amount needed to pay for adds for yearly
      if (`${bill}` === "Yearly") {
        // console.log(`${adds[i].children[2].innerHTML}`);
        adds[i].children[2].innerHTML = `${yearlyAdd[i]}`;
      }
      adds[i].children[0].addEventListener("click", function (e) {
        // console.log(`Input was clicked`);
        console.log(`${e.target.checked}`);
        if (e.target.checked === true) {
          console.log("Item checked");
          e.target.parentElement.classList.add("selected");
        } else if (e.target.checked === false) {
          console.log("Item unchecked");
          e.target.parentElement.classList.remove("selected");
        }
        // console.log(
        //   `${e.target.parentElement.children[1].children[0].innerHTML}`
        // );
        // console.log(`${e.target.parentElement.children[2].innerHTML}`);
        // e.target.classList.add("selected");
        // localStorage.setItem(
        //   "Add",
        //   `${e.target.parentElement.children[1].children[0].innerHTML}`
        // );
        addOns.push(
          `${e.target.parentElement.children[1].children[0].innerHTML}`
        );
        addOnsValue.push(`${e.target.parentElement.children[2].innerHTML}`);

        console.log(`${addOns}`);
        console.log(`${addOnsValue}`);
      });
    }
  }
  localStorage.AddValue = JSON.stringify(addOnsValue);
  localStorage.Add = JSON.stringify(addOns);

  addOns = [];
  addOnsValue = [];
  // Step 4
  if (s === 4) {
    nextStepDesktop.innerHTML = "Confirm";
    nextStepDesktop.classList.remove("next");
    nextStepDesktop.classList.add("confirm");
    let finalPlan = localStorage.getItem("plan");
    let finalPlanValue = localStorage.getItem("planValue");
    let finalBill = localStorage.getItem("billing");
    let finalAdds = JSON.parse(localStorage.getItem("Add"));
    let finalAddsValue = JSON.parse(localStorage.getItem("AddValue"));
    let adduri = "";

    costs = document.querySelector("div.costsDesktop");
    console.log(costs.children);

    // Plan
    if (finalBill === "Yearly") {
      costs.children[0].innerHTML = `
      <div> <span class="finalPlan"> ${finalPlan}(Yearly)</span> <p> Change </p> 
      </div> <p> ${finalPlanValue} </p>`;
    } else {
      costs.children[0].innerHTML = `
      <div> <span class="finalPlan"> ${finalPlan}(Monthly)</span> <p> Change </p> 
      </div> <p> ${finalPlanValue} </p>`;
    }

    // Add
    for (i = 0; i < finalAdds.length; i++) {
      adduri += `<div class="chosenAdd"> <p>${finalAdds[i]}</p> <p>${finalAddsValue[i]}</p> </div> `;
    }
    costs.children[1].innerHTML = adduri;
    // Total
    const total = [finalPlanValue, finalAddsValue];
    let fpv = Number(finalPlanValue.match(/\d+/));
    let fad = 0;
    let fadNr = 0;
    for (i = 0; i < finalAddsValue.length; i++) {
      fad = finalAddsValue[i].match(/(\d+)/);
      fadNr += Number(fad[0]);
      console.log(fad);
      console.log(fadNr);
    }
    // let fav = finalAddsValue.match(/\d+/);

    console.log(fad);
    let totalPay = fpv + fadNr;
    console.log(totalPay);
    if (finalBill === "Yearly") {
      costs.children[2].children[1].innerHTML = `$${totalPay}/yr`;
    } else {
      costs.children[2].children[1].innerHTML = `$${totalPay}/mo`;
    }
  }

  // Thank you
  if (s === 5) {
    nextStepDesktop.classList.add("hidden");
    backStepDesktop.classList.add("hidden");
    buttons.classList.add("hidden");
  }
});

backStepDesktop.addEventListener("click", function () {
  s--;
  console.log(s);
  console.log("Back step button was pressed");
  //   Back button dissapears at first step
  if (s === 1) {
    backStepDesktop.classList.add("hidden");
  }

  //To change the step and the canvas backwards
  let children = stepsDesktop.querySelectorAll("div.step");
  let canvasChildren = canvasDesktop.querySelectorAll("div.canvasD");
  canvasChildren[s - 1].classList.remove("notDisplaying");
  canvasChildren[s].classList.add("notDisplaying");

  if (s === 2) {
    for (i = 0; i < adds.length; i++) {
      adds[i].classList.remove("selected");
      adds[i].children[0].checked = false;
    }
  }

  if (s === 3) {
    for (i = 0; i < adds.length; i++) {
      adds[i].classList.remove("selected");
      adds[i].children[0].checked = false;
    }
  }
  if (s === 4) {
    nextStep.innerHTML = "Confirm";
    nextStep.classList.remove("hidden");
    nextStep.classList.remove("next");
    nextStep.classList.add("confirm");
  } else {
    children[s - 1].children[0].classList.add("stepsColor");
    children[s].children[0].classList.remove("stepsColor");
    nextStep.innerHTML = "Next Step";
    nextStep.classList.add("next");
    nextStep.classList.remove("confirm");
  }
  ////////////////////////////////////////
});
