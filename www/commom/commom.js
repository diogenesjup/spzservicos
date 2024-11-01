           // GERENCIANET TOKEN
           $gn.ready(function(checkout) {
 
              var callback = function(error, response) {
                if(error) {
                  // Trata o erro ocorrido
                  console.error(error);
                } else {
                  // Trata a resposta
                  console.log(response);
                }
              }; 

           });


            // COMO FAZER A CHAMADA NO FORMULÁRIO onSubmit="return ajaxSubmit(this);"
            var ajaxSubmit = function(form) {
                // fetch where we want to submit the form to
                var url = $(form).attr('action');
                var flag = 9;

                var data = $(form).serializeArray();

                // setup the ajax request
                $.ajax({
                    url: url,
                    data: data,
                    dataType: 'json',
                    type:'POST'
                });

                swal("Obrigado!", 'Sua mensagem foi enviada com sucesso', "success");

                return false;
            }


            

          // SE O USUÁRIO FIZER UM GESTURE PARA A PARTE INFERIOR DA PÁGINA
          // VAMOS FECHAR A LAYER DO CARRO, CASO ELA ESTEJA ABERTA

          $("#swipeAviso").swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {

              if(direction=="down"){

                $(".modal-avisos .aviso").css("bottom","-300%");
                $(".modal-avisos").fadeOut(500);

              }

            }
          });
          
          $("#swipemeConfirmacao").swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {

              if(direction=="down"){

                $(".modal-confirmacao .confirmacao").css("bottom","-300%");
                $(".modal-confirmacao").fadeOut(500);

              }

            }
          });



            /* FUNÇÃO GERAL PARA EXIBIR OS AVISOS DO PÁGINA */
            function aviso(titulo,mensagem){

              console.log("%c COMEÇANDO FUNÇÃO PARA EXIBIR AVISO","background:#ff0000;color:#fff;");
              $(".modal-avisos").fadeIn(100);

              $(".modal-avisos .aviso").css("bottom","0");


              // ALIMENTAR O HTML
              $(".modal-avisos .aviso h3").html(titulo);
              $(".modal-avisos .aviso p").html(mensagem+'<p style="padding-top:12px;padding-left:0px;"><button type="button" onclick="fecharAviso();" class="btn btn-primary">Ok</button></p>');
              
              //setTimeout("fecharAviso()",12000);


            }
            function fecharAviso(){
              
              $(".modal-avisos .aviso").css("bottom","-300%");
              $(".modal-avisos").fadeOut(500);

            }

            /* FUNÇÃO GERAL PARA EXIBIR CONFIRMAÇÕES DE AÇÕES */
            function confirmacao(titulo,mensagem,funcaoConfirmacao,textoConfirmacao){

              console.log("%c COMEÇANDO FUNÇÃO PARA EXIBIR AVISO","background:#ff0000;color:#fff;");
              $(".modal-confirmacao").fadeIn(100);

              $(".modal-confirmacao .confirmacao").css("bottom","0");

              // ALIMENTAR O HTML
              $(".confirmacao h3").html(titulo);
              $(".confirmacao p").html(mensagem);

              $(".confirmacao #acaoConfirmacao").attr("onclick",funcaoConfirmacao+"; fecharConfirmacao();");
              if(textoConfirmacao!=""){
                $(".confirmacao #acaoConfirmacao").html(textoConfirmacao);
              }
              

            }
            function fecharConfirmacao(){

                 $(".modal-confirmacao .confirmacao").css("bottom","-300%");
                 $(".modal-confirmacao").fadeOut(500);

            }







// FORMULARIO FLUTUANTE onclick="ativarFormularioFlutuante('','')"
function ativarFormularioFlutuante(campoParaPreenchimento,labelPreenchimento){

   $(".input-flutuante-acessibilidade").fadeIn(500);
   //$(".barra-navegacao").hide(0);

   $("#fieldInputFlutuante").val($(campoParaPreenchimento).val());

   localStorage.setItem("campoParaPreenchimento",campoParaPreenchimento);

   $("#fieldInputFlutuante").focus();
   $('.input-flutuante-acessibilidade label').html(labelPreenchimento);

}

function validarFormularioFlutuante(event){

    event.preventDefault();

    var fieldInputFlutuante = $("#fieldInputFlutuante").val();
    
    $(".input-flutuante-acessibilidade").fadeOut(500);
    //$(".barra-navegacao").show(0);

    $(localStorage.getItem("campoParaPreenchimento")).val(fieldInputFlutuante);

}

// GARANTIR O FECHAMENTO DO CAMPO QUANDO A TELA VOLTAR AO NORMAL

$(document).ready(function() {
  var _originalSize = $(window).width() + $(window).height()
  $(window).resize(function() {
    if ($(window).width() + $(window).height() == _originalSize) {
      console.log("keyboard active "+_originalSize);
      $(".input-flutuante-acessibilidade").fadeOut(500);
      //$(".barra-navegacao").show(0);
    }
  });
});

// ABRIR URL`s EXTERNAS`
function abrirUrl(url){

  cordova.InAppBrowser.open(url, '_system', 'location=yes,hidden=no,hardwareback=no');

}




     // CODIGOS PARA UPLOAD DE ARQUIVOS LOCAIS
     function uploadLocal(){

         console.log("ENTRAMOS!");
         //var files = $(this)[0].files;
         
         /* Efetua o Upload */
         $('.fileForm').ajaxForm({
          dataType:  'json',
          success:   processJson 
        
         }).submit();

     }
     function processJson(dados) { 
            // 'data' is the json object returned from the server 
            console.log("%c RETORNO SOBRE O ENVIO DAS IMAGENS (UPLOAD):","background:#ff0000;color:#fff;");
            console.log(dados); 
            
            if(dados.erros===null){
            
                console.log("NENHUM ERRO!");

            }else{
              
              $(".retorno-upload").html('<div class="alert alert-danger">'+dados.erros+'</div>');              

            }

            $('.fileForm').resetForm();

        }
      // CODIGOS PARA UPLOAD DE ARQUIVOS LOCAIS



      // UPLOAD DE IMAGENS USANDO CAMERA ANDROID
      /* ######### FUNÇÕES USO DE CAMERA SELFIE #########  */
      var minhaImagem;
      var controleFotoEnviada = 1;
      var tipoArquivo = "nenhum";

      function initCameraSelfie(){ // CHAMAR ESSA FUNCAO PARA INICIALIZAR A CAMERA

               minhaImagem;
               controleFotoEnviada = 1;
               
               tipoArquivo = "camera";

               console.log("INICIANDO FUNÇÃO PARA INICIALIZAR A CAMERA SELFE");

              // SCRIPTS DA CAMERA                                 

                              controleFotoEnviada = 2;
                              console.log("CONTROLE FOTO ENVIADA ATUALIZADA");
                              
                              console.log("INICIALIZANDO A CAMERA");
                              $("#retornoMsgSelfie").html("inicializando a câmera para a selfie");
                              navigator.camera.getPicture(onSuccess2, onFail2, {
                                  quality: 50,
                                  destinationType: Camera.DestinationType.DATA_URL
                              });

                              function onSuccess2(imageData) {
                                  console.log("CAMERA INICIALIZADA COM SUCESSO");
                                  $("#retornoMsgSelfie").html("Imagem capturada com sucesso!");
                                  var image = document.getElementById('fotoDestinoSelfie');
                                  image.style.display = 'block';
                                  image.src = "data:image/jpeg;base64," + imageData;

                                  minhaImagem = imageData;

                                  //$(".perfil-banner .foto-perfil").css("background","url('data:image/jpeg;base64,"+imageData+"')");
                                  //$(".perfil-banner .foto-perfil").css("background-size","cover");
                                  //$(".perfil-banner .foto-perfil").css("background-position","center center");
                                  //localStorage.setItem("parametroFoto",1);

                                  $('.btn-action-foto').attr('onclick',"uploadMyImageSelfie()");

                              }

                              function onFail2(message) {
                                  console.log("CAMERA NÃO FUNCIONOU");
                                  $("#retornoMsgSelfie").html("Não possível obter a imagem da sua câmera, tente novamente. "+message);
                                  console.log('### MOTIVO FALHA DE ACESSO A CÂMERA: ' + message);
                              }                           

              document.addEventListener("deviceready", function () {  
              //alert("Phonegap");                                                                                        
              }, false); 

      }

      function uploadMyImageSelfie(){

                    console.log("INICIANDO FUNÇÃO PARA FAZER UPLOAD DA IMAGEM");
         
                                          if(controleFotoEnviada == 2){

                                                  $('.btn-action-foto').html("processando...");

                                                  var cadastroEmail = localStorage.getItem("idUsuario");
                                                  
                                                  $.ajax({
                                                    type: "POST",
                                                    url: app.urlApi+'upload-selfie-camera.php?idUsuario='+idUsuario,
                                                    data: { img_data:minhaImagem},
                                                    cache: false,
                                                    contentType: "application/x-www-form-urlencoded",
                                                    success: function (result) {
                                                      
                                                      $('#sendFileSelfie').html("ATUALIZAR IMAGEM");      
                                                      aviso("Foto de perfil atualizada com sucesso","Obrigado por manter o seu perfil atualizado!");
                                                      editarPerfil(); 

                                                      minhaImagem = "";
                                                      controleFotoEnviada = 1;
                                                      tipoArquivo = "nenhum";                                        

                                                    },
                                                    fail: function(result){
                                                      aviso("Oops! Algo deu errado, tente novamente",result);
                                                    }
                                                  });   

                                              }else{

                                                  aviso('Oops! Você não selecionou nenhuma imagem','Você não selecionou ou tirou nenhuma foto.');
                                                  $('.btn-action-foto').html("ATUALIZAR IMAGEM");

                                              }

}



function copiarCodigoPix(){

  // Cria um elemento textarea temporário
  var textArea = document.createElement("textarea");
            
  // Define o valor do textarea para o conteúdo do span
  textArea.value = document.querySelector('#codigoPix').value;
  
  // Adiciona o textarea ao DOM
  document.body.appendChild(textArea);
  
  // Seleciona o conteúdo do textarea
  textArea.select();
  
  // Copia o texto selecionado para a área de transferência
  document.execCommand('copy');
  
  // Remove o textarea do DOM
  document.body.removeChild(textArea);
  
  // (Opcional) Mostra uma mensagem para o usuário
  alert('Código copiado com sucesso!');

}



function previewImagemAnuncio(){

    // Correção: Use [0] para acessar o elemento DOM e obter o arquivo
    const file = jQuery("#foto_destaque")[0].files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result; // Mostrar preview
            jQuery("#previewAnuncio .capa-anuncio").css(`background`,`url('${e.target.result}') #f2f2f2 no-repeat`);
              jQuery("#previewAnuncio .capa-anuncio").css(`background-size`,`cover`);
              jQuery("#previewAnuncio .capa-anuncio").css(`background-position`,`center center`);
        }
        reader.readAsDataURL(file); // Converte a imagem para base64 para pré-visualização
    } else {
        preview.src = ''; // Caso não haja imagem
    }

    jQuery("#previewContainerId").html(`
      
      <p style="font-size:12px;text-align:center;">
        Preview da imagem que será a capa do seu anúncio
      </p>
  
  `);

    const previewContainer = document.getElementById("previewContainerId");
    const preview = document.createElement('img');
    preview.style.maxWidth = '200px';
    preview.style.marginTop = '10px';
    previewContainer.appendChild(preview);

    

}




// Função que faz a configuração e o envio do formulário
function enviarFormulario(formId, fileInputId, previewContainerId) {

  const form = document.getElementById(formId);
  const fileInput = document.getElementById(fileInputId);
  const previewContainer = document.getElementById(previewContainerId);
  const preview = document.createElement('img');
  preview.style.maxWidth = '200px';
  preview.style.marginTop = '10px';
  previewContainer.appendChild(preview);

  // Validação do input para aceitar apenas imagens
  fileInput.setAttribute('accept', 'image/*');

  // Exibir preview da imagem
  fileInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              preview.src = e.target.result; // Mostrar preview
              
          }
          reader.readAsDataURL(file); // Converte a imagem para base64 para pré-visualização
      } else {
          preview.src = ''; // Caso não haja imagem
      }
  });

  

  // Adiciona o clique ao botão de submit do formulário
  /*
  form.querySelector('button[type="submit"]').addEventListener('click', function (event) {
      event.preventDefault(); // Previne o envio padrão
      processarEnvio(); // Chama a função de envio do formulário via AJAX
  });
  */
  
}


// Função para limitar o texto ao máximo de 115 caracteres
function limitarTexto(textarea, maxChars) {
  if (textarea.value.length > maxChars) {
      textarea.value = textarea.value.substring(0, maxChars);
  }
  atualizarContador();
}
function atualizarContador() {
  const textarea = document.getElementById('descricao_anuncio');
  const contador = document.getElementById('contadorCaracteres');
  const maxChars = 115;

  // Atualiza o texto do contador
  contador.textContent = textarea.value.length + '/' + maxChars;
}



// Função para enviar o formulário via AJAX
// processarEnvio('formNewAnuncio', 'foto_destaque', 'previewContainerId')
function processarEnvio(formId, fileInputId, previewContainerId) {

  jQuery("#botaoEnviarViaAjax").html(`Processando... Aguarde...`);

  var titulo_anuncio          = jQuery("#titulo_anuncio").val();
  var breve_descricao_anuncio = jQuery("#descricao_anuncio").val();
  var celular_destino_anuncio = jQuery("#celular_destino_anuncio").val();

  if(titulo_anuncio==""||titulo_anuncio==null||breve_descricao_anuncio==""||breve_descricao_anuncio==null||celular_destino_anuncio==""||celular_destino_anuncio==null){

      jQuery("#botaoEnviarViaAjax").html(`Salvar anúncio`);
      aviso("Oops! Campos não preenchidos!","Todos os campos são obrigatórios! Verifique as informações inseridas e tente novamente.");
      return;

  }

  const form = document.getElementById(formId);
  const fileInput = document.getElementById(fileInputId);
  const previewContainer = document.getElementById(previewContainerId);

  const formData = new FormData(form);
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();

      // Converte a imagem em base64 para envio ao servidor
      reader.onloadend = function () {
          const base64Image = reader.result;

          formData.append('action', 'cadastrar_anuncio'); // Ação AJAX
          
          formData.append('id_usuario', localStorage.getItem("idUsuario")); // Dado AJAX
          formData.append('titulo_anuncio', titulo_anuncio); // Dado AJAX
          formData.append('breve_descricao_anuncio', breve_descricao_anuncio); // Dado AJAX
          formData.append('celular_destino_anuncio', celular_destino_anuncio); // Dado AJAX

          formData.append('foto_destaque_base64', base64Image);

          console.log("Temos um preview");
          console.log(base64Image);

          // Aqui começa o envio via AJAX
          const xhr = new XMLHttpRequest();
          xhr.open('POST', app.urlApiAjax + 'admin-ajax.php', true);
          xhr.onload = function () {
              if (xhr.status === 200) {
                
                  aviso("Seu anúncio foi enviado!","O cadastro do seu anúncio foi um sucesso, <strong>mas lembre-se de ativá-lo</strong> para que os clientes possam visualizá-lo");
                  console.log('Formulário enviado com sucesso');
                  console.log(xhr.responseText); // Resposta do servidor
                  
                  // DIRECIONAR O USUÁRIO PARA VER TODOS OS ANÚNCIOS CADASTRADOS
                  app.verTodosAnuncios();

              } else {
                  console.error('Erro ao enviar o formulário');
                  jQuery("#botaoEnviarViaAjax").html(`Salvar anúncio`);
                  aviso("Oops! Algo deu errado...","Não conseguimos processar a sua solicitação no momento, tente novamente em alguns minutos.");
              }
          };

          xhr.send(formData); // Envia o formulário com a imagem em base64
      };

      reader.readAsDataURL(file); // Converte a imagem em base64
  } else {
      aviso("Oops! Algo deu errado...","Você precisa selecionar pelo menos uma imagem antes de salvar o seu anúncio.");
      jQuery("#botaoEnviarViaAjax").html(`Salvar anúncio`);
  }
}



function processarEnvioEdicao(formId, fileInputId, previewContainerId,idAnuncio) {

  jQuery("#botaoEnviarViaAjax").html(`Processando... Aguarde...`);

  var titulo_anuncio          = jQuery("#titulo_anuncio").val();
  var breve_descricao_anuncio = jQuery("#descricao_anuncio").val();
  var celular_destino_anuncio = jQuery("#celular_destino_anuncio").val();

  if(titulo_anuncio==""||titulo_anuncio==null||breve_descricao_anuncio==""||breve_descricao_anuncio==null||celular_destino_anuncio==""||celular_destino_anuncio==null){

      jQuery("#botaoEnviarViaAjax").html(`Atualizar anúncio`);
      aviso("Oops! Campos não preenchidos!","Todos os campos são obrigatórios! Verifique as informações inseridas e tente novamente.");
      return;

  }

  const form = document.getElementById(formId);
  const fileInput = document.getElementById(fileInputId);
  const previewContainer = document.getElementById(previewContainerId);

  const formData = new FormData(form);
  const file = fileInput.files[0];

  if (file) {
      const reader = new FileReader();

      // Converte a imagem em base64 para envio ao servidor
      reader.onloadend = function () {
          const base64Image = reader.result;

          formData.append('action', 'editar_anuncio'); // Ação AJAX
          formData.append('id_anuncio', idAnuncio); // Dado AJAX
          formData.append('id_usuario', localStorage.getItem("idUsuario")); // Dado AJAX
          formData.append('titulo_anuncio', titulo_anuncio); // Dado AJAX
          formData.append('breve_descricao_anuncio', breve_descricao_anuncio); // Dado AJAX
          formData.append('celular_destino_anuncio', celular_destino_anuncio); // Dado AJAX

          formData.append('foto_destaque_base64', base64Image);

          console.log("Temos um preview");
          console.log(base64Image);

          // Aqui começa o envio via AJAX
          const xhr = new XMLHttpRequest();
          xhr.open('POST', app.urlApiAjax + 'admin-ajax.php', true);
          xhr.onload = function () {
              if (xhr.status === 200) {
                
                  aviso("Seu anúncio foi atualizado!","Atualizamos o seu anúncio com sucesso, <strong>mas lembre-se de ativá-lo</strong> para que os clientes possam visualizá-lo");
                  console.log('Formulário enviado com sucesso');
                  console.log(xhr.responseText); // Resposta do servidor
                  
                  // DIRECIONAR O USUÁRIO PARA VER TODOS OS ANÚNCIOS CADASTRADOS
                  app.verTodosAnuncios();

              } else {
                  console.error('Erro ao enviar o formulário');
                  jQuery("#botaoEnviarViaAjax").html(`Salvar anúncio`);
                  aviso("Oops! Algo deu errado...","Não conseguimos processar a sua solicitação no momento, tente novamente em alguns minutos.");
              }
          };

          xhr.send(formData); // Envia o formulário com a imagem em base64
      };

      reader.readAsDataURL(file); // Converte a imagem em base64
  }else{

          formData.append('action', 'editar_anuncio'); // Ação AJAX
          formData.append('id_anuncio', idAnuncio); // Dado AJAX
          formData.append('id_usuario', localStorage.getItem("idUsuario")); // Dado AJAX
          formData.append('titulo_anuncio', titulo_anuncio); // Dado AJAX
          formData.append('breve_descricao_anuncio', breve_descricao_anuncio); // Dado AJAX
          formData.append('celular_destino_anuncio', celular_destino_anuncio); // Dado AJAX

          
          // Aqui começa o envio via AJAX
          const xhr = new XMLHttpRequest();
          xhr.open('POST', app.urlApiAjax + 'admin-ajax.php', true);
          xhr.onload = function () {
              if (xhr.status === 200) {
                
                  aviso("Seu anúncio foi atualizado!","Atualizamos o seu anúncio com sucesso, <strong>mas lembre-se de ativá-lo</strong> para que os clientes possam visualizá-lo");
                  console.log('Formulário enviado com sucesso');
                  console.log(xhr.responseText); // Resposta do servidor
                  
                  // DIRECIONAR O USUÁRIO PARA VER TODOS OS ANÚNCIOS CADASTRADOS
                  app.verTodosAnuncios();

              } else {
                  console.error('Erro ao enviar o formulário');
                  jQuery("#botaoEnviarViaAjax").html(`Salvar anúncio`);
                  aviso("Oops! Algo deu errado...","Não conseguimos processar a sua solicitação no momento, tente novamente em alguns minutos.");
              }
          };

          xhr.send(formData); // Envia o formulário com a imagem em base64

  }

}


function anuncios(posicao){

  var plano = posicao;
  var tem   = 0;

  var anuncios = JSON.parse(localStorage.getItem("anuncios"));

  var anuncios_ativos = anuncios.anuncios.filter(function(anuncio) {
      return anuncio.plano == posicao && anuncio.status_anuncio == "Ativado";
  });




  var html = ``;
  var faca = `

                     <!-- ANUNCIOS -->
                     <div class="area-anuncios" id="areaAnuncios">
                              <h1>Anúncios:</h1>

                              <!-- ANUNCIO -->
                              <div class="anuncio">
                                 <div class="row">
                                    <div class="col-8">
                                          <h3>AC Elétrica e manutenção</h3>
                                          <p>Aqui um pequeno texto de descrição sobre o anúnico</p>
                                          <a href="" title="WhatsApp">
                                             <img src="assets/images/4102606_applications_media_social_whatsapp_icon.svg" alt="WhatsApp"> WhatsApp
                                          </a>
                                    </div>
                                    <div class="col-4" style="padding:0">
                                       <div class="capa-anuncio" style="background:url('assets/images/3.jpg') #f2f2f2 no-repeat;background-size:cover;background-position:center center;">
                                          <a href="" title="Clique para ir para o WhatsApp">
                                             &nbsp;
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <!-- ANUNCIO -->

                     </div>
                     <!-- ANUNCIOS -->
  
  `;

  if(plano=="1"){

    anuncios_ativos.forEach(function(anuncio) {
      if(anuncio.plano=='1'){
        tem = 2;
      html = `

                     <!-- ANUNCIOS -->
                     <div class="area-anuncios" id="areaAnuncios">
                              <h1>Anúncios:</h1>

                              <!-- ANUNCIO -->
                              <div class="anuncio">
                                 <div class="row">
                                    <div class="col-8">
                                          <h3>${anuncio.titulo}</h3>
                                          <p>${anuncio.descricao}</p>
                                          <a href="javascript:void(0)" onclick="abrirUrl('https://api.whatsapp.com/send?l=pt_BR&phone=${anuncio.celular}');" title="WhatsApp">
                                             <img src="assets/images/4102606_applications_media_social_whatsapp_icon.svg" alt="WhatsApp"> WhatsApp
                                          </a>
                                    </div>
                                    <div class="col-4" style="padding:0">
                                       <div class="capa-anuncio" style="background:url('${anuncio.capa}') #f2f2f2 no-repeat;background-size:cover;background-position:center center;">
                                          <a href="javascript:void(0)" onclick="abrirUrl('https://api.whatsapp.com/send?l=pt_BR&phone=${anuncio.celular}');" title="Clique para ir para o WhatsApp">
                                             &nbsp;
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <!-- ANUNCIO -->

                     </div>
                     <!-- ANUNCIOS -->
  
            `;
      }

    });

  }

  if(tem==0){

    anuncios_ativos.forEach(function(anuncio) {
      if(anuncio.plano=='2'){
        tem = 2;
      html = `

                     <!-- ANUNCIOS -->
                     <div class="area-anuncios" id="areaAnuncios">
                              <h1>Anúncios:</h1>

                              <!-- ANUNCIO -->
                              <div class="anuncio">
                                 <div class="row">
                                    <div class="col-8">
                                          <h3>${anuncio.titulo}</h3>
                                          <p>${anuncio.descricao}</p>
                                          <a href="javascript:void(0)" onclick="abrirUrl('https://api.whatsapp.com/send?l=pt_BR&phone=${anuncio.celular}');" title="WhatsApp">
                                             <img src="assets/images/4102606_applications_media_social_whatsapp_icon.svg" alt="WhatsApp"> WhatsApp
                                          </a>
                                    </div>
                                    <div class="col-4" style="padding:0">
                                       <div class="capa-anuncio" style="background:url('${anuncio.capa}') #f2f2f2 no-repeat;background-size:cover;background-position:center center;">
                                          <a href="javascript:void(0)" onclick="abrirUrl('https://api.whatsapp.com/send?l=pt_BR&phone=${anuncio.celular}');" title="Clique para ir para o WhatsApp">
                                             &nbsp;
                                          </a>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <!-- ANUNCIO -->

                     </div>
                     <!-- ANUNCIOS -->
  
            `;
      }

    });

  }

  
  if(plano=="3"){

    html = `

                     <!-- ANUNCIOS -->
                     <div class="area-anuncios" id="areaAnuncios">
                              <h1>Anúncios:</h1>
    
    `;

    anuncios_ativos.forEach(function(anuncio) {

      if(anuncio.plano=='3'){

          html = html + `

                        

                                  <!-- ANUNCIO -->
                                  <div class="anuncio">
                                    <div class="row">
                                        <div class="col-8">
                                              <h3>${anuncio.titulo}</h3>
                                              <p>${anuncio.descricao}</p>
                                              <a href="javascript:void(0)" onclick="abrirUrl('https://api.whatsapp.com/send?l=pt_BR&phone=${anuncio.celular}');" title="WhatsApp">
                                                <img src="assets/images/4102606_applications_media_social_whatsapp_icon.svg" alt="WhatsApp"> WhatsApp
                                              </a>
                                        </div>
                                        <div class="col-4" style="padding:0">
                                          <div class="capa-anuncio" style="background:url('${anuncio.capa}') #f2f2f2 no-repeat;background-size:cover;background-position:center center;">
                                              <a href="javascript:void(0)" onclick="abrirUrl('https://api.whatsapp.com/send?l=pt_BR&phone=${anuncio.celular}');" title="Clique para ir para o WhatsApp">
                                                &nbsp;
                                              </a>
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                  <!-- ANUNCIO -->

                        
      
                `;

      }

        });

   

    html = html + `
    
          </div>
          <!-- ANUNCIOS -->
    
    `;

  } 
 
 return html;

}