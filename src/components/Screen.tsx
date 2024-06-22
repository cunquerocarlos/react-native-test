import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../theme/colors';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Screen: FC<Props> = ({children}) => {
  return (
    <View style={styles.container}>
      <Header />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default Screen;
