# GoodHabiTS 🎯

> A beautiful, cross-platform habit tracking app built with React Native & Expo. Log your favorite hobbies, track your progress, and visualize your journey with stunning analytics.

## Overview

**GoodHabiTS** is a modern habit tracking application that helps you stay consistent with the activities you love. Whether it's music, sports, creative pursuits, or learning—GoodHabiTS makes it easy to log sessions, track streaks, and gain insights into your habits.

### Key Features

- 🎭 **Track Multiple Hobbies** – Add custom hobbies with names, categories, colors, and target minutes
- 📊 **Rich Analytics** – 30-day line charts, 365-day heatmaps, category breakdowns, and mood correlations
- 💾 **Smart Storage** – Cloud sync with Supabase + local persistence with AsyncStorage
- 🎨 **Beautiful UI** – Dark/light theme support with custom typography and thoughtful design
- 🔐 **Secure Auth** – Email/password and Google OAuth with session persistence
- 📱 **Cross-Platform** – Runs on iOS, Android, and web via React Native & Expo

## Feature Status

### ✅ Fully Implemented
- **Authentication** – Email signup/login with 8+ character password validation, Google OAuth with PKCE flow
- **Hobby Management** – Create, edit, and soft-delete hobbies with custom metadata (icon, color, category, target minutes, weekly schedule)
- **Session Logging** – Log sessions with mood ratings (1-10 scale) and optional notes
- **Analytics** – Comprehensive insights including line charts, heatmaps, category breakdown, and mood correlation analysis
- **Profile** – User profile with all-time stats, yearly insights, and milestones
- **Theme System** – Light/dark mode with system preference detection, NativeWind-powered styling
- **Data Persistence** – Supabase backend with automatic token refresh and AsyncStorage for local state

### 🟡 Partially Implemented
- **Settings** – Theme toggle works perfectly; notifications, data export, and account deletion UIs present but not integrated
- **Profile Picture** – Avatar URL displays but upload functionality not implemented
- **Home Screen** – Fully functional except streak calculation logic (displays placeholder message)
- **Progress Rings** – Visual component exists but calculation logic incomplete

### ❌ Not Yet Implemented
- Streak score calculation
- Push notifications
- Data export (CSV/JSON)
- Account deletion flow
- Profile picture upload
- Social sharing

## Tech Stack

### Framework & Runtime
- **React Native** 0.81.5 – Cross-platform mobile framework
- **Expo** 54.0.0 – React Native build & runtime platform
- **React** 19.1.0 – Latest React features
- **Expo Router** 6.0+ – File-based routing (similar to Next.js)

### Authentication & Database
- **Supabase** – PostgreSQL backend with built-in auth and real-time capabilities
- **Expo Auth Session** – Secure OAuth 2.0 flow with PKCE
- **AsyncStorage** – Local persistent storage for sessions & preferences
- **Secure Store** – Encrypted credential storage

### Styling & Design
- **NativeWind** – Tailwind CSS for React Native
- **Tailwind CSS** 3.4+ – Utility-first CSS framework
- **Expo Google Fonts** – Custom typography (Caveat, JetBrains Mono, Plus Jakarta Sans)
- **React Native SVG** – Vector graphics rendering
- **Linear Gradient** – Gradient backgrounds

### Navigation & UI
- **React Navigation** (Material Top Tabs) – Tab-based navigation with swipeable screens
- **React Native Pager View** – Smooth swipeable transitions
- **React Native Gesture Handler** – Touch gesture recognition
- **React Native Reanimated** – 60fps animations
- **Popover View** – Floating UI popover components

### Forms & Validation
- **React Hook Form** – Performant form management
- **Zod** – TypeScript-first schema validation

### Charts & Data Visualization
- **React Native Gifted Charts** – High-performance chart library (line, bar, heatmap)

### Development Tools
- **TypeScript** – Static type checking
- **ESLint** – Code quality linting
- **Prettier** – Code formatting
- **Babel** – JavaScript transpilation

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Expo CLI** – Install globally: `npm install -g expo-cli`
- **Android Studio** or **Xcode** (for native development, optional for web)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/goodhabits.git
   cd goodhabits
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
   EXPO_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI=good-habits://callback
   ```

   Get these values from:
   - **Supabase**: [Project Settings → API](https://app.supabase.com/) → Copy your project URL and anon key
   - **Google OAuth**: [Google Cloud Console](https://console.cloud.google.com/) → Create OAuth 2.0 credentials

4. **Verify ESLint & Prettier setup**
   ```bash
   npm run lint    # Check for errors
   npm run format  # Auto-fix formatting
   ```

### Running the App

#### Development Mode
```bash
npm start
```
This launches the Expo development server. You'll see a QR code in the terminal.

**Run on Android**
```bash
npm run android
# or from Expo menu: press 'a' in terminal
```

**Run on iOS** (macOS only)
```bash
npm run ios
# or from Expo menu: press 'i' in terminal
```

**Run on Web**
```bash
npm run web
# or from Expo menu: press 'w' in terminal
```

#### Production Build

For EAS (Expo Application Services):
```bash
# Build for Android
eas build --profile production --platform android

# Build for iOS
eas build --profile production --platform ios
```

For local prebuild (native projects):
```bash
npm run prebuild
npm run android
npm run ios
```

## Project Structure

```
src/
├── app/                           # Expo Router pages (file-based routing)
│   ├── _layout.tsx               # Root layout & navigation setup
│   ├── (tabs)/                   # Tab-based screens
│   │   ├── _layout.tsx           # Tab navigation shell
│   │   ├── index.tsx             # Home screen
│   │   ├── hobbies.tsx           # Hobbies management
│   │   ├── insights.tsx          # Analytics / insights
│   │   └── profile.tsx           # User profile
│   ├── auth/                     # Authentication routes
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── callback.tsx
│   └── settings.tsx              # Settings route (outside tabs)
│
├── components/                    # Reusable React components
│   ├── TabBar.tsx               # Custom tab bar
│   ├── Auth/                    # Auth form components
│   ├── Home/                    # Home screen components
│   │   └── modalContent/        # Modal dialogs for add/log
│   ├── Hobbies/                 # Hobby display components
│   ├── Insights/                # Chart & analytics components
│   ├── Profile/                 # Profile-related components
│   └── settings/                # Settings UI components
│
├── screens/                       # Full-screen views
│   ├── HomeScreen.tsx
│   ├── HobbiesScreen.tsx
│   ├── InsightsScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── LoginScreen.tsx
│   └── SignupScreen.tsx
│
├── context/                       # React Context API state
│   ├── AuthContext.tsx           # Authentication state & session
│   └── SettingsContext.tsx       # App settings (theme, etc.)
│
├── hooks/                         # Custom React hooks
│   └── useThemeTokens.ts         # Theme color/styling hook
│
├── lib/
│   ├── supabase/                # Backend API calls
│   │   ├── supabase.ts          # Supabase client config
│   │   ├── auth/                # Auth functions
│   │   ├── hobbies/             # Hobby CRUD operations
│   │   ├── home/                # Home screen data fetching
│   │   ├── insights/            # Analytics data queries
│   │   └── profile/             # Profile data fetching
│   └── colorsAndShades/         # Color utilities
│       └── getHeatMapColor.ts
│
├── theme/                         # Design system
│   └── tokens.ts                # Light/dark theme tokens
│
└── types/                         # TypeScript type definitions
    ├── addHobbyModalTypes.ts
    └── logSessionModalTypes.ts

config files:
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── app.json                      # Expo app configuration
├── babel.config.js               # Babel transpilation config
├── metro.config.js               # React Native bundler config
└── eslint.config.js              # ESLint rules
```

## Database Schema (Supabase)

GoodHabiTS uses the following core tables:

### `profiles`
```sql
- user_id (UUID, primary key)
- full_name (text)
- avatar_url (text)
- created_at (timestamp)
```

### `hobbies`
```sql
- id (UUID, primary key)
- user_id (UUID, foreign key)
- name (text) – Hobby name
- icon (text) – Emoji icon selector
- color (text) – Hex color code
- category (text) – Creative, Sport, Music, Learning, Wellness, Social, Misc
- target_minutes (integer) – Goal minutes per session
- days_of_week (array) – Days user plans to do this hobby (0-6)
- streak_score (integer) – Current streak (not yet implemented)
- is_active (boolean) – Soft-delete flag
- created_at (timestamp)
```

### `sessions`
```sql
- id (UUID, primary key)
- hobby_id (UUID, foreign key)
- user_id (UUID, foreign key)
- feeling (integer) – Mood rating 1-10
- session_date (date) – When the session occurred
- notes (text) – Optional session notes
- minutes_logged (integer) – Duration of session
- created_at (timestamp)
```

## Known Issues & TODOs

### High Priority
- [ ] **Streak Calculation Logic** – Currently displays placeholder in hobby cards (see [MyHobbyCards.tsx](src/components/Home/MyHobbyCards.tsx#L92))
- [ ] **Progress Ring Calculation** – Ring visual updates but underlying math incomplete (see [HobbyWithMiniHeatMap.tsx](src/components/Hobbies/HobbyWithMiniHeatMap.tsx#L175))
- [ ] **Profile Picture Upload** – Avatar URL displays but no upload mechanism (see [ProfileHeader.tsx](src/components/Profile/ProfileHeader.tsx#L16))
- [ ] **Summary Card Auto-Refresh** – New hobbies don't auto-reflect without manual page refresh

### Medium Priority
- [ ] Integrate notifications (UI exists, backend pending)
- [ ] Implement data export (CSV/JSON)
- [ ] Complete account deletion flow (UI exists, backend pending)

### Low Priority
- [ ] Unused `/src/store/` directory (Redux/Zustand abandoned, remove if not planned)
- [ ] Optimize chart re-renders on Insights screen

## Roadmap 🗺️

### In Progress
- Streak calculation engine with daily consistency scoring
- Progress ring visual refinements

### Coming Soon
- **Skeleton Screens** – Loading placeholders for smoother UX
- **Smart Notifications** – Reminders and streak notifications (push notifications via Expo)
- **Haptic Feedback** – Tactile feedback for interactions
- **Better Animations** – Smooth transitions and gesture-driven animations
- **Data Export** – Export hobby logs as CSV or JSON

### Q2 2026
- **Heatmap Screenshot Sharing** – Share your heatmap achievements with others
- **Habit Widgets** – iOS/Android home screen widgets for quick logging
- **Social Features** – Friend connections and shared habit challenges
- **Advanced Analytics** – Predictive insights and habit recommendations

## Development Workflow

### Code Quality
```bash
# Run linter
npm run lint

# Auto-fix formatting
npm run format

# Run both
npm run lint && npm run format
```

### Code Style Guidelines
- **TypeScript** – All components should be typed
- **NativeWind** – Use Tailwind classes instead of StyleSheet
- **File Naming** – Components use PascalCase (e.g., `HomeScreen.tsx`), utilities use camelCase
- **Hooks** – Use React hooks for state management; avoid class components
- **Testing** – Jest & React Native Testing Library (setup pending)

### Making Changes
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make changes and test locally with `npm start`
3. Run linting: `npm run format`
4. Commit with clear messages
5. Push and create a pull request

## Architecture Decisions

### State Management
- **Authentication**: React Context + Supabase session persistence
- **Settings**: React Context + AsyncStorage
- **Business Logic**: Contained in components; data fetching in `/lib/supabase/`
- **Future**: Consider Redux/Zustand for complex state if app scales

### Styling Approach
- **NativeWind** was chosen for consistency with web ecosystem and rapid development
- Dark/light themes managed via `useThemeTokens` hook + Context
- Custom tokens centralized in `theme/tokens.ts` for easy brand adjustments

### Database Design
- Supabase PostgreSQL for reliable, scalable backend
- Soft-delete pattern for hobbies (`is_active` flag) to preserve analytics history
- Denormalized streak_score in hobbies table (triggers/cron job for updates pending)

## Troubleshooting

### Common Issues

**"Cannot find module" errors**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start --clear
```

**Supabase connection issues**
- Verify `.env.local` has correct SUPABASE_URL and ANON_KEY
- Check network connectivity
- Confirm Supabase project is running in dashboard

**OAuth flow stuck**
- Ensure redirect URI matches exactly in Google Cloud Console
- Clear app cache: `npm run android -- --clear-cache`

**Types not found**
- Run `npm install` to ensure all `@types/*` packages are installed
- Restart TypeScript server in VS Code (Cmd+K Cmd+J)

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

When submitting PRs:
- Follow the existing code style
- Run `npm run format` before committing
- Update relevant documentation
- Test on both Android and iOS if possible

## License

This project is licensed under the MIT License – see the LICENSE file for details.

## Support

- 📖 **Documentation**: Check GitHub Wiki (coming soon)
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/yourusername/goodhabits/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/goodhabits/discussions)

---

**Happy tracking! 🎉** Build your habits, one session at a time.

---

*Last Updated: April 2026 | App Version: 0.1.0*
