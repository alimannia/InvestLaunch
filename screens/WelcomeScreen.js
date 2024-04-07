import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/three.png')} style={styles.backgroundImage} opacity={0.9}>
          <View style={styles.frame}>
            <View style={styles.onboarding}>
              <View style={styles.card}>
                <Text style={styles.title}>Invest Launch</Text>
                <Text style={styles.subtitle}>Find out your investment style type and start investing today!</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Get started now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Ensure the background covers the whole screen
  },
  frame: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    justifyContent: 'flex-end', // Adjust to align card at the bottom
    alignItems: 'center',
    paddingBottom: 50, // Add some padding at the bottom
  },
  card: {
    width: '85%', // Adjust width to fit better
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Increased opacity for better readability
    borderRadius: 30,
    alignItems: 'center',
    padding: 35, // Adjusted padding for spacing
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, // Slightly more shadow for depth
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22, // Slightly larger for more impact
    fontWeight: 'bold', // Bold for impact
    color: '#333', // Dark color for contrast
    textAlign: 'center',
    marginBottom: 12, // Spacing between title and subtitle
  },
  subtitle: {
    fontSize: 14, // Make subtitle larger for readability
    color: '#555', // Dark color for readability
    textAlign: 'center',
    marginBottom: 20, // Spacing above the button
  },
  button: {
    backgroundColor: '#667EEA', // More vibrant color
    borderRadius: 25, // Rounded corners for a modern look
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: '#4d4d4d',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, // Elevation for button depth
  },
  buttonText: {
    fontSize: 18, // Larger text for button
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default WelcomeScreen;
