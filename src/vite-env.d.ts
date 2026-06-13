/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly SSR: boolean;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
