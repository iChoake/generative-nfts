#include character.js

function AddGarnish(traits) {  
    if (traits.scarfState && traits.poseState != 'pose3') GenerateTaming(traits);
    return GenerateEyes(traits);
}

function GenerateEyes(traits) {
    const eyesLayerItems = doc.layers.eyes.groupItems;
    const outputLayer = doc.layers.output.groupItems;
    outputLayer.add().name = 'eyes';

    doc.layers.pose.layers[traits.poseState].groupItems.eye.selected = true;
    DuplicateItems(outputLayer.eyes);
    const referencePoint = outputLayer.eyes.groupItems.eye;
    
    const eyeIndex = Math.floor(Math.random() * eyesLayerItems.length);
    eyesLayerItems[eyeIndex].selected = true;
    DuplicateItems(outputLayer.eyes);
    
    const eye = outputLayer.eyes.groupItems[0]; 
    eye.position = referencePoint.position;
    referencePoint.remove(); 
    
    if (traits.flipState) ReflectItems(outputLayer.eyes.groupItems[0].pathItems);

    ChangeIrisColor(eye.pathItems);

    return outputLayer.eyes.groupItems[0].name;
}

function ChangeIrisColor(items) {
    const iris = GenerateColor();
    
    for (var i = 0; i < items.length; i++) {
        if (items[i].name == 'iris')
        items[i].fillColor = iris;
    }
}

function GenerateTaming(traits) {
    if (traits.poseState == 'pose1' || traits.poseState == 'pose2')
        var scarfLayerItems = doc.layers.scarf.layers.others.groupItems;
    else
        var scarfLayerItems = doc.layers.scarf.layers.pose3.groupItems;
    const overlayLayer = doc.layers.overlay.groupItems;
    overlayLayer.add().name = 'scarf';
    
    doc.layers.pose.layers[traits.poseState].groupItems.eye.selected = true;
    DuplicateItems(overlayLayer.scarf);
    const referencePoint = overlayLayer.scarf.groupItems.eye;
    
    const scarfIndex = Math.floor(Math.random() * scarfLayerItems.length);
    scarfLayerItems[scarfIndex].selected = true;
    DuplicateItems(overlayLayer.scarf);
    
    const scarf = overlayLayer.scarf.groupItems.scarfBP; 
    scarf.position = referencePoint.position;
    referencePoint.remove(); 

    if (traits.poseState == 'pose1') scarf.position = [scarf.position[0] - 2, scarf.position[1] - 6];
    if (traits.poseState == 'pose2') scarf.position = [scarf.position[0] + 6, scarf.position[1] - 6]
    if (traits.poseState == 'pose3') scarf.position = [scarf.position[0] - 4, scarf.position[1] - 3];
        
    if (traits.flipState && traits.poseState != 'pose2') ReflectItems(overlayLayer.scarf.groupItems.scarfBP.pathItems);
    if (!traits.flipState && traits.poseState == 'pose2') ReflectItems(overlayLayer.scarf.groupItems.scarfBP.pathItems);
    
    ChangeScarfColor(scarf.pathItems);
}

function ChangeScarfColor(items) {
    const pat1 = GenerateColor();
    const pat2 = GenerateColor();

    for (var i = 0; i < items.length; i++) {
        if (items[i].name == '1')
            items[i].fillColor = pat1;
    }

    for (var i = 0; i < items.length; i++) {
        if (items[i].name == '2')
            items[i].fillColor = pat2;
    }
}