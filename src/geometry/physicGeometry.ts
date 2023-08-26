import {BasicGeometry} from './basicGeometry.ts';
import {BufferGeometry, Material} from 'three';

export interface VelocityI {
    x: number;
    y: number;
    z: number;
}

export interface AccelerationI {
    x: number;
    y: number;
    z: number;
}

export interface AnimatableI {
    animate: () => void;
}

export default class PhysicGeometry extends BasicGeometry implements AnimatableI {
    private _velocity: VelocityI = {x: 0, y: 0, z: 0};
    private _acceleration: AccelerationI = {x: 0, y: 0, z: -0.05};

    constructor(
        geometry: BufferGeometry,
        material: Material,
    ) {
        super(geometry, material);
    }

    public animate(): void {
        this.velocityX += this.accelerationX;
        this.velocityY += this.accelerationY;
        this.velocityZ += this.accelerationZ;
        this.mesh.position.x += this.velocityX;
        this.mesh.position.y += this.velocityY;
        this.mesh.position.z += this.velocityZ;
    }

    public setVelocity(velocity: VelocityI): void {
        this._velocity = velocity;
    }

    public setAcceleration(acceleration: AccelerationI): void {
        this._acceleration = acceleration;
    }

    get velocityX(): number {
        return this._velocity.x;
    }

    set velocityX(value: number) {
        this._velocity.x = value;
    }

    get velocityY(): number {
        return this._velocity.y;
    }

    set velocityY(value: number) {
        this._velocity.y = value;
    }

    get velocityZ(): number {
        return this._velocity.z;
    }

    set velocityZ(value: number) {
        this._velocity.z = value;
    }

    get accelerationX(): number {
        return this._acceleration.x;
    }

    set accelerationX(value: number) {
        this._acceleration.x = value;
    }

    get accelerationY(): number {
        return this._acceleration.y;
    }

    set accelerationY(value: number) {
        this._acceleration.y = value;
    }

    get accelerationZ(): number {
        return this._acceleration.z;
    }

    set accelerationZ(value: number) {
        this._acceleration.z = value;
    }
}