#include utils.js
#include character.js
#include garnish.js
#include patterns.js
#include slugs.js
#include rarity.js

const doc = app.activeDocument;

function Run() {
    doc.layers.eyes.opacity = 0;
    doc.layers.shades.opacity = 0;
    doc.layers.pose.opacity = 0;

    const iterations = 1;  

    for (var i = 0; i < iterations; i++) {
        var traits = ChooseTraits();
        ResetLayer('output');
        ResetLayer('overlay');
        GenerateCharacter(traits);
        var spotCount = GeneratePatterns(traits);
        ClipCharacToTexture();
        var eyeExpression = AddGarnish(traits);
        var rarity = GetRarity(traits, spotCount);
        // ExportCanvas(iterations);
    }

    alert(rarity)
}