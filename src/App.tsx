import styled from "styled-components";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: fixed;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  overflow: hidden;
  display: flex;
  align-items: end;
`;
const Fill = styled(motion.div)`
  position: relative;
  background: white;
  width: 100%;
`;

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const { scrollYProgress } = useViewportScroll();
  const gradient = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238)",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238,178,0))",
    ]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const height = useTransform(scrollYProgress, [0, 1], ["0", "100%"]);
  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ, scale }}>
        <Fill style={{ height }} />
      </Box>
    </Wrapper>
  );
}

export default App;
