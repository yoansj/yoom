import {useNavigation} from '@react-navigation/native';
import {Box, Button, Text} from 'native-base';
import {useState} from 'react';
import {RtcSurfaceView} from 'react-native-agora';
import {engine} from '../config/engine';
import {useCallStore} from '../stores/callStore';
import {useUserStore} from '../stores/userStore';

export default function Call() {
  const navigation = useNavigation();
  const uid = useCallStore(state => state.uid);
  const participantsUids = useCallStore(state => state.participantsUids);

  const [muted, setMuted] = useState(false);

  const handleLeave = () => {
    engine.leaveChannel();
    navigation.goBack();
  };

  const handleMute = () => {
    if (muted) {
      engine.muteLocalAudioStream(false);
      setMuted(false);
    } else {
      engine.muteLocalAudioStream(true);
      setMuted(true);
    }
  };

  return (
    <Box display="flex" height="100%">
      <RtcSurfaceView style={{flex: 1}} canvas={{uid: 0}} />
      {/* <Box
        display="flex"
        flex={1}
        flexDirection="row"
        flexWrap="wrap"
        width="100%"
        height="100%">
        {participantsUids.map((uid, index) => (
          <RtcSurfaceView
            key={`${uid}-${index}`}
            style={{flex: 1}}
            canvas={{uid}}
            zOrderMediaOverlay
          />
        ))}
      </Box> */}
      <Box
        position="absolute"
        width="100%"
        bottom={0}
        bg="primary.500"
        display="flex"
        justifyContent="space-around"
        flexDirection="row">
        <Button onPress={handleLeave}>
          <Text>Leave</Text>
        </Button>
        <Button onPress={handleMute}>
          <Text>{muted ? 'You are mute' : 'Mute'}</Text>
        </Button>
        <Button>
          <Text>Hide camera</Text>
        </Button>
      </Box>
    </Box>
  );
}
