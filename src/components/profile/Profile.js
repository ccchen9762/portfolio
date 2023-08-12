import { Row, Col, Button, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
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
        <Row className="mt-4 w-full h-16">
          <TypeAnimation
            sequence={[
              " ",
              "Ching-Chih Chen's base",
            ]}
            wrapper="span"
            speed={50}
            className="codeFont text-5xl inline-block"
            repeat={0}
            cursor={false}
          />
        </Row>
        <Row className="mt-4 w-full h-16">
          <TypeAnimation
            sequence={[
              " ",
              1000,
              "Ching-Chih Chen's base",
            ]}
            wrapper="span"
            speed={50}
            className="codeFont text-3xl inline-block"
            repeat={0}
            cursor={false}
          />
        </Row>
        <Row className="mt-4 w-full h-16">
          <Col className="w-fit h-fi
          t codeFont text-2xl">
            <Button 
              href="https://drive.google.com/file/d/1EQgmAdfQtl8u1Gr8LqeiDikkMSu4i2Rr/view?usp=sharing" 
              target="_blank" 
              style={{fontSize:"20px"}}
              variant="warning"
              className="w-fit h-fit px-3 py-2"
              >
                My Resume
            </Button>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}

export default Profile;