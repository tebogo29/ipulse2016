using System;
using System.ComponentModel;
using System.Linq;
using System.Web.UI;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;

public partial class FWI_Modules_user_TrainingCertificate : System.Web.UI.UserControl
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
       litCOntent.Text = GetTraining();
    }
    string GetTraining()
    {
        string strRet = "";
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.TrainingCertificate");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Status == ContentLifecycleStatus.Live && i.Visible == true)
            .OrderBy(i => i.GetValue<Decimal>("priority"));
        
        int counter = 0;
        if (myCollection != null)
        {
            foreach (var item in myCollection)
            {
                strRet += "<div class=\"CertGroup\">";
                counter++;

                //string strTitle = item.GetValue<Lstring>("Title");
                string strImg = item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("TitleImage").LastOrDefault().ChildItemAdditionalInfo
                    //.Replace("?sfvrsn=0", "")
                    ;

                int strBlocks = int.Parse(item.GetValue<Telerik.Sitefinity.DynamicModules.Model.ChoiceOption>("showBlocks").PersistedValue);
                
                string strExtraClass = "";
                if(strBlocks == 3) strExtraClass = "three";
                if(strBlocks == 2) strExtraClass = "two";

                strRet += "<div class=\"imgTitle\">" +
                   "<img src=\"" + strImg + "\" />" +
                   "</div>";

                if (strBlocks >= 1)
                {

                    strRet += "<div class=\"CertLeft " + strExtraClass + "\">" +
                    "<div>" + item.GetValue<Lstring>("Block1Heading") + "</div>" +
                        item.GetValue<Lstring>("Block1Text") +
                    "<div class=\"HoverElem\">" +
                    "<div class=\"line\"></div>" +
                    "<div class=\"content\">" +
                        item.GetValue<Lstring>("Block1TT") +
                    "</div>" +
                    "</div>" +
                    "</div>";
                }
                if (strBlocks >= 2)
                {
                    strRet += "<div class=\"CertLeftSign\">+</div>" +
                    "<div class=\"CertLeft " + strExtraClass + "\">" +
                    "<div>" + item.GetValue<Lstring>("Block2Heading") + "</div>" +
                        item.GetValue<Lstring>("Block2Text") +
                    "<div class=\"HoverElem\">" +
                    "<div class=\"line\"></div>" +
                    "<div class=\"content\">" +
                        item.GetValue<Lstring>("Block2TT") +
                    "</div>" +
                    "</div>" +
                    "</div>";
                }
                if (strBlocks >= 3)
                {
                    strRet += "<div class=\"CertLeftSign\">+</div>" +
                    "<div class=\"CertLeft " + strExtraClass + "\">" +
                    "<div>" + item.GetValue<Lstring>("Block3Heading") + "</div>" +
                        item.GetValue<Lstring>("Block3Text") +
                    "<div class=\"HoverElem\">" +
                    "<div class=\"line\"></div>" +
                    "<div class=\"content\">" +
                        item.GetValue<Lstring>("Block3TT") +
                    "</div>" +
                    "</div>" +
                    "</div>";
                }

                if (strBlocks >= 4)
                {
                    strRet += "<div class=\"CertLeftSign\">+</div>" +
                    "<div class=\"CertLeft " + strExtraClass + "\">" +
                    "<div>" + item.GetValue<Lstring>("Block4Heading") + "</div>" +
                        item.GetValue<Lstring>("Block4Text") +
                    "<div class=\"HoverElem\">" +
                    "<div class=\"line\"></div>" +
                    "<div class=\"content\">" +
                        item.GetValue<Lstring>("Block4TT") +
                    "</div>" +
                    "</div>" +
                    "</div>";
                }

                if (item.GetValue<bool>("showEquals"))
                {
                    strRet += "<div class=\"CertRight\">" +
                        item.GetValue<Lstring>("EqualsTitle") +
                    "<div class=\"HoverElem\">" +
                    "<div class=\"line\"></div>" +
                    "<div class=\"content\">" +
                        item.GetValue<Lstring>("BlockEqualTT") +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class=\"CertRightSign\">=</div>";

                }
                

                strRet += "</div><div style=\"clear:both\"></div>";
            }
        }
        return strRet;
    }
}