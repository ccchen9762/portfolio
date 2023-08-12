import { Row, Col, Image } from "react-bootstrap";

import careerInfo from "../../assets/data/CareerInfo.json"

function Career(index) {
  const len = careerInfo.careers[index.index].bullets.length;
  const bulletpoints = () => {
    const points = [];
    for (let i = 0; i < len; i++) {
      points.push(
        <li key={i} index={i}>
          {careerInfo.careers[index.index].bullets[i]}
        </li>
      );
    }
    return points;
  };

  return  (
    <Row className="w-auto h-fit mx-3 mt-5 p-8 bg-stone-50 rounded-md raleway">
      <p className="mb-2 px-4 text-3xl text-yellow-700">{careerInfo.careers[index.index].position}</p>
      <p className="mb-0 px-4 text-lg text-amber-600">{careerInfo.careers[index.index].company}</p>
      <p className="mb-2 px-4 text-lg text-amber-500">{careerInfo.careers[index.index].location}</p>
      <p className="mb-2 px-4 text-md text-stone-500">{careerInfo.careers[index.index].time}</p>
      <ul className="mb-2 px-5 text-lg list-disc">
        {bulletpoints()}
      </ul>
    </Row>
  );
}

export default Career;