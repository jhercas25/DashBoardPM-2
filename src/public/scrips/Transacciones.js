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
  //console.log(row);
  Documento=row.row.Documento

  return [
    `<a class="edit" href="/Tran/${Tipo}/Editar/${Documento}" title="Like">`,
    '<i class="fas fa-pencil-alt"></i>',
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
    

  }
}