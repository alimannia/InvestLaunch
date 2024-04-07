require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/message', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: userMessage,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    const botReply = response.data.choices[0].text.trim();
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ reply: "Sorry, I'm having trouble understanding you." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
