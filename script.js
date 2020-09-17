let Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Body = Matter.Body;

let engine; 
let world;
let boxes = [];
let bubbles = [];
let platforms = [];
//let ground;
let carretest;
let backColor;
let groundColor;
let toggleButton;

let W = window.innerWidth;
let H = window.innerHeight;

let sliderFriction;
let sliderRestitution;
let sliderSpeed;
let sliderSize;
let sliderBackColor;
let sliderGroundColor;

function setup()
{
    engine = Engine.create();
    myWorld = engine.world;
    createCanvas(W, H);
    Engine.run(engine);
    rectMode(CENTER);
    // angleMode(DEGREES);
    sliderFriction = createSlider(0, 1, 1, 0.01);
    sliderFriction.position(10, H - 40);
    sliderRestitution = createSlider(0, 1, 0, 0.01);
    sliderRestitution.position(10, H - 70);
    sliderSpeed = createSlider(0, 10, 5, 1);
    sliderSpeed.position(210, H - 70);
    sliderSize = createSlider(0, 25, 0, 0.5);
    sliderSize.position(210, H - 40 );
    sliderBackColor = createSlider(0, 255, 0, 1);
    sliderBackColor.position(W - 210 , H - 40);
    sliderGroundColor = createSlider(0, 255, 255, 1);
    sliderGroundColor.position(W - 210, H - 70);
    toggleButton = createButton("(^.^)");
    toggleButton.position(W/2, H - 50);
    toggleButton.mousePressed(callClear);
    //ground = Bodies.rectangle(W/2, H - 100, W-10, 10, {isStatic : true});
   // World.add(myWorld, ground);
    for (i = 0; i < 25; i++)
    {
        platforms.push(Bodies.rectangle((W/25)*i + W/20, random(300 , H - 200), 150, 20, {isStatic : true}));
        Body.rotate(platforms[i], i * PI/6);   
        World.add(myWorld, platforms[i]);
    }
    strokeWeight(0);
    noStroke();
}
function callClear()
{
    clear();
}
function changeForm()
{
    console.log("à coder");
}

function mouseDragged()
{
    let friction = sliderFriction.value();
    let restitution = sliderRestitution.value();
    let size = sliderSize.value();
    //boxes.push(new makeBox(mouseX, mouseY, 200 + random(100), 100 + random(200)));
    if (mouseY < H - 100 && Math.floor(frameRate())%2 == 0)
    {
        bubbles.push(new makeBubble(mouseX, mouseY, size + random(5), friction, restitution));
    }
}

function keyPressed()
{
    if (keyCode == "c")
    {
        bubbles = [];
    }
}

function draw()
{
    let friction = sliderFriction.value();
    let restitution = sliderRestitution.value();
    let size = sliderSize.value();
    let speed = sliderSpeed.value();
    console.log(speed);
    for (let i = 0; i<speed + 1; i++) 
    {
        if (random(1) > 0.5)
        {
            bubbles.push(new makeBubble(random(W), 0, size + random(5), friction, restitution));
            //boxes.push(new makeBox(random(W), 0, size + random(5), friction, restitution)); 
        }
    }
    backColor = sliderBackColor.value();
    groundColor = sliderGroundColor.value();
    background(backColor);
    fill(groundColor);
    //rect(ground.position.x, ground.position.y, W-10, 10);
    for (i in platforms)
    {
        push();
        translate(platforms[i].position.x, platforms[i].position.y);
        rotate(i* PI/6);
        rect(0, 0, 150, 20);
        pop();
    }
    // for (i in boxes)
    // {
    //     fill(i%255, 10 + i%100, 10 + boxes[i].w%255);
    //     boxes[i].show();
    // }
    for (j in bubbles)
    {
        fill(j%150, 10 + j%245, 10 + j%50);
        bubbles[j].show();
    }
}