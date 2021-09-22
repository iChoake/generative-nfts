#include params.js

function GetRarity(traits, spots) {
    // const currentRarity = 1/traits.poseStateChance*weakFactor + 1/traits.mouthStateChance*moderateFactor + 1/traits.legStateChance*weakFactor + 1/traits.tammedChance + 1/traits.patternChance;
    // const highestRarity = 1/standingChance*weakFactor + 1/openedMouthChance*moderateFactor + 1/isImmobileChance*weakFactor + 1/notTammedChance + 1/isEggChance;
    // const lowestRarity = 1/leaningForwardChance*weakFactor + 1/roaringChance*moderateFactor + 1/sillyRunChance*weakFactor + 1/tammedChance+ 1/isSinChance;

    // if (traits.pattern == 'sin' || traits.scarfState || spots > 2) return 'Very Rare'; // force Very Rare when either traits are present 
    // else if (currentRarity >= lowestRarity*0.50) {
    //     if (traits.pattern == 'vertical' || traits.pattern == 'horizontal' || traits.pattern == 'cookie') 
    //         return 'Rare';
    // }
    // else if (currentRarity >= lowestRarity*0.30 || spots == 2) return 'Uncommon'; // set characters of multiple spots with Uncommon rarity at least
    // else return 'Common';

    if (traits.pattern == 'sin' && traits.scarfState && spots > 2) return 'Epic';
    else if ((traits.pattern == 'sin' && traits.scarfState) || (spots > 2 && traits.scarfState) || (spots > 2 && traits.pattern == 'sin' )) return 'Legendary';
    else if (traits.pattern == 'sin' || traits.scarfState || spots > 2) return 'Very Rare';
    else if (traits.pattern != 'egg' && spots >= 2) return 'Rare';
    else if (traits.pattern != 'egg' && spots > 2 || traits.legsState[0] == 'left_silly_running' || traits.mouthState == 'roar') return 'Uncommon'
    else return 'Common';
}