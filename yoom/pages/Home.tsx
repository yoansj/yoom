import {useNavigation} from '@react-navigation/native';
import {Box, Button, Image, Input, Text, useToast} from 'native-base';
import {PermissionsAndroid} from 'react-native';
import {useUserStore} from '../stores/userStore';
import {engine} from '../config/engine';
import keys from '../config/appId.json';
import {ClientRoleType, RtcConnection} from 'react-native-agora';
import getRandomInt from '../utils/getRandomNumber';
import {useCallStore} from '../stores/callStore';
import {useCallback, useEffect} from 'react';

export default function Home() {
  const navigation = useNavigation();

  const name = useUserStore(state => state.name);
  const setName = useUserStore(state => state.setName);
  const roomId = useUserStore(state => state.roomId);
  const setRoomId = useUserStore(state => state.setRoomId);

  const uid = useCallStore(state => state.uid);
  const participantsUids = useCallStore(state => state.participantsUids);
  const pushUid = useCallStore(state => state.pushUid);
  const removeUid = useCallStore(state => state.removeUid);
  const resetUids = useCallStore(state => state.resetUids);

  const toast = useToast();

  const getPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const onUserJoined = useCallback(
    (connection: RtcConnection, remoteUid: number, elapsed: number) => {
      console.log(`[CALLBACK][${uid}] onUserJoined`, remoteUid);
      pushUid(remoteUid);
      toast.show({
        title: 'User joined',
        description: `User with uid ${remoteUid} joined the channel`,
      });
    },
    [pushUid],
  );

  const onUserOffline = useCallback(
    (connection: RtcConnection, remoteUid: number, reason: number) => {
      console.log(`[CALLBACK][${uid}] onUserOffline`, remoteUid);
      removeUid(remoteUid);
      toast.show({
        title: 'User left',
        description: `User with uid ${remoteUid} left the channel`,
      });
    },
    [removeUid],
  );

  useEffect(() => {
    engine.unregisterEventHandler({
      onUserJoined,
      onUserOffline,
    });
    engine.registerEventHandler({
      onUserJoined,
      onUserOffline,
    });
    console.log(`[${uid}]Registered event handlers`);
  }, []);

  const handleGoToCallScreen = useCallback(async () => {
    const p = await getPermissions();

    if (p === true) {
      engine.leaveChannel();
      resetUids();
      const rep = engine.joinChannel(keys.tempToken, roomId, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
      if (rep === 0) {
        engine.registerEventHandler({
          onUserJoined,
          onUserOffline,
        });
        // @ts-ignore
        navigation.navigate('Call');
      } else {
        toast.show({
          title: 'Error',
          description: `Error joining channel: ${rep}`,
        });
      }
    } else {
      toast.show({
        title: 'Permissions denied',
        description: `You need to accept the permissions in order to make this app work`,
      });
    }
  }, [participantsUids]);

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
        <Text color="white">{uid}</Text>
      </Button>
    </Box>
  );
}
