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
 
  Documento=row.row.Documento

  return [
    `<a class="edit" href="/Tran/${Tipo}/Editar/${Documento}" title="Like">`,
    '<i class="fas fa-pencil-alt"></i>',
    '</a>  ',
    '<a class="imprimir" href="javascript:void(0)" title="imprimir">',
    '<i class="fas fa-print"></i>',
    '</a>  ',
    '<a class="anular" href="javascript:void(0)" title="Anular">',
    '<i class="fas fa-trash-alt"></i>',
    '</a>  ',
  ].join('')
}

window.DatosTransOPEvents = {

  'click .edit': function (e, value, row, index) {
    //console.log(row);

  },
  'click .remove': function (e, value, row, index) {
    
  },
  'click .imprimir': function (e, value, row, index) {
    console.log(row)
    console.log(row.row.Documento,row.row.Tipo);
    imprimir(row.row.Documento,row.row.Tipo);
    
  }
}

function imprimir(Doc,Tran){

  url = `/Tran/imprimir/${Doc}&${Tran}`;
  $.get(url).then(function (res) {
    // console.log(res);
    if (res == "OK") {
      console.log('listoss');
      printJS({printable:'/uploads/Facturas/page.pdf', type:'pdf', showModal:true});
    }
  });

}