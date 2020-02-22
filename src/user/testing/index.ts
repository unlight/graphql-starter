import { User } from '../user';

export function createUser(parts: Partial<User> = {}): User {
    return {
        id: '1',
        name: 'Joe',
        ...parts,
    };
}
