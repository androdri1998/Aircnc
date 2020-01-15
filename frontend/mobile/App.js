import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {YellowBox} from 'react-native';
import Routes from './src/routes';
// import Routes from '·/src/routes.js';

YellowBox.ignoreWarnings([
  `Unrecognized WebSocket`
]);

export default function App() {
  return (
    <Routes />
  );
}
