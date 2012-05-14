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

When a developer is assigned with a theme, Nestmob will create this theme directory for you.

```bash
/themes/31f2248a-48c4-4537-b5dc-b96ffdf99107
  METADATA/        # Contains metadata, thumbnails, original designs, etc
    design.pdf       # Original design from designer
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

