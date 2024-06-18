import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'chit.chat.client',
  appName: 'ChitChat-client',
  webDir: 'dist',
  server: { hostname: "chit-chat-server-ivn.vercel.app" }
};

export default config;
