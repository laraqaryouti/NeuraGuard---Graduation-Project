import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const App = () => (
  <Carousel autoplay>
    <div>
      <img src="src\assets\1.jpg" alt="Image1" height={600} width={"100%"} />
    </div>
    <div>
      <img src="src/assets/2.jpg" alt="Image1" height={600} width={"100%"} />
    </div>
    <div>
      <img src="src/assets/3.jpg" alt="Image1" height={600} width={"100%"} />
    </div>
    <div>
      <img src="src/assets/4.jpg" alt="Image1" height={600} width={"100%"} />
    </div>
  </Carousel>
);

export default App;

