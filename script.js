$(document).ready(function() {

		    

	$('#registerButton').click(function() {

		    
		$.post( "/account", function(data) {
   			$('.loginRegister').hide();
   			$('.account').show();

   			$('#address').text(data.address)
   			$('#privateKey').text(data.privateKey)
   			$('#balance').text(data.balance)
		} );


	
	});


	$('#loginButton').click(function() {

		var key = $('#keyInput').val();

		if(!key) {
			console.log("error");
		}
		else {

		    
		$.get( "/account/restoreWallet", {privateKey: key }, function(data) {

   			$('.loginRegister').hide();
   			$('.account').show();

   			$('#address').text(data.address)
   			$('#privateKey').text(key)
   			$('#balance').text(data.balance)
		} );


		}
	});








	$('#sendCoin').click(function() {

                $.ajax({
                    url: '/account',
                    type: 'PUT',
                    data: {
                        request: "sendCoin", 
                        fromAddress: $('#address').text(), 
                        toAddress: $('#addressInput').val(), 
                        amount : $('#amountInput').val(),
                        privateKey: $('#privateKey').text()
                    },
                    success: function (response) {
                    	console.log(response.fromBalance);

                    	var notification = $('#amountInput').val() + " sent to address: " + $('#addressInput').val();
                        $('#sendNotification').text(notification)

                    	$('#balance').text(response.fromBalance);
                    	$('#addressInput').val('');
                        $('#amountInput').val('');

                    },
                    error: function(response) {
                    	console.log(response.responseJSON.message);
                    	
                    	$('#sendNotification').text(response.responseJSON.message)
                    }
                });


	});





  $('#viewCoinsSent').click( function() {
    
    $('#logsList').empty();
    
    $.get( "/account/logs/fromAccount/" + $('#address').text(), function(data) {
        for (var x = 0; x < data.length; x++) {
          $('#logsList').append("<p>" + data[x].amount+" coins sent to address: " + data[x].toAddress + " at " + Date(data[x].updatedAt) + " </p>")
        }
    } );

  });



  $('#viewCoinsReceived').click( function() {

    $('#logsList').empty();

    $.get( "/account/logs/toAccount/" + $('#address').text(), function(data) {
        for (var x = 0; x < data.length; x++) {
          $('#logsList').append("<p>" + data[x].amount+" coins received from address: " + data[x].fromAddress + " at "+ Date(data[x].updatedAt) + "</p>")
        }
    } );


  });





});



