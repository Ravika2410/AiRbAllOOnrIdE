var balloon;
var b;
var bg;
var db,p;

function preload()
{
    bg=loadImage("bg.jpeg");
    b=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}

function setup()
{
    createCanvas(500,500);

    balloon=createSprite(175,175,60,60);
    balloon.addAnimation("moving",b);
    balloon.scale=0.5;

    db=firebase.database();
    p=db.ref("Balloon/Position");
    p.on("value",readdb,se);

}

function draw()
{

    background(bg);

    if(keyDown(UP_ARROW))
    {
        writedb(0,-10);
    }

    if(keyDown(DOWN_ARROW))
    {
        writedb(0,10);
    }
  
    if(keyDown(RIGHT_ARROW))
    {
        writedb(10,0);
    }

    if(keyDown(LEFT_ARROW))
    {
        writedb(-10,0);
    }

drawSprites();


}

function readdb(data)
{
    console.log(data.val());
    balloon.x=data.val().x;
    balloon.y=data.val().y;
}

function se()
{
    console.log("failtocommunicate");
}

function writedb(x,y)
{
    p.set({"x":balloon.x+x,
           "y":balloon.y+y});
}