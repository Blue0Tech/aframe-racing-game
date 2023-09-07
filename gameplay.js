let offset = 0;
let oldPos = {x:0,y:0,z:0};
let currentLap = 1;
let gameFinished = false;
AFRAME.registerComponent("gameplay",{
    init: function() {
        setInterval(()=>this.incrementTimer(),1000);
    },
    incrementTimer: function() {
        let timer = document.getElementById('timer');
        if(!gameFinished) {
            offset += 1;
        }
        setText = "TIME: " + offset.toString();
        timer.setAttribute('text',{
            value: setText
        });
    },
    manageCollisions: function() {
        let camera = document.getElementById('camera');
        let camPos = camera.object3D.position;
        let camVel = camera.getAttribute('velocity');
        if(camPos.x > -6 && camPos.z > -26 && camPos.z < 14) {
            if(camPos.x < -2) {
                if(camVel.x < 0) {
                    camVel.x = -1 * camVel.x;
                };
            } else if(camPos.x > 2) {
                if(camVel.x > 0) {
                    camVel.x = -1 * camVel.x;
                };
            };
        } else if(camPos.x < -70 && camPos.z > -26 && camPos.z < 14) {
            if(camPos.x < -78) {
                if(camVel.x < 0) {
                    camVel.x = -1 * camVel.x;
                };
            } else if(camPos.x > -74) {
                if(camVel.x > 0) {
                    camVel.x = -1 * camVel.x;
                };
            };
        } else if(camPos.z < -38 && camPos.x < -18 && camPos.x > -58) {
            if(camPos.z > -42) {
                if(camVel.z > 0) {
                    camVel.z = -1 * camVel.z;
                };
            } else if(camPos.z < -46) {
                if(camVel.z < 0) {
                    camVel.z = -1 * camVel.z;
                };
            };
        } else if(camPos.z > 26 && camPos.x < -18 && camPos.x > -58) {
            if(camPos.z > 34) {
                if(camVel.z > 0) {
                    camVel.z = -1 * camVel.z;
                };
            } else if(camPos.z < 30) {
                if(camVel.z < 0) {
                    camVel.z = -1 * camVel.z;
                };
            };
        };
    },
    manageLaps: function() {
        let camera = document.getElementById('camera');
        let camPos = camera.object3D.position;
        if(camPos.x > -6 && camPos.x < 6) {
            if(camPos.z <= 2 && oldPos.z >= 2) {
                let lapsEnt = document.getElementById('lapCount');
                let lapsAtt = lapsEnt.getAttribute('text');
                if(currentLap < 3) {
                    currentLap += 1;
                    lapsAtt.value = "LAPS: " + currentLap.toString();
                    lapsEnt.setAttribute('text',lapsAtt);
                } else {
                    lapsAtt.value = "FINISHED";
                    lapsEnt.setAttribute('text',lapsAtt);
                    gameFinished = true;
                }
            };
        };
        oldPos.z = camPos.z;
        oldPos.y = camPos.y;
        oldPos.x = camPos.x;
    },
    tick: function() {
        this.manageCollisions();
        this.manageLaps();
    }
});