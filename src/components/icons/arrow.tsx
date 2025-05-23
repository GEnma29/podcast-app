
import type { SVGProps } from "react"
const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#AAA"
      fillRule="evenodd"
      d="M1.227 19.91c.278 0 .556-.108.767-.324l8.688-8.849a1.12 1.12 0 0 0 0-1.564L1.993.324a1.07 1.07 0 0 0-1.535 0 1.12 1.12 0 0 0 0 1.564l7.92 8.067-7.92 8.067a1.12 1.12 0 0 0 0 1.564c.212.216.49.324.768.324Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ArrowIcon
