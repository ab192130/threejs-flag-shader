import * as THREE from 'three';

export default class Lights {
    constructor(options) {
        this.container = new THREE.Object3D();

        this.createLights();
    }

    createLights() {
        // this.sun = new THREE.DirectionalLight(0xffffff, 1);
        // this.sun.position.set(-30, 50, 30);
        //
        // this.sun.castShadow = true;
        // this.sun.shadow.camera.near = 1;
        // this.sun.shadow.camera.far = 500.0;
        // this.sun.shadow.mapSize.width = 7000;
        // this.sun.shadow.mapSize.height = 7000;
        // this.sun.shadow.camera.left = -70;
        // this.sun.shadow.camera.right = 70;
        // this.sun.shadow.camera.top = 70;
        // this.sun.shadow.camera.bottom = -70;
        // this.sun.shadow.bias = 0.0001;

        // this.container.add(this.sun);
        this.container.add(new THREE.HemisphereLight(0xffffff, '#d3681c', 1));
    }
}
