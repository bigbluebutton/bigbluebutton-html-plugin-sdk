import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, pluginLogger } from 'bigbluebutton-html-plugin-sdk';
import { SampleCustomSubscriptionPluginProps } from '../types';
import { UserAggregateGraphqlResultWrapper } from './types';

function SampleCustomSubscriptionPlugin({
  pluginUuid: uuid,
}: SampleCustomSubscriptionPluginProps):
 React.ReactElement {
  BbbPluginSdk.initialize(uuid);
  const pluginApi = BbbPluginSdk.getPluginApi(uuid);

  const { data: currentUser } = pluginApi.useCurrentUser();

  let selfName = '';
  if (currentUser) {
    selfName = currentUser.name;
  }

  const { data: dataResult } = pluginApi.useCustomSubscription<UserAggregateGraphqlResultWrapper>(`
    subscription Users($name: String!) {
      user_aggregate(where: {name: {_eq: $name}}) {
        aggregate {
          count
        }
      }
    }
  `, {
    variables: {
      name: selfName,
    },
  });

  useEffect(() => {
    const selfNameUsersCount = dataResult?.user_aggregate.aggregate.count;

    if (selfNameUsersCount > 1) {
      pluginLogger.info(`There is ${selfNameUsersCount} users with the same name as you`);
    }
  }, [dataResult]);

  return null;
}

export default SampleCustomSubscriptionPlugin;
