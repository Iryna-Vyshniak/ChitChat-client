import {
  archiveOutline,
  archiveSharp,
  earthOutline,
  heartOutline,
  heartSharp,
  idCardOutline,
  notificationsOutline,
  paperPlaneOutline,
  paperPlaneSharp,
  personCircleOutline,
  settingsOutline,
} from 'ionicons/icons';

import { AppPage } from '../types';

export const appPages: AppPage[] = [
  {
    title: 'Profile',
    url: '/app/Profile',
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
  },
  {
    title: 'Posts',
    url: '/app/Posts',
    iosIcon: idCardOutline,
    mdIcon: idCardOutline,
  },
  {
    title: 'Chats',
    url: '/app/Chats',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: 'Notifications',
    url: '/app/Notifications',
    iosIcon: notificationsOutline,
    mdIcon: notificationsOutline,
  },
  {
    title: 'Favorites',
    url: '/app/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'Location',
    url: '/app/Location',
    iosIcon: earthOutline,
    mdIcon: earthOutline,
  },
  {
    title: 'Archived',
    url: '/app/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: 'Settings',
    url: '/app/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsOutline,
  },
];

export const appMobilePages: AppPage[] = [
  {
    title: 'Profile',
    url: '/app/Profile',
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline,
  },
  {
    title: 'Location',
    url: '/app/Location',
    iosIcon: earthOutline,
    mdIcon: earthOutline,
  },
  {
    title: 'Archived',
    url: '/app/Archived',
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: 'Settings',
    url: '/app/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsOutline,
  },
];

export const appTabs: AppPage[] = [
  {
    title: 'Posts',
    url: '/app/Posts',
    iosIcon: idCardOutline,
    mdIcon: idCardOutline,
  },
  {
    title: 'Chats',
    url: '/app/Chats',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: 'Notifications',
    url: '/app/Notifications',
    iosIcon: notificationsOutline,
    mdIcon: notificationsOutline,
  },
  {
    title: 'Favorites',
    url: '/app/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
];

export const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
export const tags = [
  'culture',
  'animal',
  'future',
  'nature',
  'fashion',
  'sport',
  'politics',
  'travel',
  'health',
  'food',
  'beauty',
  'events',
  'science',
  'technology',
  'humanitarianAid',
  'mission',
  'peace',
  'life',
  'savingLives',
  'work',
  'psychology',
  'kids',
];

// for signup form
export const signupFields = {
  fullName: {
    label: 'Full Name',
    name: 'fullName',
    placeholder: 'Will Smith',
  },
  username: {
    label: 'Username',
    name: 'username',
    placeholder: 'wills',
  },
  email: {
    label: 'Email',
    name: 'email',
    placeholder: 'will_smith@gmail.com',
  },
  password: {
    label: 'Password',
    name: 'password',
    placeholder: '*******',
  },
  confirmPassword: {
    label: 'Confirm Password',
    name: 'confirmPassword',
    placeholder: '*******',
  },
  gender: {
    label: 'Male' || 'Female' || 'Other',
    name: 'gender',
  },
};

// for login form
export const loginFields = {
  email: {
    label: 'Email',
    name: 'email',
    placeholder: 'will_smith@gmail.com',
  },
  password: {
    label: 'Password',
    name: 'password',
    placeholder: '*******',
  },
};

export const postFields = {
  title: {
    name: 'title',
    placeholder: 'Enter a title...',
    label: 'Title',
  },
  tags: {
    name: 'tags',
    placeholder: 'Select a category',
    label: 'Category',
  },
  text: {
    name: 'text',
    placeholder: 'Enter a description...',
    label: 'Description',
  },
  imageUrl: {
    name: 'imageUrl',
    placeholder: 'Add image...',
    label: 'Image',
  },
};
