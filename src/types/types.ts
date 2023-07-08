export interface User {
  id: number;
  name: string;
  username: string;
}

export interface Data {
  id: number;
  name: string;
  lat: string;
  long: string;
  img: string;
}

export interface GoogleUser {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
}

export type SetData = React.Dispatch<React.SetStateAction<Data[]>>;

export type SetUser = (user: User | null) => void;

export type SetModalTab = React.Dispatch<React.SetStateAction<number>>;

export type ModalState = boolean;

export type SetModalState = React.Dispatch<React.SetStateAction<ModalState>>;

export type SetSuccess = React.Dispatch<React.SetStateAction<string>>;

export type SetGoogleUser = React.Dispatch<React.SetStateAction<GoogleUser>>
