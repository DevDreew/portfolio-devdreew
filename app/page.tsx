import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Stack } from '@/components/sections/Stack';
import { Projects } from '@/components/sections/Projects';
import { GitHub } from '@/components/sections/GitHub';
import { Certificates } from '@/components/sections/Certificates';
import { Profile } from '@/components/sections/Profile';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <GitHub />
        <Certificates />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
