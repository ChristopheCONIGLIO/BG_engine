/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_script{
	constructor(bg) {
		this.p_bg = bg;
		this.p_bg.addScript(this);
	}
	destructor(){
	}

	enterFrame(){
        //execute some code
	}

}

// example of use to copy
/*
class monCode extends BG_script{
	constructor(bg) {
		super(bg); // bg accès by this variable -> this.p_bg
	}

	enterFrame(){
        //execute some code
	}

}*/