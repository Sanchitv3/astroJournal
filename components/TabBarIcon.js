import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TabBarIcon = ({ name, focused }) => {
  const getIcon = () => {
    switch (name) {
      case 'home':
        return '⭐';
      case 'journal':
        return '📝';
      case 'all-journals':
        return '📖';
      default:
        return '📱';
    }
  };

  const getLabel = () => {
    switch (name) {
      case 'home':
        return 'Home';
      case 'journal':
        return 'Write';
      case 'all-journals':
        return 'Journals';
      default:
        return 'Tab';
    }
  };

  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {getIcon()}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
        {getLabel()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    width: '100',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  tabIcon: {
    // fontSize: 24,
    // marginBottom: 4,
  },
  tabIconFocused: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabLabelFocused: {
    color: '#4C1D95',
    fontWeight: '600',
  },
});

export default TabBarIcon;
