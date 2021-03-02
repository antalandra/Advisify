# Advisify

Advisify is a fun and personal Javascript web application hosted on node.js involving search queries for short and simple advice slips powered by Advice Slip JSON API.

The modern interface allows a user to like, copy to clipboard, and download advice slips as png to their machine.

Advisify is written in HTML, CSS and Javascript to showcase the author's web development skills and is used purely for reference purposes. 

![Homepage](https://github.com/antalandra/Advisify/blob/master/dist/img/homepage.PNG?raw=true)

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

### Search query through search bar
The search bar takes one word queries. The API request is made in the back end and the results are returned in a list form in the container.

While the data is being retrieved from the API, the loader is shown in the container.

![Search-Query-Pending](https://github.com/antalandra/Advisify/blob/master/dist/img/searchquery-regret-pending.PNG?raw=true)

Once the results are retrieved, they are injected into the interface as seen below.

![Search-Query-Result](https://github.com/antalandra/Advisify/blob/master/dist/img/searchquery-regret.PNG?raw=true)

### Advice items
Each list item returned is clickable and shown in the bottom of the container to interact with in one of the three ways listed above.

![Search Query Advice Selected](https://github.com/antalandra/Advisify/blob/master/dist/img/searchquery-regret-advice-selected.PNG?raw=true)

### Pagination implemented
There is a max of 5 results shown in the container, which required the implementation of pagination to support search queries returning > 5 results.

![Search Query Advice Not Selected](https://github.com/antalandra/Advisify/blob/master/dist/img/searchquery-regret-advice-notselected.PNG?raw=true)

### Like menu
The likes menu stores all liked advices and uses localStorage to pull liked advice slips from previous browser sessions. 

When there are no liked advices, the likes panel is hidden:

![Homepage without likes panel](https://github.com/antalandra/Advisify/blob/master/dist/img/homepage-nolikes.PNG?raw=true)

When there are liked advices, the likes panel is visible:

![Homepage without likes panel](https://github.com/antalandra/Advisify/blob/master/dist/img/likedadvice-likesvisible.PNG?raw=true)

Every liked advice item is shown in the panel when hovered. The liked items are clickable and any clicked advices will be loaded in the container through hash change.

![Homepage without likes panel](https://github.com/antalandra/Advisify/blob/master/dist/img/likedadvice-likespanellist.PNG?raw=true)

### Copy to clipboard (implementation in progress )
The advice slip selected and shown in the container can be copied to clipboard by using the corresponding icon underneath the text.

### Export/Download (implementation in progress)
The advice slip can be downloaded as a png using HTML2Canvas and FileSaver libraries which generate an image containing the relevant advice slip when clicking the export button.


## Authors

Andra Antal-Berbecaru, Computer Science student at University College Dublin, Ireland.

## Contributing

The project is purely for reference purposes and contributions cannot be made.
