# Background Player (Javascript) #

A Javascript module which creates and controls a full-screen background slideshow. 

## Setup ##

### HTML ###
You do not have to edit any HTML because all elements are created with Javascript.

### CSS ###
All styles within ```stylesheet.css``` are used by the Javascript module. Therefore make sure you either copy all styles into your own stylesheet, or include the ```stylesheet.css``` file in your HTML/template.

### Images ###
The image files are referenced inside ```stylesheet.css```, therefore you have to maintain the file paths in case you want to move the images to a different directory.

### Javascript ###
The ```backgroundGallery.js``` file consists of a single Javascript module. Just like with the CSS, make sure you either copy this module to your own Javascript file, or include the ```backgroundGallery.js``` file in your HTML/template. You will then be able to use the module on any page of your application.

## Usage ##

**Simple Slideshow Example:**

```
#!javascript

// Put your image-file paths in this array
var images = [];

var settings = {
     controlPanel: true
}

ImageRotatorModule.init(images, settings);
                  .create()
                  .start();
```
![simpleBackground.jpg](https://bitbucket.org/repo/L6j9kX/images/2195253882-simpleBackground.jpg)

**Gallery Viewer Example:**

```
#!javascript

// Put your image-file paths in this array
var images = [];

var settings = {
     controlPanel: true,
     hasExit: true
}

ImageRotatorModule.init(images, settings);
```

Make sure that each image, that belongs to your gallery in your HTML, has a **class** name including ```image-rotator```, a **name** ```jump``` and an **id** that stands for the index of the image inside the array.
![galleryViewer01.jpg](https://bitbucket.org/repo/L6j9kX/images/2276869906-galleryViewer01.jpg)
After clicking on a preview image the gallery opens.
![galleryViewer02.jpg](https://bitbucket.org/repo/L6j9kX/images/2005348428-galleryViewer02.jpg)

## Public API##

* ```init```: Must be called before usage once. Takes the image paths and optional settings as arguments.
* ```create```: Draws the UI in the background.
* ```shade```: Lowers the opacity of the background.
* ```focus```: Draws the UI and hides everything else in the foreground.
* ```blur```: Hides the UI and shows everything else in the foreground.
* ```start```: Starts the slideshow.
* ```pause```: Pauses the slideshow.
* ```stepForward```: Steps one image forward in the slideshow.
* ```stepBackward```: Steps one image backward in the slideshow.
* ```jumpTo```: Jumps to a specific position in the slideshow and pauses that.

## Developer ##

* Márton Széles