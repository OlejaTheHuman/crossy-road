import * as THREE from 'three';
import { BasicGeometry } from './basicGeometry';
import { Material } from 'three';

export class GroundLine extends BasicGeometry {

    constructor(material: Material) {
        super(new THREE.BoxGeometry(20, 1, 1), material);
    }
}

