export declare global {
  // https://github.com/microsoft/TypeScript/issues/7426
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;
  type Voidable<T> = T | void;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;

      JWT_SECRET: string;
    }
  }
}
