$(document).ready(function () {
  // Header

  const mediaQueryMobile = window.matchMedia('(max-width: 767px)')

  var click = new Audio("sounds/mouse-click.mp3")
  $(".banner__button").hide()
  $(".cotizacion").hide()
  setTimeout(function () {
    $(".banner__button").fadeIn(1000)
  }, 100);
  $(".banner__button").click(function () {
    click.play()
    setTimeout(function () {
      $(".banner__button").fadeOut(500)
    }, 200);
    setTimeout(function () {
      $("header").addClass("animacion")
      if (mediaQueryMobile.matches) {
        $(".header__banner").css({"height": "unset", "margin": "3% auto"})
      }
  
      $(".cotizacion").slideDown(3000)
    }, 500);
  })

  // Estructura básica inicial DOM
  var $divRubros = $("#div-rubros");
  var $divObra = $("#div-tipo");
  var $divServicios = $("#servicios").addClass("input-select").hide();
  var $divUbicacion = $("#div-ubicacion");
  $("#mensaje").hide()
  var $rubros = $("#rubros");
    
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
  })

  function radioButton () {
    $("#nuevo").attr("disabled", true);
    $("#reparacion").attr("disabled", true);
  }
  radioButton();
    
  //Select {Rubros}

  $rubros.on("select2:select select2:unselecting", function () {
    var $refresh = $("#servicios").empty() + $('input[name="nuevoReparacion"]').prop("checked", false) + $divServicios.slideUp();
    var $color = $rubros.css({"backgroundColor": "rgba(0, 127, 255, 0.8)", "color": "white", "border": "1px solid white", "borderRadius": "4px", "boxShadow": "0px 0px 3px rgba(0, 127, 255, 0.8)"})
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
            } //else {
              //$servicios.click(function () {
                //$servicios.css({"backgroundColor": "rgba(0, 127, 255, 0.8)", "color": "white", "border": "1px solid white", "borderRadius": "4px", "boxShadow": "0px 0px 3px rgba(0, 127, 255, 0.8)"})
                //})
          })
        } else {
          $("#nuevo").attr("checked", false);
          $("#reparacion").attr("disabled", false);
        }
      }
    })
  })

  //Radio Input - {Obra nueva / Reparación}
    
  $radioCheck = $('input[name="nuevoReparacion"]');
    
  $radioCheck.change(function () {
    var $rubroSeleccionado = $rubros.val();
    var $refresh = $($divServicios).empty();
    rubrosArray.forEach(function (rubro) {
      if($rubroSeleccionado == rubro.nombre) {
        if(rubro.reparacion == true && $('#nuevo').is(':checked') && rubro.servicios !== false) {
          //$divServicios.show();
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
                $servicios.css({"backgroundColor": "rgba(0, 127, 255, 0.8)", "color": "white", "border": "1px solid white", "borderRadius": "4px", "boxShadow": "0px 0px 3px rgba(0, 127, 255, 0.8)"})
              })
            } else {
            //$servicios.click(function () {
              $servicios.css({"backgroundColor": "rgba(0, 127, 255, 0.8)", "color": "white", "border": "1px solid white", "borderRadius": "4px", "boxShadow": "0px 0px 3px rgba(0, 127, 255, 0.8)"})
            //})
            }
          })
        } else if(rubro.reparacion == true && $("#reparacion").is(":checked") && rubro.servicios !== false) {
          //$divServicios.show();
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
                $servicios.css({"backgroundColor": "rgba(0, 127, 255, 0.8)", "color": "white", "border": "1px solid white", "borderRadius": "4px", "boxShadow": "0px 0px 3px rgba(0, 127, 255, 0.8)"})
              })
            } else {
              //$servicios.click(function () {
                $servicios.css({"backgroundColor": "rgba(0, 127, 255, 0.8)", "color": "white", "border": "1px solid white", "borderRadius": "4px", "boxShadow": "0px 0px 3px rgba(0, 127, 255, 0.8)"})
              //})
            }
          })
        } else if (rubro.servicios == false) {
          //textarea se convierte en obligatorio
        }
      }     
    }) 
  }) 

  //Selects de Ubicación - {Provincia / Departamento / Localidad}

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
      }
      ,
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

    if (mediaQueryMobile.matches) {
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

    if (mediaQueryMobile.matches) {
      $("#ubicacionProv").css("width", "100%")
      $("#ubicacionDepto").css("width", "100%")
      $("#ubicacionLoc").css("width", "100%")
    }
  })

  //SessionStorage

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
  
  // Validación formulario 
  
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
          required: "Por favor, elija un rubro"
        },
        nuevoReparacion: {
          required: "Por favor, elija una opción"
        },
        servicios: {
          required: "Por favor, elija una opción"
        },
        ubicacionProv: {
          required: "Por favor, elija una provincia",
        },
        ubicacionDepto: {
          required: "Por favor, elija un departamento",
        },
        ubicacionLoc: {
          required: "Por favor, elija una localidad",
        },
        dimension: {
          digits: "Ingrese un valor númerico"
        }
      },
      errorPlacement: function(error, element) {
        if(element.is(":radio")) {
          if (mediaQueryMobile.matches) {
            error.css({"marginTop": "10px", "width": "100%", "marginLeft": "65px"})
          }
          $divObra.append(error);
        } else if (element.is("#div-rubros .error")){
          $divRubros.append(error)
          error.css({"marginTop": "10px", "width": "100%"})
        } else if (element.is("#servicios .error")){
          $("#servicios").append(error)
        } else if (element.is("#div-ubicacion .error")){
          error.css({"marginTop": "10px", "width": "100%"})
          $divUbicacion.append(error)
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
        newUser.ejecutar();
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

  //Sobreescribir el onfocusout de la validación a un change para los selects

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

})