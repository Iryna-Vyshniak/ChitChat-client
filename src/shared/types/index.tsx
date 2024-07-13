import { Dispatch, SetStateAction } from 'react';

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
  gender: string;
  phone: string;
  birthday: string;
  createdAt: string;
  bio?: string;
  followers?: string;
  following?: string;
  posts?: string;
}

export interface AuthContextType {
  authUser: UserI | null;
  setAuthUser: React.Dispatch<React.SetStateAction<UserI | null>>;
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
}

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
export interface UserFabProps {
  user: UserItemI | null;
}

export interface OwnerI {
  avatar: string;
  fullName: string;
  _id: string;
}

export interface PostI {
  title: string;
  text: string;
  tags: string[];
  imageUrl: string | null;
}

export interface PostCardI {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  imageUrl: string | null;
  owner: OwnerI;
  viewsCount: number;
  likedBy: string[];
  createdAt: string;
}

export interface PostFormProps {
  onSubmit: (values: PostI) => Promise<void>;
}

export interface PostImageUploaderProps {
  imageUrl: string | null;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: Partial<Record<keyof PostI, boolean>>;
  markTouched: (field: keyof PostI) => void;
  touchedFields: Partial<Record<keyof PostI, boolean>>;
  errors: Partial<Record<keyof PostI, string>>;
}

export interface PostModalProps {
  dismiss: (data?: string | null | undefined | number, role?: string) => void;
}
