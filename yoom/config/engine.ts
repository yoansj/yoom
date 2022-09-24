import {createAgoraRtcEngine} from 'react-native-agora';
import keys from './appId.json';

export const engine = createAgoraRtcEngine();

engine.initialize({appId: keys.appId});
engine.enableVideo();
engine.startPreview();
