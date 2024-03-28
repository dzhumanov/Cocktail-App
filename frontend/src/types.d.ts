export interface User {
  _id: string;
  email: string;
  role: string;
  token: string;
  displayName: string;
  avatar: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Cocktail {
  _id: string;
  user: string;
  name: string;
  image: string;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[]
}

