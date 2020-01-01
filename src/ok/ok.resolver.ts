import { Resolver, Query, UseMiddleware } from 'type-graphql';
import { okInterceptor } from './ok.interceptor';

@Resolver(() => Boolean)
export class OkResolver {
    @Query(() => Boolean, { name: 'ok' })
    @UseMiddleware(okInterceptor)
    async value() {
        return true;
    }
}
