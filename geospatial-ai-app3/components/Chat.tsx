import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');

  const handleQuery = async () => {
    if (!input.trim()) return;

    // Append the user's message to the chat
    const newMessage = { user: input, bot: '' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      // Send the user's input to the LLM API via the backend
      const res = await axios.post('/api/chat', {
        message: input,
      });

      // Add the bot's response to the chat
      const botResponse = res.data.response || 'No response';
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].bot = botResponse.trim();
        return updatedMessages;
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].bot = 'Error: Unable to fetch response.';
        return updatedMessages;
      });
    }

    setInput('');
  };

  return (
    <div style={{ padding: '1rem', maxHeight: '100%', overflowY: 'auto' }}>
      <h2>Chat Interface</h2>
      <div style={{ marginBottom: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>
              <strong>You:</strong> {msg.user}
            </p>
            <p>
              <strong>Bot:</strong> {msg.bot || '...'}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: '300px', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={handleQuery} style={{ padding: '10px' }}>
        Submit
      </button>
    </div>
  );
}
