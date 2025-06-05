import { Row, Col, Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';

import OceanCanvas from './OceanCanvas.js'

import links from '../../assets/data/Links.json'
import bgVideo from '../../assets/bg.mp4'

function Profile() {
  return(
    <motion.div
      className="w-full h-fit box flex flex-col"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0, 0.71, 0.2, 1.01]
      }}>
      {/*<video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>*/}
      <OceanCanvas/>
      <Container className="container z-10 mt-28">
        <Row className="mt-4 px-4 w-full h-fit text-amber-200">
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
        <Row className="mt-4 px-4 w-full h-fit text-slate-50">
          <motion.div
            className=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.4,
              ease: [0, 0.71, 0.2, 1.01]
            }}>
            <p className="codeFont text-xl">Master of Science in Computer Science from USC.</p>
            <p className="codeFont text-xl">Experienced in computer graphics, game, Android and web development.</p>
            <p className="codeFont text-xl">Fond of music, gaming and traveling.</p>
          </motion.div>
        </Row>
        <Row className="mt-4 px-4 w-full h-fit text-yellow-200">
          <TypeAnimation
            sequence={[
              2000,
              "Take a look of my works, and feel free to reach out to me!",
            ]}
            wrapper="span"
            speed={75}
            className="codeFont text-xl inline-block"
            repeat={0}
            cursor={false}
          />
        </Row>
        <Row className="mt-5 px-4 w-full h-16">
          <Col className="w-fit h-fit codeFont text-2xl">
            <motion.div
            className=""
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 3.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}>
              <Button 
                href={links.links[0]} 
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