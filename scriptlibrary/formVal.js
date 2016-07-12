// JavaScript Document

function rx(){
	return;	
}

function echeck(str) {
    var theTLDArray = new Array(".com",".co.",".com",".net",".org",".gov","gov.",".ac.",".info",".biz",".travel",".mobi",".edu",".mil",".asia",".coop",".int",".cat",".jobs",".tel",".pro",".name");
    var emailReg = "^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$";
    var regex = new RegExp(emailReg);
    if(regex.test(str)){
       // for(i=0;i<theTLDArray.length;i++){
    //        if( (str.indexOf(theTLDArray[i]) != -1 )  )
      //      {
                return true;
     //       }
    //    }
    }
    else
    {
        return false;
    }
    return false;
 }
 
 function ClearSearch(){
	document.forms[0].SearchText.value="";
}

function ClearJoin(){
	document.forms[0].EmailToJoin.value="";
}

function valNetEmail(theEmailObj)
{
	if(!echeck(theEmailObj.value)){
	    theEmailObj.value = "";
		alert('Please fill in valid email address.');
		return;
	}
}


function valIntPhoneNumber(theObj,phoneAlert){
   
   	phoneRe = "^[+][0-9]{11,15}$"
    var regex = new RegExp(phoneRe);
 	if ( theObj.value != ""){
		if(!regex.test(theObj.value)){
			 theObj.value = "";  
			 alert("Please provide your " + phoneAlert + " number in international format. ( e.g. +27123456789 )")
		}
	}
  
}


function valEmail()
{
	if(!echeck(document.forms[0].EmailToJoin.value)){
		alert('Please fill in valid email address.');
		return;
	}
	
	document.location.href=URLPRefix + "../pages/EmailJoin.aspx?EmailToJoin=" + document.forms[0].EmailToJoin.value;
	//document.forms[0].action=URLPRefix + "../pages/EmailJoin.aspx";
	//document.forms[0].submit();
}

function valSearch(){
	if((document.forms[0].SearchText.value =="keyword or product") || (document.forms[0].SearchText.value=="")){
		alert('Please fill in something to search for.');
		return;
	}
	document.location.href=URLPRefix + "../pages/search.aspx?search=" + document.forms[0].SearchText.value ;
	//document.forms[0].submit();
}

function AdvancedSearch(){
alert("X");
	if(document.getElementById("AdvancedSearchDiv").style.display == ""){
		document.getElementById("AdvancedSearchDiv").style.display = "none";		
	}
	else
	{
		document.getElementById("AdvancedSearchDiv").style.display = "";
	}
}

function selectRegion(formObj){
    if(formObj.value!=""){
        document.location.href= URLPRefix + formObj.value ;
    }
}