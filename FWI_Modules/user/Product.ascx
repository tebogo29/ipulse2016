<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Product.ascx.cs" Inherits="FWI_Modules_user_Product" %>

<div>
    <div class="imageContainer" style="position:relative">
        <div class="ProductListing" style="padding-top:0px">
            <div class="ListingCell" style="display:block"><asp:Literal ID="litImage" runat="server"></asp:Literal></div> 
       </div>
    

      <div  style="position:absolute;top: 273px;left: -29px;display:inline-flex;width: 322px;">
       <div class="DwnLd"><asp:Literal ID="litDownloads" runat="server"></asp:Literal></div>
      </div>
    </div>

    <div class="contentPlaceholder" style="position:relative">
        <div style="position:absolute;top: 0px;right: -13px;"></div>
		<!--<a href="/products/availableProductTypes[type]" class="btn btn-orange">Back</a>-->
        

        <h2><asp:Literal ID="litTitle" runat="server"></asp:Literal></h2> 
            <asp:Literal ID="litSummary" runat="server"></asp:Literal>

            <asp:Literal ID="litFeatures" runat="server"></asp:Literal>

            <asp:Literal ID="litModels" runat="server"></asp:Literal>

            <asp:Literal ID="litVersions" runat="server"></asp:Literal>

          <asp:Literal ID="litAdditionalImages" runat="server"></asp:Literal></div>


</div>