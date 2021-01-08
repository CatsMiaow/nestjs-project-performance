// https://github.com/microsoft/TypeScript/issues/7426
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
// tslint:disable-next-line: void-return
type Voidable<T> = T | void;
