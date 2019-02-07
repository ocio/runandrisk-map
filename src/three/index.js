import * as THREE from 'three'
import * as d3 from './d3'
import ThreeIsoGameCamera from '/mnt/c/Users/enzo/drive/projects/three-iso-game-camera/'

export function createThreeWorld(canvas) {
    const sceneTerrain = new THREE.Scene()
    const sceneSprites = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    })
    const camera = new THREE.PerspectiveCamera(
        2, // fov
        window.innerWidth / window.innerHeight, // aspect
        1, // near
        99999 // far
    )
    const distance = 1000
    const isoCamera = new ThreeIsoGameCamera({
        angleH: 45,
        angleV: 35,
        distance,
        // distanceMin: distance / 1.5,
        distanceMax: distance * 2,
        camera,
        renderer,
        THREE,
        d3
    })
    isoCamera.startRender(sceneTerrain, sceneSprites)

    return {
        renderer,
        sceneTerrain,
        sceneSprites,
        camera,
        isoCamera
    }
}