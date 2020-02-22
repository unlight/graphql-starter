import { Field, ID, ObjectType } from 'type-graphql';

/**
 * User type GraphQL object (`GraphQLObjectType` from `graphql-js`)
 */
@ObjectType()
export class User {
    @Field(type => ID)
    id: string;

    @Field(type => String)
    name: string;
}
