Themes for Nestmob
==============

Source codes for various themes offered by Nestmob.


# How to submit your work

* You first need to let us know that you'd like to contribute, so we could create a directory for your theme implementation. Please contact kyu.lee@nestmob.com.
* We will create a new directory under `/themes/`, with a theme ID assigned to you, with very simple default implementation.
* When you see the directory (we'll let you know), fork this project and work on your theme under `/themes/[themeid]`.
* Submit a pull request.(please don't modify any files that are not in `/themes/[themeid]`)
* Once we go through some testing, we'll publish it for the world to use.

# How to test your work

After forking this repo with your theme directory, let us know about your forked repository. We will assign you a unique url which can be hooked up with github's commit hooks, so our testing environment will be updated with your latest comitted code.

The testing server is at http://themedev.nestmob.com.

Once you register with us as a developer, you'll get an account at the above URL, and have access to your theme currently in dev.


# Coding Standards

You must follow our standards in order to be compatible with our system.

## Directory Structure

When a developer is assigned with a theme, Nestmob will create this theme directory for you.

```bash
/themes/31f2248a-48c4-4537-b5dc-b96ffdf99107  # `theme_id` generated for you
  METADATA/        # Contains metadata, thumbnails, original designs, etc
    design.pdf       # Original design from designer (or you could design on your own as well)
    package.json     # JSON data which describes this theme
    preview.jpg      # Full sized 950px(W) by ?px(H) preview of this theme
    thumbnail.jpg    # Thumbnail sized 280px(W) by 365px(H) preview of this theme
  default_assets/  # All assets included by NestMob platform itself
  fonts/           # Font files for your theme
  img/             # Image files for your theme
  style.css        # CSS file for your theme
  theme.html       # The main html file
```


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
