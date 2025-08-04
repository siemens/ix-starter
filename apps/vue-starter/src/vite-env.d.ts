/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THEME?: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
