let speed = 0.1;
AFRAME.registerComponent('drive',{
    init: function() {
        this.driveControls();
    },
    driveControls: function() {
        let camera = document.querySelector('#camera');
        window.addEventListener('keydown',(key)=>{
            let cameraRig = document.querySelector('#cameraRig');
            var cameraRotation = cameraRig.getAttribute('rotation');
            var cameraPosition = cameraRig.getAttribute('position');
            var cameraMovement = cameraRig.getAttribute('movement-controls');
            
            let disabledKeys = ["KeyW","KeyA","KeyS","KeyD","ArrowDown","ArrowLeft","ArrowRight"];

            if(key.code=="ArrowUp") {
                if(cameraMovement.speed != 0) {
                    cameraMovement.speed += 0.01;
                    speed = cameraMovement.speed;
                } else {
                    cameraMovement.speed = speed + 0.01;
                    speed += 0.01;
                };
                cameraRig.setAttribute('movement-controls',cameraMovement);
                let accelerator = document.querySelector('#acc');
                accelerator.setAttribute('color','green');
            }

            if(key.code=="Space") {
                cameraMovement.speed *= 0.96;
                cameraRig.setAttribute('movement-controls',cameraMovement);
                let brake = document.querySelector('#brake');
                brake.setAttribute('color','red');
            }
            
            if(disabledKeys.includes(key.code)) {
                cameraMovement.speed = 0;
                cameraRig.setAttribute('movement-controls',cameraMovement);
            }
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
        });
    }
});