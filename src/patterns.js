#include params.js
#include utils.js

const horizontalProbability = horizontalPatternChance/100;
const verticalProbability = (verticalPatternChance+horizontalPatternChance)/100;

const box = app.activeDocument.width/1.5;
const offset = Math.round((app.activeDocument.width - box)/2);

function GeneratePatterns() {
    doc.layers.output.groupItems.add().name = 'texture';    
    const textureLayer = doc.layers.output.groupItems.texture;

    const dice = Math.random();
    const repeatProb = Math.random();

    // if (dice < horizontalProbability)
    //     DoOnceOrMore(GenerateRectangleHorizontal, repeatProb, textureLayer);
    // else if (dice < verticalProbability)
    //     DoOnceOrMore(GenerateRectangleVertical, repeatProb, textureLayer);
    // else
    //     DoOnceOrMore(GenerateRectangle, repeatProb, textureLayer);
    // }
    
    DoOnceOrMore(GenerateRectangle, 0.1, textureLayer);
}

function GenerateRectangle(textureLayer) {
    var color = GenerateColor();
    var numOfSpots = Math.floor(Math.random() * 120) + 45;
    var spotSize = Math.floor(Math.random() * 5) + 1;
    
    for (var i = 0; i < numOfSpots; i++) {
        var x = Math.round(Math.random() * -doc.width);
        var y = Math.round(Math.random() * doc.width);
        var side = Math.round(Math.random() * spotSize);
        if (side != 0) {
            rect = textureLayer.pathItems.rectangle(x, y, side, side);
            rect.fillColor = color;
        }
    }
}

function GenerateRectangleHorizontal(textureLayer) {
    var color = GenerateColor();
    var numOfSpots = Math.floor(Math.random() * 120) + 45;
    var spotSize = Math.floor(Math.random() * 5) + 1;

    for (var i = 0; i < numOfSpots; i++) {
        var x = Math.round(Math.random() * -doc.width);
        var y = Math.round(Math.random() * doc.width);
        var side = Math.round(Math.random() * spotSize)*3;
        if (side != 0) {
            rect = textureLayer.pathItems.rectangle(x, y, side, 1);
            rect.fillColor = color;
        }
    }
}

function GenerateRectangleVertical(textureLayer) {
    var color = GenerateColor();
    var numOfSpots = Math.floor(Math.random() * 120) + 30;
    var spotSize = Math.floor(Math.random() * 5) + 1;
    
    for (var i = 0; i < numOfSpots; i++) {
        var x = Math.round(Math.random() * -doc.width);
        var y = Math.round(Math.random() * doc.width);
        var side = Math.round(Math.random() * spotSize)*3;
        if (side != 0) {
            rect = textureLayer.pathItems.rectangle(x, y, 1, side);
            rect.fillColor = color;
        }
    }
}

function GenerateCookie(textureLayer) {
    var color = GenerateColor();
    
    for (var i = 0; i < 50; i++) {
        var x = (Math.round(Math.random() * -box))-offset;
        var y = (Math.round(Math.random() * box))+offset;
        rect = textureLayer.pathItems.rectangle(x, y, 1, 1);
        rect.fillColor = color;
    }
}

function GenerateEgg(textureLayer) {
    var color = GenerateColor();
    var spotSize = Math.floor(Math.random() * 1) + 3;
    var numOfSpots = Math.floor(Math.random() * 5) + 15;

    for (var i = 0; i < numOfSpots; i++) {
        var x = Math.round(Math.random() * -box)-offset;
        var y = Math.round(Math.random() * box)+offset;
        var side = Math.round(Math.random() * spotSize);
        if (side != 0) {
            rect = textureLayer.pathItems.rectangle(x, y, side, side);
            rect.fillColor = color;
        }
    }
}

function GenerateSinPattern(textureLayer) {
    var period = Math.round(Math.random()*2)+1;
    
    for (var w = 0; w < doc.height; w++) {
        var color = GenerateColor();

        for (var y = 0; y < doc.width; y++) {
            var x = Math.round(Math.sin(y/period));
            pixel = textureLayer.pathItems.rectangle(x-w, y, 1, 1);
            pixel.fillColor = color;
        }
    }
}