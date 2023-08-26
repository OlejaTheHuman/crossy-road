import * as THREE from 'three';
import {Scene} from './scene';
// import { BasicGeometry } from "./basicGeometry";
// import { AmbientLight, DirectionalLight, PointLight } from "three";
import './style.css';
import {GroundLine} from './geometry/groundLine';
import KeyboardControls from './controls/keyboardControls';
import Character from './geometry/character';

const root = document.getElementById('app');
const scene = new Scene(root!);
const groundLine = new GroundLine(new THREE.MeshStandardMaterial({ color: 0x25cb65 }));
const light = new THREE.AmbientLight(0x404040, 30);
const directionalLight = new THREE.DirectionalLight(0x404040, 10);
const character = new Character();
character.position(1, 1, 1);
directionalLight.position.set(1, 1, 2);

for (let i = 0; i < 100; i++) {
    const line = new GroundLine(new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x25cb65 : 0x25cb10 }));
    line.position(0, i, 0);
    scene.addObject(line);
}

scene.addObject(groundLine);
scene.addLight(light);
scene.addLight(directionalLight);
scene.addObject(character);

scene.initScene();

const keyboardControls = new KeyboardControls('keypress');
keyboardControls.addEventHandler({ key: 'w', handler: () => character.goForward() });
keyboardControls.addEventHandler({ key: 's', handler: () => character.goBack() });
keyboardControls.addEventHandler({ key: 'a', handler: () => character.goLeft() });
keyboardControls.addEventHandler({ key: 'd', handler: () => character.goRight() });
