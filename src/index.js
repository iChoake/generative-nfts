#include utils.js
#include character.js
#include garnish.js
#include patterns.js
#include createName.js
#include './name-that-color/lib/ntc.js'

const doc = app.activeDocument;

function Run() {
    doc.layers.eyes.opacity = 0;
    doc.layers.shades.opacity = 0;
    doc.layers.pose.opacity = 0;

    const iterations = 100;  
    const stats_list = [];

    for (var i = 0; i < iterations; i++) {
        var traits = ChooseTraits();
        ResetLayer('output');
        ResetLayer('overlay');
        var color = GenerateCharacter(traits);
        var spotCount = GeneratePatterns(traits);
        ClipCharacToTexture();
        var eyeExpression = AddGarnish(traits);
        var stats = GetCharStats(traits, spotCount, color, eyeExpression);
        stats_list.push([i+1, stats]);
        ExportCanvas(i+1, stats);
    }

	const textFile = File('~/Desktop/export_stats.csv');  
    var content =  ['id', 'name', 'rarity', 'color', 'expression', 'pattern', 'running', 'pose', 'mouth', 'tammed'] + '\r';
	
	for (var i = 0; i < stats_list.length; i++)  {
		content += stats_list[i] + '\r';  
	}  
	   
	textFile.open('e');  
	textFile.write(content);  
	textFile.close(); 
}