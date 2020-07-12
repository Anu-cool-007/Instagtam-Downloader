chrome.tabs.onActivated.addListener(tab => {
	chrome.tabs.get(tab.tabId, current_tab_info => {
		if (/^https:\/\/www\.instagram/.test(current_tab_info.url)) {
			chrome.tabs.insertCSS(null, { file: './mystyle.css' });
			chrome.tabs.executeScript(null, { file: './foreground.js' });
		}
	});
});
chrome.runtime.onMessage.addListener(function (arg, sender, sendResponse) {
	chrome.downloads.download({
		url: arg.url,
		filename: arg.fileName
	});
});