class Geometry{
	//----------------------------------

	constructor() {
	}
	//----------------------------------


	//----------------------------------
    pointInsideConvexCloud($tab,$px,$py){
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
    //----------------------------------

    /*angle2d(px1,py1,px2,py2){ TODO
        var delta_x = this.p_pX - pointPassage[0][0];
        var delta_y = this.p_pY - pointPassage[0][1];
        return angle = Math.atan2(delta_y, delta_x)
	}*/
   

    distance($c1Px,$c1Py,$c2Px,$c2Py){
		return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
	}




    //----------------------------------
    // Private function
    //----------------------------------
    calculAngle(p1x,p1y,p2x,p2y){
        var dtheta =  Math.atan2( p1y ,  p1x ) - Math.atan2( p2y ,  p2x ) ;
        while (dtheta > Math.PI)
          dtheta -= Math.PI*2;
        while (dtheta < -Math.PI)
          dtheta += Math.PI*2;
        return(dtheta);
    }
 	//----------------------------------
}