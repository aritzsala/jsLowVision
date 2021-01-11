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
              "steps": ["captcha","selID","selService","selDate"],

              "pages":
                  [
                    [
                      {"name": "solicitudCitaPreviaForm","type":"form","class":"name"},
                      {"name": "captcha","type":"captcha","img":"imgPrincipalCaptcha","lag":"ayudaCaptcha0","label":"","step":"captcha"},
                      {"name": "nif","type":"input","label":"","step":"selID"},
                      {"name":"cp","type":"input","label":"","step":"selID"},
                      {"name": "SbtCodigo","type":"radio","label":"Seleccionar servicio","step":"selService"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaDatosPersonalesForm","type":"form","class":"name"},
                      {"name":"nombre","type":"input","label":"","step":"selID"},
                      {"name":"apellido1","type":"input","label":"","step":"selID"},
                      {"name":"apellido2","type":"input","label":"","step":"selID"}
                    ],
                    [
                    {"name": "solicitudCitaPreviaCalendarioForm","type":"form","class":"name"}
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
var currentStep;
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

  $("#navigationMenu").text("Step of " +currentStep+" is "+currentIndexOfSteps+" of "+numberOfSteps);
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

  eService=eservices.sepe;
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
  //newElementNext.on("click",changePanel);
  newElementNext.innerHTML="Next";
  panel.append(newElementNext);
  $('#next').on("click",changePanel);
  }
function hide()
  {  
  if (componentList[kont].type==="captcha")
    {
    $('#captchaHelp').hide();

    $('#'+componentList[kont].img).appendTo('form[name="solicitudCitaPreviaForm"]');
    $('#'+componentList[kont].name).appendTo('form[name="solicitudCitaPreviaForm"]');
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
      $('#'+componentList[kont].name).appendTo('form[name="solicitudCitaPreviaForm"]');
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
    if (currentPage[index].type===currentStep)
      {
      listOfStep.push(currentPage[index]);
      }
    }
  return(listOfStep);
  }
function show()
  {
  hideShowPanel();
  navigationMenu();
  componentList=createListOfStep();
//alert(componentList[kont].type);
  //$('#next').show();
  if (componentList[kont].type==="captcha")
    {
      alert(componentList[kont].img);
    $('#'+componentList[kont].img).appendTo('#p1');
    $('#'+componentList[kont].img).css({'width':'70%','align':'center','margin-left':'15%','margin-right':'15%'});

    $('div[class=\"'+componentList[kont].lag+'\"]').appendTo('#p2');
    $('div[class=\"'+componentList[kont].lag+'\"]').attr("id","captchaHelp");

        $('div[class=\"'+componentList[kont].lag+'\"]').removeClass(componentList[kont].lag);


    $('#'+componentList[kont].name).appendTo('#p3');

    //$("img").css({'width':'70%','align':'center','margin-left':'15%','margin-right':'15%'});
    $("#captchaUsuarios").css({ 'width': '85%'});

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
      $('label[for=\"'+currenPage[kont].name+'\"]').appendTo('#subtitle');
      $('#'+componentList[kont].name).appendTo('#p2');

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

  if (componentList.length<=kont)
    {
    kont=0;
    if (eService.steps.length > (eService.steps.indexOf(currentStep)+1))
      currentStep=eService.steps[eService.steps.indexOf(currentStep)+1];
    }

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

  }
// End
