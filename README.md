# 🌟 Astro Journal App

A beautiful React Native mobile application that combines daily horoscopes with personal journaling, helping users track their cosmic journey and daily reflections with style and functionality.

## ✨ Features

### 🎯 Current Features
- **Daily Horoscopes**: Personalized horoscopes for all 12 zodiac signs with lucky numbers, colors, and timing
- **Smart Journaling**: Write and save daily journal entries with auto-save functionality
- **Zodiac Management**: Easy-to-use picker for all zodiac signs with emojis and date ranges
- **Offline Support**: Full offline functionality with local storage using AsyncStorage
- **Journal Analytics**: Track writing progress with word counts and entry statistics
- **Search & Filter**: Find past entries with search functionality and sorting options
- **Beautiful UI**: Modern, responsive design with smooth animations and intuitive navigation

### 📱 User Experience
- **Tab Navigation**: Seamless navigation between Home, Write Journal, and All Journals
- **Pull-to-Refresh**: Update horoscope data with a simple swipe
- **Keyboard Handling**: Smart keyboard avoidance for optimal writing experience
- **Loading States**: Elegant loading animations and error handling
- **Cross-Platform**: Consistent experience on both iOS and Android

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **Java Development Kit (JDK)**: Version 11 or higher

### Installation

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Install required packages**
  
### Running the App

#### For Android
```bash
# Start Metro bundler
npm start

# In a new terminal, run Android
npm run android
# or
npx react-native run-android
```

#### For iOS (macOS only)
```bash
# Start Metro bundler
npm start

# In a new terminal, run iOS
npm run ios
# or
npx react-native run-ios
```

### Development Setup

1. **Enable Developer Options** on your Android device
2. **Connect your device** via USB or use an emulator
3. **For iOS Simulator**: Open Xcode and launch your preferred simulator

## 📁 Project Structure

```
astro-journal-app/
│   ├── components/           # Reusable UI components
│   │   ├── TabBarIcon.js     # Custom tab bar icons
│   │   ├── ZodiacPicker.js   # Zodiac sign selection modal
│   │   └── HoroscopeCard.js  # Horoscope display component
│   ├── screens/              # Screen components
│   │   ├── HomeScreen.js     # Main screen with horoscope
│   │   ├── JournalScreen.js  # Journal writing screen
│   │   └── AllJournalsScreen.js # View all journal entries
│   ├── services/             # API and storage services
│   │   ├── HoroscopeService.js # Horoscope API integration
│   │   └── StorageService.js   # AsyncStorage wrapper
│   ├── hooks/                # Custom React hooks
│   │   └── useHoroscope.js   # Horoscope data management
│   ├── store/                # State management
│   │   └── AstroContext.js   # React Context for app state
│   └── utils/                # Utility functions and constants
│       └── constants.js      # Zodiac signs and helper functions
├── android/                  # Android-specific files
├── ios/                      # iOS-specific files
├── App.js                    # Main application entry point
└── package.json              # Dependencies and scripts
```

## 🛠️ Technical Architecture

### State Management
- **React Context API** for global state management
- **useReducer** for complex state updates
- **AsyncStorage** for persistent local storage

### Navigation
- **React Navigation v6** with Bottom Tab Navigator
- **Custom tab icons** with focused/unfocused states
- **Screen-specific headers** with consistent styling

### Data Flow
```
User Interaction → Component → Context → Service → AsyncStorage
                                ↓
                           UI Updates ← State Changes
```

### API Integration
- **Primary**: Aztro Horoscope API (`https://aztro.sameerkumar.website`)
- **Fallback**: Comprehensive mock data for offline functionality
- **Error Handling**: Graceful degradation with user-friendly messages

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
HOROSCOPE_API_URL=https://aztro.sameerkumar.website
ENABLE_MOCK_DATA=true
DEBUG_MODE=false
```

### Customization Options
- **Color Scheme**: Modify colors in component StyleSheets
- **Fonts**: Update fontFamily in styles (requires font installation)
- **API Endpoints**: Change horoscope service URL in `HoroscopeService.js`

## 🚀 Future Roadmap

### Phase 1: Enhanced User Experience (Q2 2024)
- **🎨 Themes & Personalization**
  - Dark/Light mode toggle
  - Custom color schemes for each zodiac sign
  - Personalized app backgrounds and fonts
  
- **📅 Calendar Integration**
  - Calendar view for journal entries
  - Date picker for viewing past horoscopes
  - Monthly/yearly journal summaries

### Phase 2: Advanced Features (Q3 2024)
- **🔔 Smart Notifications**
  - Daily horoscope reminders
  - Journaling streak notifications
  - Customizable notification times based on user preferences

- **☁️ Cloud Sync & Backup**
  - Firebase/AWS integration for data backup
  - Multi-device synchronization
  - Data export capabilities (PDF, JSON)

- **📊 Analytics & Insights**
  - Mood tracking and correlation with horoscopes
  - Writing pattern analysis
  - Personal growth insights and trends

### Phase 3: Social & Sharing (Q4 2024)
- **👥 Community Features**
  - Share anonymous journal insights
  - Zodiac sign compatibility features
  - Community challenges and prompts

- **📤 Social Integration**
  - Share daily horoscopes on social media
  - Export journal entries as formatted posts
  - Integration with Instagram Stories/Facebook

### Phase 4: AI & Machine Learning (Q1 2025)
- **🤖 AI-Powered Features**
  - Personalized writing prompts based on history
  - Mood detection from journal entries
  - Predictive horoscope accuracy scoring

- **💬 Smart Assistance**
  - Journal entry auto-suggestions
  - Grammar and writing improvement tips
  - Emotional pattern recognition

### Phase 5: Premium Features (Q2 2025)
- **💎 Premium Subscription**
  - Advanced horoscope details and predictions
  - Unlimited cloud storage
  - Priority customer support
  - Early access to new features

- **🔮 Advanced Astrology**
  - Birth chart integration
  - Planetary transit notifications
  - Compatibility analysis with friends
  - Professional astrologer consultations

### Phase 6: Ecosystem Expansion (Q3 2025)
- **⌚ Wearable Integration**
  - Apple Watch/WearOS companion app
  - Quick journal voice notes
  - Horoscope widgets and complications

- **🖥️ Cross-Platform**
  - Web application with full feature parity
  - Desktop app for extended writing sessions
  - Browser extension for quick horoscope access

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Individual component testing
- **Integration Tests**: Screen flow and navigation testing
- **E2E Tests**: Complete user journey testing

## 📈 Performance Optimization

### Current Optimizations
- **Lazy Loading**: Components load on demand
- **Memory Management**: Efficient state updates
- **Image Optimization**: Compressed assets and caching
- **Bundle Size**: Tree shaking and code splitting

### Monitoring
- **Crashlytics**: Real-time crash reporting
- **Performance Metrics**: App startup time, screen transition speed
- **User Analytics**: Feature usage and engagement tracking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- **ESLint**: Consistent code formatting
- **Prettier**: Automatic code formatting
- **TypeScript**: Gradual migration planned for type safety

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Aztro API** for providing horoscope data
- **React Native Community** for excellent navigation libraries
- **Design Inspiration** from modern astrology and wellness apps
- **Beta Testers** who provided valuable feedback