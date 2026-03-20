"use client";

import Image from "next/image";
import Nav from "@/components/Nav";
import HeroVideo from "@/components/HeroVideo";
import FadeInSection from "@/components/FadeInSection";
import { useLanguage } from "@/i18n/LanguageContext";

const WHATSAPP_NUMBER = "5562984136020";

const galleryImages = [
  {
    src: "/images/gallery/mom holding a large honey comb filled with bees.jpg",
    altKey: "holding" as const,
  },
  {
    src: "/images/gallery/bee beard stunt picture of mom.jpg",
    altKey: "beeBard" as const,
  },
  {
    src: "/images/gallery/florada fonte de mel honey jar in hand macro.jpg",
    altKey: "jarHand" as const,
  },
  {
    src: "/images/gallery/mom holding a large honey comb filled with bees different angle.jpg",
    altKey: "diffAngle" as const,
  },
  {
    src: "/images/gallery/honey with nuts .jpg",
    altKey: "honeyNuts" as const,
  },
  {
    src: "/images/gallery/our honey jar with flowers.jpg",
    altKey: "jarFlowers" as const,
  },
  {
    src: "/images/gallery/several honey jars together.jpg",
    altKey: "severalJars" as const,
  },
];

export default function Home() {
  const { locale, t } = useLanguage();

  const whatsappMsg = encodeURIComponent(
    locale === "pt"
      ? "Olá! Vim pelo site da Florada Fonte de Mel e gostaria de saber mais sobre o mel do cerrado. 🍯"
      : "Hi! I found you through the Florada Fonte de Mel website and would like to know more about your cerrado honey. 🍯"
  );

  return (
    <>
      <Nav />

      {/* HERO */}
      <section
        id="inicio"
        className="relative h-screen flex items-end justify-center overflow-hidden pb-24 md:pb-32"
      >
        <HeroVideo />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
            {t.hero.title}
          </h1>
          <p className="font-accent text-2xl md:text-3xl text-honey/90 mt-3 [text-shadow:0_2px_8px_rgba(0,0,0,0.7)]">
            {t.hero.subtitle}
          </p>
          <a
            href="#historia"
            className="inline-block mt-10 animate-honey-drip"
            aria-label={t.hero.scrollLabel}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </a>
        </div>
      </section>

      {/* NOSSA HISTÓRIA */}
      <section id="historia" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <p className="font-accent text-honey text-xl mb-2">
              {t.story.since}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-6">
              {t.story.title}
            </h2>
            <div className="w-16 h-1 bg-honey rounded-full mb-12" />
          </FadeInSection>

          {/* Block 1 — Origins */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <FadeInSection>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/gallery/black and white old picture of mom in her early days beekeeping .jpg"
                  alt={t.storyAlts.old}
                  width={800}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </FadeInSection>
            <FadeInSection className="space-y-6">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-forest">
                {t.story.block1Title}
              </h3>
              <p className="text-earth-light leading-relaxed text-lg">
                {t.story.block1P1}
              </p>
              <p className="text-earth-light leading-relaxed text-lg">
                {t.story.block1P2}
              </p>
              <blockquote className="border-l-4 border-honey pl-4 italic text-forest font-accent text-xl">
                {t.story.block1Quote}
              </blockquote>
            </FadeInSection>
          </div>

          {/* Block 2 — Bees & Mission */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection className="space-y-6 md:order-2">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-forest">
                {t.story.block2Title}
              </h3>
              <p className="text-earth-light leading-relaxed text-lg">
                {t.story.block2P1}
              </p>
              <p className="text-earth-light leading-relaxed text-lg">
                {t.story.block2P2}
              </p>
              <div className="flex gap-8 pt-4">
                <div className="text-center">
                  <span className="block font-display text-3xl font-bold text-honey">
                    40+
                  </span>
                  <span className="text-sm text-earth-light">
                    {t.story.stat1Label}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-display text-3xl font-bold text-honey">
                    3
                  </span>
                  <span className="text-sm text-earth-light">
                    {t.story.stat2Label}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-display text-3xl font-bold text-honey">
                    70%
                  </span>
                  <span className="text-sm text-earth-light">
                    {t.story.stat3Label}
                  </span>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection className="md:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/about/auleo_ultra_realistic_honey_bee_in_flight_side_profile_wings_sp_d462204d-4261-4a76-8219-2bfc58b1a4ed.png"
                  alt={t.storyAlts.bee}
                  width={800}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="py-24 md:py-32 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <p className="font-accent text-honey text-xl mb-2">
              {t.gallery.subtitle}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-6">
              {t.gallery.title}
            </h2>
            <div className="w-16 h-1 bg-honey rounded-full mb-12" />
          </FadeInSection>

          <FadeInSection>
            <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="gallery-item overflow-hidden rounded-xl shadow-lg break-inside-avoid"
                >
                  <Image
                    src={img.src}
                    alt={t.galleryAlts[img.altKey]}
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* NA MÍDIA */}
      <section id="midia" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <p className="font-accent text-honey text-xl mb-2">
              {t.media.subtitle}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-6">
              {t.media.title}
            </h2>
            <div className="w-16 h-1 bg-honey rounded-full mb-12" />
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Agrovivendo interview */}
            <FadeInSection>
              <div className="rounded-2xl overflow-hidden shadow-xl bg-earth">
                <div className="relative w-full aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/DIrEm8kbQtA"
                    title="Agrovivendo - Florada Fonte de Mel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <span className="text-honey font-accent text-lg">
                    {t.media.agrovivendo}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-cream mt-1">
                    {t.media.agroTitle}
                  </h3>
                  <p className="text-cream/70 mt-2 text-sm leading-relaxed">
                    {t.media.agroDesc}
                  </p>
                </div>
              </div>
            </FadeInSection>

            {/* TeslaVision */}
            <FadeInSection>
              <div className="rounded-2xl overflow-hidden shadow-xl bg-earth">
                <div className="relative w-full aspect-video">
                  <iframe
                    src="https://www.youtube.com/embed/Yl8WSyjp0T4"
                    title="Honey From the Future - TeslaVision Contest"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <span className="text-honey font-accent text-lg">
                    {t.media.teslaTag}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-cream mt-1">
                    {t.media.teslaTitle}
                  </h3>
                  <p className="text-cream/70 mt-2 text-sm leading-relaxed">
                    {t.media.teslaDesc}
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CONTATO / FOOTER */}
      <footer id="contato" className="bg-forest text-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Left — CTA */}
              <div>
                <p className="font-accent text-honey text-xl mb-2">
                  {t.contact.subtitle}
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  {t.contact.title}
                </h2>
                <p className="text-cream/80 text-lg leading-relaxed mb-8 max-w-md">
                  {t.contact.desc}
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-honey text-earth font-semibold px-8 py-4 rounded-full text-lg hover:bg-amber transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.contact.whatsappBtn}
                </a>
              </div>

              {/* Right — Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl font-semibold text-honey mb-3">
                    {t.contact.location}
                  </h3>
                  <p className="text-cream/80 leading-relaxed">
                    {t.contact.locationValue}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-honey mb-3">
                    {t.contact.social}
                  </h3>
                  <a
                    href="https://www.instagram.com/floradafontedemel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/80 hover:text-honey transition-colors"
                  >
                    @floradafontedemel
                  </a>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-honey mb-3">
                    {t.contact.phone}
                  </h3>
                  <a
                    href="tel:+5562984136020"
                    className="text-cream/80 hover:text-honey transition-colors"
                  >
                    (62) 98413-6020
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/50 text-sm">
              &copy; 2026 {t.contact.copyright}
            </p>
            <p className="font-accent text-cream/30 text-lg">
              {t.contact.tagline}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
