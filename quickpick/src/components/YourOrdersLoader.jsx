import React from "react";
import { motion } from "framer-motion";

function YourOrdersLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-brown-700">
      <motion.div
        className="relative flex flex-col items-center"
        animate={{
          rotate: [0, 15, 0], // Shopping bag swaying
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        {/* Coffee-Colored Shopping Bag */}
        <div className="w-24 h-28 bg-[#e8bd7c] rounded-t-lg shadow-xl relative">
          {/* Upward Circular Handle */}
          <div className="absolute top-[-27px] left-[15px] w-16 h-8 bg-transparent border-4 border-t-transparent border-[#e3b269] rounded-full transform rotate-180 overflow-hidden" />
          <div className="absolute h-2 w-2 rounded-full bg-white left-[5px] top-[5px]" />
          <div className="absolute h-2 w-2 rounded-full bg-white right-[5px] top-[5px]" />
          {/* <div className="text-[#78533c] text-[18px] font-bold absolute left-2 bottom-2">Quickpick</div> */}
        </div>

        {/* Quickpick Text */}
        <motion.div
          className="text-[#3E2B1F] text-[18px] font-bold absolute bottom-2"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          Quickpick
        </motion.div>
      </motion.div>
    </div>
  );
}

export default YourOrdersLoader;
