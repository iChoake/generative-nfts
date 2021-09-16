# Generative NFTs


<p float="left">
  <img src="/docs/cretins1.jpg" width="190" />
  <img src="/docs/cretins2.jpg" width="190" /> 
  <img src="/docs/cretins3.jpg" width="190" />
  <img src="/docs/cretins10.jpg" width="190" />
  <img src="/docs/cretins11.png" width="190" />
</p>

<p float="left">
  <img src="/docs/cretins4.jpg" width="190" />
  <img src="/docs/cretins5.jpg" width="190" /> 
  <img src="/docs/cretins6.png" width="190" />
  <img src="/docs/cretins12.jpg" width="190" />
  <img src="/docs/cretins13.jpg" width="190" />
</p>

<p float="left">
  <img src="/docs/cretins7.jpg" width="190" />
  <img src="/docs/cretins8.png" width="190" /> 
  <img src="/docs/cretins9.png" width="190" />
  <img src="/docs/cretins14.jpg" width="190" />
  <img src="/docs/cretins15.jpg" width="190" />
</p>

*Degenerates are lazy and stubborn creatures that lurk on the hidden part of your computer feeding on personal data. 
They often reveal themselves in search of data when none is around.*

## Introduction

This is an Illustrator script that generates 31 by 31 pixels images with a dinosaur in the shape of the character from the built-in Dinosaur Game on the Chrome web browser. 
The script is based on JS's older ES3 standards so a lot of things are somewhat outdated or redundant at times. 

The goal of this project was to challenge myself in creating some sort of script that generates NFTs which seems to be very popular nowadays.
This is my first project using javascript and first formal programming project. 

Below are the steps that need to be taken to try the script for yourself along with basic explanations for the different components of the script.

## Set up

The project is structured in a way that is reproducable by others. You will need to have Adobe Illustrator installed (preferably version 2020 or up).
Place the `index_alias.js` within the dedicated script folder of Illustrator and edit the first line to add the filepath to the NFT script folder. 
The script directory can be accessed thru `/Adobe Illustrator CC/Presets/en_GB/Scripts` in the `Applications` folder on Mac OS or in `Program Files` on Windows.
You will need to restart Illustrator after making the changes.

Running the script outside of Illustrator via `index_alias.js` will avoid its potential deletion when updating Illustrator. 

Once done, open `template.ai` and run the 'index_alias' under **File > Scripts** and Voilà! (currently not available due to copy rights)

## Character generation

First, a character silhouette is generated based on a set of traits including pose, walking state, and mouth state:

<p float="left">
  <img src="/docs/silhouette0.png" width="200" />
  <img src="/docs/silhouette3.png" width="200" /> 
  <img src="/docs/silhouette2.png" width="200" />
</p>

Some traits are rarer than others. For exemple roaring has only a 7.5% of occuring while a running character has 50%...
The probabilities can be altered in `params.js`.

## Base color and shading

I base color is added to the character along side shades to add more depth:

<p float="left">
  <img src="/docs/shades3.png" width="200" />
  <img src="/docs/shades1.png" width="200" /> 
  <img src="/docs/shades2.png" width="200" />
</p>

## Texturing

Textured are generated and clipped to the character. Textures vary from simple spots to horizontal and vertical stripes to even sin wave pattern:

<p float="left">
  <img src="/docs/text3.png" width="200" />
  <img src="/docs/text1.png" width="200" /> 
  <img src="/docs/text2.png" width="200" />
</p>

Depending on the pattern, there is a small chance of repeating itself, returning more than color. 
The pattern porbabilities can also be changed in the `params.js`.

## Eyes and garnish

1 of the 38 available eyes is selected at random and copied ontop of the character: 

<img src="/docs/eyes.png" width="200" />

Also, to make things a little more intersting, there is a 5% chance that the dinosaur is *tammed*. 
When tammed, the dinosaur will wear either a scraf or a ribbon:

<img src="/docs/scarfs.png" width="200" />

For both eyes and scarfs, any number can be added or modified within the `eyes` and `scarf` layers respectively.

## Improvements

While the final image is of high enough quality, it's not pixel perfect due to the required anti-aliasing applied on the export. 
To remedy this, an aditional script needs to be created in order to convert the output png into a mozaic object and exported once more.

## Additional

Slug naming can be enalbed in the `ExportCanvas` function under `utils.js`.
