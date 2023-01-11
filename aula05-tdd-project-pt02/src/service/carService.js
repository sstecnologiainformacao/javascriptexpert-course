const BaseRepository = require('./../repository/base/baseRepository');

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars });
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
}

module.exports = CarService;