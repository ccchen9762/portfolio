import { Row, Col, Button, Image } from "react-bootstrap";

function ErrorPage() {
  return (
  <Row className="w-full h-full m-0 p-0 flex flex-col justify-center"> 
      <h1 className="text-center text-2xl font-bold mb-5">Page not found... Is the url correct?</h1>
  </Row>
  );

}
  
export default ErrorPage;