# Generative NFTs

An Illustrator script that generates 31 by 31 picture with a dinosaur in the shape of the character from the built-in Dinosaur Game on the Chrome web browser. 
The script is based on JS's older ES3 standards so a lot of things are somewhat outdated or redundant at times. 

This is my first project using javascript. 
The goal of this project was to challenge myself in creating some sort of script that generates NFTs which seems to be very popular nowadays.

## Character generation

First, a character silhouette is generated based on a set of traits including pose, walking state, and mouth state:

<p float="left">
  <img src="/docs/silhouette0.png" width="200" />
  <img src="/docs/silhouette1.png" width="200" /> 
  <img src="/docs/silhouette2.png" width="200" />
</p>

Some traits are rarer than others. For exemple roaring has only a 7.5% of occuring while a running character has 50%.
The probabilities can be altered in the `params.js` file.
