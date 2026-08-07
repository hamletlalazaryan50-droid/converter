//"use strict";

const amdInput = document.getElementById("amd");
const usdInput = document.getElementById("usd");

function getRates() {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://v6.exchangerate-api.com/v6/088177043da085e493e458ff/latest/USD",
  );

  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.response);
      let rates = data.conversion_rates;

      printPrices(rates);
    }
  };
  request.send();
}

function printPrices(rates) {
  document.querySelector(".usd").textContent = rates.AMD.toFixed(2);
  document.querySelector(".eur").textContent = (rates.AMD / rates.EUR).toFixed(
    2,
  );
  document.querySelector(".rub").textContent = (rates.AMD / rates.RUB).toFixed(
    2,
  );
}

getRates();

amdInput.addEventListener("input", () => {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://v6.exchangerate-api.com/v6/088177043da085e493e458ff/latest/USD",
  );
  request.setRequestHeader("Content-type", "application/json");
  request.send();

  request.addEventListener("load", () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);

      usdInput.value = (amdInput.value / data.conversion_rates.AMD).toFixed(2);
    } else {
      usdInput.value = "Something went wrong";
    }
  });
});
