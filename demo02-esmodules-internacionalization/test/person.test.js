import mocha from 'mocha';
const { describe, it } = mocha;
import chai from 'chai';
const { expect } = chai;
import Person from './../src/person.js';

describe('Person', () => {

    it('should return a person instance from a string', () => {
        const person = Person.generateInstanceFromString(
            '1 Bike,Car 20000 2020-01-01 2022-01-01'
        );

        const expected = {
            from: '2020-01-01',
            to: '2022-01-01',
            vehicles: ['Bike', 'Car'],
            kmTraveled: '20000',
            id: '1'
        };

        expect(person).to.be.deep.equal(expected);
    });

    it('should format values', () => {
        const person = Person.generateInstanceFromString(
            '1 Bike,Car 20000 2020-01-01 2022-01-01'
        );

        const expected = {
            from: '01 de janeiro de 2020',
            to: '01 de janeiro de 2022',
            vehicles: 'Bike e Car',
            kmTraveled: '20.000 km',
            id: 1
        };

        expect(person.formatted('pt-BR')).to.be.deep.equal(expected);
    })
});