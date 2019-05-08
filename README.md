### Sticky Accordion - old school jQuery DOM manipulation lol

* A single list of cards, composed of multiple scrollable lists with clickable headers.
* All these headers stack at either the top or the bottom.
* On clicking the header, the relevant list should expand to the height needed (based on number of cards).
* If number of cards are more than what fits in the screen, the list should become scrollable.
* If number of cards are less, the list should stay stuck at the bottom.

### Install dependencies
```
npm install
```

### Running locally
```
npm start and then go to localhost:8080
```

### Compiling scss for development
```
gulp
```

### Demo
```
http://stickyapp.bitballoon.com
```

### Data dependencies
```
loadFakeTemplateData() and loadFakeUserData() gets data from a fake API.
```