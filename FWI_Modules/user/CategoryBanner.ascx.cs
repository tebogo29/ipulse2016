using System;
using System.Linq;
using Telerik.Sitefinity;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.DynamicModules.Model;
using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Security;
using Telerik.Sitefinity.Taxonomies;
using Telerik.Sitefinity.Taxonomies.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;

public partial class FWI_Modules_user_CategoryBanner : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        litCatHeaders.Text = LoadCatHeaders();
        litProductListing.Text = LoadProducts();
    }
    string LoadCatHeaders()
    {
        string strRet = "";
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.Category");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Status == ContentLifecycleStatus.Live && i.Visible == true).OrderBy(i => i.GetValue<decimal?>("Priority"));

        int counter = 0;
        if (myCollection != null)
        {
            foreach (var item in myCollection)
            {
                string strImage = "";
                try
                {
                    strImage = item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("image").LastOrDefault().ChildItemAdditionalInfo.Replace(".tmb-", "").Replace("?sfvrsn=0", "").Replace("?sfvrsn=2", "");
                }
                catch (Exception) { }
                counter++;
                if (strImage != "")
                {
                    string strCat = "";
                    try
                    {
                        Guid CatID = item.GetValue<Telerik.OpenAccess.TrackedList<Guid>>("Category")[0];
                        strCat = strGetCat(CatID);

                        strRet += "<li categoryname=\"" + strCat + "\"><img src=\"" +
                            strImage +
                            "\"  alt=\"\" /><div>" +
                            item.GetValue<Lstring>("ShortDesc") +
                            "</div></li>";
                    }
                    catch (Exception)
                    {
                    }
                }
            }
        }
        return strRet;
    }
    string strGetCat(Guid CatID)
    {
        // get the taxonomy manager to interact with taxonomy data
        var mgr = TaxonomyManager.GetManager();
        // get the Categories taxonomy
        var categoriesTaxonomy = mgr.GetTaxonomy<HierarchicalTaxonomy>(TaxonomyManager.CategoriesTaxonomyId);
        // get the list of category taxon items from the Categories Taxonomy
        var categories = categoriesTaxonomy.Taxa
            .Where(i => i.Id == CatID);
        // read through each category taxon and get the title

        foreach (var category in categories)
        {
            return category.Title.ToString().Trim().ToLower().Replace("/", "").Replace("&", "").Replace(" ", "");
        }
        return "";
    }
    string LoadProducts()
    {
        //    <div class="ListingRowsg">
        //    <div class="ListingCell"><img src="/SiteImages/_newproducts/product_bg.jpg" /></div>
        //    <div class="ListingCell"><img src="/SiteImages/_newproducts/product_bg.jpg" /></div>
        //    <div class="ListingCell"><img src="/SiteImages/_newproducts/product_bg.jpg" /></div>
        //    <div class="ListingCell"><img src="/SiteImages/_newproducts/product_bg.jpg" /></div>
        //    <div style="clear:both"></div>
        //</div>
        string strRet = "";
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.Product");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Status == ContentLifecycleStatus.Live &&
            i.GetValue<bool>("Active") == true &&
            i.Visible == true).OrderBy(i => i.GetValue<String>("Title"));

        int counter = 0;
        if (myCollection != null)
        {
            foreach (var item in myCollection)
            {
                string strImage = "";
                try
                {
                    strImage = item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("MainPhoto").LastOrDefault().ChildItemAdditionalInfo.Replace(".tmb-", "").Replace("?sfvrsn=0", "").Replace("?sfvrsn=2", "");
                }
                catch (Exception) { }
                {
                    counter++;

                    string strCat = "";
                    for (int i = 0; i < item.GetValue<Telerik.OpenAccess.TrackedList<Guid>>("Category").Count; i++)
                    {
                        Guid CatID = item.GetValue<Telerik.OpenAccess.TrackedList<Guid>>("Category")[i];
                        if (strCat == "")
                            strCat = strGetCat(CatID);
                        else
                            strCat += " " + strGetCat(CatID);

                    }

                    strRet += "<a href=\"/productDetails/" + item.GetValue<Lstring>("Title") + "\"><div class=\"ListingCell " + strCat + "\"><img src=\"" + strImage + "\" />" +
                        "<div class=\"ListingTitle\">" + item.GetValue<Lstring>("Title") + "</div></div></a>";
                }
            }

        }
        return strRet;
    }
}