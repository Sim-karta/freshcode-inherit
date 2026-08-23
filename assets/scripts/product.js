class FoodProduct {
    constructor(title, category, brand, manufactureDate) {
        this._title = title;
        this._category = category;
        this._brand = brand;
        this._manufactureDate = manufactureDate;
    }

    get ageInDays() {
        return Math.floor(
            (new Date() - this._manufactureDate) / (1000 * 60 * 60 * 24),
        );
    }

    getFullInfo() {
        let days;
        if (this.ageInDays < 1) {
            days = "менше 1 дня";
        } else if (this.ageInDays === 1) {
            days = "1 день";
        } else if (this.ageInDays > 1 && this.ageInDays < 5) {
            days = this.ageInDays + " дні";
        } else {
            days = this.ageInDays + " днів";
        }

        return `Назва: ${this._title}, категорія: ${this._category}, бренд: ${this._brand}, вік товару: ${days}`;
    }
}

const product1 = new FoodProduct(
    "Молоко 2.5%",
    "Молочка",
    "Яготинське",
    new Date("2026-08-20"),
);
console.dir(product1);
console.log(product1.getFullInfo());
