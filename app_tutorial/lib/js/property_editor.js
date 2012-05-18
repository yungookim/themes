//Model, element, template naming conventions:
//All {{id}} has to correspond to the property_model keys
//data-{{id}} : input boxes in the side property editor. !important!
//{{id}}_control : for each control box within property editor.
//{{id}}_box : for each collapsable box within each control.
//editor-control-{{id}} : name of each control's template.

var temp = 
"{{#items}} " + 
"<li id={{id_prefix}}_control>"+
"<h3 class=\"nm-editor-menu\" data-toggle=collapse data-parent=#accordion href=#{{id_prefix}}_box>{{display_name}}</h3>"+
"<div id={{id_prefix}}_box class=\"collapse nm-box-overlay\">"+
"<a class=\"icon-remove close\" data-toggle=collapse data-parent=#accordion href=#{{id_prefix}}_box></a>"+
"<div class=\"control-group well\">"+
"<div class=controls>"+"{{&controls}}"+"</div>"+
"<span class=\"help-inline hide\">{{error}}</span><br>"+
"<a id={{id_prefix}}_close class=\"nm_done\">Done</a> "+
"</div>"+"</div>"+"</li>"+"{{/items}}";

//Google Map properties
var map, marker;
var _lat, _lng;
var LOGO = "/static/img/marker.png";
var initGG = false;
var hasPostal = false;

//onLoads
$(function() {

//Prepare Google Geocode api
var script = document.createElement("script");
script.id = "google_map_script";
script.type = "text/javascript";
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDtUXBS3SL_-MuLHo6gi231_nFxlA1TOnY&sensor=false&callback=initializeGoogleMap";
$('body').append(script);

//Editor model.
EditorModel = Backbone.Model.extend({
  initialize: function(){},
  defaults : function(){
    return {items : [
    {id_prefix : "price", display_name : "Price",
    controls: $("#editor-control-price").html(), error : "Numbers Only Please"},

    {id_prefix : "description", display_name  : "Description",
    controls: $("#editor-control-description").html(), error : "error!"},

    {id_prefix : "address", display_name  : "Address",
    controls: $("#editor-control-address").html(),error : "error!"},

    {id_prefix : "storey",display_name  : "Storey / Floor",
    controls: $("#editor-control-storey").html(), error : "error!"},

    {id_prefix : "property_type",display_name  : "Property Type",
    controls: $("#editor-control-property-type").html(),error : "error!"},

    {id_prefix : "property_style", display_name : "Property Style",
    controls: $("#editor-control-property-style").html(), error : "error"},

    {id_prefix : "rooms",display_name : "Rooms",
    controls : $("#editor-control-rooms").html(),error : "Error!"},

    {id_prefix : "bathrooms",display_name : "Bathrooms",
    controls : $("#editor-control-bathrooms").html(),error : "error!"},

    {id_prefix : "living_size",display_name : "Living Size",
    controls : $("#editor-control-living-size").html(),error : "error!"},

    {id_prefix : "land_size",display_name : "Land Size",
    controls : $("#editor-control-land-size").html(),error : "error!"},

    {id_prefix : "parking",display_name : "Parking",
    controls : $("#editor-control-parking").html(),error : "error!"},

    {id_prefix : "age",display_name : "Age",
    controls : $("#editor-control-age").html(),error : "error!"},

    {id_prefix : "heating",display_name : "Heating",
    controls : $("#editor-control-heating").html(),error : "error!"},

    {id_prefix : "basement",display_name : "Basement",
    controls : $("#editor-control-basement").html(),error : "error!"},

    {id_prefix : "tax",display_name : "Tax",
    controls : $("#editor-control-tax").html(),error : "error!"},

    {id_prefix : "facing",display_name : "Front Facing",
    controls : $("#editor-control-facing").html(),error : "error!"},

    {id_prefix : "feature",display_name : "Features",
    controls : $("#editor-control-feature").html(),error : "error!"},

    {id_prefix : "contact",display_name : "Contact",
    controls : $("#editor-control-contact").html(),error : "error!"}
    ]};
  }
});

  //Property model.
  PropertyModel = Backbone.Model.extend({
        
    url : '/rest/property/',

        initialize: function(){
          var _curUri =  window.location.pathname.split('/');
          this.id = _curUri[_curUri.length-1];
          this.url = this.url + this.id;
          this.fetch();
        },
      //  validate : function (){ /*Implement validation with global lock*/ },
        fetch : function(){
          $.ajax(this.url, {
            context : this,
            success : function(data, textStatus, jqXHR){
              //save to local here
              data = $.parseJSON(data);
              //console.log(data);
              this.set('price', data.price);
              this.set('rooms', data.rooms);
              this.set('description', data.description);
              this.set('street_1', data.street_1);
              this.set('street_2', data.street_2);
              this.set('city', data.city);
              this.set('postal', data.postal);
              hasPostal = true;
              this.set('province', data.province);
              this.set('country', data.country);
              this.set('lat', data.lat);
              _lat = data.lat;
              _lng = data.lng;
              this.set('lng', data.lng);
              this.set('storey', data.storey);
              this.set('property_type', data.property_type);
              this.set('property_style', data.property_style);
              this.set('rooms', data.rooms);
              this.set('room_details', data.room_details);
              this.set('land_size_x', data.land_size_x);
              this.set('land_size_y', data.land_size_y);
              this.set('living_size', data.living_size);
              this.set('bathrooms', data.bathrooms);
              this.set('parking', data.parking);
              this.set('age', data.age);
              this.set('heating', data.heating);
              this.set('basement', data.basement);
              this.set('tax', data.tax);
              this.set('facing', data.facing);
              this.set('feature', data.feature);
              this.set('contact', data.contact);
              editorview.render();
              infoGraphview.render();
              this.bind("change", infoGraphview.render, infoGraphview);
            }
          });
        },

        saveAll : function(){
          //ensure all control boxes are closed
          $(".in").css("height", 0).removeClass("in");
          // console.log(this.toJSON());
          //Show saved time
          $("#saving_box").removeClass("hide");
          $("#saving_header")
            .html("<img style=\"margin-right:5px\"src=/static/img/ajax-loader.gif>")
            .append("Saving...");
          this.save(null, {
            success: function(model, res) {
              $("#saving_box").removeClass("alert-error").addClass("alert-success");
              $("#saving_header").html("Last Saved");
              $("#saved_time").html(getCurrentTime());
            },
            error: function(model, res) {
              $("#saving_box").removeClass("alert-success").addClass("alert-error");
              $("#saved_time").html("");
              $("#saving_header").html("Oops! Saving Failed!");
            }
          });
        }
      });

    var editor_model = new EditorModel();
    var property_model = new PropertyModel();

    /**********************VIEWS**************************/
    EditorView = Backbone.View.extend({
  
      events : {
        'click #price_close' : 'updatePrice',
        'click #description_close' : 'updateDescription',
        'click #address_close' : 'updateAddress',
        'click #storey_close' : 'updateStorey',
        'click #property_type_close' : 'updatePropertyType',
        'click #property_style_close' : 'updatePropertyStyle',
        'click #rooms_close' : 'updateRooms',
          'click .room-dimension-unit' : 'changeRoomUnit',
          'click #add-more-rooms' : 'addRoom',
          'click .removeBtn' : 'removeRow',
        'click #land_size_close' : 'updateLandSize',
        'click #living_size_close' : 'updateLivingSize',
        'click #bathrooms_close' : 'updateBathrooms',
        'click #parking_close' : 'updateParking',
        'click #age_close' : 'updateAge',
        'click #heating_close' : 'updateHeating',
        'click #basement_close' : 'updateBasement',
        'click #tax_close' : 'updateTax',
        'click #facing_close' : 'updateFacing',
        'click #feature_close' : 'updateFeature',
        'keyup #data-postal' : 'searchPostal',
        'click #contact_close' : 'updateContact'
      },

      initialize: function() {
        this.model = property_model;
      },
      render : function() {
        var template = Hogan.compile(temp);
        var output = template.render(editor_model.toJSON());
        $("#nm-editor").html(output);
        this.populate();
        if (this.model.get('postal')){
          $('.addrHidden').removeClass('hide');
        }
      },

      //Populate PropertyModel into the editor.
      populate : function() {
        console.log(this.model);
        $("#data-price").val(this.model.get('price'));
        var _des = this.model.get('description');
        if (_des){
          _des = _des.replace(/<br \/>/g, "\n");
        }
        $("#data-description").val(_des);
        $("#data-street_1").val(this.model.get('street_1'));
        $("#data-street_2").val(this.model.get('street_2'));
        $("#data-city").val(this.model.get('city'));
        $("#data-postal").val(this.model.get('postal'));
        $("#data-country").val(this.model.get('country'));
        $("#data-province").val(this.model.get('province'));
        $("#data-property_type").val(this.model.get('property_type'));
        $("#data-property_style").val(this.model.get('property_style'));
        $("#data-storey").val(this.model.get('storey'));
        $("#data-rooms").val(this.model.get('rooms'));
        $("#data-land_size_x").val(this.model.get('land_size_x'));
        $("#data-land_size_y").val(this.model.get('land_size_y'));
        $("#data-bathrooms").val(this.model.get('bathrooms'));
        $("#data-parking").val(this.model.get('parking'));
        $("#data-age").val(this.model.get('age'));
        $("#data-heating").val(this.model.get('heating'));
        $("#data-basement").val(this.model.get('basement'));
        $("#data-tax").val(this.model.get('tax'));
        $("#data-facing").val(this.model.get('facing'));
        $("#data-contact").val(this.model.get('contact'));
        var _fea = this.model.get('feature');
        if (_fea){
          _fea = _fea.replace(/<br \/>/g, "\n");
        }
        $("#data-feature").val(_fea);
        //Render out room details
        var _details = this.model.get('room_details');
        if (_details) {
          $('#room-table').html('');
        }
        $(_details).each(function(i, ele){
          $('#room-table').append($('#room-row').html());
          var _roomName = ele['room-name'];
          var _roomStorey = ele['room-storey'];
          var _roomXft = ele['room-dimension-x-ft'];
          var _roomYft = ele['room-dimension-y-ft'];
          var _roomXm = ele['room-dimension-x-m'];
          var _roomYm = ele['room-dimension-y-m'];
          var _roomUnit = ele['room-dimension-unit'];
          $($("#room-table").find('.room-name')[i]).val(_roomName);
          $($("#room-table").find('.room-storey')[i]).val(_roomStorey);
          $($("#room-table").find('.room-unit')[i]).html(_roomUnit);
          if (_roomUnit == "m"){
            $($("#room-table").find('.room-dimension-x')[i]).val(_roomXm);
            $($("#room-table").find('.room-dimension-y')[i]).val(_roomYm);
          } else {
            $($("#room-table").find('.room-dimension-x')[i]).val(_roomXft);
            $($("#room-table").find('.room-dimension-y')[i]).val(_roomYft);
          }
        });
      },
      updatePrice : function(){
        var newPrice = $("#data-price").val();
        newPrice = newPrice.replace(/,/g,'');
        newPrice = Humanize.intcomma(newPrice);

        var reg = new RegExp("^[0-9]$");
        
        if (reg.test(newPrice)){
          $('#price_control').find('.help-inline').removeClass('hide');
          return;
        }
        $('price-control').find('.help-inline').addClass('hide');
        this.model.set('price', newPrice);
        this.model.saveAll();
      },
      updateDescription : function() {
        var _val = $("#data-description").val();
        _val = humanizeInput('data-description', _val);
        this.model.set('description', _val);
        this.model.saveAll();
      },
      updateAddress : function() {
        var street1 = $("#data-street_1").val();
        var street2 = $("#data-street_2").val();
        var city = $("#data-city").val();
        var postal = $("#data-postal").val();
        var province = $('#data-province').val();
        var country = $("#data-country").val();
        this.model.set('street_1', street1);
        this.model.set('street_2', street2);
        this.model.set('city', city);
        this.model.set('postal', postal);
        this.model.set('province', province);
        this.model.set('country', country);
        this.model.set('raw_google_map',
                      $('#address_components').html().trim());
        this.model.set('lat', _lat);
        this.model.set('lng', _lng);
        this.model.saveAll();
      },
      searchPostal : function(){
        if (isValidZip($('#data-postal').val()) 
          && !window.event.ctrlKey 
          && (window.event.keyCode >= 48 
              && window.event.keyCode <= 90)){
          $('#postalLoader').removeClass('hide');
          var geocoder = new google.maps.Geocoder();
          var _address = {address : $('#data-postal').val()};
          geocoder.geocode(_address, function (result, status){
            if (status == 'OK'){
              $('#postalLoader').addClass('hide');
              $('.addrHidden').show('slide');
              //Save everything from Google Map to an element
              $('#address_components').html(JSON.stringify(result[0]));
              var _addr = result[0].address_components;
              var tokens = ['locality', 'country', 'postal_code', 'administrative_area_level_1'];
              getAddrs(_addr, tokens, function(data){
                $(data).each(function(i, ele){
                  switch(ele.component)
                  {
                    case 'postal_code':
                      $('#data-postal').val(ele.value);
                      break;
                    case 'country':
                      $('#data-country').val(ele.value);
                      break;
                    case 'locality':
                      $('#data-city').val(ele.value);
                      break;
                    case 'administrative_area_level_1':
                      $('#data-province').val(ele.value);
                      break;
                  }
                });
              });
              //Get geometry data
              var _LatLng = result[0]['geometry']['location'];
              _lat = _LatLng['$a'];
              _lng = _LatLng['ab'];
              var latlng = new google.maps.LatLng(_lat, _lng);
              map.panTo(latlng);
              map.setZoom(15);
              marker.setPosition(latlng);
            }
          });
        }
      },
      updateStorey : function () {
        var storey = $('#data-storey').val();
        this.model.set('storey', storey);
        this.model.saveAll();
      },
      updatePropertyType : function () {
        var propertyType = $("#data-property_type").val();
        this.model.set('property_type', propertyType);
        this.model.saveAll();
      },
      updatePropertyStyle : function (){
        var propertyStyle = $("#data-property_style").val();
        this.model.set('property_style', propertyStyle);
        this.model.saveAll();
      },
      updateTax : function() {
        var tax = $("#data-tax").val();
        this.model.set('tax', tax);
        this.model.saveAll();
      },
      updateBasement : function() {
        var basement = $("#data-basement").val();
        this.model.set('basement', basement);
        this.model.saveAll();
      },
      updateHeating : function() {
        var heating = $("#data-heating").val();
        this.model.set('heating', heating);
        this.model.saveAll();
      },
      updateAge : function() {
        var age = $("#data-age").val();
        this.model.set('age', age);
        this.model.saveAll();
      },
      updateParking : function() {
        var parking = $("#data-parking").val();
        this.model.set('parking', parking);
        this.model.saveAll();
      },
      updateBathrooms : function() {
        var bathrooms = $("#data-bathrooms").val();
        this.model.set('bathrooms', bathrooms);
        this.model.saveAll();
      },
      updateRooms : function() {
        var rooms = $("#data-rooms").val();
        var _room_details = [];
        $("#room-table tr").each(function(i, ele){
          var _rd = {};
          _rd['room-name'] = $(ele).find('.room-name').val();
          _rd['room-storey'] = $(ele).find('.room-storey').val();
          //console.log($(ele).find('.room-unit').html());
          if ($(ele).find('.room-unit').html() == 'ft'){
            _rd['room-dimension-x-ft'] = $(ele).find('.room-dimension-x').val();
            _rd['room-dimension-y-ft'] = $(ele).find('.room-dimension-y').val();
            // 1 foot = 0.3048 meters
           _rd['room-dimension-x-m'] = "" + (parseFloat(_rd['room-dimension-x-ft'] ) * 0.3048).toFixed(2);
            _rd['room-dimension-y-m'] = "" + (parseFloat(_rd['room-dimension-y-ft'] ) * 0.3048).toFixed(2);
          } else {
            _rd['room-dimension-x-m'] = $(ele).find('.room-dimension-x').val();
            _rd['room-dimension-y-m'] = $(ele).find('.room-dimension-y').val();
            // 1 meter = 3.2808399 feet 
            _rd['room-dimension-x-ft'] = "" + (parseFloat(_rd['room-dimension-x-m'] ) * 3.2808399).toFixed(2);
            _rd['room-dimension-y-ft'] = "" + (parseFloat(_rd['room-dimension-y-m'] ) * 3.2808399).toFixed(2);
          }
          _rd['room-dimension-unit'] = $(ele).find('.room-unit').html();
          _room_details.push(_rd);
        });
        this.model.set('room_details', _.compact(_room_details));
        this.model.set('rooms', rooms);
        //console.log(_room_details);
        this.model.saveAll();
      },
      updateLandSize : function() {
        var landsize_x = $("#data-land_size_x").val();
        var landsize_y = $("#data-land_size_y").val();
        this.model.set('land_size_x', landsize_x);
        this.model.set('land_size_y', landsize_y);
        this.model.saveAll();
      },
      updateLivingSize : function(){
        var livingsize = $('#data-living_size').val();
        this.model.set('living_size', livingsize);
        this.model.saveAll();
      },
      updateFacing : function() {
        var _facing = $("#data-facing").val();
        this.model.set('facing', _facing);
        this.model.saveAll();
      },
      changeRoomUnit : function(e) {
        var _curUnit = $(e.currentTarget).text().trim();
        if (_curUnit == "ft"){
          _curUnit = "m";
        } else {
          _curUnit = "ft";
        }
        $(e.currentTarget).html("<b class='room-unit'>" + _curUnit  + "</b>");
      },

      addRoom : function() {
        $("#room-table").append($("#room-row").html());
      },

      removeRow : function(e){
        var _curRow = $(e.currentTarget).parent().parent();
        $(_curRow).remove();
      },

      updateFeature : function(){
        //console.log("feature");
        var _feature = $("#data-feature").val();
        _feature = humanizeInput('data-feature', _feature);
        this.model.set('feature', _feature);
        this.model.saveAll();
      },

      updateContact : function(){
        var _contact = $("#data-contact").val();
        this.model.set('contact', _contact);
        this.model.saveAll();
      }
    });

  
    InfoGraphView = Backbone.View.extend({
      template : _.template($("#ig-default").html()),
      initialize: function() {
        this.model = property_model;
      },
      render : function() {
        var template = Hogan.compile(this.template());
        var output = template.render(this.model.toJSON());
        $("#infograph_container").html(output);
        //Update the background size
        $($("#infograph_container").html()).css("background-size", "100% 100%");
        $("#infograph_container").show('slow');
        if (initGG){
          $('#google_map').empty();
          if (!$.browser.msie){
            $('#google_map').replaceWith(map.getDiv());  
          } else {
             $('#google_map').removeClass().attr('style', '').html(map.getDiv());
          }
        }
      }
    });

  var editorview = new EditorView( {el : $("#accordion")});
  var infoGraphview = new InfoGraphView();

  //Bind Keys for 'enter' and ESC events
  //Move this to EditorView later
  $("body").keyup(function(e) {
      if (e.keyCode == 27){
        editorview.render();
        return;
      }
      var _input = $(document.activeElement);
      if(event.keyCode == 13 && !$(_input).is('body')){
        var _newVal = $(_input).val();
        var _id = $(_input).attr("id");
        //Textarea should take 'enter' key as newline
        //for multiple line inputs.
        if (!_input.is("textarea")){
          $(_input.parent()).parent().find('.nm_done').trigger('click');
          return;
        }
      }
  });
}); /* /onReady */

/* Helper Functions */
function humanizeInput(_id, _val){
  switch(_id){
    case 'data-price':
      _val = _val.replace(/,/g,'');
      return Humanize.intcomma(_val);
    case 'data-tax':
      _val = _val.replace(/,/g,'');
      return Humanize.intcomma(_val);
    case 'data-description':
      return Humanize.linebreaksbr(_val);
    case 'data-feature':
      return Humanize.linebreaksbr(_val);
    default:
      return _val;
  }
}

function getCurrentTime(){
  var ampm = " AM";
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  if (hours > 12){
    hours = hours - 12;
    apmp = " PM";
  }
  if (minutes < 10){
    minutes = "0" + minutes;
  }
  return year + "/" + month + "/" + day + " " + hours + ":" + minutes + ampm;
}

function initializeGoogleMap(){
  var _zoom = 2;
  var _latlng = new google.maps.LatLng(43.653226,-79.38318429999998);
  if(_lat){
    _zoom = 15;
    _latlng = new google.maps.LatLng(_lat, _lng);
  }
  var _options = {
  zoom : _zoom,
  disableDefaultUI : true,
  disableDoubleClickZoom : true,
  scaleControl: false,
  draggable : false,
  scrollwheel: false,
  navigationControl: false,
  mapTypeControl: false,
  mapTypeId : google.maps.MapTypeId.ROADMAP,
  center: _latlng};

    map = new google.maps.Map($("#google_map")[0], _options);
    map.panTo(_latlng);
    if (hasPostal){
          marker = new google.maps.Marker({
          position : _latlng,
          map : map,
          icon : LOGO
          });
      }
    initGG = true;
}

//Find address info that corresponds to elements inside @token in @comp
//then returns them in an [{},{},...] format
function getAddrs(comp, tokens, callback){
  var ret = [];
  $(comp).each(function(i, ele){
    $($(ele)[0].types).each(function(i, ele2){
      if (tokens.indexOf(ele2) != -1){
        var _val = new String($(ele)[0].long_name).toString();
        var _key = $(ele)[0].types;
        ret.push({
          "component" : _key[0],
          "value" : _val});
      }
    });
  });
  callback(ret);
}

function isValidZip(zip) {
    zip=zip.toUpperCase();
  if (zip.match(/^[0-9]{5}$/) 
    || zip.match(/^[A-Z][0-9][A-Z]\s*[0-9][A-Z][0-9]$/)) {
    return true;
  }
  return false;
}

function foo(){
  alert('foo!');
}
