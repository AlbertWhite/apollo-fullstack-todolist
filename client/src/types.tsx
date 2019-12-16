export interface InterfaceUser {
  name: string
  id: string
  todos: Array<InterfaceTodo>
}

export interface InterfaceTodo {
  content: string
  id: string
  finished: boolean
}

export interface InterfaceAddUserVars {
  name: String
}

export interface InterfaceAddUserResponse{
  users: [InterfaceUser]
  success: Boolean
}