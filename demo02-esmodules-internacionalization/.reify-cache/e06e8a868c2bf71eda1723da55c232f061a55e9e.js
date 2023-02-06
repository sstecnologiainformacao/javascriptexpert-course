"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('./../src/person.js',{default(v){Person=v}},2);
const { describe, it } = mocha;

const { expect } = chai;


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