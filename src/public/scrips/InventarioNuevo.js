

function VariantesData(params) {

  var url = '/inv/VariantesTemp';

  var Cod = $('#CodigoP').val();
  console.log(Cod);
  Variantes = []
  if (Cod != "") {
    
    $.get(url + '/' + Cod).then(function (res) {

      Variantes = res;
      console.log(Variantes);
      return params.success(Variantes);
    });
  }
  params.success(Variantes);
}

function imgVariantes(value, row, index) {

  // console.log(row);
  var d = new Date();
  var n = d.getSeconds();
  return `<img src="/uploads/${row.imagen}.jpg?${n}" class="img-thumbnail-sm">`

}

async function agregarVar() {

  CntT = 0;
  CntP = $('#CntP').val().replace(/\./g, '');
  Variantes = $('#VariantesTabla').bootstrapTable('getData');
  CntVar = $('#CntVar').val()/1;
  Variante = $('#Var').val();
  imagefile = $('#Variantes').val();
  imagen= $('#LVariantes')[0].innerText

  Codp = $('#CodigoP').val()?$('#CodigoP').val():$('#CodProd').val();
  Cod = Codp+ '#' + Variantes.length;
  img = Codp + '-V-' + Variantes.length;

  if (Codp!="" && Variante != "" && CntVar != "" && imagen != "Elige una imagen por variante") {

    Variantes.forEach(e => {
      CntT += e.Cantidad
    });


    if (CntT != CntT+CntVar) {
      $('#CntP').val(CntT+CntVar);
    }

    url = '/inv/VariantesAgg'

    await $.post(url, { Codp, Cod, Variante, CntVar, img }).then(function (res) {

      console.log(res);
      if (res == 'OK') {
        $('#VariantesTabla').bootstrapTable('refresh');
        if(imagen.indexOf('Promyd_Principal')<0){
          SubirFoto('Variantes');
        }       
        LimpiarVariantes();
      }

    });

  }

}

async function editarVar() {

  Var = JSON.parse(localStorage.getItem('Var'))

  CntT = 0;
  CntP = $('#CntP').val().replace(/\./g, '');
  Variantes = $('#VariantesTabla').bootstrapTable('getData');
  CntVar = $('#CntVar').val()/1;
  Variante = $('#Var').val();
  imagefile = $('#Variantes').val();

  Codp = Var.Codigo_P;

  Cod = Var.Codigo;
  img = Var.imagen;

  if (Variante != "" && CntVar != "") {

    Variantes.forEach(e => {
      CntT += e.Cantidad
    });


    if (CntT != CntT-Var.Cantidad+CntVar) {
      $('#CntP').val(CntT-Var.Cantidad+CntVar);
    }

    url = '/inv/VariantesEdit'

    await $.post(url + '/' + Var.ID, { Codp, Cod, Variante, CntVar, img }).then(function (res) {

      console.log(res);
      if (res == 'OK') {


        if (imagefile != "") { SubirFoto('Variantes'); }
        LimpiarVariantes();
        $('#VariantesTabla').bootstrapTable('refresh');
        localStorage.removeItem('Var');
        btnadd = document.getElementById("addVar");
        btnedit = document.getElementById("editVar");
        btnadd.classList.remove("invisible");
        btnedit.classList.add("invisible");


      }

    });



  }



}

function LlenarProv(prov) {
  url = '/inv/Prov'
  var htmlsel = ['<option selected>---Seleccione el proveedor---</option>'];

  htmlsel.push()

  $.get(url).then(function (res) {

    $('#ProveedorSel').empty();
    for (i = 0; i < res.length; i++) {

      $('#ProveedorSel').append(`<option  value ="${res[i].NitoCC}" data-subtext="${res[i].NitoCC}">${res[i].Nombre}</option`).selectpicker('refresh');
      //console.log(i);
    }

    $('#ProveedorSel').val(prov).selectpicker('refresh');

  });

}

window.eveVariantes = {

  'click .editarVar': function (e, value, row, index) {
    // console.log(row);
    localStorage.setItem('Var', JSON.stringify(row))
    btnadd = document.getElementById("addVar");
    btnedit = document.getElementById("editVar");
    btnadd.classList.add("invisible");
    btnedit.classList.remove("invisible");

    $('#CntVar').val(row.Cantidad);
    $('#Var').val(row.Variacion);
    document.getElementById("pVariantes").src = "/uploads/" + row.imagen + ".jpg";
    // console.log(row.Variacion);

  },
  'click .eliminarVar': function (e, value, row, index) {
    url = '/inv/VariantesDel';
    ID = row.ID;
    console.log(ID);
    $.get(url + '/' + ID).then(function (res) {
      //console.log(res);
      if (res = "OK") {
        $('#VariantesTabla').bootstrapTable('refresh');
      }
    });

  }
}

function opsVariantes(value, row, index) {
  return [
    '<a class="editarVar" href="javascript:void(0)" title="Editar">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
    '<a class="eliminarVar" href="javascript:void(0)" title="Eliminar">',
    '<i class="fas fa-trash-alt"></i>',
    '</a>  ',
  ].join('')
}

function SubirFoto(campo) {

  Nombre = $('#L' + campo)[0].innerText
  url = '/inv/SubirImg/' + Nombre;

  console.log(url);

  file = $('#' + campo).prop('files')[0];
  img = new FormData();
  img.append("file", file);


  $.ajax({

    url,
    dataType: 'text',
    contentType: false,
    processData: false,
    data: img,
    type: 'post',
    success: function (respuesta) {
      console.log(respuesta);
      $('#VariantesTabla').bootstrapTable('refresh');
    },
    error: function () {
      console.log("Ha ocurrido un error");
    }
  });


}

function AsignarCodigo() {

  url = '/inv/UltimoCodigo'
  Responsable = $('#User')[0].innerText;
  $.get(url + '/' + Responsable).then(function (res) {
    $('#CodigoP').val(res)
    console.log(res);
    $('#VariantesTabla').bootstrapTable('refresh');
    $('#InventILF').bootstrapTable('refresh');
  });


}

function LimpiarVariantes() {


  $('#CntVar').val("");
  $('#Var').val("");
  $('#Variantes').val("");
  $('#LVariantes').prop('innerText', "Elige una imagen por variante");
  document.getElementById("pVariantes").src = "https://placehold.it/300x300";


}

$(document).on('show.bs.collapse', '#VariantesCollapse', function () {
  console.log('evento ejecutado');
  $('#VariantesTabla').bootstrapTable('refresh');
});
$(document).on('show.bs.collapse', '#InvimaslotesFev', function () {
  //console.log('evento ejecutado');
  $('#InventILF').bootstrapTable('refresh');
});


window.eveInventILF = {

  'click .editarILF': function (e, value, row, index) {
    console.log(row);
    localStorage.setItem('editILF', JSON.stringify(row));
    btnadd = document.getElementById("addILF");
    btnedit = document.getElementById("editILF");

    btnadd.classList.add("invisible");
    btnedit.classList.remove("invisible");

    $('#Lot').val(row.Lote);
    $('#Fev').val(row.FechaVencimiento);
    $('#Inv').val(row.Invima);
    $('#Cntilf').val(row.Cnt);


  },
  'click .eliminarILF': function (e, value, row, index) {
    url = '/inv/invILF/eliminar';
    ID = row.ID;

    //console.log(ID);
    $.get(url + '/' + ID).then(function (res) {
      //console.log(res);
      if (res = "OK") {
        $('#InventILF').bootstrapTable('refresh');
      }


    });

  }
}

function opsInventILF(value, row, index) {
  return [
    '<a class="editarILF" href="javascript:void(0)" title="Editar">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
    '<a class="eliminarILF" href="javascript:void(0)" title="Eliminar">',
    '<i class="fas fa-trash-alt"></i>',
    '</a>  ',
  ].join('')
}

function InventInvLotFev(params) {

  var url = '/inv/ILFinvTemp';
  text = 'NuevoInventario';

  Cod = $('#CodigoP').val();
  //console.log(Cod);
  Data = $('#NuevoInventario').bootstrapTable('getData');
  Detalle = JSON.parse(localStorage.getItem('editDetalle'));

  if (Detalle) {
    item = Detalle.Item;
  } else {
    item = Data.length + 1;
  }

  DataILF = [];
  ILFC = [];

  $.get(url + '/' + text).then(function (res) {
    //console.log(res);
    DataILF = [];
    const { ILF, DetalleILF } = res;

    //console.log(ILF);
    // console.log(DetalleILF);
    if (ILF.length >= 0) {
      ILF.forEach((row, index) => {
        if (row.Producto == Cod && DetalleILF[index].item == item) {
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

  //console.log(DataILF);
  params.success(DataILF);


}

function agregarInvILF(Trans) {

  DocT = 'NuevoInventario';
  Cod = $('#CodigoP').val();
  CntILF = $('#Cntilf').val() / 1;
  Cnt = $('#CntP').val() / 1;
  Data = $('#InventILF').bootstrapTable('getData');
  //console.log(Data);
  CntILFT = 0;
  Data.forEach(row => {
    CntILFT += row.Cnt;
  });

  //console.log(CntILFT);


  if ((Cnt - (CntILFT + CntILF)) >= 0 && CntILF != 0 && Cod != "") {

    Data = $('#NuevoInventario').bootstrapTable('getData');
    editdetalle = JSON.parse(localStorage.getItem("editDetalle"));

    if (editdetalle) {
      Item = editdetalle.Item;
    } else {
      Item = Data.length + 1;
    }
    //console.log(Data)
    Tipo = Trans
    //console.log(DocT + 'Ilf :' +ILF + 'Cnt :' + CntILF + 'tipo :' +Tipo +' Item'+Item)
    var url = '/inv/ILFinvAgr';
    Data = {
      Lote: $('#Lot').val(),
      FechaVencimiento: $('#Fev').val(),
      Invima: $('#Inv').val(),
      Producto: Cod
    }

    $.post(url, { DocT, ILF: '0', CntILF, Item, Tipo, Data }).then(function (res) {
      // console.log(res);

      if (res == "OK") {
        $('#InventILF').bootstrapTable('refresh');

        $('#Lot').val(""),
          $('#Fev').val(""),
          $('#Inv').val(""),
          $('#Cntilf').val("");

      }

    });



  } else {
    //console.log('close');
    $('#alertas').show();
  }

}

function editarInvILF() {

  ILFeditar = JSON.parse(localStorage.getItem('editILF'));

  //console.log(ILFeditar.Cnt);
  CntAnteriorILF = ILFeditar.Cnt;
  //console.log(CntAnteriorILF);

  DocT = 'NuevoInventario';
  Cod = $('#CodigoP').val();
  CntILF = $('#Cntilf').val() / 1;
  Cnt = $('#CntP').val() / 1;
  Data = $('#InventILF').bootstrapTable('getData');
  //console.log(Data);
  CntILFT = 0;

  Data.forEach(row => {
    CntILFT += row.Cnt;
  });

  //console.log(CntILFT);


  if ((Cnt - (CntILFT + CntILF - CntAnteriorILF)) >= 0 && CntILF != 0 && Cod != "") {

    Item = ILFeditar.Item;
    //console.log(Data)
    Tipo = 'Ninv';
    //console.log(DocT + 'Ilf :' + ILF + ' Cnt :' + CntILF + 'tipo :' + Tipo + ' Item' + Item);


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

        $('#InventILF').bootstrapTable('refresh');

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




  } else {
    //console.log('close');
    $('#alertas').show();
  }

}

function NinvDatos(params) {

  Ninv = [];

  rol = $('#Rol')[0].innerText
  User = $('#User')[0].innerText

  if (rol == 'Admin') { url = "/inv/NuevoInv"; } else { url = "/inv/NuevoInv/" + User; }




  $.get(url).then(function (res) {
    //console.log(res);


    Ninv = []
    Ninv = res
    params.success(Ninv);


  });

  params.success(Ninv);

}

function NinvOpcFormater(value, row, index) {
  return [
    '<a class="editarNinv" href="javascript:void(0)" title="Editar">',
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
    '<a class="FormalizarNinv" href="javascript:void(0)" title="Fomalizar">',
    '<i class="fas fa-check"></i>',
    '</a>  ',
    '<a class="eliminarNinv" href="javascript:void(0)" title="Eliminar">',
    '<i class="fas fa-trash-alt"></i>',
    '</a>  ',
  ].join('')
}

window.NinvOpcEvents = {

  'click .editarNinv': function (e, value, row, index) {
    //console.log(row);
    localStorage.setItem('editNinv', JSON.stringify(row));
    btnadd = document.getElementById("addNinv");
    btnedit = document.getElementById("editNinv");

    btnadd.classList.add("invisible");
    btnedit.classList.remove("invisible");

    $('#CodigoP').val(row.Codigo);
    $('#NombreP').val(row.Nombre);
    $('#CntP').val(row.Cantidad);
    $('#Marca').val(row.Marca);
    $('#Presentacion').val(row.Presentacion);
    $('#Iva').val(row.Iva);
    $('#DesM').val(row.Descuento);
    $('#PrecioC').val(row.PCompra);
    $('#PrecioV').val(row.PVenta);

    PVi = row.PVenta * (1 + (row.Iva / 100))
    $('#PViva').val(Math.round(PVi / 10) * 10);

    if (row.PCompra != 0) {
      CalcularUtilidad()
    }


    $('#ProveedorSel').val(row.PoC);
    $('#ProveedorSel').selectpicker('refresh');
    $('#Lcapture')[0].innerText = row.ImagenP;

    var d = new Date();
    var n = d.getSeconds();

    document.getElementById("pGeneral").src = "/uploads/" + row.ImagenP + "?" + n;


  },
  'click .eliminarNinv': function (e, value, row, index) {
    url = '/inv/NuevoInvDel';
    ID = row.ID

    //console.log(ID);
    $.get(url + '/' + ID + '&' + row.Codigo).then(function (res) {
      //console.log(res);
      if (res = "OK") {
        $('#NuevoInventario').bootstrapTable('refresh');
      }


    });

  },
  'click .FormalizarNinv': function (e, value, row, index) {
    url = '/inv/NuevoInvFormalizar';
    ID = row.ID

    //console.log(row);

    if (row.PCompra != 0) {
      $.get(url + '/' + ID + '&' + row.Codigo).then(function (res) {
        //console.log(res);
        if (res = "OK") {
          $('#NuevoInventario').bootstrapTable('refresh');
        }

      });
    }


  }

}

function AgregarNinv() {

  url = '/inv/NuevoInv';
  Data = {

    Codigo: $('#CodigoP').val(),
    CampoBus:quitarAcentos($('#NombreP').val()) ,
    Nombre: $('#NombreP').val(),
    Cantidad: $('#CntP').val().replace(/\./g, '') / 1,
    Marca: $('#Marca').val(),
    Presentacion: $('#Presentacion').val(),

    Iva: ($('#Iva').val()) ? $('#Iva').val() : "0",
    Descuento: ($('#DesM').val()) ? $('#DesM').val() : "0",
    PCompra: ($('#PrecioC').val()) ? ($('#PrecioC').val().replace(/\./g, '') / 1) : "0",
    PVenta: ($('#PrecioV').val()) ? ($('#PrecioV').val().replace(/\./g, '') / 1) : "0",
    PoC: ($('#ProveedorSel').val()) ? $('#ProveedorSel').val() : "0",

    Responsable: $('#User')[0].innerText.split(' ')[0],
    ImagenP: $('#Lcapture')[0].innerText

  };

  Variantes = $('#VariantesTabla').bootstrapTable('getData');

  if(Variantes.length==0){
    $('#CntVar').val(Data.Cantidad);
    $('#Var').val(' ');
    $('#LVariantes').prop('innerText', "Promyd_Principal");
    //$('#Variantes').val('Promyd_Principal');
    agregarVar()
  }
  

  url = '/inv/NuevoInv';

  if (Data.Nombre != "" && Data.Cantidad != 0 && Data.Marca != "" && Data.Presentacion != "" && Data.PCompra !== 0 && Data.PVenta !== 0 && Data.PoC != null && Data.ImagenP != "Elige una imagen") {
    //console.log(url);
    $.post(url, { Data }).then(function (res) {
      console.log(res);

      if (res == "OK") {
        SubirFoto('capture');
        LimpiarNInventario();
        $('#NuevoInventario').bootstrapTable('refresh');


      }

    });

  }



}

function EditarNinv() {

  url = '/inv/NuevoInvEdit';
  row = JSON.parse(localStorage.getItem('editNinv'));
  console.log(row.ID);
  Data = {

    Codigo: $('#CodigoP').val(),
    Nombre: $('#NombreP').val(),
    CampoBus:quitarAcentos($('#NombreP').val()) ,
    Cantidad: $('#CntP').val().replace(/\./g, '') / 1,
    Marca: $('#Marca').val(),
    Presentacion: $('#Presentacion').val(),
    Iva: ($('#Iva').val()) ? $('#Iva').val() : "0",
    Descuento: ($('#DesM').val()) ? $('#DesM').val() : "0",
    PCompra: ($('#PrecioC').val()) ? ($('#PrecioC').val().replace(/\./g, '').replace(/\,/g, '.')/ 1) : "0",
    PVenta: ($('#PrecioV').val()) ? ($('#PrecioV').val().replace(/\./g, '').replace(/\,/g, '.') / 1) : "0",
    PoC: ($('#ProveedorSel').val()) ? $('#ProveedorSel').val() : "0",
    Responsable: $('#User')[0].innerText,
    ImagenP: $('#Lcapture')[0].innerText

  };

  console.log(Data);

  if (Data.Nombre != "" && Data.Cantidad != 0 && Data.Marca != "" && Data.Presentacion != "" && Data.PCompra !== 0 && Data.PVenta !== 0 && Data.PoC != null && Data.ImagenP != "Elige una imagen") {
    console.log(url);
    $.post(url + "/" + row.ID, { Data }).then(function (res) {

      console.log(res);
      if (res == "OK") {
        SubirFoto('capture');
        LimpiarNInventario();
        $('#NuevoInventario').bootstrapTable('refresh');
        localStorage.removeItem('Var');
        localStorage.removeItem('editNinv');
        btnadd = document.getElementById("addNinv");
        btnedit = document.getElementById("editNinv");
        btnadd.classList.remove("invisible");
        btnedit.classList.add("invisible");

      }

    });

  }


}

function LimpiarNInventario() {

  $('#NombreP').val(" ");
  $('#CntP').val("0");
  $('#Marca').val("");
  $('#Presentacion').val("");
  $('#Iva').val("0");
  $('#DesM').val("0");
  $('#PrecioC').val("0");
  $('#PrecioV').val("0");
  $('#ProveedorSel').val("");
  $('#ProveedorSel').selectpicker('refresh');
  $('#Lcapture')[0].innerText = "Elige una imagen";
  document.getElementById("pGeneral").src = "https://placehold.it/300x300";
  $('#G').val("0");
  $('#CodigoP').val("");
  $('#PCiva').val("0");
  $('#PViva').val("0");
  $('#PDes').val("0");
  $('#PDesiva').val("0");
  //CalcularPV(0)
}

function NinvFomatter(index, row) {
  var html = []
  st = 'style=" word-wrap: break-word;min-width: 60px;max-width: 160px;"'
  html.push('<table class="table" style="text-align: center;" > <thead> <th>Proveedor</th> <th>Responsable</th>  <th>Presentacion </th> <th>Imagen</th> </thead> <tbody > <tr>')

  $.each(row, function (key, value) {
    var d = new Date();
    var n = d.getSeconds();
    img = `<img src="/uploads/${value}?${n}" class="img-thumbnail-sm">`

    if (key == 'PoC') { key = 'Proveedor', html.push('<td ' + st + ' >' + value + '</td>'); }
    else if (key == 'Responsable') { key = 'Responsable', html.push('<td ' + st + ' >' + value + '</td>'); }
    else if (key == 'Presentacion') { key = 'Presentacion'; html.push('<td ' + st + ' >' + value + '</td>'); }
    else if (key == 'ImagenP') { key = 'Iva'; html.push('<td ' + st + ' > ' + img + '</td  >'); }


  });

  html.push('</tr> </tbody> </table>');
  return html.join('');
}

function CalcularUtilidad() {


  PC = $('#PrecioC').val().replace(/\./g, '') / 1;
  PV = $('#PViva').val().replace(/\./g, '') / 1;
  Iva = $('#Iva').val() / 100;
  Des = $('#DesM').val() / 100;

  if (Iva == 0) {
    Ut = (PV / PC) - 1
  } else {
    Ut = (PV / ((1 + (Iva)) * PC)) - 1
  }

  if (Ut < 0.1) {
    Ut = 0.1
    $('#G').val(Math.round(Ut * 100) / 1);
    CalcularPV(Ut * 100);

  } else {
    $('#G').val(Math.round(Ut * 100) / 1);
    CalcularPV(Ut * 100);
  }


}

function CalcularPV(Ut) {

  if ((Ut / 100) < 0.1) {
    Ut = 0.1
    $('#G').val(Math.round(Ut * 100) / 1);
    CalcularPV(Ut * 100);

  } else {

    PC = $('#PrecioC').val().replace(/\./g, '') / 1;
    Ut = Math.round(Ut * 100 / 1) / 10000;
    Iva = $('#Iva').val() / 100;
    Des = $('#DesM').val() / 100;

    if ((Ut - Des) < 0.1) {
      Des = (Ut - 0.1) * 100;
      $('#DesM').val(Des)
      CalcularPV(Ut * 100);
    }
    else {

      PV = PC * (1 + Ut);
      PCiva = PC * (1 + Iva);
      PViva = PV * (1 + Iva);
      PD = PC * (1 + (Ut - Des));
      PDiva = PD * (1 + Iva);

      $('#PCiva').val(Math.round(PCiva));
      $('#PrecioV').val(Math.round(PV * 100) / 100);
      $('#PViva').val(Math.round(PViva / 10) * 10);
      $('#PDes').val(Math.round(PD));
      $('#PDesIva').val(Math.round(PDiva));
    }



  }

}

