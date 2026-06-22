"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import {
  Brain,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description:
      "Artificial intelligence is integrated into every program to help students learn faster, build smarter, and prepare for the future of software engineering.",
  },
  {
    icon: FolderKanban,
    title: "Project-Based Curriculum",
    description:
      "Every student builds real-world applications throughout their learning journey, creating a portfolio that demonstrates practical skills.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Career-Focused Training",
    description:
      "Our curriculum is designed around industry expectations, equipping learners with production-ready skills employers are actively seeking.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship & Community",
    description:
      "Learn alongside ambitious developers, receive guidance from experienced engineers, and grow within a supportive tech ecosystem.",
  },
];

export default function WhyKorvaSection() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background Glow */}

      <div className="absolute left-1/2 top-32 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[180px]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-300">
            Why Korva Tech Hub
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
            Learn Like An Engineer,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build Like A Professional.
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            Korva Tech Hub Academy was created to bridge the gap between
            traditional education and the real demands of the tech industry.
            Our programs combine AI-powered learning, practical projects,
            mentorship, and career preparation to help students become
            job-ready software engineers.
          </p>
          
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:text-white"
            >
              <FaFacebookF size={20} />
            </a>

            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-all duration-300 hover:scale-105 hover:bg-pink-600 hover:text-white"
            >
              <FaInstagram size={20} />
            </a>

            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:text-white"
            >
              <FaLinkedinIn size={20} />
            </a>

            <a
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#1a1a22] text-neutral-300 transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:bg-white/[0.06] hover:-translate-y-2"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-violet-500 shadow-lg shadow-purple-500/30">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 via-violet-900/20 to-purple-900/30 p-10 text-center backdrop-blur-xl"
        >
          <h3 className="text-3xl font-bold text-white">
            Building the next generation of African software engineers.
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-zinc-400 leading-8">
            Whether you're starting from scratch or transitioning into tech,
            Korva Tech Hub provides structured learning paths, practical
            experience, AI-enhanced education, and a thriving community to help
            you grow into a confident software engineer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}