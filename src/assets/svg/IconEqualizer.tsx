import React, { SVGProps } from "react";

export const IconEqualizer = ({
  width = "26",
  height = "26",
  ...restProps
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...restProps}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z"
        fill="currentColor"
      />
    </svg>
  );
};
