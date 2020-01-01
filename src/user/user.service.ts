import { plainToClass } from 'class-transformer';
import { Service, Inject } from 'typedi';
import { User } from './user.object-type';
import { createUser } from './testing';
import { CreateUserRequestObject } from './create-user.request-object';
import { UserInput } from './user.input';

@Service()
export class UserService {
    private users: User[] = [createUser()];

    async getById(id: string) {
        return this.users.find(user => user.id === id);
    }

    async getAll() {
        return this.users;
    }

    async createUser(createUser: UserInput) {
        const user: User = {
            id: String(this.users.length),
            name: createUser.name,
        };
        this.users.push(user);
        return user;
    }

    async getCount() {
        return this.users.length;
    }
}
