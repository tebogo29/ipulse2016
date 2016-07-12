using System;
using System.Linq;
using Telerik.Sitefinity;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.DynamicModules.Model;
using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Modules.Libraries;
using Telerik.Sitefinity.Security;
using Telerik.Sitefinity.Taxonomies;
using Telerik.Sitefinity.Taxonomies.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;

public partial class FWI_Modules_user_Product : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    void GetProduct(string strTitle)
    {
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.Product");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Status == ContentLifecycleStatus.Live &&
            i.GetValue<bool>("Active") == true &&
            i.GetValue<string>("Title").ToLower() == strTitle.ToLower() &&
            i.Visible == true);

        int counter = 0;
        if (myCollection != null)
        {
            foreach (var item in myCollection)
            {
                litTitle.Text = item.GetValue<Lstring>("Title");
                Page.Title = item.GetValue<Lstring>("Title") + " - Products - iPulse";
                //litScr.Text = "<script>$(document).ready(function () {$('h1 .sfContentBlock').html('" + item.GetValue<Lstring>("Title") + "');});</script>";

                string strImage = "";
                try
                {
                    strImage = item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("MainPhoto").LastOrDefault().ChildItemAdditionalInfo.Replace(".tmb-", "").Replace("?sfvrsn=0", "").Replace("?sfvrsn=2", "");
                }
                catch (Exception) { Response.Redirect("/Title"); }

                litImage.Text = "<img src=\"" + strImage + "\">";

                LibrariesManager libraryManager = LibrariesManager.GetManager();
                try
                {
                    var docBrochure = libraryManager.GetDocument(item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("Brochure").FirstOrDefault().ChildItemId);
                    if (docBrochure != null)
                        litDownloads.Text = "<div><a href=\"" + docBrochure.Url + "\" target=_blank><img src=\"/SiteImages/_newproducts/button_downloadbrochure.jpg\" /></a><br /><br /><br /><br /><br /></div>"; ;
                }
                catch (Exception) { }
                try
                {
                    var docWarranty = libraryManager.GetDocument(item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("Warranty").FirstOrDefault().ChildItemId);
                    if (docWarranty != null)
                        litDownloads.Text += "<div><a href=\"" + docWarranty.Url + "\" target=_blank ><img src=\"/SiteImages/_newproducts/button_downloadwarranty.jpg\" /><br /><br />&nbsp;South Africa</a><br /><br /><br /><br /><br /></div>"; ;
                }
                catch (Exception) { }
                try
                {
                    var docWarranty = libraryManager.GetDocument(item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("WarrantyAfrica").FirstOrDefault().ChildItemId);
                    if (docWarranty != null)
                        litDownloads.Text += "<div><a href=\"" + docWarranty.Url + "\" target=_blank><img src=\"/SiteImages/_newproducts/button_downloadwarranty.jpg\" /><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Africa</a><br /><br /><br /><br /><br /></div>"; ;
                }
                catch (Exception) { }

                string strTemp = item.GetValue<Lstring>("Summary");
                if (strTemp.Trim() != "")
                {
                    litSummary.Text = "<h3>Summary</h3>";
                    litSummary.Text += strTemp;
                }

                strTemp = item.GetValue<Lstring>("Features");
                if (strTemp.Trim() != "")
                {
                    litFeatures.Text = "<h3>Features</h3>";
                    litFeatures.Text += strTemp;
                }

                strTemp = item.GetValue<Lstring>("Models");
                if (strTemp.Trim() != "")
                {
                    litModels.Text = "<h3>Models</h3>";
                    litModels.Text += strTemp;
                }

                strTemp = item.GetValue<Lstring>("Versions");
                if (strTemp.Trim() != "")
                {
                    litVersions.Text = "<h3>Versions</h3>";
                    litVersions.Text += strTemp;
                }




                for (int i = 0; i < item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("AdditionalPhotos").Length; i++)
                {
                    if (i == 0)
                        litAdditionalImages.Text = "<h3>Additional Images</h3><div class=\"ProductListing\" style=\"padding-top: 0px;\">";


                    //        strImage = .LastOrDefault().ChildItemAdditionalInfo.Replace(".tmb-", "").Replace("?sfvrsn=0", "").Replace("?sfvrsn=2", "");
                    litAdditionalImages.Text += "<div class=\"ListingCell \" style=\"display: block;\">" +

                        "<img width=192 height=192 src=\"" + item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("AdditionalPhotos").LastOrDefault().ChildItemAdditionalInfo.Replace(".tmb-", "").Replace("?sfvrsn=0", "").Replace("?sfvrsn=2", "") + "\"></div>";



                    if ((i + 1) == item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("AdditionalPhotos").Length)
                        litAdditionalImages.Text += "</div>";
                }


                break;
            }

        }
    }
}