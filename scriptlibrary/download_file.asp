<%
' check for valid session if it matches that on the site.. if so.. , check root folder for read permissions

' check for file extension
' if valid... force download.

         if ( ( instr(request("file"),".mdb") <> 0 ) or ( instr(request("file"),".asp") <> 0 ) or ( instr(request("file"),".aspx") <> 0 ) or ( instr(request("file"),".xml") <> 0 ) or ( instr(request("file"),".js") <> 0 )or ( instr(request("file"),".asa") <> 0 )or ( instr(request("file"),".swf") <> 0 ) or ( instr(request("file"),".htm") <> 0 ) ) then
        %>
            <script language="javascript">
                alert("Your file chosen appears to be invalid.\n\nPlease contact an administrator.");
            </script>         
        <%
        response.End
        else
                ' FORCE THE DOWNLOAD OF THE FILE    
            
                '=======================
                'Define the names of your functions
                '=======================
                Dim Stream
                Dim Contents
                Dim FileName
                Dim FileExt
                Const adTypeBinary = 1
                '=======================
                'Get the actual file name from the URL that is passed to the browser
                '=======================
                FileName = request.querystring("file") 'Get the name from the URL
                '=======================
                'GIVE AN ERROR MESSAGE IF THE URL IS EMPTY
                '=======================
                if FileName = "" Then
                response.write "Filename Not specified."
                response.end
                end if
                '=======================
                'prevent access to certain files
                '=======================
                FileExt = Mid(FileName, InStrRev(FileName, ".") + 1)
                select case UCase(FileExt)
                Case "ASP", "ASA", "ASPX", "ASAX", "MDB" ,"","SWF","PNG"
                response.write "You cannot access these file types."
                response.end
                end select
                '=======================
                'Start the download process if all is good
                '=======================
                
                FileNameS = mid(FileName,instrRev(FileName,"/")+1,len(FileName)-instrRev(FileName,"/")+1)
                
                response.clear
                response.contentType = "application/octet-stream"
                response.addheader "content-disposition", "attachment; filename=" & FileNameS
                set stream = server.CreateObject("ADODB.Stream")
                stream.type = adTypeBinary
                stream.open
                stream.LoadFromFile Server.MapPath(FileName) 
                while not stream.EOS
                response.BinaryWrite Stream.Read(1024 * 64)
                wend
                stream.Close
                Set stream = Nothing
                response.Flush
                response.End

        end if


 %>