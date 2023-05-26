

function loadBGengine(relativePathImport) {
    // LOAD JS CODE = NOT ESSENTIAL (for demo)
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/NOT_ESSENTIAL/COLOR_FUNCTION/HandleColor.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/NOT_ESSENTIAL/COLOR_FUNCTION/Geometry.js'></script>");
    // LOAD JS CODE = CORE 
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_ENGINE/BG_CORE/BG_coreObjectBasic.js'></script>");  
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_ENGINE/BG_CORE/BG_coreStatistique.js'></script>");  
    // LOAD JS CODE = BASIC OBJECT  
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_ENGINE/BG_BASIC/BG_circle.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_ENGINE/BG_BASIC/BG_circleBorder.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_ENGINE/BG_BASIC/BG_text.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_rect.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_rectBorder.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_line.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_script.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_polygone.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_polygoneBorder.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_roundRect.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_roundRectBorder.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_BASIC/BG_drawImage.js'></script>");
    // LOAD JS CODE = EVENT
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_ENGINE/BG_EVENT/BG_eventMouse.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_ENGINE/BG_EVENT/BG_eventTouch.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_ENGINE/BG_EVENT/BG_eventWheel.js'></script>");
    // LOAD JS CODE = CORE Part2
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_engine/BG_CORE/BG_engine.js'></script>");
    // LOAD JS CODE = collision engine
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_COLISSION/BG_collision.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_COLISSION/BG_collisionParametricLine.js'></script>");
    document.write("<script type='text/javascript' src='"+relativePathImport+"/SRC-BG-ENGINE/BG_COLISSION/BG_collisionEngCir.js'></script>");
}
