// 给jQuery添加静态方法及实例方法
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// 如果参数一为布尔值，根据其判断是否应该使用深浅克隆，target为下一个参数，i++
	if ( typeof target === "boolean" ) {
		deep = target;

		target = arguments[ i ] || {};
		i++;
	}

	// 如果target不是object或function，将其转为{}
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// 如果target后没有参数了，将其作为jQuery的静态方法
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// 只处理非null及undefined的情况，并将argument[i]赋给options
		if ( ( options = arguments[ i ] ) != null ) {

			// 遍历options，target可能含有name属性，需要进行处理，添加或覆盖
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

        // 避免调用自身，出现循环引用
				if ( target === copy ) {
					continue;
				}

				// 如果为深拷贝且为数组或对象则递归调用自身，否则直接赋值
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// 保证唯一性
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

  // 判断obj是否为函数
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

  // 判断数组
	isArray: Array.isArray,

  // window.window === window
	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},
  // 判断是否为数字或可以转为数字的字符串(不包含NaN)
	isNumeric: function( obj ) {

		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
      // parseFloat会将''转为NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

    // 如果obj的__proto__为null，如Object.create(null)
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

  // 判断是否为空对象，如果有可枚举属性，则返回false
	isEmptyObject: function( obj ) {

		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
    // 如果为null/undefined，返回字符串'null'/'undefined'
		if ( obj == null ) {
			return obj + "";
		}

    // 如果为引用类型则使用class2type判断，否则直接使用typeof判断：如class2type['[object Array]'] => 'array'
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

  // 在全局环境下执行code
	globalEval: function( code ) {
		DOMEval( code );
	},

	// 转为驼峰，-ms-为兼容
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

  // 判断elem的nodeName是否等于name，通过转为小写比较
	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

    // 如果为数组，类数组则执行循环，对象使用for..in
		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// text为null/undefined返回空字符串，否则转为字符串后去除空格
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

  // 如果arr为类数组则转为数组，并将arr中每一项push到ret中，arr != null的其他情况下将arr直接push到ret中
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},
  // 类似数组的indexOf，也可判断string
	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// 合并second中各项到first，两者均可为数组或类数组形式，这里主要用于类数组形式
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

  // 暂时未知用途，应该是使用callback验证invert
	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// 类似与数组的map方法，但还可以处理类数组，普通对象,arg为内部使用，不清楚用途
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// 将经callback处理后的结果存到ret中
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );
        // 如果为null/undefined则跳过
				if ( value != null ) {
					ret.push( value );
				}
			}

		// 普通对象使用for..in
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
    // 这里不清楚为何使用concat，尽管能看懂上面一行注释
		return concat.apply( [], ret );
	},

	// 全局唯一标识符个数
	guid: 1,

	// 绑定fn到context上，后面为fn的参数
	proxy: function( fn, context ) {
		var tmp, args, proxy;

    // 当context为字符串时，将其看作fn的方法或属性赋给fn，而context则赋值fn，如(A, a) => (A.a, A)
		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// 如果fn不是函数，返回undefined
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// 获取fn的参数
		args = slice.call( arguments, 2 );
		proxy = function() {
      // 没有context则绑定到this(不再改指向则指向为global(window))，返回的proxy还可传入其他参数如：$.proxy(,)(arg)
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// 浏览器功能检测
	support: support
} );
// ES6 Symbol检测，jQuery的Symbol.iterator属性，指向该对象的默认遍历器方法,jQuery.fn 使用arr的遍历方法
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// 用于对主要数据类型进行准确判断，并传入class2type，便于判断
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// 如果Boolean(obj)为true，且obj有length属性，将其赋给length
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

  // obj为函数或为window，返回false(window也有length属性，表示iframe等的个数)
	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

  /**
   * 1. obj为数组
   * 2. length === 0？
   * 3. 由于length是用来遍历对象的，所以length需要为数字且大于0，length-1为obj的属性
   */
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}