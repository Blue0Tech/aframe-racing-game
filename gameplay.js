let offset = 0;
AFRAME.registerComponent("gameplay",{
    init: function() {
        setInterval(()=>this.incrementTimer(),1000);
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