export const USERS_BASIC_INFO_QUERY = `
subscription Users {
  user {
    userId
    name
    role
  }
}`;
