import * as THREE from 'three';
import {BufferGeometry, Material, Mesh} from 'three';

export abstract class BasicGeometry {
    private readonly _geometry: BufferGeometry;
    private readonly _material: Material;
    protected _mesh: Mesh;

    protected constructor(geometry: BufferGeometry, material: Material) {
        this._geometry = geometry;
        this._material = material;
        this._mesh = new THREE.Mesh(this._geometry, this._material);
    }

    public get mesh(): Mesh {
        return this._mesh;
    }

    public position(x: number, y: number, z: number): void {
        this._mesh.position.set(x, y, z);
    }
}