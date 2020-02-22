import { createParamDecorator, ResolverData, ClassType } from 'type-graphql';
import { plainToClass } from 'class-transformer';

export function Parameter<T extends object>(name: string, type: ClassType<T>): ParameterDecorator {
    return createParamDecorator((data: ResolverData) => {
        const object = data.args[name];
        return plainToClass(type, object);
    });
}
