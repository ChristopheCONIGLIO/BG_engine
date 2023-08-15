/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_circle extends BG_coreObjectBasic{
	constructor(bg,onBoard,fixed,layer,pX,pY,size,color) {
		if( color == undefined){
			super(bg,onBoard,false,fixed,layer,pX,pY,pY,size);
		}
		else{
			super(bg,onBoard,fixed,layer,pX,pY,size,size,color);
		}

		
		this.p_bg.addObject(this,this.p_layer);
		
		//variables internes physic
		this.p_physicObjet 				= null;
		this.p_physicEnable 			= false;

		//variables utilisables physic
		this.p_physicStatic 			= false;
		//this.p_physicListLastContact 	= new Array();
		this.p_physicVx 				= 0;
		this.p_physicVy 				= 0;

		
	}
	destructor(){
		if( this.p_physicEnable == true ){
			this.setPhysicDisable();
		}
	}


	/* 

		public function accesseur get/set

	*/
	setDim(value){
		this.p_sX = value;
	}
	getDim(){
		return this.p_sX;
	}
	setPos(pX,pY){
		this.p_pX = pX;
		this.p_pY = pY;
		if( this.p_physicEnable == true ){
			this.p_physicObjet.setPosition(	this.p_pX-this.p_bg.bg_g_collisionEngineOffSetX,
											this.p_pY-this.p_bg.bg_g_collisionEngineOffSetY);
		}
	}
	setPosX(pX){
		this.p_pX = pX;
		this.setPos(this.p_pX,this.p_pY);
	}
	setPosY(pY){
		this.p_pY = pY;
		this.setPos(this.p_pX,this.p_pY);
	}
	getPosX(){
		return this.p_pX;
	}
	getPosY(){
		return this.p_pY;
	}














	/*

	function propre au moteur

	*/

	
	//PS : Rotation has not action of thius form so it's not managed :)
	drawObj(decX,decY,zoom){
		// in developement
		//
		// Modif a reporter supp de p_physicListLastContact
		// supression de this.p_physicObjet._vx
		// supression de this.p_physicObjet._vy
		//
		if( this.p_physicEnable == true){
			//this.p_physicListLastContact = new Array();
			//this.p_physicObjet._vx = this.p_physicVx;
			//this.p_physicObjet._vy = this.p_physicVy;
			this.p_physicObjet.enterFrame();
			this.p_pX = this.p_physicObjet._px - this.p_sX/2 + this.p_bg.bg_g_collisionEngineOffSetX;
			this.p_pY = this.p_physicObjet._py - this.p_sX/2 + this.p_bg.bg_g_collisionEngineOffSetY;
			//this.p_physicVx = this.p_physicObjet._vx;
			//this.p_physicVy = this.p_physicObjet._vy;
		}
		// end developement
		


		if( this.visible == true){
		
			var info = this.getLocalInfo();
			let px  = info[0];
			let py  = info[1];
			let pS  = info[2];
		
			// to prevent bug or trace without real need
			if( pS < 1 ) return;
			//

			//determine if form must be draw
			if( px-pS > this.stat.getScreenWidth())	return;
			if( py-pS > this.stat.getScreenHeight())	return;
			if( px + pS < 0)		return;
			if( py + pS < 0)		return;
			if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pS,pS);
			
			// draw the form
			this.drawCircle(px,py,pS,this.p_color);
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}
	
	


	/*
		info

	*/
	getLocalInfo(){
		let decX = this.p_bg.decXwithZoom;
		let decY = this.p_bg.decYwithZoom;
		let zoom = this.p_bg.zoomLevel;
		let px,py,pS;
		if( this.p_fixedSize == true){
			px = decX+this.p_pX*zoom-this.p_sX/2;
			py = decY+this.p_pY*zoom-this.p_sX/2;
			pS = this.p_sX;
		}
		else if( this.p_onBoard == true){
			// calcul limit of form
			px = decX+this.p_pX*zoom;
			py = decY+this.p_pY*zoom;
			pS = this.p_sX*zoom; //pas pS ? bug ?
		}
		else{
			// calcul limit of form
			px = this.p_pX;
			py = this.p_pY;
			pS = this.p_sX;
		}
		return [px,py,pS];
	}
	getMouseOver(){
		var info = this.getLocalInfo();
		let px  = info[0];
		let py  = info[1];
		let pS = info[2];
		
		let cx = px+pS/2;
		let cy = py+pS/2;

		var dis = this.tools_distance(
			this.p_bg.mouseX,
			this.p_bg.mouseY
			,cx,
			cy
			);
		if( dis < pS/2)	this.mouseOver = true;
		else			this.mouseOver = false;

		return this.mouseOver;
	}
	tools_distance($c1Px,$c1Py,$c2Px,$c2Py){
        return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
    }

	/* 
		
		local function

	*/
	drawCircle(x, y, size ,color) {
		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.arc(x+size/2, y+size/2, size/2, 0, 2*Math.PI, 0);
		this.p_ctx.fillStyle = color;
		this.p_ctx.fill(); 
		this.p_ctx.globalAlpha = 1;
	}
	
		
	/*

	physic engine functions

	*/
	setPhysicDisable(){
		this.p_physicEnable = false;
		this.p_physicObjet.destroyMe();
	}
	setPhysicEnable(){
		this.p_physicObjet = new BG_collisionEngCir(this.p_bg.bg_g_collisionEngine,this);
		this.p_physicObjet._radius = this.p_sX/2;
		this.p_physicObjet._mass = Math.PI*this.p_sX/2*this.p_sX/2; // formule surface
		this.p_physicObjet._static = this.p_physicStatic;
		this.p_physicObjet.initDataArray();
		this.p_physicObjet.setPosition(	this.p_pX-this.p_bg.bg_g_collisionEngineOffSetX,
										this.p_pY-this.p_bg.bg_g_collisionEngineOffSetY);
		this.p_physicEnable = true;
	}
	setPhysicMovable(value){
		this.p_physicStatic = value;
		this.p_physicObjet._static = this.p_physicStatic;
	}
	pCrossable(value){
		if( value == true || value ==false) this.p_physicObjet._crossable = value;
		else								this.p_physicObjet._crossable = false;
	}
	pGXY(gX,gY){	//set gravity
		this.p_physicObjet._gravityX = gX;
		this.p_physicObjet._gravityY = gY;
	}
	pGX(gX){//set gravity
		this.p_physicObjet._gravityX = gX;
	}
	pGY(gY){//set gravity
		this.p_physicObjet._gravityY = gY;
	}
	pVXY(vX,vY){ //set velocity
		this.p_physicObjet._vx = vX;
		this.p_physicObjet._vy = vY;
	}
	pVX(vX){//set velocity
		this.p_physicObjet._vx = vX;
	}
	pVY(vY){//set velocity
		this.p_physicObjet._vy = vY;
	}


	remove(){
		if( this.p_physicEnable = true) this.setPhysicDisable();
		this.p_bg.deleteObject(this);
	}
	

}

