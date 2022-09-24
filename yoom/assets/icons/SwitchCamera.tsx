import Svg, {Path, SvgProps} from 'react-native-svg';

export default function SwitchCamera(props: SvgProps) {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24" {...props}>
      <Path
        d="M9.5 16L4.33008 5.66015L4.30767 5.60992M14.5 8L19.6822 18.3644M12.5 2L7.5 12M16.5 12L11.5 22M21.1679 8H9.5M14.5 16H2.83209M4.30767 5.60992C2.86663 7.34271 2 9.57015 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C8.907 2 6.14198 3.40422 4.30767 5.60992Z"
        stroke={props.stroke || '#fff'}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"></Path>
    </Svg>
  );
}
