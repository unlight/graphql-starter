import { Service } from 'injectant';

const users: any[] = [
    {
        id: 1,
        name: 'Dummy',
    },
];

@Service()
export class UserRepository {
    async getById(id: string) {
        return users.find(user => user.id === id);
    }

    async getAll() {
        return users;
    }

    async createUser(createUser: any) {
        const user = { id: users.length + 1, name: createUser.name };
        users.push(user);
        return user;
    }

    async getCount() {
        return users.length;
    }
}
