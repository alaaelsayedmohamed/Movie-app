import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const RatingCircle = ({ value }) => {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        background: "#081c22",
        borderRadius: "50%",
        padding: "2px"
      }}
    >
      <CircularProgressbar
        value={value}
        text={`${value}`}
        styles={buildStyles({
          textSize: "28px",
          pathColor:
            value >= 70 ? "#21d07a" : value >= 50 ? "#d2d531" : "#db2360",
          textColor: "#fff",
          trailColor: "#204529",
          backgroundColor: "#081c22"
        })}
      />
    </div>
  );
};

export default RatingCircle;

