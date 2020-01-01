import { InputType, Field } from 'type-graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class UserInput {
    @Field()
    @IsString()
    @MinLength(3)
    name: string;
}
