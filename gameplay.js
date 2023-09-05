let offset = 0;
AFRAME.registerComponent("gameplay",{
    init: function() {
        setInterval(()=>this.incrementTimer(),1000);
        let cameraRig = document.getElementById('cameraRig');
        cameraRig.addEventListener('collide',(collision)=>{
            console.log(collision);
        });
    },
    incrementTimer: function() {
        let timer = document.getElementById('timer');
        offset += 1;
        setText = "TIME: " + offset.toString();
        timer.setAttribute('text',{
            value: setText
        });
    }
});