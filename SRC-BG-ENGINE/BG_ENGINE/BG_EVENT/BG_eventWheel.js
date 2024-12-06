class BG_eventWheel {
	constructor(bg) {
		this.g_bg = bg;
		this.g_canvasDoc = bg.g_canvasDoc;
		var me = this;
		this.g_canvasDoc.onwheel = function(event){ 
			if( me.g_bg.bg_g_manualControl == true){
				// counter to increment
				// time elasped to zoom on mouse 999 years 
				// BUT ITs WORKKKKKKKKK.

				//on cherche l distance souris avec la position 0,0
				// Ces deux ligens font le focus sur la position souris
				var mXBa = me.g_bg.bg_g_stat.getMouseXBoard();
				var mYBa = me.g_bg.bg_g_stat.getMouseYBoard();

				// ici on gere un zoom progressif classique
				if( event.deltaY > 0 ) {
					//me.g_bg.zoomLevel-= 0.06;
					me.g_bg.zoomLevel = me.g_bg.zoomLevel*0.92; 
				}
				if( event.deltaY < 0 ) {
					//me.g_bg.zoomLevel += 0.06;
					me.g_bg.zoomLevel = me.g_bg.zoomLevel*1.08; 
				}
				if( me.g_bg.zoomLevel< 0 )	me.g_bg.zoomLevel = 0;
				//limit
				if( me.g_bg.zoomLevel > me.g_bg.bg_g_stat.getLimitCameraZoomMin()) me.g_bg.zoomLevel = me.g_bg.bg_g_stat.getLimitCameraZoomMin();
				if( me.g_bg.zoomLevel < me.g_bg.bg_g_stat.getLimitCameraZoomMax()) me.g_bg.zoomLevel = me.g_bg.bg_g_stat.getLimitCameraZoomMax();

				//

				let mX = me.g_bg.mouseX;
				let mY = me.g_bg.mouseY;
				let decXs = (-me.g_bg.decX+me.g_bg.bg_g_width/2) * (1-me.g_bg.zoomLevel);
				let decYs = (-me.g_bg.decY+me.g_bg.bg_g_height/2) * (1-me.g_bg.zoomLevel);
				var mXBb = (mX-(me.g_bg.decX+decXs))/me.g_bg.zoomLevel;
				var mYBb = (mY-(me.g_bg.decY+decYs))/me.g_bg.zoomLevel;
				me.g_bg.decX -= mXBa-mXBb;
				me.g_bg.decY -= mYBa-mYBb;
				//mX = me.g_bg.mouseX;
				//mY = me.g_bg.mouseY;
				decXs = (-me.g_bg.decX+me.g_bg.bg_g_width/2) * (1-me.g_bg.zoomLevel);
				decYs = (-me.g_bg.decY+me.g_bg.bg_g_height/2) * (1-me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseXBoard	((mX-(me.g_bg.decX+decXs))/me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseYBoard	((mY-(me.g_bg.decY+decYs))/me.g_bg.zoomLevel);
				
				/* historique tant difficile a atteindre
				//
				// recalcule des positions souris
				// on s'appuie que sur la classe principale
				let mX = me.g_bg.mouseX;
				let mY = me.g_bg.mouseY;
				let decXs = (-me.g_bg.decX+me.g_bg.bg_g_width/2) * (1-me.g_bg.zoomLevel);
				let decYs = (-me.g_bg.decY+me.g_bg.bg_g_height/2) * (1-me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseXBoard	((mX-(me.g_bg.decX+decXs))/me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseYBoard	((mY-(me.g_bg.decY+decYs))/me.g_bg.zoomLevel);

				// LE FOCUS SUR LA SOURIS
				var mXBb = me.g_bg.bg_g_stat.getMouseXBoard();
				var mYBb = me.g_bg.bg_g_stat.getMouseYBoard();
				me.g_bg.decX -= mXBa-mXBb;
				me.g_bg.decY -= mYBa-mYBb;
				
				// recalcule des positions souris
				// on s'appuie que sur la classe principale
				// CAr on ON BOUGER decX et decY
				mX = me.g_bg.mouseX;
				mY = me.g_bg.mouseY;
				decXs = (-me.g_bg.decX+me.g_bg.bg_g_width/2) * (1-me.g_bg.zoomLevel);
				decYs = (-me.g_bg.decY+me.g_bg.bg_g_height/2) * (1-me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseXBoard	((mX-(me.g_bg.decX+decXs))/me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseYBoard	((mY-(me.g_bg.decY+decYs))/me.g_bg.zoomLevel);
				*/

			}
		};
	}
}
