import { useState, useEffect } from 'react';
import './Footer.css';

const year = new Date().getFullYear();

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <footer className="bg-blue-50 border-t mt-12 pt-8 pb-4 text-sm text-gray-700 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 px-4">
        <div>
          <h3 className="font-bold mb-2">About CareSync</h3>
          <p>Connecting you to better health, anytime, anywhere.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <a href="mailto:team@caresync.com" className="hover:underline">team@caresync.com</a>
        </div>
        <div>
          <h3 className="font-bold mb-2">Policies</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Social</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Newsletter</h3>
          <form className="flex gap-2" onSubmit={e => { e.preventDefault(); }}>
            <label htmlFor="newsletter" className="sr-only">Email</label>
            <input id="newsletter" type="email" required placeholder="Your email" className="rounded px-2 py-1 border focus:ring-2 focus:ring-blue-400" />
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Subscribe to newsletter">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-gray-500">
        © {year} CareSync Team · <a href="mailto:team@caresync.com" className="underline">Contact us</a>
      </div>
      {showTop && (
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 animate-fade-in"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}
    </footer>
  );
}