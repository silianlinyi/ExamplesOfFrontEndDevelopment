function supportsTemplate() {
	return 'content' in document.createElement('template');
}

if (supportsTemplate()) {
	console.log('支持');
} else {
	console.log('不支持');
}
