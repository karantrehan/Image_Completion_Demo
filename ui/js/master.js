window.addEventListener('load', () => {
	let imgSnap1 = document.querySelector('#imgSnap1');
	let imgSnap2 = document.querySelector('#imgSnap2');
	let content;
	let obj={
		files:[],
		title:'title'
	}

	imgSnap1.addEventListener('change', function (event) {
		if (this.files && this.files[0]) {
			let reader = new FileReader();
			reader.onload = function (e) {
				document.querySelector('#imageContainer1').setAttribute('src', e.target.result);
				document.querySelector('#imageContainer1').style.height = "180px";
				document.querySelector('#imageContainer1').style.width = "180px";
				let imageData = reader.result.split(',')[1];
				console.log('hi')
				console.log(imageData);
				obj.files.push(imageData);
				content = JSON.stringify(obj);
			}
			reader.readAsDataURL(this.files[0]);
		}
	});

	imgSnap2.addEventListener('change', function (event) {
		if (this.files && this.files[0]) {
			let reader = new FileReader();
			reader.onload = function (e) {
				document.querySelector('#imageContainer2').setAttribute('src', e.target.result);
				document.querySelector('#imageContainer2').style.height = "180px";
				document.querySelector('#imageContainer2').style.width = "180px";
				let imageData = reader.result.split(',')[1];
				console.log('hi')
				console.log(imageData);
				obj.files.push(imageData);
				content = JSON.stringify(obj);
			}
			reader.readAsDataURL(this.files[0]);
		}
	})

	$("#download").on("click", function(){

		// Use XMLHttpRequest instead of Jquery $ajax
		xhttp = new XMLHttpRequest();
		// Post data to URL which handles post request
		xhttp.open("POST", window.location.protocol+'//'+window.location.hostname+':5002/api');
		xhttp.setRequestHeader("Content-Type", "application/json");
		// You should set responseType as blob for binary responses
		xhttp.responseType = 'blob';
		if (obj.files[0] && obj.files[1]) {
            xhttp.send(content);
            $("#downloadText").css('color', 'black');
            $("#downloadText").text('Please wait... Image processing and downloading may take a few seconds')
			document.querySelector('#imageContainer1').setAttribute('src', "images/180.png");
			document.querySelector('#imageContainer2').setAttribute('src', "images/180.png");
			$('#imgSnap1').val('')
			$('#imgSnap2').val('')
			console.log(content)
			delete(content)
			obj.files = []
        }
        else {
        	// $("#downloadText").css('color', 'red');
        	alert('Please select both image and mask first');
    		// document.write("Welcome to C# Corner - " + test);
        	// $("#downloadText").text('Please select both image and mask first')
        	// $("#downloadText").fontcolor('#fff')
		}

		xhttp.onreadystatechange = function() {
			var a;
			if (xhttp.readyState === 4 && xhttp.status === 200) {
				// Trick for making downloadable link
				a = document.createElement('a');
				a.href = window.URL.createObjectURL(xhttp.response);
				// Give filename you wish to download
				a.download = "image_result.jpg";
				a.style.display = 'none';
				document.body.appendChild(a);
				a.click();

				$("#downloadText").text('')
				// setTimeout(1000)
				setTimeout(() => {  alert('Download Complete') }, 10);

			}
		}
	});

})





