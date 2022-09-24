import Svg, {Path, SvgProps} from 'react-native-svg';

export default function Exit(props: SvgProps) {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24" {...props}>
      <Path
        d="M4 12H15"
        stroke={props.stroke || '#fff'}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"></Path>
      <Path
        d="M8 7L3 12L8 17"
        stroke={props.stroke || '#fff'}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"></Path>
      <Path
        d="M21 3L21 21"
        stroke={props.stroke || '#fff'}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"></Path>
    </Svg>
  );
}
