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

class PerishableProduct extends DiscountedProduct {
    constructor(
        title,
        category,
        brand,
        manufactureDate,
        maxDiscountLimi,
        shelfLifeDays,
    ) {
        super(title, category, brand, manufactureDate, maxDiscountLimi);
        this._shelfLifeDays = shelfLifeDays;
    }
}

const products = [
    new FoodProduct(
        "Молоко 2.5%",
        "Молочка",
        "Яготинське",
        new Date("2026-08-20"),
    ),
    new DiscountedProduct(
        "Йогурт полуничний",
        "Молочка",
        "Галичина",
        new Date("2026-08-18"),
        30,
    ),
    new DiscountedProduct(
        "Хліб пшеничний",
        "Випічка",
        "Київхліб",
        new Date("2026-08-22"),
        20,
    ),
    new PerishableProduct(
        "Сметана 15%",
        "Молочка",
        "Президент",
        new Date("2026-08-21"),
        40,
        7,
    ),
];

console.log("Інформація про товари:");
products.forEach((product) => console.log(product.getFullInfo()));

const discountedProduct = products[1];
console.log("Знижка 15% застосована:", discountedProduct.applyDiscount(15));
console.log("Після застосування знижки:", discountedProduct.getFullInfo());
console.log("Знижка 40% застосована:", discountedProduct.applyDiscount(40));

const perishableProduct = products[3];
console.dir(perishableProduct);
