import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x50bcdf)

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(1, 3, 3)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.shadowMap.enabled = true
  document.body.appendChild(renderer.domElement)

  // Orbitcontrols
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2
  controls.maxDistance = 15
  controls.maxPolarAngle = Math.PI / 2
  controls.update()

  // 텍스처 추가
  const textureLoader = new THREE.TextureLoader()
  const planeTextureBaseColor = textureLoader.load(
    '../static/img/Brick_Wall_019_basecolor.jpg'
  )
  const planeTextureNormalMap = textureLoader.load(
    '../static/img/Brick_Wall_019_normal.jpg'
  )
  const planeTextureHeightMap = textureLoader.load(
    '../static/img/Brick_Wall_019_height.png'
  )
  const planeTextureRoughnessMap = textureLoader.load(
    '../static/img/Brick_Wall_019_roughness.jpg'
  )
  const sphereTextureBaseColor = textureLoader.load(
    '../static/img/Lapis_Lazuli_002_basecolor.jpg'
  )
  const sphereTextureNormalMap = textureLoader.load(
    '../static/img/Lapis_Lazuli_002_normal.jpg'
  )
  const sphereTextureHeightMap = textureLoader.load(
    '../static/img/Lapis_Lazuli_002_height.png'
  )
  const sphereTextureRoughnessMap = textureLoader.load(
    '../static/img/Lapis_Lazuli_002_roughness.jpg'
  )
  const boxTextureBaseColor = textureLoader.load(
    '../static/img/Sci_fi_Metal_Panel_004_basecolor.jpg'
  )
  const boxTextureNormalMap = textureLoader.load(
    '../static/img/Sci_fi_Metal_Panel_004_normal.jpg'
  )
  const boxTextureHeightMap = textureLoader.load(
    '../static/img/Sci_fi_Metal_Panel_004_height.png'
  )
  const boxTextureRoughnessMap = textureLoader.load(
    '../static/img/Sci_fi_Metal_Panel_004_roughness.jpg'
  )

  // 도형 1
  const geometry = new THREE.SphereGeometry(0.5, 32, 32)
  const material = new THREE.MeshStandardMaterial({
    map: sphereTextureBaseColor,
    normalMap: sphereTextureNormalMap,
    displacementMap: sphereTextureHeightMap,
    displacementScale: 0.03,
    roughnessMap: sphereTextureRoughnessMap,
    roughness: 0.8,
  })
  const obj = new THREE.Mesh(geometry, material)
  obj.position.set(-2, 0.3, 0)
  scene.add(obj)
  obj.castShadow = true

  // 도형2
  const geometry2 = new THREE.BoxGeometry(1, 1, 1)
  const material2 = new THREE.MeshStandardMaterial({
    map: boxTextureBaseColor,
    normalMap: boxTextureNormalMap,
    displacementMap: boxTextureHeightMap,
    displacementScale: 0.03,
    roughnessMap: boxTextureRoughnessMap,
    roughness: 0.8,
  })
  const obj2 = new THREE.Mesh(geometry2, material2)
  obj2.position.set(2, 0.3, 0)
  scene.add(obj2)
  obj2.castShadow = true
  obj2.receiveShadow = true

  // 바닥
  const PlaneGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: planeTextureBaseColor,
    normalMap: planeTextureNormalMap,
    displacementMap: planeTextureHeightMap,
    displacementScale: 0.01,
    roughnessMap: planeTextureRoughnessMap,
    roughness: 0.8,
  })
  const plane = new THREE.Mesh(PlaneGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.2
  scene.add(plane)
  plane.receiveShadow = true

  // 빛
  const directionLight = new THREE.DirectionalLight(0xffffff, 0.9)
  directionLight.position.set(-1.5, 2.5, 1)
  const dlHelper = new THREE.DirectionalLightHelper(
    directionLight,
    0.2,
    0x0000ff
  )
  scene.add(dlHelper)
  scene.add(directionLight)
  directionLight.castShadow = true
  directionLight.shadow.mapSize.width = 2048
  directionLight.shadow.mapSize.height = 2048
  directionLight.shadow.radius = 8

  // 애니메이션
  function animate() {
    const af = requestAnimationFrame(animate)

    let xDif = obj.position.x - obj2.position.x

    if (xDif < 1.1 && xDif > -1.1) {
      obj.position.x = 0.95
    } else {
      obj.position.x += 0.03
      obj.rotation.z -= 0.07
    }
    controls.update()
    renderer.render(scene, camera)
  }
  animate()

  // 반응형
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
