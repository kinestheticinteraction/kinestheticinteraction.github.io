$(window).bind("load",function() {setTimeout(addVideo, 1400);});

function addVideo(){
    
    if (document.getElementById('AROS-assign')!=null) {
    document.getElementById('AROS-assign').innerHTML= '<iframe src="https://player.vimeo.com/video/325309319?color=ffffff&byline=0&portrait=0&loop=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
    
    if (document.getElementById('gestureAnimation')!=null) {
    document.getElementById('gestureAnimation').innerHTML= '<iframe src="https://player.vimeo.com/video/325309124?color=ffffff&byline=0&portrait=0&autoplay=1&loop=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    
    $("#gestureAnimation").css("height", 700);
    
    $("#gestureAnimation").css("background-color", "#f0f0f0");
    }
    
    if (document.getElementById('training-home')!=null) {
    document.getElementById('training-home').innerHTML= '<iframe src="https://player.vimeo.com/video/330132122?color=ffffff&byline=0&portrait=0&loop=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
    
    if (document.getElementById('training-mall')!=null) {
    document.getElementById('training-mall').innerHTML= '<iframe src="https://player.vimeo.com/video/330132234?color=ffffff&byline=0&portrait=0&loop=1&muted=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
    
    if (document.getElementById('cast5')!=null) {
    document.getElementById('cast5').innerHTML= '<iframe src="https://player.vimeo.com/video/316619870?color=ffffff&byline=0&portrait=0&loop=1" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
    
    if (document.getElementById('motionxr-trailer')!=null) {
     document.getElementById('motionxr-trailer').innerHTML= '<iframe src="https://player.vimeo.com/video/256180377?color=fff&autoplay=0&byline=0&portrait=0&loop=1" width="100%" height="394px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }

    if (document.getElementById('motionxr-prototypev1')!=null) {
    document.getElementById('motionxr-prototypev1').innerHTML= '<iframe src="https://player.vimeo.com/video/322685843?color=fff&autoplay=0&byline=0&portrait=0&loop=1" width="100%" height="394px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
    
    if (document.getElementById('wish-ar')!=null) {
    document.getElementById('wish-ar').innerHTML= '<iframe src="https://player.vimeo.com/video/247730544?color=fff&autoplay=0&byline=0&portrait=0&loop=1" width="100%" height="394px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
    
    if (document.getElementById('anchor-ar')!=null) {
    document.getElementById('anchor-ar').innerHTML= '<iframe src="https://player.vimeo.com/video/241288153?color=fff&autoplay=0&byline=0&portrait=0&loop=1" width="100%" height="394px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }
    
    

};


