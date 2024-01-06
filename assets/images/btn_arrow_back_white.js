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
    <Path fill="#fff" d="m42 75 61.5-61.5 4.5 4.6L51.1 75l56.9 56.9-4.5 4.6z" />
  </Svg>
)
export default SvgComponent
