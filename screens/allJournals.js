// src/screens/AllJournalsScreen.js (Enhanced Version)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Dimensions,
} from 'react-native';
import { useAstro } from '../store/AstroContext';
import { useNavigation } from '@react-navigation/native';

const { height: screenHeight } = Dimensions.get('window');

export default function AllJournalsScreen() {
  const navigator = useNavigation();
  const { journalEntries } = useAstro();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const formatDisplayDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatShortDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getWordCount = text => {
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length;
  };

  const getReadingTime = text => {
    const wordCount = getWordCount(text);
    const wordsPerMinute = 200; // Average reading speed
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes === 1 ? '1 min read' : `${minutes} min read`;
  };

  const getSortedAndFilteredEntries = () => {
    let entries = Object.entries(journalEntries);

    // Filter by search query
    if (searchQuery.trim()) {
      entries = entries.filter(
        ([date, content]) =>
          content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          formatDisplayDate(date)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Sort entries
    switch (sortBy) {
      case 'newest':
        entries.sort(([a], [b]) => new Date(b) - new Date(a));
        break;
      case 'oldest':
        entries.sort(([a], [b]) => new Date(a) - new Date(b));
        break;
      case 'longest':
        entries.sort(([, a], [, b]) => getWordCount(b) - getWordCount(a));
        break;
      default:
        entries.sort(([a], [b]) => new Date(b) - new Date(a));
    }

    return entries;
  };

  const handleEntryPress = (date, content) => {
    setSelectedEntry({ date, content });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  const navigateToEdit = () => {
    closeModal();
    // You can pass the date as a parameter if needed
    navigator.navigate('Journal');
  };

  const entries = getSortedAndFilteredEntries();
  const totalWords = Object.values(journalEntries).reduce(
    (total, entry) => total + getWordCount(entry),
    0,
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {Object.keys(journalEntries).length}
            </Text>
            <Text style={styles.statLabel}>Total Entries</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalWords}</Text>
            <Text style={styles.statLabel}>Total Words</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {Object.keys(journalEntries).length > 0
                ? Math.round(totalWords / Object.keys(journalEntries).length)
                : 0}
            </Text>
            <Text style={styles.statLabel}>Avg Words</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search your journals..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            {[
              { key: 'newest', label: 'Newest' },
              { key: 'oldest', label: 'Oldest' },
              { key: 'longest', label: 'Longest' },
            ].map(option => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortButton,
                  sortBy === option.key && styles.sortButtonActive,
                ]}
                onPress={() => setSortBy(option.key)}
              >
                <Text
                  style={[
                    styles.sortButtonText,
                    sortBy === option.key && styles.sortButtonTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Journal Entries */}
        {entries.length > 0 ? (
          <View style={styles.entriesContainer}>
            {entries.map(([date, content]) => (
              <TouchableOpacity
                key={date}
                style={styles.entryCard}
                onPress={() => handleEntryPress(date, content)}
                activeOpacity={0.7}
              >
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>
                    {formatShortDate(date)}
                  </Text>
                  <View style={styles.entryMeta}>
                    <Text style={styles.entryWordCount}>
                      {getWordCount(content)} words
                    </Text>
                    <Text style={styles.readingTime}>
                      • {getReadingTime(content)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.entryPreview} numberOfLines={4}>
                  {content}
                </Text>
                <View style={styles.entryFooter}>
                  <Text style={styles.readMoreText}>Tap to read full entry</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            {searchQuery ? (
              <>
                <Text style={styles.emptyStateEmoji}>🔍</Text>
                <Text style={styles.emptyStateTitle}>No Results Found</Text>
                <Text style={styles.emptyStateText}>
                  No journal entries match your search "{searchQuery}"
                </Text>
                <TouchableOpacity
                  style={styles.clearSearchButton}
                  onPress={() => setSearchQuery('')}
                >
                  <Text style={styles.clearSearchText}>Clear Search</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.emptyStateEmoji}>📖</Text>
                <Text style={styles.emptyStateTitle}>
                  No Journal Entries Yet
                </Text>
                <Text style={styles.emptyStateText}>
                  Start your cosmic journey by writing your first journal entry
                </Text>
                <TouchableOpacity
                  style={styles.writeFirstButton}
                  onPress={() => navigator.navigate('Journal')}
                >
                  <Text style={styles.writeFirstText}>
                    Write Your First Entry
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {/* Quick Action Button */}
        {entries.length > 0 && (
          <TouchableOpacity
            style={styles.quickWriteButton}
            onPress={() => navigator.navigate('Journal')}
          >
            <Text style={styles.quickWriteText}>✍️ Write New Entry</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Full Entry Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Journal Entry</Text>
            <TouchableOpacity onPress={navigateToEdit} style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <ScrollView 
            style={styles.modalContent}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {selectedEntry && (
              <>
                {/* Entry Date and Stats */}
                <View style={styles.modalEntryHeader}>
                  <Text style={styles.modalEntryDate}>
                    {formatDisplayDate(selectedEntry.date)}
                  </Text>
                  <View style={styles.modalEntryStats}>
                    <Text style={styles.modalEntryStat}>
                      {getWordCount(selectedEntry.content)} words
                    </Text>
                    <Text style={styles.modalEntryStat}>
                      • {getReadingTime(selectedEntry.content)}
                    </Text>
                  </View>
                </View>

                {/* Full Content */}
                <View style={styles.modalEntryContent}>
                  <Text style={styles.modalEntryText}>
                    {selectedEntry.content}
                  </Text>
                </View>

                {/* Entry Footer Info */}
                <View style={styles.modalEntryFooter}>
                  <Text style={styles.modalEntryFooterText}>
                    Written on {formatDisplayDate(selectedEntry.date)}
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

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
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4C1D95',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  searchContainer: {
    marginTop: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sortContainer: {
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  sortButtonActive: {
    backgroundColor: '#4C1D95',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  sortButtonTextActive: {
    color: 'white',
  },
  entriesContainer: {
    marginTop: 16,
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C1D95',
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryWordCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  readingTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  entryPreview: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  entryFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
  },
  readMoreText: {
    fontSize: 12,
    color: '#4C1D95',
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  writeFirstButton: {
    backgroundColor: '#4C1D95',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  writeFirstText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  clearSearchButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clearSearchText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  quickWriteButton: {
    backgroundColor: '#4C1D95',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  quickWriteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#4C1D95',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  modalContent: {
    flex: 1,
  },
  modalScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  modalEntryHeader: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalEntryDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  modalEntryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalEntryStat: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  modalEntryContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalEntryText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  modalEntryFooter: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  modalEntryFooterText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});