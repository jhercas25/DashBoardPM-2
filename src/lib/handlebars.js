

const { format } = require('timeago.js');
var moment = require('moment');
const { connect } = require('../routes/envios');
const { isDate } = require('moment');

const helpers = {};

helpers.timeago = (timestamp) => {

  return format(timestamp);
};

helpers.json = (context) => {
  return JSON.stringify(context);
};

helpers.Fecha = (context) => {
  return context ? moment(context).format("DD/MM/YYYY") : context;
};

helpers.switch = function (value, options) {
  this.switch_value = value;
  return options.fn(this);
};

helpers.case = function (value, options) {
  if (value == this.switch_value) {
    return options.fn(this);
  }
};

helpers.default = function (value, options) {
  return true; ///We can add condition if needs
};

helpers.ifEquals = function (arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
};

helpers.iftrue = function (arg1, arg2) {
  
  
  //console.log(arg1)
 
  if (arg1) {

    if (isDate(arg1)){
      return helpers.Fecha(arg1);
    }else{
      return arg1;
    }
    
   }else
   {
    return helpers.Fecha(Date.now());
   }

  return null;
}


module.exports = helpers;
