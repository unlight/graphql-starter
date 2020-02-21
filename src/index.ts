import '@abraham/reflection';

import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import { OkResolver } from './ok/ok.resolver';
import { UserResolver } from './user/user.resolver';

async function main() {
    // Build TypeGraphQL executable schema
    const schema = await buildSchema({
        container: Container,
        resolvers: [UserResolver, OkResolver],
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
