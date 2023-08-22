import * as THREE from 'three';
import { Scene } from './scene';
// import { BasicGeometry } from "./basicGeometry";
// import { AmbientLight, DirectionalLight, PointLight } from "three";
import './style.css';
import { GroundLine } from './groundLine';
import KeyboardControls from './controls/keyControls';

const root = document.getElementById('app');
const scene = new Scene(root!);
const groundLine = new GroundLine(new THREE.MeshStandardMaterial({ color: 0x25cb65 }));
const light = new THREE.AmbientLight(0x404040, 30);
const directionalLight = new THREE.DirectionalLight(0x404040, 10);
directionalLight.position.set(1, 1, 2);

for (let i = 0; i < 100; i++) {
    const line = new GroundLine(new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x25cb65 : 0x25cb10 }));
    line.position(0, i * 1.1, 0);
    scene.addObject(line);
}
if (true) { }

scene.addObject(groundLine);
scene.addLight(light);
scene.addLight(directionalLight);

scene.initScene();

const keyControls = new KeyboardControls('keyup');
keyControls.addEventHandler({ key: 'w', handler: () => console.log('w') });
const key = new KeyboardControls('keyup');
key.addEventHandler({ key: 's', handler: () => console.log('s') });
