function Reporte_Data(params) {



    var url = `/Rep/His/`;
    FD = new Date()
    FD.setDate(FD.getDate() - 30);
    FDs = FD.getFullYear() + '-' + (FD.getMonth() + 1) + '-1';

    FH = new Date();
    FH.setDate(FH.getDate() + 0);
    FHs = FH.getFullYear() + '-' + (FH.getMonth() + 1) + '-' + FH.getDate();
    var text = '';

    Prov = $('#PoCSelR').val();

    console.log({ FDs, FHs, Prov });

    $('#FechaDesde').change(function () {
        FD = $('#FechaDesde').val();
        console.log({ FD, FH });
        if (FD != '') {
            FDs = FD.split('/')[2] + '-' + FD.split('/')[1] + '-' + FD.split('/')[0]
        }
        if (Prov != null) {
            url = `/Rep/HisPoC/` + `${Prov}&Ventas&${FDs}&${FHs}`
        }
        else {
            url = `/Rep/His/` + `Ventas&${FDs}&${FHs}`
        }

        $.get(url).then(function (res) { params.success(res) })
        return;
    });

    $('#FechaHasta').change(function () {

        //console.log('dfsd');
        FH = $('#FechaHasta').val();
        console.log({ FD, FH });
        if (FH != '') {
            FHs = FH.split('/')[2] + '-' + FH.split('/')[1] + '-' + FH.split('/')[0]
        }
        if (Prov != null) {
            url = `/Rep/HisPoC/` + `${Prov}&Ventas&${FDs}&${FHs}`
        }
        else {
            url = `/Rep/His/` + `Ventas&${FDs}&${FHs}`
        }
        $.get(url + `Ventas&${FDs}&${FHs}`).then(function (res) { params.success(res) })
        return;
    });

    $('#PoCSelR').change(function () {

        //console.log('dfsd');
        Prov = $('#PoCSelR').val();
        console.log({ Prov });
        if (Prov != '') {
            url = `/Rep/HisPoC/` + `${Prov}&Ventas&${FDs}&${FHs}`
        }
        else {
            url = `/Rep/His/` + `Ventas&${FDs}&${FHs}`
        }

        $.get(url).then(function (res) { params.success(res) })
        return;
    });

    if (Prov != null) {
        url = `/Rep/HisPoC/` + `${Prov}&Ventas&${FDs}&${FHs}`
    }
    else {
        url = `/Rep/His/` + `Ventas&${FDs}&${FHs}`
    }

    $.get(url).then(function (res) { params.success(res) });



}
function Reporte_Detalle(index, row) {
    var html = []

    console.log(row);
    st = 'style=" word-wrap: break-word;min-width: 60px;max-width: 160px;"';
    html.push(`<table class="table" style="text-align: center;" > 
    <thead>
        <th>Codigo</th>
        <th>Nombre</th>  
        <th>Cantidad</th> 
        <th>Iva</th> 
        <th>V.Unitario</th>
        <th>Total</th>
    </thead> 
    <tbody id= "Tbody${row.Documento}" > `)
    // console.log(row)
    Prov = $('#PoCSelR').val() != null ? $('#PoCSelR').val() : 'NOPOC';

    url = `/Rep/RepDet/${row.Documento}&${Prov}`;

    $.get(url).then(function (res) {
        console.log(res);
        html2 = '';
        res.forEach(e => {

            var d = new Date();
            var n = d.getSeconds();
            html2 = html2 + `

      <tr>
      <td ${st}> ${e.Codigo}</td>
      <td ${st}> ${e.Nombre}</td>
      <td ${st}> ${e.Cantidad}</td>
      <td ${st}> ${e.Iva}</td>
      <td ${st}> ${e.Valor}</td>
      <td ${st}> ${e.Total}</td>
      
      </tr>

         `;
            element = document.getElementById('Tbody' + e.Documento);
            element.innerHTML = html2;

        });


    });

    html.push(' </tbody> </table>');
    return html.join('');


}

async function ImprimirRep() {

    Data = $('#DetalleReporte').bootstrapTable('getData');
    Data2 = []
    PoC = $('#PoCSelR').val() != null ? $('#PoCSelR').val() : 'NOPOC';

    await Data.forEach(async e => {

        url = `/Rep/RepDet/${e.Documento}&${PoC}`;

        await $.get(url).then(function (res) {
            Data2.push({ Documento: e, Detalle: res })
            console.log(Data2);

            if (Data2.length == Data.length) {
                console.log(Data2);
                url=`/Rep/ImpReporte`;
                $.post(url,{Data:Data2,T:[{Tipo:'Reportes'}]}).then(function (res) {
                 console.log(respuesta,res);
                });
                Data2=[];
            }

        });



    });




}

// Reporte_Ops;
// Reporte_Events