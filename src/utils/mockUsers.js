import { faker } from '@faker-js/faker';
import { createHash } from './index.js';
import dotenv from 'dotenv';

dotenv.config();

export const generateMockUsers = async (numUsers) => {
    const users = [];
    const defaultPass = process.env.MOCK_USER_PASSWORD;

    for (let i = 0; i < numUsers; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: await createHash(defaultPass),
            role: Math.random() < 0.5 ? 'user' : 'admin',
            pets: []
        });
    }
    return users;
};
