import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import { assets } from "../assets/assets";
const logos = [
  assets.microsoft,
  assets.walmart_logo,
  assets.adobe,
  assets.paypal,
];

const Hero = () => {
  return (
    <div>
      <div className="flex text-gray-200 flex-col items-center min-h-screen pt-20 px-4">
        <div className="text-center leading-relaxed flex flex-col gap-6 justify-center items-center mx-auto lg:w-[60%]">
          <h1 className="font-bold text-3xl md:text-5xl">
            Empower your future with the courses designed to{" "}
            <span>fit your choice.</span>
          </h1>
          <p className="max-w-xl">
            We bring together world-class instructors, interactive content, and
            a supportive community to help you achieve your personal and
            professional goals.
          </p>

          {/* ✅ Search Field with Icon & Button Inside */}
          <div className="relative w-full max-w-md">
            {/* Search icon */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />

            {/* Input field */}
            <Input
              type="text"
              placeholder="Search for course..."
              className="pl-10 py-6 pr-24"
            />

            {/* Button inside input */}
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 text-sm bg-transparent border border-gray-600 hover:border-white hover:text-white cursor-pointer py-2 rounded-md transition">
              Search
            </Button>
          </div>
        </div>
        {/* company animate section */}
        <div className="mt-10 overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee-pingpong">
            {[...logos, ...logos].map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="logo"
                className="w-24 h-12 mx-6 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
