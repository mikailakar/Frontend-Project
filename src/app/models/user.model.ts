export interface VMUsers2 {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface VMUsers {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  inserDate: Date;
}

export interface AuthenticateRequest {
  email: string;
  password: string;
}

export interface AuthenticateResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  token: string;
  expiration: Date;
}

export interface UserWithRoleDto {
  id: number;
  name: string;
  username: string;
  email: string;
  roleName: string;
}
