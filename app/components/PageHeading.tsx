import { ReactNode } from "react";
import { Slide } from "./Slide";

type PageHeadingProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function PageHeading({
  title,
  description,
  children,
}: PageHeadingProps) {
  return (
    <Slide>
      <div className="md:mb-16 mb-10">
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
