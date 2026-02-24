console.log("------->")


interface jsonTypes {
    name: string,
    class: string,
    section: string,
    gender: string,
    age: number
}


const jsonAssign: jsonTypes[] = [
    { name: "vasi", class: "XII", section: "B", gender: "male", age: 19 },
    { name: "siva", class: "XI", section: "B", gender: "male", age: 19 },
    { name: "irul", class: "XII", section: "B", gender: "male", age: 19 },
    { name: "seeni", class: "X", section: "B", gender: "male", age: 19 },


];
 


document.addEventListener("DOMContentLoaded", () => {

    // const divContainer = document.createElement("div");
    // divContainer.classList.add("divdynamic");

    // if (divContainer) {

    //     console.log("Dom loaded")
    //     for (let students of jsonAssign) {
    //         const nameitem = document.createElement("li");
    //         const classItem = document.createElement("li");
    //         const sectionItem = document.createElement("li");
    //         const ageItem = document.createElement("li");
    //         const genderItem = document.createElement("li");

    //         if (nameitem && classItem && ageItem && genderItem && sectionItem) {


    //             nameitem.innerText = students.name;
    //             classItem.innerText = students.class;
    //             ageItem.innerText = students.age.toString();
    //             genderItem.innerText = students.gender;
    //             sectionItem.innerText = students.section;
    //             const insideDiv = document.createElement("div");
    //             insideDiv.classList.add("insidediv");

    //             insideDiv.append(nameitem);
    //             insideDiv.append(classItem);
    //             insideDiv.append(sectionItem);
    //             insideDiv.append(ageItem);
    //             insideDiv.append(genderItem);
    //             divContainer.append(insideDiv);

    //         }


    //     }


    //     document.body.append(divContainer)




    // }
    

})