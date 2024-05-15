import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';

import aws_exports from './aws-exports';
import { ListZellerCustomers} from './queries';

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: aws_exports.aws_appsync_graphqlEndpoint,
      region: aws_exports.aws_appsync_region,
      defaultAuthMode: 'apiKey' as any,
      apiKey: aws_exports.aws_appsync_apiKey
    }
  }
});

const client = generateClient();

export const getZellerCustomers = async () => {
    const result:any = await client.graphql({ query: ListZellerCustomers });
    return result.data.listZellerCustomers.items
};

