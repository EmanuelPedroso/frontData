$("#minutos").focus();

$("#enviar").on('click',calcula);

$(document).keypress(function(e){ //Chama a função calcula ao teclar "Enter"
if(e.which == 13){
    calcula();
}
});

function calcula(){
    //Pegando os dados do formulário
    var valor = $("#minutos").val();
    var operator = $("#operador").val();
    var dataInserida = $("#data").val();

    $("#operator").addClass("hidden");
    $("#value").addClass("hidden");
    $("#date").addClass("hidden");

    $("#operador").removeClass("error-border error");
    $("#minutos").removeClass("error-border error");
    $("#data").removeClass("error-border error");

    var data = formataDataBarras(dataInserida);
    var permissaoData = verificaPermissao(data);
    
    var permissaoOperador = true;
    var permissaoValor = true;
    if($("#operador").val()=="default"){
        $("#operator").removeClass("hidden");
        $("#operador").addClass("error-border error");
        permissaoOperador = false;
    }

    var valor = $("#minutos").val();

    if((valor=="")||((valor / valor) != 1)){
        $("#value").removeClass("hidden");
        $("#minutos").addClass("error-border error");
        permissaoValor = false;
    }

    if(!permissaoData){
        $("#date").removeClass("hidden");
        $("#data").addClass("error-border error");
    }

    if((permissaoData)||(permissaoOperador)||(permissaoValor)){
        $.ajax({
            url : "http://localhost:50590/api/Hours/changeDate",
            method : "PUT",
            data : {
                "Date" : data,
                "Op" : operator,
                "Minutes" : valor
            },
            success : function (valor){
                get();
            },
            error : function (error){
                console.log("Erro no put");
            }
        })
    }
}

function get(){
    $.ajax({
        url : "http://localhost:50590/api/Hours/date",
        method : "GET",
        success : function (dados){
            console.log("Alterada para: "+dados);
            dados = formataDataTracos(dados);
            console.log("Formatadin para: "+dados);
            $("#data").val(dados);
        },
        error : function (error){
            console.log("Erro no get");
        }
    })
    
}

function verificaPermissao(data){
    var isnan = data.search("NaN");
    var permissao = false;
    if (isnan == -1){
        console.log("Data recebida: "+data);
        return permissao = true;
    }
}

function formataDataBarras(data){
    //Formatando a data para o formato 00/00/00 00:00
    var year = data.substring(0, data.indexOf("-"));
    data = data.replace(year+ "-", "");
    var month = data.substring(0, data.indexOf("-"));
    data = data.replace(month+ "-", "");
    var day = data.substring(0, data.indexOf("T"));
    data = data.replace(day+ "T", "");
    var hour = data.substring(0, data.indexOf(":"));
    data = data.replace(hour+ ":", "");
    var minutes = data;
    return botaZeroAntes(day)+"/"+botaZeroAntes(month)+"/"+year+" "+botaZeroAntes(hour)+":"+botaZeroAntes(minutes);
}

function formataDataTracos(data){
    //Formatando a data para o formato 00-00-00T00:00
    var day = data.substring(0, data.indexOf("/"));
    data = data.replace(day+ "/", "");
    var month = data.substring(0, data.indexOf("/"));
    data = data.replace(month+ "/", "");
    var year = data.substring(0, data.indexOf(" "));
    data = data.replace(year+ " ", "");
    var hour = data.substring(0, data.indexOf(":"));
    data = data.replace(hour+ ":", "");
    var minutes = data;
    return year+"-"+botaZeroAntes(month)+"-"+botaZeroAntes(day)+"T"+botaZeroAntes(hour)+":"+botaZeroAntes(minutes);
}