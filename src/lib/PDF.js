const puppeteer = require('puppeteer');
const path = require('path')
const fs = require('fs');
const hbs = require('handlebars');

const PDFcreator = {}

const compile = async function (Plantilla, info) {
  const filePath = path.join(__dirname, '../templates', `${Plantilla}.hbs`);
  const html = await fs.readFileSync(filePath, 'utf-8');

  //console.log(info,info.T);
  return hbs.compile(html)(info);

};

hbs.registerHelper('json', function (context) {
  return JSON.stringify(context);
});

hbs.registerHelper('Repite', function () {
  html = '';
  for (let i = 0; i < 100; i++) {
    html += `
    <tr>
      <td class="unit">sd</td>
      <td class="desc">sds</td>
      <td class="unit">dssddsg</td>
      <td class="unit">w23fsdf</td>
      <td class="unit">dfsg5454</td>
    </tr>
    `;
  }
  return html;
});

hbs.registerHelper('Fecha', function (Fecha) {
  FE = new Date(Fecha);
  FEs = FE.getDate(FE) + '/' + ((FE.getMonth(FE) / 1) + 1) + '/' + FE.getFullYear(FE)
  return FEs;
});

PDFcreator.Crear = async (imp, info) => {

  const browser = await puppeteer.launch({
    headless: true,
  });
  console.log('Data ->');
  console.log(info.Detalle, info.T[0].Tipo);

  const page = await browser.newPage();

  switch (info.T[0].Tipo) {
    case "Ventas":
      content = await compile('FacturaPos', { info });
      Tamaño = "80mm"
      largo = "auto"
      margenes = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      };
      mostrarfooter = false

      break;
    case "Cotizaciones":
      content = await compile('Cotizacion', { info });
      Tamaño = "8.27in"
      largo = "11in",
        margenes = {
          top: 80,
          bottom: 80,
          left: 30,
          right: 30,
          top: 80
        };
      mostrarfooter = true
      break;

    case "Pedidos":
      content = await compile('Pedidos', { info });
      Tamaño = "8.27in"
      largo = "11in",
        margenes = {
          top: 80,
          bottom: 80,
          left: 30,
          right: 30,
          top: 80
        }
      mostrarfooter = true
      break;

    case "Reportes":
      content = await compile('Reportes', { info });
      Tamaño = "8.27in"
      largo = "11in",
        margenes = {
          top: 80,
          bottom: 80,
          left: 30,
          right: 30,
          top: 80
        }
      mostrarfooter = true
      break;

    case "Pago":
      content = await compile('Pagos', { info });
      Tamaño = "80mm";
      largo = "auto",
        margenes = {
          top: 80,
          bottom: 80,
          left: 30,
          right: 30,
          top: 80
        },
        mostrarfooter = false

      break;

    default:
      break;
  }

  //console.log(content);
  await page.setContent(content);
  await page.emulateMediaType('print');

  html = `<div style="font-size: 15px; padding-top: 8px; text-align: center; width: 100%;">
            <span>${info.T[0].Tipo}- Pag</span> - <span class="pageNumber">/<span class="pagesTotal"></span>
          </div>
        `;


  await page.pdf({
    path: path.join(__dirname, `../public/uploads/Facturas/${info.T[0].Tipo}/Doc.pdf`),
    width: Tamaño, displayHeaderFooter: mostrarfooter, footerTemplate: html,
    margin: margenes
  });

  await browser.close();
  console.log('listos');
  return ("Listos");
}


module.exports = PDFcreator;