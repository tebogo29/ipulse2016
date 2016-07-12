using System;
using System.ComponentModel;
using System.Linq;
using System.Web.UI;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;

public partial class FWI_Modules_user_Testimonials : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        litTest.Text = getTestimonials();
    }
    string getTestimonials()
    {
        string strRet = "";
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.Testimonial");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Status == ContentLifecycleStatus.Live && i.Visible == true);
        
        int counter = 0;
        if (myCollection != null)
        {
            strRet += "<ul style=\"list-style: none;margin: 0;padding: 0 !important;\" testcount=\"" + myCollection.Count() + "\">";
            foreach (var item in myCollection)
            {
                counter++;

                string strActive = "";
                string strShow = "display:none";
                if (counter == 1)
                {
                    strActive = "TestActive";
                    strShow = "display:block";
                }

                strRet += "<li testimonial=\"" + counter + "\" style=\"" + strShow + "\" class=\"" + strActive + "\">" +
                    "<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\">" +
                    "<tbody>" +
                    "<tr>" +
                    "<td style=\"width: 380px; height: 90px;\" class=\"Testimonial\"><img alt=\"\" style=\"margin: 5px;\" src=\"/siteimages/image_quotation_open.gif\" />"+
                    item.GetValue<Lstring>("Content") + 
                    "<img alt=\"\" align=\"texttop\" style=\"margin: 5px; vertical-align: top;\" src=\"/siteimages/image_quotation_closed.gif\" /></td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td align=\"right\" style=\"width: 380px;\" colspan=\"3\" class=\"Person\">"+
                    item.GetValue<Lstring>("NameOfPerson") +
                    "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +
                    "</li>";
            }
            strRet += "</ul>";
        }
        return strRet;
    }
}