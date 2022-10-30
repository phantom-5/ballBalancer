
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Canvas,useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei';
import React, { Suspense, useEffect, useRef, useState} from 'react';
import { useGLTF, useAnimations, PerspectiveCamera} from '@react-three/drei'
import {Physics, useBox, useSphere, usePlane} from '@react-three/cannon'
import { BlackHole } from './BlackHole';
import {io} from 'socket.io-client'



function App() {

  const planeApi = useRef()
  const planeRef = useRef()
  const [rotatePlatform,setRotatePlatform] = useState([1.55,0,0])
  const [rotateBase,setRotateBase] = useState([0,0,0])
  const rotatePlatformRef = useRef([1.55,0,0])
  const [pairedStatus,setPairedStatus] = useState(false)
  const pairInput = useRef(null)
  const socketRef = useRef(null)

  const registerWebClientToServer = () => {
    socketRef.current.emit('Register WebClient',pairInput.current.value)
  }

  const rotatePlane = (param,factor) => {
    if(param==='Left'){
      /* in my phone left is y negative */
      /* setRotatePlatform([1.55,0,0.2])
      setRotateBase([0,-0.1,0]) */
      planeApi.current.rotation.set(Math.PI/2,0,0.1*Math.abs(factor))
      
    }
    if(param==='Right'){
      /* setRotatePlatform([1.55,0,-0.2])
      setRotateBase([0,0.1,0]) */
      planeApi.current.rotation.set(Math.PI/2,0,-0.1*Math.abs(factor))
    }
    if(param==='Top'){
      /* setRotatePlatform([1.2,0,0])
      setRotateBase([-0.1,0,0]) */
      planeApi.current.rotation.set(Math.PI/2-(0.1*Math.abs(factor)),0,0)
    }
    if(param==='Bottom'){
      /* setRotatePlatform([1.8,0,0])
      setRotateBase([0.1,0,0]) */
      planeApi.current.rotation.set(Math.PI/2+(0.1*Math.abs(factor)),0,0)
    }
  }

  const Platform1 = (props) => {
    const { nodes, materials } = useGLTF("assets/balls/platform.glb");
    //for virtual 3rd party platform
    //rotation [1.5,0,0] is neutral position
    //left-right : 2th index
    //top-bottom : 0th index
    const [ref,api] = useBox(() => ({ position:[0,0,0], args:[5.5,0.28,7], rotation:[Math.PI/2,0,0]}))
    planeRef.current = ref
    planeApi.current = api

    return (
      <group {...props} dispose={null} ref={ref} receiveShadow>
        <group scale={0.12}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cement_patch2.geometry}
            material={nodes.cement_patch2.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cement_patch_bottom3.geometry}
            material={nodes.cement_patch_bottom3.material}
          />
        </group>
      </group>
    );
  }


  const WoodenBall = (props) => {
    
    const [ref] = useSphere(() => ({args: [0.35], mass: 1000, position: [0, 0, 3]}))
      const { nodes, materials } = useGLTF("assets/balls/ball.glb");
      return (
        <group {...props} dispose={null} ref={ref}>
          <group scale={0.035}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Wooden_Sphere1.geometry}
              material={nodes.Wooden_Sphere1.material}
            />
          </group>
        </group>
      );
  }

  const CarbonBall = (props) => {
    const [ref] = useSphere(() => ({args: [0.35], mass: 500, position: [0, 0, 3]}))
    const { nodes, materials } = useGLTF("assets/balls/carbon.glb");
    return (
      <group {...props} dispose={null} ref={ref} castShadow>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.007}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={nodes.Object_2.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={nodes.Object_3.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={nodes.Object_4.material}
          />
        </group>
      </group>
    );
  }

  const Sphere = (props) => {
    const [ref] = useSphere(() => ({args: [0.35], mass: 1, position: [0, 0, 2]}))
    console.log("PLane-ref",ref)
      return (
        <mesh castShadow ref={ref}>
          <sphereGeometry attach="geometry" args={[0.35, 64, 64]}/>
          <meshLambertMaterial attach="material" color="pink"/>
        </mesh>
      );
  }

  const BackgroundPlane = () => {
    const [ref,api] = usePlane(()=>({position:[0,0,-5],args:[10,10,10] ,onCollide:()=>(console.log('Ball Fell'))}))
    return(
      <mesh ref={ref}>
        <planeGeometry attach="geometry" args={[10,10,10]}/>
        <meshLambertMaterial attach="material" color="white" opacity={0} transparent  />
      </mesh>
    )
  }

  function BoxPlane() {
    //the args inside box gives the size to the box that physics recognises, so if you use box and give size in boxGemotry but not in physics, it will still consider it small
    // usebox instead of plane if plane size has to be finite
    const [ref,api] = useBox(() => ({ position:[0,0,-2], args:[5,5,5], rotation:[-Math.PI,0,0]}))
    planeRef.current = ref
    planeApi.current = api
    console.log('Plane API-2',api,ref)
    
    return (
      <mesh ref={ref}>
        <boxGeometry attach="geometry" args={[5,5,5]} />
        <meshLambertMaterial attach="material" color="grey" />
      </mesh>
    )
  }

  useEffect(()=>{
    console.log('useEffect executed')
    useGLTF.preload("assets/balls/ball.glb");
    useGLTF.preload("assets/balls/carbon.glb");
    useGLTF.preload("assets/balls/platform.glb");
    socketRef.current = io("https://ballbalancer.herokuapp.com"); //http://localhost:5000
    socketRef.current.emit('From WebClient','Hello from webclient')
    socketRef.current.on('From Server',(msg)=>{console.log(msg)})
    socketRef.current.on('Via Server',(msg)=>{console.log(msg)})
    socketRef.current.on('MapStatus',(msg)=>{console.log('MapStatus',msg)
    if(msg==='Success'){
      setPairedStatus(true)
    }
  })
  socketRef.current.on('Accelerometer Data',(msg)=>{
    let accData = JSON.parse(msg)
    if(accData.y<=0){
      rotatePlane('Left',accData.y)
    }
    else if(accData.y>0){
      rotatePlane('Right',accData.y)
    }
    if(accData.x<=0){
      rotatePlane('Top',accData.x)
    }
    else if(accData.x>0){
      rotatePlane('Bottom',accData.x)
    }
})
  },[])

  return (
    <div className="App">
      {pairedStatus &&
      <>
      <div className="container pt-2 pb-2">
        <div className="row">
          <div className="col-3"><button className="btn btn-primary" onClick={()=>{rotatePlane('Left')}}>Left</button></div>
          <div className="col-3"><button className="btn btn-primary" onClick={()=>{rotatePlane('Right')}}>Right</button></div>
          <div className="col-3"><button className="btn btn-primary" onClick={()=>{rotatePlane('Top')}}>Top</button></div>
          <div className="col-3"><button className="btn btn-primary" onClick={()=>{rotatePlane('Bottom')}}>Bottom</button></div>
        </div>
      </div>
      <div style={{width:'100%', height:'90%'}}>
        <Canvas>
          <Stars/>
          <BlackHole/>
          {/* <ambientLight intensity={0.5}/> */}
          <spotLight position={[50, 50, 50]} intensity={1} />
          <spotLight position={[0, 0, -50]} intensity={0.2} color="yellow" />
          <Physics
            iterations={20}
            tolerance={0.0001}
            defaultContactMaterial={{
              contactEquationRelaxation: 1,
              contactEquationStiffness: 1e7,
              friction: 0.9,
              frictionEquationRelaxation: 2,
              frictionEquationStiffness: 1e7,
              restitution: 0.7,
            }}
            gravity={[0, 0, -10]}
            allowSleep={false}
          >
            {/* <Sphere/> */}
            {/* <WoodenBall/> */}
            <CarbonBall/>
          {/* <BoxPlane/> */}
         {/*  <BackgroundPlane/> */}
          <Platform1/>
          </Physics>
          <OrbitControls/>
        </Canvas>
      </div>
      </>}
      {!pairedStatus &&
        <>
        <div className="row">
          <div className="col-12" style={{textAlign:'center'}}>
          <input type="number" placeholder="Enter Number" ref={pairInput} />
          <button className='btn btn-success' onClick={registerWebClientToServer}>Submit</button>
        </div>
        </div>
        </>
      }
    </div>
  );
}

export default App;
