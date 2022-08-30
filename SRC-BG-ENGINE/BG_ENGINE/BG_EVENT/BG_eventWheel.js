class BG_eventWheel {
	constructor(bg) {
		this.g_bg = bg;
		this.g_canvasDoc = bg.g_canvasDoc;
		var me = this;
		this.g_canvasDoc.onwheel = function(event){ 
			if( me.g_bg.bg_g_manualControl == true){
				if( event.deltaY > 0 ) {
					//me.g_bg.zoomLevel-= 0.06;
					me.g_bg.zoomLevel = me.g_bg.zoomLevel*0.95; 
				}
				if( event.deltaY < 0 ) {
					//me.g_bg.zoomLevel += 0.06;
					me.g_bg.zoomLevel = me.g_bg.zoomLevel*1.05; 
				}
				
				/*if( me.g_bg.zoomLevel> 6 )me.g_bg.zoomLevel = 6;*/
				if( me.g_bg.zoomLevel< 0 )me.g_bg.zoomLevel = 0	 
			}
		};
	}

}
