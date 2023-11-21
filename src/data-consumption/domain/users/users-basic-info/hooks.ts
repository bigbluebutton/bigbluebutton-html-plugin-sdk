import { useCustomSubscription } from '../../shared';
import { USERS_BASIC_INFO_QUERY } from './queries';
import { UsersBasicInfoResponseFromGraphqlWrapper } from './types';

export const useUsersBasicInfo = () => useCustomSubscription<
  UsersBasicInfoResponseFromGraphqlWrapper>(
    USERS_BASIC_INFO_QUERY,
  );
