import { gray } from "../styles/colors";

const Line = ({ width = "100%", color = gray }) => {
  return (
    <div
      style={{
        color,
        background: color,
        height: `1px`,
        width,
      }}
    />
  );
};

export default Line;
