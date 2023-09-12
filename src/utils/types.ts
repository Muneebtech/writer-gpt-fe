import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  isProtected?: boolean;
  fallbackUI?: ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export type ChangePasswordTypes = {
  oldPassword: string
  newPassword: string;
  renterPassword?: string
  email?: string
}
export type ProfileuserName = {
  id?: string | undefined;
  name?: string;
};
export type AuthTypes = {
  active?
  :
  string
  createdAt?
  :
  string
  email?
  :
  string
  firstName?
  :
  string
  id?
  :
  string
  lastName?
  :
  string
  password?
  :
  string
  photoPath?
  :
  null
  role?
  :
  string
  updatedAt?
  :
  string
  __v?
  :
  number
}