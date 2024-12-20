import React, { SVGProps } from "react";

export const IconShine = ({
  width = "24",
  height = "24",
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
      <g clip-path="url(#clip0_841_23369)">
        <path
          d="M20.5667 6.55L19 10L17.4667 6.55L14 5L17.4667 3.45L19 0L20.5667 3.45L24 5L20.5667 6.55Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.398 11.0137L9.44013 4.5L6.54515 11.0137L0 13.9401L6.54515 16.8666L9.44013 23.3803L12.398 16.8666L18.8803 13.9401L12.398 11.0137ZM8.06139 12.5266L9.45975 9.38029L10.8885 12.5266L14.0196 13.9401L10.8885 15.3537L9.45975 18.5L8.06139 15.3537L4.89988 13.9401L8.06139 12.5266Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_841_23369">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
