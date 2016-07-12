<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Map.ascx.cs" Inherits="FWI_Modules_user_Map" %>
<div style="position:relative">
<script src="/Scripts/ammap.js"></script>

<asp:Literal ID="litPaths" runat="server"></asp:Literal>

<div id="mapdiv" class="mapdiv" style="width: 100%; height: 400px;"></div>
<div class="MapTitle" style="display:none;"></div>
<div class="MapPopup" ></div>


<script>
    var map;
    AmCharts.ready(function () {
        // create AmMap objects
        map = new AmCharts.AmMap();
        // set path to images
        map.pathToImages = "/FWI_Modules/user/ammap/images/";

        /* create data provider object
            mapVar tells the map name of the variable of the map data. You have to
            view source of the map file you included in order to find the name of the 
            variable - it's the very first line after commented lines.
             
            getAreasFromMap indicates that amMap should read all the areas available
            in the map data and treat them as they are included in your data provider.
            in case you don't set it to true, all the areas except listed in data
            provider will be treated as unlisted.
        */
        var dataProvider = {
            mapVar: AmCharts.maps.allInOne,
            getAreasFromMap: true
        };
        // pass data provider to the map object
        map.dataProvider = dataProvider;

        /* create areas settings
            * autoZoom set to true means that the map will zoom-in when clicked on the area
            * selectedColor indicates color of the clicked area.
            */
        map.areasSettings = {
            autoZoom: true,
            selectedColor: "#ffffff",
            
        };


        // let's say we want a small map to be displayed, so let's create it
        map.smallMap = new AmCharts.SmallMap();

        map.zoomControl.maxZoomLevel = 2;
        map.zoomControl.minZoomLevel = 2;
        
        map.addListener('clickMapObject', function (event) {

            for (var i in map.dataProvider.areas) {
                var area = map.dataProvider.areas[i];
                area.showAsSelected = false;
                map.returnInitialColor(area);
            }
            setBorders();


            // deselect the area by assigning all of the dataProvider as selected object
            map.selectedObject = map.dataProvider;

            // toggle showAsSelected
            event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
            //alert(event.mapObject.title);
            $('.MapTitle').html(event.mapObject.title);

            CheckTitlePop(event.mapObject.title);
            
            // bring it to an appropriate color
            map.returnInitialColor(event.mapObject);

            setBorders();

        });

        map.addListener('rollOutMapObject', function (event) {
            setBorders();
        });



        // write the map to container div
        map.write("mapdiv");

        setBorders();
        $('#mapdiv text').each(function () {
            $(this).parent().parent().remove();
        });
        var theCount = 0;
        $('#mapdiv image').each(function () {
            theCount++;
            if (theCount < 4) {
                $(this).parent().parent().remove();
            }
        });

        map.zoomDuration = 0;
        map.zoomControl.panStepSize = 1.1;
        map.moveDown()
        setTimeout(function () {
            map.zoomDuration = 0;
            map.zoomControl.panStepSize = 0.8
            map.moveRight()
            setTimeout(function () {
                map.zoomDuration = 1;
                map.zoomControl.panStepSize = 0.1;
            }, 100);
        }, 100);

        
    });


    function LoadPopup(strTitle) {
        $('.popup').hide();
        $('[popupname]').each(function () {
            if ($(this).attr('popupname') == strTitle)
                $(this).fadeIn(500);
        });
    }
    $(document).ready(function () {
        $('.screen, .ClosePop').click(function () {
            $('.popup').fadeOut(500);
            $('.screen').fadeOut(200);
        }); 
        
        //setTimeout(function () {
        //    alert('Start');
        //    $('#mapdiv path').each(function () {
        //        if ($(this).attr('d').indexOf('South Africa') != -1)
        //        {
        //            alert($(this).attr('d'));
        //            $(this).click();
        //        }
        //    });
        //}, 5000);

    });
</script>
<asp:Literal ID="litScriptz" runat="server"></asp:Literal>

<asp:Literal ID="litPopups" runat="server"></asp:Literal>
 
<style>
    .mapdiv
    {
        background:black !important;
    }
    
    .screen
    {
        
    }
    
    .popup
    {
        top:0px;
        left:0px;
        width:862px;
        padding:20px;
        display:none;
        z-index:10001;
    }
    .ContactInfo {
        display: block;
        width: 213px;
        min-height: 140px;
        float: left;
        line-height: 1.5;
        font-size: 12px;
    }
    .ClosePop
    {
        display:none;
    }
    
</style>
</div>