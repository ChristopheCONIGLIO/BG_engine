class BG_coreRoutine {
	constructor(bg_g_stat,bg_g_context,bg_g_listObj,bg_g_listObjUnload) {
		this.bg_g_stat		= bg_g_stat;
		this.bg_g_listObj	= bg_g_listObj;
		this.bg_g_context	= bg_g_context;
		this.bg_g_listObjUnload = bg_g_listObjUnload;
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

		this.textDebug = new BG_text(this.bg_g_stat,this.bg_g_context,200,0,30,colorHandler.rgb(50,50,50));
		this.bg_g_listObj[8].push( this.textDebug );

		this.cicleTestGreen = new BG_circle(this.bg_g_stat,this.bg_g_context,150,150,50,colorHandler.rgb(0,255,0));
		this.bg_g_listObj[8].push( this.cicleTestGreen );

		this.rectangleRouge = new BG_rect(this.bg_g_stat,this.bg_g_context,150,350,50,50,colorHandler.rgb(255,0,0));
		this.bg_g_listObj[8].push( this.rectangleRouge );

		this.rectangleVert = new BG_rect(this.bg_g_stat,this.bg_g_context,350,350,200,200,colorHandler.rgb(0,255,50));
		this.bg_g_listObj[8].push( this.rectangleVert );
		this.rectangleBleu = new BG_rect(this.bg_g_stat,this.bg_g_context,350,350,200,200,colorHandler.rgb(50,0,255));
		this.bg_g_listObj[8].push( this.rectangleBleu );

		this.rectangleRougeRound = new BG_roundRect(this.bg_g_stat,this.bg_g_context,550,100,50,50,10,colorHandler.rgb(255,0,0));
		this.bg_g_listObj[7].push( this.rectangleRougeRound );

		this.rectangleVertRound = new BG_roundRect(this.bg_g_stat,this.bg_g_context,950,100,200,200,30,colorHandler.rgb(0,255,50));
		this.bg_g_listObj[8].push( this.rectangleVertRound );
		this.rectangleBleuRound = new BG_roundRect(this.bg_g_stat,this.bg_g_context,950,100,200,200,60,colorHandler.rgb(50,0,255));
		this.bg_g_listObj[8].push( this.rectangleBleuRound );
		
		


		this.image = new BG_drawImage(this.bg_g_stat,this.bg_g_context,800,350,200,200,"./graphics_ressources/DEMO/carte.jpg");
		this.bg_g_listObj[0].push( this.image );

		this.image2 = new BG_drawImage(this.bg_g_stat,this.bg_g_context,1100,350,200,200,"./graphics_ressources/DEMO/carte.jpg");
		this.bg_g_listObj[0].push( this.image2 );
		this.image3 = new BG_drawImage(this.bg_g_stat,this.bg_g_context,1100,350,200,200,"./graphics_ressources/DEMO/carte.jpg");
		this.bg_g_listObj[0].push( this.image3 );
		
		
		this.text1 = new BG_text(this.bg_g_stat,this.bg_g_context,200,700,30,colorHandler.rgb(0,255,100));
		this.text1.setText("test text1");
		this.bg_g_listObj[8].push( this.text1 );

		this.text2 = new BG_text(this.bg_g_stat,this.bg_g_context,500,700,60,colorHandler.rgb(100,255,100));
		this.text2.setText("test text2");
		this.bg_g_listObj[8].push( this.text2 );
		this.text3 = new BG_text(this.bg_g_stat,this.bg_g_context,500,700,60,colorHandler.rgb(255,255,100));
		this.text3.setText("test text3");
		this.bg_g_listObj[8].push( this.text3 );
		
		

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
		this.cicleTestGreen.setDimX(this.stateDimX);
		


		/*

		montre les objets rect

		*/
		if( this.stateVisible == 0)			this.rectangleRouge.setVisible(false);
		else								this.rectangleRouge.setVisible(true);					
		this.rectangleRouge.setAlpha(this.counterAlpha);
		this.rectangleRouge.setDimX(this.stateDimX);
		this.rectangleRouge.setDimY(this.stateDimY);
		this.rectangleRouge.setRotation(this.stateRotation);
		
		this.rectangleBleu.setRotation(this.stateRotation);


		if( this.stateVisible == 0)			this.rectangleRougeRound.setVisible(false);
		else								this.rectangleRougeRound.setVisible(true);					
		this.rectangleRougeRound.setAlpha(this.counterAlpha);
		this.rectangleRougeRound.setDimX(this.stateDimX);
		this.rectangleRougeRound.setDimY(this.stateDimY);
		this.rectangleRougeRound.setRotation(this.stateRotation);
		
		this.rectangleBleuRound.setRotation(this.stateRotation);


		/*

		montre les objets img

		*/
		if( this.stateVisible == 0)			this.image.setVisible(false);
		else								this.image.setVisible(true);					
		this.image.setAlpha(this.counterAlpha);
		this.image.setDimX(this.stateDimX);
		this.image.setDimY(this.stateDimY);
		this.image.setRotation(this.stateRotation);
		
		this.image3.setRotation(this.stateRotation);


		/*

		montre les objets text

		*/
		if( this.stateVisible == 0)			this.text1.setVisible(true);
		else								this.text1.setVisible(false);					
		this.text1.setAlpha(this.counterAlpha);
		this.text1.setDim(this.stateDimX/2);
		this.text1.setRotation(this.stateRotation);
		
		this.text3.setRotation(this.stateRotation);



		// MAJ le test de debug
		this.textDebug.setText(			""+Math.round(this.bg_g_stat.getRenderEngineFpsLisse())+
									"fps / "+Math.round(this.bg_g_stat.getRenderEngineTimeLisse())+"ms / "+
									this.bg_g_stat.getRenderEngineObject()+" rnd"
									);


	
	}
	/* ------------------------------- */
	/* ------------------------------- */
	/* ------------------------------- */

}
