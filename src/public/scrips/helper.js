
function quitarAcentos(cadena) {
  const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
  return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
}

function CerrarModal() {

  $('#BarcodeReader').modal('hide');

  $('#NuevoPoC').modal('hide');
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();
  setTimeout(function () { $('#table').bootstrapTable('refresh'); }, 1000);
  prov = document.getElementById('PoC') ? document.getElementById('PoC').innerText : null;
  if (prov == null) {
    LlenarProv(true);
  }

}

function ajaxRequest(params) {

  var Prov = $('#NitoCCT').val() ? ($('#TipoT')[0].innerText == "Compras" || $('#TipoT')[0].innerText == "Pedidos" ? $('#NitoCCT').val() : "p") : "p";
  console.log('Actualizando', Prov);
  var url = '/inv/Tinv';
  var text = '';

  $('#Codigo').keyup(function () {
    var Prov = $('#NitoCCT').val() ? ($('#TipoT')[0].innerText == "Compras" || $('#TipoT')[0].innerText == "Pedidos" ? $('#NitoCCT').val() : "p") : "p";

    console.log(Prov);
    text = quitarAcentos($('#Codigo').val());
    //console.log("edv");
    if (text != '') {

      $.post(url, { id: text, Prov: Prov }).then(function (res) { params.success(res) })
      return;
    } else {
      $.get(url).then(function (res) { params.success(res) });
    }
  });

  $('#NombrePro').keyup(function () {
    var Prov = $('#NitoCCT').val() ? ($('#TipoT')[0].innerText == "Compras" || $('#TipoT')[0].innerText == "Pedidos" ? $('#NitoCCT').val() : "p") : "p";

    console.log(Prov);
    console.log("edv");
    text = quitarAcentos($('#NombrePro').val());
    if (text != '') {

      $.get(url + '/Prod/' + text + '&' + Prov).then(function (res) { params.success(res) })

      return;
    } else {
      $.get(url).then(function (res) { params.success(res) });
    }
  });

  $.get(url + '/' + Prov).then(function (res) { params.success(res) });
}

function DetalleT(params) {

  Tipo = document.getElementById('TipoT').innerText
  var url = '/Tran/DetalleT';
  parametros = $('#NumeroT').val();

  if (parametros != '') {
    $.get(url + '/' + parametros + '&' + Tipo).then(function (res) {
      //console.log(res);
      params.success(res);
      Totalizar();
    });
  }


}

function traerDatos(params) {

  prov = document.getElementById('PoC').innerText;

  var url = `/PoC/${prov}/datos`;
  var text = '';

  $('#NitoCC').keyup(function () {

    text = quitarAcentos($('#NitoCC').val());
    if (text != '') {

      $.get(url + '/nit/' + text).then(function (res) { params.success(res) })


      return;
    } else {
      $.get(url).then(function (res) { params.success(res) });
    }
  });

  $('#NombrePoC').keyup(function () {

    //console.log('dfsd');
    text = quitarAcentos($('#NombrePoC').val());
    if (text != '') {

      $.get(url + '/nomb/' + text).then(function (res) { params.success(res) })

      return;
    } else {
      $.get(url).then(function (res) { params.success(res) });
    }
  });

  $.get(url).then(function (res) { params.success(res) });
}

function detailFormatter(index, row) {
  //console.log(row);
  var html = []
  st = '';
  html.push(`<table class="table" style="text-align: center;" > 

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



  var d = new Date();
  var n = d.getSeconds();

  html.push('</tbody> </table>');

  html.push(`<table class="table " style=" text-align: center;" > 
    <thead > 
    <tr class="d-none d-sm-block" >
      <th style="min-width:130px;">Codigo</th> 
      <th style="min-width:130px;">Variante</th> 
      <th style="min-width:130px;">Existencias</th>  
      <th style="min-width:230px;">Imagen</th>   
      <th style="min-width:50px;"> </th>  
    </tr>
    <tr class="d-block d-sm-none"  >
    <th  style="min-width:230px;">Detalle </th> 
    <th  style="min-width:50px;"></th> 
    </tr>
    </thead> 
  <tbody  id="Tbody${row.Codigo}"> 
    
     `);

  var url = '/inv/Variantes';
  $.post(url, { Codigo: row.Codigo }).then(function (res) {
    //console.log(res);
    //console.log(res);
    html2 = '';
    res.forEach(e => {

      var d = new Date();
      var n = d.getSeconds();
      html2 = html2 + `

      <tr class="d-none d-sm-block">
      <td  style="min-width:130px;"> ${e.Codigo}</td>
      <td  style="min-width:130px;"> ${e.Variacion}</td>
      <td  style="min-width:130px;"> ${e.Cantidad}</td>
      <td  style="min-width:230px;"> <img src="/uploads/Imagenes-Producto/${e.imagen}.jpg?${n}" class="img-thumbnail-sm"> </img> </td>
      <td  style="min-width:50px;"> <a onclick= "add('${e.Codigo}')"  href="javascript:void(0)" title="Add"><i class="fas fa-plus"></i></a> </td>
      </tr>
      <tr class="d-block d-sm-none"  >
      <td style="min-width:230px;" > <p> <strong>Codigo:</strong>${e.Codigo}</p> <p><strong>Variacion:</strong>${e.Variacion}</p> <p><strong>Existencias:</strong>${e.Cantidad} </p> <span><img src="/uploads/Imagenes-Producto/${e.imagen}.jpg?${n}" class="img-thumbnail-sm"> </img></span></td>
      <td style="min-width:50px;"> <a onclick= "add('${e.Codigo}')"  href="javascript:void(0)" title="Add"><i class="fas fa-plus"></i></a> </td>
      </tr>

         `;
      element = document.getElementById('Tbody' + e.Codigo_P);
      element.innerHTML = html2;

    });


  });

  html.push(' </tbody> </table>');
  return html.join('');


}

function FormatoPoC(index, row) {
  var html = []
  prov = document.getElementById('PoC').innerText;

  st = 'style=" word-wrap: break-word;min-width: 60px;max-width: 160px;"'

  html.push('<table class="table" style="text-align: center;" > <thead> <th>Telefono 2</th> <th>E-mail</th>  <th>Observaciones</th> <th>Fecha de Actualizacion</th> </thead> <tbody > <tr>')
  $.each(row, function (key, value) {
    //console.log(row)
    if (key == 'Email') { key = 'E-mail', html.push('<td ' + st + ' >' + value + '</td>'); }
    else if (key == 'Tel2') { key = 'Telefono2', html.push('<td ' + st + ' >' + value + '</td>'); }
    else if (key == 'Observaciones') { key = 'Observaciones'; html.push('<td ' + st + ' >' + value + '</td>'); }
    else if (key == 'FechaActualizacion') { key = 'FechadeActualizacion'; html.push('<td ' + st + ' >' + value + '</td  >'); }

  });

  html.push('</tr> </tbody> </table>');
  return html.join('');
}

function operateFormatter(value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Like">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
  ].join('')
}

function DetalletTFomater(value, row, index) {
  return [
    '<a class="editarDetalle" href="javascript:void(0)" title="Editar">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
    '<a class="eliminarDetalle" href="javascript:void(0)" title="Eliminar">',
    '<i class="fas fa-trash-alt"></i>',
    '</a>  ',
  ].join('')
}

function FormatoT(value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Like">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
  ].join('')
}

function FormatoOperadorPoC(value, row, index) {
  return [
    '<a class="edit" href="javascript:void(0)" title="Like">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
  ].join('')
}

function traerCodigo() {
  url = '/inv/UltimoCodigo'
  Responsable = $('#User')[0].innerText;
  $.get(url + '/' + Responsable).then(function (res) {
    $('#CodProd').val(res)
    console.log(res);
    $('#VariantesTabla').bootstrapTable('refresh');
    $('#InventILF').bootstrapTable('refresh');
  });
}

function lpad(s, width, char) {
  return (s.length >= width) ? s : (new Array(width).join(char) + s).slice(-width);
}

window.operateEvents = {

  'click .edit': function (e, value, row, index) {
    //console.log(row);
    localStorage.setItem('producto', JSON.stringify(row));
    $('#EditP').modal('show');
  },
  'click .remove': function (e, value, row, index) {
    var $table = $('#table');
    $table.bootstrapTable('remove', {
      field: 'id',
      values: [row.id]
    });
  },
  'click .add': function (e, value, row, index) {
    // console.log(row);
    $('#CodigoT').val(row.Codigo);
    traerPro();

    $('#BuscarPro').modal('hide');
  },
}

function add(Cod) {
  $('#CodigoT').val(Cod);
  Tipo = document.getElementById('TipoT').innerText
  traerPro(Tipo);
  $('#BuscarPro').modal('hide');
}

window.EnventosPoC = {

  'click .edit': function (e, value, row, index) {
    //console.log(row);
    localStorage.setItem('PoC', JSON.stringify(row));

    $('#NuevoPoC').modal('show');
  },
  'click .remove': function (e, value, row, index) {
    var $table = $('#table');
    $table.bootstrapTable('remove', {
      field: 'id',
      values: [row.id]
    });
  }
}

window.eveILF = {

  'click .editarILF': function (e, value, row, index) {
    // console.log(row);
    localStorage.setItem('editILF', JSON.stringify(row));
    btnadd = document.getElementById("addILF");
    btnedit = document.getElementById("editILF");

    Tipo = document.getElementById('TipoT').innerText;

    btnadd.classList.add("invisible");
    btnedit.classList.remove("invisible");

    if (Tipo == "Ventas") {
      $('#InvLotFev').val(row.ILF).selectpicker('refresh');
      $('#Cntilf').val(row.Cnt);
    }
    if (Tipo == "Compras") {

      $('#Lot').val(row.Lote),
        $('#Fev').val(row.FechaVencimiento),
        $('#Inv').val(row.Invima),
        $('#Cntilf').val(row.Cnt);
    }

  },
  'click .eliminarILF': function (e, value, row, index) {
    url = '/inv/invILF/eliminar';
    ID = row.ID;

    //console.log(ID);
    $.get(url + '/' + ID).then(function (res) {
      //console.log(res);
      if (res = "OK") {
        $('#tableILF').bootstrapTable('refresh');
      }


    });

  }
}

window.DetalleTEvents = {

  'click .editarDetalle': async function (e, value, row, index) {
    // console.log('RowDetalle');
    console.log(row);
    LimpiarProdDetalle();

    localStorage.setItem('editDetalle', JSON.stringify(row));

    btnadd = document.getElementById("addDetalle");
    btnedit = document.getElementById("editDetalle");
    btnadd.classList.add("invisible");
    btnedit.classList.remove("invisible");


    if (row.Producto != "") {
      $('#CodigoT').val(row.Producto);
      Tipo = document.getElementById('TipoT').innerText
      await traerPro(Tipo);
      Vc = localStorage.getItem("Vc") / 1;
      Vv = row.Valor;


      Gn = (Vv / ((1 + (row.Iva / 100)) * Vc)) - 1;

      $('#Cnt').val(row.Cantidad);
      $('#Des').val(row.Descuento);
      $('#PreUni').val(row.Valor);
      localStorage.setItem("G", Gn * 100);

      NDes();
    }

    // $('#InvLotFev').val(row.ILF).selectpicker('refresh');
    // $('#Cntilf').val(row.Cnt);
  },
  'click .eliminarDetalle': function (e, value, row, index) {
    url = '/Tran/DetalleTtemp/eliminar';
    ID = row.ID;

    Doc = $('#NumeroT').val()
    //console.log(row);

    $.get(url + '/' + ID + '&' + Doc).then(function (res) {
      //console.log(res);
      if (res = "OK") {

        url = '/inv/invILF/eliminar/item';
        ID = row.Item;
        //console.log(ID);
        $.get(url + '/' + ID).then(function (res) {
          //console.log(res);
          if (res = "OK") {
            // console.log('ILF Eliminados ');
          }

        });

        //console.log(res);
        $('#tableDetalle').bootstrapTable('refresh');


      }


    });

  }
}

function opsILF(value, row, index) {
  return [
    '<a class="editarILF" href="javascript:void(0)" title="Editar">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
    '<a class="eliminarILF" href="javascript:void(0)" title="Eliminar">',
    '<i class="fas fa-trash-alt"></i>',
    '</a>  ',
  ].join('')
}

$(document).on('show.bs.modal', '#NuevoPoC', function () {
  //console.log('evento ejecutado');

  PoC = JSON.parse(localStorage.getItem('PoC'));
  if (PoC == null) {
    document.getElementById('PoCEdit').innerText = "Crear";
    $('#editar').val('0');
    $('#NitoCCEd').val("");
    $('#NitoCCEd').change();
  }
  else {
    document.getElementById('PoCEdit').innerText = "Editar";
    $('#editar').val('1');
    $('#NitoCCEd').val(PoC.NitoCC);
    $('#NitoCCEd').change();
  }


});
$(document).on('show.bs.modal', '#BarcodeReader', function () {
  //console.log('evento ejecutado');
  //App.init();
});
$(document).on('hiden.bs.modal', '#BarcodeReader', function () {
  //console.log('evento ejecutado');
  //Quagga.stop();
});

$(document).on('hide.bs.modal', '#NuevoPoC', function () {

  localStorage.removeItem('PoC');

})

$(document).on('show.bs.modal', '#EditP', function () {
  //console.log('evento ejecutado');
  Producto = localStorage.getItem('producto') ? JSON.parse(localStorage.getItem('producto')) : null;
  //console.log(Producto);
  url = '/inv/Prov'
  var htmlsel = ['<option selected>---Seleccione el proveedor---</option>'];

  htmlsel.push()
  $.get(url).then(function (res) {

    $('#ProveedorSel').empty();
    for (i = 0; i < res.length; i++) {

      $('#ProveedorSel').append(`<option  value ="${res[i].NitoCC}" data-subtext="${res[i].NitoCC}">${res[i].Nombre}</option`).selectpicker('refresh');
      //console.log(i);
    }
    $('#ProveedorSel').val(Producto ? Producto.PoC : 0).selectpicker('refresh');

  });

  if (Producto != null) {

    $('#CodProd').val(Producto.Codigo);
    $('#Marca').val(Producto.Marca);
    $('#NombreP').val(Producto.Nombre);
    $('#Presentacion').val(Producto.Presentacion);
    $('#detalle').val(Producto.Detalle);
    $('#iva').val(Producto.Iva);
    $('#GenCod').addClass('disabled');

    let Uti = Math.round(((Producto.PVenta / Producto.PCompra) - 1) * 100);
    let Utides = Math.round(((Uti - Producto.Descuento)));

    $('#utilidad').val(Uti);
    $('#descuento').val(Producto.Descuento);
    $('#udescuento').val(Utides);

    $('#PCompra').val(Producto.PCompra);
    $('#PCompraI').val(Math.round(Producto.PCompra * (1 + (Producto.Iva / 100))));

    $('#PVentaI').val(Math.round(Producto.PVenta * 0.1 * (1 + (Producto.Iva / 100))) * 10);
    $('#PVenta').val(Producto.PVenta);

    $('#PDes').val(Math.round((Producto.PCompra) * (1 + (Utides / 100))));
    $('#PDesI').val(Math.round((Producto.PCompra) * 0.1 * (1 + (Utides / 100)) * (1 + (Producto.Iva / 100))) * 10);

    $('#Lcapture')[0].innerText = Producto.ImagenP;

    var d = new Date();
    var n = d.getSeconds();

    document.getElementById("pGeneral").src = "/uploads/imagenes-producto/" + Producto.ImagenP + "?" + n;


  }


})

function LimpiarDatosProducto() {
  $('#CodProd').val("");
  $('#Marca').val("");
  $('#NombreP').val("");
  $('#Presentacion').val("");
  $('#detalle').val("");
  $('#iva').val("0");
  $('#GenCod').removeClass('disabled');
  $('#utilidad').val("0");
  $('#descuento').val("0");
  $('#udescuento').val("0");
  $('#PCompra').val("0");
  $('#PCompraI').val("0");
  $('#PVentaI').val("0");
  $('#PVenta').val("0");
  $('#PDes').val("0");
  $('#PDesI').val("0");
  $('#Lcapture')[0].innerText = "Elija una imagen"
  document.getElementById("pGeneral").src = "https://placehold.it/300x300";

}

$(document).on('hide.bs.modal', '#EditP', function () {

  localStorage.removeItem('producto');
  localStorage.removeItem('MatTipoCar');
  localStorage.removeItem('MatCar');
  $('#Caract').collapse('hide');
  $('#One').collapse('hide');
  LimpiarDatosProducto();

})

function SelCaract(idCar) {

  idCar.classList.toggle("btn-secondary");
  idCar.classList.toggle("btn-primary");

}

function DV(Nit) {

  if (Nit == "") {
    $('#DVer').val("");
    return
  }

  Nit = lpad(Nit, 15, "0");


  a = Nit[14] * 3;
  b = Nit[13] * 7;
  c = Nit[12] * 13;
  d = Nit[11] * 17;
  e = Nit[10] * 19;
  f = Nit[9] * 23;
  g = Nit[8] * 29;
  h = Nit[7] * 37;
  i = Nit[6] * 41;
  j = Nit[5] * 43;
  k = Nit[4] * 47;
  l = Nit[3] * 53;
  m = Nit[2] * 59;
  n = Nit[1] * 67;
  o = Nit[0] * 71;

  dig = ((a + b + c + d + e + f + g + h + i + j + k + l + m + n + o) % (11));


  if (dig == 1) {
    DVer = 1;
  } else {
    DVer = 11 - dig;
  }

  $('#DVer').val(DVer);



}

function TraerPoC(NitoCC) {

  DV(NitoCC.value);
  prov = document.getElementById('PoC') ? document.getElementById('PoC').innerText : "Proveedores";

  url = `/PoC/${prov.replace(/\ /g, '')}/datos/nit/U/${NitoCC.value}`;
  //console.log(url);
  $.get(url).then(function (res) {

    //console.log(res);
    if (res.length > 0) {
      PoC = res[0];
      $('#Nombre').val(PoC.Nombre);
      $('#Direccion').val(PoC.Direccion);
      $('#Telefono').val(PoC.Tel1);
      $('#Telefono2').val(PoC.Tel2);
      $('#Ciudad').val(PoC.Ciudad);
      $('#Departamento').val(PoC.Departamento);
      $('#E-mail').val(PoC.Email);
      $('#Observaciones').val(PoC.Observaciones);
      $('#AE').val(PoC.AE);
      $('#TIca').val(PoC.Tica);
      tipo = document.getElementById('Tipo') ? document.getElementById('Tipo') : null;
      if (tipo != null) {
        if (PoC.Tipo == "May") {

          tipo.innerText = "Mayorista";
        }
        else {

          tipo.innerText = "Minorista";
        }
      }

      return
    }

  });

  $('#Nombre').val("");
  $('#Direccion').val("");
  $('#Telefono').val("");
  $('#Telefono2').val("");
  $('#Ciudad').val("");
  $('#Departamento').val("");
  $('#E-mail').val("");
  $('#Observaciones').val("");

  tipo = document.getElementById('Tipo') ? document.getElementById('Tipo') : null;
  if (tipo != null) { tipo.innerText = "Minorista"; }


}

$(document).on('show.bs.modal', '.modal', function () {
  var zIndex = 1040 + (10 * $('.modal:visible').length);
  $(this).css('z-index', zIndex);
  setTimeout(function () {
    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
  }, 0);
});

$(document).on('hidden.bs.modal', '.modal', function () {
  $('.modal:visible').length && $(document.body).addClass('modal-open');
});

function InvLotFev(params) {

  var url = '/inv/ILFinvTemp';

  var text = '';

  text = $('#NumeroT').val();
  Cod = $('#CodigoT').val().split('#')[0];
  //console.log(Cod);
  Data = $('#tableDetalle').bootstrapTable('getData');
  Detalle = JSON.parse(localStorage.getItem('editDetalle'));
  if (Detalle) {
    item = Detalle.Item;
  } else {
    item = Data.length + 1;
  }
  DataILF = [];
  ILFC = [];

  if (text != '') {


    $.get(url + '/' + text).then(function (res) {
      //console.log(res);
      const { ILF, DetalleILF } = res;

      //console.log(ILF);
      // console.log(DetalleILF);
      if (ILF.length >= 0) {
        ILF.forEach((row, index) => {
          if (row.Producto.indexOf(Cod) >= 0 && DetalleILF[index].item == item) {
            FV = row.FechaVencimiento.split('-');
            FVa = FV[2].split('T');
            ILFC = { Item: DetalleILF[index].item, ID: DetalleILF[index].ID, ILF: DetalleILF[index].ILF, Invima: row.Invima, FechaVencimiento: FVa[0] + '/' + FV[1] + '/' + FV[0], Lote: row.Lote, Cnt: DetalleILF[index].Cantidad }
            DataILF.push(ILFC)
          }

        });

      }
      //console.log(DataILF);
      params.success(DataILF);


    });


  }
  //console.log(DataILF);
  params.success(DataILF);


}

function CambioFeVen() {

  var FechaEmicion = $('#FEmicion').val();
  var MP = $('#MetodoPago').val();
  FV = FechaEmicion.split('/')
  //console.log('valor' + FV);
  var FE = new Date(FV[2], FV[1] - 1, FV[0]);
  //console.log('valor' + FE);
  switch (MP) {
    case 'Contado':
      var FV = new Date(SumarDias(FE, 0));
      //console.log(FV);
      break;
    case 'Credito30':
      var FV = new Date(SumarDias(FE, 30));
      //console.log(FV);
      break;
    case 'Credito60':
      var FV = new Date(SumarDias(FE, 60));
      //console.log(FV);
      break;
    case 'Credito90':
      var FV = new Date(SumarDias(FE, 90));
      //console.log(FV);
      break;

    default:
      break;
  }

  $('#FVencimiento').val(FV.getDate() + "/" + (parseInt(FV.getMonth()) + 1).toString() + "/" + FV.getFullYear());
  // console.log(FV.getDate()+"/"+ (parseInt(FV.getMonth())+1).toString() +"/"+ FV.getFullYear());
  //console.log("mes "+(parseInt(FV.getMonth())+1).toString());

}

function SumarDias(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function MP() {
  CambioFeVen();

  var MP = $('#MetodoPago').val();
  //console.log('valor' + MP);
  switch (MP) {
    case 'Contado':
      var MPq = "Contado";
      var Tp = "0";
      //console.log(FV);
      break;
    case 'Credito30':
      var MPq = "Credito";
      var Tp = "30";
      //console.log(FV);
      break;
    case 'Credito60':
      var MPq = "Credito";
      var Tp = "60";
      //console.log(FV);
      break;
    case 'Credito90':
      var MPq = "Credito";
      var Tp = "90";
      //console.log(FV);
      break;

    default:
      break;
  }

  /*   url = `/Tran/MP`;
  
    $.post(url,{MPq,Tp}).then(function (res) {
  
      console.log(res.NumD);
        $('#NumeroT').val(res.NumD);
    }); */

}

function GenerarFC() {

  prov = document.getElementById('PoC') ? document.getElementById('PoC').innerText : "Proveedores";
  NitoCC = $('#NitoCCT').val() ? $('#NitoCCT').val() : ($('#Prov').val() ? $('#Prov').val().split('-')[0] : false);

  if (NitoCC) {

    url = `/PoC/${prov}/datos/nit/U/${NitoCC}`;

    $.get(url).then(function (res) {

      // console.log(res);
      if (res.length >= 0) {
        PoC = res[0];
        Nombre = PoC.Nombre[0] + PoC.Nombre[1] + PoC.Nombre[2];
        //console.log();
        $('#NumeroT').val(Nombre + (PoC.NumFacturas + 1).toString());

        $('#Doc2').val(Nombre + (PoC.NumFacturas + 1).toString());

        $('#tableDetalle').bootstrapTable('refresh');
        return
      }


    });
  } else {


  }


}

async function traerPro(Trans) {

  limpiarProducto();

  if (Trans == "Compras") {
    Prov = $('#NitoCCT').val();
  } else {
    Prov = 'p';
  }

  Cod = $('#CodigoT').val();
  console.log(Cod + "desde evn");
  var url = '/inv/TinvE';
  var text = '';
  text = quitarAcentos(Cod);
  //
  if (text != '') {

    await $.post(url + '/' + Trans + '&' + Prov, { Cod }).then(function (res) {
      console.log(res);
      Prod = res[0];
      if (Prod) {

        Vv = Prod.PVenta;
        Vc = Prod.PCompra;
        Iva = Prod.Iva;
        $('#NombreProT').val(Prod.Nombre);
        $('#Cnt').val(1);
        $('#Iva').val(Iva);

        if (Trans == "Compras" || Trans == "Pedidos") {

          $('#PreUni').val(Vc);
          $('#PreTotal').val(Vc * parseInt($('#Cnt').val()));
          DesM = 100;
          G = 0;
          localStorage.setItem('G', G);
          localStorage.setItem('Vc', Vc);
          localStorage.setItem('Prov', Prod.PoC);
          R = ActDes(Vc, (Iva / 100) + 1, (G / 100) + 1, 0, DesM / 100);
          //console.log(R);
          $('#Des').val(R.Des);
          $('#DesM').val(100);

        } else {
          G = ((Vv / Vc) - 1) * 100;
          localStorage.setItem('G', G);
          localStorage.setItem('Prov', Prod.PoC);
          localStorage.setItem('Vc', Vc);
          $('#G').val(Math.round(G * 100) / 100);

          pVI = Vv * ((Iva * 0.01) + 1)
          $('#PreUni').val(Math.round(pVI / 10) * 10);
          $('#PreTotal').val((Math.round(pVI / 10) * 10) * parseInt($('#Cnt').val()));
          DesM = Prod.Descuento;
          R = ActDes(Vc, (Iva / 100) + 1, (G / 100) + 1, 0, DesM / 100);
          //console.log(R);
          $('#Des').val(R.Des);
          tipo = document.getElementById('Tipo');
          if (tipo.innerText == "Mayorista") {
            DesMax = 100 * (((G / 100) + 1) - 1.10);
          } else {
            DesMax = Prod.Descuento;
          }
          $('#DesM').val(Math.round(DesMax * 100) / 100);
        }

        $('#tableILF').bootstrapTable('refresh');


      }

    });

    if (Trans == "Ventas") {
      $('#InvLotFev').empty().selectpicker('refresh');
      var url = '/inv/ILFinv';
      await $.get(url + '/' + text).then(function (res) {
        //console.log(res);

        res.forEach(row => {
          FV = new Date(row.FechaVencimiento);

          FVs = FV.getDate() + "/" + (parseInt(FV.getMonth()) + 1).toString() + "/" + FV.getFullYear();
          // console.log(row.ID);
          $('#InvLotFev').append(`<option  value ="${row.ID}" > Invima: ${row.Invima}- Lote :${row.Lote}- FV: ${FVs}</option`).selectpicker('refresh');
          //console.log(i);


        });

      });
    }



  }
  MprecioV();
}

function limpiarProducto() {
  $('#NombreProT').val("");
  $('#PreUni').val(0);
  $('#Cnt').val(0);
  $('#PreTotal').val(0);
  $('#Iva').val(0);
  $('#Des').val(0);
  $('#G').val(0);
  $('#DesM').val(0);
}

function NDes() {


  G = localStorage.getItem("G");
  Des = $('#Des').val();
  DesM = $('#DesM').val();
  Vv = $('#PreUni').val().replace(/\./g, '') / 1;
  Vc = localStorage.getItem("Vc");
  Cnt = $('#Cnt').val();
  Vt = Vv * Cnt;
  Iva = $('#Iva').val();

  R = ActDes(Vc, (Iva / 100) + 1, (G / 100) + 1, Des / 100, DesM / 100);

  $('#G').val(Math.round((R.Util - 1) * 10000) / 100);
  $('#Des').val(Math.round((R.Des) * 10000) / 100);

  Vv = R.PvDesI;
  Vv = Math.round(Vv / 10) * 10

  $('#PreUni').val(Vv);
  Vt = Vv * Cnt;
  $('#PreTotal').val(Math.round(Vt));


}

function MTotal() {


  Vv = $('#PreUni').val().replace(/\./g, '') / 1;
  Cnt = $('#Cnt').val() / 1;

  Vt = Vv * Cnt;

  $('#PreTotal').val(Math.round(Vt / 100) * 100);

}

function ActDes(Pc, Iva, Ua, Des, DesM) {


  if (((Ua - Des) > (Ua - DesM)) && (Des >= 0)) {

    PvDes = Pc * (Ua - Des);

    PvDesI = Pc * (Ua - Des) * Iva;

    Util = Ua - Des;

  } else if (Des < 0) {
    Des = 0;

    PvDes = Pc * (Ua - Des);

    PvDesI = Pc * (Ua - Des) * Iva;

    Util = Ua - DesM;
  } else {
    Des = DesM;

    PvDes = Pc * (Ua - Des);

    PvDesI = Pc * (Ua - Des) * Iva;

    Util = Ua - DesM;
  }

  return { PvDes, PvDesI, Des, Util }
}

function agregarILF(Trans) {


  DocT = $('#NumeroT').val();
  Cod = $('#CodigoT').val();
  ILF = $('#InvLotFev').val() / 1;
  CntILF = $('#Cntilf').val() / 1;
  Cnt = $('#Cnt').val() / 1;
  Data = $('#tableILF').bootstrapTable('getData');
  //console.log(Data);
  CntILFT = 0;
  Data.forEach(row => {
    CntILFT += row.Cnt;
  });

  //console.log(CntILFT);


  if ((Cnt - (CntILFT + CntILF)) >= 0 && CntILF != 0 && Cod != "" && ILF != "") {

    Data = $('#tableDetalle').bootstrapTable('getData');
    editdetalle = JSON.parse(localStorage.getItem("editDetalle"));

    if (editdetalle) {
      Item = editdetalle.Item;
    } else {
      Item = Data.length + 1;
    }

    //console.log(Data)
    Tipo = Trans
    //console.log(DocT + 'Ilf :' +ILF + 'Cnt :' + CntILF + 'tipo :' +Tipo +' Item'+Item);

    if (Tipo == "Ventas") {
      Data = {
        Lote: $('#Lot').val(),
        FechaVencimiento: $('#Fev').val(),
        Invima: $('#Inv').val(),
        Producto: Cod
      }
      var url = '/inv/ILFinvAgr';
      $.post(url, { DocT, ILF, CntILF, Item, Tipo, Data }).then(function (res) {
        // console.log(res);

        if (res == "OK") {
          $('#tableILF').bootstrapTable('refresh');
          $('#InvLotFev').val("").selectpicker('refresh');

        }

      });

    } else if (Tipo == "Compras") {

      var url = '/inv/ILFinvAgr';
      Data = {
        Lote: $('#Lot').val(),
        FechaVencimiento: $('#Fev').val(),
        Invima: $('#Inv').val(),
        Producto: Cod
      }

      $.post(url, { DocT, ILF: '0', CntILF, Item, Tipo, Data }).then(function (res) {
        console.log(res);

        if (res == "OK") {
          $('#tableILF').bootstrapTable('refresh');
          $('#InvLotFev').val("").selectpicker('refresh');

          $('#Lot').val(""),
            $('#Fev').val(""),
            $('#Inv').val(""),
            $('#Cntilf').val("");

        }

      });
    }


  } else {
    //console.log('close');
    $('#alertas').show();
  }

}

function CerrarAlerta() {
  $('#alertas').hide();

}

function editarILF() {

  ILFeditar = JSON.parse(localStorage.getItem('editILF'));

  //console.log(ILFeditar.Cnt);
  CntAnteriorILF = ILFeditar.Cnt;
  //console.log(CntAnteriorILF);

  DocT = $('#NumeroT').val();
  Cod = $('#CodigoT').val();
  ILF = $('#InvLotFev').val() / 1;
  CntILF = $('#Cntilf').val() / 1;
  Cnt = $('#Cnt').val() / 1;
  Data = $('#tableILF').bootstrapTable('getData');
  //console.log(Data);
  CntILFT = 0;

  Data.forEach(row => {
    CntILFT += row.Cnt;
  });

  //console.log(CntILFT);


  if ((Cnt - (CntILFT + CntILF - CntAnteriorILF)) >= 0 && CntILF != 0 && Cod != "" && ILF != "") {

    Item = ILFeditar.Item;
    //console.log(Data)
    Tipo = document.getElementById('TipoT').innerText;
    console.log(DocT + 'Ilf :' + ILF + ' Cnt :' + CntILF + 'tipo :' + Tipo + ' Item' + Item);

    if (Tipo == "Ventas") {
      var url = `/inv/ILFinvEdit/${ILFeditar.ID}`;
      Data = {

        Producto: Cod
      }

      $.post(url, { DocT, ILF, CntILF, Item, Tipo, Data }).then(function (res) {
        // console.log(res);
        if (res == "OK") {

          $('#tableILF').bootstrapTable('refresh');
          $('#InvLotFev').val("").selectpicker('refresh');

          btnadd = document.getElementById("addILF");
          btnedit = document.getElementById("editILF");

          btnadd.classList.remove("invisible");
          btnedit.classList.add("invisible");
          localStorage.removeItem('editILF');



        }

      });
    }
    if (Tipo == "Compras") {
      var url = `/inv/ILFinvEdit/${ILFeditar.ID}`;

      Data = {
        Lote: $('#Lot').val(),
        FechaVencimiento: $('#Fev').val(),
        Invima: $('#Inv').val(),
        Producto: Cod
      }

      $.post(url, { DocT, ILF: '0', CntILF, Item, Tipo, Data }).then(function (res) {
        // console.log(res);
        if (res == "OK") {

          $('#tableILF').bootstrapTable('refresh');
          $('#InvLotFev').val("").selectpicker('refresh');

          btnadd = document.getElementById("addILF");
          btnedit = document.getElementById("editILF");

          $('#Lot').val("");
          $('#Fev').val("");
          $('#Inv').val("");
          $('#Cntilf').val("");

          btnadd.classList.remove("invisible");
          btnedit.classList.add("invisible");
          localStorage.removeItem('editILF');

        }

      });
    }



  } else {
    //console.log('close');
    $('#alertas').show();
  }

}

function AgregarDetalle() {

  Tipo = document.getElementById('TipoT').innerText

  DocT = $('#NumeroT').val();
  Cod = $('#CodigoT').val();
  Cnt = $('#Cnt').val() / 1;
  Util = $('#G').val() / 1;
  ValorU = $('#PreUni').val().replace(/\./g, '') / 1;
  ValorT = $('#PreTotal').val().replace(/\./g, '') / 1;
  Des = $('#Des').val() / 1;
  Iva = $('#Iva').val() / 1;

  //console.log(ValorT);
  Data = $('#tableILF').innerHTML ? $('#tableILF').bootstrapTable('getData') : [];

  CntILFT = 0;
  Data.forEach(row => {
    CntILFT += row.Cnt;
  });

  Data = $('#tableDetalle').bootstrapTable('getData');
  Item = Data.length + 1;


  if (DocT != "" && Cod != "" && Cnt >= CntILFT) {

    url = '/Tran/DetalleT/' + Tipo;
    //console.log({DocT,Cod,Cnt,Item,ValorU,Des,Iva});

    $.post(url, { DocT, Cod, Cnt, Item, ValorU, ValorT, Des, Iva }).then(function (res) {
      //  console.log(res);
      if (res == "OK") {
        LimpiarProdDetalle();
        $('#tableILF').bootstrapTable('refresh');
        $('#tableDetalle').bootstrapTable('refresh');
        $('#InvLotFev').val("").selectpicker('refresh');
        localStorage.removeItem("G");
        localStorage.removeItem("Vc");




      }

    });


  }

}

function EditarDetalle() {

  DocT = $('#NumeroT').val();
  Cod = $('#CodigoT').val();
  Cnt = $('#Cnt').val() / 1;
  Util = $('#G').val() / 1;
  ValorU = $('#PreUni').val().replace(/\./g, '') / 1;
  ValorT = $('#PreTotal').val().replace(/\./g, '') / 1;
  Des = $('#Des').val() / 1;
  Iva = $('#Iva').val() / 1;

  // console.log("valor total" + ValorT);
  Data = $('#tableILF').innerHTML ? $('#tableILF').bootstrapTable('getData') : [];

  detalleT = JSON.parse(localStorage.getItem('editDetalle'));

  Item = detalleT.Item;

  CntILFT = 0;

  Data.forEach(row => {
    CntILFT += row.Cnt;
  });

  if (DocT != "" && Cod != "" && Cnt >= CntILFT) {

    url = '/Tran/DetalleT/Editar';

    Tipo = document.getElementById('TipoT').innerText
    Trans = Tipo;

    // console.log({ DocT, Cod, Cnt, Item, ValorU, Des, Iva });

    $.post(url + '/' + DocT + '&' + Trans, { DocT, Cod, Cnt, Item, ValorU, ValorT, Des, Iva }).then(function (res) {
      //console.log(res);
      if (res == "OK") {

        localStorage.removeItem("G");
        localStorage.removeItem("Vc");
        localStorage.removeItem("editDetalle");
        localStorage.removeItem("editILF");
        LimpiarProdDetalle();
        $('#tableILF').bootstrapTable('refresh');
        $('#tableDetalle').bootstrapTable('refresh');
        $('#InvLotFev').val("").selectpicker('refresh');

        btnadd = document.getElementById("addDetalle");
        btnedit = document.getElementById("editDetalle");
        btnadd.classList.remove("invisible");
        btnedit.classList.add("invisible");
      }

    });

  }


}

function LimpiarProdDetalle() {


  $('#CodigoT').val("");
  $('#Cnt').val("");
  $('#G').val("");
  $('#PreUni').val("");
  $('#PreTotal').val("");
  $('#Des').val("");
  $('#Iva').val("");
  $('#NombreProT').val("");

}

function Totalizar() {

  Tipo = document.getElementById('TipoT').innerText;

  Tfte = 2.5 / 100;
  TRetIva = 15 / 100;
  Tica = $('#ReteIca').val() / 1000;
  RT = $('#RT').val();
  Base = 961000;

  Data = $('#tableDetalle').bootstrapTable('getData');

  TotalT = 0;
  TotalTBase = 0;
  TotalTIva = 0;
  ReteFte = 0;
  ReteIca = 0;
  ReteIva = 0;
  TotalDes = 0;

  if (Tipo = "Ventas" && RT != "No Responsable") {
    Tfte = 2.5 / 100;
    TIca = 11.04 / 1000;
  }

  Data.forEach(e => {

    //console.log('info ' + JSON.stringify(e));
    TotalT += e.Total;
    TotalTIva += (e.Total * (e.Iva / 100)) / (1 + (e.Iva / 100));

    if (e.Iva == "0") { TotalTBase += 0 }
    else { TotalTBase += e.Total / (1 + (e.Iva / 100)); }

  });

  Data.forEach(e => {
    TotalDes += e.Descuento * (e.Total / TotalT);
    //console.log('descuento total '+TotalDes+' ponderado '+(e.Total/TotalT));
  });

  TotalTBase = Math.round(TotalTBase * 100) / 100;
  SubTotal = Math.round((TotalT - TotalTIva) * 100) / 100;

  if (SubTotal >= Base) {

    if (RT != "Simple") {

      ReteFte = Math.round((SubTotal * Tfte) * 100) / 100;
      ReteIca = Math.round((SubTotal * TIca) * 100) / 100;

    } else {
      ReteIva = Math.round(Subtotal * TRetIva / 100) * 100;
    }

  }

  TotalPago = Math.round((TotalT - ReteFte - ReteIca) * 100) / 100;

  $('#TotalT').val(TotalPago);
  $('#RteIca').val(ReteIca);
  $('#RteIva').val(ReteIva);
  $('#IvaT').val(Math.round(TotalTIva / 100) * 100);
  $('#RteFte').val(ReteFte);
  $('#BIva').val(TotalTBase);
  $('#Subtotal').val(SubTotal);
  $('#DTotal').val(Math.round(TotalDes * 100) / 100);

  //console.log('Total ' + TotalT + ' Iva ' + TotalTIva + ' Total Base' + TotalTBase);

}

function MprecioV() {

  G = localStorage.getItem("G") / 100;
  DesM = $('#DesM').val() / 100;
  Vv = $('#PreUni').val().replace(/\./g, '') / 1;
  Vc = localStorage.getItem("Vc") / 1;
  Prov = localStorage.getItem("Prov");
  Iva = $('#Iva').val().replace(/\./g, '') / 100;
  //console.log(Prov);

  Gn = (Vv / ((1 + Iva) * Vc)) - 1;

  if (Prov == 0) {
    localStorage.removeItem("G")
    localStorage.setItem("G", Gn * 100);

  } else {
    Des = G - Gn;
    $('#Des').val(Des * 100);
  }


  NDes();

}

async function FormalizarTran(Editar) {

  imp = $('#imp').prop('checked');
  DocT = $('#NumeroT').val();


  FV = $('#FEmicion').val().split('/');

  FechaEmiciona = FV[2] + '-' + FV[1] + "-" + FV[0];

  FV = $('#FVencimiento').val().split('/');

  FechaVencimientoa = FV[2] + '-' + FV[1] + "-" + FV[0];
  MedPag = "";

  Tipo = document.getElementById('TipoT').innerText;
  document.getElementsByName('OpcMP').forEach((ele) => {

    if (ele.checked) {
      MedPag = ele.id;
    }

  });

  Transaccion = {

    Documento: $('#NumeroT').val(),
    Tipo: Tipo,
    PoC: $('#NitoCCT').val(),
    FechaEmision: FechaEmiciona,
    FechaVencimiento: FechaVencimientoa,
    MedioDePago: MedPag,
    Plazo: $('#MetodoPago').val()?$('#MetodoPago').val():"Contado",
    Subtotal: $('#SubT').val()?$('#SubT').val().replace(/\./g, '').replace(/\,/g, '.') / 1:0,
    Descuento: $('#DesTotalT').val()?$('#DesTotalT').val().replace(/\./g, '').replace(/\,/g, '.') / 1:0,
    Iva: $('#Ivap').val()?$('#Ivap').val().replace(/\./g, '').replace(/\,/g, '.') / 1:0,
    ReteIva: $('#RteIva').val()?$('#RteIva').val().replace(/\./g, '').replace(/\,/g, '.') / 1:0,
    ReteIca: $('#RteIca').val()?$('#RteIca').val().replace(/\./g, '').replace(/\,/g, '.') / 1:0,
    ReteFuente: $('#RteFte').val()?$('#RteFte').val().replace(/\./g, '').replace(/\,/g, '.') / 1:0,
    Total: $('#TotalP').val()?$('#TotalP').val().replace(/\./g, '').replace(/\,/g, '.') / 1:0,
    Responsable: $('#Responsable').val()
  }

  Pago = {

    Documento: $('#NumeroT').val(),
    Tipo: Tipo,
    PoC: $('#NitoCCT').val(),
    MedioDePago: MedPag,
    TipoPagoEle: $('#TipoPagoElect').val(),
    Referencia: $('#RefP').val(),
    MontoEfectivo: $('#MontoEfe').val() ? ($('#MontoEfe').val().replace(/\./g, '').replace(/\,/g, '.') / 1) : 0,
    MontoTarjeta: $('#MontoTar').val() ? ($('#MontoTar').val().replace(/\./g, '').replace(/\,/g, '.') / 1) : 0,
    Cambio: $('#Cambio').val() >= 0 ? $('#Cambio').val().replace(/\./g, '').replace(/\,/g, '.') / 1 : 0,
    Total: $('#TotalP').val().replace(/\./g, '').replace(/\,/g, '.') / 1

  }
  // console.log(Transaccion);
  console.log(Pago);
  if (Transaccion.Plazo.indexOf('Credito') >= 0) {

    bodyMsg = { Transaccion, Pago }
    url = '/Tran/Formalizar';
    // console.log(url);
    await $.post(url + '/' + DocT + '&' + Editar, { bodyMsg }).then(function (res) {
      //console.log(res);
      if (res == 'OK') {
        //console.log('listoss');
        if (Transaccion.Tipo == "Ventas" || Transaccion.Tipo == "Compras") {
          Ainv = ActualizarInv(Transaccion.Tipo, DocT, Editar);
          ActReg(Transaccion.PoC);
          //   console.log(Ainv); 
        }
        if (Transaccion.Tipo != "Compras") {
          if (imp) {
            imprimir(DocT, Transaccion.Tipo);
          }
          else {
            window.location.href = '/Tran/' + Transaccion.Tipo;
          };
        } else {
          window.location.href = '/Tran/' + Transaccion.Tipo;
        };


      }
    });

  }
  else {
    if (MedPag != "OpcEfectivo") {

      if (Pago.Cambio >= 0 && Pago.Referencia != "" && Pago.TipoPagoEle != "") {
        bodyMsg = { Transaccion, Pago }

        url = '/Tran/Formalizar';
        await $.post(url + '/' + DocT + '&' + Editar, { bodyMsg }).then(function (res) {
          if (res = 'Ok') {

            //console.log('listoss');
            if (Transaccion.Tipo == "Ventas" || Transaccion.Tipo == "Compras") {
              Ainv = ActualizarInv(Transaccion.Tipo, DocT, Editar);
              //console.log(Ainv);
            }
            if (Transaccion.Tipo != "Compras") {

              if (imp) {
                imprimir(DocT, Transaccion.Tipo);
              }
              else {
                window.location.href = '/Tran/' + Transaccion.Tipo;
              };

            } else {
              window.location.href = '/Tran/' + Transaccion.Tipo;
            };

          }

        });

      }

    } else {

      if (Pago.Cambio >= 0) {
        bodyMsg = { Transaccion, Pago }
        url = '/Tran/Formalizar';
        // console.log(url);
        await $.post(url + '/' + DocT + '&' + Editar, { bodyMsg }).then(function (res) {
          //console.log(res);
          if (res == 'OK') {
            //console.log('listoss');
            if (Transaccion.Tipo == "Ventas" || Transaccion.Tipo == "Compras") {
              Ainv = ActualizarInv(Transaccion.Tipo, DocT, Editar);
              ActReg(Transaccion.PoC);
              //   console.log(Ainv); 
            }
            if (Transaccion.Tipo != "Compras") {
              if (imp) {
                imprimir(DocT, Transaccion.Tipo);
              }
              else {
                window.location.href = '/Tran/' + Transaccion.Tipo;
              };
            } else {
              window.location.href = '/Tran/' + Transaccion.Tipo;
            };


          }
        });


      }

    }
  }



}

function ActualizarInv(Tipo, Doc, Editar) {

  if (Tipo == "Ventas") {
    inodec = true;
  }
  else {
    inodec = false;
  }

  url = '/inv/Actualizar';
  $.post(url + '/' + Doc, { inodec }).then(function (res) {
    // console.log(res);
    if (res = 'listos') {

      //  console.log('listoss');
      return res;

    }

  });

}

function ActReg(PoC) {

  url = '/PoC/ActReg';
  $.post(url + '/' + PoC).then(function (res) {
    if (res == 'Ok') {

      //console.log('listoss');

    }
  });


}

function GuardarTran(imp) {

  PoC = $('#NitoCCT').val();
  Total = $('#TotalT').val().replace(/\./g, '').replace(/\,/g, '.') / 1;
  Tran = $('#TipoT')[0].innerText;

  if (Total > 0) {
    if (PoC != "") {
      $('#SubT').val($('#Subtotal').val().replace(/\./g, ''));
      $('#Ivap').val($('#IvaT').val().replace(/\./g, ''));
      $('#TotalP').val($('#TotalT').val().replace(/\./g, ''));

      RteFte = $('#RteFte').val().replace(/\./g, '').replace(/\,/g, '.') / 1;
      RteIca = $('#RteIca').val().replace(/\./g, '').replace(/\,/g, '.') / 1;
      RteIva = $('#RteIva').val().replace(/\./g, '').replace(/\,/g, '.') / 1;
      Retenciones = RteFte + RteIca + RteIva;
      $('#Rte').val(Retenciones);
      $('#imp').prop('checked', imp);
      $('#Formalizar').modal('show');
      $('#MontoEfe').val(0);
      $('#MontoEfe').keyup();

    }

    else {
      $('#DatosPoC').collapse('show');
      document.getElementById('NitoCCT').focus();
    }
  }





}

function MPCambio(obj) {
  //console.log(obj.id);

  switch (obj.id) {

    case "OpcEfectivo":
      $("#MEinput").show();
      $("#MTinput").hide();
      $("#MTInfoinput").hide();
      break;

    case "OpcTarjeta":
      $("#MTinput").show();
      $("#MTInfoinput").show();
      $("#MEinput").hide();

      break;

    case "OpcMixto":
      $("#MEinput").show();
      $("#MTinput").show();
      $("#MTInfoinput").show();
      break;

    default:
      break;
  }

}

function CambioT() {

  Total = $('#TotalP').val().replace(/\./g, '').replace(/\,/g, '.') / 1;
  Mefe = $('#MontoEfe').val().replace(/\./g, '').replace(/\,/g, '.') / 1;
  Mtar = $('#MontoTar').val().replace(/\./g, '').replace(/\,/g, '.') / 1;
  Cambio = (Mefe + Mtar) - Total
  // console.log('T ' + Mtar + ' E ' + Mefe + ' C ' + Cambio);

  if (Cambio < 0) {
    $('#Cambio').addClass('text-danger');
    $('#Cambio').removeClass('text-succes');

  }
  else {
    $('#Cambio').removeClass('text-danger');
    $('#Cambio').addClass('text-success')
  }
  $('#Cambio').val(Cambio);

}

function SelectPoC() {
  PoC = $('#PoCSel').val();
  $('#NitoCCT').val(PoC);
  $('#NitoCCT').change();
  $('#table').bootstrapTable('refresh');

}

function imprimir(Doc, Tran) {

  if (Tran != "Compras") {

    url = `/Tran/imprimir/${Doc}&${Tran}`;

    $.get(url).then(function (res) {
      // console.log(res);

      if (res == "OK") {
        printJS({ printable: `/uploads/Facturas/${Tran}/Doc.pdf`, type: 'pdf', onPrintDialogClose: redirigir });
      }

    });

  }


}

function redirigir() {
  Tran = document.getElementById('TipoT').innerText;
  window.location.href = '/Tran/' + Tran;
}

function actualizarINVT() {
  $('#NuevoInventario').bootstrapTable('refresh');
}

function CrearNuevoProducto() {

  Editar = localStorage.getItem('producto') ? true : false;

  Data = {

    Codigo: $('#CodProd').val(),
    CampoBus: quitarAcentos($('#NombreP').val()),
    Nombre: $('#NombreP').val(),
    Cantidad: "0",
    Marca: $('#Marca').val(),
    Presentacion: $('#Presentacion').val(),

    Iva: ($('#iva').val()) ? $('#iva').val() : "0",
    Descuento: ($('#descuento').val()) ? $('#descuento').val() : "0",
    PCompra: ($('#PCompra').val()) ? ($('#PCompra').val().replace(/\./g, '') / 1) : "0",
    PVenta: ($('#PVenta').val()) ? ($('#PVenta').val().replace(/\./g, '') / 1) : "0",

    PoC: ($('#ProveedorSel').val()) ? $('#ProveedorSel').val() : "0",

    Responsable: $('#User')[0].innerText.split(' ')[0],
    ImagenP: $('#Lcapture')[0].innerText

  };

  //console.log(Data);

  Variantes = $('#VariantesTabla').bootstrapTable('getData');

  if (Editar) {
    url = '/inv/EditProF/' + Data.Codigo;
  } else {

    if (Variantes.length == 0) {

      $('#CntVar').val(Data.Cantidad);
      $('#Var').val(' ');
      $('#LVariantes').prop('innerText', "Promyd_Principal");
      //$('#Variantes').val('Promyd_Principal');

      agregarVarP();
    }

    url = '/inv/NuevoProF';
  }
  console.log(url);
  if (Data.Nombre != "" && Data.Marca != "" && Data.Presentacion != "" && Data.PCompra !== 0 && Data.PVenta !== 0 && Data.PoC != null && Data.ImagenP != "Elige una imagen") {
    //console.log(url);
    $.post(url, { Data }).then(function (res) {
      console.log(res);

      if (res == "OK") {

        SubirFoto('capture');
        $('#EditP').modal("hide");
        $('#table').bootstrapTable('refresh');
        $('#NuevoInventario').bootstrapTable('refresh');

      }

    });

  }




}

function TraerFacPendientes(prov,Editar) {

  url = `/Tran/TraerPendientes/${prov}&${Editar}`
  var htmlsel = ['<option selected>---Seleccione el proveedor---</option>'];
  htmlsel.push()
  $.get(url).then(function (res) {

    console.log(res);
    $('#Fpendientes').empty();

    res.forEach(e => {
      $('#Fpendientes').append(`<option  value ="${e.Documento}" data-subtext="${e.PoC}"> Documento : ${e.Documento}  Total :$${e.Total}  Saldo: ${e.Saldo}  </option`).selectpicker('refresh');
    });
    //$('#Fpendientes').val(prov).selectpicker('refresh');

  });

}

function AgregarPago(Doc, Total, Pago) {

  Data = $('#Pendientes').bootstrapTable('getData');
  Item = Data.length + 1;

  console.log({ Doc, Total, Pago});

  if (Doc != "" && (Total / 1) >= 0 && Pago != "") {
    url = '/Tran/DetallePago';
    $.post(url + `/${Doc}`, { Total:Total.replace(/\./g, '').replace(/\,/g, '.') / 1, Pago, Item }).then(function (res) {
      console.log(res);
      
      $('#Pendientes').bootstrapTable('refresh');
      $('#Cnt').val('');
      $('#Saldo').val('');
      $('#Fpendientes').val("").selectpicker('refresh');
    });
  }

}

function EditarPago(Doc, Total, Pago) {
  

  var{id,Item}=JSON.parse(localStorage.getItem('editPago'));
  
  console.log({ Doc, Total, Pago,id});
  if (Doc != "" && (Total / 1) >= 0  && Pago != "") {
    url = '/Tran/DetallePago/Editar';
    $.post(url + `/${Doc}&${id}`, { Total:Total.replace(/\./g, '').replace(/\,/g, '.') / 1, Pago,Item }).then(function (res) {

      btnadd = document.getElementById("AgregarPen");
      btnedit = document.getElementById("EditarPen");
      
      btnadd.classList.remove("invisible");
      btnedit.classList.add("invisible");

      console.log(res);
      $('#Pendientes').bootstrapTable('refresh');
      localStorage.removeItem('editPago')
      $('#Cnt').val('');
      $('#Saldo').val('');
      $('#Fpendientes').val("").selectpicker('refresh');
      
    });
  }

}

function DetallePago(params){
  
  var url = '/Tran/DetallePago';
  parametros = $('#NumeroT').val();

  if (parametros != '') {
    $.get(url + '/' + parametros ).then(function (res) {
      console.log(res);
      params.success(res);
      //Totalizar();
      TotalizarPagos();
    });
  }

}

window.PagoEvents = {

  'click .editar': function (e, value, row, index) {
    console.log({row});
    localStorage.setItem('editPago', JSON.stringify({id:row.ID,Item:row.Item}));
    btnadd = document.getElementById("AgregarPen");
    btnedit = document.getElementById("EditarPen");
    
    btnadd.classList.add("invisible");
    btnedit.classList.remove("invisible");
   
    $('#Fpendientes').val(row.Documento).selectpicker('refresh');

    //$('#Fpendientes').change();
    
    if(row.TotalT<row.Total+row.Saldo){
      $('#Saldo').val(row.Total);
    }else{
      $('#Saldo').val(row.Total+row.Saldo);
    }
    $('#Cnt').val(row.Total);
    

  },
  'click .eliminar': function (e, value, row, index) {
    url = '/Tran/DetallePago/eliminar';
    ID = row.ID;
    Doc = $('#NumeroT').val()
    console.log(ID);

    $.get(url + '/' + ID +'&'+Doc).then(function (res) {
      //console.log(res);
      if (res = "OK") {
        $('#Pendientes').bootstrapTable('refresh');
      }

    });

  }
}

function PagoFomater(value, row, index) {
  return [
    '<a class="editar" href="javascript:void(0)" title="Like">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
    '<a class="eliminar" href="javascript:void(0)" title="Eliminar">',
    '<i class="fas fa-trash-alt"></i>',
    '</a>  ',
  ].join('')
}

function TotalizarPagos() {


  Data = $('#Pendientes').bootstrapTable('getData');

  TotalT = 0

  Data.forEach(e => {
    //console.log('info ' + JSON.stringify(e));
    TotalT += e.Total;
  });

  $('#TotalT').val(TotalT);
  

  //console.log('Total ' + TotalT + ' Iva ' + TotalTIva + ' Total Base' + TotalTBase);

}


function GuardarPago(imp) {

  PoC = $('#NitoCCT').val();
  Total = $('#TotalT').val().replace(/\./g, '').replace(/\,/g, '.') / 1;
  Tran = $('#TipoT')[0].innerText;

  if (Total > 0) {
    if (PoC != "") {
      
      $('#TotalP').val($('#TotalT').val().replace(/\./g, ''));
      $('#imp').prop('checked', imp);
      $('#Formalizar').modal('show');
      $('#MontoEfe').val(0);
      $('#MontoEfe').keyup();

    }

    else {
      $('#DatosPoC').collapse('show');
      document.getElementById('NitoCCT').focus();
    }
  }

}

function TraerSaldo(Doc) {

  console.log({Doc});

  url = `/Tran/TraerPendientes/Doc/${Doc}`;

  $.get(url).then(function (res) {
    console.log(res);
    $('#Saldo').val(res[0].Saldo);
  });
  
}

function VerificarSaldo(TotalP,Saldo){
  TotalP=TotalP.replace(/\./g, '').replace(/\,/g, '.') / 1;
  Saldo =Saldo.replace(/\./g, '').replace(/\,/g, '.') / 1;

  if (TotalP>Saldo) {
    $('#Cnt').val(Saldo)
  }

}