using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

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

public partial class ipulse_2016_FWI_Modules_user_ProductList : System.Web.UI.UserControl
{

    protected void Page_Load(object sender, EventArgs e)
    {
        //if (string.IsNullOrEmpty(Request.QueryString["title"])) Response.Redirect("/pro");

        GetProductList(Request.QueryString["title"]);
    }

    void GetProductList(string strTitle)
    {
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type tProducts = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.Product");

        string url = Request.Url.ToString();
        string[] aURL = url.Split('/');
        string typeOfProduct = aURL[aURL.Length - 1];

        var myCollection = dynamicModuleManager.GetDataItems(tProducts).Where(i => i.Status == ContentLifecycleStatus.Live &&
            i.GetValue<bool>("Active") == true && i.Visible == true).ToList();



        string productBlock = "<div class='col-lg-4 product-block'><div class='row'>";
        productBlock += "<div class='col-xs-6 image-container'><img src='{0}' /></div>";
        productBlock += "<div class='col-xs-6 content-placeholder'><h1>{1}</h1><div class='truncate'><p>{2}</p></div>";
        productBlock += "<a href='{3}' class='buttn' style='color:#fff!important;'>View&#13;&#10;Product</a><a href='{4}' class='buttn' style='color:#fff!important;'>Download&#13;&#10;Brochure</a></div></div></div>";
        /*
         * {0} -- image/MainPhoto
         * {1} -- Title
         * {2} -- Summary
         * {3} -- View Product
         * {4} -  dowload / Brochure
         */

        string html = "";
        //////////////////////////////////////////
       /* List<ChoiceOption> choiceItems = new List<ChoiceOption>();

        foreach (string choice in item)
        {
            ChoiceItem choiceItem = new ChoiceItem()
            {
                Text = choice,
                Value = choice,
                Selected = false
            };

            choiceItems.Add(choiceItem);*/
            /////////////////////////////////////////

            if (myCollection != null)
        {
            foreach (var item in myCollection)
            {
                // skip the product if the type is not defined 
                if (item.GetValue<ChoiceOption>("Type") != null)
                    ////////////////////////////
                    // if (item.GetValue<ChoiceOption[]>("Type2") != null)
                    // if (item.GetValue<ChoiceOption[]>("Type2").ToString() == getProductTypeShortCode(typeOfProduct))
                    ////////////////////////////
                    if (item.GetValue<ChoiceOption>("Type").PersistedValue == getProductTypeShortCode(typeOfProduct)) //checks if the type of product matches the selected type
                    {
                        string strImage = "";
                        try
                        {
                            strImage = item.GetValue<Telerik.Sitefinity.Model.ContentLinks.ContentLink[]>("MainPhoto").LastOrDefault().ChildItemAdditionalInfo.Replace(".tmb-", "").Replace("?sfvrsn=0", "").Replace("?sfvrsn=2", "");
                        }
                        catch (Exception) { }


                        if (strImage == "")
                            Response.Write("no image");

                        string title = item.GetValue("Title").ToString();
                        try
                        {
                            ////////////////////////////////////////////
                            //myCollection = int.Parse(((ChoiceOption)Parent.SystemChildItems.FirstOrDefault().GetValue("Type2")).PersistedValue);
                            //myCollection = ((ChoiceOption)IHasIDataItemParent.SystemChildItems.FirstOrDefault().GetValue("Type2")).Text;
                            /////////////////////////////////////////////
                            string type = item.GetValue<ChoiceOption>("Type").PersistedValue;
                            ////////////////////////////////////////
                            //string type = ((ChoiceOption)item.GetValue("Type2")).PersistedValue;
                            // string type = item.GetValue<String[]>("Type2").ToString();
                            ///////////////////////////////////////
                            string summary = item.GetValue<Lstring>("Summary");
                            string productUrl = item.ItemDefaultUrl;

                            //builds the string using string.format 
                            html += string.Format(productBlock, strImage, title, summary, "/productdetails" + productUrl, "");
                        }
                     
                        catch (Exception ex)
                        {

                        }

                    }
            }

        }

        productsHtml.Text = html;
    }

    public string getProductTypeShortCode(string type)
    {
        //build up a dictionary of posible url's that will be called and the correct type
        Dictionary<string, string> availableProductTypes = new Dictionary<string, string>();

        availableProductTypes.Add("desktop-biometric-readers", "desktop");
        availableProductTypes.Add("indoor-biometric-readers", "indoor");
        availableProductTypes.Add("outdoor-biometric-readers", "outdoor");
        availableProductTypes.Add("biometric-and-card-reader", "biocard");
        availableProductTypes.Add("biometric-consoles", "bioconsole");

        return availableProductTypes[type];
    }

}