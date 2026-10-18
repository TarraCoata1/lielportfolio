/**
 * Static 3D model asset registry for lielwainberg.com
 * All GLB files are hosted locally in /models/ for fast, reliable delivery in any environment.
 */

export const MODEL_PATHS = {
  // Digital / Systems
  aiCore: "/models/ai_core.glb",
  cube: "/models/cube.glb",
  system: "/models/system.glb",
  code: "/models/code.glb",
  balldigital: "/models/balldigital.glb",

  // Canine / Training
  dogHead: "/models/dog_head.glb",
  dog: "/models/dog.glb",
  bone: "/models/bone.glb",
  clicker: "/models/clicker.glb",
  whistle: "/models/whistle.glb",
  collar: "/models/collar.glb",
  ball: "/models/ball.glb",

  // Liquid / Hospitality
  coupe: "/models/coupe_glass.glb",
  shaker: "/models/shaker.glb",
  jigger: "/models/jugger.glb",
  whiskey: "/models/whiskey_bottle.glb",
  ice: "/models/ice_cube.glb",
} as const;

export type ModelKey = keyof typeof MODEL_PATHS;
