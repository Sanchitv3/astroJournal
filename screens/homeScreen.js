// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useAstro } from '../store/AstroContext';
import { useHoroscope } from '../hooks/useHoroscope';
import ZodiacPicker from '../components/ZodiacPicker';
import HoroscopeCard from '../components/HoroscopeCard';
import { zodiacSigns, formatDate } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const { selectedSign, setSelectedSign } = useAstro();
  const { horoscope, loading, error, refetch } = useHoroscope(selectedSign);
  const [showPicker, setShowPicker] = useState(false);

  const selectedSignData = zodiacSigns.find(sign => sign.value === selectedSign);
  const today = new Date();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            colors={['#4C1D95']}
            tintColor="#4C1D95"
          />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.dateText}>{formatDate(today)}</Text>
          <Text style={styles.welcomeText}>Welcome to your cosmic journey</Text>
        </View>

        {/* Zodiac Sign Selector */}
        <TouchableOpacity
          style={styles.signSelector}
          onPress={() => setShowPicker(true)}
        >
          <View style={styles.signContent}>
            <Text style={styles.signEmoji}>{selectedSignData?.emoji}</Text>
            <View style={styles.signText}>
              <Text style={styles.signName}>{selectedSignData?.label}</Text>
              <Text style={styles.signDate}>{selectedSignData?.dateRange}</Text>
            </View>
          </View>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>

        {/* Horoscope Card */}
        <HoroscopeCard horoscope={horoscope} loading={loading} error={error} />

        {/* Journal Button */}
        <TouchableOpacity
          style={styles.journalButton}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.journalButtonText}>✨ Write in Journal</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Zodiac Picker Modal */}
      <ZodiacPicker
        selectedSign={selectedSign}
        onSelectSign={setSelectedSign}
        visible={showPicker}
        onClose={() => setShowPicker(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  signSelector: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  signEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  signText: {
    flex: 1,
  },
  signName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  signDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  changeText: {
    color: '#4C1D95',
    fontSize: 16,
    fontWeight: '600',
  },
  journalButton: {
    backgroundColor: '#4C1D95',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  journalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;