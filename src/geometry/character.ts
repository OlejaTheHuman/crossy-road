import * as THREE from 'three';
import PhysicGeometry from './physicGeometry.ts';

export default class Character extends PhysicGeometry {
    private _isAnimationGoing = false;

    constructor() {
        super(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({color: 0x00000}));
    }

    public animate(): void {
        if (this._isAnimationGoing) super.animate();

        if (this.mesh.position.z < 1) {
            this.setVelocity({x: 0, y: 0, z: 0});
            this.mesh.position.z = 1;
            this._isAnimationGoing = false;
        }
    }

    public goForward(): void {
        this._isAnimationGoing = true;
        this.velocityZ += 0.5;
        this.velocityY += 0.05;
    }

    public goBack(): void {
        this._isAnimationGoing = true;
        this.velocityZ += 0.5;
        this.velocityY -= 0.05;
    }

    public goLeft(): void {
        this._isAnimationGoing = true;
        this.velocityZ += 0.5;
        this.velocityX -= 0.05;
    }

    public goRight(): void {
        this._isAnimationGoing = true;
        this.velocityZ += 0.5;
        this.velocityX += 0.05;
    }
}