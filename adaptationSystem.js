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
              "steps": ["Pregunta de seguridad","Porporcionar datos personales","Selección de servicio","Selección de fecha","Confirmación"],

              "pages":
                  [
                    [
                      {"name": "solicitudCitaPreviaForm","type":"form","class":"name"},
                      {"name": "captcha", "type": "captcha", "captchaType":"img","img":"ImageCaptcha.png","audio":"https://sede.sepe.gob.es/citaprevia/AudioCaptcha.wav","audioType":"audio/wav","step":"Pregunta de seguridad"},
                      {"name": "nif","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                      {"name":"cp","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                      {"name": "SbtCodigo","type":"radio","class":"name","label":"Selección servicio","step":"Selección de servicio"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaDatosPersonalesForm","type":"form","class":"name"},
                      {"name":"nombre","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                      {"name":"apellido1","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                      {"name":"apellido2","type":"input","class":"id","label":"","step":"Porporcionar datos personales"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaCalendarioForm","type":"form","class":"name"},
                      {"name": "eguna","type":"calendar","class":"name","step":"Selección de fecha"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaConfirmacionForm","type":"form","class":"name"},
                      {"name":"appoitment","type":"text","day":"dia","hour":"hora","step":"Confirmación"},
                      {"name":"telefono","type":"input","class":"id","label":"telefono","notification":"telefono","step":"Confirmación"},
                      {"name":"confirmarTelefono","type":"input","class":"id","label":"telefono","notification":"mail","step":"Confirmación"},
                      {"name":"email","type":"input","class":"id","label":"email","step":"Confirmación"},
                      {"name":"confirmaremail","type":"input","class":"id","label":"email","step":"Confirmación"}

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
            {
            page=eService.pages[index];
            //alert(index);
            }
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
  $("#navigationStepProgress").empty();



  $("#title").text(currentStep);
  var nav="";
  var paso=0;
  for(var index=0;index<eService.steps.indexOf(currentStep);index++)
    {
    paso=index+1;
    var newElementh3 = document.createElement('h3');
    newElementh3.id="progress";
    newElementh3.innerText=paso+" "+eService.steps[index];
    $("#navigationStepProgress").append(newElementh3);
    }
  paso++;
  var newElementh2 = document.createElement('div');
  newElementh2.id="selProgress";
  newElementh2.innerText=paso+" "+currentStep;
  $("#navigationStepProgress").append(newElementh2);

  for(var index=(eService.steps.indexOf(currentStep)+1);index<eService.steps.length;index++)
    {paso++;
    var newElementh3 = document.createElement('div');
    newElementh3.id="progress";
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
    $("#title").text("Errors");
    $('#subtitle').text($('p.aviso').text().replaceAll(".",".<br>"));
    }

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

    var newElementH1 = document.createElement('div');
    newElementH1.id="title";
    panel.append(newElementH1);

  var newElementMenu = document.createElement('div');
  newElementMenu.id="navigationStepProgress";
    $("#panel").append(newElementMenu);

    var newElementH2 = document.createElement('div');
    newElementH2.id="subtitle";
    panel.append(newElementH2);

    var newElementH1 = document.createElement('div');
    newElementH1.id="controlRight";
    panel.append(newElementH1);

    var newElementH1 = document.createElement('div');
    newElementH1.id="controlLeft";
    panel.append(newElementH1);

    var newElementP1 = document.createElement('div');
    var newElementP2 = document.createElement('div');
    var newElementP3 = document.createElement('div');

    newElementP1.id="p1";
    newElementP2.id="p2";
    newElementP3.id="p3";

    $('#panel').append(newElementP1);
    $('#panel').append(newElementP2);
    $('#panel').append(newElementP3);

    var newElementButton = document.createElement('div');
    newElementButton.id="buttonRight";
        var newElementA = document.createElement('a');
        newElementA.id="next";
        newElementA.innerText="Seguir";
    //newElementNext.className="buttonMenu";
    $("#controlRight").append(newElementButton);
        $("#buttonRight").append(newElementA);


    $('#next').on("click",changePanel);
    }


function hide()
    {
    $('#subtitle').empty();
    $("#p1").empty();
    $("#p2").empty();
    $("#p3").empty();
    }

function sendForm()
    {
    //alert(currentStep);
    $('input[save="yes"]').each(function(index)
        {
        localStorage.setItem($(this).attr("id"), $(this).val());
        });
    sessionStorage.setItem("currentStepSession",currentStep);
    sessionStorage.setItem("previousStepSession",previousStep);
    alert("Now, it sends the form.");
    $('form['+currentPage[0].class+'=\"'+currentPage[0].name+'\"]').submit();
    }

document.onkeydown=function(e)
    {
    if(e.keyCode === 27) hideShowPanel();
    }

function checkEgin(event)
    {
    $(':radio[value="' + event.data.value + '"]').attr('checked', 'checked');
    changePanel();
    }

function createListOfStep()
    {
    var listOfStep=[];
    var send=true;
    //for (var indexPage=0;indexPage<eService.pages.indexOf(currentPage);indexPage++)
      //  {
        //for (var indexComponent=0;indexComponent<eService.pages.length;indexComponent++)
          //  {
            //if (eService.pages[indexPage][indexComponent].step===currentStep)
              //  {
                //alert("dd");
                //listOfStep.push(eservice.pages[indexPage][indexComponent]);
                //}
            //}
        //}

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
    if (send) sendForm();
    return(listOfStep);
    }

function preShow()
    {
    //hideShowPanel();
    navigationMenu();
    //alert("show"+kont)type
    if (kont ===0)
        {
        componentList=createListOfStep();
        }
    }
function show()
  {
  preShow();
  $('#subtitle').empty();

  //#alert("show "+componentList[kont].type);
  //$('#next').show();
  currentComponent=componentList[kont].name;
  if (componentList[kont].type==="captcha")
        {

        $('img[src=\"'+componentList[kont].img+'\"]').clone().appendTo('#p3');

        var newElementAudio = document.createElement('audio');
        newElementAudio.setAttribute("controls","");
        //newElementAudio.setAttribute("preload","auto");
        //newElementAudio.setAttribute("style","display:none;");
        var source_element = document.createElement('source');
        source_element.setAttribute("src",componentList[kont].audio);
        source_element.setAttribute("type",componentList[kont].audioType);

        newElementAudio.appendChild(source_element)
        $("#p2").append("Audio captcha: ")
        $("#p2").append(newElementAudio);

        }
    if (componentList[kont].type==="radio")
        {
        createListA();
        //createTable();
        }
    if (componentList[kont].type==="select")
        {
        //alert("select");
        createListAOfSelect();
        }
     if (componentList[kont].type==="calendar")
        {
        //alert("calendar");
        createCalendar2();
        }
    if (componentList[kont].type==="captcha" || componentList[kont].type==="input")
        {
        $('label[for=\"' + componentList[kont].name + '\"]').clone(true).appendTo('#subtitle');
        $clone=$('#' + componentList[kont].name).clone(true);
        $clone.appendTo('#p1').focus();
        //$('#' + componentList[kont].name).focus()
        }
    if (componentList[kont].type==="text")
        {
        //alert(componentList[kont].hour);
        //alert($('#'+componentList[kont].hour).text());
        $('#p1').append($('#'+componentList[kont].day).text());
        $('#p1').append($('#'+componentList[kont].hour).text());
        //for (var index=currentPage;index<currentPage.length;index++)
        $(currentPage).each(function(index, element)
            {
            if(typeof element.notification  !== 'undefined')//element.notification != 'undefined')
                {
                $('#p2').append("¿Quieres que la cita sea notificada por "+element.notification +" ?<br>");
                $('#p2').append("<a>Si</a><a>No</a><br>");
                }

            });
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
    if (typeof $clone === 'undefined')
        {
        //hurrengora joan
        alert("undefined");


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
      else
          if ($clone.val()=="")
            {
            alert("The box wich named "+currentComponent+" is empty!")
            }
           else
            {
            $("#"+currentComponent).val($clone.val());
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
        $('#next').hide();

        });


     $("p").css({'font-size':'2em','color':'black'}) ;

  }

function createListAOfSelect()
{
//'#'+componentList[kont].name
  $('#tipo option').each(function () {
    alert($('option[value=\"' + $(this).val() + '\"]').parent().text());
  });


}
function createCalendar2()
    {
    preShow();
    var monthNum ={"Enero":"01","Febrero":"02","Marzo":"03","Abril":"04","Mayo":"05","Junio":"06","Julio":"07","Agosto":"08","Septiembre":"09","Octubre":"10","Noviembre":"11","Diciembre":"12"};
    var year,month,monthName,day;
    //<a href="solicitudCitaPreviaCalendarioNo.do">NO</a> male click for showing more days

    if ($("a[href='solicitudCitaPreviaCalendarioNo.do']").length)
        {
        $("a[href='solicitudCitaPreviaCalendarioNo.do']").attr("id","calendarNO");
        document.getElementById("calendarNO").click();
        }

    $("#p1").append("Meses disponibles");
    monthYear=$("#displayCalendar th").text().split(" ");
    monthName=monthYear[0];
    month=monthNum[monthName];
    year=monthYear[1];


    $("#p1").append(newElementA);
    if ($('#encabezadoMeses a').length>-1)
        {
        $('#encabezadoMeses a').each(function (index)
            {
            //aldatu ID ta gero onclick egin
            $(this).attr("id",$(this).text());
            monthName=$(this).text();
            month=monthNum[monthName];
            var newElementA = document.createElement('a');
            newElementA.className="calendarAPP";
            newElementA.id="month"+$(this).text();
            newElementA.innerText=$(this).text();
            $("#p1").append(newElementA);
            $("#month"+$(this).text()).on("click",{year:year,month:month,monthName:monthName},createDays);
            });
        }
    else
        {
        var newElementA = document.createElement('a');
        newElementA.className="calendarAPP";
        newElementA.innerText=monthName;
        newElementA.id="month"+monthName;
        $("#p1").append(newElementA);
        $("#month"+monthName).on("click",{year:year,month:month,monthName:monthName},createDays);

        }
    //update the month variable with first month available
    monthName=monthYear[0];
    month=monthNum[monthName];

    //Show days
        $("#month"+monthName).trigger( "click",{year:year,month:month,monthName:monthName});

    //createDays2(year,month,monthName);

    //Show hours
    day=$('#displayCalendar a').first().text();
    $("#dayId0").trigger( "click",{year:year,month:month,monthName:monthName,day:day});
    //createHours2(year,month,monthName,day);
    $("#next").hide();
    }

function createDays(event)
    {
    document.getElementById(event.data.monthName).click();
    //alert(event.data.year+event.data.month+event.data.monthName);
    $("#p2").empty();
    $("#p2").append("Días disponibles de "+event.data.monthName);
    $('#displayCalendar a').each(function (index)
        {
        var newElementA = document.createElement('a');
        newElementA.className="calendarAPP";
        newElementA.id="dayId"+index;

        newElementA.innerText=$(this).text();
        $("#p2").append(newElementA);
        $("#dayId"+index).on("click",{year:event.data.year,month:event.data.month,monthName:event.data.monthName,day:$(this).text()},createHours);

        });
    }


function createHours(event)
    {
    $("#p3").empty();
    $("#p3").append("Horas disponibles del "+event.data.day+" de "+event.data.monthName);
    $('#h'+event.data.year+'-'+event.data.month+'-'+event.data.day+' a').each(function (index)
        {
        if (($(this).text()).indexOf(":")>-1)
            {
            $(this).attr("id","day"+event.data.day+"month"+event.data.month+index);
            var newElementA = document.createElement('a');
            newElementA.className = "calendarAPP";
            newElementA.id = "day"+index;
            newElementA.innerText = $(this).text();
            $("#p3").append(newElementA);
            $("#day"+index).on("click",{day:event.data.day,month:event.data.month,index:index},selHour);
            }
        });
    }


function selHour(event)
    {
    document.getElementById("day"+event.data.day+"month"+event.data.month+event.data.index).click();
    //update step
    currentStep=eService.steps[eService.steps.indexOf(currentStep)+1];
    //send the form
    sendForm();
    }
function createCalendar()
    {
    $("#p1").append("<h2>Meses disponibles</h2>");
    $("#p2").append("<h2>Días disponibles</h2>");
    $("#p3").append("<h2>Horas disponibles</h2>");

    $('a').each(function ()
        {
        //alert($(this));
        if ($(this).attr("href").indexOf("numMes")>-1)
            $(this).appendTo("#p1");
        if ($(this).attr("href").indexOf("numDia")>-1)
            $(this).appendTo("#p2");
        if ($(this).attr("href").indexOf("ConfigurarCita")>-1)
            $(this).appendTo("#p3");
        });
    //$('div[class="listaSin"]').appendTo("#p1");
    }

function clearString(texto)
    {
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
