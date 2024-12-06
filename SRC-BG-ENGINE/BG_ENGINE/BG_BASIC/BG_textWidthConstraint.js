/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_textWidthConstraint extends BG_coreObjectBasic{
	constructor(bg,onBoard,fixed,layer,pX,pY,size,widthConstraint,color) {
		if( color == undefined){
			console.error("BG_textWidthConstraint bad initialisation");
		}
		
		super(bg,onBoard,fixed,layer,pX,pY,0,0,color);
		this.p_size = size;
			
		this.p_bg.addObject(this,this.p_layer);

		this.widthConstraint = widthConstraint;
		this.font = "Arial";
		this.text = "";
		this.arrayLines = new Array();
		this.bold = false;

	}
	
	/* 
		fonctions public
	*/

	setFont(value){
		this.font = value; 
	}
	getFont(){
		return this.font;
	}
	setBold(value){
		if( value != true && value != false) this.bold = false;
		this.bold = value; 
	}
	getBold(){
		return this.bold;
	}

	setPos(pX,pY){
		this.p_pX = pX;
		this.p_pY = pY;
	}
	setPosX(pX){
		this.p_pX = pX;
	}
	setPosY(pY){
		this.p_pY = pY;
	}
	getPosX(){
		return this.p_pX;
	}
	getPosY(){
		return this.p_pY;
	}

	setDim(arg){
		this.p_size = arg;
	}
	getDim(){
		return this.p_size;
	}

	setText(text){
		this.text = text;
		var info = this.getLocalInfo();
		this.prepareLines(info[4],info[5]);
	}
	getText(text){
		return this.text;
	}
	getWidthText(){	//la taille sans le zoom
		this.p_ctx.font = this.macroTraceCssText(1);
		return this.p_ctx.measureText(this.text).width;
	}
	getWidthTextWithZoom(zoom){	//la taille dépend du zoom de la carte !!!!!
		this.p_ctx.font = this.macroTraceCssText(zoom);
		let temp_width = this.p_ctx.measureText(this.text).width;
		if( temp_width > this.widthConstraint*zoom) temp_width = this.widthConstraint*zoom;
		return temp_width;
	}
	getHeightTextWithZoom(zoom) {
		const words = this.text.split(' ');
		let line = '';
		let lineNumber = 1;
		let maxHeight = 0;
		let textH = 0;

		for (let i = 0; i < words.length; i++) {
			const testLine = line + words[i] + ' ';
			const metrics = this.p_ctx.measureText(testLine);
			textH = metrics.actualBoundingBoxAscent
			const testWidth = metrics.width;
	
			if (testWidth > this.widthConstraint*zoom && i > 0) {
				maxHeight +=  textH * 1.4 * zoom;
				line = words[i] + ' ';
				lineNumber++;
			} else {
				line = testLine;
			}
		}
		maxHeight = lineNumber*textH * 1.4 ;
		return maxHeight;
	}
	
 	//----------------------------------






	
	drawObj(decX,decY,zoom){
		if( this.visible == true){
			
			var info = this.getLocalInfo();
			let px  = info[0];
			let py  = info[1];
			let pSX = info[2];
			let pSY = info[3];
			let size = info[4];
			let widthConstraint = info[5];
			
			//determine if form must be draw
			if( px-pSX > this.stat.getScreenWidth())	return;
			if( py-this.p_size-pSY > this.stat.getScreenHeight())	return;
			if( px + pSX < 0)		return;
			if( py-this.p_size + pSY < -(size*this.p_size))		return;
			if( this.p_bg.debugContour == true) this.drawLimitContour(px,py-this.p_size,pSX,pSY);
			
			// draw the form
			this.drawText(px,py,size,widthConstraint);	
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}
	
	 
	/* 
		locales functions 
	*/
	
	/*
	prepareLines(zoom,widthConstraint){
		this.arrayLines = new Array();
		const words = this.text.split(' ');
		let line = '';
		let lineNumber = 1; 
		for (let i = 0; i < words.length; i++) {
			const testLine = line + words[i] + ' ';
			const metrics = this.p_ctx.measureText(testLine);
			const testWidth = metrics.width;
			if (testWidth > widthConstraint && i > 0) {
				this.arrayLines.push(line);
				line = words[i] + ' ';
				lineNumber++;
			} else {
				line = testLine; // Continue à accumuler la ligne
			}
		}
		if (line) this.arrayLines.push(line);
	}*/
	prepareLines(zoom, widthConstraint) {
		this.arrayLines = new Array();
		const words = this.text.split(' ');
		let line = '';
		let lineNumber = 1; 
	
		// Séparation du texte en fonction des retours à la ligne explicites
		const lines = this.text.split('\n');  // Divise le texte par les sauts de ligne explicites
	
		for (let j = 0; j < lines.length; j++) {
			const lineText = lines[j];
			const lineWords = lineText.split(' ');  // Sépare chaque ligne en mots
	
			for (let i = 0; i < lineWords.length; i++) {
				const testLine = line + lineWords[i] + ' ';
				const metrics = this.p_ctx.measureText(testLine);
				const testWidth = metrics.width;
	
				// Si la largeur dépasse la contrainte et il y a déjà des mots dans la ligne
				if (testWidth > widthConstraint && i > 0) {
					this.arrayLines.push(line); // Ajouter la ligne à l'array
					line = lineWords[i] + ' '; // Démarrer une nouvelle ligne avec le mot actuel
					lineNumber++;
				} else {
					line = testLine; // Continue à accumuler les mots dans la ligne
				}
			}
	
			// Si après avoir traité tous les mots dans la ligne, il reste du texte, ajouter cette ligne
			if (line) {
				this.arrayLines.push(line);
				line = ''; // Réinitialiser pour la prochaine ligne
			}
		}
	}
	
	
	macroTraceCssText(zoom){
		if( this.bold == true)	return "bold "+((zoom*this.p_size)) +"px "+this.font;
		else					return ((zoom*this.p_size)) +"px "+this.font;
	}
	
	drawText(x, y ,zoom,widthConstraint) {
		let lineHeight = zoom*this.p_size * 1.3; 
		let textHeight = lineHeight*this.arrayLines.length;
		if( this.rotation != 0){
			this.p_ctx.translate(x+widthConstraint/2,y+textHeight/2);
			this.p_ctx.rotate(this.rotation * Math.PI / 180);
			this.p_ctx.translate(-x-widthConstraint/2,-y-textHeight/2);
		}
		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.font = this.macroTraceCssText(zoom);
		this.p_ctx.fillStyle = this.p_color;
		for (let i = 0; i < this.arrayLines.length; i++) {
			this.p_ctx.fillText(this.arrayLines[i], x, y + (i) * lineHeight);
		}
		this.stat.setRenderEngineObject(this.stat.getRenderEngineObject() + 1);
		this.p_ctx.globalAlpha = 1;
	
		if (this.rotation != 0) {
			this.p_ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}


	getLocalInfo(){
		let decX = this.p_bg.decXwithZoom;
		let decY = this.p_bg.decYwithZoom;
		let zoom = this.p_bg.zoomLevel;
		
		
		let px,py,pSX,pSY,size,widthConstraint;
		if( this.p_fixedSize == true){
			
			pSX = this.getWidthTextWithZoom(1.0);
			pSY = this.getHeightTextWithZoom(1.0);
			px = decX+this.p_pX*zoom - pSX/2;
			py = decY+this.p_pY*zoom + pSY/2;
			size = 1.0;
			widthConstraint = this.widthConstraint;
		}
		else if( this.p_onBoard == true){
			// calcul limit of form
			px = decX+this.p_pX*zoom;
			//py = (zoom*this.p_size) + decY+this.p_pY*zoom;
			py =    (zoom*this.p_size) + decY+this.p_pY*zoom;
			pSX = this.getWidthTextWithZoom(zoom);
			pSY = this.getHeightTextWithZoom(zoom);
			size = zoom;	
			widthConstraint = this.widthConstraint*zoom;
		}
		else{
			// calcul limit of form
			px = this.p_pX;
			py = this.p_size + this.p_pY;
			pSX = this.getWidthTextWithZoom(1.0);
			pSY = this.getHeightTextWithZoom(1.0);
			size = 1.0;
			widthConstraint = this.widthConstraint;
		}
		let lineHeight = zoom*this.p_size * 1.3; 
		let textHeight = lineHeight*this.arrayLines.length;
		
		return [px,py,widthConstraint,textHeight,size,widthConstraint];
	}

	

	getInfoPoints(){
		var info = this.getLocalInfo();
		let px  = info[0];
		let py  = info[1];
		let pSX = info[2];
		let pSY = info[3];
		let size = info[4];
		

		//local corection ?		
		py -= size*this.p_size;
		//with this adjustment the 4 poitns are very correct Good !!!

		let array4points = new Array([0,0],[0,0],[0,0],[0,0]); //limit position
		//calcul 4 points
		let cx = px+pSX/2;
		let cy = py+pSY/2;
		array4points[0][0] =  cx + pSX/2;
		array4points[0][1] =  cy + pSY/2;
		array4points[1][0] =  cx - pSX/2;
		array4points[1][1] =  cy + pSY/2;
		array4points[3][0] =  cx + pSX/2;
		array4points[3][1] =  cy - pSY/2;
		array4points[2][0] =  cx - pSX/2;
		array4points[2][1] =  cy - pSY/2;
		var tab = this.tools_rotatePointFromCenter (array4points[0][0],array4points[0][1], cx,cy, this.rotation);
		array4points[0][0] = tab[0];
		array4points[0][1] = tab[1];
		tab = this.tools_rotatePointFromCenter (array4points[1][0],array4points[1][1], cx,cy, this.rotation);
		array4points[1][0] = tab[0];
		array4points[1][1] = tab[1];
		tab = this.tools_rotatePointFromCenter (array4points[2][0],array4points[2][1], cx,cy, this.rotation);
		array4points[2][0] = tab[0];
		array4points[2][1] = tab[1];
		tab = this.tools_rotatePointFromCenter (array4points[3][0],array4points[3][1], cx,cy, this.rotation);
		array4points[3][0] = tab[0];
		array4points[3][1] = tab[1];
		return array4points;
	}


	getMouseOver(){
		var array4points = this.getInfoPoints();
		
		this.drawExactContour(array4points);
		this.mouseOver = this.tools_pointInsidePolygone(
				array4points,
				this.p_bg.mouseX,
				this.p_bg.mouseY
				);
		return this.mouseOver;
	}

	
	drawExactContour(arr){	 //arr = tab of four points	
		this.p_ctx.beginPath();
		this.p_ctx.moveTo(arr[0][0],arr[0][1]);
		this.p_ctx.lineTo(arr[1][0],arr[1][1]);
		this.p_ctx.lineTo(arr[2][0],arr[2][1]);
		this.p_ctx.lineTo(arr[3][0],arr[3][1]);
		this.p_ctx.lineTo(arr[0][0],arr[0][1]);
		this.p_ctx.lineWidth = 4;
		this.p_ctx.strokeStyle = "#FF0000";
		this.p_ctx.stroke();
	}


}
