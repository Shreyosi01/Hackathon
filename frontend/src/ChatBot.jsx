import React, { useState, useRef, useEffect } from 'react';

function TypingAnimation() {
  // Simple animated dots for typing
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => (d.length < 3 ? d + '.' : ''));
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return <span style={{ color: '#6c63ff', fontStyle: 'italic' }}>CareSync is typing{dots}</span>;
}

function ChatBox() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([
    { sender: 'CareSync', text: "Hey, I'm CareSync. What's on your mind?" }
  ]);
  const [emotion, setEmotion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError('');
    setHistory(h => [...h, { sender: 'user', text: message }]);
    try {
      const res = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, user_id: 1 })
      });
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setHistory(h => [...h, { sender: 'CareSync', text: data.reply }]);
      setEmotion(data.emotion);
    } catch (err) {
      setError('Failed to get reply.');
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', border: '1px solid #eee', borderRadius: 8, padding: 24, background: '#fff', boxShadow: '0 2px 8px #eee' }}>
      <div style={{ minHeight: 200, marginBottom: 16 }}>
        {history.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <span style={{
              display: 'inline-block',
              background: msg.sender === 'user' ? '#6c63ff' : '#f1f1f1',
              color: msg.sender === 'user' ? '#fff' : '#333',
              borderRadius: 16,
              padding: '8px 16px',
              maxWidth: '80%',
              wordBreak: 'break-word'
            }}>{msg.text}</span>
          </div>
        ))}
        {loading && <TypingAnimation />}
        <div ref={messagesEndRef} />
      </div>
      {emotion && <div style={{ textAlign: 'center', marginBottom: 8, color: '#6c63ff' }}>Detected emotion: {emotion}</div>}
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: 8, background: '#6c63ff', color: '#fff', border: 'none' }}>Send</button>
      </form>
    </div>
  );
}

export default ChatBox;
