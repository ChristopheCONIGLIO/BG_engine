class BG_coreRoutine {
	constructor(bg) {
		this.bg = bg;
		this.bg_g_stat		= bg.bg_g_stat;
		this.bg_g_listObj	= bg.bg_g_listObj;
		this.bg_g_context	= bg.bg_g_context;
		this.bg_g_listObjUnload = bg.bg_g_listObjUnload;
	}
	
	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */
	initialisation(){
		
		//variable to show visible action of objetc
		this.counterVisible = 0;
		this.stateVisible = 0;
		this.counterAlpha = Math.random();
		this.stateAlpha = 0.05;
		this.stateDimX = 50;
		this.stateDimY = 50;
		this.stateDimXvalue = 5;
		this.stateDimYvalue = 5;
		this.stateRotation = 0;

		var colorHandler = new HandleColor();		

		this.textDebug1OutBoard = new BG_text(this.bg,false,0,0,30,colorHandler.rgb(50,50,50));
		this.bg.addObject(this.textDebug1OutBoard,11);



		this.textDebug2OutBoard = new BG_text(this.bg,false,0,30,15,colorHandler.rgb(100,200,50));
		this.bg.addObject(this.textDebug2OutBoard,11);
		this.textDebug3OutBoard = new BG_text(this.bg,false,0,45,15,colorHandler.rgb(100,200,50));
		this.bg.addObject(this.textDebug3OutBoard,11);
		this.textDebug4OutBoard = new BG_text(this.bg,false,0,60,15,colorHandler.rgb(100,200,50));
		this.bg.addObject(this.textDebug4OutBoard,11);

		//déclaration des cercles
		this.cicleTestGreen = new BG_circle(this.bg,true,150,150,50,colorHandler.rgb(0,255,0));
		this.bg.addObject(this.cicleTestGreen,8);
		this.cicleOutBoard = new BG_circle(this.bg,false,350,10,50,colorHandler.rgb(0,255,0));
		this.bg.addObject(this.cicleOutBoard,11);

		//déclaration des rectangle et rectangle arreondis
		this.rectangleRouge = new BG_rect(this.bg,true,150,350,50,50,colorHandler.rgb(255,0,0));
		this.bg.addObject(this.rectangleRouge,8);
		this.rectangleRougeOutBoard = new BG_rect(this.bg,false,400,10,50,50,colorHandler.rgb(255,0,0));
		this.bg.addObject(this.rectangleRougeOutBoard,11);

		this.rectangleVert = new BG_rect(this.bg,true,350,350,200,200,colorHandler.rgb(0,255,50));
		this.bg.addObject(this.rectangleVert,8);
		this.rectangleBleu = new BG_rect(this.bg,true,350,350,200,200,colorHandler.rgb(50,0,255));
		this.bg.addObject(this.rectangleBleu,8);

		this.rectangleRougeRound = new BG_roundRect(this.bg,true,550,100,50,50,10,colorHandler.rgb(255,0,0));
		this.bg.addObject(this.rectangleRougeRound,7);
		this.rectangleRougeRoundOutBoard = new BG_roundRect(this.bg,false,450,10,50,50,10,colorHandler.rgb(255,120,120));
		this.bg.addObject(this.rectangleRougeRoundOutBoard,11);

		this.rectangleVertRound = new BG_roundRect(this.bg,true,950,100,200,200,30,colorHandler.rgb(0,255,50));
		this.bg.addObject(this.rectangleVertRound,8);
		this.rectangleBleuRound = new BG_roundRect(this.bg,true,950,100,200,200,60,colorHandler.rgb(50,0,255));
		this.bg.addObject(this.rectangleBleuRound,8);
		
		

		//déclaration image
		this.image = new BG_drawImage(this.bg,true,800,350,200,200,"./JS-CORE-ENGINE/NOT_ESSENTIAL/IMAGE/openImage.jpeg");
		this.bg.addObject(this.image,8);
		this.imageOutBoard = new BG_drawImage(this.bg,false,550,10,50,50,"./JS-CORE-ENGINE/NOT_ESSENTIAL/IMAGE/openImage.jpeg");
		this.bg.addObject(this.imageOutBoard,8);


		this.image2 = new BG_drawImage(this.bg,true,1100,350,200,200,"./JS-CORE-ENGINE/NOT_ESSENTIAL/IMAGE/openImage.jpeg");
		this.bg.addObject(this.image2,8);
		this.image3 = new BG_drawImage(this.bg,true,1100,350,200,200,"./JS-CORE-ENGINE/NOT_ESSENTIAL/IMAGE/openImage.jpeg");
		this.bg.addObject(this.image3,8);
		
		
		this.text1 = new BG_text(this.bg,true,200,700,30,colorHandler.rgb(0,255,100));
		this.text1.setText("test text1");
		this.bg.addObject(this.text1,8);

		this.text2 = new BG_text(this.bg,true,500,700,60,colorHandler.rgb(100,255,100));
		this.text2.setText("test text2");
		this.bg.addObject(this.text2,8);
		this.text3 = new BG_text(this.bg,true,500,700,60,colorHandler.rgb(255,255,100));
		this.text3.setText("test text3");
		this.bg.addObject(this.text3,8);
		
		
		this.line1 = new BG_line(this.bg,true,900,700,1200,700,30,colorHandler.rgb(0,255,100));
		this.bg.addObject(this.line1,8);
		this.line1OutBoard = new BG_line(this.bg,false,600,35,650,35,10,colorHandler.rgb(0,155,255));
		this.bg.addObject(this.line1OutBoard,8);

		this.line2 = new BG_line(this.bg,true,1400,700,1600,800,15,colorHandler.rgb(0,255,200));
		this.bg.addObject(this.line2,8);

		this.line3 = new BG_line(this.bg,true,1400,700,1600,800,15,colorHandler.rgb(125,0,200));
		this.bg.addObject(this.line3,8);

		//2 var juste pour déplacer à loisir le polygone
		var bX = 1400;
		var bY = 150; 
		var arrayPoint = [[bX,bY],[bX+80,bY],[bX+110,bY+120],[bX+50,bY+50],[bX+0,bY+100]];
		this.poly1 = new BG_polygone(this.bg,true,arrayPoint,colorHandler.rgb(255,5,100));
		this.bg.addObject(this.poly1,8);
		bX+=300;
		this.poly2 = new BG_polygone(this.bg,true,[[bX,bY],[bX+80,bY],[bX+110,bY+120],[bX+50,bY+50],[bX+0,bY+100]],colorHandler.rgb(0,115,150));
		this.bg.addObject(this.poly2,8);
		this.poly3 = new BG_polygone(this.bg,true,[[bX,bY],[bX+80,bY],[bX+110,bY+120],[bX+50,bY+50],[bX+0,bY+100]],colorHandler.rgb(255,255,100));
		this.bg.addObject(this.poly3,8);

		bX = 500;
		bY = 10; 
		arrayPoint = [[bX,bY],[bX+50,bY],[bX+25,bY+50]];
		this.polyOutBoard = new BG_polygone(this.bg,false,arrayPoint,colorHandler.rgb(255,5,100));
		this.bg.addObject(this.polyOutBoard,8);


	}
	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */


	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */
	enterFrame(){
		
		/*

		MAJ les compteur pour manipuler les objet

		*/

		this.counterVisible++;
		if( this.counterVisible > 100){
			if( this.stateVisible == 0) 	this.stateVisible = 1;
			else							this.stateVisible = 0;
			this.counterVisible = 0;
		}
		this.counterAlpha+=this.stateAlpha;
		if( this.counterAlpha < 0 ){
			this.counterAlpha = 0;
			this.stateAlpha = 0.05;
		}
		if( this.counterAlpha > 1 ){
			this.counterAlpha = 1;
			this.stateAlpha = -0.05;
		}

		this.stateDimX+=this.stateDimXvalue;
		if( this.stateDimX > 200 ){
			this.stateDimX = 200;
			this.stateDimXvalue = -2;
		}
		if( this.stateDimX < 25 ){
			this.stateDimX = 25;
			this.stateDimXvalue = 2;
		}
		this.stateDimY+=this.stateDimYvalue;
		if( this.stateDimY > 200 ){
			this.stateDimY = 200;
			this.stateDimYvalue = -5;
		}
		if( this.stateDimY < 25 ){
			this.stateDimY = 25;
			this.stateDimYvalue = 5;
		}
		this.stateRotation++;
		if( this.stateRotation>=360)	this.stateRotation = 0;
		
		/*

		montre l'objet cercle

		*/
		if( this.stateVisible == 0)			this.cicleTestGreen.setVisible(true);
		else								this.cicleTestGreen.setVisible(false);					
		this.cicleTestGreen.setAlpha(this.counterAlpha);
		this.cicleTestGreen.setDim(this.stateDimX);
		


		/*

		montre les objets rect

		*/
		if( this.stateVisible == 0)			this.rectangleRouge.setVisible(false);
		else								this.rectangleRouge.setVisible(true);					
		this.rectangleRouge.setAlpha(this.counterAlpha);
		this.rectangleRouge.setDim(this.stateDimX,this.stateDimY);
		this.rectangleRouge.setRotation(this.stateRotation);

		this.rectangleRougeOutBoard.setRotation(this.stateRotation);
		
		this.rectangleBleu.setRotation(this.stateRotation);


		if( this.stateVisible == 0)			this.rectangleRougeRound.setVisible(false);
		else								this.rectangleRougeRound.setVisible(true);					
		this.rectangleRougeRound.setAlpha(this.counterAlpha);
		this.rectangleRougeRound.setDim(this.stateDimX,this.stateDimY);
		this.rectangleRougeRound.setRotation(this.stateRotation);
		
		this.rectangleBleuRound.setRotation(this.stateRotation);
		this.rectangleRougeRoundOutBoard.setRotation(this.stateRotation);

		/*

		montre les objets img

		*/
		if( this.stateVisible == 0)			this.image2.setVisible(false);
		else								this.image2.setVisible(true);					
		this.image.setAlpha(this.counterAlpha);
		this.image.setDim(this.stateDimX,this.stateDimY);
		this.image.setRotation(this.stateRotation);
		
		this.image3.setRotation(this.stateRotation);
		this.imageOutBoard.setRotation(this.stateRotation);

		/*

		montre les objets text

		*/
		if( this.stateVisible == 0)			this.text2.setVisible(true);
		else								this.text2.setVisible(false);					
		this.text1.setAlpha(this.counterAlpha);
		this.text1.setDim(this.stateDimX/2);
		this.text1.setRotation(this.stateRotation);
		
		this.text3.setRotation(this.stateRotation);


		/*

		montre les objets line

		*/
		if( this.stateVisible == 0)			this.line2.setVisible(true);
		else								this.line2.setVisible(false);					
		this.line1.setAlpha(this.counterAlpha);
		this.line1.setRotation(this.stateRotation);
		this.line3.setRotation(this.stateRotation);
		this.line3.setThickness(this.stateDimX/2);

		this.line1OutBoard.setRotation(this.stateRotation);

		/*

		montre les objets polygone

		*/
		if( this.stateVisible == 0)			this.poly2.setVisible(true);
		else								this.poly2.setVisible(false);					
		this.poly1.setAlpha(this.counterAlpha);
		
		var bX = 1400;
		var bY = 150; 
		var arrayPoint = [[bX,bY],[bX+80,bY],[bX+110,bY+120],[+this.stateDimX+bX+50,bY+this.stateDimX+50],[-this.stateDimX+bX+0,+this.stateDimX+bY+100]];
		this.poly1.setArrayPoint(arrayPoint);
		this.poly1.setRotation(this.stateRotation);
		
		this.poly3.setRotation(this.stateRotation);
		this.polyOutBoard.setRotation(this.stateRotation);


		// MAJ le test de debug
		this.textDebug1OutBoard.setText(	Math.round(this.bg_g_stat.getRenderEngineFpsLisse())+
										"fps / "+Math.round(this.bg_g_stat.getRenderEngineTimeLisse())+"ms / "+
										this.bg_g_stat.getRenderEngineObject()+" rnd"
										);
		this.textDebug2OutBoard.setText(	"mouseBoardX/Y="+Math.round(this.bg_g_stat.getMouseXBoard())+"/"+Math.round(this.bg_g_stat.getMouseYBoard()));
		this.textDebug3OutBoard.setText(	"mouseScreenX/Y="+Math.round(this.bg_g_stat.getMouseXScreen())+"/"+Math.round(this.bg_g_stat.getMouseYScreen()));
		this.textDebug4OutBoard.setText(	"mouseClick / mouseDown = "+this.bg_g_stat.getMouseClick()+"/"+this.bg_g_stat.getMouseDown() );
		


	
	}
	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */

}
