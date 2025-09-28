import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { zodiacSigns } from '../utils/constants';

const ZodiacPicker = ({ selectedSign, onSelectSign, visible, onClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.pickerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Your Zodiac Sign</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {zodiacSigns.map((sign) => (
            <TouchableOpacity
              key={sign.value}
              style={[
                styles.signItem,
                selectedSign === sign.value && styles.selectedSign
              ]}
              onPress={() => {
                onSelectSign(sign.value);
                onClose();
              }}
            >
              <Text style={styles.emoji}>{sign.emoji}</Text>
              <View style={styles.signInfo}>
                <Text style={[
                  styles.signName,
                  selectedSign === sign.value && styles.selectedText
                ]}>
                  {sign.label}
                </Text>
                <Text style={[
                  styles.dateRange,
                  selectedSign === sign.value && styles.selectedText
                ]}>
                  {sign.dateRange}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    maxHeight: '70%',
    width: '85%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4C1D95',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    maxHeight: 400,
  },
  signItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  selectedSign: {
    backgroundColor: '#EDE9FE',
  },
  emoji: {
    fontSize: 24,
    marginRight: 16,
  },
  signInfo: {
    flex: 1,
  },
  signName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  dateRange: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  selectedText: {
    color: '#4C1D95',
  },
});

export default ZodiacPicker;