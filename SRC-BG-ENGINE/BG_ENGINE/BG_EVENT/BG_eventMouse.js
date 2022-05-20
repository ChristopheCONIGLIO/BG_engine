class BG_eventMouse {
	constructor(bg) {
		this.g_bg = bg;
		this.g_canvasDoc = bg.g_canvasDoc;
		this.dateMouseDown = undefined;
		this.limitClicTime 		= 350; //350ms
		this.limitClicDistance 	= 15; //15 pixels
		this.m1x = 0;
		this.m1y = 0;
		this.m2x = 0;
		this.m2y = 0;
		var me = this;
		/* ------------------------------- */
		/* ------------------------------- */
		this.g_canvasDoc.addEventListener("mousedown",function(event){
			me.g_bg.mouseDownX = (-me.g_bg.decX*me.g_bg.zoomLevel+event.clientX);
			me.g_bg.mouseDownY = (-me.g_bg.decY*me.g_bg.zoomLevel+event.clientY);
			me.m1x = event.clientX;
			me.m1y = event.clientY;
			me.g_bg.bg_g_stat.setMouseDown(1);
			me.dateMouseDown = new Date();
		});
		this.g_canvasDoc.addEventListener("mouseup",function(event){
			me.g_bg.mouseDownX = -1;
			me.g_bg.bg_g_stat.setMouseDown(0);
		});
		this.g_canvasDoc.addEventListener("mouseout",function(event){
			me.g_bg.mouseDownX = -1;
			me.g_bg.bg_g_stat.setMouseDown(0);
		});
		this.g_canvasDoc.addEventListener("mouseleave",function(event){
			me.g_bg.mouseDownX = -1;
			me.g_bg.bg_g_stat.setMouseDown(0);
		});
		this.g_canvasDoc.addEventListener("click",function(event){
			var dis = me.rootSquareDistance(me.m1x,
										 me.m1y,
										 me.m2x,
										 me.m2y);
			if(dis < me.limitClicDistance ){
				if( me.dateMouseDown != undefined){
					if( (new Date() - me.dateMouseDown) < me.limitClicTime ){
						me.g_bg.bg_g_stat.setMouseClick(1);
					}
				}
			}
			
		});
		this.g_canvasDoc.addEventListener("mousemove",function(event){
			let rect = me.g_canvasDoc.getBoundingClientRect();
			let mX = event.pageX-rect.x;
			let mY = event.pageY-rect.y;
			me.g_bg.mouseX = mX;
			me.g_bg.mouseY = mY;
			me.g_bg.bg_g_stat.setMouseXScreen	(mX);
			me.g_bg.bg_g_stat.setMouseYScreen	(mY);
			let decXs = (-me.g_bg.decX+me.g_bg.bg_g_width/2) * (1-me.g_bg.zoomLevel);
			let decYs = (-me.g_bg.decY+me.g_bg.bg_g_height/2) * (1-me.g_bg.zoomLevel);
			me.g_bg.bg_g_stat.setMouseXBoard	((mX-(me.g_bg.decX+decXs))/me.g_bg.zoomLevel);
			me.g_bg.bg_g_stat.setMouseYBoard	((mY-(me.g_bg.decY+decYs))/me.g_bg.zoomLevel);
			me.m2x = event.clientX;
			me.m2y = event.clientY;
			if( me.g_bg.bg_g_manualControl == true){
				if( me.g_bg.mouseDownX != -1){
					me.g_bg.decX = (-me.g_bg.mouseDownX+event.clientX)/me.g_bg.zoomLevel;
					me.g_bg.decY = (-me.g_bg.mouseDownY+event.clientY)/me.g_bg.zoomLevel;
				}
			}
		});
		
	}
	rootSquareDistance($c1Px,$c1Py,$c2Px,$c2Py){
		return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) );
	}
}
