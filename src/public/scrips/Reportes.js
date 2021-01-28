function Reporte_Data(params) {



    var url = `/Rep/His/`;
    FD = new Date()
    FDs = FD.getFullYear() + '-' + (FD.getMonth() + 1) + '-1';
    FA = new Date();
    FA.setDate(FA.getMonth() + 1);
    FAs = FA.getFullYear() + '-' + (FA.getMonth() + 1) + '-' + FA.getDate();
    var text = '';

    console.log({ FDs, FAs });

    $('#FechaDesde').change(function () {
        FD = $('#FechaDesde').val();
        console.log(FD);
        if (FD != '') {
            FDs = FD.split('/')[2] + '-' + FD.split('/')[1] + '-' + FD.split('/')[0]
        }

        $.get(url + `Ventas&${FDs}&${FAs}`).then(function (res) { params.success(res) })
        return;
    });

    $('#FechaAsta').change(function () {

        //console.log('dfsd');

        if (text != '') {

            $.get(url + '/nomb/' + text).then(function (res) { params.success(res) })
            return;
        } else {
            $.get(url).then(function (res) { params.success(res) });
        }
    });

    $.get(url + `Ventas&${FDs}&${FAs}`).then(function (res) { params.success(res) });



}