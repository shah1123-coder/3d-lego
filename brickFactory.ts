import * as THREE from 'three'

export type BrickType = '2x2'

const BRICK_HEIGHT = 1.2 // correct height of LEGO brick without studs
const STUD_HEIGHT = 0.225
const STUD_RADIUS = 0.3 // radius = diameter/2 → 0.6/2 = 0.3

const BRICK_SIZES: Record<BrickType, { width: number; depth: number }> = {
  '2x2': { width: 2, depth: 2 },
}

export function createBrick(type: BrickType, color: string): THREE.Group {
  const size = BRICK_SIZES[type]

  // Base cube of the brick
  const geometry = new THREE.BoxGeometry(size.width, BRICK_HEIGHT, size.depth)
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.5,
    metalness: 0.1,
  })
  const brick = new THREE.Mesh(geometry, material)

  // Group to hold brick and studs
  const group = new THREE.Group()
  group.add(brick)

  for (let x = 0; x < size.width; x++) {
    for (let z = 0; z < size.depth; z++) {
      const studGeometry = new THREE.CylinderGeometry(STUD_RADIUS, STUD_RADIUS, STUD_HEIGHT, 16)
      const studMaterial = new THREE.MeshStandardMaterial({ color })
      const stud = new THREE.Mesh(studGeometry, studMaterial)
  
      stud.position.set(
        x - size.width / 2 + 0.5,
        BRICK_HEIGHT / 2 + STUD_HEIGHT / 2,
        z - size.depth / 2 + 0.5
      )
  
      group.add(stud)
    }
  }
  

  return group
}
