import type { SVGProps } from "react";

interface StarIconProps extends SVGProps<SVGSVGElement> {
  isSelected?: boolean;
}

const StarIcon = ({ isSelected = false, ...props }: StarIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill={isSelected ? "#FFD700" : "#000"} // Yellow if selected, black otherwise
      {...props}
    >
      <path
        fill={isSelected ? "#FFD700" : "#fff"} // Yellow if selected, white otherwise
        fillRule="evenodd"
        d="m14.165 26.218-6.492 3.566c-.877.482-1.962.13-2.423-.787a1.949 1.949 0 0 1-.18-1.189l1.24-7.555a1.928 1.928 0 0 0-.516-1.659l-5.252-5.35a1.935 1.935 0 0 1-.033-2.65 1.768 1.768 0 0 1 1.027-.547l7.258-1.103a1.802 1.802 0 0 0 1.351-1.025l3.246-6.874c.439-.928 1.514-1.31 2.403-.851.354.182.64.482.814.851l3.247 6.874c.26.553.766.937 1.35 1.025l7.259 1.102c.98.15 1.66 1.1 1.517 2.125-.057.408-.24.785-.523 1.073l-5.252 5.35a1.928 1.928 0 0 0-.516 1.66l1.24 7.554c.167 1.02-.489 1.99-1.465 2.165-.389.07-.789.003-1.138-.189l-6.492-3.566a1.726 1.726 0 0 0-1.67 0Zm-1.444-2.63a4.725 4.725 0 0 1 4.558 0l4.306 2.366-.856-5.215a4.927 4.927 0 0 1 1.336-4.246l3.745-3.815-5.055-.768a4.801 4.801 0 0 1-3.613-2.71L15 4.664 12.858 9.2a4.8 4.8 0 0 1-3.613 2.71l-5.055.768 3.745 3.815a4.927 4.927 0 0 1 1.335 4.246l-.855 5.215 4.306-2.366Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default StarIcon;