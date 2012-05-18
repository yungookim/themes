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


