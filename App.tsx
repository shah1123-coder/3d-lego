import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { createBrick } from './brickFactory'

const BRICK_HEIGHT = 1.2

function App() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)
    sceneRef.current = scene // ✅ This is CRITICAL

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current?.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(10, 10, 10)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0x404040))

    const gridHelper = new THREE.GridHelper(20, 20, 0xaaaaaa, 0xcccccc)
    gridHelper.position.y = 0
    scene.add(gridHelper)

    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      renderer.dispose()
    }
  }, [])

  // 🧱 Brick Spawning Function
  const addBrick = () => {
    console.log("=== SCENE DEBUG ===")
    console.log("Scene children count:", sceneRef.current?.children.length)
    
    sceneRef.current?.children.forEach((child, index) => {
      console.log(`Child ${index}:`, child.type, child.position, child.visible)
    })
    
    // Add a simple cube
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 2, 0)
    sceneRef.current?.add(cube)
    
    console.log("After adding cube:")
    console.log("Scene children count:", sceneRef.current?.children.length)
  }

  return (
    <>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />

      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <button
          onClick={addBrick}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#ff5252',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          ➕ Add Red Brick
        </button>
      </div>
    </>
  )
}

export default App
