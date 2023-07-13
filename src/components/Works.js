import React, { useState } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

function WorkBlock() {
  return (
    /*<Col xs={12} md={6} xl={4} className="w-full h-fit m-0 p-4">
      <div className="rounded-xl border-4">
        <div className="flex">
          <Image
            src={require("../assets/images/IK1.png")}
            className="w-20 h-20 object-cover mr-2"
          />
          <div>
            <h5 className="font-bold">Title</h5>
          </div>
        </div>
      </div>
    </Col>*/

    <Col
      xs={12}
      md={6}
      xl={4}
      className="p-4 border-4 border-blue-500 d-flex align-items-center justify-content-center"
    >
      <div className="w-72 rounded-md border-4 border-red-500 flex flex-col items-center justify-center bg-slate-200 shadow-2xl shadow-black">
        <Image
          src={require("../assets/images/jello_cube1.png")}
          className="w-full h-auto object-cover object-center rounded-md"
        />
        <h3 className="text-2xl font-bold mt-2">{"title"}</h3>
        <p className="mt-2 text-gray-700">{"description"}</p>
      </div>
    </Col>
  );
}

function Works() {
  return (
    <Row className="w-full h-fit m-0 p-0">
      <WorkBlock />
      <WorkBlock />
      <WorkBlock />
      <WorkBlock />
      <WorkBlock />
      <WorkBlock />
      <WorkBlock />
      <WorkBlock />
      <WorkBlock />
      <WorkBlock />
    </Row>
  );
}

export default Works;
