
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
		
		
		
		
		
		
		/* ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		 ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		------ ------ ------ ------ ------ ------ ------ ------ ------ ------ */
								
							/*	---- Debug ----		*/
								
		/* ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		 ------ ------ ------ ------ ------ ------ ------ ------ ------ ------
		------ ------ ------ ------ ------ ------ ------ ------ ------ ------ */
		/*------------------------------------------------*/
		initDebug(){
			this._textDebug = new BG_text(this._BG_engine,true,0,0,12,0);
			this._BG_engine.addObject(this._textDebug,1);
			this._textDebug.setText("Start");
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
			this._BG_engine.bg_g_context.globalAlpha = 0.5;
			var colorEasy = new HandleColor();	
			/*this._BG_engine.bg_g_context.beginPath();
			this._BG_engine.bg_g_context.lineWidth = 5;
			this._BG_engine.bg_g_context.moveTo(decX,decY);
			this._BG_engine.bg_g_context.lineTo(decX+this._sizeWidth*zoom,decY);
			this._BG_engine.bg_g_context.lineTo(decX+this._sizeWidth*zoom,decY+this._sizeHeight*zoom);
			this._BG_engine.bg_g_context.lineTo(decX,decY+this._sizeHeight*zoom);
			this._BG_engine.bg_g_context.lineTo(decX,decY);
			this._BG_engine.bg_g_context.strokeStyle = colorEasy.rgb(255,55,55);
			this._BG_engine.bg_g_context.stroke();*/

			for( var i = 0 ; i < this._tabGrid.length ; i++){
				for( var j = 0; j < this._tabGrid[0].length ; j++){
					//if( this._tabGrid[i][j].length != 0){
						var intensity = this._tabGrid[i][j].length*50 ;
						if( intensity > 255 ) intensity == 255;
						var color = colorEasy.rgb(intensity,0,0);
						this._BG_engine.bg_g_context.beginPath();
						this._BG_engine.bg_g_context.fillStyle = color;
						this._BG_engine.bg_g_context.rect(	decX+i*this._stpSize*zoom,
															decY+j*this._stpSize*zoom,
															(this._stpSize*zoom)-1,
															(this._stpSize*zoom)-1
															);
						this._BG_engine.bg_g_context.fill();
						
					//}
				}
			}
			this._BG_engine.bg_g_context.globalAlpha = 1;
			// value
			this._valueVectorSend = this._valueVectorSend*0.9583 + this._nbVectorSend * 0.0517;
			this._valueTimeExe = this._valueTimeExe*0.9583 + this._nbTimeExe * 0.0517;
			this._valueTestContact = this._valueTestContact*0.9583 + this._nbTestContact * 0.0517;
			if( this._listOfShip.length == 0){
				this._textDebug.setText("[LoopEngine: 0 Object]");
			}
			else{
				this._textDebug.setText(	"[LoopEngine:"+this._valueTimeExe+"ms]"+
										"[MoySqrt:"+(Math.ceil(this._valueTestContact/this._listOfShip.length))+"]"+
										"[MoyVector:"+(Math.ceil(this._valueVectorSend/this._listOfShip.length))+"]"
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
	

