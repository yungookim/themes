$(function(){


	//Do not need any google map apis
	//Google Map properties
	var map = null, marker = null;
	var _lat = null, _lng = null;
	var LOGO = null;
	var initGG = null;
	var hasPostal = null;
	$("#google_map_script").remove();

	window.PropertyModel.prototype.initialize = function(){
		// editorview.render();
  //       infoGraphview.render();
	};
	window.PropertyModel.prototype.fetch = function(){},
	window.PropertyModel.prototype.saveAll = function(){
		//ensure all control boxes are closed
        $(".in").css("height", 0).removeClass("in");
        // console.log(this.toJSON());
        //Show saved time
        $("#saving_box").removeClass("hide");
        infoGraphview.render();
	};
	window.PropertyModel.prototype.defaults = {
          age: "1",
          basement: "Finished",
          bathrooms: "1",
          city: "Toronto",
          contact: "Nestmob Message Box",
          country: "Canada",
          description: "State of the art facility for education of information technology professionals in electrical and computer engineering, computer science and IT research.",
          facing: "North",
          feature: "LuxuryMonarch, Long Driveway, Double Entrance Doors, Greate View.",
          heating: "Forced Air",
          land_size_x: "200",
          land_size_y: "200",
          lat: 43.7672594,
          living_size: "1000",
          lng: -79.41113129999997,
          parking: "1",
          postal: "M2N 7K2",
          price: "500,000",
          property_style: "Detached",
          property_type: "House",
          province: "Ontario",
          raw_google_map: "",
          rooms: "2",
          storey: "3",
          street_1: "22 Hillcrest Ave",
          street_2: "",
          tax: "4000"
        };


	
	window.EditorView.prototype.events = {
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
        'click #contact_close' : 'updateContact'
    };

    window.EditorView.prototype.model = window.PropertyModel.prototype.__proto__;

	window.EditorView.prototype.initialize = function() {
    	window.EditorView.prototype.render();
  	};

  	window.EditorView.prototype.searchPostal = function(){}


	window.InfoGraphView.prototype.render = function(){
		var template = Hogan.compile($("#ig-default").html());
        var output = template.render(window.PropertyModel.model.toJSON());
        $("#infograph_container").html(output);
        //Update the background size
        //$($("#infograph_container").html()).css("background-size", "100% 100%");
        $("#infograph_container").show('slow');
        $("#google_map").html("<a style=color:white>!Google Map Area!</a>");
	};

	initializeGoogleMap = function(){};
	// var editor_model = new EditorModel();
 //    var property_model = new PropertyModel();
	// var editorview = new EditorView( {el : $("#accordion")});
 //  	var infoGraphview = new InfoGraphView();

 	$("#test_btn").bind("click", function(){
 		igfy();
 	});

});

function igfy(){
	$("#source_code").hide('slow');
	$("#ig-default").html($("#source_code").val()); 
	window.EditorView.prototype.render();
}
	

