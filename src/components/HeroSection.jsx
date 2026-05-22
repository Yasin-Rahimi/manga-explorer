// HeroSection.jsx

import HeroBanner from "./HeroBanner";

export default function HeroSection({ mangas }) {
    return (
        <section
            className="
                px-3
                py-4
                sm:px-4
                sm:py-6
                md:px-6
                md:py-8
                lg:px-8
                lg:py-10
                xl:px-10
                2xl:px-12
            "
        >
            <HeroBanner mangas={mangas} />
        </section>
    );
}