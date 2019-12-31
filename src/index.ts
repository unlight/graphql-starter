import '@abraham/reflection';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './user/user.resolver';
import { Container } from 'typedi';

async function main() {
    // Build TypeGraphQL executable schema
    const schema = await buildSchema({
        container: Container,
        resolvers: [UserResolver],
        // automatically create `schema.gql` file with schema definition in current folder
        emitSchemaFile: '~schema.gql',
    });
    // Create GraphQL server
    const server = new ApolloServer({
        schema,
        playground: true,
    });
    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

main();
