import { MiddlewareFn } from 'type-graphql';

export const okInterceptor: MiddlewareFn = async (action, next) => {
    return next();
};
