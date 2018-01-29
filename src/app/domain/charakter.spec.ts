import {Charakter} from './charakter';

describe('Charakter', () => {
    fit('should create an instance', () => {
        expect(new Charakter()).toBeTruthy();
        expect(true).toBeFalsy();
    });
});
