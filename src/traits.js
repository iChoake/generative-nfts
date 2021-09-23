#include params.js

var roar = roaringChance / 100;   
var mouthClosed = (roaringChance + shutMouthChance )/ 100;  
var openedMouth = openedMouthChance / 100; 
var leaning = leaningForwardChance / 100;
var observing = (leaningForwardChance + observingBehindChance) / 100; 
var running = runningChance / 100;
var isImmobile = isImmobileChance / 100;
var standing = standingChance / 100;
var sillyRunning = (runningChance + sillyRunChance) / 100;
var flipped = 50 / 100;    
var leftFoot = 50 / 100;  
var tammed = tammedChance / 100;
var notTammed = notTammedChance / 100;
var isEgg = isEggChance / 100;
var isSin = isSinChance / 100;
var isCookie = (isSinChance + isCookieChance) / 100;
var isVert = (isSinChance + isCookieChance + isVertChance) / 100;
var isHori = (isSinChance + isCookieChance + isVertChance + isHoriChance) / 100;

function ChooseTraits() {
    const flipState = IsFlipped();
    const poseState = GetPose();
    const mouthState = GetMouth();
    const legsState = GetLegs();
    const scarfState = GetScarf();
    const pattern = GetPattern();

    return {
        flipState: flipState,
        legsState: legsState[0],
        poseState: poseState[0],
        mouthState: mouthState[0],
        scarfState: scarfState[0],
        pattern: pattern[0]
    }
} 

function IsFlipped() {
    return Math.random() <= flipped;
}

function GetPose() {
    const rand = Math.random();
    
    if (rand < leaning) return ['pose3', leaningForwardChance]; 
    else if (rand < observing) return ['pose2', observingBehindChance];
    else return ['pose1', standingChance];
}

function GetMouth() {
    const rand = Math.random();
    
    if (rand < roar) return ['jaw_roar', roaringChance];
    else if (rand < mouthClosed) return ['jaw_closed', shutMouthChance]; 
    else return ['jaw_normal', openedMouthChance]; 
}

function GetLegs() {
    const rand = Math.random();
    const isLeft = rand <= leftFoot;
    const isRunning = rand <= running;
    const isSillyRunning = rand <= sillyRunning;
    
    if (isRunning && isLeft) return [['left_running', 'right_standing'], runningChance];
    else if (isRunning && !isLeft) return [['left_standing', 'right_running'], runningChance];
    else if (isSillyRunning && isLeft) return [['left_silly_running', 'right_standing'], sillyRunChance];
    else if (!isRunning) return [['left_standing', 'right_standing'], isImmobileChance];
}

function GetScarf() {
    if (Math.random() <= tammed) return [true, tammedChance];
    else return [false, notTammedChance];
}

function GetPattern() {
    const rand = Math.random();

    if (isSin >= rand) return ['Sin pattern', isSinChance];
    else if (isCookie >= rand) return ['Cookie pattern', isCookieChance];
    else if (isVert >= rand) return ['Vertical pattern', isVertChance];
    else if (isHori >= rand) return ['Horizontal pattern', isHoriChance];
    else if (rand < 0.025) return ['None', 0.025];
    else return ['Egg pattern', isEggChance];
}