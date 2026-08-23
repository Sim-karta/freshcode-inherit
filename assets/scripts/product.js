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

class DiscountedProduct extends FoodProduct {
    constructor(title, category, brand, manufactureDate, maxDiscountLimit) {
        super(title, category, brand, manufactureDate);
        this._maxDiscountLimit = maxDiscountLimit;
        this._currentDiscount = 0;
    }

    applyDiscount(percent) {
        if (percent <= this._maxDiscountLimit) {
            this._currentDiscount = percent;
            return true;
        }

        return false;
    }

    getFullInfo() {
        return `${super.getFullInfo()}, поточна знижка: ${this._currentDiscount}%, максимальна знижка: ${this._maxDiscountLimit}%`;
    }
}

const product1 = new DiscountedProduct(
    "Молоко 2.5%",
    "Молочка",
    "Яготинське",
    new Date("2026-08-20"),
    50,
);
console.dir(product1);
console.log(product1.getFullInfo());
