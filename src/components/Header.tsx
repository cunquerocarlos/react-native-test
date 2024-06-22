import React from 'react';

import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import {utilFlex, utilSpacing} from '../theme/util';
import Text from './Text';

const Header = () => {
  return (
    <View
      style={[utilSpacing.py4, utilFlex.flexCenterHorizontal, styles.border]}>
      <View style={utilFlex.flexRow}>
        <Icon name="payments" size={30} color={colors.blue[700]} />
        <Text style={[styles.title, utilSpacing.ml3]}>BANCO</Text>
      </View>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.text,
    fontFamily: 'Droid Serif',
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBorder,
  },
});
