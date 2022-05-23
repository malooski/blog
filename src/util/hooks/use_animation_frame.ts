import { useEffect, useRef } from "react";

export function useAnimationFrame(callback: (deltaMs: number) => boolean, deps: any[]) {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>(performance.now());

    function animate(time: number) {
        const deltaTime = time - previousTimeRef.current;

        if (callback(deltaTime)) {
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        } else {
            // Don't request next frame if callback returned false
            return;
        }
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            const requestRefCurr = requestRef.current;
            if (requestRefCurr) {
                cancelAnimationFrame(requestRefCurr);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deps]); // Make sure the effect runs only once
}
