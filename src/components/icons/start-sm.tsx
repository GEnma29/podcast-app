import type { SVGProps } from "react"

interface StartSmProps extends SVGProps<SVGSVGElement> {
  isActive?: boolean
}

const StartSm = ({ isActive, ...props }: StartSmProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <path
        fill={isActive ? "#FFFFFF" : "#0F0F2D"}
        fillRule="evenodd"
        d="m9.443 17.478-4.328 2.378c-.584.321-1.307.086-1.615-.524a1.3 1.3 0 0 1-.12-.793l.827-5.037a1.285 1.285 0 0 0-.344-1.106L.36 8.83A1.29 1.29 0 0 1 .34 7.062c.183-.197.424-.325.684-.364l4.839-.735c.39-.06.726-.315.9-.684L8.927.697C9.22.078 9.937-.176 10.53.129c.236.122.427.321.543.568l2.164 4.582c.175.369.511.625.9.684l4.84.735c.654.099 1.106.733 1.011 1.416a1.27 1.27 0 0 1-.348.715l-3.502 3.567c-.282.287-.41.7-.344 1.106l.827 5.037c.111.68-.326 1.326-.977 1.443-.259.046-.526.002-.758-.126l-4.329-2.378a1.15 1.15 0 0 0-1.113 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default StartSm