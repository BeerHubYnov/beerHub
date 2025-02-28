import React from "react";
import HeadHomeContent from "../components/home/HeadHomeContent";
import HomeContent from "./../components/home/HomeContent";
import { Zoom } from "react-awesome-reveal";
const Homepage: React.FC = () => {
  return (
    <Zoom>
      <HeadHomeContent />
      <HomeContent />
    </Zoom>
  );
};
export default Homepage;
