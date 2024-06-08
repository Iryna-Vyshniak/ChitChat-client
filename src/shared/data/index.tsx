import { archiveOutline, archiveSharp, earthOutline, heartOutline, heartSharp, idCardOutline, notificationsOutline, paperPlaneOutline, paperPlaneSharp, personCircleOutline, settingsOutline } from "ionicons/icons";

import { AppPage } from "../types";

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
      mdIcon:  notificationsOutline,
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
      mdIcon:  notificationsOutline,
    },
    {
      title: 'Favorites',
      url: '/app/Favorites',
      iosIcon: heartOutline,
      mdIcon: heartSharp,
    },
  ];

  export const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];