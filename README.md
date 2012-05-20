Themes for Nestmob
==============

Source codes for various themes offered by Nestmob.


# How to submit your work

* You first need to get an theme id, by sending us an email at kyu.lee@nestmob.com
* Fork this project, then create a folder named as `theme_id`, under `/themes` folder
* Upload all necessary files, including all images, fonts, HTML, CSS under `/themes/[theme_id]` following our standards outlined below
* Submit a pull request

You will be able to test your themes once we deploy it on our servers(will be done periodically, and we will notify you), for you to test it out.


Once the theme is complete, tested and verified, it will become public for other users.


# Coding Standards

You must follow our standards in order to be compatible with our system.

## Directory Structure

## Variables

* Google Map - At render, an element with id="google_map" will be filled with a google map. All you have to do is define the width and height and we take care of the rest.

## Images

## Fonts

## CSS

* Twitter's Bootstrap(v2.0.3) is enabled by default.

* Every css classes have to have "ig-" prepended to their names to avoid any possible conflict with NestMob's classes. 
	* eg. .ig-foo instead of .foo

* No override of Bootstrap class is allowed.

* In case you need to override a class from Bootstrap, simply use !important delarations (Your !important overrides our's).
```html
<div class="well ig-extra"> content </div>
```
```css
.ig-extra{
	width:220px !important;
	background-color:red !important;
}
```


## Javascripts

* Currently, no javascripts are allowed in NestMob templates.


***

## Using app.html


**App.html is a local webapp forked from NestMob's infograph editor which allows the designers and coders to test their templates before submission.**


**Directory Structure**

	/kit : All your assets such as images, fonts, and style.css belong here.
	/designs : Designs in PDF format for reference
	/lib : scripts/css that NestMob runs on (it is very important that you do not 
	       modify/delete any files inside /lib directory).
	/themes : Themes that NestMob has deployed / is developing. Usually, the original 
	          design is contained in /designs directory in PDF format.
	app.html : executable webapp. Contains a sample template initially.

**Instruction**

1. Open up app.html with a browser and a text editor of your choice.

2. The script tag #ig-default contains a sample template. Please review carefully how images paths are set, how gallery is embedded, and how google map can be embedded.
	* All image paths are required to be in ```{{theme_path}}img/IMAGE-NAME.EXT``` where IMAGE-NAME is the name of the image and EXT is the image type.
	* To embed a gallery, all you have to do is to place ```<div id="ig-gallery"></div>``` tag where appropriate and add css rules as needed.
	* Embeding Google Map is also very simple. Place ```<div id="google_map"></div>``` tag where appropriate and set the preferred width and the height.

3. Review the contents in /kit directory which contains all the assets required for the sample. Note that style.css file is required and will be automatically loaded by the app.html.

4. Within style.css, you can review how images and fonts are loaded.

5. Once the review is done, delete the followings 
	* app.html : Everything inside ```#ig-default``` tag
	* style.css : Contents inside the file. As you will define your own css rules here. 
	* Every image files in kit/img.
	* Every fonts in kit/fonts

6. You can do all your regular html stuff inside #ig-default tag in app.html. All css stuff in kit/style.css. All images inside kit/img. All font files in kit/font. Define fonts in kit/style.css.

7. Be creative.

 
**Parameters**

important : it is very important that "&" without quotation is prepended to Description and Feature parameters.

	Price                {{price}}  
	Rooms                {{rooms}}  
	Description*         {{&description}} 
	Features*            {{&feature}}  
	Street 1             {{street_1}}  
	Street 2             {{street_2}}  
	City                 {{city}} 
	Postal Code          {{postal}}  
	Province/state       {{province}}  
	Country              {{country}} 
	storey               {{storey}}  
	Property Type        {{property_type}}  
	Property Style       {{property_style}} 
	Rooms                {{rooms}} 
	Land Size X          {{land_size_x}}
	Land Size Y          {{land_size_y}}
	# of Bath Rooms      {{bathrooms}}
	Parking              {{parking}}
	Age/year Built       {{age}}
	Heating              {{heating}}
	Basement             {{basement}} 
	Tax                  {{tax}} 
	Facing               {{facing}}
	Contact              {{contact}} 


Think of below block as a loop. Basically, for N number of room details (eg. Master Bedroom, 2 floor, 20ft by 20ft is one set of room detail), below block will append to itself N times.

	{{#room_details}}
		{{room-name}}                 //Name of the room eg. Master Bedroom, Jr Bed.
		{{room-storey}}               //Floor that the room is on.
		{{room-dimension-x-ft}}       //Length of the room in ft.
		{{room-dimension-y-ft}}       //Width of the room in ft
		{{room-dimension-x-m}}        //Length of the room in m.
		{{room-dimension-y-m}}        //Width of the room in m.
	{{/room_details}}
