

window.addEventListener('unload', myScript);
//window.addEventListener('click', myScript1);

function myScript(){
  console.log('%c bye–bye... ' + sessionStorage.getItem("nombre"), 'background: red; color: black; display: block;');
}

$("div").click(function() {alert($(this).attr('id'));});