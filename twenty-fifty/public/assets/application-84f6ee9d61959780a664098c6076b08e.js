/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {
        // For CommonJS and CommonJS-like environments where a proper window is present,
        // execute the factory and get jQuery
        // For environments that do not inherently posses a window with a document
        // (such as Node.js), expose a jQuery-making factory as module.exports
        // This accentuates the need for the creation of a real window
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "jQuery requires a window with a document" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

    var deletedIds = [];

    var slice = deletedIds.slice;

    var concat = deletedIds.concat;

    var push = deletedIds.push;

    var indexOf = deletedIds.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var trim = "".trim;

    var support = {};



    var
        version = "1.11.0",

    // Define a local copy of jQuery
        jQuery = function( selector, context ) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init( selector, context );
        },

    // Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

    // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

    // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
            return slice.call( this );
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {
            return num != null ?

                // Return a 'clean' array
                ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

                // Return just the object
                slice.call( this );
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems ) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge( this.constructor(), elems );

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function( callback, args ) {
            return jQuery.each( this, callback, args );
        },

        map: function( callback ) {
            return this.pushStack( jQuery.map(this, function( elem, i ) {
                return callback.call( elem, i, elem );
            }));
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
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
        },

        end: function() {
            return this.prevObject || this.constructor(null);
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
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

    jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function( msg ) {
            throw new Error( msg );
        },

        noop: function() {},

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function( obj ) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function( obj ) {
            return jQuery.type(obj) === "array";
        },

        isWindow: function( obj ) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },

        isNumeric: function( obj ) {
            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            return obj - parseFloat( obj ) >= 0;
        },

        isEmptyObject: function( obj ) {
            var name;
            for ( name in obj ) {
                return false;
            }
            return true;
        },

        isPlainObject: function( obj ) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
                return false;
            }

            try {
                // Not own constructor property must be Object
                if ( obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
            } catch ( e ) {
                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if ( support.ownLast ) {
                for ( key in obj ) {
                    return hasOwn.call( obj, key );
                }
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for ( key in obj ) {}

            return key === undefined || hasOwn.call( obj, key );
        },

        type: function( obj ) {
            if ( obj == null ) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[ toString.call(obj) ] || "object" :
                typeof obj;
        },

        // Evaluates a script in a global context
        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function( data ) {
            if ( data && jQuery.trim( data ) ) {
                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                ( window.execScript || function( data ) {
                    window[ "eval" ].call( window, data );
                } )( data );
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function( string ) {
            return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
        },

        nodeName: function( elem, name ) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // args is for internal usage only
        each: function( obj, callback, args ) {
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike( obj );

            if ( args ) {
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.apply( obj[ i ], args );

                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.apply( obj[ i ], args );

                        if ( value === false ) {
                            break;
                        }
                    }
                }

                // A special, fast, case for the most common use of each
            } else {
                if ( isArray ) {
                    for ( ; i < length; i++ ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );

                        if ( value === false ) {
                            break;
                        }
                    }
                } else {
                    for ( i in obj ) {
                        value = callback.call( obj[ i ], i, obj[ i ] );

                        if ( value === false ) {
                            break;
                        }
                    }
                }
            }

            return obj;
        },

        // Use native String.trim function wherever possible
        trim: trim && !trim.call("\uFEFF\xA0") ?
            function( text ) {
                return text == null ?
                    "" :
                    trim.call( text );
            } :

            // Otherwise use our own trimming functionality
            function( text ) {
                return text == null ?
                    "" :
                    ( text + "" ).replace( rtrim, "" );
            },

        // results is for internal usage only
        makeArray: function( arr, results ) {
            var ret = results || [];

            if ( arr != null ) {
                if ( isArraylike( Object(arr) ) ) {
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

        inArray: function( elem, arr, i ) {
            var len;

            if ( arr ) {
                if ( indexOf ) {
                    return indexOf.call( arr, elem, i );
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

                for ( ; i < len; i++ ) {
                    // Skip accessing in sparse arrays
                    if ( i in arr && arr[ i ] === elem ) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while ( j < len ) {
                first[ i++ ] = second[ j++ ];
            }

            // Support: IE<9
            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
            if ( len !== len ) {
                while ( second[j] !== undefined ) {
                    first[ i++ ] = second[ j++ ];
                }
            }

            first.length = i;

            return first;
        },

        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function( elems, callback, arg ) {
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike( elems ),
                ret = [];

            // Go through the array, translating each of the items to their new values
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }

                // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );

                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply( [], ret );
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function( fn, context ) {
            var args, proxy, tmp;

            if ( typeof context === "string" ) {
                tmp = fn[ context ];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if ( !jQuery.isFunction( fn ) ) {
                return undefined;
            }

            // Simulated bind
            args = slice.call( arguments, 2 );
            proxy = function() {
                return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: function() {
            return +( new Date() );
        },

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

// Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    });

    function isArraylike( obj ) {
        var length = obj.length,
            type = jQuery.type( obj );

        if ( type === "function" || jQuery.isWindow( obj ) ) {
            return false;
        }

        if ( obj.nodeType === 1 && length ) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v1.10.16
         * http://sizzlejs.com/
         *
         * Copyright 2013 jQuery Foundation, Inc. and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2014-01-13
         */
        (function( window ) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                compile,
                outermostContext,
                sortInput,
                hasDuplicate,

            // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

            // Instance-specific data
                expando = "sizzle" + -(new Date()),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function( a, b ) {
                    if ( a === b ) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

            // General-purpose constants
                strundefined = typeof undefined,
                MAX_NEGATIVE = 1 << 31,

            // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
            // Use a stripped-down indexOf if we can't use a native one
                indexOf = arr.indexOf || function( elem ) {
                    var i = 0,
                        len = this.length;
                    for ( ; i < len; i++ ) {
                        if ( this[i] === elem ) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

            // Regular expressions

            // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",
            // http://www.w3.org/TR/css3-syntax/#characters
                characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

            // Loosely modeled on CSS identifier characters
            // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
            // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = characterEncoding.replace( "w", "w#" ),

            // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
                    "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

            // Prefer arguments quoted,
            //   then not containing pseudos/brackets,
            //   then attribute selectors/non-parenthetical expressions,
            //   then anything else
            // These preferences are here to reduce the number of selectors
            //   needing tokenize in the PSEUDO preFilter
                pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

            // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

                rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
                rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

                rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

                rpseudo = new RegExp( pseudos ),
                ridentifier = new RegExp( "^" + identifier + "$" ),

                matchExpr = {
                    "ID": new RegExp( "^#(" + characterEncoding + ")" ),
                    "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
                    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
                    "ATTR": new RegExp( "^" + attributes ),
                    "PSEUDO": new RegExp( "^" + pseudos ),
                    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
                    "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

            // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,
                rescape = /'|\\/g,

            // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
                funescape = function( _, escaped, escapedWhitespace ) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                            // BMP codepoint
                            String.fromCharCode( high + 0x10000 ) :
                            // Supplemental Plane codepoint (surrogate pair)
                            String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
                };

// Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call( preferredDoc.childNodes )),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[ preferredDoc.childNodes.length ].nodeType;
            } catch ( e ) {
                push = { apply: arr.length ?

                    // Leverage slice if possible
                    function( target, els ) {
                        push_native.apply( target, slice.call(els) );
                    } :

                    // Support: IE<9
                    // Otherwise append directly
                    function( target, els ) {
                        var j = target.length,
                            i = 0;
                        // Can't trust NodeList.length
                        while ( (target[j++] = els[i++]) ) {}
                        target.length = j - 1;
                    }
                };
            }

            function Sizzle( selector, context, results, seed ) {
                var match, elem, m, nodeType,
                // QSA vars
                    i, groups, old, nid, newContext, newSelector;

                if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
                    setDocument( context );
                }

                context = context || document;
                results = results || [];

                if ( !selector || typeof selector !== "string" ) {
                    return results;
                }

                if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
                    return [];
                }

                if ( documentIsHTML && !seed ) {

                    // Shortcuts
                    if ( (match = rquickExpr.exec( selector )) ) {
                        // Speed-up: Sizzle("#ID")
                        if ( (m = match[1]) ) {
                            if ( nodeType === 9 ) {
                                elem = context.getElementById( m );
                                // Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document (jQuery #6963)
                                if ( elem && elem.parentNode ) {
                                    // Handle the case where IE, Opera, and Webkit return items
                                    // by name instead of ID
                                    if ( elem.id === m ) {
                                        results.push( elem );
                                        return results;
                                    }
                                } else {
                                    return results;
                                }
                            } else {
                                // Context is not a document
                                if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                                    contains( context, elem ) && elem.id === m ) {
                                    results.push( elem );
                                    return results;
                                }
                            }

                            // Speed-up: Sizzle("TAG")
                        } else if ( match[2] ) {
                            push.apply( results, context.getElementsByTagName( selector ) );
                            return results;

                            // Speed-up: Sizzle(".CLASS")
                        } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
                            push.apply( results, context.getElementsByClassName( m ) );
                            return results;
                        }
                    }

                    // QSA path
                    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
                        nid = old = expando;
                        newContext = context;
                        newSelector = nodeType === 9 && selector;

                        // qSA works strangely on Element-rooted queries
                        // We can work around this by specifying an extra ID on the root
                        // and working up from there (Thanks to Andrew Dupont for the technique)
                        // IE 8 doesn't work on object elements
                        if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                            groups = tokenize( selector );

                            if ( (old = context.getAttribute("id")) ) {
                                nid = old.replace( rescape, "\\$&" );
                            } else {
                                context.setAttribute( "id", nid );
                            }
                            nid = "[id='" + nid + "'] ";

                            i = groups.length;
                            while ( i-- ) {
                                groups[i] = nid + toSelector( groups[i] );
                            }
                            newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
                            newSelector = groups.join(",");
                        }

                        if ( newSelector ) {
                            try {
                                push.apply( results,
                                    newContext.querySelectorAll( newSelector )
                                );
                                return results;
                            } catch(qsaError) {
                            } finally {
                                if ( !old ) {
                                    context.removeAttribute("id");
                                }
                            }
                        }
                    }
                }

                // All others
                return select( selector.replace( rtrim, "$1" ), context, results, seed );
            }

            /**
             * Create key-value caches of limited size
             * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache( key, value ) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if ( keys.push( key + " " ) > Expr.cacheLength ) {
                        // Only keep the most recent entries
                        delete cache[ keys.shift() ];
                    }
                    return (cache[ key + " " ] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction( fn ) {
                fn[ expando ] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created div and expects a boolean result
             */
            function assert( fn ) {
                var div = document.createElement("div");

                try {
                    return !!fn( div );
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if ( div.parentNode ) {
                        div.parentNode.removeChild( div );
                    }
                    // release memory in IE
                    div = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle( attrs, handler ) {
                var arr = attrs.split("|"),
                    i = attrs.length;

                while ( i-- ) {
                    Expr.attrHandle[ arr[i] ] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck( a, b ) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        ( ~b.sourceIndex || MAX_NEGATIVE ) -
                            ( ~a.sourceIndex || MAX_NEGATIVE );

                // Use IE sourceIndex if available on both nodes
                if ( diff ) {
                    return diff;
                }

                // Check if b follows a
                if ( cur ) {
                    while ( (cur = cur.nextSibling) ) {
                        if ( cur === b ) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo( type ) {
                return function( elem ) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo( fn ) {
                return markFunction(function( argument ) {
                    argument = +argument;
                    return markFunction(function( seed, matches ) {
                        var j,
                            matchIndexes = fn( [], seed.length, argument ),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while ( i-- ) {
                            if ( seed[ (j = matchIndexes[i]) ] ) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext( context ) {
                return context && typeof context.getElementsByTagName !== strundefined && context;
            }

// Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function( elem ) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function( node ) {
                var hasCompare,
                    doc = node ? node.ownerDocument || node : preferredDoc,
                    parent = doc.defaultView;

                // If no document and documentElement is available, return
                if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
                    return document;
                }

                // Set our document
                document = doc;
                docElem = doc.documentElement;

                // Support tests
                documentIsHTML = !isXML( doc );

                // Support: IE>8
                // If iframe document is assigned to "document" variable and if iframe has been reloaded,
                // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
                // IE6-8 do not support the defaultView property so parent will be undefined
                if ( parent && parent !== parent.top ) {
                    // IE11 does not have attachEvent, so all must suffer
                    if ( parent.addEventListener ) {
                        parent.addEventListener( "unload", function() {
                            setDocument();
                        }, false );
                    } else if ( parent.attachEvent ) {
                        parent.attachEvent( "onunload", function() {
                            setDocument();
                        });
                    }
                }

                /* Attributes
                 ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
                support.attributes = assert(function( div ) {
                    div.className = "i";
                    return !div.getAttribute("className");
                });

                /* getElement(s)By*
                 ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function( div ) {
                    div.appendChild( doc.createComment("") );
                    return !div.getElementsByTagName("*").length;
                });

                // Check if getElementsByClassName can be trusted
                support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
                    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

                    // Support: Safari<4
                    // Catch class over-caching
                    div.firstChild.className = "i";
                    // Support: Opera<10
                    // Catch gEBCN failure to find non-leading classes
                    return div.getElementsByClassName("i").length === 2;
                });

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function( div ) {
                    docElem.appendChild( div ).id = expando;
                    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
                });

                // ID find and filter
                if ( support.getById ) {
                    Expr.find["ID"] = function( id, context ) {
                        if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
                            var m = context.getElementById( id );
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            return m && m.parentNode ? [m] : [];
                        }
                    };
                    Expr.filter["ID"] = function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                } else {
                    // Support: IE6/7
                    // getElementById is not reliable as a find shortcut
                    delete Expr.find["ID"];

                    Expr.filter["ID"] =  function( id ) {
                        var attrId = id.replace( runescape, funescape );
                        return function( elem ) {
                            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function( tag, context ) {
                        if ( typeof context.getElementsByTagName !== strundefined ) {
                            return context.getElementsByTagName( tag );
                        }
                    } :
                    function( tag, context ) {
                        var elem,
                            tmp = [],
                            i = 0,
                            results = context.getElementsByTagName( tag );

                        // Filter out possible comments
                        if ( tag === "*" ) {
                            while ( (elem = results[i++]) ) {
                                if ( elem.nodeType === 1 ) {
                                    tmp.push( elem );
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
                    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
                        return context.getElementsByClassName( className );
                    }
                };

                /* QSA/matchesSelector
                 ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See http://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function( div ) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // http://bugs.jquery.com/ticket/12359
                        div.innerHTML = "<select t=''><option selected=''></option></select>";

                        // Support: IE8, Opera 10-12
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        if ( div.querySelectorAll("[t^='']").length ) {
                            rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if ( !div.querySelectorAll("[selected]").length ) {
                            rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if ( !div.querySelectorAll(":checked").length ) {
                            rbuggyQSA.push(":checked");
                        }
                    });

                    assert(function( div ) {
                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = doc.createElement("input");
                        input.setAttribute( "type", "hidden" );
                        div.appendChild( input ).setAttribute( "name", "D" );

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if ( div.querySelectorAll("[name=d]").length ) {
                            rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if ( !div.querySelectorAll(":enabled").length ) {
                            rbuggyQSA.push( ":enabled", ":disabled" );
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
                    docElem.mozMatchesSelector ||
                    docElem.oMatchesSelector ||
                    docElem.msMatchesSelector) )) ) {

                    assert(function( div ) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call( div, "div" );

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call( div, "[s!='']:x" );
                        rbuggyMatches.push( "!=", pseudos );
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
                rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

                /* Contains
                 ---------------------------------------------------------------------- */
                hasCompare = rnative.test( docElem.compareDocumentPosition );

                // Element contains another
                // Purposefully does not implement inclusive descendent
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test( docElem.contains ) ?
                    function( a, b ) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!( bup && bup.nodeType === 1 && (
                            adown.contains ?
                                adown.contains( bup ) :
                                a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
                            ));
                    } :
                    function( a, b ) {
                        if ( b ) {
                            while ( (b = b.parentNode) ) {
                                if ( b === a ) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                 ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function( a, b ) {

                        // Flag for duplicate removal
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if ( compare ) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
                            a.compareDocumentPosition( b ) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if ( compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

                            // Choose the first element that is related to our preferred document
                            if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
                                return -1;
                            }
                            if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function( a, b ) {
                        // Exit early if the nodes are identical
                        if ( a === b ) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [ a ],
                            bp = [ b ];

                        // Parentless nodes are either documents or disconnected
                        if ( !aup || !bup ) {
                            return a === doc ? -1 :
                                b === doc ? 1 :
                                    aup ? -1 :
                                        bup ? 1 :
                                            sortInput ?
                                                ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
                                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if ( aup === bup ) {
                            return siblingCheck( a, b );
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ( (cur = cur.parentNode) ) {
                            ap.unshift( cur );
                        }
                        cur = b;
                        while ( (cur = cur.parentNode) ) {
                            bp.unshift( cur );
                        }

                        // Walk down the tree looking for a discrepancy
                        while ( ap[i] === bp[i] ) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck( ap[i], bp[i] ) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                                bp[i] === preferredDoc ? 1 :
                                    0;
                    };

                return doc;
            };

            Sizzle.matches = function( expr, elements ) {
                return Sizzle( expr, null, null, elements );
            };

            Sizzle.matchesSelector = function( elem, expr ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace( rattributeQuotes, "='$1']" );

                if ( support.matchesSelector && documentIsHTML &&
                    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
                    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

                    try {
                        var ret = matches.call( elem, expr );

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if ( ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11 ) {
                            return ret;
                        }
                    } catch(e) {}
                }

                return Sizzle( expr, document, null, [elem] ).length > 0;
            };

            Sizzle.contains = function( context, elem ) {
                // Set document vars if needed
                if ( ( context.ownerDocument || context ) !== document ) {
                    setDocument( context );
                }
                return contains( context, elem );
            };

            Sizzle.attr = function( elem, name ) {
                // Set document vars if needed
                if ( ( elem.ownerDocument || elem ) !== document ) {
                    setDocument( elem );
                }

                var fn = Expr.attrHandle[ name.toLowerCase() ],
                // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                        fn( elem, name, !documentIsHTML ) :
                        undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                        elem.getAttribute( name ) :
                        (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
            };

            Sizzle.error = function( msg ) {
                throw new Error( "Syntax error, unrecognized expression: " + msg );
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function( results ) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice( 0 );
                results.sort( sortOrder );

                if ( hasDuplicate ) {
                    while ( (elem = results[i++]) ) {
                        if ( elem === results[ i ] ) {
                            j = duplicates.push( i );
                        }
                    }
                    while ( j-- ) {
                        results.splice( duplicates[ j ], 1 );
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function( elem ) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if ( !nodeType ) {
                    // If no nodeType, this is expected to be an array
                    while ( (node = elem[i++]) ) {
                        // Do not traverse comment nodes
                        ret += getText( node );
                    }
                } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": { dir: "parentNode", first: true },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: true },
                    "~": { dir: "previousSibling" }
                },

                preFilter: {
                    "ATTR": function( match ) {
                        match[1] = match[1].replace( runescape, funescape );

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

                        if ( match[2] === "~=" ) {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice( 0, 4 );
                    },

                    "CHILD": function( match ) {
                        /* matches from matchExpr["CHILD"]
                         1 type (only|nth|...)
                         2 what (child|of-type)
                         3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                         4 xn-component of xn+y argument ([+-]?\d*n|)
                         5 sign of xn-component
                         6 x of xn-component
                         7 sign of y-component
                         8 y of y-component
                         */
                        match[1] = match[1].toLowerCase();

                        if ( match[1].slice( 0, 3 ) === "nth" ) {
                            // nth-* requires argument
                            if ( !match[3] ) {
                                Sizzle.error( match[0] );
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
                            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

                            // other types prohibit arguments
                        } else if ( match[3] ) {
                            Sizzle.error( match[0] );
                        }

                        return match;
                    },

                    "PSEUDO": function( match ) {
                        var excess,
                            unquoted = !match[5] && match[2];

                        if ( matchExpr["CHILD"].test( match[0] ) ) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if ( match[3] && match[4] !== undefined ) {
                            match[2] = match[4];

                            // Strip excess characters from unquoted arguments
                        } else if ( unquoted && rpseudo.test( unquoted ) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize( unquoted, true )) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

                            // excess is a negative index
                            match[0] = match[0].slice( 0, excess );
                            match[2] = unquoted.slice( 0, excess );
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice( 0, 3 );
                    }
                },

                filter: {

                    "TAG": function( nodeNameSelector ) {
                        var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function() { return true; } :
                            function( elem ) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function( className ) {
                        var pattern = classCache[ className + " " ];

                        return pattern ||
                            (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
                                classCache( className, function( elem ) {
                                    return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
                                });
                    },

                    "ATTR": function( name, operator, check ) {
                        return function( elem ) {
                            var result = Sizzle.attr( elem, name );

                            if ( result == null ) {
                                return operator === "!=";
                            }
                            if ( !operator ) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                    operator === "^=" ? check && result.indexOf( check ) === 0 :
                                        operator === "*=" ? check && result.indexOf( check ) > -1 :
                                            operator === "$=" ? check && result.slice( -check.length ) === check :
                                                operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
                                                    operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                                                        false;
                        };
                    },

                    "CHILD": function( type, what, argument, first, last ) {
                        var simple = type.slice( 0, 3 ) !== "nth",
                            forward = type.slice( -4 ) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function( elem ) {
                                return !!elem.parentNode;
                            } :

                            function( elem, context, xml ) {
                                var cache, outerCache, node, diff, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType;

                                if ( parent ) {

                                    // :(first|last|only)-(child|of-type)
                                    if ( simple ) {
                                        while ( dir ) {
                                            node = elem;
                                            while ( (node = node[ dir ]) ) {
                                                if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [ forward ? parent.firstChild : parent.lastChild ];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if ( forward && useCache ) {
                                        // Seek `elem` from a previously-cached index
                                        outerCache = parent[ expando ] || (parent[ expando ] = {});
                                        cache = outerCache[ type ] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = cache[0] === dirruns && cache[2];
                                        node = nodeIndex && parent.childNodes[ nodeIndex ];

                                        while ( (node = ++nodeIndex && node && node[ dir ] ||

                                            // Fallback to seeking `elem` from the start
                                            (diff = nodeIndex = 0) || start.pop()) ) {

                                            // When found, cache indexes on `parent` and break
                                            if ( node.nodeType === 1 && ++diff && node === elem ) {
                                                outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                                                break;
                                            }
                                        }

                                        // Use previously-cached element index if available
                                    } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                                        diff = cache[1];

                                        // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                    } else {
                                        // Use the same loop as above to seek `elem` from the start
                                        while ( (node = ++nodeIndex && node && node[ dir ] ||
                                            (diff = nodeIndex = 0) || start.pop()) ) {

                                            if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                                                // Cache the index of each encountered element
                                                if ( useCache ) {
                                                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                                                }

                                                if ( node === elem ) {
                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || ( diff % first === 0 && diff / first >= 0 );
                                }
                            };
                    },

                    "PSEUDO": function( pseudo, argument ) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                                Sizzle.error( "unsupported pseudo: " + pseudo );

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if ( fn[ expando ] ) {
                            return fn( argument );
                        }

                        // But maintain support for old signatures
                        if ( fn.length > 1 ) {
                            args = [ pseudo, pseudo, "", argument ];
                            return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                                markFunction(function( seed, matches ) {
                                    var idx,
                                        matched = fn( seed, argument ),
                                        i = matched.length;
                                    while ( i-- ) {
                                        idx = indexOf.call( seed, matched[i] );
                                        seed[ idx ] = !( matches[ idx ] = matched[i] );
                                    }
                                }) :
                                function( elem ) {
                                    return fn( elem, 0, args );
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function( selector ) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile( selector.replace( rtrim, "$1" ) );

                        return matcher[ expando ] ?
                            markFunction(function( seed, matches, context, xml ) {
                                var elem,
                                    unmatched = matcher( seed, null, xml, [] ),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while ( i-- ) {
                                    if ( (elem = unmatched[i]) ) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function( elem, context, xml ) {
                                input[0] = elem;
                                matcher( input, null, xml, results );
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function( selector ) {
                        return function( elem ) {
                            return Sizzle( selector, elem ).length > 0;
                        };
                    }),

                    "contains": markFunction(function( text ) {
                        return function( elem ) {
                            return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction( function( lang ) {
                        // lang value must be a valid identifier
                        if ( !ridentifier.test(lang || "") ) {
                            Sizzle.error( "unsupported lang: " + lang );
                        }
                        lang = lang.replace( runescape, funescape ).toLowerCase();
                        return function( elem ) {
                            var elemLang;
                            do {
                                if ( (elemLang = documentIsHTML ?
                                    elem.lang :
                                    elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                                }
                            } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function( elem ) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice( 1 ) === elem.id;
                    },

                    "root": function( elem ) {
                        return elem === docElem;
                    },

                    "focus": function( elem ) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": function( elem ) {
                        return elem.disabled === false;
                    },

                    "disabled": function( elem ) {
                        return elem.disabled === true;
                    },

                    "checked": function( elem ) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function( elem ) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if ( elem.parentNode ) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function( elem ) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            if ( elem.nodeType < 6 ) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function( elem ) {
                        return !Expr.pseudos["empty"]( elem );
                    },

                    // Element/input types
                    "header": function( elem ) {
                        return rheader.test( elem.nodeName );
                    },

                    "input": function( elem ) {
                        return rinputs.test( elem.nodeName );
                    },

                    "button": function( elem ) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function( elem ) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function() {
                        return [ 0 ];
                    }),

                    "last": createPositionalPseudo(function( matchIndexes, length ) {
                        return [ length - 1 ];
                    }),

                    "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        return [ argument < 0 ? argument + length : argument ];
                    }),

                    "even": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 0;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function( matchIndexes, length ) {
                        var i = 1;
                        for ( ; i < length; i += 2 ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; --i >= 0; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
                        var i = argument < 0 ? argument + length : argument;
                        for ( ; ++i < length; ) {
                            matchIndexes.push( i );
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
            for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
                Expr.pseudos[ i ] = createInputPseudo( i );
            }
            for ( i in { submit: true, reset: true } ) {
                Expr.pseudos[ i ] = createButtonPseudo( i );
            }

// Easy API for creating new setFilters
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            function tokenize( selector, parseOnly ) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[ selector + " " ];

                if ( cached ) {
                    return parseOnly ? 0 : cached.slice( 0 );
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while ( soFar ) {

                    // Comma and first run
                    if ( !matched || (match = rcomma.exec( soFar )) ) {
                        if ( match ) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice( match[0].length ) || soFar;
                        }
                        groups.push( (tokens = []) );
                    }

                    matched = false;

                    // Combinators
                    if ( (match = rcombinators.exec( soFar )) ) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace( rtrim, " " )
                        });
                        soFar = soFar.slice( matched.length );
                    }

                    // Filters
                    for ( type in Expr.filter ) {
                        if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
                            (match = preFilters[ type ]( match ))) ) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice( matched.length );
                        }
                    }

                    if ( !matched ) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                        Sizzle.error( selector ) :
                        // Cache the tokens
                        tokenCache( selector, groups ).slice( 0 );
            }

            function toSelector( tokens ) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for ( ; i < len; i++ ) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator( matcher, combinator, base ) {
                var dir = combinator.dir,
                    checkNonElements = base && dir === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function( elem, context, xml ) {
                        while ( (elem = elem[ dir ]) ) {
                            if ( elem.nodeType === 1 || checkNonElements ) {
                                return matcher( elem, context, xml );
                            }
                        }
                    } :

                    // Check against all ancestor/preceding elements
                    function( elem, context, xml ) {
                        var oldCache, outerCache,
                            newCache = [ dirruns, doneName ];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                        if ( xml ) {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    if ( matcher( elem, context, xml ) ) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ( (elem = elem[ dir ]) ) {
                                if ( elem.nodeType === 1 || checkNonElements ) {
                                    outerCache = elem[ expando ] || (elem[ expando ] = {});
                                    if ( (oldCache = outerCache[ dir ]) &&
                                        oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[ 2 ] = oldCache[ 2 ]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        outerCache[ dir ] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    };
            }

            function elementMatcher( matchers ) {
                return matchers.length > 1 ?
                    function( elem, context, xml ) {
                        var i = matchers.length;
                        while ( i-- ) {
                            if ( !matchers[i]( elem, context, xml ) ) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function condense( unmatched, map, filter, context, xml ) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for ( ; i < len; i++ ) {
                    if ( (elem = unmatched[i]) ) {
                        if ( !filter || filter( elem, context, xml ) ) {
                            newUnmatched.push( elem );
                            if ( mapped ) {
                                map.push( i );
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
                if ( postFilter && !postFilter[ expando ] ) {
                    postFilter = setMatcher( postFilter );
                }
                if ( postFinder && !postFinder[ expando ] ) {
                    postFinder = setMatcher( postFinder, postSelector );
                }
                return markFunction(function( seed, results, context, xml ) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                    // Get initial elements from seed or context
                        elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

                    // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && ( seed || !selector ) ?
                            condense( elems, preMap, preFilter, context, xml ) :
                            elems,

                        matcherOut = matcher ?
                            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

                                // ...intermediate processing is necessary
                                [] :

                                // ...otherwise use results directly
                                results :
                            matcherIn;

                    // Find primary matches
                    if ( matcher ) {
                        matcher( matcherIn, matcherOut, context, xml );
                    }

                    // Apply postFilter
                    if ( postFilter ) {
                        temp = condense( matcherOut, postMap );
                        postFilter( temp, [], context, xml );

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while ( i-- ) {
                            if ( (elem = temp[i]) ) {
                                matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
                            }
                        }
                    }

                    if ( seed ) {
                        if ( postFinder || preFilter ) {
                            if ( postFinder ) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while ( i-- ) {
                                    if ( (elem = matcherOut[i]) ) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push( (matcherIn[i] = elem) );
                                    }
                                }
                                postFinder( null, (matcherOut = []), temp, xml );
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while ( i-- ) {
                                if ( (elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                                matcherOut.splice( preexisting, matcherOut.length ) :
                                matcherOut
                        );
                        if ( postFinder ) {
                            postFinder( null, results, matcherOut, xml );
                        } else {
                            push.apply( results, matcherOut );
                        }
                    }
                });
            }

            function matcherFromTokens( tokens ) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[ tokens[0].type ],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator( function( elem ) {
                        return elem === checkContext;
                    }, implicitRelative, true ),
                    matchAnyContext = addCombinator( function( elem ) {
                        return indexOf.call( checkContext, elem ) > -1;
                    }, implicitRelative, true ),
                    matchers = [ function( elem, context, xml ) {
                        return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                            (checkContext = context).nodeType ?
                                matchContext( elem, context, xml ) :
                                matchAnyContext( elem, context, xml ) );
                    } ];

                for ( ; i < len; i++ ) {
                    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
                        matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
                    } else {
                        matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

                        // Return special upon seeing a positional matcher
                        if ( matcher[ expando ] ) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for ( ; j < len; j++ ) {
                                if ( Expr.relative[ tokens[j].type ] ) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher( matchers ),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
                                ).replace( rtrim, "$1" ),
                                matcher,
                                i < j && matcherFromTokens( tokens.slice( i, j ) ),
                                j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
                                j < len && toSelector( tokens )
                            );
                        }
                        matchers.push( matcher );
                    }
                }

                return elementMatcher( matchers );
            }

            function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function( seed, context, xml, results, outermost ) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                        // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
                        // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if ( outermost ) {
                            outermostContext = context !== document && context;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
                            if ( byElement && elem ) {
                                j = 0;
                                while ( (matcher = elementMatchers[j++]) ) {
                                    if ( matcher( elem, context, xml ) ) {
                                        results.push( elem );
                                        break;
                                    }
                                }
                                if ( outermost ) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if ( bySet ) {
                                // They will have gone through all possible matchers
                                if ( (elem = !matcher && elem) ) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if ( seed ) {
                                    unmatched.push( elem );
                                }
                            }
                        }

                        // Apply set filters to unmatched elements
                        matchedCount += i;
                        if ( bySet && i !== matchedCount ) {
                            j = 0;
                            while ( (matcher = setMatchers[j++]) ) {
                                matcher( unmatched, setMatched, context, xml );
                            }

                            if ( seed ) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if ( matchedCount > 0 ) {
                                    while ( i-- ) {
                                        if ( !(unmatched[i] || setMatched[i]) ) {
                                            setMatched[i] = pop.call( results );
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense( setMatched );
                            }

                            // Add matches to results
                            push.apply( results, setMatched );

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if ( outermost && !seed && setMatched.length > 0 &&
                                ( matchedCount + setMatchers.length ) > 1 ) {

                                Sizzle.uniqueSort( results );
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if ( outermost ) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction( superMatcher ) :
                    superMatcher;
            }

            compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[ selector + " " ];

                if ( !cached ) {
                    // Generate a function of recursive functions that can be used to check each element
                    if ( !group ) {
                        group = tokenize( selector );
                    }
                    i = group.length;
                    while ( i-- ) {
                        cached = matcherFromTokens( group[i] );
                        if ( cached[ expando ] ) {
                            setMatchers.push( cached );
                        } else {
                            elementMatchers.push( cached );
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
                }
                return cached;
            };

            function multipleContexts( selector, contexts, results ) {
                var i = 0,
                    len = contexts.length;
                for ( ; i < len; i++ ) {
                    Sizzle( selector, contexts[i], results );
                }
                return results;
            }

            function select( selector, context, results, seed ) {
                var i, tokens, token, type, find,
                    match = tokenize( selector );

                if ( !seed ) {
                    // Try to minimize operations if there is only one group
                    if ( match.length === 1 ) {

                        // Take a shortcut and set the context if the root selector is an ID
                        tokens = match[0] = match[0].slice( 0 );
                        if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                            support.getById && context.nodeType === 9 && documentIsHTML &&
                            Expr.relative[ tokens[1].type ] ) {

                            context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
                            if ( !context ) {
                                return results;
                            }
                            selector = selector.slice( tokens.shift().value.length );
                        }

                        // Fetch a seed set for right-to-left matching
                        i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
                        while ( i-- ) {
                            token = tokens[i];

                            // Abort if we hit a combinator
                            if ( Expr.relative[ (type = token.type) ] ) {
                                break;
                            }
                            if ( (find = Expr.find[ type ]) ) {
                                // Search, expanding context for leading sibling combinators
                                if ( (seed = find(
                                    token.matches[0].replace( runescape, funescape ),
                                    rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
                                )) ) {

                                    // If seed is empty or no tokens remain, we can return early
                                    tokens.splice( i, 1 );
                                    selector = seed.length && toSelector( tokens );
                                    if ( !selector ) {
                                        push.apply( results, seed );
                                        return results;
                                    }

                                    break;
                                }
                            }
                        }
                    }
                }

                // Compile and execute a filtering function
                // Provide `match` to avoid retokenization if we modified the selector above
                compile( selector, match )(
                    seed,
                    context,
                    !documentIsHTML,
                    results,
                    rsibling.test( selector ) && testContext( context.parentNode ) || context
                );
                return results;
            }

// One-time assignments

// Sort stability
            support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
            setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function( div1 ) {
                // Should return 1, but returns 4 (following)
                return div1.compareDocumentPosition( document.createElement("div") ) & 1;
            });

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if ( !assert(function( div ) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild.getAttribute("href") === "#" ;
            }) ) {
                addHandle( "type|href|height|width", function( elem, name, isXML ) {
                    if ( !isXML ) {
                        return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
                    }
                });
            }

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
            if ( !support.attributes || !assert(function( div ) {
                div.innerHTML = "<input/>";
                div.firstChild.setAttribute( "value", "" );
                return div.firstChild.getAttribute( "value" ) === "";
            }) ) {
                addHandle( "value", function( elem, name, isXML ) {
                    if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
                        return elem.defaultValue;
                    }
                });
            }

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
            if ( !assert(function( div ) {
                return div.getAttribute("disabled") == null;
            }) ) {
                addHandle( booleans, function( elem, name, isXML ) {
                    var val;
                    if ( !isXML ) {
                        return elem[ name ] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode( name )) && val.specified ?
                                val.value :
                                null;
                    }
                });
            }

            return Sizzle;

        })( window );



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;



    var rneedsContext = jQuery.expr.match.needsContext;

    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



    var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
    function winnow( elements, qualifier, not ) {
        if ( jQuery.isFunction( qualifier ) ) {
            return jQuery.grep( elements, function( elem, i ) {
                /* jshint -W018 */
                return !!qualifier.call( elem, i, elem ) !== not;
            });

        }

        if ( qualifier.nodeType ) {
            return jQuery.grep( elements, function( elem ) {
                return ( elem === qualifier ) !== not;
            });

        }

        if ( typeof qualifier === "string" ) {
            if ( risSimple.test( qualifier ) ) {
                return jQuery.filter( qualifier, elements, not );
            }

            qualifier = jQuery.filter( qualifier, elements );
        }

        return jQuery.grep( elements, function( elem ) {
            return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
        });
    }

    jQuery.filter = function( expr, elems, not ) {
        var elem = elems[ 0 ];

        if ( not ) {
            expr = ":not(" + expr + ")";
        }

        return elems.length === 1 && elem.nodeType === 1 ?
            jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
            jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
                return elem.nodeType === 1;
            }));
    };

    jQuery.fn.extend({
        find: function( selector ) {
            var i,
                ret = [],
                self = this,
                len = self.length;

            if ( typeof selector !== "string" ) {
                return this.pushStack( jQuery( selector ).filter(function() {
                    for ( i = 0; i < len; i++ ) {
                        if ( jQuery.contains( self[ i ], this ) ) {
                            return true;
                        }
                    }
                }) );
            }

            for ( i = 0; i < len; i++ ) {
                jQuery.find( selector, self[ i ], ret );
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function( selector ) {
            return this.pushStack( winnow(this, selector || [], false) );
        },
        not: function( selector ) {
            return this.pushStack( winnow(this, selector || [], true) );
        },
        is: function( selector ) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test( selector ) ?
                    jQuery( selector ) :
                    selector || [],
                false
            ).length;
        }
    });


// Initialize a jQuery object


// A central reference to the root jQuery(document)
    var rootjQuery,

    // Use the correct document accordingly with window argument (sandbox)
        document = window.document,

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        init = jQuery.fn.init = function( selector, context ) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if ( !selector ) {
                return this;
            }

            // Handle HTML strings
            if ( typeof selector === "string" ) {
                if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [ null, selector, null ];

                } else {
                    match = rquickExpr.exec( selector );
                }

                // Match html or make sure no context is specified for #id
                if ( match && (match[1] || !context) ) {

                    // HANDLE: $(html) -> $(array)
                    if ( match[1] ) {
                        context = context instanceof jQuery ? context[0] : context;

                        // scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge( this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ) );

                        // HANDLE: $(html, props)
                        if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                            for ( match in context ) {
                                // Properties of context are called as methods if possible
                                if ( jQuery.isFunction( this[ match ] ) ) {
                                    this[ match ]( context[ match ] );

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr( match, context[ match ] );
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById( match[2] );

                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        if ( elem && elem.parentNode ) {
                            // Handle the case where IE and Opera return items
                            // by name instead of ID
                            if ( elem.id !== match[2] ) {
                                return rootjQuery.find( selector );
                            }

                            // Otherwise, we inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem;
                        }

                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if ( !context || context.jquery ) {
                    return ( context || rootjQuery ).find( selector );

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor( context ).find( selector );
                }

                // HANDLE: $(DOMElement)
            } else if ( selector.nodeType ) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if ( jQuery.isFunction( selector ) ) {
                return typeof rootjQuery.ready !== "undefined" ?
                    rootjQuery.ready( selector ) :
                    // Execute immediately if ready is not present
                    selector( jQuery );
            }

            if ( selector.selector !== undefined ) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray( selector, this );
        };

// Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

// Initialize central reference
    rootjQuery = jQuery( document );


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    // methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.extend({
        dir: function( elem, dir, until ) {
            var matched = [],
                cur = elem[ dir ];

            while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
                if ( cur.nodeType === 1 ) {
                    matched.push( cur );
                }
                cur = cur[dir];
            }
            return matched;
        },

        sibling: function( n, elem ) {
            var r = [];

            for ( ; n; n = n.nextSibling ) {
                if ( n.nodeType === 1 && n !== elem ) {
                    r.push( n );
                }
            }

            return r;
        }
    });

    jQuery.fn.extend({
        has: function( target ) {
            var i,
                targets = jQuery( target, this ),
                len = targets.length;

            return this.filter(function() {
                for ( i = 0; i < len; i++ ) {
                    if ( jQuery.contains( this, targets[i] ) ) {
                        return true;
                    }
                }
            });
        },

        closest: function( selectors, context ) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
                    jQuery( selectors, context || this.context ) :
                    0;

            for ( ; i < l; i++ ) {
                for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
                    // Always skip document fragments
                    if ( cur.nodeType < 11 && (pos ?
                        pos.index(cur) > -1 :

                        // Don't pass non-elements to Sizzle
                        cur.nodeType === 1 &&
                            jQuery.find.matchesSelector(cur, selectors)) ) {

                        matched.push( cur );
                        break;
                    }
                }
            }

            return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
        },

        // Determine the position of an element within
        // the matched set of elements
        index: function( elem ) {

            // No argument, return index in parent
            if ( !elem ) {
                return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
            }

            // index in selector
            if ( typeof elem === "string" ) {
                return jQuery.inArray( this[0], jQuery( elem ) );
            }

            // Locate the position of the desired element
            return jQuery.inArray(
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem, this );
        },

        add: function( selector, context ) {
            return this.pushStack(
                jQuery.unique(
                    jQuery.merge( this.get(), jQuery( selector, context ) )
                )
            );
        },

        addBack: function( selector ) {
            return this.add( selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling( cur, dir ) {
        do {
            cur = cur[ dir ];
        } while ( cur && cur.nodeType !== 1 );

        return cur;
    }

    jQuery.each({
        parent: function( elem ) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) {
            return jQuery.dir( elem, "parentNode" );
        },
        parentsUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "parentNode", until );
        },
        next: function( elem ) {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) {
            return jQuery.dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) {
            return jQuery.dir( elem, "previousSibling" );
        },
        nextUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "nextSibling", until );
        },
        prevUntil: function( elem, i, until ) {
            return jQuery.dir( elem, "previousSibling", until );
        },
        siblings: function( elem ) {
            return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
        },
        children: function( elem ) {
            return jQuery.sibling( elem.firstChild );
        },
        contents: function( elem ) {
            return jQuery.nodeName( elem, "iframe" ) ?
                elem.contentDocument || elem.contentWindow.document :
                jQuery.merge( [], elem.childNodes );
        }
    }, function( name, fn ) {
        jQuery.fn[ name ] = function( until, selector ) {
            var ret = jQuery.map( this, fn, until );

            if ( name.slice( -5 ) !== "Until" ) {
                selector = until;
            }

            if ( selector && typeof selector === "string" ) {
                ret = jQuery.filter( selector, ret );
            }

            if ( this.length > 1 ) {
                // Remove duplicates
                if ( !guaranteedUnique[ name ] ) {
                    ret = jQuery.unique( ret );
                }

                // Reverse order for parents* and prev-derivatives
                if ( rparentsprev.test( name ) ) {
                    ret = ret.reverse();
                }
            }

            return this.pushStack( ret );
        };
    });
    var rnotwhite = (/\S+/g);



// String to Object options format cache
    var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions( options ) {
        var object = optionsCache[ options ] = {};
        jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
            object[ flag ] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function( options ) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            ( optionsCache[ options ] || createOptions( options ) ) :
            jQuery.extend( {}, options );

        var // Flag to know if list is currently firing
            firing,
        // Last fire value (for non-forgettable lists)
            memory,
        // Flag to know if list was already fired
            fired,
        // End of the loop when firing
            firingLength,
        // Index of currently firing callback (modified by remove if needed)
            firingIndex,
        // First callback to fire (used internally by add and fireWith)
            firingStart,
        // Actual callback list
            list = [],
        // Stack of fire calls for repeatable lists
            stack = !options.once && [],
        // Fire callbacks
            fire = function( data ) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                    if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
                        memory = false; // To prevent further calls using add
                        break;
                    }
                }
                firing = false;
                if ( list ) {
                    if ( stack ) {
                        if ( stack.length ) {
                            fire( stack.shift() );
                        }
                    } else if ( memory ) {
                        list = [];
                    } else {
                        self.disable();
                    }
                }
            },
        // Actual Callbacks object
            self = {
                // Add a callback or a collection of callbacks to the list
                add: function() {
                    if ( list ) {
                        // First, we save the current length
                        var start = list.length;
                        (function add( args ) {
                            jQuery.each( args, function( _, arg ) {
                                var type = jQuery.type( arg );
                                if ( type === "function" ) {
                                    if ( !options.unique || !self.has( arg ) ) {
                                        list.push( arg );
                                    }
                                } else if ( arg && arg.length && type !== "string" ) {
                                    // Inspect recursively
                                    add( arg );
                                }
                            });
                        })( arguments );
                        // Do we need to add the callbacks to the
                        // current firing batch?
                        if ( firing ) {
                            firingLength = list.length;
                            // With memory, if we're not firing then
                            // we should call right away
                        } else if ( memory ) {
                            firingStart = start;
                            fire( memory );
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function() {
                    if ( list ) {
                        jQuery.each( arguments, function( _, arg ) {
                            var index;
                            while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                                list.splice( index, 1 );
                                // Handle firing indexes
                                if ( firing ) {
                                    if ( index <= firingLength ) {
                                        firingLength--;
                                    }
                                    if ( index <= firingIndex ) {
                                        firingIndex--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function( fn ) {
                    return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
                },
                // Remove all callbacks from the list
                empty: function() {
                    list = [];
                    firingLength = 0;
                    return this;
                },
                // Have the list do nothing anymore
                disable: function() {
                    list = stack = memory = undefined;
                    return this;
                },
                // Is it disabled?
                disabled: function() {
                    return !list;
                },
                // Lock the list in its current state
                lock: function() {
                    stack = undefined;
                    if ( !memory ) {
                        self.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked: function() {
                    return !stack;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function( context, args ) {
                    if ( list && ( !fired || stack ) ) {
                        args = args || [];
                        args = [ context, args.slice ? args.slice() : args ];
                        if ( firing ) {
                            stack.push( args );
                        } else {
                            fire( args );
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function() {
                    self.fireWith( this, arguments );
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function() {
                    return !!fired;
                }
            };

        return self;
    };


    jQuery.extend({

        Deferred: function( func ) {
            var tuples = [
                    // action, add listener, listener list, final state
                    [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
                    [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
                    [ "notify", "progress", jQuery.Callbacks("memory") ]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done( arguments ).fail( arguments );
                        return this;
                    },
                    then: function( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;
                        return jQuery.Deferred(function( newDefer ) {
                            jQuery.each( tuples, function( i, tuple ) {
                                var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred[ tuple[1] ](function() {
                                    var returned = fn && fn.apply( this, arguments );
                                    if ( returned && jQuery.isFunction( returned.promise ) ) {
                                        returned.promise()
                                            .done( newDefer.resolve )
                                            .fail( newDefer.reject )
                                            .progress( newDefer.notify );
                                    } else {
                                        newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function( obj ) {
                        return obj != null ? jQuery.extend( obj, promise ) : promise;
                    }
                },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each( tuples, function( i, tuple ) {
                var list = tuple[ 2 ],
                    stateString = tuple[ 3 ];

                // promise[ done | fail | progress ] = list.add
                promise[ tuple[1] ] = list.add;

                // Handle state
                if ( stateString ) {
                    list.add(function() {
                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
                }

                // deferred[ resolve | reject | notify ]
                deferred[ tuple[0] ] = function() {
                    deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
                    return this;
                };
                deferred[ tuple[0] + "With" ] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise( deferred );

            // Call given func if any
            if ( func ) {
                func.call( deferred, deferred );
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function( subordinate /* , ..., subordinateN */ ) {
            var i = 0,
                resolveValues = slice.call( arguments ),
                length = resolveValues.length,

            // the count of uncompleted subordinates
                remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

            // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

            // Update function for both resolve and progress values
                updateFunc = function( i, contexts, values ) {
                    return function( value ) {
                        contexts[ i ] = this;
                        values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
                        if ( values === progressValues ) {
                            deferred.notifyWith( contexts, values );

                        } else if ( !(--remaining) ) {
                            deferred.resolveWith( contexts, values );
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if ( length > 1 ) {
                progressValues = new Array( length );
                progressContexts = new Array( length );
                resolveContexts = new Array( length );
                for ( ; i < length; i++ ) {
                    if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
                        resolveValues[ i ].promise()
                            .done( updateFunc( i, resolveContexts, resolveValues ) )
                            .fail( deferred.reject )
                            .progress( updateFunc( i, progressContexts, progressValues ) );
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if ( !remaining ) {
                deferred.resolveWith( resolveContexts, resolveValues );
            }

            return deferred.promise();
        }
    });


// The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function( fn ) {
        // Add the callback
        jQuery.ready.promise().done( fn );

        return this;
    };

    jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function( hold ) {
            if ( hold ) {
                jQuery.readyWait++;
            } else {
                jQuery.ready( true );
            }
        },

        // Handle when the DOM is ready
        ready: function( wait ) {

            // Abort if there are pending holds or we're already ready
            if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( !document.body ) {
                return setTimeout( jQuery.ready );
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if ( wait !== true && --jQuery.readyWait > 0 ) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith( document, [ jQuery ] );

            // Trigger any bound ready events
            if ( jQuery.fn.trigger ) {
                jQuery( document ).trigger("ready").off("ready");
            }
        }
    });

    /**
     * Clean-up method for dom ready events
     */
    function detach() {
        if ( document.addEventListener ) {
            document.removeEventListener( "DOMContentLoaded", completed, false );
            window.removeEventListener( "load", completed, false );

        } else {
            document.detachEvent( "onreadystatechange", completed );
            window.detachEvent( "onload", completed );
        }
    }

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
            detach();
            jQuery.ready();
        }
    }

    jQuery.ready.promise = function( obj ) {
        if ( !readyList ) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called after the browser event has already occurred.
            // we once tried to use readyState "interactive" here, but it caused issues like the one
            // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
            if ( document.readyState === "complete" ) {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout( jQuery.ready );

                // Standards-based browsers support DOMContentLoaded
            } else if ( document.addEventListener ) {
                // Use the handy event callback
                document.addEventListener( "DOMContentLoaded", completed, false );

                // A fallback to window.onload, that will always work
                window.addEventListener( "load", completed, false );

                // If IE event model is used
            } else {
                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent( "onreadystatechange", completed );

                // A fallback to window.onload, that will always work
                window.attachEvent( "onload", completed );

                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch(e) {}

                if ( top && top.doScroll ) {
                    (function doScrollCheck() {
                        if ( !jQuery.isReady ) {

                            try {
                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch(e) {
                                return setTimeout( doScrollCheck, 50 );
                            }

                            // detach all dom ready events
                            detach();

                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise( obj );
    };


    var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
    var i;
    for ( i in jQuery( support ) ) {
        break;
    }
    support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
    support.inlineBlockNeedsLayout = false;

    jQuery(function() {
        // We need to execute this one support test ASAP because we need to know
        // if body.style.zoom needs to be set.

        var container, div,
            body = document.getElementsByTagName("body")[0];

        if ( !body ) {
            // Return for frameset docs that don't have a body
            return;
        }

        // Setup
        container = document.createElement( "div" );
        container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

        div = document.createElement( "div" );
        body.appendChild( container ).appendChild( div );

        if ( typeof div.style.zoom !== strundefined ) {
            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

            if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }

        body.removeChild( container );

        // Null elements to avoid leaks in IE
        container = div = null;
    });




    (function() {
        var div = document.createElement( "div" );

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch( e ) {
                support.deleteExpando = false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    /**
     * Determines whether an object can have data
     */
    jQuery.acceptData = function( elem ) {
        var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
            nodeType = +elem.nodeType || 1;

        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
        return nodeType !== 1 && nodeType !== 9 ?
            false :

            // Nodes accept data unless otherwise specified; rejection can be conditional
            !noData || noData !== true && elem.getAttribute("classid") === noData;
    };


    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr( elem, key, data ) {
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if ( data === undefined && elem.nodeType === 1 ) {

            var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

            data = elem.getAttribute( name );

            if ( typeof data === "string" ) {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                            data === "null" ? null :
                                // Only convert to a number if it doesn't change the string
                                +data + "" === data ? +data :
                                    rbrace.test( data ) ? jQuery.parseJSON( data ) :
                                        data;
                } catch( e ) {}

                // Make sure we set the data so it isn't changed later
                jQuery.data( elem, key, data );

            } else {
                data = undefined;
            }
        }

        return data;
    }

// checks a cache object for emptiness
    function isEmptyDataObject( obj ) {
        var name;
        for ( name in obj ) {

            // if the public data object is empty, the private is still empty
            if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
                continue;
            }
            if ( name !== "toJSON" ) {
                return false;
            }
        }

        return true;
    }

    function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
        if ( !jQuery.acceptData( elem ) ) {
            return;
        }

        var ret, thisCache,
            internalKey = jQuery.expando,

        // We have to handle DOM nodes and JS objects differently because IE6-7
        // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

        // Only DOM nodes need the global jQuery cache; JS object data is
        // attached directly to the object so GC can occur automatically
            cache = isNode ? jQuery.cache : elem,

        // Only defining an ID for JS objects if its cache already exists allows
        // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
            return;
        }

        if ( !id ) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if ( isNode ) {
                id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }

        if ( !cache[ id ] ) {
            // Avoid exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
        }

        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if ( typeof name === "object" || typeof name === "function" ) {
            if ( pvt ) {
                cache[ id ] = jQuery.extend( cache[ id ], name );
            } else {
                cache[ id ].data = jQuery.extend( cache[ id ].data, name );
            }
        }

        thisCache = cache[ id ];

        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if ( !pvt ) {
            if ( !thisCache.data ) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if ( data !== undefined ) {
            thisCache[ jQuery.camelCase( name ) ] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if ( typeof name === "string" ) {

            // First Try to find as-is property data
            ret = thisCache[ name ];

            // Test for null|undefined property data
            if ( ret == null ) {

                // Try to find the camelCased property
                ret = thisCache[ jQuery.camelCase( name ) ];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    }

    function internalRemoveData( elem, name, pvt ) {
        if ( !jQuery.acceptData( elem ) ) {
            return;
        }

        var thisCache, i,
            isNode = elem.nodeType,

        // See jQuery.data for more information
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if ( !cache[ id ] ) {
            return;
        }

        if ( name ) {

            thisCache = pvt ? cache[ id ] : cache[ id ].data;

            if ( thisCache ) {

                // Support array or space separated string names for data keys
                if ( !jQuery.isArray( name ) ) {

                    // try the string as a key before any manipulation
                    if ( name in thisCache ) {
                        name = [ name ];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase( name );
                        if ( name in thisCache ) {
                            name = [ name ];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = name.concat( jQuery.map( name, jQuery.camelCase ) );
                }

                i = name.length;
                while ( i-- ) {
                    delete thisCache[ name[i] ];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
                    return;
                }
            }
        }

        // See jQuery.data for more information
        if ( !pvt ) {
            delete cache[ id ].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if ( !isEmptyDataObject( cache[ id ] ) ) {
                return;
            }
        }

        // Destroy the cache
        if ( isNode ) {
            jQuery.cleanData( [ elem ], true );

            // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
            /* jshint eqeqeq: false */
        } else if ( support.deleteExpando || cache != cache.window ) {
            /* jshint eqeqeq: true */
            delete cache[ id ];

            // When all else fails, null
        } else {
            cache[ id ] = null;
        }
    }

    jQuery.extend({
        cache: {},

        // The following elements (space-suffixed to avoid Object.prototype collisions)
        // throw uncatchable exceptions if you attempt to set expando properties
        noData: {
            "applet ": true,
            "embed ": true,
            // ...but Flash objects (which have this classid) *can* handle expandos
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },

        hasData: function( elem ) {
            elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
            return !!elem && !isEmptyDataObject( elem );
        },

        data: function( elem, name, data ) {
            return internalData( elem, name, data );
        },

        removeData: function( elem, name ) {
            return internalRemoveData( elem, name );
        },

        // For internal use only.
        _data: function( elem, name, data ) {
            return internalData( elem, name, data, true );
        },

        _removeData: function( elem, name ) {
            return internalRemoveData( elem, name, true );
        }
    });

    jQuery.fn.extend({
        data: function( key, value ) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves

            // Gets all values
            if ( key === undefined ) {
                if ( this.length ) {
                    data = jQuery.data( elem );

                    if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
                        i = attrs.length;
                        while ( i-- ) {
                            name = attrs[i].name;

                            if ( name.indexOf("data-") === 0 ) {
                                name = jQuery.camelCase( name.slice(5) );

                                dataAttr( elem, name, data[ name ] );
                            }
                        }
                        jQuery._data( elem, "parsedAttrs", true );
                    }
                }

                return data;
            }

            // Sets multiple values
            if ( typeof key === "object" ) {
                return this.each(function() {
                    jQuery.data( this, key );
                });
            }

            return arguments.length > 1 ?

                // Sets one value
                this.each(function() {
                    jQuery.data( this, key, value );
                }) :

                // Gets one value
                // Try to fetch any internally stored data first
                elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
        },

        removeData: function( key ) {
            return this.each(function() {
                jQuery.removeData( this, key );
            });
        }
    });


    jQuery.extend({
        queue: function( elem, type, data ) {
            var queue;

            if ( elem ) {
                type = ( type || "fx" ) + "queue";
                queue = jQuery._data( elem, type );

                // Speed up dequeue by getting out quickly if this is just a lookup
                if ( data ) {
                    if ( !queue || jQuery.isArray(data) ) {
                        queue = jQuery._data( elem, type, jQuery.makeArray(data) );
                    } else {
                        queue.push( data );
                    }
                }
                return queue || [];
            }
        },

        dequeue: function( elem, type ) {
            type = type || "fx";

            var queue = jQuery.queue( elem, type ),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks( elem, type ),
                next = function() {
                    jQuery.dequeue( elem, type );
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if ( fn === "inprogress" ) {
                fn = queue.shift();
                startLength--;
            }

            if ( fn ) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if ( type === "fx" ) {
                    queue.unshift( "inprogress" );
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call( elem, next, hooks );
            }

            if ( !startLength && hooks ) {
                hooks.empty.fire();
            }
        },

        // not intended for public consumption - generates a queueHooks object, or returns the current one
        _queueHooks: function( elem, type ) {
            var key = type + "queueHooks";
            return jQuery._data( elem, key ) || jQuery._data( elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData( elem, type + "queue" );
                    jQuery._removeData( elem, key );
                })
            });
        }
    });

    jQuery.fn.extend({
        queue: function( type, data ) {
            var setter = 2;

            if ( typeof type !== "string" ) {
                data = type;
                type = "fx";
                setter--;
            }

            if ( arguments.length < setter ) {
                return jQuery.queue( this[0], type );
            }

            return data === undefined ?
                this :
                this.each(function() {
                    var queue = jQuery.queue( this, type, data );

                    // ensure a hooks for this queue
                    jQuery._queueHooks( this, type );

                    if ( type === "fx" && queue[0] !== "inprogress" ) {
                        jQuery.dequeue( this, type );
                    }
                });
        },
        dequeue: function( type ) {
            return this.each(function() {
                jQuery.dequeue( this, type );
            });
        },
        clearQueue: function( type ) {
            return this.queue( type || "fx", [] );
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function( type, obj ) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if ( !( --count ) ) {
                        defer.resolveWith( elements, [ elements ] );
                    }
                };

            if ( typeof type !== "string" ) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while ( i-- ) {
                tmp = jQuery._data( elements[ i ], type + "queueHooks" );
                if ( tmp && tmp.empty ) {
                    count++;
                    tmp.empty.add( resolve );
                }
            }
            resolve();
            return defer.promise( obj );
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

    var isHidden = function( elem, el ) {
        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
    };



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
    var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
        var i = 0,
            length = elems.length,
            bulk = key == null;

        // Sets many values
        if ( jQuery.type( key ) === "object" ) {
            chainable = true;
            for ( i in key ) {
                jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
            }

            // Sets one value
        } else if ( value !== undefined ) {
            chainable = true;

            if ( !jQuery.isFunction( value ) ) {
                raw = true;
            }

            if ( bulk ) {
                // Bulk operations run against the entire set
                if ( raw ) {
                    fn.call( elems, value );
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function( elem, key, value ) {
                        return bulk.call( jQuery( elem ), value );
                    };
                }
            }

            if ( fn ) {
                for ( ; i < length; i++ ) {
                    fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
                }
            }
        }

        return chainable ?
            elems :

            // Gets
            bulk ?
                fn.call( elems ) :
                length ? fn( elems[0], key ) : emptyGet;
    };
    var rcheckableType = (/^(?:checkbox|radio)$/i);



    (function() {
        var fragment = document.createDocumentFragment(),
            div = document.createElement("div"),
            input = document.createElement("input");

        // Setup
        div.setAttribute( "className", "t" );
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

        // IE strips leading whitespace when .innerHTML is used
        support.leadingWhitespace = div.firstChild.nodeType === 3;

        // Make sure that tbody elements aren't automatically inserted
        // IE will insert them into empty tables
        support.tbody = !div.getElementsByTagName( "tbody" ).length;

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

        // Makes sure cloning an html5 element does not cause problems
        // Where outerHTML is undefined, this still works
        support.html5Clone =
            document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

        // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        input.type = "checkbox";
        input.checked = true;
        fragment.appendChild( input );
        support.appendChecked = input.checked;

        // Make sure textarea (and checkbox) defaultValue is properly cloned
        // Support: IE6-IE11+
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

        // #11217 - WebKit loses check when the name is after the checked attribute
        fragment.appendChild( div );
        div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

        // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
        // old WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

        // Support: IE<9
        // Opera does not clone events (and typeof div.attachEvent === undefined).
        // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
        support.noCloneEvent = true;
        if ( div.attachEvent ) {
            div.attachEvent( "onclick", function() {
                support.noCloneEvent = false;
            });

            div.cloneNode( true ).click();
        }

        // Execute the test only if not already executed in another module.
        if (support.deleteExpando == null) {
            // Support: IE<9
            support.deleteExpando = true;
            try {
                delete div.test;
            } catch( e ) {
                support.deleteExpando = false;
            }
        }

        // Null elements to avoid leaks in IE.
        fragment = div = input = null;
    })();


    (function() {
        var i, eventName,
            div = document.createElement( "div" );

        // Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
        for ( i in { submit: true, change: true, focusin: true }) {
            eventName = "on" + i;

            if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
                // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
                div.setAttribute( eventName, "t" );
                support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch ( err ) { }
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function( elem, types, handler, data, selector ) {
            var tmp, events, t, handleObjIn,
                special, eventHandle, handleObj,
                handlers, type, namespaces, origType,
                elemData = jQuery._data( elem );

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if ( !elemData ) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if ( handler.handler ) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if ( !handler.guid ) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if ( !(events = elemData.events) ) {
                events = elemData.events = {};
            }
            if ( !(eventHandle = elemData.handle) ) {
                eventHandle = elemData.handle = function( e ) {
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
                        jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
                        undefined;
                };
                // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
                eventHandle.elem = elem;
            }

            // Handle multiple events separated by a space
            types = ( types || "" ).match( rnotwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[t] ) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split( "." ).sort();

                // There *must* be a type, no attaching namespace-only handlers
                if ( !type ) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[ type ] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[ type ] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                    namespace: namespaces.join(".")
                }, handleObjIn );

                // Init the event handler queue if we're the first
                if ( !(handlers = events[ type ]) ) {
                    handlers = events[ type ] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
                        // Bind the global event handler to the element
                        if ( elem.addEventListener ) {
                            elem.addEventListener( type, eventHandle, false );

                        } else if ( elem.attachEvent ) {
                            elem.attachEvent( "on" + type, eventHandle );
                        }
                    }
                }

                if ( special.add ) {
                    special.add.call( elem, handleObj );

                    if ( !handleObj.handler.guid ) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if ( selector ) {
                    handlers.splice( handlers.delegateCount++, 0, handleObj );
                } else {
                    handlers.push( handleObj );
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[ type ] = true;
            }

            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },

        // Detach an event or set of events from an element
        remove: function( elem, types, handler, selector, mappedTypes ) {
            var j, handleObj, tmp,
                origCount, t, events,
                special, handlers, type,
                namespaces, origType,
                elemData = jQuery.hasData( elem ) && jQuery._data( elem );

            if ( !elemData || !(events = elemData.events) ) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = ( types || "" ).match( rnotwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[t] ) || [];
                type = origType = tmp[1];
                namespaces = ( tmp[2] || "" ).split( "." ).sort();

                // Unbind all events (on this namespace, if provided) for the element
                if ( !type ) {
                    for ( type in events ) {
                        jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                    }
                    continue;
                }

                special = jQuery.event.special[ type ] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                handlers = events[ type ] || [];
                tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

                // Remove matching events
                origCount = j = handlers.length;
                while ( j-- ) {
                    handleObj = handlers[ j ];

                    if ( ( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !tmp || tmp.test( handleObj.namespace ) ) &&
                        ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
                        handlers.splice( j, 1 );

                        if ( handleObj.selector ) {
                            handlers.delegateCount--;
                        }
                        if ( special.remove ) {
                            special.remove.call( elem, handleObj );
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if ( origCount && !handlers.length ) {
                    if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
                        jQuery.removeEvent( elem, type, elemData.handle );
                    }

                    delete events[ type ];
                }
            }

            // Remove the expando if it's no longer used
            if ( jQuery.isEmptyObject( events ) ) {
                delete elemData.handle;

                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery._removeData( elem, "events" );
            }
        },

        trigger: function( event, data, elem, onlyHandlers ) {
            var handle, ontype, cur,
                bubbleType, special, tmp, i,
                eventPath = [ elem || document ],
                type = hasOwn.call( event, "type" ) ? event.type : event,
                namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
                return;
            }

            if ( type.indexOf(".") >= 0 ) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[ jQuery.expando ] ?
                event :
                new jQuery.Event( type, typeof event === "object" && event );

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ?
                new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if ( !event.target ) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [ event ] :
                jQuery.makeArray( data, [ event ] );

            // Allow special events to draw outside the lines
            special = jQuery.event.special[ type ] || {};
            if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

                bubbleType = special.delegateType || type;
                if ( !rfocusMorph.test( bubbleType + type ) ) {
                    cur = cur.parentNode;
                }
                for ( ; cur; cur = cur.parentNode ) {
                    eventPath.push( cur );
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if ( tmp === (elem.ownerDocument || document) ) {
                    eventPath.push( tmp.defaultView || tmp.parentWindow || window );
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
                if ( handle ) {
                    handle.apply( cur, data );
                }

                // Native handler
                handle = ontype && cur[ ontype ];
                if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
                    event.result = handle.apply( cur, data );
                    if ( event.result === false ) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if ( !onlyHandlers && !event.isDefaultPrevented() ) {

                if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
                    jQuery.acceptData( elem ) ) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ ontype ];

                        if ( tmp ) {
                            elem[ ontype ] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        try {
                            elem[ type ]();
                        } catch ( e ) {
                            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                        }
                        jQuery.event.triggered = undefined;

                        if ( tmp ) {
                            elem[ ontype ] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch: function( event ) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix( event );

            var i, ret, handleObj, matched, j,
                handlerQueue = [],
                args = slice.call( arguments ),
                handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
                special = jQuery.event.special[ event.type ] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call( this, event, handlers );

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
                event.currentTarget = matched.elem;

                j = 0;
                while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

                    // Triggered event must either 1) have no namespace, or
                    // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
                    if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
                            .apply( matched.elem, args );

                        if ( ret !== undefined ) {
                            if ( (event.result = ret) === false ) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if ( special.postDispatch ) {
                special.postDispatch.call( this, event );
            }

            return event.result;
        },

        handlers: function( event, handlers ) {
            var sel, handleObj, matches, i,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            // Avoid non-left-click bubbling in Firefox (#3861)
            if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

                /* jshint eqeqeq: false */
                for ( ; cur != this; cur = cur.parentNode || this ) {
                    /* jshint eqeqeq: true */

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
                        matches = [];
                        for ( i = 0; i < delegateCount; i++ ) {
                            handleObj = handlers[ i ];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if ( matches[ sel ] === undefined ) {
                                matches[ sel ] = handleObj.needsContext ?
                                    jQuery( sel, this ).index( cur ) >= 0 :
                                    jQuery.find( sel, this, null, [ cur ] ).length;
                            }
                            if ( matches[ sel ] ) {
                                matches.push( handleObj );
                            }
                        }
                        if ( matches.length ) {
                            handlerQueue.push({ elem: cur, handlers: matches });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if ( delegateCount < handlers.length ) {
                handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
            }

            return handlerQueue;
        },

        fix: function( event ) {
            if ( event[ jQuery.expando ] ) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i, prop, copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[ type ];

            if ( !fixHook ) {
                this.fixHooks[ type ] = fixHook =
                    rmouseEvent.test( type ) ? this.mouseHooks :
                        rkeyEvent.test( type ) ? this.keyHooks :
                        {};
            }
            copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

            event = new jQuery.Event( originalEvent );

            i = copy.length;
            while ( i-- ) {
                prop = copy[ i ];
                event[ prop ] = originalEvent[ prop ];
            }

            // Support: IE<9
            // Fix target property (#1925)
            if ( !event.target ) {
                event.target = originalEvent.srcElement || document;
            }

            // Support: Chrome 23+, Safari?
            // Target should not be a text node (#504, #13143)
            if ( event.target.nodeType === 3 ) {
                event.target = event.target.parentNode;
            }

            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = !!event.metaKey;

            return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

        fixHooks: {},

        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function( event, original ) {

                // Add which for key events
                if ( event.which == null ) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function( event, original ) {
                var body, eventDoc, doc,
                    button = original.button,
                    fromElement = original.fromElement;

                // Calculate pageX/Y if missing and clientX/Y available
                if ( event.pageX == null && original.clientX != null ) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                    event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
                }

                // Add relatedTarget, if necessary
                if ( !event.relatedTarget && fromElement ) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if ( !event.which && button !== undefined ) {
                    event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
                }

                return event;
            }
        },

        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function() {
                    if ( this !== safeActiveElement() && this.focus ) {
                        try {
                            this.focus();
                            return false;
                        } catch ( e ) {
                            // Support: IE<9
                            // If we error on focus to hidden element (#1486, #12518),
                            // let .trigger() run the handlers
                        }
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if ( this === safeActiveElement() && this.blur ) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function() {
                    if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function( event ) {
                    return jQuery.nodeName( event.target, "a" );
                }
            },

            beforeunload: {
                postDispatch: function( event ) {

                    // Even when returnValue equals to undefined Firefox will still show alert
                    if ( event.result !== undefined ) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },

        simulate: function( type, elem, event, bubble ) {
            // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true,
                    originalEvent: {}
                }
            );
            if ( bubble ) {
                jQuery.event.trigger( e, null, elem );
            } else {
                jQuery.event.dispatch.call( elem, e );
            }
            if ( e.isDefaultPrevented() ) {
                event.preventDefault();
            }
        }
    };

    jQuery.removeEvent = document.removeEventListener ?
        function( elem, type, handle ) {
            if ( elem.removeEventListener ) {
                elem.removeEventListener( type, handle, false );
            }
        } :
        function( elem, type, handle ) {
            var name = "on" + type;

            if ( elem.detachEvent ) {

                // #8545, #7054, preventing memory leaks for custom events in IE6-8
                // detachEvent needed property on element, by name of that event, to properly expose it to GC
                if ( typeof elem[ name ] === strundefined ) {
                    elem[ name ] = null;
                }

                elem.detachEvent( name, handle );
            }
        };

    jQuery.Event = function( src, props ) {
        // Allow instantiation without the 'new' keyword
        if ( !(this instanceof jQuery.Event) ) {
            return new jQuery.Event( src, props );
        }

        // Event object
        if ( src && src.type ) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
                src.defaultPrevented === undefined && (
                    // Support: IE < 9
                    src.returnValue === false ||
                        // Support: Android < 4.0
                        src.getPreventDefault && src.getPreventDefault() ) ?
                returnTrue :
                returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if ( props ) {
            jQuery.extend( this, props );
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[ jQuery.expando ] = true;
    };

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,

        preventDefault: function() {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;
            if ( !e ) {
                return;
            }

            // If preventDefault exists, run it on the original event
            if ( e.preventDefault ) {
                e.preventDefault();

                // Support: IE
                // Otherwise set the returnValue property of the original event to false
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;
            if ( !e ) {
                return;
            }
            // If stopPropagation exists, run it on the original event
            if ( e.stopPropagation ) {
                e.stopPropagation();
            }

            // Support: IE
            // Set the cancelBubble property of the original event to true
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        }
    };

// Create mouseenter/leave events using mouseover/out and event-time checks
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function( orig, fix ) {
        jQuery.event.special[ orig ] = {
            delegateType: fix,
            bindType: fix,

            handle: function( event ) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mousenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply( this, arguments );
                    event.type = fix;
                }
                return ret;
            }
        };
    });

// IE submit delegation
    if ( !support.submitBubbles ) {

        jQuery.event.special.submit = {
            setup: function() {
                // Only need this for delegated form submit events
                if ( jQuery.nodeName( this, "form" ) ) {
                    return false;
                }

                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target,
                        form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
                    if ( form && !jQuery._data( form, "submitBubbles" ) ) {
                        jQuery.event.add( form, "submit._submit", function( event ) {
                            event._submit_bubble = true;
                        });
                        jQuery._data( form, "submitBubbles", true );
                    }
                });
                // return undefined since we don't need an event listener
            },

            postDispatch: function( event ) {
                // If form was submitted by the user, bubble the event up the tree
                if ( event._submit_bubble ) {
                    delete event._submit_bubble;
                    if ( this.parentNode && !event.isTrigger ) {
                        jQuery.event.simulate( "submit", this.parentNode, event, true );
                    }
                }
            },

            teardown: function() {
                // Only need this for delegated form submit events
                if ( jQuery.nodeName( this, "form" ) ) {
                    return false;
                }

                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove( this, "._submit" );
            }
        };
    }

// IE change delegation and checkbox/radio fix
    if ( !support.changeBubbles ) {

        jQuery.event.special.change = {

            setup: function() {

                if ( rformElems.test( this.nodeName ) ) {
                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if ( this.type === "checkbox" || this.type === "radio" ) {
                        jQuery.event.add( this, "propertychange._change", function( event ) {
                            if ( event.originalEvent.propertyName === "checked" ) {
                                this._just_changed = true;
                            }
                        });
                        jQuery.event.add( this, "click._change", function( event ) {
                            if ( this._just_changed && !event.isTrigger ) {
                                this._just_changed = false;
                            }
                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate( "change", this, event, true );
                        });
                    }
                    return false;
                }
                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add( this, "beforeactivate._change", function( e ) {
                    var elem = e.target;

                    if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
                        jQuery.event.add( elem, "change._change", function( event ) {
                            if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
                                jQuery.event.simulate( "change", this.parentNode, event, true );
                            }
                        });
                        jQuery._data( elem, "changeBubbles", true );
                    }
                });
            },

            handle: function( event ) {
                var elem = event.target;

                // Swallow native change events from checkbox/radio, we already triggered them above
                if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
                    return event.handleObj.handler.apply( this, arguments );
                }
            },

            teardown: function() {
                jQuery.event.remove( this, "._change" );

                return !rformElems.test( this.nodeName );
            }
        };
    }

// Create "bubbling" focus and blur events
    if ( !support.focusinBubbles ) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function( event ) {
                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
            };

            jQuery.event.special[ fix ] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data( doc, fix );

                    if ( !attaches ) {
                        doc.addEventListener( orig, handler, true );
                    }
                    jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data( doc, fix ) - 1;

                    if ( !attaches ) {
                        doc.removeEventListener( orig, handler, true );
                        jQuery._removeData( doc, fix );
                    } else {
                        jQuery._data( doc, fix, attaches );
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
            var type, origFn;

            // Types can be a map of types/handlers
            if ( typeof types === "object" ) {
                // ( types-Object, selector, data )
                if ( typeof selector !== "string" ) {
                    // ( types-Object, data )
                    data = data || selector;
                    selector = undefined;
                }
                for ( type in types ) {
                    this.on( type, selector, data, types[ type ], one );
                }
                return this;
            }

            if ( data == null && fn == null ) {
                // ( types, fn )
                fn = selector;
                data = selector = undefined;
            } else if ( fn == null ) {
                if ( typeof selector === "string" ) {
                    // ( types, selector, fn )
                    fn = data;
                    data = undefined;
                } else {
                    // ( types, data, fn )
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if ( fn === false ) {
                fn = returnFalse;
            } else if ( !fn ) {
                return this;
            }

            if ( one === 1 ) {
                origFn = fn;
                fn = function( event ) {
                    // Can use an empty set, since event contains the info
                    jQuery().off( event );
                    return origFn.apply( this, arguments );
                };
                // Use same guid so caller can remove using origFn
                fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
            }
            return this.each( function() {
                jQuery.event.add( this, types, fn, data, selector );
            });
        },
        one: function( types, selector, data, fn ) {
            return this.on( types, selector, data, fn, 1 );
        },
        off: function( types, selector, fn ) {
            var handleObj, type;
            if ( types && types.preventDefault && types.handleObj ) {
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery( types.delegateTarget ).off(
                    handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if ( typeof types === "object" ) {
                // ( types-object [, selector] )
                for ( type in types ) {
                    this.off( type, selector, types[ type ] );
                }
                return this;
            }
            if ( selector === false || typeof selector === "function" ) {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if ( fn === false ) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove( this, types, fn, selector );
            });
        },

        trigger: function( type, data ) {
            return this.each(function() {
                jQuery.event.trigger( type, data, this );
            });
        },
        triggerHandler: function( type, data ) {
            var elem = this[0];
            if ( elem ) {
                return jQuery.event.trigger( type, data, elem, true );
            }
        }
    });


    function createSafeFragment( document ) {
        var list = nodeNames.split( "|" ),
            safeFrag = document.createDocumentFragment();

        if ( safeFrag.createElement ) {
            while ( list.length ) {
                safeFrag.createElement(
                    list.pop()
                );
            }
        }
        return safeFrag;
    }

    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
            "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
    // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

    // We have to close these tags to support XHTML (#13200)
        wrapMap = {
            option: [ 1, "<select multiple='multiple'>", "</select>" ],
            legend: [ 1, "<fieldset>", "</fieldset>" ],
            area: [ 1, "<map>", "</map>" ],
            param: [ 1, "<object>", "</object>" ],
            thead: [ 1, "<table>", "</table>" ],
            tr: [ 2, "<table><tbody>", "</tbody></table>" ],
            col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
            td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

            // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
            // unless wrapped in a div with non-breaking characters in front of it.
            _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
        },
        safeFragment = createSafeFragment( document ),
        fragmentDiv = safeFragment.appendChild( document.createElement("div") );

    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    function getAll( context, tag ) {
        var elems, elem,
            i = 0,
            found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
                typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
                    undefined;

        if ( !found ) {
            for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
                if ( !tag || jQuery.nodeName( elem, tag ) ) {
                    found.push( elem );
                } else {
                    jQuery.merge( found, getAll( elem, tag ) );
                }
            }
        }

        return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
            jQuery.merge( [ context ], found ) :
            found;
    }

// Used in buildFragment, fixes the defaultChecked property
    function fixDefaultChecked( elem ) {
        if ( rcheckableType.test( elem.type ) ) {
            elem.defaultChecked = elem.checked;
        }
    }

// Support: IE<8
// Manipulating tables requires a tbody
    function manipulationTarget( elem, content ) {
        return jQuery.nodeName( elem, "table" ) &&
            jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

            elem.getElementsByTagName("tbody")[0] ||
                elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
            elem;
    }

// Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript( elem ) {
        elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
        return elem;
    }
    function restoreScript( elem ) {
        var match = rscriptTypeMasked.exec( elem.type );
        if ( match ) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }

// Mark scripts as having already been evaluated
    function setGlobalEval( elems, refElements ) {
        var elem,
            i = 0;
        for ( ; (elem = elems[i]) != null; i++ ) {
            jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
        }
    }

    function cloneCopyEvent( src, dest ) {

        if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
            return;
        }

        var type, i, l,
            oldData = jQuery._data( src ),
            curData = jQuery._data( dest, oldData ),
            events = oldData.events;

        if ( events ) {
            delete curData.handle;
            curData.events = {};

            for ( type in events ) {
                for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                    jQuery.event.add( dest, type, events[ type ][ i ] );
                }
            }
        }

        // make the cloned public data object a copy from the original
        if ( curData.data ) {
            curData.data = jQuery.extend( {}, curData.data );
        }
    }

    function fixCloneNodeIssues( src, dest ) {
        var nodeName, e, data;

        // We do not need to do anything for non-Elements
        if ( dest.nodeType !== 1 ) {
            return;
        }

        nodeName = dest.nodeName.toLowerCase();

        // IE6-8 copies events bound via attachEvent when using cloneNode.
        if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
            data = jQuery._data( dest );

            for ( e in data.events ) {
                jQuery.removeEvent( dest, e, data.handle );
            }

            // Event data gets referenced instead of copied if the expando gets copied too
            dest.removeAttribute( jQuery.expando );
        }

        // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
        if ( nodeName === "script" && dest.text !== src.text ) {
            disableScript( dest ).text = src.text;
            restoreScript( dest );

            // IE6-10 improperly clones children of object elements using classid.
            // IE10 throws NoModificationAllowedError if parent is null, #12132.
        } else if ( nodeName === "object" ) {
            if ( dest.parentNode ) {
                dest.outerHTML = src.outerHTML;
            }

            // This path appears unavoidable for IE9. When cloning an object
            // element in IE9, the outerHTML strategy above is not sufficient.
            // If the src has innerHTML and the destination does not,
            // copy the src.innerHTML into the dest.innerHTML. #10324
            if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
                dest.innerHTML = src.innerHTML;
            }

        } else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
            // IE6-8 fails to persist the checked state of a cloned checkbox
            // or radio button. Worse, IE6-7 fail to give the cloned element
            // a checked appearance if the defaultChecked value isn't also set

            dest.defaultChecked = dest.checked = src.checked;

            // IE6-7 get confused and end up setting the value of a cloned
            // checkbox/radio button to an empty string instead of "on"
            if ( dest.value !== src.value ) {
                dest.value = src.value;
            }

            // IE6-8 fails to return the selected option to the default selected
            // state when cloning options
        } else if ( nodeName === "option" ) {
            dest.defaultSelected = dest.selected = src.defaultSelected;

            // IE6-8 fails to set the defaultValue to the correct value when
            // cloning other types of input fields
        } else if ( nodeName === "input" || nodeName === "textarea" ) {
            dest.defaultValue = src.defaultValue;
        }
    }

    jQuery.extend({
        clone: function( elem, dataAndEvents, deepDataAndEvents ) {
            var destElements, node, clone, i, srcElements,
                inPage = jQuery.contains( elem.ownerDocument, elem );

            if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
                clone = elem.cloneNode( true );

                // IE<=8 does not properly clone detached, unknown element nodes
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
            }

            if ( (!support.noCloneEvent || !support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements = getAll( clone );
                srcElements = getAll( elem );

                // Fix all IE cloning issues
                for ( i = 0; (node = srcElements[i]) != null; ++i ) {
                    // Ensure that the destination node is not null; Fixes #9587
                    if ( destElements[i] ) {
                        fixCloneNodeIssues( node, destElements[i] );
                    }
                }
            }

            // Copy the events from the original to the clone
            if ( dataAndEvents ) {
                if ( deepDataAndEvents ) {
                    srcElements = srcElements || getAll( elem );
                    destElements = destElements || getAll( clone );

                    for ( i = 0; (node = srcElements[i]) != null; i++ ) {
                        cloneCopyEvent( node, destElements[i] );
                    }
                } else {
                    cloneCopyEvent( elem, clone );
                }
            }

            // Preserve script evaluation history
            destElements = getAll( clone, "script" );
            if ( destElements.length > 0 ) {
                setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
            }

            destElements = srcElements = node = null;

            // Return the cloned set
            return clone;
        },

        buildFragment: function( elems, context, scripts, selection ) {
            var j, elem, contains,
                tmp, tag, tbody, wrap,
                l = elems.length,

            // Ensure a safe fragment
                safe = createSafeFragment( context ),

                nodes = [],
                i = 0;

            for ( ; i < l; i++ ) {
                elem = elems[ i ];

                if ( elem || elem === 0 ) {

                    // Add nodes directly
                    if ( jQuery.type( elem ) === "object" ) {
                        jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

                        // Convert non-html into a text node
                    } else if ( !rhtml.test( elem ) ) {
                        nodes.push( context.createTextNode( elem ) );

                        // Convert html into DOM nodes
                    } else {
                        tmp = tmp || safe.appendChild( context.createElement("div") );

                        // Deserialize a standard representation
                        tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
                        wrap = wrapMap[ tag ] || wrapMap._default;

                        tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

                        // Descend through wrappers to the right content
                        j = wrap[0];
                        while ( j-- ) {
                            tmp = tmp.lastChild;
                        }

                        // Manually add leading whitespace removed by IE
                        if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
                            nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
                        }

                        // Remove IE's autoinserted <tbody> from table fragments
                        if ( !support.tbody ) {

                            // String was a <table>, *may* have spurious <tbody>
                            elem = tag === "table" && !rtbody.test( elem ) ?
                                tmp.firstChild :

                                // String was a bare <thead> or <tfoot>
                                wrap[1] === "<table>" && !rtbody.test( elem ) ?
                                    tmp :
                                    0;

                            j = elem && elem.childNodes.length;
                            while ( j-- ) {
                                if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
                                    elem.removeChild( tbody );
                                }
                            }
                        }

                        jQuery.merge( nodes, tmp.childNodes );

                        // Fix #12392 for WebKit and IE > 9
                        tmp.textContent = "";

                        // Fix #12392 for oldIE
                        while ( tmp.firstChild ) {
                            tmp.removeChild( tmp.firstChild );
                        }

                        // Remember the top-level container for proper cleanup
                        tmp = safe.lastChild;
                    }
                }
            }

            // Fix #11356: Clear elements from fragment
            if ( tmp ) {
                safe.removeChild( tmp );
            }

            // Reset defaultChecked for any radios and checkboxes
            // about to be appended to the DOM in IE 6/7 (#8060)
            if ( !support.appendChecked ) {
                jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
            }

            i = 0;
            while ( (elem = nodes[ i++ ]) ) {

                // #4087 - If origin and destination elements are the same, and this is
                // that element, do not do anything
                if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
                    continue;
                }

                contains = jQuery.contains( elem.ownerDocument, elem );

                // Append to fragment
                tmp = getAll( safe.appendChild( elem ), "script" );

                // Preserve script evaluation history
                if ( contains ) {
                    setGlobalEval( tmp );
                }

                // Capture executables
                if ( scripts ) {
                    j = 0;
                    while ( (elem = tmp[ j++ ]) ) {
                        if ( rscriptType.test( elem.type || "" ) ) {
                            scripts.push( elem );
                        }
                    }
                }
            }

            tmp = null;

            return safe;
        },

        cleanData: function( elems, /* internal */ acceptData ) {
            var elem, type, id, data,
                i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = support.deleteExpando,
                special = jQuery.event.special;

            for ( ; (elem = elems[i]) != null; i++ ) {
                if ( acceptData || jQuery.acceptData( elem ) ) {

                    id = elem[ internalKey ];
                    data = id && cache[ id ];

                    if ( data ) {
                        if ( data.events ) {
                            for ( type in data.events ) {
                                if ( special[ type ] ) {
                                    jQuery.event.remove( elem, type );

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent( elem, type, data.handle );
                                }
                            }
                        }

                        // Remove cache only if it was not already removed by jQuery.event.remove
                        if ( cache[ id ] ) {

                            delete cache[ id ];

                            // IE does not allow us to delete expando properties from nodes,
                            // nor does it have a removeAttribute function on Document nodes;
                            // we must handle all of these cases
                            if ( deleteExpando ) {
                                delete elem[ internalKey ];

                            } else if ( typeof elem.removeAttribute !== strundefined ) {
                                elem.removeAttribute( internalKey );

                            } else {
                                elem[ internalKey ] = null;
                            }

                            deletedIds.push( id );
                        }
                    }
                }
            }
        }
    });

    jQuery.fn.extend({
        text: function( value ) {
            return access( this, function( value ) {
                return value === undefined ?
                    jQuery.text( this ) :
                    this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
            }, null, value, arguments.length );
        },

        append: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.appendChild( elem );
                }
            });
        },

        prepend: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.insertBefore( elem, target.firstChild );
                }
            });
        },

        before: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this );
                }
            });
        },

        after: function() {
            return this.domManip( arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this.nextSibling );
                }
            });
        },

        remove: function( selector, keepData /* Internal Use Only */ ) {
            var elem,
                elems = selector ? jQuery.filter( selector, this ) : this,
                i = 0;

            for ( ; (elem = elems[i]) != null; i++ ) {

                if ( !keepData && elem.nodeType === 1 ) {
                    jQuery.cleanData( getAll( elem ) );
                }

                if ( elem.parentNode ) {
                    if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
                        setGlobalEval( getAll( elem, "script" ) );
                    }
                    elem.parentNode.removeChild( elem );
                }
            }

            return this;
        },

        empty: function() {
            var elem,
                i = 0;

            for ( ; (elem = this[i]) != null; i++ ) {
                // Remove element nodes and prevent memory leaks
                if ( elem.nodeType === 1 ) {
                    jQuery.cleanData( getAll( elem, false ) );
                }

                // Remove any remaining nodes
                while ( elem.firstChild ) {
                    elem.removeChild( elem.firstChild );
                }

                // If this is a select, ensure that it displays empty (#12336)
                // Support: IE<9
                if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
                    elem.options.length = 0;
                }
            }

            return this;
        },

        clone: function( dataAndEvents, deepDataAndEvents ) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function() {
                return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
            });
        },

        html: function( value ) {
            return access( this, function( value ) {
                var elem = this[ 0 ] || {},
                    i = 0,
                    l = this.length;

                if ( value === undefined ) {
                    return elem.nodeType === 1 ?
                        elem.innerHTML.replace( rinlinejQuery, "" ) :
                        undefined;
                }

                // See if we can take a shortcut and just use innerHTML
                if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                    ( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
                    ( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                    !wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

                    value = value.replace( rxhtmlTag, "<$1></$2>" );

                    try {
                        for (; i < l; i++ ) {
                            // Remove element nodes and prevent memory leaks
                            elem = this[i] || {};
                            if ( elem.nodeType === 1 ) {
                                jQuery.cleanData( getAll( elem, false ) );
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch(e) {}
                }

                if ( elem ) {
                    this.empty().append( value );
                }
            }, null, value, arguments.length );
        },

        replaceWith: function() {
            var arg = arguments[ 0 ];

            // Make the changes, replacing each context element with the new content
            this.domManip( arguments, function( elem ) {
                arg = this.parentNode;

                jQuery.cleanData( getAll( this ) );

                if ( arg ) {
                    arg.replaceChild( elem, this );
                }
            });

            // Force removal if there was no new content (e.g., from empty arguments)
            return arg && (arg.length || arg.nodeType) ? this : this.remove();
        },

        detach: function( selector ) {
            return this.remove( selector, true );
        },

        domManip: function( args, callback ) {

            // Flatten any nested arrays
            args = concat.apply( [], args );

            var first, node, hasScripts,
                scripts, doc, fragment,
                i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction( value );

            // We can't cloneNode fragments that contain checked, in WebKit
            if ( isFunction ||
                ( l > 1 && typeof value === "string" &&
                    !support.checkClone && rchecked.test( value ) ) ) {
                return this.each(function( index ) {
                    var self = set.eq( index );
                    if ( isFunction ) {
                        args[0] = value.call( this, index, self.html() );
                    }
                    self.domManip( args, callback );
                });
            }

            if ( l ) {
                fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
                first = fragment.firstChild;

                if ( fragment.childNodes.length === 1 ) {
                    fragment = first;
                }

                if ( first ) {
                    scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
                    hasScripts = scripts.length;

                    // Use the original fragment for the last item instead of the first because it can end up
                    // being emptied incorrectly in certain situations (#8070).
                    for ( ; i < l; i++ ) {
                        node = fragment;

                        if ( i !== iNoClone ) {
                            node = jQuery.clone( node, true, true );

                            // Keep references to cloned scripts for later restoration
                            if ( hasScripts ) {
                                jQuery.merge( scripts, getAll( node, "script" ) );
                            }
                        }

                        callback.call( this[i], node, i );
                    }

                    if ( hasScripts ) {
                        doc = scripts[ scripts.length - 1 ].ownerDocument;

                        // Reenable scripts
                        jQuery.map( scripts, restoreScript );

                        // Evaluate executable scripts on first document insertion
                        for ( i = 0; i < hasScripts; i++ ) {
                            node = scripts[ i ];
                            if ( rscriptType.test( node.type || "" ) &&
                                !jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

                                if ( node.src ) {
                                    // Optional AJAX dependency, but won't run scripts if not present
                                    if ( jQuery._evalUrl ) {
                                        jQuery._evalUrl( node.src );
                                    }
                                } else {
                                    jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
                                }
                            }
                        }
                    }

                    // Fix #11809: Avoid leaking memory
                    fragment = first = null;
                }
            }

            return this;
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function( name, original ) {
        jQuery.fn[ name ] = function( selector ) {
            var elems,
                i = 0,
                ret = [],
                insert = jQuery( selector ),
                last = insert.length - 1;

            for ( ; i <= last; i++ ) {
                elems = i === last ? this : this.clone(true);
                jQuery( insert[i] )[ original ]( elems );

                // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
                push.apply( ret, elems.get() );
            }

            return this.pushStack( ret );
        };
    });


    var iframe,
        elemdisplay = {};

    /**
     * Retrieve the actual display of a element
     * @param {String} name nodeName of the element
     * @param {Object} doc Document object
     */
// Called only from within defaultDisplay
    function actualDisplay( name, doc ) {
        var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

        // getDefaultComputedStyle might be reliably used only on attached element
            display = window.getDefaultComputedStyle ?

                // Use of this method is a temporary fix (more like optmization) until something better comes along,
                // since it was removed from specification and supported only in FF
                window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

        // We don't have any data stored on the element,
        // so use "detach" method as fast way to get rid of the element
        elem.detach();

        return display;
    }

    /**
     * Try to determine the default display value of an element
     * @param {String} nodeName
     */
    function defaultDisplay( nodeName ) {
        var doc = document,
            display = elemdisplay[ nodeName ];

        if ( !display ) {
            display = actualDisplay( nodeName, doc );

            // If the simple way fails, read from inside an iframe
            if ( display === "none" || !display ) {

                // Use the already-created iframe if possible
                iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

                // Support: IE
                doc.write();
                doc.close();

                display = actualDisplay( nodeName, doc );
                iframe.detach();
            }

            // Store the correct default display
            elemdisplay[ nodeName ] = display;
        }

        return display;
    }


    (function() {
        var a, shrinkWrapBlocksVal,
            div = document.createElement( "div" ),
            divReset =
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
                    "display:block;padding:0;margin:0;border:0";

        // Setup
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName( "a" )[ 0 ];

        a.style.cssText = "float:left;opacity:.5";

        // Make sure that element opacity exists
        // (IE uses filter instead)
        // Use a regex to work around a WebKit issue. See #5145
        support.opacity = /^0.5/.test( a.style.opacity );

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        support.cssFloat = !!a.style.cssFloat;

        div.style.backgroundClip = "content-box";
        div.cloneNode( true ).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        // Null elements to avoid leaks in IE.
        a = div = null;

        support.shrinkWrapBlocks = function() {
            var body, container, div, containerStyles;

            if ( shrinkWrapBlocksVal == null ) {
                body = document.getElementsByTagName( "body" )[ 0 ];
                if ( !body ) {
                    // Test fired too early or in an unsupported environment, exit.
                    return;
                }

                containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
                container = document.createElement( "div" );
                div = document.createElement( "div" );

                body.appendChild( container ).appendChild( div );

                // Will be changed later if needed.
                shrinkWrapBlocksVal = false;

                if ( typeof div.style.zoom !== strundefined ) {
                    // Support: IE6
                    // Check if elements with layout shrink-wrap their children
                    div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
                    div.innerHTML = "<div></div>";
                    div.firstChild.style.width = "5px";
                    shrinkWrapBlocksVal = div.offsetWidth !== 3;
                }

                body.removeChild( container );

                // Null elements to avoid leaks in IE.
                body = container = div = null;
            }

            return shrinkWrapBlocksVal;
        };

    })();
    var rmargin = (/^margin/);

    var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



    var getStyles, curCSS,
        rposition = /^(top|right|bottom|left)$/;

    if ( window.getComputedStyle ) {
        getStyles = function( elem ) {
            return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
        };

        curCSS = function( elem, name, computed ) {
            var width, minWidth, maxWidth, ret,
                style = elem.style;

            computed = computed || getStyles( elem );

            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
            ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

            if ( computed ) {

                if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
                    ret = jQuery.style( elem, name );
                }

                // A tribute to the "awesome hack by Dean Edwards"
                // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;

                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;

                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
                ret + "";
        };
    } else if ( document.documentElement.currentStyle ) {
        getStyles = function( elem ) {
            return elem.currentStyle;
        };

        curCSS = function( elem, name, computed ) {
            var left, rs, rsLeft, ret,
                style = elem.style;

            computed = computed || getStyles( elem );
            ret = computed ? computed[ name ] : undefined;

            // Avoid setting ret to empty string here
            // so we don't default to auto
            if ( ret == null && style && style[ name ] ) {
                ret = style[ name ];
            }

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are proportional to the parent element instead
            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
            if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

                // Remember the original values
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;

                // Put in the new values to get a computed value out
                if ( rsLeft ) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";

                // Revert the changed values
                style.left = left;
                if ( rsLeft ) {
                    rs.left = rsLeft;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
                ret + "" || "auto";
        };
    }




    function addGetHookIf( conditionFn, hookFn ) {
        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                var condition = conditionFn();

                if ( condition == null ) {
                    // The test was not ready at this point; screw the hook this time
                    // but check again when needed next time.
                    return;
                }

                if ( condition ) {
                    // Hook not needed (or it's not possible to use it due to missing dependency),
                    // remove it.
                    // Since there are no other hooks for marginRight, remove the whole object.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.

                return (this.get = hookFn).apply( this, arguments );
            }
        };
    }


    (function() {
        var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
            pixelPositionVal, reliableMarginRightVal,
            div = document.createElement( "div" ),
            containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
            divReset =
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
                    "display:block;padding:0;margin:0;border:0";

        // Setup
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName( "a" )[ 0 ];

        a.style.cssText = "float:left;opacity:.5";

        // Make sure that element opacity exists
        // (IE uses filter instead)
        // Use a regex to work around a WebKit issue. See #5145
        support.opacity = /^0.5/.test( a.style.opacity );

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        support.cssFloat = !!a.style.cssFloat;

        div.style.backgroundClip = "content-box";
        div.cloneNode( true ).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        // Null elements to avoid leaks in IE.
        a = div = null;

        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                if ( reliableHiddenOffsetsVal != null ) {
                    return reliableHiddenOffsetsVal;
                }

                var container, tds, isSupported,
                    div = document.createElement( "div" ),
                    body = document.getElementsByTagName( "body" )[ 0 ];

                if ( !body ) {
                    // Return for frameset docs that don't have a body
                    return;
                }

                // Setup
                div.setAttribute( "className", "t" );
                div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

                container = document.createElement( "div" );
                container.style.cssText = containerStyles;

                body.appendChild( container ).appendChild( div );

                // Support: IE8
                // Check if table cells still have offsetWidth/Height when they are set
                // to display:none and there are still other visible table cells in a
                // table row; if so, offsetWidth/Height are not reliable for use when
                // determining if an element has been hidden directly using
                // display:none (it is still safe to use offsets if a parent element is
                // hidden; don safety goggles and see bug #4512 for more information).
                div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                tds = div.getElementsByTagName( "td" );
                tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
                isSupported = ( tds[ 0 ].offsetHeight === 0 );

                tds[ 0 ].style.display = "";
                tds[ 1 ].style.display = "none";

                // Support: IE8
                // Check if empty table cells still have offsetWidth/Height
                reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

                body.removeChild( container );

                // Null elements to avoid leaks in IE.
                div = body = null;

                return reliableHiddenOffsetsVal;
            },

            boxSizing: function() {
                if ( boxSizingVal == null ) {
                    computeStyleTests();
                }
                return boxSizingVal;
            },

            boxSizingReliable: function() {
                if ( boxSizingReliableVal == null ) {
                    computeStyleTests();
                }
                return boxSizingReliableVal;
            },

            pixelPosition: function() {
                if ( pixelPositionVal == null ) {
                    computeStyleTests();
                }
                return pixelPositionVal;
            },

            reliableMarginRight: function() {
                var body, container, div, marginDiv;

                // Use window.getComputedStyle because jsdom on node.js will break without it.
                if ( reliableMarginRightVal == null && window.getComputedStyle ) {
                    body = document.getElementsByTagName( "body" )[ 0 ];
                    if ( !body ) {
                        // Test fired too early or in an unsupported environment, exit.
                        return;
                    }

                    container = document.createElement( "div" );
                    div = document.createElement( "div" );
                    container.style.cssText = containerStyles;

                    body.appendChild( container ).appendChild( div );

                    // Check if div with explicit width and no margin-right incorrectly
                    // gets computed margin-right based on width of container. (#3333)
                    // Fails in WebKit before Feb 2011 nightlies
                    // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                    marginDiv = div.appendChild( document.createElement( "div" ) );
                    marginDiv.style.cssText = div.style.cssText = divReset;
                    marginDiv.style.marginRight = marginDiv.style.width = "0";
                    div.style.width = "1px";

                    reliableMarginRightVal =
                        !parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

                    body.removeChild( container );
                }

                return reliableMarginRightVal;
            }
        });

        function computeStyleTests() {
            var container, div,
                body = document.getElementsByTagName( "body" )[ 0 ];

            if ( !body ) {
                // Test fired too early or in an unsupported environment, exit.
                return;
            }

            container = document.createElement( "div" );
            div = document.createElement( "div" );
            container.style.cssText = containerStyles;

            body.appendChild( container ).appendChild( div );

            div.style.cssText =
                "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
                    "position:absolute;display:block;padding:1px;border:1px;width:4px;" +
                    "margin-top:1%;top:1%";

            // Workaround failing boxSizing test due to offsetWidth returning wrong value
            // with some non-1 values of body zoom, ticket #13543
            jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
                boxSizingVal = div.offsetWidth === 4;
            });

            // Will be changed later if needed.
            boxSizingReliableVal = true;
            pixelPositionVal = false;
            reliableMarginRightVal = true;

            // Use window.getComputedStyle because jsdom on node.js will break without it.
            if ( window.getComputedStyle ) {
                pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
                boxSizingReliableVal =
                    ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
            }

            body.removeChild( container );

            // Null elements to avoid leaks in IE.
            div = body = null;
        }

    })();


// A method for quickly swapping in/out CSS properties to get correct calculations.
    jQuery.swap = function( elem, options, callback, args ) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for ( name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }

        ret = callback.apply( elem, args || [] );

        // Revert the old values
        for ( name in options ) {
            elem.style[ name ] = old[ name ];
        }

        return ret;
    };


    var
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,

    // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
    // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
        rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },

        cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
    function vendorPropName( style, name ) {

        // shortcut for names that are not vendor prefixed
        if ( name in style ) {
            return name;
        }

        // check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;

        while ( i-- ) {
            name = cssPrefixes[ i ] + capName;
            if ( name in style ) {
                return name;
            }
        }

        return origName;
    }

    function showHide( elements, show ) {
        var display, elem, hidden,
            values = [],
            index = 0,
            length = elements.length;

        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }

            values[ index ] = jQuery._data( elem, "olddisplay" );
            display = elem.style.display;
            if ( show ) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if ( !values[ index ] && display === "none" ) {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if ( elem.style.display === "" && isHidden( elem ) ) {
                    values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
                }
            } else {

                if ( !values[ index ] ) {
                    hidden = isHidden( elem );

                    if ( display && display !== "none" || !hidden ) {
                        jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
                    }
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for ( index = 0; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
            if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                elem.style.display = show ? values[ index ] || "" : "none";
            }
        }

        return elements;
    }

    function setPositiveNumber( elem, value, subtract ) {
        var matches = rnumsplit.exec( value );
        return matches ?
            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
            value;
    }

    function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
        var i = extra === ( isBorderBox ? "border" : "content" ) ?
                // If we already have the right measurement, avoid augmentation
                4 :
                // Otherwise initialize for horizontal or vertical properties
                name === "width" ? 1 : 0,

            val = 0;

        for ( ; i < 4; i += 2 ) {
            // both box models exclude margin, so add it if we want it
            if ( extra === "margin" ) {
                val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
            }

            if ( isBorderBox ) {
                // border-box includes padding, so remove it if we want content
                if ( extra === "content" ) {
                    val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
                }

                // at this point, extra isn't border nor margin, so remove border
                if ( extra !== "margin" ) {
                    val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            } else {
                // at this point, extra isn't content, so add padding
                val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

                // at this point, extra isn't content nor padding, so add border
                if ( extra !== "padding" ) {
                    val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            }
        }

        return val;
    }

    function getWidthOrHeight( elem, name, extra ) {

        // Start with offset property, which is equivalent to the border-box value
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles( elem ),
            isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if ( val <= 0 || val == null ) {
            // Fall back to computed then uncomputed css if necessary
            val = curCSS( elem, name, styles );
            if ( val < 0 || val == null ) {
                val = elem.style[ name ];
            }

            // Computed unit is not pixels. Stop here and return.
            if ( rnumnonpx.test(val) ) {
                return val;
            }

            // we need the check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

            // Normalize "", auto, and prepare for extra
            val = parseFloat( val ) || 0;
        }

        // use the active box-sizing model to add/subtract irrelevant styles
        return ( val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || ( isBorderBox ? "border" : "content" ),
                valueIsBorderBox,
                styles
            )
            ) + "px";
    }

    jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function( elem, computed ) {
                    if ( computed ) {
                        // We should always get a number back from opacity
                        var ret = curCSS( elem, "opacity" );
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "columnCount": true,
            "fillOpacity": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            // normalize float css property
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },

        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {
            // Don't set styles on text and comment nodes
            if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase( name ),
                style = elem.style;

            name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // Check if we're setting a value
            if ( value !== undefined ) {
                type = typeof value;

                // convert relative number strings (+= or -=) to relative numbers. #7345
                if ( type === "string" && (ret = rrelNum.exec( value )) ) {
                    value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set. See: #7116
                if ( value == null || value !== value ) {
                    return;
                }

                // If a number was passed in, add 'px' to the (except for certain CSS properties)
                if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
                    value += "px";
                }

                // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
                // but it would mean to define eight (for every problematic property) identical functions
                if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
                    style[ name ] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

                    // Support: IE
                    // Swallow errors from 'invalid' CSS values (#5509)
                    try {
                        // Support: Chrome, Safari
                        // Setting style to blank string required to delete "style: x !important;"
                        style[ name ] = "";
                        style[ name ] = value;
                    } catch(e) {}
                }

            } else {
                // If a hook was provided get the non-computed value from there
                if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[ name ];
            }
        },

        css: function( elem, name, extra, styles ) {
            var num, val, hooks,
                origName = jQuery.camelCase( name );

            // Make sure that we're working with the right name
            name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

            // If a hook was provided get the computed value from there
            if ( hooks && "get" in hooks ) {
                val = hooks.get( elem, true, extra );
            }

            // Otherwise, if a way to get the computed value exists, use that
            if ( val === undefined ) {
                val = curCSS( elem, name, styles );
            }

            //convert "normal" to computed value
            if ( val === "normal" && name in cssNormalTransform ) {
                val = cssNormalTransform[ name ];
            }

            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            if ( extra === "" || extra ) {
                num = parseFloat( val );
                return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
            }
            return val;
        }
    });

    jQuery.each([ "height", "width" ], function( i, name ) {
        jQuery.cssHooks[ name ] = {
            get: function( elem, computed, extra ) {
                if ( computed ) {
                    // certain elements can have dimension info if we invisibly show them
                    // however, it must have a current display style that would benefit from this
                    return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
                        jQuery.swap( elem, cssShow, function() {
                            return getWidthOrHeight( elem, name, extra );
                        }) :
                        getWidthOrHeight( elem, name, extra );
                }
            },

            set: function( elem, value, extra ) {
                var styles = extra && getStyles( elem );
                return setPositiveNumber( elem, value, extra ?
                    augmentWidthOrHeight(
                        elem,
                        name,
                        extra,
                        support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
                        styles
                    ) : 0
                );
            }
        };
    });

    if ( !support.opacity ) {
        jQuery.cssHooks.opacity = {
            get: function( elem, computed ) {
                // IE uses filters for opacity
                return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
                    ( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
                    computed ? "1" : "";
            },

            set: function( elem, value ) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";

                // IE has trouble with opacity if it does not have layout
                // Force it by setting the zoom level
                style.zoom = 1;

                // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
                // if value === "", then remove inline opacity #12685
                if ( ( value >= 1 || value === "" ) &&
                    jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
                    style.removeAttribute ) {

                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
                    // style.removeAttribute is IE Only, but so apparently is this code path...
                    style.removeAttribute( "filter" );

                    // if there is no filter style applied in a css rule or unset inline opacity, we are done
                    if ( value === "" || currentStyle && !currentStyle.filter ) {
                        return;
                    }
                }

                // otherwise, set new filter values
                style.filter = ralpha.test( filter ) ?
                    filter.replace( ralpha, opacity ) :
                    filter + " " + opacity;
            }
        };
    }

    jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
        function( elem, computed ) {
            if ( computed ) {
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                // Work around by temporarily setting element display to inline-block
                return jQuery.swap( elem, { "display": "inline-block" },
                    curCSS, [ elem, "marginRight" ] );
            }
        }
    );

// These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        jQuery.cssHooks[ prefix + suffix ] = {
            expand: function( value ) {
                var i = 0,
                    expanded = {},

                // assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [ value ];

                for ( ; i < 4; i++ ) {
                    expanded[ prefix + cssExpand[ i ] + suffix ] =
                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                }

                return expanded;
            }
        };

        if ( !rmargin.test( prefix ) ) {
            jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function( name, value ) {
            return access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;

                if ( jQuery.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;

                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style( elem, name, value ) :
                    jQuery.css( elem, name );
            }, name, value, arguments.length > 1 );
        },
        show: function() {
            return showHide( this, true );
        },
        hide: function() {
            return showHide( this );
        },
        toggle: function( state ) {
            if ( typeof state === "boolean" ) {
                return state ? this.show() : this.hide();
            }

            return this.each(function() {
                if ( isHidden( this ) ) {
                    jQuery( this ).show();
                } else {
                    jQuery( this ).hide();
                }
            });
        }
    });


    function Tween( elem, options, prop, end, easing ) {
        return new Tween.prototype.init( elem, options, prop, end, easing );
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function( elem, options, prop, end, easing, unit ) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
        },
        cur: function() {
            var hooks = Tween.propHooks[ this.prop ];

            return hooks && hooks.get ?
                hooks.get( this ) :
                Tween.propHooks._default.get( this );
        },
        run: function( percent ) {
            var eased,
                hooks = Tween.propHooks[ this.prop ];

            if ( this.options.duration ) {
                this.pos = eased = jQuery.easing[ this.easing ](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;

            if ( this.options.step ) {
                this.options.step.call( this.elem, this.now, this );
            }

            if ( hooks && hooks.set ) {
                hooks.set( this );
            } else {
                Tween.propHooks._default.set( this );
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function( tween ) {
                var result;

                if ( tween.elem[ tween.prop ] != null &&
                    (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
                    return tween.elem[ tween.prop ];
                }

                // passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails
                // so, simple values such as "10px" are parsed to Float.
                // complex values such as "rotate(1rad)" are returned as is.
                result = jQuery.css( tween.elem, tween.prop, "" );
                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function( tween ) {
                // use step hook for back compat - use cssHook if its there - use .style if its
                // available and use plain properties where available
                if ( jQuery.fx.step[ tween.prop ] ) {
                    jQuery.fx.step[ tween.prop ]( tween );
                } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
                    jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
                } else {
                    tween.elem[ tween.prop ] = tween.now;
                }
            }
        }
    };

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function( tween ) {
            if ( tween.elem.nodeType && tween.elem.parentNode ) {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function( p ) {
            return p;
        },
        swing: function( p ) {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        }
    };

    jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
        rrun = /queueHooks$/,
        animationPrefilters = [ defaultPrefilter ],
        tweeners = {
            "*": [ function( prop, value ) {
                var tween = this.createTween( prop, value ),
                    target = tween.cur(),
                    parts = rfxnum.exec( value ),
                    unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

                // Starting value computation is required for potential unit mismatches
                    start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
                        rfxnum.exec( jQuery.css( tween.elem, prop ) ),
                    scale = 1,
                    maxIterations = 20;

                if ( start && start[ 3 ] !== unit ) {
                    // Trust units reported by jQuery.css
                    unit = unit || start[ 3 ];

                    // Make sure we update the tween properties later on
                    parts = parts || [];

                    // Iteratively approximate from a nonzero starting point
                    start = +target || 1;

                    do {
                        // If previous iteration zeroed out, double until we get *something*
                        // Use a string for doubling factor so we don't accidentally see scale as unchanged below
                        scale = scale || ".5";

                        // Adjust and apply
                        start = start / scale;
                        jQuery.style( tween.elem, prop, start + unit );

                        // Update scale, tolerating zero or NaN from tween.cur()
                        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
                    } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
                }

                // Update tween properties
                if ( parts ) {
                    start = tween.start = +start || +target || 0;
                    tween.unit = unit;
                    // If a +=/-= token was provided, we're doing a relative animation
                    tween.end = parts[ 1 ] ?
                        start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
                        +parts[ 2 ];
                }

                return tween;
            } ]
        };

// Animations created synchronously will run synchronously
    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined;
        });
        return ( fxNow = jQuery.now() );
    }

// Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
        var which,
            attrs = { height: type },
            i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for ( ; i < 4 ; i += 2 - includeWidth ) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if ( includeWidth ) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween( value, prop, animation ) {
        var tween,
            collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
            index = 0,
            length = collection.length;
        for ( ; index < length; index++ ) {
            if ( (tween = collection[ index ].call( animation, prop, value )) ) {

                // we're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter( elem, props, opts ) {
        /* jshint validthis: true */
        var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden( elem ),
            dataShow = jQuery._data( elem, "fxshow" );

        // handle queue: false promises
        if ( !opts.queue ) {
            hooks = jQuery._queueHooks( elem, "fx" );
            if ( hooks.unqueued == null ) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if ( !hooks.unqueued ) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function() {
                // doing this makes sure that the complete handler will be called
                // before this completes
                anim.always(function() {
                    hooks.unqueued--;
                    if ( !jQuery.queue( elem, "fx" ).length ) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // height/width overflow pass
        if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            display = jQuery.css( elem, "display" );
            dDisplay = defaultDisplay( elem.nodeName );
            if ( display === "none" ) {
                display = dDisplay;
            }
            if ( display === "inline" &&
                jQuery.css( elem, "float" ) === "none" ) {

                // inline-level elements accept inline-block;
                // block-level elements need to be inline with layout
                if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }

        if ( opts.overflow ) {
            style.overflow = "hidden";
            if ( !support.shrinkWrapBlocks() ) {
                anim.always(function() {
                    style.overflow = opts.overflow[ 0 ];
                    style.overflowX = opts.overflow[ 1 ];
                    style.overflowY = opts.overflow[ 2 ];
                });
            }
        }

        // show/hide pass
        for ( prop in props ) {
            value = props[ prop ];
            if ( rfxtypes.exec( value ) ) {
                delete props[ prop ];
                toggle = toggle || value === "toggle";
                if ( value === ( hidden ? "hide" : "show" ) ) {

                    // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
                    if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
            }
        }

        if ( !jQuery.isEmptyObject( orig ) ) {
            if ( dataShow ) {
                if ( "hidden" in dataShow ) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = jQuery._data( elem, "fxshow", {} );
            }

            // store state if its toggle - enables .stop().toggle() to "reverse"
            if ( toggle ) {
                dataShow.hidden = !hidden;
            }
            if ( hidden ) {
                jQuery( elem ).show();
            } else {
                anim.done(function() {
                    jQuery( elem ).hide();
                });
            }
            anim.done(function() {
                var prop;
                jQuery._removeData( elem, "fxshow" );
                for ( prop in orig ) {
                    jQuery.style( elem, prop, orig[ prop ] );
                }
            });
            for ( prop in orig ) {
                tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

                if ( !( prop in dataShow ) ) {
                    dataShow[ prop ] = tween.start;
                    if ( hidden ) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        }
    }

    function propFilter( props, specialEasing ) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for ( index in props ) {
            name = jQuery.camelCase( index );
            easing = specialEasing[ name ];
            value = props[ index ];
            if ( jQuery.isArray( value ) ) {
                easing = value[ 1 ];
                value = props[ index ] = value[ 0 ];
            }

            if ( index !== name ) {
                props[ name ] = value;
                delete props[ index ];
            }

            hooks = jQuery.cssHooks[ name ];
            if ( hooks && "expand" in hooks ) {
                value = hooks.expand( value );
                delete props[ name ];

                // not quite $.extend, this wont overwrite keys already present.
                // also - reusing 'index' from above because we have the correct "name"
                for ( index in value ) {
                    if ( !( index in props ) ) {
                        props[ index ] = value[ index ];
                        specialEasing[ index ] = easing;
                    }
                }
            } else {
                specialEasing[ name ] = easing;
            }
        }
    }

    function Animation( elem, properties, options ) {
        var result,
            stopped,
            index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always( function() {
                // don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function() {
                if ( stopped ) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
                // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for ( ; index < length ; index++ ) {
                    animation.tweens[ index ].run( percent );
                }

                deferred.notifyWith( elem, [ animation, percent, remaining ]);

                if ( percent < 1 && length ) {
                    return remaining;
                } else {
                    deferred.resolveWith( elem, [ animation ] );
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend( {}, properties ),
                opts: jQuery.extend( true, { specialEasing: {} }, options ),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function( prop, end ) {
                    var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                    animation.tweens.push( tween );
                    return tween;
                },
                stop: function( gotoEnd ) {
                    var index = 0,
                    // if we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if ( stopped ) {
                        return this;
                    }
                    stopped = true;
                    for ( ; index < length ; index++ ) {
                        animation.tweens[ index ].run( 1 );
                    }

                    // resolve when we played the last frame
                    // otherwise, reject
                    if ( gotoEnd ) {
                        deferred.resolveWith( elem, [ animation, gotoEnd ] );
                    } else {
                        deferred.rejectWith( elem, [ animation, gotoEnd ] );
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter( props, animation.opts.specialEasing );

        for ( ; index < length ; index++ ) {
            result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
            if ( result ) {
                return result;
            }
        }

        jQuery.map( props, createTween, animation );

        if ( jQuery.isFunction( animation.opts.start ) ) {
            animation.opts.start.call( elem, animation );
        }

        jQuery.fx.timer(
            jQuery.extend( tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        // attach callbacks from options
        return animation.progress( animation.opts.progress )
            .done( animation.opts.done, animation.opts.complete )
            .fail( animation.opts.fail )
            .always( animation.opts.always );
    }

    jQuery.Animation = jQuery.extend( Animation, {
        tweener: function( props, callback ) {
            if ( jQuery.isFunction( props ) ) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }

            var prop,
                index = 0,
                length = props.length;

            for ( ; index < length ; index++ ) {
                prop = props[ index ];
                tweeners[ prop ] = tweeners[ prop ] || [];
                tweeners[ prop ].unshift( callback );
            }
        },

        prefilter: function( callback, prepend ) {
            if ( prepend ) {
                animationPrefilters.unshift( callback );
            } else {
                animationPrefilters.push( callback );
            }
        }
    });

    jQuery.speed = function( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
            complete: fn || !fn && easing ||
                jQuery.isFunction( speed ) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
        };

        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if ( jQuery.isFunction( opt.old ) ) {
                opt.old.call( this );
            }

            if ( opt.queue ) {
                jQuery.dequeue( this, opt.queue );
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function( speed, to, easing, callback ) {

            // show any hidden elements after setting opacity to 0
            return this.filter( isHidden ).css( "opacity", 0 ).show()

                // animate to the value specified
                .end().animate({ opacity: to }, speed, easing, callback );
        },
        animate: function( prop, speed, easing, callback ) {
            var empty = jQuery.isEmptyObject( prop ),
                optall = jQuery.speed( speed, easing, callback ),
                doAnimation = function() {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation( this, jQuery.extend( {}, prop ), optall );

                    // Empty animations, or finishing resolves immediately
                    if ( empty || jQuery._data( this, "finish" ) ) {
                        anim.stop( true );
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each( doAnimation ) :
                this.queue( optall.queue, doAnimation );
        },
        stop: function( type, clearQueue, gotoEnd ) {
            var stopQueue = function( hooks ) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop( gotoEnd );
            };

            if ( typeof type !== "string" ) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if ( clearQueue && type !== false ) {
                this.queue( type || "fx", [] );
            }

            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data( this );

                if ( index ) {
                    if ( data[ index ] && data[ index ].stop ) {
                        stopQueue( data[ index ] );
                    }
                } else {
                    for ( index in data ) {
                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                            stopQueue( data[ index ] );
                        }
                    }
                }

                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
                        timers[ index ].anim.stop( gotoEnd );
                        dequeue = false;
                        timers.splice( index, 1 );
                    }
                }

                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if ( dequeue || !gotoEnd ) {
                    jQuery.dequeue( this, type );
                }
            });
        },
        finish: function( type ) {
            if ( type !== false ) {
                type = type || "fx";
            }
            return this.each(function() {
                var index,
                    data = jQuery._data( this ),
                    queue = data[ type + "queue" ],
                    hooks = data[ type + "queueHooks" ],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // enable finishing flag on private data
                data.finish = true;

                // empty the queue first
                jQuery.queue( this, type, [] );

                if ( hooks && hooks.stop ) {
                    hooks.stop.call( this, true );
                }

                // look for any active animations, and finish them
                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
                        timers[ index ].anim.stop( true );
                        timers.splice( index, 1 );
                    }
                }

                // look for any animations in the old queue and finish them
                for ( index = 0; index < length; index++ ) {
                    if ( queue[ index ] && queue[ index ].finish ) {
                        queue[ index ].finish.call( this );
                    }
                }

                // turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply( this, arguments ) :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    });

// Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            timers = jQuery.timers,
            i = 0;

        fxNow = jQuery.now();

        for ( ; i < timers.length; i++ ) {
            timer = timers[ i ];
            // Checks the timer has not already been removed
            if ( !timer() && timers[ i ] === timer ) {
                timers.splice( i--, 1 );
            }
        }

        if ( !timers.length ) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function( timer ) {
        jQuery.timers.push( timer );
        if ( timer() ) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };

    jQuery.fx.interval = 13;

    jQuery.fx.start = function() {
        if ( !timerId ) {
            timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
        }
    };

    jQuery.fx.stop = function() {
        clearInterval( timerId );
        timerId = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    };


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function( time, type ) {
        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        type = type || "fx";

        return this.queue( type, function( next, hooks ) {
            var timeout = setTimeout( next, time );
            hooks.stop = function() {
                clearTimeout( timeout );
            };
        });
    };


    (function() {
        var a, input, select, opt,
            div = document.createElement("div" );

        // Setup
        div.setAttribute( "className", "t" );
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[ 0 ];

        // First batch of tests.
        select = document.createElement("select");
        opt = select.appendChild( document.createElement("option") );
        input = div.getElementsByTagName("input")[ 0 ];

        a.style.cssText = "top:1px";

        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        support.getSetAttribute = div.className !== "t";

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        support.style = /top/.test( a.getAttribute("style") );

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        support.hrefNormalized = a.getAttribute("href") === "/a";

        // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
        support.checkOn = !!input.value;

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        support.optSelected = opt.selected;

        // Tests for enctype support on a form (#6743)
        support.enctype = !!document.createElement("form").enctype;

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Support: IE8 only
        // Check if we can trust getAttribute("value")
        input = document.createElement( "input" );
        input.setAttribute( "value", "" );
        support.input = input.getAttribute( "value" ) === "";

        // Check if an input maintains its value after becoming a radio
        input.value = "t";
        input.setAttribute( "type", "radio" );
        support.radioValue = input.value === "t";

        // Null elements to avoid leaks in IE.
        a = input = select = opt = div = null;
    })();


    var rreturn = /\r/g;

    jQuery.fn.extend({
        val: function( value ) {
            var hooks, ret, isFunction,
                elem = this[0];

            if ( !arguments.length ) {
                if ( elem ) {
                    hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

                    if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
                        return ret;
                    }

                    ret = elem.value;

                    return typeof ret === "string" ?
                        // handle most common string cases
                        ret.replace(rreturn, "") :
                        // handle cases where value is null/undef or number
                        ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction( value );

            return this.each(function( i ) {
                var val;

                if ( this.nodeType !== 1 ) {
                    return;
                }

                if ( isFunction ) {
                    val = value.call( this, i, jQuery( this ).val() );
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if ( val == null ) {
                    val = "";
                } else if ( typeof val === "number" ) {
                    val += "";
                } else if ( jQuery.isArray( val ) ) {
                    val = jQuery.map( val, function( value ) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

                // If set returns undefined, fall back to normal setting
                if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function( elem ) {
                    var val = jQuery.find.attr( elem, "value" );
                    return val != null ?
                        val :
                        jQuery.text( elem );
                }
            },
            select: {
                get: function( elem ) {
                    var value, option,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ?
                            max :
                            one ? index : 0;

                    // Loop through all the selected options
                    for ( ; i < max; i++ ) {
                        option = options[ i ];

                        // oldIE doesn't update selected after form reset (#2551)
                        if ( ( option.selected || i === index ) &&
                            // Don't return options that are disabled or in a disabled optgroup
                            ( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
                            ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

                            // Get the specific value for the option
                            value = jQuery( option ).val();

                            // We don't need an array for one selects
                            if ( one ) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push( value );
                        }
                    }

                    return values;
                },

                set: function( elem, value ) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray( value ),
                        i = options.length;

                    while ( i-- ) {
                        option = options[ i ];

                        if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

                            // Support: IE6
                            // When new option element is added to select box we need to
                            // force reflow of newly added node in order to workaround delay
                            // of initialization properties
                            try {
                                option.selected = optionSet = true;

                            } catch ( _ ) {

                                // Will be executed only in IE6
                                option.scrollHeight;
                            }

                        } else {
                            option.selected = false;
                        }
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if ( !optionSet ) {
                        elem.selectedIndex = -1;
                    }

                    return options;
                }
            }
        }
    });

// Radios and checkboxes getter/setter
    jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[ this ] = {
            set: function( elem, value ) {
                if ( jQuery.isArray( value ) ) {
                    return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
                }
            }
        };
        if ( !support.checkOn ) {
            jQuery.valHooks[ this ].get = function( elem ) {
                // Support: Webkit
                // "" is returned instead of "on" if a value isn't specified
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });




    var nodeHook, boolHook,
        attrHandle = jQuery.expr.attrHandle,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = support.getSetAttribute,
        getSetInput = support.input;

    jQuery.fn.extend({
        attr: function( name, value ) {
            return access( this, jQuery.attr, name, value, arguments.length > 1 );
        },

        removeAttr: function( name ) {
            return this.each(function() {
                jQuery.removeAttr( this, name );
            });
        }
    });

    jQuery.extend({
        attr: function( elem, name, value ) {
            var hooks, ret,
                nType = elem.nodeType;

            // don't get/set attributes on text, comment and attribute nodes
            if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if ( typeof elem.getAttribute === strundefined ) {
                return jQuery.prop( elem, name, value );
            }

            // All attributes are lowercase
            // Grab necessary hook if one is defined
            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[ name ] ||
                    ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
            }

            if ( value !== undefined ) {

                if ( value === null ) {
                    jQuery.removeAttr( elem, name );

                } else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
                    return ret;

                } else {
                    elem.setAttribute( name, value + "" );
                    return value;
                }

            } else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
                return ret;

            } else {
                ret = jQuery.find.attr( elem, name );

                // Non-existent attributes return null, we normalize to undefined
                return ret == null ?
                    undefined :
                    ret;
            }
        },

        removeAttr: function( elem, value ) {
            var name, propName,
                i = 0,
                attrNames = value && value.match( rnotwhite );

            if ( attrNames && elem.nodeType === 1 ) {
                while ( (name = attrNames[i++]) ) {
                    propName = jQuery.propFix[ name ] || name;

                    // Boolean attributes get special treatment (#10870)
                    if ( jQuery.expr.match.bool.test( name ) ) {
                        // Set corresponding property to false
                        if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
                            elem[ propName ] = false;
                            // Support: IE<9
                            // Also clear defaultChecked/defaultSelected (if appropriate)
                        } else {
                            elem[ jQuery.camelCase( "default-" + name ) ] =
                                elem[ propName ] = false;
                        }

                        // See #9699 for explanation of this approach (setting first, then removal)
                    } else {
                        jQuery.attr( elem, name, "" );
                    }

                    elem.removeAttribute( getSetAttribute ? name : propName );
                }
            }
        },

        attrHooks: {
            type: {
                set: function( elem, value ) {
                    if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
                        // Setting the type on a radio button after the value resets the value in IE6-9
                        // Reset value to default in case type is set after value during creation
                        var val = elem.value;
                        elem.setAttribute( "type", value );
                        if ( val ) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        }
    });

// Hook for boolean attributes
    boolHook = {
        set: function( elem, value, name ) {
            if ( value === false ) {
                // Remove boolean attributes when set to false
                jQuery.removeAttr( elem, name );
            } else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
                // IE<8 needs the *property* name
                elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

                // Use defaultChecked and defaultSelected for oldIE
            } else {
                elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
            }

            return name;
        }
    };

// Retrieve booleans specially
    jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

        var getter = attrHandle[ name ] || jQuery.find.attr;

        attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
            function( elem, name, isXML ) {
                var ret, handle;
                if ( !isXML ) {
                    // Avoid an infinite loop by temporarily removing this function from the getter
                    handle = attrHandle[ name ];
                    attrHandle[ name ] = ret;
                    ret = getter( elem, name, isXML ) != null ?
                        name.toLowerCase() :
                        null;
                    attrHandle[ name ] = handle;
                }
                return ret;
            } :
            function( elem, name, isXML ) {
                if ( !isXML ) {
                    return elem[ jQuery.camelCase( "default-" + name ) ] ?
                        name.toLowerCase() :
                        null;
                }
            };
    });

// fix oldIE attroperties
    if ( !getSetInput || !getSetAttribute ) {
        jQuery.attrHooks.value = {
            set: function( elem, value, name ) {
                if ( jQuery.nodeName( elem, "input" ) ) {
                    // Does not return so that setAttribute is also used
                    elem.defaultValue = value;
                } else {
                    // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                    return nodeHook && nodeHook.set( elem, value, name );
                }
            }
        };
    }

// IE6/7 do not support getting/setting some attributes with get/setAttribute
    if ( !getSetAttribute ) {

        // Use this for any attribute in IE6/7
        // This fixes almost every IE6/7 issue
        nodeHook = {
            set: function( elem, value, name ) {
                // Set the existing or create a new attribute node
                var ret = elem.getAttributeNode( name );
                if ( !ret ) {
                    elem.setAttributeNode(
                        (ret = elem.ownerDocument.createAttribute( name ))
                    );
                }

                ret.value = value += "";

                // Break association with cloned elements by also using setAttribute (#9646)
                if ( name === "value" || value === elem.getAttribute( name ) ) {
                    return value;
                }
            }
        };

        // Some attributes are constructed with empty-string values when not defined
        attrHandle.id = attrHandle.name = attrHandle.coords =
            function( elem, name, isXML ) {
                var ret;
                if ( !isXML ) {
                    return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
                        ret.value :
                        null;
                }
            };

        // Fixing value retrieval on a button requires this module
        jQuery.valHooks.button = {
            get: function( elem, name ) {
                var ret = elem.getAttributeNode( name );
                if ( ret && ret.specified ) {
                    return ret.value;
                }
            },
            set: nodeHook.set
        };

        // Set contenteditable to false on removals(#10429)
        // Setting to empty string throws an error as an invalid value
        jQuery.attrHooks.contenteditable = {
            set: function( elem, value, name ) {
                nodeHook.set( elem, value === "" ? false : value, name );
            }
        };

        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
        // This is for removals
        jQuery.each([ "width", "height" ], function( i, name ) {
            jQuery.attrHooks[ name ] = {
                set: function( elem, value ) {
                    if ( value === "" ) {
                        elem.setAttribute( name, "auto" );
                        return value;
                    }
                }
            };
        });
    }

    if ( !support.style ) {
        jQuery.attrHooks.style = {
            get: function( elem ) {
                // Return undefined in the case of empty string
                // Note: IE uppercases css property names, but if we were to .toLowerCase()
                // .cssText, that would destroy case senstitivity in URL's, like in "background"
                return elem.style.cssText || undefined;
            },
            set: function( elem, value ) {
                return ( elem.style.cssText = value + "" );
            }
        };
    }




    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function( name, value ) {
            return access( this, jQuery.prop, name, value, arguments.length > 1 );
        },

        removeProp: function( name ) {
            name = jQuery.propFix[ name ] || name;
            return this.each(function() {
                // try/catch handles cases where IE balks (such as removing a property on window)
                try {
                    this[ name ] = undefined;
                    delete this[ name ];
                } catch( e ) {}
            });
        }
    });

    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },

        prop: function( elem, name, value ) {
            var ret, hooks, notxml,
                nType = elem.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }

            notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

            if ( notxml ) {
                // Fix name and attach hooks
                name = jQuery.propFix[ name ] || name;
                hooks = jQuery.propHooks[ name ];
            }

            if ( value !== undefined ) {
                return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
                    ret :
                    ( elem[ name ] = value );

            } else {
                return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
                    ret :
                    elem[ name ];
            }
        },

        propHooks: {
            tabIndex: {
                get: function( elem ) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr( elem, "tabindex" );

                    return tabindex ?
                        parseInt( tabindex, 10 ) :
                        rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                            0 :
                            -1;
                }
            }
        }
    });

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if ( !support.hrefNormalized ) {
        // href/src property should get the full normalized URL (#10299/#12915)
        jQuery.each([ "href", "src" ], function( i, name ) {
            jQuery.propHooks[ name ] = {
                get: function( elem ) {
                    return elem.getAttribute( name, 4 );
                }
            };
        });
    }

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
    if ( !support.optSelected ) {
        jQuery.propHooks.selected = {
            get: function( elem ) {
                var parent = elem.parentNode;

                if ( parent ) {
                    parent.selectedIndex;

                    // Make sure that it also works with optgroups, see #5701
                    if ( parent.parentNode ) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function() {
        jQuery.propFix[ this.toLowerCase() ] = this;
    });

// IE6/7 call enctype encoding
    if ( !support.enctype ) {
        jQuery.propFix.enctype = "encoding";
    }




    var rclass = /[\t\r\n\f]/g;

    jQuery.fn.extend({
        addClass: function( value ) {
            var classes, elem, cur, clazz, j, finalValue,
                i = 0,
                len = this.length,
                proceed = typeof value === "string" && value;

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( j ) {
                    jQuery( this ).addClass( value.call( this, j, this.className ) );
                });
            }

            if ( proceed ) {
                // The disjunction here is for better compressibility (see removeClass)
                classes = ( value || "" ).match( rnotwhite ) || [];

                for ( ; i < len; i++ ) {
                    elem = this[ i ];
                    cur = elem.nodeType === 1 && ( elem.className ?
                        ( " " + elem.className + " " ).replace( rclass, " " ) :
                        " "
                        );

                    if ( cur ) {
                        j = 0;
                        while ( (clazz = classes[j++]) ) {
                            if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
                                cur += clazz + " ";
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = jQuery.trim( cur );
                        if ( elem.className !== finalValue ) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function( value ) {
            var classes, elem, cur, clazz, j, finalValue,
                i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === "string" && value;

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( j ) {
                    jQuery( this ).removeClass( value.call( this, j, this.className ) );
                });
            }
            if ( proceed ) {
                classes = ( value || "" ).match( rnotwhite ) || [];

                for ( ; i < len; i++ ) {
                    elem = this[ i ];
                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && ( elem.className ?
                        ( " " + elem.className + " " ).replace( rclass, " " ) :
                        ""
                        );

                    if ( cur ) {
                        j = 0;
                        while ( (clazz = classes[j++]) ) {
                            // Remove *all* instances
                            while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
                                cur = cur.replace( " " + clazz + " ", " " );
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = value ? jQuery.trim( cur ) : "";
                        if ( elem.className !== finalValue ) {
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function( value, stateVal ) {
            var type = typeof value;

            if ( typeof stateVal === "boolean" && type === "string" ) {
                return stateVal ? this.addClass( value ) : this.removeClass( value );
            }

            if ( jQuery.isFunction( value ) ) {
                return this.each(function( i ) {
                    jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
                });
            }

            return this.each(function() {
                if ( type === "string" ) {
                    // toggle individual class names
                    var className,
                        i = 0,
                        self = jQuery( this ),
                        classNames = value.match( rnotwhite ) || [];

                    while ( (className = classNames[ i++ ]) ) {
                        // check each className given, space separated list
                        if ( self.hasClass( className ) ) {
                            self.removeClass( className );
                        } else {
                            self.addClass( className );
                        }
                    }

                    // Toggle whole class name
                } else if ( type === strundefined || type === "boolean" ) {
                    if ( this.className ) {
                        // store className if set
                        jQuery._data( this, "__className__", this.className );
                    }

                    // If the element has a class name or if we're passed "false",
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
                }
            });
        },

        hasClass: function( selector ) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for ( ; i < l; i++ ) {
                if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
                    return true;
                }
            }

            return false;
        }
    });




// Return jQuery for attributes-only inclusion


    jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

        // Handle event binding
        jQuery.fn[ name ] = function( data, fn ) {
            return arguments.length > 0 ?
                this.on( name, null, data, fn ) :
                this.trigger( name );
        };
    });

    jQuery.fn.extend({
        hover: function( fnOver, fnOut ) {
            return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
        },

        bind: function( types, data, fn ) {
            return this.on( types, null, data, fn );
        },
        unbind: function( types, fn ) {
            return this.off( types, null, fn );
        },

        delegate: function( selector, types, data, fn ) {
            return this.on( types, selector, data, fn );
        },
        undelegate: function( selector, types, fn ) {
            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
        }
    });


    var nonce = jQuery.now();

    var rquery = (/\?/);



    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

    jQuery.parseJSON = function( data ) {
        // Attempt to parse using the native JSON parser first
        if ( window.JSON && window.JSON.parse ) {
            // Support: Android 2.3
            // Workaround failure to string-cast null input
            return window.JSON.parse( data + "" );
        }

        var requireNonComma,
            depth = null,
            str = jQuery.trim( data + "" );

        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
        // after removing valid tokens
        return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

            // Force termination if we see a misplaced comma
            if ( requireNonComma && comma ) {
                depth = 0;
            }

            // Perform no more replacements after returning to outermost depth
            if ( depth === 0 ) {
                return token;
            }

            // Commas must not follow "[", "{", or ","
            requireNonComma = open || comma;

            // Determine new depth
            // array/object open ("[" or "{"): depth += true - false (increment)
            // array/object close ("]" or "}"): depth += false - true (decrement)
            // other cases ("," or primitive): depth += true - true (numeric cast)
            depth += !close - !open;

            // Remove this token
            return "";
        }) ) ?
            ( Function( "return " + str ) )() :
            jQuery.error( "Invalid JSON: " + data );
    };


// Cross-browser xml parsing
    jQuery.parseXML = function( data ) {
        var xml, tmp;
        if ( !data || typeof data !== "string" ) {
            return null;
        }
        try {
            if ( window.DOMParser ) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString( data, "text/xml" );
            } else { // IE
                xml = new ActiveXObject( "Microsoft.XMLDOM" );
                xml.async = "false";
                xml.loadXML( data );
            }
        } catch( e ) {
            xml = undefined;
        }
        if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
            jQuery.error( "Invalid XML: " + data );
        }
        return xml;
    };


    var
    // Document location
        ajaxLocParts,
        ajaxLocation,

        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
    // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
        prefilters = {},

    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
        transports = {},

    // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
    try {
        ajaxLocation = location.href;
    } catch( e ) {
        // Use the href attribute of an A element
        // since IE will modify it given document.location
        ajaxLocation = document.createElement( "a" );
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
    }

// Segment location into parts
    ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports( structure ) {

        // dataTypeExpression is optional and defaults to "*"
        return function( dataTypeExpression, func ) {

            if ( typeof dataTypeExpression !== "string" ) {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

            if ( jQuery.isFunction( func ) ) {
                // For each dataType in the dataTypeExpression
                while ( (dataType = dataTypes[i++]) ) {
                    // Prepend if requested
                    if ( dataType.charAt( 0 ) === "+" ) {
                        dataType = dataType.slice( 1 ) || "*";
                        (structure[ dataType ] = structure[ dataType ] || []).unshift( func );

                        // Otherwise append
                    } else {
                        (structure[ dataType ] = structure[ dataType ] || []).push( func );
                    }
                }
            }
        };
    }

// Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

        var inspected = {},
            seekingTransport = ( structure === transports );

        function inspect( dataType ) {
            var selected;
            inspected[ dataType ] = true;
            jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
                var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
                if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
                    options.dataTypes.unshift( dataTypeOrTransport );
                    inspect( dataTypeOrTransport );
                    return false;
                } else if ( seekingTransport ) {
                    return !( selected = dataTypeOrTransport );
                }
            });
            return selected;
        }

        return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
    }

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
    function ajaxExtend( target, src ) {
        var deep, key,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for ( key in src ) {
            if ( src[ key ] !== undefined ) {
                ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
            }
        }
        if ( deep ) {
            jQuery.extend( true, target, deep );
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses( s, jqXHR, responses ) {
        var firstDataType, ct, finalDataType, type,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while ( dataTypes[ 0 ] === "*" ) {
            dataTypes.shift();
            if ( ct === undefined ) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if ( ct ) {
            for ( type in contents ) {
                if ( contents[ type ] && contents[ type ].test( ct ) ) {
                    dataTypes.unshift( type );
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if ( dataTypes[ 0 ] in responses ) {
            finalDataType = dataTypes[ 0 ];
        } else {
            // Try convertible dataTypes
            for ( type in responses ) {
                if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
                    finalDataType = type;
                    break;
                }
                if ( !firstDataType ) {
                    firstDataType = type;
                }
            }
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if ( finalDataType ) {
            if ( finalDataType !== dataTypes[ 0 ] ) {
                dataTypes.unshift( finalDataType );
            }
            return responses[ finalDataType ];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert( s, response, jqXHR, isSuccess ) {
        var conv2, current, conv, tmp, prev,
            converters = {},
        // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if ( dataTypes[ 1 ] ) {
            for ( conv in s.converters ) {
                converters[ conv.toLowerCase() ] = s.converters[ conv ];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while ( current ) {

            if ( s.responseFields[ current ] ) {
                jqXHR[ s.responseFields[ current ] ] = response;
            }

            // Apply the dataFilter if provided
            if ( !prev && isSuccess && s.dataFilter ) {
                response = s.dataFilter( response, s.dataType );
            }

            prev = current;
            current = dataTypes.shift();

            if ( current ) {

                // There's only work to do if current dataType is non-auto
                if ( current === "*" ) {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if ( prev !== "*" && prev !== current ) {

                    // Seek a direct converter
                    conv = converters[ prev + " " + current ] || converters[ "* " + current ];

                    // If none found, seek a pair
                    if ( !conv ) {
                        for ( conv2 in converters ) {

                            // If conv2 outputs current
                            tmp = conv2.split( " " );
                            if ( tmp[ 1 ] === current ) {

                                // If prev can be converted to accepted input
                                conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                    converters[ "* " + tmp[ 0 ] ];
                                if ( conv ) {
                                    // Condense equivalence converters
                                    if ( conv === true ) {
                                        conv = converters[ conv2 ];

                                        // Otherwise, insert the intermediate dataType
                                    } else if ( converters[ conv2 ] !== true ) {
                                        current = tmp[ 0 ];
                                        dataTypes.unshift( tmp[ 1 ] );
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if ( conv !== true ) {

                        // Unless errors are allowed to bubble, catch and return them
                        if ( conv && s[ "throws" ] ) {
                            response = conv( response );
                        } else {
                            try {
                                response = conv( response );
                            } catch ( e ) {
                                return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
                            }
                        }
                    }
                }
            }
        }

        return { state: "success", data: response };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
             timeout: 0,
             data: null,
             dataType: null,
             username: null,
             password: null,
             cache: null,
             throws: false,
             traditional: false,
             headers: {},
             */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function( target, settings ) {
            return settings ?

                // Building a settings object
                ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

                // Extending ajaxSettings
                ajaxExtend( jQuery.ajaxSettings, target );
        },

        ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
        ajaxTransport: addToPrefiltersOrTransports( transports ),

        // Main method
        ajax: function( url, options ) {

            // If url is an object, simulate pre-1.5 signature
            if ( typeof url === "object" ) {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var // Cross-domain detection vars
                parts,
            // Loop variable
                i,
            // URL without anti-cache param
                cacheURL,
            // Response headers as string
                responseHeadersString,
            // timeout handle
                timeoutTimer,

            // To know if global events are to be dispatched
                fireGlobals,

                transport,
            // Response headers
                responseHeaders,
            // Create the final options object
                s = jQuery.ajaxSetup( {}, options ),
            // Callbacks context
                callbackContext = s.context || s,
            // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery( callbackContext ) :
                    jQuery.event,
            // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
            // Status-dependent callbacks
                statusCode = s.statusCode || {},
            // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
            // The jqXHR state
                state = 0,
            // Default abort message
                strAbort = "canceled",
            // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function( key ) {
                        var match;
                        if ( state === 2 ) {
                            if ( !responseHeaders ) {
                                responseHeaders = {};
                                while ( (match = rheaders.exec( responseHeadersString )) ) {
                                    responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
                                }
                            }
                            match = responseHeaders[ key.toLowerCase() ];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function( name, value ) {
                        var lname = name.toLowerCase();
                        if ( !state ) {
                            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                            requestHeaders[ name ] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function( type ) {
                        if ( !state ) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function( map ) {
                        var code;
                        if ( map ) {
                            if ( state < 2 ) {
                                for ( code in map ) {
                                    // Lazy-add the new callback in a way that preserves old ones
                                    statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
                                }
                            } else {
                                // Execute the appropriate callbacks
                                jqXHR.always( map[ jqXHR.status ] );
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function( statusText ) {
                        var finalText = statusText || strAbort;
                        if ( transport ) {
                            transport.abort( finalText );
                        }
                        done( 0, finalText );
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise( jqXHR ).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if ( s.crossDomain == null ) {
                parts = rurl.exec( s.url.toLowerCase() );
                s.crossDomain = !!( parts &&
                    ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
                        ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
                            ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
                    );
            }

            // Convert data if not already a string
            if ( s.data && s.processData && typeof s.data !== "string" ) {
                s.data = jQuery.param( s.data, s.traditional );
            }

            // Apply prefilters
            inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

            // If request was aborted inside a prefilter, stop there
            if ( state === 2 ) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            fireGlobals = s.global;

            // Watch for a new set of requests
            if ( fireGlobals && jQuery.active++ === 0 ) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test( s.type );

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;

            // More options handling for requests with no content
            if ( !s.hasContent ) {

                // If data is available, append data to url
                if ( s.data ) {
                    cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add anti-cache in url if needed
                if ( s.cache === false ) {
                    s.url = rts.test( cacheURL ) ?

                        // If there is already a '_' parameter, set its value
                        cacheURL.replace( rts, "$1_=" + nonce++ ) :

                        // Otherwise add one to the end
                        cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
                }
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if ( s.ifModified ) {
                if ( jQuery.lastModified[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
                }
                if ( jQuery.etag[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
                }
            }

            // Set the correct header, if data is being sent
            if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
                jqXHR.setRequestHeader( "Content-Type", s.contentType );
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
                    s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                    s.accepts[ "*" ]
            );

            // Check for headers option
            for ( i in s.headers ) {
                jqXHR.setRequestHeader( i, s.headers[ i ] );
            }

            // Allow custom headers/mimetypes and early abort
            if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
                // Abort if not done already and return
                return jqXHR.abort();
            }

            // aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for ( i in { success: 1, error: 1, complete: 1 } ) {
                jqXHR[ i ]( s[ i ] );
            }

            // Get transport
            transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

            // If no transport, we auto-abort
            if ( !transport ) {
                done( -1, "No Transport" );
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
                }
                // Timeout
                if ( s.async && s.timeout > 0 ) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout );
                }

                try {
                    state = 1;
                    transport.send( requestHeaders, done );
                } catch ( e ) {
                    // Propagate exception as error if not done
                    if ( state < 2 ) {
                        done( -1, e );
                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            // Callback for when everything is done
            function done( status, nativeStatusText, responses, headers ) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Called once
                if ( state === 2 ) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if ( timeoutTimer ) {
                    clearTimeout( timeoutTimer );
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if ( responses ) {
                    response = ajaxHandleResponses( s, jqXHR, responses );
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert( s, response, jqXHR, isSuccess );

                // If successful, handle type chaining
                if ( isSuccess ) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if ( s.ifModified ) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if ( modified ) {
                            jQuery.lastModified[ cacheURL ] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if ( modified ) {
                            jQuery.etag[ cacheURL ] = modified;
                        }
                    }

                    // if no content
                    if ( status === 204 || s.type === "HEAD" ) {
                        statusText = "nocontent";

                        // if not modified
                    } else if ( status === 304 ) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if ( status || !statusText ) {
                        statusText = "error";
                        if ( status < 0 ) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";

                // Success/Error
                if ( isSuccess ) {
                    deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
                } else {
                    deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
                }

                // Status-dependent callbacks
                jqXHR.statusCode( statusCode );
                statusCode = undefined;

                if ( fireGlobals ) {
                    globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
                        [ jqXHR, s, isSuccess ? success : error ] );
                }

                // Complete
                completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
                    // Handle the global AJAX counter
                    if ( !( --jQuery.active ) ) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function( url, data, callback ) {
            return jQuery.get( url, data, callback, "json" );
        },

        getScript: function( url, callback ) {
            return jQuery.get( url, undefined, callback, "script" );
        }
    });

    jQuery.each( [ "get", "post" ], function( i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {
            // shift arguments if data argument was omitted
            if ( jQuery.isFunction( data ) ) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });

// Attach a bunch of functions for handling common AJAX events
    jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
        jQuery.fn[ type ] = function( fn ) {
            return this.on( type, fn );
        };
    });


    jQuery._evalUrl = function( url ) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        });
    };


    jQuery.fn.extend({
        wrapAll: function( html ) {
            if ( jQuery.isFunction( html ) ) {
                return this.each(function(i) {
                    jQuery(this).wrapAll( html.call(this, i) );
                });
            }

            if ( this[0] ) {
                // The elements to wrap the target around
                var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

                if ( this[0].parentNode ) {
                    wrap.insertBefore( this[0] );
                }

                wrap.map(function() {
                    var elem = this;

                    while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
                        elem = elem.firstChild;
                    }

                    return elem;
                }).append( this );
            }

            return this;
        },

        wrapInner: function( html ) {
            if ( jQuery.isFunction( html ) ) {
                return this.each(function(i) {
                    jQuery(this).wrapInner( html.call(this, i) );
                });
            }

            return this.each(function() {
                var self = jQuery( this ),
                    contents = self.contents();

                if ( contents.length ) {
                    contents.wrapAll( html );

                } else {
                    self.append( html );
                }
            });
        },

        wrap: function( html ) {
            var isFunction = jQuery.isFunction( html );

            return this.each(function(i) {
                jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
            });
        },

        unwrap: function() {
            return this.parent().each(function() {
                if ( !jQuery.nodeName( this, "body" ) ) {
                    jQuery( this ).replaceWith( this.childNodes );
                }
            }).end();
        }
    });


    jQuery.expr.filters.hidden = function( elem ) {
        // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
            (!support.reliableHiddenOffsets() &&
                ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
    };

    jQuery.expr.filters.visible = function( elem ) {
        return !jQuery.expr.filters.hidden( elem );
    };




    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams( prefix, obj, traditional, add ) {
        var name;

        if ( jQuery.isArray( obj ) ) {
            // Serialize array item.
            jQuery.each( obj, function( i, v ) {
                if ( traditional || rbracket.test( prefix ) ) {
                    // Treat each array item as a scalar.
                    add( prefix, v );

                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
                }
            });

        } else if ( !traditional && jQuery.type( obj ) === "object" ) {
            // Serialize object item.
            for ( name in obj ) {
                buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
            }

        } else {
            // Serialize scalar item.
            add( prefix, obj );
        }
    }

// Serialize an array of form elements or a set of
// key/values into a query string
    jQuery.param = function( a, traditional ) {
        var prefix,
            s = [],
            add = function( key, value ) {
                // If value is a function, invoke it and return its value
                value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
                s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if ( traditional === undefined ) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
            // Serialize the form elements
            jQuery.each( a, function() {
                add( this.name, this.value );
            });

        } else {
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for ( prefix in a ) {
                buildParams( prefix, a[ prefix ], traditional, add );
            }
        }

        // Return the resulting serialization
        return s.join( "&" ).replace( r20, "+" );
    };

    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param( this.serializeArray() );
        },
        serializeArray: function() {
            return this.map(function() {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop( this, "elements" );
                return elements ? jQuery.makeArray( elements ) : this;
            })
                .filter(function() {
                    var type = this.type;
                    // Use .is(":disabled") so that fieldset[disabled] works
                    return this.name && !jQuery( this ).is( ":disabled" ) &&
                        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
                        ( this.checked || !rcheckableType.test( type ) );
                })
                .map(function( i, elem ) {
                    var val = jQuery( this ).val();

                    return val == null ?
                        null :
                        jQuery.isArray( val ) ?
                            jQuery.map( val, function( val ) {
                                return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                            }) :
                        { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                }).get();
        }
    });


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
        // Support: IE6+
        function() {

            // XHR cannot access local files, always use ActiveX for that case
            return !this.isLocal &&

                // Support: IE7-8
                // oldIE XHR does not support non-RFC2616 methods (#13240)
                // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
                // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
                // Although this check for six methods instead of eight
                // since IE also does not support "trace" and "connect"
                /^(get|post|head|put|delete|options)$/i.test( this.type ) &&

                createStandardXHR() || createActiveXHR();
        } :
        // For all other browsers, use the standard XMLHttpRequest object
        createStandardXHR;

    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
    if ( window.ActiveXObject ) {
        jQuery( window ).on( "unload", function() {
            for ( var key in xhrCallbacks ) {
                xhrCallbacks[ key ]( undefined, true );
            }
        });
    }

// Determine support properties
    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
    if ( xhrSupported ) {

        jQuery.ajaxTransport(function( options ) {
            // Cross domain only allowed if supported through XMLHttpRequest
            if ( !options.crossDomain || support.cors ) {

                var callback;

                return {
                    send: function( headers, complete ) {
                        var i,
                            xhr = options.xhr(),
                            id = ++xhrId;

                        // Open the socket
                        xhr.open( options.type, options.url, options.async, options.username, options.password );

                        // Apply custom fields if provided
                        if ( options.xhrFields ) {
                            for ( i in options.xhrFields ) {
                                xhr[ i ] = options.xhrFields[ i ];
                            }
                        }

                        // Override mime type if needed
                        if ( options.mimeType && xhr.overrideMimeType ) {
                            xhr.overrideMimeType( options.mimeType );
                        }

                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if ( !options.crossDomain && !headers["X-Requested-With"] ) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }

                        // Set headers
                        for ( i in headers ) {
                            // Support: IE<9
                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                            // request header to a null-value.
                            //
                            // To keep consistent with other XHR implementations, cast the value
                            // to string and ignore `undefined`.
                            if ( headers[ i ] !== undefined ) {
                                xhr.setRequestHeader( i, headers[ i ] + "" );
                            }
                        }

                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send( ( options.hasContent && options.data ) || null );

                        // Listener
                        callback = function( _, isAbort ) {
                            var status, statusText, responses;

                            // Was never called and is aborted or complete
                            if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
                                // Clean up
                                delete xhrCallbacks[ id ];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;

                                // Abort manually if needed
                                if ( isAbort ) {
                                    if ( xhr.readyState !== 4 ) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;

                                    // Support: IE<10
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    if ( typeof xhr.responseText === "string" ) {
                                        responses.text = xhr.responseText;
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch( e ) {
                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if ( !status && options.isLocal && !options.crossDomain ) {
                                        status = responses.text ? 200 : 404;
                                        // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else if ( status === 1223 ) {
                                        status = 204;
                                    }
                                }
                            }

                            // Call complete if needed
                            if ( responses ) {
                                complete( status, statusText, responses, xhr.getAllResponseHeaders() );
                            }
                        };

                        if ( !options.async ) {
                            // if we're in sync mode we fire the callback
                            callback();
                        } else if ( xhr.readyState === 4 ) {
                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            setTimeout( callback );
                        } else {
                            // Add to the list of active xhr callbacks
                            xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
                        }
                    },

                    abort: function() {
                        if ( callback ) {
                            callback( undefined, true );
                        }
                    }
                };
            }
        });
    }

// Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch( e ) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject( "Microsoft.XMLHTTP" );
        } catch( e ) {}
    }




// Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function( text ) {
                jQuery.globalEval( text );
                return text;
            }
        }
    });

// Handle cache's special case and global
    jQuery.ajaxPrefilter( "script", function( s ) {
        if ( s.cache === undefined ) {
            s.cache = false;
        }
        if ( s.crossDomain ) {
            s.type = "GET";
            s.global = false;
        }
    });

// Bind script tag hack transport
    jQuery.ajaxTransport( "script", function(s) {

        // This transport only deals with cross domain requests
        if ( s.crossDomain ) {

            var script,
                head = document.head || jQuery("head")[0] || document.documentElement;

            return {

                send: function( _, callback ) {

                    script = document.createElement("script");

                    script.async = true;

                    if ( s.scriptCharset ) {
                        script.charset = s.scriptCharset;
                    }

                    script.src = s.url;

                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function( _, isAbort ) {

                        if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if ( script.parentNode ) {
                                script.parentNode.removeChild( script );
                            }

                            // Dereference the script
                            script = null;

                            // Callback if not abort
                            if ( !isAbort ) {
                                callback( 200, "success" );
                            }
                        }
                    };

                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    head.insertBefore( script, head.firstChild );
                },

                abort: function() {
                    if ( script ) {
                        script.onload( undefined, true );
                    }
                }
            };
        }
    });




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
            this[ callback ] = true;
            return callback;
        }
    });

// Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
                "url" :
                typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
                );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if ( jsonProp ) {
                s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
            } else if ( s.jsonp !== false ) {
                s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function() {
                if ( !responseContainer ) {
                    jQuery.error( callbackName + " was not called" );
                }
                return responseContainer[ 0 ];
            };

            // force json dataType
            s.dataTypes[ 0 ] = "json";

            // Install callback
            overwritten = window[ callbackName ];
            window[ callbackName ] = function() {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function() {
                // Restore preexisting value
                window[ callbackName ] = overwritten;

                // Save back as free
                if ( s[ callbackName ] ) {
                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push( callbackName );
                }

                // Call if it was a function and we have a response
                if ( responseContainer && jQuery.isFunction( overwritten ) ) {
                    overwritten( responseContainer[ 0 ] );
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function( data, context, keepScripts ) {
        if ( !data || typeof data !== "string" ) {
            return null;
        }
        if ( typeof context === "boolean" ) {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec( data ),
            scripts = !keepScripts && [];

        // Single tag
        if ( parsed ) {
            return [ context.createElement( parsed[1] ) ];
        }

        parsed = jQuery.buildFragment( [ data ], context, scripts );

        if ( scripts && scripts.length ) {
            jQuery( scripts ).remove();
        }

        return jQuery.merge( [], parsed.childNodes );
    };


// Keep a copy of the old load method
    var _load = jQuery.fn.load;

    /**
     * Load a url into a page
     */
    jQuery.fn.load = function( url, params, callback ) {
        if ( typeof url !== "string" && _load ) {
            return _load.apply( this, arguments );
        }

        var selector, response, type,
            self = this,
            off = url.indexOf(" ");

        if ( off >= 0 ) {
            selector = url.slice( off, url.length );
            url = url.slice( 0, off );
        }

        // If it's a function
        if ( jQuery.isFunction( params ) ) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if ( params && typeof params === "object" ) {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if ( self.length > 0 ) {
            jQuery.ajax({
                url: url,

                // if "type" variable is undefined, then "GET" method will be used
                type: type,
                dataType: "html",
                data: params
            }).done(function( responseText ) {

                    // Save response for use in complete callback
                    response = arguments;

                    self.html( selector ?

                        // If a selector was specified, locate the right elements in a dummy div
                        // Exclude scripts to avoid IE 'Permission Denied' errors
                        jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

                        // Otherwise use the full result
                        responseText );

                }).complete( callback && function( jqXHR, status ) {
                    self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
                });
        }

        return this;
    };




    jQuery.expr.filters.animated = function( elem ) {
        return jQuery.grep(jQuery.timers, function( fn ) {
            return elem === fn.elem;
        }).length;
    };





    var docElem = window.document.documentElement;

    /**
     * Gets a window from an element
     */
    function getWindow( elem ) {
        return jQuery.isWindow( elem ) ?
            elem :
            elem.nodeType === 9 ?
                elem.defaultView || elem.parentWindow :
                false;
    }

    jQuery.offset = {
        setOffset: function( elem, options, i ) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css( elem, "position" ),
                curElem = jQuery( elem ),
                props = {};

            // set position first, in-case top/left are set even on static elem
            if ( position === "static" ) {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css( elem, "top" );
            curCSSLeft = jQuery.css( elem, "left" );
            calculatePosition = ( position === "absolute" || position === "fixed" ) &&
                jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

            // need to be able to calculate position if either top or left is auto and position is either absolute or fixed
            if ( calculatePosition ) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat( curCSSTop ) || 0;
                curLeft = parseFloat( curCSSLeft ) || 0;
            }

            if ( jQuery.isFunction( options ) ) {
                options = options.call( elem, i, curOffset );
            }

            if ( options.top != null ) {
                props.top = ( options.top - curOffset.top ) + curTop;
            }
            if ( options.left != null ) {
                props.left = ( options.left - curOffset.left ) + curLeft;
            }

            if ( "using" in options ) {
                options.using.call( elem, props );
            } else {
                curElem.css( props );
            }
        }
    };

    jQuery.fn.extend({
        offset: function( options ) {
            if ( arguments.length ) {
                return options === undefined ?
                    this :
                    this.each(function( i ) {
                        jQuery.offset.setOffset( this, options, i );
                    });
            }

            var docElem, win,
                box = { top: 0, left: 0 },
                elem = this[ 0 ],
                doc = elem && elem.ownerDocument;

            if ( !doc ) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            if ( !jQuery.contains( docElem, elem ) ) {
                return box;
            }

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            if ( typeof elem.getBoundingClientRect !== strundefined ) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow( doc );
            return {
                top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
                left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
            };
        },

        position: function() {
            if ( !this[ 0 ] ) {
                return;
            }

            var offsetParent, offset,
                parentOffset = { top: 0, left: 0 },
                elem = this[ 0 ];

            // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
            if ( jQuery.css( elem, "position" ) === "fixed" ) {
                // we assume that getBoundingClientRect is available when computed position is fixed
                offset = elem.getBoundingClientRect();
            } else {
                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
                    parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
                parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
            }

            // Subtract parent offsets and element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            return {
                top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
                left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
            };
        },

        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;

                while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElem;
            });
        }
    });

// Create scrollLeft and scrollTop methods
    jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
        var top = /Y/.test( prop );

        jQuery.fn[ method ] = function( val ) {
            return access( this, function( elem, method, val ) {
                var win = getWindow( elem );

                if ( val === undefined ) {
                    return win ? (prop in win) ? win[ prop ] :
                        win.document.documentElement[ method ] :
                        elem[ method ];
                }

                if ( win ) {
                    win.scrollTo(
                        !top ? val : jQuery( win ).scrollLeft(),
                        top ? val : jQuery( win ).scrollTop()
                    );

                } else {
                    elem[ method ] = val;
                }
            }, method, val, arguments.length, null );
        };
    });

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
    jQuery.each( [ "top", "left" ], function( i, prop ) {
        jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
            function( elem, computed ) {
                if ( computed ) {
                    computed = curCSS( elem, prop );
                    // if curCSS returns percentage, fallback to offset
                    return rnumnonpx.test( computed ) ?
                        jQuery( elem ).position()[ prop ] + "px" :
                        computed;
                }
            }
        );
    });


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
        jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
            // margin is only for outerHeight, outerWidth
            jQuery.fn[ funcName ] = function( margin, value ) {
                var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                    extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

                return access( this, function( elem, type, value ) {
                    var doc;

                    if ( jQuery.isWindow( elem ) ) {
                        // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                        // https://github.com/jquery/jquery/pull/764
                        return elem.document.documentElement[ "client" + name ];
                    }

                    // Get document width or height
                    if ( elem.nodeType === 9 ) {
                        doc = elem.documentElement;

                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
                        // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
                        return Math.max(
                            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                            elem.body[ "offset" + name ], doc[ "offset" + name ],
                            doc[ "client" + name ]
                        );
                    }

                    return value === undefined ?
                        // Get width or height on the element, requesting but not forcing parseFloat
                        jQuery.css( elem, type, extra ) :

                        // Set width or height on the element
                        jQuery.style( elem, type, value, extra );
                }, type, chainable ? margin : undefined, chainable, null );
            };
        });
    });


// The number of elements contained in the matched element set
    jQuery.fn.size = function() {
        return this.length;
    };

    jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
    if ( typeof define === "function" && define.amd ) {
        define( "jquery", [], function() {
            return jQuery;
        });
    }




    var
    // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

    // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
    if ( typeof noGlobal === strundefined ) {
        window.jQuery = window.$ = jQuery;
    }




    return jQuery;

}));
/*
 * jQuery JSON Plugin
 * version: 2.1 (2009-08-14)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org 
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is 
 * copyrighted 2005 by Bob Ippolito.
 */

 
(function($) {
    /** jQuery.toJSON( json-serializble )
        Converts the given argument into a JSON respresentation.

        If an object has a "toJSON" function, that will be used to get the representation.
        Non-integer/string keys are skipped in the object, as are keys that point to a function.

        json-serializble:
            The *thing* to be converted.
     **/
    $.toJSON = function(o)
    {
        if (typeof(JSON) == 'object' && JSON.stringify)
            return JSON.stringify(o);
        
        var type = typeof(o);
    
        if (o === null)
            return "null";
    
        if (type == "undefined")
            return undefined;
        
        if (type == "number" || type == "boolean")
            return o + "";
    
        if (type == "string")
            return $.quoteString(o);
    
        if (type == 'object')
        {
            if (typeof o.toJSON == "function") 
                return $.toJSON( o.toJSON() );
            
            if (o.constructor === Date)
            {
                var month = o.getUTCMonth() + 1;
                if (month < 10) month = '0' + month;

                var day = o.getUTCDate();
                if (day < 10) day = '0' + day;

                var year = o.getUTCFullYear();
                
                var hours = o.getUTCHours();
                if (hours < 10) hours = '0' + hours;
                
                var minutes = o.getUTCMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                
                var seconds = o.getUTCSeconds();
                if (seconds < 10) seconds = '0' + seconds;
                
                var milli = o.getUTCMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;

                return '"' + year + '-' + month + '-' + day + 'T' +
                             hours + ':' + minutes + ':' + seconds + 
                             '.' + milli + 'Z"'; 
            }

            if (o.constructor === Array) 
            {
                var ret = [];
                for (var i = 0; i < o.length; i++)
                    ret.push( $.toJSON(o[i]) || "null" );

                return "[" + ret.join(",") + "]";
            }
        
            var pairs = [];
            for (var k in o) {
                var name;
                var type = typeof k;

                if (type == "number")
                    name = '"' + k + '"';
                else if (type == "string")
                    name = $.quoteString(k);
                else
                    continue;  //skip non-string or number keys
            
                if (typeof o[k] == "function") 
                    continue;  //skip pairs where the value is a function.
            
                var val = $.toJSON(o[k]);
            
                pairs.push(name + ":" + val);
            }

            return "{" + pairs.join(", ") + "}";
        }
    };

    /** jQuery.evalJSON(src)
        Evaluates a given piece of json source.
     **/
    $.evalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        return eval("(" + src + ")");
    };
    
    /** jQuery.secureEvalJSON(src)
        Evals JSON in a way that is *more* secure.
    **/
    $.secureEvalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };

    /** jQuery.quoteString(string)
        Returns a string-repr of a string, escaping quotes intelligently.  
        Mostly a support function for toJSON.
    
        Examples:
            >>> jQuery.quoteString("apple")
            "apple"
        
            >>> jQuery.quoteString('"Where are we going?", she asked.')
            "\"Where are we going?\", she asked."
     **/
    $.quoteString = function(string)
    {
        if (string.match(_escapeable))
        {
            return '"' + string.replace(_escapeable, function (a) 
            {
                var c = _meta[a];
                if (typeof c === 'string') return c;
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    
    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    
    var _meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };
})(jQuery);
/*
 Highcharts JS v3.0.9 (2014-01-15)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
*/

(function(){function r(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function x(){var a,b=arguments,c,d={},e=function(a,b){var c,d;typeof a!=="object"&&(a={});for(d in b)b.hasOwnProperty(d)&&(c=b[d],a[d]=c&&typeof c==="object"&&Object.prototype.toString.call(c)!=="[object Array]"&&typeof c.nodeType!=="number"?e(a[d]||{},c):b[d]);return a};b[0]===!0&&(d=b[1],b=Array.prototype.slice.call(b,2));c=b.length;for(a=0;a<c;a++)d=e(d,b[a]);return d}function z(a,b){return parseInt(a,b||10)}function fa(a){return typeof a===
"string"}function S(a){return typeof a==="object"}function Ka(a){return Object.prototype.toString.call(a)==="[object Array]"}function wa(a){return typeof a==="number"}function xa(a){return P.log(a)/P.LN10}function ga(a){return P.pow(10,a)}function ha(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function t(a){return a!==u&&a!==null}function v(a,b,c){var d,e;if(fa(b))t(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(t(b)&&S(b))for(d in b)a.setAttribute(d,b[d]);
return e}function ja(a){return Ka(a)?a:[a]}function n(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],typeof c!=="undefined"&&c!==null)return c}function D(a,b){if(ya&&b&&b.opacity!==u)b.filter="alpha(opacity="+b.opacity*100+")";r(a.style,b)}function T(a,b,c,d,e){a=y.createElement(a);b&&r(a,b);e&&D(a,{padding:0,border:Q,margin:0});c&&D(a,c);d&&d.appendChild(a);return a}function ia(a,b){var c=function(){};c.prototype=new a;r(c.prototype,b);return c}function Da(a,b,c,d){var e=G.lang,a=+a||
0,f=b===-1?(a.toString().split(".")[1]||"").length:isNaN(b=M(b))?2:b,b=c===void 0?e.decimalPoint:c,d=d===void 0?e.thousandsSep:d,e=a<0?"-":"",c=String(z(a=M(a).toFixed(f))),g=c.length>3?c.length%3:0;return e+(g?c.substr(0,g)+d:"")+c.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+d)+(f?b+M(a-c).toFixed(f).slice(2):"")}function Ea(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function Va(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,
a)}}function Fa(a,b){for(var c="{",d=!1,e,f,g,h,i,j=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++)e=e[g[h]];if(f.length)f=f.join(":"),g=/\.([0-9])/,h=G.lang,i=void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e=Da(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:"")):e=ab(f,e)}j.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}j.push(a);return j.join("")}function mb(a){return P.pow(10,N(P.log(a)/P.LN10))}function nb(a,b,c,d){var e,c=n(c,
1);e=a/c;b||(b=[1,2,2.5,5,10],d&&d.allowDecimals===!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(a=b[d],e<=(b[d]+(b[d+1]||b[d]))/2)break;a*=c;return a}function Ab(){this.symbol=this.color=0}function ob(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].ss_i=e;a.sort(function(a,c){d=b(a,c);return d===0?a.ss_i-c.ss_i:d});for(e=0;e<c;e++)delete a[e].ss_i}function La(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function za(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=
a[b]);return c}function Ma(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Na(a){bb||(bb=T(Ga));a&&bb.appendChild(a);bb.innerHTML=""}function ka(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw c;else C.console&&console.log(c)}function aa(a){return parseFloat(a.toPrecision(14))}function Oa(a,b){oa=n(a,b.animation)}function Bb(){var a=G.global.useUTC,b=a?"getUTC":"get",c=a?"setUTC":"set";Pa=(a&&G.global.timezoneOffset||0)*6E4;cb=a?
Date.UTC:function(a,b,c,g,h,i){return(new Date(a,b,n(c,1),n(g,0),n(h,0),n(i,0))).getTime()};pb=b+"Minutes";qb=b+"Hours";rb=b+"Day";Wa=b+"Date";db=b+"Month";eb=b+"FullYear";Cb=c+"Minutes";Db=c+"Hours";sb=c+"Date";Eb=c+"Month";Fb=c+"FullYear"}function pa(){}function Qa(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel()}function qa(){this.init.apply(this,arguments)}function Gb(a,b,c,d,e,f){var g=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;
this.total=null;this.points={};this.stack=e;this.percent=f==="percent";this.alignOptions={align:b.align||(g?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(g?"middle":c?"bottom":"top"),y:n(b.y,g?4:c?14:-6),x:n(b.x,g?c?-6:6:0)};this.textAlign=b.textAlign||(g?c?"right":"left":"center")}function tb(){this.init.apply(this,arguments)}function fb(){this.init.apply(this,arguments)}var u,y=document,C=window,P=Math,w=P.round,N=P.floor,Ha=P.ceil,s=P.max,I=P.min,M=P.abs,U=P.cos,ba=P.sin,Aa=P.PI,Ba=
Aa*2/360,ra=navigator.userAgent,Hb=C.opera,ya=/msie/i.test(ra)&&!Hb,gb=y.documentMode===8,hb=/AppleWebKit/.test(ra),Xa=/Firefox/.test(ra),Ib=/(Mobile|Android|Windows Phone)/.test(ra),Ca="http://www.w3.org/2000/svg",V=!!y.createElementNS&&!!y.createElementNS(Ca,"svg").createSVGRect,Nb=Xa&&parseInt(ra.split("Firefox/")[1],10)<4,da=!V&&!ya&&!!y.createElement("canvas").getContext,Ya,ib=y.documentElement.ontouchstart!==u,Jb={},ub=0,bb,G,ab,oa,vb,E,la=function(){},Ia=[],Ga="div",Q="none",Ob=/^[0-9]+$/,
Kb="rgba(192,192,192,"+(V?1.0E-4:0.002)+")",Lb="stroke-width",cb,Pa,pb,qb,rb,Wa,db,eb,Cb,Db,sb,Eb,Fb,L={};C.Highcharts=C.Highcharts?ka(16,!0):{};ab=function(a,b,c){if(!t(b)||isNaN(b))return"Invalid date";var a=n(a,"%Y-%m-%d %H:%M:%S"),d=new Date(b-Pa),e,f=d[qb](),g=d[rb](),h=d[Wa](),i=d[db](),j=d[eb](),k=G.lang,l=k.weekdays,d=r({a:l[g].substr(0,3),A:l[g],d:Ea(h),e:h,b:k.shortMonths[i],B:k.months[i],m:Ea(i+1),y:j.toString().substr(2,2),Y:j,H:Ea(f),I:Ea(f%12||12),l:f%12||12,M:Ea(d[pb]()),p:f<12?"AM":
"PM",P:f<12?"am":"pm",S:Ea(d.getSeconds()),L:Ea(w(b%1E3),3)},Highcharts.dateFormats);for(e in d)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,typeof d[e]==="function"?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+a.substr(1):a};Ab.prototype={wrapColor:function(a){if(this.color>=a)this.color=0},wrapSymbol:function(a){if(this.symbol>=a)this.symbol=0}};E=function(){for(var a=0,b=arguments,c=b.length,d={};a<c;a++)d[b[a++]]=b[a];return d}("millisecond",1,"second",1E3,"minute",6E4,"hour",36E5,"day",
864E5,"week",6048E5,"month",26784E5,"year",31556952E3);vb={init:function(a,b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h,i,j=function(a){for(g=a.length;g--;)a[g]==="M"&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&(j(b),j(c));a.isArea&&(h=b.splice(b.length-6,6),i=c.splice(c.length-6,6));if(d<=c.length/f&&b.length===c.length)for(;d--;)c=[].concat(c).splice(0,f).concat(c);a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=[].concat(b).splice(b.length-f,
f),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),b=b.concat(d);h&&(b=b.concat(h),c=c.concat(i));return[b,c]},step:function(a,b,c,d){var e=[],f=a.length;if(c===1)e=d;else if(f===b.length&&c<1)for(;f--;)d=parseFloat(a[f]),e[f]=isNaN(d)?a[f]:c*parseFloat(b[f]-d)+d;else e=b;return e}};(function(a){C.HighchartsAdapter=C.HighchartsAdapter||a&&{init:function(b){var c=a.fx,d=c.step,e,f=a.Tween,g=f&&f.propHooks;e=a.cssHooks.opacity;a.extend(a.easing,{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}});a.each(["cur",
"_default","width","height","opacity"],function(a,b){var e=d,k;b==="cur"?e=c.prototype:b==="_default"&&f&&(e=g[b],b="set");(k=e[b])&&(e[b]=function(c){var d,c=a?c:this;if(c.prop!=="align")return d=c.elem,d.attr?d.attr(c.prop,b==="cur"?u:c.now):k.apply(this,arguments)})});Va(e,"get",function(a,b,c){return b.attr?b.opacity||0:a.call(this,b,c)});e=function(a){var c=a.elem,d;if(!a.started)d=b.init(c,c.d,c.toD),a.start=d[0],a.end=d[1],a.started=!0;c.attr("d",b.step(a.start,a.end,a.pos,c.toD))};f?g.d={set:e}:
d.d=e;this.each=Array.prototype.forEach?function(a,b){return Array.prototype.forEach.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===!1)return c};a.fn.highcharts=function(){var a="Chart",b=arguments,c,d;fa(b[0])&&(a=b[0],b=Array.prototype.slice.call(b,1));c=b[0];if(c!==u)c.chart=c.chart||{},c.chart.renderTo=this[0],new Highcharts[a](c,b[1]),d=this;c===u&&(d=Ia[v(this[0],"data-highcharts-chart")]);return d}},getScript:a.getScript,inArray:a.inArray,adapterRun:function(b,
c){return a(b)[c]()},grep:a.grep,map:function(a,c){for(var d=[],e=0,f=a.length;e<f;e++)d[e]=c.call(a[e],a[e],e,a);return d},offset:function(b){return a(b).offset()},addEvent:function(b,c,d){a(b).bind(c,d)},removeEvent:function(b,c,d){var e=y.removeEventListener?"removeEventListener":"detachEvent";y[e]&&b&&!b[e]&&(b[e]=function(){});a(b).unbind(c,d)},fireEvent:function(b,c,d,e){var f=a.Event(c),g="detached"+c,h;!ya&&d&&(delete d.layerX,delete d.layerY);r(f,d);b[c]&&(b[g]=b[c],b[c]=null);a.each(["preventDefault",
"stopPropagation"],function(a,b){var c=f[b];f[b]=function(){try{c.call(f)}catch(a){b==="preventDefault"&&(h=!0)}}});a(b).trigger(f);b[g]&&(b[c]=b[g],b[g]=null);e&&!f.isDefaultPrevented()&&!h&&e(f)},washMouseEvent:function(a){var c=a.originalEvent||a;if(c.pageX===u)c.pageX=a.pageX,c.pageY=a.pageY;return c},animate:function(b,c,d){var e=a(b);if(!b.style)b.style={};if(c.d)b.toD=c.d,c.d=1;e.stop();c.opacity!==u&&b.attr&&(c.opacity+="px");e.animate(c,d)},stop:function(b){a(b).stop()}}})(C.jQuery);var W=
C.HighchartsAdapter,J=W||{};W&&W.init.call(W,vb);var jb=J.adapterRun,Pb=J.getScript,sa=J.inArray,p=J.each,wb=J.grep,Qb=J.offset,Ra=J.map,F=J.addEvent,X=J.removeEvent,A=J.fireEvent,Rb=J.washMouseEvent,kb=J.animate,Za=J.stop,J={enabled:!0,x:0,y:15,style:{color:"#666",cursor:"default",fontSize:"11px"}};G={colors:"#2f7ed8,#0d233a,#8bbc21,#910000,#1aadce,#492970,#f28f43,#77a1e5,#c42525,#a6c96a".split(","),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),
shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:!0,canvasToolsURL:"http://code.highcharts.com/3.0.9/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/3.0.9/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:5,
defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',fontSize:"12px"},backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#274b6d",fontSize:"16px"}},subtitle:{text:"",align:"center",style:{color:"#4d759e"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,
animation:{duration:1E3},events:{},lineWidth:2,marker:{enabled:!0,lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:x(J,{align:"center",enabled:!1,formatter:function(){return this.y===null?"":Da(this.y,-1)},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,states:{hover:{marker:{}},select:{marker:{}}},stickyTracking:!0,turboThreshold:1E3}},labels:{style:{position:"absolute",color:"#3E576F"}},
legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderWidth:1,borderColor:"#909090",borderRadius:5,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:!1,itemStyle:{cursor:"pointer",color:"#274b6d",fontSize:"12px"},itemHoverStyle:{color:"#000"},itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",
position:"relative",top:"1em"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:V,backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',
pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',shadow:!0,snap:Ib?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"Highcharts.com",href:"http://www.highcharts.com",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var Y=G.plotOptions,W=Y.line;Bb();var Sb=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
Tb=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,Ub=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,ta=function(a){var b=[],c,d;(function(a){a&&a.stops?d=Ra(a.stops,function(a){return ta(a[1])}):(c=Sb.exec(a))?b=[z(c[1]),z(c[2]),z(c[3]),parseFloat(c[4],10)]:(c=Tb.exec(a))?b=[z(c[1],16),z(c[2],16),z(c[3],16),1]:(c=Ub.exec(a))&&(b=[z(c[1]),z(c[2]),z(c[3]),1])})(a);return{get:function(c){var f;d?(f=x(a),f.stops=[].concat(f.stops),p(d,function(a,b){f.stops[b]=[f.stops[b][0],a.get(c)]})):
f=b&&!isNaN(b[0])?c==="rgb"?"rgb("+b[0]+","+b[1]+","+b[2]+")":c==="a"?b[3]:"rgba("+b.join(",")+")":a;return f},brighten:function(a){if(d)p(d,function(b){b.brighten(a)});else if(wa(a)&&a!==0){var c;for(c=0;c<3;c++)b[c]+=z(a*255),b[c]<0&&(b[c]=0),b[c]>255&&(b[c]=255)}return this},rgba:b,setOpacity:function(a){b[3]=a;return this}}};pa.prototype={init:function(a,b){this.element=b==="span"?T(b):y.createElementNS(Ca,b);this.renderer=a;this.attrSetters={}},opacity:1,animate:function(a,b,c){b=n(b,oa,!0);
Za(this);if(b){b=x(b);if(c)b.complete=c;kb(this,a,b)}else this.attr(a),c&&c()},attr:function(a,b){var c,d,e,f,g=this.element,h=g.nodeName.toLowerCase(),i=this.renderer,j,k=this.attrSetters,l=this.shadows,m,q,o=this;fa(a)&&t(b)&&(c=a,a={},a[c]=b);if(fa(a))c=a,h==="circle"?c={x:"cx",y:"cy"}[c]||c:c==="strokeWidth"&&(c="stroke-width"),o=v(g,c)||this[c]||0,c!=="d"&&c!=="visibility"&&c!=="fill"&&(o=parseFloat(o));else{for(c in a)if(j=!1,d=a[c],e=k[c]&&k[c].call(this,d,c),e!==!1){e!==u&&(d=e);if(c==="d")d&&
d.join&&(d=d.join(" ")),/(NaN| {2}|^$)/.test(d)&&(d="M 0 0");else if(c==="x"&&h==="text")for(e=0;e<g.childNodes.length;e++)f=g.childNodes[e],v(f,"x")===v(g,"x")&&v(f,"x",d);else if(this.rotation&&(c==="x"||c==="y"))q=!0;else if(c==="fill")d=i.color(d,g,c);else if(h==="circle"&&(c==="x"||c==="y"))c={x:"cx",y:"cy"}[c]||c;else if(h==="rect"&&c==="r")v(g,{rx:d,ry:d}),j=!0;else if(c==="translateX"||c==="translateY"||c==="rotation"||c==="verticalAlign"||c==="scaleX"||c==="scaleY")j=q=!0;else if(c==="stroke")d=
i.color(d,g,c);else if(c==="dashstyle")if(c="stroke-dasharray",d=d&&d.toLowerCase(),d==="solid")d=Q;else{if(d){d=d.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(e=d.length;e--;)d[e]=z(d[e])*n(a["stroke-width"],this["stroke-width"]);d=d.join(",")}}else if(c==="width")d=z(d);else if(c==="align")c="text-anchor",d=
{left:"start",center:"middle",right:"end"}[d];else if(c==="title")e=g.getElementsByTagName("title")[0],e||(e=y.createElementNS(Ca,"title"),g.appendChild(e)),e.textContent=d;c==="strokeWidth"&&(c="stroke-width");if(c==="stroke-width"||c==="stroke"){this[c]=d;if(this.stroke&&this["stroke-width"])v(g,"stroke",this.stroke),v(g,"stroke-width",this["stroke-width"]),this.hasStroke=!0;else if(c==="stroke-width"&&d===0&&this.hasStroke)g.removeAttribute("stroke"),this.hasStroke=!1;j=!0}this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&
(m||(this.symbolAttr(a),m=!0),j=!0);if(l&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c))for(e=l.length;e--;)v(l[e],c,c==="height"?s(d-(l[e].cutHeight||0),0):d);if((c==="width"||c==="height")&&h==="rect"&&d<0)d=0;this[c]=d;c==="text"?(d!==this.textStr&&delete this.bBox,this.textStr=d,this.added&&i.buildText(this)):j||v(g,c,d)}q&&this.updateTransform()}return o},addClass:function(a){var b=this.element,c=v(b,"class")||"";c.indexOf(a)===-1&&v(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=
this;p("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=n(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":Q)},crisp:function(a,b,c,d,e){var f,g={},h={},i,a=a||this.strokeWidth||this.attr&&this.attr("stroke-width")||0;i=w(a)%2/2;h.x=N(b||this.x||0)+i;h.y=N(c||this.y||0)+i;h.width=N((d||this.width||0)-2*i);h.height=N((e||this.height||0)-2*i);h.strokeWidth=
a;for(f in h)this[f]!==h[f]&&(this[f]=g[f]=h[f]);return g},css:function(a){var b=this.element,c=this.textWidth=a&&a.width&&b.nodeName.toLowerCase()==="text"&&z(a.width),d,e="",f=function(a,b){return"-"+b.toLowerCase()};if(a&&a.color)a.fill=a.color;this.styles=a=r(this.styles,a);c&&delete a.width;if(ya&&!V)D(this.element,a);else{for(d in a)e+=d.replace(/([A-Z])/g,f)+":"+a[d]+";";v(b,"style",e)}c&&this.added&&this.renderer.buildText(this);return this},on:function(a,b){var c=this,d=c.element;ib&&a===
"click"?(d.ontouchstart=function(a){c.touchEventFired=Date.now();a.preventDefault();b.call(d,a)},d.onclick=function(a){(ra.indexOf("Android")===-1||Date.now()-(c.touchEventFired||0)>1100)&&b.call(d,a)}):d["on"+a]=b;return this},setRadialReference:function(a){this.element.radialReference=a;return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,b=this.translateY||
0,c=this.scaleX,d=this.scaleY,e=this.inverted,f=this.rotation;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(this.x||0)+" "+(this.y||0)+")");(t(c)||t(d))&&a.push("scale("+n(c,1)+" "+n(d,1)+")");a.length&&v(this.element,"transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,e,f,g,h={};e=this.renderer;f=e.alignedObjects;if(a){if(this.alignOptions=
a,this.alignByTranslate=b,!c||fa(c))this.alignTo=d=c||"renderer",ha(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=n(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||0)+(a.x||0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=w(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=w(g);this[this.placed?"animate":"attr"](h);this.placed=
!0;this.alignAttr=h;return this},getBBox:function(){var a=this.bBox,b=this.renderer,c,d,e=this.rotation;c=this.element;var f=this.styles,g=e*Ba;d=this.textStr;var h;if(d===""||Ob.test(d))h=d.length+"|"+f.fontSize+"|"+f.fontFamily,a=b.cache[h];if(!a){if(c.namespaceURI===Ca||b.forExport){try{a=c.getBBox?r({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight}}catch(i){}if(!a||a.width<0)a={width:0,height:0}}else a=this.htmlGetBBox();if(b.isSVG){c=a.width;d=a.height;if(ya&&f&&f.fontSize==="11px"&&
d.toPrecision(3)==="16.9")a.height=d=14;if(e)a.width=M(d*ba(g))+M(c*U(g)),a.height=M(d*U(g))+M(c*ba(g))}this.bBox=a;h&&(b.cache[h]=a)}return a},show:function(){return this.attr({visibility:"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.hide()}})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,e=d.childNodes,f=this.element,g=v(f,"zIndex"),h;if(a)this.parentGroup=a;this.parentInverted=
a&&a.inverted;this.textStr!==void 0&&b.buildText(this);if(g)c.handleZ=!0,g=z(g);if(c.handleZ)for(c=0;c<e.length;c++)if(a=e[c],b=v(a,"zIndex"),a!==f&&(z(b)>g||!t(g)&&t(b))){d.insertBefore(f,a);h=!0;break}h||d.appendChild(f);this.added=!0;A(this,"add");return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&a.parentGroup,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=
null;Za(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&p(c,function(b){a.safeRemoveChild(b)});d&&d.div.childNodes.length===0;)b=d.parentGroup,a.safeRemoveChild(d.div),delete d.div,d=b;a.alignTo&&ha(a.renderer.alignedObjects,a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,j,k;if(a){i=n(a.width,3);j=(a.opacity||0.15)/i;k=this.parentInverted?
"(-1,-1)":"("+n(a.offsetX,1)+", "+n(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;v(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":j*e,"stroke-width":h,transform:"translate"+k,fill:Q});if(c)v(f,"height",s(v(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=d}return this}};var ua=function(){this.init.apply(this,arguments)};ua.prototype={Element:pa,init:function(a,b,c,d){var e=location,f,g;f=this.createElement("svg").attr({version:"1.1"});
g=f.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&v(g,"xmlns",Ca);this.isSVG=!0;this.box=g;this.boxWrapper=f;this.alignedObjects=[];this.url=(Xa||hb)&&y.getElementsByTagName("base").length?e.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 3.0.9"));this.defs=this.createElement("defs").add();this.forExport=d;this.gradients={};this.cache={};this.setSize(b,c,!1);var h;
if(Xa&&a.getBoundingClientRect)this.subPixelFix=b=function(){D(a,{left:0,top:0});h=a.getBoundingClientRect();D(a,{left:Ha(h.left)-h.left+"px",top:Ha(h.top)-h.top+"px"})},b(),F(C,"resize",b)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Ma(this.gradients||{});this.gradients=null;if(a)this.defs=a.destroy();this.subPixelFix&&X(C,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=
new this.Element;b.init(this,a);return b},draw:function(){},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=n(a.textStr,"").toString().replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g),f=b.childNodes,g=/style="([^"]+)"/,h=/href="(http[^"]+)"/,i=v(b,"x"),j=a.styles,k=a.textWidth,l=j&&j.lineHeight,m=f.length,q=function(a){return l?z(l):
c.fontMetrics(/px$/.test(a&&a.style.fontSize)?a.style.fontSize:j.fontSize||11).h};m--;)b.removeChild(f[m]);k&&!a.added&&this.box.appendChild(b);e[e.length-1]===""&&e.pop();p(e,function(e,f){var l,m=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");l=e.split("|||");p(l,function(e){if(e!==""||l.length===1){var o={},n=y.createElementNS(Ca,"tspan"),p;g.test(e)&&(p=e.match(g)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),v(n,"style",p));h.test(e)&&!d&&(v(n,"onclick",'location.href="'+
e.match(h)[1]+'"'),D(n,{cursor:"pointer"}));e=(e.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(e!==" "&&(n.appendChild(y.createTextNode(e)),m?o.dx=0:o.x=i,v(n,o),!m&&f&&(!V&&d&&D(n,{display:"block"}),v(n,"dy",q(n),hb&&n.offsetHeight)),b.appendChild(n),m++,k))for(var e=e.replace(/([^\^])-/g,"$1- ").split(" "),o=e.length>1&&j.whiteSpace!=="nowrap",t,s,w=a._clipHeight,u=[],r=q(),$=1;o&&(e.length||u.length);)delete a.bBox,t=a.getBBox(),s=t.width,!V&&c.forExport&&(s=c.measureSpanWidth(n.firstChild.data,
a.styles)),t=s>k,!t||e.length===1?(e=u,u=[],e.length&&($++,w&&$*r>w?(e=["..."],a.attr("title",a.textStr)):(n=y.createElementNS(Ca,"tspan"),v(n,{dy:r,x:i}),p&&v(n,"style",p),b.appendChild(n),s>k&&(k=s)))):(n.removeChild(n.firstChild),u.unshift(e.pop())),e.length&&n.appendChild(y.createTextNode(e.join(" ").replace(/- /g,"-")))}})})},button:function(a,b,c,d,e,f,g,h,i){var j=this.label(a,b,c,i,null,null,null,null,"button"),k=0,l,m,q,o,n,p,a={x1:0,y1:0,x2:0,y2:1},e=x({"stroke-width":1,stroke:"#CCCCCC",
fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},e);q=e.style;delete e.style;f=x(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);o=f.style;delete f.style;g=x(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);n=g.style;delete g.style;h=x(e,{style:{color:"#CCC"}},h);p=h.style;delete h.style;F(j.element,ya?"mouseover":"mouseenter",function(){k!==3&&j.attr(f).css(o)});F(j.element,ya?"mouseout":"mouseleave",
function(){k!==3&&(l=[e,f,g][k],m=[q,o,n][k],j.attr(l).css(m))});j.setState=function(a){(j.state=k=a)?a===2?j.attr(g).css(n):a===3&&j.attr(h).css(p):j.attr(e).css(q)};return j.on("click",function(){k!==3&&d.call(j)}).attr(e).css(r({cursor:"default"},q))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=w(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=w(a[2])+b%2/2);return a},path:function(a){var b={fill:Q};Ka(a)?b.d=a:S(a)&&r(b,a);return this.createElement("path").attr(b)},circle:function(a,b,c){a=S(a)?a:{x:a,
y:b,r:c};return this.createElement("circle").attr(a)},arc:function(a,b,c,d,e,f){if(S(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,e,f){e=S(a)?a.r:e;e=this.createElement("rect").attr({rx:e,ry:e,fill:Q});return e.attr(S(a)?a:e.crisp(f,a,b,s(c,0),s(d,0)))},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[n(c,!0)?"animate":"attr"]({width:a,
height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return t(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:Q};arguments.length>1&&r(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g,h=this.symbols[a],h=h&&h(w(b),w(c),d,e,f),i=/^url\((.*?)\)$/,
j,k;if(h)g=this.path(h),r(g,{symbolName:a,x:b,y:c,width:d,height:e}),f&&r(g,f);else if(i.test(a))k=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(w((d-b[0])/2),w((e-b[1])/2)))},j=a.match(i)[1],a=Jb[j],g=this.image(j).attr({x:b,y:c}),g.isImg=!0,a?k(g,a):(g.attr({width:0,height:0}),T("img",{onload:function(){k(g,Jb[j]=[this.width,this.height])},src:j}));return g},symbols:{circle:function(a,b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/
2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=U(f),j=ba(f),k=U(g),g=ba(g),e=e.end-f<Aa?0:1;return["M",a+c*i,b+c*j,"A",c,c,0,e,
1,a+c*k,b+c*g,h?"M":"L",a+d*k,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*j,h?"":"Z"]}},clipRect:function(a,b,c,d){var e="highcharts-"+ub++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;return a},color:function(a,b,c){var d=this,e,f=/^rgba/,g,h,i,j,k,l,m,q=[];a&&a.linearGradient?g="linearGradient":a&&a.radialGradient&&(g="radialGradient");if(g){c=a[g];h=d.gradients;j=a.stops;b=b.radialReference;Ka(c)&&(a[g]=c={x1:c[0],y1:c[1],x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"});
g==="radialGradient"&&b&&!t(c.gradientUnits)&&(c=x(c,{cx:b[0]-b[2]/2+c.cx*b[2],cy:b[1]-b[2]/2+c.cy*b[2],r:c.r*b[2],gradientUnits:"userSpaceOnUse"}));for(m in c)m!=="id"&&q.push(m,c[m]);for(m in j)q.push(j[m]);q=q.join(",");h[q]?a=h[q].id:(c.id=a="highcharts-"+ub++,h[q]=i=d.createElement(g).attr(c).add(d.defs),i.stops=[],p(j,function(a){f.test(a[1])?(e=ta(a[1]),k=e.get("rgb"),l=e.get("a")):(k=a[1],l=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":k,"stop-opacity":l}).add(i);i.stops.push(a)}));
return"url("+d.url+"#"+a+")"}else return f.test(a)?(e=ta(a),v(b,c+"-opacity",e.get("a")),e.get("rgb")):(b.removeAttribute(c+"-opacity"),a)},text:function(a,b,c,d){var e=G.chart.style,f=da||!V&&this.forExport;if(d&&!this.forExport)return this.html(a,b,c);b=w(n(b,0));c=w(n(c,0));a=this.createElement("text").attr({x:b,y:c,text:a}).css({fontFamily:e.fontFamily,fontSize:e.fontSize});f&&a.css({position:"absolute"});a.x=b;a.y=c;return a},fontMetrics:function(a){var a=z(a||11),a=a<24?a+4:w(a*1.2),b=w(a*0.8);
return{h:a,b:b}},label:function(a,b,c,d,e,f,g,h,i){function j(){var a,b;a=n.element.style;va=(Z===void 0||Sa===void 0||o.styles.textAlign)&&n.getBBox();o.width=(Z||va.width||0)+2*ea+lb;o.height=(Sa||va.height||0)+2*ea;$=ea+q.fontMetrics(a&&a.fontSize).b;if(y){if(!H)a=w(-s*ea),b=h?-$:0,o.box=H=d?q.symbol(d,a,b,o.width,o.height,v):q.rect(a,b,o.width,o.height,0,v[Lb]),H.add(o);H.isImg||H.attr(x({width:o.width,height:o.height},v));v=null}}function k(){var a=o.styles,a=a&&a.textAlign,b=lb+ea*(1-s),c;c=
h?0:$;if(t(Z)&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(Z-va.width);(b!==n.x||c!==n.y)&&n.attr({x:b,y:c});n.x=b;n.y=c}function l(a,b){H?H.attr(a,b):v[a]=b}function m(){n.add(o);o.attr({text:a,x:b,y:c});H&&t(e)&&o.attr({anchorX:e,anchorY:f})}var q=this,o=q.g(i),n=q.text("",0,0,g).attr({zIndex:1}),H,va,s=0,ea=3,lb=0,Z,Sa,Ta,K,B=0,v={},$,g=o.attrSetters,y;F(o,"add",m);g.width=function(a){Z=a;return!1};g.height=function(a){Sa=a;return!1};g.padding=function(a){t(a)&&a!==ea&&(ea=a,k());return!1};
g.paddingLeft=function(a){t(a)&&a!==lb&&(lb=a,k());return!1};g.align=function(a){s={left:0,center:0.5,right:1}[a];return!1};g.text=function(a,b){n.attr(b,a);j();k();return!1};g[Lb]=function(a,b){y=!0;B=a%2/2;l(b,a);return!1};g.stroke=g.fill=g.r=function(a,b){b==="fill"&&(y=!0);l(b,a);return!1};g.anchorX=function(a,b){e=a;l(b,a+B-Ta);return!1};g.anchorY=function(a,b){f=a;l(b,a-K);return!1};g.x=function(a){o.x=a;a-=s*((Z||va.width)+ea);Ta=w(a);o.attr("translateX",Ta);return!1};g.y=function(a){K=o.y=
w(a);o.attr("translateY",K);return!1};var z=o.css;return r(o,{css:function(a){if(a){var b={},a=x(a);p("fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow".split(","),function(c){a[c]!==u&&(b[c]=a[c],delete a[c])});n.css(b)}return z.call(o,a)},getBBox:function(){return{width:va.width+2*ea,height:va.height+2*ea,x:va.x-ea,y:va.y-ea}},shadow:function(a){H&&H.shadow(a);return o},destroy:function(){X(o,"add",m);X(o.element,"mouseenter");X(o.element,"mouseleave");n&&(n=n.destroy());
H&&(H=H.destroy());pa.prototype.destroy.call(o);o=q=j=k=l=m=null}})}};Ya=ua;r(pa.prototype,{htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();this.styles=r(this.styles,a);D(this.element,a);return this},htmlGetBBox:function(){var a=this.element,b=this.bBox;if(!b){if(a.nodeName==="text")a.style.position="absolute";b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}}return b},htmlUpdateTransform:function(){if(this.added){var a=
this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=this.shadows;D(b,{marginLeft:c,marginTop:d});i&&p(i,function(a){D(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&p(b.childNodes,function(c){a.invertChild(c,b)});if(b.tagName==="SPAN"){var j=this.rotation,k,l=z(this.textWidth),m=[j,g,b.innerHTML,this.textWidth].join(",");if(m!==this.cTT){k=a.fontMetrics(b.style.fontSize).b;t(j)&&this.setSpanRotation(j,
h,k);i=n(this.elemWidth,b.offsetWidth);if(i>l&&/[ \-]/.test(b.textContent||b.innerText))D(b,{width:l+"px",display:"block",whiteSpace:"normal"}),i=l;this.getSpanCorrection(i,k,h,j,g)}D(b,{left:e+(this.xCorr||0)+"px",top:f+(this.yCorr||0)+"px"});if(hb)k=b.offsetHeight;this.cTT=m}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,c){var d={},e=ya?"-ms-transform":hb?"-webkit-transform":Xa?"MozTransform":Hb?"-o-transform":"";d[e]=d.transform="rotate("+a+"deg)";d[e+(Xa?"Origin":"-origin")]=b*100+"% "+
c+"px";D(this.element,d)},getSpanCorrection:function(a,b,c){this.xCorr=-a*c;this.yCorr=-b}});r(ua.prototype,{html:function(a,b,c){var d=G.chart.style,e=this.createElement("span"),f=e.attrSetters,g=e.element,h=e.renderer;f.text=function(a){a!==g.innerHTML&&delete this.bBox;g.innerHTML=a;return!1};f.x=f.y=f.align=f.rotation=function(a,b){b==="align"&&(b="textAlign");e[b]=a;e.htmlUpdateTransform();return!1};e.attr({text:a,x:w(b),y:w(c)}).css({position:"absolute",whiteSpace:"nowrap",fontFamily:d.fontFamily,
fontSize:d.fontSize});e.css=e.htmlCss;if(h.isSVG)e.add=function(a){var b,c=h.box.parentNode,d=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)d.push(a),a=a.parentGroup;p(d.reverse(),function(a){var d;b=a.div=a.div||T(Ga,{className:v(a.element,"class")},{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;r(a.attrSetters,{translateX:function(a){d.left=a+"px"},translateY:function(a){d.top=a+"px"},visibility:function(a,b){d[b]=a}})})}}else b=c;b.appendChild(g);
e.added=!0;e.alignOnAdd&&e.htmlUpdateTransform();return e};return e}});var R;if(!V&&!da){Highcharts.VMLElement=R={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===Ga;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=T(c);this.renderer=a;this.attrSetters={}},add:function(a){var b=this.renderer,
c=this.element,d=b.box,d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();A(this,"add");return this},updateTransform:pa.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=U(a*Ba),c=ba(a*Ba);D(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",b,", M12=",-c,", M21=",c,", M22=",b,", sizingMethod='auto expand')"].join(""):Q})},getSpanCorrection:function(a,
b,c,d,e){var f=d?U(d*Ba):1,g=d?ba(d*Ba):0,h=n(this.elemHeight,this.element.offsetHeight),i;this.xCorr=f<0&&-a;this.yCorr=g<0&&-h;i=f*g<0;this.xCorr+=g*b*(i?1-c:c);this.yCorr-=f*b*(d?i?c:1-c:1);e&&e!=="left"&&(this.xCorr-=a*c*(f<0?-1:1),d&&(this.yCorr-=h*c*(g<0?-1:1)),D(this.element,{textAlign:e}))},pathToVML:function(a){for(var b=a.length,c=[];b--;)if(wa(a[b]))c[b]=w(a[b]*10)-5;else if(a[b]==="Z")c[b]="x";else if(c[b]=a[b],a.isArc&&(a[b]==="wa"||a[b]==="at"))c[b+5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?
1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1);return c.join(" ")||"x"},attr:function(a,b){var c,d,e,f=this.element||{},g=f.style,h=f.nodeName,i=this.renderer,j=this.symbolName,k,l=this.shadows,m,q=this.attrSetters,o=this;fa(a)&&t(b)&&(c=a,a={},a[c]=b);if(fa(a))c=a,o=c==="strokeWidth"||c==="stroke-width"?this.strokeweight:this[c];else for(c in a)if(d=a[c],m=!1,e=q[c]&&q[c].call(this,d,c),e!==!1&&d!==null){e!==u&&(d=e);if(j&&/^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c))k||
(this.symbolAttr(a),k=!0),m=!0;else if(c==="d"){d=d||[];this.d=d.join(" ");f.path=d=this.pathToVML(d);if(l)for(e=l.length;e--;)l[e].path=l[e].cutOff?this.cutOffPath(d,l[e].cutOff):d;m=!0}else if(c==="visibility"){if(l)for(e=l.length;e--;)l[e].style[c]=d;h==="DIV"&&(d=d==="hidden"?"-999em":0,gb||(g[c]=d?"visible":"hidden"),c="top");g[c]=d;m=!0}else if(c==="zIndex")d&&(g[c]=d),m=!0;else if(sa(c,["x","y","width","height"])!==-1)this[c]=d,c==="x"||c==="y"?c={x:"left",y:"top"}[c]:d=s(0,d),this.updateClipping?
(this[c]=d,this.updateClipping()):g[c]=d,m=!0;else if(c==="class"&&h==="DIV")f.className=d;else if(c==="stroke")d=i.color(d,f,c),c="strokecolor";else if(c==="stroke-width"||c==="strokeWidth")f.stroked=d?!0:!1,c="strokeweight",this[c]=d,wa(d)&&(d+="px");else if(c==="dashstyle")(f.getElementsByTagName("stroke")[0]||T(i.prepVML(["<stroke/>"]),null,null,f))[c]=d||"solid",this.dashstyle=d,m=!0;else if(c==="fill")if(h==="SPAN")g.color=d;else{if(h!=="IMG")f.filled=d!==Q?!0:!1,d=i.color(d,f,c,this),c="fillcolor"}else if(c===
"opacity")m=!0;else if(h==="shape"&&c==="rotation")this[c]=f.style[c]=d,f.style.left=-w(ba(d*Ba)+1)+"px",f.style.top=w(U(d*Ba))+"px";else if(c==="translateX"||c==="translateY"||c==="rotation")this[c]=d,this.updateTransform(),m=!0;m||(gb?f[c]=d:v(f,c,d))}return o},clip:function(a){var b=this,c;a?(c=a.members,ha(c,b),c.push(b),b.destroyClip=function(){ha(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:gb?"inherit":"rect(auto)"});return b.css(a)},css:pa.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&
Na(a)},destroy:function(){this.destroyClip&&this.destroyClip();return pa.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=C.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=z(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,j,k=f.path,l,m,q,o;k&&typeof k.value!=="string"&&(k="x");m=k;if(a){q=n(a.width,3);o=(a.opacity||
0.15)/q;for(e=1;e<=3;e++){l=q*2+1-2*e;c&&(m=this.cutOffPath(k.value,l+0.5));j=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=T(g.prepVML(j),null,{left:z(i.left)+n(a.offsetX,1),top:z(i.top)+n(a.offsetY,1)});if(c)h.cutOff=l+1;j=['<stroke color="',a.color||"black",'" opacity="',o*e,'"/>'];T(g.prepVML(j),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);d.push(h)}this.shadows=d}return this}};R=ia(pa,R);
var xb={Element:R,isIE8:ra.indexOf("MSIE 8.0")>-1,init:function(a,b,c){var d,e;this.alignedObjects=[];d=this.createElement(Ga);e=d.element;e.style.position="relative";a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=d;this.cache={};this.setSize(b,c,!1);if(!y.namespaces.hcv){y.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{y.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(f){y.styleSheets[0].cssText+=
"hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),f=S(a);return r(e,{members:[],left:(f?a.x:a)+1,top:(f?a.y:b)+1,width:(f?a.width:c)-1,height:(f?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName,a=a.inverted,d=this.top-(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+w(a?e:d)+"px,"+w(a?f:
b)+"px,"+w(a?b:f)+"px,"+w(a?d:e)+"px)"};!a&&gb&&c==="DIV"&&r(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){p(e.members,function(a){a.css(e.getCSS(a))})}})},color:function(a,b,c,d){var e=this,f,g=/^rgba/,h,i,j=Q;a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var k,l,m=a.linearGradient||a.radialGradient,q,o,n,H,s,t="",a=a.stops,u,w=[],r=function(){h=['<fill colors="'+w.join(",")+'" opacity="',n,'" o:opacity2="',o,'" type="',i,'" ',t,'focus="100%" method="any" />'];
T(e.prepVML(h),null,null,b)};q=a[0];u=a[a.length-1];q[0]>0&&a.unshift([0,q[1]]);u[0]<1&&a.push([1,u[1]]);p(a,function(a,b){g.test(a[1])?(f=ta(a[1]),k=f.get("rgb"),l=f.get("a")):(k=a[1],l=1);w.push(a[0]*100+"% "+k);b?(n=l,H=k):(o=l,s=k)});if(c==="fill")if(i==="gradient")c=m.x1||m[0]||0,a=m.y1||m[1]||0,q=m.x2||m[2]||0,m=m.y2||m[3]||0,t='angle="'+(90-P.atan((m-a)/(q-c))*180/Aa)+'"',r();else{var j=m.r,Sa=j*2,Ta=j*2,v=m.cx,B=m.cy,x=b.radialReference,$,j=function(){x&&($=d.getBBox(),v+=(x[0]-$.x)/$.width-
0.5,B+=(x[1]-$.y)/$.height-0.5,Sa*=x[2]/$.width,Ta*=x[2]/$.height);t='src="'+G.global.VMLRadialGradientURL+'" size="'+Sa+","+Ta+'" origin="0.5,0.5" position="'+v+","+B+'" color2="'+s+'" ';r()};d.added?j():F(d,"add",j);j=H}else j=k}else if(g.test(a)&&b.tagName!=="IMG")f=ta(a),h=["<",c,' opacity="',f.get("a"),'"/>'],T(this.prepVML(h),null,null,b),j=f.get("rgb");else{j=b.getElementsByTagName(c);if(j.length)j[0].opacity=1,j[0].type="solid";j=a}return j},prepVML:function(a){var b=this.isIE8,a=a.join("");
b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:ua.prototype.html,path:function(a){var b={coordsize:"10 10"};Ka(a)?b.d=a:S(a)&&r(b,a);return this.createElement("shape").attr(b)},circle:function(a,b,c){var d=this.symbol("circle");if(S(a))c=a.r,b=a.y,a=a.x;d.isCircle=
!0;d.r=c;return d.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Ga).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,height:e});return f},rect:function(a,b,c,d,e,f){var g=this.symbol("rect");g.r=S(a)?a.r:e;return g.attr(S(a)?a:g.crisp(f,a,b,s(c,0),s(d,0)))},invertChild:function(a,b){var c=b.style;D(a,{flip:"x",left:z(c.width)-1,top:z(c.height)-1,rotation:-90})},
symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=U(f),i=ba(f),j=U(g),k=ba(g);if(g-f===0)return["x"];f=["wa",a-h,b-h,a+h,b+h,a+h*d,b+h*i,a+h*j,b+h*k];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*j,b+c*k,a+c*d,b+c*i,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){var f=a+c,g=b+d,h;!t(e)||!e.r?f=ua.prototype.symbols.square.apply(0,
arguments):(h=I(e.r,c,d),f=["M",a+h,b,"L",f-h,b,"wa",f-2*h,b,f,b+2*h,f-h,b,f,b+h,"L",f,g-h,"wa",f-2*h,g-2*h,f,g,f,g-h,f-h,g,"L",a+h,g,"wa",a,g-2*h,a+2*h,g,a+h,g,a,g-h,"L",a,b+h,"wa",a,b,a+2*h,b+2*h,a,b+h,a+h,b,"x","e"]);return f}}};Highcharts.VMLRenderer=R=function(){this.init.apply(this,arguments)};R.prototype=x(ua.prototype,xb);Ya=R}ua.prototype.measureSpanWidth=function(a,b){var c=y.createElement("span"),d;d=y.createTextNode(a);c.appendChild(d);D(c,b);this.box.appendChild(c);d=c.offsetWidth;Na(c);
return d};var Mb;if(da)Highcharts.CanVGRenderer=R=function(){Ca="http://www.w3.org/1999/xhtml"},R.prototype.symbols={},Mb=function(){function a(){var a=b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){b.length===0&&Pb(d,a);b.push(c)}}}(),Ya=R;Qa.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.horiz,e=a.categories,f=a.names,g=this.pos,h=b.labels,i=a.tickPositions,d=d&&e&&!h.step&&!h.staggerLines&&!h.rotation&&c.plotWidth/i.length||!d&&(c.margin[3]||
c.chartWidth*0.33),j=g===i[0],k=g===i[i.length-1],l,f=e?n(e[g],f[g],g):g,e=this.label,m=i.info;a.isDatetimeAxis&&m&&(l=b.dateTimeLabelFormats[m.higherRanks[g]||m.unitName]);this.isFirst=j;this.isLast=k;b=a.labelFormatter.call({axis:a,chart:c,isFirst:j,isLast:k,dateTimeLabelFormat:l,value:a.isLog?aa(ga(f)):f});g=d&&{width:s(1,w(d-2*(h.padding||10)))+"px"};g=r(g,h.style);if(t(e))e&&e.attr({text:b}).css(g);else{l={align:a.labelAlign};if(wa(h.rotation))l.rotation=h.rotation;if(d&&h.ellipsis)l._clipHeight=
a.len/i.length;this.label=t(b)&&h.enabled?c.renderer.text(b,0,0,h.useHTML).attr(l).css(g).add(a.labelGroup):null}},getLabelSize:function(){var a=this.label,b=this.axis;return a?a.getBBox()[b.horiz?"height":"width"]:0},getLabelSides:function(){var a=this.label.getBBox(),b=this.axis,c=b.horiz,d=b.options.labels,a=c?a.width:a.height,b=c?a*{left:0,center:0.5,right:1}[b.labelAlign]-d.x:a;return[-b,a-b]},handleOverflow:function(a,b){var B;var c=!0,d=this.axis,e=this.isFirst,f=this.isLast,g=d.horiz?b.x:
b.y,h=d.reversed,i=d.tickPositions,j=this.getLabelSides(),k=j[0],j=j[1],l=d.pos,m=l+d.len,q=this.label.line||0,o=d.labelEdge,n=d.justifyLabels&&(e||f);o[q]===u||g+k>o[q]?o[q]=g+j:n||(c=!1);if(n)B=(d=d.ticks[i[a+(e?1:-1)]])&&d.label.xy&&d.label.xy.x+d.getLabelSides()[e?0:1],i=B,e&&!h||f&&h?g+k<l&&(g=l-k,d&&g+j>i&&(c=!1)):g+j>m&&(g=m-j,d&&g+k<i&&(c=!1)),b.x=g;return c},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+
e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,b,c,d,e,f,g,h){var i=this.axis,j=i.transA,k=i.reversed,l=i.staggerLines,m=i.chart.renderer.fontMetrics(e.style.fontSize).b,q=e.rotation,a=a+e.x-(f&&d?f*j*(k?-1:1):0),b=b+e.y-(f&&!d?f*j*(k?1:-1):0);q&&i.side===2&&(b-=m-m*U(q*Ba));!t(e.y)&&!q&&(b+=m-c.getBBox().height/2);if(l)c.line=g/(h||1)%l,
b+=c.line*(i.labelOffset/l);return{x:a,y:b}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,i=this.label,j=this.pos,k=e.labels,l=this.gridLine,m=h?h+"Grid":"grid",q=h?h+"Tick":"tick",o=e[m+"LineWidth"],p=e[m+"LineColor"],H=e[m+"LineDashStyle"],s=e[q+"Length"],m=e[q+"Width"]||0,t=e[q+"Color"],w=e[q+"Position"],q=this.mark,r=k.step,Z=!0,x=d.tickmarkOffset,v=this.getPosition(g,
j,x,b),y=v.x,v=v.y,B=g&&y===d.pos+d.len||!g&&v===d.pos?-1:1;this.isActive=!0;if(o){j=d.getPlotLinePath(j+x,o*B,b,!0);if(l===u){l={stroke:p,"stroke-width":o};if(H)l.dashstyle=H;if(!h)l.zIndex=1;if(b)l.opacity=0;this.gridLine=l=o?f.path(j).attr(l).add(d.gridGroup):null}if(!b&&l&&j)l[this.isNew?"attr":"animate"]({d:j,opacity:c})}if(m&&s)w==="inside"&&(s=-s),d.opposite&&(s=-s),h=this.getMarkPath(y,v,s,m*B,g,f),q?q.animate({d:h,opacity:c}):this.mark=f.path(h).attr({stroke:t,"stroke-width":m,opacity:c}).add(d.axisGroup);
if(i&&!isNaN(y))i.xy=v=this.getLabelPosition(y,v,i,g,k,x,a,r),this.isFirst&&!this.isLast&&!n(e.showFirstLabel,1)||this.isLast&&!this.isFirst&&!n(e.showLastLabel,1)?Z=!1:!d.isRadial&&!k.step&&!k.rotation&&!b&&c!==0&&(Z=this.handleOverflow(a,v)),r&&a%r&&(Z=!1),Z&&!isNaN(v.y)?(v.opacity=c,i[this.isNew?"attr":"animate"](v),this.isNew=!1):i.attr("y",-9999)},destroy:function(){Ma(this,this.axis)}};var yb=function(a,b){this.axis=a;if(b)this.options=b,this.id=b.id};yb.prototype={render:function(){var a=this,
b=a.axis,c=b.horiz,d=(b.pointRange||0)/2,e=a.options,f=e.label,g=a.label,h=e.width,i=e.to,j=e.from,k=t(j)&&t(i),l=e.value,m=e.dashStyle,q=a.svgElem,o=[],p,H=e.color,w=e.zIndex,r=e.events,u=b.chart.renderer;b.isLog&&(j=xa(j),i=xa(i),l=xa(l));if(h){if(o=b.getPlotLinePath(l,h),d={stroke:H,"stroke-width":h},m)d.dashstyle=m}else if(k){if(j=s(j,b.min-d),i=I(i,b.max+d),o=b.getPlotBandPath(j,i,e),d={fill:H},e.borderWidth)d.stroke=e.borderColor,d["stroke-width"]=e.borderWidth}else return;if(t(w))d.zIndex=
w;if(q)if(o)q.animate({d:o},null,q.onGetPath);else{if(q.hide(),q.onGetPath=function(){q.show()},g)a.label=g=g.destroy()}else if(o&&o.length&&(a.svgElem=q=u.path(o).attr(d).add(),r))for(p in e=function(b){q.on(b,function(c){r[b].apply(a,[c])})},r)e(p);if(f&&t(f.text)&&o&&o.length&&b.width>0&&b.height>0){f=x({align:c&&k&&"center",x:c?!k&&4:10,verticalAlign:!c&&k&&"middle",y:c?k?16:10:k?6:-4,rotation:c&&!k&&90},f);if(!g)a.label=g=u.text(f.text,0,0,f.useHTML).attr({align:f.textAlign||f.align,rotation:f.rotation,
zIndex:w}).css(f.style).add();b=[o[1],o[4],n(o[6],o[1])];o=[o[2],o[5],n(o[7],o[2])];c=La(b);k=La(o);g.align(f,!1,{x:c,y:k,width:za(b)-c,height:za(o)-k});g.show()}else g&&g.hide();return a},destroy:function(){ha(this.axis.plotLinesAndBands,this);delete this.axis;Ma(this)}};qa.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#C0C0C0",labels:J,lineColor:"#C0D0E0",
lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#4d759e",fontWeight:"bold"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,
maxPadding:0.05,minPadding:0.05,startOnTick:!0,tickWidth:0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return Da(this.total,-1)},style:J.style}},defaultLeftAxisOptions:{labels:{x:-8,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:8,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{x:0,y:14},title:{rotation:0}},defaultTopAxisOptions:{labels:{x:0,y:-5},title:{rotation:0}},init:function(a,b){var c=b.isX;this.horiz=a.inverted?!c:c;this.coll=
(this.isXAxis=c)?"xAxis":"yAxis";this.opposite=b.opposite;this.side=b.side||(this.horiz?this.opposite?0:2:this.opposite?1:3);this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.chart=a;this.reversed=d.reversed;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.names=[];this.isLog=e==="logarithmic";this.isDatetimeAxis=e==="datetime";this.isLinked=t(d.linkedTo);
this.tickmarkOffset=this.categories&&d.tickmarkPlacement==="between"?0.5:0;this.ticks={};this.labelEdge=[];this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stackExtremes={};this.min=this.max=null;this.crosshair=n(d.crosshair,ja(a.options.tooltip.crosshairs)[c?0:1],!1);var f,d=this.options.events;sa(this,a.axes)===-1&&(a.axes.push(this),
a[this.coll].push(this));this.series=this.series||[];if(a.inverted&&c&&this.reversed===u)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)F(this,f,d[f]);if(this.isLog)this.val2lin=xa,this.lin2val=ga},setOptions:function(a){this.options=x(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],x(G[this.coll],a))},defaultLabelFormatter:function(){var a=
this.axis,b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=G.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=Fa(h,this);else if(c)g=b;else if(d)g=ab(d,b);else if(f&&a>=1E3)for(;f--&&g===u;)c=Math.pow(1E3,f+1),a>=c&&e[f]!==null&&(g=Da(b/c,-1)+e[f]);g===u&&(g=b>=1E4?Da(b,0):Da(b,-1,u,""));return g},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=null;a.stackExtremes={};a.buildStacks();p(a.series,function(c){if(c.visible||
!b.options.chart.ignoreHiddenSeries){var d;d=c.options.threshold;var e;a.hasVisibleSeries=!0;a.isLog&&d<=0&&(d=null);if(a.isXAxis){if(d=c.xData,d.length)a.dataMin=I(n(a.dataMin,d[0]),La(d)),a.dataMax=s(n(a.dataMax,d[0]),za(d))}else{c.getExtremes();e=c.dataMax;c=c.dataMin;if(t(c)&&t(e))a.dataMin=I(n(a.dataMin,c),c),a.dataMax=s(n(a.dataMax,e),e);if(t(d))if(a.dataMin>=d)a.dataMin=d,a.ignoreMinPadding=!0;else if(a.dataMax<d)a.dataMax=d,a.ignoreMaxPadding=!0}}})},translate:function(a,b,c,d,e,f){var g=
this.len,h=1,i=0,j=d?this.oldTransA:this.transA,d=d?this.oldMin:this.min,k=this.minPixelPadding,e=(this.options.ordinal||this.isLog&&e)&&this.lin2val;if(!j)j=this.transA;c&&(h*=-1,i=g);this.reversed&&(h*=-1,i-=h*g);b?(a=a*h+i,a-=k,a=a/j+d,e&&(a=this.lin2val(a))):(e&&(a=this.val2lin(a)),f==="between"&&(f=0.5),a=h*(a-d)*j+i+h*k+(wa(f)?j*f*this.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-
(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d,e){var f=this.chart,g=this.left,h=this.top,i,j,k=c&&f.oldChartHeight||f.chartHeight,l=c&&f.oldChartWidth||f.chartWidth,m;i=this.transB;e=n(e,this.translate(a,null,null,c));a=c=w(e+i);i=j=w(k-e-i);if(isNaN(e))m=!0;else if(this.horiz){if(i=h,j=k-this.bottom,a<g||a>g+this.width)m=!0}else if(a=g,c=l-this.right,i<h||i>h+this.height)m=!0;return m&&!d?null:f.renderer.crispLine(["M",a,i,"L",c,j],b||1)},getLinearTickPositions:function(a,
b,c){for(var d,b=aa(N(b/a)*a),c=aa(Ha(c/a)*a),e=[];b<=c;){e.push(b);b=aa(b+a);if(b===d)break;d=b}return e},getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e;if(this.isLog){e=b.length;for(a=1;a<e;a++)d=d.concat(this.getLogTickPositions(c,b[a-1],b[a],!0))}else if(this.isDatetimeAxis&&a.minorTickInterval==="auto")d=d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c),this.min,this.max,a.startOfWeek)),d[0]<this.min&&d.shift();else for(b=this.min+
(b[0]-this.min)%c;b<=this.max;b+=c)d.push(b);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-this.dataMin>=this.minRange,f,g,h,i,j;if(this.isXAxis&&this.minRange===u&&!this.isLog)t(a.min)||t(a.max)?this.minRange=null:(p(this.series,function(a){i=a.xData;for(g=j=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-i[g-1],f===u||h<f)f=h}),this.minRange=I(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){var k=this.minRange;d=(k-c+b)/2;d=[b-d,n(a.min,b-d)];
if(e)d[2]=this.dataMin;b=za(d);c=[b+k,n(a.max,b+k)];if(e)c[2]=this.dataMax;c=La(c);c-b<k&&(d[0]=c-k,d[1]=n(a.min,c-k),b=za(d))}this.min=b;this.max=c},setAxisTranslation:function(a){var b=this.max-this.min,c=0,d,e=0,f=0,g=this.linkedParent,h=!!this.categories,i=this.transA;if(this.isXAxis||h)g?(e=g.minPointOffset,f=g.pointRangePadding):p(this.series,function(a){var g=s(a.pointRange,+h),i=a.options.pointPlacement,m=a.closestPointRange;g>b&&(g=0);c=s(c,g);e=s(e,fa(i)?0:g/2);f=s(f,i==="on"?0:g);!a.noSharedTooltip&&
t(m)&&(d=t(d)?I(d,m):m)}),g=this.ordinalSlope&&d?this.ordinalSlope/d:1,this.minPointOffset=e*=g,this.pointRangePadding=f*=g,this.pointRange=I(c,b),this.closestPointRange=d;if(a)this.oldTransA=i;this.translationSlope=this.transA=i=this.len/(b+f||1);this.transB=this.horiz?this.left:this.bottom;this.minPixelPadding=i*e},setTickPositions:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,g=b.isXAxis,h=b.isLinked,i=b.options.tickPositioner,j=d.maxPadding,k=d.minPadding,l=d.tickInterval,
m=d.minTickInterval,q=d.tickPixelInterval,o,ma=b.categories;h?(b.linkedParent=c[b.coll][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=n(c.min,c.dataMin),b.max=n(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&ka(11,1)):(b.min=n(b.userMin,d.min,b.dataMin),b.max=n(b.userMax,d.max,b.dataMax));if(e)!a&&I(b.min,n(b.dataMin,b.min))<=0&&ka(10,1),b.min=aa(xa(b.min)),b.max=aa(xa(b.max));if(b.range&&t(b.max))b.userMin=b.min=s(b.min,b.max-b.range),b.userMax=b.max,b.range=null;b.beforePadding&&b.beforePadding();
b.adjustForMinRange();if(!ma&&!b.usePercentage&&!h&&t(b.min)&&t(b.max)&&(c=b.max-b.min)){if(!t(d.min)&&!t(b.userMin)&&k&&(b.dataMin<0||!b.ignoreMinPadding))b.min-=c*k;if(!t(d.max)&&!t(b.userMax)&&j&&(b.dataMax>0||!b.ignoreMaxPadding))b.max+=c*j}b.min===b.max||b.min===void 0||b.max===void 0?b.tickInterval=1:h&&!l&&q===b.linkedParent.options.tickPixelInterval?b.tickInterval=b.linkedParent.tickInterval:(b.tickInterval=n(l,ma?1:(b.max-b.min)*q/s(b.len,q)),!t(l)&&b.len<q&&!this.isRadial&&!ma&&d.startOnTick&&
d.endOnTick&&(o=!0,b.tickInterval/=4));g&&!a&&p(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);if(b.pointRange)b.tickInterval=s(b.pointRange,b.tickInterval);if(!l&&b.tickInterval<m)b.tickInterval=m;if(!f&&!e&&!l)b.tickInterval=nb(b.tickInterval,null,mb(b.tickInterval),d);b.minorTickInterval=d.minorTickInterval===
"auto"&&b.tickInterval?b.tickInterval/5:d.minorTickInterval;b.tickPositions=a=d.tickPositions?[].concat(d.tickPositions):i&&i.apply(b,[b.min,b.max]);if(!a)!b.ordinalPositions&&(b.max-b.min)/b.tickInterval>s(2*b.len,200)&&ka(19,!0),a=f?b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval,d.units),b.min,b.max,d.startOfWeek,b.ordinalPositions,b.closestPointRange,!0):e?b.getLogTickPositions(b.tickInterval,b.min,b.max):b.getLinearTickPositions(b.tickInterval,b.min,b.max),o&&a.splice(1,a.length-2),
b.tickPositions=a;if(!h)e=a[0],f=a[a.length-1],h=b.minPointOffset||0,d.startOnTick?b.min=e:b.min-h>e&&a.shift(),d.endOnTick?b.max=f:b.max+h<f&&a.pop(),a.length===1&&(b.min-=0.001,b.max+=0.001)},setMaxTicks:function(){var a=this.chart,b=a.maxTicks||{},c=this.tickPositions,d=this._maxTicksKey=[this.coll,this.pos,this.len].join("-");if(!this.isLinked&&!this.isDatetimeAxis&&c&&c.length>(b[d]||0)&&this.options.alignTicks!==!1)b[d]=c.length;a.maxTicks=b},adjustTickAmount:function(){var a=this._maxTicksKey,
b=this.tickPositions,c=this.chart.maxTicks;if(c&&c[a]&&!this.isDatetimeAxis&&!this.categories&&!this.isLinked&&this.options.alignTicks!==!1&&this.min!==u){var d=this.tickAmount,e=b.length;this.tickAmount=a=c[a];if(e<a){for(;b.length<a;)b.push(aa(b[b.length-1]+this.tickInterval));this.transA*=(e-1)/(a-1);this.max=b[b.length-1]}if(t(d)&&a!==d)this.isDirty=!0}},setScale:function(){var a=this.stacks,b,c,d,e;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();e=this.len!==
this.oldAxisLength;p(this.series,function(a){if(a.isDirtyData||a.isDirty||a.xAxis.isDirty)d=!0});if(e||d||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax){if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].total=null,a[b][c].cum=0;this.forceRedraw=!1;this.getSeriesExtremes();this.setTickPositions();this.oldUserMin=this.userMin;this.oldUserMax=this.userMax;if(!this.isDirty)this.isDirty=e||this.min!==this.oldMin||this.max!==this.oldMax}else if(!this.isXAxis){if(this.oldStacks)a=
this.stacks=this.oldStacks;for(b in a)for(c in a[b])a[b][c].cum=a[b][c].total}this.setMaxTicks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,c=n(c,!0),e=r(e,{min:a,max:b});A(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.eventArgs=e;f.isDirtyExtremes=!0;c&&g.redraw(d)})},zoom:function(a,b){this.allowZoomOutside||(t(this.dataMin)&&a<=this.dataMin&&(a=u),t(this.dataMax)&&b>=this.dataMax&&(b=u));this.displayBtn=a!==u||b!==u;this.setExtremes(a,b,!1,u,{trigger:"zoom"});return!0},setAxisSize:function(){var a=
this.chart,b=this.options,c=b.offsetLeft||0,d=b.offsetRight||0,e=this.horiz,f,g;this.left=g=n(b.left,a.plotLeft+c);this.top=f=n(b.top,a.plotTop);this.width=c=n(b.width,a.plotWidth-c+d);this.height=b=n(b.height,a.plotHeight);this.bottom=a.chartHeight-b-f;this.right=a.chartWidth-c-g;this.len=s(e?c:b,0);this.pos=e?g:f},getExtremes:function(){var a=this.isLog;return{min:a?aa(ga(this.min)):this.min,max:a?aa(ga(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},
getThreshold:function(a){var b=this.isLog,c=b?ga(this.min):this.min,b=b?ga(this.max):this.max;c>a||a===null?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(n(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center"},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,j,k=0,l,m=0,q=d.title,o=d.labels,ma=0,H=b.axisOffset,w=b.clipOffset,r=[-1,1,1,-1][h],v,
x=1,Z=n(o.maxStaggerLines,5),y,z,K,B;a.hasData=j=a.hasVisibleSeries||t(a.min)&&t(a.max)&&!!e;a.showAxis=b=j||n(d.showEmpty,!0);a.staggerLines=a.horiz&&o.staggerLines;if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(),a.labelGroup=c.g("axis-labels").attr({zIndex:o.zIndex||7}).add();if(j||a.isLinked){a.labelAlign=n(o.align||a.autoLabelAlign(o.rotation));p(e,function(b){f[b]?f[b].addLabel():f[b]=new Qa(a,b)});if(a.horiz&&
!a.staggerLines&&Z&&!o.rotation){for(v=a.reversed?[].concat(e).reverse():e;x<Z;){j=[];y=!1;for(o=0;o<v.length;o++)z=v[o],K=(K=f[z].label&&f[z].label.getBBox())?K.width:0,B=o%x,K&&(z=a.translate(z),j[B]!==u&&z<j[B]&&(y=!0),j[B]=z+K);if(y)x++;else break}if(x>1)a.staggerLines=x}p(e,function(b){if(h===0||h===2||{1:"left",3:"right"}[h]===a.labelAlign)ma=s(f[b].getLabelSize(),ma)});if(a.staggerLines)ma*=a.staggerLines,a.labelOffset=ma}else for(v in f)f[v].destroy(),delete f[v];if(q&&q.text&&q.enabled!==
!1){if(!a.axisTitle)a.axisTitle=c.text(q.text,0,0,q.useHTML).attr({zIndex:7,rotation:q.rotation||0,align:q.textAlign||{low:"left",middle:"center",high:"right"}[q.align]}).css(q.style).add(a.axisGroup),a.axisTitle.isNew=!0;if(b)k=a.axisTitle.getBBox()[g?"height":"width"],m=n(q.margin,g?5:10),l=q.offset;a.axisTitle[b?"show":"hide"]()}a.offset=r*n(d.offset,H[h]);a.axisTitleMargin=n(l,ma+m+(h!==2&&ma&&r*d.labels[g?"y":"x"]));H[h]=s(H[h],a.axisTitleMargin+k+r*a.offset);w[i]=s(w[i],N(d.lineWidth/2)*2)},
getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d,d=b.chartHeight-this.bottom-(c?this.height:0)+d;c&&(a*=-1);return b.renderer.crispLine(["M",e?this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=z(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+
(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?i:0);return{x:a?d:b+(g?this.width:0)+h+(e.x||0),y:a?b-(g?this.height:0)+h:d+(e.y||0)}},render:function(){var a=this,b=a.horiz,c=a.reversed,d=a.chart,e=d.renderer,f=a.options,g=a.isLog,h=a.isLinked,i=a.tickPositions,j,k=a.axisTitle,l=a.stacks,m=a.ticks,q=a.minorTicks,o=a.alternateBands,n=f.stackLabels,H=f.alternateGridColor,s=a.tickmarkOffset,r=f.lineWidth,w=d.hasRendered&&t(a.oldMin)&&!isNaN(a.oldMin),v=
a.hasData,x=a.showAxis,y,z=a.justifyLabels=!a.staggerLines&&b&&f.labels.overflow==="justify",K;a.labelEdge.length=0;p([m,q,o],function(a){for(var b in a)a[b].isActive=!1});if(v||h)if(a.minorTickInterval&&!a.categories&&p(a.getMinorTickPositions(),function(b){q[b]||(q[b]=new Qa(a,b,"minor"));w&&q[b].isNew&&q[b].render(null,!0);q[b].render(null,!1,1)}),i.length&&(j=i.slice(),(b&&c||!b&&!c)&&j.reverse(),z&&(j=j.slice(1).concat([j[0]])),p(j,function(b,c){z&&(c=c===j.length-1?0:c+1);if(!h||b>=a.min&&b<=
a.max)m[b]||(m[b]=new Qa(a,b)),w&&m[b].isNew&&m[b].render(c,!0,0.1),m[b].render(c,!1,1)}),s&&a.min===0&&(m[-1]||(m[-1]=new Qa(a,-1,null,!0)),m[-1].render(-1))),H&&p(i,function(b,c){if(c%2===0&&b<a.max)o[b]||(o[b]=new yb(a)),y=b+s,K=i[c+1]!==u?i[c+1]+s:a.max,o[b].options={from:g?ga(y):y,to:g?ga(K):K,color:H},o[b].render(),o[b].isActive=!0}),!a._addedPlotLB)p((f.plotLines||[]).concat(f.plotBands||[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0;p([m,q,o],function(a){var b,c,e=[],f=oa?oa.duration||
500:0,g=function(){for(c=e.length;c--;)a[e[c]]&&!a[e[c]].isActive&&(a[e[c]].destroy(),delete a[e[c]])};for(b in a)if(!a[b].isActive)a[b].render(b,!1,0),a[b].isActive=!1,e.push(b);a===o||!d.hasRendered||!f?g():f&&setTimeout(g,f)});if(r)b=a.getLinePath(r),a.axisLine?a.axisLine.animate({d:b}):a.axisLine=e.path(b).attr({stroke:f.lineColor,"stroke-width":r,zIndex:7}).add(a.axisGroup),a.axisLine[x?"show":"hide"]();if(k&&x)k[k.isNew?"attr":"animate"](a.getTitlePosition()),k.isNew=!1;if(n&&n.enabled){var B,
A,f=a.stackTotalGroup;if(!f)a.stackTotalGroup=f=e.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();f.translate(d.plotLeft,d.plotTop);for(B in l)for(A in e=l[B],e)e[A].render(f)}a.isDirty=!1},redraw:function(){var a=this.chart.pointer;a.reset&&a.reset(!0);this.render();p(this.plotLinesAndBands,function(a){a.render()});p(this.series,function(a){a.isDirty=!0})},buildStacks:function(){var a=this.series,b=a.length;if(!this.isXAxis){for(;b--;)a[b].setStackedPoints();if(this.usePercentage)for(b=
0;b<a.length;b++)a[b].setPercentStacks()}},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;a||X(b);for(d in c)Ma(c[d]),c[d]=null;p([b.ticks,b.minorTicks,b.alternateBands],function(a){Ma(a)});for(a=e.length;a--;)e[a].destroy();p("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","),function(a){b[a]&&(b[a]=b[a].destroy())});this.cross&&this.cross.destroy()},drawCrosshair:function(a,b){if(this.crosshair)if((t(b)||!n(this.crosshair.snap,!0))===!1)this.hideCrosshair();
else{var c,d=this.crosshair,e=d.animation;n(d.snap,!0)?t(b)&&(c=this.chart.inverted!=this.horiz?b.plotX:this.len-b.plotY):c=this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos;c=this.isRadial?this.getPlotLinePath(this.isXAxis?b.x:n(b.stackY,b.y)):this.getPlotLinePath(null,null,null,null,c);if(c===null)this.hideCrosshair();else if(this.cross)this.cross.attr({visibility:"visible"})[e?"animate":"attr"]({d:c},e);else{e={"stroke-width":d.width||1,stroke:d.color||"#C0C0C0",zIndex:d.zIndex||2};if(d.dashStyle)e.dashstyle=
d.dashStyle;this.cross=this.chart.renderer.path(c).attr(e).add()}}},hideCrosshair:function(){this.cross&&this.cross.hide()}};r(qa.prototype,{getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b),d=this.getPlotLinePath(a);d&&c?d.push(c[4],c[5],c[1],c[2]):d=null;return d},addPlotBand:function(a){this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(a,b){var c=(new yb(this,a)).render(),d=this.userOptions;c&&(b&&(d[b]=d[b]||
[],d[b].push(a)),this.plotLinesAndBands.push(c));return c},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===a&&b[e].destroy();p([c.plotLines||[],d.plotLines||[],c.plotBands||[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&ha(b,b[e])})}});qa.prototype.getLogTickPositions=function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=w(a),g=this.getLinearTickPositions(a,
b,c);else if(a>=0.08)for(var f=N(b),h,i,j,k,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++)j=xa(ga(f)*e[h]),j>b&&(!d||k<=c)&&g.push(k),k>c&&(l=!0),k=j}else if(b=ga(b),c=ga(c),a=e[d?"minorTickInterval":"tickInterval"],a=n(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=nb(a,null,mb(a)),g=Ra(this.getLinearTickPositions(a,b,c),xa),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=
a;return g};qa.prototype.getTimeTicks=function(a,b,c,d){var e=[],f={},g=G.global.useUTC,h,i=new Date(b-Pa),j=a.unitRange,k=a.count;if(t(b)){j>=E.second&&(i.setMilliseconds(0),i.setSeconds(j>=E.minute?0:k*N(i.getSeconds()/k)));if(j>=E.minute)i[Cb](j>=E.hour?0:k*N(i[pb]()/k));if(j>=E.hour)i[Db](j>=E.day?0:k*N(i[qb]()/k));if(j>=E.day)i[sb](j>=E.month?1:k*N(i[Wa]()/k));j>=E.month&&(i[Eb](j>=E.year?0:k*N(i[db]()/k)),h=i[eb]());j>=E.year&&(h-=h%k,i[Fb](h));if(j===E.week)i[sb](i[Wa]()-i[rb]()+n(d,1));b=
1;Pa&&(i=new Date(i.getTime()+Pa));h=i[eb]();for(var d=i.getTime(),l=i[db](),m=i[Wa](),q=g?Pa:(864E5+i.getTimezoneOffset()*6E4)%864E5;d<c;)e.push(d),j===E.year?d=cb(h+b*k,0):j===E.month?d=cb(h,l+b*k):!g&&(j===E.day||j===E.week)?d=cb(h,l,m+b*k*(j===E.day?1:7)):d+=j*k,b++;e.push(d);p(wb(e,function(a){return j<=E.hour&&a%E.day===q}),function(a){f[a]="day"})}e.info=r(a,{higherRanks:f,totalRange:j*k});return e};qa.prototype.normalizeTimeTickInterval=function(a,b){var c=b||[["millisecond",[1,2,5,10,20,
25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]],d=c[c.length-1],e=E[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=E[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+E[c[g+1][0]])/2)break;e===E.year&&a<5*e&&(f=[1,2,5]);c=nb(a/e,f,d[0]==="year"?s(mb(a/e),1):1);return{unitRange:e,count:c,unitName:d[0]}};Gb.prototype={destroy:function(){Ma(this,this.axis)},render:function(a){var b=this.options,
c=b.format,c=c?Fa(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,0,0,b.useHTML).css(b.style).attr({align:this.textAlign,rotation:b.rotation,visibility:"hidden"}).add(a)},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,f=this.isNegative,g=c.translate(this.percent?100:this.total,0,0,0,1),c=c.translate(0),c=M(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?
c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e.attr({visibility:this.options.crop===!1||d.isInsidePlot(f.x,f.y)?V?"inherit":"visible":"hidden"})}};tb.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=z(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape,null,null,b.useHTML,null,"tooltip").attr({padding:e,fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).add().attr({y:-999});
da||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden;r(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:g?(2*f.anchorX+c)/3:c,anchorY:g?(f.anchorY+d)/2:d});e.label.attr(f);if(g&&(M(a-f.x)>1||M(b-f.y)>1))clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,
c,d)},32)},hide:function(){var a=this,b;clearTimeout(this.hideTimer);if(!this.isHidden)b=this.chart.hoverPoints,this.hideTimer=setTimeout(function(){a.label.fadeOut();a.isHidden=!0},n(this.options.hideDelay,500)),b&&p(b,function(a){a.setState()}),this.chart.hoverPoints=null},getAnchor:function(a,b){var c,d=this.chart,e=d.inverted,f=d.plotTop,g=0,h=0,i,a=ja(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===u&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(p(a,function(a){i=
a.series.yAxis;g+=a.plotX;h+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&i?i.top-f:0)}),g/=a.length,h/=a.length,c=[e?d.plotWidth-h:g,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-g:h]);return Ra(c,w)},getPosition:function(a,b,c){var d=this.chart,e=d.plotLeft,f=d.plotTop,g=d.plotWidth,h=d.plotHeight,i=n(this.options.distance,12),j=c.plotX,c=c.plotY,d=j+e+(d.inverted?i:-a-i),k=c-b+f+15,l;d<7&&(d=e+s(j,0)+i);d+a>e+g&&(d-=d+a-(e+g),k=c-b+f-i,l=!0);k<f+5&&(k=f+5,l&&c>=k&&c<=k+b&&(k=c+
f+i));k+b>f+h&&(k=s(f,f+h-b-i));return{x:d,y:k}},defaultFormatter:function(a){var b=this.points||ja(this),c=b[0].series,d;d=[c.tooltipHeaderFormatter(b[0])];p(b,function(a){c=a.series;d.push(c.tooltipFormatter&&c.tooltipFormatter(a)||a.point.tooltipFormatter(c.tooltipOptions.pointFormat))});d.push(a.options.footerFormat||"");return d.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h={},i,j=[];i=e.formatter||this.defaultFormatter;var h=c.hoverPoints,k,l=this.shared;
clearTimeout(this.hideTimer);this.followPointer=ja(a)[0].series.tooltipOptions.followPointer;g=this.getAnchor(a,b);f=g[0];g=g[1];l&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,h&&p(h,function(a){a.setState()}),p(a,function(a){a.setState("hover");j.push(a.getLabelConfig())}),h={x:a[0].category,y:a[0].y},h.points=j,a=a[0]):h=a.getLabelConfig();i=i.call(h,this);h=a.series;i===!1?this.hide():(this.isHidden&&(Za(d),d.attr("opacity",1).show()),d.attr({text:i}),k=e.borderColor||a.color||h.color||
"#606060",d.attr({stroke:k}),this.updatePosition({plotX:f,plotY:g}),this.isHidden=!1);A(c,"tooltipRefresh",{text:i,x:f+c.plotLeft,y:g+c.plotTop,borderColor:k})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(w(c.x),w(c.y),a.plotX+b.plotLeft,a.plotY+b.plotTop)}};var $a=Highcharts.Pointer=function(a,b){this.init(a,b)};$a.prototype={init:function(a,b){var c=b.chart,d=c.events,e=da?"":c.zoomType,c=a.inverted,
f;this.options=b;this.chart=a;this.zoomX=f=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=f&&!c||e&&c;this.zoomVert=e&&!c||f&&c;this.runChartClick=d&&!!d.click;this.pinchDown=[];this.lastValidTouch={};if(b.tooltip.enabled)a.tooltip=new tb(a,b.tooltip);this.setDOMEvents()},normalize:function(a,b){var c,d,a=a||C.event;if(!a.target)a.target=a.srcElement;a=Rb(a);d=a.touches?a.touches.item(0):a;if(!b)this.chartPosition=b=Qb(this.chart.container);d.pageX===u?(c=s(a.x,a.clientX-b.left),d=a.y):(c=d.pageX-
b.left,d=d.pageY-b.top);return r(a,{chartX:w(c),chartY:w(d)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};p(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},getIndex:function(a){var b=this.chart;return b.inverted?b.plotHeight+b.plotTop-a.chartY:a.chartX-b.plotLeft},runPointActions:function(a){var b=this,c=b.chart,d=c.series,e=c.tooltip,f,g,h=c.hoverPoint,i=c.hoverSeries,j,k,l=c.chartWidth,m=b.getIndex(a);if(e&&
b.options.tooltip.shared&&(!i||!i.noSharedTooltip)){g=[];j=d.length;for(k=0;k<j;k++)if(d[k].visible&&d[k].options.enableMouseTracking!==!1&&!d[k].noSharedTooltip&&d[k].tooltipPoints.length&&(f=d[k].tooltipPoints[m])&&f.series)f._dist=M(m-f.clientX),l=I(l,f._dist),g.push(f);for(j=g.length;j--;)g[j]._dist>l&&g.splice(j,1);if(g.length&&g[0].clientX!==b.hoverX)e.refresh(g,a),b.hoverX=g[0].clientX}if(i&&i.tracker){if((f=i.tooltipPoints[m])&&f!==h)f.onMouseOver(a)}else e&&e.followPointer&&!e.isHidden&&
(d=e.getAnchor([{}],a),e.updatePosition({plotX:d[0],plotY:d[1]}));if(e&&!b._onDocumentMouseMove)b._onDocumentMouseMove=function(a){b.onDocumentMouseMove(a)},F(y,"mousemove",b._onDocumentMouseMove);p(c.axes,function(b){b.drawCrosshair(a,n(f,h))})},reset:function(a){var b=this.chart,c=b.hoverSeries,d=b.hoverPoint,e=b.tooltip,f=e&&e.shared?b.hoverPoints:d;(a=a&&e&&f)&&ja(f)[0].plotX===u&&(a=!1);if(a)e.refresh(f),d&&d.setState(d.state,!0);else{if(d)d.onMouseOut();if(c)c.onMouseOut();e&&e.hide();if(this._onDocumentMouseMove)X(y,
"mousemove",this._onDocumentMouseMove),this._onDocumentMouseMove=null;p(b.axes,function(a){a.hideCrosshair()});this.hoverX=null}},scaleGroups:function(a,b){var c=this.chart,d;p(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},pinchTranslate:function(a,b,c,d,e,f,g,h){a&&this.pinchTranslateDirection(!0,c,d,
e,f,g,h);b&&this.pinchTranslateDirection(!1,c,d,e,f,g,h)},pinchTranslateDirection:function(a,b,c,d,e,f,g,h){var i=this.chart,j=a?"x":"y",k=a?"X":"Y",l="chart"+k,m=a?"width":"height",q=i["plot"+(a?"Left":"Top")],o,n,p=h||1,s=i.inverted,t=i.bounds[a?"h":"v"],r=b.length===1,w=b[0][l],u=c[0][l],v=!r&&b[1][l],x=!r&&c[1][l],y,c=function(){!r&&M(w-v)>20&&(p=h||M(u-x)/M(w-v));n=(q-u)/p+w;o=i["plot"+(a?"Width":"Height")]/p};c();b=n;b<t.min?(b=t.min,y=!0):b+o>t.max&&(b=t.max-o,y=!0);y?(u-=0.8*(u-g[j][0]),r||
(x-=0.8*(x-g[j][1])),c()):g[j]=[u,x];s||(f[j]=n-q,f[m]=o);f=s?1/p:p;e[m]=o;e[j]=b;d[s?a?"scaleY":"scaleX":"scale"+k]=p;d["translate"+k]=f*q+(u-f*w)},pinch:function(a){var b=this,c=b.chart,d=b.pinchDown,e=c.tooltip&&c.tooltip.options.followTouchMove,f=a.touches,g=f.length,h=b.lastValidTouch,i=b.zoomHor||b.pinchHor,j=b.zoomVert||b.pinchVert,k=i||j,l=b.selectionMarker,m={},q=g===1&&(b.inClass(a.target,"highcharts-tracker")&&c.runTrackerClick||c.runChartClick),o={};(k||e)&&!q&&a.preventDefault();Ra(f,
function(a){return b.normalize(a)});if(a.type==="touchstart")p(f,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),h.x=[d[0].chartX,d[1]&&d[1].chartX],h.y=[d[0].chartY,d[1]&&d[1].chartY],p(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(a.dataMin),f=a.toPixels(a.dataMax),g=I(e,f),e=s(e,f);b.min=I(a.pos,g-d);b.max=s(a.pos+a.len,e+d)}});else if(d.length){if(!l)b.selectionMarker=l=r({destroy:la},c.plotBox);b.pinchTranslate(i,j,d,f,m,l,o,h);b.hasPinched=
k;b.scaleGroups(m,o);!k&&e&&g===1&&this.runPointActions(b.normalize(a))}},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,e=a.chartY,f=this.zoomHor,g=this.zoomVert,h=b.plotLeft,i=b.plotTop,j=b.plotWidth,k=b.plotHeight,l,m=this.mouseDownX,q=this.mouseDownY;d<h?d=h:d>h+j&&(d=h+j);e<i?e=i:e>i+k&&(e=i+k);this.hasDragged=Math.sqrt(Math.pow(m-
d,2)+Math.pow(q-e,2));if(this.hasDragged>10){l=b.isInsidePlot(m-h,q-i);if(b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&l&&!this.selectionMarker)this.selectionMarker=b.renderer.rect(h,i,f?1:j,g?1:k,0).attr({fill:c.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();this.selectionMarker&&f&&(d-=m,this.selectionMarker.attr({width:M(d),x:(d>0?0:d)+m}));this.selectionMarker&&g&&(d=e-q,this.selectionMarker.attr({height:M(d),y:(d>0?0:d)+q}));l&&!this.selectionMarker&&c.panning&&b.pan(a,c.panning)}},
drop:function(a){var b=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={xAxis:[],yAxis:[],originalEvent:a.originalEvent||a},e=this.selectionMarker,f=e.x,g=e.y,h;if(this.hasDragged||c)p(b.axes,function(a){if(a.zoomEnabled){var b=a.horiz,c=a.toValue(b?f:g),b=a.toValue(b?f+e.width:g+e.height);!isNaN(c)&&!isNaN(b)&&(d[a.coll].push({axis:a,min:I(c,b),max:s(c,b)}),h=!0)}}),h&&A(b,"selection",d,function(a){b.zoom(r(a,c?{animation:!1}:null))});this.selectionMarker=this.selectionMarker.destroy();
c&&this.scaleGroups()}if(b)D(b.container,{cursor:b._cursor}),b.cancelClick=this.hasDragged>10,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[]},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(a){this.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,d=b.hoverSeries,a=this.normalize(a,c);c&&d&&!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,
a.chartY-b.plotTop)&&this.reset()},onContainerMouseLeave:function(){this.reset();this.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart,a=this.normalize(a);b.mouseIsDown==="mousedown"&&this.drag(a);(this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop))&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=v(a,"class"))if(c.indexOf(b)!==-1)return!0;else if(c.indexOf("highcharts-container")!==-1)return!1;a=
a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries,c=(a=a.relatedTarget||a.toElement)&&a.point&&a.point.series;if(b&&!b.options.stickyTracking&&!this.inClass(a,"highcharts-tooltip")&&c!==b)b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,f=b.inverted,g,h,i,a=this.normalize(a);a.cancelBubble=!0;if(!b.cancelClick)c&&this.inClass(a.target,"highcharts-tracker")?(g=this.chartPosition,h=c.plotX,i=c.plotY,r(c,{pageX:g.left+d+(f?
b.plotWidth-i:h),pageY:g.top+e+(f?b.plotHeight-h:i)}),A(c.series,"click",r(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&A(b,"click",a))},onContainerTouchStart:function(a){var b=this.chart;a.touches.length===1?(a=this.normalize(a),b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)?(this.runPointActions(a),this.pinch(a)):this.reset()):a.touches.length===2&&this.pinch(a)},onContainerTouchMove:function(a){(a.touches.length===
1||a.touches.length===2)&&this.pinch(a)},onDocumentTouchEnd:function(a){this.drop(a)},setDOMEvents:function(){var a=this,b=a.chart.container,c;this._events=c=[[b,"onmousedown","onContainerMouseDown"],[b,"onmousemove","onContainerMouseMove"],[b,"onclick","onContainerClick"],[b,"mouseleave","onContainerMouseLeave"],[y,"mouseup","onDocumentMouseUp"]];ib&&c.push([b,"ontouchstart","onContainerTouchStart"],[b,"ontouchmove","onContainerTouchMove"],[y,"touchend","onDocumentTouchEnd"]);p(c,function(b){a["_"+
b[2]]=function(c){a[b[2]](c)};b[1].indexOf("on")===0?b[0][b[1]]=a["_"+b[2]]:F(b[0],b[1],a["_"+b[2]])})},destroy:function(){var a=this;p(a._events,function(b){b[1].indexOf("on")===0?b[0][b[1]]=null:X(b[0],b[1],a["_"+b[2]])});delete a._events;clearInterval(a.tooltipTimeout)}};J=Highcharts.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function(c){var d=c.target,e;if(b.hoverSeries!==a)a.onMouseOver();for(;d&&!e;)e=d.point,d=d.parentNode;
if(e!==u&&e!==b.hoverPoint)e.onMouseOver(c)};p(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a});if(!a._hasTracking)p(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),ib))a[b].on("touchstart",f)}),a._hasTracking=!0},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=f.pointer,
h=f.renderer,i=f.options.tooltip.snap,j=a.tracker,k=b.cursor,l=k&&{cursor:k},k=a.singlePoints,m,q=function(){if(f.hoverSeries!==a)a.onMouseOver()};if(e&&!c)for(m=e+1;m--;)d[m]==="M"&&d.splice(m+1,0,d[m+1]-i,d[m+2],"L"),(m&&d[m]==="M"||m===e)&&d.splice(m,0,"L",d[m-2]+i,d[m-1]);for(m=0;m<k.length;m++)e=k[m],d.push("M",e.plotX-i,e.plotY,"L",e.plotX+i,e.plotY);j?j.attr({d:d}):(a.tracker=h.path(d).attr({"stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:Kb,fill:c?Kb:Q,"stroke-width":b.lineWidth+
(c?0:2*i),zIndex:2}).add(a.group),p([a.tracker,a.markerGroup],function(a){a.addClass("highcharts-tracker").on("mouseover",q).on("mouseout",function(a){g.onTrackerMouseOut(a)}).css(l);if(ib)a.on("touchstart",q)}))}};if(C.PointerEvent||C.MSPointerEvent){var na={};$a.prototype.getWebkitTouches=function(){var a,b=[];b.item=function(a){return this[a]};for(a in na)na.hasOwnProperty(a)&&b.push({pageX:na[a].pageX,pageY:na[a].pageY,target:na[a].target});return b};Va($a.prototype,"init",function(a,b,c){b.container.style["-ms-touch-action"]=
b.container.style["touch-action"]="none";a.call(this,b,c)});Va($a.prototype,"setDOMEvents",function(a){var b=this;a.apply(this,Array.prototype.slice.call(arguments,1));p([[this.chart.container,"PointerDown","touchstart","onContainerTouchStart",function(a){na[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}}],[this.chart.container,"PointerMove","touchmove","onContainerTouchMove",function(a){na[a.pointerId]={pageX:a.pageX,pageY:a.pageY};if(!na[a.pointerId].target)na[a.pointerId].target=
a.currentTarget}],[document,"PointerUp","touchend","onDocumentTouchEnd",function(a){delete na[a.pointerId]}]],function(a){F(a[0],window.PointerEvent?a[1].toLowerCase():"MS"+a[1],function(d){d=d.originalEvent;if(d.pointerType==="touch"||d.pointerType===d.MSPOINTER_TYPE_TOUCH)a[4](d),b[a[3]]({type:a[2],target:d.currentTarget,preventDefault:la,touches:b.getWebkitTouches()})})})})}var zb=Highcharts.Legend=function(a,b){this.init(a,b)};zb.prototype={init:function(a,b){var c=this,d=b.itemStyle,e=n(b.padding,
8),f=b.itemMarginTop||0;this.options=b;if(b.enabled)c.baseline=z(d.fontSize)+3+f,c.itemStyle=d,c.itemHiddenStyle=x(d,b.itemHiddenStyle),c.itemMarginTop=f,c.padding=e,c.initialItemX=e,c.initialItemY=e-5,c.maxItemWidth=0,c.chart=a,c.itemHeight=0,c.lastLineHeight=0,c.symbolWidth=n(b.symbolWidth,16),c.pages=[],c.render(),F(c.chart,"endResize",function(){c.positionCheckboxes()})},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=
b?c.itemStyle.color:g,h=b?a.legendColor||a.color:g,g=a.options&&a.options.marker,i={stroke:h,fill:h},j;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(j in g=a.convertAttribs(g),g)d=g[j],d!==u&&(i[j]=d);f.attr(i)}},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;a.legendGroup&&a.legendGroup.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;p(["legendItem",
"legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&Na(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy()},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||this.legendHeight;if(b)c=b.translateY,p(this.allItems,function(e){var f=e.checkbox,g;f&&(g=c+f.y+(a||0)+3,D(f,{left:b.translateX+e.legendItemWidth+f.x-20+"px",top:g+"px",display:g>c-6&&g<c+d-6?"":Q}))})},renderTitle:function(){var a=
this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);a=this.title.getBBox();c=a.height;this.offsetWidth=a.width;this.contentGroup.attr({translateY:c})}this.titleHeight=c},renderItem:function(a){var B;var b=this,c=b.chart,d=c.renderer,e=b.options,f=e.layout==="horizontal",g=b.symbolWidth,h=e.symbolPadding,i=b.itemStyle,j=b.itemHiddenStyle,k=b.padding,
l=f?n(e.itemDistance,8):0,m=!e.rtl,q=e.width,o=e.itemMarginBottom||0,p=b.itemMarginTop,t=b.initialItemX,r=a.legendItem,u=a.series&&a.series.drawLegendSymbol?a.series:a,v=u.options,v=v&&v.showCheckbox,y=e.useHTML;if(!r&&(a.legendGroup=d.g("legend-item").attr({zIndex:1}).add(b.scrollGroup),u.drawLegendSymbol(b,a),a.legendItem=r=d.text(e.labelFormat?Fa(e.labelFormat,a):e.labelFormatter.call(a),m?g+h:-h,b.baseline,y).css(x(a.visible?i:j)).attr({align:m?"left":"right",zIndex:2}).add(a.legendGroup),(y?
r:a.legendGroup).on("mouseover",function(){a.setState("hover");r.css(b.options.itemHoverStyle)}).on("mouseout",function(){r.css(a.visible?i:j);a.setState()}).on("click",function(b){var c=function(){a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):A(a,"legendItemClick",b,c)}),b.colorizeItem(a,a.visible),v))a.checkbox=T("input",{type:"checkbox",checked:a.selected,defaultChecked:a.selected},e.itemCheckboxStyle,c.container),F(a.checkbox,"click",function(b){A(a,
"checkboxClick",{checked:b.target.checked},function(){a.select()})});d=r.getBBox();B=a.legendItemWidth=e.itemWidth||a.legendItemWidth||g+h+d.width+l+(v?20:0),e=B;b.itemHeight=g=w(a.legendItemHeight||d.height);if(f&&b.itemX-t+e>(q||c.chartWidth-2*k-t))b.itemX=t,b.itemY+=p+b.lastLineHeight+o,b.lastLineHeight=0;b.maxItemWidth=s(b.maxItemWidth,e);b.lastItemY=p+b.itemY+o;b.lastLineHeight=s(g,b.lastLineHeight);a._legendItemPos=[b.itemX,b.itemY];f?b.itemX+=e:(b.itemY+=p+g+o,b.lastLineHeight=g);b.offsetWidth=
q||s((f?b.itemX-t-l:e)+k,b.offsetWidth)},getAllItems:function(){var a=[];p(this.chart.series,function(b){var c=b.options;if(n(c.showInLegend,!t(c.linkedTo)?u:!1,!0))a=a.concat(b.legendItems||(c.legendType==="point"?b.data:b))});return a},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,j=a.options,k=a.padding,l=j.borderWidth,m=j.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),
a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup);a.renderTitle();e=a.getAllItems();ob(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});j.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;p(e,function(b){a.renderItem(b)});g=j.width||a.offsetWidth;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);if(l||m){g+=k;h+=k;if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp(null,null,null,g,h)),
i.isNew=!1}else a.box=i=c.rect(0,0,g,h,j.borderRadius,l||0).attr({stroke:j.borderColor,"stroke-width":l||0,fill:m||Q}).add(d).shadow(j.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;p(e,function(b){a.positionItem(b)});f&&d.align(r({width:g,height:h},j),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,
h,i=this.clipRect,j=e.navigation,k=n(j.animation,!0),l=j.arrowSize||12,m=this.nav,q=this.pages,o,s=this.allItems;e.layout==="horizontal"&&(f/=2);g&&(f=I(f,g));q.length=0;if(a>f&&!e.useHTML){this.clipHeight=h=f-20-this.titleHeight-this.padding;this.currentPage=n(this.currentPage,1);this.fullHeight=a;p(s,function(a,b){var c=a._legendItemPos[1],d=w(a.legendItem.bBox.height),e=q.length;if(!e||c-q[e-1]>h)q.push(o||c);b===s.length-1&&c+d-q[e-1]>h&&q.push(c);c!==o&&(o=c)});if(!i)i=b.clipRect=d.clipRect(0,
this.padding,9999,0),b.contentGroup.clip(i);i.attr({height:h});if(!m)this.nav=m=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,l,l).on("click",function(){b.scroll(-1,k)}).add(m),this.pager=d.text("",15,10).css(j.style).add(m),this.down=d.symbol("triangle-down",0,0,l,l).on("click",function(){b.scroll(1,k)}).add(m);b.scroll(0);a=f}else if(m)i.attr({height:c.chartHeight}),m.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a},scroll:function(a,b){var c=this.pages,
d=c.length,e=this.currentPage+a,f=this.clipHeight,g=this.options.navigation,h=g.activeColor,g=g.inactiveColor,i=this.pager,j=this.padding;e>d&&(e=d);if(e>0)b!==u&&Oa(b,this.chart),this.nav.attr({translateX:j,translateY:f+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({fill:e===1?g:h}).css({cursor:e===1?"default":"pointer"}),i.attr({text:e+"/"+d}),this.down.attr({x:18+this.pager.getBBox().width,fill:e===d?g:h}).css({cursor:e===d?"default":"pointer"}),c=-c[e-1]+this.initialItemY,
this.scrollGroup.animate({translateY:c}),this.currentPage=e,this.positionCheckboxes(c)}};R=Highcharts.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.options.symbolHeight||12;b.legendSymbol=this.chart.renderer.rect(0,a.baseline-5-c/2,a.symbolWidth,c,n(a.options.symbolRadius,2)).attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,d;d=a.symbolWidth;var e=this.chart.renderer,f=this.legendGroup,a=a.baseline-w(e.fontMetrics(a.options.itemStyle.fontSize).b*
0.3),g;if(b.lineWidth){g={"stroke-width":b.lineWidth};if(b.dashStyle)g.dashstyle=b.dashStyle;this.legendLine=e.path(["M",0,a,"L",d,a]).attr(g).add(f)}if(c&&c.enabled)b=c.radius,this.legendSymbol=d=e.symbol(this.symbol,d/2-b,a-b,2*b,2*b).add(f),d.isMarker=!0}};/Trident\/7\.0/.test(ra)&&Va(zb.prototype,"positionItem",function(a,b){var c=this,d=function(){b._legendItemPos&&a.call(c,b)};c.chart.renderer.forExport?d():setTimeout(d)});fb.prototype={init:function(a,b){var c,d=a.series;a.series=null;c=x(G,
a);c.series=a.series=d;this.userOptions=a;d=c.chart;this.margin=this.splashArray("margin",d);this.spacing=this.splashArray("spacing",d);var e=d.events;this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,g;f.index=Ia.length;Ia.push(f);d.reflow!==!1&&F(f,"load",function(){f.initReflow()});if(e)for(g in e)F(f,g,e[g]);f.xAxis=[];f.yAxis=[];f.animation=da?!1:n(d.animation,!0);f.pointCount=0;f.counters=new Ab;
f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=L[a.type||b.type||b.defaultSeriesType])||ka(17,!0);b=new b;b.init(this,a);return b},isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},adjustTickAmounts:function(){this.options.chart.alignTicks!==!1&&p(this.axes,function(a){a.adjustTickAmount()});this.maxTicks=null},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.isDirtyBox,
j=c.length,k=j,l=this.renderer,m=l.isHidden(),q=[];Oa(a,this);m&&this.cloneRenderTo();for(this.layOutTitles();k--;)if(a=c[k],a.options.stacking&&(g=!0,a.isDirty)){h=!0;break}if(h)for(k=j;k--;)if(a=c[k],a.options.stacking)a.isDirty=!0;p(c,function(a){a.isDirty&&a.options.legendType==="point"&&(f=!0)});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;g&&this.getStacks();if(this.hasCartesianSeries){if(!this.isResizing)this.maxTicks=null,p(b,function(a){a.setScale()});this.adjustTickAmounts();
this.getMargins();p(b,function(a){a.isDirty&&(i=!0)});p(b,function(a){if(a.isDirtyExtremes)a.isDirtyExtremes=!1,q.push(function(){A(a,"afterSetExtremes",r(a.eventArgs,a.getExtremes()));delete a.eventArgs});(i||g)&&a.redraw()})}i&&this.drawChartBox();p(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset&&d.reset(!0);l.draw();A(this,"redraw");m&&this.cloneRenderTo(!0);p(q,function(a){a.call()})},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===
a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=ja(b.xAxis||{}),b=b.yAxis=ja(b.yAxis||{});p(c,function(a,b){a.index=b;a.isX=!0});p(b,function(a,b){a.index=b});c=c.concat(b);p(c,function(b){new qa(a,b)});a.adjustTickAmounts()},getSelectedPoints:function(){var a=[];p(this.series,function(b){a=a.concat(wb(b.points||[],
function(a){return a.selected}))});return a},getSelectedSeries:function(){return wb(this.series,function(a){return a.selected})},getStacks:function(){var a=this;p(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks});p(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+n(b.options.stack,"")})},showResetZoom:function(){var a=this,b=G.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo===
"chart"?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f)},zoomOut:function(){var a=this;A(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?p(this.axes,function(a){b=a.zoom()}):p(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=
e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&S(e))this.resetZoomButton=e.destroy();b&&this.redraw(n(this.options.chart.animation,a&&a.animation,this.pointCount<100))},pan:function(a,b){var c=this,d=c.hoverPoints,e;d&&p(d,function(a){a.setState()});p(b==="xy"?[1,0]:[1],function(b){var d=a[b?"chartX":"chartY"],h=c[b?"xAxis":"yAxis"][0],i=c[b?"mouseDownX":"mouseDownY"],j=(h.pointRange||0)/2,k=h.getExtremes(),l=h.toValue(i-d,!0)+j,i=h.toValue(i+
c[b?"plotWidth":"plotHeight"]-d,!0)-j;h.series.length&&l>I(k.dataMin,k.min)&&i<s(k.dataMax,k.max)&&(h.setExtremes(l,i,!1,!1,{trigger:"pan"}),e=!0);c[b?"mouseDownX":"mouseDownY"]=d});e&&c.redraw(!1);D(c.container,{cursor:"move"})},setTitle:function(a,b){var f;var c=this,d=c.options,e;e=d.title=x(d.title,a);f=d.subtitle=x(d.subtitle,b),d=f;p([["title",a,e],["subtitle",b,d]],function(a){var b=a[0],d=c[b],e=a[1],a=a[2];d&&e&&(c[b]=d=d.destroy());a&&a.text&&!d&&(c[b]=c.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,
"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});c.layOutTitles()},layOutTitles:function(){var a=0,b=this.title,c=this.subtitle,d=this.options,e=d.title,d=d.subtitle,f=this.spacingBox.width-44;if(b&&(b.css({width:(e.width||f)+"px"}).align(r({y:15},e),!1,"spacingBox"),!e.floating&&!e.verticalAlign))a=b.getBBox().height,a>=18&&a<=25&&(a=15);c&&(c.css({width:(d.width||f)+"px"}).align(r({y:a+e.margin},d),!1,"spacingBox"),!d.floating&&!d.verticalAlign&&(a=Ha(a+c.getBBox().height)));this.titleOffset=
a},getChartSize:function(){var a=this.options.chart,b=this.renderToClone||this.renderTo;this.containerWidth=jb(b,"width");this.containerHeight=jb(b,"height");this.chartWidth=s(0,a.width||this.containerWidth||600);this.chartHeight=s(0,n(a.height,this.containerHeight>19?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Na(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=
b=this.renderTo.cloneNode(0),D(b,{position:"absolute",top:"-9999px",display:"block"}),y.body.appendChild(b),c&&b.appendChild(c))},getContainer:function(){var a,b=this.options.chart,c,d,e;this.renderTo=a=b.renderTo;e="highcharts-"+ub++;if(fa(a))this.renderTo=a=y.getElementById(a);a||ka(13,!0);c=z(v(a,"data-highcharts-chart"));!isNaN(c)&&Ia[c]&&Ia[c].destroy();v(a,"data-highcharts-chart",this.index);a.innerHTML="";a.offsetWidth||this.cloneRenderTo();this.getChartSize();c=this.chartWidth;d=this.chartHeight;
this.container=a=T(Ga,{className:"highcharts-container"+(b.className?" "+b.className:""),id:e},r({position:"relative",overflow:"hidden",width:c+"px",height:d+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},b.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=b.forExport?new ua(a,c,d,!0):new Ya(a,c,d);da&&this.renderer.create(this,a,c,d)},getMargins:function(){var a=this.spacing,b,c=this.legend,d=this.margin,e=this.options.legend,
f=n(e.margin,10),g=e.x,h=e.y,i=e.align,j=e.verticalAlign,k=this.titleOffset;this.resetMargins();b=this.axisOffset;if(k&&!t(d[0]))this.plotTop=s(this.plotTop,k+this.options.title.margin+a[0]);if(c.display&&!e.floating)if(i==="right"){if(!t(d[1]))this.marginRight=s(this.marginRight,c.legendWidth-g+f+a[1])}else if(i==="left"){if(!t(d[3]))this.plotLeft=s(this.plotLeft,c.legendWidth+g+f+a[3])}else if(j==="top"){if(!t(d[0]))this.plotTop=s(this.plotTop,c.legendHeight+h+f+a[0])}else if(j==="bottom"&&!t(d[2]))this.marginBottom=
s(this.marginBottom,c.legendHeight-h+f+a[2]);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);this.hasCartesianSeries&&p(this.axes,function(a){a.getOffset()});t(d[3])||(this.plotLeft+=b[3]);t(d[0])||(this.plotTop+=b[0]);t(d[2])||(this.marginBottom+=b[2]);t(d[1])||(this.marginRight+=b[1]);this.setChartSize()},reflow:function(a){var b=this,c=b.options.chart,d=b.renderTo,e=c.width||jb(d,"width"),f=c.height||jb(d,"height"),c=
a?a.target:C,d=function(){if(b.container)b.setSize(e,f,!1),b.hasUserSize=null};if(!b.hasUserSize&&e&&f&&(c===C||c===y)){if(e!==b.containerWidth||f!==b.containerHeight)clearTimeout(b.reflowTimeout),a?b.reflowTimeout=setTimeout(d,100):d();b.containerWidth=e;b.containerHeight=f}},initReflow:function(){var a=this,b=function(b){a.reflow(b)};F(C,"resize",b);F(a,"destroy",function(){X(C,"resize",b)})},setSize:function(a,b,c){var d=this,e,f,g;d.isResizing+=1;g=function(){d&&A(d,"endResize",null,function(){d.isResizing-=
1})};Oa(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;if(t(a))d.chartWidth=e=s(0,w(a)),d.hasUserSize=!!e;if(t(b))d.chartHeight=f=s(0,w(b));(oa?kb:D)(d.container,{width:e+"px",height:f+"px"},oa);d.setChartSize(!0);d.renderer.setSize(e,f,c);d.maxTicks=null;p(d.axes,function(a){a.isDirty=!0;a.setScale()});p(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.getMargins();d.redraw(c);d.oldChartHeight=null;A(d,"resize");oa===!1?g():setTimeout(g,oa&&oa.duration||
500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,e=this.chartHeight,f=this.options.chart,g=this.spacing,h=this.clipOffset,i,j,k,l;this.plotLeft=i=w(this.plotLeft);this.plotTop=j=w(this.plotTop);this.plotWidth=k=s(0,w(d-i-this.marginRight));this.plotHeight=l=s(0,w(e-j-this.marginBottom));this.plotSizeX=b?l:k;this.plotSizeY=b?k:l;this.plotBorderWidth=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:g[3],y:g[0],width:d-g[3]-g[1],height:e-g[0]-g[2]};this.plotBox=
c.plotBox={x:i,y:j,width:k,height:l};d=2*N(this.plotBorderWidth/2);b=Ha(s(d,h[3])/2);c=Ha(s(d,h[0])/2);this.clipBox={x:b,y:c,width:N(this.plotSizeX-s(d,h[1])/2-b),height:N(this.plotSizeY-s(d,h[2])/2-c)};a||p(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this.spacing,b=this.margin;this.plotTop=n(b[0],a[0]);this.marginRight=n(b[1],a[1]);this.marginBottom=n(b[2],a[2]);this.plotLeft=n(b[3],a[3]);this.axisOffset=[0,0,0,0];this.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=
this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,j=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,m=a.plotBorderWidth||0,q,o=this.plotLeft,n=this.plotTop,p=this.plotWidth,s=this.plotHeight,r=this.plotBox,t=this.clipRect,w=this.clipBox;q=i+(a.shadow?8:0);if(i||j)if(e)e.animate(e.crisp(null,null,null,c-q,d-q));else{e={fill:j||Q};if(i)e.stroke=a.borderColor,e["stroke-width"]=
i;this.chartBackground=b.rect(q/2,q/2,c-q,d-q,a.borderRadius,i).attr(e).add().shadow(a.shadow)}if(k)f?f.animate(r):this.plotBackground=b.rect(o,n,p,s,0).attr({fill:k}).add().shadow(a.plotShadow);if(l)h?h.animate(r):this.plotBGImage=b.image(l,o,n,p,s).add();t?t.animate({width:w.width,height:w.height}):this.clipRect=b.clipRect(w);if(m)g?g.animate(g.crisp(null,o,n,p,s)):this.plotBorder=b.rect(o,n,p,s,0,-m).attr({stroke:a.plotBorderColor,"stroke-width":m,zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=
this,b=a.options.chart,c,d=a.options.series,e,f;p(["inverted","angular","polar"],function(g){c=L[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=L[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},linkSeries:function(){var a=this,b=a.series;p(b,function(a){a.linkedSeries.length=0});p(b,function(b){var d=b.options.linkedTo;if(fa(d)&&(d=d===":previous"?a.series[b.index-1]:a.get(d)))d.linkedSeries.push(b),b.linkedParent=d})},render:function(){var a=this,b=a.axes,
c=a.renderer,d=a.options,e=d.labels,f=d.credits,g;a.setTitle();a.legend=new zb(a,d.legend);a.getStacks();p(b,function(a){a.setScale()});a.getMargins();a.maxTicks=null;p(b,function(a){a.setTickPositions(!0);a.setMaxTicks()});a.adjustTickAmounts();a.getMargins();a.drawChartBox();a.hasCartesianSeries&&p(b,function(a){a.render()});if(!a.seriesGroup)a.seriesGroup=c.g("series-group").attr({zIndex:3}).add();p(a.series,function(a){a.translate();a.setTooltipPoints();a.render()});e.items&&p(e.items,function(b){var d=
r(e.style,b.style),f=z(d.left)+a.plotLeft,g=z(d.top)+a.plotTop+12;delete d.left;delete d.top;c.text(b.html,f,g).attr({zIndex:2}).css(d).add()});if(f.enabled&&!a.credits)g=f.href,a.credits=c.text(f.text,0,0).on("click",function(){if(g)location.href=g}).attr({align:f.position.align,zIndex:8}).css(f.style).add().align(f.position);a.hasRendered=!0},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;A(a,"destroy");Ia[a.index]=u;a.renderTo.removeAttribute("data-highcharts-chart");
X(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();p("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML="",X(d),f&&Na(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!V&&C==C.top&&y.readyState!=="complete"||da&&!C.canvg?(da?Mb.push(function(){a.firstRender()},
a.options.global.canvasToolsURL):y.attachEvent("onreadystatechange",function(){y.detachEvent("onreadystatechange",a.firstRender);y.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options,c=a.callback;if(a.isReadyToRender())a.getContainer(),A(a,"init"),a.resetMargins(),a.setChartSize(),a.propFromSeries(),a.getAxes(),p(b.series||[],function(b){a.initSeries(b)}),a.linkSeries(),A(a,"beforeRender"),a.pointer=new $a(a,b),a.render(),a.renderer.draw(),c&&c.apply(a,
[a]),p(a.callbacks,function(b){b.apply(a,[a])}),a.cloneRenderTo(!0),A(a,"load")},splashArray:function(a,b){var c=b[a],c=S(c)?c:[c,c,c,c];return[n(b[a+"Top"],c[0]),n(b[a+"Right"],c[1]),n(b[a+"Bottom"],c[2]),n(b[a+"Left"],c[3])]}};fb.prototype.callbacks=[];var xb=Highcharts.CenteredSeriesMixin={getCenter:function(){var a=this.options,b=this.chart,c=2*(a.slicedOffset||0),d,e=b.plotWidth-2*c,f=b.plotHeight-2*c,b=a.center,a=[n(b[0],"50%"),n(b[1],"50%"),a.size||"100%",a.innerSize||0],g=I(e,f),h;return Ra(a,
function(a,b){h=/%$/.test(a);d=b<2||b===2&&h;return(h?[e,f,g,g][b]*z(a)/100:a)+(d?c:0)})}},Ja=function(){};Ja.prototype={init:function(a,b,c){this.series=a;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter++],a.colorCounter===b.length))a.colorCounter=0;a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.pointValKey,a=Ja.prototype.optionsToObject.call(this,a);r(this,
a);this.options=this.options?r(this.options,a):a;if(d)this.y=this[d];if(this.x===u&&c)this.x=b===u?c.autoIncrement():b;return this},optionsToObject:function(a){var b={},c=this.series,d=c.pointArrayMap||["y"],e=d.length,f=0,g=0;if(typeof a==="number"||a===null)b[d[0]]=a;else if(Ka(a)){if(a.length>e){c=typeof a[0];if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];f++}for(;g<e;)b[d[g++]]=a[f++]}else if(typeof a==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=
!0}return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),ha(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)X(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(c in this)this[c]=null},destroyElements:function(){for(var a="graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","),b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,
y:this.y,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},select:function(a,b){var c=this,d=c.series,e=d.chart,a=n(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[sa(c,d.data)]=c.options;c.setState(a&&"select");b||p(e.getSelectedPoints(),function(a){if(a.selected&&a!==c)a.selected=a.options.selected=!1,d.options.data[sa(a,d.data)]=a.options,a.setState(""),
a.firePointEvent("unselect")})})},onMouseOver:function(a){var b=this.series,c=b.chart,d=c.tooltip,e=c.hoverPoint;if(e&&e!==this)e.onMouseOut();this.firePointEvent("mouseOver");d&&(!d.shared||b.noSharedTooltip)&&d.refresh(this,a);this.setState("hover");c.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;if(!b||sa(this,b)===-1)this.firePointEvent("mouseOut"),this.setState(),a.hoverPoint=null},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=n(c.valueDecimals,
""),e=c.valuePrefix||"",f=c.valueSuffix||"";p(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return Fa(a,{point:this,series:this.series})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&e.allowPointSelect&&(c=function(a){d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});A(this,a,b,c)},importEvents:function(){if(!this.hasImportedEvents){var a=
x(this.series.options.point,this.options).events,b;this.events=a;for(b in a)F(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a,b){var c=this.plotX,d=this.plotY,e=this.series,f=e.options.states,g=Y[e.type].marker&&e.options.marker,h=g&&!g.enabled,i=g&&g.states[a],j=i&&i.enabled===!1,k=e.stateMarkerGraphic,l=this.marker||{},m=e.chart,q=this.pointAttr,a=a||"",b=b&&k;if(!(a===this.state&&!b||this.selected&&a!=="select"||f[a]&&f[a].enabled===!1||a&&(j||h&&!i.enabled)||a&&l.states&&l.states[a]&&
l.states[a].enabled===!1)){if(this.graphic)f=g&&this.graphic.symbolName&&q[a].r,this.graphic.attr(x(q[a],f?{x:c-f,y:d-f,width:2*f,height:2*f}:{}));else{if(a&&i)if(f=i.radius,l=l.symbol||e.symbol,k&&k.currentSymbol!==l&&(k=k.destroy()),k)k[b?"animate":"attr"]({x:c-f,y:d-f});else e.stateMarkerGraphic=k=m.renderer.symbol(l,c-f,d-f,2*f,2*f).attr(q[a]).add(e.markerGroup),k.currentSymbol=l;if(k)k[a&&m.isInsidePlot(c,d,m.inverted)?"show":"hide"]()}this.state=a}}};var O=function(){};O.prototype={isCartesian:!0,
type:"line",pointClass:Ja,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor",r:"radius"},axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],init:function(a,b){var c=this,d,e,f=a.series,g=function(a,b){return n(a.options.index,a._i)-n(b.options.index,b._i)};c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();r(c,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(da)b.animation=
!1;e=b.events;for(d in e)F(c,d,e[d]);if(e&&e.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();p(c.parallelArrays,function(a){c[a+"Data"]=[]});c.setData(b.data,!1);if(c.isCartesian)a.hasCartesianSeries=!0;f.push(c);c._i=f.length-1;ob(f,g);this.yAxis&&ob(this.yAxis.series,g);p(f,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)})},bindAxes:function(){var a=this,b=a.options,c=a.chart,d;p(a.axisTypes||[],function(e){p(c[e],function(c){d=
c.options;if(b[e]===d.index||b[e]!==u&&b[e]===d.id||b[e]===u&&d.index===0)c.series.push(a),a[e]=c,c.isDirty=!0});!a[e]&&a.optionalAxis!==e&&ka(18,!0)})},updateParallelArrays:function(a,b){var c=a.series,d=arguments;p(c.parallelArrays,typeof b==="number"?function(d){var f=d==="y"&&c.toYData?c.toYData(a):a[d];c[d+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))})},autoIncrement:function(){var a=this.options,b=this.xIncrement,b=n(b,a.pointStart,0);this.pointInterval=
n(this.pointInterval,a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},getSegments:function(){var a=-1,b=[],c,d=this.points,e=d.length;if(e)if(this.options.connectNulls){for(c=e;c--;)d[c].y===null&&d.splice(c,1);d.length&&(b=[d])}else p(d,function(c,g){c.y===null?(g>a+1&&b.push(d.slice(a+1,g)),a=g):g===e-1&&b.push(d.slice(a+1,g+1))});this.segments=b},setOptions:function(a){var b=this.chart,c=b.options.plotOptions,b=b.userOptions||{},d=b.plotOptions||{},e=c[this.type];this.userOptions=
a;c=x(e,c.series,a);this.tooltipOptions=x(G.tooltip,G.plotOptions[this.type].tooltip,b.tooltip,d.series&&d.series.tooltip,d[this.type]&&d[this.type].tooltip,a.tooltip);e.marker===null&&delete c.marker;return c},getColor:function(){var a=this.options,b=this.userOptions,c=this.chart.options.colors,d=this.chart.counters,e;e=a.color||Y[this.type].color;if(!e&&!a.colorByPoint)t(b._colorIndex)?a=b._colorIndex:(b._colorIndex=d.color,a=d.color++),e=c[a];this.color=e;d.wrapColor(c.length)},getSymbol:function(){var a=
this.userOptions,b=this.options.marker,c=this.chart,d=c.options.symbols,c=c.counters;this.symbol=b.symbol;if(!this.symbol)t(a._symbolIndex)?a=a._symbolIndex:(a._symbolIndex=c.symbol,a=c.symbol++),this.symbol=d[a];if(/^url/.test(this.symbol))b.radius=0;c.wrapSymbol(d.length)},drawLegendSymbol:R.drawLineMarker,setData:function(a,b){var c=this,d=c.points,e=c.options,f=c.chart,g=null,h=c.xAxis,i=h&&!!h.categories,j;c.xIncrement=null;c.pointRange=i?1:e.pointRange;c.colorCounter=0;var a=a||[],k=a.length;
j=e.turboThreshold;var l=this.xData,m=this.yData,q=c.pointArrayMap,q=q&&q.length;p(this.parallelArrays,function(a){c[a+"Data"].length=0});if(j&&k>j){for(j=0;g===null&&j<k;)g=a[j],j++;if(wa(g)){i=n(e.pointStart,0);e=n(e.pointInterval,1);for(j=0;j<k;j++)l[j]=i,m[j]=a[j],i+=e;c.xIncrement=i}else if(Ka(g))if(q)for(j=0;j<k;j++)e=a[j],l[j]=e[0],m[j]=e.slice(1,q+1);else for(j=0;j<k;j++)e=a[j],l[j]=e[0],m[j]=e[1];else ka(12)}else for(j=0;j<k;j++)if(a[j]!==u&&(e={series:c},c.pointClass.prototype.applyOptions.apply(e,
[a[j]]),c.updateParallelArrays(e,j),i&&e.name))h.names[e.x]=e.name;fa(m[0])&&ka(14,!0);c.data=[];c.options.data=a;for(j=d&&d.length||0;j--;)d[j]&&d[j].destroy&&d[j].destroy();if(h)h.minRange=h.userMinRange;c.isDirty=c.isDirtyData=f.isDirtyBox=!0;n(b,!0)&&f.redraw(!1)},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i=this.options,j=i.cropThreshold,k=this.isCartesian;if(k&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(k&&this.sorted&&(!j||
d>j||this.forceCrop))if(a=h.min,h=h.max,b[d-1]<a||b[0]>h)b=[],c=[];else if(b[0]<a||b[d-1]>h)e=this.cropData(this.xData,this.yData,a,h),b=e.xData,c=e.yData,e=e.start,f=!0;for(h=b.length-1;h>=0;h--)d=b[h]-b[h-1],d>0&&(g===u||d<g)?g=d:d<0&&this.requireSorting&&ka(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;if(i.pointRange===null)this.pointRange=g||1;this.closestPointRange=g},cropData:function(a,b,c,d){var e=a.length,f=0,g=e,h=n(this.cropShoulder,1),i;for(i=0;i<e;i++)if(a[i]>=
c){f=s(0,i-h);break}for(;i<e;i++)if(a[i]>d){g=i+h;break}return{xData:a.slice(f,g),yData:b.slice(f,g),start:f,end:g}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,h=this.cropStart||0,i,j=this.hasGroupedData,k,l=[],m;if(!b&&!j)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++)i=h+m,j?l[m]=(new f).init(this,[d[m]].concat(ja(e[m]))):(b[i]?k=b[i]:a[i]!==u&&(b[i]=k=(new f).init(this,a[i],d[m])),l[m]=k);if(b&&
(g!==(c=b.length)||j))for(m=0;m<c;m++)if(m===h&&!j&&(m+=g),b[m])b[m].destroyElements(),b[m].plotX=u;this.data=b;this.points=l},setStackedPoints:function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=this.processedXData,b=this.processedYData,c=[],d=b.length,e=this.options,f=e.threshold,g=e.stack,e=e.stacking,h=this.stackKey,i="-"+h,j=this.negStacks,k=this.yAxis,l=k.stacks,m=k.oldStacks,q,o,n,p,r;for(n=0;n<d;n++){p=a[n];r=b[n];o=(q=j&&r<f)?
i:h;l[o]||(l[o]={});if(!l[o][p])m[o]&&m[o][p]?(l[o][p]=m[o][p],l[o][p].total=null):l[o][p]=new Gb(k,k.options.stackLabels,q,p,g,e);o=l[o][p];o.points[this.index]=[o.cum||0];e==="percent"?(q=q?h:i,j&&l[q]&&l[q][p]?(q=l[q][p],o.total=q.total=s(q.total,o.total)+M(r)||0):o.total=aa(o.total+(M(r)||0))):o.total=aa(o.total+(r||0));o.cum=(o.cum||0)+(r||0);o.points[this.index].push(o.cum);c[n]=o.cum}if(e==="percent")k.usePercentage=!0;this.stackedYData=c;k.oldStacks={}}},setPercentStacks:function(){var a=
this,b=a.stackKey,c=a.yAxis.stacks;p([b,"-"+b],function(b){var d;for(var e=a.xData.length,f,g;e--;)if(f=a.xData[e],d=(g=c[b]&&c[b][f])&&g.points[a.index],f=d)g=g.total?100/g.total:0,f[0]=aa(f[0]*g),f[1]=aa(f[1]*g),a.stackedYData[e]=f[1]})},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,d,e=[],f=0;d=this.xAxis.getExtremes();var g=d.min,h=d.max,i,j,k,l,a=a||this.stackedYData||this.processedYData;d=a.length;for(l=0;l<d;l++)if(j=c[l],k=a[l],i=k!==null&&k!==u&&(!b.isLog||k.length||k>0),
j=this.getExtremesFromAll||this.cropped||(c[l+1]||j)>=g&&(c[l-1]||j)<=h,i&&j)if(i=k.length)for(;i--;)k[i]!==null&&(e[f++]=k[i]);else e[f++]=k;this.dataMin=n(void 0,La(e));this.dataMax=n(void 0,za(e))},translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,j=i==="between"||wa(i),k=a.threshold,a=0;a<g;a++){var l=f[a],m=l.x,q=l.y,o=
l.low,p=b&&e.stacks[(this.negStacks&&q<k?"-":"")+this.stackKey];if(e.isLog&&q<=0)l.y=q=null;l.plotX=c.translate(m,0,0,0,1,i,this.type==="flags");if(b&&this.visible&&p&&p[m])p=p[m],q=p.points[this.index],o=q[0],q=q[1],o===0&&(o=n(k,e.min)),e.isLog&&o<=0&&(o=null),l.total=l.stackTotal=p.total,l.percentage=b==="percent"&&l.y/p.total*100,l.stackY=q,p.setOffset(this.pointXOffset||0,this.barW||0);l.yBottom=t(o)?e.translate(o,0,1,0,1):null;h&&(q=this.modifyValue(q,l));l.plotY=typeof q==="number"&&q!==Infinity?
e.translate(q,0,1,0,1):u;l.clientX=j?c.translate(m,0,0,0,1):l.plotX;l.negative=l.y<(k||0);l.category=d&&d[l.x]!==u?d[l.x]:l.x}this.getSegments()},setTooltipPoints:function(a){var b=[],c,d,e=this.xAxis,f=e&&e.getExtremes(),g=e?e.tooltipLen||e.len:this.chart.plotSizeX,h,i,j=[];if(this.options.enableMouseTracking!==!1){if(a)this.tooltipPoints=null;p(this.segments||this.points,function(a){b=b.concat(a)});e&&e.reversed&&(b=b.reverse());this.orderTooltipPoints&&this.orderTooltipPoints(b);a=b.length;for(i=
0;i<a;i++)if(e=b[i],c=e.x,c>=f.min&&c<=f.max){h=b[i+1];c=d===u?0:d+1;for(d=b[i+1]?I(s(0,N((e.clientX+(h?h.wrappedClientX||h.clientX:g))/2)),g):g;c>=0&&c<=d;)j[c++]=e}this.tooltipPoints=j}},tooltipHeaderFormatter:function(a){var b=this.tooltipOptions,c=b.dateTimeLabelFormats,d=b.xDateFormat,e=this.xAxis,f=e&&e.options.type==="datetime",b=b.headerFormat,e=e&&e.closestPointRange,g;if(f&&!d){if(e)for(g in E){if(E[g]>=e){d=c[g];break}}else d=c.day;d=d||c.year}f&&d&&wa(a.key)&&(b=b.replace("{point.key}",
"{point.key:"+d+"}"));return Fa(b,{point:a,series:this})},onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&A(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;if(d)d.onMouseOut();this&&a.events.mouseOut&&A(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&c.hide();this.setState();b.hoverSeries=null},animate:function(a){var b=
this,c=b.chart,d=c.renderer,e;e=b.options.animation;var f=c.clipBox,g=c.inverted,h;if(e&&!S(e))e=Y[b.type].animation;h="_sharedClip"+e.duration+e.easing;if(a)a=c[h],e=c[h+"m"],a||(c[h]=a=d.clipRect(r(f,{width:0})),c[h+"m"]=e=d.clipRect(-99,g?-c.plotLeft:-c.plotTop,99,g?c.chartWidth:c.chartHeight)),b.group.clip(a),b.markerGroup.clip(e),b.sharedClipKey=h;else{if(a=c[h])a.animate({width:c.plotSizeX},e),c[h+"m"].animate({width:c.plotSizeX+99},e);b.animate=null;b.animationTimeout=setTimeout(function(){b.afterAnimate()},
e.duration)}},afterAnimate:function(){var a=this.chart,b=this.sharedClipKey,c=this.group;c&&this.options.clip!==!1&&(c.clip(a.clipRect),this.markerGroup.clip());setTimeout(function(){b&&a[b]&&(a[b]=a[b].destroy(),a[b+"m"]=a[b+"m"].destroy())},100)},drawPoints:function(){var a,b=this.points,c=this.chart,d,e,f,g,h,i,j,k,l=this.options.marker,m,q=this.markerGroup;if(l.enabled||this._hasPointMarkers)for(f=b.length;f--;)if(g=b[f],d=N(g.plotX),e=g.plotY,k=g.graphic,i=g.marker||{},a=l.enabled&&i.enabled===
u||i.enabled,m=c.isInsidePlot(w(d),e,c.inverted),a&&e!==u&&!isNaN(e)&&g.y!==null)if(a=g.pointAttr[g.selected?"select":""],h=a.r,i=n(i.symbol,this.symbol),j=i.indexOf("url")===0,k)k.attr({visibility:m?V?"inherit":"visible":"hidden"}).animate(r({x:d-h,y:e-h},k.symbolName?{width:2*h,height:2*h}:{}));else{if(m&&(h>0||j))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h).attr(a).add(q)}else if(k)g.graphic=k.destroy()},convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},
c=c||{},d=d||{};for(f in e)g=e[f],h[f]=n(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=a.options,c=Y[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color,h={stroke:g,fill:g},i=a.points||[],j=[],k,l=a.pointAttrToOptions,m=b.negativeColor,n=c.lineColor,o=c.fillColor,s;b.marker?(e.radius=e.radius||c.radius+2,e.lineWidth=e.lineWidth||c.lineWidth+1):e.color=e.color||ta(e.color||g).brighten(e.brightness).get();j[""]=a.convertAttribs(c,h);p(["hover","select"],function(b){j[b]=a.convertAttribs(d[b],
j[""])});a.pointAttr=j;for(g=i.length;g--;){h=i[g];if((c=h.options&&h.options.marker||h.options)&&c.enabled===!1)c.radius=0;if(h.negative&&m)h.color=h.fillColor=m;k=b.colorByPoint||h.color;if(h.options)for(s in l)t(c[l[s]])&&(k=!0);if(k){c=c||{};k=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker)f.color=ta(f.color||h.color).brighten(f.brightness||e.brightness).get();f={color:h.color};if(!o)f.fillColor=h.color;if(!n)f.lineColor=h.color;k[""]=a.convertAttribs(r(f,c),j[""]);k.hover=a.convertAttribs(d.hover,
j.hover,k[""]);k.select=a.convertAttribs(d.select,j.select,k[""])}else k=j;h.pointAttr=k}},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(ra),d,e,f=a.data||[],g,h,i;A(a,"destroy");X(a);p(a.axisTypes||[],function(b){if(i=a[b])ha(i.series,a),i.isDirty=i.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(e=f.length;e--;)(g=f[e])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);p("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","),
function(b){a[b]&&(d=c&&b==="group"?"hide":"destroy",a[b][d]())});if(b.hoverSeries===a)b.hoverSeries=null;ha(b.series,a);for(h in a)delete a[h]},getSegmentPath:function(a){var b=this,c=[],d=b.options.step;p(a,function(e,f){var g=e.plotX,h=e.plotY,i;b.getPointSpline?c.push.apply(c,b.getPointSpline(a,e,f)):(c.push(f?"L":"M"),d&&f&&(i=a[f-1],d==="right"?c.push(i.plotX,h):d==="center"?c.push((i.plotX+g)/2,i.plotY,(i.plotX+g)/2,h):c.push(g,i.plotY)),c.push(e.plotX,e.plotY))});return c},getGraphPath:function(){var a=
this,b=[],c,d=[];p(a.segments,function(e){c=a.getSegmentPath(e);e.length>1?b=b.concat(c):d.push(e[0])});a.singlePoints=d;return a.graphPath=b},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color]],d=b.lineWidth,e=b.dashStyle,f=b.linecap!=="square",g=this.getGraphPath(),h=b.negativeColor;h&&c.push(["graphNeg",h]);p(c,function(c,h){var k=c[0],l=a[k];if(l)Za(l),l.animate({d:g});else if(d&&g.length)l={stroke:c[1],"stroke-width":d,zIndex:1},e?l.dashstyle=e:f&&(l["stroke-linecap"]=
l["stroke-linejoin"]="round"),a[k]=a.chart.renderer.path(g).attr(l).add(a.group).shadow(!h&&b.shadow)})},clipNeg:function(){var a=this.options,b=this.chart,c=b.renderer,d=a.negativeColor||a.negativeFillColor,e,f=this.graph,g=this.area,h=this.posClip,i=this.negClip;e=b.chartWidth;var j=b.chartHeight,k=s(e,j),l=this.yAxis;if(d&&(f||g)){d=w(l.toPixels(a.threshold||0,!0));d<0&&(k-=d);a={x:0,y:0,width:k,height:d};k={x:0,y:d,width:k,height:k};if(b.inverted)a.height=k.y=b.plotWidth-d,c.isVML&&(a={x:b.plotWidth-
d-b.plotLeft,y:0,width:e,height:j},k={x:d+b.plotLeft-e,y:0,width:b.plotLeft+d,height:e});l.reversed?(b=k,e=a):(b=a,e=k);h?(h.animate(b),i.animate(e)):(this.posClip=h=c.clipRect(b),this.negClip=i=c.clipRect(e),f&&this.graphNeg&&(f.clip(h),this.graphNeg.clip(i)),g&&(g.clip(h),this.areaNeg.clip(i)))}},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};p(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;if(b.xAxis)F(c,"resize",a),F(b,
"destroy",function(){X(c,"resize",a)}),a(),b.invertGroups=a},plotGroup:function(a,b,c,d,e){var f=this[a],g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({visibility:c,zIndex:d||0.1}).add(e));f[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){return{translateX:this.xAxis?this.xAxis.left:this.chart.plotLeft,translateY:this.yAxis?this.yAxis.top:this.chart.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this.chart,b,c=this.options,d=c.animation&&!!this.animate&&a.renderer.isSVG,
e=this.visible?"visible":"hidden",f=c.zIndex,g=this.hasRendered,h=a.seriesGroup;b=this.plotGroup("group","series",e,f,h);this.markerGroup=this.plotGroup("markerGroup","markers",e,f,h);d&&this.animate(!0);this.getAttribs();b.inverted=this.isCartesian?a.inverted:!1;this.drawGraph&&(this.drawGraph(),this.clipNeg());this.drawDataLabels&&this.drawDataLabels();this.visible&&this.drawPoints();this.options.enableMouseTracking!==!1&&this.drawTracker();a.inverted&&this.invertGroups();c.clip!==!1&&!this.sharedClipKey&&
!g&&b.clip(a.clipRect);d?this.animate():g||this.afterAnimate();this.isDirty=this.isDirtyData=!1;this.hasRendered=!0},redraw:function(){var a=this.chart,b=this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:n(d&&d.left,a.plotLeft),translateY:n(e&&e.top,a.plotTop)}));this.translate();this.setTooltipPoints(!0);this.render();b&&A(this,"updatedData")},setState:function(a){var b=this.options,c=this.graph,d=this.graphNeg,
e=b.states,b=b.lineWidth,a=a||"";if(this.state!==a)this.state=a,e[a]&&e[a].enabled===!1||(a&&(b=e[a].lineWidth||b+1),c&&!c.dashstyle&&(a={"stroke-width":b},c.attr(a),d&&d.attr(a)))},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===u?!h:a)?"show":"hide";p(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c)c.onMouseOut();e&&d.legend.colorizeItem(c,
a);c.isDirty=!0;c.options.stacking&&p(d.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0});p(c.linkedSeries,function(b){b.setVisible(a,!1)});if(g)d.isDirtyBox=!0;b!==!1&&d.redraw();A(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===u?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;A(this,a?"select":"unselect")},drawTracker:J.drawTrackerGraph};r(fb.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=
n(b,!0),A(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();b&&e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;new qa(this,x(a,{index:this[e].length,isX:b}));f[e]=ja(f[e]||{});f[e].push(a);n(c,!0)&&this.redraw(d)},showLoading:function(a){var b=this.options,c=this.loadingDiv,d=b.loading;if(!c)this.loadingDiv=c=T(Ga,{className:"highcharts-loading"},r(d.style,{zIndex:10,display:Q}),this.container),this.loadingSpan=T("span",
null,d.labelStyle,c);this.loadingSpan.innerHTML=a||b.lang.loading;if(!this.loadingShown)D(c,{opacity:0,display:"",left:this.plotLeft+"px",top:this.plotTop+"px",width:this.plotWidth+"px",height:this.plotHeight+"px"}),kb(c,{opacity:d.style.opacity},{duration:d.showDuration||0}),this.loadingShown=!0},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&kb(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){D(b,{display:Q})}});this.loadingShown=!1}});r(Ja.prototype,{update:function(a,
b,c){var d=this,e=d.series,f=d.graphic,g,h=e.data,i=e.chart,j=e.options,b=n(b,!0);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);if(S(a)){e.getAttribs();if(f)a&&a.marker&&a.marker.symbol?d.graphic=f.destroy():f.attr(d.pointAttr[d.state||""]);if(a&&a.dataLabels&&d.dataLabel)d.dataLabel=d.dataLabel.destroy()}g=sa(d,h);e.updateParallelArrays(d,g);j.data[g]=d.options;e.isDirty=e.isDirtyData=!0;if(!e.fixedBox&&e.hasCartesianSeries)i.isDirtyBox=!0;j.legendType==="point"&&i.legend.destroyItem(d);
b&&i.redraw(c)})},remove:function(a,b){var c=this,d=c.series,e=d.points,f=d.chart,g,h=d.data;Oa(b,f);a=n(a,!0);c.firePointEvent("remove",null,function(){g=sa(c,h);h.length===e.length&&e.splice(g,1);h.splice(g,1);d.options.data.splice(g,1);d.updateParallelArrays(c,"splice",g,1);c.destroy();d.isDirty=!0;d.isDirtyData=!0;a&&f.redraw()})}});r(O.prototype,{addPoint:function(a,b,c,d){var e=this.options,f=this.data,g=this.graph,h=this.area,i=this.chart,j=this.xAxis&&this.xAxis.names,k=g&&g.shift||0,l=e.data,
m,q=this.xData;Oa(d,i);c&&p([g,h,this.graphNeg,this.areaNeg],function(a){if(a)a.shift=k+1});if(h)h.isArea=!0;b=n(b,!0);d={series:this};this.pointClass.prototype.applyOptions.apply(d,[a]);g=d.x;h=q.length;if(this.requireSorting&&g<q[h-1])for(m=!0;h&&q[h-1]>g;)h--;this.updateParallelArrays(d,"splice",h,0,0);this.updateParallelArrays(d,h);if(j)j[g]=d.name;l.splice(h,0,a);m&&(this.data.splice(h,0,null),this.processData());e.legendType==="point"&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):
(f.shift(),this.updateParallelArrays(d,"shift"),l.shift()));this.isDirtyData=this.isDirty=!0;b&&(this.getAttribs(),i.redraw())},remove:function(a,b){var c=this,d=c.chart,a=n(a,!0);if(!c.isRemoving)c.isRemoving=!0,A(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;d.linkSeries();a&&d.redraw(b)});c.isRemoving=!1},update:function(a,b){var c=this.chart,d=this.type,e=L[d].prototype,f,a=x(this.userOptions,{animation:!1,index:this.index,pointStart:this.xData[0]},{data:this.options.data},
a);this.remove(!1);for(f in e)e.hasOwnProperty(f)&&(this[f]=u);r(this,L[a.type||d].prototype);this.init(c,a);n(b,!0)&&c.redraw(!1)}});r(qa.prototype,{update:function(a,b){var c=this.chart,a=c.options[this.coll][this.options.index]=x(this.userOptions,a);this.destroy(!0);this._addedPlotLB=this.userMin=this.userMax=u;this.init(c,r(a,{events:u}));c.isDirtyBox=!0;n(b,!0)&&c.redraw()},remove:function(a){var b=this.chart,c=this.coll;p(this.series,function(a){a.remove(!1)});ha(b.axes,this);ha(b[c],this);
b.options[c].splice(this.options.index,1);p(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;n(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}});var ca=ia(O);L.line=ca;Y.area=x(W,{threshold:0});var Ua=ia(O,{type:"area",getSegments:function(){var a=[],b=[],c=[],d=this.xAxis,e=this.yAxis,f=e.stacks[this.stackKey],g={},h,i,j=this.points,k=this.options.connectNulls,l,m,n;if(this.options.stacking&&!this.cropped){for(m=
0;m<j.length;m++)g[j[m].x]=j[m];for(n in f)f[n].total!==null&&c.push(+n);c.sort(function(a,b){return a-b});p(c,function(a){if(!k||g[a]&&g[a].y!==null)g[a]?b.push(g[a]):(h=d.translate(a),l=f[a].percent?f[a].total?f[a].cum*100/f[a].total:0:f[a].cum,i=e.toPixels(l,!0),b.push({y:null,plotX:h,clientX:h,plotY:i,yBottom:i,onMouseOver:la}))});b.length&&a.push(b)}else O.prototype.getSegments.call(this),a=this.segments;this.segments=a},getSegmentPath:function(a){var b=O.prototype.getSegmentPath.call(this,a),
c=[].concat(b),d,e=this.options;d=b.length;var f=this.yAxis.getThreshold(e.threshold),g;d===3&&c.push("L",b[1],b[2]);if(e.stacking&&!this.closedStacks)for(d=a.length-1;d>=0;d--)g=n(a[d].yBottom,f),d<a.length-1&&e.step&&c.push(a[d+1].plotX,g),c.push(a[d].plotX,g);else this.closeSegment(c,a,f);this.areaPath=this.areaPath.concat(c);return b},closeSegment:function(a,b,c){a.push("L",b[b.length-1].plotX,c,"L",b[0].plotX,c)},drawGraph:function(){this.areaPath=[];O.prototype.drawGraph.apply(this);var a=this,
b=this.areaPath,c=this.options,d=c.negativeColor,e=c.negativeFillColor,f=[["area",this.color,c.fillColor]];(d||e)&&f.push(["areaNeg",d,e]);p(f,function(d){var e=d[0],f=a[e];f?f.animate({d:b}):a[e]=a.chart.renderer.path(b).attr({fill:n(d[2],ta(d[1]).setOpacity(n(c.fillOpacity,0.75)).get()),zIndex:0}).add(a.group)})},drawLegendSymbol:R.drawRectangle});L.area=Ua;Y.spline=x(W);ca=ia(O,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],g=a[c+1],h,i,j,k;if(f&&g){a=f.plotY;j=
g.plotX;var g=g.plotY,l;h=(1.5*d+f.plotX)/2.5;i=(1.5*e+a)/2.5;j=(1.5*d+j)/2.5;k=(1.5*e+g)/2.5;l=(k-i)*(j-d)/(j-h)+e-k;i+=l;k+=l;i>a&&i>e?(i=s(a,e),k=2*e-i):i<a&&i<e&&(i=I(a,e),k=2*e-i);k>g&&k>e?(k=s(g,e),i=2*e-k):k<g&&k<e&&(k=I(g,e),i=2*e-k);b.rightContX=j;b.rightContY=k}c?(b=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,h||d,i||e,d,e],f.rightContX=f.rightContY=null):b=["M",d,e];return b}});L.spline=ca;Y.areaspline=x(Y.area);Ua=Ua.prototype;ca=ia(ca,{type:"areaspline",closedStacks:!0,getSegmentPath:Ua.getSegmentPath,
closeSegment:Ua.closeSegment,drawGraph:Ua.drawGraph,drawLegendSymbol:R.drawRectangle});L.areaspline=ca;Y.column=x(W,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},stickyTracking:!1,threshold:0});ca=ia(O,{type:"column",pointAttrToOptions:{stroke:"borderColor",
"stroke-width":"borderWidth",fill:"color",r:"borderRadius"},cropShoulder:0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){O.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&p(b.series,function(b){if(b.type===a.type)b.isDirty=!0})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,g={},h,i=0;b.grouping===!1?i=1:p(a.chart.series,function(b){var c=b.options,e=b.yAxis;if(b.type===a.type&&b.visible&&d.len===e.len&&d.pos===
e.pos)c.stacking?(f=b.stackKey,g[f]===u&&(g[f]=i++),h=g[f]):c.grouping!==!1&&(h=i++),b.columnIndex=h});var c=I(M(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||1),c.len),j=c*b.groupPadding,k=(c-2*j)/i,l=b.pointWidth,b=t(l)?(k-l)/2:k*b.pointPadding,l=n(l,k-2*b);return a.columnMetrics={width:l,offset:b+(j+((e?i-(a.columnIndex||0):a.columnIndex)||0)*k-c/2)*(e?-1:1)}},translate:function(){var a=this.chart,b=this.options,c=b.borderWidth,d=this.yAxis,e=this.translatedThreshold=d.getThreshold(b.threshold),
f=n(b.minPointLength,5),b=this.getColumnMetrics(),g=b.width,h=this.barW=Ha(s(g,1+2*c)),i=this.pointXOffset=b.offset,j=-(c%2?0.5:0),k=c%2?0.5:1;a.renderer.isVML&&a.inverted&&(k+=1);O.prototype.translate.apply(this);p(this.points,function(a){var b=n(a.yBottom,e),c=I(s(-999-b,a.plotY),d.len+999+b),o=a.plotX+i,p=h,r=I(c,b),t,c=s(c,b)-r;M(c)<f&&f&&(c=f,r=w(M(r-e)>f?b-f:e-(d.translate(a.y,0,1,0,1)<=e?f:0)));a.barX=o;a.pointWidth=g;b=M(o)<0.5;p=w(o+p)+j;o=w(o)+j;p-=o;t=M(r)<0.5;c=w(r+c)+k;r=w(r)+k;c-=r;
b&&(o+=1,p-=1);t&&(r-=1,c+=1);a.shapeType="rect";a.shapeArgs={x:o,y:r,width:p,height:c}})},getSymbol:la,drawLegendSymbol:R.drawRectangle,drawGraph:la,drawPoints:function(){var a=this,b=this.chart,c=a.options,d=b.renderer,e=b.options.animationLimit||250,f;p(a.points,function(g){var h=g.plotY,i=g.graphic;if(h!==u&&!isNaN(h)&&g.y!==null)f=g.shapeArgs,i?(Za(i),i[b.pointCount<e?"animate":"attr"](x(f))):g.graphic=d[g.shapeType](f).attr(g.pointAttr[g.selected?"select":""]).add(a.group).shadow(c.shadow,null,
c.stacking&&!c.borderRadius);else if(i)g.graphic=i.destroy()})},drawTracker:J.drawTrackerPoint,animate:function(a){var b=this.yAxis,c=this.options,d=this.chart.inverted,e={};if(V)a?(e.scaleY=0.001,a=I(b.pos+b.len,s(b.pos,b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null)},remove:function(){var a=this,b=a.chart;b.hasRendered&&p(b.series,function(b){if(b.type===
a.type)b.isDirty=!0});O.prototype.remove.apply(a,arguments)}});L.column=ca;Y.bar=x(Y.column);ca=ia(ca,{type:"bar",inverted:!0});L.bar=ca;Y.scatter=x(W,{lineWidth:0,tooltip:{headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",followPointer:!0},stickyTracking:!1});ca=ia(O,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["markerGroup"],takeOrdinalPosition:!1,drawTracker:J.drawTrackerPoint,
drawGraph:function(){this.options.lineWidth&&O.prototype.drawGraph.call(this)},setTooltipPoints:la});L.scatter=ca;Y.pie=x(W,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.name}},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});W={type:"pie",isCartesian:!1,pointClass:ia(Ja,
{init:function(){Ja.prototype.init.apply(this,arguments);var a=this,b;if(a.y<0)a.y=null;r(a,{visible:a.visible!==!1,name:n(a.name,"Slice")});b=function(b){a.slice(b.type==="select")};F(a,"select",b);F(a,"unselect",b);return a},setVisible:function(a){var b=this,c=b.series,d=c.chart,e;b.visible=b.options.visible=a=a===u?!b.visible:a;c.options.data[sa(b,c.data)]=b.options;e=a?"show":"hide";p(["graphic","dataLabel","connector","shadowGroup"],function(a){if(b[a])b[a][e]()});b.legendItem&&d.legend.colorizeItem(b,
a);if(!c.isDirty&&c.options.ignoreHiddenPoint)c.isDirty=!0,d.redraw()},slice:function(a,b,c){var d=this.series;Oa(c,d.chart);n(b,!0);this.sliced=this.options.sliced=a=t(a)?a:!this.sliced;d.options.data[sa(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)}}),requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",
fill:"color"},getColor:la,animate:function(a){var b=this,c=b.points,d=b.startAngleRad;if(!a)p(c,function(a){var c=a.graphic,a=a.shapeArgs;c&&(c.attr({r:b.center[3]/2,start:d,end:d}),c.animate({r:a.r,start:a.start,end:a.end},b.options.animation))}),b.animate=null},setData:function(a,b){O.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();n(b,!0)&&this.chart.redraw()},generatePoints:function(){var a,b=0,c,d,e,f=this.options.ignoreHiddenPoint;O.prototype.generatePoints.call(this);
c=this.points;d=c.length;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?0:e.y;this.total=b;for(a=0;a<d;a++)e=c[a],e.percentage=b>0?e.y/b*100:0,e.total=b},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=c.startAngle||0,j=this.startAngleRad=Aa/180*(i-90),i=(this.endAngleRad=Aa/180*((c.endAngle||i+360)-90))-j,k=this.points,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,m,n=k.length,o;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=
P.asin((b-a[1])/(a[2]/2+l));return a[0]+(c?-1:1)*U(h)*(a[2]/2+l)};for(m=0;m<n;m++){o=k[m];f=j+b*i;if(!c||o.visible)b+=o.percentage/100;g=j+b*i;o.shapeType="arc";o.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:w(f*1E3)/1E3,end:w(g*1E3)/1E3};h=(g+f)/2;h>0.75*i&&(h-=2*Aa);o.slicedTranslation={translateX:w(U(h)*d),translateY:w(ba(h)*d)};f=U(h)*a[2]/2;g=ba(h)*a[2]/2;o.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];o.half=h<-Aa/2||h>Aa/2?1:0;o.angle=h;e=I(e,l/2);o.labelPos=[a[0]+f+U(h)*l,a[1]+g+ba(h)*l,a[0]+
f+U(h)*e,a[1]+g+ba(h)*e,a[0]+f,a[1]+g,l<0?"center":o.half?"right":"left",h]}},setTooltipPoints:la,drawGraph:null,drawPoints:function(){var a=this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);p(a.points,function(h){d=h.graphic;g=h.shapeArgs;f=h.shadowGroup;if(e&&!f)f=h.shadowGroup=b.g("shadow").add(a.shadowGroup);c=h.sliced?h.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);d?d.animate(r(g,c)):h.graphic=d=b.arc(g).setRadialReference(a.center).attr(h.pointAttr[h.selected?
"select":""]).attr({"stroke-linejoin":"round"}).attr(c).add(a.group).shadow(e,f);h.visible!==void 0&&h.setVisible(h.visible)})},sortByAngle:function(a,b){a.sort(function(a,d){return a.angle!==void 0&&(d.angle-a.angle)*b})},drawTracker:J.drawTrackerPoint,drawLegendSymbol:R.drawRectangle,getCenter:xb.getCenter,getSymbol:la};W=ia(O,W);L.pie=W;O.prototype.drawDataLabels=function(){var a=this,b=a.options,c=b.cursor,d=b.dataLabels,b=a.points,e,f,g,h;if(d.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(d),
h=a.plotGroup("dataLabelsGroup","data-labels",a.visible?"visible":"hidden",d.zIndex||6),f=d,p(b,function(b){var j,k=b.dataLabel,l,m,p=b.connector,o=!0;e=b.options&&b.options.dataLabels;j=n(e&&e.enabled,f.enabled);if(k&&!j)b.dataLabel=k.destroy();else if(j){d=x(f,e);j=d.rotation;l=b.getLabelConfig();g=d.format?Fa(d.format,l):d.formatter.call(l,d);d.style.color=n(d.color,d.style.color,a.color,"black");if(k)if(t(g))k.attr({text:g}),o=!1;else{if(b.dataLabel=k=k.destroy(),p)b.connector=p.destroy()}else if(t(g)){k=
{fill:d.backgroundColor,stroke:d.borderColor,"stroke-width":d.borderWidth,r:d.borderRadius||0,rotation:j,padding:d.padding,zIndex:1};for(m in k)k[m]===u&&delete k[m];k=b.dataLabel=a.chart.renderer[j?"text":"label"](g,0,-999,null,null,null,d.useHTML).attr(k).css(r(d.style,c&&{cursor:c})).add(h).shadow(d.shadow)}k&&a.alignDataLabel(b,k,d,null,o)}})};O.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=n(a.plotX,-999),i=n(a.plotY,-999),j=b.getBBox();if(a=this.visible&&(a.series.forceDL||
f.isInsidePlot(a.plotX,a.plotY,g)))d=r({x:g?f.plotWidth-i:h,y:w(g?f.plotHeight-h:i),width:0,height:0},d),r(c,{width:j.width,height:j.height}),c.rotation?(g={align:c.align,x:d.x+c.x+d.width/2,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](g)):(b.align(c,null,d),g=b.alignAttr,n(c.overflow,"justify")==="justify"?this.justifyDataLabel(b,c,g,j,d,e):n(c.crop,!0)&&(a=f.isInsidePlot(g.x,g.y)&&f.isInsidePlot(g.x+j.width,g.y+j.height)));if(!a)b.attr({y:-999}),b.placed=!1};O.prototype.justifyDataLabel=function(a,
b,c,d,e,f){var g=this.chart,h=b.align,i=b.verticalAlign,j,k;j=c.x;if(j<0)h==="right"?b.align="left":b.x=-j,k=!0;j=c.x+d.width;if(j>g.plotWidth)h==="left"?b.align="right":b.x=g.plotWidth-j,k=!0;j=c.y;if(j<0)i==="bottom"?b.verticalAlign="top":b.y=-j,k=!0;j=c.y+d.height;if(j>g.plotHeight)i==="top"?b.verticalAlign="bottom":b.y=g.plotHeight-j,k=!0;if(k)a.placed=!f,a.align(b,null,e)};if(L.pie)L.pie.prototype.drawDataLabels=function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=n(e.connectorPadding,
10),g=n(e.connectorWidth,1),h=d.plotWidth,d=d.plotHeight,i,j,k=n(e.softConnector,!0),l=e.distance,m=a.center,q=m[2]/2,o=m[1],r=l>0,t,u,v,x,y=[[],[]],z,A,E,K,B,D=[0,0,0,0],I=function(a,b){return b.y-a.y};if(a.visible&&(e.enabled||a._hasPointLabels)){O.prototype.drawDataLabels.apply(a);p(b,function(a){a.dataLabel&&a.visible&&y[a.half].push(a)});for(K=0;!x&&b[K];)x=b[K]&&b[K].dataLabel&&(b[K].dataLabel.getBBox().height||21),K++;for(K=2;K--;){var b=[],J=[],F=y[K],G=F.length,C;a.sortByAngle(F,K-0.5);if(l>
0){for(B=o-q-l;B<=o+q+l;B+=x)b.push(B);u=b.length;if(G>u){c=[].concat(F);c.sort(I);for(B=G;B--;)c[B].rank=B;for(B=G;B--;)F[B].rank>=u&&F.splice(B,1);G=F.length}for(B=0;B<G;B++){c=F[B];v=c.labelPos;c=9999;var L,N;for(N=0;N<u;N++)L=M(b[N]-v[1]),L<c&&(c=L,C=N);if(C<B&&b[B]!==null)C=B;else for(u<G-B+C&&b[B]!==null&&(C=u-G+B);b[C]===null;)C++;J.push({i:C,y:b[C]});b[C]=null}J.sort(I)}for(B=0;B<G;B++){c=F[B];v=c.labelPos;t=c.dataLabel;E=c.visible===!1?"hidden":"visible";c=v[1];if(l>0){if(u=J.pop(),C=u.i,
A=u.y,c>A&&b[C+1]!==null||c<A&&b[C-1]!==null)A=c}else A=c;z=e.justify?m[0]+(K?-1:1)*(q+l):a.getX(C===0||C===b.length-1?c:A,K);t._attr={visibility:E,align:v[6]};t._pos={x:z+e.x+({left:f,right:-f}[v[6]]||0),y:A+e.y-10};t.connX=z;t.connY=A;if(this.options.size===null)u=t.width,z-u<f?D[3]=s(w(u-z+f),D[3]):z+u>h-f&&(D[1]=s(w(z+u-h+f),D[1])),A-x/2<0?D[0]=s(w(-A+x/2),D[0]):A+x/2>d&&(D[2]=s(w(A+x/2-d),D[2]))}}if(za(D)===0||this.verifyDataLabelOverflow(D))this.placeDataLabels(),r&&g&&p(this.points,function(b){i=
b.connector;v=b.labelPos;if((t=b.dataLabel)&&t._pos)E=t._attr.visibility,z=t.connX,A=t.connY,j=k?["M",z+(v[6]==="left"?5:-5),A,"C",z,A,2*v[2]-v[4],2*v[3]-v[5],v[2],v[3],"L",v[4],v[5]]:["M",z+(v[6]==="left"?5:-5),A,"L",v[2],v[3],"L",v[4],v[5]],i?(i.animate({d:j}),i.attr("visibility",E)):b.connector=i=a.chart.renderer.path(j).attr({"stroke-width":g,stroke:e.connectorColor||b.color||"#606060",visibility:E}).add(a.group);else if(i)b.connector=i.destroy()})}},L.pie.prototype.placeDataLabels=function(){p(this.points,
function(a){var a=a.dataLabel,b;if(a)(b=a._pos)?(a.attr(a._attr),a[a.moved?"animate":"attr"](b),a.moved=!0):a&&a.attr({y:-999})})},L.pie.prototype.alignDataLabel=la,L.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,e=c=c.minSize||80,f;d[0]!==null?e=s(b[2]-s(a[1],a[3]),c):(e=s(b[2]-a[1]-a[3],c),b[0]+=(a[3]-a[1])/2);d[1]!==null?e=s(I(e,b[2]-s(a[0],a[2])),c):(e=s(I(e,b[2]-a[0]-a[2]),c),b[1]+=(a[0]-a[2])/2);e<b[2]?(b[2]=e,this.translate(b),p(this.points,function(a){if(a.dataLabel)a.dataLabel._pos=
null}),this.drawDataLabels&&this.drawDataLabels()):f=!0;return f};if(L.column)L.column.prototype.alignDataLabel=function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=a.dlBox||a.shapeArgs,i=a.below||a.plotY>n(this.translatedThreshold,f.plotSizeY),j=n(c.inside,!!this.options.stacking);if(h&&(d=x(h),g&&(d={x:f.plotWidth-d.y-d.height,y:f.plotHeight-d.x-d.width,width:d.height,height:d.width}),!j))g?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0);c.align=n(c.align,!g||j?"center":i?"right":"left");
c.verticalAlign=n(c.verticalAlign,g||j?"middle":i?"top":"bottom");O.prototype.alignDataLabel.call(this,a,b,c,d,e)};r(Highcharts,{Axis:qa,Chart:fb,Color:ta,Point:Ja,Tick:Qa,Tooltip:tb,Renderer:Ya,Series:O,SVGElement:pa,SVGRenderer:ua,arrayMin:La,arrayMax:za,charts:Ia,dateFormat:ab,format:Fa,pathAnim:vb,getOptions:function(){return G},hasBidiBug:Nb,isTouchDevice:Ib,numberFormat:Da,seriesTypes:L,setOptions:function(a){G=x(!0,G,a);Bb();return G},addEvent:F,removeEvent:X,createElement:T,discardElement:Na,
css:D,each:p,extend:r,map:Ra,merge:x,pick:n,splat:ja,extendClass:ia,pInt:z,wrap:Va,svg:V,canvas:da,vml:!V&&!da,product:"Highcharts",version:"3.0.9"})})();
Highcharts.setOptions({
  chart: {
    borderColor: '#ffffff',
    zoomType: 'xy',
    defaultSeriesType: 'area',
    animation: true,
    spacingTop: 5,
    //spacingBottom: 10,
    spacingBottom: 100,
    spacingLeft: 3,
    spacingRight: 5,
    margin: [45, 10, 16, 60],
      //margin: [45, 0, 20, 35],
    //margin: [45, 0, 150, 35],
    style:  { fontFamily: 'sans-serif' }
  },
  title: { /*margin: 5*/ },
  credits: { enabled: false },
  legend: {
    enabled: false,
    //layout: 'vertical',
    //align: 'left',
    verticalAlign: 'bottom',
    align: 'right',
    floating: true,
    backgroundColor: '#FFFFFF'
  },
  xAxis: {
    //categories: [2010,2015,2020,2025,2030,2035,2040,2045,2050],
    categories: [2012,2017,2022,2027,2032,2037,2042,2047],
    tickWidth: 0,
    title: { enabled: false },
    labels: {
      formatter: function() {
        switch(this.value) {
          case 2012: return 2012; break;
          //case 2017: return 2017; break;
          case 2027: return 2027; break;
          case 2037: return 2037; break;
          // case 2050: return 2050; break;
          case 2047: return 2047; break;
          // default: return this.value - 2000;
        }
      }
    }
  },
  yAxis: {
    labels: {
      formatter: function() {
        return this.value / 1;
      }
    }
  },
  tooltip: {
    formatter: function() {
      var head = this.series.name.split(" ");
      var newhead = [];
      for(var i=0; i< head.length; i++) {
        if(i>0 && (i%3) == 0) {
            newhead.push("<br />");
            //newhead.push("<strong>");
        }
        newhead.push(head[i]);
      }
      return '<b>' + newhead.join(" ")+ '</b><br/>'+
      this.x +': '+ Highcharts.numberFormat(this.y, 0, ',') +' TWh/yr';
    }
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      animation: true,
      lineWidth: 1,
      shadow: false,
      lineColor: '#fff',
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            radius: 5
          }
        }
      }
    },
    line: {
      animation: true,
      shadow: false,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            radius: 5
          }
        }
      }
    }
  }
});
/*!
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 * 
 * tooltip/tooltip.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */

(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,fadeIE:!1,position:["top","center"],offset:[0,0],relative:!1,cancelDefault:!0,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,c,d){b[a]=[c,d]}};var b={toggle:[function(a){var b=this.getConf(),c=this.getTip(),d=b.opacity;d<1&&c.css({opacity:d}),c.show(),a.call()},function(a){this.getTip().hide(),a.call()}],fade:[function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeTo(c.fadeInSpeed,c.opacity,b):(this.getTip().show(),b())},function(b){var c=this.getConf();!a.browser.msie||c.fadeIE?this.getTip().fadeOut(c.fadeOutSpeed,b):(this.getTip().hide(),b())}]};function c(b,c,d){var e=d.relative?b.position().top:b.offset().top,f=d.relative?b.position().left:b.offset().left,g=d.position[0];e-=c.outerHeight()-d.offset[0],f+=b.outerWidth()+d.offset[1],/iPad/i.test(navigator.userAgent)&&(e-=a(window).scrollTop());var h=c.outerHeight()+b.outerHeight();g=="center"&&(e+=h/2),g=="bottom"&&(e+=h),g=d.position[1];var i=c.outerWidth()+b.outerWidth();g=="center"&&(f-=i/2),g=="left"&&(f-=i);return{top:e,left:f}}function d(d,e){var f=this,g=d.add(f),h,i=0,j=0,k=d.attr("title"),l=d.attr("data-tooltip"),m=b[e.effect],n,o=d.is(":input"),p=o&&d.is(":checkbox, :radio, select, :button, :submit"),q=d.attr("type"),r=e.events[q]||e.events[o?p?"widget":"input":"def"];if(!m)throw"Nonexistent effect \""+e.effect+"\"";r=r.split(/,\s*/);if(r.length!=2)throw"Tooltip: bad events configuration for "+q;d.bind(r[0],function(a){clearTimeout(i),e.predelay?j=setTimeout(function(){f.show(a)},e.predelay):f.show(a)}).bind(r[1],function(a){clearTimeout(j),e.delay?i=setTimeout(function(){f.hide(a)},e.delay):f.hide(a)}),k&&e.cancelDefault&&(d.removeAttr("title"),d.data("title",k)),a.extend(f,{show:function(b){if(!h){l?h=a(l):e.tip?h=a(e.tip).eq(0):k?h=a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k):(h=d.next(),h.length||(h=d.parent().next()));if(!h.length)throw"Cannot find tooltip for "+d}if(f.isShown())return f;h.stop(!0,!0);var o=c(d,h,e);e.tip&&h.html(d.data("title")),b=a.Event(),b.type="onBeforeShow",g.trigger(b,[o]);if(b.isDefaultPrevented())return f;o=c(d,h,e),h.css({position:"absolute",top:o.top,left:o.left}),n=!0,m[0].call(f,function(){b.type="onShow",n="full",g.trigger(b)});var p=e.events.tooltip.split(/,\s*/);h.data("__set")||(h.unbind(p[0]).bind(p[0],function(){clearTimeout(i),clearTimeout(j)}),p[1]&&!d.is("input:not(:checkbox, :radio), textarea")&&h.unbind(p[1]).bind(p[1],function(a){a.relatedTarget!=d[0]&&d.trigger(r[1].split(" ")[0])}),e.tip||h.data("__set",!0));return f},hide:function(c){if(!h||!f.isShown())return f;c=a.Event(),c.type="onBeforeHide",g.trigger(c);if(!c.isDefaultPrevented()){n=!1,b[e.effect][1].call(f,function(){c.type="onHide",g.trigger(c)});return f}},isShown:function(a){return a?n=="full":n},getConf:function(){return e},getTip:function(){return h},getTrigger:function(){return d}}),a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}})}a.fn.tooltip=function(b){var c=this.data("tooltip");if(c)return c;b=a.extend(!0,{},a.tools.tooltip.conf,b),typeof b.position=="string"&&(b.position=b.position.split(/,?\s/)),this.each(function(){c=new d(a(this),b),a(this).data("tooltip",c)});return b.api?c:this}})(jQuery);
// For IE8 compatability, sigh
if (!Array.prototype.map) Array.prototype.map = function(callback, that) {
  var i = -1, n = this.length, map = new Array(n);
  while (++i < n) {
    if (i in this) {
      map[i] = callback.call(that, this[i], i, this);
    }
  }
  return map;
};
(function(){function ct(){return"circle"}function cs(){return 64}function cr(a,b){var c=(a.ownerSVGElement||a).createSVGPoint();if(cq<0&&(window.scrollX||window.scrollY)){var d=d3.select(document.body).append("svg:svg").style("position","absolute").style("top",0).style("left",0),e=d[0][0].getScreenCTM();cq=!e.f&&!e.e,d.remove()}cq?(c.x=b.pageX,c.y=b.pageY):(c.x=b.clientX,c.y=b.clientY),c=c.matrixTransform(a.getScreenCTM().inverse());return[c.x,c.y]}function cp(a){return function(){var b=a.apply(this,arguments),c=b[0],d=b[1]+bB;return[c*Math.cos(d),c*Math.sin(d)]}}function co(a){return[a.x,a.y]}function cn(a){return a.endAngle}function cm(a){return a.startAngle}function cl(a){return a.radius}function ck(a){return a.target}function cj(a){return a.source}function ci(a){return function(b,c){return a[c][1]}}function ch(a){return function(b,c){return a[c][0]}}function cg(a){function i(f){if(f.length<1)return null;var i=bI(this,f,b,d),j=bI(this,f,b===c?ch(i):c,d===e?ci(i):e);return"M"+g(a(j),h)+"L"+g(a(i.reverse()),h)+"Z"}var b=bJ,c=bJ,d=0,e=bK,f="linear",g=bL[f],h=.7;i.x=function(a){if(!arguments.length)return c;b=c=a;return i},i.x0=function(a){if(!arguments.length)return b;b=a;return i},i.x1=function(a){if(!arguments.length)return c;c=a;return i},i.y=function(a){if(!arguments.length)return e;d=e=a;return i},i.y0=function(a){if(!arguments.length)return d;d=a;return i},i.y1=function(a){if(!arguments.length)return e;e=a;return i},i.interpolate=function(a){if(!arguments.length)return f;g=bL[f=a];return i},i.tension=function(a){if(!arguments.length)return h;h=a;return i};return i}function cf(a){var b,c=-1,d=a.length,e,f;while(++c<d)b=a[c],e=b[0],f=b[1]+bB,b[0]=e*Math.cos(f),b[1]=e*Math.sin(f);return a}function ce(a){return a.length<3?bM(a):a[0]+bS(a,cd(a))}function cd(a){var b=[],c,d,e,f,g=cc(a),h=-1,i=a.length-1;while(++h<i)c=cb(a[h],a[h+1]),Math.abs(c)<1e-6?g[h]=g[h+1]=0:(d=g[h]/c,e=g[h+1]/c,f=d*d+e*e,f>9&&(f=c*3/Math.sqrt(f),g[h]=f*d,g[h+1]=f*e));h=-1;while(++h<=i)f=(a[Math.min(i,h+1)][0]-a[Math.max(0,h-1)][0])/(6*(1+g[h]*g[h])),b.push([f||0,g[h]*f||0]);return b}function cc(a){var b=0,c=a.length-1,d=[],e=a[0],f=a[1],g=d[0]=cb(e,f);while(++b<c)d[b]=g+(g=cb(e=f,f=a[b+1]));d[b]=g;return d}function cb(a,b){return(b[1]-a[1])/(b[0]-a[0])}function ca(a,b,c){a.push("C",bY(bZ,b),",",bY(bZ,c),",",bY(b$,b),",",bY(b$,c),",",bY(b_,b),",",bY(b_,c))}function bY(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]}function bX(a,b){var c=a.length-1,d=a[0][0],e=a[0][1],f=a[c][0]-d,g=a[c][1]-e,h=-1,i,j;while(++h<=c)i=a[h],j=h/c,i[0]=b*i[0]+(1-b)*(d+j*f),i[1]=b*i[1]+(1-b)*(e+j*g);return bU(a)}function bW(a){var b,c=-1,d=a.length,e=d+4,f,g=[],h=[];while(++c<4)f=a[c%d],g.push(f[0]),h.push(f[1]);b=[bY(b_,g),",",bY(b_,h)],--c;while(++c<e)f=a[c%d],g.shift(),g.push(f[0]),h.shift(),h.push(f[1]),ca(b,g,h);return b.join("")}function bV(a){if(a.length<4)return bM(a);var b=[],c=-1,d=a.length,e,f=[0],g=[0];while(++c<3)e=a[c],f.push(e[0]),g.push(e[1]);b.push(bY(b_,f)+","+bY(b_,g)),--c;while(++c<d)e=a[c],f.shift(),f.push(e[0]),g.shift(),g.push(e[1]),ca(b,f,g);return b.join("")}function bU(a){if(a.length<3)return bM(a);var b=[],c=1,d=a.length,e=a[0],f=e[0],g=e[1],h=[f,f,f,(e=a[1])[0]],i=[g,g,g,e[1]];b.push(f,",",g),ca(b,h,i);while(++c<d)e=a[c],h.shift(),h.push(e[0]),i.shift(),i.push(e[1]),ca(b,h,i);c=-1;while(++c<2)h.shift(),h.push(e[0]),i.shift(),i.push(e[1]),ca(b,h,i);return b.join("")}function bT(a,b){var c=[],d=(1-b)/2,e,f=a[0],g=a[1],h=1,i=a.length;while(++h<i)e=f,f=g,g=a[h],c.push([d*(g[0]-e[0]),d*(g[1]-e[1])]);return c}function bS(a,b){if(b.length<1||a.length!=b.length&&a.length!=b.length+2)return bM(a);var c=a.length!=b.length,d="",e=a[0],f=a[1],g=b[0],h=g,i=1;c&&(d+="Q"+(f[0]-g[0]*2/3)+","+(f[1]-g[1]*2/3)+","+f[0]+","+f[1],e=a[1],i=2);if(b.length>1){h=b[1],f=a[i],i++,d+="C"+(e[0]+g[0])+","+(e[1]+g[1])+","+(f[0]-h[0])+","+(f[1]-h[1])+","+f[0]+","+f[1];for(var j=2;j<b.length;j++,i++)f=a[i],h=b[j],d+="S"+(f[0]-h[0])+","+(f[1]-h[1])+","+f[0]+","+f[1]}if(c){var k=a[i];d+="Q"+(f[0]+h[0]*2/3)+","+(f[1]+h[1]*2/3)+","+k[0]+","+k[1]}return d}function bR(a,b,c){return a.length<3?bM(a):a[0]+bS(a,bT(a,b))}function bQ(a,b){return a.length<3?bM(a):a[0]+bS((a.push(a[0]),a),bT([a[a.length-2]].concat(a,[a[1]]),b))}function bP(a,b){return a.length<4?bM(a):a[1]+bS(a.slice(1,a.length-1),bT(a,b))}function bO(a){var b=[],c=0,d=a.length,e=a[0];b.push(e[0],",",e[1]);while(++c<d)b.push("H",(e=a[c])[0],"V",e[1]);return b.join("")}function bN(a){var b=[],c=0,d=a.length,e=a[0];b.push(e[0],",",e[1]);while(++c<d)b.push("V",(e=a[c])[1],"H",e[0]);return b.join("")}function bM(a){var b=[],c=0,d=a.length,e=a[0];b.push(e[0],",",e[1]);while(++c<d)b.push("L",(e=a[c])[0],",",e[1]);return b.join("")}function bK(a){return a[1]}function bJ(a){return a[0]}function bI(a,b,c,d){var e=[],f=-1,g=b.length,h=typeof c=="function",i=typeof d=="function",j;if(h&&i)while(++f<g)e.push([c.call(a,j=b[f],f),d.call(a,j,f)]);else if(h)while(++f<g)e.push([c.call(a,b[f],f),d]);else if(i)while(++f<g)e.push([c,d.call(a,b[f],f)]);else while(++f<g)e.push([c,d]);return e}function bH(a){function g(d){return d.length<1?null:"M"+e(a(bI(this,d,b,c)),f)}var b=bJ,c=bK,d="linear",e=bL[d],f=.7;g.x=function(a){if(!arguments.length)return b;b=a;return g},g.y=function(a){if(!arguments.length)return c;c=a;return g},g.interpolate=function(a){if(!arguments.length)return d;e=bL[d=a];return g},g.tension=function(a){if(!arguments.length)return f;f=a;return g};return g}function bG(a){return a.endAngle}function bF(a){return a.startAngle}function bE(a){return a.outerRadius}function bD(a){return a.innerRadius}function bw(a){return function(b){return-Math.pow(-b,a)}}function bv(a){return function(b){return Math.pow(b,a)}}function bu(a){return a.toPrecision(1)}function bt(a){return-Math.log(-a)/Math.LN10}function bs(a){return Math.log(a)/Math.LN10}function br(a,b,c,d){var e=[],f=[],g=0,h=a.length;while(++g<h)e.push(c(a[g-1],a[g])),f.push(d(b[g-1],b[g]));return function(b){var c=d3.bisect(a,b,1,a.length-1)-1;return f[c](e[c](b))}}function bq(a,b,c,d){var e=c(a[0],a[1]),f=d(b[0],b[1]);return function(a){return f(e(a))}}function bp(a,b){return d3.format(",."+Math.max(0,-Math.floor(Math.log(bn(a,b)[2])/Math.LN10+.01))+"f")}function bo(a,b){return d3.range.apply(d3,bn(a,b))}function bn(a,b){var c=bi(a),d=c[1]-c[0],e=Math.pow(10,Math.floor(Math.log(d/b)/Math.LN10)),f=b/d*e;f<=.15?e*=10:f<=.35?e*=5:f<=.75&&(e*=2),c[0]=Math.ceil(c[0]/e)*e,c[1]=Math.floor(c[1]/e)*e+e*.5,c[2]=e;return c}function bm(a){a=Math.pow(10,Math.round(Math.log(a)/Math.LN10)-1);return{floor:function(b){return Math.floor(b/a)*a},ceil:function(b){return Math.ceil(b/a)*a}}}function bl(a,b){a.range=d3.rebind(a,b.range),a.rangeRound=d3.rebind(a,b.rangeRound),a.interpolate=d3.rebind(a,b.interpolate),a.clamp=d3.rebind(a,b.clamp);return a}function bk(){return Math}function bj(a,b){var c=0,d=a.length-1,e=a[c],f=a[d],g;f<e&&(g=c,c=d,d=g,g=e,e=f,f=g),b=b(f-e),a[c]=b.floor(e),a[d]=b.ceil(f);return a}function bi(a){var b=a[0],c=a[a.length-1];return b<c?[b,c]:[c,b]}function bg(){var a=null,b=bb,c=Infinity;while(b)b.flush?b=a?a.next=b.next:bb=b.next:(c=Math.min(c,b.then+b.delay),b=(a=b).next);return c}function bf(){var a,b=Date.now(),c=bb;while(c)a=b-c.then,a>c.delay&&(c.flush=c.callback(a)),c=c.next;var d=bg()-b;d>24?(isFinite(d)&&(clearTimeout(bd),bd=setTimeout(bf,d)),bc=0):(bc=1,bh(bf))}function be(a,b){var c=Date.now(),d=!1,e,f=bb;if(!!isFinite(b)){while(f){if(f.callback===a){f.then=c,f.delay=b,d=!0;break}e=f,f=f.next}d||(bb={callback:a,then:c,delay:b,next:bb}),bc||(bd=clearTimeout(bd),bc=1,bh(bf))}}function ba(a){return typeof a=="function"?function(b,c,d){var e=a.call(this,b,c)+"";return d!=e&&d3.interpolate(d,e)}:(a=a+"",function(b,c,d){return d!=a&&d3.interpolate(d,a)})}function _(a){function n(b){var h=!0,l=-1;a.each(function(){if(i[++l]!==2){var a=(b-j[l])/k[l],n=this.__transition__,o,p,q=e[l];if(a<1){h=!1;if(a<0)return}else a=1;if(i[l]){if(!n||n.active!==c){i[l]=2;return}}else{if(!n||n.active>c){i[l]=2;return}i[l]=1,g.start.dispatch.apply(this,arguments),q=e[l]={},n.active=c;for(p in d)if(o=d[p].apply(this,arguments))q[p]=o}o=m(a);for(p in q)q[p].call(this,o);if(a===1){i[l]=2;if(n.active===c){var r=n.owner;r===c&&(delete this.__transition__,f&&this.parentNode.removeChild(this)),$=c,g.end.dispatch.apply(this,arguments),$=0,n.owner=r}}}});return h}var b={},c=$||++Z,d={},e=[],f=!1,g=d3.dispatch("start","end"),i=[],j=[],k=[],l,m=d3.ease("cubic-in-out");a.each(function(){(this.__transition__||(this.__transition__={})).owner=c}),b.delay=function(c){var d=Infinity,e=-1;typeof c=="function"?a.each(function(a,b){var f=j[++e]=+c.apply(this,arguments);f<d&&(d=f)}):(d=+c,a.each(function(a,b){j[++e]=d})),be(n,d);return b},b.duration=function(c){var d=-1;typeof c=="function"?(l=0,a.each(function(a,b){var e=k[++d]=+c.apply(this,arguments);e>l&&(l=e)})):(l=+c,a.each(function(a,b){k[++d]=l}));return b},b.ease=function(a){m=typeof a=="function"?a:d3.ease.apply(d3,arguments);return b},b.attrTween=function(a,c){function f(b,d){var e=c.call(this,b,d,this.getAttributeNS(a.space,a.local));return e&&function(b){this.setAttributeNS(a.space,a.local,e(b))}}function e(b,d){var e=c.call(this,b,d,this.getAttribute(a));return e&&function(b){this.setAttribute(a,e(b))}}d["attr."+a]=a.local?f:e;return b},b.attr=function(a,c){return b.attrTween(a,ba(c))},b.styleTween=function(a,c,e){function f(b,d){var f=c.call(this,b,d,window.getComputedStyle(this,null).getPropertyValue(a));return f&&function(b){this.style.setProperty(a,f(b),e)}}arguments.length<3&&(e=null),d["style."+a]=f;return b},b.style=function(a,c,d){arguments.length<3&&(d=null);return b.styleTween(a,ba(c),d)},b.text=function(a){d.text=function(b,c){this.textContent=typeof a=="function"?a.call(this,b,c):a};return b},b.select=function(b){var c,d=_(a.select(b)).ease(m);c=-1,d.delay(function(a,b){return j[++c]}),c=-1,d.duration(function(a,b){return k[++c]});return d},b.selectAll=function(b){var c,d=_(a.selectAll(b)).ease(m);c=-1,d.delay(function(a,b){return j[b?c:++c]}),c=-1,d.duration(function(a,b){return k[b?c:++c]});return d},b.remove=function(){f=!0;return b},b.each=function(a,c){g[a].add(c);return b},b.call=h;return b.delay(0).duration(250)}function Y(a){return{__data__:a}}function X(a){arguments.length||(a=d3.ascending);return function(b,c){return a(b&&b.__data__,c&&c.__data__)}}function W(a){function b(b){var c=[],d,e,f,g;for(var h=0,i=a.length;h<i;h++){f=a[h],c.push(d=[]),d.parentNode=f.parentNode;for(var j=0,k=f.length;j<k;j++)(g=f[j])?(d.push(e=b(f.parentNode)),e.__data__=g.__data__):d.push(null)}return V(c)}a.append=function(a){function d(b){return b.appendChild(document.createElementNS(a.space,a.local))}function c(b){return b.appendChild(document.createElement(a))}a=d3.ns.qualify(a);return b(a.local?d:c)},a.insert=function(a,c){function e(b){return b.insertBefore(document.createElementNS(a.space,a.local),S(c,b))}function d(b){return b.insertBefore(document.createElement(a),S(c,b))}a=d3.ns.qualify(a);return b(a.local?e:d)};return a}function V(a){function d(b){for(var c=0,d=a.length;c<d;c++){var e=a[c];for(var f=0,g=e.length;f<g;f++){var h=e[f];if(h)return b.call(h,h.__data__,f)}}return null}function c(b){var c=[],d,e,f;for(var g=0,h=a.length;g<h;g++){e=a[g];for(var i=0,j=e.length;i<j;i++)if(f=e[i])c.push(d=b(f)),d.parentNode=f}return V(c)}function b(b){var c=[],d,e,f,g;for(var h=0,i=a.length;h<i;h++){f=a[h],c.push(d=[]),d.parentNode=f.parentNode;for(var j=0,k=f.length;j<k;j++)(g=f[j])?(d.push(e=b(g)),e&&"__data__"in g&&(e.__data__=g.__data__)):d.push(null)}return V(c)}a.select=function(a){return b(function(b){return S(a,b)})},a.selectAll=function(a){return c(function(b){return T(a,b)})},a.filter=function(b){var c=[],d,e,f;for(var g=0,h=a.length;g<h;g++){e=a[g],c.push(d=[]),d.parentNode=e.parentNode;for(var i=0,j=e.length;i<j;i++)(f=e[i])&&b.call(f,f.__data__,i)&&d.push(f)}return V(c)},a.map=function(b){var c,d;for(var e=0,f=a.length;e<f;e++){c=a[e];for(var g=0,h=c.length;g<h;g++)if(d=c[g])d.__data__=b.call(d,d.__data__,g)}return a},a.data=function(b,c){function g(a,b){var g=0,h=a.length,i=b.length,j=Math.min(h,i),k=Math.max(h,i),l=[],m=[],n=[],o,p;if(c){var q={},r=[],s,t=b.length;for(g=0;g<h;g++)s=c.call(o=a[g],o.__data__,g),s in q?n[t++]=a[g]:q[s]=o,r.push(s);for(g=0;g<i;g++)o=q[s=c.call(b,p=b[g],g)],o?(o.__data__=p,l[g]=o,m[g]=n[g]=null):(m[g]=Y(p),l[g]=n[g]=null),delete q[s];for(g=0;g<h;g++)r[g]in q&&(n[g]=a[g])}else{for(;g<j;g++)o=a[g],p=b[g],o?(o.__data__=p,l[g]=o,m[g]=n[g]=null):(m[g]=Y(p),l[g]=n[g]=null);for(;g<i;g++)m[g]=Y(b[g]),l[g]=n[g]=null;for(;g<k;g++)n[g]=a[g],m[g]=l[g]=null}m.parentNode=l.parentNode=n.parentNode=a.parentNode,d.push(m),e.push(l),f.push(n)}var d=[],e=[],f=[],h=-1,i=a.length,j;if(typeof b=="function")while(++h<i)g(j=a[h],b.call(j,j.parentNode.__data__,h));else while(++h<i)g(j=a[h],b);var k=V(e);k.enter=function(){return W(d)},k.exit=function(){return V(f)};return k},a.each=function(b){for(var c=0,d=a.length;c<d;c++){var e=a[c];for(var f=0,g=e.length;f<g;f++){var h=e[f];h&&b.call(h,h.__data__,f)}}return a},a.empty=function(){return!d(function(){return!0})},a.node=function(){return d(function(){return this})},a.attr=function(b,c){function j(){var a=c.apply(this,arguments);a==null?this.removeAttributeNS(b.space,b.local):this.setAttributeNS(b.space,b.local,a)}function i(){var a=c.apply(this,arguments);a==null?this.removeAttribute(b):this.setAttribute(b,a)}function h(){this.setAttributeNS(b.space,b.local,c)}function g(){this.setAttribute(b,c)}function f(){this.removeAttributeNS(b.space,b.local)}function e(){this.removeAttribute(b)}b=d3.ns.qualify(b);if(arguments.length<2)return d(b.local?function(){return this.getAttributeNS(b.space,b.local)}:function(){return this.getAttribute(b)});return a.each(c==null?b.local?f:e:typeof c=="function"?b.local?j:i:b.local?h:g)},a.classed=function(b,c){function i(){(c.apply(this,arguments)?f:h).call(this)}function h(){if(a=this.classList)return a.remove(b);var a=this.className,c=a.baseVal!=null,d=c?a.baseVal:a;d=g(d.replace(e," ")),c?a.baseVal=d:this.className=d}function f(){if(a=this.classList)return a.add(b);var a=this.className,c=a.baseVal!=null,d=c?a.baseVal:a;e.lastIndex=0,e.test(d)||(d=g(d+" "+b),c?a.baseVal=d:this.className=d)}var e=new RegExp("(^|\\s+)"+d3.requote(b)+"(\\s+|$)","g");if(arguments.length<2)return d(function(){if(a=this.classList)return a.contains(b);var a=this.className;e.lastIndex=0;return e.test(a.baseVal!=null?a.baseVal:a)});return a.each(typeof c=="function"?i:c?f:h)},a.style=function(b,c,e){function h(){var a=c.apply(this,arguments);a==null?this.style.removeProperty(b):this.style.setProperty(b,a,e)}function g(){this.style.setProperty(b,c,e)}function f(){this.style.removeProperty(b)}arguments.length<3&&(e="");if(arguments.length<2)return d(function(){return window.getComputedStyle(this,null).getPropertyValue(b)});return a.each(c==null?f:typeof c=="function"?h:g)},a.property=function(b,c){function g(){var a=c.apply(this,arguments);a==null?delete this[b]:this[b]=a}function f(){this[b]=c}function e(){delete this[b]}b=d3.ns.qualify(b);if(arguments.length<2)return d(function(){return this[b]});return a.each(c==null?e:typeof c=="function"?g:f)},a.text=function(b){function e(){this.textContent=b.apply(this,arguments)}function c(){this.textContent=b}if(arguments.length<1)return d(function(){return this.textContent});return a.each(typeof b=="function"?e:c)},a.html=function(b){function e(){this.innerHTML=b.apply(this,arguments)}function c(){this.innerHTML=b}if(arguments.length<1)return d(function(){return this.innerHTML});return a.each(typeof b=="function"?e:c)},a.append=function(a){function d(b){return b.appendChild(document.createElementNS(a.space,a.local))}function c(b){return b.appendChild(document.createElement(a))}a=d3.ns.qualify(a);return b(a.local?d:c)},a.insert=function(a,c){function e(b){return b.insertBefore(document.createElementNS(a.space,a.local),S(c,b))}function d(b){return b.insertBefore(document.createElement(a),S(c,b))}a=d3.ns.qualify(a);return b(a.local?e:d)},a.remove=function(){return a.each(function(){var a=this.parentNode;a&&a.removeChild(this)})},a.sort=function(b){b=X.apply(this,arguments);for(var c=0,d=a.length;c<d;c++){var e=a[c];e.sort(b);for(var f=1,g=e.length,h=e[0];f<g;f++){var i=e[f];i&&(h&&h.parentNode.insertBefore(i,h.nextSibling),h=i)}}return a},a.on=function(b,c,d){arguments.length<3&&(d=!1);var e=b.indexOf("."),f=e===-1?b:b.substring(0,e),g="__on"+b;return a.each(function(a,b){function h(a){var d=d3.event;d3.event=a;try{c.call(this,e.__data__,b)}finally{d3.event=d}}this[g]&&this.removeEventListener(f,this[g],d),c&&this.addEventListener(f,this[g]=h,d);var e=this})},a.transition=function(){return _(a)},a.call=h;return a}function R(a,b,c){function g(a){return Math.round(f(a)*255)}function f(a){a>360?a-=360:a<0&&(a+=360);if(a<60)return d+(e-d)*a/60;if(a<180)return e;if(a<240)return d+(e-d)*(240-a)/60;return d}var d,e;a=a%360,a<0&&(a+=360),b=b<0?0:b>1?1:b,c=c<0?0:c>1?1:c,e=c<=.5?c*(1+b):c+b-c*b,d=2*c-e;return H(g(a+120),g(a),g(a-120))}function Q(a,b,c){this.h=a,this.s=b,this.l=c}function P(a,b,c){return new Q(a,b,c)}function M(a){var b=parseFloat(a);return a.charAt(a.length-1)==="%"?Math.round(b*2.55):b}function L(a,b,c){var d=Math.min(a/=255,b/=255,c/=255),e=Math.max(a,b,c),f=e-d,g,h,i=(e+d)/2;f?(h=i<.5?f/(e+d):f/(2-e-d),a==e?g=(b-c)/f+(b<c?6:0):b==e?g=(c-a)/f+2:g=(a-b)/f+4,g*=60):h=g=0;return P(g,h,i)}function K(a,b,c){var d=0,e=0,f=0,g,h,i;g=/([a-z]+)\((.*)\)/i.exec(a);if(g){h=g[2].split(",");switch(g[1]){case"hsl":return c(parseFloat(h[0]),parseFloat(h[1])/100,parseFloat(h[2])/100);case"rgb":return b(M(h[0]),M(h[1]),M(h[2]))}}if(i=N[a])return b(i.r,i.g,i.b);a!=null&&a.charAt(0)==="#"&&(a.length===4?(d=a.charAt(1),d+=d,e=a.charAt(2),e+=e,f=a.charAt(3),f+=f):a.length===7&&(d=a.substring(1,3),e=a.substring(3,5),f=a.substring(5,7)),d=parseInt(d,16),e=parseInt(e,16),f=parseInt(f,16));return b(d,e,f)}function J(a){return a<16?"0"+a.toString(16):a.toString(16)}function I(a,b,c){this.r=a,this.g=b,this.b=c}function H(a,b,c){return new I(a,b,c)}function G(a,b){b=1/(b-(a=+a));return function(c){return Math.max(0,Math.min(1,(c-a)*b))}}function F(a,b){b=1/(b-(a=+a));return function(c){return(c-a)*b}}function E(a){return a in D||/\bcolor\b/.test(a)?d3.interpolateRgb:d3.interpolate}function B(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}function A(a){a||(a=1.70158);return function(b){return b*b*((a+1)*b-a)}}function z(a,b){var c;arguments.length<2&&(b=.45),arguments.length<1?(a=1,c=b/4):c=b/(2*Math.PI)*Math.asin(1/a);return function(d){return 1+a*Math.pow(2,10*-d)*Math.sin((d-c)*2*Math.PI/b)}}function y(a){return 1-Math.sqrt(1-a*a)}function x(a){return a?Math.pow(2,10*(a-1))-.001:0}function w(a){return 1-Math.cos(a*Math.PI/2)}function v(a){return function(b){return Math.pow(b,a)}}function u(a){return a}function t(a){return function(b){return.5*(b<.5?a(2*b):2-a(2-2*b))}}function s(a){return function(b){return 1-a(1-b)}}function n(a){var b=a.lastIndexOf("."),c=b>=0?a.substring(b):(b=a.length,""),d=[];while(b>0)d.push(a.substring(b-=3,b+3));return d.reverse().join(",")+c}function m(a){return a+""}function j(a){var b={},c=[];b.add=function(a){for(var d=0;d<c.length;d++)if(c[d].listener==a)return b;c.push({listener:a,on:!0});return b},b.remove=function(a){for(var d=0;d<c.length;d++){var e=c[d];if(e.listener==a){e.on=!1,c=c.slice(0,d).concat(c.slice(d+1));break}}return b},b.dispatch=function(){var a=c;for(var b=0,d=a.length;b<d;b++){var e=a[b];e.on&&e.listener.apply(this,arguments)}};return b}function h(a){a.apply(this,(arguments[0]=this,arguments));return this}function g(a){return a.replace(/(^\s+)|(\s+$)/g,"").replace(/\s+/g," ")}function f(a){return a==null}function e(a){return a.length}function c(a){return Array.prototype.slice.call(a)}function b(a){var b=-1,c=a.length,d=[];while(++b<c)d.push(a[b]);return d}d3={version:"1.27.1"},Date.now||(Date.now=function(){return+(new Date)}),Object.create||(Object.create=function(a){function b(){}b.prototype=a;return new b});var a=c;try{a(document.documentElement.childNodes)[0].nodeType}catch(d){a=b}d3.functor=function(a){return typeof a=="function"?a:function(){return a}},d3.rebind=function(a,b){return function(){var c=b.apply(a,arguments);return arguments.length?a:c}},d3.ascending=function(a,b){return a<b?-1:a>b?1:0},d3.descending=function(a,b){return b<a?-1:b>a?1:0},d3.min=function(a,b){var c=-1,d=a.length,e,f;if(arguments.length===1){while(++c<d&&((e=a[c])==null||e!=e))e=undefined;while(++c<d)(f=a[c])!=null&&e>f&&(e=f)}else{while(++c<d&&((e=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c<d)(f=b.call(a,a[c],c))!=null&&e>f&&(e=f)}return e},d3.max=function(a,b){var c=-1,d=a.length,e,f;if(arguments.length===1){while(++c<d&&((e=a[c])==null||e!=e))e=undefined;while(++c<d)(f=a[c])!=null&&f>e&&(e=f)}else{while(++c<d&&((e=b.call(a,a[c],c))==null||e!=e))e=undefined;while(++c<d)(f=b.call(a,a[c],c))!=null&&f>e&&(e=f)}return e},d3.sum=function(a,b){var c=0,d=a.length,e,f=-1;if(arguments.length===1)while(++f<d)isNaN(e=+a[f])||(c+=e);else while(++f<d)isNaN(e=+b.call(a,a[f],f))||(c+=e);return c},d3.quantile=function(a,b){var c=(a.length-1)*b+1,d=Math.floor(c),e=a[d-1],f=c-d;return f?e+f*(a[d]-e):e},d3.zip=function(){if(!(f=arguments.length))return[];for(var a=-1,b=d3.min(arguments,e),c=Array(b);++a<b;)for(var d=-1,f,g=c[a]=Array(f);++d<f;)g[d]=arguments[d][a];return c},d3.bisectLeft=function(a,b,c,d){arguments.length<3&&(c=0),arguments.length<4&&(d=a.length);while(c<d){var e=c+d>>1;a[e]<b?c=e+1:d=e}return c},d3.bisect=d3.bisectRight=function(a,b,c,d){arguments.length<3&&(c=0),arguments.length<4&&(d=a.length);while(c<d){var e=c+d>>1;b<a[e]?d=e:c=e+1}return c},d3.first=function(a,b){var c=0,d=a.length,e=a[0],f;arguments.length===1&&(b=d3.ascending);while(++c<d)b.call(a,e,f=a[c])>0&&(e=f);return e},d3.last=function(a,b){var c=0,d=a.length,e=a[0],f;arguments.length===1&&(b=d3.ascending);while(++c<d)b.call(a,e,f=a[c])<=0&&(e=f);return e},d3.nest=function(){function g(a,d){if(d>=b.length)return a;var e=[],f=c[d++],h;for(h in a)e.push({key:h,values:g(a[h],d)});f&&e.sort(function(a,b){return f(a.key,b.key)});return e}function f(c,g){if(g>=b.length)return e?e.call(a,c):d?c.sort(d):c;var h=-1,i=c.length,j=b[g++],k,l,m={};while(++h<i)(k=j(l=c[h]))in m?m[k].push(l):m[k]=[l];for(k in m)m[k]=f(m[k],g);return m}var a={},b=[],c=[],d,e;a.map=function(a){return f(a,0)},a.entries=function(a){return g(f(a,0),0)},a.key=function(c){b.push(c);return a},a.sortKeys=function(d){c[b.length-1]=d;return a},a.sortValues=function(b){d=b;return a},a.rollup=function(b){e=b;return a};return a},d3.keys=function(a){var b=[];for(var c in a)b.push(c);return b},d3.values=function(a){var b=[];for(var c in a)b.push(a[c]);return b},d3.entries=function(a){var b=[];for(var c in a)b.push({key:c,value:a[c]});return b},d3.permute=function(a,b){var c=[],d=-1,e=b.length;while(++d<e)c[d]=a[b[d]];return c},d3.merge=function(a){return Array.prototype.concat.apply([],a)},d3.split=function(a,b){var c=[],d=[],e,g=-1,h=a.length;arguments.length<2&&(b=f);while(++g<h)b.call(d,e=a[g],g)?d=[]:(d.length||c.push(d),d.push(e));return c},d3.range=function(a,b,c){arguments.length===1&&(b=a,a=0),c==null&&(c=1);if((b-a)/c==Infinity)throw new Error("infinite range");var d=[],e=-1,f;if(c<0)while((f=a+c*++e)>b)d.push(f);else while((f=a+c*++e)<b)d.push(f);return d},d3.requote=function(a){return a.replace(i,"\\$&")};var i=/[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g;d3.round=function(a,b){return b?Math.round(a*Math.pow(10,b))*Math.pow(10,-b):Math.round(a)},d3.xhr=function(a,b,c){var d=new XMLHttpRequest;arguments.length<3?c=b:b&&d.overrideMimeType&&d.overrideMimeType(b),d.open("GET",a,!0),d.onreadystatechange=function(){d.readyState===4&&c(d.status<300?d:null)},d.send(null)},d3.text=function(a,b,c){function d(a){c(a&&a.responseText)}arguments.length<3&&(c=b,b=null),d3.xhr(a,b,d)},d3.json=function(a,b){d3.text(a,"application/json",function(a){b(a?JSON.parse(a):null)})},d3.html=function(a,b){d3.text(a,"text/html",function(a){if(a!=null){var c=document.createRange();c.selectNode(document.body),a=c.createContextualFragment(a)}b(a)})},d3.xml=function(a,b,c){function d(a){c(a&&a.responseXML)}arguments.length<3&&(c=b,b=null),d3.xhr(a,b,d)},d3.ns={prefix:{svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},qualify:function(a){var b=a.indexOf(":");return b<0?a:{space:d3.ns.prefix[a.substring(0,b)],local:a.substring(b+1)}}},d3.dispatch=function(a){var b={},c;for(var d=0,e=arguments.length;d<e;d++)c=arguments[d],b[c]=j(c);return b},d3.format=function(a){var b=k.exec(a),c=b[1]||" ",d=b[3]||"",e=b[5],f=+b[6],g=b[7],h=b[8],i=b[9],j=!1,o=!1;h&&(h=h.substring(1)),e&&(c="0",g&&(f-=Math.floor((f-1)/4)));switch(i){case"n":g=!0,i="g";break;case"%":j=!0,i="f";break;case"p":j=!0,i="r";break;case"d":o=!0,h="0"}i=l[i]||m;return function(a){var b=j?a*100:+a,k=b<0&&(b=-b)?"−":d;if(o&&b%1)return"";a=i(b,h);if(e){var l=a.length+k.length;l<f&&(a=Array(f-l+1).join(c)+a),g&&(a=n(a)),a=k+a}else{g&&(a=n(a)),a=k+a;var l=a.length;l<f&&(a=Array(f-l+1).join(c)+a)}j&&(a+="%");return a}};var k=/(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/,l={g:function(a,b){return a.toPrecision(b)},e:function(a,b){return a.toExponential(b)},f:function(a,b){return a.toFixed(b)},r:function(a,b){var c=1+Math.floor(1e-15+Math.log(a)/Math.LN10);return d3.round(a,b-c).toFixed(Math.max(0,b-c))}},o=v(2),p=v(3),q={linear:function(){return u},poly:v,quad:function(){return o},cubic:function(){return p},sin:function(){return w},exp:function(){return x},circle:function(){return y},elastic:z,back:A,bounce:function(){return B}},r={"in":function(a){return a},out:s,"in-out":t,"out-in":function(a){return t(s(a))}};d3.ease=function(a){var b=a.indexOf("-"),c=b>=0?a.substring(0,b):a,d=b>=0?a.substring(b+1):"in";return r[d](q[c].apply(null,Array.prototype.slice.call(arguments,1)))},d3.event=null,d3.interpolate=function(a,b){var c=d3.interpolators.length,d;while(--c>=0&&!(d=d3.interpolators[c](a,b)));return d},d3.interpolateNumber=function(a,b){b-=a;return function(c){return a+b*c}},d3.interpolateRound=function(a,b){b-=a;return function(c){return Math.round(a+b*c)}},d3.interpolateString=function(a,b){var c,d,e,f=0,g=0,h=[],i=[],j,k;C.lastIndex=0;for(d=0;c=C.exec(b);++d)c.index&&h.push(b.substring(f,g=c.index)),i.push({i:h.length,x:c[0]}),h.push(null),f=C.lastIndex;f<b.length&&h.push(b.substring(f));for(d=0,j=i.length;(c=C.exec(a))&&d<j;++d){k=i[d];if(k.x==c[0]){if(k.i)if(h[k.i+1]==null){h[k.i-1]+=k.x,h.splice(k.i,1);for(e=d+1;e<j;++e)i[e].i--}else{h[k.i-1]+=k.x+h[k.i+1],h.splice(k.i,2);for(e=d+1;e<j;++e)i[e].i-=2}else if(h[k.i+1]==null)h[k.i]=k.x;else{h[k.i]=k.x+h[k.i+1],h.splice(k.i+1,1);for(e=d+1;e<j;++e)i[e].i--}i.splice(d,1),j--,d--}else k.x=d3.interpolateNumber(parseFloat(c[0]),parseFloat(k.x))}while(d<j)k=i.pop(),h[k.i+1]==null?h[k.i]=k.x:(h[k.i]=k.x+h[k.i+1],h.splice(k.i+1,1)),j--;if(h.length===1)return h[0]==null?i[0].x:function(){return b};return function(a){for(d=0;d<j;++d)h[(k=i[d]).i]=k.x(a);return h.join("")}},d3.interpolateRgb=function(a,b){a=d3.rgb(a),b=d3.rgb(b);var c=a.r,d=a.g,e=a.b,f=b.r-c,g=b.g-d,h=b.b-e;return function(a){return"rgb("+Math.round(c+f*a)+","+Math.round(d+g*a)+","+Math.round(e+h*a)+")"}},d3.interpolateHsl=function(a,b){a=d3.hsl(a),b=d3.hsl(b);var c=a.h,d=a.s,e=a.l,f=b.h-c,g=b.s-d,h=b.l-e;return function(a){return R(c+f*a,d+g*a,e+h*a).toString()}},d3.interpolateArray=function(a,b){var c=[],d=[],e=a.length,f=b.length,g=Math.min(a.length,b.length),h;for(h=0;h<g;++h)c.push(d3.interpolate(a[h],b[h]));for(;h<e;++h)d[h]=a[h];for(;h<f;++h)d[h]=b[h];return function(a){for(h=0;h<g;++h)d[h]=c[h](a);return d}},d3.interpolateObject=function(a,b){var c={},d={},e;for(e in a)e in b?c[e]=E(e)(a[e],b[e]):d[e]=a[e];for(e in b)e in a||(d[e]=b[e]);return function(a){for(e in c)d[e]=c[e](a);return d}};var C=/[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g,D={background:1,fill:1,stroke:1};d3.interpolators=[d3.interpolateObject,function(a,b){return b instanceof Array&&d3.interpolateArray(a,b)},function(a,b){return typeof b=="string"&&d3.interpolateString(String(a),b)},function(a,b){return(b in N||/^(#|rgb\(|hsl\()/.test(b))&&d3.interpolateRgb(String(a),b)},function(a,b){return typeof b=="number"&&d3.interpolateNumber(+a,b)}],d3.rgb=function(a,b,c){return arguments.length===1?K(""+a,H,R):H(~~a,~~b,~~c)},I.prototype.brighter=function(a){a=Math.pow(.7,arguments.length?a:1);var b=this.r,c=this.g,d=this.b,e=30;if(!b&&!c&&!d)return H(e,e,e);b&&b<e&&(b=e),c&&c<e&&(c=e),d&&d<e&&(d=e);return H(Math.min(255,Math.floor(b/a)),Math.min(255,Math.floor(c/a)),Math.min(255,Math.floor(d/a)))},I.prototype.darker=function(a){a=Math.pow(.7,arguments.length?a:1);return H(Math.max(0,Math.floor(a*this.r)),Math.max(0,Math.floor(a*this.g)),Math.max(0,Math.floor(a*this.b)))},I.prototype.hsl=function(){return L(this.r,this.g,this.b)},I.prototype.toString=function(){return"#"+J(this.r)+J(this.g)+J(this.b)};var N={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};for(var O in N)N[O]=K(N[O],H,R);d3.hsl=function(a,b,c){return arguments.length===1?K(""+a,L,P):P(+a,+b,+c)},Q.prototype.brighter=function(a){a=Math.pow(.7,arguments.length?a:1);return P(this.h,this.s,this.l/a)},Q.prototype.darker=function(a){a=Math.pow(.7,arguments.length?a:1);return P(this.h,this.s,a*this.l)},Q.prototype.rgb=function(){return R(this.h,this.s,this.l)},Q.prototype.toString=function(){return"hsl("+this.h+","+this.s*100+"%,"+this.l*100+"%)"};var S=function(a,b){return b.querySelector(a)},T=function(b,c){return a(c.querySelectorAll(b))};typeof Sizzle=="function"&&(S=function(a,b){return Sizzle(a,b)[0]},T=function(a,b){return Sizzle.uniqueSort(Sizzle(a,b))});var U=V([[
document]]);U[0].parentNode=document.documentElement,d3.select=function(a){return typeof a=="string"?U.select(a):V([[a]])},d3.selectAll=function(b){return typeof b=="string"?U.selectAll(b):V([a(b)])},d3.transition=U.transition;var Z=0,$=0,bb=null,bc,bd;d3.timer=function(a){be(a,0)},d3.timer.flush=function(){var a,b=Date.now(),c=bb;while(c)a=b-c.then,c.delay||(c.flush=c.callback(a)),c=c.next;bg()};var bh=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,17)};d3.scale={},d3.scale.linear=function(){function h(a){return e(a)}function g(){var g=a.length==2?bq:br,i=d?G:F;e=g(a,b,i,c),f=g(b,a,i,d3.interpolate);return h}var a=[0,1],b=[0,1],c=d3.interpolate,d=!1,e,f;h.invert=function(a){return f(a)},h.domain=function(b){if(!arguments.length)return a;a=b.map(Number);return g()},h.range=function(a){if(!arguments.length)return b;b=a;return g()},h.rangeRound=function(a){return h.range(a).interpolate(d3.interpolateRound)},h.clamp=function(a){if(!arguments.length)return d;d=a;return g()},h.interpolate=function(a){if(!arguments.length)return c;c=a;return g()},h.ticks=function(b){return bo(a,b)},h.tickFormat=function(b){return bp(a,b)},h.nice=function(){bj(a,bm);return g()};return g()},d3.scale.log=function(){function d(c){return a(b(c))}var a=d3.scale.linear(),b=bs,c=b.pow;d.invert=function(b){return c(a.invert(b))},d.domain=function(e){if(!arguments.length)return a.domain().map(c);b=e[0]<0?bt:bs,c=b.pow,a.domain(e.map(b));return d},d.nice=function(){a.domain(bj(a.domain(),bk));return d},d.ticks=function(){var d=bi(a.domain()),e=[];if(d.every(isFinite)){var f=Math.floor(d[0]),g=Math.ceil(d[1]),h=c(d[0]),i=c(d[1]);if(b===bt){e.push(c(f));for(;f++<g;)for(var j=9;j>0;j--)e.push(c(f)*j)}else{for(;f<g;f++)for(var j=1;j<10;j++)e.push(c(f)*j);e.push(c(f))}for(f=0;e[f]<h;f++);for(g=e.length;e[g-1]>i;g--);e=e.slice(f,g)}return e},d.tickFormat=function(){return bu};return bl(d,a)},bs.pow=function(a){return Math.pow(10,a)},bt.pow=function(a){return-Math.pow(10,-a)},d3.scale.pow=function(){function e(b){return a(c(b))}var a=d3.scale.linear(),b=1,c=Number,d=c;e.invert=function(b){return d(a.invert(b))},e.domain=function(f){if(!arguments.length)return a.domain().map(d);var g=(f[0]||f[f.length-1])<0?bw:bv;c=g(b),d=g(1/b),a.domain(f.map(c));return e},e.ticks=function(a){return bo(e.domain(),a)},e.tickFormat=function(a){return bp(e.domain(),a)},e.nice=function(){return e.domain(bj(e.domain(),bm))},e.exponent=function(a){if(!arguments.length)return b;var c=e.domain();b=a;return e.domain(c)};return bl(e,a)},d3.scale.sqrt=function(){return d3.scale.pow().exponent(.5)},d3.scale.ordinal=function(){function e(d){var e=d in b?b[d]:b[d]=a.push(d)-1;return c[e%c.length]}var a=[],b={},c=[],d=0;e.domain=function(c){if(!arguments.length)return a;a=c,b={};var d=-1,f=-1,g=a.length;while(++d<g)c=a[d],c in b||(b[c]=++f);return e},e.range=function(a){if(!arguments.length)return c;c=a;return e},e.rangePoints=function(b,f){arguments.length<2&&(f=0);var g=b[0],h=b[1],i=(h-g)/(a.length-1+f);c=a.length==1?[(g+h)/2]:d3.range(g+i*f/2,h+i/2,i),d=0;return e},e.rangeBands=function(b,f){arguments.length<2&&(f=0);var g=b[0],h=b[1],i=(h-g)/(a.length+f);c=d3.range(g+i*f,h,i),d=i*(1-f);return e},e.rangeRoundBands=function(b,f){arguments.length<2&&(f=0);var g=b[0],h=b[1],i=h-g,j=Math.floor(i/(a.length+f)),k=i-(a.length-f)*j;c=d3.range(g+Math.round(k/2),h,j),d=Math.round(j*(1-f));return e},e.rangeBand=function(){return d};return e},d3.scale.category10=function(){return d3.scale.ordinal().range(bx)},d3.scale.category20=function(){return d3.scale.ordinal().range(by)},d3.scale.category20b=function(){return d3.scale.ordinal().range(bz)},d3.scale.category20c=function(){return d3.scale.ordinal().range(bA)};var bx=["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"],by=["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"],bz=["#393b79","#5254a3","#6b6ecf","#9c9ede","#637939","#8ca252","#b5cf6b","#cedb9c","#8c6d31","#bd9e39","#e7ba52","#e7cb94","#843c39","#ad494a","#d6616b","#e7969c","#7b4173","#a55194","#ce6dbd","#de9ed6"],bA=["#3182bd","#6baed6","#9ecae1","#c6dbef","#e6550d","#fd8d3c","#fdae6b","#fdd0a2","#31a354","#74c476","#a1d99b","#c7e9c0","#756bb1","#9e9ac8","#bcbddc","#dadaeb","#636363","#969696","#bdbdbd","#d9d9d9"];d3.scale.quantile=function(){function e(a){if(isNaN(a=+a))return NaN;return b[d3.bisect(c,a)]}function d(){var d=0,e=a.length,f=b.length;c.length=Math.max(0,f-1);while(++d<f)c[d-1]=d3.quantile(a,d/f)}var a=[],b=[],c=[];e.domain=function(b){if(!arguments.length)return a;a=b.filter(function(a){return!isNaN(a)}).sort(d3.ascending),d();return e},e.range=function(a){if(!arguments.length)return b;b=a,d();return e},e.quantiles=function(){return c};return e},d3.scale.quantize=function(){function f(b){return e[Math.max(0,Math.min(d,Math.floor(c*(b-a))))]}var a=0,b=1,c=2,d=1,e=[0,1];f.domain=function(d){if(!arguments.length)return[a,b];a=d[0],b=d[1],c=e.length/(b-a);return f},f.range=function(g){if(!arguments.length)return e;e=g,c=e.length/(b-a),d=e.length-1;return f};return f},d3.svg={},d3.svg.arc=function(){function e(){var e=a.apply(this,arguments),f=b.apply(this,arguments),g=c.apply(this,arguments)+bB,h=d.apply(this,arguments)+bB,i=h-g,j=i<Math.PI?"0":"1",k=Math.cos(g),l=Math.sin(g),m=Math.cos(h),n=Math.sin(h);return i>=bC?e?"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+ -f+"A"+f+","+f+" 0 1,1 0,"+f+"M0,"+e+"A"+e+","+e+" 0 1,1 0,"+ -e+"A"+e+","+e+" 0 1,1 0,"+e+"Z":"M0,"+f+"A"+f+","+f+" 0 1,1 0,"+ -f+"A"+f+","+f+" 0 1,1 0,"+f+"Z":e?"M"+f*k+","+f*l+"A"+f+","+f+" 0 "+j+",1 "+f*m+","+f*n+"L"+e*m+","+e*n+"A"+e+","+e+" 0 "+j+",0 "+e*k+","+e*l+"Z":"M"+f*k+","+f*l+"A"+f+","+f+" 0 "+j+",1 "+f*m+","+f*n+"L0,0"+"Z"}var a=bD,b=bE,c=bF,d=bG;e.innerRadius=function(b){if(!arguments.length)return a;a=d3.functor(b);return e},e.outerRadius=function(a){if(!arguments.length)return b;b=d3.functor(a);return e},e.startAngle=function(a){if(!arguments.length)return c;c=d3.functor(a);return e},e.endAngle=function(a){if(!arguments.length)return d;d=d3.functor(a);return e},e.centroid=function(){var e=(a.apply(this,arguments)+b.apply(this,arguments))/2,f=(c.apply(this,arguments)+d.apply(this,arguments))/2+bB;return[Math.cos(f)*e,Math.sin(f)*e]};return e};var bB=-Math.PI/2,bC=2*Math.PI-1e-6;d3.svg.line=function(){return bH(Object)};var bL={linear:bM,"step-before":bN,"step-after":bO,basis:bU,"basis-open":bV,"basis-closed":bW,bundle:bX,cardinal:bR,"cardinal-open":bP,"cardinal-closed":bQ,monotone:ce},bZ=[0,2/3,1/3,0],b$=[0,1/3,2/3,0],b_=[0,1/6,2/3,1/6];d3.svg.line.radial=function(){var a=bH(cf);a.radius=a.x,delete a.x,a.angle=a.y,delete a.y;return a},d3.svg.area=function(){return cg(Object)},d3.svg.area.radial=function(){var a=cg(cf);a.radius=a.x,delete a.x,a.innerRadius=a.x0,delete a.x0,a.outerRadius=a.x1,delete a.x1,a.angle=a.y,delete a.y,a.startAngle=a.y0,delete a.y0,a.endAngle=a.y1,delete a.y1;return a},d3.svg.chord=function(){function j(a,b,c,d){return"Q 0,0 "+d}function i(a,b){return"A"+a+","+a+" 0 0,1 "+b}function h(a,b){return a.a0==b.a0&&a.a1==b.a1}function g(a,b,f,g){var h=b.call(a,f,g),i=c.call(a,h,g),j=d.call(a,h,g)+bB,k=e.call(a,h,g)+bB;return{r:i,a0:j,a1:k,p0:[i*Math.cos(j),i*Math.sin(j)],p1:[i*Math.cos(k),i*Math.sin(k)]}}function f(c,d){var e=g(this,a,c,d),f=g(this,b,c,d);return"M"+e.p0+i(e.r,e.p1)+(h(e,f)?j(e.r,e.p1,e.r,e.p0):j(e.r,e.p1,f.r,f.p0)+i(f.r,f.p1)+j(f.r,f.p1,e.r,e.p0))+"Z"}var a=cj,b=ck,c=cl,d=bF,e=bG;f.radius=function(a){if(!arguments.length)return c;c=d3.functor(a);return f},f.source=function(b){if(!arguments.length)return a;a=d3.functor(b);return f},f.target=function(a){if(!arguments.length)return b;b=d3.functor(a);return f},f.startAngle=function(a){if(!arguments.length)return d;d=d3.functor(a);return f},f.endAngle=function(a){if(!arguments.length)return e;e=d3.functor(a);return f};return f},d3.svg.diagonal=function(){function d(d,e){var f=a.call(this,d,e),g=b.call(this,d,e),h=(f.y+g.y)/2,i=[f,{x:f.x,y:h},{x:g.x,y:h},g];i=i.map(c);return"M"+i[0]+"C"+i[1]+" "+i[2]+" "+i[3]}var a=cj,b=ck,c=co;d.source=function(b){if(!arguments.length)return a;a=d3.functor(b);return d},d.target=function(a){if(!arguments.length)return b;b=d3.functor(a);return d},d.projection=function(a){if(!arguments.length)return c;c=a;return d};return d},d3.svg.diagonal.radial=function(){var a=d3.svg.diagonal(),b=co,c=a.projection;a.projection=function(a){return arguments.length?c(cp(b=a)):b};return a},d3.svg.mouse=function(a){return cr(a,d3.event)};var cq=/WebKit/.test(navigator.userAgent)?-1:0;d3.svg.touches=function(b){var c=d3.event.touches;return c?a(c).map(function(a){var c=cr(b,a);c.identifier=a.identifier;return c}):[]},d3.svg.symbol=function(){function c(c,d){return(cu[a.call(this,c,d)]||cu.circle)(b.call(this,c,d))}var a=ct,b=cs;c.type=function(b){if(!arguments.length)return a;a=d3.functor(b);return c},c.size=function(a){if(!arguments.length)return b;b=d3.functor(a);return c};return c};var cu={circle:function(a){var b=Math.sqrt(a/Math.PI);return"M0,"+b+"A"+b+","+b+" 0 1,1 0,"+ -b+"A"+b+","+b+" 0 1,1 0,"+b+"Z"},cross:function(a){var b=Math.sqrt(a/5)/2;return"M"+ -3*b+","+ -b+"H"+ -b+"V"+ -3*b+"H"+b+"V"+ -b+"H"+3*b+"V"+b+"H"+b+"V"+3*b+"H"+ -b+"V"+b+"H"+ -3*b+"Z"},diamond:function(a){var b=Math.sqrt(a/(2*cw)),c=b*cw;return"M0,"+ -b+"L"+c+",0"+" 0,"+b+" "+ -c+",0"+"Z"},square:function(a){var b=Math.sqrt(a)/2;return"M"+ -b+","+ -b+"L"+b+","+ -b+" "+b+","+b+" "+ -b+","+b+"Z"},"triangle-down":function(a){var b=Math.sqrt(a/cv),c=b*cv/2;return"M0,"+c+"L"+b+","+ -c+" "+ -b+","+ -c+"Z"},"triangle-up":function(a){var b=Math.sqrt(a/cv),c=b*cv/2;return"M0,"+ -c+"L"+b+","+c+" "+ -b+","+c+"Z"}};d3.svg.symbolTypes=d3.keys(cu);var cv=Math.sqrt(3),cw=Math.tan(30*Math.PI/180)})()
;
// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function(a){var b="0.3.4",c="hasOwnProperty",d=/[\.\/]/,e="*",f=function(){},g=function(a,b){return a-b},h,i,j={n:{}},k=function(a,b){var c=j,d=i,e=Array.prototype.slice.call(arguments,2),f=k.listeners(a),l=0,m=!1,n,o=[],p={},q=[],r=h,s=[];h=a,i=0;for(var t=0,u=f.length;t<u;t++)"zIndex"in f[t]&&(o.push(f[t].zIndex),f[t].zIndex<0&&(p[f[t].zIndex]=f[t]));o.sort(g);while(o[l]<0){n=p[o[l++]],q.push(n.apply(b,e));if(i){i=d;return q}}for(t=0;t<u;t++){n=f[t];if("zIndex"in n)if(n.zIndex==o[l]){q.push(n.apply(b,e));if(i)break;do{l++,n=p[o[l]],n&&q.push(n.apply(b,e));if(i)break}while(n)}else p[n.zIndex]=n;else{q.push(n.apply(b,e));if(i)break}}i=d,h=r;return q.length?q:null};k.listeners=function(a){var b=a.split(d),c=j,f,g,h,i,k,l,m,n,o=[c],p=[];for(i=0,k=b.length;i<k;i++){n=[];for(l=0,m=o.length;l<m;l++){c=o[l].n,g=[c[b[i]],c[e]],h=2;while(h--)f=g[h],f&&(n.push(f),p=p.concat(f.f||[]))}o=n}return p},k.on=function(a,b){var c=a.split(d),e=j;for(var g=0,h=c.length;g<h;g++)e=e.n,!e[c[g]]&&(e[c[g]]={n:{}}),e=e[c[g]];e.f=e.f||[];for(g=0,h=e.f.length;g<h;g++)if(e.f[g]==b)return f;e.f.push(b);return function(a){+a==+a&&(b.zIndex=+a)}},k.stop=function(){i=1},k.nt=function(a){if(a)return(new RegExp("(?:\\.|\\/|^)"+a+"(?:\\.|\\/|$)")).test(h);return h},k.off=k.unbind=function(a,b){var f=a.split(d),g,h,i,k,l,m,n,o=[j];for(k=0,l=f.length;k<l;k++)for(m=0;m<o.length;m+=i.length-2){i=[m,1],g=o[m].n;if(f[k]!=e)g[f[k]]&&i.push(g[f[k]]);else for(h in g)g[c](h)&&i.push(g[h]);o.splice.apply(o,i)}for(k=0,l=o.length;k<l;k++){g=o[k];while(g.n){if(b){if(g.f){for(m=0,n=g.f.length;m<n;m++)if(g.f[m]==b){g.f.splice(m,1);break}!g.f.length&&delete g.f}for(h in g.n)if(g.n[c](h)&&g.n[h].f){var p=g.n[h].f;for(m=0,n=p.length;m<n;m++)if(p[m]==b){p.splice(m,1);break}!p.length&&delete g.n[h].f}}else{delete g.f;for(h in g.n)g.n[c](h)&&g.n[h].f&&delete g.n[h].f}g=g.n}}},k.once=function(a,b){var c=function(){var d=b.apply(this,arguments);k.unbind(a,c);return d};return k.on(a,c)},k.version=b,k.toString=function(){return"You are running Eve "+b},typeof module!="undefined"&&module.exports?module.exports=k:typeof define!="undefined"?define("eve",[],function(){return k}):a.eve=k})(this),function(){function cF(a){for(var b=0;b<cy.length;b++)cy[b].el.paper==a&&cy.splice(b--,1)}function cE(b,d,e,f,h,i){e=Q(e);var j,k,l,m=[],o,p,q,t=b.ms,u={},v={},w={};if(f)for(y=0,z=cy.length;y<z;y++){var x=cy[y];if(x.el.id==d.id&&x.anim==b){x.percent!=e?(cy.splice(y,1),l=1):k=x,d.attr(x.totalOrigin);break}}else f=+v;for(var y=0,z=b.percents.length;y<z;y++){if(b.percents[y]==e||b.percents[y]>f*b.top){e=b.percents[y],p=b.percents[y-1]||0,t=t/b.top*(e-p),o=b.percents[y+1],j=b.anim[e];break}f&&d.attr(b.anim[b.percents[y]])}if(!!j){if(!k){for(var A in j)if(j[g](A))if(U[g](A)||d.paper.customAttributes[g](A)){u[A]=d.attr(A),u[A]==null&&(u[A]=T[A]),v[A]=j[A];switch(U[A]){case C:w[A]=(v[A]-u[A])/t;break;case"colour":u[A]=a.getRGB(u[A]);var B=a.getRGB(v[A]);w[A]={r:(B.r-u[A].r)/t,g:(B.g-u[A].g)/t,b:(B.b-u[A].b)/t};break;case"path":var D=bR(u[A],v[A]),E=D[1];u[A]=D[0],w[A]=[];for(y=0,z=u[A].length;y<z;y++){w[A][y]=[0];for(var F=1,G=u[A][y].length;F<G;F++)w[A][y][F]=(E[y][F]-u[A][y][F])/t}break;case"transform":var H=d._,I=ca(H[A],v[A]);if(I){u[A]=I.from,v[A]=I.to,w[A]=[],w[A].real=!0;for(y=0,z=u[A].length;y<z;y++){w[A][y]=[u[A][y][0]];for(F=1,G=u[A][y].length;F<G;F++)w[A][y][F]=(v[A][y][F]-u[A][y][F])/t}}else{var J=d.matrix||new cb,K={_:{transform:H.transform},getBBox:function(){return d.getBBox(1)}};u[A]=[J.a,J.b,J.c,J.d,J.e,J.f],b$(K,v[A]),v[A]=K._.transform,w[A]=[(K.matrix.a-J.a)/t,(K.matrix.b-J.b)/t,(K.matrix.c-J.c)/t,(K.matrix.d-J.d)/t,(K.matrix.e-J.e)/t,(K.matrix.f-J.f)/t]}break;case"csv":var L=r(j[A])[s](c),M=r(u[A])[s](c);if(A=="clip-rect"){u[A]=M,w[A]=[],y=M.length;while(y--)w[A][y]=(L[y]-u[A][y])/t}v[A]=L;break;default:L=[][n](j[A]),M=[][n](u[A]),w[A]=[],y=d.paper.customAttributes[A].length;while(y--)w[A][y]=((L[y]||0)-(M[y]||0))/t}}var O=j.easing,P=a.easing_formulas[O];if(!P){P=r(O).match(N);if(P&&P.length==5){var R=P;P=function(a){return cC(a,+R[1],+R[2],+R[3],+R[4],t)}}else P=bf}q=j.start||b.start||+(new Date),x={anim:b,percent:e,timestamp:q,start:q+(b.del||0),status:0,initstatus:f||0,stop:!1,ms:t,easing:P,from:u,diff:w,to:v,el:d,callback:j.callback,prev:p,next:o,repeat:i||b.times,origin:d.attr(),totalOrigin:h},cy.push(x);if(f&&!k&&!l){x.stop=!0,x.start=new Date-t*f;if(cy.length==1)return cA()}l&&(x.start=new Date-x.ms*f),cy.length==1&&cz(cA)}else k.initstatus=f,k.start=new Date-k.ms*f;eve("raphael.anim.start."+d.id,d,b)}}function cD(a,b){var c=[],d={};this.ms=b,this.times=1;if(a){for(var e in a)a[g](e)&&(d[Q(e)]=a[e],c.push(Q(e)));c.sort(bd)}this.anim=d,this.top=c[c.length-1],this.percents=c}function cC(a,b,c,d,e,f){function o(a,b){var c,d,e,f,j,k;for(e=a,k=0;k<8;k++){f=m(e)-a;if(z(f)<b)return e;j=(3*i*e+2*h)*e+g;if(z(j)<1e-6)break;e=e-f/j}c=0,d=1,e=a;if(e<c)return c;if(e>d)return d;while(c<d){f=m(e);if(z(f-a)<b)return e;a>f?c=e:d=e,e=(d-c)/2+c}return e}function n(a,b){var c=o(a,b);return((l*c+k)*c+j)*c}function m(a){return((i*a+h)*a+g)*a}var g=3*b,h=3*(d-b)-g,i=1-g-h,j=3*c,k=3*(e-c)-j,l=1-j-k;return n(a,1/(200*f))}function cq(){return this.x+q+this.y+q+this.width+" × "+this.height}function cp(){return this.x+q+this.y}function cb(a,b,c,d,e,f){a!=null?(this.a=+a,this.b=+b,this.c=+c,this.d=+d,this.e=+e,this.f=+f):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function bH(b,c,d){b=a._path2curve(b),c=a._path2curve(c);var e,f,g,h,i,j,k,l,m,n,o=d?0:[];for(var p=0,q=b.length;p<q;p++){var r=b[p];if(r[0]=="M")e=i=r[1],f=j=r[2];else{r[0]=="C"?(m=[e,f].concat(r.slice(1)),e=m[6],f=m[7]):(m=[e,f,e,f,i,j,i,j],e=i,f=j);for(var s=0,t=c.length;s<t;s++){var u=c[s];if(u[0]=="M")g=k=u[1],h=l=u[2];else{u[0]=="C"?(n=[g,h].concat(u.slice(1)),g=n[6],h=n[7]):(n=[g,h,g,h,k,l,k,l],g=k,h=l);var v=bG(m,n,d);if(d)o+=v;else{for(var w=0,x=v.length;w<x;w++)v[w].segment1=p,v[w].segment2=s,v[w].bez1=m,v[w].bez2=n;o=o.concat(v)}}}}}return o}function bG(b,c,d){var e=a.bezierBBox(b),f=a.bezierBBox(c);if(!a.isBBoxIntersect(e,f))return d?0:[];var g=bB.apply(0,b),h=bB.apply(0,c),i=~~(g/5),j=~~(h/5),k=[],l=[],m={},n=d?0:[];for(var o=0;o<i+1;o++){var p=a.findDotsAtSegment.apply(a,b.concat(o/i));k.push({x:p.x,y:p.y,t:o/i})}for(o=0;o<j+1;o++)p=a.findDotsAtSegment.apply(a,c.concat(o/j)),l.push({x:p.x,y:p.y,t:o/j});for(o=0;o<i;o++)for(var q=0;q<j;q++){var r=k[o],s=k[o+1],t=l[q],u=l[q+1],v=z(s.x-r.x)<.001?"y":"x",w=z(u.x-t.x)<.001?"y":"x",x=bD(r.x,r.y,s.x,s.y,t.x,t.y,u.x,u.y);if(x){if(m[x.x.toFixed(4)]==x.y.toFixed(4))continue;m[x.x.toFixed(4)]=x.y.toFixed(4);var y=r.t+z((x[v]-r[v])/(s[v]-r[v]))*(s.t-r.t),A=t.t+z((x[w]-t[w])/(u[w]-t[w]))*(u.t-t.t);y>=0&&y<=1&&A>=0&&A<=1&&(d?n++:n.push({x:x.x,y:x.y,t1:y,t2:A}))}}return n}function bF(a,b){return bG(a,b,1)}function bE(a,b){return bG(a,b)}function bD(a,b,c,d,e,f,g,h){if(!(x(a,c)<y(e,g)||y(a,c)>x(e,g)||x(b,d)<y(f,h)||y(b,d)>x(f,h))){var i=(a*d-b*c)*(e-g)-(a-c)*(e*h-f*g),j=(a*d-b*c)*(f-h)-(b-d)*(e*h-f*g),k=(a-c)*(f-h)-(b-d)*(e-g);if(!k)return;var l=i/k,m=j/k,n=+l.toFixed(2),o=+m.toFixed(2);if(n<+y(a,c).toFixed(2)||n>+x(a,c).toFixed(2)||n<+y(e,g).toFixed(2)||n>+x(e,g).toFixed(2)||o<+y(b,d).toFixed(2)||o>+x(b,d).toFixed(2)||o<+y(f,h).toFixed(2)||o>+x(f,h).toFixed(2))return;return{x:l,y:m}}}function bC(a,b,c,d,e,f,g,h,i){if(!(i<0||bB(a,b,c,d,e,f,g,h)<i)){var j=1,k=j/2,l=j-k,m,n=.01;m=bB(a,b,c,d,e,f,g,h,l);while(z(m-i)>n)k/=2,l+=(m<i?1:-1)*k,m=bB(a,b,c,d,e,f,g,h,l);return l}}function bB(a,b,c,d,e,f,g,h,i){i==null&&(i=1),i=i>1?1:i<0?0:i;var j=i/2,k=12,l=[-0.1252,.1252,-0.3678,.3678,-0.5873,.5873,-0.7699,.7699,-0.9041,.9041,-0.9816,.9816],m=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],n=0;for(var o=0;o<k;o++){var p=j*l[o]+j,q=bA(p,a,c,e,g),r=bA(p,b,d,f,h),s=q*q+r*r;n+=m[o]*w.sqrt(s)}return j*n}function bA(a,b,c,d,e){var f=-3*b+9*c-9*d+3*e,g=a*f+6*b-12*c+6*d;return a*g-3*b+3*c}function by(a,b){var c=[];for(var d=0,e=a.length;e-2*!b>d;d+=2){var f=[{x:+a[d-2],y:+a[d-1]},{x:+a[d],y:+a[d+1]},{x:+a[d+2],y:+a[d+3]},{x:+a[d+4],y:+a[d+5]}];b?d?e-4==d?f[3]={x:+a[0],y:+a[1]}:e-2==d&&(f[2]={x:+a[0],y:+a[1]},f[3]={x:+a[2],y:+a[3]}):f[0]={x:+a[e-2],y:+a[e-1]}:e-4==d?f[3]=f[2]:d||(f[0]={x:+a[d],y:+a[d+1]}),c.push(["C",(-f[0].x+6*f[1].x+f[2].x)/6,(-f[0].y+6*f[1].y+f[2].y)/6,(f[1].x+6*f[2].x-f[3].x)/6,(f[1].y+6*f[2].y-f[3].y)/6,f[2].x,f[2].y])}return c}function bx(){return this.hex}function bv(a,b,c){function d(){var e=Array.prototype.slice.call(arguments,0),f=e.join("␀"),h=d.cache=d.cache||{},i=d.count=d.count||[];if(h[g](f)){bu(i,f);return c?c(h[f]):h[f]}i.length>=1e3&&delete h[i.shift()],i.push(f),h[f]=a[m](b,e);return c?c(h[f]):h[f]}return d}function bu(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return a.push(a.splice(c,1)[0])}function bm(a){if(Object(a)!==a)return a;var b=new a.constructor;for(var c in a)a[g](c)&&(b[c]=bm(a[c]));return b}function a(c){if(a.is(c,"function"))return b?c():eve.on("raphael.DOMload",c);if(a.is(c,E))return a._engine.create[m](a,c.splice(0,3+a.is(c[0],C))).add(c);var d=Array.prototype.slice.call(arguments,0);if(a.is(d[d.length-1],"function")){var e=d.pop();return b?e.call(a._engine.create[m](a,d)):eve.on("raphael.DOMload",function(){e.call(a._engine.create[m](a,d))})}return a._engine.create[m](a,arguments)}a.version="2.1.0",a.eve=eve;var b,c=/[, ]+/,d={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},e=/\{(\d+)\}/g,f="prototype",g="hasOwnProperty",h={doc:document,win:window},i={was:Object.prototype[g].call(h.win,"Raphael"),is:h.win.Raphael},j=function(){this.ca=this.customAttributes={}},k,l="appendChild",m="apply",n="concat",o="createTouch"in h.doc,p="",q=" ",r=String,s="split",t="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[s](q),u={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},v=r.prototype.toLowerCase,w=Math,x=w.max,y=w.min,z=w.abs,A=w.pow,B=w.PI,C="number",D="string",E="array",F="toString",G="fill",H=Object.prototype.toString,I={},J="push",K=a._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i,L=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,M={NaN:1,Infinity:1,"-Infinity":1},N=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,O=w.round,P="setAttribute",Q=parseFloat,R=parseInt,S=r.prototype.toUpperCase,T=a._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0},U=a._availableAnimAttrs={blur:C,"clip-rect":"csv",cx:C,cy:C,fill:"colour","fill-opacity":C,"font-size":C,height:C,opacity:C,path:"path",r:C,rx:C,ry:C,stroke:"colour","stroke-opacity":C,"stroke-width":C,transform:"transform",width:C,x:C,y:C},V=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,W=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,X={hs:1,rg:1},Y=/,?([achlmqrstvxz]),?/gi,Z=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,$=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,_=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,ba=a._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,bb={},bc=function(a,b){return a.key-b.key},bd=function(a,b){return Q(a)-Q(b)},be=function(){},bf=function(a){return a},bg=a._rectPath=function(a,b,c,d,e){if(e)return[["M",a+e,b],["l",c-e*2,0],["a",e,e,0,0,1,e,e],["l",0,d-e*2],["a",e,e,0,0,1,-e,e],["l",e*2-c,0],["a",e,e,0,0,1,-e,-e],["l",0,e*2-d],["a",e,e,0,0,1,e,-e],["z"]];return[["M",a,b],["l",c,0],["l",0,d],["l",-c,0],["z"]]},bh=function(a,b,c,d){d==null&&(d=c);return[["M",a,b],["m",0,-d],["a",c,d,0,1,1,0,2*d],["a",c,d,0,1,1,0,-2*d],["z"]]},bi=a._getPath={path:function(a){return a.attr("path")},circle:function(a){var b=a.attrs;return bh(b.cx,b.cy,b.r)},ellipse:function(a){var b=a.attrs;return bh(b.cx,b.cy,b.rx,b.ry)},rect:function(a){var b=a.attrs;return bg(b.x,b.y,b.width,b.height,b.r)},image:function(a){var b=a.attrs;return bg(b.x,b.y,b.width,b.height)},text:function(a){var b=a._getBBox();return bg(b.x,b.y,b.width,b.height)}},bj=a.mapPath=function(a,b){if(!b)return a;var c,d,e,f,g,h,i;a=bR(a);for(e=0,g=a.length;e<g;e++){i=a[e];for(f=1,h=i.length;f<h;f+=2)c=b.x(i[f],i[f+1]),d=b.y(i[f],i[f+1]),i[f]=c,i[f+1]=d}return a};a._g=h,a.type=h.win.SVGAngle||h.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML";if(a.type=="VML"){var bk=h.doc.createElement("div"),bl;bk.innerHTML='<v:shape adj="1"/>',bl=bk.firstChild,bl.style.behavior="url(#default#VML)";if(!bl||typeof bl.adj!="object")return a.type=p;bk=null}a.svg=!(a.vml=a.type=="VML"),a._Paper=j,a.fn=k=j.prototype=a.prototype,a._id=0,a._oid=0,a.is=function(a,b){b=v.call(b);if(b=="finite")return!M[g](+a);if(b=="array")return a instanceof Array;return b=="null"&&a===null||b==typeof a&&a!==null||b=="object"&&a===Object(a)||b=="array"&&Array.isArray&&Array.isArray(a)||H.call(a).slice(8,-1).toLowerCase()==b},a.angle=function(b,c,d,e,f,g){if(f==null){var h=b-d,i=c-e;if(!h&&!i)return 0;return(180+w.atan2(-i,-h)*180/B+360)%360}return a.angle(b,c,f,g)-a.angle(d,e,f,g)},a.rad=function(a){return a%360*B/180},a.deg=function(a){return a*180/B%360},a.snapTo=function(b,c,d){d=a.is(d,"finite")?d:10;if(a.is(b,E)){var e=b.length;while(e--)if(z(b[e]-c)<=d)return b[e]}else{b=+b;var f=c%b;if(f<d)return c-f;if(f>b-d)return c-f+b}return c};var bn=a.createUUID=function(a,b){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a,b).toUpperCase()}}(/[xy]/g,function(a){var b=w.random()*16|0,c=a=="x"?b:b&3|8;return c.toString(16)});a.setWindow=function(b){eve("raphael.setWindow",a,h.win,b),h.win=b,h.doc=h.win.document,a._engine.initWin&&a._engine.initWin(h.win)};var bo=function(b){if(a.vml){var c=/^\s+|\s+$/g,d;try{var e=new ActiveXObject("htmlfile");e.write("<body>"),e.close(),d=e.body}catch(f){d=createPopup().document.body}var g=d.createTextRange();bo=bv(function(a){try{d.style.color=r(a).replace(c,p);var b=g.queryCommandValue("ForeColor");b=(b&255)<<16|b&65280|(b&16711680)>>>16;return"#"+("000000"+b.toString(16)).slice(-6)}catch(e){return"none"}})}else{var i=h.doc.createElement("i");i.title="Raphaël Colour Picker",i.style.display="none",h.doc.body.appendChild(i),bo=bv(function(a){i.style.color=a;return h.doc.defaultView.getComputedStyle(i,p).getPropertyValue("color")})}return bo(b)},bp=function(){return"hsb("+[this.h,this.s,this.b]+")"},bq=function(){return"hsl("+[this.h,this.s,this.l]+")"},br=function(){return this.hex},bs=function(b,c,d){c==null&&a.is(b,"object")&&"r"in b&&"g"in b&&"b"in b&&(d=b.b,c=b.g,b=b.r);if(c==null&&a.is(b,D)){var e=a.getRGB(b);b=e.r,c=e.g,d=e.b}if(b>1||c>1||d>1)b/=255,c/=255,d/=255;return[b,c,d]},bt=function(b,c,d,e){b*=255,c*=255,d*=255;var f={r:b,g:c,b:d,hex:a.rgb(b,c,d),toString:br};a.is(e,"finite")&&(f.opacity=e);return f};a.color=function(b){var c;a.is(b,"object")&&"h"in b&&"s"in b&&"b"in b?(c=a.hsb2rgb(b),b.r=c.r,b.g=c.g,b.b=c.b,b.hex=c.hex):a.is(b,"object")&&"h"in b&&"s"in b&&"l"in b?(c=a.hsl2rgb(b),b.r=c.r,b.g=c.g,b.b=c.b,b.hex=c.hex):(a.is(b,"string")&&(b=a.getRGB(b)),a.is(b,"object")&&"r"in b&&"g"in b&&"b"in b?(c=a.rgb2hsl(b),b.h=c.h,b.s=c.s,b.l=c.l,c=a.rgb2hsb(b),b.v=c.b):(b={hex:"none"},b.r=b.g=b.b=b.h=b.s=b.v=b.l=-1)),b.toString=br;return b},a.hsb2rgb=function(a,b,c,d){this.is(a,"object")&&"h"in a&&"s"in a&&"b"in a&&(c=a.b,b=a.s,a=a.h,d=a.o),a*=360;var e,f,g,h,i;a=a%360/60,i=c*b,h=i*(1-z(a%2-1)),e=f=g=c-i,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a];return bt(e,f,g,d)},a.hsl2rgb=function(a,b,c,d){this.is(a,"object")&&"h"in a&&"s"in a&&"l"in a&&(c=a.l,b=a.s,a=a.h);if(a>1||b>1||c>1)a/=360,b/=100,c/=100;a*=360;var e,f,g,h,i;a=a%360/60,i=2*b*(c<.5?c:1-c),h=i*(1-z(a%2-1)),e=f=g=c-i/2,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a];return bt(e,f,g,d)},a.rgb2hsb=function(a,b,c){c=bs(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g;f=x(a,b,c),g=f-y(a,b,c),d=g==0?null:f==a?(b-c)/g:f==b?(c-a)/g+2:(a-b)/g+4,d=(d+360)%6*60/360,e=g==0?0:g/f;return{h:d,s:e,b:f,toString:bp}},a.rgb2hsl=function(a,b,c){c=bs(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g,h,i;g=x(a,b,c),h=y(a,b,c),i=g-h,d=i==0?null:g==a?(b-c)/i:g==b?(c-a)/i+2:(a-b)/i+4,d=(d+360)%6*60/360,f=(g+h)/2,e=i==0?0:f<.5?i/(2*f):i/(2-2*f);return{h:d,s:e,l:f,toString:bq}},a._path2string=function(){return this.join(",").replace(Y,"$1")};var bw=a._preload=function(a,b){var c=h.doc.createElement("img");c.style.cssText="position:absolute;left:-9999em;top:-9999em",c.onload=function(){b.call(this),this.onload=null,h.doc.body.removeChild(this)},c.onerror=function(){h.doc.body.removeChild(this)},h.doc.body.appendChild(c),c.src=a};a.getRGB=bv(function(b){if(!b||!!((b=r(b)).indexOf("-")+1))return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bx};if(b=="none")return{r:-1,g:-1,b:-1,hex:"none",toString:bx};!X[g](b.toLowerCase().substring(0,2))&&b.charAt()!="#"&&(b=bo(b));var c,d,e,f,h,i,j,k=b.match(L);if(k){k[2]&&(f=R(k[2].substring(5),16),e=R(k[2].substring(3,5),16),d=R(k[2].substring(1,3),16)),k[3]&&(f=R((i=k[3].charAt(3))+i,16),e=R((i=k[3].charAt(2))+i,16),d=R((i=k[3].charAt(1))+i,16)),k[4]&&(j=k[4][s](W),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),k[1].toLowerCase().slice(0,4)=="rgba"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100));if(k[5]){j=k[5][s](W),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),(j[0].slice(-3)=="deg"||j[0].slice(-1)=="°")&&(d/=360),k[1].toLowerCase().slice(0,4)=="hsba"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100);return a.hsb2rgb(d,e,f,h)}if(k[6]){j=k[6][s](W),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),(j[0].slice(-3)=="deg"||j[0].slice(-1)=="°")&&(d/=360),k[1].toLowerCase().slice(0,4)=="hsla"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100);return a.hsl2rgb(d,e,f,h)}k={r:d,g:e,b:f,toString:bx},k.hex="#"+(16777216|f|e<<8|d<<16).toString(16).slice(1),a.is(h,"finite")&&(k.opacity=h);return k}return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bx}},a),a.hsb=bv(function(b,c,d){return a.hsb2rgb(b,c,d).hex}),a.hsl=bv(function(b,c,d){return a.hsl2rgb(b,c,d).hex}),a.rgb=bv(function(a,b,c){return"#"+(16777216|c|b<<8|a<<16).toString(16).slice(1)}),a.getColor=function(a){var b=this.getColor.start=this.getColor.start||{h:0,s:1,b:a||.75},c=this.hsb2rgb(b.h,b.s,b.b);b.h+=.075,b.h>1&&(b.h=0,b.s-=.2,b.s<=0&&(this.getColor.start={h:0,s:1,b:b.b}));return c.hex},a.getColor.reset=function(){delete this.start},a.parsePathString=function(b){if(!b)return null;var c=bz(b);if(c.arr)return bJ(c.arr);var d={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},e=[];a.is(b,E)&&a.is(b[0],E)&&(e=bJ(b)),e.length||r(b).replace(Z,function(a,b,c){var f=[],g=b.toLowerCase();c.replace(_,function(a,b){b&&f.push(+b)}),g=="m"&&f.length>2&&(e.push([b][n](f.splice(0,2))),g="l",b=b=="m"?"l":"L");if(g=="r")e.push([b][n](f));else while(f.length>=d[g]){e.push([b][n](f.splice(0,d[g])));if(!d[g])break}}),e.toString=a._path2string,c.arr=bJ(e);return e},a.parseTransformString=bv(function(b){if(!b)return null;var c={r:3,s:4,t:2,m:6},d=[];a.is(b,E)&&a.is(b[0],E)&&(d=bJ(b)),d.length||r(b).replace($,function(a,b,c){var e=[],f=v.call(b);c.replace(_,function(a,b){b&&e.push(+b)}),d.push([b][n](e))}),d.toString=a._path2string;return d});var bz=function(a){var b=bz.ps=bz.ps||{};b[a]?b[a].sleep=100:b[a]={sleep:100},setTimeout(function(){for(var c in b)b[g](c)&&c!=a&&(b[c].sleep--,!b[c].sleep&&delete b[c])});return b[a]};a.findDotsAtSegment=function(a,b,c,d,e,f,g,h,i){var j=1-i,k=A(j,3),l=A(j,2),m=i*i,n=m*i,o=k*a+l*3*i*c+j*3*i*i*e+n*g,p=k*b+l*3*i*d+j*3*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,x=j*e+i*g,y=j*f+i*h,z=90-w.atan2(q-s,r-t)*180/B;(q>s||r<t)&&(z+=180);return{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:x,y:y},alpha:z}},a.bezierBBox=function(b,c,d,e,f,g,h,i){a.is(b,"array")||(b=[b,c,d,e,f,g,h,i]);var j=bQ.apply(null,b);return{x:j.min.x,y:j.min.y,x2:j.max.x,y2:j.max.y,width:j.max.x-j.min.x,height:j.max.y-j.min.y}},a.isPointInsideBBox=function(a,b,c){return b>=a.x&&b<=a.x2&&c>=a.y&&c<=a.y2},a.isBBoxIntersect=function(b,c){var d=a.isPointInsideBBox;return d(c,b.x,b.y)||d(c,b.x2,b.y)||d(c,b.x,b.y2)||d(c,b.x2,b.y2)||d(b,c.x,c.y)||d(b,c.x2,c.y)||d(b,c.x,c.y2)||d(b,c.x2,c.y2)||(b.x<c.x2&&b.x>c.x||c.x<b.x2&&c.x>b.x)&&(b.y<c.y2&&b.y>c.y||c.y<b.y2&&c.y>b.y)},a.pathIntersection=function(a,b){return bH(a,b)},a.pathIntersectionNumber=function(a,b){return bH(a,b,1)},a.isPointInsidePath=function(b,c,d){var e=a.pathBBox(b);return a.isPointInsideBBox(e,c,d)&&bH(b,[["M",c,d],["H",e.x2+10]],1)%2==1},a._removedFactory=function(a){return function(){eve("raphael.log",null,"Raphaël: you are calling to method “"+a+"” of removed object",a)}};var bI=a.pathBBox=function(a){var b=bz(a);if(b.bbox)return b.bbox;if(!a)return{x:0,y:0,width:0,height:0,x2:0,y2:0};a=bR(a);var c=0,d=0,e=[],f=[],g;for(var h=0,i=a.length;h<i;h++){g=a[h];if(g[0]=="M")c=g[1],d=g[2],e.push(c),f.push(d);else{var j=bQ(c,d,g[1],g[2],g[3],g[4],g[5],g[6]);e=e[n](j.min.x,j.max.x),f=f[n](j.min.y,j.max.y),c=g[5],d=g[6]}}var k=y[m](0,e),l=y[m](0,f),o=x[m](0,e),p=x[m](0,f),q={x:k,y:l,x2:o,y2:p,width:o-k,height:p-l};b.bbox=bm(q);return q},bJ=function(b){var c=bm(b);c.toString=a._path2string;return c},bK=a._pathToRelative=function(b){var c=bz(b);if(c.rel)return bJ(c.rel);if(!a.is(b,E)||!a.is(b&&b[0],E))b=a.parsePathString(b);var d=[],e=0,f=0,g=0,h=0,i=0;b[0][0]=="M"&&(e=b[0][1],f=b[0][2],g=e,h=f,i++,d.push(["M",e,f]));for(var j=i,k=b.length;j<k;j++){var l=d[j]=[],m=b[j];if(m[0]!=v.call(m[0])){l[0]=v.call(m[0]);switch(l[0]){case"a":l[1]=m[1],l[2]=m[2],l[3]=m[3],l[4]=m[4],l[5]=m[5],l[6]=+(m[6]-e).toFixed(3),l[7]=+(m[7]-f).toFixed(3);break;case"v":l[1]=+(m[1]-f).toFixed(3);break;case"m":g=m[1],h=m[2];default:for(var n=1,o=m.length;n<o;n++)l[n]=+(m[n]-(n%2?e:f)).toFixed(3)}}else{l=d[j]=[],m[0]=="m"&&(g=m[1]+e,h=m[2]+f);for(var p=0,q=m.length;p<q;p++)d[j][p]=m[p]}var r=d[j].length;switch(d[j][0]){case"z":e=g,f=h;break;case"h":e+=+d[j][r-1];break;case"v":f+=+d[j][r-1];break;default:e+=+d[j][r-2],f+=+d[j][r-1]}}d.toString=a._path2string,c.rel=bJ(d);return d},bL=a._pathToAbsolute=function(b){var c=bz(b);if(c.abs)return bJ(c.abs);if(!a.is(b,E)||!a.is(b&&b[0],E))b=a.parsePathString(b);if(!b||!b.length)return[["M",0,0]];var d=[],e=0,f=0,g=0,h=0,i=0;b[0][0]=="M"&&(e=+b[0][1],f=+b[0][2],g=e,h=f,i++,d[0]=["M",e,f]);var j=b.length==3&&b[0][0]=="M"&&b[1][0].toUpperCase()=="R"&&b[2][0].toUpperCase()=="Z";for(var k,l,m=i,o=b.length;m<o;m++){d.push(k=[]),l=b[m];if(l[0]!=S.call(l[0])){k[0]=S.call(l[0]);switch(k[0]){case"A":k[1]=l[1],k[2]=l[2],k[3]=l[3],k[4]=l[4],k[5]=l[5],k[6]=+(l[6]+e),k[7]=+(l[7]+f);break;case"V":k[1]=+l[1]+f;break;case"H":k[1]=+l[1]+e;break;case"R":var p=[e,f][n](l.slice(1));for(var q=2,r=p.length;q<r;q++)p[q]=+p[q]+e,p[++q]=+p[q]+f;d.pop(),d=d[n](by(p,j));break;case"M":g=+l[1]+e,h=+l[2]+f;default:for(q=1,r=l.length;q<r;q++)k[q]=+l[q]+(q%2?e:f)}}else if(l[0]=="R")p=[e,f][n](l.slice(1)),d.pop(),d=d[n](by(p,j)),k=["R"][n](l.slice(-2));else for(var s=0,t=l.length;s<t;s++)k[s]=l[s];switch(k[0]){case"Z":e=g,f=h;break;case"H":e=k[1];break;case"V":f=k[1];break;case"M":g=k[k.length-2],h=k[k.length-1];default:e=k[k.length-2],f=k[k.length-1]}}d.toString=a._path2string,c.abs=bJ(d);return d},bM=function(a,b,c,d){return[a,b,c,d,c,d]},bN=function(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]},bO=function(a,b,c,d,e,f,g,h,i,j){var k=B*120/180,l=B/180*(+e||0),m=[],o,p=bv(function(a,b,c){var d=a*w.cos(c)-b*w.sin(c),e=a*w.sin(c)+b*w.cos(c);return{x:d,y:e}});if(!j){o=p(a,b,-l),a=o.x,b=o.y,o=p(h,i,-l),h=o.x,i=o.y;var q=w.cos(B/180*e),r=w.sin(B/180*e),t=(a-h)/2,u=(b-i)/2,v=t*t/(c*c)+u*u/(d*d);v>1&&(v=w.sqrt(v),c=v*c,d=v*d);var x=c*c,y=d*d,A=(f==g?-1:1)*w.sqrt(z((x*y-x*u*u-y*t*t)/(x*u*u+y*t*t))),C=A*c*u/d+(a+h)/2,D=A*-d*t/c+(b+i)/2,E=w.asin(((b-D)/d).toFixed(9)),F=w.asin(((i-D)/d).toFixed(9));E=a<C?B-E:E,F=h<C?B-F:F,E<0&&(E=B*2+E),F<0&&(F=B*2+F),g&&E>F&&(E=E-B*2),!g&&F>E&&(F=F-B*2)}else E=j[0],F=j[1],C=j[2],D=j[3];var G=F-E;if(z(G)>k){var H=F,I=h,J=i;F=E+k*(g&&F>E?1:-1),h=C+c*w.cos(F),i=D+d*w.sin(F),m=bO(h,i,c,d,e,0,g,I,J,[F,H,C,D])}G=F-E;var K=w.cos(E),L=w.sin(E),M=w.cos(F),N=w.sin(F),O=w.tan(G/4),P=4/3*c*O,Q=4/3*d*O,R=[a,b],S=[a+P*L,b-Q*K],T=[h+P*N,i-Q*M],U=[h,i];S[0]=2*R[0]-S[0],S[1]=2*R[1]-S[1];if(j)return[S,T,U][n](m);m=[S,T,U][n](m).join()[s](",");var V=[];for(var W=0,X=m.length;W<X;W++)V[W]=W%2?p(m[W-1],m[W],l).y:p(m[W],m[W+1],l).x;return V},bP=function(a,b,c,d,e,f,g,h,i){var j=1-i;return{x:A(j,3)*a+A(j,2)*3*i*c+j*3*i*i*e+A(i,3)*g,y:A(j,3)*b+A(j,2)*3*i*d+j*3*i*i*f+A(i,3)*h}},bQ=bv(function(a,b,c,d,e,f,g,h){var i=e-2*c+a-(g-2*e+c),j=2*(c-a)-2*(e-c),k=a-c,l=(-j+w.sqrt(j*j-4*i*k))/2/i,n=(-j-w.sqrt(j*j-4*i*k))/2/i,o=[b,h],p=[a,g],q;z(l)>"1e12"&&(l=.5),z(n)>"1e12"&&(n=.5),l>0&&l<1&&(q=bP(a,b,c,d,e,f,g,h,l),p.push(q.x),o.push(q.y)),n>0&&n<1&&(q=bP(a,b,c,d,e,f,g,h,n),p.push(q.x),o.push(q.y)),i=f-2*d+b-(h-2*f+d),j=2*(d-b)-2*(f-d),k=b-d,l=(-j+w.sqrt(j*j-4*i*k))/2/i,n=(-j-w.sqrt(j*j-4*i*k))/2/i,z(l)>"1e12"&&(l=.5),z(n)>"1e12"&&(n=.5),l>0&&l<1&&(q=bP(a,b,c,d,e,f,g,h,l),p.push(q.x),o.push(q.y)),n>0&&n<1&&(q=bP(a,b,c,d,e,f,g,h,n),p.push(q.x),o.push(q.y));return{min:{x:y[m](0,p),y:y[m](0,o)},max:{x:x[m](0,p),y:x[m](0,o)}}}),bR=a._path2curve=bv(function(a,b){var c=!b&&bz(a);if(!b&&c.curve)return bJ(c.curve);var d=bL(a),e=b&&bL(b),f={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},g={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},h=function(a,b){var c,d;if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];!(a[0]in{T:1,Q:1})&&(b.qx=b.qy=null);switch(a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"][n](bO[m](0,[b.x,b.y][n](a.slice(1))));break;case"S":c=b.x+(b.x-(b.bx||b.x)),d=b.y+(b.y-(b.by||b.y)),a=["C",c,d][n](a.slice(1));break;case"T":b.qx=b.x+(b.x-(b.qx||b.x)),b.qy=b.y+(b.y-(b.qy||b.y)),a=["C"][n](bN(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"][n](bN(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"][n](bM(b.x,b.y,a[1],a[2]));break;case"H":a=["C"][n](bM(b.x,b.y,a[1],b.y));break;case"V":a=["C"][n](bM(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"][n](bM(b.x,b.y,b.X,b.Y))}return a},i=function(a,b){if(a[b].length>7){a[b].shift();var c=a[b];while(c.length)a.splice(b++,0,["C"][n](c.splice(0,6)));a.splice(b,1),l=x(d.length,e&&e.length||0)}},j=function(a,b,c,f,g){a&&b&&a[g][0]=="M"&&b[g][0]!="M"&&(b.splice(g,0,["M",f.x,f.y]),c.bx=0,c.by=0,c.x=a[g][1],c.y=a[g][2],l=x(d.length,e&&e.length||0))};for(var k=0,l=x(d.length,e&&e.length||0);k<l;k++){d[k]=h(d[k],f),i(d,k),e&&(e[k]=h(e[k],g)),e&&i(e,k),j(d,e,f,g,k),j(e,d,g,f,k);var o=d[k],p=e&&e[k],q=o.length,r=e&&p.length;f.x=o[q-2],f.y=o[q-1],f.bx=Q(o[q-4])||f.x,f.by=Q(o[q-3])||f.y,g.bx=e&&(Q(p[r-4])||g.x),g.by=e&&(Q(p[r-3])||g.y),g.x=e&&p[r-2],g.y=e&&p[r-1]}e||(c.curve=bJ(d));return e?[d,e]:d},null,bJ),bS=a._parseDots=bv(function(b){var c=[];for(var d=0,e=b.length;d<e;d++){var f={},g=b[d].match(/^([^:]*):?([\d\.]*)/);f.color=a.getRGB(g[1]);if(f.color.error)return null;f.color=f.color.hex,g[2]&&(f.offset=g[2]+"%"),c.push(f)}for(d=1,e=c.length-1;d<e;d++)if(!c[d].offset){var h=Q(c[d-1].offset||0),i=0;for(var j=d+1;j<e;j++)if(c[j].offset){i=c[j].offset;break}i||(i=100,j=e),i=Q(i);var k=(i-h)/(j-d+1);for(;d<j;d++)h+=k,c[d].offset=h+"%"}return c}),bT=a._tear=function(a,b){a==b.top&&(b.top=a.prev),a==b.bottom&&(b.bottom=a.next),a.next&&(a.next.prev=a.prev),a.prev&&(a.prev.next=a.next)},bU=a._tofront=function(a,b){b.top!==a&&(bT(a,b),a.next=null,a.prev=b.top,b.top.next=a,b.top=a)},bV=a._toback=function(a,b){b.bottom!==a&&(bT(a,b),a.next=b.bottom,a.prev=null,b.bottom.prev=a,b.bottom=a)},bW=a._insertafter=function(a,b,c){bT(a,c),b==c.top&&(c.top=a),b.next&&(b.next.prev=a),a.next=b.next,a.prev=b,b.next=a},bX=a._insertbefore=function(a,b,c){bT(a,c),b==c.bottom&&(c.bottom=a),b.prev&&(b.prev.next=a),a.prev=b.prev,b.prev=a,a.next=b},bY=a.toMatrix=function(a,b){var c=bI(a),d={_:{transform:p},getBBox:function(){return c}};b$(d,b);return d.matrix},bZ=a.transformPath=function(a,b){return bj(a,bY(a,b))},b$=a._extractTransform=function(b,c){if(c==null)return b._.transform;c=r(c).replace(/\.{3}|\u2026/g,b._.transform||p);var d=a.parseTransformString(c),e=0,f=0,g=0,h=1,i=1,j=b._,k=new cb;j.transform=d||[];if(d)for(var l=0,m=d.length;l<m;l++){var n=d[l],o=n.length,q=r(n[0]).toLowerCase(),s=n[0]!=q,t=s?k.invert():0,u,v,w,x,y;q=="t"&&o==3?s?(u=t.x(0,0),v=t.y(0,0),w=t.x(n[1],n[2]),x=t.y(n[1],n[2]),k.translate(w-u,x-v)):k.translate(n[1],n[2]):q=="r"?o==2?(y=y||b.getBBox(1),k.rotate(n[1],y.x+y.width/2,y.y+y.height/2),e+=n[1]):o==4&&(s?(w=t.x(n[2],n[3]),x=t.y(n[2],n[3]),k.rotate(n[1],w,x)):k.rotate(n[1],n[2],n[3]),e+=n[1]):q=="s"?o==2||o==3?(y=y||b.getBBox(1),k.scale(n[1],n[o-1],y.x+y.width/2,y.y+y.height/2),h*=n[1],i*=n[o-1]):o==5&&(s?(w=t.x(n[3],n[4]),x=t.y(n[3],n[4]),k.scale(n[1],n[2],w,x)):k.scale(n[1],n[2],n[3],n[4]),h*=n[1],i*=n[2]):q=="m"&&o==7&&k.add(n[1],n[2],n[3],n[4],n[5],n[6]),j.dirtyT=1,b.matrix=k}b.matrix=k,j.sx=h,j.sy=i,j.deg=e,j.dx=f=k.e,j.dy=g=k.f,h==1&&i==1&&!e&&j.bbox?(j.bbox.x+=+f,j.bbox.y+=+g):j.dirtyT=1},b_=function(a){var b=a[0];switch(b.toLowerCase()){case"t":return[b,0,0];case"m":return[b,1,0,0,1,0,0];case"r":return a.length==4?[b,0,a[2],a[3]]:[b,0];case"s":return a.length==5?[b,1,1,a[3],a[4]]:a.length==3?[b,1,1]:[b,1]}},ca=a._equaliseTransform=function(b,c){c=r(c).replace(/\.{3}|\u2026/g,b),b=a.parseTransformString(b)||[],c=a.parseTransformString(c)||[];var d=x(b.length,c.length),e=[],f=[],g=0,h,i,j,k;for(;g<d;g++){j=b[g]||b_(c[g]),k=c[g]||b_(j);if(j[0]!=k[0]||j[0].toLowerCase()=="r"&&(j[2]!=k[2]||j[3]!=k[3])||j[0].toLowerCase()=="s"&&(j[3]!=k[3]||j[4]!=k[4]))return;e[g]=[],f[g]=[];for(h=0,i=x(j.length,k.length);h<i;h++)h in j&&(e[g][h]=j[h]),h in k&&(f[g][h]=k[h])}return{from:e,to:f}};a._getContainer=function(b,c,d,e){var f;f=e==null&&!a.is(b,"object")?h.doc.getElementById(b):b;if(f!=null){if(f.tagName)return c==null?{container:f,width:f.style.pixelWidth||f.offsetWidth,height:f.style.pixelHeight||f.offsetHeight}:{container:f,width:c,height:d};return{container:1,x:b,y:c,width:d,height:e}}},a.pathToRelative=bK,a._engine={},a.path2curve=bR,a.matrix=function(a,b,c,d,e,f){return new cb(a,b,c,d,e,f)},function(b){function d(a){var b=w.sqrt(c(a));a[0]&&(a[0]/=b),a[1]&&(a[1]/=b)}function c(a){return a[0]*a[0]+a[1]*a[1]}b.add=function(a,b,c,d,e,f){var g=[[],[],[]],h=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],i=[[a,c,e],[b,d,f],[0,0,1]],j,k,l,m;a&&a instanceof cb&&(i=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]);for(j=0;j<3;j++)for(k=0;k<3;k++){m=0;for(l=0;l<3;l++)m+=h[j][l]*i[l][k];g[j][k]=m}this.a=g[0][0],this.b=g[1][0],this.c=g[0][1],this.d=g[1][1],this.e=g[0][2],this.f=g[1][2]},b.invert=function(){var a=this,b=a.a*a.d-a.b*a.c;return new cb(a.d/b,-a.b/b,-a.c/b,a.a/b,(a.c*a.f-a.d*a.e)/b,(a.b*a.e-a.a*a.f)/b)},b.clone=function(){return new cb(this.a,this.b,this.c,this.d,this.e,this.f)},b.translate=function(a,b){this.add(1,0,0,1,a,b)},b.scale=function(a,b,c,d){b==null&&(b=a),(c||d)&&this.add(1,0,0,1,c,d),this.add(a,0,0,b,0,0),(c||d)&&this.add(1,0,0,1,-c,-d)},b.rotate=function(b,c,d){b=a.rad(b),c=c||0,d=d||0;var e=+w.cos(b).toFixed(9),f=+w.sin(b).toFixed(9);this.add(e,f,-f,e,c,d),this.add(1,0,0,1,-c,-d)},b.x=function(a,b){return a*this.a+b*this.c+this.e},b.y=function(a,b){return a*this.b+b*this.d+this.f},b.get=function(a){return+this[r.fromCharCode(97+a)].toFixed(4)},b.toString=function(){return a.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},b.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},b.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},b.split=function(){var b={};b.dx=this.e,b.dy=this.f;var e=[[this.a,this.c],[this.b,this.d]];b.scalex=w.sqrt(c(e[0])),d(e[0]),b.shear=e[0][0]*e[1][0]+e[0][1]*e[1][1],e[1]=[e[1][0]-e[0][0]*b.shear,e[1][1]-e[0][1]*b.shear],b.scaley=w.sqrt(c(e[1])),d(e[1]),b.shear/=b.scaley;var f=-e[0][1],g=e[1][1];g<0?(b.rotate=a.deg(w.acos(g)),f<0&&(b.rotate=360-b.rotate)):b.rotate=a.deg(w.asin(f)),b.isSimple=!+b.shear.toFixed(9)&&(b.scalex.toFixed(9)==b.scaley.toFixed(9)||!b.rotate),b.isSuperSimple=!+b.shear.toFixed(9)&&b.scalex.toFixed(9)==b.scaley.toFixed(9)&&!b.rotate,b.noRotation=!+b.shear.toFixed(9)&&!b.rotate;return b},b.toTransformString=function(a){var b=a||this[s]();if(b.isSimple){b.scalex=+b.scalex.toFixed(4),b.scaley=+b.scaley.toFixed(4),b.rotate=+b.rotate.toFixed(4);return(b.dx||b.dy?"t"+[b.dx,b.dy]:p)+(b.scalex!=1||b.scaley!=1?"s"+[b.scalex,b.scaley,0,0]:p)+(b.rotate?"r"+[b.rotate,0,0]:p)}return"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(cb.prototype);var cc=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);navigator.vendor=="Apple Computer, Inc."&&(cc&&cc[1]<4||navigator.platform.slice(0,2)=="iP")||navigator.vendor=="Google Inc."&&cc&&cc[1]<8?k.safari=function(){var a=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});setTimeout(function(){a.remove()})}:k.safari=be;var cd=function(){this.returnValue=!1},ce=function(){return this.originalEvent.preventDefault()},cf=function(){this.cancelBubble=!0},cg=function(){return this.originalEvent.stopPropagation()},ch=function(){if(h.doc.addEventListener)return function(a,b,c,d){var e=o&&u[b]?u[b]:b,f=function(e){var f=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,i=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,j=e.clientX+i,k=e.clientY+f;if(o&&u[g](b))for(var l=0,m=e.targetTouches&&e.targetTouches.length;l<m;l++)if(e.targetTouches[l].target==a){var n=e;e=e.targetTouches[l],e.originalEvent=n,e.preventDefault=ce,e.stopPropagation=cg;break}return c.call(d,e,j,k)};a.addEventListener(e,f,!1);return function(){a.removeEventListener(e,f,!1);return!0}};if(h.doc.attachEvent)return function(a,b,c,d){var e=function(a){a=a||h.win.event;var b=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,e=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,f=a.clientX+e,g=a.clientY+b;a.preventDefault=a.preventDefault||cd,a.stopPropagation=a.stopPropagation||cf;return c.call(d,a,f,g)};a.attachEvent("on"+b,e);var f=function(){a.detachEvent("on"+b,e);return!0};return f}}(),ci=[],cj=function(a){var b=a.clientX,c=a.clientY,d=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,e=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,f,g=ci.length;while(g--){f=ci[g];if(o){var i=a.touches.length,j;while(i--){j=a.touches[i];if(j.identifier==f.el._drag.id){b=j.clientX,c=j.clientY,(a.originalEvent?a.originalEvent:a).preventDefault();break}}}else a.preventDefault();var k=f.el.node,l,m=k.nextSibling,n=k.parentNode,p=k.style.display;h.win.opera&&n.removeChild(k),k.style.display="none",l=f.el.paper.getElementByPoint(b,c),k.style.display=p,h.win.opera&&(m?n.insertBefore(k,m):n.appendChild(k)),l&&eve("raphael.drag.over."+f.el.id,f.el,l),b+=e,c+=d,eve("raphael.drag.move."+f.el.id,f.move_scope||f.el,b-f.el._drag.x,c-f.el._drag.y,b,c,a)}},ck=function(b){a.unmousemove(cj).unmouseup(ck);var c=ci.length,d;while(c--)d=ci[c],d.el._drag={},eve("raphael.drag.end."+d.el.id,d.end_scope||d.start_scope||d.move_scope||d.el,b);ci=[]},cl=a.el={};for(var cm=t.length;cm--;)(function(b){a[b]=cl[b]=function(c,d){a.is(c,"function")&&(this.events=this.events||[],this.events.push({name:b,f:c,unbind:ch(this.shape||this.node||h.doc,b,c,d||this)}));return this},a["un"+b]=cl["un"+b]=function(a){var c=this.events||[],d=c.length;while(d--)if(c[d].name==b&&c[d].f==a){c[d].unbind(),c.splice(d,1),!c.length&&delete this.events;return this}return this}})(t[cm]);cl.data=function(b,c){var d=bb[this.id]=bb[this.id]||{};if(arguments.length==1){if(a.is(b,"object")){for(var e in b)b[g](e)&&this.data(e,b[e]);return this}eve("raphael.data.get."+this.id,this,d[b],b);return d[b]}d[b]=c,eve("raphael.data.set."+this.id,this,c,b);return this},cl.removeData=function(a){a==null?bb[this.id]={}:bb[this.id]&&delete bb[this.id][a];return this},cl.hover=function(a,b,c,d){return this.mouseover(a,c).mouseout(b,d||c)},cl.unhover=function(a,b){return this.unmouseover(a).unmouseout(b)};var cn=[];cl.drag=function(b,c,d,e,f,g){function i(i){(i.originalEvent||i).preventDefault();var j=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,k=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft;this._drag.x=i.clientX+k,this._drag.y=i.clientY+j,this._drag.id=i.identifier,!ci.length&&a.mousemove(cj).mouseup(ck),ci.push({el:this,move_scope:e,start_scope:f,end_scope:g}),c&&eve.on("raphael.drag.start."+this.id,c),b&&eve.on("raphael.drag.move."+this.id,b),d&&eve.on("raphael.drag.end."+this.id,d),eve("raphael.drag.start."+this.id,f||e||this,i.clientX+k,i.clientY+j,i)}this._drag={},cn.push({el:this,start:i}),this.mousedown(i);return this},cl.onDragOver=function(a){a?eve.on("raphael.drag.over."+this.id,a):eve.unbind("raphael.drag.over."+this.id)},cl.undrag=function(){var b=cn.length;while(b--)cn[b].el==this&&(this.unmousedown(cn[b].start),cn.splice(b,1),eve.unbind("raphael.drag.*."+this.id));!cn.length&&a.unmousemove(cj).unmouseup(ck)},k.circle=function(b,c,d){var e=a._engine.circle(this,b||0,c||0,d||0);this.__set__&&this.__set__.push(e);return e},k.rect=function(b,c,d,e,f){var g=a._engine.rect(this,b||0,c||0,d||0,e||0,f||0);this.__set__&&this.__set__.push(g);return g},k.ellipse=function(b,c,d,e){var f=a._engine.ellipse(this,b||0,c||0,d||0,e||0);this.__set__&&this.__set__.push(f);return f},k.path=function(b){b&&!a.is(b,D)&&!a.is(b[0],E)&&(b+=p);var c=a._engine.path(a.format[m](a,arguments),this);this.__set__&&this.__set__.push(c);return c},k.image=function(b,c,d,e,f){var g=a._engine.image(this,b||"about:blank",c||0,d||0,e||0,f||0);this.__set__&&this.__set__.push(g);return g},k.text=function(b,c,d){var e=a._engine.text(this,b||0,c||0,r(d));this.__set__&&this.__set__.push(e);return e},k.set=function(b){!a.is(b,"array")&&(b=Array.prototype.splice.call(arguments,0,arguments.length));var c=new cG(b);this.__set__&&this.__set__.push(c);return c},k.setStart=function(a){this.__set__=a||this.set()},k.setFinish=function(a){var b=this.__set__;delete this.__set__;return b},k.setSize=function(b,c){return a._engine.setSize.call(this,b,c)},k.setViewBox=function(b,c,d,e,f){return a._engine.setViewBox.call(this,b,c,d,e,f)},k.top=k.bottom=null,k.raphael=a;var co=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.body,e=c.documentElement,f=e.clientTop||d.clientTop||0,g=e.clientLeft||d.clientLeft||0,i=b.top+(h.win.pageYOffset||e.scrollTop||d.scrollTop)-f,j=b.left+(h.win.pageXOffset||e.scrollLeft||d.scrollLeft)-g;return{y:i,x:j}};k.getElementByPoint=function(a,b){var c=this,d=c.canvas,e=h.doc.elementFromPoint(a,b);if(h.win.opera&&e.tagName=="svg"){var f=co(d),g=d.createSVGRect();g.x=a-f.x,g.y=b-f.y,g.width=g.height=1;var i=d.getIntersectionList(g,null);i.length&&(e=i[i.length-1])}if(!e)return null;while(e.parentNode&&e!=d.parentNode&&!e.raphael)e=e.parentNode;e==c.canvas.parentNode&&(e=d),e=e&&e.raphael?c.getById(e.raphaelid):null;return e},k.getById=function(a){var b=this.bottom;while(b){if(b.id==a)return b;b=b.next}return null},k.forEach=function(a,b){var c=this.bottom;while(c){if(a.call(b,c)===!1)return this;c=c.next}return this},k.getElementsByPoint=function(a,b){var c=this.set();this.forEach(function(d){d.isPointInside(a,b)&&c.push(d)});return c},cl.isPointInside=function(b,c){var d=this.realPath=this.realPath||bi[this.type](this);return a.isPointInsidePath(d,b,c)},cl.getBBox=function(a){if(this.removed)return{};var b=this._;if(a){if(b.dirty||!b.bboxwt)this.realPath=bi[this.type](this),b.bboxwt=bI(this.realPath),b.bboxwt.toString=cq,b.dirty=0;return b.bboxwt}if(b.dirty||b.dirtyT||!b.bbox){if(b.dirty||!this.realPath)b.bboxwt=0,this.realPath=bi[this.type](this);b.bbox=bI(bj(this.realPath,this.matrix)),b.bbox.toString=cq,b.dirty=b.dirtyT=0}return b.bbox},cl.clone=function(){if(this.removed)return null;var a=this.paper[this.type]().attr(this.attr());this.__set__&&this.__set__.push(a);return a},cl.glow=function(a){if(this.type=="text")return null;a=a||{};var b={width:(a.width||10)+(+this.attr("stroke-width")||1),fill:a.fill||!1,opacity:a.opacity||.5,offsetx:a.offsetx||0,offsety:a.offsety||0,color:a.color||"#000"},c=b.width/2,d=this.paper,e=d.set(),f=this.realPath||bi[this.type](this);f=this.matrix?bj(f,this.matrix):f;for(var g=1;g<c+1;g++)e.push(d.path(f).attr({stroke:b.color,fill:b.fill?b.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(b.width/c*g).toFixed(3),opacity:+(b.opacity/c).toFixed(3)}));return e.insertBefore(this).translate(b.offsetx,b.offsety)};var cr={},cs=function(b,c,d,e,f,g,h,i,j){return j==null?bB(b,c,d,e,f,g,h,i):a.findDotsAtSegment(b,c,d,e,f,g,h,i,bC(b,c,d,e,f,g,h,i,j))},ct=function(b,c){return function(d,e,f){d=bR(d);var g,h,i,j,k="",l={},m,n=0;for(var o=0,p=d.length;o<p;o++){i=d[o];if(i[0]=="M")g=+i[1],h=+i[2];else{j=cs(g,h,i[1],i[2],i[3],i[4],i[5],i[6]);if(n+j>e){if(c&&!l.start){m=cs(g,h,i[1],i[2],i[3],i[4],i[5],i[6],e-n),k+=["C"+m.start.x,m.start.y,m.m.x,m.m.y,m.x,m.y];if(f)return k;l.start=k,k=["M"+m.x,m.y+"C"+m.n.x,m.n.y,m.end.x,m.end.y,i[5],i[6]].join(),n+=j,g=+i[5],h=+i[6];continue}if(!b&&!c){m=cs(g,h,i[1],i[2],i[3],i[4],i[5],i[6],e-n);return{x:m.x,y:m.y,alpha:m.alpha}}}n+=j,g=+i[5],h=+i[6]}k+=i.shift()+i}l.end=k,m=b?n:c?l:a.findDotsAtSegment(g,h,i[0],i[1],i[2],i[3],i[4],i[5],1),m.alpha&&(m={x:m.x,y:m.y,alpha:m.alpha});return m}},cu=ct(1),cv=ct(),cw=ct(0,1);a.getTotalLength=cu,a.getPointAtLength=cv,a.getSubpath=function(a,b,c){if(this.getTotalLength(a)-c<1e-6)return cw(a,b).end;var d=cw(a,c,1);return b?cw(d,b).end:d},cl.getTotalLength=function(){if(this.type=="path"){if(this.node.getTotalLength)return this.node.getTotalLength();return cu(this.attrs.path)}},cl.getPointAtLength=function(a){if(this.type=="path")return cv(this.attrs.path,a)},cl.getSubpath=function(b,c){if(this.type=="path")return a.getSubpath(this.attrs.path,b,c)};var cx=a.easing_formulas={linear:function(a){return a},"<":function(a){return A(a,1.7)},">":function(a){return A(a,.48)},"<>":function(a){var b=.48-a/1.04,c=w.sqrt(.1734+b*b),d=c-b,e=A(z(d),1/3)*(d<0?-1:1),f=-c-b,g=A(z(f),1/3)*(f<0?-1:1),h=e+g+.5;return(1-h)*3*h*h+h*h*h},backIn:function(a){var b=1.70158;return a*a*((b+1)*a-b)},backOut:function(a){a=a-1;var b=1.70158;return a*a*((b+1)*a+b)+1},elastic:function(a){if(a==!!a)return a;return A(2,-10*a)*w.sin((a-.075)*2*B/.3)+1},bounce:function(a){var b=7.5625,c=2.75,d;a<1/c?d=b*a*a:a<2/c?(a-=1.5/c,d=b*a*a+.75):a<2.5/c?(a-=2.25/c,d=b*a*a+.9375):(a-=2.625/c,d=b*a*a+.984375);return d}};cx.easeIn=cx["ease-in"]=cx["<"],cx.easeOut=cx["ease-out"]=cx[">"],cx.easeInOut=cx["ease-in-out"]=cx["<>"],cx["back-in"]=cx.backIn,cx["back-out"]=cx.backOut;var cy=[],cz=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,16)},cA=function(){var b=+(new Date),c=0;for(;c<cy.length;c++){var d=cy[c];if(d.el.removed||d.paused)continue;var e=b-d.start,f=d.ms,h=d.easing,i=d.from,j=d.diff,k=d.to,l=d.t,m=d.el,o={},p,r={},s;d.initstatus?(e=(d.initstatus*d.anim.top-d.prev)/(d.percent-d.prev)*f,d.status=d.initstatus,delete d.initstatus,d.stop&&cy.splice(c--,1)):d.status=(d.prev+(d.percent-d.prev)*(e/f))/d.anim.top;if(e<0)continue;if(e<f){var t=h(e/f);for(var u in i)if(i[g](u)){switch(U[u]){case C:p=+i[u]+t*f*j[u];break;case"colour":p="rgb("+[cB(O(i[u].r+t*f*j[u].r)),cB(O(i[u].g+t*f*j[u].g)),cB(O(i[u].b+t*f*j[u].b))].join(",")+")";break;case"path":p=[];for(var v=0,w=i[u].length;v<w;v++){p[v]=[i[u][v][0]];for(var x=1,y=i[u][v].length;x<y;x++)p[v][x]=+i[u][v][x]+t*f*j[u][v][x];p[v]=p[v].join(q)}p=p.join(q);break;case"transform":if(j[u].real){p=[];for(v=0,w=i[u].length;v<w;v++){p[v]=[i[u][v][0]];for(x=1,y=i[u][v].length;x<y;x++)p[v][x]=i[u][v][x]+t*f*j[u][v][x]}}else{var z=function(a){return+i[u][a]+t*f*j[u][a]};p=[["m",z(0),z(1),z(2),z(3),z(4),z(5)]]}break;case"csv":if(u=="clip-rect"){p=[],v=4;while(v--)p[v]=+i[u][v]+t*f*j[u][v]}break;default:var A=[][n](i[u]);p=[],v=m.paper.customAttributes[u].length;while(v--)p[v]=+A[v]+t*f*j[u][v]}o[u]=p}m.attr(o),function(a,b,c){setTimeout(function(){eve("raphael.anim.frame."+a,b,c)})}(m.id,m,d.anim)}else{(function(b,c,d){setTimeout(function(){eve("raphael.anim.frame."+c.id,c,d),eve("raphael.anim.finish."+c.id,c,d),a.is(b,"function")&&b.call(c)})})(d.callback,m,d.anim),m.attr(k),cy.splice(c--,1);if(d.repeat>1&&!d.next){for(s in k)k[g](s)&&(r[s]=d.totalOrigin[s]);d.el.attr(r),cE(d.anim,d.el,d.anim.percents[0],null,d.totalOrigin,d.repeat-1)}d.next&&!d.stop&&cE(d.anim,d.el,d.next,null,d.totalOrigin,d.repeat)}}a.svg&&m&&m.paper&&m.paper.safari(),cy.length&&cz(cA)},cB=function(a){return a>255?255:a<0?0:a};cl.animateWith=function(b,c,d,e,f,g){var h=this;if(h.removed){g&&g.call(h);return h}var i=d instanceof cD?d:a.animation(d,e,f,g),j,k;cE(i,h,i.percents[0],null,h.attr());for(var l=0,m=cy.length;l<m;l++)if(cy[l].anim==c&&cy[l].el==b){cy[m-1].start=cy[l].start;break}return h},cl.onAnimation=function(a){a?eve.on("raphael.anim.frame."+this.id,a):eve.unbind("raphael.anim.frame."+this.id);return this},cD.prototype.delay=function(a){var b=new cD(this.anim,this.ms);b.times=this.times,b.del=+a||0;return b},cD.prototype.repeat=function(a){var b=new cD(this.anim,this.ms);b.del=this.del,b.times=w.floor(x(a,0))||1;return b},a.animation=function(b,c,d,e){if(b instanceof cD)return b;if(a.is(d,"function")||!d)e=e||d||null,d=null;b=Object(b),c=+c||0;var f={},h,i;for(i in b)b[g](i)&&Q(i)!=i&&Q(i)+"%"!=i&&(h=!0,f[i]=b[i]);if(!h)return new cD(b,c);d&&(f.easing=d),e&&(f.callback=e);return new cD({100:f},c)},cl.animate=function(b,c,d,e){var f=this;if(f.removed){e&&e.call(f);return f}var g=b instanceof cD?b:a.animation(b,c,d,e);cE(g,f,g.percents[0],null,f.attr());return f},cl.setTime=function(a,b){a&&b!=null&&this.status(a,y(b,a.ms)/a.ms);return this},cl.status=function(a,b){var c=[],d=0,e,f;if(b!=null){cE(a,this,-1,y(b,1));return this}e=cy.length;for(;d<e;d++){f=cy[d];if(f.el.id==this.id&&(!a||f.anim==a)){if(a)return f.status;c.push({anim:f.anim,status:f.status})}}if(a)return 0;return c},cl.pause=function(a){for(var b=0;b<cy.length;b++)cy[b].el.id==this.id&&(!a||cy[b].anim==a)&&eve("raphael.anim.pause."+this.id,this,cy[b].anim)!==!1&&(cy[b].paused=!0);return this},cl.resume=function(a){for(var b=0;b<cy.length;b++)if(cy[b].el.id==this.id&&(!a||cy[b].anim==a)){var c=cy[b];eve("raphael.anim.resume."+this.id,this,c.anim)!==!1&&(delete c.paused,this.status(c.anim,c.status))}return this},cl.stop=function(a){for(var b=0;b<cy.length;b++)cy[b].el.id==this.id&&(!a||cy[b].anim==a)&&eve("raphael.anim.stop."+this.id,this,cy[b].anim)!==!1&&cy.splice(b--,1);return this},eve.on("raphael.remove",cF),eve.on("raphael.clear",cF),cl.toString=function(){return"Raphaël’s object"};var cG=function(a){this.items=[],this.length=0,this.type="set";if(a)for(var b=0,c=a.length;b<c;b++)a[b]&&(a[b].constructor==cl.constructor||a[b].constructor==cG)&&(this[this.items.length]=this.items[this.items.length]=a[b],this.length++)},cH=cG.prototype;cH.push=function(){var a,b;for(var c=0,d=arguments.length;c<d;c++)a=arguments[c],a&&(a.constructor==cl.constructor||a.constructor==cG)&&(b=this.items.length,this[b]=this.items[b]=a,this.length++);return this},cH.pop=function(){this.length&&delete this[this.length--];return this.items.pop()},cH.forEach=function(a,b){for(var c=0,d=this.items.length;c<d;c++)if(a.call(b,this.items[c],c)===!1)return this;return this};for(var cI in cl)cl[g](cI)&&(cH[cI]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a][m](c,b)})}}(cI));cH.attr=function(b,c){if(b&&a.is(b,E)&&a.is(b[0],"object"))for(var d=0,e=b.length;d<e;d++)this.items[d].attr(b[d]);else for(var f=0,g=this.items.length;f<g;f++)this.items[f].attr(b,c);return this},cH.clear=function(){while(this.length)this.pop()},cH.splice=function(a,b,c){a=a<0?x(this.length+a,0):a,b=x(0,y(this.length-a,b));var d=[],e=[],f=[],g;for(g=2;g<arguments.length;g++)f.push(arguments[g]);for(g=0;g<b;g++)e.push(this[a+g]);for(;g<this.length-a;g++)d.push(this[a+g]);var h=f.length;for(g=0;g<h+d.length;g++)this.items[a+g]=this[a+g]=g<h?f[g]:d[g-h];g=this.items.length=this.length-=b-h;while(this[g])delete this[g++];return new cG(e)},cH.exclude=function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]==a){this.splice(b,1);return!0}},cH.animate=function(b,c,d,e){(a.is(d,"function")||!d)&&(e=d||null);var f=this.items.length,g=f,h,i=this,j;if(!f)return this;e&&(j=function(){!--f&&e.call(i)}),d=a.is(d,D)?d:j;var k=a.animation(b,c,d,j);h=this.items[--g].animate(k);while(g--)this.items[g]&&!this.items[g].removed&&this.items[g].animateWith(h,k,k);return this},cH.insertAfter=function(a){var b=this.items.length;while(b--)this.items[b].insertAfter(a);return this},cH.getBBox=function(){var a=[],b=[],c=[],d=[];for(var e=this.items.length;e--;)if(!this.items[e].removed){var f=this.items[e].getBBox();a.push(f.x),b.push(f.y),c.push(f.x+f.width),d.push(f.y+f.height)}a=y[m](0,a),b=y[m](0,b),c=x[m](0,c),d=x[m](0,d);return{x:a,y:b,x2:c,y2:d,width:c-a,height:d-b}},cH.clone=function(a){a=new cG;for(var b=0,c=this.items.length;b<c;b++)a.push(this.items[b].clone());return a},cH.toString=function(){return"Raphaël‘s set"},a.registerFont=function(a){if(!a.face)return a;this.fonts=this.fonts||{};var b={w:a.w,face:{},glyphs:{}},c=a.face["font-family"];for(var d in a.face)a.face[g](d)&&(b.face[d]=a.face[d]);this.fonts[c]?this.fonts[c].push(b):this.fonts[c]=[b];if(!a.svg){b.face["units-per-em"]=R(a.face["units-per-em"],10);for(var e in a.glyphs)if(a.glyphs[g](e)){var f=a.glyphs[e];b.glyphs[e]={w:f.w,k:{},d:f.d&&"M"+f.d.replace(/[mlcxtrv]/g,function(a){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[a]||"M"})+"z"};if(f.k)for(var h in f.k)f[g](h)&&(b.glyphs[e].k[h]=f.k[h])}}return a},k.getFont=function(b,c,d,e){e=e||"normal",d=d||"normal",c=+c||{normal:400,bold:700,lighter:300,bolder:800}[c]||400;if(!!a.fonts){var f=a.fonts[b];if(!f){var h=new RegExp("(^|\\s)"+b.replace(/[^\w\d\s+!~.:_-]/g,p)+"(\\s|$)","i");for(var i in a.fonts)if(a.fonts[g](i)&&h.test(i)){f=a.fonts[i];break}}var j;if(f)for(var k=0,l=f.length;k<l;k++){j=f[k];if(j.face["font-weight"]==c&&(j.face["font-style"]==d||!j.face["font-style"])&&j.face["font-stretch"]==e)break}return j}},k.print=function(b,d,e,f,g,h,i){h=h||"middle",i=x(y(i||0,1),-1);var j=r(e)[s](p),k=0,l=0,m=p,n;a.is(f,e)&&(f=this.getFont(f));if(f){n=(g||16)/f.face["units-per-em"];var o=f.face.bbox[s](c),q=+o[0],t=o[3]-o[1],u=0,v=+o[1]+(h=="baseline"?t+ +f.face.descent:t/2);for(var w=0,z=j.length;w<z;w++){if(j[w]=="\n")k=0,B=0,l=0,u+=t;else{var A=l&&f.glyphs[j[w-1]]||{},B=f.glyphs[j[w]];k+=l?(A.w||f.w)+(A.k&&A.k[j[w]]||0)+f.w*i:0,l=1}B&&B.d&&(m+=a.transformPath(B.d,["t",k*n,u*n,"s",n,n,q,v,"t",(b-q)/n,(d-v)/n]))}}return this.path(m).attr({fill:"#000",stroke:"none"})},k.add=function(b){if(a.is(b,"array")){var c=this.set(),e=0,f=b.length,h;for(;e<f;e++)h=b[e]||{},d[g](h.type)&&c.push(this[h.type]().attr(h))}return c},a.format=function(b,c){var d=a.is(c,E)?[0][n](c):arguments;b&&a.is(b,D)&&d.length-1&&(b=b.replace(e,function(a,b){return d[++b]==null?p:d[b]}));return b||p},a.fullfill=function(){var a=/\{([^\}]+)\}/g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,c=function(a,c,d){var e=d;c.replace(b,function(a,b,c,d,f){b=b||d,e&&(b in e&&(e=e[b]),typeof e=="function"&&f&&(e=e()))}),e=(e==null||e==d?a:e)+"";return e};return function(b,d){return String(b).replace(a,function(a,b){return c(a,b,d)})}}(),a.ninja=function(){i.was?h.win.Raphael=i.is:delete Raphael;return a},a.st=cH,function(b,c,d){function e(){/in/.test(b.readyState)?setTimeout(e,9):a.eve("raphael.DOMload")}b.readyState==null&&b.addEventListener&&(b.addEventListener(c,d=function(){b.removeEventListener(c,d,!1),b.readyState="complete"},!1),b.readyState="loading"),e()}(document,"DOMContentLoaded"),i.was?h.win.Raphael=a:Raphael=a,eve.on("raphael.DOMload",function(){b=!0})}(),window.Raphael.svg&&function(a){var b="hasOwnProperty",c=String,d=parseFloat,e=parseInt,f=Math,g=f.max,h=f.abs,i=f.pow,j=/[, ]+/,k=a.eve,l="",m=" ",n="http://www.w3.org/1999/xlink",o={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},p={};a.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var q=function(d,e){if(e){typeof d=="string"&&(d=q(d));for(var f in e)e[b](f)&&(f.substring(0,6)=="xlink:"?d.setAttributeNS(n,f.substring(6),c(e[f])):d.setAttribute(f,c(e[f])))}else d=a._g.doc.createElementNS("http://www.w3.org/2000/svg",d),d.style&&(d.style.webkitTapHighlightColor="rgba(0,0,0,0)");return d},r=function(b,e){var j="linear",k=b.id+e,m=.5,n=.5,o=b.node,p=b.paper,r=o.style,s=a._g.doc.getElementById(k);if(!s){e=c(e).replace(a._radial_gradient,function(a,b,c){j="radial";if(b&&c){m=d(b),n=d(c);var e=(n>.5)*2-1;i(m-.5,2)+i(n-.5,2)>.25&&(n=f.sqrt(.25-i(m-.5,2))*e+.5)&&n!=.5&&(n=n.toFixed(5)-1e-5*e)}return l}),e=e.split(/\s*\-\s*/);if(j=="linear"){var t=e.shift();t=-d(t);if(isNaN(t))return null;var u=[0,0,f.cos(a.rad(t)),f.sin(a.rad(t))],v=1/(g(h(u[2]),h(u[3]))||1);u[2]*=v,u[3]*=v,u[2]<0&&(u[0]=-u[2],u[2]=0),u[3]<0&&(u[1]=-u[3],u[3]=0)}var w=a._parseDots(e);if(!w)return null;k=k.replace(/[\(\)\s,\xb0#]/g,"_"),b.gradient&&k!=b.gradient.id&&(p.defs.removeChild(b.gradient),delete b.gradient);if(!b.gradient){s=q(j+"Gradient",{id:k}),b.gradient=s,q(s,j=="radial"?{fx:m,fy:n}:{x1:u[0],y1:u[1],x2:u[2],y2:u[3],gradientTransform:b.matrix.invert()}),p.defs.appendChild(s);for(var x=0,y=w.length;x<y;x++)s.appendChild(q("stop",{offset:w[x].offset?w[x].offset:x?"100%":"0%","stop-color":w[x].color||"#fff"}))}}q(o,{fill:"url(#"+k+")",opacity:1,"fill-opacity":1}),r.fill=l,r.opacity=1,r.fillOpacity=1;return 1},s=function(a){var b=a.getBBox(1);q(a.pattern,{patternTransform:a.matrix.invert()+" translate("+b.x+","+b.y+")"})},t=function(d,e,f){if(d.type=="path"){var g=c(e).toLowerCase().split("-"),h=d.paper,i=f?"end":"start",j=d.node,k=d.attrs,m=k["stroke-width"],n=g.length,r="classic",s,t,u,v,w,x=3,y=3,z=5;while(n--)switch(g[n]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":r=g[n];break;case"wide":y=5;break;case"narrow":y=2;break;case"long":x=5;break;case"short":x=2}r=="open"?(x+=2,y+=2,z+=2,u=1,v=f?4:1,w={fill:"none",stroke:k.stroke}):(v=u=x/2,w={fill:k.stroke,stroke:"none"}),d._.arrows?f?(d._.arrows.endPath&&p[d._.arrows.endPath]--,d._.arrows.endMarker&&p[d._.arrows.endMarker]--):(d._.arrows.startPath&&p[d._.arrows.startPath]--,d._.arrows.startMarker&&p[d._.arrows.startMarker]--):d._.arrows={};if(r!="none"){var A="raphael-marker-"+r,B="raphael-marker-"+i+r+x+y;a._g.doc.getElementById(A)?p[A]++:(h.defs.appendChild(q(q("path"),{"stroke-linecap":"round",d:o[r],id:A})),p[A]=1);var C=a._g.doc.getElementById(B),D;C?(p[B]++,D=C.getElementsByTagName("use")[0]):(C=q(q("marker"),{id:B,markerHeight:y,markerWidth:x,orient:"auto",refX:v,refY:y/2}),D=q(q("use"),{"xlink:href":"#"+A,transform:(f?"rotate(180 "+x/2+" "+y/2+") ":l)+"scale("+x/z+","+y/z+")","stroke-width":(1/((x/z+y/z)/2)).toFixed(4)}),C.appendChild(D),h.defs.appendChild(C),p[B]=1),q(D,w);var F=u*(r!="diamond"&&r!="oval");f?(s=d._.arrows.startdx*m||0,t=a.getTotalLength(k.path)-F*m):(s=F*m,t=a.getTotalLength(k.path)-(d._.arrows.enddx*m||0)),w={},w["marker-"+i]="url(#"+B+")";if(t||s)w.d=Raphael.getSubpath(k.path,s,t);q(j,w),d._.arrows[i+"Path"]=A,d._.arrows[i+"Marker"]=B,d._.arrows[i+"dx"]=F,d._.arrows[i+"Type"]=r,d._.arrows[i+"String"]=e}else f?(s=d._.arrows.startdx*m||0,t=a.getTotalLength(k.path)-s):(s=0,t=a.getTotalLength(k.path)-(d._.arrows.enddx*m||0)),d._.arrows[i+"Path"]&&q(j,{d:Raphael.getSubpath(k.path,s,t)}),delete d._.arrows[i+"Path"],delete d._.arrows[i+"Marker"],delete d._.arrows[i+"dx"],delete d._.arrows[i+"Type"],delete d._.arrows[i+"String"];for(w in p)if(p[b](w)&&!p[w]){var G=a._g.doc.getElementById(w);G&&G.parentNode.removeChild(G)}}},u={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},v=function(a,b,d){b=u[c(b).toLowerCase()];if(b){var e=a.attrs["stroke-width"]||"1",f={round:e,square:e,butt:0}[a.attrs["stroke-linecap"]||d["stroke-linecap"]]||0,g=[],h=b.length;while(h--)g[h]=b[h]*e+(h%2?1:-1)*f;q(a.node,{"stroke-dasharray":g.join(",")})}},w=function(d,f){var i=d.node,k=d.attrs,m=i.style.visibility;i.style.visibility="hidden";for(var o in f)if(f[b](o)){if(!a._availableAttrs[b](o))continue;var p=f[o];k[o]=p;switch(o){case"blur":d.blur(p);break;case"href":case"title":case"target":var u=i.parentNode;if(u.tagName.toLowerCase()!="a"){var w=q("a");u.insertBefore(w,i),w.appendChild(i),u=w}o=="target"?u.setAttributeNS(n,"show",p=="blank"?"new":p):u.setAttributeNS(n,o,p);break;case"cursor":i.style.cursor=p;break;case"transform":d.transform(p);break;case"arrow-start":t(d,p);break;case"arrow-end":t(d,p,1);break;case"clip-rect":var x=c(p).split(j);if(x.length==4){d.clip&&d.clip.parentNode.parentNode.removeChild(d.clip.parentNode);var z=q("clipPath"),A=q("rect");z.id=a.createUUID(),q(A,{x:x[0],y:x[1],width:x[2],height:x[3]}),z.appendChild(A),d.paper.defs.appendChild(z),q(i,{"clip-path":"url(#"+z.id+")"}),d.clip=A}if(!p){var B=i.getAttribute("clip-path");if(B){var C=a._g.doc.getElementById(B.replace(/(^url\(#|\)$)/g,l));C&&C.parentNode.removeChild(C),q(i,{"clip-path":l}),delete d.clip}}break;case"path":d.type=="path"&&(q(i,{d:p?k.path=a._pathToAbsolute(p):"M0,0"}),d._.dirty=1,d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1)));break;case"width":i.setAttribute(o,p),d._.dirty=1;if(k.fx)o="x",p=k.x;else break;case"x":k.fx&&(p=-k.x-(k.width||0));case"rx":if(o=="rx"&&d.type=="rect")break;case"cx":i.setAttribute(o,p),d.pattern&&s(d),d._.dirty=1;break;case"height":i.setAttribute(o,p),d._.dirty=1;if(k.fy)o="y",p=k.y;else break;case"y":k.fy&&(p=-k.y-(k.height||0));case"ry":if(o=="ry"&&d.type=="rect")break;case"cy":i.setAttribute(o,p),d.pattern&&s(d),d._.dirty=1;break;case"r":d.type=="rect"?q(i,{rx:p,ry:p}):i.setAttribute(o,p),d._.dirty=1;break;case"src":d.type=="image"&&i.setAttributeNS(n,"href",p);break;case"stroke-width":if(d._.sx!=1||d._.sy!=1)p/=g(h(d._.sx),h(d._.sy))||1;d.paper._vbSize&&(p*=d.paper._vbSize),i.setAttribute(o,p),k["stroke-dasharray"]&&v(d,k["stroke-dasharray"],f),d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1));break;case"stroke-dasharray":v(d,p,f);break;case"fill":var D=c(p).match(a._ISURL);if(D){z=q("pattern");var F=q("image");z.id=a.createUUID(),q(z,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),q(F,{x:0,y:0,"xlink:href":D[1]}),z.appendChild(F),function(b){a._preload(D[1],function(){var a=this.offsetWidth,c=this.offsetHeight;q(b,{width:a,height:c}),q(F,{width:a,height:c}),d.paper.safari()})}(z),d.paper.defs.appendChild(z),q(i,{fill:"url(#"+z.id+")"}),d.pattern=z,d.pattern&&s(d);break}var G=a.getRGB(p);if(!G.error)delete f.gradient,delete k.gradient,!a.is(k.opacity,"undefined")&&a.is(f.opacity,"undefined")&&q(i,{opacity:k.opacity}),!a.is(k["fill-opacity"],"undefined")&&a.is(f["fill-opacity"],"undefined")&&q(i,{"fill-opacity":k["fill-opacity"]});else if((d.type=="circle"||d.type=="ellipse"||c(p).charAt()!="r")&&r(d,p)){if("opacity"in k||"fill-opacity"in k){var H=a._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g,l));if(H){var I=H.getElementsByTagName("stop");q(I[I.length-1],{"stop-opacity":("opacity"in k?k.opacity:1)*("fill-opacity"in k?k["fill-opacity"]:1)})}}k.gradient=p,k.fill="none";break}G[b]("opacity")&&q(i,{"fill-opacity":G.opacity>1?G.opacity/100:G.opacity});case"stroke":G=a.getRGB(p),i.setAttribute(o,G.hex),o=="stroke"&&G[b]("opacity")&&q(i,{"stroke-opacity":G.opacity>1?G.opacity/100:G.opacity}),o=="stroke"&&d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1));break;case"gradient":(d.type=="circle"||d.type=="ellipse"||c(p).charAt()!="r")&&r(d,p);break;case"opacity":k.gradient&&!k[b]("stroke-opacity")&&q(i,{"stroke-opacity":p>1?p/100:p});case"fill-opacity":if(k.gradient){H=a._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g,l)),H&&(I=H.getElementsByTagName("stop"),q(I[I.length-1],{"stop-opacity":p}));break};default:o=="font-size"&&(p=e(p,10)+"px");var J=o.replace(/(\-.)/g,function(a){return a.substring(1).toUpperCase()});i.style[J]=p,d._.dirty=1,i.setAttribute(o,p)}}y(d,f),i.style.visibility=m},x=1.2,y=function(d,f){if(d.type=="text"&&!!(f[b]("text")||f[b]("font")||f[b]("font-size")||f[b]("x")||f[b]("y"))){var g=d.attrs,h=d.node,i=h.firstChild?e(a._g.doc.defaultView.getComputedStyle(h.firstChild,l).getPropertyValue("font-size"),10):10;if(f[b]("text")){g.text=f.text;while(h.firstChild)h.removeChild(h.firstChild);var j=c(f.text).split("\n"),k=[],m;for(var n=0,o=j.length;n<o;n++)m=q("tspan"),n&&q(m,{dy:i*x,x:g.x}),m.appendChild(a._g.doc.createTextNode(j[n])),h.appendChild(m),k[n]=m}else{k=h.getElementsByTagName("tspan");for(n=0,o=k.length;n<o;n++)n?q(k[n],{dy:i*x,x:g.x}):q(k[0],{dy:0})}q(h,{x:g.x,y:g.y}),d._.dirty=1;var p=d._getBBox(),r=g.y-(p.y+p.height/2);r&&a.is(r,"finite")&&q(k[0],{dy:r})}},z=function(b,c){var d=0,e=0;this[0]=this.node=b,b.raphael=!0,this.id=a._oid++,b.raphaelid=this.id,this.matrix=a.matrix(),this.realPath=null,this.paper=c,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!c.bottom&&(c.bottom=this),this.prev=c.top,c.top&&(c.top.next=this),c.top=this,this.next=null},A=a.el;z.prototype=A,A.constructor=z,a._engine.path=function(a,b){var c=q("path");b.canvas&&b.canvas.appendChild(c);var d=new z(c,b);d.type="path",w(d,{fill:"none",stroke:"#000",path:a});return d},A.rotate=function(a,b,e){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1]),e=d(a[2])),a=d(a[0]),e==null&&(b=e);if(b==null||e==null){var f=this.getBBox(1);b=f.x+f.width/2,e=f.y+f.height/2}this.transform(this._.transform.concat([["r",a,b,e]]));return this},A.scale=function(a,b,e,f){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1]),e=d(a[2]),f=d(a[3])),a=d(a[0]),b==null&&(b=a),f==null&&(e=f);if(e==null||f==null)var g=this.getBBox(1);e=e==null?g.x+g.width/2:e,f=f==null?g.y+g.height/2:f,this.transform(this._.transform.concat([["s",a,b,e,f]]));return this},A.translate=function(a,b){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1])),a=d(a[0])||0,b=+b||0,this.transform(this._.transform.concat([["t",a,b]]));return this},A.transform=function(c){var d=this._;if(c==null)return d.transform;a._extractTransform(this,c),this.clip&&q(this.clip,{transform:this.matrix.invert()}),this.pattern&&s(this),this.node&&q(this.node,{transform:this.matrix});if(d.sx!=1||d.sy!=1){var e=this.attrs[b]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":e})}return this},A.hide=function(){!this.removed&&this.paper.safari(this.node.style.display="none");return this},A.show=function(){!this.removed&&this.paper.safari(this.node.style.display="");return this},A.remove=function(){if(!this.removed&&!!this.node.parentNode){var b=this.paper;b.__set__&&b.__set__.exclude(this),k.unbind("raphael.*.*."+this.id),this.gradient&&b.defs.removeChild(this.gradient),a._tear(this,b),this.node.parentNode.tagName.toLowerCase()=="a"?this.node.parentNode.parentNode.removeChild(this.node.parentNode):this.node.parentNode.removeChild(this.node);for(var c in this)this[c]=typeof this[c]=="function"?a._removedFactory(c):null;this.removed=!0}},A._getBBox=function(){if(this.node.style.display=="none"){this.show();var a=!0}var b={};try{b=this.node.getBBox()}catch(c){}finally{b=b||{}}a&&this.hide();return b},A.attr=function(c,d){if(this.removed)return this;if(c==null){var e={};for(var f in this.attrs)this.attrs[b](f)&&(e[f]=this.attrs[f]);e.gradient&&e.fill=="none"&&(e.fill=e.gradient)&&delete e.gradient,e.transform=this._.transform;return e}if(d==null&&a.is(c,"string")){if(c=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient)return this.attrs.gradient;if(c=="transform")return this._.transform;var g=c.split(j),h={};for(var i=0,l=g.length;i<l;i++)c=g[i],c in this.attrs?h[c]=this.attrs[c]:a.is(this.paper.customAttributes[c],"function")?h[c]=this.paper.customAttributes[c].def:h[c]=a._availableAttrs[c];return l-1?h:h[g[0]]}if(d==null&&a.is(c,"array")){h={};for(i=0,l=c.length;i<l;i++)h[c[i]]=this.attr(c[i]);return h}if(d!=null){var m={};m[c]=d}else c!=null&&a.is(c,"object")&&(m=c);for(var n in m)k("raphael.attr."+n+"."+this.id,this,m[n]);for(n in this.paper.customAttributes)if(this.paper.customAttributes[b](n)&&m[b](n)&&a.is(this.paper.customAttributes[n],"function")){var o=this.paper.customAttributes[n].apply(this,[].concat(m[n]));this.attrs[n]=m[n];for(var p in o)o[b](p)&&(m[p]=o[p])}w(this,m);return this},A.toFront=function(){if(this.removed)return this;this.node.parentNode.tagName.toLowerCase()=="a"?this.node.parentNode.parentNode.appendChild(this.node.parentNode):this.node.parentNode.appendChild(this.node);var b=this.paper;b.top!=this&&a._tofront(this,b);return this},A.toBack=function(){if(this.removed)return this;var b=this.node.parentNode;b.tagName.toLowerCase()=="a"?b.parentNode.insertBefore(this.node.parentNode,this.node.parentNode.parentNode.firstChild):b.firstChild!=this.node&&b.insertBefore(this.node,this.node.parentNode.firstChild),a._toback(this,this.paper);var c=this.paper;return this},A.insertAfter=function(b){if(this.removed)return this;var c=b.node||b[b.length-1].node;c.nextSibling?c.parentNode.insertBefore(this.node,c.nextSibling):c.parentNode.appendChild(this.node),a._insertafter(this,b,this.paper);return this},A.insertBefore=function(b){if(this.removed)return this;var c=b.node||b[0].node;c.parentNode.insertBefore(this.node,c),a._insertbefore(this,b,this.paper);return this},A.blur=function(b){var c=this;if(+b!==0){var d=q("filter"),e=q("feGaussianBlur");c.attrs.blur=b,d.id=a.createUUID(),q(e,{stdDeviation:+b||1.5}),d.appendChild(e),c.paper.defs.appendChild(d),c._blur=d,q(c.node,{filter:"url(#"+d.id+")"})}else c._blur&&(c._blur.parentNode.removeChild(c._blur),delete c._blur,delete c.attrs.blur),c.node.removeAttribute("filter")},a._engine.circle=function(a,b,c,d){var e=q("circle");a.canvas&&a.canvas.appendChild(e);var f=new z(e,a);f.attrs={cx:b,cy:c,r:d,fill:"none",stroke:"#000"},f.type="circle",q(e,f.attrs);return f},a._engine.rect=function(a,b,c,d,e,f){var g=q("rect");a.canvas&&a.canvas.appendChild(g);var h=new z(g,a);h.attrs={x:b,y:c,width:d,height:e,r:f||0,rx:f||0,ry:f||0,fill:"none",stroke:"#000"},h.type="rect",q(g,h.attrs);return h},a._engine.ellipse=function(a,b,c,d,e){var f=q("ellipse");a.canvas&&a.canvas.appendChild(f);var g=new z(f,a);g.attrs={cx:b,cy:c,rx:d,ry:e,fill:"none",stroke:"#000"},g.type="ellipse",q(f,g.attrs);return g},a._engine.image=function(a,b,c,d,e,f){var g=q("image");q(g,{x:c,y:d,width:e,height:f,preserveAspectRatio:"none"}),g.setAttributeNS(n,"href",b),a.canvas&&a.canvas.appendChild(g);var h=new z(g,a);h.attrs={x:c,y:d,width:e,height:f,src:b},h.type="image";return h},a._engine.text=function(b,c,d,e){var f=q("text");b.canvas&&b.canvas.appendChild(f);var g=new z(f,b);g.attrs={x:c,y:d,"text-anchor":"middle",text:e,font:a._availableAttrs.font,stroke:"none",fill:"#000"},g.type="text",w(g,g.attrs);return g},a._engine.setSize=function(a,b){this.width=a||this.width,this.height=b||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox);return this},a._engine.create=function(){var b=a._getContainer.apply(0,arguments),c=b&&b.container,d=b.x,e=b.y,f=b.width,g=b.height;if(!c)throw new Error("SVG container not found.");var h=q("svg"),i="overflow:hidden;",j;d=d||0,e=e||0,f=f||512,g=g||342,q(h,{height:g,version:1.1,width:f,xmlns:"http://www.w3.org/2000/svg"}),c==1?(h.style.cssText=i+"position:absolute;left:"+d+"px;top:"+e+"px",a._g.doc.body.appendChild(h),j=1):(h.style.cssText=i+"position:relative",c.firstChild?c.insertBefore(h,c.firstChild):c.appendChild(h)),c=new a._Paper,c.width=f,c.height=g,c.canvas=h,c.clear(),c._left=c._top=0,j&&(c.renderfix=function(){}),c.renderfix();return c},a._engine.setViewBox=function(a,b,c,d,e){k("raphael.setViewBox",this,this._viewBox,[a,b,c,d,e]);var f=g(c/this.width,d/this.height),h=this.top,i=e?"meet":"xMinYMin",j,l;a==null?(this._vbSize&&(f=1),delete this._vbSize,j="0 0 "+this.width+m+this.height):(this._vbSize=f,j=a+m+b+m+c+m+d),q(this.canvas,{viewBox:j,preserveAspectRatio:i});while(f&&h)l="stroke-width"in h.attrs?h.attrs["stroke-width"]:1,h.attr({"stroke-width":l}),h._.dirty=1,h._.dirtyT=1,h=h.prev;this._viewBox=[a,b,c,d,!!e];return this},a.prototype.renderfix=function(){var a=this.canvas,b=a.style,c;try{c=a.getScreenCTM()||a.createSVGMatrix()}catch(d){c=a.createSVGMatrix()}var e=-c.e%1,f=-c.f%1;if(e||f)e&&(this._left=(this._left+e)%1,b.left=this._left+"px"),f&&(this._top=(this._top+f)%1,b.top=this._top+"px")},a.prototype.clear=function(){a.eve("raphael.clear",this);var b=this.canvas;while(b.firstChild)b.removeChild(b.firstChild);this.bottom=this.top=null,(this.desc=q("desc")).appendChild(a._g.doc.createTextNode("Created with Raphaël "+a.version)),b.appendChild(this.desc),b.appendChild(this.defs=q("defs"))},a.prototype.remove=function(){k("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null};var B=a.st;for(var C in A)A[b](C)&&!B[b](C)&&(B[C]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a].apply(c,b)})}}(C))}(window.Raphael),window.Raphael.vml&&function(a){var b="hasOwnProperty",c=String,d=parseFloat,e=Math,f=e.round,g=e.max,h=e.min,i=e.abs,j="fill",k=/[, ]+/,l=a.eve,m=" progid:DXImageTransform.Microsoft",n=" ",o="",p={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},q=/([clmz]),?([^clmz]*)/gi,r=/ progid:\S+Blur\([^\)]+\)/g,s=/-?[^,\s-]+/g,t="position:absolute;left:0;top:0;width:1px;height:1px",u=21600,v={path:1,rect:1,image:1},w={circle:1,ellipse:1},x=function(b){var d=/[ahqstv]/ig,e=a._pathToAbsolute;c(b).match(d)&&(e=a._path2curve),d=/[clmz]/g;if(e==a._pathToAbsolute&&!c(b).match(d)){var g=c(b).replace(q,function(a,b,c){var d=[],e=b.toLowerCase()=="m",g=p[b];c.replace(s,function(a){e&&d.length==2&&(g+=d+p[b=="m"?"l":"L"],d=[]),d.push(f(a*u))});return g+d});return g}var h=e(b),i,j;g=[];for(var k=0,l=h.length;k<l;k++){i=h[k],j=h[k][0].toLowerCase(),j=="z"&&(j="x");for(var m=1,r=i.length;m<r;m++)j+=f(i[m]*u)+(m!=r-1?",":o);g.push(j)}return g.join(n)},y=function(b,c,d){var e=a.matrix();e.rotate(-b,.5,.5);return{dx:e.x(c,d),dy:e.y(c,d)}},z=function(a,b,c,d,e,f){var g=a._,h=a.matrix,k=g.fillpos,l=a.node,m=l.style,o=1,p="",q,r=u/b,s=u/c;m.visibility="hidden";if(!!b&&!!c){l.coordsize=i(r)+n+i(s),m.rotation=f*(b*c<0?-1:1);if(f){var t=y(f,d,e);d=t.dx,e=t.dy}b<0&&(p+="x"),c<0&&(p+=" y")&&(o=-1),m.flip=p,l.coordorigin=d*-r+n+e*-s;if(k||g.fillsize){var v=l.getElementsByTagName(j);v=v&&v[0],l.removeChild(v),k&&(t=y(f,h.x(k[0],k[1]),h.y(k[0],k[1])),v.position=t.dx*o+n+t.dy*o),g.fillsize&&(v.size=g.fillsize[0]*i(b)+n+g.fillsize[1]*i(c)),l.appendChild(v)}m.visibility="visible"}};a.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var A=function(a,b,d){var e=c(b).toLowerCase().split("-"),f=d?"end":"start",g=e.length,h="classic",i="medium",j="medium";while(g--)switch(e[g]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":h=e[g];break;case"wide":case"narrow":j=e[g];break;case"long":case"short":i=e[g]}var k=a.node.getElementsByTagName("stroke")[0];k[f+"arrow"]=h,k[f+"arrowlength"]=i,k[f+"arrowwidth"]=j},B=function(e,i){e.attrs=e.attrs||{};var l=e.node,m=e.attrs,p=l.style,q,r=v[e.type]&&(i.x!=m.x||i.y!=m.y||i.width!=m.width||i.height!=m.height||i.cx!=m.cx||i.cy!=m.cy||i.rx!=m.rx||i.ry!=m.ry||i.r!=m.r),s=w[e.type]&&(m.cx!=i.cx||m.cy!=i.cy||m.r!=i.r||m.rx!=i.rx||m.ry!=i.ry),t=e;for(var y in i)i[b](y)&&(m[y]=i[y]);r&&(m.path=a._getPath[e.type](e),e._.dirty=1),i.href&&(l.href=i.href),i.title&&(l.title=i.title),i.target&&(l.target=i.target),i.cursor&&(p.cursor=i.cursor),"blur"in i&&e.blur(i.blur);if(i.path&&e.type=="path"||r)l.path=x(~c(m.path).toLowerCase().indexOf("r")?a._pathToAbsolute(m.path):m.path),e.type=="image"&&(e._.fillpos=[m.x,m.y],e._.fillsize=[m.width,m.height],z(e,1,1,0,0,0));"transform"in i&&e.transform(i.transform);if(s){var B=+m.cx,D=+m.cy,E=+m.rx||+m.r||0,G=+m.ry||+m.r||0;l.path=a.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",f((B-E)*u),f((D-G)*u),f((B+E)*u),f((D+G)*u),f(B*u))}if("clip-rect"in i){var H=c(i["clip-rect"]).split(k);if(H.length==4){H[2]=+H[2]+ +H[0],H[3]=+H[3]+ +H[1];var I=l.clipRect||a._g.doc.createElement("div"),J=I.style;J.clip=a.format("rect({1}px {2}px {3}px {0}px)",H),l.clipRect||(J.position="absolute",J.top=0,J.left=0,J.width=e.paper.width+"px",J.height=e.paper.height+"px",l.parentNode.insertBefore(I,l),I.appendChild(l),l.clipRect=I)}i["clip-rect"]||l.clipRect&&(l.clipRect.style.clip="auto")}if(e.textpath){var K=e.textpath.style;i.font&&(K.font=i.font),i["font-family"]&&(K.fontFamily='"'+i["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,o)+'"'),i["font-size"]&&(K.fontSize=i["font-size"]),i["font-weight"]&&(K.fontWeight=i["font-weight"]),i["font-style"]&&(K.fontStyle=i["font-style"])}"arrow-start"in i&&A(t,i["arrow-start"]),"arrow-end"in i&&A(t,i["arrow-end"],1);if(i.opacity!=null||i["stroke-width"]!=null||i.fill!=null||i.src!=null||i.stroke!=null||i["stroke-width"]!=null||i["stroke-opacity"]!=null||i["fill-opacity"]!=null||i["stroke-dasharray"]!=null||i["stroke-miterlimit"]!=null||i["stroke-linejoin"]!=null||i["stroke-linecap"]!=null){var L=l.getElementsByTagName(j),M=!1;L=L&&L[0],!L&&(M=L=F(j)),e.type=="image"&&i.src&&(L.src=i.src),i.fill&&(L.on=!0);if(L.on==null||i.fill=="none"||i.fill===null)L.on=!1;if(L.on&&i.fill){var N=c(i.fill).match(a._ISURL);if(N){L.parentNode==l&&l.removeChild(L),L.rotate=!0,L.src=N[1],L.type="tile";var O=e.getBBox(1);L.position=O.x+n+O.y,e._.fillpos=[O.x,O.y],a._preload(N[1],function(){e._.fillsize=[this.offsetWidth,this.offsetHeight]})}else L.color=a.getRGB(i.fill).hex,L.src=o,L.type="solid",a.getRGB(i.fill).error&&(t.type in{circle:1,ellipse:1}||c(i.fill).charAt()!="r")&&C(t,i.fill,L)&&(m.fill="none",m.gradient=i.fill,L.rotate=!1)}if("fill-opacity"in i||"opacity"in i){var P=((+m["fill-opacity"]+1||2)-1)*((+m.opacity+1||2)-1)*((+a.getRGB(i.fill).o+1||2)-1);P=h(g(P,0),1),L.opacity=P,L.src&&(L.color="none")}l.appendChild(L);var Q=l.getElementsByTagName("stroke")&&l.getElementsByTagName("stroke")[0],T=!1;!Q&&(T=Q=F("stroke"));if(i.stroke&&i.stroke!="none"||i["stroke-width"]||i["stroke-opacity"]!=null||i["stroke-dasharray"]||i["stroke-miterlimit"]||i["stroke-linejoin"]||i["stroke-linecap"])Q.on=!0;(i.stroke=="none"||i.stroke===null||Q.on==null||i.stroke==0||i["stroke-width"]==0)&&(Q.on=!1);var U=a.getRGB(i.stroke);Q.on&&i.stroke&&(Q.color=U.hex),P=((+m["stroke-opacity"]+1||2)-1)*((+m.opacity+1||2)-1)*((+U.o+1||2)-1);var V=(d(i["stroke-width"])||1)*.75;P=h(g(P,0),1),i["stroke-width"]==null&&(V=m["stroke-width"]),i["stroke-width"]&&(Q.weight=V),V&&V<1&&(P*=V)&&(Q.weight=1),Q.opacity=P,i["stroke-linejoin"]&&(Q.joinstyle=i["stroke-linejoin"]||"miter"),Q.miterlimit=i["stroke-miterlimit"]||8,i["stroke-linecap"]&&(Q.endcap=i["stroke-linecap"]=="butt"?"flat":i["stroke-linecap"]=="square"?"square":"round");if(i["stroke-dasharray"]){var W={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};Q.dashstyle=W[b](i["stroke-dasharray"])?W[i["stroke-dasharray"]]:o}T&&l.appendChild(Q)}if(t.type=="text"){t.paper.canvas.style.display=o;var X=t.paper.span,Y=100,Z=m.font&&m.font.match(/\d+(?:\.\d*)?(?=px)/);p=X.style,m.font&&(p.font=m.font),m["font-family"]&&(p.fontFamily=m["font-family"]),m["font-weight"]&&(p.fontWeight=m["font-weight"]),m["font-style"]&&(p.fontStyle=m["font-style"]),Z=d(m["font-size"]||Z&&Z[0])||10,p.fontSize=Z*Y+"px",t.textpath.string&&(X.innerHTML=c(t.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var $=X.getBoundingClientRect();t.W=m.w=($.right-$.left)/Y,t.H=m.h=($.bottom-$.top)/Y,t.X=m.x,t.Y=m.y+t.H/2,("x"in i||"y"in i)&&(t.path.v=a.format("m{0},{1}l{2},{1}",f(m.x*u),f(m.y*u),f(m.x*u)+1));var _=["x","y","text","font","font-family","font-weight","font-style","font-size"];for(var ba=0,bb=_.length;ba<bb;ba++)if(_[ba]in i){t._.dirty=1;break}switch(m["text-anchor"]){case"start":t.textpath.style["v-text-align"]="left",t.bbx=t.W/2;break;case"end":t.textpath.style["v-text-align"]="right",t.bbx=-t.W/2;break;default:t.textpath.style["v-text-align"]="center",t.bbx=0}t.textpath.style["v-text-kern"]=!0}},C=function(b,f,g){b.attrs=b.attrs||{};var h=b.attrs,i=Math.pow,j,k,l="linear",m=".5 .5";b.attrs.gradient=f,f=c(f).replace(a._radial_gradient,function(a,b,c){l="radial",b&&c&&(b=d(b),c=d(c),i(b-.5,2)+i(c-.5,2)>.25&&(c=e.sqrt(.25-i(b-.5,2))*((c>.5)*2-1)+.5),m=b+n+c);return o}),f=f.split(/\s*\-\s*/);if(l=="linear"){var p=f.shift();p=-d(p);if(isNaN(p))return null}var q=a._parseDots(f);if(!q)return null;b=b.shape||b.node;if(q.length){b.removeChild(g),g.on=!0,g.method="none",g.color=q[0].color,g.color2=q[q.length-1].color;var r=[];for(var s=0,t=q.length;s<t;s++)q[s].offset&&r.push(q[s].offset+n+q[s].color);g.colors=r.length?r.join():"0% "+g.color,l=="radial"?(g.type="gradientTitle",g.focus="100%",g.focussize="0 0",g.focusposition=m,g.angle=0):(g.type="gradient",g.angle=(270-p)%360),b.appendChild(g)}return 1},D=function(b,c){this[0]=this.node=b,b.raphael=!0,this.id=a._oid++,b.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=c,this.matrix=a.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!c.bottom&&(c.bottom=this),this.prev=c.top,c.top&&(c.top.next=this),c.top=this,this.next=null},E=a.el;D.prototype=E,E.constructor=D,E.transform=function(b){if(b==null)return this._.transform;var d=this.paper._viewBoxShift,e=d?"s"+[d.scale,d.scale]+"-1-1t"+[d.dx,d.dy]:o,f;d&&(f=b=c(b).replace(/\.{3}|\u2026/g,this._.transform||o)),a._extractTransform(this,e+b);var g=this.matrix.clone(),h=this.skew,i=this.node,j,k=~c(this.attrs.fill).indexOf("-"),l=!c(this.attrs.fill).indexOf("url(");g.translate(-0.5,-0.5);if(l||k||this.type=="image"){h.matrix="1 0 0 1",h.offset="0 0",j=g.split();if(k&&j.noRotation||!j.isSimple){i.style.filter=g.toFilter();var m=this.getBBox(),p=this.getBBox(1),q=m.x-p.x,r=m.y-p.y;i.coordorigin=q*-u+n+r*-u,z(this,1,1,q,r,0)}else i.style.filter=o,z(this,j.scalex,j.scaley,j.dx,j.dy,j.rotate)}else i.style.filter=o,h.matrix=c(g),h.offset=g.offset();f&&(this._.transform=f);return this},E.rotate=function(a,b,e){if(this.removed)return this;if(a!=null){a=c(a).split(k),a.length-1&&(b=d(a[1]),e=d(a[2])),a=d(a[0]),e==null&&(b=e);if(b==null||e==null){var f=this.getBBox(1);b=f.x+f.width/2,e=f.y+f.height/2}this._.dirtyT=1,this.transform(this._.transform.concat([["r",a,b,e]]));return this}},E.translate=function(a,b){if(this.removed)return this;a=c(a).split(k),a.length-1&&(b=d(a[1])),a=d(a[0])||0,b=+b||0,this._.bbox&&(this._.bbox.x+=a,this._.bbox.y+=b),this.transform(this._.transform.concat([["t",a,b]]));return this},E.scale=function(a,b,e,f){if(this.removed)return this;a=c(a).split(k),a.length-1&&(b=d(a[1]),e=d(a[2]),f=d(a[3]),isNaN(e)&&(e=null),isNaN(f)&&(f=null)),a=d(a[0]),b==null&&(b=a),f==null&&(e=f);if(e==null||f==null)var g=this.getBBox(1);e=e==null?g.x+g.width/2:e,f=f==null?g.y+g.height/2:f,this.transform(this._.transform.concat([["s",a,b,e,f]])),this._.dirtyT=1;return this},E.hide=function(){!this.removed&&(this.node.style.display="none");return this},E.show=function(){!this.removed&&(this.node.style.display=o);return this},E._getBBox=function(){if(this.removed)return{};return{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},E.remove=function(){if(!this.removed&&!!this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),a.eve.unbind("raphael.*.*."+this.id),a._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null;this.removed=!0}},E.attr=function(c,d){if(this.removed)return this;if(c==null){var e={};for(var f in this.attrs)this.attrs[b](f)&&(e[f]=this.attrs[f]);e.gradient&&e.fill=="none"&&(e.fill=e.gradient)&&delete e.gradient,e.transform=this._.transform;return e}if(d==null&&a.is(c,"string")){if(c==j&&this.attrs.fill=="none"&&this.attrs.gradient)return this.attrs.gradient;var g=c.split(k),h={};for(var i=0,m=g.length;i<m;i++)c=g[i],c in this.attrs?h[c]=this.attrs[c]:a.is(this.paper.customAttributes[c],"function")?h[c]=this.paper.customAttributes[c].def:h[c]=a._availableAttrs[c];return m-1?h:h[g[0]]}if(this.attrs&&d==null&&a.is(c,"array")){h={};for(i=0,m=c.length;i<m;i++)h[c[i]]=this.attr(c[i]);return h}var n;d!=null&&(n={},n[c]=d),d==null&&a.is(c,"object")&&(n=c);for(var o in n)l("raphael.attr."+o+"."+this.id,this,n[o]);if(n){for(o in this.paper.customAttributes)if(this.paper.customAttributes[b](o)&&n[b](o)&&a.is(this.paper.customAttributes[o],"function")){var p=this.paper.customAttributes[o].apply(this,[].concat(n[o]));this.attrs[o]=n[o];for(var q in p)p[b](q)&&(n[q]=p[q])}n.text&&this.type=="text"&&(this.textpath.string=n.text),B(this,n)}return this},E.toFront=function(){!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&a._tofront(this,this.paper);return this},E.toBack=function(){if(this.removed)return this;this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),a._toback(this,this.paper));return this},E.insertAfter=function(b){if(this.removed)return this;b.constructor==a.st.constructor&&(b=b[b.length-1]),b.node.nextSibling?b.node.parentNode.insertBefore(this.node,b.node.nextSibling):b.node.parentNode.appendChild(this.node),a._insertafter(this,b,this.paper);return this},E.insertBefore=function(b){if(this.removed)return this;b.constructor==a.st.constructor&&(b=b[0]),b.node.parentNode.insertBefore(this.node,b.node),a._insertbefore(this,b,this.paper);return this},E.blur=function(b){var c=this.node.runtimeStyle,d=c.filter;d=d.replace(r,o),+b!==0?(this.attrs.blur=b,c.filter=d+n+m+".Blur(pixelradius="+(+b||1.5)+")",c.margin=a.format("-{0}px 0 0 -{0}px",f(+b||1.5))):(c.filter=d,c.margin=0,delete this.attrs.blur)},a._engine.path=function(a,b){var c=F("shape");c.style.cssText=t,c.coordsize=u+n+u,c.coordorigin=b.coordorigin;var d=new D(c,b),e={fill:"none",stroke:"#000"};a&&(e.path=a),d.type="path",d.path=[],d.Path=o,B(d,e),b.canvas.appendChild(c);var f=F("skew");f.on=!0,c.appendChild(f),d.skew=f,d.transform(o);return d},a._engine.rect=function(b,c,d,e,f,g){var h=a._rectPath(c,d,e,f,g),i=b.path(h),j=i.attrs;i.X=j.x=c,i.Y=j.y=d,i.W=j.width=e,i.H=j.height=f,j.r=g,j.path=h,i.type="rect";return i},a._engine.ellipse=function(a,b,c,d,e){var f=a.path(),g=f.attrs;f.X=b-d,f.Y=c-e,f.W=d*2,f.H=e*2,f.type="ellipse",B(f,{cx:b,cy:c,rx:d,ry:e});return f},a._engine.circle=function(a,b,c,d){var e=a.path(),f=e.attrs;e.X=b-d,e.Y=c-d,e.W=e.H=d*2,e.type="circle",B(e,{cx:b,cy:c,r:d});return e},a._engine.image=function(b,c,d,e,f,g){var h=a._rectPath(d,e,f,g),i=b.path(h).attr({stroke:"none"}),k=i.attrs,l=i.node,m=l.getElementsByTagName(j)[0];k.src=c,i.X=k.x=d,i.Y=k.y=e,i.W=k.width=f,i.H=k.height=g,k.path=h,i.type="image",m.parentNode==l&&l.removeChild(m),m.rotate=!0,m.src=c,m.type="tile",i._.fillpos=[d,e],i._.fillsize=[f,g],l.appendChild(m),z(i,1,1,0,0,0);return i},a._engine.text=function(b,d,e,g){var h=F("shape"),i=F("path"),j=F("textpath");d=d||0,e=e||0,g=g||"",i.v=a.format("m{0},{1}l{2},{1}",f(d*u),f(e*u),f(d*u)+1),i.textpathok=!0,j.string=c(g),j.on=!0,h.style.cssText=t,h.coordsize=u+n+u,h.coordorigin="0 0";var k=new D(h,b),l={fill:"#000",stroke:"none",font:a._availableAttrs.font,text:g};k.shape=h,k.path=i,k.textpath=j,k.type="text",k.attrs.text=c(g),k.attrs.x=d,k.attrs.y=e,k.attrs.w=1,k.attrs.h=1,B(k,l),h.appendChild(j),h.appendChild(i),b.canvas.appendChild(h);var m=F("skew");m.on=!0,h.appendChild(m),k.skew=m,k.transform(o);return k},a._engine.setSize=function(b,c){var d=this.canvas.style;this.width=b,this.height=c,b==+b&&(b+="px"),c==+c&&(c+="px"),d.width=b,d.height=c,d.clip="rect(0 "+b+" "+c+" 0)",this._viewBox&&a._engine.setViewBox.apply(this,this._viewBox);return this},a._engine.setViewBox=function(b,c,d,e,f){a.eve("raphael.setViewBox",this,this._viewBox,[b,c,d,e,f]);var h=this.width,i=this.height,j=1/g(d/h,e/i),k,l;f&&(k=i/e,l=h/d,d*k<h&&(b-=(h-d*k)/2/k),e*l<i&&(c-=(i-e*l)/2/l)),this._viewBox=[b,c,d,e,!!f],this._viewBoxShift={dx:-b,dy:-c,scale:j},this.forEach(function(a){a.transform("...")});return this};var F;a._engine.initWin=function(a){var b=a.document;b.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!b.namespaces.rvml&&b.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),F=function(a){return b.createElement("<rvml:"+a+' class="rvml">')}}catch(c){F=function(a){return b.createElement("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},a._engine.initWin(a._g.win),a._engine.create=function(){var b=a._getContainer.apply(0,arguments),c=b.container,d=b.height,e,f=b.width,g=b.x,h=b.y;if(!c)throw new Error("VML container not found.");var i=new a._Paper,j=i.canvas=a._g.doc.createElement("div"),k=j.style;g=g||0,h=h||0,f=f||512,d=d||342,i.width=f,i.height=d,f==+f&&(f+="px"),d==+d&&(d+="px"),i.coordsize=u*1e3+n+u*1e3,i.coordorigin="0 0",i.span=a._g.doc.createElement("span"),i.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",j.appendChild(i.span),k.cssText=a.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",f,d),c==1?(a._g.doc.body.appendChild(j),k.left=g+"px",k.top=h+"px",k.position="absolute"):c.firstChild?c.insertBefore(j,c.firstChild):c.appendChild(j),i.renderfix=function(){};return i},a.prototype.clear=function(){a.eve("raphael.clear",this),this.canvas.innerHTML=o,this.span=a._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},a.prototype.remove=function(){a.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null;return!0};var G=a.st;for(var H in E)E[b](H)&&!G[b](H)&&(G[H]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a].apply(c,b)})}}(H))}(window.Raphael)
;
/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * $.jStorage
 * 
 * USAGE:
 *
 * jStorage requires Prototype, MooTools or jQuery! If jQuery is used, then
 * jQuery-JSON (http://code.google.com/p/jquery-json/) is also needed.
 * (jQuery-JSON needs to be loaded BEFORE jStorage!)
 *
 * Methods:
 *
 * -set(key, value)
 * $.jStorage.set(key, value) -> saves a value
 *
 * -get(key[, default])
 * value = $.jStorage.get(key [, default]) ->
 *    retrieves value if key exists, or default if it doesn't
 *
 * -deleteKey(key)
 * $.jStorage.deleteKey(key) -> removes a key from the storage
 *
 * -flush()
 * $.jStorage.flush() -> clears the cache
 * 
 * -storageObj()
 * $.jStorage.storageObj() -> returns a read-ony copy of the actual storage
 * 
 * -storageSize()
 * $.jStorage.storageSize() -> returns the size of the storage in bytes
 *
 * -index()
 * $.jStorage.index() -> returns the used keys as an array
 * 
 * -storageAvailable()
 * $.jStorage.storageAvailable() -> returns true if storage is available
 * 
 * -reInit()
 * $.jStorage.reInit() -> reloads the data from browser storage
 * 
 * <value> can be any JSON-able value, including objects and arrays.
 *
 **/


(function($){
    if(!$ || !($.toJSON || Object.toJSON || window.JSON)){
        throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");
    }
    
    var
        /* This is the object, that holds the cached values */ 
        _storage = {},

        /* Actual browser storage (localStorage or globalStorage['domain']) */
        _storage_service = {jStorage:"{}"},

        /* DOM element for older IE versions, holds userData behavior */
        _storage_elm = null,
        
        /* How much space does the storage take */
        _storage_size = 0,

        /* function to encode objects to JSON strings */
        json_encode = $.toJSON || Object.toJSON || (window.JSON && (JSON.encode || JSON.stringify)),

        /* function to decode objects from JSON strings */
        json_decode = $.evalJSON || (window.JSON && (JSON.decode || JSON.parse)) || function(str){
            return String(str).evalJSON();
        },
        
        /* which backend is currently used */
        _backend = false,
        
        /**
         * XML encoding and decoding as XML nodes can't be JSON'ized
         * XML nodes are encoded and decoded if the node is the value to be saved
         * but not if it's as a property of another object
         * Eg. -
         *   $.jStorage.set("key", xmlNode);        // IS OK
         *   $.jStorage.set("key", {xml: xmlNode}); // NOT OK
         */
        _XMLService = {
            
            /**
             * Validates a XML node to be XML
             * based on jQuery.isXML function
             */
            isXML: function(elm){
                var documentElement = (elm ? elm.ownerDocument || elm : 0).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            },
            
            /**
             * Encodes a XML node to string
             * based on http://www.mercurytide.co.uk/news/article/issues-when-working-ajax/
             */
            encode: function(xmlNode) {
                if(!this.isXML(xmlNode)){
                    return false;
                }
                try{ // Mozilla, Webkit, Opera
                    return new XMLSerializer().serializeToString(xmlNode);
                }catch(E1) {
                    try {  // IE
                        return xmlNode.xml;
                    }catch(E2){}
                }
                return false;
            },
            
            /**
             * Decodes a XML node from string
             * loosely based on http://outwestmedia.com/jquery-plugins/xmldom/
             */
            decode: function(xmlString){
                var dom_parser = ("DOMParser" in window && (new DOMParser()).parseFromString) ||
                        (window.ActiveXObject && function(_xmlString) {
                    var xml_doc = new ActiveXObject('Microsoft.XMLDOM');
                    xml_doc.async = 'false';
                    xml_doc.loadXML(_xmlString);
                    return xml_doc;
                }),
                resultXML;
                if(!dom_parser){
                    return false;
                }
                resultXML = dom_parser.call("DOMParser" in window && (new DOMParser()) || window, xmlString, 'text/xml');
                return this.isXML(resultXML)?resultXML:false;
            }
        };

    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
     * Initialization function. Detects if the browser supports DOM Storage
     * or userData behavior and behaves accordingly.
     * @returns undefined
     */
    function _init(){
        /* Check if browser supports localStorage */
        var localStorageReallyWorks = false;
        if("localStorage" in window){
            try {
                window.localStorage.setItem('_tmptest', 'tmpval');
                localStorageReallyWorks = true;
                window.localStorage.removeItem('_tmptest');
            } catch(BogusQuotaExceededErrorOnIos5) {
                // Thanks be to iOS5 Private Browsing mode which throws
                // QUOTA_EXCEEDED_ERRROR DOM Exception 22.
            }
        }
        if(localStorageReallyWorks){
            try {
                if(window.localStorage) {
                    _storage_service = window.localStorage;
                    _backend = "localStorage";
                }
            } catch(E3) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports globalStorage */
        else if("globalStorage" in window){
            try {
                if(window.globalStorage) {
                    _storage_service = window.globalStorage[window.location.hostname];
                    _backend = "globalStorage";
                }
            } catch(E4) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports userData behavior */
        else {
            _storage_elm = document.createElement('link');
            if(_storage_elm.addBehavior){

                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                var data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }else{
                _storage_elm = null;
                return;
            }
        }

        _load_storage();
    }
    
    /**
     * Loads the data from the storage based on the supported mechanism
     * @returns undefined
     */
    function _load_storage(){
        /* if jStorage string is retrieved, then decode it */
        if(_storage_service.jStorage){
            try{
                _storage = json_decode(String(_storage_service.jStorage));
            }catch(E6){_storage_service.jStorage = "{}";}
        }else{
            _storage_service.jStorage = "{}";
        }
        _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;    
    }

    /**
     * This functions provides the "save" mechanism to store the jStorage object
     * @returns undefined
     */
    function _save(){
        try{
            _storage_service.jStorage = json_encode(_storage);
            // If userData is used as the storage engine, additional
            if(_storage_elm) {
                _storage_elm.setAttribute("jStorage",_storage_service.jStorage);
                _storage_elm.save("jStorage");
            }
            _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
        }catch(E7){/* probably cache is full, nothing is saved this way*/}
    }

    /**
     * Function checks if a key is set and is string or numberic
     */
    function _checkKey(key){
        if(!key || (typeof key != "string" && typeof key != "number")){
            throw new TypeError('Key name must be string or numeric');
        }
        return true;
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////

    $.jStorage = {
        /* Version number */
        version: "0.1.5.3",

        /**
         * Sets a key's value.
         * 
         * @param {String} key - Key to set. If this value is not set or not
         *              a string an exception is raised.
         * @param value - Value to set. This can be any value that is JSON
         *              compatible (Numbers, Strings, Objects etc.).
         * @returns the used value
         */
        set: function(key, value){
            _checkKey(key);
            if(_XMLService.isXML(value)){
                value = {_is_xml:true,xml:_XMLService.encode(value)};
            }
            _storage[key] = value;
            _save();
            return value;
        },
        
        /**
         * Looks up a key in cache
         * 
         * @param {String} key - Key to look up.
         * @param {mixed} def - Default value to return, if key didn't exist.
         * @returns the key value, default value or <null>
         */
        get: function(key, def){
            _checkKey(key);
            if(key in _storage){
                if(_storage[key] && typeof _storage[key] == "object" &&
                        _storage[key]._is_xml &&
                            _storage[key]._is_xml){
                    return _XMLService.decode(_storage[key].xml);
                }else{
                    return _storage[key];
                }
            }
            return typeof(def) == 'undefined' ? null : def;
        },
        
        /**
         * Deletes a key from cache.
         * 
         * @param {String} key - Key to delete.
         * @returns true if key existed or false if it didn't
         */
        deleteKey: function(key){
            _checkKey(key);
            if(key in _storage){
                delete _storage[key];
                _save();
                return true;
            }
            return false;
        },

        /**
         * Deletes everything in cache.
         * 
         * @returns true
         */
        flush: function(){
            _storage = {};
            _save();
            return true;
        },
        
        /**
         * Returns a read-only copy of _storage
         * 
         * @returns Object
        */
        storageObj: function(){
            function F() {}
            F.prototype = _storage;
            return new F();
        },
        
        /**
         * Returns an index of all used keys as an array
         * ['key1', 'key2',..'keyN']
         * 
         * @returns Array
        */
        index: function(){
            var index = [], i;
            for(i in _storage){
                if(_storage.hasOwnProperty(i)){
                    index.push(i);
                }
            }
            return index;
        },
        
        /**
         * How much space in bytes does the storage take?
         * 
         * @returns Number
         */
        storageSize: function(){
            return _storage_size;
        },
        
        /**
         * Which backend is currently in use?
         * 
         * @returns String
         */
        currentBackend: function(){
            return _backend;
        },
        
        /**
         * Test if storage is available
         * 
         * @returns Boolean
         */
        storageAvailable: function(){
            return !!_backend;
        },
        
        /**
         * Reloads the data from browser storage
         * 
         * @returns undefined
         */
        reInit: function(){
            var new_storage_elm, data;
            if(_storage_elm && _storage_elm.addBehavior){
                new_storage_elm = document.createElement('link');
                
                _storage_elm.parentNode.replaceChild(new_storage_elm, _storage_elm);
                _storage_elm = new_storage_elm;
                
                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }
            
            _load_storage();
        }
    };

    // Initialize jStorage
    _init();

})(window.jQuery || window.$);
// Generated by CoffeeScript 1.6.3
/*
Source, bug reports, examples: https://github.com/tamc/Sankey
Copyright: Thomas Counsell 2010, 2011
Licence: MIT Open Source licence http://www.opensource.org/licenses/mit-license.php
*/



(function() {
  var FlowLine, Sankey, TransformationBox,
    __hasProp = {}.hasOwnProperty,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Sankey = (function() {
    function Sankey() {
      this.display_in_element = 'sankey';
      this.display_width = $("#" + this.display_in_element).width();
      this.display_height = $("#" + this.display_in_element).height();
      this.r = Raphael(this.display_in_element, this.display_width, this.display_height);
      this.left_margin = 100;
      this.right_margin = 100;
      this.y_space = 10;
      this.threshold_for_drawing = 0;
      this.box_width = 50;
      this.flow_edge_width = 2;
      this.flow_curve = 0.25;
      this.boxes = {};
      this.box_array = [];
      this.lines = {};
      this.line_array = [];
      this.stacks = [];
      this.bubbles = [];
      this.bubbleColor = '#000';
      this.bubbleLabelColor = '#fff';
      this.opacity = '1.0';
      this.opacity_highlight = '0.1';
    }

    Sankey.prototype.find_or_create_transformation_box = function(name) {
      var new_box;
      if (this.boxes[name.toLowerCase()] == null) {
        new_box = new TransformationBox(this, name);
        this.boxes[name.toLowerCase()] = new_box;
        this.box_array.push(new_box);
      }
      return this.boxes[name.toLowerCase()];
    };

    Sankey.prototype.lineName = function(start, end) {
      return "" + (start.toLowerCase()) + "-" + (end.toLowerCase());
    };

    Sankey.prototype.createLine = function(datum) {
      var new_line;
      if (datum[0] === 0) {
        return;
      }
      new_line = new FlowLine(this, datum[0], datum[1], datum[2]);
      this.lines[this.lineName(datum[0], datum[2])] = new_line;
      return this.line_array.push(new_line);
    };

    Sankey.prototype.setData = function(data) {
      var datum, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        datum = data[_i];
        _results.push(this.createLine(datum));
      }
      return _results;
    };

    Sankey.prototype.setBubbles = function(data) {
      return this.bubbles = data;
    };

    Sankey.prototype.updateData = function(data) {
      var datum, line, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        datum = data[_i];
        line = this.lines[this.lineName(datum[0], datum[2])];
        if (line) {
          _results.push(line.setFlow(datum[1]));
        } else {
          _results.push(this.createLine(datum));
        }
      }
      return _results;
    };

    Sankey.prototype.convert_flow_values_callback = function(flow) {
      return flow;
    };

    Sankey.prototype.convert_flow_labels_callback = function(flow) {
      return flow;
    };

    Sankey.prototype.convert_box_value_labels_callback = function(flow) {
      return this.convert_flow_labels_callback(flow);
    };

    Sankey.prototype.convert_box_description_labels_callback = function(name) {
      return name;
    };

    Sankey.prototype.convert_bubble_values_callback = function(size) {
      return size;
    };

    Sankey.prototype.convert_bubble_labels_callback = function(size) {
      return size;
    };

    Sankey.prototype.nudge_boxes_callback = function() {
      return void 0;
    };

    Sankey.prototype.nudge_colours_callback = function() {
      return void 0;
    };

    Sankey.prototype.stack = function(x, box_names, y_box) {
      return this.stacks.push({
        x: x,
        box_names: box_names,
        y_box: y_box
      });
    };

    Sankey.prototype.setColors = function(colors) {
      var box, box_name, color, _results;
      _results = [];
      for (box_name in colors) {
        if (!__hasProp.call(colors, box_name)) continue;
        color = colors[box_name];
        box = this.find_or_create_transformation_box(box_name);
        _results.push(box.line_colour = colors[box.name] || colors[box.name.toLowerCase()] || box.line_colour);
      }
      return _results;
    };

    Sankey.prototype.recolour = function(lines, new_colour) {
      var line, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        _results.push(line.colour = new_colour);
      }
      return _results;
    };

    Sankey.prototype.calculateXStep = function() {
      var maximum_x, stack, _i, _len, _ref;
      maximum_x = 0;
      _ref = this.stacks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stack = _ref[_i];
        if (stack.x > maximum_x) {
          maximum_x = stack.x;
        }
      }
      return (this.display_width - this.left_margin - this.right_margin) / maximum_x;
    };

    Sankey.prototype.position_boxes_and_lines = function() {
      var box, bubble, name, stack, x, x_step, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      x_step = this.calculateXStep();
      _ref = this.stacks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stack = _ref[_i];
        x = stack.x;
        if (stack.y_box != null) {
          y = ((_ref1 = this.boxes[stack.y_box.toLowerCase()]) != null ? _ref1.y : void 0) || 10;
        } else {
          y = 10;
        }
        _ref2 = stack.box_names;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          name = _ref2[_j];
          box = this.boxes[name.toLowerCase()];
          if (box == null) {

          } else {
            box.y = y;
            box.x = this.left_margin + (x * x_step);
            y = box.b() + this.y_space;
          }
        }
      }
      this.nudge_boxes_callback();
      _ref3 = this.box_array;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        box = _ref3[_k];
        box.position_and_colour_lines();
      }
      _ref4 = this.bubbles;
      for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
        bubble = _ref4[_l];
        if ((_ref5 = this.boxes[bubble[0]]) != null) {
          _ref5.bubbleValue = bubble[1];
        }
      }
      this.nudge_colours_callback();
      return this.line_array.sort(function(a, b) {
        return b.size - a.size;
      });
    };

    Sankey.prototype.draw = function() {
      var box, line, _i, _j, _len, _len1, _ref, _ref1, _results;
      this.position_boxes_and_lines();
      _ref = this.line_array;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (line.size > this.threshold_for_drawing) {
          line.draw(this.r);
        }
      }
      _ref1 = this.box_array;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        box = _ref1[_j];
        if (box.size() > this.threshold_for_drawing) {
          _results.push(box.draw(this.r));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Sankey.prototype.redraw = function() {
      var box, line, _i, _j, _len, _len1, _ref, _ref1, _results;
      this.position_boxes_and_lines();
      _ref = this.line_array;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        line.redraw(this.r);
      }
      _ref1 = this.box_array;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        box = _ref1[_j];
        _results.push(box.redraw(this.r));
      }
      return _results;
    };

    Sankey.prototype.fade_unless_highlighted = function() {
      var box, line, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.line_array;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        line.fade_unless_highlighted();
        void 0;
      }
      _ref1 = this.box_array;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        box = _ref1[_j];
        box.fade_unless_highlighted();
        _results.push(void 0);
      }
      return _results;
    };

    Sankey.prototype.un_fade = function() {
      var box, line, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.line_array;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        line.un_fade();
        void 0;
      }
      _ref1 = this.box_array;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        box = _ref1[_j];
        box.un_fade();
        _results.push(void 0);
      }
      return _results;
    };

    return Sankey;

  })();

  FlowLine = (function() {
    function FlowLine(sankey, left_box_name, flow, right_box_name) {
      this.sankey = sankey;
      this.hover_stop = __bind(this.hover_stop, this);
      this.hover_start = __bind(this.hover_start, this);
      this.setFlow(flow);
      this.colour = void 0;
      this.ox = 0;
      this.oy = 0;
      this.dx = 0;
      this.dy = 0;
      this.left_box = this.sankey.find_or_create_transformation_box(left_box_name);
      this.right_box = this.sankey.find_or_create_transformation_box(right_box_name);
      this.left_box.right_lines.push(this);
      this.right_box.left_lines.push(this);
    }

    FlowLine.prototype.setFlow = function(flow) {
      this.flow = flow;
      return this.size = this.sankey.convert_flow_values_callback(this.flow);
    };

    FlowLine.prototype.labelText = function() {
      return this.sankey.convert_flow_labels_callback(this.flow);
    };

    FlowLine.prototype.path = function() {
      var curve;
      curve = (this.dx - this.ox) * this.sankey.flow_curve;
      return "M " + this.ox + "," + this.oy + " Q " + (this.ox + curve) + "," + this.oy + " " + ((this.ox + this.dx) / 2) + "," + ((this.oy + this.dy) / 2) + " Q " + (this.dx - curve) + "," + this.dy + " " + this.dx + "," + this.dy;
    };

    FlowLine.prototype.innerWidth = function() {
      if (this.size > this.sankey.flow_edge_width) {
        return this.size - this.sankey.flow_edge_width;
      }
      return this.size;
    };

    FlowLine.prototype.innerColor = function() {
      var c;
      c = Raphael.rgb2hsb(this.colour);
      if (c.h !== 0 && c.s !== 0) {
        if (c.b > 0.5) {
          c.b = c.b - 0.15;
        } else {
          c.b = c.b + 0.15;
        }
      }
      return Raphael.hsb2rgb(c.h, c.s, c.b);
    };

    FlowLine.prototype.draw = function(r) {
      this.outer_line = r.path(this.path()).attr({
        'stroke-width': this.size,
        'stroke': this.colour
      });
      this.inner_line = r.path(this.path()).attr({
        'stroke-width': this.innerWidth(),
        'stroke': this.innerColor()
      });
      r.set().push(this.inner_line, this.outer_line).hover(this.hover_start, this.hover_stop);
      this.left_label = r.text(this.ox + 1, this.oy - (this.size / 2) - 5, this.labelText()).attr({
        'text-anchor': 'start'
      });
      this.right_label = r.text(this.dx - 1, this.dy - (this.size / 2) - 5, this.labelText()).attr({
        'text-anchor': 'end'
      });
      this.left_label.hide();
      return this.right_label.hide();
    };

    FlowLine.prototype.hover_start = function(event) {
      this.highlight(true, true);
      return this.sankey.fade_unless_highlighted();
    };

    FlowLine.prototype.hover_stop = function(event) {
      this.un_highlight(true, true);
      return this.sankey.un_fade();
    };

    FlowLine.prototype.redraw = function(r) {
      if (this.outer_line == null) {
        this.draw(r);
      }
      this.outer_line.attr({
        path: this.path(),
        'stroke-width': this.size
      });
      this.inner_line.attr({
        path: this.path(),
        'stroke-width': this.innerWidth()
      });
      this.left_label.attr({
        text: this.labelText(),
        x: this.ox + 1,
        y: this.oy - (this.size / 2) - 5
      });
      return this.right_label.attr({
        text: this.labelText(),
        x: this.dx - 1,
        y: this.dy - (this.size / 2) - 5
      });
    };

    FlowLine.prototype.fade_unless_highlighted = function() {
      if (this.outer_line == null) {
        return false;
      }
      if (this.inner_line == null) {
        return false;
      }
      if (this.highlighed === true) {
        return false;
      }
      this.outer_line.attr({
        'opacity': this.sankey.opacity_highlight
      });
      return this.inner_line.attr({
        'opacity': this.sankey.opacity_highlight
      });
    };

    FlowLine.prototype.un_fade = function() {
      if (this.outer_line == null) {
        return false;
      }
      if (this.inner_line == null) {
        return false;
      }
      if (this.highlighed === true) {
        return false;
      }
      this.outer_line.attr({
        'opacity': this.sankey.opacity
      });
      return this.inner_line.attr({
        'opacity': this.sankey.opacity
      });
    };

    FlowLine.prototype.highlight = function(left, right) {
      if (this.outer_line == null) {
        return false;
      }
      if (this.inner_line == null) {
        return false;
      }
      this.highlighed = true;
      if (left) {
        this.left_label.toFront();
        this.left_label.show();
        this.left_box.highlight();
      }
      if (right) {
        this.right_label.toFront();
        this.right_label.show();
        return this.right_box.highlight();
      }
    };

    FlowLine.prototype.un_highlight = function(left, right) {
      if (this.outer_line == null) {
        return false;
      }
      this.highlighed = false;
      if (left) {
        this.left_label.hide();
        this.left_box.un_highlight();
      }
      if (right) {
        this.right_label.hide();
        return this.right_box.un_highlight();
      }
    };

    return FlowLine;

  })();

  TransformationBox = (function() {
    function TransformationBox(sankey, name) {
      this.sankey = sankey;
      this.name = name;
      this.hover_end = __bind(this.hover_end, this);
      this.hover_start = __bind(this.hover_start, this);
      this.label_text = this.sankey.convert_box_description_labels_callback(name);
      this.line_colour = "orange";
      this.left_lines = [];
      this.right_lines = [];
      this.x = 0;
      this.y = 0;
      this.bubbleValue = null;
    }

    TransformationBox.prototype.b = function() {
      return this.y + this.size();
    };

    TransformationBox.prototype.is_left_box = function() {
      return this.left_lines.length === 0;
    };

    TransformationBox.prototype.is_right_box = function() {
      return this.right_lines.length === 0;
    };

    TransformationBox.prototype.size = function() {
      var line, lines, s, _i, _len;
      s = 0;
      if (this.is_left_box()) {
        lines = this.right_lines;
      } else {
        lines = this.left_lines;
      }
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line.size > this.sankey.threshold_for_drawing) {
          s = s + line.size;
        }
      }
      return s;
    };

    TransformationBox.prototype.flow = function() {
      var line, lines, s, _i, _len;
      s = 0;
      if (this.is_left_box()) {
        lines = this.right_lines;
      } else {
        lines = this.left_lines;
      }
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (line.size > this.sankey.threshold_for_drawing) {
          s = s + line.flow;
        }
      }
      return s;
    };

    TransformationBox.prototype.position_and_colour_lines = function() {
      var box_width, left_lines, line, ly, right_lines, ry, _i, _j, _len, _len1, _results;
      ly = this.y;
      left_lines = this.left_lines;
      left_lines.sort(function(a, b) {
        return a.left_box.y - b.left_box.y;
      });
      for (_i = 0, _len = left_lines.length; _i < _len; _i++) {
        line = left_lines[_i];
        line.dx = this.x;
        line.dy = ly + (line.size / 2);
        ly = ly + line.size;
      }
      ry = this.y;
      right_lines = this.right_lines;
      right_lines.sort(function(a, b) {
        return a.right_box.y - b.right_box.y;
      });
      box_width = this.sankey.box_width;
      _results = [];
      for (_j = 0, _len1 = right_lines.length; _j < _len1; _j++) {
        line = right_lines[_j];
        if (line.colour == null) {
          line.colour = this.line_colour;
        }
        line.ox = this.x + box_width;
        line.oy = ry + (line.size / 2);
        _results.push(ry = ry + line.size);
      }
      return _results;
    };

    TransformationBox.prototype.valueLabelText = function() {
      return this.sankey.convert_box_value_labels_callback(this.flow());
    };

    TransformationBox.prototype.descriptionLabelText = function() {
      return this.label_text;
    };

    TransformationBox.prototype.labelPositionX = function() {
      if (this.is_left_box()) {
        return this.x - 3.0;
      }
      if (this.is_right_box()) {
        return this.x + this.sankey.box_width + 3.0;
      }
      return this.x + (this.sankey.box_width / 2);
    };

    TransformationBox.prototype.labelPositionY = function() {
      return this.y + (this.size() / 2);
    };

    TransformationBox.prototype.labelAttributes = function() {
      if (this.is_left_box()) {
        return {
          'text-anchor': 'end'
        };
      }
      if (this.is_right_box()) {
        return {
          'text-anchor': 'start'
        };
      }
      return {};
    };

    TransformationBox.prototype.numberLabelPositionX = function() {
      return this.x + (this.sankey.box_width / 2);
    };

    TransformationBox.prototype.numberLabelPositionY = function() {
      return this.y - 5;
    };

    TransformationBox.prototype.bubbleSize = function() {
      return Math.sqrt(this.sankey.convert_bubble_values_callback(Math.abs(this.bubbleValue)));
    };

    TransformationBox.prototype.bubbleLabel = function() {
      return this.sankey.convert_bubble_labels_callback(this.bubbleValue);
    };

    TransformationBox.prototype.bubbleColourForValue = function() {
      if (this.bubbleValue > 0) {
        return this.sankey.bubbleColor;
      }
      if (this.sankey.negativeBubbleColor == null) {
        return this.sankey.bubbleColor;
      }
      return this.sankey.negativeBubbleColor;
    };

    TransformationBox.prototype.bubbleLabelColourForValue = function() {
      if (this.bubbleValue > 0) {
        return this.sankey.bubbleLabelColor;
      }
      if (this.sankey.negativeBubbleLabelColor == null) {
        return this.sankey.bubbleLabelColor;
      }
      return this.sankey.negativeBubbleLabelColor;
    };

    TransformationBox.prototype.draw = function(r) {
      var box_width;
      if (!(this.size() > this.sankey.threshold_for_drawing)) {
        return false;
      }
      box_width = this.sankey.box_width;
      this.box = r.rect(this.x, this.y, box_width, this.size()).attr({
        'fill': "#E8E2FF",
        "stroke": "#D4CBF2"
      });
      this.label = r.text(this.labelPositionX(), this.labelPositionY(), this.descriptionLabelText()).attr(this.labelAttributes());
      if (this.bubbleValue != null) {
        this.bubble_circle = r.circle(this.x + box_width, this.y, this.bubbleSize()).attr({
          'fill': this.bubbleColourForValue(),
          'stroke-width': 0
        });
        this.bubble_label = r.text(this.x + box_width, this.y, this.bubbleLabel()).attr({
          'stroke': this.bubbleLabelColourForValue(),
          'text-anchor': 'middle'
        });
      }
      this.number_label = r.text(this.numberLabelPositionX(), this.numberLabelPositionY(), this.valueLabelText());
      this.number_label.hide();
      return r.set().push(this.number_label, this.label, this.box, this.bubble_circle, this.bubble_label).hover(this.hover_start, this.hover_end);
    };

    TransformationBox.prototype.redraw = function(r) {
      if (this.box == null) {
        this.draw(r);
      }
      if (this.box == null) {
        return;
      }
      this.box.attr({
        y: this.y,
        height: this.size()
      });
      this.label.attr({
        y: this.labelPositionY()
      });
      this.number_label.attr({
        y: this.numberLabelPositionY(),
        text: this.valueLabelText()
      });
      if (this.bubbleValue != null) {
        if (this.bubble_circle != null) {
          this.bubble_circle.attr({
            cy: this.y,
            r: this.bubbleSize(),
            fill: this.bubbleColourForValue()
          });
          this.bubble_label.attr({
            y: this.y,
            text: this.bubbleLabel(),
            'stroke': this.bubbleLabelColourForValue()
          });
        } else {
          this.draw(r);
        }
      }
      if (this.size() <= this.sankey.threshold_for_drawing) {
        this.box.hide();
        this.label.hide();
        if (this.bubble_circle != null) {
          return this.bubble_circle.hide();
        }
      } else {
        this.box.show();
        this.label.show();
        if (this.bubble_circle != null) {
          return this.bubble_circle.show();
        }
      }
    };

    TransformationBox.prototype.hover_start = function() {
      var line, _i, _j, _len, _len1, _ref, _ref1;
      this.highlight();
      this.number_label.toFront();
      this.number_label.show();
      _ref = this.left_lines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        line.highlight(true, false);
      }
      _ref1 = this.right_lines;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        line = _ref1[_j];
        line.highlight(false, true);
      }
      return this.sankey.fade_unless_highlighted();
    };

    TransformationBox.prototype.hover_end = function() {
      var line, _i, _j, _len, _len1, _ref, _ref1;
      this.un_highlight();
      this.number_label.hide();
      _ref = this.left_lines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        line.un_highlight(true, false);
      }
      _ref1 = this.right_lines;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        line = _ref1[_j];
        line.un_highlight(false, true);
      }
      return this.sankey.un_fade();
    };

    TransformationBox.prototype.highlight = function() {
      if (this.box == null) {
        return false;
      }
      return this.highlighed = true;
    };

    TransformationBox.prototype.un_highlight = function() {
      if (this.box == null) {
        return false;
      }
      return this.highlighed = false;
    };

    TransformationBox.prototype.fade_unless_highlighted = function() {
      if (this.box == null) {
        return false;
      }
      if (this.highlighed === true) {
        return false;
      }
      this.box.attr({
        'opacity': this.sankey.opacity_highlight
      });
      this.label.attr({
        'opacity': this.sankey.opacity_highlight
      });
      if (this.bubble_circle != null) {
        this.bubble_circle.attr({
          'opacity': this.sankey.opacity_highlight
        });
      }
      if (this.bubble_label != null) {
        return this.bubble_label.attr({
          'opacity': this.sankey.opacity_highlight
        });
      }
    };

    TransformationBox.prototype.un_fade = function() {
      if (this.box == null) {
        return false;
      }
      if (this.highlighed === true) {
        return false;
      }
      this.box.attr({
        'opacity': this.sankey.opacity
      });
      this.label.attr({
        'opacity': this.sankey.opacity
      });
      if (this.bubble_circle != null) {
        this.bubble_circle.attr({
          'opacity': this.sankey.opacity
        });
      }
      if (this.bubble_label != null) {
        return this.bubble_label.attr({
          'opacity': this.sankey.opacity
        });
      }
    };

    return TransformationBox;

  })();

  window.Sankey = Sankey;

}).call(this);
/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 *
 * @version 1.09i
 */

var Cufon=(function(){var m=function(){return m.replace.apply(null,arguments)};var x=m.DOM={ready:(function(){var C=false,E={loaded:1,complete:1};var B=[],D=function(){if(C){return}C=true;for(var F;F=B.shift();F()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",D,false);window.addEventListener("pageshow",D,false)}if(!window.opera&&document.readyState){(function(){E[document.readyState]?D():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");D()}catch(F){setTimeout(arguments.callee,1)}})()}q(window,"load",D);return function(F){if(!arguments.length){D()}else{C?F():B.push(F)}}})(),root:function(){return document.documentElement||document.body}};var n=m.CSS={Size:function(C,B){this.value=parseFloat(C);this.unit=String(C).match(/[a-z%]*$/)[0]||"px";this.convert=function(D){return D/B*this.value};this.convertFrom=function(D){return D/this.value*B};this.toString=function(){return this.value+this.unit}},addClass:function(C,B){var D=C.className;C.className=D+(D&&" ")+B;return C},color:j(function(C){var B={};B.color=C.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(E,D,F){B.opacity=parseFloat(F);return"rgb("+D+")"});return B}),fontStretch:j(function(B){if(typeof B=="number"){return B}if(/%$/.test(B)){return parseFloat(B)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[B]||1}),getStyle:function(C){var B=document.defaultView;if(B&&B.getComputedStyle){return new a(B.getComputedStyle(C,null))}if(C.currentStyle){return new a(C.currentStyle)}return new a(C.style)},gradient:j(function(F){var G={id:F,type:F.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},C=F.substr(F.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var E=0,B=C.length,D;E<B;++E){D=C[E].split("=",2).reverse();G.stops.push([D[1]||E/(B-1),D[0]])}return G}),quotedList:j(function(E){var D=[],C=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,B;while(B=C.exec(E)){D.push(B[3]||B[1])}return D}),recognizesMedia:j(function(G){var E=document.createElement("style"),D,C,B;E.type="text/css";E.media=G;try{E.appendChild(document.createTextNode("/**/"))}catch(F){}C=g("head")[0];C.insertBefore(E,C.firstChild);D=(E.sheet||E.styleSheet);B=D&&!D.disabled;C.removeChild(E);return B}),removeClass:function(D,C){var B=RegExp("(?:^|\\s+)"+C+"(?=\\s|$)","g");D.className=D.className.replace(B,"");return D},supports:function(D,C){var B=document.createElement("span").style;if(B[D]===undefined){return false}B[D]=C;return B[D]===C},textAlign:function(E,D,B,C){if(D.get("textAlign")=="right"){if(B>0){E=" "+E}}else{if(B<C-1){E+=" "}}return E},textShadow:j(function(F){if(F=="none"){return null}var E=[],G={},B,C=0;var D=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(B=D.exec(F)){if(B[0]==","){E.push(G);G={};C=0}else{if(B[1]){G.color=B[1]}else{G[["offX","offY","blur"][C++]]=B[2]}}}E.push(G);return E}),textTransform:(function(){var B={uppercase:function(C){return C.toUpperCase()},lowercase:function(C){return C.toLowerCase()},capitalize:function(C){return C.replace(/\b./g,function(D){return D.toUpperCase()})}};return function(E,D){var C=B[D.get("textTransform")];return C?C(E):E}})(),whiteSpace:(function(){var D={inline:1,"inline-block":1,"run-in":1};var C=/^\s+/,B=/\s+$/;return function(H,F,G,E){if(E){if(E.nodeName.toLowerCase()=="br"){H=H.replace(C,"")}}if(D[F.get("display")]){return H}if(!G.previousSibling){H=H.replace(C,"")}if(!G.nextSibling){H=H.replace(B,"")}return H}})()};n.ready=(function(){var B=!n.recognizesMedia("all"),E=false;var D=[],H=function(){B=true;for(var K;K=D.shift();K()){}};var I=g("link"),J=g("style");function C(K){return K.disabled||G(K.sheet,K.media||"screen")}function G(M,P){if(!n.recognizesMedia(P||"all")){return true}if(!M||M.disabled){return false}try{var Q=M.cssRules,O;if(Q){search:for(var L=0,K=Q.length;O=Q[L],L<K;++L){switch(O.type){case 2:break;case 3:if(!G(O.styleSheet,O.media.mediaText)){return false}break;default:break search}}}}catch(N){}return true}function F(){if(document.createStyleSheet){return true}var L,K;for(K=0;L=I[K];++K){if(L.rel.toLowerCase()=="stylesheet"&&!C(L)){return false}}for(K=0;L=J[K];++K){if(!C(L)){return false}}return true}x.ready(function(){if(!E){E=n.getStyle(document.body).isUsable()}if(B||(E&&F())){H()}else{setTimeout(arguments.callee,10)}});return function(K){if(B){K()}else{D.push(K)}}})();function s(D){var C=this.face=D.face,B={"\u0020":1,"\u00a0":1,"\u3000":1};this.glyphs=D.glyphs;this.w=D.w;this.baseSize=parseInt(C["units-per-em"],10);this.family=C["font-family"].toLowerCase();this.weight=C["font-weight"];this.style=C["font-style"]||"normal";this.viewBox=(function(){var F=C.bbox.split(/\s+/);var E={minX:parseInt(F[0],10),minY:parseInt(F[1],10),maxX:parseInt(F[2],10),maxY:parseInt(F[3],10)};E.width=E.maxX-E.minX;E.height=E.maxY-E.minY;E.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return E})();this.ascent=-parseInt(C.ascent,10);this.descent=-parseInt(C.descent,10);this.height=-this.ascent+this.descent;this.spacing=function(L,N,E){var O=this.glyphs,M,K,G,P=[],F=0,J=-1,I=-1,H;while(H=L[++J]){M=O[H]||this.missingGlyph;if(!M){continue}if(K){F-=G=K[H]||0;P[I]-=G}F+=P[++I]=~~(M.w||this.w)+N+(B[H]?E:0);K=M.k}P.total=F;return P}}function f(){var C={},B={oblique:"italic",italic:"oblique"};this.add=function(D){(C[D.style]||(C[D.style]={}))[D.weight]=D};this.get=function(H,I){var G=C[H]||C[B[H]]||C.normal||C.italic||C.oblique;if(!G){return null}I={normal:400,bold:700}[I]||parseInt(I,10);if(G[I]){return G[I]}var E={1:1,99:0}[I%100],K=[],F,D;if(E===undefined){E=I>400}if(I==500){I=400}for(var J in G){if(!k(G,J)){continue}J=parseInt(J,10);if(!F||J<F){F=J}if(!D||J>D){D=J}K.push(J)}if(I<F){I=F}if(I>D){I=D}K.sort(function(M,L){return(E?(M>=I&&L>=I)?M<L:M>L:(M<=I&&L<=I)?M>L:M<L)?-1:1});return G[K[0]]}}function r(){function D(F,G){if(F.contains){return F.contains(G)}return F.compareDocumentPosition(G)&16}function B(G){var F=G.relatedTarget;if(!F||D(this,F)){return}C(this,G.type=="mouseover")}function E(F){C(this,F.type=="mouseenter")}function C(F,G){setTimeout(function(){var H=d.get(F).options;m.replace(F,G?h(H,H.hover):H,true)},10)}this.attach=function(F){if(F.onmouseenter===undefined){q(F,"mouseover",B);q(F,"mouseout",B)}else{q(F,"mouseenter",E);q(F,"mouseleave",E)}}}function u(){var C=[],D={};function B(H){var E=[],G;for(var F=0;G=H[F];++F){E[F]=C[D[G]]}return E}this.add=function(F,E){D[F]=C.push(E)-1};this.repeat=function(){var E=arguments.length?B(arguments):C,F;for(var G=0;F=E[G++];){m.replace(F[0],F[1],true)}}}function A(){var D={},B=0;function C(E){return E.cufid||(E.cufid=++B)}this.get=function(E){var F=C(E);return D[F]||(D[F]={})}}function a(B){var D={},C={};this.extend=function(E){for(var F in E){if(k(E,F)){D[F]=E[F]}}return this};this.get=function(E){return D[E]!=undefined?D[E]:B[E]};this.getSize=function(F,E){return C[F]||(C[F]=new n.Size(this.get(F),E))};this.isUsable=function(){return !!B}}function q(C,B,D){if(C.addEventListener){C.addEventListener(B,D,false)}else{if(C.attachEvent){C.attachEvent("on"+B,function(){return D.call(C,window.event)})}}}function v(C,B){var D=d.get(C);if(D.options){return C}if(B.hover&&B.hoverables[C.nodeName.toLowerCase()]){b.attach(C)}D.options=B;return C}function j(B){var C={};return function(D){if(!k(C,D)){C[D]=B.apply(null,arguments)}return C[D]}}function c(F,E){var B=n.quotedList(E.get("fontFamily").toLowerCase()),D;for(var C=0;D=B[C];++C){if(i[D]){return i[D].get(E.get("fontStyle"),E.get("fontWeight"))}}return null}function g(B){return document.getElementsByTagName(B)}function k(C,B){return C.hasOwnProperty(B)}function h(){var C={},B,F;for(var E=0,D=arguments.length;B=arguments[E],E<D;++E){for(F in B){if(k(B,F)){C[F]=B[F]}}}return C}function o(E,M,C,N,F,D){var K=document.createDocumentFragment(),H;if(M===""){return K}var L=N.separate;var I=M.split(p[L]),B=(L=="words");if(B&&t){if(/^\s/.test(M)){I.unshift("")}if(/\s$/.test(M)){I.push("")}}for(var J=0,G=I.length;J<G;++J){H=z[N.engine](E,B?n.textAlign(I[J],C,J,G):I[J],C,N,F,D,J<G-1);if(H){K.appendChild(H)}}return K}function l(D,M){var C=D.nodeName.toLowerCase();if(M.ignore[C]){return}var E=!M.textless[C];var B=n.getStyle(v(D,M)).extend(M);var F=c(D,B),G,K,I,H,L,J;if(!F){return}for(G=D.firstChild;G;G=I){K=G.nodeType;I=G.nextSibling;if(E&&K==3){if(H){H.appendData(G.data);D.removeChild(G)}else{H=G}if(I){continue}}if(H){D.replaceChild(o(F,n.whiteSpace(H.data,B,H,J),B,M,G,D),H);H=null}if(K==1){if(G.firstChild){if(G.nodeName.toLowerCase()=="cufon"){z[M.engine](F,null,B,M,G,D)}else{arguments.callee(G,M)}}J=G}}}var t=" ".split(/\s+/).length==0;var d=new A();var b=new r();var y=new u();var e=false;var z={},i={},w={autoDetect:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},ignore:{applet:1,canvas:1,col:1,colgroup:1,head:1,iframe:1,map:1,optgroup:1,option:1,script:1,select:1,style:1,textarea:1,title:1,pre:1},printable:true,selector:(window.Sizzle||(window.jQuery&&function(B){return jQuery(B)})||(window.dojo&&dojo.query)||(window.Ext&&Ext.query)||(window.YAHOO&&YAHOO.util&&YAHOO.util.Selector&&YAHOO.util.Selector.query)||(window.$$&&function(B){return $$(B)})||(window.$&&function(B){return $(B)})||(document.querySelectorAll&&function(B){return document.querySelectorAll(B)})||g),separate:"words",textless:{dl:1,html:1,ol:1,table:1,tbody:1,thead:1,tfoot:1,tr:1,ul:1},textShadow:"none"};var p={words:/\s/.test("\u00a0")?/[^\S\u00a0]+/:/\s+/,characters:"",none:/^/};m.now=function(){x.ready();return m};m.refresh=function(){y.repeat.apply(y,arguments);return m};m.registerEngine=function(C,B){if(!B){return m}z[C]=B;return m.set("engine",C)};m.registerFont=function(D){if(!D){return m}var B=new s(D),C=B.family;if(!i[C]){i[C]=new f()}i[C].add(B);return m.set("fontFamily",'"'+C+'"')};m.replace=function(D,C,B){C=h(w,C);if(!C.engine){return m}if(!e){n.addClass(x.root(),"cufon-active cufon-loading");n.ready(function(){n.addClass(n.removeClass(x.root(),"cufon-loading"),"cufon-ready")});e=true}if(C.hover){C.forceHitArea=true}if(C.autoDetect){delete C.fontFamily}if(typeof C.textShadow=="string"){C.textShadow=n.textShadow(C.textShadow)}if(typeof C.color=="string"&&/^-/.test(C.color)){C.textGradient=n.gradient(C.color)}else{delete C.textGradient}if(!B){y.add(D,arguments)}if(D.nodeType||typeof D=="string"){D=[D]}n.ready(function(){for(var F=0,E=D.length;F<E;++F){var G=D[F];if(typeof G=="string"){m.replace(C.selector(G),C,true)}else{l(G,C)}}});return m};m.set=function(B,C){w[B]=C;return m};return m})();Cufon.registerEngine("vml",(function(){var e=document.namespaces;if(!e){return}e.add("cvml","urn:schemas-microsoft-com:vml");e=null;var b=document.createElement("cvml:shape");b.style.behavior="url(#default#VML)";if(!b.coordsize){return}b=null;var h=(document.documentMode||0)<8;document.write(('<style type="text/css">cufoncanvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}cufoncanvas{position:absolute;text-align:left;}cufon{display:inline-block;position:relative;vertical-align:'+(h?"middle":"text-bottom")+";}cufon cufontext{position:absolute;left:-10000in;font-size:1px;}a cufon{cursor:pointer}}@media print{cufon cufoncanvas{display:none;}}</style>").replace(/;/g,"!important;"));function c(i,j){return a(i,/(?:em|ex|%)$|^[a-z-]+$/i.test(j)?"1em":j)}function a(l,m){if(m==="0"){return 0}if(/px$/i.test(m)){return parseFloat(m)}var k=l.style.left,j=l.runtimeStyle.left;l.runtimeStyle.left=l.currentStyle.left;l.style.left=m.replace("%","em");var i=l.style.pixelLeft;l.style.left=k;l.runtimeStyle.left=j;return i}function f(l,k,j,n){var i="computed"+n,m=k[i];if(isNaN(m)){m=k.get(n);k[i]=m=(m=="normal")?0:~~j.convertFrom(a(l,m))}return m}var g={};function d(p){var q=p.id;if(!g[q]){var n=p.stops,o=document.createElement("cvml:fill"),i=[];o.type="gradient";o.angle=180;o.focus="0";o.method="sigma";o.color=n[0][1];for(var m=1,l=n.length-1;m<l;++m){i.push(n[m][0]*100+"% "+n[m][1])}o.colors=i.join(",");o.color2=n[l][1];g[q]=o}return g[q]}return function(ac,G,Y,C,K,ad,W){var n=(G===null);if(n){G=K.alt}var I=ac.viewBox;var p=Y.computedFontSize||(Y.computedFontSize=new Cufon.CSS.Size(c(ad,Y.get("fontSize"))+"px",ac.baseSize));var y,q;if(n){y=K;q=K.firstChild}else{y=document.createElement("cufon");y.className="cufon cufon-vml";y.alt=G;q=document.createElement("cufoncanvas");y.appendChild(q);if(C.printable){var Z=document.createElement("cufontext");Z.appendChild(document.createTextNode(G));y.appendChild(Z)}if(!W){y.appendChild(document.createElement("cvml:shape"))}}var ai=y.style;var R=q.style;var l=p.convert(I.height),af=Math.ceil(l);var V=af/l;var P=V*Cufon.CSS.fontStretch(Y.get("fontStretch"));var U=I.minX,T=I.minY;R.height=af;R.top=Math.round(p.convert(T-ac.ascent));R.left=Math.round(p.convert(U));ai.height=p.convert(ac.height)+"px";var F=Y.get("color");var ag=Cufon.CSS.textTransform(G,Y).split("");var L=ac.spacing(ag,f(ad,Y,p,"letterSpacing"),f(ad,Y,p,"wordSpacing"));if(!L.length){return null}var k=L.total;var x=-U+k+(I.width-L[L.length-1]);var ah=p.convert(x*P),X=Math.round(ah);var O=x+","+I.height,m;var J="r"+O+"ns";var u=C.textGradient&&d(C.textGradient);var o=ac.glyphs,S=0;var H=C.textShadow;var ab=-1,aa=0,w;while(w=ag[++ab]){var D=o[ag[ab]]||ac.missingGlyph,v;if(!D){continue}if(n){v=q.childNodes[aa];while(v.firstChild){v.removeChild(v.firstChild)}}else{v=document.createElement("cvml:shape");q.appendChild(v)}v.stroked="f";v.coordsize=O;v.coordorigin=m=(U-S)+","+T;v.path=(D.d?"m"+D.d+"xe":"")+"m"+m+J;v.fillcolor=F;if(u){v.appendChild(u.cloneNode(false))}var ae=v.style;ae.width=X;ae.height=af;if(H){var s=H[0],r=H[1];var B=Cufon.CSS.color(s.color),z;var N=document.createElement("cvml:shadow");N.on="t";N.color=B.color;N.offset=s.offX+","+s.offY;if(r){z=Cufon.CSS.color(r.color);N.type="double";N.color2=z.color;N.offset2=r.offX+","+r.offY}N.opacity=B.opacity||(z&&z.opacity)||1;v.appendChild(N)}S+=L[aa++]}var M=v.nextSibling,t,A;if(C.forceHitArea){if(!M){M=document.createElement("cvml:rect");M.stroked="f";M.className="cufon-vml-cover";t=document.createElement("cvml:fill");t.opacity=0;M.appendChild(t);q.appendChild(M)}A=M.style;A.width=X;A.height=af}else{if(M){q.removeChild(M)}}ai.width=Math.max(Math.ceil(p.convert(k*P)),0);if(h){var Q=Y.computedYAdjust;if(Q===undefined){var E=Y.get("lineHeight");if(E=="normal"){E="1em"}else{if(!isNaN(E)){E+="em"}}Y.computedYAdjust=Q=0.5*(a(ad,E)-parseFloat(ai.height))}if(Q){ai.marginTop=Math.ceil(Q)+"px";ai.marginBottom=Q+"px"}}return y}})());Cufon.registerEngine("canvas",(function(){var b=document.createElement("canvas");if(!b||!b.getContext||!b.getContext.apply){return}b=null;var a=Cufon.CSS.supports("display","inline-block");var e=!a&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var f=document.createElement("style");f.type="text/css";f.appendChild(document.createTextNode(("cufon{text-indent:0;}@media screen,projection{cufon{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(e?"":"font-size:1px;line-height:1px;")+"}cufon cufontext{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(a?"cufon canvas{position:relative;}":"cufon canvas{position:absolute;}")+"}@media print{cufon{padding:0;}cufon canvas{display:none;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(f);function d(p,h){var n=0,m=0;var g=[],o=/([mrvxe])([^a-z]*)/g,k;generate:for(var j=0;k=o.exec(p);++j){var l=k[2].split(",");switch(k[1]){case"v":g[j]={m:"bezierCurveTo",a:[n+~~l[0],m+~~l[1],n+~~l[2],m+~~l[3],n+=~~l[4],m+=~~l[5]]};break;case"r":g[j]={m:"lineTo",a:[n+=~~l[0],m+=~~l[1]]};break;case"m":g[j]={m:"moveTo",a:[n=~~l[0],m=~~l[1]]};break;case"x":g[j]={m:"closePath"};break;case"e":break generate}h[g[j].m].apply(h,g[j].a)}return g}function c(m,k){for(var j=0,h=m.length;j<h;++j){var g=m[j];k[g.m].apply(k,g.a)}}return function(V,w,P,t,C,W){var k=(w===null);if(k){w=C.getAttribute("alt")}var A=V.viewBox;var m=P.getSize("fontSize",V.baseSize);var B=0,O=0,N=0,u=0;var z=t.textShadow,L=[];if(z){for(var U=z.length;U--;){var F=z[U];var K=m.convertFrom(parseFloat(F.offX));var I=m.convertFrom(parseFloat(F.offY));L[U]=[K,I];if(I<B){B=I}if(K>O){O=K}if(I>N){N=I}if(K<u){u=K}}}var Z=Cufon.CSS.textTransform(w,P).split("");var E=V.spacing(Z,~~m.convertFrom(parseFloat(P.get("letterSpacing"))||0),~~m.convertFrom(parseFloat(P.get("wordSpacing"))||0));if(!E.length){return null}var h=E.total;O+=A.width-E[E.length-1];u+=A.minX;var s,n;if(k){s=C;n=C.firstChild}else{s=document.createElement("cufon");s.className="cufon cufon-canvas";s.setAttribute("alt",w);n=document.createElement("canvas");s.appendChild(n);if(t.printable){var S=document.createElement("cufontext");S.appendChild(document.createTextNode(w));s.appendChild(S)}}var aa=s.style;var H=n.style;var j=m.convert(A.height);var Y=Math.ceil(j);var M=Y/j;var G=M*Cufon.CSS.fontStretch(P.get("fontStretch"));var J=h*G;var Q=Math.ceil(m.convert(J+O-u));var o=Math.ceil(m.convert(A.height-B+N));n.width=Q;n.height=o;H.width=Q+"px";H.height=o+"px";B+=A.minY;H.top=Math.round(m.convert(B-V.ascent))+"px";H.left=Math.round(m.convert(u))+"px";var r=Math.max(Math.ceil(m.convert(J)),0)+"px";if(a){aa.width=r;aa.height=m.convert(V.height)+"px"}else{aa.paddingLeft=r;aa.paddingBottom=(m.convert(V.height)-1)+"px"}var X=n.getContext("2d"),D=j/A.height;X.scale(D,D*M);X.translate(-u,-B);X.save();function T(){var x=V.glyphs,ab,l=-1,g=-1,y;X.scale(G,1);while(y=Z[++l]){var ab=x[Z[l]]||V.missingGlyph;if(!ab){continue}if(ab.d){X.beginPath();if(ab.code){c(ab.code,X)}else{ab.code=d("m"+ab.d,X)}X.fill()}X.translate(E[++g],0)}X.restore()}if(z){for(var U=z.length;U--;){var F=z[U];X.save();X.fillStyle=F.color;X.translate.apply(X,L[U]);T()}}var q=t.textGradient;if(q){var v=q.stops,p=X.createLinearGradient(0,A.minY,0,A.maxY);for(var U=0,R=v.length;U<R;++U){p.addColorStop.apply(p,v[U])}X.fillStyle=p}else{X.fillStyle=P.get("color")}T();return s}})());

/*!
 * The following copyright notice may not be removed under any circumstances.
 *
 * Copyright:
 * Generated in 2010 by FontLab Studio. Copyright info pending.
 */
Cufon.registerFont({"w":237,"face":{"font-family":"ChunkFive","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"0 0 0 0 0 0 0 0 0 0","ascent":"270","descent":"-90","x-height":"5","bbox":"-4 -293 369 83","underline-thickness":"18","underline-position":"-18","unicode-range":"U+0020-U+007C"},"glyphs":{" ":{"w":90},"e":{"d":"159,-60r31,35v-65,53,-182,46,-188,-66v-6,-105,156,-123,183,-42v4,13,8,40,0,61r-113,0v2,10,7,30,37,30v12,0,31,-2,50,-18xm101,-136v-22,0,-27,19,-28,28r54,0v0,-14,-3,-28,-26,-28","w":195},"f":{"d":"148,-267r-22,41v-10,-5,-31,-9,-31,15r0,31r33,0r0,47r-33,0r0,86r22,0r0,47r-108,0r0,-47r15,0r0,-86r-15,0r0,-47r15,0v1,-53,-10,-96,71,-96v19,0,44,4,53,9","w":138},"g":{"d":"9,42r19,-40v8,7,35,23,62,23v38,0,44,-19,42,-46v-5,6,-19,20,-42,20v-62,0,-86,-45,-86,-90v0,-71,73,-118,128,-78r7,-11r86,0r0,47r-22,0r0,108v0,60,-36,99,-112,99v-40,0,-68,-19,-82,-32xm80,-92v0,22,10,44,26,44v14,0,26,-18,26,-46v0,-24,-12,-43,-26,-43v-15,0,-26,18,-26,45","w":230},"h":{"d":"122,-47r0,47r-113,0r0,-47r15,0r0,-176r-15,0r0,-47r87,0r0,112v4,-6,31,-28,57,-28v80,0,60,71,63,139r17,0r0,47r-93,0r0,-98v0,-12,0,-33,-21,-33v-34,0,-20,51,-23,84r26,0"},"i":{"d":"110,-47r0,47r-101,0r0,-47r15,0r0,-86r-15,0r0,-47r84,0r0,133r17,0xm58,-196v-49,-2,-53,-72,0,-73v52,0,53,74,0,73","w":118},"j":{"d":"46,-25r0,-108r-15,0r0,-47r83,0r0,155v0,45,-13,100,-109,100r0,-48v42,0,41,-35,41,-52xm80,-196v-49,-2,-53,-72,0,-73v52,0,53,74,0,73","w":129},"o":{"d":"104,5v-51,0,-101,-32,-100,-96v0,-60,49,-93,99,-93v57,0,99,35,100,95v1,60,-44,94,-99,94xm104,-41v15,0,25,-21,25,-48v0,-27,-9,-49,-26,-49v-14,0,-25,22,-25,48v0,30,11,49,26,49","w":206},"u":{"d":"5,-132r0,-48r88,0r0,87v0,31,4,45,19,45v32,0,21,-52,23,-84r-24,0r0,-48r93,0r0,132r18,0r0,48r-68,0r-10,-23v-8,9,-20,28,-51,28v-73,0,-75,-63,-72,-137r-16,0","w":227},"t":{"d":"5,-133r0,-47r20,0r0,-33r66,-21r0,54r34,0r0,47r-34,0r0,64v0,12,-2,29,12,29v5,0,15,-3,22,-6r0,46v-11,4,-35,6,-43,6v-78,3,-52,-74,-57,-139r-20,0","w":130},"B":{"d":"244,-73v0,98,-142,69,-235,73r0,-47r21,0r0,-158r-21,0r0,-47v84,3,222,-20,222,62v0,30,-8,45,-35,56v26,7,48,26,48,61xm104,-47v31,2,57,0,58,-31v1,-29,-27,-34,-58,-31r0,62xm151,-178v0,-27,-21,-27,-47,-26r0,54v27,2,47,-1,47,-28","w":247},"D":{"d":"117,0r-108,0r0,-48r22,0r0,-156r-22,0r0,-48r110,0v87,0,137,54,137,123v0,82,-50,129,-139,129xm173,-129v0,-44,-19,-81,-68,-75r0,156v51,5,68,-31,68,-81","w":259},"C":{"d":"199,-91r43,46v-24,27,-63,51,-110,51v-76,0,-127,-49,-127,-129v0,-110,112,-166,165,-108r9,-21r56,0r0,103r-64,0v-1,-23,-13,-46,-39,-46v-57,0,-58,139,10,139v30,0,54,-31,57,-35","w":246},"N":{"d":"285,-252r0,47r-24,0r0,205r-77,0r-92,-137r0,91r28,0r0,46r-111,0r0,-46r21,0r0,-159r-21,0r0,-47r104,0r88,132r0,-85r-25,0r0,-47r109,0","w":293},"n":{"d":"120,-47r0,47r-111,0r0,-47r15,0r0,-86r-15,0r0,-47r77,0r8,22v12,-17,28,-28,51,-28v80,0,64,70,66,139r17,0r0,47r-91,0r0,-98v0,-12,1,-34,-20,-34v-34,0,-20,51,-23,85r26,0","w":232},"l":{"d":"114,-47r0,47r-105,0r0,-47r15,0r0,-177r-15,0r0,-46r84,0r0,223r21,0","w":119},"m":{"d":"116,-47r0,47r-107,0r0,-47r15,0r0,-85r-15,0r0,-48r68,0r8,22v6,-7,22,-27,45,-27v36,0,48,17,54,26v11,-13,28,-26,53,-26v77,2,66,68,67,136r17,0r0,49r-91,0r0,-88v0,-17,3,-45,-14,-45v-33,0,-14,55,-19,85r22,0r0,48r-93,0r0,-92v0,-29,-1,-41,-15,-41v-30,2,-12,58,-17,86r22,0","w":326},"p":{"d":"149,-88v0,-22,-10,-44,-26,-44v-14,0,-26,18,-26,46v0,24,12,43,26,43v15,0,26,-18,26,-45xm9,73r0,-47r15,0r0,-158r-15,0r0,-48r82,0r7,13v7,-5,21,-16,43,-16v56,0,85,43,85,94v0,79,-82,113,-129,79r0,36r20,0r0,47r-108,0","w":229},"q":{"d":"138,-93v0,-22,-10,-44,-26,-44v-14,0,-26,18,-26,46v0,24,12,43,26,43v15,0,26,-18,26,-45xm114,83r0,-47r24,0r0,-48v-51,37,-129,0,-129,-79v0,-81,81,-113,129,-78r7,-11r84,0r0,47r-18,0r0,168r18,0r0,48r-115,0"},"r":{"d":"111,-47r0,47r-102,0r0,-47r16,0r0,-86r-16,0r0,-47r68,0r11,23v9,-17,19,-32,56,-32r0,65v-49,-5,-55,30,-51,77r18,0","w":149},"P":{"d":"9,-204r0,-48r117,0v84,0,99,36,99,77v-1,57,-57,77,-122,72r0,55r22,0r0,48r-116,0r0,-48r20,0r0,-156r-20,0xm154,-172v0,-28,-21,-36,-51,-33r0,63v28,2,51,-5,51,-30","w":230},"x":{"d":"135,-135r0,-45r92,0r0,45r-24,0r-38,39r45,51r17,0r0,45r-115,0r0,-45r17,0r-27,-29r-26,29r23,0r0,45r-92,0r0,-45r24,0r37,-41r-45,-49r-16,0r0,-45r117,0r0,45r-17,0r25,27r27,-27r-24,0","w":233},"w":{"d":"102,-55v-1,-23,16,-94,27,-125r66,0v12,32,26,99,30,125v1,-18,9,-57,16,-78r-15,0r0,-47r88,0r0,47r-15,0r-42,133r-76,0r-25,-81r-26,81r-74,0r-41,-133r-15,0r0,-47r97,0r0,47r-12,0v7,20,16,59,17,78","w":313},"d":{"d":"132,-170r0,-53r-16,0r0,-47r90,0r0,223r17,0r0,47r-84,0r-7,-13v-5,4,-20,16,-45,16v-51,0,-83,-45,-83,-95v0,-76,79,-113,128,-78xm81,-92v0,22,10,44,26,44v14,0,25,-18,25,-46v0,-24,-11,-43,-25,-43v-15,0,-26,18,-26,45","w":228},"k":{"d":"110,0r-96,0r0,-47r14,0r0,-176r-14,0r0,-47r83,0r0,163r42,-25r-26,0r0,-48r100,0r0,48v-25,-3,-39,6,-52,15r49,70r18,0r0,47r-107,0r0,-47r15,0r-27,-39r-13,9r0,30r14,0r0,47","w":235},"K":{"d":"122,-252r0,47r-19,0r0,58r67,-58r-26,0r0,-47r120,0r0,47r-21,0r-52,45r73,113r20,0r0,47r-140,0r0,-47r24,0r-38,-61r-27,23r0,38r19,0r0,47r-113,0r0,-47r19,0r0,-158r-19,0r0,-47r113,0","w":293},"v":{"d":"91,-134v12,20,22,57,28,76v1,-22,19,-56,28,-76r-19,0r0,-46r93,0r0,46r-19,0r-62,134r-56,0r-67,-134r-17,0r0,-46r109,0r0,46r-18,0","w":220},"y":{"d":"114,-78r24,-56r-17,0r0,-46r91,0r0,45r-17,0r-68,166v-10,22,-26,51,-78,51v-19,0,-32,-9,-43,-18r27,-43v13,15,38,17,44,-7r5,-15r-70,-133r-15,0r0,-46r111,0r0,46r-17,0","w":208},"E":{"d":"9,-204r0,-48r217,0r0,80r-62,0r0,-32r-58,0r0,50r69,0r0,47r-69,0r0,59r58,0r0,-33r62,0r0,81r-217,0r0,-48r23,0r0,-156r-23,0","w":235},"W":{"d":"94,-205v8,35,15,93,23,124v5,-34,26,-126,36,-171r75,0r22,100v7,22,5,57,13,71v4,-41,15,-86,23,-124r-20,0r0,-47r103,0r0,47r-20,0r-53,205r-86,0v-12,-42,-17,-91,-32,-130v-6,46,-20,87,-30,130r-84,0r-47,-205r-21,0r0,-47r119,0r0,47r-21,0","w":365,"k":{"a":22,"s":22,"y":11,"r":22,"u":11,"o":22,"e":22}},"H":{"d":"9,-204r0,-48r117,0r0,48r-23,0r0,54r69,0r0,-54r-22,0r0,-48r117,0r0,48r-20,0r0,156r20,0r0,48r-117,0r0,-48r22,0r0,-54r-69,0r0,54r23,0r0,48r-117,0r0,-48r20,0r0,-156r-20,0","w":276},"U":{"d":"5,-205r0,-47r115,0r0,47r-20,0v0,51,-8,161,36,148v22,0,37,-9,37,-71r0,-76r-20,0r0,-48r107,0r0,47r-20,0r0,87v0,85,-35,124,-103,124v-73,0,-111,-40,-111,-122r0,-89r-21,0","w":265},"M":{"d":"261,-47r-2,-141r-48,188r-76,0v-16,-65,-37,-116,-48,-188v-4,44,0,96,-1,142r21,0r0,46r-98,0r0,-46r19,0r0,-159r-19,0r0,-47r137,0r36,135r35,-135r137,0r0,47r-20,0r0,158r20,0r0,47r-114,0r0,-47r21,0","w":362},"@":{"d":"67,-84v-5,-46,68,-109,108,-60r2,-14r36,5r-14,103v32,18,50,-27,50,-49v0,-54,-43,-98,-113,-98v-73,0,-104,68,-104,115v0,59,48,108,111,108v54,0,84,-26,84,-26r17,24v0,0,-37,32,-101,32v-74,0,-141,-55,-141,-138v0,-60,40,-145,134,-145v89,0,143,57,143,128v0,31,-14,84,-67,84v-19,0,-27,-7,-32,-12v-51,40,-106,8,-113,-57xm170,-102v-4,-9,-14,-24,-30,-24v-42,-1,-41,79,-8,80v10,0,20,-3,31,-9","w":280},"G":{"d":"188,0r-12,-23v-8,13,-30,26,-58,26v-63,0,-113,-48,-113,-126v0,-78,55,-133,111,-133v52,0,64,24,70,30r8,-26r53,0r0,107r-64,0v-1,-29,-20,-46,-41,-46v-29,0,-49,32,-49,68v0,56,58,87,83,48r0,-15r-22,0r0,-39r120,0r0,39r-14,0r0,90r-72,0","w":279},"T":{"d":"5,-252r242,0r0,94r-53,0r0,-46r-30,0r0,156r30,0r0,48r-134,0r0,-48r29,0r0,-156r-31,0r0,46r-53,0r0,-94","w":252,"k":{"a":22,"s":22,"y":14,"r":22,"u":14,"o":22,"e":22}},"R":{"d":"9,-204r0,-48r117,0v84,0,100,34,100,75v0,28,-22,48,-52,52v25,4,47,25,47,51v0,25,13,32,17,13r0,-12r24,0v2,43,-5,77,-53,77v-47,0,-70,-25,-70,-67v0,-33,-4,-40,-36,-40r0,55r22,0r0,48r-116,0r0,-48r20,0r0,-156r-20,0xm154,-173v0,-28,-21,-34,-51,-32r0,61v28,2,51,-4,51,-29","w":265},"V":{"d":"140,-124v8,18,7,36,13,43v7,-39,32,-87,46,-124r-19,0r0,-47r102,0r0,47r-18,0r-86,205r-66,0r-96,-205r-20,0r0,-47r133,0r0,47r-20,0","w":278,"k":{"a":22,"y":22,"u":22,"o":22,"e":22}},"X":{"d":"129,-46r0,46r-120,0r0,-46r31,0r53,-69r-65,-90r-19,0r0,-47r143,0r0,47r-21,0r35,48r37,-48r-32,0r0,-47r120,0r0,47r-31,0r-54,70r65,88r21,0r0,47r-144,0r0,-47r20,0r-34,-47r-38,48r33,0","w":300},"s":{"d":"73,-130v16,28,103,20,103,80v0,59,-99,70,-122,28r-4,22r-45,0r0,-65r49,0v0,19,27,24,38,24v7,0,16,-2,16,-12v0,-11,-27,-13,-53,-22v-24,-9,-48,-23,-48,-57v0,-63,95,-65,117,-24r3,-24r44,0r0,65r-47,0v0,-15,-19,-28,-37,-28v-8,0,-14,4,-14,13","w":182},"S":{"d":"72,0r-63,0r0,-91r67,0v0,30,30,36,45,36v13,0,31,-3,31,-18v0,-28,-138,-16,-138,-108v0,-88,122,-101,161,-40r3,-31r62,0r0,91r-65,0v0,-27,-21,-42,-46,-42v-10,0,-25,6,-25,19v0,37,143,28,143,113v0,90,-135,93,-171,43","w":255},"Q":{"d":"157,-2v-89,12,-152,-30,-152,-125v0,-73,49,-126,121,-126v124,0,153,142,94,218v1,21,23,33,23,7r0,-10r23,0v3,44,-11,75,-54,76v-30,0,-47,-19,-55,-40xm86,-108v14,-20,62,-23,83,-3v5,-43,-13,-89,-43,-89v-26,0,-47,48,-40,92xm104,-66v12,14,30,16,44,4v-2,-41,-36,-35,-44,-4","w":271},"z":{"d":"56,-108r-47,0r0,-72r178,0r0,46r-85,87r37,0r0,-25r51,0r0,72r-181,0r0,-47r87,-87r-40,0r0,26","w":199},"Z":{"d":"72,-157r-61,0r0,-95r236,0r1,48r-132,156r67,0r0,-46r64,0r0,94r-238,0r0,-47r131,-157r-68,0r0,47","w":257},"?":{"d":"40,-172r-39,-39v42,-63,179,-67,179,27v0,59,-69,48,-57,100r-67,0r0,-29v0,-33,57,-51,57,-71v0,-14,-14,-17,-27,-17v-15,0,-34,15,-46,29xm46,-37v0,-18,15,-38,41,-38v26,0,43,17,43,38v0,20,-17,37,-43,37v-23,0,-41,-18,-41,-37","w":187},"F":{"d":"9,-204r0,-48r215,0r0,80r-63,0r0,-32r-55,0r0,63r69,0r0,47r-69,0r0,46r37,0r0,48r-134,0r0,-48r22,0r0,-156r-22,0","w":229,"k":{"a":22,"s":22,"y":11,"r":22,"u":11,"o":22,"e":22}},"I":{"d":"9,-204r0,-48r120,0r0,48r-23,0r0,156r23,0r0,48r-120,0r0,-48r23,0r0,-156r-23,0","w":137},"J":{"d":"8,69r-1,-47v30,9,45,-2,46,-49r0,-177r-31,0r0,-48r136,0r0,48r-30,0v-5,127,38,304,-120,273","w":166},"L":{"d":"9,-204r0,-48r114,0r0,48r-19,0r0,156r46,0r0,-46r61,0r0,94r-202,0r0,-48r20,0r0,-156r-20,0","w":219},"O":{"d":"134,6v-75,0,-129,-43,-129,-133v0,-78,52,-131,127,-131v88,0,129,52,129,133v0,81,-46,131,-127,131xm134,-50v23,0,37,-30,37,-75v0,-44,-12,-78,-40,-78v-22,0,-37,31,-37,76v0,47,17,77,40,77","w":266},".":{"d":"46,1v-53,0,-54,-77,0,-79v52,1,56,81,0,79","w":92},"a":{"d":"28,-123r-15,-42v45,-34,175,-43,176,49r0,70r22,0r0,46r-77,0r-9,-16v-38,44,-115,24,-120,-37v-5,-56,76,-84,111,-54v9,-51,-66,-32,-88,-16xm74,-57v-1,23,37,19,42,5v0,-17,1,-24,-21,-24v-14,0,-21,8,-21,19","w":216},"b":{"d":"92,0r-81,0r0,-47r15,0r0,-176r-15,0r0,-47r87,0r0,104v8,-9,29,-17,47,-17v55,0,83,46,83,94v0,75,-79,118,-130,77xm149,-88v0,-22,-10,-44,-26,-44v-14,0,-25,18,-25,46v0,24,11,43,25,43v15,0,26,-18,26,-45","w":236},"c":{"d":"130,-99v-1,-17,-6,-37,-23,-37v-45,0,-42,90,5,88v19,0,32,-7,44,-20r32,36v-47,57,-188,51,-188,-59v0,-85,90,-114,134,-72r6,-17r43,0r0,81r-53,0","w":191},"[":{"d":"10,-204r0,-48r117,0v84,0,99,41,99,82v0,27,-15,46,-38,59r40,64r21,0r0,47r-69,0r-60,-96r-16,0r0,48r22,0r0,48r-116,0r0,-48r21,0r0,-156r-21,0xm156,-172v0,-28,-22,-36,-52,-33r0,63v29,2,53,-5,52,-30","w":259},"\\":{"d":"187,28r-51,1r-134,-300r51,0","w":188},"]":{"d":"119,0r-108,0r0,-47r15,0r0,-176r-15,0r0,-47r83,0r0,163r42,-25r-26,0r0,-48r101,0r0,48v-24,-2,-39,4,-51,13r50,72r15,0r0,47r-58,0r-61,-86r-12,9r0,30r25,0r0,47","w":232},"Y":{"d":"101,-206v12,21,24,45,33,68v7,-21,23,-47,33,-68r-19,0r0,-46r96,0r0,46r-19,0r-67,117r0,42r21,0r0,47r-116,0r0,-47r21,0r0,-42r-70,-117r-18,0r0,-46r124,0r0,46r-19,0","w":240,"k":{"a":22,"s":22,"y":11,"r":22,"u":14,"o":29,"e":22}},"1":{"d":"26,-165r-17,-39v21,-10,37,-17,63,-48r64,0r0,204r34,0r0,48r-144,0r0,-48r36,0r0,-133","w":178},"2":{"d":"191,-177v3,66,-86,85,-111,129r63,0r0,-29r60,0r0,77r-194,0r0,-52v20,-32,31,-42,53,-61v27,-22,63,-39,63,-61v0,-42,-63,-19,-74,4r-39,-41v45,-66,174,-61,179,34","w":212},"3":{"d":"189,-75v0,92,-146,101,-184,39r37,-38v16,24,78,38,80,-4v1,-29,-28,-28,-57,-27r0,-43v27,1,57,1,57,-24v0,-41,-53,-33,-74,-7r-35,-42v13,-14,44,-35,77,-35v84,0,118,86,66,122v12,8,33,27,33,59","w":194},"4":{"d":"4,-71r0,-51r103,-130r75,0r0,142r19,0r0,39r-19,0r0,23r19,0r0,48r-116,0r0,-48r22,0r0,-23r-103,0xm54,-110r53,0r0,-66","w":210},"5":{"d":"202,-86v0,104,-154,114,-197,47r40,-41v19,32,88,39,90,-9v2,-37,-56,-45,-71,-18r-46,-21r22,-124r143,0r0,54r-97,0r-6,35v52,-26,122,6,122,77","w":207},"'":{"d":"13,-252r71,0r-13,107r-45,0","w":98},",":{"d":"39,70r-41,-24v26,-32,38,-63,34,-117r66,18v1,46,-22,90,-59,123","w":97},":":{"d":"45,3v-51,0,-53,-77,0,-79v54,2,54,80,0,79xm45,-107v-50,0,-54,-76,0,-78v53,1,55,79,0,78","w":91},"6":{"d":"197,-227r-25,47v-12,-7,-30,-19,-52,-19v-27,0,-44,22,-48,49v45,-39,132,-9,132,62v0,48,-34,89,-93,91v-59,2,-103,-40,-105,-112v-1,-48,11,-144,106,-147v24,-1,64,11,85,29xm110,-116v-17,0,-31,13,-37,20v0,18,11,43,34,43v37,2,46,-63,3,-63","w":209},"7":{"d":"5,-180r0,-72r195,0r0,48r-97,204r-77,0r96,-204r-59,0r0,24r-58,0","w":203},"8":{"d":"101,5v-96,0,-128,-101,-57,-142v-56,-40,-20,-119,59,-119v84,0,113,88,56,120v69,40,34,141,-58,141xm89,-108v-29,12,-26,63,12,62v18,0,33,-10,33,-30v0,-25,-28,-31,-45,-32xm112,-164v25,-8,20,-49,-10,-47v-14,0,-26,11,-26,23v0,20,24,24,36,24","w":201},"9":{"d":"13,-25r24,-47v28,23,102,30,97,-31v-43,43,-129,7,-129,-62v0,-48,35,-89,94,-91v59,-2,105,41,107,113v1,55,-13,143,-108,146v-24,1,-64,-10,-85,-28xm99,-136v17,0,28,-14,34,-21v0,-18,-7,-42,-30,-42v-38,0,-48,63,-4,63","w":211},"-":{"d":"9,-62r0,-48r104,0r0,48r-104,0","w":122},";":{"d":"62,-100v-52,-1,-55,-78,0,-80v53,1,55,81,0,80xm2,46r41,24v37,-33,60,-77,59,-123r-66,-18v4,54,-8,85,-34,117","w":108},"=":{"d":"9,-62r0,-48r148,0r0,48r-148,0xm9,-141r0,-48r148,0r0,48r-148,0","w":166},"0":{"d":"109,4v-60,0,-104,-42,-104,-131v0,-76,42,-129,102,-129v71,0,103,51,103,131v0,80,-36,129,-101,129xm109,-51v17,0,29,-30,29,-74v1,-91,-60,-98,-61,-2v0,46,18,76,32,76","w":215},"!":{"d":"10,-37v0,-18,15,-38,41,-38v26,0,43,17,43,38v0,20,-17,37,-43,37v-23,0,-41,-18,-41,-37xm31,-93v-11,-49,-23,-96,-19,-159r86,0v4,64,-8,111,-20,159r-47,0","w":110},"(":{"d":"94,-293r37,38v-17,21,-56,65,-56,143v0,80,35,124,56,149r-37,38v-39,-35,-85,-105,-85,-187v0,-85,55,-155,85,-181","w":139},")":{"d":"9,-255r37,-38v30,26,85,96,85,181v0,82,-46,153,-85,188r-37,-39v21,-25,55,-69,55,-149v0,-78,-38,-122,-55,-143","w":139},"\"":{"d":"13,-252r69,0r-11,107r-45,0xm100,-252r69,0r-13,107r-45,0","w":181},"$":{"d":"81,-279r50,0r0,37v8,4,16,10,21,18r2,-20r53,0r0,84r-55,0v0,-25,-17,-40,-40,-40v-9,0,-22,6,-22,18v0,35,122,28,122,108v0,53,-44,69,-81,70r0,37r-50,0r0,-47v-6,-4,-13,-9,-19,-14r-4,22r-53,0r0,-87r57,0v0,29,29,35,43,35v10,0,27,-3,27,-18v0,-27,-117,-22,-117,-103v0,-48,36,-68,66,-70r0,-30","w":217},"%":{"d":"257,0v-43,0,-74,-29,-74,-75v0,-44,36,-73,73,-73v47,0,74,30,74,75v0,42,-27,73,-73,73xm80,-110v-43,0,-75,-29,-75,-75v0,-44,36,-73,73,-73v47,0,74,29,74,74v0,42,-26,74,-72,74xm109,0r-41,0r156,-252r41,0xm237,-75v0,53,40,56,39,2v1,-50,-39,-56,-39,-2xm80,-143v11,0,18,-16,18,-41v1,-50,-39,-55,-39,-1v0,26,12,42,21,42","w":335},"\/":{"d":"53,29r-51,-1r134,-299r51,0","w":188},"+":{"d":"188,-157r0,47r-66,0r0,66r-47,0r0,-66r-66,0r0,-47r66,0r0,-66r47,0r0,66r66,0","w":196},"<":{"d":"13,-122r0,-45r154,-64r18,44r-110,42r110,43r-18,44","w":197},">":{"d":"185,-167r0,45r-155,63r-17,-44r110,-42r-110,-42r17,-44","w":197},"&":{"d":"99,5v-103,-1,-132,-108,-42,-152v-50,-33,-24,-109,50,-109v94,0,98,93,38,114r33,33v9,-16,15,-33,19,-48r77,0r0,46r-35,0v-6,17,-13,30,-21,42v12,10,17,26,43,22r0,47r-53,0r-24,-23v-19,18,-51,28,-85,28xm71,-76v0,37,47,32,72,12v-17,-14,-29,-33,-48,-45v-10,6,-24,20,-24,33xm128,-194v0,-10,-6,-22,-21,-22v-11,0,-18,11,-18,20v0,29,39,37,39,2","w":277},"A":{"d":"291,-47r0,47r-144,0r0,-47r34,0r-8,-25r-74,0r-7,25r28,0r0,47r-115,0r0,-47r25,0r48,-158r-14,0r0,-47r138,0r64,205r25,0xm136,-193r-23,78r47,0","w":296},"|":{"d":"36,-252r48,0r0,325r-48,0r0,-325","w":119},"_":{"d":"9,0r0,-30r234,0r0,30r-234,0","w":251},"*":{"d":"136,-142r-33,25r-28,-40r-30,41r-32,-26r31,-34r-42,-15r15,-35r41,19r-5,-45r44,0r-6,46r41,-20r15,35r-44,15","w":148},"^":{"d":"82,-252r52,0r77,143r-64,0r-39,-81r-40,81r-64,0","w":214},"#":{"d":"25,-156r0,-49r56,0r17,-66r47,0r-17,66r48,0r17,-66r48,0r-17,66r41,0r0,49r-53,0r-11,41r44,0r0,49r-56,0r-17,66r-47,0r16,-66r-48,0r-17,66r-47,0r16,-66r-40,0r0,-49r53,0r10,-41r-43,0xm116,-156r-11,41r49,0r10,-41r-48,0","w":270},"\u00a0":{"w":90}}});

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
    {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            //alert(jQuery.easing.default);
            return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    });

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
;
$(function() {
    /*
     the json config obj.
     name: the class given to the element where you want the tooltip to appear
     bgcolor: the background color of the tooltip
     color: the color of the tooltip text
     text: the text inside the tooltip
     time: if automatic tour, then this is the time in ms for this step
     position: the position of the tip. Possible values are
     TL	top left
     TR  top right
     BL  bottom left
     BR  bottom right
     LT  left top
     LB  left bottom
     RT  right top
     RB  right bottom
     T   top
     R   right
     B   bottom
     L   left
     */
    var config = [
//            {
//                "name" 		: "tour_1",
//                "bgcolor"	: "black",
//                "color"		: "white",
//                "position"	: "T",
//                "text"		: "Select from multiple perspectives for the same energy pathway here.",
//                "time" 		: 5000
//            },
//            {
//                "name" 		: "tour_2",
//                "bgcolor"	: "black",
//                "color"		: "white",
//                "text"		: "Create your own pathway here, picking from 1 (pessimistic) to 4 (most optimistic) scenarios with respect to...",
//                "position"	: "B",
//                "time" 		: 5000
//            },
//            {
//                "name" 		: "tour_3",
//                "bgcolor"	: "black",
//                "color"		: "white",
//                "text"		: "Various demand variables (like transport demands),",
//                "position"	: "L",
//                "time" 		: 5000
//            },
//            {
//                "name" 		: "tour_4",
//                "bgcolor"	: "black",
//                "color"		: "white",
//                "text"		: "and supply variables (like Nuclear power).",
//                "position"	: "R",
//                "time" 		: 5000
//            },
//            {
//                "name" 		: "tour_5",
//                "bgcolor"	: "black",
//                "color"		: "white",
//                "text"		: "The impact and resultant figures in the form of security, supply-demand levels and various\
//                               other visualizations will be visible here.",
//                "position"	: "TL",
//                "time" 		: 5000
//            },
        ],
    //define if steps should change automatically
        autoplay	= false,
    //timeout for the step
        showtime,
    //current step of the tour
        step		= 0,
    //total number of steps
        total_steps	= config.length;

    //show the tour controls
    showControls();

    /*
     we can restart or stop the tour,
     and also navigate through the steps
     */
    //$('#activatetour').on('click', null, startTour);
    $('#canceltour').on('click',null, endTour);
    $('#endtour').on('click', null, endTour);
    $('#restarttour').on('click', null, restartTour);
    $('#nextstep').on('click', null, nextStep);
    $('#prevstep').on('click', null, prevStep);

    function startTour(){
        $('#activatetour').remove();
        $('#endtour,#restarttour').show();
        if(!autoplay && total_steps > 1)
            $('#nextstep').show();
        showOverlay();
        nextStep();
    }

    function nextStep(){
        if(!autoplay){
            if(step > 0)
                $('#prevstep').show();
            else
                $('#prevstep').hide();
            if(step == total_steps-1)
                $('#nextstep').hide();
            else
                $('#nextstep').show();
        }
        if(step >= total_steps){
            //if last step then end tour
            endTour();
            return false;
        }
        ++step;
        showTooltip();
    }

    function prevStep(){
        if(!autoplay){
            if(step > 2)
                $('#prevstep').show();
            else
                $('#prevstep').hide();
            if(step == total_steps)
                $('#nextstep').show();
        }
        if(step <= 1)
            return false;
        --step;
        showTooltip();
    }

    function endTour(){
        step = 0;
        if(autoplay) clearTimeout(showtime);
        removeTooltip();
        hideControls();
        hideOverlay();
    }

    function restartTour(){
        step = 0;
        if(autoplay) clearTimeout(showtime);
        nextStep();
    }

    function showTooltip(){
        //remove current tooltip
        removeTooltip();

        var step_config		= config[step-1];
        var $elem			= $('.' + step_config.name);

        if(autoplay)
            showtime	= setTimeout(nextStep,step_config.time);

        var bgcolor 		= step_config.bgcolor;
        var color	 		= step_config.color;

        var $tooltip		= $('<div>',{
            id			: 'tour_tooltip',
            className 	: 'tooltip',
            class       : 'tooltip',
            html		: '<p>'+step_config.text+'</p><span class="tooltip_arrow"></span>'
        }).css({
                'display'			: 'none',
                'background-color'	: bgcolor,
                'color'				: color
            });

        //position the tooltip correctly:

        //the css properties the tooltip should have
        var properties		= {};

        var tip_position 	= step_config.position;

        //append the tooltip but hide it
        $('BODY').prepend($tooltip);

        //get some info of the element
        var e_w				= $elem.outerWidth();
        var e_h				= $elem.outerHeight();
        var e_l				= $elem.offset().left;
        var e_t				= $elem.offset().top;


        switch(tip_position){
            case 'TL'	:
                properties = {
                    'left'	: e_l,
                    'top'	: e_t + e_h + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_TL');
                break;
            case 'TR'	:
                properties = {
                    'left'	: e_l + e_w - $tooltip.width() + 'px',
                    'top'	: e_t + e_h + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_TR');
                break;
            case 'BL'	:
                properties = {
                    'left'	: e_l + 'px',
                    'top'	: e_t - $tooltip.height() + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_BL');
                break;
            case 'BR'	:
                properties = {
                    'left'	: e_l + e_w - $tooltip.width() + 'px',
                    'top'	: e_t - $tooltip.height() + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_BR');
                break;
            case 'LT'	:
                properties = {
                    'left'	: e_l + e_w + 'px',
                    'top'	: e_t + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_LT');
                break;
            case 'LB'	:
                properties = {
                    'left'	: e_l + e_w + 'px',
                    'top'	: e_t + e_h - $tooltip.height() + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_LB');
                break;
            case 'RT'	:
                properties = {
                    'left'	: e_l - $tooltip.width() + 'px',
                    'top'	: e_t + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_RT');
                break;
            case 'RB'	:
                properties = {
                    'left'	: e_l - $tooltip.width() + 'px',
                    'top'	: e_t + e_h - $tooltip.height() + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_RB');
                break;
            case 'T'	:
                properties = {
                    'left'	: e_l + e_w/2 - $tooltip.width()/2 + 'px',
                    'top'	: e_t + e_h + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_T');
                break;
            case 'R'	:
                properties = {
                    'left'	: e_l - $tooltip.width() + 'px',
                    'top'	: e_t + e_h/2 - $tooltip.height()/2 + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_R');
                break;
            case 'B'	:
                properties = {
                    'left'	: e_l + e_w/2 - $tooltip.width()/2 + 'px',
                    'top'	: e_t - $tooltip.height() + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_B');
                break;
            case 'L'	:
                properties = {
                    'left'	: e_l + e_w  + 'px',
                    'top'	: e_t + e_h/2 - $tooltip.height()/2 + 'px'
                };
                $tooltip.find('span.tooltip_arrow').addClass('tooltip_arrow_L');
                break;
        }


        /*
         if the element is not in the viewport
         we scroll to it before displaying the tooltip
         */
        var w_t	= $(window).scrollTop();
        var w_b = $(window).scrollTop() + $(window).height();
        //get the boundaries of the element + tooltip
        var b_t = parseFloat(properties.top,10);

        if(e_t < b_t)
            b_t = e_t;

        var b_b = parseFloat(properties.top,10) + $tooltip.height();
        if((e_t + e_h) > b_b)
            b_b = e_t + e_h;


        if((b_t < w_t || b_t > w_b) || (b_b < w_t || b_b > w_b)){
            $('html, body').stop()
                .animate({scrollTop: b_t}, 500, 'easeInOutExpo', function(){
                    //need to reset the timeout because of the animation delay
                    if(autoplay){
                        clearTimeout(showtime);
                        showtime = setTimeout(nextStep,step_config.time);
                    }
                    //show the new tooltip
                    $tooltip.css(properties).show();
                });
        }
        else
        //show the new tooltip
            $tooltip.css(properties).show();
    }

    function removeTooltip(){
        $('#tour_tooltip').remove();
    }

    function showControls(){
        /*
         we can restart or stop the tour,
         and also navigate through the steps
         */
        var $tourcontrols  = '<div id="tourcontrols" class="tourcontrols">';
        $tourcontrols += '<p>New to the webtool? <br /></p>';
        $tourcontrols += '<span class="button" id="activatetour"> <a href="http://planningcommission.nic.in/sectors/index.php?sectors=energy"> Take a tour! </a> </span>';
        if(!autoplay){
            $tourcontrols += '<div class="nav"><span class="button" id="prevstep" style="display:none;">< Previous</span>';
            $tourcontrols += '<span class="button" id="nextstep" style="display:none;">Next ></span></div>';
        }
        $tourcontrols += '<a id="restarttour" style="display:none;">Restart the tour</span>';
        $tourcontrols += '<a id="endtour" style="display:none;">End the tour</a>';
        $tourcontrols += '<span class="close" id="canceltour"></span>';
        $tourcontrols += '</div>';

        $('BODY').prepend($tourcontrols);
        $('#tourcontrols').animate({'right':'30px'},500);
    }

    function hideControls(){
        $('#tourcontrols').remove();
    }

    function showOverlay(){
        var $overlay	= '<div id="tour_overlay" class="overlay"></div>';
        $('BODY').prepend($overlay);
    }

    function hideOverlay(){
        $('#tour_overlay').remove();
    }

});
// éclair - FIXME: Need this so file is recognised as utf-8. Need a better solution than this bodge
// FIXME: In the end, this should only contain information drawn from the Excel Model.
// that is constant across pathways. The methods called are in helper.rb
window.twentyfifty = {};
window.twentyfifty.default_pathway = "1111111111111111111111111111111111111111111111111";
window.twentyfifty.pathway_wiki_pages_hash = {"1011011111111110111110111001111011101111011011101":null,"4044044444444440444440444004444044404444044044404":null,"3033033333333330333330333003333033303333033033303":null,"2022022222222220222220222002222022202222022022202":null,"2024014222222210444440444004444044404444044044404":null,"1014014443333110444440333004444041404444044044404":null,"2024014223333310444440444002222022202222022022204":null,"0000000000000000000000000000000000000000000000000":null};
window.twentyfifty.pathway_descriptions_hash = {"1011011111111110111110111001111011101111011011101":null,"4044044444444440444440444004444044404444044044404":null,"3033033333333330333330333003333033303333033033303":null,"2022022222222220222220222002222022202222022022202":null,"2024014222222210444440444004444044404444044044404":null,"1014014443333110444440333004444041404444044044404":null,"2024014223333310444440444002222022202222022022204":null,"0000000000000000000000000000000000000000000000000":null};
window.twentyfifty.pathway_names_hash = {"1011011111111110111110111001111011101111011011101":"Least Effort Scenario (All at level 1)","4044044444444440444440444004444044404444044044404":"Heroic Effort Scenario (All Level 4s)","3033033333333330333330333003333033303333033033303":"Aggressive Effort Scenario (All Level 3s)","2022022222222220222220222002222022202222022022202":"Determined Effort Scenario (All Level 2s)","2024014222222210444440444004444044404444044044404":"Maximum Energy Security (Heroic Effort in Demand Sectors)","1014014443333110444440333004444041404444044044404":"Minimum Emissions Pathway","2024014223333310444440444002222022202222022022204":"Max Energy Security (Determined Effort in Demand Sectors)","0000000000000000000000000000000000000000000000000":null};
window.twentyfifty.comparator_pathways = [];
window.twentyfifty.default_comparator_code = "1011011111111110111110111001111011101111011011101";
window.twentyfifty.longDescriptions = [["Least Effort Scenario No new capacity added due to high prices. The gas based generation would reach a level of 109.9 TWh in 2047.","Determined Effort Scenario: New projects get connected to the pipeline.  The gas based power generation capacity will remain reach to 67 GW in 2047.","Aggressive Effort Scenario:  assumes free gas market in the country . This level the gas based generation capacity would reach to a level of 122 GW and the corresponding generation would be about 641 TWh in 2047. ","Heroic Effort Scenario: no constraint in gas availability and that imports are unlimited and there is a complete free gas market.  the gas based generation capacity and the corresponding generation would be about 1161 TWh in the year 2047."],[null,null,null,null],["Least Effort Scenario :  Increasing fuel prices, import dependence, pressure to reduce carbon emissions. total electricity generated in 2047 from coal-fired power plants would be 1584 TWh.","Determined Effort Scenario: Electricity generated from coal-fired plants in 2047 would be 2141 TWh.","Aggressive Effort Scenario: Capacity addition at a slightly lower level . Total generation of 3051 TWh in 2047.","Heroic Effort Scenario: Assumes a high coal based capacity. electricity generation of 4038 TWh in 2047. "],["Least Effort Scenario : New technology development/deployment will be slow. total demand for Indian grade coal in 2047 for India, would be 1383 million tons. ","Determined Effort Scenario : New technology development/deployment will be slightly faster. Total demand for Indian grade coal in 2047 is expected at 1345 million tons.","Aggressive Effort Scenario : New technology development/deployment will be encouraged and hence its adoption would be faster. demand for Indian grade coal in 2047 in this scenario is 1309 million tons.","Heroic Effort Scenario : New technology development/deployment will be aggressively promoted. Total demand for Indian grade coal in 2047 in this scenario is 1277 million tons."],[null,null,null,null],["Least Effort Scenario :  no planned generation plants with CCS until 2025. Generation with CCS usage will increase to 7 GW till 2047.","Determined Effort Scenario : Generation with CCS usage will be deployed at a slow rate. Generation with CCS will reach 35 GW by 2047.","Aggressive Effort Scenario : CCS-equipped capacity is expected to grow, India will target generation capacity of 70 GW by 2047.","Heroic Effort Scenario : More generation plants with CCS technology will be deployed, increasing to 88 GW by 2047."],["Least Effort Scenario : The Fuel Split for level 1 is completely based on coal supply. Gas supply is not being utilized for CCS at this stage.","Determined Effort Scenario : The Fuel Split is in the ratio 9:1 for coal and gas respectively.","Aggressive Effort Scenario : The Fuel Split is in the ratio 9:1 for coal and gas respectively.","Heroic Effort Scenario : The Fuel Split is in the ratio 9:1 for coal and gas respectively."],["Least Effort Scenario : Reactors currently under construction (5,300 MW) are completed and commissioned. ","Determined Effort Scenario : Assumes that new reactors are developed in the eight new sites identified. ","Aggressive Effort Scenario : Assumes that all the new sites are fully utilized with new reactors. Six reactors are assumed per site. ","Heroic Effort Scenario : This assumes that three new sites are identified, which can accommodate about 15,000 MW through new PHWRs and LWRs. "],[" Least Effort Scenario : The current hydro plants continue to operate with scheduled maintenance efforts through the period of analysis. ","Determined Effort Scenario :  Through various measures, the Government of India (GoI) aims to realize 100% hydropower potential of the country by 2025 – 26. Pumped hydro schemes which are under construction are completed.","Aggressive Effort Scenario : In addition to achievement of govt. plans, this scenario includes the benefits from completion of R&M and Life Extension (LE) efforts. ","Heroic Effort Scenario :  Technology advancements are assumed to result in exploitation of full potential of large hydro. There are advances in technology development, and R&D efforts in de-silting, integration of regional grids, forecasting and such."],["Least Effort Scenario : Solar PV capacity addition would be significantly slower. Capacity would increase to roughly 11 GW by 2022, peak at 37 GW in 2047.","Determined Effort Scenario: Capacity addition would follow the JNNSM trajectory. Capacity addition increases strongly thereafter culminating in a cumulative capacity of 150 GW by 2047. ","Aggressive Effort Scenario: Steady drop in solar PV prices and marginal increase in fossil fuels prices, reach 248 GW by 2047. ","Heroic Effort Scenario: In this scenario, there is absolutely no barrier (economic, social or technical) to the growth of solar PV. reaches a potential of 420 GW."],["Least Effort Scenario : Only 1 GW would be operational in the next 5 years (mainly due to higher costs), beyond which there will be a slight increase in generation capacity. Generation in 2047 would be to the tune of 35 TWh.","Determined Effort Scenario: assumes that there is slow but consistent growth in capacity addition of CSP. Capacity in this level in year 2047 is 46 GW. ","Aggressive Effort Scenario:  assumes that CSP costs come down significantly and that there are no limitations on plant size. Generation by 2047 reaches 357 TWh.","Heroic Effort Scenario: Costs of solar system and storage fall as higher temperature technologies are introduced. Generation by 2047 reaches 745 TWh."],["Least Effort Scenario : capacity addition would be significantly slower. Capacity would increase to 67 GW by 2047. ","Determined Effort Scenario: assumes that the capacity addition would follow the 12th and 13th Plan trajectories. Reaches a capacity of 202 GW by 2047. ","Aggressive Effort Scenario: capacity addition in this highly optimistic scenario, to be slightly higher than the 12/13th Plan requirements. It would reach 270 GW by 2047","Heroic Effort Scenario: There is absolutely no barrier (economic, social or technical) to the growth of onshore wind power. it reaches approximately 300 GW and by 2047 a high of 410 GW."],["Least Effort Scenario : Offshore wind takes off very slowly due to higher cost and other barriers, especially with regard to regulatory and associated clearances.","Determined Effort Scenario: Without any further improvement in technology and offshore wind potential assessment, the sector witnesses a gradual growth in capacity addition.","Aggressive Effort Scenario: With the improvement in potential, offshore site identification and cost reductions, India would gradually built up its offshore wind capacity/","Heroic Effort Scenario: offshore wind power does not face any economic or physical constraints and hence sees a rapid growth in capacity addition. "],["Least Effort Scenario : Essentially capacity addition is very slow and only takes care of retirement. It further increases to 7.5 GW by 2027 and plateaus at 9 GW from about 2032-2047.","Determined Effort Scenario: Capacity addition slows down after this point and reaches the ultimate capacity of 15 GW 2047. ","Aggressive Effort Scenario: assumes an optimistic view by meeting not only the 12th and 13th Plan targets, but a slightly faster deployment. roughly 20 GW is met and maintained thereafter till 2047","heroic Effort Scenario: Capacity deployment increases rapidly. overall SHP generation resulting in 115 TWh by 2047."],["Least Effort Scenario : Imports continue to be low as India also has opportunities for domestic power generation. ","Determined Effort Scenario: assumes imports continue to grow at a moderate pace of 5 GW from 13th Plan up to 2037 and thereafter maintain same level.   ","Aggressive Effort Scenario: assumes aggressive growth in imports and assumes 7 GW from 13th Plan up to 2037 and thereafter it remains constant. ","Heroic Effort Scenario: assumes optimistic growth in imports and assumes power import from countries other than Bhutan and Nepal (an international grid). "],[null,null,null,null],["Least Effort Scenario : Agri Residue productivity constant, forest residue for cooking is close to saturation at  144 MT/year","Determined Effort Scenario : Agri Residue productivity increases at 0.25%/year, forest residue for cooking is close to saturation at  158 MT/year","Aggressive Effort Scenario : Agri Residue productivity constant, forest residue for cooking is close to saturation at  171MT/year","Heroic Effort Scenario : Agri Residue productivity constant, forest residue for cooking is close to saturation at  180 MT/year"],["Least Effort Scenario : 52% of the Agri Residue goes into cooking along with forestry arisings, 10% in electricity and 5% for liquid fuels. ","Determined Effort Scenario : 39% of the Agri Residue goes into cooking along with forestry arisings, 18% in electricity and 10% for liquid fuels. ","Aggressive Effort Scenario : 15% of the Agri Residue goes into cooking along with forestry arisings, 30% in electricity and 22% for liquid fuels. ","Heroic Effort Scenario : 5% of the Agri Residue goes into cooking along with forestry arisings, 24% in electricity and 38% for liquid fuels. "],["Least Effort Scenario : Production of 1st/2nd Gen biofuel reaches 4.7 MTOE","Determined Effort Scenario: More crop residue and waste land is utlized for biomass resulting in 8.8 MTOE of bio-fuel production","Aggressive Effort Scenario: Biofuel production reaches 40.2 MTOE","Heroic Effort Scenario: Better yeild from Sugarcane biproducts and more wasteland allocation increases production to 49 MTOE"],["Least Effort Scenario : Assumes almost no bio-production from Micro and Macro Algae","Determined Effort Scenario: Production increases to 2.8 MTOE","Aggressive Effort Scenario: Biofuel yeild from algae increases and production reaches to 28.6 MTOE","Heroic Effort Scenario: More Land and Sea area is allocated for algae production and production reaches 113.7 MTOE"],["Least Effort Scenario : . Not much government impetus is assumed. Once the existing projects have lived their life, there will be no MSW based WtE projects, beyond 2037.","Determined Effort Scenario: assumes that the capacity addition happens in line with 12th Plan targets, 18% of total ‘waste to electricity generation’ potential will be realized, resulting in approx 3,500MW installed power generation capacity.","Aggressive Effort Scenario: assumes that Government and ULBs emphasize on MSW based WtE as a key resource recovery option. The policies and incentives get alignedrgy. 32% of segregated urban combustibles will be used as fuel yielding 0.003Mtoe of thermal energy","Heroic Effort Scenario: there are absolutely no barriers to the growth of MSW based WtE. Inter - agency conflicts are also resolved. Environmental considerations in urban and rural areas drive this technology. 30% of total ‘waste to electricity generation’ potential will be realized, resulting in approx 5,850MW installed power generation capacity"],[null,null,null,null],["Least Effort Scenario : Incorporates only future production from the current discoveries of conventional gas and CBM. Historical production has been taken into account. ","Determined Effort scenario:  assumes moderate development of CBM achieving peak production of 5 BCM in 2032 and remains static thereafter. It assumes improvement in existing pipeline policies. ","Aggressive Effort Scenario: Requires additional policy inputs to spur the growth of natural gas sector. It assumes cost recovery provision continue  price/utilization approvals are no longer required as the gas market has completely evolved in India. CBM ","Heroic Effort Scenario:  assumes a highly favourable upstream regime wherein IOCs find it attractive to invest in India and free gas market has set in. It assumes an aggressive conventional gas scenario."],["Least Effort Scenario : Assumes that only the currently operating, on-going and planned coal mining projects. In this scenario, coal production gradually increases to 619 MTPA in 2047. ","Determined Effort Scenario: There would be some improvement in mine ability due to technological improvement. In this scenario, coal production will grow by 2047 to 1163 MTPA. "," Aggressive Effort Scenario: Proved coal reserves will grow at about 1.3% p.a. and there would also be further improvement in mine ability. Positive conditions for coal based energy supply, coal production will be 1407 MTPA in 2047. About 55% of mineable coal reserves would have been extracted by 2047.","Heroic Effort Scenario: Proved coal reserves will grow at 1.5% p.a.  In this scenario, coal production will increase to about 1602 MTPA in 2047, In this scenario, about 48% of mineable coal reserves would have been extracted by 2047."],["Least Effort Scenario : Assumes no new fields come into production, barring the ones for which investment decision has been taken.","A number of IOR/EOR schemes are underway to enhance production. Additionally about 35 discoveries which are under various stages of DOC approvals, have been considered to start production.","Under this scenario, a number of oil discoveries which are awaiting appraisal and development are found to be commercially viable. Marginal fields would supplement the production. ","This envisages NOCs registering a continuous growth in oil production. Share from tight oil and shale oil has been taken into account. However, this scenario includes technological alliance with super majors, better R/F, deep-water exploitation of reserves and no rig availability problems for deep-water development. "],[null,null,null,null],[null,null,null,null],["Least Effort Scenario : From current levels, distance travelled annually per person is expected to increase to 18,978 km by 2046-47. Improved access to transport infrastructure, accompanied by increasing demand for mobility due to increased economic activity would lead to an increase in total passenger transport demand. ","Determined Effort Scenario : This Level would see a drop in the overall annual demand for mobility per capita by about 9 per cent from the mobility demands envisioned by 2046-47 in Level One, reaching 17,312 km by 2046-47.","Aggressive Effort Scenario : Visualizes a world where all new cities that come up in the country in the next four decades plan for Transit Oriented Development. 18 per cent over the present mobility demands envisioned by 2046-47 under Level One, reaching 15,646 km by 2046-47.","Heroic Effort Scenario : Growth of passenger transport demand would be moderated by conscious policy initiatives on urbanization patterns and transport demand management. 26 per cent over the passenger transport demands reaching 13,979 km by 2046-47."],["Least Effort Scenario : .  There would be a surge in the total number of cars and jeeps by 2046-47 thereby decreasing the share of public road based transport to 46%.","Determined Effort Scenario : While road based passenger transport would still dominate, with an increase in the share of public road based transport to about 57%, its share would marginally reduce to about 83% of the total passenger transport demand by 2046-47.","Aggressive Effort Scenario : The share of road is assumed to decrease to less than 81% by 2046-47 in this level while rail and aviation will occupy about 17% and less than 2% shares respectively. Incentivizing metro services would increase the share of public transportation in road based transport to about 66% in 2046-47","Heroic Effort Scenario : For inter-city travel, priority in investment will be to shrink travel time between all state capitals and major metros to 12 hours or less through faster train services. High Speed Rail at 300 km/hour for high demand passenger corridors will help reduce the incidence of air travel"],["Least Effort Scenario : Assumes that 42% of the transport demand will be met by public transport and the rest 48% will be met by private transport.","Determined Effort Scenario : Approximately  49% of demand will be met by public the rest 51% will be met by private forms of transport.","Aggressive Effort Scenario : 57% of the demand will be met by public transport the rest of the 43% will be met by private transport.","Heroic Effort Scenario : 66% of the demand will be met by public transport the rest of 34% will be met by private forms of transport."],["Least Effort Scenario : EV penetration for buses is 7% cars 2%and 4% for 2 wheelers","Determined Effort Scenario : In level 2, the EV penetration for buses is 11%, for cars 5% , 9% for the 2 wheelers.","Aggressive Effort Scenario : The EV penetration for buses is 22%, for cars 13%, for the 2 wheelers is 26%.","Heroic Effort Scenario : EV penetration for buses is 44%, for cars is 35%, and for 2 wheelers is 53%."],[null,null,null,null],["Least Effort Scenario: with increasing economic wealth, the demand for white goods is also expected to grow, adding to the overall freight demand. All this would lead to an increase in the freight transport requirement from present levels to about 16,250 BTKMs by 2046-47.","Determined Effort Scenario: better planned markets and points of consumption, the freight traffic volumes are expected to reduce by 9% of  levels to reach 14,823 BTKM’s by 2046-47.  ","Aggressive Effort Scenario: Planned industrial clusters along with optimized transport logistics serving commercial and industrial needs would help in reducing the total volume of freight traffic by about 13 per cent  to reach 14,110 BTKM’s by 2046-47. ","Heroic Effort Scenario: Concentrated economic activity in the form of logistics parks, industrial clusters, and industrial centers would result in reduction in the average leads for freight transport on both rail and road. This would imply a reduction in volume of freight traffic by about 18 per cent over Level One by 2046-47 to reach 13, 397 BTKM’s by 2046-47."],[" Least Effort Scenario : . The share of road in India’s total freight traffic by 2046-47 will show a marked increase to 71%, and the share of rail will decline to 29%.  ","Determined Effort Scenario: Railway freight transport will see a manifold increase in average speeds from 25 kmph to 50-60 kmph on the freight corridors. This would also be accompanied with tariff rationalization. Thus the trend of falling share of rail based transport is expected to get arrested at about 35% by 2046-47. ","Aggressive Effort Scenario: Rationalization in the tariff regime of railway freight transport, coupled with increased speeds and a shift towards containerization would increase the share of the freight traffic on railways to 40% by 2046-47, with roads accounting for 60%.","Heroic Effort Scenario: New technologies, such as RoadRailers (highway trailers that are specially equipped for intermodal movement on railway tracks and highways) would further help increase the inter-modal share of Railways to 44% by 2046-47."],["Least Effort Scenario : Biomass decline in cooking continues as per past trends.  65% of Rural and 10% of urban households still use non-clean fuels.Efficiency of LPG and PNG cook stoves improve marginally by 3%, while the electricity ones improve by 2%.","Determined Effort Scenario : More penetration of cleaner fuels with better implementation of LPG and Electriicty access programs of the government.  PNG access is made available to 2% of the rural households.  Urban areas use 50% PNG","Aggressive Effort Scenario : Increased quality & service in rural areas leads to active adoption of electricity, LPG and PNG, with 17% of the households using electricity and 36 % LPG and 10% PNG. Urban areas use 63% PNG","Heroic Effort Scenario : By 2047, 32% of the rural households use LPG and 22% depend on electricity. Only a quarter of rural households use biomass (mostly with clean cook-stoves) and PNG penetration has increased to 18%. Efficiency increase of the cookstoves is maximum"],[null,null,null,null],["Least Effort Scenario : Assumes only slight improvement in efficiency over 2007 levels. The usage hours of appliances are also high. ","Determined Effort Scenario : Assumes 45% of the appliances have low efficiency while 38% have medium efficiency with balance 17% being high efficiency appliances. ","Aggressive Effort Scenario : Assumes a 50% share of high efficiency appliances and a small 11% share of low efficiency and the balance being medium efficient.","Heroic Effort Scenario : Assumes a complete market transformation to high efficiency appliances.   There is high public awareness on conservation, resulting in 90% of appliances being high efficiency, 9% being medium efficiency and 1% being low efficiency."],["Least Effort Scenario : Assumes that compliance to the ECBC codes remains voluntary. Institutional, technological, informational and financial barriers also exist, which hinder the applicability of the same.","Determined Effort Scenario : Assumes that the interventions for ECBC compliance and retrofitting of buildings still target the commercial sector and there are still no interventions targeting the residential sector.","Aggressive Effort Scenario: Assumes that along with standard building bye laws, there is development of ECBC compliance structures at state level, and the modification of the EPI bandwidth based scheme to multi variable EPI scheme. ","Heroic Effort Scenario : Assumes a continuation of the multi variable EPI scheme and increasing mandates in states for implementation of the ECBC code. It  assumes the development of a large retrofitting programme for commercial buildings. Further, this scenario assumes revisions in the code every 10 years increasing the energy savings. "],["Least Effort Scenario : Assumes no new Government policies, although one PAT cycle has been considered resulting in improvement in efficiency of specific units/ designated consumers (DCs) across various PAT sub-sectors.  ","Determined Effort scenario: This scenario not only captures the PAT scheme as it currently stands, but also extends it such that it increases its coverage under the seven sectors. ","Aggressive Effort Scenario: This scenario further increases the PAT coverage as indicated under the seven sectors.  The units not covered under PAT increase their efficiency across processes at rate of 20% of the efficiency improvement under PAT. ","Heroic Effort Scenario: An optimistic scenario, which indicates the maximum improvement that can be achieved in the industry sector. Each industry sub sector is assumed to achieve the best level of efficiencies known today across processes."],["Least Effort Scenario : Commercial demand  expresses elasticity of 1 with GDP with 85% and 15% demand being met by LPG and PNG respectively.Cookstove efficiency increasing by 3%","Determined Effort Scenario: Commercial demand  expresses elasticity of 0.9 with GDP with 63% and 37% demand being met by LPG and PNG respectively.Cookstove efficiency increases by 5%","Aggressive Effort Scenario: Commercial demand  expresses elasticity of 0.8 with GDP with 50% and 50% demand being met by LPG and PNG respectively.Cookstove efficiency increases by 8%","Heroic Effort Scenario: Commercial demand  expresses elasticity of 0.7 with GDP with 34% and 66% demand being met by LPG and PNG respectively. Cookstove efficiency increases by 10%"],[null,null,null," "],["Least Effort Scenario : Assumes only slight improvement in efficiency over 2007 levels.","Determined Effort Scenario : Assumes, in 2047, 45% of the appliances have low efficiency while 38% have medium efficiency with balance 17% being high efficiency appliances. ","Aggressive Effort Scenario : Assumes a 50% share of high efficiency appliances and a small 11% share of low efficiency and the balance being medium efficient in 2047. ","Heroic Effort Scenario : Assumes a complete market transformation to high efficiency appliances. "],["Least Effort Scenario : Assumes that compliance to ECBC codes remains voluntary. Institutional, technological, informational and financial barriers also exist, which hinder the applicability of the same. ","Determined Effort Scenario : Assumes, as per the Energy Conservation Act 2001, introduction of a bye law for ECBC compliance in new commercial buildings, and mandatory compliance in government buildings. It also assumes retrofits in the commercial sector.","Aggressive Effort Scenario: Assumes that along with standard building bye laws, there is development of ECBC compliance structures at state level, and the modification of the EPI bandwidth based scheme to multi variable EPI scheme. ","Heroic Effort Scenario : Assumes a continuation of the multi variable EPI scheme and increasing mandates in states for implementation of the ECBC code. It also assumes the development of a large retrofitting programme for commercial buildings. "],[null,null,null,null],["Least Effort Scenario : The demand for mechanization is high due to shortage of farm labour and increased size of land holdings, favourable economics versus animal labour, opportunities for renting out, and favourable policy landscape. ","Determined Effort Scenario : The demand for mechanization grows steadily as availability of farm labour and cost of labour increase. Demand grows by 5.5% and average hours of use reduce to 500 hours from Level 1. ","Aggressive Effort Scenario : Tractor demand grows by 5% as the shift of labour from agriculture is not as rapid, and proportion of land under small and marginal farmer’s increases. Fuel efficiency further improves, with only 3.5 litres needed to run for an hour.","Heroic Effort Scenario : Assumes that fuel efficiency of tractors improves significantly, resulting in fuel savings of 33%. The demand grows still slower at 4.5% due to relatively unfavourable environment for mechanisation. "],["Least Effort Scenario : Diesel is used to satisfy about 20% of the total irrigation demand due to unreliability of electricity supply, and deceleration in the growth of pump-sets energised from the grid. Solar pumping remains too expensive to be used. ","Determined Effort Scenario : 85% of the demand is met through electricity and diesel use is restricted to 10% of the total pumping requirementSolar penetration reaches 5% in regions with rich solar insolation.  ","Aggressive Effort Scenario : Diesel and electrical shares further reduce by 5 percentage points from level B, and solar is benefitted through large-scale pilot projects, retrofitting and partial removal of fuel subsidies to agriculture sector. ","Heroic Effort Scenario : Diesel is no longer a preferred fuel source due to unfavourable life-cycle economics in level D. 75% of demand is met through electricity and 25% through solar, owing to rapid decline in solar PV module costs and complete removal of electricity subsidies."],["Least Effort Scenario : We assume that no regulations have been enforced and the present scenario continues. Therefore, diesel meets significant proportion (16.67%) of total energy demand required by the telecom towers.","Determined Effort Scenario : We assume that telecom towers will be backed up by diesel and renewables such as solar panels, biomass energy, fuel cells, biogas.","Aggressive Effort Scenario : A positive scenario is represented by this level where all government regulations are met and assumes full electrification of the country. Telecom towers run on grid supply and renewables only in both urban and rural areas. ","Heroic Effort Scenario : It is the most optimistic scenario where we assume that the dependence on grid supply system has reduced. Diesel free telecom sector target is met by 2032. "],[null,null,null,null],["Least Effort Scenario : Only a marginal improvement in T&D losses is assumed.","Determined Effort Scenario: A pan India large-scale deployment of Smart Grid technologies is assumed to happen at a relatively slow pace.","Aggressive Effort Scenario: Building on the success of the pilot projects, various technologies are leveraged under a clean energy policy drive to achieve financially viable and sustainable Smart Grids. ","Heroic Effort Scenario: Reforms in the electricity sector are carried out via elimination of cross-subsidies, innovative and competitive tariff structures, increased private participation in electricity business, electric vehicles, real-time energy markets, bi-directional flow of electricity and prosumer enablement."]];
window.twentyfifty.helpPages = {"primary_energy_chart":"83","electricity":"84","energy_security":"85","sankey":"86","map":"87","costs_in_context":"88","costs_compared_overview":"89","costs_sensitivity":"90","story":"91","air_quality":"TBD"};
window.twentyfifty.choice_sizes = {"0":4,"2":4,"3":4,"5":4,"6":4,"7":4,"8":4,"9":4,"10":4,"11":4,"12":4,"13":4,"14":4,"16":4,"17":4,"18":4,"19":4,"20":4,"22":4,"23":4,"24":4,"27":4,"28":4,"29":4,"30":4,"32":4,"33":4,"34":4,"36":4,"37":4,"38":4,"39":4,"41":4,"42":4,"44":4,"45":4,"46":4,"48":4};
(function() {
  var action, cache, callbacks, checkResolution, choices, choicesForCode, codeForChoices, comparator, controller, current_view, demoOriginalLevel, demoTimer, documentReady, float_to_letter_map, getChoices, getComparator, getSector, go, letter_to_float_map, loadMainPathway, loadSecondaryPathway, old_choices, pathwayDescriptions, pathwayName, sector, setChoices, setHelpUrl, setUpControls, setVariablesFromURL, startDemo, stopDemo, switchComparator, switchPathway, switchSector, switchView, updateControls, url, views;

  views = {};

  controller = null;

  choices = null;

  action = null;

  sector = null;

  comparator = null;

  current_view = null;

  old_choices = [];

  cache = {};

  callbacks = {};

  documentReady = function() {
    setVariablesFromURL();
    current_view = views[action];
    setHelpUrl();
    if ($.jStorage.get('CostCaveatShown') !== true) {
      $('#cost_caveats').show();
    }
    loadMainPathway();
    setUpControls();
    return checkResolution();
  };

  $(document).ready(documentReady);

  setUpControls = function() {
    $("a[title]").tooltip({
      delay: 0,
      position: 'top left',
      offset: [3, 3],
      tip: '#tooltip'
    });
    return $("a.choiceLink").click(function(event) {
      var c, l, t;
      event.preventDefault();
      t = $(event.target);
      c = t.data().choicenumber;
      l = t.data().choicelevel;
      return go(c, l);
    });
  };

  setVariablesFromURL = function() {
    var url_elements;
    url_elements = window.location.pathname.split('/');
    controller = url_elements[1] || "pathways";
    choices = choicesForCode(url_elements[2] || twentyfifty.default_pathway);
    action = url_elements[3] || "primary_energy_chart";
    if (action === 'costs_compared_within_sector') {
      sector = url_elements[4];
    }
    if (url_elements[4] === 'comparator') {
      return comparator = url_elements[5];
    }
  };

  float_to_letter_map = {
    "": "0",
    1.0: "1",
    1.1: "b",
    1.2: "c",
    1.3: "d",
    1.4: "e",
    1.5: "f",
    1.6: "g",
    1.7: "h",
    1.8: "i",
    1.9: "j",
    2.0: "2",
    2.1: "l",
    2.2: "m",
    2.3: "n",
    2.4: "o",
    2.5: "p",
    2.6: "q",
    2.7: "r",
    2.8: "s",
    2.9: "t",
    3.0: "3",
    3.1: "v",
    3.2: "w",
    3.3: "x",
    3.4: "y",
    3.5: "z",
    3.6: "A",
    3.7: "B",
    3.8: "C",
    3.9: "D",
    0.0: "0",
    4.0: "4"
  };

  codeForChoices = function(c) {
    var cd, choice;
    if (c == null) {
      c = choices;
    }
    cd = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = c.length; _i < _len; _i++) {
        choice = c[_i];
        _results.push(float_to_letter_map[choice]);
      }
      return _results;
    })();
    return cd.join('');
  };

  letter_to_float_map = {
    "1": 1.0,
    "b": 1.1,
    "c": 1.2,
    "d": 1.3,
    "e": 1.4,
    "f": 1.5,
    "g": 1.6,
    "h": 1.7,
    "i": 1.8,
    "j": 1.9,
    "2": 2.0,
    "l": 2.1,
    "m": 2.2,
    "n": 2.3,
    "o": 2.4,
    "p": 2.5,
    "q": 2.6,
    "r": 2.7,
    "s": 2.8,
    "t": 2.9,
    "3": 3.0,
    "v": 3.1,
    "w": 3.2,
    "x": 3.3,
    "y": 3.4,
    "z": 3.5,
    "A": 3.6,
    "B": 3.7,
    "C": 3.8,
    "D": 3.9,
    "0": 0.0,
    "4": 4.0
  };

  choicesForCode = function(newCode) {
    var choice, _i, _len, _ref, _results;
    _ref = newCode.split('');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      choice = _ref[_i];
      _results.push(letter_to_float_map[choice]);
    }
    return _results;
  };

  getChoices = function() {
    return choices;
  };

  getSector = function() {
    return parseInt(sector);
  };

  switchSector = function(new_sector) {
    sector = new_sector;
    if (history['pushState'] != null) {
      history.pushState(choices, codeForChoices(), url());
    }
    switchView('costs_compared_within_sector');
    current_view.teardown();
    return current_view.updateResults(cache[codeForChoices()]);
  };

  getComparator = function() {
    return comparator;
  };

  switchComparator = function(new_comparator) {
    comparator = new_comparator;
    if (history['pushState'] != null) {
      history.pushState(choices, codeForChoices(), url());
    }
    if (current_view.switchComparator != null) {
      return current_view.switchComparator(comparator);
    }
  };

  url = function(options) {
    var s;
    if (options == null) {
      options = {};
    }
    s = jQuery.extend({
      controller: controller,
      code: codeForChoices(),
      action: action,
      sector: sector,
      comparator: getComparator()
    }, options);
    if (s.action === 'costs_compared_within_sector' && (s.sector != null)) {
      return "/" + s.controller + "/" + s.code + "/" + s.action + "/" + s.sector;
    } else if (s.comparator != null) {
      return "/" + s.controller + "/" + s.code + "/" + s.action + "/comparator/" + s.comparator;
    } else {
      return "/" + s.controller + "/" + s.code + "/" + s.action;
    }
  };

  go = function(index, level) {
    old_choices = choices.slice(0);
    if (index <= 15 && index !== 3 && level > 1 && Math.ceil(choices[index]) === level) {
      choices[index] = Math.round((choices[index] - 0.1) * 10) / 10;
    } else {
      choices[index] = level;
    }
    return loadMainPathway();
  };

  demoTimer = null;

  demoOriginalLevel = null;

  startDemo = function(choice) {
    var demoLevel, demoMaximum;
    demoLevel = 1;
    demoOriginalLevel = choices[choice];
    demoMaximum = window.twentyfifty.choice_sizes[choice];
    return demoTimer = setInterval((function() {
      go(choice, demoLevel);
      demoLevel = demoLevel + 1;
      if (demoLevel > demoMaximum) {
        demoLevel = 1;
      }
      return false;
    }), 1000);
  };

  stopDemo = function(choice) {
    if (demoTimer != null) {
      clearInterval(demoTimer);
    }
    if ((demoOriginalLevel != null) && demoOriginalLevel !== choices[choice]) {
      return go(choice, demoOriginalLevel);
    }
  };

  switchView = function(new_action) {
    $('ul#view_choices').hide();
    if (action === new_action) {
      return false;
    }
    current_view.teardown();
    action = new_action;
    if (history['pushState'] != null) {
      history.pushState(choices, codeForChoices(), url());
    }
    current_view = views[action];
    setHelpUrl();
    return current_view.updateResults(cache[codeForChoices()]);
  };

  setHelpUrl = function() {
    return $('#help a').attr('href', 'http://indiaenergy.gov.in/about_howto.php');
  };

  switchPathway = function(new_code) {
    old_choices = choices.slice(0);
    choices = choicesForCode(new_code);
    return loadMainPathway();
  };

  setChoices = function(new_choices) {
    old_choices = choices.slice(0);
    choices = new_choices;
    return loadMainPathway();
  };

  loadMainPathway = function(pushState) {
    var fetch, main_code;
    if (pushState == null) {
      pushState = true;
    }
    if (choices.join('') === old_choices.join('')) {
      return false;
    }
    updateControls(old_choices, choices);
    main_code = codeForChoices();
    if (history['pushState'] != null) {
      history.pushState(choices, main_code, url());
    }
    if (cache[main_code] != null) {
      current_view.updateResults(cache[main_code]);
      return $('#calculating').html("<br >");
    } else {
      $('#calculating').html("Calculating");
      fetch = function() {
        return $.getJSON(url({
          code: main_code,
          action: 'data',
          sector: null,
          comparator: null
        }), function(data) {
          if (data != null) {
            cache[data._id] = data;
            if (data._id === codeForChoices()) {
              current_view.updateResults(data);
              return $('#calculating').html("<br >");
            }
          }
        });
      };
      return fetch();
    }
  };

  loadSecondaryPathway = function(secondary_code, callback) {
    var fetch;
    if (cache[secondary_code] != null) {
      return callback(cache[secondary_code]);
    } else {
      fetch = (function(_this) {
        return function() {
          return $.getJSON(url({
            code: secondary_code,
            action: 'data',
            sector: null,
            comparator: null
          }), function(data) {
            if (data != null) {
              cache[data._id] = data;
              return callback(data);
            }
          });
        };
      })(this);
      return fetch();
    }
  };

  window.onpopstate = function(event) {
    var url_elements;
    if (!event.state) {
      return false;
    }
    url_elements = window.location.pathname.split('/');
    setChoices(choicesForCode(url_elements[2]));
    switchView(url_elements[3]);
    if (action === 'costs_compared_within_sector') {
      switchSector(url_elements[4]);
    }
    if (url_elements[4] === 'comparator') {
      return switchComparator(url_elements[5]);
    }
  };

  updateControls = function(old_choices, choices) {
    var c, choice, choice_fraction, choice_whole, controls, i, old_choice, old_choice_fraction, old_choice_whole, row, _i, _j, _len, _ref, _ref1, _results;
    this.choices = choices;
    controls = $('#classic_controls');
    _ref = this.choices;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      choice = _ref[i];
      old_choice = old_choices[i];
      if (choice !== old_choices[i]) {
        old_choice_whole = Math.ceil(old_choice);
        old_choice_fraction = parseInt((old_choice % 1) * 10);
        choice_whole = Math.ceil(choice);
        choice_fraction = parseInt((choice % 1) * 10);
        row = controls.find("tr#r" + i);
        row.find(".selected, .level" + old_choice_whole + ", .level" + old_choice_whole + "_" + old_choice_fraction).removeClass("selected level" + old_choice_whole + " level" + old_choice_whole + "_" + old_choice_fraction);
        if (old_choice_fraction !== 0) {
          controls.find("#c" + i + "l" + old_choice_whole).text(old_choice_whole);
        }
        row.find("#c" + i + "l" + choice_whole).addClass('selected');
        for (c = _j = 1, _ref1 = choice_whole - 1; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; c = 1 <= _ref1 ? ++_j : --_j) {
          controls.find("#c" + i + "l" + c).addClass("level" + choice_whole);
        }
        if (choice_fraction !== 0) {
          controls.find("#c" + i + "l" + choice_whole).text(choice);
          _results.push(controls.find("#c" + i + "l" + choice_whole).addClass("level" + choice_whole + "_" + choice_fraction));
        } else {
          _results.push(controls.find("#c" + i + "l" + choice_whole).addClass("level" + choice_whole));
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  pathwayName = function(pathway_code, default_name) {
    if (default_name == null) {
      default_name = null;
    }
    return window.twentyfifty.pathway_names_hash[pathway_code] || default_name;
  };

  pathwayDescriptions = function(pathway_code, default_description) {
    if (default_description == null) {
      default_description = null;
    }
    return window.twentyfifty.pathway_descriptions_hash[pathway_code] || default_description;
  };

  checkResolution = function() {
    if ($(window).width() < 1400) {
      return $("#menu").hide();
    } else {
      return $("#menu2").hide();
    }
  };

  window.twentyfifty.code = codeForChoices;

  window.twentyfifty.getChoices = getChoices;

  window.twentyfifty.setChoices = setChoices;

  window.twentyfifty.getSector = getSector;

  window.twentyfifty.switchSector = switchSector;

  window.twentyfifty.getComparator = getComparator;

  window.twentyfifty.switchComparator = switchComparator;

  window.twentyfifty.url = url;

  window.twentyfifty.go = go;

  window.twentyfifty.loadMainPathway = loadMainPathway;

  window.twentyfifty.loadSecondaryPathway = loadSecondaryPathway;

  window.twentyfifty.switchView = switchView;

  window.twentyfifty.switchPathway = switchPathway;

  window.twentyfifty.pathwayName = pathwayName;

  window.twentyfifty.pathwayDescriptions = pathwayDescriptions;

  window.twentyfifty.startDemo = startDemo;

  window.twentyfifty.stopDemo = stopDemo;

  window.twentyfifty.views = views;

}).call(this);
(function() {
  var adjust_costs_of_pathway, calculateIncrementalCost, cost_categories, cost_override_in_place_warning, costs_in_category, group_costs_of_pathway, setDefaultStoreIfRequired,
    __hasProp = {}.hasOwnProperty;

  window.costCaveatHTML = "<div id='cost_caveats'>\n  We would like your help to develop this tool. Please\n<a href=\"http://planningcommission.nic.in/sectors/index.php?sectors=energy\">click here</a>\n  to find out more about our methodology and suggest improvements.\nBefore viewing the cost implications of your choices, please note that:\n  <ol>\n  <li>\n    The Calculator expresses pathway costs as 'average pounds per person per year'. This is not the same as your energy bill. It is the cost of everything India buys that makes, converts, saves or uses energy: from kettles and insulation from to trains and power stations. You can choose to see the results in different units when using the\n    <a href=\"http://planningcommission.nic.in/sectors/index.php?sectors=energy\">excel version of the Calculator.</a>\n      </li>\n  <li>The Calculator does not choose any options automatically, regardless of their cost.</li>\n  <li>\n    The Calculator uses forecasts from credible sources of how technology and fuel costs might rise or fall over time. You vary these forecasts using the\n    <a href=\"#\" onclick=\"twentyfifty.switchView('costs_sensitivity'); return false;\">cost sensitivity</a>\n      implication from the menu on the top left. The full set of data points is available on the\n    <a href=\"http://planningcommission.nic.in/sectors/index.php?sectors=energy\">wiki.</a>\n      </li>\n  <li>The cost of not tackling climate change is not included in the Calculator. The Stern review estimated that failing to tackle climate change could reduce global GDP by up to 20%. This is the equivalent of up to &pound;6,500 per person per year on average, on top of the cost of the energy system.</li>\n  <li>Some other important effects have been excluded from the Calculator. The costs of travelling less or with different modes of transport, having colder homes or fewer goods, and changing the appearance of our houses or landscape are not included. Nor are profits, taxes, subsidies or economies of scale driven by pathway choices. The Calculator includes only the physical costs of constructing, operating and fuelling equipment.</li>\n  <li>Costs are just one feature for comparing 2050 pathways. The Calculator provides information on other impacts, as well as some illustrative pathways to compare your choices with.</li>\n</ol>\n<div id='understand'>\n  <a href=\"#\" onclick=\"$.jStorage.set('CostCaveatShown',true);$('#cost_caveats').hide(); return false;\">Click to continue using the calculator</a>\n</div>\n</div>";

  window.costEssentialNotesHTML = "<div id='essentialnotes'>\n  Note: The cost of failing to tackle climate change is not included. Some pathways, including the 'All at Level 1' pathway shown here, fail to tackle climate change. The Stern review estimated that failing to tackle climate change could reduce global GDP by up to 20% (equivalent to up to &pound;6500 per person per year on top of the cost of the energy system included in the chart above). Nor are the costs of travelling less, being colder, or consuming less included.\n  <a href=\"#\" onclick=\"$.jStorage.deleteKey('CostCaveatShown');$('#cost_caveats').show(); return false;\">Show the caveats again</a>\n</div>";

  cost_categories = {
    "Conventional thermal plant": "Electricity",
    "Combustion + CCS": "Electricity",
    "Nuclear power": "Electricity",
    "Onshore wind": "Electricity",
    "Offshore wind": "Electricity",
    "Hydroelectric": "Electricity",
    "Wave and Tidal": "Electricity",
    "Geothermal": "Electricity",
    "Distributed solar PV": "Electricity",
    "Distributed solar thermal": "Buildings",
    "Micro wind": "Electricity",
    "Biomatter to fuel conversion": "Bioenergy",
    "Bioenergy imports": "Bioenergy",
    "Agriculture and land use": "Bioenergy",
    "Energy from waste": "Bioenergy",
    "Waste arising": "Bioenergy",
    "Marine algae": "Bioenergy",
    "Electricity imports": "Electricity",
    "Electricity Exports": "Electricity",
    "Electricity grid distribution": "Electricity",
    "Storage, demand shifting, backup": "Electricity",
    "H2 Production": "Transport",
    "Domestic heating": "Buildings",
    "Domestic insulation": "Buildings",
    "Commercial heating and cooling": "Buildings",
    "Domestic lighting, appliances, and cooking": "Buildings",
    "Commercial lighting, appliances, and catering": "Buildings",
    "Industrial processes": "Industry",
    "Conventional cars and buses": "Transport",
    "Hybrid cars and buses": "Transport",
    "Electric cars and buses": "Transport",
    "Fuel cell cars and buses": "Transport",
    "Bikes": "Transport",
    "Rail": "Transport",
    "Domestic aviation": "Transport",
    "Domestic freight": "Transport",
    "International aviation": "Transport",
    "International shipping (maritime bunkers)": "Transport",
    "Geosequestration": "Other",
    "Petroleum refineries": "Industry",
    "Coal": "Fossil fuels",
    "Oil": "Fossil fuels",
    "Gas": "Fossil fuels",
    "Fossil fuel transfers": "Fossil fuels",
    "District heating effective demand": "Buildings",
    "Power Carbon Capture": "Electricity",
    "Industry Carbon Capture": "Industry",
    "Storage of captured CO2": "Other",
    "Finance cost": "Finance"
  };

  costs_in_category = function(desired_category) {
    var category, cost, costs;
    costs = [];
    for (cost in cost_categories) {
      if (!__hasProp.call(cost_categories, cost)) continue;
      category = cost_categories[cost];
      if (category === desired_category) {
        costs.push(cost);
      }
    }
    return costs;
  };

  group_costs_of_pathway = function(pathway) {
    var categorised_costs, category, category_name, high, low, name, range, values, _ref;
    if (pathway.total_cost_low_adjusted == null) {
      adjust_costs_of_pathway(pathway);
    }
    categorised_costs = {};
    _ref = pathway.cost_components;
    for (name in _ref) {
      if (!__hasProp.call(_ref, name)) continue;
      values = _ref[name];
      category_name = cost_categories[name];
      category = categorised_costs[category_name];
      if (category == null) {
        category = categorised_costs[category_name] = {
          low: 0,
          range: 0,
          high: 0
        };
      }
      low = values.low_adjusted;
      range = values.range_adjusted;
      high = values.high_adjusted;
      values.low_adjusted_with_finance = low;
      values.range_adjusted_with_finance = range;
      values.high_adjusted_with_finance = high;
      category.low += low;
      category.range += range;
      category.high += high;
      category[name] = values;
    }
    pathway.categorised_costs = categorised_costs;
    return pathway;
  };

  cost_override_in_place_warning = function() {
    var ignore, name, o, _results;
    _results = [];
    for (name in cost_categories) {
      if (!__hasProp.call(cost_categories, name)) continue;
      ignore = cost_categories[name];
      o = jQuery.jStorage.get(name, void 0);
      if ((o != null) && o !== 'point') {
        $('#cost_override_warning').show();
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  adjust_costs_of_pathway = function(pathway) {
    var cost, finance, fraction_of_width, implied_fraction_of_width, name, total, values, _ref;
    total = {
      low: 0,
      range: 0,
      high: 0,
      finance_max: 0
    };
    _ref = pathway.cost_components;
    for (name in _ref) {
      if (!__hasProp.call(_ref, name)) continue;
      values = _ref[name];
      fraction_of_width = jQuery.jStorage.get(name, null);
      if ((fraction_of_width != null) && fraction_of_width !== 'point' && fraction_of_width !== 'uncertain') {
        cost = values.low + (values.range * fraction_of_width);
        finance = values.finance_low + (values.finance_range * fraction_of_width);
        values.low_adjusted = cost;
        values.range_adjusted = 0;
        values.high_adjusted = cost;
        values.finance_low_adjusted = finance;
        values.finance_range_adjusted = 0;
        values.finance_high_adjusted = finance;
      } else if (fraction_of_width === 'uncertain') {
        values.low_adjusted = values.low;
        values.range_adjusted = values.range;
        values.high_adjusted = values.high;
        values.finance_low_adjusted = values.finance_low;
        values.finance_range_adjusted = values.finance_range;
        values.finance_high_adjusted = values.finance_high;
      } else {
        values.low_adjusted = values.point;
        values.range_adjusted = 0;
        values.high_adjusted = values.point;
        implied_fraction_of_width = (values.point - values.low) / values.range;
        finance = values.finance_low + (values.finance_range * implied_fraction_of_width);
        values.finance_low_adjusted = values.finance;
        values.finance_range_adjusted = 0;
        values.finance_high_adjusted = values.finance;
      }
      total.low += values.low_adjusted;
      total.range += values.range_adjusted;
      total.high += values.high_adjusted;
      total.finance_max += values.finance_high_adjusted;
    }
    pathway.total_cost_low_adjusted = total.low;
    pathway.total_cost_range_adjusted = total.range;
    pathway.total_cost_high_adjusted = total.high;
    return pathway;
  };

  setDefaultStoreIfRequired = function(pathway) {
    var name, values, _ref;
    if (jQuery.jStorage.get('defaultCostsSet') === true) {
      return false;
    }
    _ref = pathway.cost_components;
    for (name in _ref) {
      if (!__hasProp.call(_ref, name)) continue;
      values = _ref[name];
      if ((name !== 'Oil') && (name !== 'Gas') && (name !== 'Coal') && (name !== 'Finance cost')) {
        jQuery.jStorage.set(name, 0);
      }
    }
    return jQuery.jStorage.set('defaultCostsSet', true);
  };

  calculateIncrementalCost = function(pt, pc) {
    var cc, ct, cvalues, name, tc, tt, tvalues, _ref;
    if (pt.total_cost_low_adjusted == null) {
      adjust_costs_of_pathway(pt);
    }
    if (pc.total_cost_low_adjusted == null) {
      adjust_costs_of_pathway(pc);
    }
    tt = 0;
    tc = 0;
    ct = 0;
    cc = 0;
    _ref = pt.cost_components;
    for (name in _ref) {
      if (!__hasProp.call(_ref, name)) continue;
      tvalues = _ref[name];
      if (name !== 0) {
        cvalues = pc.cost_components[name];
        if (tvalues.range_adjusted === cvalues.range_adjusted) {
          tt += tvalues.low_adjusted;
          tc += tvalues.low_adjusted;
          ct += cvalues.low_adjusted;
          cc += cvalues.low_adjusted;
        } else if (tvalues.range_adjusted >= cvalues.range_adjusted) {
          tt += tvalues.low_adjusted;
          ct += cvalues.low_adjusted;
          tc += tvalues.high_adjusted;
          cc += cvalues.high_adjusted;
        } else {
          tt += tvalues.high_adjusted;
          ct += cvalues.high_adjusted;
          tc += tvalues.low_adjusted;
          cc += cvalues.low_adjusted;
        }
      }
    }
    return {
      tc: tc,
      tt: tt,
      cc: cc,
      ct: ct
    };
  };

  window.twentyfifty.group_costs_of_pathway = group_costs_of_pathway;

  window.twentyfifty.adjust_costs_of_pathway = adjust_costs_of_pathway;

  window.twentyfifty.calculateIncrementalCost = calculateIncrementalCost;

  window.twentyfifty.costs_in_category = costs_in_category;

  window.twentyfifty.cost_override_in_place_warning = cost_override_in_place_warning;

}).call(this);
(function() {
  var PrimaryEnergy;

  PrimaryEnergy = (function() {
    function PrimaryEnergy() {}

    PrimaryEnergy.prototype.setup = function() {
      var target;
      target = $('#results');
      target.append("<div id='demand_chart' class='chart'></div>");
      target.append("<div id='supply_chart' class='chart'></div>");
      target.append("<div id='dependency_chart' class='chart'></div>");
      document.getElementById("demand_chart").style.width = "24%";
      document.getElementById("supply_chart").style.width = "24%";
      document.getElementById("dependency_chart").style.width = "24%";
      document.getElementById("results").style.overflow = "inherit";
      document.getElementById("viewmessage").style.width = "15%";
      document.getElementById("viewmessage").style.margin = "1% 0% 1% 1%";
      this.final_energy_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'demand_chart'
        },
        title: {
          text: 'Energy Demand'
        },
        subtitle: {
          text: "TWh/yr of final energy"
        },
        yAxis: {
          title: null,
          min: 0,
          max: 40000
        },
        series: [],
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'center',
          verticalAlign: 'middle',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            if (this.name.toLowerCase() === "energy demand in least effort scenario") {
              return "Least effort";
            }
            words = this.name.split(/[\s]+/).splice(0, 2);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        }
      });
      this.primary_energy_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'supply_chart'
        },
        title: {
          text: 'Energy Supply'
        },
        subtitle: {
          text: "TWh/yr of primary energy"
        },
        yAxis: {
          title: null,
          min: 0,
          max: 40000
        },
        series: [],
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'center',
          verticalAlign: 'middle',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            if (this.name.toLowerCase() === "energy supply in least effort scenario") {
              return "Least effort";
            }
            words = this.name.split(/[\s]+/).splice(0, 2);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        }
      });
      return this.dependency_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'dependency_chart',
          type: 'line'
        },
        title: {
          text: 'Import Dependence'
        },
        subtitle: {
          text: "Percentage of fossil fuels imported"
        },
        yAxis: {
          title: null,
          min: 0,
          max: 100
        },
        xAxis: {
          labels: {
            formatter: function() {
              switch (this.value) {
                case 2012:
                  return 2012;
                case 2027:
                  return 2027;
                case 2037:
                  return 2037;
                case 2047:
                  return 2047;
              }
            }
          },
          value: 148400.,
          dashStyle: 'longdashdot'
        },
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'right',
          verticalAlign: 'bottom',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            words = this.name.split(/[\s]+/).splice(0, 2);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 0, ',')) + " % Imported";
          }
        },
        series: []
      });
    };

    PrimaryEnergy.prototype.teardown = function() {
      document.getElementById("viewmessage").style.display = "none";
      $('#results').empty();
      this.final_energy_chart = null;
      this.primary_energy_chart = null;
      return this.dependency_chart = null;
    };

    PrimaryEnergy.prototype.updateResults = function(pathway) {
      var d, data, i, name, titles, titles_dependency, _i, _j, _k, _len, _len1, _len2;
      this.pathway = pathway;
      if (!((this.dependency_chart != null) && (this.final_energy_chart != null) && (this.primary_energy_chart != null))) {
        this.setup();
      }
      titles_dependency = ['Coal Imports', 'Oil Imports', 'Gas Imports', 'Overall'];
      i = 0;
      for (_i = 0, _len = titles_dependency.length; _i < _len; _i++) {
        name = titles_dependency[_i];
        data = this.pathway['dependency'][name];
        data = (function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
            d = data[_j];
            _results.push(d * 100);
          }
          return _results;
        })();
        if (this.dependency_chart.series[i] != null) {
          this.dependency_chart.series[i].setData(data, false);
        } else {
          this.dependency_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      this.dependency_chart.series[3].color = "#000000";
      this.dependency_chart.series[3].options.lineWidth = 3;
      this.dependency_chart.series[3].options.dashStyle = "longdashdot";
      titles = ["Transport", "Industry", "Cooking", "Lighting & Appliances", "Telecom", "Agriculture"];
      i = 0;
      for (_j = 0, _len1 = titles.length; _j < _len1; _j++) {
        name = titles[_j];
        data = this.pathway['final_energy_demand'][name];
        if (this.final_energy_chart.series[i] != null) {
          this.final_energy_chart.series[i].setData(data, false);
        } else {
          this.final_energy_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      data = this.pathway['demand_do_nothing']["Do-nothing Scenario"];
      if (this.final_energy_chart.series[i] != null) {
        this.final_energy_chart.series[i].setData(data, false);
      } else {
        this.final_energy_chart.addSeries({
          type: 'line',
          name: 'Energy demand in least effort scenario',
          data: data,
          lineColor: '#FF0000',
          color: '#FF0000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
      }
      i++;
      data = this.pathway['final_energy_demand']["Scenario Demand"];
      if (this.final_energy_chart.series[i] != null) {
        this.final_energy_chart.series[i].setData(data, false);
      } else {
        this.final_energy_chart.addSeries({
          type: 'line',
          name: 'Total demand in your chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          shadow: false
        }, false);
      }
      i++;
      titles = ["Bio Energy", "Renewables and Clean Energy", "Electricity oversupply (imports)", "Coal", "Oil", "Natural gas"];
      i = 0;
      for (_k = 0, _len2 = titles.length; _k < _len2; _k++) {
        name = titles[_k];
        data = this.pathway['primary_energy_supply'][name];
        if (this.primary_energy_chart.series[i] != null) {
          this.primary_energy_chart.series[i].setData(data, false);
        } else {
          this.primary_energy_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      data = this.pathway['supply_do_nothing']["Do-nothing Scenario"];
      if (this.primary_energy_chart.series[i] != null) {
        this.primary_energy_chart.series[i].setData(data, false);
      } else {
        this.primary_energy_chart.addSeries({
          type: 'line',
          name: 'Energy supply in least effort scenario',
          data: data,
          lineColor: '#FF0000',
          color: '#FF0000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
      }
      i++;
      data = this.pathway['primary_energy_supply']["Total Primary Supply"];
      if (this.primary_energy_chart.series[i] != null) {
        this.primary_energy_chart.series[i].setData(data, false);
      } else {
        this.primary_energy_chart.addSeries({
          type: 'line',
          name: 'Total supply in your chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          shadow: false
        }, false);
      }
      i++;
      this.dependency_chart.redraw();
      this.final_energy_chart.redraw();
      this.primary_energy_chart.redraw();
      document.getElementById("viewmessage").style.display = "inline-block";
      return document.getElementById("viewmessage").innerHTML = "<h3> Is this scenario over-generating electricity ?  </h3> <p> Your chosen energy scenario creates a maximum of <b> " + Math.round(Math.abs(Math.min(this.pathway['electricity']['electricity_exports']["Electricity exports"][0], this.pathway['electricity']['electricity_exports']["Electricity exports"][1], this.pathway['electricity']['electricity_exports']["Electricity exports"][2], this.pathway['electricity']['electricity_exports']["Electricity exports"][3], this.pathway['electricity']['electricity_exports']["Electricity exports"][4], this.pathway['electricity']['electricity_exports']["Electricity exports"][5], this.pathway['electricity']['electricity_exports']["Electricity exports"][6], this.pathway['electricity']['electricity_exports']["Electricity exports"][7]))) + " </b> TWh/year of excess electricity, potentially available for exports. <br> <br> If your energy choices lead to exports, you may want to bring down conventional and/or renewable energy supplies a notch, or ramp up energy demand. </p>";
    };

    return PrimaryEnergy;

  })();

  window.twentyfifty.views['primary_energy_chart'] = new PrimaryEnergy;

}).call(this);
(function() {
  var Electricity;

  Electricity = (function() {
    function Electricity() {}

    Electricity.prototype.setup = function() {
      var target;
      target = $('#results');
      target.append("<div id='demand_chart' class='chart'></div>").append("<div id='supply_chart' class='chart'></div>").append("<div id='electricity_exports' class='chart'></div>");
      document.getElementById("demand_chart").style.width = "24%";
      document.getElementById("supply_chart").style.width = "24%";
      document.getElementById("electricity_exports").style.width = "24%";
      document.getElementById("results").style.overflow = "inherit";
      document.getElementById("viewmessage").style.width = "15%";
      document.getElementById("viewmessage").style.margin = "1% 0% 1% 1%";
      this.demand_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'demand_chart'
        },
        title: {
          text: 'Electricity demand'
        },
        subtitle: {
          text: "TWh/yr of electricity"
        },
        yAxis: {
          title: null,
          min: 0,
          max: 10000
        },
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'center',
          verticalAlign: 'middle',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            if (this.name.toLowerCase() === "energy demand in least effort scenario") {
              return "Least effort";
            }
            words = this.name.split(/[\s]+/).splice(0, 4);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        },
        series: []
      });
      this.supply_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'supply_chart'
        },
        title: {
          text: 'Electricity supply'
        },
        subtitle: {
          text: "TWh/yr of electricity"
        },
        yAxis: {
          title: null,
          min: 0,
          max: 10000
        },
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'center',
          verticalAlign: 'middle',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            if (this.name.toLowerCase() === "energy supply in least effort scenario") {
              return "Least effort";
            }
            words = this.name.split(/[\s]+/).splice(0, 2);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        },
        series: []
      });
      return this.electricity_exports = new Highcharts.Chart({
        chart: {
          renderTo: 'electricity_exports',
          type: 'line'
        },
        title: {
          text: 'Over-generation / Exports'
        },
        subtitle: {
          text: "TWh/yr of electricity available for exports "
        },
        yAxis: {
          title: null,
          min: 0,
          max: 8000,
          reversed: false
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 0, ',')) + " TWh";
          }
        },
        series: []
      });
    };

    Electricity.prototype.teardown = function() {
      document.getElementById("viewmessage").style.display = "none";
      $('#results').empty();
      this.demand_chart = null;
      this.supply_chart = null;
      return this.electricity_exports = null;
    };

    Electricity.prototype.updateResults = function(pathway) {
      var data, electricity_titles, i, name, titles, _i, _j, _k, _len, _len1, _len2;
      this.pathway = pathway;
      if (!((this.demand_chart != null) && (this.supply_chart != null) && (this.electricity_exports != null))) {
        this.setup();
      }
      titles = ['Transport', 'Industry', 'Cooking', 'Lighting & appliances', 'Telecom', 'Agriculture'];
      i = 0;
      for (_i = 0, _len = titles.length; _i < _len; _i++) {
        name = titles[_i];
        data = this.pathway['electricity']['demand'][name];
        if (this.demand_chart.series[i] != null) {
          this.demand_chart.series[i].setData(data, false);
        } else {
          this.demand_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      data = this.pathway['electricity']['demand']['Total'];
      if (this.demand_chart.series[i] != null) {
        this.demand_chart.series[i].setData(data, false);
      } else {
        this.demand_chart.addSeries({
          type: 'line',
          name: 'Electricity demand in chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
      }
      i++;
      titles = ["Gas Power Stations", "Coal power stations", "Carbon Capture Storage (CCS)", "Electricity Balancing Requirement", "Nuclear power", "Hydro Power Generation", "Solar PV", "Solar CSP", "Onshore Wind", "Offshore Wind", "Small Hydro", "Biomass Based Electricity& Biogas", "Waste to Electricity", "Electricity imports"];
      i = 0;
      for (_j = 0, _len1 = titles.length; _j < _len1; _j++) {
        name = titles[_j];
        data = this.pathway['electricity']['supply'][name];
        if (this.supply_chart.series[i] != null) {
          this.supply_chart.series[i].setData(data, false);
        } else {
          this.supply_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      data = this.pathway['electricity']['supply']['Total generation supplied to grid'];
      if (this.supply_chart.series[i] != null) {
        this.supply_chart.series[i].setData(data, false);
      } else {
        this.supply_chart.addSeries({
          type: 'line',
          name: 'Electricity supply in chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
      }
      i++;
      electricity_titles = ["Electricity exports"];
      i = 0;
      for (_k = 0, _len2 = electricity_titles.length; _k < _len2; _k++) {
        name = electricity_titles[_k];
        data = this.pathway['electricity']['electricity_exports'][name];
        console.log(this.pathway['electricity']['electricity_exports'][name]);
        data = data.map(function(x) {
          return Math.abs(x);
        });
        if (this.electricity_exports.series[i] != null) {
          this.electricity_exports.series[i].setData(data, false);
        } else {
          this.electricity_exports.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      this.demand_chart.redraw();
      this.supply_chart.redraw();
      this.electricity_exports.redraw();
      document.getElementById("viewmessage").style.display = "inline-block";
      return document.getElementById("viewmessage").innerHTML = "<h3> Is this scenario over-generating electricity ?  </h3> <p> Your chosen energy scenario creates a maximum of <b> " + Math.round(Math.abs(Math.min(this.pathway['electricity']['electricity_exports']["Electricity exports"][0], this.pathway['electricity']['electricity_exports']["Electricity exports"][1], this.pathway['electricity']['electricity_exports']["Electricity exports"][2], this.pathway['electricity']['electricity_exports']["Electricity exports"][3], this.pathway['electricity']['electricity_exports']["Electricity exports"][4], this.pathway['electricity']['electricity_exports']["Electricity exports"][5], this.pathway['electricity']['electricity_exports']["Electricity exports"][6], this.pathway['electricity']['electricity_exports']["Electricity exports"][7]))) + " </b> TWh/year of excess electricity, potentially available for exports. <br> <br> If your energy choices lead to exports, you may want to bring down conventional and/or renewable energy supplies a notch, or ramp up energy demand. </p>";
    };

    return Electricity;

  })();

  window.twentyfifty.views['electricity'] = new Electricity;

}).call(this);
(function() {
  var EnergySecurity;

  EnergySecurity = (function() {
    var titles_dependency, titles_import_costs, titles_import_proportion;

    function EnergySecurity() {}

    titles_dependency = ['Coal Imports', 'Oil Imports', 'Gas Imports', 'Overall'];

    titles_import_costs = ["Coal Imports", "Oil Imports", "Gas Imports"];

    titles_import_proportion = ["Coal imports", "Oil imports", "Gas imports"];

    EnergySecurity.prototype.setup = function() {
      var target;
      target = $('#results');
      target.append("<div id='dependency_chart' class='chart'></div>");
      target.append("<div id='import_proportion_chart' class='chart'></div>");
      target.append("<div id='import_costs_chart' class='chart'></div>");
      this.dependency_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'dependency_chart',
          type: 'line'
        },
        title: {
          text: 'Import Dependence'
        },
        subtitle: {
          text: "Percentage of fossil fuels imported"
        },
        yAxis: {
          title: null,
          min: -10,
          max: 100
        },
        xAxis: {
          labels: {
            formatter: function() {
              return this.value;
            }
          },
          value: 148400.,
          dashStyle: 'longdashdot'
        },
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'right',
          verticalAlign: 'bottom',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            words = this.name.split(/[\s]+/).splice(0, 2);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 0, ',')) + " % Imported";
          }
        },
        series: []
      });
      this.import_costs_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'import_costs_chart',
          type: 'column'
        },
        title: {
          text: 'Import Costs'
        },
        subtitle: {
          text: "In INR Crore (10 million) / yr"
        },
        yAxis: {
          title: null,
          min: 0,
          max: 10000000,
          stackLabels: {
            enabled: false,
            style: {
              fontWeight: 'bold',
              color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            }
          }
        },
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'center',
          verticalAlign: 'middle',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            if (this.name.toLowerCase() === "energy demand in least effort scenario") {
              return "Least effort";
            }
            words = this.name.split(/[\s]+/).splice(0, 6);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 0, ',')) + " INR Crore";
          }
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: false,
              color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
            }
          }
        },
        series: []
      });
      return this.import_proportion_chart = new Highcharts.Chart({
        chart: {
          type: 'column',
          renderTo: 'import_proportion_chart'
        },
        title: {
          text: 'Oil, Gas & Coal Imports'
        },
        subtitle: {
          text: "In TWh/yr"
        },
        yAxis: {
          title: null,
          min: 0,
          max: 40000
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 0, ',')) + " TWh/yr";
          }
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'center',
          verticalAlign: 'middle',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            if (this.name.toLowerCase() === "energy demand in least effort scenario") {
              return "Least effort";
            }
            words = this.name.split(/[\s]+/).splice(0, 6);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        },
        series: []
      });
    };

    EnergySecurity.prototype.teardown = function() {
      $('#results').empty();
      this.dependency_chart = null;
      this.import_costs_chart = null;
      return this.import_proportion_chart = null;
    };

    EnergySecurity.prototype.updateResults = function(pathway) {
      var d, data, i, name, _i, _j, _k, _len, _len1, _len2;
      this.pathway = pathway;
      if (!((this.dependency_chart != null) && (this.import_costs_chart != null) && (this.import_proportion_chart != null))) {
        this.setup();
      }
      i = 0;
      for (_i = 0, _len = titles_dependency.length; _i < _len; _i++) {
        name = titles_dependency[_i];
        data = this.pathway['dependency'][name];
        data = (function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = data.length; _j < _len1; _j++) {
            d = data[_j];
            _results.push(d * 100);
          }
          return _results;
        })();
        if (this.dependency_chart.series[i] != null) {
          this.dependency_chart.series[i].setData(data, false);
        } else {
          this.dependency_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      this.dependency_chart.series[3].color = "#000000";
      this.dependency_chart.series[3].options.lineWidth = 3;
      this.dependency_chart.series[3].options.dashStyle = "longdashdot";
      i = 0;
      for (_j = 0, _len1 = titles_import_costs.length; _j < _len1; _j++) {
        name = titles_import_costs[_j];
        data = this.pathway['import_costs'][name];
        if (this.import_costs_chart.series[i] != null) {
          this.import_costs_chart.series[i].setData(data, false);
        } else {
          this.import_costs_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      data = this.pathway['import_costs']['Total Fuel Import Costs'];
      if (this.import_costs_chart.series[i] != null) {
        this.import_costs_chart.series[i].setData(data, false);
      } else {
        this.import_costs_chart.addSeries({
          type: 'line',
          name: 'Total import costs in chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
      }
      i++;
      i = 0;
      for (_k = 0, _len2 = titles_import_proportion.length; _k < _len2; _k++) {
        name = titles_import_proportion[_k];
        data = this.pathway['import_proportions'][name];
        console.log(data);
        if (this.import_proportion_chart.series[i] != null) {
          this.import_proportion_chart.series[i].setData(data, false);
        } else {
          this.import_proportion_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      data = this.pathway['import_proportions']['Overall imports'];
      if (this.import_proportion_chart.series[i] != null) {
        this.import_proportion_chart.series[i].setData(data, false);
      } else {
        this.import_proportion_chart.addSeries({
          type: 'line',
          name: 'Total imports in chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
      }
      this.dependency_chart.redraw();
      this.import_costs_chart.redraw();
      return this.import_proportion_chart.redraw();
    };

    return EnergySecurity;

  })();

  window.twentyfifty.views['energy_security'] = new EnergySecurity;

}).call(this);
(function() {
  var LandUse;

  LandUse = (function() {
    function LandUse() {}

    LandUse.prototype.setup = function() {
      var target;
      target = $('#results');
      target.append("<div id='land_use' class='chart'></div>");
      document.getElementById("land_use").style.width = "100%";
      document.getElementById("results").style.width = "55%";
      document.getElementById("results").style.marginRight = "40px";
      document.getElementById("results").style.overflow = "inherit";
      document.getElementById("viewmessage").style.width = "30%";
      document.getElementById("viewmessage").style.margin = "30px 0px 30px 50px";
      return this.land_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'land_use',
          type: 'bar',
          margin: [45, 25, 70, 140]
        },
        title: {
          text: 'Land Footprint of Renewables, Conventionals and Bionergy'
        },
        subtitle: {
          text: "In hectares of land"
        },
        yAxis: {
          title: null,
          min: 0,
          max: 10000000
        },
        xAxis: {
          categories: ['Bio Energy', 'Conventional', 'Renewables'],
          labels: {
            formatter: function() {
              return this.value;
            }
          }
        },
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'center',
          verticalAlign: 'middle',
          itemStyle: {
            font: '8pt sans-serif'
          }
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 3)) + " ha";
          }
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: false,
              color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
              formatter: function() {
                return " " + (Highcharts.numberFormat(this.y, 0, ','));
              }
            }
          }
        },
        series: []
      });
    };

    LandUse.prototype.teardown = function() {
      document.getElementById("viewmessage").style.display = "none";
      document.getElementById("viewmessage").style.margin = "30px auto";
      document.getElementById("results").style.width = "100%";
      document.getElementById("results").style.marginRight = "0";
      document.getElementById("results").style.overflow = "hidden";
      $('#results').empty();
      return this.land_chart = null;
    };

    LandUse.prototype.updateResults = function(pathway) {
      var data, dnsum, i, lfs, name, scenarios, titles_land_do_nothing, yourpath, ypsum, _i, _len;
      this.pathway = pathway;
      if (this.land_chart == null) {
        this.setup();
      }
      titles_land_do_nothing = ['Bio Energy', 'Conventional', 'Renewables'];
      scenarios = ["Least Effort Scenario", "Your Pathway"];
      i = 0;
      dnsum = 0.0;
      ypsum = 0.0;
      lfs = [];
      yourpath = [];
      for (_i = 0, _len = titles_land_do_nothing.length; _i < _len; _i++) {
        name = titles_land_do_nothing[_i];
        data = this.pathway['land_do_nothing'][name];
        dnsum += data[0];
        ypsum += data[1];
        lfs.push(parseFloat(data[0].toFixed(2)));
        yourpath.push(parseFloat(data[1].toFixed(2)));
      }
      if (this.land_chart.series[0] != null) {
        this.land_chart.series[0].setData(lfs);
        this.land_chart.series[0].setData(yourpath);
      } else {
        this.land_chart.addSeries({
          name: scenarios[0],
          data: lfs
        }, false);
        this.land_chart.addSeries({
          name: scenarios[1],
          data: yourpath
        }, false);
      }
      this.land_chart.redraw();
      document.getElementById("viewmessage").style.display = "inline-block";
      return document.getElementById("viewmessage").innerHTML = "<h3> How much land is that? </h3> <p> <ul> <li> Your chosen energy scenario has a land-area footprint of <b> " + ypsum.toFixed() + " </b>hectares, or " + (ypsum * 0.01 * 0.001).toFixed(2) + " thousand square km.  </li> <li> This is <b>" + (ypsum / 148400).toFixed(2) + " </b>times the size of Delhi</li> <li> This is <b>" + ((ypsum / 328759000).toFixed(2) * 100) + " </b>% of India's land area </li> <li> This is <b>" + ((ypsum / 63851831).toFixed(2) * 100) + " </b>% of India's wasteland area</li> </ul> </p>";
    };

    return LandUse;

  })();

  window.twentyfifty.views['map'] = new LandUse;

}).call(this);
(function() {
  var SankeyDisplay;

  SankeyDisplay = (function() {
    var html;

    function SankeyDisplay() {}

    html = "<div class=\"slider_wrap\">\n<h3 id=\"year_head\"> Flow of energy through India, year 2047 </h3>\n<div class=\"toggle_radio\">\n<input type=\"radio\" class=\"toggle_option\" id=\"0_toggle\" name=\"toggle_option\">\n<input type=\"radio\" class=\"toggle_option\" id=\"1_toggle\" name=\"toggle_option\">\n<input type=\"radio\" class=\"toggle_option\" id=\"2_toggle\" name=\"toggle_option\">\n<input type=\"radio\" class=\"toggle_option\" id=\"3_toggle\" name=\"toggle_option\">\n<input type=\"radio\" class=\"toggle_option\" id=\"4_toggle\" name=\"toggle_option\">\n<input type=\"radio\" class=\"toggle_option\" id=\"5_toggle\" name=\"toggle_option\">\n<input type=\"radio\" class=\"toggle_option\" id=\"6_toggle\" name=\"toggle_option\">\n<input type=\"radio\" class=\"toggle_option\" checked id=\"7_toggle\" name=\"toggle_option\">\n\n<label for=\"0_toggle\"><p>2012</p></label>\n<label for=\"1_toggle\"><p>2017</p></label>\n<label for=\"2_toggle\"><p>2022</p></label>\n<label for=\"3_toggle\"><p>2027</p></label>\n<label for=\"4_toggle\"><p>2032</p></label>\n<label for=\"5_toggle\"><p>2037</p></label>\n<label for=\"6_toggle\"><p>2042</p></label>\n<label for=\"7_toggle\"><p>2047</p></label>\n\n<div class=\"toggle_option_slider\">\n</div>\n</div>";

    SankeyDisplay.prototype.updateResults = function(pathway) {
      var data, max_y;
      if (this.s == null) {
        this.setup();
      }
      if (this.curyear == null) {
        this.curyear = 2047;
      }
      data = pathway.sankey[window.twentyfifty.views.sankey.curyear];
      if (this.drawn === true) {
        this.s.updateData(data);
        this.s.redraw();
      } else {
        this.s.setData(data);
        this.s.draw();
        this.drawn = true;
      }
      max_y = this.s.boxes['losses'].b();
      this.s.redraw();
      if ($('#sankey').height() < max_y) {
        $('#sankey').height(max_y);
        return this.s.r.setSize($('#sankey').width(), max_y);
      }
    };

    SankeyDisplay.prototype.teardown = function() {
      $('#results').empty();
      $('#slider-wrap').empty();
      return this.s = null;
    };

    SankeyDisplay.prototype.setup = function() {
      var pixels_per_TWh;
      if (this.s != null) {
        return false;
      }
      $('#results').append(html);
      $('#results').append("<div id='sankey'></div>");
      window.snky = this.s = new Sankey();
      this.s.stack(0, ["Small hydro", "Electricity Imports", "Solar", "Wind", "Hydro", "Nuclear", "Coal Reserves", "Coal Imports", "Oil Reserves", "Oil Imports", "Gas Reserves", "Gas Imports", "Agriculture waste/ energy crops", "Municipal Waste", "Green Building Savings"]);
      this.s.stack(1, ["Solar CSP", "Solar PV", "Offshore Wind", "Onshore Wind"], "Solar");
      this.s.stack(1, ["Coal"], "Coal Reserves");
      this.s.stack(1, ["Oil"], "Oil Reserves");
      this.s.stack(1, ["Natural Gas"], "Gas Reserves");
      this.s.stack(1, ["Bio-Conversion"], "Agriculture waste/ Energy crops");
      this.s.stack(2, ["Solid"], "Coal");
      this.s.stack(2, ["Liquid"], "Oil");
      this.s.stack(2, ["Gas"], "Natural Gas");
      this.s.stack(3, ["Thermal Generation"], "Nuclear");
      this.s.stack(4, ["Electricity Grid", "Off Grid Renewables"]);
      this.s.stack(5, ["Commercial Cooking", "Commercial Lighting & Appliances", "Household Cooking", "Household Lighting & Appliances", "Passenger Transport", "Freight Transport", "Industry", "Agriculture", "Telecom", "Over Generation/Exports", "T&D losses", "Losses"]);
      this.s.nudge_boxes_callback = function() {
        return this.boxes["losses"].y = this.boxes["municipal waste"].b() - this.boxes["losses"].size();
      };
      this.s.setColors({
        "Coal Reserves": "#8F6F38",
        "Coal": "#8F6F38",
        "Coal Imports": "#8F6F38",
        "Oil Reserves": "#A99268",
        "Oil": "#A99268",
        "Oil Imports": "#A99268",
        "Gas Reserves": "#DDD4C4",
        "Natural Gas": "#DDD4C4",
        "Gas Imports": "#DDD4C4",
        "Solar": "#F6FF00",
        "Solar CSP": "#F6FF00",
        "Solar PV": "#F6FF00",
        "Agriculture waste/ energy crops": "#30FF00",
        "Bio-Conversion": "#30FF00",
        "Marine Algae": "#30FF00",
        "Agricultural 'Waste'": "#30FF00",
        "Municipal Waste": "#30FF00",
        "Biomass Imports": "#30FF00",
        "Biofuel Imports": "#30FF00",
        "Solid": "#557731",
        "Liquid": "#7D9763",
        "Gas": "#BCC2AD",
        "Electricity Grid": "#CCEEFF",
        "Thermal Generation": "#CCEEFF",
        "cHP": "#FF0000",
        "nuclear": "#E2ABDB",
        "district heating": "#FF0000",
        "pumped heat": "#FF0000",
        "useful district heat": "#FF0000",
        "cHP Heat": "#FF0000",
        "electricity imports": "#CCEEFF",
        "wind": "#C7E7E6",
        "onshore wind": "#C7E7E6",
        "offshore wind": "#C7E7E6",
        "tidal": "#C7E7E6",
        "wave": "#C7E7E6",
        "geothermal": "#C7E7E6",
        "Small Hydro": "#C7E7E6",
        "h2 conversion": "#FF6FCF",
        "final electricity": "#CCEEFF",
        "over generation / exports": "#CCEEFF",
        "h2": "#FF6FCF",
        "T&D losses": "#FF6FCF"
      });
      this.s.nudge_colours_callback = function() {
        this.recolour(this.boxes["losses"].left_lines, "#ddd");
        this.recolour(this.boxes["t&d losses"].left_lines, "#ddd");
        return this.recolour(this.boxes["electricity grid"].left_lines, "#CCEEFF");
      };
      pixels_per_TWh = $('#sankey').height() / 100000;
      this.s.y_space = 25;
      this.s.right_margin = 250;
      this.s.left_margin = 150;
      this.s.convert_flow_values_callback = function(flow) {
        return flow * pixels_per_TWh;
      };
      this.s.convert_flow_labels_callback = function(flow) {
        return Math.round(flow);
      };
      this.s.convert_box_value_labels_callback = function(flow) {
        return "" + Math.round(flow) + " TWh/y";
      };
      $(".toggle_option_slider").css("left", 7 * 100);
      $(".toggle_option").click(function() {
        var myyear;
        myyear = $(this).attr("id").split("_")[0];
        $(".toggle_option_slider").css("left", myyear * 100);
        myyear = myyear * 5 + 2012;
        $('#year_head').text("Flow of energy through India, year " + myyear);
        window.twentyfifty.views.sankey.curyear = myyear;
        return $.ajax({
          url: window.location.pathname.split("/").slice(0, 3).join("/") + "/data",
          dataType: "json",
          async: false,
          success: function(data) {
            window.snky.updateData(data.sankey[window.twentyfifty.views.sankey.curyear]);
            window.snky.redraw();
          }
        });
      });
    };

    return SankeyDisplay;

  })();

  window.twentyfifty.views['sankey'] = new SankeyDisplay;

}).call(this);
(function() {
  var AirQuality, airQualityHTML,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  airQualityHTML = "<div class='airquality'>\n  <h1>The impact of your pathway on air quality</h1>\n  <div class='airqualitymessage' id='airqualitymessage'></div>\n  <div id='airquality'></div>\n  <div class='airqualitymessage'>\n    <h2>How to interpret these results:</h2>\n    <ul>\n      <li>Air pollution health impact index &mdash; this index measures the effect on human health from fine particulate matter and other air pollutants such as nitrogen oxides.  For example, these pollutants have been linked to premature death caused by heart and lung disease. 2010 is the baseline year (100). A number lower than 100 indicates a reduction in average air pollution and associated health impacts, whilst a higher number indicates an increase. This index reflects changes in the average concentration of air pollutants across India.  It does not provide information on the number or severity of pollution hotspots.</li>\n      <li>Low end of hatched range &mdash; worst case scenario for air pollution whereby there is no further deployment or innovation in pollution abatement technology between now and 2050 beyond planned measures.</li>\n      <li>High end of hatched range &mdash; best case scenario whereby innovation radically improves pollution abatement technology between now and 2050 and it is fully deployed.</li>\n    </ul>\n    <p>\n      We would welcome your feedback on the\n      <a href=\"http://planningcommission.nic.in/sectors/index.php?sectors=energy\">methodology used to calculate the impact of your pathway on air quality.</a>\n      You can also download the excel version of the 2050 pathways calcualtor to see the different types of air pollution and the relative importance of different sources.\n    </p>\n  </div>\n</div>";

  AirQuality = (function() {
    function AirQuality() {
      this.updateResults = __bind(this.updateResults, this);
      this.updateComparator = __bind(this.updateComparator, this);
      this.ready = false;
    }

    AirQuality.prototype.setup = function() {
      var clow, comparator_id, crange, e, format, h, low, range, tick, x, _2010, _i, _len, _ref;
      if (this.ready) {
        return false;
      }
      this.ready = true;
      $("#results").append(airQualityHTML);
      $("#message").addClass('warning');
      e = $('#airquality');
      this.h = e.height();
      this.w = e.width();
      this.r = new Raphael('airquality', this.w, this.h);
      this.x = d3.scale.linear().domain([0, 250]).range([300, this.w - 30]).nice();
      this.y = d3.scale.ordinal().domain(['2010', 'comparator', 'chosen']).rangeRoundBands([25, this.h - 20], 0.25);
      comparator_id = twentyfifty.getComparator() || twentyfifty.default_comparator_code;
      this.r.text(30, this.y("2010") + 9, "2010").attr({
        'text-anchor': 'start',
        'font-weight': 'bold'
      });
      this.r.text(30, this.y("comparator") + 9, "2050 - " + (twentyfifty.pathwayName(comparator_id))).attr({
        'text-anchor': 'start',
        'font-weight': 'bold'
      });
      this.r.text(30, this.y("chosen") + 9, "2050 - Your pathway").attr({
        'text-anchor': 'start',
        'font-weight': 'bold'
      });
      this.bars = {};
      h = this.y.rangeBand();
      x = this.x(0);
      _2010 = this.r.rect(x, this.y('2010'), this.x(100) - this.x(0), h).attr({
        'fill': '#008000',
        'stroke': 'none'
      });
      this.r.text(30, this.y('comparator') + 27, twentyfifty.pathwayDescriptions(comparator_id, "")).attr({
        'text-anchor': 'start'
      });
      clow = this.r.rect(x, this.y('comparator'), 0, h).attr({
        'fill': '#f00',
        'stroke': 'none'
      });
      crange = this.r.rect(x, this.y('comparator'), 0, h).attr({
        'fill': 'url(/assets/images/hatches/hatch-f00.png)',
        'stroke': 'none'
      });
      this.bars['comparator'] = {
        low: clow,
        range: crange
      };
      low = this.r.rect(x, this.y('chosen'), 0, h).attr({
        'fill': '#1f77b4',
        'stroke': 'none'
      });
      range = this.r.rect(x, this.y('chosen'), 0, h).attr({
        'fill': 'url(/assets/images/hatches/hatch-1f77b4.png)',
        'stroke': 'none'
      });
      this.bars['chosen'] = {
        low: low,
        range: range
      };
      this.r.text(this.x(0), 10, "Air pollution health impact index (2010=100)").attr({
        'text-anchor': 'start',
        'font-weight': 'bold',
        'fill': '#000'
      });
      this.r.path(["M", this.x(0), this.h - 35, "L", this.x(0), 30, "L", this.w - 30, 30]).attr({
        'stroke': '#000',
        'stroke-width': 2
      });
      format = this.x.tickFormat(10);
      _ref = this.x.ticks(10);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tick = _ref[_i];
        this.r.text(this.x(tick), 23, format(tick)).attr({
          'text-anchor': 'middle',
          fill: '#000000'
        });
        this.r.path(["M", this.x(tick), 29, "L", this.x(tick), this.h - 26]).attr({
          stroke: '#fff'
        });
      }
      return twentyfifty.loadSecondaryPathway(comparator_id, this.updateComparator);
    };

    AirQuality.prototype.teardown = function() {
      $("#results").empty();
      $("#message").removeClass('warning');
      return this.ready = false;
    };

    AirQuality.prototype.updateComparator = function(pathway) {
      if (!this.ready) {
        this.setup();
      }
      this.bars['comparator']['low'].attr({
        width: this.x(pathway.air_quality.low) - this.x(0)
      });
      return this.bars['comparator']['range'].attr({
        width: this.x(pathway.air_quality.high - pathway.air_quality.low) - this.x(0),
        x: this.x(pathway.air_quality.low)
      });
    };

    AirQuality.prototype.updateResults = function(pathway) {
      var text;
      if (!this.ready) {
        this.setup();
      }
      this.bars['chosen']['low'].attr({
        width: this.x(pathway.air_quality.low) - this.x(0)
      });
      this.bars['chosen']['range'].attr({
        width: this.x(pathway.air_quality.high - pathway.air_quality.low) - this.x(0),
        x: this.x(pathway.air_quality.low)
      });
      text = ["The damage to human health arising from air pollution from this pathway, principally particulate matter, could be around "];
      text.push("" + (Math.abs(Math.round(100 - pathway.air_quality.high))) + "%");
      if (pathway.air_quality.high > 100 && pathway.air_quality.low <= 100) {
        text.push(" higher ");
      }
      if (pathway.air_quality.high <= 100 && pathway.air_quality.low > 100) {
        text.push(" lower ");
      }
      text.push(" to ");
      text.push("" + (Math.abs(Math.round(100 - pathway.air_quality.low))) + "%");
      if (pathway.air_quality.low > 100) {
        text.push(" higher");
      }
      if (pathway.air_quality.low <= 100) {
        text.push(" lower");
      }
      text.push(" in 2050 compared to 2010.");
      if (pathway.air_quality.high > 100) {
        text.push(" Given the scope for adverse implications for air quality, if India were to adopt this pathway the Government  would develop a policy framweork that supported the innovation required to be at the bottom end of the range");
      }
      return $('#airqualitymessage').html(text.join(''));
    };

    return AirQuality;

  })();

  window.twentyfifty.views['air_quality'] = new AirQuality;

}).call(this);
(function() {
  var CostsInContext, costsInContextHTML,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  costsInContextHTML = "<div class='costsincontext'>\n  <div id='cost_override_warning'>NB Some costs not on default values</div>\n  <h1>\n    The cost to society of your pathway. This is not your energy bill.<br>\n    <!--For comparison, UK average GDP 2010-2050 is forecast to be roughly &pound;35000 per person.>\n  </h1>\n  " + window.costCaveatHTML + "\n  <div id='costsincontext'></div>\n  " + window.costEssentialNotesHTML + "\n</div>";

  CostsInContext = (function() {
    function CostsInContext() {
      this.updateBar = __bind(this.updateBar, this);
      this.setup = __bind(this.setup, this);
      this.pathways = {};
      this.ready = false;
    }

    CostsInContext.prototype.setup = function() {
      var all_pathways, code, comparator_pathways, e, format, h, labels_hide, labels_show, low, low_label, message, overlay, overlays, range, range_label, tick, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _results;
      if (this.ready) {
        return false;
      }
      this.ready = true;
      $("#results").append(costsInContextHTML);
      $("#message").addClass('warning');
      twentyfifty.cost_override_in_place_warning();
      all_pathways = ["chosen"].concat(twentyfifty.comparator_pathways);
      comparator_pathways = twentyfifty.comparator_pathways;
      e = $('#costsincontext');
      this.h = e.height();
      this.w = e.width();
      this.r = new Raphael('costsincontext', this.w, this.h);
      this.x = d3.scale.linear().domain([0, 40000]).range([250, this.w - 30]).nice();
      this.y = d3.scale.ordinal().domain(all_pathways).rangeRoundBands([25, this.h - 20], 0.25);
      for (_i = 0, _len = comparator_pathways.length; _i < _len; _i++) {
        code = comparator_pathways[_i];
        this.r.rect(this.x(0), this.y(code), this.x(40000) - this.x(0), this.y.rangeBand()).attr({
          'fill': '#ddd',
          'stroke': 'none'
        });
      }
      this.r.rect(25, this.y("chosen"), this.x(40000) - 25, this.y.rangeBand()).attr({
        'fill': '#FCFF9B',
        'stroke': 'none'
      });
      this.r.text(30, this.y("chosen") + 9, "Your pathway").attr({
        'text-anchor': 'start',
        'font-weight': 'bold'
      });
      this.r.text(30, this.y("chosen") + 27, "You can click on the chart to make a more\ndetailed comparison with the pathways below").attr({
        'text-anchor': 'start'
      });
      for (_j = 0, _len1 = comparator_pathways.length; _j < _len1; _j++) {
        code = comparator_pathways[_j];
        this.r.text(30, this.y(code) + 9, twentyfifty.pathwayName(code, code)).attr({
          'text-anchor': 'start',
          'font-weight': 'bold',
          href: twentyfifty.pathwayWikiPages(code)
        });
        this.r.text(30, this.y(code) + 27, twentyfifty.pathwayDescriptions(code, "")).attr({
          'text-anchor': 'start',
          href: twentyfifty.pathwayWikiPages(code)
        });
      }
      this.bars = {};
      this.low = {
        boxes: this.r.set(),
        labels: this.r.set(),
        top_label: null,
        top_label_box: null
      };
      this.range = {
        boxes: this.r.set(),
        labels: this.r.set(),
        top_label: null,
        top_label_box: null
      };
      overlays = this.r.set();
      x = this.x(0);
      h = this.y.rangeBand();
      labels_show = (function(_this) {
        return function() {
          _this.low.labels.show();
          return _this.range.labels.show();
        };
      })(this);
      labels_hide = (function(_this) {
        return function() {
          _this.low.labels.hide();
          return _this.range.labels.hide();
        };
      })(this);
      for (_k = 0, _len2 = all_pathways.length; _k < _len2; _k++) {
        code = all_pathways[_k];
        y = this.y(code);
        low = this.r.rect(x, y, 0, h).attr({
          'fill': '#008000',
          'stroke': 'none'
        });
        range = this.r.rect(x, y, 0, h).attr({
          'fill': 'url(/assets/images/hatches/hatch-green.png)',
          'stroke': 'none'
        });
        low_label = this.r.text(x + 10, y + h / 2, "").attr({
          'fill': '#000',
          'text-anchor': 'start'
        });
        range_label = this.r.text(x, y + h / 2, "").attr({
          'text-anchor': 'start',
          'fill': '#f00'
        });
        message = this.r.text(x, y + h / 2, "").attr({
          'fill': '#000',
          'text-anchor': 'start'
        });
        overlay = this.r.rect(x, y, 0, h).attr({
          'fill': '#fff',
          'stroke': 'none',
          cursor: 'pointer',
          'fill-opacity': 0.0
        });
        this.bars[code] = {
          low: low,
          range: range,
          low_label: low_label,
          range_label: range_label,
          message: message,
          overlay: overlay
        };
        this.low.boxes.push(low);
        this.low.labels.push(low_label);
        this.range.boxes.push(range);
        this.range.labels.push(range_label);
        overlays.push(overlay);
        low_label.hide();
        range_label.hide();
        overlay.hover(labels_show, labels_hide);
        overlay.click(function() {
          return window.twentyfifty.switchView('costs_compared_overview');
        });
      }
      this.incremental_overlay = this.r.rect(this.x(0), this.y('chosen'), 0, 480).attr({
        'fill': '#fff',
        'fill-opacity': 0.5,
        'stroke': 'none'
      });
      overlays.insertAfter(this.incremental_overlay);
      this.r.text(this.x(0), this.h - 5, "The absolute cost to society of the whole energy system (mean undiscounted real pounds per person per year 2010-2050)").attr({
        'text-anchor': 'start',
        'font-weight': 'bold',
        'fill': '#008000'
      });
      this.r.path(["M", this.x(0), 40, "L", this.x(0), this.h - 28, "L", this.w - 30, this.h - 28]).attr({
        'stroke': '#008000',
        'stroke-width': 2
      });
      format = this.x.tickFormat(10);
      _ref = this.x.ticks(10);
      for (_l = 0, _len3 = _ref.length; _l < _len3; _l++) {
        tick = _ref[_l];
        this.r.text(this.x(tick), this.h - 20, format(tick)).attr({
          'text-anchor': 'middle',
          fill: '#008000'
        });
      }
      this.drawIndicator(3700, "Approximate energy system cost today");
      _results = [];
      for (_m = 0, _len4 = comparator_pathways.length; _m < _len4; _m++) {
        code = comparator_pathways[_m];
        _results.push(twentyfifty.loadSecondaryPathway(code, this.updateBar));
      }
      return _results;
    };

    CostsInContext.prototype.drawIndicator = function(value, text) {
      var x;
      x = this.x(value);
      this.r.text(x, 10, text).attr({
        'text-anchor': 'end',
        fill: '#aaa'
      });
      this.r.path(["M", x, 8, "L", x, this.h - 15]).attr({
        stroke: '#000',
        'stroke-dasharray': '.'
      });
      return this.r.text(x, this.h - 20, '3,700').attr({
        'text-anchor': 'end',
        fill: '#aaa'
      });
    };

    CostsInContext.prototype.teardown = function() {
      $("#results").empty();
      $("#message").removeClass('warning');
      return this.ready = false;
    };

    CostsInContext.prototype.updateResults = function(pathway) {
      if (!this.ready) {
        this.setup();
      }
      return this.updateBar(pathway, 'chosen');
    };

    CostsInContext.prototype.updateBar = function(pathway, _id) {
      var bar, code, format, p, tick, total_cost, total_range, _i, _len, _ref, _ref1;
      if (_id == null) {
        _id = pathway._id;
      }
      this.pathways[_id] = pathway;
      total_cost = this.total_cost_low_adjusted(pathway);
      total_range = this.total_cost_range_adjusted(pathway);
      bar = this.bars[_id];
      if (_id === 'chosen') {
        bar.low.attr({
          fill: '#1f77b4'
        });
        bar.range.attr({
          fill: 'url(/assets/images/hatches/hatch-1f77b4.png)'
        });
      } else if (_id === (twentyfifty.getComparator() || twentyfifty.default_comparator_code)) {
        this.comparator = pathway;
        this.r.text(this.x(total_cost), 10, "The extra cost to society above that of the '" + (twentyfifty.pathwayName(_id, "comparison")) + "' pathway (mean £/person/year 2010-2050)").attr({
          'text-anchor': 'start',
          'font-weight': 'bold',
          'fill': '#f00'
        });
        this.r.path(["M", this.x(total_cost), this.h - 35, "L", this.x(total_cost), 30, "L", this.w - 30, 30]).attr({
          'stroke': '#f00',
          'stroke-width': 2
        });
        format = this.x.tickFormat(10);
        _ref = this.x.ticks(10);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tick = _ref[_i];
          this.r.text(this.x(tick + total_cost), 23, format(tick)).attr({
            'text-anchor': 'middle',
            'fill': '#f00'
          });
          if (tick > 0) {
            this.r.path(["M", this.x(tick + total_cost), 27, "L", this.x(tick + total_cost), this.h - 30]).attr({
              stroke: '#fff'
            });
          }
        }
        bar.low.attr({
          fill: '#f00'
        });
        bar.range.attr({
          fill: 'url(/assets/images/hatches/hatch-f00.png)'
        });
        this.incremental_overlay.attr({
          width: this.x(total_cost) - this.x(0)
        });
        this.low.labels.toFront();
        this.range.labels.toFront();
        _ref1 = this.pathways;
        for (code in _ref1) {
          if (!__hasProp.call(_ref1, code)) continue;
          p = _ref1[code];
          this.setIncrementalCostLabel(code, p);
        }
      }
      bar.low.attr({
        width: this.x(total_cost) - this.x(0)
      });
      if (total_range === 0) {
        bar.low_label.attr({
          text: "" + (Math.round(total_cost))
        });
      } else {
        bar.low_label.attr({
          text: "" + (Math.round(total_cost)) + "–" + (Math.round(total_cost + total_range))
        });
      }
      bar.range_label.attr({
        x: this.x(total_cost + total_range) + 10
      });
      this.setIncrementalCostLabel(_id, pathway);
      bar.range.attr({
        x: this.x(total_cost),
        width: this.x(total_range) - this.x(0)
      });
      bar.overlay.attr({
        width: this.x(total_cost + total_range) - this.x(0)
      });
      if (pathway.ghg['Total'][8] > 166) {
        bar.message.attr({
          x: this.x(total_cost + total_range) + 100,
          text: "This pathway does not reduce emissions by at least 80% on 1990 levels"
        });
        return bar.message.toFront();
      } else {
        bar.message.attr({
          x: this.x(total_cost + total_range) + 100,
          text: ""
        });
        return bar.message.toFront();
      }
    };

    CostsInContext.prototype.setIncrementalCostLabel = function(code, pathway) {
      var a, delta, i, i1, i2, message;
      if (this.comparator == null) {
        return false;
      }
      if (code === this.comparator._id) {
        return false;
      }
      if (pathway.total_cost_range_adjusted === 0 && this.comparator.total_cost_range_adjusted === 0) {
        delta = Math.round(pathway.total_cost_low_adjusted - this.comparator.total_cost_low_adjusted);
        if (delta < 0) {
          message = "" + (-delta) + " less";
        } else if (delta === 0) {
          message = "the same";
        } else {
          message = "" + delta + " more";
        }
      } else {
        i = twentyfifty.calculateIncrementalCost(pathway, this.comparator);
        i1 = Math.round(i.tc - i.cc);
        i2 = Math.round(i.tt - i.ct);
        if (i1 > i2) {
          a = i2;
          i2 = i1;
          i1 = a;
        }
        if (i1 < 0 && i2 < 0) {
          message = "" + (-i1) + " to " + (-i2) + " less";
        } else if (i1 < 0 && i2 > 0) {
          message = "" + (-i1) + " less to " + i2 + " more";
        } else {
          message = "" + i1 + " to " + i2 + " more";
        }
      }
      return this.bars[code].range_label.attr({
        text: message
      });
    };

    CostsInContext.prototype.total_cost_low_adjusted = function(pathway) {
      if (pathway.total_cost_low_adjusted == null) {
        twentyfifty.adjust_costs_of_pathway(pathway);
      }
      return pathway.total_cost_low_adjusted;
    };

    CostsInContext.prototype.total_cost_range_adjusted = function(pathway) {
      if (pathway.total_cost_range_adjusted == null) {
        twentyfifty.adjust_costs_of_pathway(pathway);
      }
      return pathway.total_cost_range_adjusted;
    };

    return CostsInContext;

  })();

  window.twentyfifty.views['costs_in_context'] = new CostsInContext;

}).call(this);
(function() {
  var CostsComparedOverview, costsComparedOverviewHTML,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  costsComparedOverviewHTML = "<div class='costscomparedoverview'>\n  <div id='cost_override_warning'>NB Some costs not on default values</div>\n  <h1>\n    The cost of your pathway, compared with other pathways.\n    This is not your energy bill.\n  </h1>\n  " + window.costCaveatHTML + "\n  <div id='costscomparedoverview'></div>\n  " + window.costEssentialNotesHTML + "\n</div>";

  CostsComparedOverview = (function() {
    var categories, category_colors;

    categories = ["Fossil fuels", "Bioenergy", "Electricity", "Buildings", "Transport", "Industry", "Finance", "Other"];

    category_colors = {
      "Fossil fuels": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      },
      "Bioenergy": {
        low: "#2ca02c",
        range: "url(/assets/images/hatches/hatch-2ca02c.png)"
      },
      "Electricity": {
        low: "#1f77b4",
        range: "url(/assets/images/hatches/hatch-1f77b4.png)"
      },
      "Buildings": {
        low: "#ff7f0e",
        range: "url(/assets/images/hatches/hatch-ff7f0e.png)"
      },
      "Transport": {
        low: "#d62728",
        range: "url(/assets/images/hatches/hatch-d62728.png)"
      },
      "Industry": {
        low: "#7f7f7f",
        range: "url(/assets/images/hatches/hatch-7f7f7f.png)"
      },
      "Finance": {
        low: "#EA8BCC",
        range: "url(/assets/images/hatches/hatch-EA8BCC.png)"
      },
      "Other": {
        low: "#a55194",
        range: "url(/assets/images/hatches/hatch-a55194.png)"
      }
    };

    function CostsComparedOverview() {
      this.updateBar = __bind(this.updateBar, this);
      this.ready = false;
    }

    CostsComparedOverview.prototype.setup = function() {
      var all_pathways, b, c, category, clickFunction, code, color, colors, e, format, h, lb, tick, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _results;
      if (this.ready) {
        return false;
      }
      this.ready = true;
      $('#results').append(costsComparedOverviewHTML);
      $("#message").addClass('warning');
      twentyfifty.cost_override_in_place_warning();
      all_pathways = ["chosen"].concat(twentyfifty.comparator_pathways);
      e = $('#costscomparedoverview');
      this.h = e.height();
      this.w = e.width();
      this.r = new Raphael('costscomparedoverview', this.w, this.h);
      this.x = d3.scale.linear().domain([0, 7000]).range([250, this.w - 30]).nice();
      this.y = d3.scale.ordinal().domain(all_pathways).rangeRoundBands([25, this.h - 20], 0.25);
      this.r.text(250, 30, "Move your mouse over a coloured bar to see what it refers to. Click on a bar to see more detail").attr({
        'text-anchor': 'start'
      });
      _ref = twentyfifty.comparator_pathways;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        code = _ref[_i];
        this.r.rect(this.x(0), this.y(code), this.x(7000) - this.x(0), this.y.rangeBand()).attr({
          'fill': '#ddd',
          'stroke': 'none'
        });
      }
      this.r.rect(25, this.y("chosen"), this.x(7000) - 25, this.y.rangeBand()).attr({
        'fill': '#FCFF9B',
        'stroke': 'none'
      });
      this.r.text(30, this.y("chosen") + 9, "Your pathway").attr({
        'text-anchor': 'start',
        'font-weight': 'bold'
      });
      this.r.text(30, this.y("chosen") + 27, "You can click on the chart to make a more\ndetailed comparison of specific costs").attr({
        'text-anchor': 'start'
      });
      _ref1 = twentyfifty.comparator_pathways;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        code = _ref1[_j];
        this.r.text(30, this.y(code) + 9, twentyfifty.pathwayName(code, code)).attr({
          'text-anchor': 'start',
          'font-weight': 'bold',
          href: twentyfifty.pathwayWikiPages(code)
        });
        this.r.text(30, this.y(code) + 27, twentyfifty.pathwayDescriptions(code, "")).attr({
          'text-anchor': 'start',
          href: twentyfifty.pathwayWikiPages(code)
        });
      }
      this.boxes = {};
      this.boxes_by_category = {};
      for (_k = 0, _len2 = categories.length; _k < _len2; _k++) {
        category = categories[_k];
        this.boxes_by_category[category] = {
          boxes: this.r.set(),
          labels: this.r.set(),
          top_label: null,
          top_label_box: null
        };
      }
      x = this.x(0);
      h = this.y.rangeBand();
      clickFunction = function(category) {
        return function() {
          return window.twentyfifty.switchSector(categories.indexOf(category));
        };
      };
      _ref2 = ["chosen"].concat(twentyfifty.comparator_pathways);
      for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
        code = _ref2[_l];
        b = {};
        y = this.y(code);
        for (category in category_colors) {
          if (!__hasProp.call(category_colors, category)) continue;
          colors = category_colors[category];
          b[category] = {
            low: this.r.rect(x, y, 0, h).attr({
              'fill': colors.low,
              'stroke': 'none',
              cursor: "pointer"
            }).click(clickFunction(category)),
            low_label: this.r.text(x, y + h / 2, "").attr({
              'fill': '#000',
              'text-anchor': 'middle',
              cursor: "pointer"
            }).click(clickFunction(category)),
            range: this.r.rect(x, y, 0, h).attr({
              'fill': colors.range,
              'stroke': 'none',
              cursor: "pointer"
            }).click(clickFunction(category)),
            range_label: this.r.text(x, y + h / 2, "").attr({
              'fill': '#000',
              'text-anchor': 'middle',
              cursor: "pointer"
            }).click(clickFunction(category))
          };
          c = this.boxes_by_category[category];
          c.boxes.push(b[category].low, b[category].range);
          c.labels.push(b[category].low_label, b[category].range_label);
        }
        this.boxes[code] = b;
      }
      this.r.text(this.x(0), this.h - 5, "The absolute cost to society of the whole energy system (mean undiscounted real pounds per person per year 2010-2050)").attr({
        'text-anchor': 'start',
        'font-weight': 'bold',
        'fill': '#008000'
      });
      this.r.path(["M", this.x(0), 40, "L", this.x(0), this.h - 28, "L", this.w - 30, this.h - 28]).attr({
        'stroke': '#008000',
        'stroke-width': 2
      });
      format = this.x.tickFormat(10);
      _ref3 = this.x.ticks(10);
      for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
        tick = _ref3[_m];
        this.r.text(this.x(tick), this.h - 20, format(tick)).attr({
          'text-anchor': 'middle',
          fill: '#008000'
        });
        this.r.path(["M", this.x(tick), 40, "L", this.x(tick), this.h - 26]).attr({
          stroke: '#fff'
        });
      }
      for (category in category_colors) {
        if (!__hasProp.call(category_colors, category)) continue;
        color = category_colors[category];
        this.boxes_by_category[category].labels.hide();
        this.boxes_by_category[category].labels.toFront();
        this.hover(this.boxes_by_category[category].boxes, category);
        this.hover(this.boxes_by_category[category].labels, category);
        if (category === "Fossil fuels") {
          lb = this.r.text(this.x(0) + 175, h * 0.75 / 2, "Fossil fuels for use in buildings, transport, electricity generation and industry").attr({
            'text-anchor': 'middle',
            'font-weight': 'bold'
          });
        } else if (category === "Bioenergy") {
          lb = this.r.text(this.x(0) + 175, h * 0.75 / 2, "Bioenergy for use in buildings, transport, electricity generation and industry").attr({
            'text-anchor': 'middle',
            'font-weight': 'bold'
          });
        } else {
          lb = this.r.text(this.x(0) + 50, h * 0.75 / 2, category).attr({
            'text-anchor': 'middle',
            'font-weight': 'bold'
          });
        }
        this.boxes_by_category[category].top_label_box = this.r.rect(this.x(0), 0, lb.getBBox().width + 15, h * 0.75, 5).attr({
          'fill': '#fff',
          'stroke': color.low
        }).hide();
        this.boxes_by_category[category].top_label = lb;
        lb.toFront();
        lb.hide();
      }
      _ref4 = twentyfifty.comparator_pathways;
      _results = [];
      for (_n = 0, _len5 = _ref4.length; _n < _len5; _n++) {
        code = _ref4[_n];
        _results.push(twentyfifty.loadSecondaryPathway(code, this.updateBar));
      }
      return _results;
    };

    CostsComparedOverview.prototype.hover = function(boxes, category) {
      return boxes.hover(((function(_this) {
        return function() {
          return _this.show(category);
        };
      })(this)), ((function(_this) {
        return function() {
          return _this.hide(category);
        };
      })(this)));
    };

    CostsComparedOverview.prototype.show = function(category) {
      var c, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = categories.length; _i < _len; _i++) {
        c = categories[_i];
        if (c === category) {
          this.boxes_by_category[c].labels.show();
          this.boxes_by_category[c].top_label_box.show();
          _results.push(this.boxes_by_category[c].top_label.show());
        } else {
          _results.push(this.boxes_by_category[c].boxes.attr({
            'fill-opacity': 0.5
          }));
        }
      }
      return _results;
    };

    CostsComparedOverview.prototype.hide = function(category) {
      var c, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = categories.length; _i < _len; _i++) {
        c = categories[_i];
        if (c === category) {
          this.boxes_by_category[c].labels.hide();
          this.boxes_by_category[c].top_label_box.hide();
          _results.push(this.boxes_by_category[c].top_label.hide());
        } else {
          _results.push(this.boxes_by_category[c].boxes.attr({
            'fill-opacity': 1.0
          }));
        }
      }
      return _results;
    };

    CostsComparedOverview.prototype.teardown = function() {
      $("#results").empty();
      $("#message").removeClass('warning');
      return this.ready = false;
    };

    CostsComparedOverview.prototype.updateResults = function(pathway) {
      if (!this.ready) {
        this.setup();
      }
      return this.updateBar(pathway, 'chosen');
    };

    CostsComparedOverview.prototype.updateBar = function(pathway, _id) {
      var b, categorised_costs, category, cost, lb, _i, _j, _len, _len1, _results, _x;
      if (_id == null) {
        _id = pathway._id;
      }
      if (this.boxes == null) {
        this.setupComparisonChart();
      }
      if (pathway.categorised_costs == null) {
        twentyfifty.group_costs_of_pathway(pathway);
      }
      categorised_costs = pathway.categorised_costs;
      b = this.boxes[_id];
      _x = 0;
      for (_i = 0, _len = categories.length; _i < _len; _i++) {
        category = categories[_i];
        cost = categorised_costs[category];
        b[category].low.attr({
          x: this.x(_x),
          width: this.x(cost.low) - this.x(0)
        });
        if (cost.low > 1) {
          b[category].low_label.attr({
            x: this.x(_x + cost.low / 2),
            text: "" + (Math.round(cost.low))
          });
        }
        if (_id === 'chosen') {
          lb = this.boxes_by_category[category].top_label_box;
          lb.attr({
            x: this.x(_x + cost.low / 2) - (lb.attr('width') / 2)
          });
          this.boxes_by_category[category].top_label.attr({
            x: this.x(_x + cost.low / 2)
          });
        }
        _x += cost.low;
      }
      _results = [];
      for (_j = 0, _len1 = categories.length; _j < _len1; _j++) {
        category = categories[_j];
        cost = categorised_costs[category];
        b[category].range.attr({
          x: this.x(_x),
          width: this.x(cost.range) - this.x(0)
        });
        if (cost.range > 1) {
          b[category].range_label.attr({
            x: this.x(_x + cost.range / 2),
            text: "" + (Math.round(cost.range))
          });
        }
        _results.push(_x += cost.range);
      }
      return _results;
    };

    return CostsComparedOverview;

  })();

  window.twentyfifty.views['costs_compared_overview'] = new CostsComparedOverview;

}).call(this);
(function() {
  var CostsComparedWithinSector, costsComparedWithinSectorHTML,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  costsComparedWithinSectorHTML = "<div class='costscomparedwithinsector'>\n  <div id='cost_override_warning'>NB Some costs not on default values</div>\n  <ul class='dropdown' id='sectorchoice'>\n    <li>\n      <a href=\"#\" onclick=\"$('ul#view_sectorchoice').toggle(); return false;\">Choose sector<img alt=\"Dropdown-arrow\" src=\"/assets/images/dropdown-arrow.png\" /></a>\n      <ul class='choices' id='view_sectorchoice'>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchSector(0); return false;\">Fossil fuels</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchSector(1); return false;\">Bioenergy</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchSector(2); return false;\">Electricity</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchSector(3); return false;\">Buildings</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchSector(4); return false;\">Transport</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchSector(5); return false;\">Industry</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchSector(6); return false;\">Finance</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchSector(7); return false;\">Other</a></li>\n      </ul>\n    </li>\n  </ul>\n  <h1>\n    The cost of\n    <span id='sectorname'>a sector</span>\n    within your and other pathways.\n    This is not an energy bill.\n  </h1>\n  " + window.costCaveatHTML + "\n  <div id='costscomparedwithinsector'></div>\n  " + window.costEssentialNotesHTML + "\n</div>";

  CostsComparedWithinSector = (function() {
    var categories, cost_component_colors;

    categories = ["Fossil fuels", "Bioenergy", "Electricity", "Buildings", "Transport", "Industry", "Finance", "Other"];

    cost_component_colors = {
      "Conventional thermal plant": {
        low: "#a55194",
        range: "url(/assets/images/hatches/hatch-a55194.png)"
      },
      "Combustion + CCS": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      },
      "Storage of captured CO2": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      },
      "Nuclear power": {
        low: "#2ca02c",
        range: "url(/assets/images/hatches/hatch-2ca02c.png)"
      },
      "Onshore wind": {
        low: "#1f77b4",
        range: "url(/assets/images/hatches/hatch-1f77b4.png)"
      },
      "Offshore wind": {
        low: "#ff7f0e",
        range: "url(/assets/images/hatches/hatch-ff7f0e.png)"
      },
      "Hydroelectric": {
        low: "#d62728",
        range: "url(/assets/images/hatches/hatch-d62728.png)"
      },
      "Wave and Tidal": {
        low: "#7f7f7f",
        range: "url(/assets/images/hatches/hatch-7f7f7f.png)"
      },
      "Geothermal": {
        low: "#EA8BCC",
        range: "url(/assets/images/hatches/hatch-EA8BCC.png)"
      },
      "Distributed solar PV": {
        low: "#a55194",
        range: "url(/assets/images/hatches/hatch-a55194.png)"
      },
      "Distributed solar thermal": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      },
      "Micro wind": {
        low: "#2ca02c",
        range: "url(/assets/images/hatches/hatch-2ca02c.png)"
      },
      "Biomatter to fuel conversion": {
        low: "#1f77b4",
        range: "url(/assets/images/hatches/hatch-1f77b4.png)"
      },
      "Bioenergy imports": {
        low: "#ff7f0e",
        range: "url(/assets/images/hatches/hatch-ff7f0e.png)"
      },
      "Agriculture and land use": {
        low: "#d62728",
        range: "url(/assets/images/hatches/hatch-d62728.png)"
      },
      "Energy from waste": {
        low: "#7f7f7f",
        range: "url(/assets/images/hatches/hatch-7f7f7f.png)"
      },
      "Waste arising": {
        low: "#EA8BCC",
        range: "url(/assets/images/hatches/hatch-EA8BCC.png)"
      },
      "Marine algae": {
        low: "#a55194",
        range: "url(/assets/images/hatches/hatch-a55194.png)"
      },
      "Electricity imports": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      },
      "Electricity Exports": {
        low: "#2ca02c",
        range: "url(/assets/images/hatches/hatch-2ca02c.png)"
      },
      "Electricity grid distribution": {
        low: "#1f77b4",
        range: "url(/assets/images/hatches/hatch-1f77b4.png)"
      },
      "Storage, demand shifting, backup": {
        low: "#ff7f0e",
        range: "url(/assets/images/hatches/hatch-ff7f0e.png)"
      },
      "H2 Production": {
        low: "#d62728",
        range: "url(/assets/images/hatches/hatch-d62728.png)"
      },
      "Domestic heating": {
        low: "#7f7f7f",
        range: "url(/assets/images/hatches/hatch-7f7f7f.png)"
      },
      "Domestic insulation": {
        low: "#EA8BCC",
        range: "url(/assets/images/hatches/hatch-EA8BCC.png)"
      },
      "Commercial heating and cooling": {
        low: "#a55194",
        range: "url(/assets/images/hatches/hatch-a55194.png)"
      },
      "Domestic lighting, appliances, and cooking": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      },
      "Commercial lighting, appliances, and catering": {
        low: "#2ca02c",
        range: "url(/assets/images/hatches/hatch-2ca02c.png)"
      },
      "Industrial processes": {
        low: "#1f77b4",
        range: "url(/assets/images/hatches/hatch-1f77b4.png)"
      },
      "Conventional cars and buses": {
        low: "#ff7f0e",
        range: "url(/assets/images/hatches/hatch-ff7f0e.png)"
      },
      "Hybrid cars and buses": {
        low: "#d62728",
        range: "url(/assets/images/hatches/hatch-d62728.png)"
      },
      "Electric cars and buses": {
        low: "#7f7f7f",
        range: "url(/assets/images/hatches/hatch-7f7f7f.png)"
      },
      "Fuel cell cars and buses": {
        low: "#EA8BCC",
        range: "url(/assets/images/hatches/hatch-EA8BCC.png)"
      },
      "Bikes": {
        low: "#a55194",
        range: "url(/assets/images/hatches/hatch-a55194.png)"
      },
      "Rail": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      },
      "Domestic aviation": {
        low: "#2ca02c",
        range: "url(/assets/images/hatches/hatch-2ca02c.png)"
      },
      "Domestic freight": {
        low: "#1f77b4",
        range: "url(/assets/images/hatches/hatch-1f77b4.png)"
      },
      "International aviation": {
        low: "#ff7f0e",
        range: "url(/assets/images/hatches/hatch-ff7f0e.png)"
      },
      "International shipping (maritime bunkers)": {
        low: "#d62728",
        range: "url(/assets/images/hatches/hatch-d62728.png)"
      },
      "Geosequestration": {
        low: "#7f7f7f",
        range: "url(/assets/images/hatches/hatch-7f7f7f.png)"
      },
      "Petroleum refineries": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      },
      "Coal": {
        low: "#2ca02c",
        range: "url(/assets/images/hatches/hatch-2ca02c.png)"
      },
      "Oil": {
        low: "#1f77b4",
        range: "url(/assets/images/hatches/hatch-1f77b4.png)"
      },
      "Gas": {
        low: "#ff7f0e",
        range: "url(/assets/images/hatches/hatch-ff7f0e.png)"
      },
      "Fossil fuel transfers": {
        low: "#d62728",
        range: "url(/assets/images/hatches/hatch-d62728.png)"
      },
      "District heating effective demand": {
        low: "#7f7f7f",
        range: "url(/assets/images/hatches/hatch-7f7f7f.png)"
      },
      "Power Carbon Capture": {
        low: "#EA8BCC",
        range: "url(/assets/images/hatches/hatch-EA8BCC.png)"
      },
      "Industry Carbon Capture": {
        low: "#a55194",
        range: "url(/assets/images/hatches/hatch-a55194.png)"
      },
      "Finance cost": {
        low: "#8c564b",
        range: "url(/assets/images/hatches/hatch-8c564b.png)"
      }
    };

    function CostsComparedWithinSector() {
      this.updateBar = __bind(this.updateBar, this);
      this.ready = false;
    }

    CostsComparedWithinSector.prototype.setup = function() {
      var all_pathways, b, c, category, code, e, format, h, lb, tick, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _o, _p, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _results;
      if (this.ready) {
        return false;
      }
      this.ready = true;
      $('#results').append(costsComparedWithinSectorHTML);
      $('#message').addClass('warning');
      $('#sectorname').html(categories[twentyfifty.getSector()]);
      twentyfifty.cost_override_in_place_warning();
      all_pathways = ["chosen"].concat(twentyfifty.comparator_pathways);
      this.relevant_costs = twentyfifty.costs_in_category(categories[twentyfifty.getSector()]);
      e = $('#costscomparedwithinsector');
      this.h = e.height();
      this.w = e.width();
      this.r = new Raphael('costscomparedwithinsector', this.w, this.h);
      this.x = d3.scale.linear().domain([0, 3000]).range([250, this.w - 30]).nice();
      this.y = d3.scale.ordinal().domain(all_pathways).rangeRoundBands([25, this.h - 20], 0.25);
      _ref = twentyfifty.comparator_pathways;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        code = _ref[_i];
        this.r.rect(this.x(0), this.y(code), this.x(3000) - this.x(0), this.y.rangeBand()).attr({
          'fill': '#ddd',
          'stroke': 'none'
        });
      }
      this.r.rect(25, this.y("chosen"), this.x(3000) - 25, this.y.rangeBand()).attr({
        'fill': '#FCFF9B',
        'stroke': 'none'
      });
      this.r.text(30, this.y("chosen") + 9, "Your pathway").attr({
        'text-anchor': 'start',
        'font-weight': 'bold'
      });
      this.r.text(30, this.y("chosen") + 27, "").attr({
        'text-anchor': 'start'
      });
      _ref1 = twentyfifty.comparator_pathways;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        code = _ref1[_j];
        this.r.text(30, this.y(code) + 9, twentyfifty.pathwayName(code, code)).attr({
          'text-anchor': 'start',
          'font-weight': 'bold',
          href: twentyfifty.pathwayWikiPages(code)
        });
        this.r.text(30, this.y(code) + 27, twentyfifty.pathwayDescriptions(code, "")).attr({
          'text-anchor': 'start',
          href: twentyfifty.pathwayWikiPages(code)
        });
      }
      this.boxes = {};
      this.boxes_by_category = {};
      _ref2 = this.relevant_costs;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        category = _ref2[_k];
        this.boxes_by_category[category] = {
          boxes: this.r.set(),
          labels: this.r.set(),
          top_label: null,
          top_label_box: null
        };
      }
      x = this.x(0);
      h = this.y.rangeBand();
      _ref3 = ["chosen"].concat(twentyfifty.comparator_pathways);
      for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
        code = _ref3[_l];
        b = {};
        y = this.y(code);
        _ref4 = this.relevant_costs;
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          category = _ref4[_m];
          b[category] = {
            low: this.r.rect(x, y, 0, h).attr({
              'fill': cost_component_colors[category].low,
              'stroke': 'none'
            }),
            low_label: this.r.text(x, y + h / 2, "").attr({
              'fill': '#000',
              'text-anchor': 'middle'
            }),
            range: this.r.rect(x, y, 0, h).attr({
              'fill': cost_component_colors[category].range,
              'stroke': 'none'
            }),
            range_label: this.r.text(x, y + h / 2, "").attr({
              'fill': '#000',
              'text-anchor': 'middle'
            })
          };
          c = this.boxes_by_category[category];
          c.boxes.push(b[category].low, b[category].range);
          c.labels.push(b[category].low_label, b[category].range_label);
        }
        this.boxes[code] = b;
      }
      this.r.text(this.x(0), this.h - 5, "The absolute cost to society of the whole energy system (mean undiscounted real pounds per person per year 2010-2050)").attr({
        'text-anchor': 'start',
        'font-weight': 'bold',
        'fill': '#008000'
      });
      this.r.path(["M", this.x(0), 40, "L", this.x(0), this.h - 28, "L", this.w - 30, this.h - 28]).attr({
        'stroke': '#008000',
        'stroke-width': 2
      });
      format = this.x.tickFormat(10);
      _ref5 = this.x.ticks(10);
      for (_n = 0, _len5 = _ref5.length; _n < _len5; _n++) {
        tick = _ref5[_n];
        this.r.text(this.x(tick), this.h - 20, format(tick)).attr({
          'text-anchor': 'middle',
          fill: '#008000'
        });
        this.r.path(["M", this.x(tick), 40, "L", this.x(tick), this.h - 26]).attr({
          stroke: '#fff'
        });
      }
      _ref6 = this.relevant_costs;
      for (_o = 0, _len6 = _ref6.length; _o < _len6; _o++) {
        category = _ref6[_o];
        this.boxes_by_category[category].labels.hide();
        this.boxes_by_category[category].labels.toFront();
        this.hover(this.boxes_by_category[category].boxes, category);
        this.hover(this.boxes_by_category[category].labels, category);
        lb = this.boxes_by_category[category].top_label = this.r.text(this.x(0) + 100, h * 0.75 / 2, category).attr({
          'text-anchor': 'middle',
          'font-weight': 'bold'
        }).hide();
        this.boxes_by_category[category].top_label_box = this.r.rect(this.x(0), 0, lb.getBBox().width + 15, h * 0.75, 5).attr({
          'fill': '#fff',
          'stroke': cost_component_colors[category].low
        }).hide();
        lb.toFront();
      }
      _ref7 = twentyfifty.comparator_pathways;
      _results = [];
      for (_p = 0, _len7 = _ref7.length; _p < _len7; _p++) {
        code = _ref7[_p];
        _results.push(twentyfifty.loadSecondaryPathway(code, this.updateBar));
      }
      return _results;
    };

    CostsComparedWithinSector.prototype.hover = function(boxes, category) {
      return boxes.hover(((function(_this) {
        return function() {
          return _this.show(category);
        };
      })(this)), ((function(_this) {
        return function() {
          return _this.hide(category);
        };
      })(this)));
    };

    CostsComparedWithinSector.prototype.show = function(category) {
      var c, _i, _len, _ref, _results;
      _ref = this.relevant_costs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        if (c === category) {
          this.boxes_by_category[c].labels.show();
          this.boxes_by_category[c].top_label_box.show();
          _results.push(this.boxes_by_category[c].top_label.show());
        } else {
          _results.push(this.boxes_by_category[c].boxes.attr({
            'fill-opacity': 0.5
          }));
        }
      }
      return _results;
    };

    CostsComparedWithinSector.prototype.hide = function(category) {
      var c, _i, _len, _ref, _results;
      _ref = this.relevant_costs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        if (c === category) {
          this.boxes_by_category[c].labels.hide();
          this.boxes_by_category[c].top_label_box.hide();
          _results.push(this.boxes_by_category[c].top_label.hide());
        } else {
          _results.push(this.boxes_by_category[c].boxes.attr({
            'fill-opacity': 1.0
          }));
        }
      }
      return _results;
    };

    CostsComparedWithinSector.prototype.teardown = function() {
      $('#results').empty();
      $('#message').removeClass('warning');
      return this.ready = false;
    };

    CostsComparedWithinSector.prototype.updateResults = function(pathway) {
      if (!this.ready) {
        this.setup();
      }
      return this.updateBar(pathway, 'chosen');
    };

    CostsComparedWithinSector.prototype.updateBar = function(pathway, _id) {
      var b, categorised_costs, category, cost, lb, low, range, _results, _x;
      if (_id == null) {
        _id = pathway._id;
      }
      if (this.boxes == null) {
        this.setupComparisonChart();
      }
      if (pathway.categorised_costs == null) {
        twentyfifty.group_costs_of_pathway(pathway);
      }
      categorised_costs = pathway.categorised_costs[categories[twentyfifty.getSector()]];
      b = this.boxes[_id];
      _x = 0;
      for (category in categorised_costs) {
        if (!__hasProp.call(categorised_costs, category)) continue;
        cost = categorised_costs[category];
        if (!(category === "high" || category === "low" || category === "range")) {
          low = cost.low_adjusted;
          if (_id === 'chosen') {
            lb = this.boxes_by_category[category].top_label_box;
            lb.attr({
              x: this.x(_x + low / 2) - (lb.attr('width') / 2)
            });
            this.boxes_by_category[category].top_label.attr({
              x: this.x(_x + low / 2)
            });
          }
          if (low >= 0) {
            b[category].low.attr({
              x: this.x(_x),
              width: this.x(low) - this.x(0)
            });
            if (Math.round(low) === 0) {
              b[category].low_label.attr({
                x: this.x(_x + low / 2),
                text: ""
              });
            } else {
              b[category].low_label.attr({
                x: this.x(_x + low / 2),
                text: "" + (Math.round(low))
              });
            }
            _x += low;
          } else {
            b[category].low.attr({
              x: this.x(0),
              width: this.x(0) - this.x(0)
            });
            b[category].low_label.attr({
              x: this.x(0),
              text: ""
            });
          }
        }
      }
      _results = [];
      for (category in categorised_costs) {
        if (!__hasProp.call(categorised_costs, category)) continue;
        cost = categorised_costs[category];
        if (!(category === "high" || category === "low" || category === "range")) {
          range = cost.range_adjusted;
          low = cost.low_adjusted;
          if (low >= 0) {
            b[category].range.attr({
              x: this.x(_x),
              width: this.x(range) - this.x(0)
            });
            if (Math.round(range) === 0) {
              b[category].range_label.attr({
                x: this.x(_x + range / 2),
                text: ""
              });
            } else {
              b[category].range_label.attr({
                x: this.x(_x + range / 2),
                text: "" + (Math.round(range))
              });
            }
            _results.push(_x += range);
          } else {
            b[category].range.attr({
              x: this.x(0),
              width: this.x(0) - this.x(0)
            });
            _results.push(b[category].range_label.attr({
              x: this.x(0),
              text: ""
            }));
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return CostsComparedWithinSector;

  })();

  window.twentyfifty.views['costs_compared_within_sector'] = new CostsComparedWithinSector;

}).call(this);
(function() {
  var CostsSensitivity,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CostsSensitivity = (function() {
    var bottom_area_start, c_low_fill_color, c_range_fill_color, color, cost_component_names, cost_component_value, cost_component_values, cost_wiki_links, costsSensitivityHTML, direction, label_components, optional_arrow, p_low_fill_color, p_range_fill_color;

    costsSensitivityHTML = "<div class='costssensitivity'>\n  <ul class='dropdown' id='comparatorchoice'>\n    <li>\n      <a href=\"#\" onclick=\"$('ul#view_comparatorchoice').toggle(); return false;\">Choose comparison<img alt=\"Dropdown-arrow\" src=\"/assets/images/dropdown-arrow.png\" /></a>\n      <ul class='choices' id='view_comparatorchoice'>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('10111111111111110111111001111110111101101101110110111');$('ul#view_comparatorchoice').toggle(); return false;\">Doesn't tackle climate change (All level 1)</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('10111111111111110111111004444440444404203304440420111');$('ul#view_comparatorchoice').toggle(); return false;\">Maximum demand</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('40444444444444440443444001111110111101101101110110111');$('ul#view_comparatorchoice').toggle(); return false;\">Maximum supply</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('i0g2dd2pp1121f1i032211p004314110433304202304320420121');$('ul#view_comparatorchoice').toggle(); return false;\">Analogous to Markal 3.26</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('e0d3jrg221ci12110222112004423220444404202304440420141');$('ul#view_comparatorchoice').toggle(); return false;\">Higher renewables, more energy efficiency</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('r013ce1111111111042233B002322220233302202102330220121');$('ul#view_comparatorchoice').toggle(); return false;\">Higher nuclear, less energy efficiency</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('f023df111111111f0322123003223220333203102303430310221');$('ul#view_comparatorchoice').toggle(); return false;\">Higher CCS, more bioenergy</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('10h4nn4431w23y110243111004424440343304202304430420441');$('ul#view_comparatorchoice').toggle(); return false;\">Friends of the Earth</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('10h2pdppp12332130233122004414430343304102304430410231');$('ul#view_comparatorchoice').toggle(); return false;\">Campaign to Protect Rural England</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('20222144411341110343321003422440423404203203340420141');$('ul#view_comparatorchoice').toggle(); return false;\">Mark Brinkley</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('h0h2gg1211cj1j110322222003313230234102102203440320121');$('ul#view_comparatorchoice').toggle(); return false;\">National Grid</a></li>\n        <li><a href=\"#\" onclick=\"twentyfifty.switchComparator('g0f2oj11t1rgqj1j0343111003324240244104201304430420231');$('ul#view_comparatorchoice').toggle(); return false;\">Atkins</a></li>\n      </ul>\n    </li>\n  </ul>\n  <h1>The cost of your pathway compared with another, allowing simple variation in cost estimates.</h1>\n  " + window.costCaveatHTML + "\n  <div id='costssensitivity'></div>\n  " + window.costEssentialNotesHTML + "\n</div>";

    bottom_area_start = 219;

    cost_component_names = ["Conventional thermal plant", "Combustion + CCS", "Nuclear power", "Onshore wind", "Offshore wind", "Hydroelectric", "Wave and Tidal", "Geothermal", "Distributed solar PV", "Distributed solar thermal", "Micro wind", "Biomatter to fuel conversion", "Bioenergy imports", "Agriculture and land use", "Energy from waste", "Waste arising", "Marine algae", "Electricity imports", "Electricity Exports", "Electricity grid distribution", "Storage, demand shifting, backup", "H2 Production", "Domestic heating", "Domestic insulation", "Commercial heating and cooling", "Domestic lighting, appliances, and cooking", "Commercial lighting, appliances, and catering", "Industrial processes", "Conventional cars and buses", "Hybrid cars and buses", "Electric cars and buses", "Fuel cell cars and buses", "Bikes", "Rail", "Domestic aviation", "Domestic freight", "International aviation", "International shipping (maritime bunkers)", "Geosequestration", "Petroleum refineries", "Fossil fuel transfers", "District heating effective demand", "Storage of captured CO2", "Coal", "Oil", "Gas", "Finance cost"];

    cost_wiki_links = {
      "Fuel cell cars and buses": '/pages/63',
      "Conventional cars and buses": '/pages/63',
      "Hybrid cars and buses": '/pages/63',
      "Gas": '/pages/13',
      "Electric cars and buses": '/pages/63',
      "Domestic insulation": '/pages/31',
      "Wave and Tidal": '/pages/38',
      "Finance cost": '/pages/28',
      "Industrial processes": '/pages/24',
      "Domestic heating": '/pages/31',
      "Offshore wind": '/pages/6',
      "Commercial heating and cooling": '/pages/44',
      "Oil": '/pages/13',
      "Conventional thermal plant": '/pages/42',
      "Distributed solar PV": '/pages/40',
      "Nuclear power": '/pages/7',
      "Bioenergy imports": '/pages/3',
      "Agriculture and land use": '/pages/19',
      "Carbon Storage": '/pages/36',
      "Fossil fuel transfers": '/pages/12',
      "H2 Production": '/pages/43',
      "Combustion + CCS": '/pages/8',
      "Storage of captured CO2": '/pages/36',
      "Biomatter to fuel conversion": '/pages/26',
      "Electricity grid distribution": '/pages/11',
      "Storage, demand shifting, backup": '/pages/10',
      "Onshore wind": '/pages/5',
      "Electricity Exports": '/pages/32',
      "Energy from waste": '/pages/19',
      "Waste arising": '/pages/27',
      "Distributed solar thermal": '/pages/31',
      "Domestic freight": '/pages/64',
      "Coal": '/pages/13',
      "Geothermal": '/pages/39',
      "Micro wind": '/pages/56',
      "District heating effective demand": '/pages/30',
      "Commercial lighting, appliances, and catering": '/pages/23',
      "Marine algae": '/pages/17',
      "Rail": '/pages/63',
      "Hydroelectric": '/pages/9',
      "Domestic aviation": '/pages/63',
      "Domestic lighting, appliances, and cooking": '/pages/46',
      "Geosequestration": '/pages/29',
      "Petroleum refineries": '/pages/25',
      "International shipping (maritime bunkers)": '/pages/71',
      "International aviation": '/pages/70',
      "Bikes": '/pages/63',
      "Electricity imports": '/pages/32'
    };

    cost_component_values = {
      "Oil": {
        cheap: "$75/bbl",
        "default": "$130/bbl",
        expensive: "$170/bbl"
      },
      "Coal": {
        cheap: "$80/tCoal",
        "default": "$110/tCoal",
        expensive: "$155/tCoal"
      },
      "Gas": {
        cheap: "45p/therm",
        "default": "70p/therm",
        expensive: "100p/therm"
      },
      "Finance cost": {
        cheap: "None",
        "default": "7% real",
        expensive: "10% real"
      }
    };

    cost_component_value = function(name) {
      return cost_component_values[name] || {
        cheap: "Cheap",
        "default": "Default",
        expensive: "Today's cost"
      };
    };

    direction = function(value) {
      if (value > 0) {
        return "more expensive";
      }
      return "cheaper";
    };

    color = function(value) {
      if (value > 0) {
        return "#f00";
      }
      return "#0f0";
    };

    p_low_fill_color = '#1f77b4';

    p_range_fill_color = 'url(/assets/images/hatches/hatch-1f77b4.png)';

    c_low_fill_color = '#f00';

    c_range_fill_color = 'url(/assets/images/hatches/hatch-f00.png)';

    function CostsSensitivity() {
      this.updateComparator = __bind(this.updateComparator, this);
      this.updateResults = __bind(this.updateResults, this);
      this.ready = false;
    }

    CostsSensitivity.prototype.setup = function() {
      if (this.ready) {
        return false;
      }
      this.ready = true;
      $("#results").append(costsSensitivityHTML);
      $('#message').addClass('warning');
      this.drawChart();
      return this.switchComparator(twentyfifty.getComparator() || twentyfifty.default_comparator_code);
    };

    CostsSensitivity.prototype.teardown = function() {
      $('#results').empty();
      $('#message').removeClass('warning');
      return this.ready = false;
    };

    CostsSensitivity.prototype.updateResults = function(pathway) {
      this.pathway = pathway;
      if (!this.ready) {
        this.setup();
      }
      if (this.pathway.total_cost_low_adjusted == null) {
        twentyfifty.adjust_costs_of_pathway(this.pathway);
      }
      this.sortComponents();
      this.updateBar(this.top_pathway_chart, this.pathway.total_cost_low_adjusted, this.pathway.total_cost_range_adjusted);
      return this.updateIncrement();
    };

    CostsSensitivity.prototype.switchComparator = function(code) {
      return twentyfifty.loadSecondaryPathway(code, this.updateComparator);
    };

    CostsSensitivity.prototype.updateComparator = function(comparator) {
      this.comparator = comparator;
      if (this.comparator.total_cost_low_adjusted == null) {
        twentyfifty.adjust_costs_of_pathway(this.comparator);
      }
      this.updateBar(this.top_comparator_chart, this.comparator.total_cost_low_adjusted, this.comparator.total_cost_range_adjusted);
      this.top_comparator_chart.name.attr({
        text: twentyfifty.pathwayName(this.comparator._id, this.comparator._id),
        href: twentyfifty.pathwayWikiPages(this.comparator._id)
      });
      this.top_comparator_chart.description.attr({
        text: twentyfifty.pathwayDescriptions(this.comparator._id, ""),
        href: twentyfifty.pathwayWikiPages(this.comparator._id)
      });
      this.key_label.attr({
        text: "The cost in '" + (twentyfifty.pathwayName(this.comparator._id, this.comparator._id)) + "'"
      });
      if (this.pathway != null) {
        this.updateIncrement();
        return this.updateComponents(false, true);
      }
    };

    CostsSensitivity.prototype.updateToBarForNewCost = function() {
      this.updateBar(this.top_pathway_chart, this.pathway.total_cost_low_adjusted, this.pathway.total_cost_range_adjusted);
      this.updateBar(this.top_comparator_chart, this.comparator.total_cost_low_adjusted, this.comparator.total_cost_range_adjusted);
      return this.updateIncrement();
    };

    CostsSensitivity.prototype.updateIncrement = function() {
      var average, c, i, i1, i2, max, min, p;
      if (!((this.pathway != null) && (this.comparator != null))) {
        return;
      }
      p = this.pathway;
      c = this.comparator;
      i = twentyfifty.calculateIncrementalCost(p, c);
      min = Math.min(p.total_cost_low_adjusted, c.total_cost_low_adjusted);
      max = Math.max(p.total_cost_high_adjusted, c.total_cost_high_adjusted);
      average = (min + max) / 2;
      i1 = i.tc - i.cc;
      i2 = i.tt - i.ct;
      if (i1 === i2) {
        this.increment_arrows.low.hide();
        this.increment_arrows.high.hide();
        this.increment_arrows.range_message.hide();
        this.increment_arrows.low_value.hide();
        this.increment_arrows.high_value.hide();
        this.increment_arrows.single.attr({
          path: ["M", this.x(p.total_cost_low_adjusted - i1), this.top_y('i') + this.top_bar_height * 0.5, "L", this.x(p.total_cost_low_adjusted), this.top_y('i') + this.top_bar_height * 0.5],
          stroke: color(i2),
          fill: color(i2)
        });
        this.increment_arrows.single_value.attr({
          x: this.x(max) + 3,
          text: "£" + (Math.round(Math.abs(i1))) + "/person/year " + (direction(i1))
        });
        optional_arrow(this.increment_arrows.single, i1);
        this.increment_arrows.single.show();
        return this.increment_arrows.single_value.show();
      } else {
        this.increment_arrows.single.hide();
        this.increment_arrows.single_value.hide();
        this.increment_arrows.low.attr({
          path: ["M", this.x(average - i2 / 2), this.top_y('i') + this.top_bar_height * 0.25, "L", this.x(average + i2 / 2), this.top_y('i') + this.top_bar_height * 0.25],
          stroke: color(i2),
          fill: color(i2)
        });
        this.increment_arrows.high.attr({
          path: ["M", this.x(average - i1 / 2), this.top_y('i') + this.top_bar_height * 0.75, "L", this.x(average + i1 / 2), this.top_y('i') + this.top_bar_height * 0.75],
          stroke: color(i1),
          fill: color(i1)
        });
        this.increment_arrows.range_message.attr({
          x: this.x(min) - 3
        });
        this.increment_arrows.low_value.attr({
          x: this.x(max) + 3,
          text: "£" + (Math.round(Math.abs(i2))) + "/person/year " + (direction(i2)) + " and"
        });
        this.increment_arrows.high_value.attr({
          x: this.x(max) + 3,
          text: "£" + (Math.round(Math.abs(i1))) + "/person/year " + (direction(i1))
        });
        optional_arrow(this.increment_arrows.low, i2);
        optional_arrow(this.increment_arrows.high, i1);
        this.increment_arrows.low.show();
        this.increment_arrows.high.show();
        this.increment_arrows.range_message.show();
        this.increment_arrows.low_value.show();
        return this.increment_arrows.high_value.show();
      }
    };

    optional_arrow = function(arrow, value) {
      if (Math.abs(value) > 200) {
        return arrow.attr({
          'arrow-end': 'classic-narrow-short'
        });
      } else {
        return arrow.attr({
          'arrow-end': 'none'
        });
      }
    };

    label_components = {
      labels: ['name', 'details', 'cheap', 'default', 'expensive', 'uncertain'],
      boxes: ['details_box', 'cheap_box', 'default_box', 'expensive_box', 'uncertain_box']
    };

    CostsSensitivity.prototype.sortComponents = function() {
      var a, bar_offset, component, cy, ly, name, p, py, y, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      p = this.pathway.cost_components;
      bar_offset = this.bar_offset;
      cost_component_names.sort(function(a, b) {
        return p[b].high_adjusted - p[a].high_adjusted;
      });
      this.bottom_y = y = d3.scale.ordinal().domain(cost_component_names).rangeRoundBands([bottom_area_start, this.h], 0.25);
      for (_i = 0, _len = cost_component_names.length; _i < _len; _i++) {
        name = cost_component_names[_i];
        component = this.components[name];
        py = y(name);
        cy = py + bar_offset;
        ly = py + (y.rangeBand() / 2);
        _ref = label_components.labels;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          a = _ref[_j];
          component[a].attr({
            y: ly
          });
        }
        _ref1 = label_components.boxes;
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          a = _ref1[_k];
          component[a].attr({
            y: py
          });
        }
        component.pathway.low.attr({
          y: py
        });
        component.pathway.range.attr({
          y: py
        });
        component.comparator.low.attr({
          y: cy
        });
        component.comparator.range.attr({
          y: cy
        });
      }
      return this.updateComponents();
    };

    CostsSensitivity.prototype.updateComponents = function(update_pathway, update_comparator) {
      var name, _i, _len, _results;
      if (update_pathway == null) {
        update_pathway = true;
      }
      if (update_comparator == null) {
        update_comparator = true;
      }
      if (!(this.pathway || this.comparator)) {
        return;
      }
      _results = [];
      for (_i = 0, _len = cost_component_names.length; _i < _len; _i++) {
        name = cost_component_names[_i];
        _results.push(this.updateComponentNamed(name, update_pathway, update_comparator));
      }
      return _results;
    };

    CostsSensitivity.prototype.updateComponentNamed = function(name, update_pathway, update_comparator) {
      var a, c, chosen, component, cy, p, py, setting, _i, _len, _ref;
      if (update_pathway == null) {
        update_pathway = true;
      }
      if (update_comparator == null) {
        update_comparator = true;
      }
      component = this.components[name];
      if (update_pathway && (this.pathway != null)) {
        p = this.pathway.cost_components[name];
        py = this.bottom_y(name);
        this.updateBar(component.pathway, p.low_adjusted, p.range_adjusted);
        component.pathway.uncertainty.attr({
          path: ["M", this.x(p.low), py, "L", this.x(p.high), py]
        });
      }
      if (update_comparator && (this.comparator != null)) {
        c = this.comparator.cost_components[name];
        cy = this.bottom_y(name) + this.bar_offset;
        this.updateBar(component.comparator, c.low_adjusted, c.range_adjusted);
        component.comparator.uncertainty.attr({
          path: ["M", this.x(c.low), cy, "L", this.x(c.high), cy]
        });
      }
      setting = $.jStorage.get(name);
      _ref = ['details', 'cheap', 'default', 'expensive', 'uncertain', 'details_box', 'cheap_box', 'default_box', 'expensive_box', 'uncertain_box'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        component[a].attr({
          'font-weight': 'normal'
        });
      }
      if ((setting == null) || setting === 'point') {
        chosen = component["default"];
      } else if (setting === 'uncertain') {
        chosen = component.uncertain;
      } else if (setting === 0) {
        chosen = component.cheap;
      } else if (setting === 1) {
        chosen = component.expensive;
      }
      return chosen.attr({
        'font-weight': 'bold'
      });
    };

    CostsSensitivity.prototype.updateBar = function(bar, low, range) {
      if (low < 0) {
        bar.low.attr({
          x: this.x(low + range),
          width: this.w(Math.abs(range))
        });
      } else {
        bar.low.attr({
          width: this.w(low)
        });
      }
      if (range < 0) {
        return bar.range.attr({
          x: this.x(low + range),
          width: this.w(Math.abs(range))
        });
      } else {
        return bar.range.attr({
          x: this.x(low),
          width: this.w(range)
        });
      }
    };

    CostsSensitivity.prototype.w = function(value) {
      return this.x(value) - this.x(0);
    };

    CostsSensitivity.prototype.drawChart = function() {
      var bar_height, bar_offset, box_attr, boxy, component, components, cy, e, format, h, increment, labels, ly, name, py, r, sensitivity_label_height, sensitivity_label_width, tick, url, w, x, y, _i, _j, _k, _len, _len1, _len2, _ref;
      e = $('#costssensitivity');
      this.h = h = e.height();
      w = e.width();
      r = new Raphael('costssensitivity', w, h);
      this.x = x = d3.scale.linear().domain([0, 10000]).range([250, w - 30]).nice();
      this.top_y = y = d3.scale.ordinal().domain(['p', 'i', 'c']).rangeRoundBands([30, 180], 0.15);
      r.text(x(5000), 17, "The mean cost to society of the whole energy system in undiscounted real pounds per person 2010-2050").attr({
        'text-anchor': 'center',
        'font-weight': 'bold'
      });
      this.top_bar_height = bar_height = y.rangeBand();
      r.rect(25, y('p'), x(10000) - 25, bar_height).attr({
        'fill': '#FCFF9B',
        'stroke': 'none'
      });
      r.text(30, y("p") + 9, "Your pathway").attr({
        'text-anchor': 'start',
        'font-weight': 'bold'
      });
      r.text(30, y("p") + 27, "You can use the chart below to see how\nsensitive it is to different cost assumptions").attr({
        'text-anchor': 'start'
      });
      this.top_pathway_chart = {
        low: r.rect(x(0), y('p'), 0, bar_height).attr({
          'fill': p_low_fill_color,
          'stroke': 'none'
        }),
        range: r.rect(x(0), y('p'), 0, bar_height).attr({
          'fill': p_range_fill_color,
          'stroke': 'none'
        })
      };
      r.rect(x(0), y('c'), x(10000) - x(0), bar_height).attr({
        'fill': '#ddd',
        'stroke': 'none'
      });
      this.top_comparator_chart = {
        name: r.text(30, y('c') + 9, "").attr({
          'text-anchor': 'start',
          'font-weight': 'bold'
        }),
        description: r.text(30, y('c') + 27, "").attr({
          'text-anchor': 'start'
        }),
        low: r.rect(x(0), y('c'), 0, bar_height).attr({
          'fill': c_low_fill_color,
          'stroke': 'none'
        }),
        range: r.rect(x(0), y('c'), 0, bar_height).attr({
          'fill': c_range_fill_color,
          'stroke': 'none'
        })
      };
      r.setStart();
      this.increment_arrows = {
        single: r.path(["M", 0, 0, "L", 0, 0]).attr({
          'stroke-width': '15'
        }),
        single_value: r.text(0, y('i') + bar_height / 2, "").attr({
          'text-anchor': 'start'
        }),
        range_message: r.text(0, y('i') + bar_height / 2, "Some costs are uncertain, therefore your pathway could be between").attr({
          'text-anchor': 'end'
        }),
        low: r.path(["M", 0, 0, "L", 0, 0]).attr({
          'stroke-width': '10'
        }),
        high: r.path(["M", 0, 0, "L", 0, 0]).attr({
          'stroke-width': '10'
        }),
        low_value: r.text(0, y('i') + bar_height * 0.25, "").attr({
          'text-anchor': 'start'
        }),
        high_value: r.text(0, y('i') + bar_height * 0.75, "").attr({
          'text-anchor': 'start'
        })
      };
      increment = r.setFinish();
      increment.hide();
      this.bottom_y = y = d3.scale.ordinal().domain(cost_component_names).rangeRoundBands([bottom_area_start, h], 0.25);
      bar_height = (y.rangeBand() - 2) / 2;
      this.bar_offset = bar_offset = ((y.rangeBand() - 2) / 2) + 2;
      components = {};
      for (_i = 0, _len = cost_component_names.length; _i < _len; _i++) {
        name = cost_component_names[_i];
        py = y(name);
        r.rect(x(0), py, x(10000) - x(0), y.rangeBand()).attr({
          'fill': '#ddd',
          'stroke': 'none'
        });
      }
      sensitivity_label_height = y.rangeBand();
      sensitivity_label_width = this.w(1000) - 2;
      box_attr = {
        fill: '#fff',
        stroke: '#000',
        'fill-opacity': 0,
        'stroke-opacity': 0
      };
      for (_j = 0, _len1 = cost_component_names.length; _j < _len1; _j++) {
        name = cost_component_names[_j];
        py = y(name);
        cy = py + bar_offset;
        ly = py + (y.rangeBand() / 2);
        boxy = py;
        component = {};
        url = "http://2050-calculator-tool-wiki.decc.gov.uk" + (cost_wiki_links[name] || "/");
        component.name = r.text(245, ly, name).attr({
          'text-anchor': 'end',
          href: url
        });
        component.pathway = {};
        component.pathway.low = r.rect(x(0), py, 0, bar_height).attr({
          'fill': p_low_fill_color,
          'stroke': 'none'
        });
        component.pathway.range = r.rect(x(0), py, 0, bar_height).attr({
          'fill': p_range_fill_color,
          'stroke': 'none'
        });
        component.pathway.uncertainty = r.path(["M", 0, 0, "L", 0, 0]).attr({
          stroke: '#000',
          'arrow-end': "classic-narrow-long",
          'arrow-start': "classic-narrow-long"
        });
        component.comparator = {};
        component.comparator.low = r.rect(x(0), cy, 0, bar_height).attr({
          'fill': c_low_fill_color,
          'stroke': 'none'
        });
        component.comparator.range = r.rect(x(0), cy, 0, bar_height).attr({
          'fill': c_range_fill_color,
          'stroke': 'none'
        });
        component.comparator.uncertainty = r.path(["M", 0, 0, "L", 0, 0]).attr({
          stroke: '#000',
          'arrow-end': "classic-narrow-long",
          'arrow-start': "classic-narrow-long"
        });
        labels = cost_component_value(name);
        component.details = r.text(x(5500), ly, "See assumptions").attr({
          'text-anchor': 'middle',
          href: url
        });
        component.details_box = r.rect(x(5000), py, sensitivity_label_width, sensitivity_label_height).attr({
          fill: '#ccc',
          opacity: 0,
          cursor: 'pointer',
          href: url
        });
        component.cheap = r.text(x(6500), ly, labels.cheap).attr({
          'text-anchor': 'middle'
        });
        component.cheap_box = r.rect(x(6000) + 1, boxy, sensitivity_label_width, sensitivity_label_height).attr(box_attr);
        component["default"] = r.text(x(7500), ly, labels["default"]).attr({
          'text-anchor': 'middle'
        });
        component.default_box = r.rect(x(7000) + 1, boxy, sensitivity_label_width, sensitivity_label_height).attr(box_attr);
        component.expensive = r.text(x(8500), ly, labels.expensive).attr({
          'text-anchor': 'middle'
        });
        component.expensive_box = r.rect(x(8000) + 1, boxy, sensitivity_label_width, sensitivity_label_height).attr(box_attr);
        component.uncertain = r.text(x(9500), ly, "Uncertain").attr({
          'text-anchor': 'middle'
        });
        component.uncertain_box = r.rect(x(9000) + 1, boxy, sensitivity_label_width, sensitivity_label_height).attr(box_attr);
        this.clickToChangeCost(component.cheap_box, name, 0);
        this.clickToChangeCost(component.default_box, name, "point");
        this.clickToChangeCost(component.expensive_box, name, 1);
        this.clickToChangeCost(component.uncertain_box, name, "uncertain");
        components[name] = component;
      }
      this.components = components;
      format = x.tickFormat(10);
      _ref = x.ticks(10);
      for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
        tick = _ref[_k];
        r.text(x(tick), 30, format(tick)).attr({
          'text-anchor': 'middle'
        });
        r.path(["M", x(tick), 40, "L", x(tick), h]).attr({
          stroke: '#fff'
        });
      }
      r.text(30, 205, "The biggest costs in your pathway").attr({
        'text-anchor': 'start',
        'font-weight': 'bold'
      });
      r.path(["M", 32, 212, "L", 32, 300]).attr({
        stroke: '#000',
        'arrow-end': "classic-wide-long"
      });
      r.rect(250, 205, 30, bar_height).attr({
        'fill': p_low_fill_color,
        'stroke': 'none'
      });
      r.text(285, 208, "The cost in your pathway").attr({
        'text-anchor': 'start',
        'font-weight': 'normal'
      });
      r.rect(250, 215, 30, bar_height).attr({
        'fill': c_low_fill_color,
        'stroke': 'none'
      });
      this.key_label = r.text(285, 218, "The cost in your comparator").attr({
        'text-anchor': 'start',
        'font-weight': 'normal'
      });
      r.path(["M", 250, 228, "L", 280, 228]).attr({
        stroke: '#000',
        'arrow-end': "classic-wide-long",
        'arrow-start': 'classic-wide-short'
      });
      r.text(285, 228, "The range of cost estimates").attr({
        'text-anchor': 'start',
        'font-weight': 'normal'
      });
      r.text(x(7500), 220, "Try different cost scenarios").attr({
        'text-anchor': 'middle',
        'font-weight': 'bold'
      });
      r.text(x(6500), 233, "Cheap");
      r.path(["M", x(7000), 233, "L", x(8000) - 2, 233]).attr({
        stroke: '#000',
        'arrow-end': "classic-wide-long"
      });
      r.text(x(8500), 233, "Expensive");
      r.text(w - 30, 233, "(reset)").attr({
        'text-anchor': 'end',
        cursor: 'pointer'
      }).click((function(_this) {
        return function() {
          var _l, _len3;
          for (_l = 0, _len3 = cost_component_names.length; _l < _len3; _l++) {
            name = cost_component_names[_l];
            jQuery.jStorage.set(name, 'point');
          }
          twentyfifty.adjust_costs_of_pathway(_this.pathway);
          twentyfifty.adjust_costs_of_pathway(_this.comparator);
          _this.updateComponents();
          return _this.updateToBarForNewCost();
        };
      })(this));
      return increment.toFront();
    };

    CostsSensitivity.prototype.clickToChangeCost = function(element, name, level) {
      element.click((function(_this) {
        return function() {
          jQuery.jStorage.set(name, level);
          twentyfifty.adjust_costs_of_pathway(_this.pathway);
          twentyfifty.adjust_costs_of_pathway(_this.comparator);
          _this.updateComponentNamed(name);
          return _this.updateToBarForNewCost();
        };
      })(this));
      element.hover((function() {
        return this.attr({
          'stroke-opacity': 1.0
        });
      }), (function() {
        return this.attr({
          'stroke-opacity': 0.0
        });
      }));
      return element.attr({
        cursor: 'pointer'
      });
    };

    return CostsSensitivity;

  })();

  window.twentyfifty.views['costs_sensitivity'] = new CostsSensitivity;

}).call(this);
(function() {
  var Story,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  Story = (function() {
    function Story() {
      this.ready = false;
    }

    Story.prototype.setup = function() {
      $("#results").append("<div id='stories'><div id='demand_story' class='story'></div><div id='supply_story' class='story'></div><div id='ghg_story' class='story'></div><div class='clear'></div></div>");
      return this.ready = true;
    };

    Story.prototype.teardown = function() {
      $("#results").empty();
      return this.ready = false;
    };

    Story.prototype.updateResults = function(pathway) {
      var element;
      this.pathway = pathway;
      if (!this.ready) {
        this.setup();
      }
      this.choices = twentyfifty.choices;
      element = $('#demand_story');
      element.empty();
      this.stories_for_choices(element, "Homes in 2050", 32, 33, 37, 38);
      this.heating_choice_table(element, this.pathway.heating.residential);
      this.stories_for_choices(element, "Personal transport in 2050", 25, 26, 27, 29);
      this.stories_for_choices(element, "Businesses in 2050", 43, 47, 48);
      this.heating_choice_table(element, this.pathway.heating.commercial);
      this.stories_for_choices(element, "Industry in 2050", 40, 41);
      this.stories_for_choices(element, "Commercial transport in 2050", 28, 29, 30);
      element = $('#supply_story');
      element.empty();
      this.stories_for_choices(element, "Thermal power stations in 2050", 0, 2, 3, 9, 12);
      this.stories_for_choices(element, "Wind in 2050", 4, 5, 14);
      this.stories_for_choices(element, "Water: wave, tide and hydro in 2050", 6, 7, 8, 13);
      this.stories_for_choices(element, "Solar in 2050", 10, 11, 15);
      this.stories_for_choices(element, "Bioenergy, farming and waste in 2050", 22, 17, 18, 19, 20, 21);
      element = $('#ghg_story');
      element.empty();
      this.electricity_generation_capacity_table(element);
      element.append("<h4>Greenhouse gases</h4>");
      element.append("<p>2050 emissions will be " + this.pathway.ghg.percent_reduction_from_1990 + "% below 1990 levels.</p>");
      this.stories_for_choices(element, null, 50);
      element.append("<h4>Energy security</h4>");
      this.stories_for_choices(element, null, 51);
      element.append("<p>If there are five cold, almost windless, winter days, then up to " + (Math.round(this.pathway.electricity.peaking)) + " GW of backup generation capacity will be required to ensure that electricity is always available.</p>");
      return this.stories_for_choices(element, null, 22, 15);
    };

    Story.prototype.stories_for_choices = function() {
      var choice, element, row, rows, text, title, _i, _len;
      element = arguments[0], title = arguments[1], rows = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (title != null) {
        element.append("<h4>" + title + "</h4>");
      }
      text = [];
      for (_i = 0, _len = rows.length; _i < _len; _i++) {
        row = rows[_i];
        choice = choices[row] - 1;
        if (choice % 1 === 0.0) {
          text.push(window.twentyfifty.longDescriptions[row][choice]);
        } else {
          text.push("Between " + window.twentyfifty.longDescriptions[row][Math.floor(choice)] + " and " + window.twentyfifty.longDescriptions[row][Math.ceil(choice)]);
        }
      }
      return element.append("<p>" + (text.join(". ")) + ".</p>");
    };

    Story.prototype.heating_choice_table = function(element, heat) {
      var html, name, value, values, _i, _len;
      html = [];
      html.push("<table class='heating_choice'>");
      html.push("<tr><th>Type of heater</th><th class='target'>2050 proportion of heating</th></tr>");
      values = [];
      for (name in heat) {
        if (!__hasProp.call(heat, name)) continue;
        value = heat[name];
        values.push({
          name: name,
          value: value
        });
      }
      values.sort(function(a, b) {
        return a.value - b.value;
      });
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        if (value.value > 0.01) {
          html.push("<tr><td>" + value.name + "</td><td class='target'>" + (Math.round(value.value * 100)) + "%</td></tr>");
        }
      }
      html.push("</table>");
      return element.append(html.join(''));
    };

    Story.prototype.electricity_generation_capacity_table = function(element) {
      var data, html, name, value, values, _i, _len, _ref;
      html = [];
      html.push("<table class='heating_choice'>");
      html.push("<tr><th>GW Capacity</th><th class='target'>2010</th><th class='target'>2050</th></tr>");
      values = [];
      _ref = this.pathway.electricity.capacity;
      for (name in _ref) {
        if (!__hasProp.call(_ref, name)) continue;
        data = _ref[name];
        values.push({
          name: name,
          d2010: data[0],
          d2050: data[8]
        });
      }
      values.sort(function(a, b) {
        return a.d2050 - b.d2050;
      });
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        if ((value.d2010 + value.d2050) !== 0.0) {
          html.push("<tr><td>" + value.name + "</td><td class='target'>" + (Math.round(value.d2010)) + "</td><td class='target'>" + (Math.round(value.d2050)) + "</td></tr>");
        }
      }
      html.push("</table>");
      return element.append(html.join(''));
    };

    return Story;

  })();

  window.twentyfifty.views['story'] = new Story;

}).call(this);
(function() {
  var FilledBoxChart, SimpleSankeyDisplay, VectorChart,
    __hasProp = {}.hasOwnProperty,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  FilledBoxChart = function(r, px, py, h, w, maximum_value, square_size, titles) {
    var box, boxes, cols, gx, gy, i, inverse_x, label, labels, path, row_size, rows, setValues, title, x, y, _i, _j, _k, _len, _x, _x_end, _x_origin, _y;
    rows = cols = Math.ceil(Math.sqrt(maximum_value / square_size));
    row_size = cols * square_size;
    x = d3.scale.linear().domain([0, row_size]).range([px, px + w]);
    inverse_x = d3.scale.linear().domain([0, row_size]).range([px + w, px]);
    y = d3.scale.linear().domain([0, maximum_value]).range([h + py, py]);
    _x = function(value) {
      if (Math.floor(value / row_size) % 2 === 0) {
        return x(value % row_size);
      } else {
        return inverse_x(value % row_size);
      }
    };
    _y = function(value) {
      return y(Math.floor(value / row_size) * row_size);
    };
    _x_origin = function(value) {
      if (Math.floor(value / row_size) % 2 === 0) {
        return x(0);
      } else {
        return inverse_x(0);
      }
    };
    _x_end = function(value) {
      if (Math.floor(value / row_size) % 2 === 0) {
        return x(row_size);
      } else {
        return inverse_x(row_size);
      }
    };
    path = function(start, end) {
      var p;
      if (_y(end) === _y(start)) {
        return p = ["M", _x(start), _y(start), "L", _x(end), _y(end), "L", _x(end), _y(end + row_size), "L", _x(start), _y(end + row_size), "Z"];
      } else if (_y(end) === _y(start + row_size)) {
        return p = ["M", _x(start), _y(start), "L", _x_end(start), _y(start), "L", _x_end(start), _y(end + row_size), "L", _x(end), _y(end + row_size), "L", _x(end), _y(end), "L", _x(start), _y(end), "Z"];
      } else if ((Math.floor(start / row_size) % 2) !== (Math.floor(end / row_size) % 2)) {
        return p = ["M", _x(start), _y(start), "L", _x_end(start), _y(start), "L", _x_end(start), _y(end + row_size), "L", _x(end), _y(end + row_size), "L", _x(end), _y(end), "L", _x_end(end), _y(end), "L", _x_end(end), _y(start + row_size), "L", _x(start), _y(start + row_size), "L", _x(start), _y(start), "Z"];
      } else {
        return p = ["M", _x(start), _y(start), "L", _x_end(start), _y(start), "L", _x_end(start), _y(end), "L", _x(end), _y(end), "L", _x(end), _y(end + row_size), "L", _x_origin(end), _y(end + row_size), "L", _x_origin(end), _y(start + row_size), "L", _x(start), _y(start + row_size), "L", _x(start), _y(start), "Z"];
      }
    };
    for (gy = _i = 0; row_size > 0 ? _i <= maximum_value : _i >= maximum_value; gy = _i += row_size) {
      r.path(["M", x(0), y(gy), "L", x(row_size), y(gy)]).attr({
        stroke: '#ccc'
      });
      for (gx = _j = 0; square_size > 0 ? _j <= row_size : _j >= row_size; gx = _j += square_size) {
        r.path(["M", x(gx), y(0), "L", x(gx), y(maximum_value)]).attr({
          stroke: '#ccc'
        });
      }
    }
    boxes = {};
    labels = {};
    label = function(name, start, value) {
      var l;
      l = r.text(_x(start + value / 2), _y(start + value / 2), name);
      l.hide();
      return l;
    };
    box = function(name, start, value, color) {
      var b;
      if (color == null) {
        color = "#0f0";
      }
      b = r.path(path(start, start + value)).attr({
        'stroke': '#000',
        fill: color,
        'fill-opacity': 0.5,
        'stroke-width': '1'
      });
      return b.hover(function() {
        labels[name].show();
        return this.attr({
          'fill-opacity': 0.75
        });
      }, function() {
        labels[name].hide();
        return this.attr({
          'fill-opacity': 0.5
        });
      });
    };
    for (i = _k = 0, _len = titles.length; _k < _len; i = ++_k) {
      title = titles[i];
      boxes[title] = box(title, 0, 0, "#" + i + i + i);
      labels[title] = label(title, 0, 0);
    }
    setValues = function(values) {
      var name, sum, value, _results;
      sum = 0;
      _results = [];
      for (name in values) {
        if (!__hasProp.call(values, name)) continue;
        value = values[name];
        boxes[name].attr({
          path: path(sum, sum + value)
        });
        labels[name].attr({
          x: (_x(sum) + _x(sum + value)) / 2,
          y: (_y(sum) + _y(sum + value)) / 2
        });
        _results.push(sum += value);
      }
      return _results;
    };
    return {
      box: box,
      setValues: setValues
    };
  };

  VectorChart = function(r, px, py, h, w, maximum_value, square_size, titles) {
    var box, boxes, cols, gx, gy, i, label, labels, row_size, rows, setValues, spacing, title, x, y, _i, _j, _k, _len;
    rows = cols = Math.ceil(Math.sqrt(maximum_value / square_size));
    row_size = cols * square_size;
    spacing = row_size * 0.1;
    x = d3.scale.linear().domain([0, row_size]).range([px, px + w]);
    y = d3.scale.linear().domain([0, maximum_value]).range([h + py, py]);
    for (gy = _i = 0; row_size > 0 ? _i <= maximum_value : _i >= maximum_value; gy = _i += row_size) {
      r.path(["M", x(0), y(gy), "L", x(row_size), y(gy)]).attr({
        stroke: '#ccc'
      });
      for (gx = _j = 0; square_size > 0 ? _j <= row_size : _j >= row_size; gx = _j += square_size) {
        r.path(["M", x(gx), y(0), "L", x(gx), y(maximum_value)]).attr({
          stroke: '#ccc'
        });
      }
    }
    boxes = {};
    labels = {};
    label = function(name, start, value) {
      var l;
      l = r.text(x(row_size / 2), y(start + value / 2), name);
      l.hide();
      return l;
    };
    box = function(name, start, value, color) {
      var b;
      if (color == null) {
        color = "#0f0";
      }
      if (name === "Oil") {
        b = r.path(["M", x(0), y(start + value / 2), "L", x(row_size), y(start + value / 2)]).attr({
          "stroke": '#F00',
          'stroke-width': y(start) - y(start + value)
        });
      } else {
        b = r.rect(x(0), y(start), x(row_size) - x(0), y(start + value) - y(start)).attr({
          'stroke': '#000',
          fill: color,
          'fill-opacity': 0.5,
          'stroke-width': '1'
        });
      }
      return b.hover(function() {
        labels[name].show();
        return this.attr({
          'fill-opacity': 0.75
        });
      }, function() {
        labels[name].hide();
        return this.attr({
          'fill-opacity': 0.5
        });
      });
    };
    for (i = _k = 0, _len = titles.length; _k < _len; i = ++_k) {
      title = titles[i];
      boxes[title] = box(title, 0, 0, "#" + i + i + i);
      labels[title] = label(title, 0, 0);
    }
    setValues = function(values) {
      var name, sum, value, _results;
      sum = 0;
      _results = [];
      for (name in values) {
        if (!__hasProp.call(values, name)) continue;
        value = values[name];
        boxes[name].attr({
          y: y(sum + value),
          height: y(sum) - y(sum + value)
        });
        labels[name].attr({
          x: x(sum + (value / 2)),
          y: y(sum + value / 2)
        });
        if (value > 0) {
          _results.push(sum += value + spacing);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    return {
      box: box,
      setValues: setValues
    };
  };

  SimpleSankeyDisplay = (function() {
    var demand_titles, supply_titles, vector_titles;

    supply_titles = ["Nuclear fission", "Solar", "Wind", "Tidal", "Wave", "Geothermal", "Hydro", "Electricity oversupply (imports)", "Environmental heat", "Bioenergy", "Coal", "Oil", "Natural gas"];

    demand_titles = ['Industry', 'Transport', 'Heating and cooling', 'Lighting & appliances'];

    vector_titles = ["Electricity", "Gas or biogas", "Coal or biomass", "Oil or biofuel", "Hydrogen", "Heat", "Overgeneration or exports", "Losses"];

    function SimpleSankeyDisplay() {
      this.documentReady = __bind(this.documentReady, this);
    }

    SimpleSankeyDisplay.prototype.documentReady = function() {
      var width;
      if (this.drawn != null) {
        return false;
      }
      this.drawn = true;
      this.raphael = new Raphael('simplesankey');
      width = $('#simplesankey').width();
      this.supply = new FilledBoxChart(this.raphael, 30, 10, 300, 300, 3500, 10, supply_titles);
      this.demand = new FilledBoxChart(this.raphael, 635, 10, 300, 300, 3500, 10, demand_titles);
      this.vectors = new VectorChart(this.raphael, 335, 10, 300, 300, 3500, 10, supply_titles);
      this.raphael.path(["M", 332, 10, "L", 332, 310]).attr({
        'stroke-width': '5'
      });
      return this.raphael.path(["M", 635, 10, "L", 635, 310]).attr({
        'stroke-width': '5'
      });
    };

    SimpleSankeyDisplay.prototype.updateResults = function(pathway) {
      var new_values, title, _i, _j, _len, _len1;
      new_values = {};
      for (_i = 0, _len = supply_titles.length; _i < _len; _i++) {
        title = supply_titles[_i];
        new_values[title] = pathway.primary_energy_supply[title][8];
      }
      this.supply.setValues(new_values);
      this.vectors.setValues(new_values);
      new_values = {};
      for (_j = 0, _len1 = demand_titles.length; _j < _len1; _j++) {
        title = demand_titles[_j];
        new_values[title] = pathway.final_energy_demand[title][8];
      }
      return this.demand.setValues(new_values);
    };

    return SimpleSankeyDisplay;

  })();

  window.twentyfifty.SimpleSankeyDisplay = SimpleSankeyDisplay;

}).call(this);
(function() {
  var Share, headers, loadFromExcel, shareHTML;

  headers = "<script type=\"text/javascript\">var switchTo5x=true;</script>\n<script type=\"text/javascript\" src=\"http://w.sharethis.com/button/buttons.js\"></script>\n<script type=\"text/javascript\">stLight.options({publisher: \"90b930ce-8b5b-4777-9571-dba374f079a7\", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>";

  shareHTML = "<div id='share'>\n   <div id='url'>\n     <h1>Sharing this scenario with others</h1>\n     <p>\n       To share this scenario, just send someone the url, or click this share button:\n\n       <span class='st_sharethis_large' displayText='ShareThis'></span>\n       <span class='st_facebook_large' displayText='Facebook'></span>\n       <span class='st_twitter_large' displayText='Tweet'></span>\n       <span class='st_linkedin_large' displayText='LinkedIn'></span>\n       <span class='st_googleplus_large' displayText='Google +'></span>\n       <span class='st_pinterest_large' displayText='Pinterest'></span>\n       <span class='st_email_large' displayText='Email'></span>\n       <!--span class='st_plusone_large' displayText='Google +1'></span>\n       <span class='st_fblike_large' displayText='Facebook Like'></span-->\n\n       <!-- AddThis Button BEGIN\n       <a class=\"addthis_button\" href=\"http://www.addthis.com/bookmark.php?v=250&amp;username=tomcounsell\"><img src=\"http://s7.addthis.com/static/btn/v2/lg-share-en.gif\" width=\"125\" height=\"16\" alt=\"Bookmark and Share\" style=\"border:0\"/></a>\n       <script type=\"text/javascript\">var addthis_config = {\"data_track_clickback\":true};</script>\n       <script type=\"text/javascript\" src=\"http://s7.addthis.com/js/250/addthis_widget.js#username=tomcounsell\"></script>\n       <!-- AddThis Button END-->\n     </p>\n     <!--p>* On modern browsers, this url is the same as the one you will see in the address bar as you use the IESS 2047 tool. On older browsers, such as Internet Explorer 6 and 7, it will not be.</p>\n   </div>\n   <div id='excel'>\n     <h1>Sharing this scenario with the excel version of the India Energy Security Scenarios 2047</h1>\n     <p>\n       You may want to explore your scenario in more detail, taking a look at all the assumptions behind our modelling, by downloading\n       <a href=\"http://planningcommission.nic.in/sectors/index.php?sectors=energy\">the underlying excel spreadsheet.</a>\n     </p>\n     <p>\n       If you do, then you can recreate the scenario you have chosen in this tool by copying the numbers from the box below and pasting them in cells E5 to E57 on the 'Control' sheet of the workbook. You can also copy a pathway from that range in the excel model, paste it in the box below and click the 'Go to this scenario' button at the bottom of the page.\n       <form>\n         <textarea></textarea>\n         <input onclick=\"twentyfifty.loadFromExcel();\" type=\"button\" value=\"Go to this scenario\" />\n       </form>\n     </p-->\n   </div>\n </div>";

  Share = (function() {
    function Share() {
      var stLight, switchTo5x;
      this.ready = false;
      switchTo5x = true;
      $.getScript("http://w.sharethis.com/button/buttons.js", function() {});
      stLight = {
        options: function() {
          return false;
        }
      };
      stLight.options({
        publisher: "90b930ce-8b5b-4777-9571-dba374f079a7",
        doNotHash: false,
        doNotCopy: false,
        hashAddressBar: false
      });
    }

    Share.prototype.setup = function() {
      if (this.ready) {
        return false;
      }
      this.ready = true;
      return $('#results').append(shareHTML);
    };

    Share.prototype.teardown = function() {
      $('#results').empty();
      return this.ready = false;
    };

    Share.prototype.updateResults = function(pathway) {
      var url;
      this.pathway = pathway;
      if (!this.ready) {
        this.setup();
      }
      return url = "http://" + window.location.host + (twentyfifty.url({
        action: 'primary_energy_chart'
      }));
    };

    return Share;

  })();

  loadFromExcel = function() {
    var pasted_choices;
    pasted_choices = $('#excel textarea').val().split('');
    twentyfifty.setChoices(pasted_choices);
    twentyfifty.switchView('primary_energy_chart');
    return false;
  };

  window.twentyfifty.loadFromExcel = loadFromExcel;

  window.twentyfifty.views['share'] = new Share;

}).call(this);
(function() {
  var Emissions;

  Emissions = (function() {
    var titles, titles_emissions, titles_percapita;

    titles_emissions = ['Generation', 'Lighting & Appliances', 'Industry', 'Transport', 'Cooking', 'Agriculture', 'Telecom', 'Bio Energy'];

    titles_percapita = [];

    titles = titles_percapita;

    function Emissions() {}

    Emissions.prototype.setup = function() {
      var target;
      target = $('#results');
      target.append("<div id='total_emissions_chart' class='chart'></div>");
      target.append("<div id='total_percapita_emissions_chart' class='chart'></div>");
      target.append("<div id='emissions_chart_gdp' class='chart'></div>");
      this.total_emissions_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'total_emissions_chart'
        },
        title: {
          text: 'Emissions'
        },
        subtitle: {
          text: "MT CO2 per year"
        },
        yAxis: {
          title: null,
          min: -1000,
          max: 15000
        },
        series: [],
        legend: {
          enabled: true,
          backgroundColor: 'rgba(0,0,0,0.1)',
          floating: true,
          align: 'center',
          verticalAlign: 'middle',
          itemStyle: {
            font: '8pt sans-serif'
          },
          itemDistance: '5pt',
          layout: 'vertical',
          left: 20,
          labelFormatter: function() {
            var numWordsPerLine, str, word, words;
            words = this.name.split(/[\s]+/).splice(0, 6);
            numWordsPerLine = 4;
            str = [];
            for (word in words) {
              if (word > 0 && word % numWordsPerLine === 0) {
                str.push("<br>");
              }
              str.push(words[word]);
            }
            return str.join(" ");
          }
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 0, '.')) + " MtCO2e ";
          }
        }
      });
      this.total_percapita_emissions_chart = new Highcharts.Chart({
        chart: {
          renderTo: 'total_percapita_emissions_chart'
        },
        title: {
          text: 'Per Capita Emissions'
        },
        subtitle: {
          text: "TCO2/person per year"
        },
        yAxis: {
          title: null,
          min: -2.5,
          max: 18
        },
        series: [],
        legend: {
          enabled: false
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 1, '.')) + " tCO2/capita ";
          }
        }
      });
      return this.emissions_chart_gdp = new Highcharts.Chart({
        chart: {
          renderTo: 'emissions_chart_gdp'
        },
        title: {
          text: 'Tonnes Emissions per INR crore GDP'
        },
        subtitle: {
          text: "TCO2/INR Crore per year"
        },
        yAxis: {
          title: null,
          min: -250,
          max: 500
        },
        series: [],
        legend: {
          enabled: false
        },
        tooltip: {
          formatter: function() {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + (Highcharts.numberFormat(this.y, 2, '.')) + " tCO2/INR crore ";
          }
        }
      });
    };

    Emissions.prototype.teardown = function() {
      $('#results').empty();
      this.emissions_chart = null;
      this.emissions_chart_gdp = null;
      return this.total_percapita_emissions_chart = null;
    };

    Emissions.prototype.updateResults = function(pathway) {
      var GDP, dat, data, do_nothing, i, j, name, title, your_pathway, _i, _j, _k, _l, _len, _len1, _len2, _len3;
      this.pathway = pathway;
      if (!((this.emissions_chart_gdp != null) && (this.total_emissions_chart != null) && (this.total_percapita_emissions_chart != null))) {
        this.setup();
      }
      your_pathway = [];
      do_nothing = [];
      for (_i = 0, _len = titles_emissions.length; _i < _len; _i++) {
        title = titles_emissions[_i];
        if (this.pathway['emissions_do_nothing'][title][0] < 0) {
          your_pathway.push(-(this.pathway['emissions_do_nothing'][title][2] / this.pathway['emissions_do_nothing'][title][0]));
          do_nothing.push(-(this.pathway['emissions_do_nothing'][title][1] / this.pathway['emissions_do_nothing'][title][0]));
        } else {
          your_pathway.push(this.pathway['emissions_do_nothing'][title][2] / this.pathway['emissions_do_nothing'][title][0]);
          do_nothing.push(this.pathway['emissions_do_nothing'][title][1] / this.pathway['emissions_do_nothing'][title][0]);
        }
      }
      i = 0;
      for (_j = 0, _len1 = titles.length; _j < _len1; _j++) {
        name = titles[_j];
        data = this.pathway['emissions_absolute'][name];
        if (this.total_emissions_chart.series[i] != null) {
          this.total_emissions_chart.series[i].setData(data, false);
        } else {
          this.total_emissions_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      data = this.pathway['emissions_absolute']['Total'];
      if (this.total_emissions_chart.series[i] != null) {
        this.total_emissions_chart.series[i].setData(data, false);
      } else {
        this.total_emissions_chart.addSeries({
          type: 'line',
          name: 'Total emissions in chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
      }
      i = 0;
      for (_k = 0, _len2 = titles_percapita.length; _k < _len2; _k++) {
        name = titles_percapita[_k];
        data = this.pathway['emissions_percapita'][name];
        if (this.total_percapita_emissions_chart.series[i] != null) {
          this.total_percapita_emissions_chart.series[i].setData(data, false);
        } else {
          this.total_percapita_emissions_chart.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      data = this.pathway['emissions_percapita']['Total'];
      if (this.total_percapita_emissions_chart.series[i] != null) {
        this.total_percapita_emissions_chart.series[i].setData(data, false);
      } else {
        this.total_percapita_emissions_chart.addSeries({
          type: 'line',
          name: 'Percapita emissions in chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
        this.total_percapita_emissions_chart.addSeries({
          type: 'scatter',
          name: "China 2010 emissions",
          data: [6.194],
          color: '#ff0000'
        });
        this.total_percapita_emissions_chart.addSeries({
          type: 'scatter',
          name: "US 2010 emissions",
          data: [17.564],
          color: 'Green'
        });
        this.total_percapita_emissions_chart.addSeries({
          type: 'scatter',
          name: "UK 2010 emissions",
          data: [7.925],
          color: 'Blue'
        });
      }
      GDP = [4170367, 6416627, 9872775, 14506346, 20345901, 28536178, 38187844, 51103949];
      for (_l = 0, _len3 = titles.length; _l < _len3; _l++) {
        name = titles[_l];
        dat = this.pathway['emissions_absolute'][name];
        data = [];
        j = 0;
        while (j < GDP.length) {
          data.push(1000000 * dat[j] / GDP[j]);
          j++;
        }
        if (this.emissions_chart_gdp.series[i] != null) {
          this.emissions_chart_gdp.series[i].setData(data, false);
        } else {
          this.emissions_chart_gdp.addSeries({
            name: name,
            data: data
          }, false);
        }
        i++;
      }
      dat = this.pathway['emissions_absolute']['Total'];
      data = [];
      j = 0;
      while (j < GDP.length) {
        data.push(1000000 * dat[j] / GDP[j]);
        j++;
      }
      if (this.emissions_chart_gdp.series[i] != null) {
        this.emissions_chart_gdp.series[i].setData(data, false);
      } else {
        this.emissions_chart_gdp.addSeries({
          type: 'line',
          name: 'Emissions intensity in chosen scenario',
          data: data,
          lineColor: '#000',
          color: '#000',
          lineWidth: 2,
          dashStyle: 'Dot',
          shadow: false
        }, false);
      }
      this.emissions_chart_gdp.redraw();
      this.total_emissions_chart.redraw();
      return this.total_percapita_emissions_chart.redraw();
    };

    return Emissions;

  })();

  window.twentyfifty.views['emissions'] = new Emissions;

}).call(this);
// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//

// First the support libs


//  we aren't using this: require jquery_ujs












// Now the common methods




// Now the individual views















;
