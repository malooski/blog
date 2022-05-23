export function mapValue<T, U>(
    value: T | null | undefined,
    func: (v: T) => U
): U | null | undefined {
    if (value == null) {
        return value as null | undefined;
    }

    return func(value);
}

export function filterIdx<T>(items: T[], idx: number) {
    return [...items.slice(0, idx), ...items.slice(idx + 1)];
}

export function asyncIiFe<T>(func: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        func().then(resolve).catch(reject);
    });
}

export function delayMs(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
