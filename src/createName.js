#include params.js

function CreateName(traits, spotCount, color, eyeExpression) {
    const rarity = GetRarity(traits, spotCount);
    const colorName = GetColorName(color);
    // const expression = GetExpression(eyeExpression, color, mouth);

    alert([rarity, colorName])
}

// function GetExpression(eye, mouth, color) {
//     if (eye == 1 && mouth == 'roar') return 'angry'
//     if (eye == 1 && mouth == 'roar') return 'skeptical'
//     if (eye == 2) return 'blind'
// }

function GetRarity(traits, spots) {
    if (traits.pattern == 'sin' && traits.scarfState && spots > 2) return 'Epic';
    else if ((traits.pattern == 'sin' && traits.scarfState) || (spots > 2 && traits.scarfState) || (spots > 2 && traits.pattern == 'sin' )) return 'Legendary';
    else if (traits.pattern == 'sin' || traits.scarfState || spots > 2) return 'Very Rare';
    else if (traits.pattern != 'egg' && spots >= 2) return 'Rare';
    else if (traits.pattern != 'egg' && spots > 2 || traits.legsState[0] == 'left_silly_running' || traits.mouthState == 'roar') return 'Uncommon'
    else return 'Common';
}

function GetColorName(color) {
    const hex = ConvertRGBToHex(color.red, color.green, color.blue);
    const n_match  = ntc.name(hex)[1];
    return n_match
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