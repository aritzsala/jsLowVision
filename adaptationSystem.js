//annotstions
var kont=0;
var sepe;
var eservice;
var oharrak=1;

var unekoStep="";
var eservices =
  {
  "sepe":{
              "name": "sepe",
              "description": "",
              "url":"https://sede.sepe.gob.es/citaprevia/solicitudCitaPrevia.do",
              "steps": ["Pregunta de seguridad","Porporcionar datos personales","Selección de servicio","Selección de fecha","Confirmación"],

              "pages":
                  [
                    [
                      {"name": "solicitudCitaPreviaForm","type":"form","class":"name","errorClass":"class","errorName":"aviso","errorComponent":"p"},
                      {"name": "captcha","class":"id", "type": "captcha", "captchaType":"img","img":"ImageCaptcha.png","audio":"https://sede.sepe.gob.es/citaprevia/AudioCaptcha.wav","audioType":"audio/wav","step":"Pregunta de seguridad"},
                      {"name": "nif","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                      {"name":"cp","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                      {"name": "SbtCodigo","type":"radio","class":"name","view":"line","label":"Selección servicio","step":"Selección de servicio"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaDatosPersonalesForm","type":"form","class":"name"},
                      {"name":"nombre","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                      {"name":"apellido1","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                      {"name":"apellido2","type":"input","class":"id","label":"","step":"Porporcionar datos personales"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaCalendarioForm","type":"form","class":"name"},
                      {"name": "eguna","type":"calendar","class":"name","month":"encabezadoMeses","step":"Selección de fecha"}
                    ],
                    [
                      {"name": "solicitudCitaPreviaConfirmacionForm","type":"form","class":"name"},
                      {"name":"#dia,#hora.azul","type":"text","day":"dia","hour":"hora.azul","place":"","step":"Confirmación"},
                      {"name":"telefono","type":"confirmation","label":"telefono","step":"Confirmación","value":"2"},
                      {"name":"telefono","type":"input","class":"id","label":"telefono","notification":"telefono","step":"Confirmación"},
                      {"name":"confirmarTelefono","type":"input","class":"id","label":"telefono","notification":"mail","step":"Confirmación"},
                      {"name":"email","type":"confirmation","label":"email","step":"Confirmación","value":"2"},
                      {"name":"email","type":"input","class":"id","label":"email","step":"Confirmación"},
                      {"name":"confirmaremail","type":"input","class":"id","label":"email","step":"Confirmación"}

                    ]

                  ]

            },
  "dni":{
      "name": "dni",
      "description": "",
      "steps": ["Intro","Pregunta de seguridad","Porporcionar datos personales","Seleccion de servicio","Seleccion de localidad","Selección de fecha","Confirmación"],

      "pages":
         [
            [
                {"name": "https://www.citapreviadnie.es/citaPreviaDniExp/","type":"page","class":"name"},
                {"name": "informacionGeneral","type":"link","view":"line","link":"a","class":"class","main":"div","step":"Intro"}
            ],
            [
                {"name": "Inicio.action","type":"page","class":"name"},
                {"name": "informacionGeneral","type":"link","view":"row","link":"a","class":"class","main":"div","step":"Intro"}
            ],
            [
                {"name": "Autentificar","type":"form","class":"id","errorClass":"class","errorName":"pError","errorComponent":"ul"},
                {"name": "codSeguridad","class":"name", "type": "captcha", "captchaType":"img","img":"jcaptcha.jpg","audio":"https://www.citapreviadnie.es/citaPreviaDniExp/scaptcha.mp3","audioType":"audio/mp3","step":"Pregunta de seguridad"},
                {"name": "numDocumento","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                {"name": "letraDocumento","type":"input","class":"name","label":"","step":"Porporcionar datos personales"},
                {"name":"codEquipo","type":"input","class":"name","label":"","helpComponent":"images/ReversoDni3s.jpg","step":"Porporcionar datos personales"},
                {"name": "fechaValidez","type":"input","class":"name","label":"","helpComponent":"images/AnversoDni3s.jpg","step":"Porporcionar datos personales"}
            ],

            [
                {"name": "Autentificar.action","type":"page","class":"name"},
                {"name": "informacionGeneral","type":"link","view":"line","link":"a","class":"class","main":"div","step":"Seleccion de servicio"}
            ],
                        [
                {"name": "InicioTramite.action","type":"page","class":"name"},
                {"name": "comunidad","type":"link","link":"a","view":"row","class":"class","main":"div","step":"Seleccion de localidad"}
            ],
            [
                {"name": "seleccion=comunidad&comunidad","type":"page","class":"name"},
                {"name": "","type":"link","link":"a","main":"li","view":"row","step":"Seleccion de localidad"}
            ],
                                               [
                {"name": "nombre_provincia","type":"page","class":"name"},
                {"name": "lista","type":"link","class":"class","view":"line","link":"a","main":"div","step":"Seleccion de localidad"}
            ],
            [
                  {"name": "seleccion=hora","type":"page","class":"name"},
                  {"name": "eguna","type":"calendar","class":"name","month":"listaSin","day":"vacio","hour":"hora","step":"Selección de fecha"}
            ],
            [
                {"name": "GestionarCita_solicitar_action","type":"form","class":"id"},
                {"name":"fieldset:nth-of-type(2)","type":"text","day":"dia","hour":"hora.azul","place":"","step":"Confirmación"},
                {"name":"telefono","type":"confirmation","label":"telefono","step":"Confirmación","value":"1"},
                {"name":"telefono","type":"input","class":"id","label":"telefono","notification":"telefono","step":"Confirmación"},
                {"name":"email","type":"confirmation","label":"email","step":"Confirmación","value":"2"},
                {"name":"email","type":"input","class":"id","label":"email","step":"Confirmación"},
                {"name":"repeemail","type":"input","class":"id","label":"email","step":"Confirmación"},
                {"name":"fieldset:nth-of-type(3)","type":"text","day":"dia","hour":"hora.azul","place":"","step":"Confirmación"},
            ]
        ]
    },
  "osa":{
       "name": "osa",
       "description": "",
       "steps": ["Porporcionar datos personales","Selección de servicio","Seleccion de fecha"],
       "pages":
              [
                [
                   {"name": "/o22PlamWar/login.do","type":"form","class":"action^","errorClass":"id","errorName":"errorLogin","errorComponent":"div"},
                   {"name": "codnumerico","type":"input","class":"id","label":"","helpComponent":"/c22/appcont/eskura/imgs/imgTISLoginCita.jpg","step":"Porporcionar datos personales"},
                   {"name": "apellido","type":"input","class":"id","label":"","step":"Porporcionar datos personales"},
                   {"name":"idfecha","type":"input","class":"id","label":"","step":"Porporcionar datos personales"}
                    ],
                                     [
                   {"name": "/o22PlamWar/seleccionaccion.do","type":"form","class":"action^","errorClass":"id","errorName":"errorLogin","errorComponent":"div"},
                   {"name": "valorAccion","type":"submit","class":"value","label":"","helpComponent":"/c22/appcont/eskura/imgs/imgTISLoginCita.jpg","step":"Selección de servicio"}
                 ],
                       [
                   {"name": "/o22PlamWar/nuevacita.do","type":"form","class":"action^","errorClass":"id","errorName":"errorLogin","errorComponent":"div"},
                   {"name": "tipoCita","type":"radio","class":"name","view":"line","label":"Selección servicio","step":"Selección de servicio"}
                 ],
                      [



                    {"name": "/o22PlamWar/seleccionTipoContacto.do","type":"form","class":"action^","errorClass":"id","errorName":"errorLogin","errorComponent":"div"},
                    {"name": "tipoCita","type":"radio","class":"name","view":"line","label":"Selección servicio","step":"Selección de servicio"}
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
      //alert($('form').attr("action"));

      if ($('form['+eService.pages[index][0].class+'=\"'+eService.pages[index][0].name+'\"]').length)
            {
            page=eService.pages[index];
            //alert(eService.pages[index][0].name);
            break;
            }

      }
    if (eService.pages[index][0].type==="page")
      {
      if (eService.pages[index][0].name.indexOf("https") > -1)
        {
        if (window.location.href==eService.pages[index][0].name)
            {page=eService.pages[index];break;}
        }
      else
        {
        if (window.location.href.indexOf(eService.pages[index][0].name) > -1)
            {page=eService.pages[index];break;}
        }

      }
    }
  //alert(page[0].name);
  //alert(window.location.href==page[0].name);
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

$(window).ready(function()
    {
    //alert("ready");
    var newElementDiv = document.createElement('div');
    newElementDiv.id = 'loading';
    newElementDiv.className = 'lds-ring';
    $('body').append(newElementDiv);
    $('#loading').append("<div></div><div></div><div></div>");
    });

// Everything has loaded!
$(window).load(function()
  {
  //alert("load");



    $('html, body').css({overflow: 'auto',height: 'auto'});

    $('div[class="area-main"]').hide();
  $("#loading").hide();
  loadStorage();
  if (window.location.href.indexOf("sede.sepe.gob.es/citaprevia") > -1)
    eService=eservices.sepe;
  if (window.location.href.indexOf(".citapreviadnie.es") > -1)
    eService=eservices.dni;//kargatu pausua froga egiteko
  if (window.location.href.indexOf("o22PlamWar") > -1)
    eService=eservices.osa;
  if (eService!=null)
    {

    createPanel();
    //Egoera Step Kargatu

    currentStep=sessionStorage.getItem("currentStepSession");
    previousStep=sessionStorage.getItem("previousStepSession");
    if (currentStep===null) currentStep=eService.steps[0];
    if (previousStep===null) previousStep=currentStep;
    currentPage=searchCurrentPage();

    //alert(currentStep +":::"+currentPage[1].step);
    //alert(eService.steps.indexOf(currentStep) +":::"+ eService.steps.indexOf(currentPage[1].step));

    if (eService.steps.indexOf(currentStep) < eService.steps.indexOf(currentPage[1].step))
        currentStep=currentPage[1].step;


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
    errorComponent=currentPage[0].errorComponent+"."+currentPage[0].errorName;
    $('#p1').append($(errorComponent).html());
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
    //alert("create panel");
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
        var newElementDiv = document.createElement('div');
        newElementDiv.id="bRight";

        var newElementA = document.createElement('div');
        newElementA.id="buttonTitle";
        newElementA.innerText="Seguir";
        //newElementA.className="buttonMenu";
    $("#controlRight").append(newElementButton);
        $("#buttonRight").append(newElementDiv);
        $("#buttonRight").append(newElementA);


    $('#buttonRight').on("click",changePanel);
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
    $('input[save="yes"]').each(function(index)
        {
        localStorage.setItem($(this).attr("id"), $(this).val());
        });
    sessionStorage.setItem("currentStepSession",currentStep);
    sessionStorage.setItem("previousStepSession",previousStep);
    //alert("Now, it sends the form.");
    $('form['+currentPage[0].class+'=\"'+currentPage[0].name+'\"]').submit();
    }
function sendPage(event)
    {
    //$('input[save="yes"]').each(function(index)
      //  {
        //localStorage.setItem($(this).attr("id"), $(this).val());
        //});
    //sessionStorage.setItem("currentStepSession",currentStep);
    //sessionStorage.setItem("previousStepSession",previousStep);
    //alert("Now, it sends the form.");
    //$('form['+currentPage[0].class+'=\"'+currentPage[0].name+'\"]').submit();
    document.getElementById(event.data.urlId).click();
    }

document.onkeydown=function(e)
    {
    if(e.keyCode === 27) hideShowPanel();
    //key press enter for going to next element
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
function submitClick(event)
    {
    alert(event.data.id);
    document.getElementById(event.data.id).click();
    }
function preShow()
    {
    //hideShowPanel();
    hide()
    navigationMenu();
    //alert("show");
    if (kont ===0)
        {
        componentList=createListOfStep();
        }
    }
function show()
  {

  preShow();
  $('#subtitle').empty();
  hide();
  $("#buttonRight").show();
  //alert(componentList[kont].name);
  currentComponent=componentList[kont].name;
  if (componentList[kont].type==="captcha")
        {

        $('img[src=\"'+componentList[kont].img+'\"]').clone().appendTo('#p3');

        var newElementAudio = document.createElement('audio');
        newElementAudio.setAttribute("controls","");
        var source_element = document.createElement('source');
        source_element.setAttribute("src",componentList[kont].audio);
        source_element.setAttribute("type",componentList[kont].audioType);

        newElementAudio.appendChild(source_element)
        $("#p2").append("Audio captcha: ")
        $("#p2").append(newElementAudio);

        }
    if (componentList[kont].type==="radio")
        {
        //alert("radio");
        createListA();
        }
    if (componentList[kont].type==="select")
        {
        //Ex dabil ondo
        createListAOfSelect();
        }
     if (componentList[kont].type==="calendar")
        {
        if (window.location.href.indexOf("sede.sepe.gob.es/citaprevia") > -1) createCalendar2();
        if (window.location.href.indexOf(".citapreviadnie.es") > -1) createCalendar();
        }


    if (componentList[kont].type==="captcha" || componentList[kont].type==="input")
        {

        if (typeof componentList[kont].helpComponent !== 'undefined') $('img[src=\"' + componentList[kont].helpComponent + '\"]').clone(true).removeAttr( 'style' ).removeClass().appendTo('#p3');
        $("#subtitle").append($('label[for=\"' + componentList[kont].name + '\"]').text());
        $clone=$('input['+componentList[kont].class+'=\"'+ componentList[kont].name+'\"]').clone(true).removeAttr( 'style' ).removeClass();
        $clone.appendTo('#p1').focus();
        }
    if (componentList[kont].type==="text")
        {
        //$('#p1').append($('#'+componentList[kont].day).text()+"<br>");
        //$('#p1').append($('#'+componentList[kont].hour).text());
        //alert('#'+componentList[kont].day+',#'+componentList[kont].hour);
        //alert($('#'+componentList[kont].day+',#'+componentList[kont].hour).text());

        $('#p1').append($(componentList[kont].name).html());
        }
    if (componentList[kont].type==="submit")
        {
        //radio modukoa
        //$('#p1').append($(componentList[kont].name).html());
        $("input[name=\'"+componentList[kont].name+"\']").each(function(index){
            $(this).attr("id","submit_"+index);

            var newElementA = document.createElement('div');
            newElementA.innerHTML=$(this).attr("value");//text();
            newElementA.className="linkButton";
            newElementA.id="A"+index;


            //onclick benetako botoian click egin
            $("#p1").append(newElementA);
                                    $("#A"+index).on("click",{id:"submit_"+index},submitClick);

        });


        //$( "#A"+index ).on("click",{urlId:"Aid"+index},sendPage);
        $('#buttonRight').hide();
        }
    if (componentList[kont].type==="confirmation")
        {
        $('#p1').append("¿Quieres que la cita sea notificada por "+componentList[kont].name +" ?<br>");
        $('#p1').append("<div class='calendarDay' id='yes'>Si</div><div class='calendarDay' id='no'>No</div><br>");
        $("#yes").on("click",{value:true,numberFields:componentList[kont].value},yesNo);
        $("#no").on("click",{value:false,numberFields:componentList[kont].value},yesNo);
        $("#buttonRight").hide()
        }
    if (componentList[kont].type==="link")
        {
        if (typeof componentList[kont].class !== "undefined") component=componentList[kont].main+'['+componentList[kont].class+'=\"'+componentList[kont].name+'\"]';
        else component=componentList[kont].main;
        $(component+' '+componentList[kont].link).each(function (index)
            {
            $(this).attr("id","Aid"+index);
            var newElementA = document.createElement('div');
            if (componentList[kont].view=="row") newElementA.className="calendarMonth";
            else newElementA.className="linkButton";


            newElementA.innerHTML=$(this).attr("title");//text();
            newElementA.id="A"+index;

            $("#p1").append(newElementA);
            $( "#A"+index ).on("click",{urlId:"Aid"+index},sendPage);
            $('#buttonRight').hide();

            });
        $("#buttonRight").hide()
        }

    }

function yesNo(event)
    {
    if (event.data.value)
        {
        changePanel();
        }
    else
        {
        kont=kont+parseInt(event.data.numberFields);
        changePanel();
        }
    }
function alertNotification()
  {// erroreak erakusteko
  errorComponent=currentPage[0].errorComponent+"."+currentPage[0].errorName;

  if($(errorComponent).text()!="")
    {
    //alert("errors");
    currentStep=previousStep;
    //alert("Errors: "+$('p.aviso').text());
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
        //alert("undefined");


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
  $('input[name=\"'+componentList[kont].name+'\"][type="radio"]').each(function (index)
        {
        alert(index+"::"+$(this).next().text());


        textNode=$(this.nextSibling);

        alert(textNode.nodeType);
        if (textNode[0].nodeType == Node.TEXT_NODE)
            {
            //text da
            text=textNode.text();

            }
        else
            {
            //edukiontzia
            alert("2");
            text="2";
            }
           text=$(this).parent().prev().text();
        var newElementA = document.createElement('div');
        newElementA.className="linkButton";
        newElementA.innerHTML=index+"::"+text;//$(this.nextSibling).text()
        newElementA.id="A"+index;

        $("#p1").append(newElementA);
        $( "#A"+index ).on("click",{value:$(this).val()},checkEgin);
        $('#buttonRight').hide();

        });
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

    $("#p1").append("<h2>Meses disponibles:</h2>");
    monthYear=$("#displayCalendar th").text().split(" ");
    monthName=monthYear[0];
    month=monthNum[monthName];
    year=monthYear[1];


    if ($('#encabezadoMeses a').length)
        {
        //alert(monthName);
        $('#encabezadoMeses a').each(function (index)
            {
            //aldatu ID ta gero onclick egin
            $(this).attr("id",$(this).text());
            monthName=$(this).text();
            month=monthNum[monthName];
            var newElementA = document.createElement('div');
            newElementA.className="calendarMonth";
            newElementA.id="month"+$(this).text();
            newElementA.innerText=$(this).text();
            $("#p1").append(newElementA);
            $("#month"+$(this).text()).on("click",{year:year,month:month,monthName:monthName},createDays);
            });
        }
    else
        {//alert("k"+monthName);
        var newElementA = document.createElement('div');
        newElementA.className="calendarMonth";
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
    $("#buttonRight").hide();
    }

function createDays(event)
    {
    //alert(event.data.year+event.data.month+event.data.monthName);
    if ($('#encabezadoMeses a').length)
        document.getElementById(event.data.monthName).click();

    $("#p2").empty();
    $("#p2").append("<h2>Días disponibles de "+event.data.monthName+":</h2>");
    $('#displayCalendar a').each(function (index)
        {
        var newElementA = document.createElement('div');
        newElementA.className="calendarDay";
        newElementA.id="dayId"+index;

        newElementA.innerText=$(this).text();
        $("#p2").append(newElementA);
        $("#dayId"+index).on("click",{year:event.data.year,month:event.data.month,monthName:event.data.monthName,day:$(this).text()},createHours);

        });
    }


function createHours(event)
    {
    $("#p3").empty();
    $("#p3").append("<h2>Horas disponibles del "+event.data.day+" de "+event.data.monthName+":</h2>");
    $('#h'+event.data.year+'-'+event.data.month+'-'+event.data.day+' a').each(function (index)
        {
        if (($(this).text()).indexOf(":")>-1)
            {
            $(this).attr("id","day"+event.data.day+"month"+event.data.month+index);
            var newElementA = document.createElement('div');
            newElementA.className = "calendarHour";
            newElementA.id = "day"+index;
            newElementA.innerText = $(this).text().substr($(this).text().length - 5); ;
            //alert($(this).text());
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
   //hilak
    $("#p1").empty();
    $("#p1").append("<h2>hilak disponibles :</h2>");
    $('div[class="listaSin"]:nth-of-type(1) a,div[class="listaSin"]:nth-of-type(1) span[class="gris"]').each(function (index)
        {
        //alert($(this).text())
            //$(this).attr("id","day"+event.data.day+"month"+event.data.month+index);
            var newElementA = document.createElement('div');
            newElementA.className = "calendarDay";
            //newElementA.id = "month"+index;
            newElementA.innerText = $(this).text();//.substr($(this).text().length - 5); ;
            //alert($(this).text());
            $("#p1").append(newElementA);
            //$("#day"+index).on("click",{day:event.data.day,month:event.data.month,index:index},selHour);

        });
   //Egunak
    $("#p2").empty();
    $("#p2").append("<h2>dias disponibles :</h2>");
    $('div[class="vacio"] a, div[class="vacio"] span[class="gris"]').each(function (index)
        {
        //alert("DAY: "+$(this).text())
            //$(this).attr("id","day"+event.data.day+"month"+event.data.month+index);
            var newElementA = document.createElement('div');
            newElementA.className = "calendarDay";
            //newElementA.id = "month"+index;
            newElementA.innerText = $(this).text();//.substr($(this).text().length - 5); ;
            //alert($(this).text());
            $("#p2").append(newElementA);
            //$("#day"+index).on("click",{day:event.data.day,month:event.data.month,index:index},selHour);

        });
    //orduk
    $("#p3").empty();
    $("#p3").append("<h2>Horas disponibles del ****** de ******:</h2>");
    $('div[class="hora"] a').each(function (index)
        {
        //alert($(this).text())
            //$(this).attr("id","day"+event.data.day+"month"+event.data.month+index);
            var newElementA = document.createElement('div');
            newElementA.className = "calendarHour";
            //newElementA.id = "day"+index;
            newElementA.innerText = $(this).text();//.substr($(this).text().length - 5); ;
            //alert($(this).text());
            $("#p3").append(newElementA);
            //$("#day"+index).on("click",{day:event.data.day,month:event.data.month,index:index},selHour);

        });
    }

function clearString(text)
    {
    var text = text.toLowerCase();
    text = text.replace(/[!]/, "");
    text = text.replace( " ", "");
    text = text.replace(/[#]/, "");
    text = text.replace(/[$]/, "");
    text = text.replace(/[%]/, "");
    text = text.replace(/[&]/, "");
    text = text.replace(/[/]/, "");
    text = text.replace(/[(]/g, "");
    text = text.replace(/[)]/g, "");
    text = text.replace(/[;]/g, "");
    text = text.replace(/[:]/g, "");
    text = text.replace(/[<]/, "");
    text = text.replace(/[>]/, "");
    text = text.replace(/[']/, "");
    text = text.replace(/['"]+/g, "");
    text = text.replace(/”/g, '');
    text = text.replace(/“/g, '')
    return text;
    }

// End
