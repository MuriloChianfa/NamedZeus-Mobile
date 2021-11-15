/**
 * @format
 */

// importa "gesture-handler" para ter controle dos gestos feitos em tela
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
