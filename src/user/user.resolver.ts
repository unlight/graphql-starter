import { Resolver, ResolverInterface, Query, Arg, Ctx, Mutation } from 'type-graphql';
import { User } from './user.object-type';
import { UserService } from './user.service';
import { Service } from 'typedi';

@Service()
@Resolver(() => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User, { nullable: true })
    async user(@Arg('id') id: string): Promise<User | undefined> {
        return this.userService.getById(id);
    }

    @Query(() => [User], { description: 'Get all users' })
    async users(): Promise<User[]> {
        return this.userService.getAll();
    }

    // @Mutation(() => User)
    // async addUser(@Arg('recipe') recipeInput: RecipeInput): Promise<Recipe> {
    //     const recipe = plainToClass(Recipe, {
    //         description: recipeInput.description,
    //         title: recipeInput.title,
    //         ratings: [],
    //         creationDate: new Date(),
    //     });
    //     await this.items.push(recipe);
    //     return recipe;
    // }

    //   @FieldResolver()
    //   ratingsCount(
    //     @Root() recipe: Recipe,
    //     @Arg("minRate", type => Int, { defaultValue: 0.0 }) minRate: number,
    //   ): number {
    //     return recipe.ratings.filter(rating => rating >= minRate).length;
    //   }
}
