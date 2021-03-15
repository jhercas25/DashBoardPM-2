function DatosGastos(params) {

  var url = '/Caja/Gastos';

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

    localStorage.setItem('Gastoid', JSON.stringify(row.ID))

    btnadd = document.getElementById("BtnGasto");
    btnedit = document.getElementById("BtnEditGasto");
    btnadd.classList.remove("d-block")
    btnadd.classList.add('d-none');
    btnedit.classList.add("d-block");
    btnedit.classList.remove('d-none');

    $('#NGasEle').val(row.MontoElectronico)
    $('#NGasEfe').val(row.MontoEfectivo)
    $('#GasDes').val(row.Descripcion)

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

function DatosGastos(params) {
  var url = '/Caja/Gastos';

  //console.log(url);
  $.get(url).then(function (res) {
    const Gastos = res;
    params.success(Gastos);
  });

}

function Gastos(Efectivo, Electronico, Descripcion, Responsable) {

  console.log({ Electronico, Efectivo, Descripcion, Responsable });

  if (Efectivo == '' && Electronico == '' || Descripcion == '') return 0

  if (Efectivo == '0' && Electronico == '0') return 0

  var url = '/Caja/Gastos';
  $.post(url, { MontoElectronico: Electronico.replace(/\./g, '').replace(/\,/g, '.') / 1, MontoEfectivo: Efectivo.replace(/\./g, '').replace(/\,/g, '.') / 1, Descripcion, Responsable }).then(function (res) {
    console.log(res);
    $('#Gastos').bootstrapTable('refresh');
    ActualizarValores();
  });

}

function EditarGastos(Efectivo, Electronico, Descripcion, Responsable, id) {
  
  if (Efectivo == '' || Electronico == '') return 0
   

  var url = `/Caja/Gastos/Edit/${id}`;
  $.post(url, {  MontoElectronico: Electronico.replace(/\./g, '').replace(/\,/g, '.') / 1, MontoEfectivo: Efectivo.replace(/\./g, '').replace(/\,/g, '.') / 1, Descripcion, Responsable }).then(function (res) {
    console.log(res);
    $('#Gastos').bootstrapTable('refresh');
  });

  localStorage.removeItem('Gastoid')
  btnadd = document.getElementById("BtnGasto");
  btnedit = document.getElementById("BtnEditGasto");

  btnedit.classList.remove("d-block")
  btnedit.classList.add('d-none');
  btnadd.classList.add("d-block");
  btnadd.classList.remove('d-none');
  $('#NGasEle').val('')
  $('#NGasEfe').val('')
  $('#GasDes').val('')
  ActualizarValores();
}

function ActualizarValores(){
  var url = '/Caja/Actualizar';

  //console.log(url);
  $.get(url).then(function (res) {
    //console.log(res); 
    $('#EntEle').val(res.Entradas.Electronico)
    $('#EntEfe').val(res.Entradas.Efectivo)
    $('#SalEle').val(res.Salidas.Electronico)
    $('#SalEfe').val(res.Salidas.Efectivo)
    $('#GasEle').val(res.Gastos.Electronico)
    $('#GasEfe').val(res.Gastos.Efectivo)
    $('#TotEle').val(res.Total.Electronico)
    $('#TotEfe').val(res.Total.Efectivo)
    
  });
}

