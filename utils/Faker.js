// test/utils/dataGenerator.js
const faker = require('faker');

class DataGenerator {
    randomEmail() {
        return faker.internet.email();
    }

    randomName() {
        return faker.name.findName();
    }

    randomPassword(length = 10) {
        return faker.internet.password(length);
    }
}

module.exports = new DataGenerator();
