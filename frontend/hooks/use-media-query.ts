import {useEffect, useState} from "react";


const tailwindBreakpoints = {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
};

export function useMediaQuery(breakpoint: keyof typeof tailwindBreakpoints) {
    const query = tailwindBreakpoints[breakpoint];
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}