import { ReactNode } from "react";
import { Slide } from "./Slide";

type PageHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function PageHeading({
  label,
  title,
  description,
  children,
}: PageHeadingProps) {
  return (
    <Slide>
      <div className="md:mb-16 mb-10">
        {label && <div className="section-label mb-4">{label}</div>}
        <h1 className="font-display font-black tracking-tight text-paper sm:text-6xl text-4xl leading-[0.92] mb-6">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-[15px] leading-relaxed text-soft">
            {description}
          </p>
        )}
        {children}
      </div>
    </Slide>
  );
}
