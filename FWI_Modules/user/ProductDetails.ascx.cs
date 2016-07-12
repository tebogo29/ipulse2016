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
 using Telerik.Sitefinity.RelatedData;


public partial class FWI_Modules_user_ProductDetails : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
       if (string.IsNullOrEmpty(Request.QueryString["title"])) Response.Redirect("/products");

        GetProductDetails(Request.QueryString["title"]);
    }
    void GetProductDetails(string strTitle)
    {
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.Product");

        var item = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Status == ContentLifecycleStatus.Live &&
            i.GetValue<bool>("Active") == true &&
            i.ItemDefaultUrl == "/"+ strTitle.ToLower() &&
            i.Visible == true).SingleOrDefault();
        /////////////////////////////////////////////////////////
            string url = Request.Url.ToString();
            string[] aURL = url.Split('/');
            string typeOfProduct = aURL[aURL.Length - 1];
        ///////////////////////////////////////////////////////
       
        int counter = 0;
        if (item != null)
        {
           
                litTitle.Text = item.GetValue<Lstring>("Title");
                Page.Title = item.GetValue<Lstring>("Title") + " - Products - iPulse";
                litScr.Text = "<script>$(document).ready(function () {$('h1 .sfContentBlock').html('" + item.GetValue<Lstring>("Title") + "');});</script>";

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
                        litDownloads.Text = "<div class='brochure'><a href=\"" + docBrochure.Url + "\" target=_blank><span>Download&#13;&#10;Brochure</span></a></div>"; ;
                }
                catch (Exception) { }
                try
                {
                    var docWarranty = libraryManager.GetDocument(item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("Warranty").FirstOrDefault().ChildItemId);
                    if (docWarranty != null)
                        litDownloads.Text += "<div class='warranty'><a href=\"" + docWarranty.Url + "\" target=_blank ><span>Download&#13;&#10;Warranty&#13;&#10;South Africa</span></a></div>"; ;
                }
                catch (Exception) { }
                try
                {
                    var docWarranty = libraryManager.GetDocument(item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("WarrantyAfrica").FirstOrDefault().ChildItemId);
                    if (docWarranty != null)
                        litDownloads.Text += "<div class='warranty2'><a href=\"" + docWarranty.Url + "\" target=_blank><span>Download&#13;&#10;Warranty&#13;&#10;Africa</span></a></div>"; ;
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
                    //strImage = .LastOrDefault().ChildItemAdditionalInfo.Replace(".tmb-", "").Replace("?sfvrsn=0", "").Replace("?sfvrsn=2", "");
                    litAdditionalImages.Text += "<div class=\"ListingCell \" style=\"display: block;\">"+

                        "<img width=192 height=192 src=\"" + item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("AdditionalPhotos").LastOrDefault().ChildItemAdditionalInfo.Replace(".tmb-", "").Replace("?sfvrsn=0", "").Replace("?sfvrsn=2", "") + "\"></div>";

                    if ((i + 1) == item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("AdditionalPhotos").Length)
                        litAdditionalImages.Text += "</div>";
                }
				
				
				//Related Products 
				var AssociatedProducts = item.GetRelatedItems("AssociatedProducts");
                if (AssociatedProducts.Count() > 0)
                    foreach (var subItem in AssociatedProducts)
                    {
                        var sItem = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Id == subItem.Id).SingleOrDefault();
                    //build html
                    ////////////////////////////////////////////////////////////////
                    if (AssociatedProducts != null)
                    {
                        string OtherProduct = "<div class='col-xs-4'>Other Products<div class='row'>";
                        OtherProduct += "<div class='col-xs-4 img-container'><img src='{0}'/></div>";
                    }
                    else
                    {
                        string OtherProduct = "<div class='col-xs-4'>Other Products<div class='row'>";
                        OtherProduct += "<div class='col-xs-4 img-container'><img src='/SiteImages/mining-image-reworked.jpg'/></div>";
                        OtherProduct += "<div class='col-xs-4 img-container'><img src='/SiteImages/mining-image-reworked.jpg'/></div>";
                        OtherProduct += "<div class='col-xs-4 img-container'><img src='/SiteImages/mining-image-reworked.jpg'/></div>";
                    }
                    string html = "";
                    //////////////////////////////////////////////////////////
                    /////////////////////////////////////////////////////////
                    if (strImage == "")
                        Response.Write("no image");
                    // string title = item.GetValue("Title").ToString();
                    try
                    {
                        string type = item.GetValue<IRelatedDataSource>("AssociatedProducts").ToString();
                        string productUrl = item.ItemDefaultUrl;

                        //builds the string using string.format 
                       // html += string.Format(OtherProduct,strImage, productUrl, "");
                    }
                    catch (Exception ex)
                    { }
                    productsList.Text = html;
                    ////////////////////////////////////////////////////
                }
        }
    }
}