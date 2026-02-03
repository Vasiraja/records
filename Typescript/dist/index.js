"use strict";
const value = "this is the value here";
console.log(value);
console.log("The console start here");
console.group("the console another");
function submitUser() {
    const inputElement = document.querySelector("#inputgiven");
    const userDiv = document.querySelector(".userlists");
    if (inputElement && userDiv) {
        const inputVal = inputElement.value;
        if (inputVal.trim() === "")
            return;
        const listItem = document.createElement("li");
        listItem.innerText = inputVal;
        userDiv.append(listItem);
        inputElement.value = "";
    }
}
