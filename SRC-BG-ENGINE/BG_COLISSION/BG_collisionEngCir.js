
//
//
// The main class to handle et define collision
// based on very old code by Christophe CONIGLIO
// Flash actionscript 3 is the original language
//
// Re-implemntation the 08/06/2022 by Christophe Coniglio
// 
//

class BG_collisionEngCir {
		
		/*------------------------------------------------*/
		constructor($engWorld) {
			
			
			// declaration (portage of old flash .as code)
			/*-- debug --*/
			//special add ?
			this.x					= 0;	//utilisé ??
			this.y					= 0;	//utilisé ??
			
			this._debug				= false;
			this._dragShip			= false;
			this._world				= null;
			this._date1Debug		= null;
			this._date2Debug		= null;
			/*-- intrinsic parameters --*/
			this._coefShockabsorb	= 1;	//facteur d'absoption du choc --> valeur par defaut = 1
			this._static			= false;
			this._gravityZ			= 0;
			this._mass				= 0;
			this._radius			= 0;
			this._px				= 0;
			this._py				= 0;
			this._vx				= 0;
			this._vy				= 0;
			this._initPosition		= true;
			/*-- error aproximation --*/
			this._numError			= 1.0;
			/*-- taille --*/
			this._sizeWidth		 	= 0;
			this._sizeHeight	 	= 0;
			/*-- dataArray --*/
			this._listOfShip		= null; //original --> :Vector.<EngCir>
			this._tabGrid		 	= null; //original --> :Vector.<Vector.<Vector.<EngCir>>>
			this._stpSize			= 1;
			this._posTabX	 		= -1;
			this._posTabY			= -1;
			this._nbBlock			= 1;
			
			
			// begining of the code
			this._world = $engWorld;
			this._listOfShip = $engWorld._listOfShip;
			this._listOfShip.push( this );
			this._tabGrid = $engWorld._tabGrid;
			this._stpSize = $engWorld._stpSize;
			this._debug = $engWorld._debugMode;
			this._static = false;
			this._dragShip = false;
			this._sizeWidth = $engWorld._sizeWidth;
			this._sizeHeight = $engWorld._sizeHeight;
			//help to prevent bug
			this._initPosition = true;
			this._radius = 10;
			this._mass = 1;
			this._gravityZ = 0.5; //original 0.4
			//this.mouseEventDebug();
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		enterFrame(){
			//var g = 0.3;
			this._vy += 0.9;		//deleteMe

			if( this._debug )	
				this._date1Debug = new Date;
			if( !this._dragShip ){
				if( !this._static ){
					this.doGravityZ();
					if( !(this._vx == 0 && this._vy == 0) || this._initPosition)
						this.collisionAndMove();
				}
				else{
					this._vx = 0;
					this._vy = 0;
				}
			}
			else{	
				//never activated besause drag are only work with flash api (bg_engine do not need)
				/* old code
				this._vx = this._vx*0.1 + (x-this._px)*0.9;
				this._vy = this._vy*0.1 + (y-this._py)*0.9;
				this._px=x;
				this._py=y;
				this.setPosition(x,y);
				*/
			}
			// ---------------------
			this.x = this._px;
			this.y = this._py;
			if( this._debug){
				this.traceGraphics(); // used for time calculus
			}
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		traceGraphics(){
			

			/*bg_engine.bg_g_context.beginPath();
			bg_engine.bg_g_context.arc(this._px, this._py, this._radius, 0, 2*Math.PI, 0);
			//bg_engine.bg_g_context.fillStyle = color;
			bg_engine.bg_g_context.fill(); 
			*/
			
			//console.log(this._px,this._py);
			/*graphics.clear();
			graphics.lineStyle(2, 0x4e8eb1);
			graphics.beginFill(0x1d527a,0.8);
			if( this._static ){
				graphics.lineStyle(2, 0xfff98e);
				graphics.beginFill(0xc7b859,0.8);
			}
			graphics.drawCircle(0,0,this._radius);
			graphics.endFill();*/
			this._date2Debug = new Date;
			this._world.setNbTimeExe( Number(this._date2Debug) - Number(this._date1Debug));
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		doGravityZ(){
			if(this._vx<0){
				this._vx+=this._gravityZ*Math.log(-this._vx/10+1);
			}
			else if(this._vx>0){
				this._vx-=this._gravityZ*Math.log(this._vx/10+1);
			}
			
			if(this._vy<0){	
				this._vy+=this._gravityZ*Math.log(-this._vy/10+1);
			}
			else if(this._vy>0){
				this._vy-=this._gravityZ*Math.log(this._vy/10+1);
			}
			
			if( ((this._vx*this._vx)+(this._vy*this._vy)) < 0.08 ){
				this._vx = 0;
				this._vy = 0;
			}
			
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		collisionAndMove(){
			var npx = this._px+this._vx;
			var npy = this._py+this._vy;
			var tabCollision = new Array();
			
			if( npx-this._radius<0)	{
				npx = this._radius;
				this._vx = -this._vx/this._coefShockabsorb;
			}
			if( npx+this._radius>this._sizeWidth){	
				this._vx = -this._vx/this._coefShockabsorb;
				npx = this._sizeWidth-this._radius;
			}
			if( npy-this._radius<0){	
				this._vy = -this._vy/this._coefShockabsorb;
				npy = this._radius;
			}
			if( npy+this._radius>this._sizeHeight){
				npy = this._sizeHeight-this._radius;
				this._vy = -this._vy/this._coefShockabsorb;
			}
			var posTabX = Math.floor((npx-this._radius)/this._stpSize);
			var posTabXend = posTabX + this._nbBlock;
			if( posTabXend > Math.ceil(this._sizeWidth/this._stpSize) ) posTabXend = Math.ceil(this._sizeWidth/this._stpSize);
			var posTabY = Math.floor((npy-this._radius)/this._stpSize);
			var posTabYend = posTabY + this._nbBlock;
			if( posTabYend > Math.ceil(this._sizeHeight/this._stpSize) ) posTabYend = Math.ceil(this._sizeHeight/this._stpSize);
			var i,j,m,l;
			var here;
			var counterContact = 0;
			for( i=posTabX ; i<posTabXend;i++){
				for( j=posTabY;j<posTabYend;j++){
					for( m = 0 ; m < this._tabGrid[i][j].length ;m++){
						if( this._tabGrid[i][j][m] != this){
							
							here = true;
							for( l = 0 ; l < tabCollision.length ; l++){
								if( this._tabGrid[i][j][m] == tabCollision[l][3] )
									here = false;
									//break ???
							}
							if( here ){
								counterContact++;
								var distance = this.squareDistance(this._tabGrid[i][j][m]._px,this._tabGrid[i][j][m]._py,npx,npy);
								if( distance < (this._tabGrid[i][j][m]._radius + this._radius)*(this._tabGrid[i][j][m]._radius + this._radius) ){
									tabCollision.push( [this._tabGrid[i][j][m]._px,this._tabGrid[i][j][m]._py,this._tabGrid[i][j][m]._radius,this._tabGrid[i][j][m],distance] );
								}
							}
						}
					}
				}
			}
			
			var k = 0;
			if( this._debug )
				this._world.setNbTestContact( counterContact );
			// gere la difusion d'energie entre les items
			
			if( tabCollision.length > 0){
				var vx = this._vx;
				var vy = this._vy;
				this._vx = 0;
				this._vy = 0;
				var div = tabCollision.length * this._coefShockabsorb;
				
				
				for (var iA = 0; iA < tabCollision.length; iA++) {
					var obj = tabCollision[iA];
				
				//for each(var obj:* in tabCollision){
					
					var m2 = obj[3];
					if( m2._static == true){
						var angleC = Math.atan2( npy-m2._py,npx-m2._px);
						var powerC = Math.sqrt((vx*vx)+(vy*vy));
						this._vx += (Math.cos(angleC) * powerC)/div;
						this._vy += (Math.sin(angleC) * powerC)/div;
					}
					else{
						var d = Math.sqrt(obj[4]);
						if( d == 0){
							//todo
							//trace("Probleme 2 disque à la même position en ",npx,npy);
						}
						else{
							var nx = (m2._px - npx) / d;
							var ny = (m2._py - npy) / d;
							var p = 2 * (vx * nx + vy * ny - m2._vx * nx - m2._vy * ny) / (this._mass + m2._mass);
							this._vx += (vx - p * m2._mass * nx)/div;
							this._vy += (vy - p * m2._mass * ny)/div;
							m2._vx = (m2._vx + p * this._mass * nx)/div;
							m2._vy = (m2._vy + p * this._mass * ny)/div;
						}
					}
				}
			}
			//var
			var d1;
			var d2;
			// 3 part of circle collision
			if( tabCollision.length == 1){
				var angle = Math.atan2( npy-tabCollision[0][1],npx-tabCollision[0][0]);
				npx = tabCollision[0][0] + Math.cos(angle) * (this._radius+tabCollision[0][2]);
				npy = tabCollision[0][1] + Math.sin(angle) * (this._radius+tabCollision[0][2]);
			}
			else if( tabCollision.length == 2){
				d1 = new BG_collisionParametricLine(tabCollision[0][0],tabCollision[0][1],tabCollision[1][0],tabCollision[1][1]); 
				d2 = new BG_collisionParametricLine(0,0,0,0);
				d2.copyLine(d1);
				d2.inverseMVector();
				d2.addNewPoint(npx,npy);
				k = d2.solveDistancePoint(tabCollision[0][0],tabCollision[0][1],this._radius + tabCollision[0][2]);
				npx = d2.getPosX(k);
				npy = d2.getPosY(k);
				if( this.squareDistance(tabCollision[1][0],tabCollision[1][1],npx,npy) < (this._radius + tabCollision[1][2] - this._numError)*(this._radius + tabCollision[1][2] - this._numError)){
				 	k = d2.solveDistancePoint(tabCollision[1][0],tabCollision[1][1],this._radius + tabCollision[1][2]);
					npx = d2.getPosX(k);
					npy = d2.getPosY(k);
				}
				
			}
			else if( tabCollision.length > 2 ){
				if( !this.pointInsideCloud(tabCollision, npx, npy) ){
					var cx = 0;
					var cy = 0;
					for (var iB = 0; iB < tabCollision.length; iB++) {
						var item2 = tabCollision[iB];
					//for each(var item2:* in tabCollision){
						cx += item2[0];
						cy += item2[1];
					}
					cx /= tabCollision.length;
					cy /= tabCollision.length;
					d1 = new BG_collisionParametricLine(npx,npy,cx,cy); 
					k = 0;
					var k1 = 0;
					var lock = false;
					if( !(npx == cx && npy == cy) ){
						for (var iC = 0; iC < tabCollision.length; iC++) {
							var item3 = tabCollision[iC];
						//for each(var item3:* in tabCollision){
							k = d1.solveDistancePoint(item3[0],item3[1],this._radius + item3[2]);
							lock = false;
							for (var iD = 0; iD < tabCollision.length; iD++) {
								var item4 = tabCollision[iD];
							//for each(var item4:* in tabCollision){
								if( item4 != item3 && 
									this.squareDistance(item4[0],item4[1],d1.getPosX(k),d1.getPosY(k)) < (this._radius+item4[2]-this._numError)*(this._radius+item4[2]-this._numError)  ){
									lock = true;
									break;
								}
							}
							if(!lock )	{
								if( k1 == 0 ) k1 = k;
								if( Math.abs(k1) > Math.abs(k))	k1 = k;
							}
						}
					}
					k = k1;
					npx = d1.getPosX(k);
					npy = d1.getPosY(k);
				}
			}
			
			if( npx-this._radius<0)	{
				npx = this._radius;
				this._vx = -this._vx/this._coefShockabsorb;
			}
			if( npx+this._radius>this._sizeWidth){	
				this._vx = -this._vx/this._coefShockabsorb;
				npx = this._sizeWidth-this._radius;
			}
			if( npy-this._radius<0){	
				this._vy = -this._vy/this._coefShockabsorb;
				npy = this._radius;
			}
			if( npy+this._radius>this._sizeHeight){
				npy = this._sizeHeight-this._radius;
				this._vy = -this._vy/this._coefShockabsorb;
			}
			posTabX = Math.floor((npx-this._radius)/this._stpSize);
			posTabXend = posTabX + this._nbBlock;
			if( posTabXend > Math.ceil(this._sizeWidth/this._stpSize) ) posTabXend = Math.ceil(this._sizeWidth/this._stpSize);
			posTabY = Math.floor((npy-this._radius)/this._stpSize);
			posTabYend = posTabY + this._nbBlock;
			if( posTabYend > Math.ceil(this._sizeHeight/this._stpSize) ) posTabYend = Math.ceil(this._sizeHeight/this._stpSize);
			for( i=posTabX ; i<posTabXend;i++){
				for( j=posTabY;j<posTabYend;j++){
					for( m = 0 ; m < this._tabGrid[i][j].length ;m++){
						if( this._tabGrid[i][j][m] != this){
							var distance2 = this.squareDistance(this._tabGrid[i][j][m]._px,this._tabGrid[i][j][m]._py,npx,npy);
							if( distance2 < (this._tabGrid[i][j][m]._radius + this._radius-this._numError)*(this._tabGrid[i][j][m]._radius + this._radius-this._numError) ){
								return;
							}
						}
					}
				}
			}
			
			this._initPosition = false;
			this.setPosition(npx,npy);
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		speedMe(vx,vy){
			return Math.sqrt( vx*vx + vy*vy );
		}
		howManyLong($c1Px,$c1Py,$c2Px,$c2Py){
			return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) );
		}
		squareDistance($c1Px,$c1Py,$c2Px,$c2Py){
			return (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py));
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		mouseEventDebug(){
			if( this._debug ){
				//this.addEventListener(MouseEvent.MOUSE_DOWN,mouseDown);
				//this.addEventListener(MouseEvent.MOUSE_UP,mouseUp);
			}
		}
		/*mouseDown(e:MouseEvent){ this.startDrag(),this._dragShip = true;};
		mouseUp(e:MouseEvent){ this.stopDrag(),this._dragShip = false;};
		*/
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		pointInsideCloud($tab,$px,$py){
			if( $tab.length < 3 )	return false;
			var p1x = $tab[0][0]-$px;
			var p1y = $tab[0][1]-$py;
			var p2x = $tab[1][0]-$px;
			var p2y = $tab[1][1]-$py;
			var p3x,p3y,angle1,angle2;
			var angleP1P2tmp = this.calculAngle(p1x,p1y,p2x,p2y);
			var angleP1P2 = Math.abs( angleP1P2tmp );
			var angleSign = true;
			if( angleP1P2tmp < 0 )	angleSign = false;
			for( var i = 2 ; i < $tab.length ; i++){
				p3x = $tab[i][0]-$px;
				p3y = $tab[i][1]-$py;
				angle1 = Math.abs(this.calculAngle(p1x,p1y,p3x,p3y));
				angle2 = Math.abs(this.calculAngle(p2x,p2y,p3x,p3y));
				if( angle1 < angle2){
					angleP1P2tmp = this.calculAngle(p3x,p3y,p2x,p2y);
					if( (angleP1P2tmp < 0 && angleSign) || (angleP1P2tmp > 0 && !angleSign) ){
						return true;
					}
					if( Math.abs(angleP1P2tmp) > angleP1P2 ){
						angleP1P2 = Math.abs(angleP1P2tmp);
						p1x = p3x;
						p1y = p3y;
					}
				}
				else{
					angleP1P2tmp = this.calculAngle(p1x,p1y,p3x,p3y);
					if( (angleP1P2tmp < 0 && angleSign) || (angleP1P2tmp > 0 && !angleSign) ){
						return true;
					}
					if( Math.abs(angleP1P2tmp) > angleP1P2 ){
						angleP1P2 = Math.abs(angleP1P2tmp);
						p2x = p3x;
						p2y = p3y;
					}
				}
			}
			return false;
		}
		calculAngle(p1x,p1y,p2x,p2y){
			var dtheta =  Math.atan2( p1y ,  p1x ) - Math.atan2( p2y ,  p2x ) ;
			while (dtheta > Math.PI)
			  dtheta -= Math.PI*2;
			while (dtheta < -Math.PI)
			  dtheta += Math.PI*2;
			return(dtheta);
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		setPosition($px,$py){
			this._px = $px;
			if( this._px-this._radius<0)	{
				this._px = this._radius;
				this._vx = -this._vx/this._coefShockabsorb;
			}
			if( this._px+this._radius>this._sizeWidth){	
				this._vx = -this._vx/this._coefShockabsorb;
				this._px = this._sizeWidth-this._radius;
			}
			this._py = $py;
			if( this._py-this._radius<0){	
				this._vy = -this._vy/this._coefShockabsorb;
				this._py = this._radius;
			}
			if( this._py+this._radius>this._sizeHeight){
				this._py = this._sizeHeight-this._radius;
				this._vy = -this._vy/this._coefShockabsorb;
			}
			
			if( this._px-this._radius < 0 )
				trace( "error this._px-this._radius < 0 ");
			if( this._py-this._radius < 0 )
				trace( "error this._py-this._radius < 0 ");
			
			//----
			var i,j,k,posTabX,posTabY;
			var beg,end,end2;
			if( this._posTabX == -1){
				this._posTabX = Math.floor((this._px-this._radius)/this._stpSize);
				this._posTabY = Math.floor((this._py-this._radius)/this._stpSize);
				end  = this._posTabX + this._nbBlock;
				end2 = this._posTabY + this._nbBlock;
				if( end  > Math.ceil(this._sizeWidth/this._stpSize) ) end = Math.ceil(this._sizeWidth/this._stpSize);
				if( end2 > Math.ceil(this._sizeHeight/this._stpSize) ) end2 = Math.ceil(this._sizeHeight/this._stpSize);
				for( i=this._posTabX ; i < end ; i++ ){
					for( j=this._posTabY ; j < end2 ; j++ ){
						this._tabGrid[i][j].push( this );
					}
				}	
			}
			else{
				//this.debug_tabGrid();		
				//console.log("je traite");
				var countAccessTab = 0;
				posTabX = Math.floor((this._px-this._radius)/this._stpSize);
				posTabY = Math.floor((this._py-this._radius)/this._stpSize);
				//move on X
				if(  posTabX != this._posTabX ){
					
					if( this._posTabX < posTabX){ 	// move ---> x
						beg = this._posTabX;
						end = posTabX + this._nbBlock;
						end2 = this._posTabY + this._nbBlock;
						if( beg < 0)	beg = 0;
						if( end > Math.ceil(this._sizeWidth/this._stpSize) ) end = Math.ceil(this._sizeWidth/this._stpSize);
						if( end2 > Math.ceil(this._sizeHeight/this._stpSize) ) end2 = Math.ceil(this._sizeHeight/this._stpSize);
						for( i = beg ; i < end  ; i++){
							for( j = this._posTabY ; j < end2 ; j++ ){
								if( i < this._posTabX + this._nbBlock && i<posTabX){
									if( this._tabGrid[i][j].length == 1 ){
										this._tabGrid[i][j] = new Array();
										countAccessTab++;
									}
									else{
										for( k=0 ; k < this._tabGrid[i][j].length ; k++){
											countAccessTab++;
											if( this._tabGrid[i][j][k] == this ){
												this._tabGrid[i][j].splice(k,1);
												break;
											}
										}
									}
								}
								if( i >= posTabX && i>=this._posTabX+this._nbBlock){
									countAccessTab++;
									this._tabGrid[i][j].push( this );
								}
							}
						}
					}
					else{				// X <--- move
						beg = posTabX;
						end = this._posTabX + this._nbBlock;
						end2 = this._posTabY + this._nbBlock;
						if( beg < 0)	beg = 0;
						if( end > Math.ceil(this._sizeWidth/this._stpSize) ) end = Math.ceil(this._sizeWidth/this._stpSize);
						if( end2 > Math.ceil(this._sizeHeight/this._stpSize) ) end2 = Math.ceil(this._sizeHeight/this._stpSize);
						for( i = beg ; i < end  ; i++){
							for( j = this._posTabY ; j < end2 ; j++ ){
								if( i < posTabX + this._nbBlock && i<this._posTabX){
									countAccessTab++;
									this._tabGrid[i][j].push( this );
								}
								if( i >= this._posTabX && i>=posTabX+this._nbBlock){
									if( this._tabGrid[i][j].length == 1 ){
										this._tabGrid[i][j] = new Array(); // comprendre new array serait plus rapide que splice ? surement !
										countAccessTab++;
									}
									else{
										for( k=0 ; k < this._tabGrid[i][j].length ; k++){
											countAccessTab++;
											if( this._tabGrid[i][j][k] == this ){
												this._tabGrid[i][j].splice(k,1);
												break;
											}
										}
									}
								}
							}
						}
					}
					this._posTabX = posTabX;
				}
				if(  posTabY != this._posTabY ){
					if( this._posTabY < posTabY){ 	// move down Y
						beg = this._posTabY;
						end = posTabY + this._nbBlock;
						end2 = this._posTabX + this._nbBlock;
						if( beg < 0)	beg = 0;
						if( end > Math.ceil(this._sizeHeight/this._stpSize) ) end = Math.ceil(this._sizeHeight/this._stpSize);
						if( end2 > Math.ceil(this._sizeWidth/this._stpSize) ) end2 = Math.ceil(this._sizeWidth/this._stpSize);
						for( j = beg ; j < end  ; j++){
							for( i = this._posTabX ; i < end2 ; i++ ){
								if( j < this._posTabY + this._nbBlock && j<posTabY){
									if( this._tabGrid[i][j].length == 1 ){
										this._tabGrid[i][j] = new Array();
										countAccessTab++;
									}
									else{
										for( k=0 ; k < this._tabGrid[i][j].length ; k++){
											countAccessTab++;
											if( this._tabGrid[i][j][k] == this ){
												this._tabGrid[i][j].splice(k,1);
												break;
											}
										}
									}
								}
								if( j >= posTabY && j>=this._posTabY+this._nbBlock){
									countAccessTab++;
									this._tabGrid[i][j].push( this );
								}
							}
						}
					}
					else{					// move up Y
						beg = posTabY;
						end = this._posTabY + this._nbBlock;
						end2 = this._posTabX + this._nbBlock;
						if( beg < 0)	beg = 0;
						if( end > Math.ceil(this._sizeHeight/this._stpSize) ) end = Math.ceil(this._sizeHeight/this._stpSize);
						if( end2 > Math.ceil(this._sizeWidth/this._stpSize) ) end2 = Math.ceil(this._sizeWidth/this._stpSize);
						for( j = beg ; j < end  ; j++){
							for( i= this._posTabX ; i < end2 ; i++ ){
								if( j < posTabY + this._nbBlock && j<this._posTabY){
									countAccessTab++;
									this._tabGrid[i][j].push( this );
								}
								if( j >= this._posTabY && j>=posTabY+this._nbBlock){
									if( this._tabGrid[i][j].length == 1 ){
										this._tabGrid[i][j] = new Array();
										countAccessTab++;
									}
									else{
										for( k=0 ; k < this._tabGrid[i][j].length ; k++){
											countAccessTab++;
											if( this._tabGrid[i][j][k] == this ){
												this._tabGrid[i][j].splice(k,1);
												break;
											}
										}
									}
								}
							}
						}
					}
					this._posTabY = posTabY;
				}
				if( this._debug ){
					this._world.setNbVectorSend(countAccessTab);
				}
			}
			//----
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		initDataArray(){
			this._nbBlock = Math.ceil((this._radius*2)/this._stpSize)+1;
			if( this._nbBlock < 2 )	this._nbBlock = 2;
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		destroyMe(){
			var i,j,k,posTabX,posTabY;
			var beg,end,end2;
			
			posTabX = Math.floor((this._px-this._radius)/this._stpSize);
			posTabY = Math.floor((this._py-this._radius)/this._stpSize);
			end  = this._posTabX + this._nbBlock;
			end2 = this._posTabY + this._nbBlock;
			if( end  > Math.ceil(this._sizeWidth/this._stpSize) ) end = Math.ceil(this._sizeWidth/this._stpSize);
			if( end2 > Math.ceil(this._sizeHeight/this._stpSize) ) end2 = Math.ceil(this._sizeHeight/this._stpSize);
			
			
			for( i=this._posTabX ; i < end ; i++ ){
				for( j=this._posTabY ; j < end2 ; j++ ){
					if( this._tabGrid[i][j].length == 1 ){
						this._tabGrid[i][j] = new Array();
					}
					else{
						for( k=0 ; k < this._tabGrid[i][j].length ; k++){
							if( this._tabGrid[i][j][k] == this ){
								this._tabGrid[i][j].splice(k,1);
								break;
							}
						}
					}
				}
			}		
			
			/*if( this._debug ){
				this.removeEventListener(MouseEvent.MOUSE_DOWN,mouseDown);
				this.removeEventListener(MouseEvent.MOUSE_UP,mouseUp);
			}*/
			
		}

		debug_tabGrid(){
			var str = "";
			for(var j = 0; j < this._tabGrid.length; j++){
				for(var i = 0; i < this._tabGrid[i].length; i++){
					str+=this._tabGrid[j][i].length+",";
				}
				str+="\n";
			}
			console.log(str);
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
}
	
