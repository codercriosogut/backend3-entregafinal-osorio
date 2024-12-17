import { faker } from '@faker-js/faker';

export const generateMockPets = (numPets) => {
    let pets = [];
    
    for (let i = 0; i < numPets; i++) {
        pets.push({
            name: faker.person.firstName(),
            specie: faker.animal.type(),
            birthDate: faker.date.past(5),
            adopted: false,
            owner: null,
            image: faker.image.url()
        });
    }
    
    return pets;
};