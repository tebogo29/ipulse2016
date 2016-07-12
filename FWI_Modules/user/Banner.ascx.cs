using System;
using System.ComponentModel;
using System.Linq;
using System.Web.UI;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;

public partial class FWI_Modules_user_Banner : System.Web.UI.UserControl
{

    #region Remove Sitefinity Parameters
    [Browsable(false)]
    public override ClientIDMode ClientIDMode
    {
        get
        {
            return base.ClientIDMode;
        }
        set
        {
            base.ClientIDMode = value;
        }
    }
    [Browsable(false)]
    public override bool EnableTheming
    {
        get
        {
            return base.EnableTheming;
        }
        set
        {
            base.EnableTheming = value;
        }
    }
    [Browsable(false)]
    public override bool EnableViewState
    {
        get
        {
            return base.EnableViewState;
        }
        set
        {
            base.EnableViewState = value;
        }
    }
    [Browsable(false)]
    public override string ID
    {
        get
        {
            return base.ID;
        }
        set
        {
            base.ID = value;
        }
    }
    [Browsable(false)]
    public override ViewStateMode ViewStateMode
    {
        get
        {
            return base.ViewStateMode;
        }
        set
        {
            base.ViewStateMode = value;
        }
    }
    [Browsable(false)]
    public override bool Visible
    {
        get
        {
            return base.Visible;
        }
        set
        {
            base.Visible = value;
        }
    }
    #endregion

    protected void Page_Load(object sender, EventArgs e)
    {

        litBanner.Text = getBanner();
    }
    string getBanner()
    {
        string strRet = "";
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.Banner");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Status == ContentLifecycleStatus.Live && i.Visible == true)
            .OrderBy(i => i.GetValue<decimal?>("priority"));

        int counter = 0;
        if (myCollection != null)
        {
            strRet += "<ul class=\"slides\">";
            foreach (var item in myCollection)
            {
                counter++;

                string strTitle = item.GetValue<Lstring>("Title");
                string strSubTitle = item.GetValue<Lstring>("desc");
                string strImg = item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("image").LastOrDefault().ChildItemAdditionalInfo
                    //.Replace(".tmb?sfvrsn=0", "")
                    ;
                string strlinkText = item.GetValue<Lstring>("ButtonText");
                string strlink = item.GetValue<Lstring>("ButtonLink");

                strRet += "<li> <a href=\"" + strlink + "\">"+
                    "<img src=\"" + strImg + "\"  />" +
                    "<div class=\"flex-caption content\">" +
                    "<h2 class=\"flex-caption\">" + strTitle + "<span></span></h2>" +
                    "<h3 class=\"flex-caption\">" + strSubTitle + "</h3>" +
                    "<div class=\"flex-link\"><a href=\"" + strlink + "\">" + strlinkText + "</a></h3>" +
                    "</div></a>" +
                    "</li>";
            }
            strRet += "</ul>";
        }
        return strRet;
    }
}
