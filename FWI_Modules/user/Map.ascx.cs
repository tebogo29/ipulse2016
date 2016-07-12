using System;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web.UI;
using Telerik.Sitefinity.DynamicModules;
using Telerik.Sitefinity.GenericContent.Model;
using Telerik.Sitefinity.Model;
using Telerik.Sitefinity.Utilities.TypeConverters;

public partial class FWI_Modules_user_Map : System.Web.UI.UserControl
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string strScripts = "";
        litPaths.Text = GetPaths(out strScripts);
        litScriptz.Text = strScripts;
    }
    string GetPaths(out string strScripts)
    {
        string strRet = "";
        strScripts = "";
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.MapCountry");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i => i.Status == ContentLifecycleStatus.Live && i.Visible == true);

        string strChecker = "";
        string strSelector = "";
        int counter = 0;
        if (myCollection != null)
        {
            strRet += "<script>AmCharts.maps.allInOne = {\"svg\": {\"defs\": {\"amcharts:ammap\": {" +
                    "\"projection\": \"Firewater\"," +
                    "\"leftLongitude\": \"-169.522279\"," +
                    "\"topLatitude\": \"83.646363\"," +
                    "\"rightLongitude\": \"190.122401\"," +
                    "\"bottomLatitude\": \"-55.621433\"" +
                        "}},\"g\": {\"path\": [";



            foreach (var item in myCollection)
            {
                counter++;

                strRet += "{\"id\": \"" + item.GetValue<Lstring>("ID") + "\"," +
                      "\"title\": \"" + item.GetValue<Lstring>("Title") + "\"," +
                      "\"d\": \"" + item.GetValue<Lstring>("Dimentions") + ",---" + item.GetValue<Lstring>("Title") + "\"}";
                if (counter < myCollection.Count())
                {
                    strRet += ",";
                }

                if (item.GetValue<bool>("AllowPopup"))
                {
                    if (strChecker == "")
                        strChecker += "(strTitle.indexOf('" + item.GetValue<Lstring>("Title") + "') != -1)";
                    else
                        strChecker += " || (strTitle.indexOf('" + item.GetValue<Lstring>("Title") + "') != -1)";


                    if (strSelector == "")
                        strSelector += "($(this).attr('d').indexOf('" + item.GetValue<Lstring>("Title") + "') != -1)";
                    else
                        strSelector += " || ($(this).attr('d').indexOf('" + item.GetValue<Lstring>("Title") + "') != -1)";


                    litPopups.Text += "<div popupname=\"" + item.GetValue<Lstring>("Title") + "\" class=\"popup\">" +
                        //"<div class=ClosePop>close</div>"+
                        //item.GetValue<Lstring>("PopupText") +

                        getAddresses(item.OriginalContentId) +

                        "</div>";

                }


            }
            strRet += "]}}};</script>";


            strScripts = "" +
                "<script>" +
                "function CheckTitlePop(strTitle)" +
                "{" +
                "if (" +
                    strChecker +
                ") {" +
                //"$('.MapPopup').html(strTitle + \": Some event will fire off here to call a popup model.\");" +
                "LoadPopup(strTitle);" +
                "} else {" +
                //"$('.MapPopup').html(\"Nothing to show, not selected item.\");" +
                "}" +
                "}" +
                "" +
                "function setBorders() {" +
                "for (var i in map.dataProvider.areas) {" +
                "var area = map.dataProvider.areas[i];" +
                "$('#mapdiv path').each(function () {" +
                "if (" +
                    strSelector +
                ") {" +
                "if ($('.MapTitle').html() == '')" +
                "$(this).attr('fill', \"#ef9c02\");" +
                "else {" +
                "if ($(this).attr('d').indexOf($('.MapTitle').html()) == -1)" +
                "$(this).attr('fill', \"#ef9c02\");" +
                "}" +
                "}" +
                "});" +
                "}" +
                "}" +
                "</script>";
        }
        return strRet;
    }
    string getAddresses(Guid ParentID)
    {
        string strRet = "";
        DynamicModuleManager dynamicModuleManager = DynamicModuleManager.GetManager();
        Type HeadlineImages = TypeResolutionService.ResolveType("Telerik.Sitefinity.DynamicTypes.Model.FirewaterModules.Address");

        var myCollection = dynamicModuleManager.GetDataItems(HeadlineImages).Where(i =>
            i.SystemParentId == ParentID &&
            i.Status == ContentLifecycleStatus.Live &&
            i.Visible == true);

        int counter = 0;

        DataTable table = new DataTable();
        table.Columns.Add("position", typeof(int));
        table.Columns.Add("Content", typeof(string));
        table.Columns.Add("ContentPos", typeof(string));


        if (myCollection != null)
        {
            string strComp = "";
            foreach (var item in myCollection)
            {
                counter++;
                strRet = "";

                //if (item.GetValue<Telerik.Sitefinity.DynamicModules.Model.ChoiceOption>("Region").PersistedValue != "1")
                //{
                //    if (strComp != item.GetValue<Telerik.Sitefinity.DynamicModules.Model.ChoiceOption>("Region").Text)
                //        strRet += "<div style=\"clear:both\"></div><div class=\"Tableheader\" style=\"padding:4px 10px; margin-bottom:10px;\">" +
                //             item.GetValue<Telerik.Sitefinity.DynamicModules.Model.ChoiceOption>("Region") +
                //             "</div><div style=\"clear:both\"></div>";

                //    strComp = item.GetValue<Telerik.Sitefinity.DynamicModules.Model.ChoiceOption>("Region").Text;
                //}

                strRet += "<div class=\"ContactInfo\">";

                if (!string.IsNullOrEmpty(item.GetValue<Lstring>("CompanyName").ToString().Trim()))
                    strRet += "<span style=\"color: #ffffff;\"><strong>" + item.GetValue<Lstring>("CompanyName") + "</strong></span><br />";
                else
                    strRet += "<span style=\"color: #ffffff;\"><strong>&nbsp;</strong></span><br />";


                strRet += "<span class=\"copyOrange\"><strong>" + item.GetValue<Lstring>("Title") + "</strong></span><br />";
                strRet += "<div>" + item.GetValue<Lstring>("Address") + "</div>";
                if (!string.IsNullOrEmpty(item.GetValue<Lstring>("Tel").ToString().Trim()))
                    strRet += "Tel: " + item.GetValue<Lstring>("Tel") + " <br />";
                if (!string.IsNullOrEmpty(item.GetValue<Lstring>("Fax").ToString().Trim()))
                    strRet += "Fax: " + item.GetValue<Lstring>("Fax") + " ";
                strRet += "</div>";

                table.Rows.Add(item.GetValue<Telerik.Sitefinity.DynamicModules.Model.ChoiceOption>("Region").PersistedValue, strRet, item.GetValue<Telerik.Sitefinity.DynamicModules.Model.ChoiceOption>("Region"));
            }
        }

        DataView dv = new DataView(table);
        dv.Sort = "position";
        strRet = "";

        string strCompare = "";
        for (int i = 0; i < dv.Count; i++)
        {
            if (dv[i]["position"].ToString() != "1")
            {
                if (strCompare != dv[i]["ContentPos"].ToString())
                    strRet += "<div style=\"clear:both\"></div><div class=\"Tableheader\" style=\"padding:4px 10px; margin:10px 0px;\">" +
                         dv[i]["ContentPos"].ToString() +
                         "</div><div style=\"clear:both\"></div>";

                strCompare = dv[i]["ContentPos"].ToString();
            }

            //strRet += dv[i]["position"].ToString();
            //strRet += dv[i]["ContentPos"].ToString();
            strRet += dv[i]["Content"].ToString();
        }

        return strRet;
    }
}


