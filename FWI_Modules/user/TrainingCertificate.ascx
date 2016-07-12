<%@ Control Language="C#" AutoEventWireup="true" CodeFile="TrainingCertificate.ascx.cs" Inherits="FWI_Modules_user_TrainingCertificate" %>
<style>
    .CertGroup{
        background:#262425;
        width:100%;
        display:block;
        height:156px;
        margin: 0px 0px 15px 0px;
    }
    .imgTitle{
        float:left;
        width:65px;
        height:156px;
        display:block;
    }
    .CertLeft{
        position:relative;
        float:left;
        width:105px;
        height:77px;
        display:block;
        background:black;
        margin:30px 10px 0px 10px;
        color:white;
        padding:10px;
        font-size:13px;
        line-height:  1;
    }
    .CertLeft.three{
        width:161px;
    }
    .CertLeft.two{
        width:273px;
    }

    .CertLeft:nth-child(2){
        margin:30px 10px 0px 20px;
    }
    .CertLeftSign{
        float:left;
        width:23px;
        height:97px;
        display:block;
        margin:60px 0px 0px 0px;
        color:white;
        font-size: 30px;
    }
    .CertRight{
        position:relative;
        float:right;
        width:105px;
        height:77px;
        display:block;
        background:black;
        margin:30px 20px 0px 10px;
        color:white;
        padding:10px;
        font-size: 16px;
        line-height: 19px;
    }
    .CertRightSign{
        float:right;
        width:23px;
        height:97px;
        display:block;
        margin:60px 0px 0px 0px;
        color:white;
        font-size: 30px;
    }
        .CertLeft div,
        .CertRight div
        {
            font-size: 16px;
            margin-bottom:10px;
            line-height: 0.9;
                    text-align:left
        }
    .HoverElem
    {
        position: absolute;
        top: 0px;
        left: 0px;
        opacity: 0;
        display:none\9;
        *display:none;
        -moz-transition: all 0.2s ease-in;
        -o-transition: all 0.2s ease-in;
        -webkit-transition: all 0.2s ease-in;
        transition: all 0.2s ease-in;
        z-index: 99;

        -moz-transform: rotateX(0deg) rotateY(90deg) ;
        -ms-transform: rotateX(0deg) rotateY(90deg) ;
        -o-transform: rotateX(0deg) rotateY(90deg) ;
        -webkit-transform: rotateX(0deg) rotateY(90deg) ;
        transform: rotateX(0deg) rotateY(90deg) ;
    }
    .CertLeft:hover .HoverElem,
    .CertRight:hover .HoverElem
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
    .HoverElem .line{
        background: #f77e09;
        width: 2px;
        height: 97px;
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 99;
    }
    .HoverElem .content{
        border: solid 4px #f77e09;
        background: #e79947;
        padding: 10px;
        top: 97px;
        position: absolute;
        z-index: 999;
        width: 431px;
        border-left: solid 6px #f77e09;
    }
</style>

<asp:Literal ID="litCOntent" runat="server"></asp:Literal>

