#include params.js

function GetRarity(traits, spots) {
    const currentRarity = 1/traits.poseStateChance + 1/traits.mouthStateChance*moderateFactor + 1/traits.legStateChance + 1/traits.tammedChance + 1/traits.patternChance;
    const highestRarity = 1/standingChance + 1/openedMouthChance*moderateFactor + 1/isImmobileChance + 1/notTammedChance + 1/isEggChance;
    const lowestRarity = 1/leaningForwardChance + 1/roaringChance*moderateFactor + 1/sillyRunChance + 1/tammedChance + 1/isSinChance;

    if (traits.patternChance == 'sin' || traits.scarfState || spots > 2) return 'Very Rare'; // force Very Rare when either traits are present 
    else if (currentRarity >= lowestRarity*0.50 || spots == 2) return 'Rare';
    else if (currentRarity >= lowestRarity*0.30) return 'Uncommon';
    else return 'Common';
}