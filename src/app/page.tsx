import Hero from "@/components/Hero/Hero";
import Panel from "@/components/Panel/Panel";

export default function Home() {
  return (
    <>
      <main>
        <Hero
          capital="1"
          heading="Aus heiterem Himmel"
          location="Melbourne, Australien, 11. Oktober 1910"
          imageSrc="/images/Post1a.svg"
          imageAltText="blah blah"
        />
      </main>
      <Panel imgSrc="/images/Post1a.svg" imgAltText="panel 2" height="half" />
    </>
  );
}
