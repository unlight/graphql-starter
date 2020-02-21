import { MiddlewareFn } from 'type-graphql';
import { ValidationError } from 'apollo-server';

export const userInputValidate: MiddlewareFn<any> = async (action, next) => {
    const user = action.args.user;
    if (user.name === 'foo') {
        throw new ValidationError('foo name is not allowed');
    }
    return next();
};
