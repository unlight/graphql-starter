import { Service } from 'injectant';

@Service()
export class UserRepository {
    private readonly users: any[] = [
        {
            id: 1,
            name: 'Dummy',
        },
    ];

    async getById(id: string) {
        return this.users.find(user => user.id === id);
    }

    async getAll() {
        return this.users;
    }

    async createUser(createUser: any) {
        const user = { id: this.users.length + 1, name: createUser.name };
        this.users.push(user);
        return user;
    }

    async getCount() {
        return this.users.length;
    }
}
