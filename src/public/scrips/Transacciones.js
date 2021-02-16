function DatosTrans(params) {
  Tipo = document.getElementById('TipoT').innerText;

  var url = '/Tran/' + Tipo + '/His';
  DatosTransaciones = []
  //console.log(url);
  $.get(url).then(function (res) {
    const Transacciones = res;
    params.success(Transacciones);
  });
}

function DatosTransOP(value, row, index) {
  Tipo = document.getElementById('TipoT').innerText;
  // console.log(row);

  Documento = row.row.Documento
  ///Tran/Editar/${Documento}&${Tipo}
  return [
    `<a class="edit" href=" javascript:void(0)" title="Like">`,
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
    Tipo == "Pedidos" ? `<a class="trans" href="javascript:void(0)"  title="Transformar">
    <i class="fas fa-exchange-alt"></i>
    </a>  `: Tipo == "Compras" ?
        `<a class="imprimirStikers" href="javascript:void(0)" title="imprimir">
    <i class="fas fa-ticket-alt"></i>
    </a>  `: `<a class="imprimir" href="javascript:void(0)" title="imprimir">
    <i class="fas fa-print"></i>
    </a>  `,
    '<a class="anular" href="javascript:void(0)" title="Anular">',
    '<i class="fas fa-trash-alt"></i>',
    '</a>  ',

  ].join('')
}

window.DatosTransOPEvents = {

  'click .edit': function (e, value, row, index) {
   
    
    ComprobarDetalletemp(row.row.Documento,row.row.Tipo)

  },
  'click .remove': function (e, value, row, index) {

  },
  'click .imprimir': function (e, value, row, index) {
    console.log(row)
    console.log(row.row.Documento, row.row.Tipo);
    imprimir(row.row.Documento, row.row.Tipo);
  },
  'click .trans': function (e, value, row, index) {
    console.log(row)
    $('#Transformar').modal('show');
    $('#Doc1').val(row.row.Documento);

    $('#Prov').val(row.row.PoC + '-' + row.row.Nombre);
    $('#Tipo').val(row.row.Tipo);


  },
  'click .imprimirStikers': function (e, value, row, index) {
    console.log(row)
    console.log(row.row.Documento, row.row.Tipo);
    imprimirStikers(row.row.Documento, row.row.Tipo);
  },

}

function imprimir(Doc, Tran) {

  url = `/Tran/imprimir/${Doc}&${Tran}`;
  $.get(url).then(function (res) {
    // console.log(res);
    if (res == "OK") {
      console.log('listoss');
      printJS({ printable: `/uploads/Facturas/${Tran}/Doc.pdf`, type: 'pdf', showModal: true });
    }
  });

}

function imprimirStikers(Doc, Tran) {

  url = `/inv/NuevoStikers/${Doc}`;
  $.get(url).then(function (res) {
    // console.log(res);
    if (res == "OK") {
      console.log('listoss');
    }
  });

}

function Transformar(Doc1, Doc2, Trans, Prov) {

  url = `/Tran/transformar/${Doc1}&${Doc2}&${Trans}`;
  console.log({ Doc1, Doc2, Trans, Prov });

  $.get(url).then(function (res) {
    // console.log(res);
    if (res == "OK") {

      console.log('listoss');
      window.location.href = `/Tran/NuevoU/${Doc2}&${Prov.split('-')[0]}&Compras`;

    }
  });

}

async function LimpiarDetalletemp(Doc,Tipo) {

  url = `/Tran/LimpiarDetalleTemp/Doc/${Doc}&${Tipo}`;

  await $.get(url).then(function (res) {
    console.log(res);
  });

}
function ComprobarDetalletemp(Doc,Tipo) {

 
  url = `/Tran/TraerTemp/Doc/${Doc}&${Tipo}`;
  console.log(Doc);
  
  $.get(url).then(async function (res) {
    console.log(res);
    
    if (res.length > 0) {
      if (await confirm("El Documento tiene cambios pendientes desea conservarlos ")) {
        window.location.href = '/Tran/Editar/'+Doc+'&'+ Tipo;
      } else {
        await LimpiarDetalletemp(Doc,Tipo)
        window.location.href = '/Tran/Editar/'+Doc+'&'+ Tipo;
                
      }
    }else{
      window.location.href = '/Tran/Editar/'+Doc+'&'+ Tipo;
    }
    
  });

}