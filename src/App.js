import React, { useEffect } from 'react';
import { tapPlaceCursorComponent } from './tap-place-cursor';
import './App.css';
import './index.css';

function App() {
  useEffect(() => {
    window.AFRAME.registerComponent('tap-place-cursor', tapPlaceCursorComponent);
  }, []);

  return (
    <div className="App">
     <div id="nextbutton" style={{
  position: 'absolute',
  top: '10px',
  left: '10px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
}}>
  <button id="button1">Tree</button>
  <button id="button2">Castle</button>
  <button id="button4">Scale On</button>
  <button id="button3">Scale Off</button>
</div>
      <a-scene
        webxr="optionalFeatures: hit-test, local-floor"
        ar-hit-test="target:#my-target;"
        gesture-detector
        raycaster="objects: .clickable"
        renderer="colorManagement: true"
      >
        <a-assets>
        <a-asset-item id="treeModel" src="/models/castle.glb"></a-asset-item>
<a-asset-item id="secondModel" src="/models/tree.glb"></a-asset-item>
        </a-assets>

        <a-camera
          id="camera"
          position="0 1.6 0"
          raycaster="objects: .clickable"
          cursor="fuse: false; rayOrigin: mouse;"
        ></a-camera>

<a-plane
  id="ground"
  rotation="-90 0 0"
  width="1000"
  height="1000"
  material="color: #7BC8A4; transparent: true; opacity: 0.2"
  shadow="receive: true"
  class="clickable"
></a-plane>

  <a-ring
  tap-place-cursor
  rotation="-90 0 0"
  material="shader: flat; color: #5AC8FA; opacity: 0.8"
  radius-inner="0.1"
  radius-outer="0.15"
  class="clickable"
></a-ring>

<a-entity
  position="0 2 -3"
  text="value: Tap to place objects; color: white; align: center; width: 2"
></a-entity>

        <a-light type="ambient" intensity="0.5"></a-light>

        <a-entity id="my-target"></a-entity>
      </a-scene>
    </div>
  );
}

export default App;