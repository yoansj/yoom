import Svg, {Path, SvgProps} from 'react-native-svg';

export default function CameraOff(props: SvgProps) {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24" {...props}>
      <Path
        d="M21 21H4C2.89543 21 2 20.1046 2 19V8.6C2 7.49543 2.89543 6.6 4 6.6L6 6.6M9.5 3H14.5L17 6.6L20 6.6C21.1046 6.6 22 7.49543 22 8.6V16"
        stroke={props.stroke || '#fff'}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"></Path>
      <Path
        d="M9.66498 9.75195C8.65655 10.4782 8 11.6624 8 13C8 15.2092 9.79086 17 12 17C13.2632 17 14.3896 16.4145 15.1227 15.5"
        stroke={props.stroke || '#fff'}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"></Path>
      <Path
        d="M2 2L22 22"
        stroke={props.stroke || '#fff'}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"></Path>
    </Svg>
  );
}
