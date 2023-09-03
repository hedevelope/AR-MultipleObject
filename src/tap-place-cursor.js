import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
const tapPlaceCursorComponent = {
    selectedElement: null,
  
    init() {
      this.raycaster = new THREE.Raycaster();
      this.camera = document.getElementById("camera");
      this.threeCamera = this.camera.getObject3D("camera");
      this.ground = document.getElementById("ground");
  
      this.rayOrigin = new THREE.Vector2(0, 0);
      this.cursorLocation = new THREE.Vector3(0, 0, 0);
  
      const button1 = document.getElementById("button1");
      const button2 = document.getElementById("button2");
      const button3 = document.getElementById("button3");
      const button4 = document.getElementById("button4");
  
      button1.onclick = () => {
        this.spawnModel("#treeModel");
        this.disableRotationForAll();
        this.enableRotationForLast();
      };
  
      button2.onclick = () => {
        this.spawnModel("#secondModel");
        this.disableRotationForAll();
        this.enableRotationForLast();
      };
  
      button3.onclick = () => {
        this.disableScalingForAll();
      };
      button4.onclick = () => {
        this.enableScalingForAll();
      };
  
      this.spawnModel = (model) => {
        const newElement = document.createElement("a-entity");
        newElement.setAttribute("position", this.el.object3D.position);
        newElement.setAttribute("visible", "true");
        newElement.setAttribute("scale", "20 20 20");
  
        newElement.setAttribute("gltf-model", model);
  
        newElement.setAttribute("shadow", { receive: false });
        newElement.setAttribute("xrextras-hold-drag", "");
        newElement.setAttribute("xrextras-two-finger-rotate", "");
        newElement.setAttribute("xrextras-pinch-scale", "");
  
        this.el.sceneEl.appendChild(newElement);
        newElement.addEventListener("model-loaded", () => {
          newElement.setAttribute("visible", "true");
  
          newElement.setAttribute("animation", {
            property: "scale",
            to: "50 50 50",
            easing: "easeOutElastic",
            dur: 800,
          });
        });
  
        newElement.addEventListener("click", () => {
          this.disableRotationForAll();
          newElement.setAttribute("xrextras-two-finger-rotate", "");
        });
      };
    },
  
    disableRotationForAll() {
      const entities = this.el.sceneEl.querySelectorAll("a-entity");
      entities.forEach((entity) => {
        entity.removeAttribute("xrextras-two-finger-rotate");
      });
    },
  
    enableRotationForLast() {
      const entities = this.el.sceneEl.querySelectorAll("a-entity");
      const lastEntity = entities[entities.length - 1];
      lastEntity.setAttribute("xrextras-two-finger-rotate", "");
    },
  
    disableScalingForAll() {
      const entities = this.el.sceneEl.querySelectorAll("a-entity");
      entities.forEach((entity) => {
        entity.removeAttribute("xrextras-pinch-scale");
      });
    },
    enableScalingForAll() {
      const entities = this.el.sceneEl.querySelectorAll("a-entity");
      entities.forEach((entity) => {
        entity.setAttribute("xrextras-pinch-scale", "");
      });
    },
  
    tick() {
      this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera);
      const intersects = this.raycaster.intersectObject(
        this.ground.object3D,
        true
      );
  
      if (intersects.length > 0) {
        const [intersect] = intersects;
        this.cursorLocation = intersect.point;
      }
      this.el.object3D.position.y = 0.1;
      this.el.object3D.position.lerp(this.cursorLocation, 0.4);
      this.el.object3D.rotation.y = this.threeCamera.rotation.y;
    },
  };
  
  export { tapPlaceCursorComponent };
  