var Promises = function() {
	this.state = 'pending';
	this.thenables = [];
}

Promises.prototype.resolve = function(value) {
	if (this.state !== 'pending') return;

	this.state = 'fulfilled';
	this.value = value;
	this._handleThen();
	return this;
};

Promise.prototype.reject = function(reason) {
	if (this.state !== 'pending') return;
	
	this.state = 'rejected';
	this.reason = reason;
	this._handleThen();
	return this;
};

Promise.prototype.then = function(onFulfilled, onRejected) {
	var thenable = [];
	
	if (typeof onFulfilled === 'function') {
		thenable.fulfill = onFulfilled;
	}
	if (typeof onRejected === 'function') {
		thenable.reject = onRejected;
	}
	
	if (this.state !== 'pending') {
		setImmediate(function() {
			this._handleThen();
		}.bind(this));
	}
	
	thenable.promise = new Promise();
	this.thenables.push(thenable);
	
	return thenable.promise;
};

