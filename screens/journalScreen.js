// src/screens/JournalScreen.js
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAstro } from "../store/AstroContext";
import { formatDate, getTodayKey } from "../utils/constants";

const JournalScreen = ({ navigation }) => {
  const { journalEntries, addJournalEntry } = useAstro();
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayKey());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const today = new Date();
  const todayKey = getTodayKey();

  // Load entry for selected date
  useEffect(() => {
    const entry = journalEntries[selectedDate] || "";
    setCurrentEntry(entry);
    setHasUnsavedChanges(false);
  }, [selectedDate, journalEntries]);

  // Check for unsaved changes
  useEffect(() => {
    const savedEntry = journalEntries[selectedDate] || "";
    setHasUnsavedChanges(currentEntry !== savedEntry);
  }, [currentEntry, selectedDate, journalEntries]);

  const handleSave = async () => {
    try {
      await addJournalEntry(selectedDate, currentEntry);
      setHasUnsavedChanges(false);
      Alert.alert("Success", "Your journal entry has been saved!");
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to save your journal entry. Please try again."
      );
    }
  };

  const handleTextChange = (text) => {
    setCurrentEntry(text);
  };

  const getPreviousEntries = () => {
    return Object.entries(journalEntries)
      .filter(([date]) => date !== selectedDate)
      .sort(([a], [b]) => new Date(b) - new Date(a))
      .slice(0, 5); // Show last 5 entries
  };

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getWordCount = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Today's Entry</Text>
            <Text style={styles.headerDate}>{formatDate(today)}</Text>
          </View>

          {/* Current Entry Section */}
          <View style={styles.entrySection}>
            <View style={styles.entryHeader}>
              <Text style={styles.sectionTitle}>Write Your Thoughts</Text>
              <View style={styles.entryMeta}>
                {hasUnsavedChanges && (
                  <Text style={styles.unsavedIndicator}>• Unsaved</Text>
                )}
                <Text style={styles.wordCount}>
                  {getWordCount(currentEntry)} words
                </Text>
              </View>
            </View>

            <TextInput
              style={styles.textInput}
              value={currentEntry}
              onChangeText={handleTextChange}
              placeholder="What's on your mind today? How are the stars aligning for you? Reflect on your experiences, emotions, and the cosmic energy around you..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  !hasUnsavedChanges && styles.saveButtonDisabled,
                ]}
                onPress={handleSave}
                disabled={!hasUnsavedChanges}
              >
                <Text
                  style={[
                    styles.saveButtonText,
                    !hasUnsavedChanges && styles.saveButtonTextDisabled,
                  ]}
                >
                  {hasUnsavedChanges ? "Save Entry" : "Saved ✓"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Previous Entries Section */}
          {getPreviousEntries().length > 0 && (
            <View style={styles.previousSection}>
              <Text style={styles.sectionTitle}>Recent Entries</Text>
              {getPreviousEntries().map(([date, entry]) => (
                <TouchableOpacity
                  key={date}
                  style={styles.previousEntry}
                  onPress={() => {
                    // Could add functionality to view/edit past entries
                    Alert.alert(
                      "Past Entry",
                      `Entry from ${formatDisplayDate(date)}`,
                      [{ text: "OK", style: "default" }]
                    );
                  }}
                >
                  <Text style={styles.previousEntryDate}>
                    {formatDisplayDate(date)}
                  </Text>
                  <Text style={styles.previousEntryText} numberOfLines={3}>
                    {entry}
                  </Text>
                  <Text style={styles.previousEntryWords}>
                    {getWordCount(entry)} words
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Empty State */}
          {Object.keys(journalEntries).length === 0 && !currentEntry && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateEmoji}>📖</Text>
              <Text style={styles.emptyStateTitle}>
                Start Your Cosmic Journey
              </Text>
              <Text style={styles.emptyStateText}>
                Begin documenting your daily thoughts, feelings, and cosmic
                experiences. Your journal is a sacred space for reflection and
                growth.
              </Text>
              <View style={styles.emptyStateHints}>
                <Text style={styles.hintTitle}>Writing prompts:</Text>
                <Text style={styles.hintText}>
                  • How did today's horoscope resonate with you?
                </Text>
                <Text style={styles.hintText}>
                  • What emotions are you experiencing?
                </Text>
                <Text style={styles.hintText}>
                  • What are you grateful for today?
                </Text>
                <Text style={styles.hintText}>
                  • What challenges did you overcome?
                </Text>
              </View>
            </View>
          )}

          {/* Statistics Section */}
          {Object.keys(journalEntries).length > 0 && (
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Your Journey</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {Object.keys(journalEntries).length}
                  </Text>
                  <Text style={styles.statLabel}>Total Entries</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {Object.values(journalEntries).reduce(
                      (total, entry) => total + getWordCount(entry),
                      0
                    )}
                  </Text>
                  <Text style={styles.statLabel}>Total Words</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  keyboardView: {
    flex: 1,
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
    marginBottom: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
  },
  headerDate: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
  },
  entrySection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  entryMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  unsavedIndicator: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
    marginRight: 8,
  },
  wordCount: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#1F2937",
    minHeight: 200,
    backgroundColor: "#F9FAFB",
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4C1D95",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  saveButtonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonTextDisabled: {
    color: "#9CA3AF",
  },
  previousSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previousEntry: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 16,
  },
  previousEntryDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4C1D95",
    marginBottom: 8,
  },
  previousEntryText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 4,
  },
  previousEntryWords: {
    fontSize: 12,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 20,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyStateHints: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 16,
    width: "100%",
  },
  hintTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  hintText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    lineHeight: 20,
  },
  statsSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4C1D95",
  },
});

export default JournalScreen;
