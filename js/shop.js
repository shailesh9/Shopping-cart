(function($) {
	$.Shop = function(element) {
		this.$element = $(element);

		this.init();
	};

	$.Shop.prototype = {
		init: function () {
			$.getJSON("https://api.myjson.com/bins/19ynm&callback=callbackFN",
				function(data) {
					this.cartItems = data;
					this.showItems(this.cartItems);
				}.bind(this))
				
		},

		showItems: function(items) {
			console.log(items);
			this.$sum = 0;
			this.bgDiv = $("<div/>").appendTo("body");
			this.bgDiv.addClass("bgCover").text("&nbsp;");
			this.href = $("<a/>").attr("href", "javascript:void()").addClass("closeLink").text("CLOSE");
			this.overlayContent = $("<div/>").addClass("overlayContent").text("HEY DO ANYTHING HERE").append(this.href);
			this.overBox = $("<div/>").appendTo("body");
			this.overBox.addClass("overlayBox").append(this.overlayContent);
			$.each(items.productsInCart, function(index, data) {
				this.$wrap1 = $("<div/>").attr("class", "col-xs-6");
				this.$wrap1.append("<h4 class='nomargin test-media'>"+ data.p_variation + data.p_name +"</h4>" );
				this.$wrap = $("<div/>").attr("class", "row");
				this.$img = $("<img/>").attr("src", "images/T"+data.p_id+".jpg").addClass("img-responsive");
				this.$item = $("<div/>").attr("class", "img-container").append(this.$img);
				this.$final = this.$wrap.append(this.$item, this.$wrap1).prop('outerHTML'); 
				this.$separator = $("<span/>").addClass("separator").text("|").prop('outerHTML');
				$("table#cart tbody").append('<tr><td data-th=PRODUCT>' + this.$final + "<a href='#' class ='launchLink edit-link'>EDIT</a>"+
					this.$separator + "<i class='fa fa-trash-o' aria-hidden='true'></i><a class='remove-link' href='#'>REMOVE</a>"+
					this.$separator + "<i class='fa fa-heart-o' aria-hidden='true'></i><a class='save-link' href='#'>SAVE</a></td><td data-th=SIZE><h4>"+
					data.p_selected_size.code + "</h4></td><td data-th=QTY><div class='col-sm-10'><input type='number' class='input-qty text-center' value='1'></div></td><td data-th=PRICE>" +
			data.p_price+''+data.c_currency+'</td></tr>');

				this.$sum += data.p_price;
			}.bind(this));
			this.sum = $("<h4/>").addClass("span3").append(this.$sum);
			$("table#cart td[data-th ='apply']").prepend(this.sum);

			this.code = $("table#cart td[data-th ='apply']").children("h4").eq(1).text();
			this.total = this.$sum - Number(this.code);

			this.$est = $("<h3/>").addClass("span4").append(this.total);
			this.$cal = $("<td/>").attr("data-th", "ESTOTAL").append(this.$est)
			this.hey =  this.$cal.insertAfter("table#cart td[data-th ='EST']")

			console.log(this.$est);
			console.log(this.hey);


			// this.doOverlayOpen();
				// if window is resized then reposition the overlay box
				this.isOpen = false;

				$(window).bind('resize', this.showOverlayBox.bind(this));
				// activate when the link with class launchLink is clicked
				$('a.launchLink').click(this.doOverlayOpen.bind(this));
				// close it when closeLink is clicked
				$('a.closeLink').click( this.doOverlayClose.bind(this) );
		},

		showOverlayBox: function() {
			console.log("SHOW")
			if( this.isOpen == false ) return;
    		// set the properties of the overlay box, the left and top positions
		    $('.overlayBox').css({
		        display:'block',
		        left:( $(window).width() - $('.overlayBox').width() )/2,
		        top:( $(window).height() - $('.overlayBox').height() )/2 -20,
		        position:'absolute'
		    });
		    // set the window background for the overlay. i.e the body becomes darker
		    $('.bgCover').css({
		        display:'block',
		        width: $(window).width(),
		        height:$(window).height(),
		    });
		},

		doOverlayOpen: function() {
			console.log("DO OPEN")
			//set status to open
			this.isOpen = true;
			this.showOverlayBox();
			$('.bgCover').css({opacity:0}).animate( {opacity:0.5, backgroundColor:'#000'} );
			this.img = $(this)
			console.log(this.img);
			$("div.overlayContent").append(this.img)

			// dont follow the link : so return false.
			return false;
		},

		doOverlayClose: function() {
			console.log("doOverlayClose")
			//set status to closed
		    this.isOpen = false;
		    $('.overlayBox').css( 'display', 'none' );
		    // now animate the background to fade out to opacity 0
		    // and then hide it after the animation is complete.
		    $('.bgCover').animate( {opacity:0}, null, null, function() { $(this).hide(); } );
		}
	}

	$(function() {
		var shop = new $.Shop("table#cart");
	})

})(jQuery);