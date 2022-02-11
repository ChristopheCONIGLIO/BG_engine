class HandleColor{
	//----------------------------------

	constructor() {
	}
	//----------------------------------


	//----------------------------------

	rgb(red, green, blue){
		var decColor =0x1000000+ Math.round(blue) + 0x100 * Math.round(green) + 0x10000 * Math.round(red) ;
		return '#'+decColor.toString(16).substr(1);
	}
 	//----------------------------------
}