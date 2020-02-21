import { Injector } from 'injectant';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    beforeEach(() => {
        service = Injector.get(UserService);
    });

    it('smoke', () => {
        expect(service).toBeTruthy();
    });
});
