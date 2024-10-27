import React from 'react';
import { Github, Twitter, Mail, MapPin } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

const Footer = () => {
   const developerName = "Kartik and Mayank", location = "Pune, India"; 
  return (
    <footer className="w-full pb-8 px-4 bg-[#898985]/5">
      {/* Tagline */}
      <Separator className="my-6 bg-[#898985]/20" />
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-[#898985]">
          Jumpstart your corner of the internet today
        </p>
      </div>

      <Separator className="my-6 bg-[#898985]/20" />

      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center space-y-6">
          {/* Developer Credit */}
          <div className="flex items-center space-x-2 text-[#898985]">
            <span>Built by</span>
            <span className="font-semibold hover:text-[#898985]/80 transition-colors cursor-pointer">
              {developerName}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2 text-[#898985]">
            <MapPin size={16} />
            <span>{location}</span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 text-sm text-[#898985]">
            <Link href="/" className="hover:text-[#898985]/80 transition-colors">
              About Us
            </Link>
            <Link href="/" className="hover:text-[#898985]/80 transition-colors">
              Contact
            </Link>
            <Link href="/" className="hover:text-[#898985]/80 transition-colors">
              Privacy
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6 text-[#898985]">
            <Link href="#" className="hover:text-[#898985]/80 transition-colors">
              <Github size={20} />
            </Link>
            <Link href="#" className="hover:text-[#898985]/80 transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="hover:text-[#898985]/80 transition-colors">
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;