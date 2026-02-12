console.log("Hello, Alvizabelmiro!");

let a = 10;
let b = 20;

let sum = a + b;

console.log("A soma entre " + a + " e " + b + " é: " + sum);


let object = {
    name: "Alvizabelmiro",
    age: 30,
    profession: "Developer"
};

console.log("O nome do objeto é: " + object.name);
console.log("A idade do objeto é: " + object.age);
console.log("A profissão do objeto é: " + object.profession);

function greet(name: string): string {
    return "Olá, " + name + "!";
}