const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for .md files as text
config.resolver.sourceExts.push('md');
config.transformer.babelTransformerPath = require.resolve('./metro.transformer.js');

module.exports = config;
