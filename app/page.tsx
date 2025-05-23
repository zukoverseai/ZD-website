"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { Brain, Code, Cpu, Database, Globe, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { ParticlesContainer } from "@/components/particles-container";
import { TypingEffect } from "@/components/typing-effect";
import { NeonButton } from "@/components/neon-button";
import { CyberCard } from "@/components/cyber-card";
import { HolographicHero } from "@/components/holographic-hero";
import { CyberGrid } from "@/components/cyber-grid";
import { useInView } from "react-intersection-observer";

import { CyberCalendar } from "@/components/ui/cyber-calendar";
import { audiowide } from "@/app/fonts";

function getOrdinalSuffix(i: number): string {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

function formatDate(date: Date): string {
  const day = date.getDate();
  const ordinal = getOrdinalSuffix(day);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${weekday} ${day}${ordinal} ${month} ${year}`;
}

export default function Home() {
  // Calendar date selection state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  // Time slot selection state
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );
  // Contact info state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  // Example time slots every 30 minutes from 9am to 5pm
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const totalMins = 9 * 60 + i * 30;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    const ampm = h < 12 ? "AM" : "PM";
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    const minuteStr = m.toString().padStart(2, "0");
    return `${displayHour}:${minuteStr} ${ampm}`;
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateMouseAngle = () => {
    if (!heroRef.current) return { x: 0, y: 0 };

    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the angle between mouse and center
    const dx = mousePosition.x - centerX;
    const dy = mousePosition.y - centerY;

    // Normalize the movement (reduce the effect)
    return {
      x: dx / 100,
      y: dy / 100,
    };
  };

  const mouseAngle = calculateMouseAngle();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a12]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden bg-[#0a0a12] py-20 md:pt-20 md:pb-0"
      >
        <ParticlesContainer />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-transparent to-[#0a0a12] z-10"></div>

        <div className="container relative z-20 flex h-full items-center px-4 md:px-6">
          <div className="flex w-full flex-col items-center space-y-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              style={{
                transform: `perspective(1000px) rotateX(${
                  mouseAngle.y
                }deg) rotateY(${-mouseAngle.x}deg)`,
                transformStyle: "preserve-3d",
              }}
              className="relative w-48 md:w-64"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-70 blur-lg"></div>
              <Image
                src="/images/logo.png"
                alt="Zoftware Development Logo"
                width={300}
                height={300}
                className="relative w-full drop-shadow-[0_0_15px_rgba(62,206,247,0.5)]"
                priority
              />
            </motion.div>

            <div className="space-y-4">
              <h1
                className={`${audiowide.className} text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl`}
              >
                <TypingEffect
                  text="Anything is possible with Zoftware"
                  speed={100}
                />
              </h1>
              {/*
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mx-auto max-w-[700px] text-gray-300 md:text-xl"
              >
                We build cutting-edge software solutions that transform
                businesses and drive growth.
              </motion.p>
              */}
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <Link href="#projects">
                <NeonButton color="cyan">View Our Projects</NeonButton>
              </Link>
              <Link href="#contact">
                <NeonButton color="green" variant="outline">
                  Contact Us
                </NeonButton>
              </Link>
            </motion.div>
          </div>
        </div>

        <HolographicHero />
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        id="services"
        className="relative overflow-hidden py-16 md:py-24"
      >
        <div className="absolute inset-0 bg-[#0a0a12]"></div>
        <CyberGrid />

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2
                className={`${audiowide.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white`}
              >
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                  Services
                </span>
              </h2>

              {/* <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                We offer a comprehensive range of software development services
              </p> */}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
          >
            <motion.div variants={itemVariants}>
              <CyberCard
                icon={<Globe className="h-8 w-8" />}
                title="Web Development"
                description="Custom web applications and responsive websites built with modern frameworks."
                color="cyan"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CyberCard
                icon={<Smartphone className="h-8 w-8" />}
                title="Mobile Development"
                description="Native and cross-platform mobile applications for iOS and Android."
                color="green"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CyberCard
                icon={<Brain className="h-8 w-8" />}
                title="AI Solutions"
                description="Intelligent applications powered by machine learning and artificial intelligence."
                color="cyan"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CyberCard
                icon={<Database className="h-8 w-8" />}
                title="Database Design"
                description="Scalable and efficient database architectures for your applications."
                color="green"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CyberCard
                icon={<Code className="h-8 w-8" />}
                title="Custom Software"
                description="Bespoke software solutions tailored to your specific business needs."
                color="cyan"
              />
            </motion.div>

            {/* <motion.div variants={itemVariants}>
              <CyberCard
                icon={<Cpu className="h-8 w-8" />}
                title="IoT Development"
                description="Connected device solutions and Internet of Things applications."
                color="green"
              />
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        id="projects"
        className="relative overflow-hidden py-16 md:py-24"
      >
        <div className="absolute inset-0 bg-[#0a0a12]"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-transparent to-[#0a0a12]"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h2
                className={`${audiowide.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white`}
              >
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                  Projects
                </span>
              </h2>
              {/* <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Explore our portfolio of successful projects and innovative
                solutions
              </p> */}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* MASA Reset System - First fully paid & retained project */}
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="MASA Reset System"
                description="Landing page for a specialized fitness platform for Arabs integrating tailored workout plans, customized diets, and community accountability via private WhatsApp groups and 1-on-1 support."
                tags={[
                  "HTML5/CSS3",

                  "Vanilla JS",
                  "Stripe",
                  "@vercel/analytics",
                  "Node.js",
                  "Vercel",

                  "Typeform",
                  "Vimeo Player API",
                  "Font Awesome",
                  "Flubber",
                  "Google Fonts",

                  "Facebook Pixel",
                  "Hotjar",
                ]}
                imageUrl="/images/masa-logo.png"
                ctaUrl="https://www.masa.fitness/"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="HealthTech AI Platform"
                description="An AI-powered platform for healthcare providers to analyze patient data and improve care outcomes."
                tags={["AI", "Healthcare", "React", "Python"]}
                imageUrl="/placeholder.svg?height=400&width=600"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="E-commerce Mobile App"
                description="A feature-rich mobile shopping application with personalized recommendations and secure payments."
                tags={["Mobile", "React Native", "Node.js"]}
                imageUrl="/placeholder.svg?height=400&width=600"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="Smart City Dashboard"
                description="Real-time monitoring dashboard for city infrastructure with IoT integration and data visualization."
                tags={["IoT", "Dashboard", "Next.js"]}
                imageUrl="/placeholder.svg?height=400&width=600"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="Financial Analytics Tool"
                description="Advanced analytics platform for financial institutions to process and visualize complex data sets."
                tags={["Finance", "Data", "Vue.js", "Python"]}
                imageUrl="/placeholder.svg?height=400&width=600"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="Logistics Management System"
                description="End-to-end logistics platform with route optimization and real-time tracking capabilities."
                tags={["Logistics", "Maps API", "React", "Node.js"]}
                imageUrl="/placeholder.svg?height=400&width=600"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProjectCard
                title="Educational Learning Platform"
                description="Interactive e-learning platform with progress tracking and personalized learning paths."
                tags={["Education", "Angular", "Firebase"]}
                imageUrl="/placeholder.svg?height=400&width=600"
              />
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <NeonButton color="cyan">View All Projects</NeonButton>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-[#0a0a12]"></div>
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-8"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-[#0a0a12]"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2
                className={`${audiowide.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white`}
              >
                Contact{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]">
                  Us
                </span>
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Get in touch with our team to discuss your project requirements
              </p>
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-lg bg-[#0f0f1a] p-8 border border-[#1a1a2e] shadow-[0_0_15px_rgba(62,206,247,0.15)]"
            >
              <CyberCalendar />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#3ecef7]/10 p-3 border border-[#3ecef7]/30 shadow-[0_0_10px_rgba(62,206,247,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#3ecef7]"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Phone</h3>
                  <p className="text-gray-300">+1 (613) 882-1225</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#7deb7d]/10 p-3 border border-[#7deb7d]/30 shadow-[0_0_10px_rgba(125,235,125,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#7deb7d]"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Email</h3>
                  <p className="text-gray-300">zoftwaredevelopment@yahoo.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#3ecef7]/10 p-3 border border-[#3ecef7]/30 shadow-[0_0_10px_rgba(62,206,247,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#3ecef7]"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Address</h3>
                  <p className="text-gray-300">
                    Toronto, ON (Remote work accepted!)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-[#7deb7d]/10 p-3 border border-[#7deb7d]/30 shadow-[0_0_10px_rgba(125,235,125,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#7deb7d]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">
                    Business Hours
                  </h3>
                  <p className="text-gray-300">Monday - Sunday: 9am - 6pm</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-[#080810] py-8 md:py-12">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-8 opacity-20"></div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/images/just-logo.png"
                alt="Zoftware Development Logo"
                width={40}
                height={40}
              />
              <span className="text-lg font-bold text-white">
                Zoftware Development
              </span>
            </div>

            <p className="text-center text-sm text-gray-400 md:text-left">
              © {new Date().getFullYear()} Zoftware Development. All rights
              reserved.
            </p>

            <div className="flex gap-4">
              {/* Facebook */}
              {/* <Link href="#" className="group relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0f1a] text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </div>
              </Link> */}
              {/* X */}
              <Link
                href="https://x.com/zoftwared"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0f1a] text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    {/* Font Awesome Free 6.7.2 by @fontawesome */}
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </div>
              </Link>
              {/* LinkedIn */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0f1a] text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
              </Link>
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/zoftwaredevelopment"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0f1a] text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </Link>
              {/* GitHub */}
              <Link href="#" className="group relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] opacity-0 blur transition duration-300 group-hover:opacity-70"></div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0f0f1a] text-gray-400 transition-colors duration-300 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    {/* Font Awesome Free 6.7.2 by @fontawesome */}
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
