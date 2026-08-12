import Image from "next/image";

const MARQUEE_IMAGES = [
  "/marquee/lookbook-01.jpg",
  "/marquee/lookbook-02.jpg",
  "/marquee/lookbook-03.jpg",
  "/marquee/lookbook-04.jpg",
  "/marquee/lookbook-05.jpg",
];

export default function Home() {
  return (
    <main>
      {/* HERO — visual placeholder until lookbook photography is ready */}
      <section className="relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden px-6 py-20">
        <div className="wireframe-corner left-6 top-6 border-l border-t sm:left-10 sm:top-10" />
        <div className="wireframe-corner right-6 top-6 border-r border-t sm:right-10 sm:top-10" />
        <div className="wireframe-corner bottom-6 left-6 border-b border-l sm:bottom-10 sm:left-10" />
        <div className="wireframe-corner bottom-6 right-6 border-b border-r sm:bottom-10 sm:right-10" />

        <p className="mb-6 font-display text-xs font-bold uppercase tracking-widest2 text-brand-black/50">
          Archive No. 001 — Book Cover Collection
        </p>

        <h1 className="text-center font-display text-[13vw] font-black italic leading-[0.88] tracking-tighter text-brand-black [font-stretch:condensed] sm:text-[9vw] lg:text-[7vw]">
          <span className="text-brand-red">E</span>UN<span className="text-brand-red">Y</span>EON
        </h1>

        <p className="mt-6 max-w-md text-center font-serif text-lg italic text-brand-black/60 sm:text-xl">
          An analog romance for the objects you carry.
          <br />
          Lookbook imagery arriving soon.
        </p>

        <div
          data-cursor-hover
          className="relative mt-14 h-[380px] w-[280px] overflow-hidden border border-brand-black/15 sm:h-[520px] sm:w-[390px]"
        >
          <Image
            src="/hero-lookbook.jpg"
            alt="eunyeon lookbook preview"
            fill
            priority
            className="object-cover"
          />
        </div>

        <a
          href="#archive"
          data-cursor-hover
          className="mt-16 font-display text-xs font-bold uppercase tracking-widest2 text-brand-black/60 transition-colors hover:text-brand-red"
        >
          Scroll to Explore ↓
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-brand-black/10 px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2">
          <h2 className="font-serif text-4xl font-bold italic leading-tight text-brand-black sm:text-5xl">
            Editorial objects,
            <br />
            <span className="text-brand-red">made to be handled.</span>
          </h2>
          <p className="max-w-lg font-display text-sm leading-relaxed text-brand-black/70">
            <span className="text-brand-red">e</span>un<span className="text-brand-red">y</span>eon
            begins with the book cover — a premium, analog-first accessory for
            people who still turn pages. The archive is built to grow: accessories and
            apparel will join the same structure, season by season, without breaking
            what came before.
          </p>
        </div>
      </section>

      {/* GALLERY — right-to-left flowing lookbook strip */}
      <section className="border-t border-brand-black/10 py-16">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-6">
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, index) => (
              <div
                key={`${src}-${index}`}
                data-cursor-hover
                className="relative h-[340px] w-[240px] flex-shrink-0 overflow-hidden border border-brand-black/10 sm:h-[460px] sm:w-[330px]"
              >
                <Image
                  src={src}
                  alt="eunyeon lookbook"
                  fill
                  className="object-cover"
                  sizes="330px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section id="archive" className="border-t border-brand-black/10 bg-brand-black px-6 py-24 text-brand-off sm:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl font-bold italic sm:text-4xl">
              Category Archive
            </h2>
            <p className="font-display text-xs font-bold uppercase tracking-widest2 text-brand-off/50">
              Book Cover — Live / Accessories — Soon / Apparel — Soon
            </p>
          </div>
          <div className="grid gap-px overflow-hidden border border-brand-off/15 sm:grid-cols-3">
            {["Book Cover", "Accessories", "Apparel"].map((category, index) => (
              <div
                key={category}
                data-cursor-hover
                className="flex h-52 flex-col items-center justify-center gap-2 border border-brand-off/15 bg-brand-black transition-colors duration-300 hover:bg-brand-red/10"
              >
                <span className="font-serif text-2xl italic">{category}</span>
                <span className="font-display text-[10px] font-bold uppercase tracking-widest2 text-brand-off/40">
                  {index === 0 ? "Available Now" : "Coming Soon"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-brand-black/10 px-6 py-10 text-center sm:px-10">
        <p className="font-display text-[11px] font-bold uppercase tracking-widest2 text-brand-black/40">
          © 2026 eunyeon — eunyeon040321@gmail.com
        </p>
      </footer>
    </main>
  );
}
