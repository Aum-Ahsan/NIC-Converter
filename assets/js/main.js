import lankaNic from "lanka-nic-2019";
import maleImage from "../img/male.jpg";
import femaleImage from "../img/female.jpg";

const formEl = document.querySelector("form");
const nicEl = document.querySelector("#nic");
const avatarEl = document.querySelector("#avatar");
const nicNoEl = document.querySelector("#nicNo");
const newNicNoEl = document.querySelector("#newNicNo");
const genderEl = document.querySelector("#gender");
const dobEl = document.querySelector("#dob");
const nicInfoEl = document.querySelector("#nicInfo");
const copyBtn = document.querySelector("#copyBtn");

const getNIC = () => {
  const nicValue = nicEl.value.trim().toUpperCase();
  if (!nicValue) {
    alert("Please enter your NIC number");
    nicEl.focus();
    return;
  }

  if (!lankaNic.validateNic(nicValue)) {
    alert("Invalid NIC number! Please enter a valid NIC number.");
    return;
  }

  const nicInfo = lankaNic.infoNic(nicValue);

  nicInfoEl.classList.remove("hidden");
  setTimeout(() => {
    nicInfoEl.classList.remove("opacity-0", "translate-y-5");
    nicInfoEl.classList.add("opacity-100", "translate-y-0");
  }, 50);

  nicNoEl.textContent = nicInfo.input.toUpperCase();
  newNicNoEl.textContent = nicInfo.format === "new" ? nicInfo.input : nicInfo.newFormat;
  genderEl.textContent = nicInfo.gender;
  dobEl.textContent = nicInfo.birthday;

  avatarEl.src = nicInfo.gender === "Male" ? maleImage : femaleImage;
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  getNIC();
});

copyBtn.addEventListener("click", () => {
  const info = `
NIC Number: ${nicNoEl.textContent}
New NIC: ${newNicNoEl.textContent}
Gender: ${genderEl.textContent}
DOB: ${dobEl.textContent}`;
  navigator.clipboard.writeText(info);
  alert("NIC info copied to clipboard!");
});
