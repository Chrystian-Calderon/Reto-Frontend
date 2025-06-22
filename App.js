import { useEffect } from 'react';
import Navigation from './Navigation';

import startDB from './database/InitDB.js';

export default function App() {
  useEffect(() => {
    startDB();
  });
  return (
    <Navigation />
  );
}
