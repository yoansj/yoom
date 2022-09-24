import {createAgoraRtcEngine} from 'react-native-agora';
import keys from './appId.json';

export const engine = createAgoraRtcEngine();

(async () => {
  const init = engine.initialize({appId: keys.appId});
  engine.enableVideo();
  engine.startPreview();
  // engine.registerEventHandler({

  // })
  switch (init) {
    case 0:
      console.log('Agora engine initialized');
      break;
    case -1:
      console.log('Invalid App ID');
      break;
    case -2:
      console.log('Invalid Channel Name');
      break;
    case -7:
      console.log('Invalid Token');
      break;
    case -22:
      console.log('Invalid Channel Name');
      break;
    default:
      console.log('Unknown Error');
      break;
  }
})();
