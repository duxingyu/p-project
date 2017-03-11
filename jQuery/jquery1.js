(function(global, factory) {
  /**
   * 判断运行环境这里是判断cmd代码（省略）
   * 如果不是cmd则执行下面这句话
   * factory：即jQuery
   * global: 顶层对象，如果有window则传入window(浏览器),没有传入this(如nodejs为global)
   */
  factory(global);
})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
  "use strict";

  /**
   * 获取常用方法及document对象
   * 数组：slice, concat, push, indexOf
   * 对象：getProto：获取__proto__
   * class2type: {}
   * toString: 可用于数据类型判断即Object.prototype.toString.call(obj) ($.type(obj))
   * hasOwn：obj.hasOwnProperty
   * fnToString，ObjectFunctionString：用来判断是否为Object对象的实例，($.sPlainObject(obj))
   * 
   */
  var arr = [];

  var document = window.document;

  var getProto = Object.getPrototypeOf;

  var slice = arr.slice;

  var concat = arr.concat;

  var push = arr.push;

  var indexOf = arr.indexOf;

  var class2type = {};

  var toString = class2type.toString;

  var hasOwn = class2type.hasOwnProperty;

  var fnToString = hasOwn.toString;

  var ObjectFunctionString = fnToString.call(Object);

  var support = {};

  /**
   * 向head中动态添加脚本并删除
   * @param {string} code 代码 
   * @param {document} doc document对象
   */
  function DOMEval(code, doc) {
    doc = doc || document;

    var script = doc.createElement("script");

    script.text = code;
    // 浏览器在加载脚本时，会先停止文档解析，因此会先在执行完脚本后再删除
    doc.head.appendChild(script).parentNode.removeChild(script);
  }

  var
    version = "3.1.1",

    /**
     * 在调用jQuery时实际是new一个jQuery.fn.init(selector,context)并返回，方便调用
     * jQuery.fn === jQuery.prototype
     * selector: 选择器
     * context：执行上下文
     */
    jQuery = function(selector, context) {

      return new jQuery.fn.init(selector, context);
    },

    // 去掉前后空格还有 （BOM？）
    // \s= \r\n\f\v\t, \uFEFF: '', \xA0: ' '
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    // 用来转为驼峰字符串的正则，如font-size: fontSize
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([a-z])/g,

    // 作为replace的回调，转为驼峰
    fcamelCase = function(all, letter) {
      return letter.toUpperCase();
    };

  
  jQuery.fn = jQuery.prototype = {

	jquery: version,

	constructor: jQuery,

	// jQuery对象属性length默认为0
	length: 0,

  // 转为字符串 = Array.prototype.slice.call(this)
	toArray: function() {
		return slice.call( this );
	},

	get: function( num ) {

		// 为null，undefined返会整数组形式
		if ( num == null ) {
			return slice.call( this );
		}

    // 可以使用负值获取
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

  /**
   * 将一个元素数组push到一个堆中，返回新匹配的元素集合，可以方便地获取到前一个元素(end())
   * 如：$('#a1').pushStack('#a2')
   * {0: $('#a2'), prevObject: {0: $('#a1')...}}
   */
	pushStack: function( elems ) {

    // 构建一个新的jQuery匹配元素集合
		var ret = jQuery.merge( this.constructor(), elems );

		// 将this存到prevObject中
		ret.prevObject = this;

		return ret;
	},

	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
      // +i 将i转为数字类型(包含NaN)，可以取负值,从后数
      // j可能的值为>= 0 或NaN
			j = +i + ( i < 0 ? len : 0 );
      // 执行顺序为 (j >=0 && j < len) ? [this[j]] : []
      // NaN返回空数组
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
    // 没有返回jQuery
		return this.prevObject || this.constructor();
	},

  // 用于内部的方法
	push: push,
	sort: arr.sort,
	splice: arr.splice
};
});
