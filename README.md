# Quartet

Quartet is a web application that helps choir groups sing together while being physically apart. Singers record and upload vocals which are mixed with vocals from other singers to produce recordings. The recordings are then made available to all choir members to sing along to.

![Quartet Main Page](https://image.prntscr.com/image/J_pGCZQSScqrI8RnllBRDw.png)
![Quartet Record Song](https://image.prntscr.com/image/jzfOCtIuQti-32IRCRdugQ.png)

## Installation

**Step 1:** Download backend dependencies

`sudo apt-get install sox libsox-fmt-mp3 opus-tools`

Sound Exchange and Opus for mixing the songs together:

http://sox.sourceforge.net/

https://opus-codec.org/downloads/

**Step 2:** Install NodeJS dependencies

`cd api && yarn install`
Installs the front end dependencies.
`cd src && yarn install`
Installs the back end dependencies.
`yarn dev`
Starts the ExpressJS back end and the ReactJS front end.

## Usage

**Step 1:** Sign in with a Google account or as a guest

**Step 2:** Choose a song and a role

**Step 3:** Record and upload your vocals

**Step 4:** Select vocal parts to be mixed

**Step 5:** Enjoy your final mixed recordings
