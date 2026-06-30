import { ReactNode } from "react";

type SlideProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Plain passthrough; no entrance animation. Text is always rendered visible
// (scroll-triggered fade-ins can occasionally fail to fire and leave content hidden).
export function Slide({ children, className }: SlideProps) {
  return <div className={className}>{children}</div>;
}
