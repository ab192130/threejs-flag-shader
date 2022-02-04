import * as THREE from 'three';

export default class Floor {
    constructor(options) {
        this.container = new THREE.Object3D();

        this.createFloor();
    }

    createFloor() {
        this.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({color: 0xd38650});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.set(0, 0, 0);
        this.mesh.scale.set(6, -.1, 6);

        this.mesh.receiveShadow = true;

        this.container.add(this.mesh);
    }
}
