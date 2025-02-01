import * as THREE from 'three';
import {BasicGeometry} from '../geometry/basicGeometry';

export class Ground extends BasicGeometry {
    constructor(width = 20, depth = 20, thickness = 1) {
        super(
            new THREE.BoxGeometry(width, depth, thickness),
            new THREE.MeshStandardMaterial({opacity: 0, transparent: true}),
        );

        this.mesh.position.y = -thickness / 2;
    }
}