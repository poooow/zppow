import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    baseProfile="basic"
    viewBox="0 0 150 150"
    {...props}
  >
    <Path
      fill="#fff"
      d="M76.8 117.6 29 69.8l3.5-3.6 44.3 44.3 44.3-44.3 3.5 3.6z"
    />
  </Svg>
)
export default SvgComponent
