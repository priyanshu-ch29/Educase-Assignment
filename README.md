# Product Catalog App

A feature-rich React Native mobile application that allows users to browse, search, and view detailed information about various products. This app is built with a focus on performance, scalability, and modern React Native practices.

## 🚀 Features

- **Product Listing**: View a comprehensive list of products with infinite scrolling (pagination).
- **Search Functionality**: Quickly find products by name or category using the integrated search bar.
- **Detailed View**: Access in-depth information for each product, including descriptions, ratings, stock status, and pricing.
- **Persistent State**: Your browsing progress and product data are saved locally using Redux Persist, ensuring a seamless experience even after app restarts.
- **Optimized UI**: Smooth transitions and responsive design using React Navigation and core React Native components.
- **Error Handling**: Graceful error management for API failures or connectivity issues.

## 🛠️ Tech Stack

- **Framework**: React Native (v0.83.1)
- **Language**: TypeScript
- **State Management**: Redux Toolkit (RTK) with Redux Persist
- **Navigation**: React Navigation (Native Stack)
- **API**: DummyJSON (Axios-based client)
- **Persistence**: Async Storage

## 🏃 How to Run the Project

### Prerequisites

- Node.js (version 20 or higher)
- React Native CLI
- Android Studio (for Android) or Xcode (for iOS)
- CocoaPods (for iOS)

### Installation

1. **Clone the repository**:

   ```sh
   git clone <repository-url>
   cd Assignment
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **iOS Specific Setup**:
   ```sh
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

### Running the App

1. **Start Metro Bundler**:

   ```sh
   npm start
   ```

2. **Run on Android**:

   ```sh
   npm run android
   ```

3. **Run on iOS**:
   ```sh
   npm run ios
   ```

## 🏗️ Technical Decisions

- **Redux Toolkit**: Chosen for its standardized way of writing Redux logic, reducing boilerplate and providing built-in support for async thunks and immutable state updates.
- **Clean Architecture**: The project follows a modular structure (`api`, `store`, `models`, `ui`, `utils`) to ensure separation of concerns and ease of testing.
- **Persistence**: `redux-persist` with `@react-native-async-storage/async-storage` was used to hydrate the application's state, allowing for a better user experience across sessions.
- **Type Safety**: TypeScript models (`src/models/Product.model.ts`) are used to transform raw API responses into well-defined application objects, preventing runtime errors.
- **Navigation**: `native-stack` navigation was selected for its native performance and smooth transitions between the product list and detail screens.

## 📈 Future Improvements

Given more time, I would implement several enhancements:

1. **Unit & Integration Testing**: Add comprehensive tests using Jest and React Native Testing Library to ensure long-term stability.
2. **Advanced Image Handling**: Integrate `react-native-fast-image` for superior image caching and smoother list scrolling.
3. **Theming Support**: Implement a dynamic theme system supporting both Dark and Light modes.
4. **Enhanced Offline Capabilities**: Cache search results and implement background sync for updated product data.
5. **Accessibility (A11y)**: Conduct a full accessibility audit to ensure the app is usable by everyone, including adding proper screen reader labels.
6. **Performance Monitoring**: Integrate tools like Sentry or Firebase Performance Monitoring to track and optimize app health.

---

Created by [Your Name/Github Handle]
