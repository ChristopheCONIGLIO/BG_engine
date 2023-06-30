

class objFolowTarget extends BG_circleBorder{
    // ---------------------
    
    constructor(velX,velY,next_pts,bg,onBoard,fixed,layer,pX,pY,size,color,border,colorborder,fond) {
        super(bg,onBoard,fixed,layer,pX,pY,size,color,border,colorborder,fond);
        this.velX = velX;
        this.velY = velY;
        this.next_pts = next_pts;
        TOTAL_OBJ++;

        this.velo = 0.2;
        let veloPlus = Math.random();
        this.setDim(this.getDim()*(1-veloPlus));
        this.velo += veloPlus;
        this.setColor(LIST_PTS_TARGET_COLOR[this.next_pts]);
    }
    drawObj(decX,decY,zoom){
        super.drawObj(decX,decY,zoom);
        this.p_pX += this.velX;
        this.p_pY += this.velY;
        
        this.velX/=1.1;
        this.velY/=1.1;



        
        let sgX = Math.sign(this.p_pX - LIST_PTS_TARGET[this.next_pts][0] );
        let sgY = Math.sign(this.p_pY - LIST_PTS_TARGET[this.next_pts][1] );
        let disX = Math.abs( this.p_pX - LIST_PTS_TARGET[this.next_pts][0] );
        let disY = Math.abs( this.p_pY - LIST_PTS_TARGET[this.next_pts][1] );
        let pcX = disX/(disX+disY);
        let pcY = disY/(disX+disY);
        this.velX += -sgX*this.velo*pcX;
        this.velY += -sgY*this.velo*pcY;
        
        
        let geofunc = new Geometry();

        if( geofunc.distance(this.p_pX,this.p_pY,LIST_PTS_TARGET[this.next_pts][0],LIST_PTS_TARGET[this.next_pts][1]) < 15){
            this.next_pts++;
            if( this.next_pts >= LIST_PTS_TARGET.length) this.next_pts = 0;
            this.setColor(LIST_PTS_TARGET_COLOR[this.next_pts]);
            
            this.velX *=2.5;
            this.velY *=2.5;
            this.velX += Math.random()*20-10;
            this.velY += Math.random()*20-10;

            if( this.p_bg.bg_g_stat.getRenderEngineFpsLisse() < FPSTARGET &&
                TOTAL_OBJ>200){
                this.p_bg.deleteObject(this);
                TOTAL_OBJ--;
            }



        }
    }
}