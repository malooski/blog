import { useEffect, useState } from "react";

export function useAsyncMemo<T>(getter: () => Promise<T>, deps: any[]): T | undefined {
    const [state, setState] = useState<T | undefined>(undefined);
    useEffect(() => {
        getter().then(v => {
            setState(v);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return state;
}
