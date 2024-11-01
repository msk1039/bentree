import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { motion } from "framer-motion";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  const location = "Pune";

  const navLinks = [
    { name: "About Us", href: "/", delay: 0.2 },
    { name: "Contact", href: "/", delay: 0.3 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const separatorVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer 
      ref={footerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full py-16 px-4 bg-gradient-to-b from-[#898985]/5 to-[#898985]/10 overflow-hidden"
    >
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-[#898985] tracking-wide">
            Build your corner on the World Wide Internet!
          </h2>
        </motion.div>

        <motion.div
          variants={separatorVariants}
          className="relative"
        >
          <Separator className="my-8 bg-[#898985]/20" />
        </motion.div>

        <motion.div 
          className="flex flex-col items-center space-y-10"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-2 text-[#898985] text-base font-light"
          >
            <span>Crafted in {location}. Built for Academicians.</span>
          </motion.div>

          <motion.nav 
            className="flex flex-wrap justify-center gap-8 text-sm text-[#898985]"
            variants={containerVariants}
          >
            {navLinks.map((link, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                custom={index}
              >
                <Link 
                  href={link.href} 
                  className="hover:underline transition-all duration-300 text-sm font-light"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;