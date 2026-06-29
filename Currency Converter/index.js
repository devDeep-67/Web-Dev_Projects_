const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update Exchange Rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}`;

  try {
    let response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }

    let data = await response.json();

    let rate = data.rates[toCurr.value];

    if (!rate) {
      throw new Error("Currency not found");
    }

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error(error);
    msg.innerText = "Error fetching exchange rate.";
  }
};

// Update Flags
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Button Click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// On Page Load
window.addEventListener("load", () => {
  updateExchangeRate();
});