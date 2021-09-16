#include utils.js;

function GenerateCharacter(traits) {
    const layers = GetLayers(traits);
    const color = GenerateColor();

    SelectBodyParts(layers);
    DuplicateItems(layers.outputLayer);
    if (traits.flipState) ReflectItems(layers.outputLayer.pathItems);
    MergeItems(layers.outputLayer, 'character');
    ColorItems(layers.outputLayer.groupItems.character, color); 
    GenerateShades(layers, traits);
}

function SelectBodyParts(layers) {
    MakeSelection(layers.eye);
    MakeSelection(layers.head);
    MakeSelection(layers.body);
    MakeSelection(layers.mouth);
    MakeSelection(layers.tail);
    MakeSelection(layers.arm);
    MakeSelection(layers.rightLeg);
    MakeSelection(layers.leftLeg);
}

function GenerateShades(layers, traits) {
    const shadesLayerItems = doc.layers.shades.layers;
    const overlayLayer = doc.layers.overlay;

    // get reference layer from relevant pose to `overlay`
    layers.poseLayers.eye.selected = true;
    DuplicateItems(overlayLayer);
    const referencePoint = overlayLayer.groupItems.eye;

    // select `shades` and duplicate in `overlay`
    shadesLayerItems[traits.poseState].groupItems.body.selected = true;
    shadesLayerItems[traits.poseState].groupItems[traits.legsState[1]].selected = true;
    DuplicateItems(overlayLayer);
    
    // change shades pos based on `refrencePoint`
    const xRef = referencePoint.position[0];
    const yRef = referencePoint.position[1];
    referencePoint.remove(); 
    const bodyOffset = []
    const legOffset = []
    
    if (traits.poseState == 'pose1') {
        bodyOffset = [-11, -9];
        legOffset = [-2, -15];
    } else if(traits.poseState == 'pose2') {
        bodyOffset = [-2, -9];
        legOffset = [0, -15];
    } else {
        bodyOffset = [-11, -7];
        legOffset = [-4, -9];
    }
        
    overlayLayer.groupItems.body.position = [xRef+bodyOffset[0], yRef+bodyOffset[1]];
    overlayLayer.groupItems[traits.legsState[1]].position = [xRef+legOffset[0], yRef+legOffset[1]];
    
    if (traits.flipState) {
        ReflectItems(overlayLayer.groupItems.body.pathItems);
        ReflectItems(overlayLayer.groupItems[traits.legsState[1]].pathItems);
    }
}

function GetLayers(traits) {
    const shadesLayer = doc.layers.shades;
    const outputLayer = doc.layers.output;
    const poseLayers = doc.layers.pose.layers[traits.poseState].groupItems;
    const arm = poseLayers.arm;
    const eye = poseLayers.eye;
    const head = poseLayers.head;
    const body = poseLayers.body;
    const tail = poseLayers.tail;
    const mouth = poseLayers[traits.mouthState];
    const leftLeg = poseLayers[traits.legsState[0]];
    const rightLeg = poseLayers[traits.legsState[1]];

    return {
        eye: eye,
        head: head,
        body: body,
        arm: arm,
        tail: tail,
        mouth: mouth,
        leftLeg: leftLeg,
        rightLeg: rightLeg,
        outputLayer: outputLayer,
        shadesLayer: shadesLayer,
        poseLayers: poseLayers
    }
}