function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = html;
	return template.content.firstChild;
}

function downloadImage(url, name) {
	chrome.runtime.sendMessage({ url: url, fileName: name + '.png' })
}
function injectScript() {
	var photos = document.querySelectorAll('img.FFVAD');
	// Loop through the elements.
	for (var i = 0; i < photos.length; i++) {
		// Get image properties
		const altText = photos[i].getAttribute('alt');
		// const description = altText.split(".");
		// const imgName = description[0];
		const imgName = altText;
		// const tags = description[1].split(": ")[1].split(", ");
		const imgSrc = photos[i].getAttribute('src')

		// Create download button
		var btnTemplate = '<div id="btn-download">';
		btnTemplate += '<svg width="1.7em" height="1.7em" viewBox="0 0 22 16">';
		btnTemplate += '<path d="M2,10 L6,13 L12.8760559,4.5959317 C14.1180021,3.0779974 16.2457925,2.62289624 18,3.5 L18,3.5 C19.8385982,4.4192991 21,6.29848669 21,8.35410197 L21,10 C21,12.7614237 18.7614237,15 16,15 L1,15" id="check"></path>';
		btnTemplate += '<polyline points="4.5 8.5 8 11 11.5 8.5" class="svg-out"></polyline>';
		btnTemplate += '<path d="M8,1 L8,11" class="svg-out"></path>';
		btnTemplate += '</svg>';
		btnTemplate += '</div>';

		const downloadBtn = htmlToElement(btnTemplate);

		// Button on-click
		downloadBtn.onclick = function () {
			if (!this.classList.contains("downloaded")) {
				this.classList.toggle("downloaded");
			}
			downloadImage(imgSrc, imgName)
			event.stopPropagation();
		};

		// Add the download button over the image.
		var element = photos[i].parentElement.parentElement.querySelector('#btn-download');
		if (element === null) {
			photos[i].parentElement.parentElement.appendChild(downloadBtn)
		}
	}
}

injectScript()