
/**
 * Check and invoke callback function
 */
exports.invokeCallback = function(cb) {
	if ( !! cb && typeof cb === 'function') {
		cb.apply(null, Array.prototype.slice.call(arguments, 1));
	}
};