export interface UserAggregate {
  aggregate: {
    count: number;
  }
}

export interface UserAggregateGraphqlResultWrapper {
  user_aggregate: UserAggregate;
}
