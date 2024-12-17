import { Router } from 'express';
import { generateMockPets } from '../utils/mockPets.js';
import { generateMockUsers } from '../utils/mockUsers.js';
import { usersService, petsService } from '../services/index.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
    const numPets = parseInt(req.query.num) || 100;
    const mockPets = generateMockPets(numPets);
    res.send({ status: 'success', payload: mockPets });
});

router.get('/mockingusers', async (req, res) => {
    const numUsers = parseInt(req.query.num) || 50;
    const mockUsers = await generateMockUsers(numUsers);
    res.send({ status: 'success', payload: mockUsers });
});

router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;
    
    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    await Promise.all([
        ...mockUsers.map(user => usersService.create(user)),
        ...mockPets.map(pet => petsService.create(pet))
    ]);

    res.send({ status: 'success', message: `${users} users and ${pets} pets inserted into the database` });
});

export default router;