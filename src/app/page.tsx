import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';

export default function Home() {
  return (
    <main>
      <Hero
        capital="1"
        heading="Aus heiterem Himmel"
        location="Melbourne, Australien, 11. Oktober 1910"
        imageSrc="/images/post1a.svg"
        imageAltText="blah blah"
      />
    </main>
  );
}
