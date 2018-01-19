$("#minutos").focus(); //foco no campo minutos

$("#enviar").on('click',calcula);

function calcula(){
    //Pegando os dados do formulário
    var valor = $("#minutos").val();
    var operator = $("#operador").val();
    var dataInserida = $("#data").val();

    var data = formataDataBarras(dataInserida);

    //Teste no console, exibindo a data
    console.log(data);

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
            console.log("Realizou put de: "+valor);
        },
        error : function (error){
            console.log("Erro no put");
        }
    })
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