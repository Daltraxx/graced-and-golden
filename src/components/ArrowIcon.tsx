import { JSX } from "react";

interface ArrowIconProps extends React.SVGProps<SVGSVGElement> {
   className?: string;
}

const ArrowIcon = ({ className, ...rest }: ArrowIconProps): JSX.Element => (
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className={className} {...rest} >
      <path
         fill="#7b5c4b"
         d="M541.9 139.5c4.5-11.8 1.7-25.2-7.2-34.1s-22.3-11.8-34.1-7.2l-416 160A31.8 31.8 0 0 0 64 288.7c.3 13.5 9.1 25.4 21.9 29.6l176.8 58.9L321.6 554c4.3 12.8 16.1 21.6 29.6 21.9s25.7-7.9 30.6-20.5l160-416z"   >
      </path>
   </svg>
);

export default ArrowIcon;