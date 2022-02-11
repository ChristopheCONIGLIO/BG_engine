class BG_eventMouse {
	constructor(g_canvasDoc) {
		this.g_canvasDoc = g_canvasDoc;
		
		/* ------------------------------- */
		/* ------------------------------- */
		this.g_canvasDoc.addEventListener("mousedown",function(event){
			bg_engine.mouseDownX = (-bg_engine.decX*bg_engine.zoomLevel+event.clientX);
			bg_engine.mouseDownY = (-bg_engine.decY*bg_engine.zoomLevel+event.clientY);
		});
		this.g_canvasDoc.addEventListener("mouseup",function(event){
			bg_engine.decX = (-bg_engine.mouseDownX+event.clientX)/bg_engine.zoomLevel;
			bg_engine.decY = (-bg_engine.mouseDownY+event.clientY)/bg_engine.zoomLevel;
			bg_engine.mouseDownX = -1;
		});
		this.g_canvasDoc.addEventListener("click",function(event){
			bg_engine.bg_g_stat.setMouseClick(1);
		});
		this.g_canvasDoc.addEventListener("mousemove",function(event){
			bg_engine.mouseX = event.clientX;
			bg_engine.mouseY = event.clientY;
			bg_engine.bg_g_stat.setMouseXScreen	(event.clientX);
			bg_engine.bg_g_stat.setMouseYScreen	(event.clientY);
			let decXs = (-bg_engine.decX+bg_engine.bg_g_width/2) * (1-bg_engine.zoomLevel);
			let decYs = (-bg_engine.decY+bg_engine.bg_g_height/2) * (1-bg_engine.zoomLevel);
			bg_engine.bg_g_stat.setMouseXBoard	((event.clientX-(bg_engine.decX+decXs))/bg_engine.zoomLevel);
			bg_engine.bg_g_stat.setMouseYBoard	((event.clientY-(bg_engine.decY+decYs))/bg_engine.zoomLevel);
			if( bg_engine.mouseDownX != -1){
				bg_engine.decX = (-bg_engine.mouseDownX+event.clientX)/bg_engine.zoomLevel;
				bg_engine.decY = (-bg_engine.mouseDownY+event.clientY)/bg_engine.zoomLevel;
			}
		});
		this.g_canvasDoc.addEventListener('touchmove', function(event) {
			event.preventDefault();
			if (event.targetTouches.length == 1) {
				bg_engine.mouseX = event.changedTouches[0].pageX;
				bg_engine.mouseY = event.changedTouches[0].pageY;
				if( bg_engine.mouseDownX != -1){
					bg_engine.decX = (-bg_engine.mouseDownX+ event.changedTouches[0].pageX )/bg_engine.zoomLevel;
					bg_engine.decY = (-bg_engine.mouseDownY+ event.changedTouches[0].pageY )/bg_engine.zoomLevel;
				}
			}
		}, false);
		this.g_canvasDoc.addEventListener('touchend', function(event) {
			event.preventDefault();
			if (event.targetTouches.length == 1) {
				console.log("ENDje touc l'ecran"+Math.random());
				bg_engine.mouseDownX = (-bg_engine.decX*bg_engine.zoomLevel+ event.changedTouches[0].pageX );
				bg_engine.mouseDownY = (-bg_engine.decY*bg_engine.zoomLevel+ event.changedTouches[0].pageY );
			}
		}, false);
		this.g_canvasDoc.addEventListener('touchstart', function(event) {
			console.log(event.changedTouches[0]);
			event.preventDefault();
			if (event.targetTouches.length == 1) {
				console.log("touchStart "+Math.random());
				bg_engine.mouseDownX = (-bg_engine.decX*bg_engine.zoomLevel+ event.changedTouches[0].pageX );
				bg_engine.mouseDownY = (-bg_engine.decY*bg_engine.zoomLevel+ event.changedTouches[0].pageY );
			}
		}, false);

	}
	

}
