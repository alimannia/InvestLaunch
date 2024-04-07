import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Button,TextInput,Platform  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
  
const QuizScreen = () => {
    const navigation = useNavigation();
    const questions = [
        { text: "I'm always eager to experiment with the latest gadgets or technologies, even before they become mainstream.", type: 'Trailblazer' },
        { text: "In uncertain situations, I usually look for the safest option that guarantees peace of mind.", type: 'Guardian' },
        { text: "I find great satisfaction in solving complex problems and puzzles where others might give up.", type: 'Strategist' },
        { text: "I often advocate for adopting new trends among my circle, from fashion to tech.", type: 'Trailblazer' },
        { text: "I prefer a well-laid-out plan for the day to spontaneous activities that might disrupt my routine.", type: 'Guardian' },
        { text: "I enjoy games that involve strategic planning and foresight, such as chess or strategy video games.", type: 'Strategist' },
        { text: "The thought of launching a startup or creating something new excites me more than following a traditional career path.", type: 'Trailblazer' },
        { text: "I tend to buy products from brands known for their durability and reliability, even if they are more expensive.", type: 'Guardian' },
        { text: "When learning something new, I like to break down the information into parts and understand the underlying systems.", type: 'Strategist' },
        { text: "I'm usually the first to try out new apps or services that promise to make life more convenient or interesting.", type: 'Trailblazer' },
        { text: "When it comes to making big decisions, I prefer to go with options that have a track record of success.", type: 'Guardian' },
        { text: "I enjoy debating and discussing theories or ideas that challenge conventional wisdom.", type: 'Strategist' },
      ];

    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [scores, setScores] = useState({ Trailblazer: 0, Guardian: 0, Strategist: 0 });
    const [completed, setCompleted] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [responsebot, setResponse] = useState('')
      
    const handleResponse = (response) => {
          if (response) {
            const currentType = questions[currentQuestionIndex].type;
            setScores({ ...scores, [currentType]: scores[currentType] + 1 });
          }
      
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            setCompleted(true);
          }
    };

    const renderResult = () => {
        const totalAgrees = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
        if (totalAgrees === 0) return <Text>No answers provided.</Text>;
        return (
            <View style={{ alignItems: 'center', fontSize: 22, fontWeight: 'bold'}}>
              {Object.keys(scores).map((type) => {
                const percentage = (scores[type] / totalAgrees) * 100 || 0;
                let backgroundColor = 'grey'; 
                if (type === 'Trailblazer' ) backgroundColor = 'red';
                else if (type === 'Guardian') backgroundColor = 'green';
                else if (type === 'Strategist') backgroundColor = 'blue';
        
                return (
                  <View key={type} style={{ alignItems: 'center', width: '100%', marginVertical: 10 }}>
                    <Text key={type}>{type}: {percentage.toFixed(2)}%</Text>
                    <View style={[styles.resultBar, { width: `${percentage}%`, backgroundColor }]} />
                  </View>
              )
            })}
          </View>
        );
      };
      
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/quiz2.png')} style={styles.backgroundImage} opacity={0.9}>
          <View style={styles.frame}>
            <View style={styles.onboarding}>
              <View style={styles.card}>
              {!completed ? (
                <View>
                <Text style={styles.title}>Investment style type test</Text>
                <Text style={styles.subtitle}>{questions[currentQuestionIndex].text}</Text>
                <TouchableOpacity style={styles.button} title="Agree" onPress={() => handleResponse(true)}>
                  <Text style={styles.buttonText}>Agree</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} title="Disagree" onPress={() => handleResponse(false)}>
                  <Text style={styles.buttonText}>Disagree</Text>
                </TouchableOpacity>
                </View>
                ): renderResult()}
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatScreen')}>
                  <Text style={styles.buttonText}>Assistant</Text>
                </TouchableOpacity>  
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
    justifyContent: 'center', // Adjust to align card at the bottom
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
    elevation: 3,
  },
  title: {
    fontSize: 22, // Slightly larger for more impact
    fontWeight: 'bold', // Bold for impact
    color: '#333', // Dark color for contrast
    textAlign: 'center',
    marginBottom: 12, // Spacing between title and subtitle
  },
  subtitle: {
    fontSize: 16, // Make subtitle larger for readability
    color: '#555', // Dark color for readability
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20, // Spacing above the button
  },
  button: {
    backgroundColor: '#667EEA', // More vibrant color
    borderRadius: 25, // Rounded corners for a modern look
    paddingVertical: 12,
    paddingHorizontal: 30,
    shadowColor: '#4d4d4d',
    marginBottom: 12,
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
  resultBar: {
    height: 20,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
  },
});

export default QuizScreen;