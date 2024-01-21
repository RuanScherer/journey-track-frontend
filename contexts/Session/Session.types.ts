export interface Session {
  user?: SessionUser
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export interface SessionUser {
  id: string
  name: string
  email: string
}
