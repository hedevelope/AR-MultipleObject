import './App.css';
import AFRAME from 'aframe';
import { tapPlaceCursorComponent } from './tap-place-cursor';
import './index.css';

AFRAME.registerComponent('tap-place-cursor', tapPlaceCursorComponent);
function App() {
  return (
    <div className="App">
   <div id="nextbutton" style={{ zIndex: '10 !important' }}>
  <button id="button1">Tree</button>
  <button id="button2">Castle</button>
  <button id="button4">Scale On</button>
  <button id="button3">Scale Off</button>
</div>
<a-scene
  xrextras-gesture-detector
  landing-page
  xrextras-loading
  xrextras-runtime-error
  renderer="colorManagement: true"
  xrweb="allowedDevices: any"
>
  <a-assets>
    <a-asset-item id="treeModel" src="./scene.gltf"></a-asset-item>
    <a-asset-item id="secondModel" src="scene.gltf"></a-asset-item>
  </a-assets>

  <a-camera
    id="camera"
    position="0 8 0"
    raycaster="objects: .cantap"
    cursor="fuse: false; rayOrigin: mouse;"
  >
  </a-camera>

  <a-ring
    tap-place-cursor
    rotation="-90 0 0"
    material="shader: flat; color: #5AC8FA"
    radius-inner="0.5"
    radius-outer="0.8"
  >
  </a-ring>
  <a-entity
    light="
      type: directional;
      intensity: 0.8;
      castShadow: true;
      shadowMapHeight:2048;
      shadowMapWidth:2048;
      shadowCameraTop: 20;
      shadowCameraBottom: -20;
      shadowCameraRight: 20;
      shadowCameraLeft: -20;
      target: #camera"
    xrextras-attach="target: camera; offset: 8 15 4"
    position="1 4.3 2.5"
    shadow
  >
  </a-entity>
  <a-light type="ambient" intensity="0.5"></a-light>

  <a-box
    id="ground"
    scale="1000 2 1000"
    position="0 -1 0"
    material="shader: shadow; transparent: true; opacity: 0.4"
    shadow
  >
  </a-box>
</a-scene>

    </div>
  );
}

export default App;
