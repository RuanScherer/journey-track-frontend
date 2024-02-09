export type SearchUsersResponseDTO = UserSearchResult[];

export interface UserSearchResult {
  id: string;
  email: string;
  name: string;
}