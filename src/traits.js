#include params.js

var roar = roaringChance / 100;   
var mouthClosed = (roaringChance + shutMouthChance )/ 100;   
var leaning = leaningForwardChance / 100;
var observing = (leaningForwardChance + observingBehindChance) / 100; 
var running = runningChance / 100;
var sillyRunning = (runningChance + sillyRunChance) / 100;
var flipped = 50 / 100;    
var leftFoot = 50 / 100;  
var scarfChance = tammedChance / 100;

function IsFlipped() {
    return Math.random(100) <= flipped;
}

function GetPose() {
    const rand = Math.random(100);
    
    if (rand < leaning) 
        return 'pose3'; 
    else if (rand < observing) 
        return 'pose2';
    else 
        return 'pose1';
}

function GetMouth() {
    const rand = Math.random(100);
    
    if (rand < roar) 
        return 'jaw_roar';
    else if (rand < mouthClosed) 
        return 'jaw_closed'; 
    else 
        return 'jaw_normal'; 
}

function GetLegs() {
    const isLeftRand = Math.random(100);
    const isRunningRand = Math.random(100);
    const isSillyRunningRand = Math.random(100);

    const isLeft = isLeftRand <= leftFoot;
    const isRunning = isRunningRand <= running;
    const isSillyRunning = isSillyRunningRand <= sillyRunning;
    
    if (isRunning && isLeft) 
        return ['left_running', 'right_standing']
    else if (isRunning && !isLeft)
        return ['left_standing', 'right_running']
    else if (isSillyRunning && isLeft)
        return ['left_silly_running', 'right_standing']
    else if (!isRunning)
        return ['left_standing', 'right_standing']
}

function GetScarf() {
    return Math.random(100) <= scarfChance;
}