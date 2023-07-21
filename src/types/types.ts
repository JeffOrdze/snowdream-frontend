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

export interface UserFavorites { 
  id: number;
  name: string;
  lat: string;
  long: string;
  img: string;
  mountain_id: number;
  users_id: number
}

export interface Confidence { 
  rating : { 
    value: string;
    display: string;
  }
}

export interface DangerRatings {
  date: {
    display: string;
    value: string;
  };
  ratings: {
    alp: {
      display: string;
      rating: {
        display: string;
        value: string;
      };
    };
    btl: {
      display: string;
      rating: {
        display: string;
        value: string;
      };
    }
      tln: {
        display: string;
        rating: {
          display: string;
          value: string;
        };
      };
    };
  };

export interface Weather { 
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData { 
  clouds: { 
    all: number
  }
  dt: number;
  dt_text: string;
  main: { 
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  }
  pop: number;
  sys: { 
    pod: string;
  }
  visibility: number;
  weather: Weather[]
  wind: { 
    speed: number;
    deg: number; 
    gust: number;
  }
}

export interface GoogleUser {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
}

export type SubmitEvent = React.FormEvent<HTMLFormElement>;
export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export type SetData = React.Dispatch<React.SetStateAction<Data[]>>;
export type SetDataObject = React.Dispatch<React.SetStateAction<Data>>;
export type SetUser = (user: User | null) => void;

export type ModalState = boolean;
export type SetModalTab = React.Dispatch<React.SetStateAction<number>>;
export type SetModalState = React.Dispatch<React.SetStateAction<ModalState>>;

export type SetString = React.Dispatch<React.SetStateAction<string>>;

export type SetGoogleUser = React.Dispatch<React.SetStateAction<GoogleUser>>;
