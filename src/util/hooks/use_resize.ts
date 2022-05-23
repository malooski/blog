import { useEffect, useRef, useState } from "react";

export default function useResize() {
    const [ref, setRef] = useState<HTMLElement | null>(null);
    const resizeRef = useRef<ResizeObserver | null>(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        console.log(`Updated size: (${width}, ${height})`);
    }, [width, height]);

    useEffect(() => {
        resizeRef.current = new ResizeObserver(entries => {
            const entry = entries.pop();
            if (!entry) return;

            setWidth(entry.contentRect.width);
            setHeight(entry.contentRect.height);
        });

        return () => {
            if (resizeRef.current) {
                resizeRef.current.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (!ref) return;
        if (!resizeRef.current) return;

        resizeRef.current.observe(ref);
        setWidth(ref.clientWidth);
        setHeight(ref.clientHeight);

        return () => {
            if (!resizeRef.current) return;
            resizeRef.current.unobserve(ref);
        };
    }, [ref]);

    return [{ width, height }, setRef] as const;
}
