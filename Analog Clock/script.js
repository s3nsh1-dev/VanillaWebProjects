setInterval(()=>{

    d = new Date();

    htime = d.getHours();
    mtime = d.getMinutes();
    stime = d.getSeconds();

    hrotation = 30*htime + mtime/2;
    mrotation = 6*mtime;
    srotation = 6*stime;

    document.getElementById("hour").style.transform = `rotate(${hrotation}deg)`
    document.getElementById("minute").style.transform = `rotate(${mrotation}deg)`
    document.getElementById("second").style.transform = `rotate(${srotation}deg)`

},1000)
// its transform not transition to rotate and must use transform-origin  = bottom to move from bottom as center 
// and its rotate({value}deg) not rotate({value})deg