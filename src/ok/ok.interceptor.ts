import { MiddlewareFn } from 'type-graphql';

export const okInterceptor: MiddlewareFn = async (action, next) => {
    const result = await next();
    return result;
};
