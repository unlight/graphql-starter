import DataLoader from 'dataloader';
import { Service } from 'injectant';
import {
    Arg,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware,
} from 'type-graphql';

import { UserInput } from './user.input';
import { User } from './user.object-type';
import { UserService } from './user.service';
import { userInputValidate } from './user-input.validate';

@Service()
@Resolver(() => User)
export class UserResolver {
    private readonly countCommentsDataLoader = new DataLoader(async (ids: string[]) => {
        return ids.map(x => (~~x) ** 2);
    });

    constructor(private readonly userService: UserService) {}

    @Query(() => User, { nullable: true })
    async user(@Arg('id') id: string): Promise<User | undefined> {
        return this.userService.getById(id);
    }

    @Query(() => [User], { description: 'Get all users' })
    async users(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Mutation(() => User)
    @UseMiddleware(userInputValidate)
    async addUser(@Arg('user') userInput: UserInput): Promise<User> {
        return this.userService.createUser(userInput);
    }

    @FieldResolver(() => Int)
    async nameLength(@Root() user: User) {
        return user.name.length;
    }

    @FieldResolver(() => Int)
    async countComments(@Root() user: User) {
        const { id } = user;
        return this.countCommentsDataLoader.load(id);
    }
}
