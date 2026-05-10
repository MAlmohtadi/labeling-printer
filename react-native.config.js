module.exports = {
    assets: ['./src/assets'], // Adjust this path if your assets are elsewhere
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          android: null, // Prevents auto-linking of duplicate resources
        },
      },
    },
  };
  