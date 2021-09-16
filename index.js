#include utils.js
#include character.js
#include garnish.js
#include patterns.js;
#include slugs.js;
#include utils.js

const doc = app.activeDocument;

function Run() {
    // doc.layers.eyes.opacity = 0;
    // doc.layers.shades.opacity = 0;
    // doc.layers.pose.opacity = 0;

    const iterations = 1;  

    for (var i = 0; i < iterations; i++) {
        var traits = ChooseTraits();
        ResetLayer('output');
        ResetLayer('overlay');
        GenerateCharacter(traits);
        GeneratePatterns();
        ClipCharacToTexture();
        AddGarnish(traits);
        // ExportCanvas(iterations);
    }
}

// [Degenerates, Cretins] are lazy and stubborn creatures that [lurk, dwell] on the hidden
// part of your computer feeding on personal data. They often reveal themselves
// in search of data when none is around.