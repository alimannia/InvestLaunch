import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    const userMessage = userInput.trim();
    if (!userMessage) return;
    setMessages(messages => [...messages, { text: userMessage, sender: 'user' }]);
    
    // Assuming you have the server setup to handle this post request
    const response = await fetch('http://172.19.64.1:3000/api/message', { // Make sure the IP and port are correct
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    
    setMessages(messages => [...messages, { text: data.reply, sender: 'bot' }]);
    setUserInput('');
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, styles[msg.sender]]}>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputForm}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Say something..."
        />
        <Button onPress={sendMessage} title="Send" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  chatWindow: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  user: {
    backgroundColor: '#007bff',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#e9e9eb',
    alignSelf: 'flex-start',
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    width: 100,
  },
});

export default ChatScreen;
