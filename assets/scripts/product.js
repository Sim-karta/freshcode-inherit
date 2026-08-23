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

    get daysLeft() {
        return this._shelfLifeDays - this.ageInDays;
    }

    get isExpired() {
        return this.daysLeft <= 0;
    }

    calculateRecommendedDiscount() {
        if (this.isExpired) {
            return 0;
        }

        if (this._category === "Молочка") {
            if (this.daysLeft === 1) {
                return 40;
            }
            if (this.daysLeft === 2) {
                return 20;
            }
        }

        if (this._category === "Випічка") {
            if (this.daysLeft === 1) {
                return 50;
            }
            if (this.daysLeft === 2) {
                return 30;
            }
        }

        if (this.daysLeft === 1) {
            return 30;
        }
        if (this.daysLeft === 2) {
            return 15;
        }

        return 0;
    }

    getFullInfo() {
        let status = "свіжий";

        if (this.isExpired) {
            status = "прострочений";
        } else if (this._currentDiscount > 0) {
            status = "уцінений";
        }

        return `${super.getFullInfo()}, залишилося днів: ${this.daysLeft}, статус: ${status}`;
    }
}

const storeProducts = [
    new PerishableProduct(
        "Молоко 2.5%",
        "Молочка",
        "Яготинське",
        new Date("2026-08-22"),
        50,
        7,
    ),
    new PerishableProduct(
        "Яйця курячі",
        "Яйця",
        "Квочка",
        new Date("2026-08-23"),
        30,
        21,
    ),
    new PerishableProduct(
        "Печиво вівсяне",
        "Солодощі",
        "Артек",
        new Date("2026-08-22"),
        25,
        30,
    ),
    new PerishableProduct(
        "Сметана 15%",
        "Молочка",
        "Президент",
        new Date("2026-08-18"),
        50,
        6,
    ),
    new PerishableProduct(
        "Хліб пшеничний",
        "Випічка",
        "Київхліб",
        new Date("2026-08-20"),
        50,
        4,
    ),
    new PerishableProduct(
        "Яблучний сік",
        "Напої",
        "Садочок",
        new Date("2026-08-19"),
        30,
        5,
    ),
    new PerishableProduct(
        "Сир кисломолочний",
        "Молочка",
        "Ферма",
        new Date("2026-08-10"),
        50,
        7,
    ),
];

const productsGroup = document.querySelector(".products");
const allProductsBtn = productsGroup.querySelector(".all-products-btn");
const discountedProductsBtn = productsGroup.querySelector(
    ".discounted-products-btn",
);
const expiredProductsBtn = productsGroup.querySelector(".expired-products-btn");

storeProducts.forEach((product) => {
    const recommendedDiscount = product.calculateRecommendedDiscount();
    product.applyDiscount(recommendedDiscount);
});

allProductsBtn.addEventListener("click", () => {
    console.log("--------------------------------------------");
    console.log("Усі товари:");
    storeProducts.forEach((product) => console.log(product.getFullInfo()));
});

discountedProductsBtn.addEventListener("click", () => {
    console.log("--------------------------------------------");
    console.log("Уцінені товари:");
    storeProducts
        .filter((product) => product._currentDiscount > 0)
        .forEach((product) => console.log(product.getFullInfo()));
});

expiredProductsBtn.addEventListener("click", () => {
    console.log("--------------------------------------------");
    console.log("Товари, які підлягають списанню:");
    storeProducts
        .filter((product) => product.isExpired === true)
        .forEach((product) => console.log(product.getFullInfo()));
});
