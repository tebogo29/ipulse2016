<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CategoryBanner.ascx.cs" Inherits="FWI_Modules_user_CategoryBanner" %>
<ul class="RoundAbout">
    <asp:Literal ID="litCatHeaders" runat="server"></asp:Literal>
</ul>
<%--<div class="currentBannerCat"></div>--%>
<div style="position:relative">
    <div class="btnNext" style="position:absolute; top: -150px; left: 880px; cursor:pointer;">
    <img src="/SiteImages/_newproducts/btn_right.png" /></div>
    <div class="btnPrev" style="position:absolute; top: -150px; left: -10px; cursor:pointer;">
    <img src="/SiteImages/_newproducts/btn_left.png" /></div>
</div>

<div class="ProductListing">
    <asp:Literal ID="litProductListing" runat="server"></asp:Literal>
    <div style="clear:both"></div>
</div>
<script src="/Scripts/jquery.easing.js"></script>
<script src="/Scripts/jquery.event.drag.js"></script>
<script src="/Scripts/jquery.event.drop.js"></script>
<script src="/Scripts/jquery.roundabout2.js"></script>
<script src="/Scripts/jquery.smooth-scroll.js"></script>
<script>
	$(document).ready(function () {
	    //$('ul.RoundAbout').roundabout();

	    $("ul.RoundAbout").roundabout({
	        minScale: 0.0,
	        minOpacity: 0.3,
	        maxOpacity: 1.0,
	        duration: 400,
	        easing: 'easeOutQuad',
	        enableDrag: true,
	        dropEasing: 'easeOutBounce',
	        btnNext: '.btnNext',
	        btnPrev: '.btnPrev'
	    }, function () {
	        $(this).fadeTo(500, 1);
	    });



	 
	});

	function ShowCat(categoryname) {
	    $('.ListingCell').each(function () {
	        if ($(this).hasClass(categoryname))
	            $(this).show(500);
	        else
	            $(this).hide(500);
	    });
	    //$('.currentBannerCat').html(categoryname);
	}



</script>
<%--<div class="currentBannerCat"></div>--%>
