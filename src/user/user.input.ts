import { IsString, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
    @Field()
    @IsString()
    @MinLength(3)
    name: string;
}
