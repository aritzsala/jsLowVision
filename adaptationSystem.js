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
              "url":"https://sede.sepe.gob.es/citaprevia/solicitudCitaPrevia.do",
              "steps": ["Pregunta de seguridad","Identificación de usuario","Selección de servicio","Selección de fecha"],

              "pages":
                  [
                    [
                      {"name": "solicitudCitaPreviaForm","type":"form","class":"name"},
                      {"name":"captcha" ,"type":"captcha","class":"class","captchaType":"img","img":"ImageCaptcha.png","lag":"ayudaCaptcha0","label":"","step":"Pregunta de seguridad"},
                      {"name": "nif","type":"input","class":"id","label":"","step":"Identificación de usuario"},
                      {"name":"cp","type":"input","class":"id","label":"","step":"Identificación de usuario"},
                      {"name": "SbtCodigo","type":"radio","class":"name","label":"Selección servicio","step":"Selección de servicio"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaDatosPersonalesForm","type":"form","class":"name"},
                      {"name":"nombre","type":"input","class":"id","label":"","step":"Identificación de usuario"},
                      {"name":"apellido1","type":"input","class":"id","label":"","step":"Identificación de usuario"},
                      {"name":"apellido2","type":"input","class":"id","label":"","step":"Identificación de usuario"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaCalendarioForm","type":"form","class":"name"},
                      {"name": "eguna","type":"calendar","class":"name","step":"Selección de fecha"}
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
                      {"name": "codSeguridad","type":"captcha","class":"id","captchaType":"img","img":"jcaptcha.jpg","lag":"divVisualCaptchaDer","label":"","step":"Pregunta de seguridad"},
                      {"name": "numDocumento","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name": "letraDocumento","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name":"codEquipo","type":"input","class":"id","label":"","step":"Identificacion de usuario"},
                      {"name": "fechaValidez","type":"input","class":"name","label":"Identificacion","step":"Identificacion de usuario"}
                    ],
                                 [
                      {"name": "ObtenerFechaCita","type":"page","class":"name"},
                      {"name": "listaSin","type":"calendar","class":"class","label":"","step":"Seleccion de fecha"}
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
                      {"name": "ARQ.CAPTCHA","type":"captcha","class":"class","captchaType":"class","img":"p1","lag":"p0","label":"","step":"Pregunta de seguridad"},
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
var currentComponent;
var previousStep;
var errorsShow;

function searchCurrentPage()
  {
  // search the current page that user browse in the annotations and return the annotations of current page
  var page=[];
  for (var index=0;index<eService.pages.length;index++)
    {
    if (eService.pages[index][0].type==="form")
      {
      if ($('form['+eService.pages[index][0].class+'=\"'+eService.pages[index][0].name+'\"]').length)
        page=eService.pages[index];
      }
    if (eService.pages[index][0].type==="page")
      {
      alert("page");
      }
    }
  if(page.length===0)
    return(-1);
  else
    return(page);
  }

function navigationMenu()
  {
  //Progress menu
  currentIndexOfSteps=eService.steps.indexOf(currentStep)+1;
  numberOfSteps=eService.steps.length;
  $("#navigationStepProgress").remove();
  var newElementMenu = document.createElement('div');
  newElementMenu.id="navigationStepProgress";

  $("#panel").append(newElementMenu);
  $("#navigationStepProgress").append("<h3><u>Pasos del servicio</u></h3>");
  $("#navigationStepProgress").css(   {'background-color': 'black','text-align': 'center'});

  $("#navigationMenu").text(currentStep);
  var nav="";
  var paso=0;
  for(var index=0;index<eService.steps.indexOf(currentStep);index++)
    {
    paso=index+1;
    var newElementh3 = document.createElement('h3');
    newElementh3.id="nav1h3";
    newElementh3.innerText=paso+" "+eService.steps[index];
    $("#navigationStepProgress").append(newElementh3);
    }
  paso++;
  var newElementh2 = document.createElement('h2');
  newElementh2.id="navh2";
  newElementh2.innerText=paso+" "+currentStep;

  $("#navigationStepProgress").append(newElementh2);
  for(var index=(eService.steps.indexOf(currentStep)+1);index<eService.steps.length;index++)
    {paso++;
    var newElementh3 = document.createElement('h3');
    newElementh3.id="nav2h3";
    newElementh3.innerText=paso+" "+eService.steps[index];
    $("#navigationStepProgress").append(newElementh3);
    }
  }

function addNewComponent(name)
  {
  //begiratu localStorage
  var newElementBox = document.createElement('input');
  var newElementText = document.createElement('label');
  newElementBox.id = name;
  newElementBox.type = 'text';
  newElementText.id = name+'Label';
  newElementText.innerHTML = name;
  $('form['+currentPage[0].class+'=\"'+currentPage[0].name+'\"]').append(newElementText);
  $('form['+currentPage[0].class+'=\"'+currentPage[0].name+'\"]').append(newElementBox);
  $("#"+name+"Label").attr('for', name);
  $("#"+name).attr('save', "yes");

  }

function loadStorage()
  {
  for (var x=0;x<localStorage.length;x++)
    {
    $('#'+localStorage.key(x)).val(localStorage.getItem(localStorage.key(x)));
    }
  }


// Everything has loaded!
$(window).one('load', function()
  {
  //cabecera sepen agertzen den menua gure panelan gainean, berez ez litzake kendu behar, baizkit eta gainean egon beharko luke
  //$("#cabecera").remove();
  loadStorage();
  if (window.location.href.indexOf("sede.sepe.gob.es/citaprevia") > -1)
    eService=eservices.sepe;
  if (window.location.href.indexOf(".citapreviadnie.es") > -1)
    eService=eservices.dni;//kargatu pausua froga egiteko
  if (window.location.href.indexOf("w6.seg-social.es") > -1)
    eService=eservices.segSocial;
  if (eService!=null)
    {
    createPanel();
    //Egoera Step Kargatu
    currentStep=sessionStorage.getItem("currentStepSession");
    previousStep=sessionStorage.getItem("previousStepSession");

    if (currentStep===null) currentStep=eService.steps[0];
    if (previousStep===null) previousStep=currentStep;

    currentPage=searchCurrentPage();
    if (window.location.href.indexOf("ObtenerFechaCita") > -1)
      {
      currentPage = eService.pages[1];
      currentStep="Seleccion de fecha";
      }

    if (alertNotification())
        {
        currentStep=previousStep;
        errorsShow=true;
        preShow();
        showErrors()
        }
    else
        {

        show();
        }
    }
  });

function showErrors()
    {
componentList=createListOfStep();
    $("#navigationMenu").text("Errors");
    $('#subtitle').text($('p.aviso').text());
    }

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
  //newElementNext.innerText="Siguinte";
  panel.append(newElementNext);
    var newElementH2Button = document.createElement('h2');
    newElementH2Button.id="buttonTitle";
    newElementH2Button.innerText="Siguiente";
  next.append(newElementH2Button);
  $('#next').on("click",changePanel);
  $("#buttonTitle").css({'color':'black'});
  panel.append("<br>");




  }
function hide()
  {

  if (componentList[kont].type==="captcha") {
        $('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').appendTo('form[name=\"' + currentPage[0].name + '\"]');

    $('img[src=\"'+componentList[kont].img+'\"]').appendTo('form[name=\"' + currentPage[0].name + '\"]');
    $('#' + componentList[kont].name).appendTo('form[name=\"' + currentPage[0].name + '\"]');
    $('#captchaHelp').appendTo('form[name=\"' + currentPage[0].name + '\"]');
    if (window.location.href.indexOf("w6.seg-social.es") > -1)
      {
      $('p[class="p2"').appendTo('form[name=\"' + currentPage[0].name + '\"]');
      $('p[class="p0"').appendTo('form[name=\"' + currentPage[0].name + '\"]');


    $('#ARQ\\.CAPTCHA').appendTo('#p3');

      }
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
function sendForm()
  {
  $('input[save="yes"]').each(function(index)
    {
    localStorage.setItem($(this).attr("id"), $(this).val());
    });
  sessionStorage.setItem("currentStepSession",currentStep);
  sessionStorage.setItem("previousStepSession",previousStep);

  alert("Now, it sends the form.");
  $('form['+currentPage[0].class+'=\"'+currentPage[0].name+'\"]').submit();
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
  if(e.keyCode === 27) hideShowPanel();
  if(e.keyCode === 17) createCalendar();
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
  changePanel()
  //sessionStorage.setItem("nombre", $('#nombre').val());
  //sessionStorage.setItem("primerapellido",$('#apellido1').val());
  //sessionStorage.setItem("segundoapellido",$('#apellido2').val());
  //$('form[name="solicitudCitaPreviaForm"]').submit();
  }

function createListOfStep()
  {
  var listOfStep=[];
  var send=true;
  for (var indexPage=0;indexPage<eService.pages.indexOf(currentPage);indexPage++)
     {
    for (var indexComponent=0;indexComponent<eService.pages.length;indexComponent++)
      {
      if (eService.pages[indexPage][indexComponent].step===currentStep)
        {
        //listOfStep.push(eservice.pages[indexPage][indexComponent]);
        }
      }
    }

  for (var indexPage=eService.pages.indexOf(currentPage);indexPage<eService.pages.length;indexPage++)
    {
    for (var indexComponent=0;indexComponent<eService.pages[indexPage].length;indexComponent++)
      {
      if (eService.pages[indexPage][indexComponent].step===currentStep)
        {
        listOfStep.push(eService.pages[indexPage][indexComponent]);

        if (indexPage>eService.pages.indexOf(currentPage))
          {
          addNewComponent(eService.pages[indexPage][indexComponent].name);
          }
        else
          {
          send = false;
          }
        }
      }
    }
  //alert(currentStep);
  if (send) sendForm();
  return(listOfStep);
  }
function preShow()
    {
    //hideShowPanel();
    navigationMenu();
    //alert("show"+kont)
    if (kont ===0)
        {
        componentList=createListOfStep();
        }
    }
function show()
  {
  preShow();
              $('#subtitle').text("");

  //#alert("show "+componentList[kont].type);
  //$('#next').show();
  currentComponent=componentList[kont].name;
  if (componentList[kont].type==="captcha")
    {
    if (window.location.href.indexOf("w6.seg-social.es") > -1)
      {
      $('p[class="p2"').appendTo('#p1');
      $('p[class="p0"').appendTo('#p2');

      $('p[class="p2"').removeClass("p2");
      $('p[class="p0"').removeClass("p0");
        $("#p1").css({'font-size':'1em','color':'white'});
        $("#p2").css({'font-size':'2em','color':'white'});

        $('#ARQ\\.CAPTCHA').appendTo('#p3');

        }
    else
      {
      $('img[src=\"'+componentList[kont].img+'\"]').appendTo('#p1');
      $('img[src=\"'+componentList[kont].img+'\"]').css({'width':'70%','align':'center','margin-left':'15%','margin-right':'15%'});
      $('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').appendTo('#p2');
      $('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').attr("id","captchaHelp");
      $('div['+componentList[kont].class+'=\"'+componentList[kont].lag+'\"]').removeClass("ayudaCaptcha0");
      $('#'+componentList[kont].name).appendTo('#p3');
      //$('#captchaHelp').css({'width':'5%','align':'center','margin-left':'15%','margin-right':'15%'});

      }



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
            if (componentList[kont].type==="select")

            {
              //alert("select");
              createListAOfSelect();
            }
        else
        {
          if (componentList[kont].type==="calendar")

            {
              //alert("calendar");
              createCalendar2();
            }
        else {
            //alert(componentList[kont].name);
            $('label[for=\"' + componentList[kont].name + '\"]').appendTo('#subtitle');
            $('#' + componentList[kont].name).appendTo('#p2');
            $('#' + componentList[kont].name).focus()
          }
        }


      }

    }
  }
function alertNotification()
  {// erroreak erakusteko
  if($('p.aviso').text()!="")
    {
    currentStep=previousStep;
    //alert($('p.aviso').text());
    return(true);
    }
   else return(false);

  }
function changePanel()
  {
  if (errorsShow==true)
  {
  errorsShow=false;
  show();
  }
  else
  {
  if ($('#'+currentComponent).val()=="")
    {
    alert("The box wich named "+currentComponent+" is empty!")
    }
   else
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
  }
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
        var newElementh3 = document.createElement('font');
        //newElementh3.id="h3Radio";

        newElementh3.innerHTML=listRadioSepe[index];//$(this).val()+

        //newElementA.className="radio";

        newElementA.id="A"+index;

        $("#p1").append(newElementA);
        $("#p1").css({'font-size':'18px'});
        $("#"+"A"+index).append(newElementh3);
        $("#p1").append("<br>");
                //$('#A'+index).addClass="radio";



        $( "#A"+index ).on("click",{value:$(this).val()},checkEgin);
        $('#next').remove();

        });


     $("p").css({'font-size':'2em','color':'black'}) ;

  }

function createListAOfSelect() {
//'#'+componentList[kont].name
  $('#tipo option').each(function () {
    alert($('option[value=\"' + $(this).val() + '\"]').parent().text());
  });


}
function createCalendar2()
  {
  var monthNum =[{"enero":"01"},{"febrero":"02"}];
  var year,month,monthName,day;
  year="2021";
  //<a href="solicitudCitaPreviaCalendarioNo.do">NO</a>
  $("#p1").append("<h2>Meses disponibles</h2>");
month="02";
    monthName=$("#displayCalendar th").text();

  if ($('#encabezadoMeses a').length>-1)
    {
    $('#encabezadoMeses a').each(function (index)
      {
      //month="";
      var newElementA = document.createElement('a');
      newElementA.className="calendarAPP";
      newElementA.innerText=$(this).text();
      $("#p1").append(newElementA);

      });
    }
  else
    {
    var newElementA = document.createElement('a');
      newElementA.className="calendarAPP";
      newElementA.innerText=monthName.replaceAll(" 2021","");
      month=monthNum.monthName.replaceAll(" 2021","");
      alert(month);
      $("#p1").append(newElementA);
    }

  day="01";
  $("#p2").append("<h2>Días disponibles de "+monthName+":</h2>");
  $('#displayCalendar a').each(function (index)
    {
    var newElementA = document.createElement('a');
    newElementA.className="calendarAPP";
    newElementA.innerText=$(this).text();
    $("#p2").append(newElementA);  });
  alert('#h'+year+'-'+month+'-'+day+' a');
    $("#p3").append("<h2>Horas disponibles del "+day+" de "+monthName+":</h2>");
  $('#h'+year+'-'+month+'-'+day+' a').each(function (index)
    {
    alert($(this).text());
    alert(clearString($(this).text()));
    if (true)
      {
        var newElementA = document.createElement('a');
        newElementA.className = "calendarAPP";
        newElementA.innerText = $(this).text();
        $("#p3").append(newElementA);
      }
    });
  $("#next").hide();
  }
function createCalendar()
  {
  $("#p1").append("<h2>Meses disponibles</h2>");
  $("#p2").append("<h2>Días disponibles</h2>");
  $("#p3").append("<h2>Horas disponibles</h2>");

  $('a').each(function ()
    {
    if ($(this).attr("href").indexOf("numMes")>-1)
    $(this).appendTo("#p1");
        if ($(this).attr("href").indexOf("numDia")>-1)
    $(this).appendTo("#p2");
             if ($(this).attr("href").indexOf("ConfigurarCita")>-1)
    $(this).appendTo("#p3");
  });
  //$('div[class="listaSin"]').appendTo("#p1");

}

function clearString(texto){
var texto = texto.toLowerCase();
texto = texto.replace(/[!]/, "");
texto = texto.replace( " ", "");
texto = texto.replace(/[#]/, "");
texto = texto.replace(/[$]/, "");
texto = texto.replace(/[%]/, "");
texto = texto.replace(/[&]/, "");
texto = texto.replace(/[/]/, "");
texto = texto.replace(/[(]/g, "");
texto = texto.replace(/[)]/g, "");
texto = texto.replace(/[;]/g, "");
texto = texto.replace(/[:]/g, "");
texto = texto.replace(/[<]/, "");
texto = texto.replace(/[>]/, "");
texto = texto.replace(/[']/, "");
texto = texto.replace(/['"]+/g, "");
texto = texto.replace(/”/g, '');
texto = texto.replace(/“/g, '')
return texto;
}

// End
