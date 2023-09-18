import {OrbitControls, ScrollControls} from "@react-three/drei";
import Office from "./Office.jsx";

function Experience() {
    return (
        <>
            <ambientLight intensity={2.2}/>
            <OrbitControls enableZoom={false}/>

            <ScrollControls pages={3} damping={0.25}>
                <Office/>
            </ScrollControls>

            {/* The default box*/}
            {/*<mesh>*/}
            {/*    <boxGeometry/>*/}
            {/*    <meshBasicMaterial/>*/}
            {/*</mesh>*/}
        </>
    );
}

export default Experience;