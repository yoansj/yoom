import Svg, {Path, SvgProps} from 'react-native-svg';

export default function MicrophoneOff(props: SvgProps) {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24" {...props}>
      <Path
        d="M14 12.1597C13.4692 12.6823 12.7684 13 12 13C10.3431 13 9 11.5225 9 9.7V7M15 8.5V5.3C15 3.47746 13.6569 2 12 2C10.9468 2 10.0204 2.59694 9.48516 3.5M12 17C8.13401 17 5 13.866 5 10M12 17C13.9073 17 15.6364 16.2372 16.899 15M12 17V21M19 10C19 10.7752 18.874 11.5209 18.6414 12.2179M15 22H9M4 2L22 20"
        stroke={props.stroke || '#fff'}
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"></Path>
    </Svg>
  );
}
