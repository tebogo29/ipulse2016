<%@ Control Language="C#" AutoEventWireup="true" CodeFile="People.ascx.cs" Inherits="FWI_Modules_user_People" %>
<%--105 x 141--%>

<style>
    .PeopleLevel
    {
        width: 100%;
        display: block;
        text-align: center;
        padding:20px 0px 10px 0px;
        border-bottom: solid 1px #151314;
    }
      /*  .PeopleLevel .person
        {
            margin: 0px 5px 20px 5px;
            *float:left;
            height: 204px;
            text-align: center;
            display: inline-block;
            position:relative;
        }
            .PeopleLevel .person .imgage
            {
                border: solid 10px #151314;
                border-bottom: none;
                display: block;
                width: 111px;
                height: 144px;
                position: relative;
                margin-left: 19px;
            }

                .PeopleLevel .person .imgage .thePerson
                {
                    background: url('/SiteImages/People/placeholder_02.jpg') center top;
                    -moz-background-size: cover;
                    background-size: cover;
                    border: solid 3px #484647;
                    border-bottom: none;
                    width: 105px;
                    height: 141px;
                    display: block;
                }
                .PeopleLevel .person .imgage .leftSlope
                {
                    background: url('/siteImages/people/orange_arrow_left.png');
                    width: 19px;
                    height: 8px;
                    display: block;
                    position: absolute;
                    left: -29px;
                    bottom: 0px;
                }
                .PeopleLevel .person .imgage .rightSlope
                {
                    background: url('/siteImages/people/orange_arrow_right.png');
                    width: 19px;
                    height: 8px;
                    display: block;
                    position: absolute;
                    right: -29px;
                    bottom: 0px;
                }

            .PeopleLevel .person .aboutPerson
            {
                background: #e77802;
                display: block;
                width: 168px;
                min-height: 38px;
                color: white;
                font-size: 13px;
                text-align: center;
                padding-top: 7px;
            }
                .PeopleLevel .person .aboutPerson .Position
                {
                    color: white;
                    font-size: 11px;
                    text-align: center;
                    padding-top: 7px;
                }



    .PeopleLevel .aboutToolTip
    {
        border: solid 10px #151314;
        background: #000000;
        padding: 10px;
        top: 200px;
        position: absolute;
        z-index: 99;
        width: 430px;
        color: white;
        line-height: 1.3;
        left: -100%;

        opacity: 0;
        display:none\9;
        *display:none;
        -moz-transition: all 0.2s ease-in;
        -o-transition: all 0.2s ease-in;
        -webkit-transition: all 0.2s ease-in;
        transition: all 0.2s ease-in;

        -moz-transform: rotateX(0deg) rotateY(90deg) ;
        -ms-transform: rotateX(0deg) rotateY(90deg) ;
        -o-transform: rotateX(0deg) rotateY(90deg) ;
        -webkit-transform: rotateX(0deg) rotateY(90deg) ;
        transform: rotateX(0deg) rotateY(90deg) ;
    }
    .PeopleLevel .person:hover .aboutToolTip,
    .PeopleLevel .person:hover .aboutToolTip
    {
        z-index: 100;
        opacity: 1;
        display:block\9;
        *display:block;
        -moz-transform: rotateX(0deg) rotateY(0deg) ;
        -ms-transform: rotateX(0deg) rotateY(0deg) ;
        -o-transform: rotateX(0deg) rotateY(0deg) ;
        -webkit-transform: rotateX(0deg) rotateY(0deg) ;
        transform: rotateX(0deg) rotateY(0deg) ;
    }
    */
</style>


<div class="PeopleLevel">
    <asp:Literal ID="litLvl1" runat="server"></asp:Literal>
</div>


<div class="PeopleLevel">
    <asp:Literal ID="litLvl2" runat="server"></asp:Literal>
</div>


<div class="PeopleLevel">
    <asp:Literal ID="litLvl3" runat="server"></asp:Literal>
</div>
