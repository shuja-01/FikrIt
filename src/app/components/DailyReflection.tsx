"use client";

import { useState, useEffect } from "react";
import { Sun } from "lucide-react";

const REFLECTIONS = [
  { quote: `"And He found you lost and guided [you]."`, reference: "Quran 93:7 (Surah Ad-Duhaa)" },
  { quote: `"So verily, with the hardship, there is relief."`, reference: "Quran 94:5 (Surah Ash-Sharh)" },
  { quote: `"He knows what is in every heart."`, reference: "Quran 67:13 (Surah Al-Mulk)" },
  { quote: `"And whoever puts their trust in Allah, He will be enough for them."`, reference: "Quran 65:3 (Surah At-Talaq)" },
  { quote: `"Call upon Me, I will respond to you."`, reference: "Quran 40:60 (Surah Ghafir)" },
  { quote: `"My mercy encompasses all things."`, reference: "Quran 7:156 (Surah Al-A'raf)" },
  { quote: `"Indeed, Allah is with the patient."`, reference: "Quran 2:153 (Surah Al-Baqarah)" },
  { quote: `"If you are grateful, I will surely increase you [in favor]."`, reference: "Quran 14:7 (Surah Ibrahim)" },
  { quote: `"And We have not sent you, [O Muhammad], except as a mercy to the worlds."`, reference: "Quran 21:107 (Surah Al-Anbiyaa)" },
  { quote: `"Allah does not burden a soul beyond that it can bear."`, reference: "Quran 2:286 (Surah Al-Baqarah)" },
  { quote: `"And He is with you wherever you are."`, reference: "Quran 57:4 (Surah Al-Hadid)" },
  { quote: `"Guide us to the straight path."`, reference: "Quran 1:6 (Surah Al-Fatihah)" },
  { quote: `"Do not lose hope, nor be sad."`, reference: "Quran 3:139 (Surah Ali 'Imran)" },
  { quote: `"And your Lord says, 'Call upon Me; I will respond to you.' "`, reference: "Quran 40:60 (Surah Ghafir)" },
  { quote: `"It is You we worship and You we ask for help."`, reference: "Quran 1:5 (Surah Al-Fatihah)" },
  { quote: `"Allah is the Light of the heavens and the earth."`, reference: "Quran 24:35 (Surah An-Nur)" },
];

export default function DailyReflection() {
  const [reflection, setReflection] = useState(REFLECTIONS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Pick a random quote on the client to avoid Next.js hydration mismatch
    const randomIndex = Math.floor(Math.random() * REFLECTIONS.length);
    setReflection(REFLECTIONS[randomIndex]);
    setMounted(true);
  }, []);

  return (
    <div className="md:col-span-2 glass-panel p-8 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold group-hover:w-full transition-all duration-700 opacity-10" />
      <div className="flex items-center gap-2 text-brand-gold mb-4 font-semibold text-sm tracking-uppercase">
         <Sun size={16} /> Daily Reflection
      </div>
      
      {/* Small fade-in ensures smooth entry and hides hydration mismatch */}
      <div className={`transition-opacity duration-700 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-2xl font-serif mb-4 leading-normal">
          {reflection.quote}
        </h3>
        <p className="text-gray-500 text-sm">— {reflection.reference}</p>
      </div>
    </div>
  );
}
