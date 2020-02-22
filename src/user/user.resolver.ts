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
import { User } from './user';
import { UserService } from './user.service';
import { ValidateArgs } from './validate-args.decorator';
import { Parameter } from '../components/parameter.decorator';

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
    @ValidateArgs('user', UserInput)
    async addUser(@Arg('user', { validate: false }) userInput: UserInput): Promise<User> {
        console.log('userInput', userInput);
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
