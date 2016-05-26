# nil

### What it is and isn’t

It is a way to work with SCSS and minify your CSS and JS for production with
cache-friendly hash URLs.

Out of the box it is not a functioning WordPress theme, although it contains the
bare minimum data necessary to be recognised as one.

### Some basic assumptions

All your CSS will be concatenated into one file, `style.css`.
All your JavaScript will be concatenated into one file, `script.js`.

The `asset_path` function in `functions.php` selects and loads these files
fingerprinted and minified in production, plain and unminified elsewhere.

### Installation

Clone into a new empty folder in `wp-content/themes` and throw away the `.git` folder.

Run `npm install`.

### Usage

Run `gulp watch`.

Edit files under `/src/css` and `/src/js`.

Load the resulting styles and scripts in your markup using the `asset_path()` function
in `functions.php`.

When you deploy, run `gulp build`.

Commands available to you:

```
gulp css   # compile the css in src/css
gulp js    # compile the JS in src/js
gulp watch # watch SCSS and JS for changes
gulp build # compile everything, minify and fingerprint it, and put it in /dist

```
