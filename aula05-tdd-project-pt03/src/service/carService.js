const BaseRepository = require('../repository/base/baseRepository');
const Tax = require('./../entities/tax');

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars });
        this.taxesBasedOnAge = Tax.taxesBasedOnAge;
        this.currencyFormat = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    getRandomPositionFromArray(data) {
        const listLength = data.length;
        return Math.floor(
            Math.random() * (listLength)
        );
    }

    chooseRandomCar(carCategory) {
       const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
       const carId = carCategory.carIds[randomCarIndex];

       return carId;
    }

    getAvailableCar(carCategory) {
        const randomIdCar = this.chooseRandomCar(carCategory);
        const car = this.carRepository.find(randomIdCar);
        return car;
    }

    calculateFinalPrice(customer, carCategory, numberOfDays) {
        const { age } = customer;
        const { price } = carCategory;

        const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to );

        const finalPrice = ((tax * price) * numberOfDays);
        return this.currencyFormat.format(finalPrice);
    }
}

module.exports = CarService;