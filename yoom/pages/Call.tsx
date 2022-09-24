import {useNavigation} from '@react-navigation/native';
import {Box, Button, Text} from 'native-base';
import {RtcSurfaceView} from 'react-native-agora';
import {engine} from '../config/engine';
import {useUserStore} from '../stores/userStore';

export default function Call() {
  const navigation = useNavigation();
  const name = useUserStore(state => state.name);
  const roomId = useUserStore(state => state.roomId);

  const handleLeave = () => {
    engine.leaveChannel();
    navigation.goBack();
  };

  return (
    <Box display="flex" height="100%">
      <RtcSurfaceView style={{flex: 1}} canvas={{uid: 0}} />
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
        <Button>
          <Text>Mute</Text>
        </Button>
        <Button>
          <Text>Hide camera</Text>
        </Button>
      </Box>
    </Box>
  );
}
