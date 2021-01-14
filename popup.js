//annotstions
var kont=0;
var sepe;
var eservice;
var oharrak=1;

var unekoStep="";
var eservices =
  { "sepe":{
              "name": "sepe",
              "description": "",
              "steps": ["Pregunta de seguridad","Identificacion de usuario","Seleccion de servicio","Seleccion de fecha"],

              "pages":
                  [
                    [
                      {"name": "solicitudCitaPreviaForm","type":"form","class":"name"},
                      {"name":"captcha" ,"type":"captcha","class":"class","img":"ImageCaptcha.png","lag":"ayudaCaptcha0","label":"","step":"Pregunta de seguridad"},
                      {"name": "nif","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name":"cp","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name": "SbtCodigo","type":"radio","class":"name","label":"Seleccionar servicio","step":"Seleccion de servicio"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaDatosPersonalesForm","type":"form","class":"name"},
                      {"name":"nombre","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name":"apellido1","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name":"apellido2","type":"input","class":"id","label":"","step":"Identificacion de usuario"}
                    ],
                    [
                    {"name": "solicitudCitaPreviaCalendarioForm","type":"form","class":"name"}
                    ]
                  ]

            },
    "dni":{
              "name": "dni",
              "description": "",
              "steps": ["Pregunta de seguridad","Identificacion de usuario","Seleccion de servicio","Seleccion de localidad","Seleccion de fecha"],

              "pages":
                  [
                    [
                      {"name": "formulario","type":"form","class":"name"},
                      {"name": "codSeguridad","type":"captcha","class":"id","img":"jcaptcha.jpg","lag":"divVisualCaptchaDer","label":"","step":"Pregunta de seguridad"},
                      {"name": "numDocumento","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name": "letraDocumento","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name":"codEquipo","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name": "fechaValidez","type":"input","class":"name","label":"Identificacion","step":"Identificacion de usuario"}
                    ]
                  ]

            },
    "segSocial":{
              "name": "seguridadSocial",
              "description": "",
              "steps": ["Pregunta de seguridad","Identificacion de usuario","Seleccion de servicio","Seleccion de localidad","Seleccion de fecha"],

              "pages":
                  [
                    [
                      {"name": "formulario","type":"form","class":"name"},
                      {"name": "ARQ.CAPTCHA","type":"captcha","class":"id","img":"jcaptcha.jpg","lag":"divVisualCaptchaDer","label":"","step":"Pregunta de seguridad"},
                      {"name": "nombre","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name": "tipo","type":"select","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name":"ipfnumero","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name":"telefono","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name":"email","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name": "fechaValidez","type":"input","class":"name","label":"Identificacion","step":"Identificacion de usuario"}
                    ],
                       [
                      {"name": "formDatos","type":"form","class":"id"},
                      {"name": "servicioSeleccionado","type":"radio","class":"id","img":"jcaptcha.jpg","lag":"divVisualCaptchaDer","label":"","step":"Pregunta de seguridad"},
                      ],
                       [
                      {"name": "formulario","type":"form","class":"name"},
                      {"name": "ARQ.CAPTCHA","type":"captcha","class":"id","img":"jcaptcha.jpg","lag":"divVisualCaptchaDer","label":"","step":"Pregunta de seguridad"},
                      ],
                       [
                      {"name": "formulario","type":"form","class":"name"},
                      {"name": "ARQ.CAPTCHA","type":"captcha","class":"id","img":"jcaptcha.jpg","lag":"divVisualCaptchaDer","label":"","step":"Pregunta de seguridad"},
                      ]
                  ]

            }
  };


//end annontations
var panelVisible=0;

var eService;
var currentStep;
var currentIndexOfSteps;
var numberOfSteps;
var pages;
var CurrentPage;
 var componentList;
function searchCurrentPage()
  {
  pages=eService.pages;
  return(eService.pages[0]);
  }
function navigationMenu()
  {
  currentIndexOfSteps=eService.steps.indexOf(currentStep)+1;
  numberOfSteps=eService.steps.length;

  $("#menu1").remove();
  var newElementMenu = document.createElement('div');
    newElementMenu.id="menu1";
    $("#panel").append(newElementMenu);
    $("#menu1").css(   {
    'background-color': 'black',
    'text-align': 'center'

    });
  //$("#menu").remove();

  //$("#navigationMenu").text(currentStep+" "+currentIndexOfSteps+" / "+numberOfSteps);
  $("#navigationMenu").text(currentStep);
  var nav="";
  var paso=0;
  for(var index=0;index<eService.steps.indexOf(currentStep);index++)
    {
    var newElementh3 = document.createElement('h3');
    newElementh3.id="nav1h3";
    newElementh3.innerText=eService.steps[index];
    $("#menu1").append(newElementh3);

    paso=index+1;
    nav=nav+" "+paso+" "+eService.steps[index]+" (Completado) > ";
    }
  nav=nav+" "+eService.steps.indexOf(currentStep)+" "+currentStep+" (Realizando) > ";

  var newElementh2 = document.createElement('h2');
  newElementh2.id="navh2";
  newElementh2.innerText=currentStep;

  $("#menu1").append(newElementh2);
  for(var index=(eService.steps.indexOf(currentStep)+1);index<eService.steps.length;index++)
    {
    var newElementh3 = document.createElement('h3');
    newElementh3.id="nav2h3";
    newElementh3.innerText=eService.steps[index];
    $("#menu1").append(newElementh3);
    paso=index+1;
    nav=nav+" "+paso+" "+eService.steps[index]+" (Pendiente) > ";

    }
  $("#navigationMenu2").text("Paso "+currentIndexOfSteps+" / "+numberOfSteps);
  $("#navigationMenu1").text(nav);


  }

function addNewComponent(name)
  {
  var newElementBox = document.createElement('input');
  var newElementText = document.createElement('label');
  newElementBox.id = name;
  newElementBox.type = 'text';
  newElementText.id = name+'Label';
  newElementText.innerHTML = name;
  $('#p1').append(newElementText);
  $('#p2').append(newElementBox);
  $("#"+name+"Label").attr('for', name);
  $('#'+name).val(sessionStorage.getItem(name));

  }

// Everything has loaded!
$(window).one('load', function()
  {

  $("#cabecera").remove();
  if (window.location.href.indexOf("sede.sepe.gob.es") > -1)
    eService=eservices.sepe;
  if (window.location.href.indexOf(".citapreviadnie.es") > -1)
    eService=eservices.dni;//kargatu pausua froga egiteko

  createPanel();
  //Egoera Step Kargatu
  currentStep=sessionStorage.getItem("currentStepSession");

  if (currentStep===null)
    {
    currentStep=eService.steps[0];
    }

  //stepOfPage=loadPageStep();
  //for (var current=0;current<eService.step.length;current++)
  //  {
  //  currentStep=stepOfPage[current];
  //  elementsOfStep.push(loadElements(currentStep));
  //  elementsOfStep.concat(loadElements(currentStep));

  //  }
  currentPage=searchCurrentPage();
  show();
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
  panelVisible=0;
  var newElementDiv = document.createElement('div');
  newElementDiv.id = 'panel';
  $('body').append(newElementDiv);


var newElementH3 = document.createElement('h3');
var newElementH3 = document.createElement('h3');
  newElementH3.id="navigationMenu2"; // lehen titlePanel
  panel.append(newElementH3);
var newElementH3 = document.createElement('h3');
  newElementH3.id="navigationMenu1"; // lehen titlePanel
  panel.append(newElementH3);


  var newElementH1 = document.createElement('h1');
  newElementH1.id="navigationMenu"; // lehen titlePanel
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
  newElementNext.className="button";
  //newElementNext.innerHTML="Siguente";
  panel.append(newElementNext);
  var newElementH2Button = document.createElement('h2');
  newElementH2Button.id="buttonTitle";
    newElementH2Button.innerText="Siguiente";
  next.append(newElementH2Button);
  $('#next').on("click",changePanel);
   $("#buttonTitle").css({
       'color':'black'})



  }
function hide()
  {  
  if (componentList[kont].type==="captcha") {
        $('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').appendTo('form[name=\"' + currentPage[0].name + '\"]');

    $('img[src=\"'+componentList[kont].img+'\"]').appendTo('form[name=\"' + currentPage[0].name + '\"]');
    $('#' + componentList[kont].name).appendTo('form[name=\"' + currentPage[0].name + '\"]');
    $('#captchaHelp').appendTo('form[name=\"' + currentPage[0].name + '\"]');

  }
  else
    {
    if (componentList[kont].type==="radio")
      {
      //$('#'+sepe.data[kont].name).appendTo('form[name=\"'+currentPage[0].name+'\"]');
      $("#panel").hide();
      }
    else
      {
      $('label[for=\"'+componentList[kont].name+'\"]').appendTo('form[name=\"'+currentPage[0].name+'\"]');
      $('#'+componentList[kont].name).appendTo('form[name=\"'+currentPage[0].name+'\"]');
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

function createListOfStep()
  {
  var listOfStep=[];
  for (var index=0;index<currentPage.length;index++)
    {
      //alert(currentPage[index].type+" "+currentStep);
    if (currentPage[index].step===currentStep)
      {
      listOfStep.push(currentPage[index]);
      }
    }
  return(listOfStep);
  }
function show()
  {
  //hideShowPanel();
  navigationMenu();
  //alert("show"+kont)
  if (kont ===0)
  {
  componentList=createListOfStep();
  }
  //#alert("show "+componentList[kont].type);
  //$('#next').show();
  if (componentList[kont].type==="captcha")
    {
    $('img[src=\"'+componentList[kont].img+'\"]').appendTo('#p1');
    $('img[src=\"'+componentList[kont].img+'\"]').css({'width':'70%','align':'center','margin-left':'15%','margin-right':'15%'});

    $('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').appendTo('#p2');
    $('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').attr("id","captchaHelp");
    $('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').removeClass("ayudaCaptcha0");

    //$('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').addClass("captchaHelp");

    $('#'+componentList[kont].name).appendTo('#p3');
//
    //$("img").css({'width':'70%','align':'center','margin-left':'15%','margin-right':'15%'});
    //$("#captchaUsuarios").css({ 'width': '85%'});

    }
  else
    {
    if (componentList[kont].type==="radio")
      {
      createListA();
      //createTable();
      }
    else
      {
        //alert(componentList[kont].name);
      $('label[for=\"'+componentList[kont].name+'\"]').appendTo('#subtitle');
      $('#'+componentList[kont].name).appendTo('#p2');

      }
  
    }
  }
function alertNotification()
  {// erroreak erakusteko
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

  if (componentList.length<=kont)
    {
    kont=0;
    //alert(eService.steps.length);
    //alert(eService.steps.indexOf(currentStep));
    //if (eService.steps.length > (eService.steps.indexOf(currentStep)+1))
      currentStep=eService.steps[eService.steps.indexOf(currentStep)+1];
    //  alert("Click "+currentStep);
    }
//alert("click"+kont);
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

  $('input[name=\"'+componentList[kont].name+'\"]').each(function (index)
        {  
        
        
        var listRadioSepe = $(this).parent().text().split("  ");

        var newElementA = document.createElement('a');
        //var newElementh3 = document.createElement('h3');
        //newElementh3.id="h3Radio";

        newElementA.innerHTML=$(this).val()+listRadioSepe[index];
        
        

        newElementA.id="A"+index;
        $("#p1").append(newElementA);
        //$("#"+"A"+index).append(newElementh3);
        $("#p1").append("<br>");


        $( "#A"+index ).on("click",{value:$(this).val()},checkEgin);
        $('#next').remove();

        });


     $("p").css({
       'font-size':'1em','coloe':'black'}) ;

  }

function createListAOfSelect()
  {

  $('#'+componentList[kont].name).each(function (index)
        {

        var valueOption=$(this).parent().text();
        alert(valueOption);//.split("  ");

        var newElementA = document.createElement('a');
        //var newElementh3 = document.createElement('h3');
        //newElementh3.id="h3Radio";

        newElementA.innerHTML=$(this).val()+valueOption;



        newElementA.id="A"+index;
        $("#p1").append(newElementA);
        $("#p1").append("<br>");


        $( "#A"+index ).on("click",{value:$(this).val()},checkEgin);
        $('#next').remove();

        });


     $("p").css({
       'font-size':'1em','coloe':'black'}) ;

  }
// End
