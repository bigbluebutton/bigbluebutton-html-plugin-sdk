import * as React from 'react';
import { useEffect, useState } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';

function SampleCustomSubscriptionPlugin():
 React.ReactElement{
  
  const currentUser = BbbPluginSdk.useCurrentUser();

  let selfName = ""
  if (currentUser) {
    selfName = currentUser.name
  }

  const dataResult = BbbPluginSdk.useCustomSubscription(`
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
    }
  });

  useEffect(() => {
    const selfNameUsersCount = dataResult?.user_aggregate?.aggregate?.count;
    
    if (selfNameUsersCount > 1) {
      alert(`There is ${selfNameUsersCount} users with the same name as you`)
    }
  }, [dataResult]);

  return null;
}

export default SampleCustomSubscriptionPlugin;
