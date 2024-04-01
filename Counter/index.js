const mainTitle = document.querySelector("#title");
const btnDec = document.querySelector("#decreament");
const btnRes = document.querySelector("#reset");
const btnInc = document.querySelector("#increament");

let curValue = 0;

btnInc.addEventListener("click", () => {
  curValue++;
  mainTitle.textContent = curValue;
  mainTitle.style.color = "green";
});

btnDec.addEventListener("click", () => {
  curValue--;
  mainTitle.textContent = curValue;
  mainTitle.style.color = "red";
});

btnRes.addEventListener("click", () => {
  curValue = 0;
  mainTitle.textContent = curValue;
  mainTitle.style.color = "black";
});
