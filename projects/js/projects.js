var fadeInSpeed = 500;
var fadeOutSpeed = 500;
var projects = new Array(
//	"project-crown",
//	"project-christmas-design",
//	"project-bridge",
	"project-parsons",
//	"project-ixda",
	"project-expression",
	"project-motion",
	"project-archive",
	"project-turo",
	"project-symbio",
	"project-native",
//	"project-steam",
	"project-soaphero",
//	"project-lift",
//	"project-drive",
	"project-calor",
	"project-bristol",
    "project-flash",
    "project-animatopoeia",
    "project-experiment",
    "project-webux"
);

var links = new Array(
	"../motion/motion.html",
	"../expression/expression.html",
//	"../archive/archive.html",
	"../steam/",
	"../soaphero/",
	"../symbio/symbio.html",
//	"../drive/drive.html",
	"../native",
	"../bristol",
	"../turo",
	"../calor",
    "../experiment",
    "../animatopoeia",
    "../flash"
);


function focusOn(obj){
    for (i=0; i<projects.length; i++){
        if (projects[i] != obj.id){
            $("#"+projects[i]).stop().fadeTo(fadeOutSpeed,0);
        }
        if (obj.id != "project-motion"){
            $("#project-motion").stop().fadeTo(fadeOutSpeed,1);
        } else {
            $("#project-motion").stop().fadeTo(fadeOutSpeed,0);
        }
    }
}

function focusOut(){
    for (i=0; i<projects.length; i++){
         $("#"+projects[i]).stop().fadeTo(fadeOutSpeed,1);
    }
    $("#project-motion").stop().fadeTo(fadeOutSpeed,1);
}


function getRandom(){
    var num = Math.floor(Math.random() * 11);
    console.log(num);
        console.log($("#random").attr("href"));

    $("#random").attr("href", links[num]);
}




