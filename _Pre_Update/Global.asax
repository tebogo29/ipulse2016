<%@ Application Language="C#" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e) 
    {
        // Code that runs on application startup

    }
    
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown

    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }

    void Application_BeginRequest(object sender, EventArgs e)
    {
        if (Request.ServerVariables["SCRIPT_NAME"].ToString().ToLower().IndexOf("/productdetails/") != -1)
        {
            HttpContext httpContext = HttpContext.Current;
            string currentURL = Request.ServerVariables["PATH_INFO"];
            currentURL = currentURL.ToLower().Replace("/productdetails/", "");
            string[] strArr = currentURL.Split('/');
            httpContext.RewritePath("/product?title=" + currentURL + "");
        }
        //else if (Request.ServerVariables["SCRIPT_NAME"].ToString().ToLower().IndexOf("/product/") != -1)
        //{
        //    HttpContext httpContext = HttpContext.Current;
        //    string currentURL = Request.ServerVariables["PATH_INFO"];
        //    currentURL = currentURL.ToLower().Replace("/product/", "");
        //    string[] strArr = currentURL.Split('/');
        //    httpContext.RewritePath("/products/product?id=" + strArr[0] + "&title=" + currentURL.Replace(strArr[0] + "/", "") + "");
        //}
    }
</script>
