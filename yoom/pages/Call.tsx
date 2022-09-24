import {useNavigation} from '@react-navigation/native';
import {Box, Button, ScrollView, Text, View} from 'native-base';
import {useEffect, useState} from 'react';
import {RtcSurfaceView} from 'react-native-agora';
import {engine} from '../config/engine';
import {useCallStore} from '../stores/callStore';
import {useUserStore} from '../stores/userStore';

import {Dimensions, StyleSheet} from 'react-native';
import SelfPreview from '../components/SelfPreview';
import {Image} from 'react-native-svg';
import Microphone from '../assets/icons/Microphone';
import MicrophoneOff from '../assets/icons/MicrophoneOff';
import Exit from '../assets/icons/Exit';
import {theme} from '../config/theme';
import Camera from '../assets/icons/Camera';
import CameraOff from '../assets/icons/CameraOff';
import SwitchCamera from '../assets/icons/SwitchCamera';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const styles = StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    display: 'flex',
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
    flex: 1,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});

export default function Call() {
  const navigation = useNavigation();
  const uid = useCallStore(state => state.uid);
  const participantsUids = useCallStore(state => state.participantsUids);
  const resetUids = useCallStore(state => state.resetUids);

  const [muted, setMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  useEffect(() => {
    console.log(participantsUids);
  }, []);

  const handleLeave = () => {
    engine.leaveChannel();
    navigation.navigate('Home');
    resetUids();
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

  const handleVideoMute = () => {
    if (videoMuted) {
      engine.muteLocalVideoStream(false);
      setVideoMuted(false);
    } else {
      engine.muteLocalVideoStream(true);
      setVideoMuted(true);
    }
  };

  const moreThan4Participants = participantsUids.length >= 4;

  return (
    <View flex={1}>
      <Text position="absolute" zIndex={50} color="primary.500">
        My uid: ({uid}) Participants UID: ({participantsUids.toString()})
      </Text>
      <View style={styles.max}>
        {moreThan4Participants === false && (
          <SelfPreview participantsNumber={participantsUids.length} />
        )}
        <ScrollView
          width="100%"
          height="100%"
          position="absolute"
          top={0}
          display="flex"
          flexDirection="column"
          contentContainerStyle={{paddingHorizontal: 2.5}}
          horizontal={false}>
          {participantsUids.map((value, index, array) => {
            return (
              <RtcSurfaceView
                key={`${value}-${index}`}
                style={{
                  width:
                    participantsUids.length === 1
                      ? dimensions.width
                      : moreThan4Participants
                      ? dimensions.width / 2
                      : dimensions.width,
                  height:
                    participantsUids.length === 1
                      ? dimensions.height
                      : dimensions.height / 2.2,
                  marginHorizontal: 2.5,
                  flex: 1,
                }}
                canvas={{uid: value}}
              />
            );
          })}
          {moreThan4Participants && (
            <RtcSurfaceView
              key={`${uid}-${4}`}
              style={{
                width: dimensions.width / 2,
                height: dimensions.height / 2.2,
                marginHorizontal: 2.5,
                flex: 1,
              }}
              canvas={{uid: 0}}
            />
          )}
        </ScrollView>
      </View>
      <Box
        position="absolute"
        width="100%"
        bottom={0}
        backgroundColor="transparent"
        display="flex"
        justifyContent="space-around"
        flexDirection="row">
        <Button variant="ghost" onPress={handleLeave}>
          <Exit stroke={theme.colors.primary[500]} />
        </Button>
        <Button variant="ghost" onPress={handleMute} borderRadius={100}>
          {muted ? (
            <MicrophoneOff stroke={theme.colors.primary[500]} />
          ) : (
            <Microphone stroke={theme.colors.primary[500]} />
          )}
        </Button>
        <Button variant="ghost" onPress={handleVideoMute}>
          {videoMuted ? (
            <Camera stroke={theme.colors.primary[500]} />
          ) : (
            <CameraOff stroke={theme.colors.primary[500]} />
          )}
        </Button>
        <Button variant="ghost" onPress={() => engine.switchCamera()}>
          <SwitchCamera stroke={theme.colors.primary[500]} />
        </Button>
      </Box>
    </View>
  );
}
