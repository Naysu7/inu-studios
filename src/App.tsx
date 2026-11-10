import CustomCursor from '@/components/CustomCursor';
import MusicPlayer from '@/components/MusicPlayer';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Origin from '@/components/sections/Origin';
import Stack from '@/components/sections/Stack';
import Status from '@/components/sections/Status';
import Services from '@/components/sections/Services';
import Games from '@/components/sections/Games';
import QA from '@/components/sections/QA';
import Reviews from '@/components/sections/Reviews';
import Contact from '@/components/sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Origin />
        <Stack />
        <Status />
        <Services />
        <Games />
        <QA />
        <Reviews />
        <Contact />
      </main>
      <MusicPlayer />
    </div>
  );
}
