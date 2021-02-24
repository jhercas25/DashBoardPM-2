function DatosGastos(params) {

  var url = '/Caja/Gastos/Historico';

  //console.log(url);
  $.get(url).then(function (res) {
    const Gastos = res;
    console.log(Gastos);
    params.success(Gastos);
  });

}

//DatosDetalleCaja
function GastosOP(value, row, index) {

  ///Tran/Editar/${Documento}&${Tipo}
  return [
    `<a class="edit" href=" javascript:void(0)" title="Like">`,
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',

  ].join('')
}

window.EventsGastos = {

  'click .edit': function (e, value, row, index) {




  },
  'click .remove': function (e, value, row, index) {

  },


}

function DatosDetalleGastos(index, row) {
  //console.log(row);
  var html = []
  st = '';
  html.push(` <div class="col-md-12"> <table class="table" style="text-align: center;" > 
  
    <thead > 
    <tr class="d-none d-sm-block"  >
    <th style="min-width:100px;" >Marca</th>  
    <th style="min-width:125px;">Detalle</th> 
    <th style="min-width:120px;">P.Compra</th> 
    <th style="min-width:65px;">Iva</th>  
    <th style="min-width:135px;" >Proveedor</th> 
    <th style="width:185px;" >Imagen </th> 
    </tr>
    <tr class="d-block d-sm-none" style="min-width:200px;" >
    <th  style="min-width:130px;">Detalle </th> 
    <th  style="min-width:170px;">Img</th> 
    </tr>
    </thead> 
  
    <tbody > `);

  // console.log(row)
  var d = new Date();
  var n = d.getSeconds();

  html.push(`
    <tr class="d-none d-sm-block" >
    <td style="min-width:100px;"> ${row.Marca}</td>
    <td style="min-width:125px;"> ${row.Detalle} </td>
    <td style="min-width:120px;"> ${row.PCompra}</td>
    <td style="min-width:65px;"> ${row.Iva}</td>
    <td style="min-width:135px;"> ${row.PoC} - ${row.Proveedor} </td>
    <td style="width:195px;"> <img src="/uploads/Imagenes-Producto/${row.ImagenP}?${n}" class="img-thumbnail-sm"> </img> </td>
    </tr >
  
    <tr class="d-block d-sm-none" >
    <td  style="min-width:130px; max-width:130px"> <p><strong> Marca: </strong>${row.Marca}</p>  <p><strong>P.Compra:</strong>  $${row.PCompra}</p> <p><strong>Iva:</strong>${row.Iva}</p> <p><strong>Proveedor:</strong> ${row.PoC} - ${row.Proveedor}</p> </td>
    <td style="min-width:170px;"> <img src="/uploads/Imagenes-Producto/${row.ImagenP}?${n}" class="img-thumbnail-sm"> </img> </td>
    </tr >
    
     `);



  html.push(' </tbody> </table>');
  return html.join('');


}

function CrearApertura(){



}
function EditarApertura(){

}

