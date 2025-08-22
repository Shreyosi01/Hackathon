
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
    <div style={{ maxWidth: 600, minHeight: 500, margin: '3rem auto', padding: 32, border: '1px solid #ccc', borderRadius: 16, background: '#f9f9ff', boxShadow: '0 2px 12px #eee' }}>
      <div style={{ minHeight: 350, marginBottom: 24, maxHeight: 400, overflowY: 'auto', padding: 8 }}>
        {history.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.sender === 'CareSync' ? 'left' : 'right',
            margin: '12px 0',
            display: 'flex',
            alignItems: 'center',
            flexDirection: msg.sender === 'CareSync' ? 'row' : 'row-reverse'
          }}>
            {msg.sender === 'CareSync' && <span style={{ color: '#6c63ff', fontWeight: 'bold', marginRight: 8, fontSize: 18 }}>🧑‍⚕️ CareSync:</span>}
            {msg.sender === 'user' && <span style={{ color: '#333', fontWeight: 'bold', marginLeft: 8, fontSize: 18 }}>You:</span>}
            <span style={{ background: msg.sender === 'CareSync' ? '#e6e6fa' : '#d1f7c4', padding: '10px 18px', borderRadius: 20, maxWidth: 350, display: 'inline-block', fontSize: 16, wordBreak: 'break-word' }}>{msg.text}</span>
          </div>
        ))}
        {loading && <TypingAnimation />}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12 }}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: 12, fontSize: 16, borderRadius: 8, border: '1px solid #bbb' }}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !message.trim()} style={{ minWidth: 100, fontSize: 16, borderRadius: 8 }}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
      {emotion && !loading && (
        <div style={{ marginTop: 12, color: '#888', fontSize: 15 }}>Detected emotion: {emotion}</div>
      )}
      {error && <div style={{ color: 'red', marginTop: 12, fontSize: 15 }}>{error}</div>}
    </div>
  );
}

export default ChatBox;
