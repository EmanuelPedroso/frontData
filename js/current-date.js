var current = new Date();
var ano = current.getFullYear();
var mes = botaZeroAntes(current.getMonth()+1);
var dia = botaZeroAntes(current.getDate());
var hora = botaZeroAntes(current.getHours());
var minuto = botaZeroAntes(current.getMinutes());

var formatDate = ano+"-"+mes+"-"+dia+"T"+hora+":"+minuto;

$("#data").val(formatDate);

function botaZeroAntes(valor){
    valor = parseInt(valor);
    if(valor-10<0){
        valor = "0"+valor;
    }
    return valor;
}