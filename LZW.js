# LZW
var arraySymbols = [""];
/**
  Returns list of codes: a comma separated string of the LZW compression decimal numbers (the last code must be 0)
  symbols: sorted string of valid data symbols for the text. The index will be the code of the intial dictionary
  stop: The last symbol of the text
  text: Uncompressed text: text is made of combinations of symbols. The stop symbol appears once and at the end of the text
*/
function encode(symbols, stop, text) {

	var textEncode = "";

	for (var i = 1; i < symbols.length; i++) {
		arraySymbols[i] = symbols.charAt(i);
	}
	var j = 0;
	for (var i = 0; i < text.length; i++) {
		var currentStr = text.charAt(j);
		if (currentStr == stop) {
			textEncode += "0";
			break;
		}
		while(find(currentStr, text.charAt(j+1))){
			currentStr = currentStr + text.charAt(j+1);
			j++;
		}
		
		arraySymbols.push(currentStr + text.charAt(j+1)); // mas rapido xq no calculas el length cada vez 
		textEncode += arraySymbols.indexOf(currentStr) + ",";

		j++;
	}

	console.log(textEncode);

}

function find(currentStr, nextChar){

	var totalStr = currentStr+nextChar;

	if(arraySymbols.indexOf(totalStr) == -1){
		return false;
	}

	return true;

}

/**
  Returns a uncompressed text given a sequence of compressed codes
  symbols: Valid data symbols
  code: string of comma separated codes. The last code always will be 0
*/
function decode(symbols, code) {

	var arrayCode = code.split(',');

	var textUncompressed = "";

	for (var i = 1; i < symbols.length; i++) {
		arraySymbols[i] = symbols.charAt(i);
	}

	for (var i = 0; i < arrayCode.length-1; i++) {
		
		var currentChar = arraySymbols[arrayCode[i]];

		var nextChar = arraySymbols[arrayCode[i+1]].charAt(0);
		textUncompressed += currentChar;
		arraySymbols[arraySymbols.length] = currentChar+nextChar;
	}	

	console.log(textUncompressed+'#');

}
