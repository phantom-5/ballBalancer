import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function BlackHole(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("assets/blackhole.glb");
  const { actions } = useAnimations(animations, group);
  console.log('black hole animations',actions)
  return (
    <group ref={group} {...props} dispose={null} position={[0,0,-50]} scale={5}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.02}
        >
          <group
            name="415c209837844e7b91255101a7c3eb67fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Blackhole_ring" rotation={[-Math.PI / 2, 0, 0]}>
                  <mesh
                    name="Blackhole_ring_Blackhole_ring_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Blackhole_ring_Blackhole_ring_0.geometry}
                    material={materials.Blackhole_ring}
                  />
                </group>
                <group
                  name="Blackhole_skin_001"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.96}
                >
                  <mesh
                    name="Blackhole_skin_001_Blackhole_skin_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_001_Blackhole_skin_0.geometry
                    }
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group
                  name="Blackhole_skin_002"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.96}
                >
                  <mesh
                    name="Blackhole_skin_002_Blackhole_core_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_002_Blackhole_core_0.geometry
                    }
                    material={materials.Blackhole_core}
                  />
                </group>
                <group
                  name="Blackhole_skin_003"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.91}
                >
                  <mesh
                    name="Blackhole_skin_003_Blackhole_skin_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_003_Blackhole_skin_0.geometry
                    }
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group
                  name="Blackhole_skin_004"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.91}
                >
                  <mesh
                    name="Blackhole_skin_004_Blackhole_core_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_004_Blackhole_core_0.geometry
                    }
                    material={materials.Blackhole_core}
                  />
                </group>
                <group
                  name="Blackhole_skin_005"
                  rotation={[-Math.PI / 2, 0, 0.96]}
                  scale={0.9}
                >
                  <mesh
                    name="Blackhole_skin_005_Blackhole_skin_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_005_Blackhole_skin_0.geometry
                    }
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group
                  name="Blackhole_skin_006"
                  rotation={[-Math.PI / 2, 0, -2.01]}
                  scale={0.86}
                >
                  <mesh
                    name="Blackhole_skin_006_Blackhole_skin_inner_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_006_Blackhole_skin_inner_0.geometry
                    }
                    material={materials.Blackhole_skin_inner}
                  />
                </group>
                <group
                  name="Blackhole_skin_007"
                  rotation={[-Math.PI / 2, 0, -2.01]}
                  scale={0.87}
                >
                  <mesh
                    name="Blackhole_skin_007_Blackhole_core_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_007_Blackhole_core_0.geometry
                    }
                    material={materials.Blackhole_core}
                  />
                </group>
                <group name="Blackhole_core001" rotation={[-Math.PI / 2, 0, 0]}>
                  <mesh
                    name="Blackhole_core001_Blackhole_core_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Blackhole_core001_Blackhole_core_0.geometry}
                    material={materials.Blackhole_core}
                  />
                </group>
                <group
                  name="Blackhole_skin_008"
                  rotation={[-Math.PI / 2, 0, 0.09]}
                  scale={0.84}
                >
                  <mesh
                    name="Blackhole_skin_008_Blackhole_skin_inner_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_008_Blackhole_skin_inner_0.geometry
                    }
                    material={materials.Blackhole_skin_inner}
                  />
                </group>
                <group
                  name="Blackhole_skin_009"
                  rotation={[-Math.PI / 2, 0, -0.61]}
                  scale={0.89}
                >
                  <mesh
                    name="Blackhole_skin_009_Blackhole_skin_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_009_Blackhole_skin_0.geometry
                    }
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group
                  name="Blackhole_skin_010"
                  rotation={[-Math.PI / 2, 0, -2.53]}
                  scale={0.93}
                >
                  <mesh
                    name="Blackhole_skin_010_Blackhole_skin_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_010_Blackhole_skin_0.geometry
                    }
                    material={materials.Blackhole_skin}
                  />
                </group>
                <group
                  name="Blackhole_skin_011"
                  rotation={[-Math.PI / 2, 0, -2.53]}
                  scale={0.93}
                >
                  <mesh
                    name="Blackhole_skin_011_Blackhole_core_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_011_Blackhole_core_0.geometry
                    }
                    material={materials.Blackhole_core}
                  />
                </group>
                <group
                  name="Blackhole_skin_012"
                  rotation={[-Math.PI / 2, 0, 2.09]}
                  scale={0.86}
                >
                  <mesh
                    name="Blackhole_skin_012_Blackhole_skin_inner_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_012_Blackhole_skin_inner_0.geometry
                    }
                    material={materials.Blackhole_skin_inner}
                  />
                </group>
                <group
                  name="Blackhole_skin_013"
                  rotation={[-Math.PI / 2, 0, -2.97]}
                  scale={0.83}
                >
                  <mesh
                    name="Blackhole_skin_013_Blackhole_ring2_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_skin_013_Blackhole_ring2_0.geometry
                    }
                    material={materials.Blackhole_ring2}
                  />
                </group>
                <group
                  name="Blackhole_core002"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.93}
                >
                  <mesh
                    name="Blackhole_core002_Blackhole_ring2_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Blackhole_core002_Blackhole_ring2_0.geometry
                    }
                    material={materials.Blackhole_ring2}
                  />
                </group>
                <group
                  name="Blackhole_core"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.97}
                >
                  <mesh
                    name="Blackhole_core_Blackhole_core_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Blackhole_core_Blackhole_core_0.geometry}
                    material={materials.Blackhole_core}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/blackhole.glb");