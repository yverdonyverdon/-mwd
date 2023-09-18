import {useLayoutEffect, useRef} from "react";

import {useGLTF, useScroll} from '@react-three/drei'
import gsap from "gsap";
import {useFrame} from "@react-three/fiber";

// Variables for the office
export const FLOOR_HEIGHT = 2.3;
export const NR_OF_FLOORS = 3;

function Office(props) {
    // Import the model
    const {nodes, materials} = useGLTF('./models/WawaOffice.glb')

    // Mesh reference (All the models)
    const ref = useRef();
    // Scroll reference
    const scroll = useScroll();
    // Library model reference
    const libraryRef = useRef();
    // Attic model reference
    const atticRef = useRef();

    // GSAP timeline reference
    const tl = useRef();


    // Scroll animation
    useFrame(() => {
        tl.current.seek(scroll.offset * tl.current.duration());
    });


    // GSAP timeline animation
    useLayoutEffect(() => {
        tl.current = gsap.timeline();

        // Vertical animation (move the office up/down)
        tl.current.to(
            ref.current.position,
            {
                duration: 2,
                y: -FLOOR_HEIGHT * (NR_OF_FLOORS - 1),
            },
            0
        );

        // Office Rotation
        tl.current.to(
            ref.current.rotation,
            { duration: 1, x: 0, y: Math.PI / 6, z: 0 },
            0
        );
        tl.current.to(
            ref.current.rotation,
            { duration: 1, x: 0, y: -Math.PI / 6, z: 0 },
            1
        );

        // Office movement
        tl.current.to(
            ref.current.position,
            {
                duration: 1,
                x: -1,
                z: 2,
            },
            0
        );
        tl.current.to(
            ref.current.position,
            {
                duration: 1,
                x: 1,
                z: 2,
            },
            1
        );


        // Library floor rotation
        tl.current.from(
            libraryRef.current.position,
            {
                duration: 0.5,
                x: -2,
            },
            0.5
        );
        tl.current.from(
            libraryRef.current.rotation,
            {
                duration: 0.5,
                y: -Math.PI / 2,
            },
            0
        );

        // Attic floor rotation
        tl.current.from(
            atticRef.current.position,
            {
                duration: 1.5,
                x: 2,
            },
            0
        );

        tl.current.from(
            atticRef.current.rotation,
            {
                duration: 0.5,
                y: Math.PI / 2,
            },
            1
        );

        tl.current.from(
            atticRef.current.position,
            {
                duration: 0.5,
                z: -2,
            },
            1.5
        );

    }, []);


    return (
        // eslint-disable-next-line react/no-unknown-property
        <group {...props} dispose={null} ref={ref}>
            <mesh geometry={nodes['01_office'].geometry} material={materials['01']}/>

            <group position={[0, 2.11, -2.23]}>
                <group ref={libraryRef}>
                    <mesh geometry={nodes['02_library'].geometry} material={materials['02']}/>
                </group>
            </group>

            <group position={[-1.97, 4.23, -2.2]}>
                <group ref={atticRef}>
                    <mesh geometry={nodes['03_attic'].geometry} material={materials['03']}/>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('./models/WawaOffice.glb')

export default Office;