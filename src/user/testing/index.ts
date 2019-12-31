import { User } from '../user.object-type';

export function createUser(parts: Partial<User> = {}): User {
    return {
        id: '1',
        name: 'Joe',
        ...parts,
    };
}
