import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, PerspectiveCamera, Text, Text3D } from "@react-three/drei";
import { Physics, useBox, useSphere, usePlane } from "@react-three/cannon";
import { BlackHole } from "./BlackHole";
import { io } from "socket.io-client";

function SidePlanes({ sphereAPI }) {
  const [activeBar, setActiveBar] = useState({});
  const [totalScore,setTotalScore] = useState(0)
  const [timerCount,setTimerCount] = useState(30)

  const countDownTimer = () => {
    setTimerCount(timerCount-1)
  }

  const randomizeColorandBar = () => {
    const colors = ["green", "green", "green", "red", "red"];
    let colorRandomIndex = Math.floor(Math.random() * colors.length);
    let chosenColor = colors[colorRandomIndex];
    let bars = ["Top", "Left", "Bottom", "Right"];
    let barRandomIndex = Math.floor(Math.random() * bars.length);
    let chosenBar = bars[barRandomIndex];
    console.log("Function called", chosenBar, chosenColor);
    setActiveBar({ [chosenBar]: chosenColor });
  };

  const givePoints = (color) => {
    console.log('Give Points Called',color)
    if (color === "green") {
      setTotalScore(totalScore+10)
    } else if (color === "red") {
      setTotalScore(totalScore-5)
    }
  };

  useEffect(() => {
    let currInterval = setInterval(() => {
      randomizeColorandBar();
    }, 4000);

    let timerInterval = setInterval(()=>{
        setTimerCount(timerCount=>timerCount-1)
    },1000)
    return () => {
      clearInterval(currInterval);
      clearInterval(timerInterval)
    };
  }, []);

  const SidePlaneRight = () => {
    const [ref, api] = useBox(() => ({
      position: [3.3, 0, -0.6],
      args: [0.2, 8, 2],
      rotation: [-Math.PI, 0, 0],
      onCollide: () => {
        console.log("Ball Hit Right Wall");
        sphereAPI.current.position.set(0, 0, 2);
        givePoints(activeBar["Right"] ? activeBar.Right : "white")
      },
    }));
    return (
      <mesh ref={ref}>
        <boxGeometry attach="geometry" args={[0.2, 8, 2]} />
        <meshLambertMaterial
          attach="material"
          color={activeBar["Right"] ? activeBar.Right : "white"}
        />
      </mesh>
    );
  };

  const SidePlaneLeft = () => {
    const [ref, api] = useBox(() => ({
      position: [-3.3, 0, -0.6],
      args: [0.2, 8, 2],
      rotation: [-Math.PI, 0, 0],
      onCollide: () => {
        console.log("Ball Hit Left Wall");
        sphereAPI.current.position.set(0, 0, 2);
        givePoints(activeBar["Left"] ? activeBar.Left : "white")
      },
    }));
    return (
      <mesh ref={ref}>
        <boxGeometry attach="geometry" args={[0.2, 8, 2]} />
        <meshLambertMaterial
          attach="material"
          color={activeBar["Left"] ? activeBar.Left : "white"}
        />
      </mesh>
    );
  };

  const SidePlaneTop = () => {
    const [ref, api] = useBox(() => ({
      position: [0, 3.3, -0.6],
      args: [0.2, 8, 2],
      rotation: [-Math.PI, 0, -Math.PI / 2],
      onCollide: () => {
        console.log("Ball Hit Top Wall");
        sphereAPI.current.position.set(0, 0, 2);
        givePoints(activeBar["Top"] ? activeBar.Top : "white")
      },
    }));
    return (
      <mesh ref={ref}>
        <boxGeometry attach="geometry" args={[0.2, 8, 2]} />
        <meshLambertMaterial
          attach="material"
          color={activeBar["Top"] ? activeBar.Top : "white"}
        />
      </mesh>
    );
  };

  const SidePlaneBottom = () => {
    const [ref, api] = useBox(() => ({
      position: [0, -3.3, -0.6],
      args: [0.2, 8, 2],
      rotation: [-Math.PI, 0, -Math.PI / 2],
      onCollide: () => {
        console.log("Ball Hit Bottom Wall");
        sphereAPI.current.position.set(0, 0, 2);
        givePoints(activeBar["Bottom"] ? activeBar.Bottom : "white")
      },
    }));
    return (
      <mesh ref={ref}>
        <boxGeometry attach="geometry" args={[0.2, 8, 2]} />
        <meshLambertMaterial
          attach="material"
          color={activeBar["Bottom"] ? activeBar.Bottom : "white"}
        />
      </mesh>
    );
  };

  return (
    <>
      <SidePlaneTop />
      <SidePlaneLeft />
      <SidePlaneBottom />
      <SidePlaneRight />
      <Text
        scale={[2, 2, 2]}
        color="yellow" // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[-3.3,0,2]}
      >
        Score: {totalScore}
      </Text>
      <Text
        scale={[2, 2, 2]}
        color="pink" // default
        anchorX="center" // default
        anchorY="middle" // default
        position={[3.3,0,2]}
      >
        Time: {timerCount}
      </Text>
   
      {/* <Text3D>hello</Text3D> */}
    </>
  );
}

export default SidePlanes;
