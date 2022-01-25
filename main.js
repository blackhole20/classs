var video="";

var status="";

var objects=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);

    if (status !="") {
        objectDetector.detect(video,gotresult);
        for (i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status : objects detected";
            document.getElementById("numberofobjects").innerHTML="number of objects detected are : "+objects.length;

            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+' '+percent+"%",objects[i].x+20,objects[i].y+20);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modalloaded);
    document.getElementById("status").innerHTML="status : detecting objects";
}

function modalloaded(){
console.log("modalloaded");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotresult(error,result){
if (error) {
    console.error(error);
}
console.log(result);
objects=result;
}