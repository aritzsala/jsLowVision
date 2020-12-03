//annotstions
var kont=0;
var sepe;
var oharrak=1;
var services =
  { "sepe":{
              "name": "sepe",
              "page": "",
              "data": 
                [
                  {"name": "captcha","type":"captcha","img":"imgPrincipalCaptcha","lag":
                  "ayudaCaptcha0","title":"Captacha"},
                  {"name": "nif","type":"input","title":"Datu pertsonalak"},
                  {"name":"nombre","type":"input","title":"Datu pertsonalak"},
                  {"name":"apellido1","type":"input","title":"Datu pertsonalak"},
                  {"name":"apellido2","type":"input","title":"Datu pertsonalak"},
                  {"name":"cp","type":"input","title":"Datu pertsonalak"},
                  {"name": "SbtCodigo","type":"radio","title":"Seleccionar servicio"}
                ]
              
            },
  "segSocial":{
                "name": "segSocial",
                "data": 
                  [
                    {"name": "","type":"captcha","info":""},
                    {"name": "nombre","type":"input"},
                    {"name":"tipo","type":"select"},
                    {"name":"documento","type":"input"},
                    {"name":"telefono","type":"input"},
                    {"name":"email","type":"input"}
                  ]
                }
  }
//end annontations
var panelVisible=0;
// Everything has loaded!
$(window).one('load', function()
  {
  var newElementDiv = document.createElement('div');
  newElementDiv.id = 'panel';

  //$('form[name="solicitudCitaPreviaForm"]').append(newElementDiv);
  //$('body').append(newElementDiv);

  sepe = services.sepe;


  if($('form[name="solicitudCitaPreviaForm"]').length)
    {
    
    $('body').append(newElementDiv);

    var newElementBox = document.createElement('input');
    var newElementText = document.createElement('label');
    newElementBox.id = 'nombre';
    newElementBox.type = 'text';
    newElementText.id = 'nombreLabel';
    newElementText.innerHTML = 'Nombre:';
    $('form[name="solicitudCitaPreviaForm"]').append(newElementText)
    $('form[name="solicitudCitaPreviaForm"]').append(newElementBox)
    $("#nombreLabel").attr('for', 'nombre');

    var newElementBox = document.createElement('input');
    var newElementText = document.createElement('label');
    newElementBox.id = 'apellido1';
    newElementBox.type = 'text';
    newElementText.id = 'apellido1Label';
    newElementText.innerHTML = 'Primer apellido:';
    $('form[name="solicitudCitaPreviaForm"]').append(newElementText)
    $('form[name="solicitudCitaPreviaForm"]').append(newElementBox)
    $("#apellido1Label").attr('for', 'apellido1');


    var newElementBox = document.createElement('input');
    var newElementText = document.createElement('label');
    newElementBox.id = 'apellido2';
    newElementBox.type = 'text';
    newElementText.id = 'apellido2Label';
    newElementText.innerHTML = 'Segundo apellido:';
    $('form[name="solicitudCitaPreviaForm"]').append(newElementText)
    $('form[name="solicitudCitaPreviaForm"]').append(newElementBox)
    $("#apellido2Label").attr('for', 'apellido2');

    $('#apellido2').attr("idNew","froga");


    createPanel();

    show();


    }
  else if($('form[name="solicitudCitaPreviaDatosPersonalesForm"]').length)
      { 
      $('#nombre').val(sessionStorage.getItem("nombre"));
      $('#apellido1').val(sessionStorage.getItem("primerapellido"));
      $('#apellido2').val(sessionStorage.getItem("segundoapellido"));
      $('form[name="solicitudCitaPreviaDatosPersonalesForm"]').submit();
      }
      else if($('form[name="solicitudCitaPreviaCalendarioForm"]').length)
        {
        $('body').append(newElementDiv);
        createPanel();
        if ($("a[href='solicitudCitaPreviaCalendarioNo.do']").length)
            {
            $("a[href='solicitudCitaPreviaCalendarioNo.do']").attr("id","moreDays");
            document.getElementById("moreDays").click();
            }
        $("#next").remove();
        showCalendar();
        }


  //createPanel();


  
  });

$(document).ready(function()
  {

  $('input[type="submit"]').click(function() 
    {
    sessionStorage.setItem("nombre", $('#nombre').val()); 
    sessionStorage.setItem("primerapellido",$('#primerapellido').val());
    sessionStorage.setItem("segundoapellido",$('#segundoapellido').val());
    });       
  });

function hideShowPanel()
  {
  if (panelVisible) 
    {
    $('#panel').hide();
    panelVisible=0;
    }
  else 
    {
    $('#panel').show();
    panelVisible=1;
    }
  }

function createPanel()
  {
  panelVisible=1;

  

  var newElementH1 = document.createElement('h1');
  newElementH1.id="titlePanel";
  panel.append(newElementH1);
    
  var newElementP1 = document.createElement('p');
  var newElementP2 = document.createElement('p');
  var newElementP3 = document.createElement('p');


  newElementP1.id="p1";
  newElementP2.id="p2";
  newElementP3.id="p3";

  $('#panel').append(newElementP1);
  $('#panel').append(newElementP2);
  $('#panel').append(newElementP3);

  var newElementH2 = document.createElement('h2');
  newElementH2.id="subtitle";
  p1.append(newElementH2);

  var newElementNext = document.createElement('a');
  newElementNext.id="next";
  //newElementNext.on("click",changePanel);
  newElementNext.innerHTML="Next";
  panel.append(newElementNext);
  $('#next').on("click",changePanel);

  


  //Panelerako css style
  $("input").css({'color':'black','font-size':'6em','background':'white','width':'70%'});
  $("h1").css({'color':'white','font-size':'10em'});
    $("h2").css({'color':'white','font-size':'8em','text-align': 'left'});

  $("p").css({'color':'white','font-size':'2em'});

  $("button").css({'color':'black','font-size':'8em','background':'white'});
  $("#panel").css({ 'border': '5px outset red',
    'background-color': 'black',
    'text-align': 'center',
    'height': '90%',
    'width': '90%',
    'position':'absolute',
    'z-index':'1',
    'top':'5%',
    'left':'5%',
    'padding':'10px'});
     $("div a").css({
  'background-color': '#f44336',
  'font-size':'2em',
  'width':'60%',
  'color': 'white',
  'padding': '14px 25px',
  'text-align': 'center',
  'text-decoration': 'none',
  'display': 'inline-block',
  'margin-left': '1em',
  'margin-right': '1em',
  'margin-top': '1em',
  'margin-bottom': '1em',
  });
  }
function hide()
  {  
  if (sepe.data[kont].type==="captcha")
    {
    $('#captchaHelp').hide();

    $('#'+sepe.data[kont].img).appendTo('form[name="solicitudCitaPreviaForm"]');
    $('#'+sepe.data[kont].name).appendTo('form[name="solicitudCitaPreviaForm"]');
    }
  else
    {
    if (sepe.data[kont].type==="radio")
      {
      //$('#'+sepe.data[kont].name).appendTo('form[name="solicitudCitaPreviaForm"]'); 
      $("#panel").hide();
      }
    else
      {
      $('label[for=\"'+sepe.data[kont].name+'\"]').appendTo('form[name="solicitudCitaPreviaForm"]');;
      $('#'+sepe.data[kont].name).appendTo('form[name="solicitudCitaPreviaForm"]');    
      }
    }
  }
function sendForm(formName)
  {
  $('form[name=\"'+formName+'\"]').submit();

  }

function showCalendar()
  {
  $("#next").hide();
  $("#titlePanel").text("Cita Previa");

  //$("#displayCalendar").find("a").css({'background-color': 'red',});
  //$('table[class=\"tablaLeyenda\"]').find("a").css({'background-color': 'red',});

  
  $("#p1").remove();
  $("#p2").remove();

  var newElementp = document.createElement('p');
  newElementp.id="p1";
  $("#panel").append(newElementp);
  var newElementp2 = document.createElement('p');
  newElementp2.id="p2";
  $("#panel").append(newElementp2);

  var firstDay

  var newElementh1 = document.createElement('h2');
  newElementh1.innerHTML="Dias disponibles del mes azaroa";
  $("#p1").append(newElementh1);
  
  $("#displayCalendar").find("a").each(function (index) 
    {
    var newElementA = document.createElement('a');
    var day = $(this).parent().text();
    if (index===0) firstDay=day;

    newElementA.innerHTML=day;
    newElementA.id=day;
    $("#p1").append(newElementA);
    $(this).attr("id",index+"-Day_"+day);
    $("#"+day).on("click",{id:$(this).attr('id'),day:$(this).parent().text()},clickDay);

    });

  viewHours("h2020-11-"+firstDay);
  
  $("p").css({'color':'white','font-size':'2em','text-align':'left'});
  $("h2").css({'color':'white','font-size':'2em'});

  $("a").css({
  'background-color': '#f44336',
  'color': 'white',
  'padding': '14px 25px',
  'text-align': 'center',
  'text-decoration': 'none',
  'display': 'inline-block',
  'margin-left': '1em',
  'margin-right': '1em',
  'margin-top': '1em',
  'margin-bottom': '1em',
  });
  
  }

function viewHours(date)
  {
  var newElementh1hours = document.createElement('h2');
  newElementh1hours.innerHTML="Horas disponibles del dia X del mes Y";
   $("#p2").remove();

  var newElementp = document.createElement('p');
  newElementp.id="p2";
  $("#panel").append(newElementp);
  $("#p2").append(newElementh1hours);

  $('#'+date).find("a").each(function (index) 
    {
    var hour=$(this).parent().text().trim();
    if (!(hour===""))       
      {
      $(this).attr('id').replace(":","");
      var newElementA = document.createElement('a');
      newElementA.innerHTML=hour;

      newId=$(this).attr('id').replace(":","");

      newElementA.id="A"+index+"-"+newId;
      $("#p2").append(newElementA);
      //if (((index+1) % 10) ===0) $("#p2").append("</br></br>");

      //$("#"+hour).click(clickEgin);
      $(this).removeAttr("id");
      $(this).attr("id",newId);
      $("#A"+index+"-"+newId).on("click",{value:$(this).attr('id')},clickHour);
      }
    });
  $("p").css({'color':'white','font-size':'2em','text-align':'left'});
  $("h2").css({'color':'white','font-size':'2em'});

  $("a").css({
  'background-color': '#f44336',
  'color': 'white',
  'padding': '14px 25px',
  'text-align': 'center',
  'text-decoration': 'none',
  'display': 'inline-block',
  'margin-left': '1em',
  'margin-right': '1em',
  'margin-top': '1em',
  'margin-bottom': '1em',
  });
  }
document.onkeydown=function(e)

  {
  if(e.which === 17) hideShowPanel();
  }

function clickHour(event)
  {
  document.getElementById(event.data.value).click();
  $('input[value="Aceptar"]').trigger("click");
  }

function clickDay(event)
  {
  //alert(event.data.id);
  document.getElementById(event.data.id).click();
  viewHours("h2020-11-"+event.data.day);
  }

function clickEgin(event)
  {
  //alert(event.data.value);
  //alert(event.data.ordua);
  document.getElementById(event.data.value).click();
  showCalendar();
  }
function checkEgin(event)
  {
  $(':radio[value="' + event.data.value + '"]').attr('checked', 'checked');
  sessionStorage.setItem("nombre", $('#nombre').val()); 
  sessionStorage.setItem("primerapellido",$('#apellido1').val());
  sessionStorage.setItem("segundoapellido",$('#apellido2').val());
  $('form[name="solicitudCitaPreviaForm"]').submit();
  }
function show()
  {
  $("#titlePanel").text(sepe.data[kont].title);
  //$('#next').show();
  if (sepe.data[kont].type==="captcha")
    {
    $('#'+sepe.data[kont].img).appendTo('#p1');
    //$("img")
    $('#'+sepe.data[kont].img).css({'width':'70%','align':'center','margin-left':'15%','margin-right':'15%'});

    $('div[class=\"'+sepe.data[kont].lag+'\"]').appendTo('#p2');
    $('div[class=\"'+sepe.data[kont].lag+'\"]').attr("id","captchaHelp");

        $('div[class=\"'+sepe.data[kont].lag+'\"]').removeClass(sepe.data[kont].lag);


    $('#'+sepe.data[kont].name).appendTo('#p3');

    //$("img").css({'width':'70%','align':'center','margin-left':'15%','margin-right':'15%'});
    $("#captchaUsuarios").css({ 'width': '85%'});

    }
  else
    {
    if (sepe.data[kont].type==="radio")
      {
      createListA();
      //createTable();
      }
    else
      {
      $('label[for=\"'+sepe.data[kont].name+'\"]').appendTo('#subtitle');
      $('#'+sepe.data[kont].name).appendTo('#p2');

      }
  
    }
  }
function alertNotification()
  {
  var elenmentAlert =document.createElement('p');
  elementAlert.id="alert";

  if (oharrak)
  {
    oharrak=0;
  if ($('p[class="aviso"]').length)
    {
    elementAlert.innerHTML=$("p[class='aviso']").parent().text();
    }
  }
  else
    $("#elementAlert").remove();
  }
function changePanel()
  {
  hide();
  //alertNotification();
  kont++;
  show();
  }

window.addEventListener('unload', myScript);

function myScript()
  {
  console.log('%c bye–bye... ' + sessionStorage.getItem("nombre"), 'background: red; color: black; display: block;');
  }
function createTable()
  {
   var newElementTable = document.createElement('table');
      newElementTable.id="table1";
      
      $('#p1').append(newElementTable);
      var k=0;
      $('input[name=\"'+sepe.data[kont].name+'\"]').each(function (index) 
        {  
        var newElementTr = document.createElement('tr');
        newElementTr.id="tr"+k;
        $('#table1').append(newElementTr);
        
        var listRadioSepe = $(this).parent().text().split("  ");

        var newElementTd = document.createElement('td');
        newElementTd.innerHTML=$(this).val()+listRadioSepe[k];
        newElementTd.id="td"+k;
        $('#tr'+k).append(newElementTd);
        $('#table1').append(newElementTr);
        $( "#td"+k ).on("click",{value:$(this).val()},checkEgin);
        $('#next').hide();


        k++;
        });
      
      $("p").css({'color':'white','font-size':'2em'});
      $("td").css({'background':'grey','padding': '20px','text-align':'center','color':'white','border':'5px solid orange'});
      $("table").css({'width':'60%','border': '0px','margin-left':'20%','margin-right':'20%','border-spacing': '20px 20px','border-collapse': 'separate'});


  }

function createListA()
  {

  $('input[name=\"'+sepe.data[kont].name+'\"]').each(function (index) 
        {  
        
        
        var listRadioSepe = $(this).parent().text().split("  ");

        var newElementA = document.createElement('a');
        newElementA.innerHTML=$(this).val()+listRadioSepe[index];
        
        

        newElementA.id="A"+index;
        $("#p1").append(newElementA);
        $("#p1").append("<br>");


        $( "#A"+index ).on("click",{value:$(this).val()},checkEgin);
        $('#next').remove();

        });
     $("p").css({
       'font-size':'1em'}) 
     $("a").css({
      'background-color': '#f44336',
       'font-size':'2em',
      'width':'60%',
      'color': 'white',
      'padding': '14px 25px',
      'text-align': 'center',
      'text-decoration': 'none',
      'display': 'inline-block',
      'margin-left': '1em',
      'margin-right': '1em',
      'margin-top': '0.5em',
      'margin-bottom': '0.5em',
      });
  }
// End
