const puppeteer= require('puppeteer');
const path = require('path')
const fs= require('fs');
const hbs = require('handlebars');

const PDFcreator={}

const compile =async function (Plantilla, info) {
  const filePath =path.join(__dirname,'../templates',`${Plantilla}.hbs`);
  const html= await fs.readFileSync(filePath,'utf-8');

  //console.log(info,info.T);
  return hbs.compile(html)(info);

};

hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});
hbs.registerHelper('Fecha', function(Fecha) {
  FE=new Date(Fecha);
  FEs=FE.getDate(FE) +'/'+ ((FE.getMonth(FE)/1)+1)+'/' +FE.getFullYear(FE) 
  return FEs;
});

PDFcreator.Crear= async(imp,info) =>{

    const browser=await puppeteer.launch({
        headless:true,
    });
    console.log('Data ->');
    console.log(info.Detalle,info.T);

    const page =await browser.newPage();
    const content= await compile('FacturaPos',{info});
    //console.log(content);
    await page.setContent(content);
    await page.emulateMediaType('screen');
    
    
    await page.pdf({path: path.join(__dirname, "../public/uploads/Facturas/page.pdf"),
                                    width:"80mm"});

    await browser.close();
    console.log('listos');
    return ("Listos");
}


module.exports= PDFcreator;