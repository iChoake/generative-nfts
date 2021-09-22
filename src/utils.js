#include traits.js

function ExportCanvas(index) {
    const artboard = doc.artboards[0];
    const destFile = new File('~/Desktop/popcorns/' + 'something' + '.png');
    const options = new ImageCaptureOptions();
    options.artBoardClipping = true;
    options.resolution = 1500;
    options.antiAliasing = true;
    doc.imageCapture(destFile, artboard.artboardRect, options);
}

function ClipCharacToTexture() {
    const outputLayer = doc.layers.output.groupItems;
    outputLayer.add().name = 'clippingGroup';
    const clippingGroup = outputLayer.clippingGroup;
    const characterLayer = outputLayer.character;
    const textureLayer = outputLayer.texture;
    textureLayer.moveToBeginning(clippingGroup);
    characterLayer.pathItems[0].selected = true;
    DuplicateItems(clippingGroup);
    clippingGroup.clipped = true;
}   

function GenerateColor() {
    const rgb = new RGBColor();
    rgb.red = Math.floor(Math.random() * 255);
    rgb.green = Math.floor(Math.random() * 255);
    rgb.blue = Math.floor(Math.random() * 255);
    return rgb;
}

// accepts itemPaths to perform a reflection on a per pixel basis
// round to nearest int to ensure pixel grid integrity
function ReflectItems(items) {
    for (var y = 0; y < items.length; y++) {
        var pathItem = items[y];
        var left = Math.round(pathItem.left); 
        var top = Math.round(pathItem.position[1]);
        var width = doc.width;
        var newLeft = (width - left) - 1;
        pathItem.position = [newLeft, top];
    }    
}    

// accepts a layer containing pathItems and a name to rename newly create groupItem layer
function MergeItems(layer, name) {
    layer.hasSelectedArtwork = true;
    app.executeMenuCommand('group');
    app.executeMenuCommand('Live Pathfinder Merge');
    app.executeMenuCommand('expandStyle');
    layer.groupItems[0].name = name;
    doc.selection = null;
}

// accepts a target Layer and uses a selection to duplicate
function DuplicateItems(target) {
    for (var x = 0; x < doc.selection.length; x++)
        doc.selection[x].duplicate(target);

    doc.selection = null; // redundant line to force deselection    
    doc.selection = null;
}    

// accepts a Layer containing pathItems and a color
function ColorItems(layer, color) {
    for (var x = 0; x < layer.pathItems.length; x++)
        layer.pathItems[x].fillColor = color;
}

// performs a selection on a target layer
function MakeSelection(target) {
    for (var i = 0; i < target.pathItems.length; i++) 
        target.pathItems[i].selected = true;
}

// accepts a target layer
function ResetLayer(target) {
    try { doc.layers[target].remove(); } catch(e) {}
    doc.layers.add().name = target;
}

// accepts a function, a repeatition probability, and the appropriate function's arguments
function DoOnceOrMore(funct, prob, count, args) {
    count = count || 1;    
    funct(args);
    
    if (Math.random() < prob)
        return DoOnceOrMore(funct, prob, count + 1, args);

    return count;
}