AFRAME.registerComponent('control',{
    init: function() {
        let camera = document.getElementById('camera');
        // camera.removeAttribute('wasd-controls');
        let cameraRig = document.getElementById('cameraRig');
        var cameraMovement = cameraRig.getAttribute('movement-controls');
        camera.setAttribute('velocity',[]);
        window.addEventListener('keydown',(key)=>{
            // let vel = camRig.getAttribute('movement-controls');
            // console.log(vel);
            if(key.key == "ArrowUp") {
                // vel.speed = 1 - ((1 - vel.speed) * 0.98);
                // camRig.setAttribute('movement-controls',vel);
                var direction = new THREE.Vector3();
                camera.object3D.getWorldDirection(direction);
                let camVel = camera.getAttribute('velocity');
                // let of2 = camVel.x ** 2 + camVel.y ** 2 + camVel.z ** 2;
                // let oldFactor = Math.sqrt(of2)/2;
                // // let oldFactor = camera.getAttribute('velocity').z;
                // // oldFactor *= -1;
                // let factor = 1 - ((1 - oldFactor) * 0.98);
                // // factor *= -1;
                // // camera.setAttribute('velocity',{z:factor});
                camVel.x -= ((direction.x/20) * 0.2 * (10 - Math.sqrt(camVel.x ** 2)));
                // camVel.y -= ((direction.y/20) * 0.2 * (10 - Math.sqrt(camVel.y ** 2)));
                camVel.z -= ((direction.z/20) * 0.2 * (10 - Math.sqrt(camVel.z ** 2)));
                camera.setAttribute('velocity',{x: camVel.x, y: camVel.y, z: camVel.z});
                // console.log(camVel.z);
                let accelerator = document.querySelector('#acc');
                accelerator.setAttribute('color','green');
            }
            else if(key.key == " ") {
                // vel.speed *= (1 - ((1 - vel.speed) * 0.2));
                // camRig.setAttribute('movement-controls',vel);
                let oldx = camera.getAttribute('velocity').x/10;
                let oldy = camera.getAttribute('velocity').y/10;
                let oldz = camera.getAttribute('velocity').z/10;
                let newx = oldx * (1 - ((1 - Math.abs(oldx)) * 0.2));
                let newy = oldy * (1 - ((1 - Math.abs(oldy)) * 0.2));
                let newz = oldz * (1 - ((1 - Math.abs(oldz)) * 0.2));
                camera.setAttribute('velocity',{x:newx*10,y:newy*10,z:newz*10});
                let brake = document.querySelector('#brake');
                brake.setAttribute('color','red');
            }
            if(key.key == "ArrowLeft") {
                var direction = new THREE.Vector3();
                camera.object3D.getWorldDirection(direction);
                let camVel = camera.getAttribute('velocity');
                let oldx = direction.x;
                let oldz = direction.z;
                direction.x = oldz;
                direction.z = -1 * oldx;
                camVel.x -= ((direction.x/20) * 0.4 * (10 - Math.sqrt(camVel.x ** 2)));
                camVel.z -= ((direction.z/20) * 0.4 * (10 - Math.sqrt(camVel.z ** 2)));
                camera.setAttribute('velocity',{x: camVel.x, y: camVel.y, z: camVel.z});
                let steering = document.getElementById('steering');
                let steeringRotation = steering.getAttribute('rotation');
                steeringRotation = "0 0 30";
                steering.setAttribute('rotation',steeringRotation);
            }
            else if(key.key == "ArrowRight") {
                var direction = new THREE.Vector3();
                camera.object3D.getWorldDirection(direction);
                let camVel = camera.getAttribute('velocity');
                let oldx = direction.x;
                let oldz = direction.z;
                direction.z = oldx;
                direction.x = -1 * oldz;
                camVel.x -= ((direction.x/20) * 0.4 * (10 - Math.sqrt(camVel.x ** 2)));
                camVel.z -= ((direction.z/20) * 0.4 * (10 - Math.sqrt(camVel.z ** 2)));
                camera.setAttribute('velocity',{x: camVel.x, y: camVel.y, z: camVel.z});
                let steering = document.getElementById('steering');
                let steeringRotation = steering.getAttribute('rotation');
                steeringRotation = "0 0 -30";
                steering.setAttribute('rotation',steeringRotation);
            }
            // if(key.key == "q"  && camera.object3D.position.y > 5) {
            // //     vel.y += 0.05;
            // //     camRig.setAttribute('speed',vel);
            //     let rot = camera.object3D.rotation;
            //     let pos = camera.object3D.position;
            //     if(rot.z < 0.7) {
            //         rot.z += 0.01;
            //     };
            //     pos.x -= 0.15;
            // }
            // else if(key.key == "e" && camera.object3D.position.y > 5) {
            // //     vel.y -= 0.05;
            // //     camRig.setAttribute('speed',vel);
            //     let rot = camera.object3D.rotation;
            //     let pos = camera.object3D.position;
            //     if(rot.z > -0.7) {
            //         rot.z -= 0.01;
            //     };
            //     pos.x += 0.15;
            // };
        });
        window.addEventListener('keyup',(key)=>{
            // let cameraRig = document.querySelector('#cameraRig');
            // var cameraRotation = cameraRig.getAttribute('rotation');
            // var cameraPosition = cameraRig.getAttribute('position');
            // var cameraMovement = cameraRig.getAttribute('movement-controls');
            if(key.code=="ArrowUp") {
                // cameraMovement.speed += 0.001;
                // cameraRig.setAttribute('movement-controls',cameraMovement);
                let accelerator = document.querySelector('#acc');
                accelerator.setAttribute('color','grey');
            }
            if(key.code=="Space") {
                let brake = document.querySelector('#brake');
                brake.setAttribute('color','grey');
            }
            if(key.code=="ArrowLeft" || key.code=="ArrowRight") {
                let steering = document.getElementById('steering');
                let steeringRotation = steering.getAttribute('rotation');
                steeringRotation = "0 0 0";
                steering.setAttribute('rotation',steeringRotation);
            }
        });
    },
    tick: function() {
        let camera = document.getElementById('camera');
        let camPos = camera.getAttribute('position');
        if(camPos.y < 0.1) {
            let camVel = camera.getAttribute('velocity');
            camVel.y = Math.abs(camVel.y)/4;
            camera.setAttribute('velocity',camVel);
        };
        camera.object3D.rotation.y *= 0.99;
    }
});