import { Link, useParams } from 'react-router-dom'
import { Row } from "react-bootstrap";
import { BiLeftArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";

import Carousel from './Carousel.js';
import ErrorPage from "../ErrorPage.js";
import projectInfo from "../../assets/data/ProjectInfo.json";

function Overview() {
  const { title } = useParams();

  var index = -1;
  const len = projectInfo.projects.length;
  for (let i = 0; i < len; i++) {
    if(projectInfo.projects[i].title === title){
      index = i;
    }
  }

  if (index === -1){
    return (
      <ErrorPage />
    );
  }

  return (
      <motion.div
        className="w-full h-full m-0 p-0 row box "
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
        <div className="bg-slate-50">
          <Row className="w-full h-fit m-0 p-0">
            <Link to="/portfolio/works" className='w-fit h-fit col no-underline mt-3'>
              <BiLeftArrowAlt className='w-12 h-12 hover:cursor-pointer hover:!text-gray-600 active:!text-gray-400 text-black'/>
            </Link>
          </Row>  
          <Row className="w-full h-fit m-0 p-0">
            <h1 className="text-center text-4xl font-bold mt-2">{title.replaceAll('-', ' ')}</h1>
          </Row>  

          <Row className="w-full h-fit m-0 p-0 px-5">
            <h1 className="text-2xl mt-2 text-right">{projectInfo.projects[index].time}</h1>
          </Row>  

          <Row className="w-full h-[28rem] mx-0 my-4 px-8">
            <Carousel images={projectInfo.projects[index].images}/>
          </Row>
          
          {
            projectInfo.projects[index].link !== "" ? (
              <Row className="w-full h-fit m-0 p-0">
                <a href={projectInfo.projects[index].link} className="text-center text-2xl font-bold mt-2" target="_blank" rel="noopener noreferrer">
                  Check out the link!
                </a>
              </Row>
            ) : null
          }

          <Row className="w-full h-fit m-0 px-16 py-4">
            <p className="text-center text-lg">
              {projectInfo.projects[index].description}
            </p>
          </Row>
        </div>
      </motion.div>
  );
}

export default Overview;
