import Image from "next/image";
import Nav from "@/components/Nav";
import HeroVideo from "@/components/HeroVideo";
import FadeInSection from "@/components/FadeInSection";

const WHATSAPP_NUMBER = "5562984136020";
const WHATSAPP_MSG = encodeURIComponent(
  "Ola! Vim pelo site da Florada Fonte de Mel e gostaria de saber mais sobre o mel do cerrado. 🍯"
);

const galleryImages = [
  {
    src: "/images/gallery/our honey jar with flowers.jpg",
    alt: "Pote de mel Florada com flores secas",
    span: "",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/florada fonte de mel honey jar in hand macro.jpg",
    alt: "Pote de mel puro na mao contra o cerrado",
    span: "",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/honey jar  lake background.jpg",
    alt: "Potes de mel Florada com lago ao fundo",
    span: "",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/several honey jars together.jpg",
    alt: "Varios potes de mel Florada na prateleira",
    span: "col-span-2",
    aspect: "aspect-[2/1]",
  },
  {
    src: "/images/gallery/bee beard stunt picture of mom.jpg",
    alt: "Lucimar com barba de abelhas — demonstracao de confianca",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/mom holding a large honey comb filled with bees different angle.jpg",
    alt: "Lucimar segurando favo de mel com abelhas",
    span: "",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/mom holding a large honey comb filled with bees.jpg",
    alt: "Lucimar no apiario com favo de mel",
    span: "",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/honey jar .jpg",
    alt: "Pote de mel Florada Fonte de Mel",
    span: "",
    aspect: "aspect-[3/4]",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      {/* ─── HERO ─── */}
      <section
        id="inicio"
        className="relative h-screen flex items-end justify-center overflow-hidden pb-24 md:pb-32"
      >
        <HeroVideo />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <Image
            src="/images/logo/logo.png"
            alt="Florada Fonte de Mel"
            width={120}
            height={120}
            className="mx-auto mb-6 drop-shadow-2xl"
            priority
          />
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
            Florada Fonte de Mel
          </h1>
          <p className="text-xl md:text-2xl text-honey/90 mt-3 font-medium drop-shadow-md">
            Mel puro do cerrado goiano
          </p>
          <a
            href="#historia"
            className="inline-block mt-10 animate-honey-drip"
            aria-label="Rolar para baixo"
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

      {/* ─── NOSSA HISTORIA ─── */}
      <section id="historia" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <p className="font-accent text-honey text-xl mb-2">
              Desde os anos 80
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-6">
              Nossa Historia
            </h2>
            <div className="w-16 h-1 bg-honey rounded-full mb-12" />
          </FadeInSection>

          {/* Block 1 — Origins */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <FadeInSection>
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/gallery/black and white old picture of mom in her early days beekeeping .jpg"
                  alt="Lucimar jovem nos primeiros dias com as abelhas"
                  width={800}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </FadeInSection>
            <FadeInSection className="space-y-6">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-forest">
                Nascida no campo, criada entre abelhas
              </h3>
              <p className="text-earth-light leading-relaxed text-lg">
                Lucimar nasceu na fazenda em Goias, filha de desbravadores que
                vieram de Minas com a cara e a coragem. Aos 18 anos, numa noite
                de &ldquo;melar&rdquo; no mato, ouviu o som das abelhas e nunca
                mais se separou delas.
              </p>
              <p className="text-earth-light leading-relaxed text-lg">
                O que comecou como encantamento virou profissao, sustento e
                missao de vida. Ha mais de 40 anos, Lucimar cuida das abelhas
                africanizadas do cerrado — colhendo mel de flores nativas como
                cipozinho, acapeixe e angico.
              </p>
              <blockquote className="border-l-4 border-honey pl-4 italic text-forest font-accent text-xl">
                &ldquo;Parece que elas nao me deixam. Se eu boto uma caixa no
                chao, quando eu volto ja tem um enxame dentro.&rdquo;
              </blockquote>
            </FadeInSection>
          </div>

          {/* Block 2 — Bees & Mission */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection className="space-y-6 md:order-2">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-forest">
                Sem abelha, sem vida
              </h3>
              <p className="text-earth-light leading-relaxed text-lg">
                As abelhas sao responsaveis por 70% de toda a polinizacao no
                planeta. O mel que produzem e a menor das suas contribuicoes —
                o verdadeiro presente e a vida que sustentam em cada flor
                visitada.
              </p>
              <p className="text-earth-light leading-relaxed text-lg">
                Cada pote de mel carrega a assinatura da florada — a cor, o
                sabor e o aroma mudam conforme a origem floral. Mel de cipozinho
                e claro e delicado. Mel de flores mistas do cerrado e escuro e
                encorpado. As abelhas sao fieis: uma vez que escolhem uma flor,
                nao mudam ate esgotar a fonte.
              </p>
              <div className="flex gap-8 pt-4">
                <div className="text-center">
                  <span className="block font-display text-3xl font-bold text-honey">
                    40+
                  </span>
                  <span className="text-sm text-earth-light">
                    anos de apicultura
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-display text-3xl font-bold text-honey">
                    3
                  </span>
                  <span className="text-sm text-earth-light">geracoes</span>
                </div>
                <div className="text-center">
                  <span className="block font-display text-3xl font-bold text-honey">
                    70%
                  </span>
                  <span className="text-sm text-earth-light">
                    da polinizacao
                  </span>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection className="md:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="/images/about/auleo_ultra_realistic_honey_bee_in_flight_side_profile_wings_sp_d462204d-4261-4a76-8219-2bfc58b1a4ed.png"
                  alt="Abelha em voo sobre o cerrado"
                  width={800}
                  height={800}
                  className="w-full object-cover"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── GALERIA ─── */}
      <section id="galeria" className="py-24 md:py-32 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <p className="font-accent text-honey text-xl mb-2">
              Do apiario ao pote
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-6">
              Galeria
            </h2>
            <div className="w-16 h-1 bg-honey rounded-full mb-12" />
          </FadeInSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((img, i) => (
              <FadeInSection
                key={i}
                className={`gallery-item overflow-hidden rounded-xl shadow-lg ${img.span}`}
              >
                <div className={`relative w-full ${img.aspect}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NA MIDIA ─── */}
      <section id="midia" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <p className="font-accent text-honey text-xl mb-2">
              Florada no mundo
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-6">
              Na Midia
            </h2>
            <div className="w-16 h-1 bg-honey rounded-full mb-12" />
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Agrovivendo interview — REPLACE VIDEO_ID with actual YouTube ID */}
            <FadeInSection>
              <a
                href="https://www.youtube.com/@Agrovivendo"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden shadow-xl bg-earth group hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src="/images/about/auleo_top_down_view_of_honeycomb_with_golden_honey_dripping_slo_402d86d1-7d95-4e10-9d7e-7f349f915e30.png"
                    alt="Agrovivendo — Florada Fonte de Mel"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A4D2E">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-honey font-accent text-lg">
                    Agrovivendo
                  </span>
                  <h3 className="font-display text-xl font-semibold text-cream mt-1">
                    A historia da Florada Fonte de Mel
                  </h3>
                  <p className="text-cream/70 mt-2 text-sm leading-relaxed">
                    Entrevista completa com Lucimar e Aurelio sobre mais de 40
                    anos de apicultura no cerrado goiano, tradicao familiar e a
                    uniao entre natureza e tecnologia.
                  </p>
                </div>
              </a>
            </FadeInSection>

            {/* TeslaVision — "Honey From the Future" */}
            <FadeInSection>
              <a
                href="https://www.notateslaapp.com/news/3260/tesla-announces-winner-of-teslavision-contest-winning-video-behind-the-scenes-look"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden shadow-xl bg-earth group hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src="/images/about/auleo_honey_bee_covered in honey_mid-flight_with_tiny_golden_honey_droplet_pure__9e98076d-9619-4aeb-a41a-5eea128fe1bb.png"
                    alt="Honey From the Future — TeslaVision"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A4D2E">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-honey font-accent text-lg">
                    TeslaVision Contest
                  </span>
                  <h3 className="font-display text-xl font-semibold text-cream mt-1">
                    Vencedor global — &ldquo;Honey From the Future&rdquo;
                  </h3>
                  <p className="text-cream/70 mt-2 text-sm leading-relaxed">
                    O video que uniu abelhas, cerrado e a Cybertruck, vencendo o
                    concurso mundial da Tesla com a forca da comunidade
                    brasileira.
                  </p>
                </div>
              </a>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── CONTATO / FOOTER ─── */}
      <footer id="contato" className="bg-forest text-cream py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Left — CTA */}
              <div>
                <p className="font-accent text-honey text-xl mb-2">
                  Prove o mel do cerrado
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  Entre em contato
                </h2>
                <p className="text-cream/80 text-lg leading-relaxed mb-8 max-w-md">
                  Nosso mel e produzido artesanalmente em Anapolis, Goias, e
                  esta disponivel para retirada ou entrega. Fale conosco pelo
                  WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
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
                  Pedir pelo WhatsApp
                </a>
              </div>

              {/* Right — Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl font-semibold text-honey mb-3">
                    Localizacao
                  </h3>
                  <p className="text-cream/80 leading-relaxed">
                    Anapolis — GO
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-honey mb-3">
                    Redes sociais
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
                    Telefone
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
              &copy; 2026 Florada Fonte de Mel. Todos os direitos reservados.
            </p>
            <p className="font-accent text-cream/30 text-lg">
              Sem abelha, sem vida.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
