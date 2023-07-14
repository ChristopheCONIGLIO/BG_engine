class BG_coreObjectBasic {
	constructor(bg,onBoard,fixed,layer,pX,pY,sX,sY,color) {
		if( color == undefined){ // for compatibility with v1 ob BG-engine
			this.remoteContructor(bg,onBoard,false,fixed,layer,pX,pY,sX,sY); //attention les param sont décalés
		}
		else{
			this.remoteContructor(bg,onBoard,fixed,layer,pX,pY,sX,sY,color);
		}
	}
	remoteContructor(bg,onBoard,fixed,layer,pX,pY,sX,sY,color){
		this.p_bg		= bg;
		this.stat		= bg.bg_g_stat;
		this.p_ctx		= bg.bg_g_context;
		this.p_fixedSize = fixed;
		this.p_onBoard	= onBoard;
		this.p_layer	= layer; 
		this.p_sX 		= sX;
		this.p_sY		= sY;
		this.p_pX		= pX;
		this.p_pY		= pY;  
		this.p_color 	= color; 

		//attribut local spécifique
		this.alpha			= 1;
		this.visible 		= true;
		this.rotation 		= 0;	
		this.mouseOver		= false;
	}
	
	/* 

		local function

	*/
	drawObj(decX,decY,zoom){
		//mettre le code qui trace des objet graphic "contex"
	}
	
	enterFrame(){
		// mettre son code
	}
	
	destructor(){
		// appeler quand l'objet est détruit
		// (permet de supprimer d'autre objet graphique compris dans l'objet lui meme)
	}
	remove(){
		this.p_bg.deleteObject(this);
	}
	
	//
	// Manipuler l'aspect graphique générique à tout les objets
	//

	// ref du moteur
	// on porpose pas de "set" pour l'instant mais peut etre plus tard
	getRefEngine(){
		return this.p_bg; 
	}

	//calque
	setLayer(layer){
		this.p_layer = layer;
		this.p_bg.changeLayer(this,this.p_layer);
	}
	getLayer(){
		return this.p_layer; 
	}

	//color
	setColor(color){
		this.p_color = color; 
	}
	getColor(){
		return this.p_color; 
	}

	//fixedSize
	setFixedSize(value){
		this.p_fixedSize = value; 
	}
	getFixedSize(){
		return this.p_fixedSize; 
	}
	//onboard
	setOnBoard(value){
		this.p_onBoard = value; 
	}
	getOnBoard(){
		return this.p_onBoard; 
	}

	
	
	//transparence
	setAlpha(value){
		this.alpha = value;
		if( value < 0) value = 0;
		if( value > 1) value = 1;
	}
	getAlpha(){
		return this.alpha;
	}

	//visible ou non
	setVisible(arg){
		this.visible =  arg;
	}
	getVisible(arg){
		return this.visible;
	}

	//rotation
	setRotation(arg){
		this.rotation = arg;
		if( arg < 0) this.rotation = 0;
		if( arg > 360) this.rotation = 0;
	}
	getRotation(){
		return this.rotation;
	}
	//mouseOver
	getMouseOver(){
		return false;
	}





	/* 

		** PRIVATE **

		local function

	*/
	//
	// function for debug DO NOT recomand to USE
	//

	drawLimitContour(x, y, width, height){
		this.p_ctx.beginPath();
		this.p_ctx.rect(x,y ,width,height);
		this.p_ctx.lineWidth = 3;
		this.p_ctx.strokeStyle = "#FF0000";
		this.p_ctx.stroke();
	}
	// functions tools
	tools_rotatePointFromCenter (Mx,My, Ox,Oy, angle) {
		var xM, yM, x, y;
		angle *= -Math.PI / 180;
		xM = Mx - Ox;
		yM = My - Oy;
		x = xM * Math.cos (angle) + yM * Math.sin (angle) + Ox;
		y = - xM * Math.sin (angle) + yM * Math.cos (angle) + Oy;
		return ([Math.round (x), Math.round (y)]);
	}
	tools_scalePointFromCenter (Mx,My, Ox,Oy, scale) {
		var xM, yM, x, y;
		xM = (Mx - Ox)*scale;
		yM = (My - Oy)*scale;
		x = xM * Math.cos (0) + yM * Math.sin (0) + Ox;
		y = - xM * Math.sin (0) + yM * Math.cos (0) + Oy;
		return ([Math.round (x), Math.round (y)]);
	}
	tools_disPointFromCenter (Mx,My, Ox,Oy, dis) {
		var xM, yM, x, y;
	
		xM = (Mx - Ox);
		yM = (My - Oy);

		let disori = Math.sqrt(xM*xM+yM*yM);
		let coef = dis/disori;
		xM *= coef;
		yM *= coef;

		x = xM * Math.cos (0) + yM * Math.sin (0) + Ox;
		y = - xM * Math.sin (0) + yM * Math.cos (0) + Oy;
		return ([Math.round (x), Math.round (y)]);
	}
		//----------------------------------
    // corners need to be a array for Xy point wuich folow
    // x and y are point to test
    tools_pointInsidePolygone(corners , x, y ) {
        //adapted from https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon?answertab=trending#tab-top
        var i, j=corners.length-1 ;
        var odd = false;
        for (i=0; i<corners.length; i++) {
            if ((corners[i][1]< y && corners[j][1]>=y ||  corners[j][1]< y && corners[i][1]>=y)
                && (corners[i][0]<=x || corners[j][0]<=x)) {
                odd ^= (corners[i][0] + (y-corners[i][1])*(corners[j][0]-corners[i][0])/(corners[j][1]-corners[i][1])) < x; 
            }
            j=i; 
        }
        return odd;
    }
	//----------------------------------


}