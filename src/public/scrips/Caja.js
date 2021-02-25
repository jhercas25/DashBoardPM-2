
function DatosCaja(params) {

  var url = '/Caja/Historico';

  //console.log(url);
  $.get(url).then(function (res) {
    const CajaMovimientos = res;
    params.success(CajaMovimientos);
  });
}

//DatosDetalleCaja

function DatosCajaOP(value, row, index) {

  ///Tran/Editar/${Documento}&${Tipo}
  return [
    `<a class="edit" href=" javascript:void(0)" title="Like">`,
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',


  ].join('')
}

window.EventsCaja = {

  'click .edit': function (e, value, row, index) {


  },
  'click .remove': function (e, value, row, index) {

  }

}

function DatosDetalleCaja(index, row) {
  //console.log(row);
  var html = []
  st = '';
  html.push(` <div class="col-md-12"> <table class="table" style="text-align: center;" > 
  
    <thead > 
    <tr class="d-none d-sm-block"  >
    <th style="min-width:100px;">Marca</th>  
    <th style="min-width:125px;">Detalle</th> 
    <th style="min-width:120px;">P.Compra</th> 
    <th style="min-width:65px;">Iva</th>  
    <th style="min-width:135px;">Proveedor</th> 
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

function Cierre(Efectivo,Electronico) {

  if (Efectivo == '' || Electronico == '') return 0
  var url = '/Caja/Movimiento/Ultimo';
  //console.log(url);
  $.get(url).then(function (res) {
    const UltimoMovimiento = res;
    console.log(UltimoMovimiento);

    if (UltimoMovimiento[0].idCierre != '0' && UltimoMovimiento[0].idApertura != '0') {
      CrearAlerta('Apertura pendiente')
    }
    else {
   
   

      console.log({ Efectivo, Electronico });
    }

  });

}


function Apertura(Efectivo, Electronico) {

  if (Efectivo == '' || Electronico == '') return 0
  var url = '/Caja/Movimiento/Ultimo';
  //console.log(url);
  $.get(url).then(function (res) {
    const UltimoMovimiento = res;
    console.log(UltimoMovimiento);

    if (UltimoMovimiento[0].idCierre == '0') {
      CrearAlerta('Cierre pendiente')
    }
    else {
      var url = '/Caja/Cierre/Ultimo';
      $.get(url).then(function (res) {
        const Cierre = res[0];
        console.log(Cierre);
        if (Efectivo != Cierre.MontoEfectivo) {
          CrearAlerta('Monto en Efectivo incorrecto');
        } else {
          if (Electronico != Cierre.MontoElectronico) {

            html = `Existe una diferencia de ${Electronico-Cierre.MontoElectronico}`
            alertashook = document.getElementById('DifMontoElectronico')
            alertashook.innerHTML = html;
            $('#AlertaDialog').modal('show')

          } else {
            EfetuarApertura(Efectivo, Electronico);
          }
        }
      });

      console.log({ Efectivo, Electronico });
    }

  });

}



function EfectuarApertura(Efectivo, Electronico) {
  var url = '/Caja/Apertura';
  const NApertura = {
    MontoEfectivo: Efectivo,
    MontoElectronico: Electronico
  }

  $.post(url, NApertura).then(function (res) {
    console.log(res);
  }); 
}

function CrearAlerta(Mensaje) {

  alerta = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>${Mensaje}</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span>
       </button>
    </div>`;
  alertashook = document.getElementById('alertas')
  alertashook.innerHTML = alerta;

}