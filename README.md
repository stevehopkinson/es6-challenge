# Morning challenge: Convert ES6 code to ES5 

## Setup

1. Clone this repository to your computer.

2. Run `node assertEquals.js` from the repository directory to run the tests in Node.

## Description (based on a true story)

As part of a job application, an employer has asked you to write an `assertEquals` function. You're desperate to impress them, so you use as many ES6 features as you can – arrow functions, spread operators, classes, to name a few.

Just before submitting your test, you double check the brief and realise that your code needs to run in Internet Explorer – which doesn't support ES6! With an hour to go until your deadline, you need to replace as many of the ES6 features as possible with their ES5 equivalents.

### Morals of the story

Never assume that your code will run in an environment that supports ES6 syntax. And always read the brief properly.

## Instructions

Before you change anything, run the code in Node to see the output. None of the changes you make should affect the output of your code. If you're curious, you might also want to try running the code in a browser that doesn't support ES6 features (try Safari or Internet Explorer) to see what happens.

You probably won't have time to change all of the ES6 syntax in an hour, so don't feel that you're under pressure to finish everything – this isn't a real job application! Instead, pick a few features that you're interested in, try to rewrite them in ES5, then run the file again in Node to check that the output hasn't changed. (Node will happily run code that contains a mixture of ES5 and ES6 syntax, so you don't have to replace every single ES6 feature before you can test your changes.)

The first team each ES6 feature appears in the code, you'll find a comment on the previous line telling you what features to look for, with a link to the relevant page on (http://es6-features.org)[]. It's up to you to identify any subsequent times that the feature gets used – but if you're running short on time, focus on replacing a variety of different ES6 features, rather than replacing the same feature in several places.

The code makes use of the following features (ordered by how difficult it will be to replace them with ES5, from easiest to hardest):

- constants
- block-scoped variables
- arrow functions
- object destructuring
- the spread operator
- default parameters
- template literals
- class definitions
- the Set data structure
