class FoodProduct {
    constructor(title, category, brand) {
        this._title = title;
        this._category = category;
        this._brand = brand;
        this._manufactureDate = new Date();
    }
}

const product1 = new FoodProduct("Молоко 2.5%", "Молочка", "Яготинське");
console.dir(product1);
