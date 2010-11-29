(function($) {
	
	$.removeAccents = function ( text, options ) {
		var config = $.extend({
			"replaceRules" : {
				'a' : /à|á|ã|â|ä/g,
				'e' : /è|é|ê|ẽ|ë/g,
				'i' : /ì|í|î|ï/g,
				'o' : /ò|ó|ô|õ|ö/g,
				'u' : /ù|ú|ũ|û|ü/g,
				'c' : /ç/g,
				'n' : /ñ/g,
				'A' : /À|Á|Ã|Â|Ä/g,
				'E' : /È|É|Ê|Ẽ|Ë/g,
				'I' : /Ì|Í|Î|Ï/g,
				'O' : /Ò|Ó|Ô|Õ|Ö/g,
				'U' : /Ù|Ú|Ũ|Û|Ü/g,
				'C' : /Ç/g,
				'N' : /Ñ/g
			}
		}, options || {} );
		
		$.each( config.replaceRules, function ( replace, search ) {
			text = text.replace( search, replace );
		});
		
		return text;
	};
	
	$.slug = function ( text, options ) {
		
		var config = $.extend({
			"removeAccents" : false,
			"replaceRules" : {
				'a' : /à|á|ã|â|ä|ª/i,
				'e' : /è|é|ê|ẽ|ë/i,
				'i' : /ì|í|î|ï/i,
				'o' : /ò|ó|ô|õ|ø|°|º|ö/i,
				'u' : /ù|ú|ũ|û|ü/i,
				'c' : /ç/i,
				'n' : /ñ/i,
				'ae': /æ/i
			}
		}, options || {});
		
		text = $.trim(text);
		
		if ( config.removeAccents === true ) {
			text = $.removeAccents( text, config.replaceRules );
		}
		
		return text.replace(/\s|\t/g,"-").toLowerCase();
	};	
	
	$.formatTitle = function ( title , options ) {

		var config = $.extend({
			"ignore" : [] // get array
		}, options || {} );

		config.ignore = ( config.ignore instanceof Array ) ? config.ignore : [];

		title = $.trim(title);

		/* Substitui espaços e tabs por pipe e quebra palavra em array */
		var words = title.replace(/(\s|\t)+/g,"|").split("|");

		var newWords = [];

		$.each( words, function(index, word){
			word = word.toLowerCase();

			if ( $.isArray(config.ignore) ) {
				if( $.inArray( word, config.ignore ) === -1 ) {
					newWords.push( $.capitalize( word ) );
				} else {
					newWords.push( word );
				}
			} else {
				newWords.push( $.capitalize( word ) );
			}
		
		});
		
		 var finalTitle = newWords.join(" ");
		 finalTitle = $.ucFirst(finalTitle);
		 return finalTitle;
	};
	
	$.limitText = function ( text, options ) {
		var config = $.extend({
			"concat" : " ...",
			"limit" : 100
		}, options || {});

		config.limit = ( typeof(config.limit) == 'number' ) ? config.limit : 100;
		
		var limitedText = text;

		if ( limitedText.length > config.limit ) {
			limitedText = text.substr( 0, config.limit );
			limitedText += config.concat;
		}
			
	 	return limitedText;
	};
	
	$.limitWords = function ( text, options ) {
		var config = $.extend({
			"words" : 10
		}, options || {});
		
		config.words = ( typeof(config.words) == 'number' ) ? config.words : 10;
		
		text = $.trim(text);
		
		var words = text.replace(/(\s|\t)+/g,"|").split("|");

		var newText = text;
		
		if( words.length > config.words ) {
			newText = [];
			
			for ( i = 0; i < config.words; i++ ) {
				newText.push(words[i]);
			}
			
			newText = newText.join(" ");
		}
		
		return newText;
	};
	
	$.capitalize = function ( text ) {
    	return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
  	};
  
	$.ucFirst = function ( text ) {
		return text.charAt(0).toUpperCase() + text.substring(1);
	};
	
})(jQuery);