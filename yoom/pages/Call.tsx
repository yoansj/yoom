import {useNavigation} from '@react-navigation/native';
import {Box, Button, ScrollView, Text, View} from 'native-base';
import {useEffect, useState} from 'react';
import {RtcSurfaceView} from 'react-native-agora';
import {engine} from '../config/engine';
import {useCallStore} from '../stores/callStore';
import {useUserStore} from '../stores/userStore';

import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';

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
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
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

  const [muted, setMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  useEffect(() => {
    console.log(participantsUids);
  }, []);

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

  const handleVideoMute = () => {
    if (videoMuted) {
      engine.muteLocalVideoStream(false);
      setVideoMuted(false);
    } else {
      engine.muteLocalVideoStream(true);
      setVideoMuted(true);
    }
  };

  return (
    <View style={styles.max}>
      <View style={styles.max}>
        <View style={styles.buttonHolder}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> Start Call </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLeave} style={styles.button}>
            <Text style={styles.buttonText}> End Call </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fullView}>
          <RtcSurfaceView style={styles.max} canvas={{uid: 0}} />
        </View>
        <ScrollView
          style={styles.remoteContainer}
          contentContainerStyle={{paddingHorizontal: 2.5}}
          horizontal={true}>
          {participantsUids.map((value, index, array) => {
            return (
              <RtcSurfaceView
                key={`${value}-${index}`}
                style={styles.remote}
                zOrderMediaOverlay={true}
                canvas={{uid: value}}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  // return (
  //   <Box display="flex" height="100%">
  //     <RtcSurfaceView style={{flex: 1}} canvas={{uid: 0}} />
  //     <ScrollView width="100%" height="150px" position="absolute" top={5}>
  //       {participantsUids.map((uid, index) => (
  //         <RtcSurfaceView
  //           key={`${uid}-${index}`}
  //           style={{height: 150}}
  //           canvas={{uid}}
  //           zOrderMediaOverlay
  //         />
  //       ))}
  //     </ScrollView>
  //     <Box
  //       position="absolute"
  //       width="100%"
  //       bottom={0}
  //       bg="primary.500"
  //       display="flex"
  //       justifyContent="space-around"
  //       flexDirection="row">
  //       <Button onPress={handleLeave}>
  //         <Text>Leave</Text>
  //       </Button>
  //       <Button onPress={handleMute}>
  //         <Text>{muted ? 'You are mute' : 'Mute'}</Text>
  //       </Button>
  //       <Button onPress={handleVideoMute}>
  //         <Text>Hide camera</Text>
  //       </Button>
  //     </Box>
  //   </Box>
  // );
}
