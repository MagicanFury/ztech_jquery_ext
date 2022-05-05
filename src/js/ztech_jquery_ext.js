/*!
 * ztech_jquery_ext 0.0.1
 * Extends JQuery library for more compact code base
 *
 * Created by Ivan Auda
 *
 * @license MIT
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function (root, jQuery) {
			if (jQuery === undefined) {
				// require('jQuery') returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				if (typeof window !== 'undefined') {
					jQuery = require('jquery');
				}
				else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";

	// Default Options
	var defaults = {
		// TODO: ADD YOUR DEFAULT OPTIONS HERE
		myStyle: 'my-style1'
	};

	class Ztech__ext {

		constructor(element, options) {
			// Merge user settings with default
			this.options = $.extend(true, {}, defaults, options);
			// Main container element
			this.$ele = $(element);
			// Initial load
			this._init();
		}

		// Initial Method
		_init() {
			// Plugin init and logic
		}
	}
	var _types = { 'UNKNOWN': 0, 'JQUERY': 1, 'HTMLELEMENT': 2, 'STRING': 3 };

	function _getType(arg) {
		if (arg instanceof $)
			return _types.JQUERY;
		if (arg instanceof HTMLElement)
			return _types.HTMLELEMENT;
		if (typeof arg === 'string')
			return _types.STRING;
		return _types.UNKNOWN;
	}

	function _getEle$(queryElementOrJquery) {
		var arg = queryElementOrJquery;
		switch (_getType(arg)) {
			case _types.JQUERY: return arg;
			case _types.HTMLELEMENT: return $(arg);
			case _types.STRING: return $(arg);
			case _types.UNKNOWN: return undefined;
			default: return undefined;
		}
	}

	function _getEle(queryElementOrJquery) {
		var arg = queryElementOrJquery;
		switch (_getType(arg)) {
			case _types.JQUERY: return arg.get(0);
			case _types.HTMLELEMENT: return arg;
			case _types.STRING: return document.querySelector(arg);
			case _types.UNKNOWN: return undefined;
			default: return undefined;
		}
	}

	/**
	 * Converts JQuery Object to array of JQuery elements
	 * @returns {JQuery[]}
	 */
	$.fn.$arr = function () {
		return this.toArray().map(ele => $(ele));
	};

	/**
	 * Array map implementation with every element in the array representing a JQuery element
	 * @param {(value: T, index: number, array: readonly T[]) => U} callbackfn 
	 * @returns {U[]}
	 */
	 $.fn.$map = function (callbackfn) {
		return this.$arr().map(callbackfn);
	};

	// Wrapper for the plugin
	$.fn.ztechExt = function (options) {
		var pluginName = "ztechExt";
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, pluginName)) {
					$.data(this, pluginName, new Ztech__ext(this, options));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			let instance = $.data(this[0], pluginName);

			if (options === 'destroy') {
				$.data(this, pluginName, null);
			}

			if (instance instanceof Ztech__ext && typeof instance[options] === 'function') {
				return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
			} else {
				return this;
			}
		}
	};
}));
