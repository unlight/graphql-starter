import '@abraham/reflection';

import { ApolloServer } from 'apollo-server';
import { Injector } from 'injectant';
import { buildSchema } from 'type-graphql';

import { OkResolver } from './ok/ok.resolver';
import { UserResolver } from './user/user.resolver';

async function main() {
    // Build TypeGraphQL executable schema
    const schema = await buildSchema({
        container: Injector,
        resolvers: [UserResolver, OkResolver],
        validate: true,
        // automatically create `schema.gql` file with schema definition in current folder
        emitSchemaFile: '~schema.gql',
    });
    // Create GraphQL server
    const server = new ApolloServer({
        schema,
        playground: true,
        tracing: true,
    });
    // Start the server
    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

main();
