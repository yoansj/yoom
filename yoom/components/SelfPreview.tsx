import {Dimensions} from 'react-native';
import {RtcSurfaceView} from 'react-native-agora';

type SelfPreviewProps = {
  participantsNumber: number;
};

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default function SelfPreview({participantsNumber}: SelfPreviewProps) {
  return (
    <RtcSurfaceView
      style={{
        width: participantsNumber === 0 ? dimensions.width : 150,
        height: participantsNumber === 0 ? dimensions.height : 200,
        position: 'absolute',
        bottom: 50,
        right: 0,
      }}
      zOrderOnTop={participantsNumber > 0}
      canvas={{uid: 0}}
    />
  );
}
