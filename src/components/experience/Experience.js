import React from "react";
import { Row } from "react-bootstrap";
import { motion } from "framer-motion";
import Career from "./Career.js";

import careerInfo from "../../assets/data/CareerInfo.json"

function Experience() {
  const len = careerInfo.careers.length;
  const CareerBlocks = () => {
    const blocks = [];
    for (let i = 0; i < len; i++) {
      blocks.push(
        <Career key={i} index={i} />
      );
    }
    return blocks;
  };

  return (
    <motion.div
      className="box w-full h-fit px-1 md:px-5 bg-black bg-opacity-50"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01]
      }}>
      <Row className="w-full h-fit m-0 p-0">
        <h3 className="text-yellow-300 text-4xl text-center mt-5 Monstserrat truncate">EXPERIENCES</h3>
      </Row>
      {CareerBlocks()}
    </motion.div>
  );
}

export default Experience;