import * as THREE from 'three';
import { BasicGeometry } from './basicGeometry';

export default class Character extends BasicGeometry {
    constructor() {
        super(new THREE.BoxGeometry(20, 1, 1), new THREE.MeshStandardMaterial({ color: 0x25cb65 }));
    }

    public goForward(): void {
        this._mesh.position.x += 1;
    }
}