import { plainToClass } from 'class-transformer';
import { Service, Inject } from 'typedi';
import { User } from './user.object-type';
import { createUser } from './testing';

@Service()
export class UserService {
    private users: User[] = [createUser()];

    async getById(id: string) {
        return this.users.find(user => user.id === id);
    }

    async getAll() {
        return this.users;
    }
}
