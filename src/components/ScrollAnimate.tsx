"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "scale" | "default";

interface ScrollAnimateProps {
    children: React.ReactNode;
    animation?: AnimationType;
    delay?: number;
    className?: string;
    threshold?: number;
}

const animationClasses: Record<AnimationType, string> = {
    "fade-up": "animate-fade-up",
    "fade-left": "animate-fade-left",
    "fade-right": "animate-fade-right",
    "scale": "animate-scale",
    "default": "animate-on-scroll",
};

export default function ScrollAnimate({
    children,
    animation = "default",
    delay = 0,
    className = "",
    threshold = 0.1,
}: ScrollAnimateProps) {
    const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold });

    const delayClass = delay > 0 ? `delay-${delay}` : "";

    return (
        <div
            ref={ref}
            className={cn(
                animationClasses[animation],
                isVisible && "visible",
                delayClass,
                className
            )}
        >
            {children}
        </div>
    );
}
