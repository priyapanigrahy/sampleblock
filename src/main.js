require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
//const fetch = require('node-fetch');
const axios = require('axios');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

//var address, width, height, zoom, link, mapsKey;


function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}


document.getElementById('chatgpt-button').addEventListener('click', async (event) => {
	event.preventDefault();

	const chatgptPrompt = document.getElementById('chatgpt-input').value;
	console.log('chatgptPrompt = '+chatgptPrompt);
	sdk.setContent('Question :'+chatgptPrompt);
	/*const response = await fetch('https://api.openai.com/v1/completions', {
  		method: 'POST',
  		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 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'
		},
  		body: JSON.stringify({
			model: "text-davinci-003",
			prompt: chatgptPrompt,
			max_tokens: 200,
			temperature: 0
		})
	});*/

	

	const headers = {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer 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'
	};

	const data = {
		model: 'text-davinci-003',
		prompt: chatgptPrompt,
		max_tokens: 200,
		temperature: 0
	};

	try {
		const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
		console.log(response.data.choices[0].text);
		const responseData = await response.json();
		console.log("responseData : "+responseData);
		sdk.setContent(response.data.choices[0].text);
	} catch (error) {
		console.error(error);
	}
});




/*function paintSettings () {
	document.getElementById('text-input-id-0').value = mapsKey;
	document.getElementById('text-input-id-1').value = address;
	document.getElementById('slider-id-01').value = width;
	document.getElementById('slider-id-02').value = height;
	document.getElementById('slider-id-03').value = zoom;
}

function paintSliderValues () {
	document.getElementById('slider-id-01-val').innerHTML = document.getElementById('slider-id-01').value;
	document.getElementById('slider-id-02-val').innerHTML = document.getElementById('slider-id-02').value;
	document.getElementById('slider-id-03-val').innerHTML = document.getElementById('slider-id-03').value;
}

function paintMap() {
	mapsKey = document.getElementById('text-input-id-0').value;
	address = document.getElementById('text-input-id-1').value;
	width = document.getElementById('slider-id-01').value;
	height = document.getElementById('slider-id-02').value;
	zoom = document.getElementById('slider-id-03').value;
	link = document.getElementById('text-input-id-2').value;
	if (!address) {
		return;
	}
	var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
		address.split(' ').join('+') + '&size=' + width + 'x' + height + '&zoom=' + zoom +
		'&markers=' + address.split(' ').join('+') + '&key=' + mapsKey;
	sdk.setContent('<a href="' + link + '"><img src="' + url + '" /></a>');

	sdk.setData({
		address: address,
		width: width,
		height: height,
		zoom: zoom,
		link: link,
		mapsKey: mapsKey
	});
	localStorage.setItem('googlemapsapikeyforblock', mapsKey);
}

sdk.getData(function (data) {
	console.log('entering from sdk.getData -------'+new Date());
	address = data.address || '';
	width = data.width || 400;
	height = data.height || 300;
	zoom = data.zoom || 15;
	link = data.link || '';
	mapsKey = data.mapsKey || localStorage.getItem('googlemapsapikeyforblock');
	paintSettings();
	paintSliderValues();
	paintMap();
	console.log('exiting from sdk.getData -------'+new Date());
});

document.getElementById('workspace').addEventListener("input", function () {
	console.log('entering workspace input event listener  -------'+new Date());
	debounce(paintMap, 500)();
	paintSliderValues();
	console.log('exiting workspace input event listener  -------'+new Date());
});
*/

