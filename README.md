This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## First thing!
To run the project you must first run `npm install` to install all of the dependencies (make sure nodeJS is installed on the system first!)

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


#### Some Notes:
I should mention this took me the full three hours. Most of my time went into boilerplate for redux and getting everything configured nicely. In the future I wouldn't use redux for a project this small again I don't think, it was a little overkill. 

I chose to fetch data from the imgur homepage. This was quite simple but there are a few quirks with their API. Upon first fetch of page 0 the API will return with 60 objects which is a great number, but then page 1 consists of over 300 elements, then page 2 is over 400 objects. I didn't know this until I already had everything wired up and working. This isn't particularly an issue until you have over a thousand `img` elements in the DOM and you resize the window or load in more objects. There are __definitely__ some optimizations to be made but there wasn't time. 


The things that I would improve on are probably creating a more robust architecture, some real error handling, maybe support for videos and gifs, and of course optimizing the image loader. 