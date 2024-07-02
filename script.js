const URL =
  "https://v6.exchangerate-api.com/v6/f869619bb976b9e015748b6c/latest/USD";

let dropDowns = document.querySelectorAll(".drop-down select");
const exchangeBtn = document.querySelector(".btn");
let exchangedAmount = document.querySelector(".conversion");
for(let select of dropDowns) {
    for(currencyCode in countryList) {
        let options = document.createElement("option");
        options.innerText = currencyCode;
        options.value = currencyCode;
        select.append(options);

        if(select.name === "from" && currencyCode === "USD") {
            options.selected = "selected";
        } else if(select.name === "to" && currencyCode === "PKR") {
            options.selected = "selected";
        }
    }

    select.addEventListener("change", (event)=>{
        changeFlag(event.target);
    })
}

const changeFlag = (element)=>{
    let currencyCode = element.value;
    let countCode = countryList[currencyCode];
    let newImgSrc = `https://flagsapi.com/${countCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newImgSrc;
}

exchangeBtn.addEventListener("click", async (event)=>{
    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let from = document.querySelector(".select-container select");
    let to = document.querySelector(".select-container-1 select");
    let amountValue = amount.value;
    let fromCurrency = from.value;
    let toCurrency = to.value;

    if(amountValue === "" || amountValue < 1){
        amountValue = 1;
        amount.value = "1";
    }

    try {
        const myURL = `https://v6.exchangerate-api.com/v6/f869619bb976b9e015748b6c/latest/${fromCurrency}`;
        const response = await fetch(myURL);
        const data = await response.json();

        if(data.result === "success") {
            const exchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = amountValue * exchangeRate;

            // Display or use convertedAmount as needed
            exchangedAmount.innerText = `${amountValue} ${from.value} = ${convertedAmount} ${to.value}`
            
        } else {
            console.error("Failed to fetch exchange rates.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
