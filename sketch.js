let iss, iss_I;

var alarm;

var guy;

var bath;
var sleep;
var gym, gym_2;
var move;
var bath;
var drink;
var eat;
var brush;
var still;
var execute = true;

var animationNo = 0;


function preload () {
  // IMG loading
  iss_I = loadImage ("Images/iss.png");

  // Animation Loading
  sleep = loadAnimation ("Images/sleep.png");
  still = loadAnimation ("Images/move1.png");
  move = loadAnimation ("Images/move1.png", "Images/move2.png");
  brush = loadAnimation ("Images/brush.png");
  bath = loadAnimation ("Images/bath1.png", "Images/bath2.png");
  gym = loadAnimation ("Images/gym1.png", "Images/gym2.png");
  gym_2 = loadAnimation ("Images/gym11.png", "Images/gym12.png");
  drink = loadAnimation ("Images/drink1.png", "Images/drink2.png");
  eat = loadAnimation ("Images/eat1.png", "Images/eat2.png");
  
  // Sound loading
  alarm = loadSound ("Sounds/alarmSound.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  guy = createSprite (400, 200);
  guy.scale = 0.1;
  guy.rotation = -90;

  guy.addAnimation ("sleeping", sleep); 
  guy.addAnimation ("vibin", still);
  guy.addAnimation ("moving", move);
  guy.addAnimation ("brushing", brush);
  guy.addAnimation ("bathing", bath);
  guy.addAnimation ("workOut_1", gym);
  guy.addAnimation ("drinking", drink);
  guy.addAnimation ("eating", eat);
  guy.addAnimation ("workOut_2", gym_2);

  imageMode (CENTER);
}

function draw() {
  imageMode (CENTER);
  background(255,255,255);
  
  fill ("Red");
  textSize (20);

  image (iss_I, width/2, height/2, width, height);

  if (animationNo == 0) {
    text ("Press 'up arrow' to wake the astronaut up (This will work when the text disappears)", 50, 50);

    if (World.seconds == 10) { 
      animationNo += 0.4;
    }
  }

  if (animationNo == 1) {
    text ("Press 'space' to move the astronaut and he'll start brushing", 100, 75);
  } else if (animationNo == 2.4) {
    text ("Press 'c' so the astronaut bathes", 100, 75)
  } else if (animationNo == 2.7) {
    text ("Press 'space' so the astronaut goes for the breakfast", 100, 75);
  } else if (animationNo == 3.1) {
    text ("Press 'space' so the astronaut exercises. The man's been getting fat", 100, 75);
  } else if (animationNo == 4) {
    text ("Ok, that's enough exercising, now he shall eat and then sleep. Press 'e' so he eats", 25, 50);
  } else if (animationNo == 4.4) {
    text ("Alright, time to sleep, press 's' so the astronaut sleeps", 25, 50)
  } else if (animationNo == 5) {
    text ("So here was an astronaut's daily routine.. or maybe that's the routine which I think is right..", width/2 - 350, 50);
    fill ("Green");
    stroke ("blue");
    strokeWeight (6);
    text ("Anyways, Bye!!", width/2 - 38, 90);
  }

  if (keyDown ('up_arrow') &&  animationNo == 0.4) {
    if (animationNo!== 0.9) {
      animationNo += 0.5;
    }
    
    alarm.play ();
  } else if (keyDown ('space') && animationNo == 1) {
      animationNo = 1.5;
      console.log(`guy.x ${guy.x}`);

    guy.changeAnimation ("moving");
  
  } else if (keyDown ('c') && animationNo == 2.4) {
    guy.changeAnimation ("bathing");
    animationNo = 2.6
    // AnimationNo ---> 2.7 (astronautFunctions);

  } else if (keyDown ('space') && animationNo == 2.7) {
    guy.changeAnimation ("moving");
      animationNo = 2.9;
      console.log (`animationNo:  ${animationNo}`);
  
  } else if (keyDown ('space') && animationNo == 3.1) {
    guy.changeAnimation ("workOut_1");
    animationNo = 3.2;

  } else if (keyDown ('e') && animationNo == 4) {
    guy.changeAnimation ("eating");
    
    animationNo = 4.2;
  } else if (keyDown ('s') && animationNo == 4.4) {
    guy.rotation = 90;
    guy.changeAnimation ("sleeping")
    
    animationNo = 5;
  }
  
  astronautFunctions ();
  guyMoving ();

  drawSprites();
}


function astronautFunctions () {
  if (animationNo == 0.9 || animationNo == 2 || animationNo == 2.6 || 
      animationNo == 3 || animationNo == 3.2 || animationNo == 4.2) {
    const n = World.seconds;
    customDelay (n);
   
    if (World.seconds === m) {
      if (animationNo == 0.9) {
        guy.rotation = 0;
        guy.changeAnimation ("vibin");
      
        animationNo = 1;
      } else if (animationNo == 2) {
        animationNo = 2.4;
      } else if (animationNo == 2.6) {
        animationNo = 2.7;
      } else if (animationNo == 3) {
        animationNo = 3.1;
      } else if (animationNo == 3.2) {
        animationNo = 4;
      } else if (animationNo == 4.2) {
        animationNo = 4.4;
      }
      delete m;
      delete n;
      execute = true; 
    }
  }
}

function guyMoving () {
  console.log (`AnimationNo: ${animationNo}`);

  if (animationNo == 1.5) {
    if (guy.x == 400) {
      guy.velocityX = -2;
    } else if (guy.x <= 275) {
      guy.velocityX = 0;
      
      guy.changeAnimation ("brushing");
  
      animationNo += 0.5;
      console.log (`animationNo: ${animationNo}`);
    }
  } else if (animationNo == 2.9) {
    if (guy.x <= 275) {
      guy.velocityX = 2;
      // guy.rotation = guy.rotation + 15;
    } else if (guy.x >= 400) {
      guy.velocityX = 0;
     
      guy.changeAnimation ("eating");

      animationNo = 3;
      
    }
  }
}

function customDelay (n) {
  if (execute == true) {
    m = 0

    console.log (`Seconds: ${n}`);
    m = n + 8; 
   
    execute = false;
  }
}