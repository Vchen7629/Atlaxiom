import { FadeText } from "../../ui/fade-text";
 
export function FadeTextDemo() {
  return (
    <div className="flex flex-col space-y-8 text-center">
      <FadeText
        className=" dark:text-white font-black xs:text-6xl lg:text-6xl 2xl:text-8xl text-gold"
        direction="left"
        framerProps={{
          show: { transition: { delay: 0.2 } },
        }}
        text="Atlaxiom"
    />
    </div>
  );
}