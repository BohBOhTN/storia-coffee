export interface User {
  id: string;
  email: string;
  role: 'manager' | 'user';
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}