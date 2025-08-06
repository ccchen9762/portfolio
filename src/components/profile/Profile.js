import { Row, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

function Profile() {
  return(
    <motion.div
      className="w-full min-h-fit h-full p-0 box flex flex-col"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01]
      }}>
      <Container className="container z-10 mt-12 md:mt-28 !px:8 md:!px-16">
        <Row className="mt-4 mx-auto px-4 w-full h-fit text-amber-200">
          <TypeAnimation
            sequence={[
              " ",
              "Michael Chen",
            ]}
            wrapper="span"
            speed={50}
            className="codeFont text-5xl inline-block"
            repeat={0}
            cursor={false}
          />
        </Row>
        <Row className="mt-5 mx-auto px-4 w-full h-fit text-slate-50">
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.0,
              ease: [0, 0.71, 0.2, 1.01]
            }}>
            <motion.p className="codeFont text-xl">A Passionate Full-stack engineer with a background in Master of Science in Computer Science from University of Southern California.</motion.p>
            <motion.p className="codeFont text-xl">Expertise spans backend infrastructure (Docker, data integration, reliability) and responsive frontend development. </motion.p>
            <motion.p className="codeFont text-xl">Also enjoys exploring the creative challenges of computer graphics and game development.</motion.p>
          </motion.div>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Profile;