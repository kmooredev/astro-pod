import './App.css';
import { useState } from 'react';
import NasaImage from './components/NasaImage';

export default function App() {
  const [date, setDate] = useState('');

  return (
    <>
      <h1>Astrology Picture of the Day</h1>
      <h3>Please select the date you want to look up</h3>
      <input
        name="date"
        onChange={(e) => setDate(e.target.value)}
        type="date"></input>
      <NasaImage date={date} />
    </>
  );
}
