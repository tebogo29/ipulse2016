using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;

public partial class App_Master_MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        litYear.Text = DateTime.Now.Year.ToString();

        if (Session["popup"] == null)
        {
            loadPopupBanner();
            Session["popup"] = true;
        }
    }
    void loadPopupBanner()
    {
        try
        {
            string strRet = "";
            DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
            Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.HpPopupBanner");

            var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i =>
                i.GetValue<bool>("Active") == true &&
                i.GetValue<DateTime>("startDate") <= DateTime.Now.AddHours(-2) &&
                i.GetValue<DateTime>("endDate") >= DateTime.Now.AddHours(-2) &&
                i.Status == ContentLifecycleStatus.Live &&
                i.Visible == true);

            int counter = 0;
            if (myCollection != null)
            {
                foreach (var item in myCollection)
                {
                    counter++;

                    string strImg = "";
                    try
                    {
                        strImg = "<div><img style=\"width:100%\" src=\"" +
                            item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("Image").LastOrDefault().ChildItemAdditionalInfo
                            .Replace(".tmb-", "")
                            .Replace("?sfvrsn=0", "")
                            .Replace("?sfvrsn=1", "")
                            .Replace("?sfvrsn=2", "")
                            //.tmb-.png?sfvrsn=0
                            +
                            "\" /></div>";
                    }
                    catch (Exception) { }

                    strRet += "<div class=\"reveal-modal bannerPopup\">" +
                        "    <a class=\"close-reveal-modal\">close</a>" +
                        "    <div class=\"BannerCOntent\">" +

                        strImg +
                        item.GetValue<Lstring>("Content") +

                        "    </div>" +
                        "</div>" +
                        "" +
                        "<script src=\"/Scripts/jQuery.Reveal.js\"></script>" +
                        "<script>" +
                        "    $(document).ready(function () {" +
                        "        setTimeout(function () { $('.bannerPopup').reveal(); }, 200);" +
                        "    });" +
                        "</script>";

                    break;
                }
            }
            litBanner.Text = strRet;
        }
        catch (Exception) { }
    }
}
