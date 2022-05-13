class BG_eventMouse {
	constructor(bg) {
		this.g_bg = bg;
		this.g_canvasDoc = bg.g_canvasDoc;
		
		var me = this;
		
		/* ------------------------------- */
		/* ------------------------------- */
		this.g_canvasDoc.addEventListener("mousedown",function(event){
			me.g_bg.mouseDownX = (-me.g_bg.decX*me.g_bg.zoomLevel+event.clientX);
			me.g_bg.mouseDownY = (-me.g_bg.decY*me.g_bg.zoomLevel+event.clientY);
			me.g_bg.bg_g_stat.setMouseDown(1);
		});
		this.g_canvasDoc.addEventListener("mouseup",function(event){
			//me.g_bg.decX = (-me.g_bg.mouseDownX+event.clientX)/me.g_bg.zoomLevel;
			//me.g_bg.decY = (-me.g_bg.mouseDownY+event.clientY)/me.g_bg.zoomLevel;
			me.g_bg.mouseDownX = -1;
			me.g_bg.bg_g_stat.setMouseDown(0);
		});
		this.g_canvasDoc.addEventListener("mouseout",function(event){
			//me.g_bg.decX = (-me.g_bg.mouseDownX+event.clientX)/me.g_bg.zoomLevel;
			//me.g_bg.decY = (-me.g_bg.mouseDownY+event.clientY)/me.g_bg.zoomLevel;
			me.g_bg.mouseDownX = -1;
			me.g_bg.bg_g_stat.setMouseDown(0);
		});
		this.g_canvasDoc.addEventListener("mouseleave",function(event){
			//me.g_bg.decX = (-me.g_bg.mouseDownX+event.clientX)/me.g_bg.zoomLevel;
			//me.g_bg.decY = (-me.g_bg.mouseDownY+event.clientY)/me.g_bg.zoomLevel;
			me.g_bg.mouseDownX = -1;
			me.g_bg.bg_g_stat.setMouseDown(0);
		});
		this.g_canvasDoc.addEventListener("click",function(event){
			me.g_bg.bg_g_stat.setMouseClick(1);
		});
		this.g_canvasDoc.addEventListener("mousemove",function(event){
			me.g_bg.mouseX = event.clientX;
			me.g_bg.mouseY = event.clientY;
			me.g_bg.bg_g_stat.setMouseXScreen	(event.clientX);
			me.g_bg.bg_g_stat.setMouseYScreen	(event.clientY);
			let decXs = (-me.g_bg.decX+me.g_bg.bg_g_width/2) * (1-me.g_bg.zoomLevel);
			let decYs = (-me.g_bg.decY+me.g_bg.bg_g_height/2) * (1-me.g_bg.zoomLevel);
			me.g_bg.bg_g_stat.setMouseXBoard	((event.clientX-(me.g_bg.decX+decXs))/me.g_bg.zoomLevel);
			me.g_bg.bg_g_stat.setMouseYBoard	((event.clientY-(me.g_bg.decY+decYs))/me.g_bg.zoomLevel);
			if( me.g_bg.bg_g_manualControl == true){
				if( me.g_bg.mouseDownX != -1){
					me.g_bg.decX = (-me.g_bg.mouseDownX+event.clientX)/me.g_bg.zoomLevel;
					me.g_bg.decY = (-me.g_bg.mouseDownY+event.clientY)/me.g_bg.zoomLevel;
				}
			}
		});
		this.g_canvasDoc.addEventListener('touchmove', function(event) {
			event.preventDefault();
			if (event.targetTouches.length == 1) {
				me.g_bg.mouseX = event.changedTouches[0].pageX;
				me.g_bg.mouseY = event.changedTouches[0].pageY;
				if( me.g_bg.mouseDownX != -1){
					me.g_bg.decX = (-me.g_bg.mouseDownX+ event.changedTouches[0].pageX )/me.g_bg.zoomLevel;
					me.g_bg.decY = (-me.g_bg.mouseDownY+ event.changedTouches[0].pageY )/me.g_bg.zoomLevel;
				}
			}
		}, false);
		this.g_canvasDoc.addEventListener('touchend', function(event) {
			event.preventDefault();
			if (event.targetTouches.length == 1) {
				//console.log("ENDje touc l'ecran"+Math.random());
				me.g_bg.mouseDownX = (-me.g_bg.decX*me.g_bg.zoomLevel+ event.changedTouches[0].pageX );
				me.g_bg.mouseDownY = (-me.g_bg.decY*me.g_bg.zoomLevel+ event.changedTouches[0].pageY );
			}
		}, false);
		this.g_canvasDoc.addEventListener('touchstart', function(event) {
			console.log(event.changedTouches[0]);
			event.preventDefault();
			if (event.targetTouches.length == 1) {
				//console.log("touchStart "+Math.random());
				me.g_bg.mouseDownX = (-me.g_bg.decX*me.g_bg.zoomLevel+ event.changedTouches[0].pageX );
				me.g_bg.mouseDownY = (-me.g_bg.decY*me.g_bg.zoomLevel+ event.changedTouches[0].pageY );
			}
		}, false);

	}
	

}
