<%@ Page Language="vb" Culture="es-MX" UICulture="es" AutoEventWireup="false" CodeBehind="Report.aspx.vb" Inherits="PLAYADELCARMEN.Report" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <title>Argeomatica Playa del Carmen Report</title>
    <link rel="stylesheet" href="css/Report.css" />
    <link rel="stylesheet" href="fontawesome/css/font-awesome.min.css" />
</head>

<body>

<form id="frm" runat="server">
<asp:ScriptManager ID="scriptManager" runat="server"></asp:ScriptManager>
      
<div id="frameTOP">

<div id="frameLOTE">

    <asp:TextBox ID="tbCLAVE_LOTE" runat="server" Style="display:none" />  
    <table id="tblLOTE">
        <tbody>
        <tr><td>SUPERFICIE</td><td><asp:TextBox ID="tbSuperficie" runat="server" ReadOnly="true" /></td></tr>
        <tr><td>DEPARTMENTOS</td><td><asp:TextBox ID="tbDepartmentos" runat="server" ReadOnly="true" /></td></tr>
        <tr><td>TIENDAS</td><td><asp:TextBox ID="tbTiendas" runat="server" ReadOnly="true" /></td></tr>
        <tr><td>GASTRONOMIA</td><td><asp:TextBox ID="tbGastronomia" runat="server" ReadOnly="true" /></td></tr>
        <tr><td>HOTEL</td><td><asp:TextBox ID="tbHotel" runat="server" ReadOnly="true" /></td></tr>
        <tr><td>INSTITUCIONAL</td><td><asp:TextBox ID="tbInstitucional" runat="server" ReadOnly="true" /></td></tr>
        <tr><td>NOTAS</td><td><asp:TextBox ID="tbNotas" runat="server" ReadOnly="true" /></td></tr>
        <tr><td>STATUS</td><td><asp:TextBox ID="tbStatus" runat="server" ReadOnly="true" /></td></tr>
        </tbody>
    </table>

</div>

<asp:UpdatePanel ID="updatePnlClave" runat="server">
<ContentTemplate>

    <div id="sliderClaveTable"></div>

    <div id="frameClaveTable">
        <asp:Button ID="aspTableClaveFill" runat="server" Style="display:none"/>
        <asp:Button ID="aspTableClaveEmpty" runat="server" Style="display:none"/>
        <asp:GridView ID="gvClave" runat="server" AutoGenerateColumns="false" GridLines="None">
            <Columns>
                <asp:BoundField DataField="CLAVE" ItemStyle-CssClass="CLAVE" HeaderText="CLAVE" />
                <asp:BoundField DataField="CLAVE_ORG" ItemStyle-CssClass="CLAVE_ORG" HeaderText="CLAVE ORG" />
                <asp:BoundField DataField="NOMBRE" ItemStyle-CssClass="NOMBRE" HeaderText="NOMBRE" />
                <asp:BoundField DataField="NUMERO_PREDIO" ItemStyle-CssClass="NUMERO_PREDIO" HeaderText="NUMERO PREDIO" />
                <asp:BoundField DataField="CALLE_PREDIO" ItemStyle-CssClass="CALLE_PREDIO" HeaderText="CALLE PREDIO" />
                <asp:BoundField DataField="USO" ItemStyle-CssClass="USO" HeaderText="USO" />
                <asp:BoundField DataField="TIPO_CONST" ItemStyle-CssClass="TIPO_CONST" HeaderText="TIPO CONST" />
                <asp:BoundField DataField="AREA" ItemStyle-CssClass="AREA" HeaderText="AREA" />
            </Columns>
            <HeaderStyle CssClass="gvHeader" /> 
            <RowStyle CssClass="gvRow" /> 
            <PagerStyle CssClass="gvPager" /> 
        </asp:GridView>
    </div>

    <div id="sliderClaveDetails"></div>

    <div id="frameClaveDetails" >
        <table id="tblCLAVE">
            <tbody>
            <tr><td>CLAVE</td><td><asp:TextBox ID="tbCLAVE" text="" runat="server" ReadOnly="true" /></td></tr>
            <tr><td>CLAVE ORG</td><td><asp:TextBox ID="tbCLAVE_ORG" text="" runat="server" ReadOnly="true" /></td></tr>
            <tr><td>NOMBRE</td><td><asp:TextBox ID="tbNOMBRE" text="" runat="server" ReadOnly="true" /></td></tr>
            <tr><td>NUMERO PREDIO</td><td><asp:TextBox ID="tbNUMERO_PREDIO" text="" runat="server" ReadOnly="true" /></td></tr>
            <tr><td>CALLE PREDIO</td><td><asp:TextBox ID="tbCALLE_PREDIO" text="" runat="server" ReadOnly="true" /></td></tr>
            <tr><td>USO</td><td><asp:TextBox ID="tbUSO" runat="server" text="" ReadOnly="true" /></td></tr>
            <tr><td>TIPO CONST</td><td><asp:TextBox ID="tbTIPO_CONST" text="" runat="server" ReadOnly="true" /></td></tr>
            <tr><td>AREA</td><td><asp:TextBox ID="tbAREA" runat="server" text="" ReadOnly="true" /></td></tr>
            </tbody>
        </table>
    </div>

    <asp:TextBox ID="tbSEARCH" runat="server"/>
    <asp:TextBox ID="tbCLAVEsearch" runat="server" Style="display:none" />
    <div id="btnSEARCH"><i class="fa fa-search" style="font-size:20px"></i></div>
    <div id="frameSearchTable">
        <asp:Button ID="aspTableSearchFill" runat="server" Style="display:none"/>
        <asp:Button ID="aspFindCLAVE" runat="server" Style="display:none"/>
        <asp:GridView ID="gvSearch" runat="server" AutoGenerateColumns="false" GridLines="None" >
            <Columns>
                <asp:BoundField DataField="CLAVE" ItemStyle-CssClass="CLAVEsearch" HeaderText="CLAVE" />
                <asp:BoundField DataField="CLAVE_ORG" ItemStyle-CssClass="CLAVE_ORGsearch" HeaderText="CLAVE ORG" />
                <asp:BoundField DataField="NOMBRE" ItemStyle-CssClass="NOMBREsearch" HeaderText="NOMBRE" />
                <asp:BoundField DataField="NUMERO_PREDIO" ItemStyle-CssClass="NUMERO_PREDIOsearch" HeaderText="NUMERO PREDIO" />
                <asp:BoundField DataField="CALLE_PREDIO" ItemStyle-CssClass="CALLE_PREDIOsearch" HeaderText="CALLE PREDIO" />
                <asp:BoundField DataField="USO" ItemStyle-CssClass="USOsearch" HeaderText="USO" />
                <asp:BoundField DataField="TIPO_CONST" ItemStyle-CssClass="TIPO_CONSTsearch" HeaderText="TIPO CONST" />
                <asp:BoundField DataField="AREA" ItemStyle-CssClass="AREAsearch" HeaderText="AREA" />
            </Columns>
            <HeaderStyle CssClass="gvHeader" /> 
            <RowStyle CssClass="gvRow" /> 
            <PagerStyle CssClass="gvPager" /> 
        </asp:GridView>
    </div>

</ContentTemplate>
</asp:UpdatePanel>

</div>

<div id="btnSaveLote" class="btn"><i class="fa fa-asterisk fa-3x"></i></div>
<div id="btnAddClave" class="btn"><i class="fa fa-lock fa-3x"></i></div>
<div id="btnConstruccion" class="btn"><i class="fa fa-home fa-3x"></i></div>
<div id="btnCube" class="btn"><i class="fa fa-cubes fa-2x"></i></div>

<div id="map"></div>

<div id="frameIMG"><ul id="imageCtrl"><li><a href="#"><img id="FOTO" src="img/blank.png"/></a></li></ul></div>

</form>

<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="scripts/openLayers.2.13.1.js"></script>
<script type="text/javascript" src="scripts/jQuery.2.1.0.js"></script>
<script type="text/javascript" src="scripts/jQueryUI.1.10.4.js"></script>
<script type="text/javascript" src="scripts/gridviewScroll.min.js"></script>
<script type="text/javascript" src="http://rawgit.com/kekscom/osmbuildings/master/dist/OSMBuildings-OpenLayers.js"></script>
<script type="text/javascript" src="scripts/report.js"></script>

<script type="text/javascript">


    //showClaveDetails
    function showClaveDetails(tr) {
        $('#tbCLAVE').val($('.CLAVE', tr).text());
        $('#tbCLAVE_ORG').val($('.CLAVE_ORG', tr).text());
        $('#tbNOMBRE').val($('.NOMBRE', tr).text());
        $('#tbNUMERO_PREDIO').val($('.NUMERO_PREDIO', tr).text());
        $('#tbUSO').val($('.USO', tr).text());
        $('#tbTIPO_CONST').val($('.TIPO_CONST', tr).text());
        $('#tbAREA').val($('.AREA', tr).text());
        document.getElementById('frameClaveDetails').style.display = 'block';
        $('#sliderClaveDetails').animate({ width: $('#frameClaveDetails').width() + 50 });
    }

    //pageLoad block
    function pageLoad() {

        //table hover
        $(function () {
            $('[id*=gv] td').hover(
                function () { $('td', $(this).closest('tr')).addClass('gvRowHover'); },
                function () { $('td', $(this).closest('tr')).removeClass('gvRowHover'); }
                );
        });

        //clave table
        $(function () {
            var len = $("#<%=gvClave.ClientID%> tr").length;
            if (len > 2) {
                document.getElementById('frameClaveTable').style.display = 'block';
                $('#<%=gvClave.ClientID%>').gridviewScroll({
                    width: $('#frameClaveTable').width(),
                    height: 200
                });
                $('#sliderClaveTable').animate({ width: $('#frameClaveTable').width() + 50 });
            } else if (len == 2) {
                showClaveDetails($("#<%=gvClave.ClientID%> tr"));
            }
        });

        //clave table click
        $(function () {
            $('[id*=gvClave] td').click(function () { showClaveDetails($(this).closest('tr')) });
        });

        //slider button clave table / clave details
        $(function () {
            $('#sliderClaveDetails').click(
                function () {
                    $('#sliderClaveDetails').animate({ width: '0' });
                    document.getElementById('frameClaveDetails').style.display = 'none';
                }
            );
        });

        //slider button search / clave table
        $(function () {
            $('#sliderClaveTable').click(
                function () {
                    $('#sliderClaveTable').animate({ width: '0' });
                    document.getElementById('frameClaveTable').style.display = 'none';
                    $('#sliderClaveDetails').animate({ width: '0' });
                    document.getElementById('frameClaveDetails').style.display = 'none';
                });
        });

        //search button click
        $(function () {
            $('#btnSEARCH').click(function () {
                document.getElementById('aspTableSearchFill').click();
            });
        });

        //search table scroll
        $(function () {
            $('#<%=gvSearch.ClientID%>').gridviewScroll({
                width: $('#frameSearchTable').width(),
                height: 200
            });
        });

        //search table click
        $(function () {
            $('[id*=gvSearch] td').click(function () {
                $('#tbCLAVEsearch').val($('.CLAVEsearch', $(this).closest('tr')).text().substring(0, $('.CLAVEsearch', $(this).closest('tr')).text().indexOf('/')));
                document.getElementById('aspFindCLAVE').click();
            });
        });

        //extrude buildings
        $(function () {
            $('#btnCube').click(function () {
                extrudeCONSTRUCCIONES();
            });
        });

    }

</script>

</body>

</html>