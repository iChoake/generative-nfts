#include params.js
#include utils.js

const box = app.activeDocument.width/1.5;
const offset = Math.round((app.activeDocument.width - box)/2);

function GeneratePatterns(traits) {
    doc.layers.output.groupItems.add().name = 'texture';    
    const textureLayer = doc.layers.output.groupItems.texture;
    var probRe = 10;

    if (traits.pattern == 'egg') var patternCount = DoOnceOrMore(GenerateEgg, probRe, patternCount, textureLayer);
    if (traits.pattern == 'vertical') var patternCount = DoOnceOrMore(GenerateRectangleVertical, probRe, patternCount, textureLayer);
    if (traits.pattern == 'horizontal') var patternCount = DoOnceOrMore(GenerateRectangleHorizontal, probRe, patternCount, textureLayer);
    if (traits.pattern == 'sin') var patternCount = DoOnceOrMore(GenerateSinPattern, probRe, patternCount, textureLayer);
    if (traits.pattern == 'cookie') var patternCount = DoOnceOrMore(GenerateCookie, probRe, patternCount, textureLayer);

    return patternCount;
}


function GenerateEgg(textureLayer) {
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