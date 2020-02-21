import { plainToClass } from 'class-transformer';
import { Service } from 'typedi';

import { UserInput } from './user.input';
import { User } from './user.object-type';
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
        const userRecord = { name: createUser.name };
        const userObject = await this.repository.createUser(userRecord);
        return plainToClass(User, userObject);
    }

    async getCount() {
        return this.repository.getCount();
    }
}
