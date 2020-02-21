import DataLoader from 'dataloader';
import { Service } from 'injectant';
import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql';

import { UserInput } from './user.input';
import { User } from './user.object-type';
import { UserService } from './user.service';

@Service()
@Resolver(() => User)
export class UserResolver {
    private readonly countCommentsDataLoader: any;
    constructor(private readonly userService: UserService) {
        this.countCommentsDataLoader = new DataLoader(async (ids: string[]) => {
            return ids.map(x => (~~x) ** 2);
        });
    }

    @Query(() => User, { nullable: true })
    async user(@Arg('id') id: string): Promise<User | undefined> {
        return this.userService.getById(id);
    }

    @Query(() => [User], { description: 'Get all users' })
    async users(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Mutation(() => User)
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
