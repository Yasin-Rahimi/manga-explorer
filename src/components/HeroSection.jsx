import HeroBanner from "./HeroBanner";

export default function HeroSection({ mangas }) {
  return (
    <section className="px-10 py-10">
      <HeroBanner mangas={mangas} />
    </section>
  );
}