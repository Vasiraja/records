
import { additionEvent, areaOfRectangle, perimeterRectangle } from "./arithmeticmodule.js";


console.log("------------------1. TypeScript Types---------------------")



var boolVar: boolean = true;
console.log("Boolean: " + boolVar)
// var bigIntVar:bigint=2320923923423n;
// console.log("BigInt: "+bigIntVar)
var numberVar: number = 23;
console.log("number: " + numberVar)
var stringVar: string = "stringVarhere";
console.log("string: " + stringVar)

var nullVar: null = null;
var undefinedVar: undefined = undefined;
console.log("null:", nullVar);
console.log("undefined:", undefinedVar);
var symbolVar: symbol = Symbol("unique");
console.log("symbol:", symbolVar);




console.log("------------------2. TypeScript Explicit Types and Inference---------------------")

console.log("-----i. Explict Type");
console.log(" In Explict case we need to mention which data type going to be declared")
let explictStringVal: string = 'Hello, Hi i am another tring';
const explictBool: boolean = false;
var explictNum: number = 90;
console.log("explict String, Explict Bool, ExplictNum--> " + explictStringVal, explictBool, explictNum);

console.log("-----ii. Inference ")
console.log(" In Inference case variable automatically determine the type of given variable");

let inferenceString = "here string from inference";
let inferenceNum = 3242;
let inferenceBool = false;

console.log("InferenceString,InferenceNum, InterferenceBool--> " + inferenceString, inferenceNum, inferenceBool);

console.log("------------------3. TypeScript Special Types---------------------");

var anyVar: any = true;
var anotheranyVar: any = 324;
console.log("1. any: " + anyVar)
console.log("anotheranytype: " + anotheranyVar)

var unknownVar: unknown = "hi";
console.log("2. Unknown: " + unknownVar);
console.log("you can easily change any type through this and you can safely use this without knowledge of the variable type")
console.log("3. Never: ");
//  function causeError(message:string):never{
//   throw new Error(message);
//  }
// causeError("error occureed");

console.log("------------------4. TypeScript Arrays---------------------");
console.log("-----i. Simple array")
var numberArray: number[] = [1, 2, 3, 4];
console.log("number array:", numberArray);

console.log("-----ii. Readonly method")
var readonlyArray: readonly number[] = [213, 12, 44, 2, 31, 12];
console.log("due to readonly function we cant add any values inside the array element")
// readonlyArray.push(24)
console.log(readonlyArray);



console.log("------------------5. TypeScript Tuples---------------------");

console.log("-----i. Simple Tuple")
let tupleArr: [number, string, boolean] = [2132, 'stringtuple', false];
console.log("same as a array but need to specify all types of the variable inside tuple")
console.log(tupleArr);

console.log("-----ii. Named Tuple and Destructuring It");
console.log("We can easily unpack and list those details thorugh destructuring")

const eachStudentMarks: [ganesh: number, vidhun: number, malathi: number] = [55, 35, 55];

const [ganesh, vidhun, malathi] = eachStudentMarks;

console.log("ganesh:", ganesh);
console.log("vidhun:", vidhun);
console.log("malathi:", malathi);



console.log("------------------6. TypeScript Object---------------------");


console.log("-----i. Simple Object")
const objUser = {
    name: "Rashith haroon",
    designation: "Testing",
    dob: "12/03/1999"
}

const objInferenceObj: { name: string, designation: string, phone: number } = {
    name: "rajuvicky",
    designation: "Testing",
    phone: 9324513210

}

console.log(objUser);
console.log(objInferenceObj.phone);

console.log("-----ii. Object Optional Property");
console.log("We can define the property name inside the param type with optional case so no need to mention inside the object, we can directly modify outside of the object")
const optionalVar: { fileName: string, fileType: string, nooffiles?: number } = {

    fileName: "caset",
    fileType: "csv",

}
optionalVar.nooffiles = 80;
console.log("-----iii. Index Signatures")
console.log("We can easily used object without a defined lists of properties")
const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Jack = 25;
nameAgeMap.vicky = 32;
// nameAgeMap.Mark = "Fifty";
console.log(nameAgeMap);





console.log("------------------7. TypeScript Enums---------------------");

console.log("We can store predefined values inside enum and access through enum properties, And using this we can limit the typo errors ")
console.log("And we can manage multiple values group together")
enum orderstatus {
    pending = "PENDING",
    shipped = "SHIPPED",
    delivered = "DELIVERED",
    cancelled = "CANCELLED"
}

function trackOrder(status: orderstatus) {
    console.log(status)
}

trackOrder(orderstatus.shipped);

console.log("------------------8. TypeScript Alias and Interface---------------------");

console.log("-----i. Alias")
console.log("Which Allows types with a specified name , so instead of that type we can directly calling by that name");


type studentNameAlias = string;
type studentAgeAlias = number;

let nameOfStudent: studentNameAlias = "rio";
let ageOfStudent: studentAgeAlias = 6;

console.log("Below student name type string and age type number assigned to another name and used that for type mentioning");
console.log(nameOfStudent, " - ", ageOfStudent);

console.log("-----ii. Interface")
console.log("Interface also same as Alias like we can give name for the type but we only used this for objects");


interface OS {

    osName: string,
    osRam: number,
    osStock: boolean
};

const system: OS = {
    osName: "Linux",
    osRam: 246,
    osStock: true
}
const newSystem: OS = {
    osName: "Windows",
    osRam: 512,
    osStock: false
}
console.log(system, newSystem);


console.log("-----iii. Extending Interface")

interface measurements {

    height: number,
    breadth: number,

}
interface addedmeasurements extends measurements {
    width: number
}

const house: addedmeasurements = {
    height: 300,
    breadth: 220,
    width: 100
}

console.log("House: ", house)


console.log("------------------9. TypeScript Union Types---------------------");
console.log("Here two type of variable types allowed due to union or operator")
function printStatusCode(output: string | number) {
    console.log(output)
}

printStatusCode("200")
printStatusCode(200);




console.log("------------------10. Typescript Functions---------------------");

console.log("-----i. Simple Functions");

function getValue(): number {
    var length: number = 12;
    var width: number = 12;
    var value = length * width;


    return value;
}

console.log("Simple function declaration with return type number: " + getValue());


console.log("-----ii. void return type")

function funcreturnvoid(): void {
    console.log("return nothing becuase of void")
}


console.log("-----iii. Optional parameter");

function optionalFunc(a: number, b: number, c?: number, d = 3900) {


    return a * b * d
}
console.log("We use ? optional case for parameter if need that will use if not we dont need to use and error also will not arise")
console.log(optionalFunc(3, 5))


console.log("-----iv. Default Parameter");
console.log("It will take a parameter automatially if we assign any value between parameter when function definition")
console.log(optionalFunc(23, 44))




console.log("-----v. Rest Parameter");

function restFunc(a: number, b: number, ...rest: number[]): any {
    console.log("rest in function in ts it will take group of rest parameters");
    return a * b * rest.reduce((prev, items) => prev + items, 0);
}
console.log(restFunc(43, 23, 55, 11, 21, 32, 55, 42, 23, 12, 44, 4));

console.log("-----vi. Named Parameter");
console.log("we can give the name of the parameter inside function");



function namedFunc(
    { name: firstinput, age: secondinput }: { name: string; age: number }
) {
    return firstinput + secondinput;
}
console.log(
    namedFunc({ name: "vasi", age: 25 })
);


console.log("------------------11. Typescript Casting---------------------");

console.log("-----i. Typecasting with as");

let asVariable: unknown = "4235";
console.log((asVariable as string).length);

console.log("-----ii. Typecasting with <>");

let castVariable: unknown = "343";
console.log((<string>castVariable).length);

console.log("------------------12. Typescript Classes---------------------");

console.log("-----i. Simple Class")
class Classroot {
    firstname!: string;
}

const newclass = new Classroot()
newclass.firstname = "jane";

console.log(newclass.firstname);

console.log("-----ii. Inheritance");

class Shape {
    constructor(
        protected width: number,
        protected height: number
    ) { }

    public getArea(): number {
        return 0;
    }
}

class Rectangle extends Shape {
    public getArea(): number {
        return this.width * this.height;
    }
}

const myRect = new Rectangle(10, 20);
console.log(myRect.getArea());


console.log("-----iii. public, private, protected");
console.log("Public variable able to access everywhere");
console.log("Private variable accessible only inside the class");
console.log("protected variable only accessible inside class and subclass");

class Person {
    public name: string;
    private age: number;
    protected designation: string;

    constructor(name: string, age: number, designation: string) {
        this.name = name;
        this.age = age;
        this.designation = designation;
    }

    public getAge() {
        return this.age;
    }
}

class Employee extends Person {
    constructor(name: string, age: number, designation: string) {
        super(name, age, designation);
    }

    public getRole() {
        return this.designation;
    }
}

const emp = new Employee("Vasi", 25, "Developer");

console.log(emp.name);


console.log(emp.getAge());
console.log(emp.getRole());

console.log("-----iv. implements");
console.log("Mostly used for interface to use that predefined type structure reuse for the functionalities")

interface notifySound {
    getSound(): void;
}
class Mob implements notifySound {
    getSound(): void {
        console.log("Mob notify sound")
    }
}
const setSound = new Mob();
console.log(setSound.getSound());

console.log("-----v. extends");

class phoneScreen {
    width: number;
    height: number;
    constructor(width: number, height: number) {

        this.width = width;
        this.height = height;
    }



}
class realmeScreen extends phoneScreen {
    breadth: number;
    static noOfObjects: any = 0;
    constructor(width: number, height: number, breadth: number, noOfObjects: any) {
        super(width, height);
        this.breadth = breadth;
        // this.noOfObjects=noOfObjects; //  static can't even able to access

    }
    getOverallValue(): number {

        let finalValue = this.width + this.height + this.breadth;

        return finalValue;

    }
}

const newSet = new realmeScreen(22, 33, 211, 42);
console.log(newSet.breadth)
console.log(newSet.height);
console.log(newSet.getOverallValue());

console.log("-----vi. override")
console.log("In below parent and child we access the parent functionality and modify and resue inside child")
class Parent {
    greet() {
        console.log("Hello from Parent");
    }
}

class Child extends Parent {
    override greet() {
        console.log("Hello from Child");
    }
}

const obj = new Child();
obj.greet();

console.log("------------------13. Typescript Basic Generics---------------------");

console.log("------i. Generic Type")

function genericReturn<T>(value: T): T {


    // console.log(value.length)
    return value;
}

console.log(genericReturn(43));
console.log(genericReturn("this is string"));
console.log(genericReturn(true));

console.log("------ii. Generic Constraints");
console.log("We can't acces result's lenght in normal generic type but we can do that in generic ocnstraints")


function genericLenghtReturn<T extends { length: number }>(value: T): T {


    console.log(value.length);
    return value;

}

genericLenghtReturn({ length: 34 });
genericLenghtReturn("this is the string value");

console.log("------iii. Generic Interface");
console.log("We can use this for the predefined interface functionalities ")
interface ApiResponse<T> {
    data: T;
    status: number

}
const response1: ApiResponse<string> = {
    data: "Success",
    status: 200
};

const response2: ApiResponse<number> = {
    data: 500,
    status: 200
};

console.log(response1);
console.log(response2);


console.log("------iv. Generic Class");

class genericClassAccess<T> {

    value: T;

    constructor(value: T) {
        this.value = value;


    }
    getValuResult(): T {
        return this.value;
    }

}

const stringAccessValue = new genericClassAccess<string>("stringaccess Value Here");
const numberAccessValue = new genericClassAccess<number>(4332);






console.log("------------------13. TypeScript Utility Types---------------------");





console.log("-----i. Partial");
console.log("We can use predefined types and with partial we dont need to use all properties ")

type Students = {
    name: string;
    age: number;
    designation: string

}

const user1: Partial<Students> = {

    name: "Umesh"
}
console.log(user1);

console.log("-----ii. Required");
console.log("Unlike partial every properties need to be existed in this")

const student1: Required<Students> = {
    name: "Vasi",
    age: 25,
    designation: "developer"
};

console.log(student1);

console.log("-----iii. Readonly");
console.log("Using this readonly property we cant able to modify any properties inside")
const studentreadonly: Readonly<Students> = {
    name: "Vasi",
    age: 25,
    designation: "developer"
};

// studentreadonly.name="changed name";
console.log(studentreadonly)

console.log("-----iv. Pick");
console.log("Like select query, we determain what exactly we want")

const studentPick: Pick<Students, "age"> = {
    age: 25
};

console.log(studentPick);

console.log("-----v. Omit");
console.log("We can remove which data we dont needed")

const studentOmit: Omit<Students, "age"> = {
    name: "vasi",
    designation: "developer"
};


console.log(studentOmit);


console.log("-----vi. Record");
console.log("We can group data into one for switch roles")

type Role = "admin" | "user";

const rolePermissions: Record<Role, string> = {
    admin: "ALL ACCESS",
    user: "LIMITED ACCESS"
};

console.log(rolePermissions);



console.log("-----vii. ReturnType");
console.log("We can dynamicaly change the type thorugh that function return value ")
function getMarks() {
    return { name: "Jane", marks: 85 };
}

type MarksType = ReturnType<typeof getMarks>;

const marksObj: MarksType = {
    name: "Jane",
    marks: 85
};

console.log(marksObj);

console.log("-----viii. Parameters");
console.log("We could extract input from the function and reuse the function through this")
function add(a: number, b: number) {
    return a + b;
}

type AddParams = Parameters<typeof add>;

const values: AddParams = [10, 20];

console.log(values);




console.log("------------------14. TypeScript Switch---------------------");

let targetVal: any = "mon";


switch (targetVal) {
    case 'tue':
        console.log("Tuesday");
        break;
    case 'mon':
        console.log("Monday")
        break;
    case 'sun':
        console.log("Sunday")
        break;

    case 'wed':
        console.log("wednesday")
        break;
    default:
        console.log("Inputs wrong");

}

console.log("------------------15. While - do While---------------------");

let i: number = 1;

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


let dowhilei: number = 1;

do {
    console.log(dowhilei);

    if (dowhilei === 5) {
        break;
    }


    dowhilei++;
} while (dowhilei < 10);

console.log("Loop ended");


console.log("------------------16. Function OverLoading ---------------------");



const addSeries: any = (a: number, b: number, c?: number) => {

    if (c) {
        let result: any = a + b + c;
        console.log("result for three: " + result)
    }
    else if (!c) {
        let result: any = a + b;
        console.log("result for two: " + result)
    }


    return 0;

}


addSeries(12, 44, 66);
addSeries(23, 44);


console.log("------------------17. Getter, Setter Method ---------------------");

class studentDet {

    private _name: string = "";


    get name(): string {
        if (this._name.includes("va")) {
            throw new Error("va must not inherit here")

        }
        return this._name;

    }
    set name(value: string) {
        this._name = value;
        if (value.length < 3) {
            throw new Error("Name must be maximum 3 characters")
        }
        this._name = value.toUpperCase();

    }
}
const studentassign = new studentDet();
const secondstudent = new studentDet();
studentassign.name = "Karunagaran";
secondstudent.name = "pandi";


console.log(studentassign, secondstudent)

console.log("------------------18. Abstract class Method ---------------------");

abstract class confidentialUsers {

    detailsHidden() {
        console.log("Details Are accessed here-----------------")
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

interface identity {
    id: string;
    name: string;

}
interface designation {
    department: string;
    noofassets: number;

}
interface workersDetail {
    assignedWork: string;
    assignedArea: string;

}

type Employees = identity & designation;
type Workers = identity & workersDetail;

let empfirst: Employees = {

    id: "EC01243",
    name: "vasi",
    department: "Development",
    noofassets: 2

}
let workerfirst: Workers = {
    id: "WE339402",
    name: "rakki",
    assignedArea: "stagearea",
    assignedWork: "NA"
}

console.log(empfirst);
console.log(workerfirst);

console.log("------------------20. Type Guards ---------------------");
console.log("Type guard implemented below for string and number without arising error ")

function returnedValue(value: string | number) {

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
    amountMoney(amount: number) {
        console.log("Withdrawal Amount: " + amount);
    }
}

class Deposit {
    amountMoney(amount: number) {
        console.log("Deposited Amount: " + amount);
    }
}

function processFunction(
    transaction: Withdraw | Deposit,
    amount: number
) {

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

let someValue: unknown = "TypeScript Assertion Example";

let strLength: number = (someValue as string).length;

console.log("String Length:", strLength);
console.log("------------------i. Compile-Time Error ---------------------");

let price = "9.99";

// let netPrice = price as number;

// console.log(netPrice);

console.log("------------------ii. Runtime Error ---------------------");

let element = document.querySelector("#notInput");

// We are forcing it as HTMLInputElement
let inputElement = element as HTMLInputElement;

// console.log(inputElement.value.length);


console.log("------------------iii. Unexpected Behavior ---------------------");

// let value: unknown = "123";

// let num = value as number;

// console.log(num + 1);  


console.log("------------------23. Work with Modules ---------------------");

console.log(additionEvent(32, 22));
console.log(areaOfRectangle(223, 44));
console.log(perimeterRectangle(22, 12));

console.log("------------------24. TS Operators---------------------");

console.log("-----i. Arithmetic Operators")
let a: number = 10;
let b: number = 5;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Modulus:", a % b);

console.log("-----ii. Assignment Operators")
let x: number = 10;

x += 5;
console.log("+= :", x);

x -= 3;
console.log("-= :", x);

x *= 2;
console.log("*= :", x);

x /= 4;
console.log("/= :", x);

console.log("-----iii. Comparison Operators")
let num1: number = 10;
let num2: number = 20;

console.log("Equal:", num1 == num2);
console.log("Strict Equal:", num1 === num2);
console.log("Not Equal:", num1 != num2);
console.log("Greater Than:", num2 > num1);
console.log("Less Than:", num1 < num2);
console.log("Greater or Equal:", num1 >= 10);

console.log("-----iv. Logical Operators")
let isLoggedIn: boolean = true;
let isAdmin: boolean = false;

console.log("AND:", isLoggedIn && isAdmin);
console.log("OR:", isLoggedIn || isAdmin);
console.log("NOT:", !isLoggedIn);


console.log("-----v. Increment Decrement Operators");
let count: number = 5;

count++;
console.log("Increment:", count);

count--;
console.log("Decrement:", count);
console.log("-----vi. Ternary Operator")
let age: number = 18;

let result = age >= 18 ? "Adult" : "Minor";
console.log("Ternary:", result);


console.log("-----vi. Nullish Coalcing ")
let inputValue: string | null = null;

let output = inputValue ?? "Default Value";
console.log("Nullish Coalescing:", output);

console.log("------------------25. Type Annotation---------------------");

var typeannotvariable: string = "";
console.log("here : is the type annotation creator")

console.log("------------------26. Anonymous Function---------------------");

let functionAnonymouse = function (firstNum: number, secondNum: number): number {


    return firstNum * secondNum
}

console.log(functionAnonymouse(32, 44));

console.log("------------------27. Arrow Function---------------------");
let multiply = (x: number, y: number): number => {
    return x * y;
};

console.log(multiply(4, 5));

console.log("------------------28. Duck Typing---------------------");

interface useraccess {
    name: string,
    age: number,

}

interface car {
    model: "Toyato",
    color: "blue"
}

let studentUser = {
    name: "vasiraja",
    age: 20,
    isStudent: true

}

let car = {
    name: "Volvo",
    color: "red",
}
console.log("car object doesnt works but for studnets user works , eventhough user has extra property becuase it has name and age which already defined in interface but car dont have that .")
console.log(studentUser)
console.log(car)

greet(studentUser)
function greet(person: useraccess) {
    console.log(`Hello ${person.name}, Age: ${person.age}`);
}



console.log("------------------29. KeyOf Type Operator---------------------");
interface keyPerson {
    name: string;
    age: number;
}
type keyPersonset = keyof keyPerson

let key: keyof keyPerson;
key = "name",
    key = "age",
    // key='email',---> this will be eror 

    console.group("Keyof return the union of property names ");



function getProperty(obj: keyPerson, key: keyof keyPerson) {
    return obj[key];
}

let person = { name: "Rahul", age: 25 };
console.log(getProperty(person, "name"));
console.log(getProperty(person, "age"));
console.log("------------------30. TypeOf Type Operator  ---------------------");
let str1: string = "TutorialsPoint";
console.log(typeof str1);
let num1s: number = 32;
console.log(typeof num1s);
let bool1: boolean = true;
console.log(typeof bool1);



console.log("------------------31. Indexed Access Types   ---------------------");
interface accessIndexed {
    name: string,
    age: number
}


type stringType = accessIndexed['name'];
type numberType = accessIndexed['age'];


console.log("------------------32. Template Literal Types   ---------------------");



type assignText = "how are you";
type Greeting = `Hi, ${assignText}`;
const greeting: Greeting = "Hi, how are you";
console.log(greeting);


console.log("------------------33. Namespaces   ---------------------");
//  class User(){}
//  class User(){}
//  class User(){}

console.log("Namespaces grouping related codes together to avoid name conflicts ")
namespace AdminN {
    export class User {


    }
}
namespace GuestN {
    export class User {

    }
}


const admin = new AdminN.User();
const guest = new GuestN.User();





console.log("------------------34. Ambients   ---------------------");
console.log("Tell typescript that something exists somewere else, without actuall implemenation")

// $("#button").click();    
console.log("this errors above")

declare var $: any;

// $("#button").click();   

console.log("But now there is no error");



console.log("------------------35. Decorators   ---------------------");
console.log("before using deorator we need to enable it inside ts.config.js  file")


function Logger(constructor: Function) {
    console.log("Decorator called");
}

@Logger
class Decorcheck {
    name = "firstname";
}

let p = new Decorcheck();
console.log("Decorator called even created before instance of the class we can use this method and properties also")


console.log("-----i . Class Decorator ")
function Sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@Sealed
class BankAccount {
    balance: number = 0;
}


console.log("-----ii. property decorator")
function ReadOnly(target: any, key: string) {
    Object.defineProperty(target, key, {
        writable: false,
        configurable: false,
    });
}
// class Config {
//     @ReadOnly
//     version: string = "1.0.0";
// }

console.log("-----iii. parameter decorator")
// class OrderService {
//     createOrder(@Required productId: string, quantity: number) {
//         // ...
//     }
// }






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
    } else {
        return;
    }
}

console.log("We can group code functions into inside through this namespaces")





const buttonTri = document.querySelector("#submitusertrigger");
buttonTri?.addEventListener("click", submitUser)