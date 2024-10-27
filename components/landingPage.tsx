"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  //   const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ">
      {/* Navbar with blur effect */}
      <motion.nav
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        className="fixed w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              <Link href="/">edbn</Link>
            </motion.div>
            <div className="flex items-center gap-4">
              <Link href="/user/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/user/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm mb-8"
          >
            ✨ Introducing edbn Platform →
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 text-gray-900 dark:text-white"
          >
            Your Academic Legacy,
            <br />
            Beautifully Showcased
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#898985] dark:text-gray-400 text-xl mb-12 max-w-3xl mx-auto"
          >
            Create stunning portfolio pages that highlight your academic
            journey, research, and achievements. Perfect for educators and
            professors who want to make their mark in academia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button size="lg" className="text-lg px-8 py-6">
              <Link href="/user/signup">Get Started for free →</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid */}
      {/* <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Research Showcase"
            description="Display your research papers, publications, and academic contributions in an elegant format."
            icon={BookOpen}
            delay={0.8}
          />
          <FeatureCard
            title="Social Integration"
            description="Connect all your professional social media handles and academic profiles in one place."
            icon={Share2}
            delay={0.9}
          />
          <FeatureCard
            title="Achievement Timeline"
            description="Create a beautiful timeline of your academic achievements and milestones."
            icon={Award}
            delay={1.0}
          />
          <FeatureCard
            title="Experience Highlights"
            description="Showcase your teaching experience, research projects, and academic leadership roles."
            icon={Briefcase}
            delay={1.1}
          />
        </div>
      </motion.section> */}

      <motion.section
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="relative lg:row-span-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* <div className="absolute inset-px rounded-lg bg-[#f3f3f2] lg:rounded-l-[2rem]"></div> */}
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)] bg-[#f3f3f2]">
                  <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      className="text-[#898985] text-xl mb-12 max-w-3xl mx-auto"
                    >
                      Create a beautiful timeline of your academic achievements
                      and milestones.
                    </motion.p>
                  </div>
                  <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                    <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] bg-gray-900 shadow-2xl">
                      {/* <img
                        className="size-full object-cover object-top"
                        src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                        alt=""
                      /> */}
                      {/* <Image
                        className="w-full h-full object-cover object-center"
                        src="https://tailwindui.com/plus/img/component-images/bento-03-mobile-friendly.png"
                        alt="Research papers"
                        layout="fill"
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative max-lg:row-start-1 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-px rounded-lg bg-[#f3f3f2] max-lg:rounded-t-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] bg-[#f3f3f2]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="text-[#898985] text-xl mb-12 max-w-3xl mx-auto"
                    >
                      Showcase your teaching experience, research projects, and
                      academic leadership roles
                    </motion.p>
                  </div>
                  <div className="relative flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <div className=" absolute bottom-0 left-10 right-0 top-5 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                      <Image
                        className="w-full h-full object-cover object-center"
                        src="/paper.jpg"
                        alt="Research papers"
                        layout="fill"
                      />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-px rounded-lg bg-[#f3f3f2]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] bg-[#f3f3f2]">
                  <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className="text-[#898985] text-xl mb-12 max-w-3xl mx-auto"
                    >
                      Connect all your professional social media handles and
                      academic profiles in one place.
                    </motion.p>
                  </div>
                  <div className="flex flex-1 relative items-center  max-lg:py-6 lg:pb-2">
                  <div className=" absolute bottom-0 left-10 right-0 top-5 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                      <Image
                        className="w-full h-full object-cover object-center"
                        src="/paper.jpg"
                        alt="Research papers"
                        layout="fill"
                      />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="relative lg:row-span-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-px rounded-lg bg-[#f3f3f2] max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)] bg-[#f3f3f2]">
                  <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="text-[#898985] text-xl mb-12 max-w-3xl mx-auto"
                    >
                      Display your research papers, publications, and academic
                      contributions in an elegant format.
                    </motion.p>
                  </div>
                  <div className="relative min-h-[30rem] w-full grow">
                    <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                      <Image
                        className="w-full h-full object-cover object-center"
                        src="/paper.jpg"
                        alt="Research papers"
                        layout="fill"
                      />
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default LandingPage;
