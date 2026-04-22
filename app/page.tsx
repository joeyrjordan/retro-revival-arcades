"use client";

import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});


import Script from "next/script";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-25 h-35" />
          <span className="text-white font-bold text-lg hidden sm:block">

          </span>
        </div>

        {/* RIGHT: DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-lg text-gray-300">
          <a href="#" className="hover:text-teal-400 hover:drop-shadow-[0_0_6px_#14b8a6] transition">Home</a>
          <a href="#services" className="hover:text-teal-400 hover:drop-shadow-[0_0_6px_#14b8a6] transition">Services</a>
          <a href="#contact" className="hover:text-teal-400 hover:drop-shadow-[0_0_6px_#14b8a6] transition">Contact</a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-black/90 px-6 pb-4 space-y-3 text-gray-300">
          <a href="#" className="block hover:text-teal-400">Home</a>
          <a href="#gallery" className="block hover:text-teal-400">Gallery</a>
          <a href="#contact" className="block hover:text-teal-400">Contact</a>
        </div>
      )}
    </nav>
  );
}


function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
 
<div className="flex justify-center">
  <div
    className="cf-turnstile"
    data-sitekey="0x4AAAAAADAa3WD4Sp0P1ByD"
    data-theme="dark"
  />
</div>

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setSuccess(false);

  const formData = new FormData(e.currentTarget);

  // attach Turnstile token
  const token = (window as any).turnstileToken;

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
    e.currentTarget.reset();

    // reset widget
    if ((window as any).turnstile) {
      (window as any).turnstile.reset();
    }
  } else {
    console.error("Form failed:", await res.text());
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

      {/* TURNSTILE (stable mount target) */}
      <div className="flex justify-center">
        <div
  className="cf-turnstile"
  data-sitekey="0x4AAAAAADAa3WD4Sp0P1ByD"
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
function AnimatedCard({ children, delay = 0 }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
  {/* Background video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero.mp4" type="video/mp4" />
  </video>

  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/25" />

  {/* Content */}
  <div className="relative z-10 max-w-3xl">
 

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-4xl md:text-6xl font-bold mt-10"
    >

    </motion.h1>

    <p className="mt-6 text-lg text-gray-200 max-w-xl mx-auto">

    </p>


  </div>
</section>

<div className="text-center py-10 bg-black">
<h2
  className={`text-4xl md:text-6xl text-teal-400 ${luckiestGuy.className} arcade-flicker`}
>
  The options are limitless!
</h2>
</div>


<div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

  {/* Fighting */}
  <AnimatedCard delay={0}>
    <div>
      <img
        src="/fighting.jpg"
        alt="Fighting Games"
        className="rounded-2xl w-full h-64 object-cover border border-teal-500/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]"
      />
      <p className={`mt-4 text-xl text-gray-200 ${luckiestGuy.className}`}>
        Fighting
      </p>
    </div>
  </AnimatedCard>

  {/* Racing */}
  <AnimatedCard delay={0.1}>
    <div>
      <img
        src="/racing.jpg"
        alt="Racing Games"
        className="rounded-2xl w-full h-64 object-cover border border-teal-500/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]"
      />
      <p className={`mt-4 text-xl text-gray-200 ${luckiestGuy.className}`}>
        Linked Racing
      </p>
    </div>
  </AnimatedCard>

  {/* Shooting */}
  <AnimatedCard delay={0.2}>
    <div>
      <img
        src="/shooting.jpg"
        alt="Shooting Games"
        className="rounded-2xl w-full h-64 object-cover border border-teal-500/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]"
      />
      <p className={`mt-4 text-xl text-gray-200 ${luckiestGuy.className}`}>
        Shooting
      </p>
    </div>
  </AnimatedCard>

</div>

  
 {/* CONTACT */}


<section id="contact" className="px-6 py-20">
<h2 className={`text-4xl md:text-5xl text-center mb-12 text-teal-400 ${luckiestGuy.className} neon-pulse`}>
  Contact Us
</h2>

  <ContactForm />
</section>

      {/* FOOTER */}
<footer className={`text-center py-8 text-gray-500 ${luckiestGuy.className}`}>
  © {new Date().getFullYear()} Retro Revival Arcades
</footer>
    </div>
  );
}
