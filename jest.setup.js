import 'react-native-gesture-handler/jestSetup';

// Mock the expo modules that might cause issues in tests
jest.mock('expo-file-system', () => ({
  documentDirectory: 'file:///document/directory/',
  downloadAsync: jest.fn().mockResolvedValue({ uri: 'downloaded-file-uri' }),
  getInfoAsync: jest.fn().mockResolvedValue({ exists: true, isDirectory: false, uri: 'file:///test/uri', size: 1024 }),
  makeDirectoryAsync: jest.fn().mockResolvedValue(undefined),
  readDirectoryAsync: jest.fn().mockResolvedValue(['file1.txt', 'file2.jpg', 'folder1']),
  deleteAsync: jest.fn().mockResolvedValue(undefined),
  copyAsync: jest.fn().mockResolvedValue(undefined),
  moveAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('expo-media-library', () => ({
  requestPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  getAssetsAsync: jest.fn().mockResolvedValue({ assets: [], hasNextPage: false }),
  createAssetAsync: jest.fn().mockResolvedValue({ id: 'asset-id', uri: 'asset-uri' }),
}));

jest.mock('expo-document-picker', () => ({
  getDocumentAsync: jest.fn().mockResolvedValue({ type: 'success', uri: 'document-uri', name: 'document.pdf' }),
}));

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ cancelled: false, uri: 'image-uri', type: 'image' }),
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn().mockResolvedValue(undefined),
  deleteItemAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn().mockResolvedValue(true),
  shareAsync: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('react-native-mime-types', () => ({
  lookup: jest.fn().mockImplementation((uri) => {
    if (uri.endsWith('.jpg') || uri.endsWith('.jpeg') || uri.endsWith('.png')) return 'image/jpeg';
    if (uri.endsWith('.mp4')) return 'video/mp4';
    if (uri.endsWith('.pdf')) return 'application/pdf';
    if (uri.endsWith('.txt')) return 'text/plain';
    return 'application/octet-stream';
  }),
  extension: jest.fn().mockImplementation((mimeType) => {
    if (mimeType === 'image/jpeg') return 'jpg';
    if (mimeType === 'video/mp4') return 'mp4';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType === 'text/plain') return 'txt';
    return 'bin';
  }),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      push: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn().mockReturnValue(true),
      addListener: jest.fn().mockReturnValue(jest.fn()),
    }),
    useRoute: () => ({
      params: {
        folderName: 'TestFolder',
        prevDir: 'file:///test/directory/',
      },
    }),
  };
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(undefined),
  removeItem: jest.fn().mockResolvedValue(undefined),
  clear: jest.fn().mockResolvedValue(undefined),
}));

// Mock the BackHandler
jest.mock('react-native/Libraries/BackHandler/BackHandler', () => ({
  addEventListener: jest.fn().mockReturnValue({ remove: jest.fn() }),
  removeEventListener: jest.fn(),
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock SplashScreen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn().mockResolvedValue(true),
  hideAsync: jest.fn().mockResolvedValue(true),
}));

// Mock constants
jest.mock('expo-constants', () => ({
  manifest: {
    extra: {
      apiUrl: 'https://api.example.com',
    },
  },
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));
