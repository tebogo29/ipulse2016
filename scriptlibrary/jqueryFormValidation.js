function checkRadio(leObj)
{
    tempString = "";
	
	if($('input[name=' + $(leObj).attr("name") + ']:checked').length == 0){
	 tempString = $(leObj).attr("title") + "\n";
	}
    
    return tempString;
    
}
 
function checkCB(leObj)
{
    tempString = "";
    
 
	if($('input[name=' + $(leObj).attr("name") + ']:checked').length == 0){
	 	tempString = $(leObj).attr("title")+ "\n";
	}
    
    return tempString;
    
}
 
function expressionCheck(str,expression){
	    var RegExpression =expression;
	    var regex = new RegExp(RegExpression);
		//alert((str));
    	if(regex.test(str)){
                return true;
	    }
    	else
	    {
    	    return false;
	    }
   	 return false;
} 
 
function doVal(){
     var theMessage="";
 
	$('[isRequired]').each(function(){
    	
        if($(this).attr("type") == "radio")
        {
              theMessage += checkRadio($(this));
        }
        else
        {
            if($(this).attr("regExp") != undefined)
            {
              if(!expressionCheck($(this).val(),$(this).attr("regExp"))){
               theMessage += $(this).attr("Title") + "\n";
              }
               
            }
            else
            {
                if($(this).attr("type") == "checkbox")
                {
                  
                      theMessage+= checkCB($(this));
           
                }
             else
			 	{
				   if($(this).val() == ""){
						theMessage += $(this).attr("Title") + "\n";
					}
                }
            }
        }
     
    });
	
	if(theMessage != ""){
		alert("Please complete all the following fields:\n\n" + theMessage);
		return false;
	}
	else
	{
		return true;
	}
}