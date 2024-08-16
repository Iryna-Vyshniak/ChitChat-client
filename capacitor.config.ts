import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'chit.chat.client',
  appName: 'ChitChat-client',
  webDir: 'dist',
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
    CapacitorHttp: {
      enabled: true,
    },
  },
  server: { hostname: 'chit-chat-server-mbr2.onrender.com' },
};

export default config;
