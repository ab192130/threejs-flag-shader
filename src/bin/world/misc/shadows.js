import * as THREE from 'three';
// import ShadowMaterial from "../../materials/shadow";


export default class Shadows {
    constructor(options) {
        this.textureLoader = new THREE.TextureLoader();
        this.clamp = (num, min, max) => Math.min(Math.max(num, min), max);

        this.config = options.config;
        this.time = options.time;
        this.debug = options.debug;
        this.renderer = options.renderer;
        this.camera = options.camera;

        this.items = [];
        this.maxDistance = 3;

        this.container = new THREE.Object3D();
        this.container.updateMatrix();
        this.container.name = "shadow"

        this.setGeometry();

        this.time.on('tick', () => {
            this.render();
        });
    }

    setGeometry() {
        this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
    }

    add(ref, options = {}) {
        const shadow = {};

        shadow.reference = ref;
        shadow.offset = options.offsetZ;
        shadow.material = new THREE.MeshBasicMaterial(
            {
                color: '#af5517',
                side: THREE.DoubleSide,
                transparent: true,
                alphaMap: this.textureLoader.load('images/simpleShadow.jpg')
            });
        // shadow.material = new ShadowMaterial();

        console.log(shadow.material);

        shadow.mesh = new THREE.Mesh(this.geometry, shadow.material);
        //shadow.mesh.position.z = 0.001;
        shadow.mesh.position.y = shadow.reference.position.y - shadow.offset;
        // shadow.mesh.scale.set(options.sizeX, options.sizeY, 2.4);
        shadow.mesh.scale.set(options.sizeX, options.sizeY, 0);

        this.container.add(shadow.mesh);
        this.items.push(shadow);

        shadow.mesh.rotation.x = Math.PI / -2;

        console.log('rotation', shadow.mesh.rotation);

        return shadow;
    }

    render() {
        for (const shadow of this.items) {
            // console.log('mesh', shadow.mesh.position);
            // console.log('ref', shadow.reference.position);
            // console.log('x', shadow.mesh.position.x, shadow.reference.position.x);
            // console.log('y', shadow.mesh.position.x, shadow.reference.position.x);
            shadow.mesh.position.x = shadow.reference.position.x;
            // shadow.mesh.position.y = 0.055;
            shadow.mesh.position.z = shadow.reference.position.z;

            // shadow.material.opacity = this.clamp(shadow.reference.position.y, 1, );
            shadow.material.opacity = 2 - shadow.reference.position.y;

            console.log(this.clamp(shadow.reference.position.y, 0, 1));

            const rotationVector = new THREE.Vector3(-1, 0, 0);
            rotationVector.applyQuaternion(shadow.reference.quaternion);

            const projectedRotationVector = rotationVector.clone().projectOnPlane(new THREE.Vector3(0, 0, 1));
            let orientationAlpha = Math.abs(rotationVector.angleTo(new THREE.Vector3(0, 0, 1)) - Math.PI * 0.5) / (Math.PI * 0.5);
            orientationAlpha /= 0.5;
            orientationAlpha -= 1 / 0.5;
            orientationAlpha = Math.abs(orientationAlpha);
            orientationAlpha = Math.min(Math.max(orientationAlpha, 0), 1);

            const angle = Math.atan2(projectedRotationVector.x, projectedRotationVector.y);
            shadow.mesh.rotation.z = angle;
        }
    }
}
