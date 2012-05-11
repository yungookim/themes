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

* Google Map - At render, an element with id="google_map" will be filled with a google map. All you have to do is define the width and height and you are all set to go. 

## Images

## Fonts

## CSS

* Twitter's Bootstrap(v2.0.3) is enabled by default.
* Every css classes have to have "ig-" prepended to their names to avoid any possible conflict with NestMob's classes. eg. .ig-well instead if .well
* No override of Bootstrap class is allowed.
* In case you need to override a class from Bootstrap, simply use !important delarations (Your !important overrides our's).


## Javascripts

