import {useNavigation} from '@react-navigation/native';
import {Box, Button, Image, Input, Text} from 'native-base';
import {PermissionsAndroid} from 'react-native';
import {useUserStore} from '../stores/userStore';
import {engine} from '../config/engine';
import keys from '../config/appId.json';
import {ClientRoleType} from 'react-native-agora';
import getRandomInt from '../utils/getRandomNumber';
import {useCallStore} from '../stores/callStore';

export default function Home() {
  const navigation = useNavigation();

  const name = useUserStore(state => state.name);
  const setName = useUserStore(state => state.setName);
  const roomId = useUserStore(state => state.roomId);
  const setRoomId = useUserStore(state => state.setRoomId);

  const uid = useCallStore(state => state.uid);
  const setUid = useCallStore(state => state.setUid);

  const handleGoToCallScreen = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        engine.leaveChannel();
        setUid(getRandomInt());
        const rep = engine.joinChannel(keys.tempToken, roomId, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
        if (rep === 0) {
          // @ts-ignore
          navigation.navigate('Call');
        }
      } else {
        console.log('Permission denied');
        console.log('Do toast');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%">
      <Image source={require('../assets/logo.png')} alt="logo" />
      <Text fontSize={16} fontStyle="italic" fontWeight="semibold" mb={5}>
        It's like zoom but with a Y and less features
      </Text>
      <Input
        placeholder="Enter a name that the other users will see"
        value={name}
        onChangeText={t => setName(t)}
        width="80%"
        variant="rounded"
        my={2}
      />
      <Input
        placeholder="Enter a room name"
        value={roomId}
        onChangeText={t => setRoomId(t)}
        width="80%"
        variant="rounded"
        my={2}
      />
      <Button
        my={2}
        disabled={name.length < 3 || roomId.length === 0}
        onPress={handleGoToCallScreen}
        width="50%">
        <Text color="white">Get started</Text>
      </Button>
    </Box>
  );
}
