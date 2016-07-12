<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ProductDetails.ascx.cs" Inherits="FWI_Modules_user_ProductDetails" %>

<div class="ProductPage">
    <div class="imageContainer" style="position:relative">
        <div class="ProductListing" style="padding-top: 0px;">
            <div class="ListingCell " style="display: block;"><asp:Literal ID="litImage" runat="server"></asp:Literal></div>
        </div>

        <div  style="position:absolute;top: 273px;left: -29px;display:inline-flex;width: 322px;">
            <asp:Literal ID="litDownloads" runat="server"></asp:Literal>
        </div>

        <!--<div class="ProductImages">
            <div class="row" >
               <div><asp:Literal runat="server" ID="productsList"></asp:Literal></div>
            </div>
        </div>-->
    </div>
    <div class="contentPlaceholder" style="position:relative">
        <div style="position:absolute;top: 0px;right: -13px;"></div>
        <input type="button" class="btn btn-orange" value="Back" onclick="history.back(-1)" style="color:#fff!important;"/>
        
        <h2><asp:Literal ID="litTitle" runat="server"></asp:Literal></h2> 
            <asp:Literal ID="litSummary" runat="server"></asp:Literal>

            <asp:Literal ID="litFeatures" runat="server"></asp:Literal>

            <asp:Literal ID="litModels" runat="server"></asp:Literal>

            <asp:Literal ID="litVersions" runat="server"></asp:Literal>

          <asp:Literal ID="litAdditionalImages" runat="server"></asp:Literal></div>


    </div>
    <div style="clear:both;"></div>

<asp:Literal ID="litScr" runat="server"></asp:Literal>