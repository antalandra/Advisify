# Advisify

Advisify is a fun and personal Javascript web application hosted on node.js involving search queries for short and simple advice slips powered by Advice Slip JSON API.

The modern interface allows a user to like, copy to clipboard, and download advice slips as png to their machine.

Advisify is written in HTML, CSS and Javascript ES6 onwards to showcase the author's web development skills and is used purely for reference purposes. 


## Installation

Download all files and install the packages listed in package.json using npm:

```bash 
$ npm install
```

## How it works

Advisify contains a search bar which takes in your search queries. The advice slips are returned in a list and can be selected to interact with in one of the three ways listed above - those being liking, copying to clipboard, and exporting/downloading as png.

The search queries are performed in the backend using Axios and the advice slips are provided by the free to use Advice Slip JSON API.

Babel is used in order to convert all code to ES5 code such that the distribution code can be supported by all browsers.

Webpack is used to bundle all files together to allow for usable code in the browser.

## Features

### Like menu
The likes menu stores all liked advices and uses localStorage to pull liked advice slips from previous browser sessions.

### Copy to clipboard(work in progress)
The advice slip selected and shown in the container can be copied to clipboard by using the corresponding icon underneath the text.

### Export/Download(work in progress)
The advice slip can be downloaded as a png using HTML2Canvas and FileSaver libaries which generate an image containing the relevant advice slip when clicking the export button.


## Authors

Andra Antal-Berbecaru, Stage 3 Computer Science student at University College Dublin, Ireland.

## Contributing

Pull requests are welcome, as they can help me improve my JavaScript skills and add extra functionalities to the project.


