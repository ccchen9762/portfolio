import { Row, Col, Button, Image } from "react-bootstrap";

function ErrorPage() {
  return (
  <Row className="w-full h-full m-0 p-0"> 
      <div className="h-full bg-slate-50">
      <h1 className="text-center text-2xl font-bold mt-5">Page not found... Is the url correct?</h1>
      </div>
  </Row>
  );

}
  
export default ErrorPage;