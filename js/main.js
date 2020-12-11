//// //// //// //// //// //// * HEADER * \\\\ \\\\ \\\\ \\\\ \\\\ \\\\
              // transiciones y animaciones - media queries \\

const mediaQueryMobile = window.matchMedia('(max-width: 767px)')
const mediaQueryMobileSmall = window.matchMedia('(max-width: 320px)')
var click = new Audio("sounds/mouse-click.mp3")

$(".banner__button").hide()
$(".cotizacion").hide()
setTimeout(function () {
  $(".banner__button").fadeIn(1000)
}, 100);

if (mediaQueryMobileSmall.matches) {
  $(".banner__titulo").css("font-size", "36px")
}

$(".banner__button").click(function () {
  click.play()
  setTimeout(function () {
    $(".header__banner").fadeOut(500)
    $(".banner__button").fadeOut(500)
    $(".header__banner").fadeIn(1600)
  }, 200);
  setTimeout(function () {
    $("header").addClass("animacion")
    if (mediaQueryMobileSmall.matches) {
      $(".header__banner").css("min-height", "auto")
      $(".banner__titulo").css("font-size", "31px")
      $(".banner__descripcion").css({"font-size": "20px", "margin-top": "0px"})
    } else if (mediaQueryMobile.matches) {
      $(".header__banner").css({"height": "unset", "margin": "auto"})
    } 
    $(".cotizacion").slideDown(3000)
  }, 500);
})

//// //// //// //// //// //// * ESTRUCTURA BÁSICA INICIAL DEL DOM * \\\\ \\\\ \\\\ \\\\ \\\\ \\\\

var $divRubros = $("#div-rubros");
var $divObra = $("#div-tipo");
var $divServicios = $("#servicios").addClass("input-select").hide();
var $divUbicacion = $("#div-ubicacion");
var $rubros = $("#rubros");
$("#mensaje").hide()
  
function selectRubros () {
  var $opcionDefault = $("<option></option>").text("Seleccione una de las siguientes opciones").attr("value", "").hide();
  $rubros.prepend($opcionDefault);
  $rubros.option = rubrosArray.sort().forEach(function (rubro) {
    let $item = $("<option></option>").text(rubro.nombre);
    $rubros.append($item);
  });
}
selectRubros();

$("#rubros").select2({
  placeholder: "Seleccione un rubro",
  width: "75%"
}).on('select2:open', function(e) {
  $('.select2-dropdown').hide();
  setTimeout(function() {
    $('.select2-dropdown').slideDown("slow");
  }, 0);
}).on('select2:closing', function(e) {
  e.preventDefault();
  setTimeout(function(e) {
    $('.select2-dropdown').slideUp("slow", function() {
      $("#rubros").select2('destroy').select2({
        placeholder: "Seleccione un rubro",
        width: "75%",
      });
    });
  }, 0);
  if(mediaQueryMobile.matches) {
    $("#rubros").select2({
      width: "100%"
    })
  }
})

function radioButton () {
  $("#nuevo").attr("disabled", true);
  $("#reparacion").attr("disabled", true);
}
radioButton();

if(mediaQueryMobile.matches) {
  $("#div-rubros").css("flex-direction", "column")
  $(".input-select label").css({"width": "100%", "text-align": "center", "padding-bottom": "10px"})
  $("#rubros").select2({
    placeholder: "Seleccione un rubro",
    width: "100%"
  })
  $("select[name='servicios']").select2({
    width: "100%"
  })
  $("#div-tipo label").css("margin-left", "0px")
  $("#div-tipo .radio").css("margin-left", "15px")
} 
  
//// //// //// //// //// //// * SELECT { RUBROS } * \\\\ \\\\ \\\\ \\\\ \\\\ \\\\
  // 1° select que toma las opciones de rubrosArray(i).nombre [servicios.js]. \\
// Cada opción esta vinculada con el input radio {Tipo obra} mediante las prop. \\ 
        // "obraNueva" y "reparacion" del mismo objeto como criterio. \\

$rubros.on("select2:select select2:unselecting", function () {
  $("#servicios").empty() + $('input[name="nuevoReparacion"]').prop("checked", false) + $divServicios.slideUp();
  var $rubroSeleccionado = $rubros.val();
  rubrosArray.forEach(function (rubro) {
    if($rubroSeleccionado == rubro.nombre) {
      $("#nuevo").prop("disabled", false);
      $("#reparacion").prop("disabled", false);
      if(rubro.reparacion == false) {
        $("#nuevo").prop("checked", true);
        $("#reparacion").prop("disabled", true);
        $radioCheck.valid()
        var $servicios = $("<select></select>").attr("name", "servicios").appendTo($divServicios);
        var $serviciosLabel = $("<label></label>").text("¿Que servicio desearía realizar?").css("font-weight", "550");
        $($divServicios).prepend($serviciosLabel);
        $servicios.options = rubro.servicios.sort().forEach(function (servicio) {
          let $item = $("<option></option>").text(servicio);
          $servicios.append($item);
          $divServicios.slideDown(800);
          $("select[name='servicios']").select2({
            placeholder: "Seleccione un servicio",
            width: "75%"
          }).on('select2:open', function(e) {
            $('.select2-dropdown').hide();
            setTimeout(function() {
              $('.select2-dropdown').slideDown("slow");
            }, 0);
          }).on('select2:closing', function(e) {
            e.preventDefault();
            setTimeout(function(e) {
              $('.select2-dropdown').slideUp("slow", function() {
                $("select[name='servicios']").select2('destroy').select2({
                  placeholder: "Seleccione un servicio",
                  width: "75%",
                });
              });
            }, 0);
          })
          if(rubro.servicios.length > 1) {
            var $elegir = $("<option></option>").text("Elija uno de los siguientes servicios").attr("value", "").prop({"selected": "true", "hidden": "true"});
            $servicios.prepend($elegir);
            $servicios.change(function () {
              $("select[name='servicios']").valid()
            })
          } 
        })
      } else {
        $("#nuevo").attr("checked", false);
        $("#reparacion").attr("disabled", false);
      }
    }
  })
})

//// //// //// //// * RADIO INPUT - {OBRA NUEVA / REPARACIÓN} + SELECT {SERVICIOS} * \\\\ \\\\ \\\\ \\\\ 
          // 2° select que se crea de acuerdo a las eleciones anteriores: rubro, tipo de obra.\\
            // Cada opción se arma a partir de la propiedad servicios del objeto rubrosArray\\ 

$radioCheck = $('input[name="nuevoReparacion"]');
  
$radioCheck.change(function () {
  var $rubroSeleccionado = $rubros.val();
  $($divServicios).empty();
  rubrosArray.forEach(function (rubro) {
    if($rubroSeleccionado == rubro.nombre) {
      if(rubro.reparacion == true && $('#nuevo').is(':checked') && rubro.servicios !== false) {
        var $servicios = $("<select></select>").attr("name", "servicios").appendTo($divServicios);
        var $serviciosLabel = $("<label></label>").text("¿Que servicio desearía realizar?").css("font-weight", "550");
        $($divServicios).prepend($serviciosLabel)
        $servicios.options = rubro.servicios[0].sort().forEach(function (servicio) {
          let $item = $("<option></option>").text(servicio);
          $servicios.append($item);
            $divServicios.slideDown(800);
          $("select[name='servicios']").select2({
            placeholder: "Seleccione un servicio",
            width: "75%"
          }).on('select2:open', function(e) {
            $('.select2-dropdown').hide();
            setTimeout(function() {
              $('.select2-dropdown').slideDown("slow");
            }, 0);
          }).on('select2:closing', function(e) {
            e.preventDefault();
            setTimeout(function(e) {
              $('.select2-dropdown').slideUp("slow", function() {
                $("select[name='servicios']").select2('destroy').select2({
                  placeholder: "Seleccione un servicio",
                  width: "75%",
                });
              });
            }, 0);
          })
          if(rubro.servicios[0].length > 1) {
            var $elegir = $("<option></option>").text("Elija uno de los siguientes servicios").attr("value", "").prop({"selected": "true", "hidden": "true"});
            $servicios.prepend($elegir);
            $servicios.change(function () {
              $("select[name='servicios']").valid()
            })
          }
        })
      } else if(rubro.reparacion == true && $("#reparacion").is(":checked") && rubro.servicios !== false) {
        var $servicios = $("<select></select>").attr("name", "servicios").appendTo($divServicios);
        var $serviciosLabel = $("<label></label>").text("¿Que servicio desearía realizar?").css("font-weight", "550");
        $($divServicios).prepend($serviciosLabel)
        $servicios.options = rubro.servicios[1].sort().forEach(function (servicio) {
          let $item = $("<option></option>").text(servicio);
          $servicios.append($item);
          $divServicios.slideDown(800);
          $("select[name='servicios']").select2({
            placeholder: "Seleccione un servicio",
            width: "75%"
          }).on('select2:open', function(e) {
            $('.select2-dropdown').hide();
            setTimeout(function() {
              $('.select2-dropdown').slideDown("slow");
            }, 0);
          }).on('select2:closing', function(e) {
            e.preventDefault();
            setTimeout(function(e) {
              $('.select2-dropdown').slideUp("slow", function() {
                $("select[name='servicios']").select2('destroy').select2({
                  placeholder: "Seleccione un servicio",
                  width: "75%",
                });
              });
            }, 0);
          });
          if(rubro.servicios[1].length > 1) {
            var $elegir = $("<option></option>").text("Elija uno de los siguientes servicios").attr("value", "").prop({"selected": "true", "hidden": "true"});
            $servicios.prepend($elegir);
            $servicios.change(function () {
              $("select[name='servicios']").valid()
            })
          }
        })
      }
    }     
  })
})

//// //// //// //// * SELECTS DE UBICACIÓN - {PROVINCIA / DEPARTAMENTO / LOCALIDAD} * \\\\ \\\\ \\\\ \\\\
            // Serie de 3 select que se van creando de forma consecutiva a partir de una API \\
            
function selectProvincias () {
  $("#ubicacionDepto").hide() + $("#ubicacionLoc").hide()
  //$("#departamentos").hide() + $("#localidades").hide() -> No ocultar, sino no aparecen las alertas
  $.ajax ({
    type: "GET",
    url: "https://apis.datos.gob.ar/georef/api/provincias?orden=nombre",
    dataType: "json",
    success: function (response) {
      $("#provincias").option = response.provincias.sort().forEach(function (index) {
        $("#provincias").append($(`<option>${index.nombre}</option>`))
      })
    }
  });
}
selectProvincias()

$("#ubicacionProv").css("width", "100%")
$("#provincias").select2({
  placeholder: "Seleccione una provincia",
  width: "100%"
}).on('select2:open', function(e) {
  $('.select2-dropdown').hide();
  setTimeout(function() {
    $('.select2-dropdown').slideDown("slow");
  }, 0);
})

$("#provincias").on("select2:select select2:unselecting", function () {
  $("#departamentos").empty() + $("#localidades").empty()
  $("#localidades").select2().next().hide()
    $.ajax ({
    type: "GET",
    url: "https://apis.datos.gob.ar/georef/api/departamentos?orden=nombre&max=529",
    dataType: "json",
    beforeSend: function () {
      $("#departamentos").select2({
        placeholder: "Procesando",
        width: "50%",
        templateSelection: function (option) {
          if (option.id.length == 0 ) {
            return option.text + " " + "<img style='width: 15px' src='./css/jquery-validation-images/loading.gif'/>"
          } else {
            return option.text;
          }
        },
        escapeMarkup: function (m) {
          return m;
        }
      })
    },
    success: function (response) {
      var $opcionDefault = $(`<option>Seleccione un departamento</option>`).attr("value", "").prop({"selected": "true", "hidden": "true"}).css({"text-align-last": "center"})
      $("#departamentos").prepend($opcionDefault)
      $("#departamentos").option = response.departamentos.sort().forEach(function (index) {
        var $provSeleccionada = $("#provincias").val();
        if($provSeleccionada == index.provincia.nombre) {
          $("#departamentos").append($(`<option>${index.nombre}</option>`))
        }
      })
    }
  });
  $("#ubicacionProv").css("width", "50%")
  $("#ubicacionDepto").css("width", "50%").fadeIn(500)
  $("#departamentos").select2({
    placeholder: "Seleccione un departamento",
    width: "100%"
  }).on('select2:open', function(e) {
    $('.select2-dropdown').hide();
    setTimeout(function() {
      $('.select2-dropdown').slideDown("slow");
    }, 0);
  })
  if(mediaQueryMobile.matches) {
    $("#ubicacionProv").css("width", "100%")
    $("#ubicacionDepto").css("width", "100%")
  }
})

$("#departamentos").on("select2:select select2:unselecting", function () {
  $("#localidades").empty()
  $.ajax ({
    type: "GET",
    url: "https://apis.datos.gob.ar/georef/api/localidades?aplanar=true&campos=estandar&max=4142&exacto=true",
    dataType: "json",
    beforeSend: function () {
      var $opcionDefault = $(`<option>Procesando</option>`).attr({"value": "", "id": "default"}).prop({"selected": "true", "hidden": "true"}).css({"textAlignLast": "center"})
      $("#localidades").prepend($opcionDefault)
      $("#localidades").select2({
        placeholder: "Procesando",
        width: "100%",
        templateSelection: function (option) {
          if (option.id.length == 0 ) {
            return option.text + " " + "<img style='width: 15px' src='./css/jquery-validation-images/loading.gif'/>"
          } else {
              return option.text;
          }
        },
        escapeMarkup: function (m) {
          return m;
        }
      })
    },
    success: function (response) {
      $("#localidades").select2({
        placeholder: "Seleccione una localidad",
        width: "100%"
      }).on('select2:open', function(e) {
        $('.select2-dropdown').hide();
        setTimeout(function() {
          $('.select2-dropdown').slideDown("slow");
        }, 0);
      }).on('select2:closing', function(e) {
        e.preventDefault();
        setTimeout(function(e) {
          $('.select2-dropdown').slideUp("slow", function() {
            $("#localidades").select2('destroy').select2({
              placeholder: "Seleccione una localidad",
              width: "100%"
          });
        }, 0);
      });
    })
      $("#localidades").option = response.localidades.sort().forEach(function (index) {
        var $provSeleccionada = $("#provincias").val();
        var $deptoSeleccionado = $("#departamentos").val();
        if($provSeleccionada == index.provincia_nombre && $deptoSeleccionado == index.departamento_nombre) {
          var nombre = index.nombre.toLowerCase().replace(/(?:(?<![\wñ])(?=[\wñ])|(?<=[\wñ])(?![\wñ]))[a-z]/g, c => c.toUpperCase())
          $("#localidades").append($(`<option>${nombre}</option>`))
        }
      }) 
    }
  });
  $("#ubicacionProv").css("width", "33.3%")
  $("#ubicacionDepto").css("width", "33.3%")
  $("#ubicacionLoc").css("width", "33.3%").fadeIn(500)

  if(mediaQueryMobile.matches) {
    $("#ubicacionProv").css("width", "100%")
    $("#ubicacionDepto").css("width", "100%")
    $("#ubicacionLoc").css("width", "100%")
  }
})

//// //// //// //// //// //// * SESSION STORAGE * \\\\ \\\\ \\\\ \\\\ \\\\ \\\\
// Constructor pensado para almacenar las valores ingresados por el usuario \\
// durante la sesión, pensando en el tiempo requierido para completar el formulario \\

function sessionUsuario () {
  this.nombre = function () {
    var $nombre = $("#nombreCompleto").val().trim();
    sessionStorage.setItem("NombreUsuario", $nombre);
  }
  this.telefono = function () {
    var $telefono = $("#telefono").val().trim();
    sessionStorage.setItem("Telefono", $telefono);
  }
  this.email = function () { 
    var $email = $("#email").val().trim();
    sessionStorage.setItem("Email", $email);
  }
  this.rubroConsulta = function () {
    var $rubroSeleccionado = $rubros.val();
    sessionStorage.setItem("Rubro", $rubroSeleccionado);
  }
  this.tipoObra = function () {
    var tipoSeleccionado = document.querySelector('input[name="nuevoReparacion"]:checked').value;
    sessionStorage.setItem("TipoObra", tipoSeleccionado);
  }
  this.servicioConsulta = function () {
    var $servicioSeleccionado = $("#servicios select").val()
    sessionStorage.setItem("Servicio", $servicioSeleccionado);
  }
  this.ubicacionObra = function () {
    var $ubicacion = `${$("#provincias").val()} - ${$("#departamentos").val()} - ${$("#localidades").val()}`
    sessionStorage.setItem("Ubicacion", $ubicacion);
  }
  this.metrosObra = function () {
    var $dimension = $("#dimension").val();
    sessionStorage.setItem("Dimensión", $dimension);
  }
  this.comentario = function () {
    var $comentario = $("#comentario").val();
    sessionStorage.setItem("Comentario", $comentario);
  }
  this.ejecutar = function() {
    this.nombre()
    this.telefono()
    this.email()
    this.rubroConsulta()
    this.tipoObra()
    this.servicioConsulta()
    this.ubicacionObra()
    this.metrosObra()
    this.comentario()
  }
}  

//// //// //// //// //// //// *  VALIDACIÓN FORMULARIO * \\\\ \\\\ \\\\ \\\\ \\\\ \\\\
// Hecho con el plugin JQuery Validation: creación manual de métodos de validación \\
// con Regex, utilización de métodos preconfigurados (tanto para input text como selects), \\
// especificar el contenido de los mensaje de error y su ubicación dentro DOM, \\
// manejo del carga del formulario (submitHandler) \\

function validacion () {
  form1 = null;
  jQuery.validator.addMethod("lettersandspaces", function(value, element) {
    return this.optional(element) || /^[a-zA-z]+ (.+\s+.*)|(.*\s+.+)$/i.test(value);
  }, "Por favor, ingrese su nombre completo");
  jQuery.validator.addMethod("nonumbers", function(value, element) {
    return this.optional(element) || /^([^0-9]*)$/.test(value);
  }, "Por favor, ingrese un nombre válido");
  
  $("form[name='myForm']").validate({
    rules: {
      nombreCompleto: {
        required: true,
        lettersandspaces: true,
        nonumbers: true,
        minlength: 6
      },
      telefono: {
        required: true,
        number: true,
        minlength: 8,
        maxlength: 10
      },
      email: {
        required: true,
        email: true
      },
      rubros: {
        required: {
          depends: function(element) {
            return $("#rubros").val() == "";
          }
        }
      },
      nuevoReparacion: {
        required: true
      },
      servicios: {
        required: {
          depends: function(element) {
            return $("select[name='servicios']").val() == "";
          }
        }
      },
      ubicacionProv: {
        required: {
          depends: function(element) {
            return $("select[name='ubicacionProv']").val() == "";
          }
        }
      },
      ubicacionDepto: {
        required: {
          depends: function(element) {
            return $("select[name='ubicacionDepto']").val() == "";
          }
        }
      },
      ubicacionLoc: {
        required: {
          depends: function(element) {
            return $("select[name='ubicacionLoc']").val() == "";
          }
        }
      },
      dimension: {
        digits: true
      },
      comentario: {
        required: {
          depends: function(element) {
            return $("#rubros").val() == "Otros"
          }
        }
      }
    },
    messages: {
      nombreCompleto: {
        required: "Por favor, ingrese su nombre completo",
        minlength: "Por favor, ingrese su nombre completo", 
      },
      telefono: {
        required: "Por favor, ingrese un número de contacto",
        number: "Ingrese un número de teléfono",
        minlength: "Ingrese un número válido para Argentina",
        maxlength: "Ingrese un número válido para Argentina"
      },
      email: {
        required: "Por favor, ingrese su dirección de correo electrónico",
        email: "Por favor, ingrese una dirección de correo electrónico válida"
      },
      rubros: {
        required: "Por favor, seleccione un rubro"
      },
      nuevoReparacion: {
        required: "Por favor, seleccione una opción"
      },
      servicios: {
        required: "Por favor, seleccione una opción"
      },
      ubicacionProv: {
        required: "Por favor, seleccione una provincia",
      },
      ubicacionDepto: {
        required: "Por favor, seleccione un departamento",
      },
      ubicacionLoc: {
        required: "Por favor, seleccione una localidad",
      },
      dimension: {
        digits: "Ingrese un valor númerico"
      },
      comentario: {
        required: "Por favor, ingresé más información sobre su consulta."
      }
    },
    errorPlacement: function(error, element) {
      if(element.is(":radio")) {
        if (mediaQueryMobile.matches) {
          error.css({"margin": "0px auto", "marginTop": "10px"})
        }
        $divObra.append(error);
      } else if (element.is("#div-rubros .error")){
        $divRubros.append(error)
        error.css({"marginTop": "10px", "width": "100%"})
      } else if (element.is("#servicios .error")){
        $("#servicios").append(error)
        error.css({"marginTop": "10px", "width": "100%"})
      } else if (element.is("#div-ubicacion .error")){
        error.css({"marginTop": "10px", "width": "100%"})
        $divUbicacion.append(error)
      } else if (element.is("#div-comentario .error")){
        $("#div-comentario").css("marginBottom", "10px")
        $("textarea").css("marginBottom", "0px")
        $("#div-comentario").append(error)
      }
      else { // default 
        error.insertAfter( element );
      }
    },
    submitHandler: function (form) {
      click.play()
      form1 = form;
      const formFullData = {
        nombre: form1.elements.nombreCompleto.value,
        telefono: form1.elements.telefono.value,
        email: form1.elements.email.value,
        rubro: form1.elements.rubros.value,
        tipoObra: form1.elements.nuevoReparacion.value,
        servicio: form1.elements.servicios.value,
        ubicacionProv: form1.elements.ubicacionProv.value,
        ubicacionDepto: form1.elements.ubicacionDepto.value,
        ubicacionLoc: form1.elements.ubicacionLoc.value,
        dimension: form1.elements.dimension.value,
        comentario: form1.elements.comentario.value
      };
      var newUser = new sessionUsuario();
      newUser.ejecutar(); // remite al método del constructor sessionUsuario()
      console.log(formFullData);
      $(".cotizacion__titulo").fadeOut("slow", function () {
        var $titulo = $(`<span>Formulario enviado&nbsp<img class="animate__animated animate__wobble" src="./images/greentick.png"/></span>`).attr("font-weight", "900").addClass("mensaje__titulo");
        $("#mensaje").prepend($titulo);
        $("form[name='myForm']").fadeOut("slow", function () {
          $("#mensaje").fadeIn(100);
          var $mensaje = $(`<p>Gracias <strong>${formFullData.nombre}</strong> por contactarte con nosotros. Se envió un email de confirmación a la siguiente casilla de correo: <strong>${formFullData.email}</strong>.</p>`);
          $mensaje.css("font-size", "18px");
          $("#mensaje").append($mensaje);
        });
      });
    }
  })
}
validacion();

//// //// //// //// *  SOBREESCRIBIR EL ONFOCUS DE LA VALIDACIÓN POR .CHANGE - SELECTS  * \\\\ \\\\ \\\\ \\\\

function validacionSelects () {
  $rubros.change(function () {
    $rubros.valid()
  })
  $("#provincias").change(function () {
    $("#provincias").valid()
  })
  $("#departamentos").change(function () {
    $("#departamentos").valid()
  })
  $("#localidades").change(function () {
    $("#localidades").valid()
  })
}
validacionSelects()
  