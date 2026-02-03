



const value: string = "this is the value here";
console.log(value);

console.log("The console start here")
console.group("the console another")

function submitUser(): void {

    const inputElement = document.querySelector<HTMLInputElement>("#inputgiven");
    const userDiv = document.querySelector<HTMLUListElement>(".userlists");

    if (inputElement && userDiv) {
        const inputVal = inputElement.value;
        if (inputVal.trim() === "") return;

        const listItem = document.createElement("li");
        listItem.innerText = inputVal;

        userDiv.append(listItem);

        inputElement.value = "";
    }
}





 

 