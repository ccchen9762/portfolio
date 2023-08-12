import { Row, Col, Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

function Profile() {
  return(
    <motion.div
      className="w-full h-full box justify-center flex flex-col bg-cover bg-[url('/src/assets/images/top_background.jpg')]"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01]
      }}>
      <Container>
        <Row className="mt-4 px-4 w-full h-fit">
          <TypeAnimation
            sequence={[
              " ",
              "Michael Chen's base",
            ]}
            wrapper="span"
            speed={50}
            className="codeFont text-5xl inline-block"
            repeat={0}
            cursor={false}
          />
        </Row>
        <Row className="mt-4 px-4 w-full h-fit">
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.4,
              ease: [0, 0.71, 0.2, 1.01]
            }}>
            <p className="codeFont text-xl">Master of Science in Computer Science from University of Southern California</p>
          </motion.div>
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 2.6,
              ease: [0, 0.71, 0.2, 1.01]
            }}>
            <p className="codeFont text-xl">Skilled in computer graphics, game, Android and web development.</p>
          </motion.div>
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 4.0,
              ease: [0, 0.71, 0.2, 1.01]
            }}>
            <p className="codeFont text-xl">Fond of music, gaming and traveling.</p>
          </motion.div>
        </Row>
        <Row className="mt-4 px-4 w-full h-fit">
          <TypeAnimation
            sequence={[
              5200,
              "Take a look of my works, and feel free to reach out to me!",
            ]}
            wrapper="span"
            speed={50}
            className="codeFont text-xl inline-block"
            repeat={0}
            cursor={false}
          />
        </Row>
        <Row className="mt-5 px-4 w-full h-16">
          <Col className="w-fit h-fi
          t codeFont text-2xl">
            <motion.div
            className=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 7,
              ease: [0, 0.71, 0.2, 1.01]
            }}>
              <Button 
                href="https://drive.google.com/file/d/1EQgmAdfQtl8u1Gr8LqeiDikkMSu4i2Rr/view?usp=sharing" 
                target="_blank" 
                style={{fontSize:"20px"}}
                variant="warning"
                className="w-fit h-fit px-3 py-2"
                >
                  My Resume
              </Button>
            </motion.div>     
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Profile;