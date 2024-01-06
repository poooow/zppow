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
    <Path d="M119.3 115.3 75 71l-44.3 44.3-3.5-3.5L75 64l47.8 47.8z" />
  </Svg>
)
export default SvgComponent
