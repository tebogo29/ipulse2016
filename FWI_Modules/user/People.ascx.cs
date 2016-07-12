using System;
using System.ComponentModel;
using System.Linq;
using System.Web.UI;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;
using System.Text;

public partial class FWI_Modules_user_People : System.Web.UI.UserControl
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
        litLvl1.Text = LoadLevel("1");
        litLvl2.Text = LoadLevel("2");
        litLvl3.Text = LoadLevel("3");
    }
    string LoadLevel(string intLevel)
    {
          string strRet = "";
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.People.Person");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i =>
            i.Status == ContentLifecycleStatus.Live &&
            i.Visible == true
            )
            .OrderBy(i => i.GetValue<decimal?>("Priority"));

        int counter = 0;
        if (myCollection != null)
        {
            foreach (var item in myCollection)
            {
                if (item.GetValue<Telerik.Sitefinity.DynamicModules.Model.ChoiceOption>("Level").PersistedValue == intLevel)
                {
                    string strImg = "";
                    if (item.GetValue<Telerik.Sitefinity.Libraries.Model.Image>("Image") != null)
                        strImg = "style=\"background-image:url('" + item.GetValue<Telerik.Sitefinity.Libraries.Model.Image>("Image").Url + "');\"";

                      StringBuilder sb = new StringBuilder();


                      sb.AppendLine("<div class='person-container'>");
                        	sb.AppendLine("<div class='ring'><div class='profile-pic' "+ strImg + "></div></div>");
                        	sb.AppendLine("<div class='person-content'>");
                        	sb.AppendLine("<h4>"+ item.GetValue<Lstring>("Title") + "</h4>");
                        	sb.AppendLine("<h5>"+ item.GetValue<Lstring>("Position") + "</h5>");
                        	sb.AppendLine(item.GetValue<Lstring>("ToolTip"));
                        	sb.AppendLine("</div>");
                        sb.AppendLine("</div>");

                    /*strRet += "<div class=\"person\">" +
                            "<div class=\"imgage\">" +
                                "<div class=\"thePerson\" " + strImg + "></div>" +
                                "<div class=\"leftSlope\"></div>" +
                                "<div class=\"rightSlope\"></div>" +
                            "</div>" +
                            "<div class=\"aboutPerson\">" +
                                item.GetValue<Lstring>("FullName") +
                                "<div class=\"Position\">" +
                                    item.GetValue<Lstring>("Position") +
                                "</div>" +
                            "</div>" +
                            "<div class=\"aboutToolTip\">"+
                                item.GetValue<Lstring>("ToolTip") +
                            "</div>"+
                        "</div>";*/

                        strRet += sb.ToString();
                }
            }
        }
        return strRet;

    }
}
