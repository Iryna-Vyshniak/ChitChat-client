import { Dispatch, SetStateAction } from "react";

export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export interface MenuProps {
  isMobile: boolean;
}

// AUTH
export interface UserI {
  _id: string;
  fullName: string;
  username: string;
  avatar: string;
  email: string;
}

export interface AuthContextType {
  authUser: UserI | null;
  setAuthUser: (user: UserI | null) => void;
}

export interface SignupI {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export interface SigninI {
  email: string;
  password: string;
}

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => ValidationErrors<T>;
  onSubmit: (values: T) => void;
}

export interface SignUpFormProps {
  onSubmit: (values: SignupI) => Promise<void>;
}
export interface SignInFormProps {
  onSubmit: (values: SigninI) => Promise<void>;
}

export interface SelectedGenderProps {
  selectedGender: string;
  handleChange: (e: CustomEvent<any>) => Promise<void>;
  errors: ValidationErrors<SignupI>;
  markTouched: (field: keyof SignupI) => void;
  touchedFields: Partial<Record<keyof SignupI, boolean>>;
}

export interface ActionI {
  message: string;
  link: string;
  text: string;
}

export interface WaveProps {
  style?: React.CSSProperties;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
}

export interface UserItemI {
  _id: string;
  fullName: string;
  username: string;
  avatar: string;
  email: string;
  gender: string;
  phone: string;
  birthday: string;
  createdAt: string;
};

export type UserListProps = {
  users: UserItemI[];
  presentingElement: HTMLElement | null;
};

export interface UserCardProps {
  user: UserItemI;
}

export interface UserModalProps {
selectedUser: UserItemI | null;
setSelectedUser: Dispatch<SetStateAction<UserItemI | null>>;
presentingElement: HTMLElement | null;
}
