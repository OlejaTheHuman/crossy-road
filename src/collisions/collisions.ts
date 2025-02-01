import * as THREE from 'three';
import { BasicGeometry } from '../geometry/basicGeometry.ts';

export class Collision {
    private _objects: BasicGeometry[] = [];

    public addObject(object: BasicGeometry): void {
        this._objects.push(object);
    }

    public removeObject(object: BasicGeometry): void {
        this._objects = this._objects.filter(obj => obj !== object);
    }

    /**
     * Проверить, с какими объектами сталкивается переданный объект.
     * Возвращает массив всех объектов, у которых произошла коллизия.
     */
    public checkCollisions(object: BasicGeometry): BasicGeometry[] {
        const colliding: BasicGeometry[] = [];

        const box1 = new THREE.Box3().setFromObject(object.mesh);

        for (const obj of this._objects) {
            if (obj === object) continue;

            const box2 = new THREE.Box3().setFromObject(obj.mesh);

            if (box1.intersectsBox(box2)) {
                colliding.push(obj);
            }
        }

        return colliding;
    }

    /**
     * Вспомогательный метод: проверить все объекты между собой.
     * Возвращает список пар (A, B), у которых есть пересечение.
     */
    public checkAllCollisions(): Array<[BasicGeometry, BasicGeometry]> {
        const collisions: Array<[BasicGeometry, BasicGeometry]> = [];

        for (let i = 0; i < this._objects.length; i++) {
            const objA = this._objects[i];
            const boxA = new THREE.Box3().setFromObject(objA.mesh);

            for (let j = i + 1; j < this._objects.length; j++) {
                const objB = this._objects[j];
                const boxB = new THREE.Box3().setFromObject(objB.mesh);

                if (boxA.intersectsBox(boxB)) {
                    collisions.push([objA, objB]);
                }
            }
        }

        return collisions;
    }
}