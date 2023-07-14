
//
//
// The main entry on the 2d circle collision engine
// based on very old code by Christophe CONIGLIO
// Flash actionscript 3 is the original language
//
// Re-implemntation the 08/06/2022 by Christophe Coniglio
// 
//


class BG_collision {
	/*V0.1
	/*Christophe CONIGLIO*/ 
	/*contact: christophe.coniglio@gmail.com*/
	
		/*------------------------------------------------*/
		constructor($BG_engine,$debugMode,$sizeWidth,$sizeHeight,$stpSizeGrid) {
			
			// declaration (portage of old flash .as code)
			this._BG_engine = null;
			/*-- debug --*/
			this._debugMode 		= false;
			this._textDebug			= null;
			this._formatDebug		= null;
			this._nbVectorSend		= 0;
			this._valueVectorSend	= 0;
			this._nbTimeExe			= 0;
			this._valueTimeExe		= 0;
			this._nbTestContact		= 0;
			this._valueTestContact	= 0;
			/*-- taille --*/
			this._sizeWidth			= 0;
			this. _sizeHeight		= 0;
			/*-- dataArray --*/
			this._tabGrid			= null;
				// --> original implemantion :Vector.<Vector.<Vector.<EngCir>>> !!!
				// new implementation : 3d array
			this._stpSize			= 1;
			this._listOfShip		= null; 
			this._boolUniqueNumberFrame = true; // variable permettant de synchroniser le sobet traité et non traité
			// cette donné est MAJ aavant le enterframe des obets afin d'abtenir un nouveau ID
				// --> original implemantion :Vector.<EngCir>
				// new implementation : 1d array
			
			
			// get input value
			this._BG_engine = $BG_engine;
			this._debugMode = $debugMode;
			this._sizeWidth = $sizeWidth;
			this._sizeHeight = $sizeHeight;
			this._listOfShip = new Array();
			//grid
			this._stpSize = $stpSizeGrid;
			this._tabGrid = new Array( Math.ceil(this._sizeWidth/this._stpSize) );
			
			for( var i = 0 ; i < this._tabGrid.length ; i++){
				this._tabGrid[i] = new Array( Math.ceil(this._sizeHeight/this._stpSize) );
				for( var j = 0; j < this._tabGrid[i].length ; j++){
					this._tabGrid[i][j] = Array();
				}
			}
			//debug
			if( this._debugMode ){
				this.initDebug();
			}
		}
		
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		updateboolUniqueNumberFrame(){
			if( this._boolUniqueNumberFrame ) 	this._boolUniqueNumberFrame = false;
			else								this._boolUniqueNumberFrame = true;
			//un roulement binaire suffit puisque en théory tous les obet on leur enterframe d'executer
			// ici le but c'est de séaprer ceux déjà executer de ceux a traiter
			// via un id ici cette variable this._boolUniqueNumberFrame
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		addElemListOfShip(elem){
			this._listOfShip.push( elem );
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		deleteObj(elem){
			for(var i = 0; i < this._listOfShip.length ; i++){
				if( this._listOfShip[i] == elem ){
					this._listOfShip[i].destroyMe();
					this._listOfShip.splice( i,0 );
					return;
				}
			}
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		deleteObjAt($i){
			this._listOfShip[$i].destroyMe();
			this._listOfShip.splice( $i,1 );
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		// return true or false if terrain is free to add circle
		pTerrainFree(npx,npy,radius){
			npx -= this._BG_engine.bg_g_collisionEngineOffSetX;
			npy -= this._BG_engine.bg_g_collisionEngineOffSetY;
			var tabCollision = new Array();
			var nbBlock = Math.ceil((radius*2)/this._stpSize)+1;
			if( nbBlock < 2 )	nbBlock = 2;
			var posTabX = Math.floor((npx-radius)/this._stpSize);
			var posTabXend = posTabX + nbBlock;
			if( posTabXend > Math.ceil(this._sizeWidth/this._stpSize) ) posTabXend = Math.ceil(this._sizeWidth/this._stpSize);
			var posTabY = Math.floor((npy-radius)/this._stpSize);
			var posTabYend = posTabY + nbBlock;
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
								if( this._tabGrid[i][j][m] == tabCollision[l][3] ){
									here = false;
									//break ???
								}
							}
							if( here ){
								counterContact++;
								var distance = this.squareDistance(this._tabGrid[i][j][m]._px,this._tabGrid[i][j][m]._py,npx,npy);
								if( distance < (this._tabGrid[i][j][m]._radius + radius)*(this._tabGrid[i][j][m]._radius + radius) ){
									return false;
								}
							}
						}
					}
				}
			}
			return true;
		}
		squareDistance($c1Px,$c1Py,$c2Px,$c2Py){
			return (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py));
		}
		/*------------------------------------------------*/
		/*------------------------------------------------*/
		
		
		
		
		
		
		/* ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		 ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		------ ------ ------ ------ ------ ------ ------ ------ ------ ------ */
								
							/*	---- Debug ----		*/
								
		/* ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		 ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		------ ------ ------ ------ ------ ------ ------ ------ ------ ------ */
		/*------------------------------------------------*/
		initDebug(){
			this._textDebug = new BG_text(this._BG_engine,true,4,0,0,20,"#FF8888");
			//this._BG_engine.addObject(this._textDebug,1);
			this._textDebug.setText("");
		}
		/*------------------------------------------------*/
		setNbVectorSend($nbVectorSend){
			this._nbVectorSend += $nbVectorSend;
		}
		setNbTimeExe($nbTimeExe){
			this._nbTimeExe += $nbTimeExe;
		}
		setNbTestContact($nbTestContact){
			this._nbTestContact += $nbTestContact;
		}
		/*------------------------------------------------*/
		drawDebug(decX,decY,zoom){
			var offX = this._BG_engine.bg_g_collisionEngineOffSetX;
			var offY = this._BG_engine.bg_g_collisionEngineOffSetY;
			this._BG_engine.bg_g_context.globalAlpha = 0.5;
			var colorEasy = new HandleColor();	
			this._BG_engine.bg_g_context.beginPath();
			this._BG_engine.bg_g_context.lineWidth = 5;
			
			
			this._BG_engine.bg_g_context.moveTo(decX+offX*zoom,decY+offY*zoom);
			this._BG_engine.bg_g_context.lineTo(decX+(offX+this._sizeWidth)*zoom,decY+offY*zoom);
			this._BG_engine.bg_g_context.lineTo(decX+(offX+this._sizeWidth)*zoom,decY+(offY+this._sizeHeight)*zoom);
			this._BG_engine.bg_g_context.lineTo(decX+offX*zoom,decY+(offY+this._sizeHeight)*zoom);
			this._BG_engine.bg_g_context.lineTo(decX+offX*zoom,decY+offY*zoom);
			
			this._BG_engine.bg_g_context.strokeStyle = colorEasy.rgb(255,55,55);
			this._BG_engine.bg_g_context.stroke();

			/*for( var i = 0 ; i < this._tabGrid.length ; i++){
				for( var j = 0; j < this._tabGrid[0].length ; j++){
					//if( this._tabGrid[i][j].length != 0){
						var intensity = this._tabGrid[i][j].length*50 ;
						if( intensity > 255 ) intensity == 255;
						var color = colorEasy.rgb(intensity,0,0);
						this._BG_engine.bg_g_context.beginPath();
						this._BG_engine.bg_g_context.fillStyle = color;
						this._BG_engine.bg_g_context.rect(	decX+((i*this._stpSize)+offX)*zoom,
															decY+((j*this._stpSize)+offY)*zoom,
															(this._stpSize*zoom)-1,
															(this._stpSize*zoom)-1
															);
						this._BG_engine.bg_g_context.fill();
						
					//}
				}
			}*/
			this._BG_engine.bg_g_context.globalAlpha = 1;
			// value
			this._valueVectorSend = this._valueVectorSend*0.9583 + this._nbVectorSend * 0.0517;
			this._valueTimeExe = this._valueTimeExe*0.9583 + this._nbTimeExe * 0.0517;
			this._valueTestContact = this._valueTestContact*0.9583 + this._nbTestContact * 0.0517;
			if( this._listOfShip.length == 0){
				this._textDebug.setText("[LoopEngine: 0 Object]");
			}
			else{
				this._textDebug.setText(	"[BG_enginePhysic] "+
										" MeanSqrt: "+(Math.ceil(this._valueTestContact/this._listOfShip.length))+"# "+
										" MeanVector: "+(Math.ceil(this._valueVectorSend/this._listOfShip.length))+"# "+
										" Time: "+Math.round(this._valueTimeExe*1000)/1000+"ms "
										);
			}
			//this._textDebug.setTextFormat(this._formatDebug );
			this._nbTimeExe = 0;
			this._nbVectorSend = 0;
			this._nbTestContact = 0;	
		}
		/*------------------------------------------------*/
		/* ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		 ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		------ ------ ------ ------ ------ ------ ------ ------ ------ ------ */
								
		/* ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		 ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		------ ------ ------ ------ ------ ------ ------ ------ ------ ------ */
		/*------------------------------------------------*/
}
	

