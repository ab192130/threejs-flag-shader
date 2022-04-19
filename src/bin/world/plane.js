import * as THREE from 'three';
import vertexShader from '../../shaders/test/vertex.glsl';
import fragmentShader from '../../shaders/test/fragment.glsl';
import {Howl, Howler} from 'howler';

export default class DemoPlane {
    constructor(options) {
        this.config = options.config;
        this.time = options.time;
        this.debug = options.debug;
        this.renderer = options.renderer;
        this.camera = options.camera;
        this.shadows = options.shadows;

        this.container = new THREE.Object3D();

        this.create();

        const clock = new THREE.Clock();

        this.time.on('tick', () => {
            if (this.material) {
                this.material.uniforms.uTime.value = clock.getElapsedTime();
            }
        });

        let sound = new Howl({
            src: ['https://files.catbox.moe/ag33pj.mp3']
        });

        sound.play();
    }

    loadTexture() {

    }

    initMaterial() {
        this.textureLoader = new THREE.TextureLoader();
        const flagTexture = this.textureLoader.load('images/flag.png');

        return new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uFrequency: {value: new THREE.Vector2(7, 5)},
                uTime: {value: 0},
                uTexture: {value: flagTexture}
            }
        })
    }

    create() {
        this.geometry = new THREE.PlaneBufferGeometry(1.8, 1, 32, 32);
        this.material = this.initMaterial();
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.position.set(0, 0, 0);
        this.mesh.rotation.set(0, 0, 0);

        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.container.add(this.mesh);
    }
}
