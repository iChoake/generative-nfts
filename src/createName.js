#include params.js

function GetCharStats(traits, spots, color, eye) {
    const rarity = GetRarity(traits, spots);
    const colorName = GetColorName(color, traits);
    const expression = GetExpression(eye, traits);
    const fullName = expression + ' ' + colorName;

    const additionalTraits = [];

    // running
    if (traits.legsState[0] == 'left_silly_running' || traits.legsState[0] == 'left_running' || traits.legsState[1] == 'right_running') additionalTraits.push('Running');
    else additionalTraits.push('Standing');
    
    // pose
    if (traits.poseState == 'pose1') additionalTraits.push('Looking fowards');
    else if (traits.poseState == 'pose2') additionalTraits.push('Looking back');
    else if (traits.poseState == 'pose3') additionalTraits.push('Hunting');
    
    // mouth
    if (traits.mouthState == 'jaw_closed') additionalTraits.push('Closed mouth');
    else if (traits.mouthState == 'jaw_normal') additionalTraits.push('Opened mouth');
    else if (traits.mouthState == 'jaw_roar') additionalTraits.push('Roaring');
    
    // tammed?
    if (traits.scarfState) additionalTraits.push('Tamed');
    else additionalTraits.push('Untamed')

    // name, rarity, color, expression, pattern, running, pose, mouth, tamed
    return [fullName, rarity, colorName, expression, traits.pattern, additionalTraits];
}

function GetExpression(eye, traits) {
    const mouth = traits.mouthState;

    const passive = [
        'Happy',
        'Calm',
        'Gentle',
        'Peaceful',
        'Lazy',
        'Tender'
    ]

    const hostile = [
        'Jealous',
        'Annoyed',
        'Hostile',
        'Angry',
        'Cocky'
    ]

    const strong_shock = [
        'Spooked',
        'Terrified',
        'Screamish',
        'Scared',
        'Frightened'
    ]

    const mild_shock = [
        'Surprised',
        'Shocked',
        'Startled'
    ]

    const bad_feeling = [
        'Anxious',
        'Depressed',
        'Sad',
        'Shy'
    ]

    const apathy = [
        'Bored',
        'Daydreaming',
        'Clueless',
        'Brainless',
        'Stubborn'
    ]

    const ignorance = [
        'Drooling',
        'Adorable',
        'Derpy',
        'Stupid',
        'Dizzy',
        'High',
        'Stoned'
    ]

    if (mouth == 'jaw_roar') {
        if(eye == 1) {
            return 'Blind';
        } else if (eye == 2 || eye == 6 || eye == 12) {
            var i = Math.floor(Math.random()*mild_shock.length); 
            return mild_shock[i];
        } else if (eye == 7 || eye == 9 || eye == 8 || eye == 10) {
            var i = Math.floor(Math.random()*strong_shock.length); 

            return strong_shock[i];
        } else if(eye == 3) {
            var i = Math.floor(Math.random()*ignorance.length);
            return ignorance[i];
        } else if (eye == 5) {
            var i = Math.floor(Math.random()*hostile.length); 
            return hostile[i];
        } else if (eye == 4 || eye == 11) {
            var list = hostile.concat(mild_shock);
            var i = Math.floor(Math.random()*list.length);
            return list[i];
        }
    } else {
        if(eye == 1) {
            return 'Blind';
        } else if (eye == 2) {
            var list = passive.concat(apathy);
            var i = Math.floor(Math.random()*list.length);
            return list[i];
        } else if (eye == 3) {
            var i = Math.floor(Math.random()*ignorance.length);
            return ignorance[i];
        } else if (eye == 4) {
            var list = passive.concat(bad_feeling);
            var i = Math.floor(Math.random()*list.length); 
            return list[i];
        } else if (eye == 5) {
            var i = Math.floor(Math.random()*hostile.length); 
            return hostile[i];
        } else if (eye == 6 || eye == 7) {
            var list = passive.concat(bad_feeling);
            var list2 = list.concat(apathy);
            var i = Math.floor(Math.random()*list2.length); 
            return list2[i];
        } else if (eye == 8) {
            var list = passive.concat(mild_shock);
            var i = Math.floor(Math.random()*list.length); 
            return list[i];
        } else if (eye == 9) {
            var list = apathy.concat(passive);
            var list2 = list.concat(mild_shock);
            var i = Math.floor(Math.random()*list2.length); 
            return list2[i];
        } else if (eye == 10) {
            var list = mild_shock.concat(strong_shock);
            var i = Math.floor(Math.random()*list.length); 
            return list[i];
        } else if (eye == 11) {
            var list = hostile.concat(passive);
            var i = Math.floor(Math.random()*list.length); 
            return list[i];
        } else if (eye == 12) {
            var list = apathy.concat(passive);
            var i = Math.floor(Math.random()*list.length); 
            return list[i];
        }
    }

}

function GetRarity(traits, spots) {
    if (traits.pattern == 'sin' && traits.scarfState && spots > 2) return 'Epic';
    else if ((traits.pattern == 'Sin pattern' && traits.scarfState) || (spots > 2 && traits.scarfState) || (spots > 2 && traits.pattern == 'Sin pattern')) return 'Legendary';
    else if (traits.pattern == 'Sin pattern' || traits.scarfState || spots == 'None') return 'Very Rare';
    else if (spots > 1) return 'Rare';
    else if (traits.mouthState == 'jaw_roar' || traits.legsState[0] == 'left_silly_running') return 'Uncommon';
    else return 'Common';
}

function GetColorName(color, traits) {
    if(traits.pattern == 'Sin pattern') return 'Psychedelic';
    const hex = ConvertRGBToHex(color.red, color.green, color.blue);
    return ntc.name(hex)[1];
}

function ConvertRGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
  
    return "#" + r + g + b;
}