import { Container } from 'typedi';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        service = Container.get(UserService);
    });

    it('smoke', () => {
        expect(service).toBeTruthy();
    });
});
