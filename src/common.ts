export interface Consumer<T> {
    (value: T): void,
}

export interface Value<T> {
    value: T,
    onChange: Consumer<T>,
}