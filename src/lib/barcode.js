const Quagga = require('@ericblade/quagga2').default; // Common JS (important: default);


const barcode = {};

barcode.init = (tarject)=>{

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: this.dom.querySelector(tarject)    // Or '#yourElement' (optional)
        },
        decoder: {
            readers: ["code_128_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
}

Quagga.onDetected((data) => {
    console.log(data);

})
module.exports = barcode;