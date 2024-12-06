class BG_eventTouch {
	constructor(bg) {
		this.g_bg = bg;
		this.g_canvasDoc = bg.g_canvasDoc;

		this.g_touchInitialised = false;
		this.g_touchDistanceSecondPoint;
		this.g_touchInitialZoom;

		this.dateMouseDown = undefined;
		this.limitClicTime 		= 350; //350ms
		this.limitClicDistance 	= 15; //15 pixels
		this.m1x = 0;
		this.m1y = 0;
		this.disactivatedClic = 0;

		this.touch1X = -1;
		this.touch1Y = -1;
		this.touch2X = -1;
		this.touch2Y = -1;

		var me = this;
		
        /* ------------------------------
           ------------------------------
           ------------------------------ */

		this.g_canvasDoc.addEventListener('touchmove', function(event) {
			event.preventDefault();
			if (event.targetTouches.length == 1) {
				let rect = me.g_canvasDoc.getBoundingClientRect();
				let mX;
				let mY;
				if( rect.x == undefined){
					mX = event.changedTouches[0].pageX-rect.left;
					mY = event.changedTouches[0].pageY-rect.top;
				}
				else{
					mX = event.changedTouches[0].pageX-rect.x;
					mY = event.changedTouches[0].pageY-rect.y;
				}
				me.g_bg.mouseX = mX;
				me.g_bg.mouseY = mY;
				me.g_bg.bg_g_stat.setMouseXScreen	(mX);
				me.g_bg.bg_g_stat.setMouseYScreen	(mY);
				let decXs = (-me.g_bg.decX+me.g_bg.bg_g_width/2) * (1-me.g_bg.zoomLevel);
				let decYs = (-me.g_bg.decY+me.g_bg.bg_g_height/2) * (1-me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseXBoard	((mX-(me.g_bg.decX+decXs))/me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseYBoard	((mY-(me.g_bg.decY+decYs))/me.g_bg.zoomLevel);
				if( me.g_bg.bg_g_manualControl == true){
					if( me.g_bg.mouseDownX != -1){//init ?
						me.g_bg.decX = (-me.g_bg.mouseDownX+ event.changedTouches[0].pageX )/me.g_bg.zoomLevel;
						me.g_bg.decY = (-me.g_bg.mouseDownY+ event.changedTouches[0].pageY )/me.g_bg.zoomLevel;
					}
				}
			}

            me.updatePositionTouch(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
            if( event.changedTouches[1] != undefined ){
                me.updatePositionTouch(event.changedTouches[1].pageX,event.changedTouches[1].pageY);
            }

			if (me.g_bg.bg_g_manualControl == true && event.targetTouches.length == 2 && me.g_touchInitialised == true) {
				var currentDistance = me.rootSquareDistance(
                    me.touch1X,
                    me.touch1Y,
                    me.touch2X,
                    me.touch2Y
                );

				//exeperimental
				var mXBa = me.g_bg.bg_g_stat.convertPointScreenToBoardX((me.touch1X+me.touch2X)/2);
				var mYBa = me.g_bg.bg_g_stat.convertPointScreenToBoardY((me.touch1Y+me.touch2Y)/2);
                me.g_bg.zoomLevel = me.g_touchInitialZoom*currentDistance/me.g_touchDistanceSecondPoint;
				if( me.g_bg.zoomLevel > me.g_bg.bg_g_stat.getLimitCameraZoomMin()) me.g_bg.zoomLevel = me.g_bg.bg_g_stat.getLimitCameraZoomMin();
				if( me.g_bg.zoomLevel < me.g_bg.bg_g_stat.getLimitCameraZoomMax()) me.g_bg.zoomLevel = me.g_bg.bg_g_stat.getLimitCameraZoomMax();
				let mX = (me.touch1X+me.touch2X)/2;
				let mY = (me.touch1Y+me.touch2Y)/2;
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
				
			
			}

		}, false);
		
		/* ------------------------------
           ------------------------------
           ------------------------------ */

		this.g_canvasDoc.addEventListener('touchend', function(event) {
			
			
			
			//
			//
			//
			event.preventDefault();
			
			//
			//
			//
			me.g_bg.bg_g_stat.setMouseDown(0); // a revoir 

			//
			//
			//
			let disTouch1;
			if( me.touch1X == -1 ){
				disTouch1 = 100000;
			}
			else{
				disTouch1 = me.rootSquareDistance(
					event.changedTouches[0].pageX,
					event.changedTouches[0].pageY,
					me.touch1X,
					me.touch1Y
				);
			}
			let disTouch2;
			if( me.touch2X == -1 ){
				disTouch2 = 100000;
			}
			else{
				disTouch2 = me.rootSquareDistance(
					event.changedTouches[0].pageX,
					event.changedTouches[0].pageY,
					me.touch2X,
					me.touch2Y
				);
			}
			
			if( disTouch1 < disTouch2){
				me.touch1X = -1;
				me.touch1Y = -1;
				me.g_bg.mouseDownX = (-me.g_bg.decX*me.g_bg.zoomLevel+ me.touch2X );
				me.g_bg.mouseDownY = (-me.g_bg.decY*me.g_bg.zoomLevel+ me.touch2Y );
				if( me.touch2X == -1 ){
					var dis = me.rootSquareDistance(me.m1x,
													me.m1y,
													event.changedTouches[0].pageX,
													event.changedTouches[0].pageY);
						
						if(dis < me.limitClicDistance && me.disactivatedClic == 0){
							if( me.dateMouseDown != undefined){
								if( (new Date() - me.dateMouseDown) < me.limitClicTime ){
									me.g_bg.bg_g_stat.setMouseClick(1);
								}
							}
						}
				}
			}
			if( disTouch2 < disTouch1){
				me.touch2X = -1;
				me.touch2Y = -1;
				me.g_bg.mouseDownX = (-me.g_bg.decX*me.g_bg.zoomLevel+ me.touch1X );
				me.g_bg.mouseDownY = (-me.g_bg.decY*me.g_bg.zoomLevel+ me.touch1Y );
			}
            me.g_touchInitialised = false;
			if (event.targetTouches.length === 0) {
				me.touch1X = -1;
				me.touch1Y = -1;
				me.touch2X = -1;
				me.touch2Y = -1;
				me.g_touchInitialised = false;
			}
		}, false);

        /* ------------------------------
           ------------------------------
           ------------------------------ */

		this.g_canvasDoc.addEventListener('touchstart', function(event) {
			event.preventDefault();
			me.g_bg.bg_g_stat.setMouseDown(1);
			if (event.targetTouches.length == 1) {
				me.g_bg.mouseDownX = (-me.g_bg.decX*me.g_bg.zoomLevel+ event.changedTouches[0].pageX );
				me.g_bg.mouseDownY = (-me.g_bg.decY*me.g_bg.zoomLevel+ event.changedTouches[0].pageY );
				let touchX = event.changedTouches[0].pageX || 0; 
				let touchY = event.changedTouches[0].pageY || 0;
				me.touch1X = touchX;
				me.touch1Y = touchY;

				let rect = me.g_canvasDoc.getBoundingClientRect();
				let mX;
				let mY;
				if( rect.x == undefined){
					mX = event.changedTouches[0].pageX-rect.left;
					mY = event.changedTouches[0].pageY-rect.top;
				}
				else{
					mX = event.changedTouches[0].pageX-rect.x;
					mY = event.changedTouches[0].pageY-rect.y;
				}
				
				me.g_bg.mouseX = mX;
				me.g_bg.mouseY = mY;
				me.g_bg.bg_g_stat.setMouseXScreen	(mX);
				me.g_bg.bg_g_stat.setMouseYScreen	(mY);
				let decXs = (-me.g_bg.decX+me.g_bg.bg_g_width/2) * (1-me.g_bg.zoomLevel);
				let decYs = (-me.g_bg.decY+me.g_bg.bg_g_height/2) * (1-me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseXBoard	((mX-(me.g_bg.decX+decXs))/me.g_bg.zoomLevel);
				me.g_bg.bg_g_stat.setMouseYBoard	((mY-(me.g_bg.decY+decYs))/me.g_bg.zoomLevel);
				me.m1x = event.changedTouches[0].pageX;
				me.m1y = event.changedTouches[0].pageY;
				me.dateMouseDown = new Date();
				me.disactivatedClic = 0;
			}
			if( event.targetTouches.length >= 2 && me.g_touchInitialised == false){
				me.disactivatedClic = 1;
				me.touch1X = event.targetTouches[0].pageX;
				me.touch1Y = event.targetTouches[0].pageY;
				me.touch2X = event.targetTouches[1].pageX;
				me.touch2Y = event.targetTouches[1].pageY;
				me.g_touchInitialised = true;
				me.g_touchInitialZoom = me.g_bg.zoomLevel;
				me.g_touchDistanceSecondPoint = me.rootSquareDistance(
                                            me.touch1X,
											me.touch1Y,
											me.touch2X,
											me.touch2Y
										);
                
			}
			/*if (event.targetTouches.length >= 2) {
				me.disactivatedClic = 1;
		
				me.touch1X = event.targetTouches[0].pageX;
				me.touch1Y = event.targetTouches[0].pageY;
				me.touch2X = event.targetTouches[1].pageX;
				me.touch2Y = event.targetTouches[1].pageY;
		
				me.g_touchInitialised = true;
				me.g_touchInitialZoom = me.g_bg.zoomLevel;
				me.g_touchDistanceSecondPoint = me.rootSquareDistance(
					me.touch1X,
					me.touch1Y,
					me.touch2X,
					me.touch2Y
				);
			}*/
		}, false);

	}

    /* ------------------------------
       ------------------------------
       ------------------------------ */

	rootSquareDistance($c1Px,$c1Py,$c2Px,$c2Py){
		return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) );
	}

    /* ------------------------------
       ------------------------------
       ------------------------------ */

    updatePositionTouch($touchX,$touchY){ // find best fit !...
		let disTouch1;
        if( this.touch1X == -1 ){
            disTouch1 = 100000;
        }
        else{
            disTouch1 = this.rootSquareDistance(
                $touchX,
                $touchY,
                this.touch1X,
                this.touch1Y
            );
        }
        let disTouch2;
        if( this.touch2X == -1 ){
            disTouch2 = 100000;
        }
        else{
            disTouch2 = this.rootSquareDistance(
                $touchX,
                $touchY,
                this.touch2X,
                this.touch2Y
            );
        }
        if( disTouch1 < disTouch2){
            this.touch1X = $touchX;
            this.touch1Y = $touchY;
        }
        if( disTouch2 < disTouch1){
            this.touch2X = $touchX;
            this.touch2Y = $touchY;
        }
	}

    /* ------------------------------
       ------------------------------
       ------------------------------ */

}