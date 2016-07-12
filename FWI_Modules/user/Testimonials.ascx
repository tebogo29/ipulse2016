<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Testimonials.ascx.cs" Inherits="FWI_Modules_user_Testimonials" %>
<div class="sfContentBlock HpBlackBlock">
    
        <asp:Literal ID="litTest" runat="server"></asp:Literal> 
    
       
</div>
<script>
    var CountTest = 0;
    var CountTestPos = 1;
    $(document).ready(function () {

        CountTest = parseInt($('[testcount]').attr('testcount'));

        setTimeout(function () {
            DoTestSlide();
        }, 8000);
    });

    function DoTestSlide() {
        CountTestPos++;
        if (CountTestPos > CountTest) CountTestPos = 1;

        $('[testimonial]').each(function () {
            if ($(this).attr('testimonial') == CountTestPos) {
                var theElement = $(this);
                $('.TestActive').fadeOut(500, function () {
                    theElement.fadeIn(500);
                });
                $('.TestActive').removeClass('TestActive');
                theElement.addClass('TestActive');
            }
        });

        setTimeout(function () {
            DoTestSlide();
        }, 8000);
    }

</script>