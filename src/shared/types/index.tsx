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

export interface ComponentProps {
  name: string;
  id?: string;
}

// AUTH
export type Gender = 'male' | 'female' | 'other' | '';

export interface UserI {
  _id: string;
  fullName: string;
  username: string;
  avatar: string;
  cover: string;
  email: string;
  gender: string;
  phone: string;
  birthday: string;
  createdAt: string;
  bio?: string;
  posts?: string[];
  likes?: string[];
  comments?: string[];
  followers?: string[];
  followings?: string[];
}

export interface AuthContextType {
  authUser: UserI | null;
  setAuthUser: React.Dispatch<React.SetStateAction<UserI | null>>;
  isAuthLoading: boolean;
}

export interface SignupI {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
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
  selectedGender: Gender;
  handleChange: (e: CustomEvent<Gender>) => Promise<void>;
  errors: ValidationErrors<SignupI>;
  markTouched: (field: keyof SignupI) => void;
  touchedFields: Partial<Record<keyof SignupI, boolean>>;
}

export interface ActionI {
  message: string;
  link: string;
  text: string;
}

export interface UserItemI {
  _id: string;
  fullName: string;
  username: string;
  avatar: string;
  cover: string;
  email: string;
  gender: string;
  phone: string;
  birthday: string;
  bio: string;
  posts?: string[];
  likes?: string[];
  comments?: string[];
  followers?: string[];
  followings?: string[];
  createdAt: string;
}

export type UserListProps = {
  users: UserItemI[];
  variant: 'followers' | 'followings' | 'chat';
  presentingElement?: HTMLElement | null;
  isAuthProfile?: boolean;
  onAction?: (userId: string) => void;
};

export interface UserCardProps {
  user: UserItemI;
  variant: 'followers' | 'followings' | 'chat';
  isAuthProfile?: boolean;
  onAction?: (userId: string) => void;
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

export interface PostCommentsModalProps {
  presentingElement: HTMLElement | null;
  modalAllComments: React.RefObject<HTMLIonModalElement>;
}
