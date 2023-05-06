export type FormLogin = {
  email: string;
  password: string;
};

export type FormRegistration = {
  name: string;
  email: string;
  password: string;
};

export type UserState = {
  id?: string;
  name?: string;
  email: string;
  password?: string;
  token?: string;
  refreshToken: string;
};

export type UserExtension = {
  token: string;
};
