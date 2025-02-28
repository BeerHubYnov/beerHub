import "./../../App.css";
import "./Home.css";
import Model from './animation/Model';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const HeadHomeContent: React.FC = () => {
  return (

    <div style={{ position: "relative" }}>
      <div className="head-home">
        <h1 className="home-title">BeerHub</h1>
        <p>La plateforme des évènements festifs</p>
      </div>
      <div className="canvas-container">
      <Model/>
      </div>
      <div className="btn-down">
      <ArrowDownwardIcon className="icon-large" />
      </div>

    </div>
  );
};

export default HeadHomeContent;
