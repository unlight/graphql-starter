import { plainToClass } from 'class-transformer';
import { Service, Inject } from 'typedi';
import { User } from './user.object-type';
import { createUser } from './testing';
import { UserInput } from './user.input';
import { UserRepository } from './user.repository';

@Service()
export class UserService {
    constructor(private readonly repository: UserRepository) {}

    async getById(id: string) {
        return this.repository.getById(id);
    }

    async getAll() {
        return this.repository.getAll();
    }

    async createUser(createUser: UserInput) {
        let userRecord = { name: createUser.name };
        const userObject = await this.repository.createUser(userRecord);
        const result = plainToClass(User, userObject);
        return result;
    }

    async getCount() {
        return this.repository.getCount();
    }
}
