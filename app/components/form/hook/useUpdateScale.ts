'use client'
import { RefObject, useEffect, useState } from "react";

export const useUpdateScale = (containerRef: RefObject<HTMLDivElement | null>) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                const a4WidthPx = 794; // 210mm @ 96dpi approx
                // Add some padding/margin safety to fit nicely
                const newScale = Math.min(1, (containerWidth - 48) / a4WidthPx);
                setScale(newScale > 0 ? newScale : 1);
            }
        };

        updateScale();
        // Use ResizeObserver for more robust resizing detection
        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        window.addEventListener("resize", updateScale);

        return () => {
            window.removeEventListener("resize", updateScale);
            observer.disconnect();
        };
    }, [containerRef]);

    return scale;
};