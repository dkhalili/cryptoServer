$(document).ready(function() {

		    

	$('#registerButton').click(function() {

		    
		$.post( "http://localhost:3000/account", { request: "register"}, function(data) {
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
			console.log("error")
		}
		else {

		    
		$.get( "http://localhost:3000/account/restoreWallet", {privateKey: key }, function(data) {
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
                    url: 'http://localhost:3000/account',
                    type: 'PUT',
                    data: {
                        request: "sendCoin", 
                        fromAddress: $('#address').text(), 
                        toAddress: $('#addressInput').val(), 
                        amount : $('#amountInput').val() 
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
                })


	});


});



