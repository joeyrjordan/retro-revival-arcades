"use client";

import { Luckiest_Guy } from "next/font/google";
import Script from "next/script";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});

export default function ArcadeSite() {
  function Navbar() {
    const [open, setOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <nav
        className={`fixed top-0 left-0 w-full z-50 ${luckiestGuy.className} transition-all duration-500
        ${
          scrolled
            ? "backdrop-blur-md bg-black/50 border-b border-white/10 navbar-glow"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-24 h-auto" />
          </div>

          {/* DESKTOP MENU */}
          <div
            className={`hidden md:flex gap-10 text-lg text-gray-300 ${luckiestGuy.className}`}
          >
            <a
              href="#"
              className="hover:text-teal-400 hover:drop-shadow-[0_0_6px_#14b8a6] hover:scale-110 transition"
            >
              Home
            </a>

            <a
              href="#showcase"
              className="hover:text-teal-400 hover:drop-shadow-[0_0_6px_#14b8a6] hover:scale-110 transition"
            >
              Showcase
            </a>

            <a
              href="#contact"
              className="hover:text-teal-400 hover:drop-shadow-[0_0_6px_#14b8a6] hover:scale-110 transition"
            >
              Contact
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-black/90 px-6 pb-6 space-y-4 text-gray-300 text-lg">
            <a href="#" className="block hover:text-teal-400">
              Home
            </a>

            <a href="#showcase" className="block hover:text-teal-400">
              Showcase
            </a>

            <a href="#contact" className="block hover:text-teal-400">
              Contact
            </a>
          </div>
        )}
      </nav>
    );
  }

  function ContactForm() {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);

    async function handleSubmit(
      e: React.FormEvent<HTMLFormElement>
    ) {
      e.preventDefault();
      setLoading(true);
      setSuccess(false);

      const formData = new FormData(e.currentTarget);

      const token = (window as any).turnstile?.getResponse();

      if (token) {
        formData.append("cf-turnstile-response", token);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      setLoading(false);

      if (res.ok) {
        setSuccess(true);
        formRef.current?.reset();

        if ((window as any).turnstile) {
          (window as any).turnstile.reset();
        }
      } else {
        console.error(await res.text());
      }
    }

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-5"
      >
        <Input
          name="name"
          placeholder="Your Name"
          className="bg-black/60 border-teal-500/30"
          required
        />

        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          className="bg-black/60 border-teal-500/30"
          required
        />

        <Textarea
          name="message"
          placeholder="Your Message..."
          className="bg-black/60 border-teal-500/30"
          required
        />

        {/* TURNSTILE */}
        <div className="flex justify-center">
          <div
            className="cf-turnstile"
            data-sitekey="0x4AAAAAADAa3WD4Sp0P1ByD"
            data-theme="dark"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 shadow-[0_0_20px_rgba(20,184,166,0.4)]"
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>

        {success && (
          <p className="text-center text-green-400 mt-4">
            Message sent successfully! We’ll get back to you soon.
          </p>
        )}
      </form>
    );
  }

  function AnimatedCard({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) {
    const ref = useRef(null);

    const isInView = useInView(ref, {
      once: true,
      margin: "-100px",
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  }

  const showcaseItems = [
    { title: "Fighting", video: "/fighting.mp4" },
    { title: "Linked Racing", video: "/racing.mp4" },
    { title: "Shooting", video: "/shooting.mp4" },

    { title: "Linked Motorcycle", video: "/motorcycle.mp4" },
    {
      title: "True Force Feedback",
      video: "/ffb.mp4",
    },
    {
      title: "Updater App (Beta Testing)",
      video: "/updater.mp4",
    },

    { title: "Virtual Pinball", image: "/pinball.jpg" },
    { title: "Kiosks", image: "/kiosk.jpg" },
    { title: "Jukeboxes", video: "/jukebox.mp4" },

    { title: "Working Payphones", image: "/payphone.jpg" },
    { title: "Props", image: "/props.jpg" },
    { title: "Custom Artwork", image: "/artwork.jpg" },

    { title: "Plug-N-Play Game Drives", image: "/drives.jpg" },
    { title: "Pre-Built PCs", image: "/pcs.jpg" },
    {
      title: "Mods for At-Home Arcades",
      image: "/mods.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white overflow-x-hidden">
      <Navbar />

      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />

      {/* HERO */}
      <section className="relative h-[75vh] md:h-screen pt-20 flex items-center justify-center text-center px-6 overflow-hidden">
        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/25" />
      </section>

      {/* TAGLINE */}
      <div className="text-center py-10 bg-black">
        <h2
          className={`text-4xl md:text-6xl text-teal-400 ${luckiestGuy.className} arcade-flicker`}
        >
          The options are limitless!
        </h2>
      </div>

      {/* SHOWCASE */}
      <section id="showcase" className="py-12">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-5xl text-teal-400 ${luckiestGuy.className}`}
          >
            Showcase
          </h2>

<p
  className={`text-gray-400 mt-4 max-w-2xl mx-auto px-6 text-lg ${luckiestGuy.className}`}
>
  From authentic linked arcade experiences to custom
  entertainment builds, every project is designed with
  immersion, reliability, and retro authenticity in mind.
</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-center">
{showcaseItems.map((item, index) => (
  <AnimatedCard key={index} delay={index * 0.05}>
    <div>

      {item.video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="rounded-2xl w-full h-48 object-cover border border-teal-500/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]"
        >
          <source src={item.video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={item.image}
          alt={item.title}
          className="rounded-2xl w-full h-48 object-cover border border-teal-500/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]"
        />
      )}

      <p
        className={`mt-4 text-lg text-gray-200 ${luckiestGuy.className}`}
      >
        {item.title}
      </p>

    </div>
  </AnimatedCard>
))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-20">
        <h2
          className={`text-4xl md:text-5xl text-center mb-12 text-teal-400 ${luckiestGuy.className} neon-pulse`}
        >
          Contact Us
        </h2>

        <ContactForm />
      </section>

      {/* FOOTER */}
      <footer
        className={`text-center py-8 text-gray-500 ${luckiestGuy.className}`}
      >
        © {new Date().getFullYear()} Retro Revival Arcades
      </footer>
    </div>
  );
}