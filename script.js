// write your JS code here

const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let addNewUserCalled = false;
let doubleMoneyCalled = false;
let sortByRichestCalled = false;
let showMillionairesCalled = false;
let calculateWealthCalled = false;

let userCount = 0;
let data = [];

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/d(?=(d{3})+.)/g, "$&,");
}

// Update DOM
function updateDOM(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML =
      "<strong>" + item.name + "</strong>" + " " + formatMoney(item.money);
    main.appendChild(element);
  });
}

// Add new obj to data arr
function addData(obj) {
  data = [...data, obj];
  updateDOM();
}

// add random user and money
async function addNewUser() {
  addNewUserCalled = true;

  const newUser = {
    name: "user " + ++userCount,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function init() {
  // code here
  // --
  addNewUser();
  addNewUser();
}

// Double eveyones money
function doubleMoney() {
  doubleMoneyCalled = true;

  data = data.map((user) => {
    return {
      name: user.name,
      money: user.money * 2,
    };
  });
  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  sortByRichestCalled = true;
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  showMillionairesCalled = true;

  data = data.filter((element) => element.money > 10000000);
  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  calculateWealthCalled = true;
  let wealth = 0;

  data.forEach((element) => (wealth += element.money));

  const prevWealthEl = document.getElementById("total-wealth");
  if (prevWealthEl) {
    main.removeChild(prevWealthEl);
  }

  const wealthEl = document.createElement("div");
  wealthEl.id = "total-wealth";
  wealthEl.innerHTML =
    "<h3>Total Wealth: <strong>" + formatMoney(wealth) + "</strong></h3>";
  main.appendChild(wealthEl);
}

init();
addUserBtn.addEventListener("click", addNewUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
