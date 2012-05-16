$(function(){
	$("#test_hint").hide();
	$('#test_btn').popover(
		{ title: "Hint Hint",
		content:"You can open up the box again by clicking me!"});
	//Do not need any google map apis
	//Google Map properties
	var map = null, marker = null;
	var _lat = null, _lng = null;
	var LOGO = null;
	var initGG = null;
	var hasPostal = null;
	$("#google_map_script").remove();

	window.PropertyModel.prototype.initialize = function(){
		
	};

	window.PropertyModel.prototype.defaults = function(){
		return { age: "1",
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
				room_details: [{ 
					"room-dimension-unit": "ft",
					"room-dimension-x-ft": "20",
					"room-dimension-x-m": "6.10",
					"room-dimension-y-ft": "20",
					"room-dimension-y-m": "6.10",
					"room-name": "Master",
					"room-storey": "10"
				}],
				storey: "3",
				street_1: "22 Hillcrest Ave",
				street_2: "",
				tax: "4000",
				theme_path : "theme/"
				}
	},

	window.PropertyModel.prototype.saveAll = function(){
		console.log(this.toJSON());
		//ensure all control boxes are closed
        $(".in").css("height", 0).removeClass("in");
        // console.log(this.toJSON());
        //Show saved time
        $("#saving_box").removeClass("hide");
        window.InfoGraphView.prototype.render();
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

    var editor_model = new window.EditorModel();
    var property_model = new window.PropertyModel();

    window.EditorView.prototype.initialize = function() {
		window.EditorView.prototype.model = property_model;
  	};

    window.EditorView.prototype.render = function(){
    	var template = Hogan.compile(temp);
        var output = template.render(editor_model.toJSON());
        $("#nm-editor").html(output);
        this.populate();
    };

  	window.EditorView.prototype.searchPostal = function(){}

  	window.InfoGraphView.prototype.model = property_model;

	window.InfoGraphView.prototype.render = function(){
		var template = Hogan.compile($("#ig-default").html());
        var output = template.render(this.model.toJSON());
        $("#infograph_container").html(output);
        //Update the background size
        //$($("#infograph_container").html()).css("background-size", "100% 100%");
        $("#infograph_container").show('slow');
        $("#google_map").html("<a style=color:white>!Google Map Area!</a>");
	};

	initializeGoogleMap = function(){};
	
	var editorview = new window.EditorView(
					{
						el : $("#accordion"),
						model : property_model
					});
   	var infoGraphview = new window.InfoGraphView();

 	$("#test_btn").bind("click", function(){
 		if ($("#source_code").is(":visible")){
 			igfy();	
 		} else {
 			$("#source_code").show('slow');	
 		}
 	});
});

function igfy(){
	$("#source_code").hide('slow');
	$("#ig-default").html($("#source_code").val()); 
	window.EditorView.prototype.render();
	window.InfoGraphView.prototype.render();
}
	


