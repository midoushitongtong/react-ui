module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['warn'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
