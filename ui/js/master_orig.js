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
			// reader.readAsDataURL(this.files[1]);
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
			// reader.readAsDataURL(this.files[1]);
		}
	})
	document.querySelector('#upload').addEventListener('click', () => {
		if (!imgSnap1.files.length > 0) {
			alert("Please select a file...");
		} else {
			 fetch('http://localhost:5002/api', {
			 	method: "post",
			 	// cache: false,
			 	headers: {
			 		'source': 'photo',
			 		'Content-Type': "application/json"
			 	},
			 	body: content
			 }
			).then((response) => {
				return response
			}).then((data) => {
				console.log(data)

				// $('#imageContainer3').html('<img class="img-responsive"  src="'+data.image_url+'"/>')

				// let textArea = document.querySelector('#resultTextArea');
				// console.log(data);
				// textArea.textContent = data;
				// document.querySelector('.output').style.display = "block";
				// scrollHeight = 25 + textArea.scrollHeight;
				// textArea.style.height = `${scrollHeight}px`;

				let imageArea = document.querySelector("#imageContainer3");
				// imageArea.sr
			});
		}

	});

	// document.querySelector('#upload2').addEventListener('click', () => {
	// 	if (!imgSnap1.files.length > 0) {
	// 		alert("Please select a file...");
	// 	} else {
	// 		 fetch('http://localhost:5002/api', {
	// 		 	method: "post",
	// 		 	// cache: false,
	// 		 	headers: {
	// 		 		'source': 'photo',
	// 		 		'Content-Type': "application/json"
	// 		 	},
	// 		 	body: content
	// 		 }
	// 		).then((response) => {
	// 			return response.json()
	// 		}).then((data) => {
	// 			let textArea = document.querySelector('#resultTextArea');
	// 			console.log(data);
	// 			textArea.textContent = data.code;
	// 			document.querySelector('.output').style.display = "block";
	// 			scrollHeight = 25 + textArea.scrollHeight;
	// 			textArea.style.height = `${scrollHeight}px`;
	// 		});
	// 	}
	//
	// });


	//Code for capturing the images from the camera.....
	const video = document.querySelector('#video');
	const captureButton = document.querySelector('#capture');
	captureButton.addEventListener('click', startCamera);

	function startCamera() {
		video.style.display = "block";
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
				let fileReader = new FileReader();
				fileReader.onload = (data) => {
					console.log("file reader on load end function....!");
					let imageData = fileReader.result.split(',')[1];
					console.log('hi')
					console.log(imageData)
					content = JSON.stringify({
						files: [imageData],
						title: 'title'
					});
					//Calling the fetch api
					fetch('http://localhost:5002/api', { //change the api endpoint
						method: "post",
						headers: {
							'source': 'photo',
							'Content-Type': "application/json"
						},
						body: content
					}
					).then((response) => {
						return response.json()
					}).then((data) => {
						console.log(data)
						if (data.sendAgain == true) {
							takeSnap();
						} else {
							let textArea = document.querySelector('#resultTextArea');
							console.log(data);
							textArea.textContent = data.code;
							document.querySelector('.output').style.display = "block";
							scrollHeight = 25 + textArea.scrollHeight;
							textArea.style.height = `${scrollHeight}px`;
						}
					})

				};
				video.srcObject = stream;
				video.play();
				setTimeout(takeSnap, 2000);
				function takeSnap() {
					console.log("In take snap function....!");
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
					ctx.drawImage(video, 0, 0,640,864);
					document.querySelector('.container').appendChild(canvas);
					canvas.toBlob((blob) => {
						fileReader.readAsDataURL(blob);
					}, 'image/jpeg')
				}
			});
		} else {
			alert("Camera not accessible...!");
		}
	}
})





