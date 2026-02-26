import { additionEvent, areaOfRectangle, perimeterRectangle } from "./arithmeticmodule.js";
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
    else {
        return;
    }
}
console.log("------------------1. TypeScript Types---------------------");
var boolVar = true;
console.log("Boolean: " + boolVar);
// var bigIntVar:bigint=2320923923423n;
// console.log("BigInt: "+bigIntVar)
var numberVar = 23;
console.log("number: " + numberVar);
var stringVar = "stringVarhere";
console.log("string: " + stringVar);
var nullVar = null;
var undefinedVar = undefined;
console.log("null:", nullVar);
console.log("undefined:", undefinedVar);
var symbolVar = Symbol("unique");
console.log("symbol:", symbolVar);
console.log("------------------2. TypeScript Explicit Types and Inference---------------------");
console.log("-----i. Explict Type");
console.log(" In Explict case we need to mention which data type going to be declared");
let explictStringVal = 'Hello, Hi i am another tring';
const explictBool = false;
var explictNum = 90;
console.log("explict String, Explict Bool, ExplictNum--> " + explictStringVal, explictBool, explictNum);
console.log("-----ii. Inference ");
console.log(" In Inference case variable automatically determine the type of given variable");
let inferenceString = "here string from inference";
let inferenceNum = 3242;
let inferenceBool = false;
console.log("InferenceString,InferenceNum, InterferenceBool--> " + inferenceString, inferenceNum, inferenceBool);
console.log("------------------3. TypeScript Special Types---------------------");
var anyVar = true;
var anotheranyVar = 324;
console.log("1. any: " + anyVar);
console.log("anotheranytype: " + anotheranyVar);
var unknownVar = "hi";
console.log("2. Unknown: " + unknownVar);
console.log("you can easily change any type through this and you can safely use this without knowledge of the variable type");
console.log("3. Never: ");
//  function causeError(message:string):never{
//   throw new Error(message);
//  }
// causeError("error occureed");
console.log("------------------4. TypeScript Arrays---------------------");
console.log("-----i. Simple array");
var numberArray = [1, 2, 3, 4];
console.log("number array:", numberArray);
console.log("-----ii. Readonly method");
var readonlyArray = [213, 12, 44, 2, 31, 12];
console.log("due to readonly function we cant add any values inside the array element");
// readonlyArray.push(24)
console.log(readonlyArray);
console.log("------------------5. TypeScript Tuples---------------------");
console.log("-----i. Simple Tuple");
let tupleArr = [2132, 'stringtuple', false];
console.log("same as a array but need to specify all types of the variable inside tuple");
console.log(tupleArr);
console.log("-----ii. Named Tuple and Destructuring It");
console.log("We can easily unpack and list those details thorugh destructuring");
const eachStudentMarks = [55, 35, 55];
const [ganesh, vidhun, malathi] = eachStudentMarks;
console.log("ganesh:", ganesh);
console.log("vidhun:", vidhun);
console.log("malathi:", malathi);
console.log("------------------6. TypeScript Object---------------------");
console.log("-----i. Simple Object");
const objUser = {
    name: "Rashith haroon",
    designation: "Testing",
    dob: "12/03/1999"
};
const objInferenceObj = {
    name: "rajuvicky",
    designation: "Testing",
    phone: 9324513210
};
console.log(objUser);
console.log(objInferenceObj.phone);
console.log("-----ii. Object Optional Property");
console.log("We can define the property name inside the param type with optional case so no need to mention inside the object, we can directly modify outside of the object");
const optionalVar = {
    fileName: "caset",
    fileType: "csv",
};
optionalVar.nooffiles = 80;
console.log("-----iii. Index Signatures");
console.log("We can easily used object without a defined lists of properties");
const nameAgeMap = {};
nameAgeMap.Jack = 25;
nameAgeMap.vicky = 32;
// nameAgeMap.Mark = "Fifty";
console.log(nameAgeMap);
console.log("------------------7. TypeScript Enums---------------------");
console.log("We can store predefined values inside enum and access through enum properties, And using this we can limit the typo errors ");
console.log("And we can manage multiple values group together");
var orderstatus;
(function (orderstatus) {
    orderstatus["pending"] = "PENDING";
    orderstatus["shipped"] = "SHIPPED";
    orderstatus["delivered"] = "DELIVERED";
    orderstatus["cancelled"] = "CANCELLED";
})(orderstatus || (orderstatus = {}));
function trackOrder(status) {
    console.log(status);
}
trackOrder(orderstatus.shipped);
console.log("------------------8. TypeScript Alias and Interface---------------------");
console.log("-----i. Alias");
console.log("Which Allows types with a specified name , so instead of that type we can directly calling by that name");
let nameOfStudent = "rio";
let ageOfStudent = 6;
console.log("Below student name type string and age type number assigned to another name and used that for type mentioning");
console.log(nameOfStudent, " - ", ageOfStudent);
console.log("-----ii. Interface");
console.log("Interface also same as Alias like we can give name for the type but we only used this for objects");
;
const system = {
    osName: "Linux",
    osRam: 246,
    osStock: true
};
const newSystem = {
    osName: "Windows",
    osRam: 512,
    osStock: false
};
console.log(system, newSystem);
console.log("-----iii. Extending Interface");
const house = {
    height: 300,
    breadth: 220,
    width: 100
};
console.log("House: ", house);
console.log("------------------9. TypeScript Union Types---------------------");
console.log("Here two type of variable types allowed due to union or operator");
function printStatusCode(output) {
    console.log(output);
}
printStatusCode("200");
printStatusCode(200);
console.log("------------------10. Typescript Functions---------------------");
console.log("-----i. Simple Functions");
function getValue() {
    var length = 12;
    var width = 12;
    var value = length * width;
    return value;
}
console.log("Simple function declaration with return type number: " + getValue());
console.log("-----ii. void return type");
function funcreturnvoid() {
    console.log("return nothing becuase of void");
}
console.log("-----iii. Optional parameter");
function optionalFunc(a, b, c, d = 3900) {
    return a * b * d;
}
console.log("We use ? optional case for parameter if need that will use if not we dont need to use and error also will not arise");
console.log(optionalFunc(3, 5));
console.log("-----iv. Default Parameter");
console.log("It will take a parameter automatially if we assign any value between parameter when function definition");
console.log(optionalFunc(23, 44));
console.log("-----v. Rest Parameter");
function restFunc(a, b, ...rest) {
    console.log("rest in function in ts it will take group of rest parameters");
    return a * b * rest.reduce((prev, items) => prev + items, 0);
}
console.log(restFunc(43, 23, 55, 11, 21, 32, 55, 42, 23, 12, 44, 4));
console.log("-----vi. Named Parameter");
console.log("we can give the name of the parameter inside function");
function namedFunc({ name: firstinput, age: secondinput }) {
    return firstinput + secondinput;
}
console.log(namedFunc({ name: "vasi", age: 25 }));
console.log("------------------11. Typescript Casting---------------------");
console.log("-----i. Typecasting with as");
let asVariable = "4235";
console.log(asVariable.length);
console.log("-----ii. Typecasting with <>");
let castVariable = "343";
console.log(castVariable.length);
console.log("------------------12. Typescript Classes---------------------");
console.log("-----i. Simple Class");
class Classroot {
}
const newclass = new Classroot();
newclass.firstname = "jane";
console.log(newclass.firstname);
console.log("-----ii. Inheritance");
class Shape {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return 0;
    }
}
class Rectangle extends Shape {
    getArea() {
        return this.width * this.height;
    }
}
const myRect = new Rectangle(10, 20);
console.log(myRect.getArea()); // 200
console.log("-----iii. public, private, protected");
console.log("Public variable able to access everywhere");
console.log("Private variable accessible only inside the class");
console.log("protected variable only accessible inside class and subclass");
class Person {
    constructor(name, age, designation) {
        this.name = name;
        this.age = age;
        this.designation = designation;
    }
    getAge() {
        return this.age;
    }
}
class Employee extends Person {
    constructor(name, age, designation) {
        super(name, age, designation);
    }
    getRole() {
        return this.designation;
    }
}
const emp = new Employee("Vasi", 25, "Developer");
console.log(emp.name);
console.log(emp.getAge());
console.log(emp.getRole());
console.log("-----iv. implements");
console.log("Mostly used for interface to use that predefined type structure reuse for the functionalities");
class Mob {
    getSound() {
        console.log("Mob notify sound");
    }
}
const setSound = new Mob();
console.log(setSound.getSound());
console.log("-----v. extends");
class phoneScreen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
class realmeScreen extends phoneScreen {
    constructor(width, height, breadth, noOfObjects) {
        super(width, height);
        this.breadth = breadth;
        // this.noOfObjects=noOfObjects; //  static can't even able to access
    }
    getOverallValue() {
        let finalValue = this.width + this.height + this.breadth;
        return finalValue;
    }
}
realmeScreen.noOfObjects = 0;
const newSet = new realmeScreen(22, 33, 211, 42);
console.log(newSet.breadth);
console.log(newSet.height);
console.log(newSet.getOverallValue());
console.log("-----vi. override");
console.log("In below parent and child we access the parent functionality and modify and resue inside child");
class Parent {
    greet() {
        console.log("Hello from Parent");
    }
}
class Child extends Parent {
    greet() {
        console.log("Hello from Child");
    }
}
const obj = new Child();
obj.greet();
console.log("------------------13. Typescript Basic Generics---------------------");
console.log("------i. Generic Type");
function genericReturn(value) {
    // console.log(value.length)
    return value;
}
console.log(genericReturn(43));
console.log(genericReturn("this is string"));
console.log(genericReturn(true));
console.log("------ii. Generic Constraints");
console.log("We can't acces result's lenght in normal generic type but we can do that in generic ocnstraints");
function genericLenghtReturn(value) {
    console.log(value.length);
    return value;
}
genericLenghtReturn({ length: 34 });
genericLenghtReturn("this is the string value");
console.log("------iii. Generic Interface");
console.log("We can use this for the predefined interface functionalities ");
const response1 = {
    data: "Success",
    status: 200
};
const response2 = {
    data: 500,
    status: 200
};
console.log(response1);
console.log(response2);
console.log("------iv. Generic Class");
class genericClassAccess {
    constructor(value) {
        this.value = value;
    }
    getValuResult() {
        return this.value;
    }
}
const stringAccessValue = new genericClassAccess("stringaccess Value Here");
const numberAccessValue = new genericClassAccess(4332);
console.log("------------------13. TypeScript Utility Types---------------------");
console.log("-----i. Partial");
console.log("We can use predefined types and with partial we dont need to use all properties ");
const user1 = {
    name: "Umesh"
};
console.log(user1);
console.log("-----ii. Required");
console.log("Unlike partial every properties need to be existed in this");
const student1 = {
    name: "Vasi",
    age: 25,
    designation: "developer"
};
console.log(student1);
console.log("-----iii. Readonly");
console.log("Using this readonly property we cant able to modify any properties inside");
const studentreadonly = {
    name: "Vasi",
    age: 25,
    designation: "developer"
};
// studentreadonly.name="changed name";
console.log(studentreadonly);
console.log("-----iv. Pick");
console.log("Like select query, we determain what exactly we want");
const studentPick = {
    age: 25
};
console.log(studentPick);
console.log("-----v. Omit");
console.log("We can remove which data we dont needed");
const studentOmit = {
    name: "vasi",
    designation: "developer"
};
console.log(studentOmit);
console.log("-----vi. Record");
console.log("We can group data into one for switch roles");
const rolePermissions = {
    admin: "ALL ACCESS",
    user: "LIMITED ACCESS"
};
console.log(rolePermissions);
console.log("-----vii. ReturnType");
console.log("We can dynamicaly change the type thorugh that function return value ");
function getMarks() {
    return { name: "Jane", marks: 85 };
}
const marksObj = {
    name: "Jane",
    marks: 85
};
console.log(marksObj);
console.log("-----viii. Parameters");
console.log("We could extract input from the function and reuse the function through this");
function add(a, b) {
    return a + b;
}
const values = [10, 20];
console.log(values);
console.log("------------------14. TypeScript Switch---------------------");
let targetVal = "mon";
switch (targetVal) {
    case 'tue':
        console.log("Tuesday");
        break;
    case 'mon':
        console.log("Monday");
        break;
    case 'sun':
        console.log("Sunday");
        break;
    case 'wed':
        console.log("wednesday");
        break;
    default:
        console.log("Inputs wrong");
}
console.log("------------------15. While - do While---------------------");
let i = 1;
let check = i.toString().length;
while (check < 2) {
    check = i.toString().length;
    if (i % 2 !== 0) {
        console.log(i);
    }
    else {
        i++;
        continue;
    }
    i++;
    if (check <= 0)
        break;
}
let dowhilei = 1;
do {
    console.log(dowhilei);
    if (dowhilei === 5) {
        break;
    }
    dowhilei++;
} while (dowhilei < 10);
console.log("Loop ended");
console.log("------------------16. Function OverLoading ---------------------");
const addSeries = (a, b, c) => {
    if (c) {
        let result = a + b + c;
        console.log("result for three: " + result);
    }
    else if (!c) {
        let result = a + b;
        console.log("result for two: " + result);
    }
    return 0;
};
addSeries(12, 44, 66);
addSeries(23, 44);
console.log("------------------17. Getter, Setter Method ---------------------");
class studentDet {
    constructor() {
        this._name = "";
    }
    get name() {
        if (this._name.includes("va")) {
            throw new Error("va must not inherit here");
        }
        return this._name;
    }
    set name(value) {
        this._name = value;
        if (value.length < 3) {
            throw new Error("Name must be maximum 3 characters");
        }
        this._name = value.toUpperCase();
    }
}
const studentassign = new studentDet();
const secondstudent = new studentDet();
studentassign.name = "Karunagaran";
secondstudent.name = "pandi";
console.log(studentassign, secondstudent);
console.log("------------------18. Abstract class Method ---------------------");
class confidentialUsers {
    detailsHidden() {
        console.log("Details Are accessed here-----------------");
    }
}
// const confid = new confidentialUsers();
class accessInside extends confidentialUsers {
    accessmethod() {
        console.log("Hidden details accessed");
    }
}
const confid = new accessInside();
confid.detailsHidden();
console.log("------------------19. Intersection Types ---------------------");
let empfirst = {
    id: "EC01243",
    name: "vasi",
    department: "Development",
    noofassets: 2
};
let workerfirst = {
    id: "WE339402",
    name: "rakki",
    assignedArea: "stagearea",
    assignedWork: "NA"
};
console.log(empfirst);
console.log(workerfirst);
console.log("------------------20. Type Guards ---------------------");
console.log("Type guard implemented below for string and number without arising error ");
function returnedValue(value) {
    if (typeof (value) === 'string') {
        return value.toUpperCase();
    }
    else if (typeof (value) === 'number') {
        return value.toFixed(-1 * -2);
    }
}
console.log(returnedValue("here with string"));
console.log(returnedValue(5030));
console.log("------------------21. Instance of (like type guards for classobjects) ---------------------");
class Withdraw {
    amountMoney(amount) {
        console.log("Withdrawal Amount: " + amount);
    }
}
class Deposit {
    amountMoney(amount) {
        console.log("Deposited Amount: " + amount);
    }
}
function processFunction(transaction, amount) {
    if (transaction instanceof Withdraw) {
        transaction.amountMoney(amount);
    }
    else if (transaction instanceof Deposit) {
        transaction.amountMoney(amount);
    }
}
const getMoney = new Withdraw();
const depositMoney = new Deposit();
processFunction(getMoney, 2000);
processFunction(depositMoney, 3000);
console.log("------------------22. Type Assertions ---------------------");
console.log("Type assertion used when we know the exact type");
let someValue = "TypeScript Assertion Example";
let strLength = someValue.length;
console.log("String Length:", strLength);
console.log("------------------i. Compile-Time Error ---------------------");
let price = "9.99";
// let netPrice = price as number;
// console.log(netPrice);
console.log("------------------ii. Runtime Error ---------------------");
let element = document.querySelector("#notInput");
// We are forcing it as HTMLInputElement
let inputElement = element;
// console.log(inputElement.value.length);
console.log("------------------iii. Unexpected Behavior ---------------------");
// let value: unknown = "123";
// let num = value as number;
// console.log(num + 1);  
console.log("------------------23. Work with Modules ---------------------");
console.log(additionEvent(32, 22));
console.log(areaOfRectangle(223, 44));
console.log(perimeterRectangle(22, 12));
//# sourceMappingURL=index.js.map