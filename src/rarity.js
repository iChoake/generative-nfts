#include params.js

function GetRarity(traits) {
    const currentRarity = (traits.poseStateChance + traits.mouthStateChance*moderateFactor + traits.legStateChance + traits.tammedChance*strongFactor + traits.patternChance*strongFactor);
    const commonRarity = (standingChance + openedMouthChance*moderateFactor + isImmobileChance + notTammedChance*strongFactor + isEggChance*strongFactor);
    const rarestRarity = (leaningForwardChance + roaringChance*moderateFactor + sillyRunChance + tammedChance*strongFactor + isSinChance*strongFactor);
    const rarityRange = commonRarity - rarestRarity;

    if(traits.patternChance == 'sin' || traits.tammedChance) return 'Very Rare'; // force Very Rare when either traits are present 

    if (currentRarity >= rarityRange*0.9) return 'Common';
    else if (currentRarity >= rarityRange*0.60) return 'Unommon';
    else if (currentRarity >= rarityRange*0.40) return 'Rare';
    else return 'Very Rare';
}