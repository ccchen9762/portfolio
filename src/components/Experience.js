import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { motion } from "framer-motion";

function Experience() {
    return (
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <Row className="w-full h-fit m-0 p-0">
          first
        </Row>
        <Row className="w-full h-fit m-0 p-0">
            seoncd          
        </Row>
      </motion.div>
    );
  }
  
  export default Experience;