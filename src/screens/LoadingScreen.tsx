import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const LoadingScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={['#F9FAFF', '#F0F1FA']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      {/* Precoro Logo Icon */}
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <View style={styles.leftSegment} />
          <View style={styles.rightSegment} />
        </View>
      </View>
      
      {/* Precoro Text */}
      <Text style={styles.title}>PRECOROn</Text>
      
      <ActivityIndicator size="large" color="#2E5BBA" style={styles.spinner} />
      <Text style={styles.subtitle}>Loading...</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoIcon: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  leftSegment: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 50,
    height: 100,
    backgroundColor: '#4A90E2',
    opacity: 0.7,
    borderRadius: 25,
  },
  rightSegment: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 50,
    height: 100,
    backgroundColor: '#2E5BBA',
    borderRadius: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 40,
    letterSpacing: 1,
  },
  spinner: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
}); 