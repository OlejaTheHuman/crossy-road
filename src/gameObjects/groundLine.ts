import * as THREE from 'three';
import {Material} from 'three';
import {BasicGeometry} from '../geometry/basicGeometry.ts';

export class GroundLine extends BasicGeometry {

    constructor(material: Material) {
        super(new THREE.BoxGeometry(20, 1, 1), material);
    }
}

