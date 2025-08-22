import React from 'react';

export default function HeaderPracto({ onHomeClick }) {
  return (
    <header style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.2rem 2.2rem',
      background: '#fff',
      boxShadow: '0 2px 12px rgba(30,136,168,0.06)',
      position: 'relative',
      zIndex: 2
    }}>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2d3a8c', letterSpacing: 1, fontFamily: 'Segoe UI, Arial, sans-serif' }}>
        CareSync
      </div>
      <button
        onClick={onHomeClick}
        style={{
          background: '#1ec9f4',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 600,
          border: 'none',
          borderRadius: 6,
          padding: '0.45rem 1.1rem',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s'
        }}
      >
        Home Page
      </button>
    </header>
  );
}
