class Animal {
    constructor(name, type, age, size) {
        this.name = name;
        this.type = type;
        this.age = age;
        this.size = size;
        this.isEaten = false;
    }

    eat(input) {
        if (input && input.name !== undefined && input.type !== undefined && input.age !== undefined && input.size !== undefined) {
            if (this.type === 'herbivore') {
                console.log(`The animal ${this.name} is a herbivore and does not eat other animals.`);
            } else {
                if (input.size >= this.size * 2) {
                    console.log(`The animal ${this.name} tried to eat the ${input.name} but it was too large. `)
                } else {
                    input.isEaten = true;
                    console.log(`The animal ${this.name} ate the ${input.name}. `);
                }
            }
        } else {
            console.log(`The animal ${this.name} is eating ${input}.`);
        }
    }
}

let zebra = new Animal("Zebra", "herbivore", 3, 6);
let tiger = new Animal("Tiger", "carnivore", 5, 4);
let rabbit = new Animal("Rabbit", "herbivore", 2, 1);
let bear = new Animal("Bear", "omnivore", 10, 10);

rabbit.eat(rabbit);
tiger.eat(rabbit);
tiger.eat(bear);
zebra.eat("grass");