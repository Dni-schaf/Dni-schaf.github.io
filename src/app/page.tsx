import Hero from "@/components/Hero/Hero";
import Panel from "@/components/Panel/Panel";
import Text from "@/components/Text/Text";

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
      <Panel imgSrc="/images/Post1a.svg" imgAltText="panel 2" height="half">
        <Text
          positionTop={10}
          positionRight={20}
          positionBottom={30}
          positionLeft={120}
        >
          Bitte, Kapitän, es ist äußerst dringend, sonst wären wir nicht hier!
        </Text>
      </Panel>
    </>
  );
}
