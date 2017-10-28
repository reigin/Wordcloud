

//~ console.log("hi")
function doOther(t){
	//~ console.log(t);
	var jsonData = $("#textquery").val();
	console.log('............');
	console.log(jsonData);
	
	return t.text;
}

$( function() {
	$( document ).tooltip();
} );

//insert dataset
$(document).ready(function() {

	//slider lat berubah
	$( "#slider-range-lat" ).slider({
		range: true,
		min: -200,
		max: 300,
		values: [ -150, 200 ],
		slide: function( event, ui ) {
			$( "#lat" ).val( ui.values[ 0 ] + " ~ " + ui.values[ 1 ] + " ");
		},
		change: function( event, ui ) {
			query();
		}
	});
	$( "#lat" ).val( $( "#slider-range-lat" ).slider( "values", 0 ) + " ~ " + $( "#slider-range-lat" ).slider( "values", 1 ) );
	
	//slider long berubah
	$( "#slider-range-long" ).slider({
		range: true,
		min: -200,
		max: 300,
		values: [ -150, 200 ],
		slide: function( event, ui ) {
			$( "#long" ).val( ui.values[ 0 ] + " ~ " + ui.values[ 1 ] + " ");
		},
		change: function( event, ui ) {
			query();
		}
	});
	$( "#long" ).val( $( "#slider-range-long" ).slider( "values", 0 ) + " ~ " + $( "#slider-range-long" ).slider( "values", 1 ) );
					
	//klo dropdown rank berubah maka			
	$("#myselectrank").change(function ()  {
		query();
	});
					
	//klo dropdown poi berubah maka			
	$("#myselect").change(function ()  {
		query();
	});
	
	//klo dropdown tipe berubah maka
	$("#myselectTipe").change(function () { 
		query();
	});
	
	//klo dropdown lokasi berubah maka
	$("#myselectLokasi").change(function () { 
		query();
	});
	
	function query(){
		poi_id = $("#myselect").val();
		poi_tipe = $("#myselectTipe").val();
		poi_lokasi = $("#myselectLokasi").val();
		long = $("#long").val();
		lat = $("#lat").val();
		rank = $("#rank").val();
		$.ajax({
			url : "model.php",
			type: "POST",
			data: { status: 1, poiId:poi_id, poiTipe:poi_tipe, poiLokasi:poi_lokasi, lat:lat, long:long, rank:rank},
			dataType: "text",
			success : function (data) {
				$("#text").val(data);
				$('#go').trigger('click');
			}
		});
	};
		
	// set variable dropdown poi
	$.ajax({
		url:'model.php',
		type:'POST',
		data: {status:3, param:'poi'},
		dataType: 'json',
		success: function( json ) {
			$.each(json, function(i, value) {
				$('#myselect').append($('<option>').text(value['poi_name']).attr('value', value['poi_id']));
			});
		}
	});
		
	// set variable dropdown tipe
	$.ajax({
		url:'model.php',
		type:'POST',
		data: {status:3, param:'tipe'},
		dataType: 'json',
		success: function( json ) {
			$.each(json, function(i, value) {
				$('#myselectTipe').append($('<option>').text(value['nama_tipe']).attr('value', value['id']));
			});
		}
	});
		
	// set variable dropdown lokasi
	$.ajax({
		url:'model.php',
		type:'POST',
		data: {status:3, param:'lokasi'},
		dataType: 'json',
		success: function( json ) {
			$.each(json, function(i, value) {
				$('#myselectLokasi').append($('<option>').text(value['lokasi']).attr('value', value['id']));
			});
		}
	});
		
	//isi text yg brp json, all data
	$.ajax({
		url : "model.php",
		type: "POST",
		data: { status: 2},
		dataType: "text",
		success : function (data) {
			$("#textquery").val(data);
		}
	});
	
	
	//isi text yg akan ditampilkan awal sndiri
	$.ajax({
		url : "model.php",
		type: "POST",
		data: { status: 0},
		dataType: "text",
		success : function (data) {
			//~ alert("here");
			$("#text").val(data);
			//~ console.log(data);
			
			//trial yg tooltip something
			
			setTimeout(function(){
				
			//~ console.log("----");
			//~ console.log($(".txt"));
			
			var gg = $( ".txt" );
			
				gg.hover(function(){
					//ok console.log(this.innerHTML);
					//this.attr('data-tooltip','wtf');
					//~ this.attr;
				});					
					
			
			for (var i=0; i<gg.length; i++) {
			 var gElem = gg[i];
			 //ok console.log(gElem.innerHTML);
			//~ var children = gElem.children;
			 //~ console.log(children);
			 //~ console.log(gElem.html());
			 
			 //~ console.log('----');

			 // `children` is an array of the form [child, child, ...].

			 //~ for (var j=0; j < children.length; j++){
			  //~ var child = children[j];   
			  //~ console.log(child.html());
			  //~ var box = child.getBBox();
			  //~ var width = box.width;
			  //~ gElem.hover(function(){
					//~ alert("aaa");
				//~ });
						//~ // Hover over code
						//~ var title = $(this).attr('title');
						//~ $(this).data('tipText', title).removeAttr('title');
						//~ $('<p class="tooltip"></p>')
						//~ .text(title)
						//~ .appendTo('body')
						//~ .fadeIn('slow');
				//~ }, function() {
						//~ // Hover out code
						//~ $(this).attr('title', $(this).data('tipText'));
						//~ $('.tooltip').remove();
				//~ }).mousemove(function(e) {
						//~ var mousex = e.pageX + 20; //Get X coordinates
						//~ var mousey = e.pageY + 10; //Get Y coordinates
						//~ $('.tooltip')
						//~ .css({ top: mousey, left: mousex })
				//~ });

			  //... Now do whatever you wanted to do with the width.

			 //~ }
			}			
			//~ $("#vis").children('svg').children('g').attr("class", "masterTooltip");


				
				
				
			},1000);
			
						
		}
	});
});


$('text').hover(function(){
	//~ console.log($(this))
	alert($(this).find('input').val())
})

//~ $( "text[text='text-anchor']" ).tooltip({
    //~ content: function( response ) {
        //~ $.ajax({ 
        //~ url: "model.php",
        //~ data: {
    			//~ 'status': 2
  			//~ },
        //~ type: "POST"
        //~ })
          //~ .then(function( data ) {
             //~ response( data );
          //~ });
    //~ },
    //~ items: "*"
//~ });
//model filter

