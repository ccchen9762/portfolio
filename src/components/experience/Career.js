import { Row, Col } from "react-bootstrap";

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
    <Row className="w-auto h-fit mx-3 my-4 p-3 md:p-8 bg-stone-50 rounded-md border-b-4 border-zinc-600 raleway">
      <Col className="p-0">
        <p className="mb-1 px-4 text-xl text-yellow-700 font-bold">{careerInfo.careers[index.index].position}</p>
      </Col>
      <Col className="p-0">
        <p className="mb-2 px-4 text-right text-sm text-stone-500 font-medium">{careerInfo.careers[index.index].time}</p>
      </Col>
      <p className="mb-1 px-4 text-md text-amber-600 font-semibold">{careerInfo.careers[index.index].company}</p>
      <p className="mb-3 px-4 text-md text-amber-500 font-semibold">{careerInfo.careers[index.index].location}</p>
      <ul className="mb-2 px-5 py-3 text-md text-zinc-600 list-disc bg-orange-100 rounded-md font-medium">
        {bulletpoints()}
      </ul>
    </Row>
  );
}

export default Career;