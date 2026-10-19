/**
 * Static 3D model asset registry for lielwainberg.com
 * All GLB files are hosted locally in /models/ for fast, reliable delivery in any environment.
 */

export const MODEL_PATHS = {
  // Digital / Systems
  aiCore: "/models/web/ai_core.glb",
  cube: "/models/web/cube.glb",
  system: "/models/web/system.glb",
  code: "/models/web/code.glb",
  balldigital: "/models/web/balldigital.glb",

  // Canine / Training
  dogHead: "/models/web/dog_head.glb",
  dog: "/models/web/dog.glb",
  bone: "/models/web/bone.glb",
  clicker: "/models/web/clicker.glb",
  whistle: "/models/web/whistle.glb",
  collar: "/models/web/collar.glb",
  ball: "/models/web/ball.glb",

  // Liquid / Hospitality
  coupe: "/models/web/coupe_glass.glb",
  shaker: "/models/web/shaker.glb",
  jigger: "/models/web/jugger.glb",
  whiskey: "/models/web/whiskey_bottle.glb",
  ice: "/models/web/ice_cube.glb",
} as const;

export type ModelKey = keyof typeof MODEL_PATHS;
