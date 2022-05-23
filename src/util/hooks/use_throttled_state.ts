import { throttle } from "lodash";
import { useCallback, useState } from "react";

export default function useThrottledState<T>(initialValue: T, ms: number) {
    const [state, setState] = useState<T>(initialValue);
    const throttledSetState = useCallback(() => throttle(setState, ms), [ms]);

    return [state, throttledSetState] as const;
}
