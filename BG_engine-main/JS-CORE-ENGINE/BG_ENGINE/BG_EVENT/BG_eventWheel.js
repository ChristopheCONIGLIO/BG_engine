class BG_eventWheel {
	constructor(g_canvasDoc) {
		this.g_canvasDoc = g_canvasDoc;

		this.g_canvasDoc.onwheel = function(event){ 
			if( event.deltaY > 0 ) {
				bg_engine.zoomLevel-= 0.06;
			}
			if( event.deltaY < 0 ) {
				bg_engine.zoomLevel += 0.06;
			}
			if( bg_engine.zoomLevel> 6 )bg_engine.zoomLevel = 6;
			if( bg_engine.zoomLevel< 0.4 )bg_engine.zoomLevel = 0.4;	 
			return false; 
		};
	}

}
