function generateFlash(menuID,movieName,fileLocation,theWidth,theHeight){
	var theFlashOBJString = "";
	theFlashOBJString += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" id="' + movieName +'" width="' + theWidth +'" height="' + theHeight +'">';
	theFlashOBJString += '<param name="wmode" value="transparent">';
	theFlashOBJString += '<param name="menu" value="false">';                    
	theFlashOBJString += '<param name=movie value="' + fileLocation + '?selectedMenuItem=' + menuID +'">';
	theFlashOBJString += '<param name=quality value=high>';
	theFlashOBJString += '<param name="AllowScriptAccess" value="Always" />';
	theFlashOBJString += '<param name=play value=false>';
	theFlashOBJString += '<param name=exactfit value=true>';
	theFlashOBJString += '<embed play=false swliveconnect="true" name="' + movieName + '" src="' + fileLocation + '?selectedMenuItem=' + menuID +'" quality=high  width="' + theWidth +'" height="' + theHeight +'" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed ></object >';
	document.write(theFlashOBJString);
}

function generateImageMenu(){
document.write("<a href=\"../pages/default.aspx\" onmouseout=\"MM_swapImgRestore()\" onmouseover=\"MM_swapImage('Home','','../images/link_home_on.jpg',1)\"><img src=\"../images/link_home_off.jpg\" alt=\"Home\" title=\"Home\" name=\"Home\" width=\"74\" height=\"50\" border=\"0\" id=\"Home\" /></a>");
document.write("<a href=\"../pages/profile.aspx\" onmouseout=\"MM_swapImgRestore()\" onmouseover=\"MM_swapImage('Profile','','../images/link_profile_on.jpg',1)\"><img title=\"Profile\" src=\"../images/link_profile_off.jpg\" alt=\"Profile\" name=\"Profile\" width=\"74\" height=\"50\" border=\"0\" id=\"Profile\" /></a>");
document.write("<a href=\"../pages/products.aspx\" onmouseout=\"MM_swapImgRestore()\" onmouseover=\"MM_swapImage('Products','','../images/link_products_on.jpg',1)\"><img title=\"Products\" src=\"../images/link_products_off.jpg\" alt=\"Products\" name=\"Products\" width=\"96\" height=\"50\" border=\"0\" id=\"Products\" /></a>");
document.write("<a href=\"../pages/partners.aspx\" onmouseout=\"MM_swapImgRestore()\" onmouseover=\"MM_swapImage('Partners','','../images/link_partners_on.jpg',1)\"><img  title=\"Partners\" src=\"../images/link_partners_off.jpg\" alt=\"Partners\" name=\"Partners\" width=\"92\" height=\"50\" border=\"0\" id=\"Partners\" /></a>");
document.write("<a href=\"../pages/downloads.aspx\" onmouseout=\"MM_swapImgRestore()\" onmouseover=\"MM_swapImage('Downloads','','../images/link_downloads_on.jpg',1)\"><img title=\"Downloads\" src=\"../images/link_downloads_off.jpg\" alt=\"Downloads\" name=\"Downloads\" width=\"109\" height=\"50\" border=\"0\" id=\"Downloads\" /></a>");
document.write("<a href=\"../pages/onlinesupport.aspx\" onmouseout=\"MM_swapImgRestore()\" onmouseover=\"MM_swapImage('OnlineSupport','','../images/link_onlinesupport_on.jpg',1)\"><img title=\"Online Support\" src=\"../images/link_onlinesupport_off.jpg\" alt=\"Online Support\" name=\"OnlineSupport\" width=\"134\" height=\"50\" border=\"0\" id=\"OnlineSupport\" /></a>");
document.write("<a href=\"../pages/mailinglist.aspx\" onmouseout=\"MM_swapImgRestore()\" onmouseover=\"MM_swapImage('Mailinglist','','../images/link_mailinglist_on.jpg',1)\"><img title=\"Mailing List\" src=\"../images/link_mailinglist_off.jpg\" alt=\"Mailinglist\" name=\"Mailinglist\" width=\"106\" height=\"50\" border=\"0\" id=\"Mailinglist\" /></a>");
document.write("<a href=\"../pages/contact.aspx\" onmouseout=\"MM_swapImgRestore()\" onmouseover=\"MM_swapImage('Contact','','../images/link_contactus_on.jpg',1)\"><img src=\"../images/link_contactus_off.jpg\" alt=\"Contact us\" name=\"Contact\" width=\"105\" height=\"50\" border=\"0\" id=\"Contact\" title=\"Contact Us\" /></a>");
	
}