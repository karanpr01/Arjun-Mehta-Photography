import type { ComponentProps } from "react";


// Keeps content a comfortable width, with margins that grow on bigger screens.
export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-360 px-6 md:px-10 lg:px-16 ${className}`}
      {...props}
    />
  );
}