jQuery(document).ready(function(){
     var currentUri = window.location.href;
     var loginText = "wp-login.php";
     if(currentUri.includes(loginText))
     {
          jQuery("body").prepend("<div class=\"login-header\"></div>");
          jQuery(".login-header").append("<div class=\"icon-vote\"><a  href=\""+window.bigNinjaVoteUrl.siteURL+"\"><img src=\""+window.bigNinjaVoteUrl.pluginUrl + 'assets/img/feedbo-logo-square.png'+"\" alt=\"Feedbo Logo\" class=\"feedbo-main-logo\"></a></div>");
          jQuery(".login-header").append("<div class=\"Feedbo-login\"><a  href=\""+window.bigNinjaVoteUrl.siteURL+"\">Feedbo</a></div>")
          jQuery("#loginform").prepend("<p class=\"Login-on-Vote-Project\" id=\"login-header-title\">Login on Vote Project</p>");
          jQuery(".mo-openid-app-icons").appendTo("#loginform");
          jQuery(".mo-openid-app-icons .btn-facebook").remove();
          jQuery(".mo-openid-app-icons .btn-google").remove();
          jQuery(".mo-openid-app-icons").append("<div class=\"button-facebook \" onclick=\"moOpenIdLogin('facebook','true');\"><i aria-label=\"icon: facebook\" class=\"anticon login-icon anticon-facebook\"><svg viewBox=\"64 64 896 896\" data-icon=\"facebook\" width=\"18px\" height=\"18px\" fill=\"#ffffff\" aria-hidden=\"true\" focusable=\"false\" ><path d=\"M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z\"></path></svg></i><div class=\"Rectangle-178\"></div><div class=\"Facebook\">Continue with Facebook</div></div>");
          jQuery(".mo-openid-app-icons").append("<div class=\"button-google \" onclick=\"moOpenIdLogin('google','true');\"><i aria-label=\"icon: google\" class=\"anticon login-icon anticon-google\"><svg viewBox=\"64 64 896 896\" data-icon=\"google\" width=\"18px\" height=\"18px\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z\"></path></svg></i><div class=\"Rectangle-178\"></div><div class=\"Google\">Continue with Google</div></div>");
          if (jQuery('.mo-openid-app-icons').length) {
               jQuery(".mo-openid-app-icons").append("<div class=\"button-email \" onclick=\"showLoginForm()\"><i aria-label=\"icon: mail\" class=\"anticon login-icon anticon-mail\"><svg viewBox=\"64 64 896 896\" data-icon=\"mail\" width=\"18px\" height=\"18px\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 0 1 194 256h648.8a7.2 7.2 0 0 1 4.4 12.9z\"></path></svg></i><div class=\"Rectangle-178\"></div><div class=\"Email\">Continue with Email</div></div>");
          } else {
               jQuery("#loginform").css("height","270px");
               jQuery("#loginform").append("<div class=\"mo-openid-app-icons \"><div class=\"button-email \" onclick=\"showLoginForm()\"><i aria-label=\"icon: mail\" class=\"anticon login-icon anticon-mail\"><svg viewBox=\"64 64 896 896\" data-icon=\"mail\" width=\"18px\" height=\"18px\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 0 1 194 256h648.8a7.2 7.2 0 0 1 4.4 12.9z\"></path></svg></i><div class=\"Rectangle-178\"></div><div class=\"Email\">Continue with Email</div></div></div>");
          }
          jQuery(".wp-hide-pw").addClass("ant-input-suffix")
          jQuery("#loginform").append("<div class=\"Rectangle-242\"></div>");
          jQuery("#loginform").append("<div class=\"login-form-footer\">We'll never post to any of your accounts without your permission.</div>");
          var actionRegister = "action=register" 
          var actionLogin = "action=login"
          var actionResetPass = "action=resetpass"
          var actionResetPass1 = "action=rp"
          var actionLostPassWord = "action=lostpassword"
          var ajaxUrl = window.bigNinjaVoteUrl.ajaxUrl + '/v1/wp_update_term_users_status'
          var ajaxUrl1 = window.bigNinjaVoteUrl.ajaxUrl + '/v1/wp_update_option_redirect'
          //custom message error
          var errorDiv = jQuery( "#login_error" );
          var messageDiv = jQuery( ".message" );
          if ( errorDiv.length){
               var textError = jQuery( "#login_error" ).text();
               if(textError != null && textError != '')
               {
                    jQuery("body").append("<div class=\"ant-message\"><span><div class=\"ant-message-notice\"><div class=\"ant-message-notice-content\"><div class=\"ant-message-custom-content ant-message-error\"><i aria-label=\"icon: close-circle\" class=\"anticon anticon-close-circle\"><svg viewBox=\"64 64 896 896\" data-icon=\"close-circle\" width=\"1em\" height=\"1em\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\" ><path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z\"></path></svg></i><span>"+textError+"</span></div></div></div></span></div>");
                    setTimeout(function(){
                         jQuery(".ant-message").remove();
                    }, 4000);
               }
          }
          
          if ( messageDiv.length && errorDiv.length === 0){
               var textInfo = jQuery( ".message" ).text();
               if(textInfo != null && textInfo != '')
               {
                    jQuery("body").append("<div class=\"ant-message\"><span><div class=\"ant-message-notice\"><div class=\"ant-message-notice-content\"><div class=\"ant-message-custom-content ant-message-info\"><i aria-label=\"icon: info-circle\" class=\"anticon anticon-info-circle\"><svg viewBox=\"64 64 896 896\" data-icon=\"info-circle\" width=\"1em\" height=\"1em\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z\"></path></svg></i><span>"+textInfo+"</span></div></div></div></span></div>");
                         setTimeout(function(){
                              jQuery(".ant-message").remove();
                         }, 4000);
               }
          }
          
          if(currentUri.includes(loginText) && currentUri.includes(actionRegister)){
               jQuery("#registerform").prepend("<div class=\"Login-on-Vote-Project register-header\">Register Account</div>");
               jQuery('#user_login').css('display', 'block');
               jQuery("#user_login").addClass("ant-input user-pass-input");
               jQuery("#user_email").addClass("ant-input user-pass-input");
               jQuery('.submit').css('display', 'block');
               jQuery('#reg_passmail').css('display', 'none');
               jQuery('#wp-submit').addClass("ant-btn ant-btn-primary btn-register");
               jQuery("#registerform").append("<div class=\"Rectangle-242\"></div>");
               jQuery("#registerform").append("<div class=\"login-form-footer\">Registration confirmation will be emailed to you.</div>");
               jQuery("#registerform").append("<div id=\"div-header\"><span class=\"you-dont-have-account\">You have an account?</span><a id=\"button-register\" class=\"ant-btn\" href=\""+window.bigNinjaVoteUrl.siteURL+"/wp-login.php\">Login</a></div>");

               var result = getJsonFromUrl(currentUri);
               if(result.hasOwnProperty('email') && result.hasOwnProperty('board'))
               {
                    jQuery("#user_email").val(result.email);
                    jQuery.ajax({
                         type: "POST",
                         url: ajaxUrl,
                         data: {
                                   id : result.board,
                                   email: result.email
                              }
                    }).done(function(res) {
                         
                    })
                    .fail(function() {
                         console.log( "error" );
                    })
               }
          }
          if(currentUri.includes(loginText) && currentUri.includes(actionLostPassWord)){
               jQuery("#lostpasswordform").prepend("<div class=\"Login-on-Vote-Project register-header\">Lost Password</div>");
               jQuery('#user_login').css('display', 'block');
               jQuery("#user_login").addClass("ant-input user-pass-input");
               jQuery('.submit').css('display', 'block');
               jQuery('#wp-submit').addClass("ant-btn ant-btn-primary btn-register");
               jQuery("#lostpasswordform").append("<div class=\"Rectangle-242\"></div>");
               jQuery("#lostpasswordform").append("<div class=\"login-form-footer\">New password will be emailed to you.</div>");
               jQuery("#lostpasswordform").append("<div id=\"div-header\"><a id=\"button-register\" class=\"ant-btn lostpass-button-login\" href=\""+window.bigNinjaVoteUrl.siteURL+"/wp-login.php\">Login</a><a id=\"button-register\" class=\"ant-btn\" href=\""+window.bigNinjaVoteUrl.siteURL+"/wp-login.php?action=register\">Register</a></div>");
          }
          if(currentUri.includes(loginText) && currentUri.includes(actionResetPass1)){
               jQuery("#resetpassform").prepend("<div class=\"Login-on-Vote-Project register-header\">Reset Password</div>");
               jQuery('#user_login').css('display', 'block');
               jQuery("#user_login").addClass("ant-input user-pass-input");
               jQuery("#pass1").addClass("ant-input user-pass-input");
               jQuery("#pass1").prop("disabled", false);
               jQuery('.submit').css('display', 'block');
               jQuery('#wp-submit').addClass("ant-btn ant-btn-primary btn-register");
               jQuery('.wp-pwd').css('display', 'block');
               jQuery('.indicator-hint').css('display', 'none');
               jQuery("#resetpassform").append("<div class=\"Rectangle-242\"></div>");
               jQuery("#resetpassform").append("<div class=\"login-form-footer\">The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! \" ? $ % ^ &amp; ).</div>");
               jQuery("#resetpassform").append("<div id=\"div-header\"><a id=\"button-register\" class=\"ant-btn lostpass-button-login\" href=\""+window.bigNinjaVoteUrl.siteURL+"/wp-login.php\">Login</a><a id=\"button-register\" class=\"ant-btn\" href=\""+window.bigNinjaVoteUrl.siteURL+"/wp-login.php?action=register\">Register</a></div>");
          }
          if(currentUri.includes(loginText) && currentUri.includes(actionResetPass)){
               jQuery('.message').css('display', 'block');
               jQuery('.message').css('border-left', 'none');
               jQuery('.message').addClass("reset-form");
          }
          if(currentUri.includes(loginText) && currentUri.includes(actionLogin)){
               var result = getJsonFromUrl(currentUri);
               if(result.hasOwnProperty('email') && result.hasOwnProperty('board'))
               {
                    
                    jQuery.ajax({
                         type: "POST",
                         url: ajaxUrl,
                         data: {
                                   id : result.board,
                                   email: result.email
                              }
                    }).done(function(res) {
                         
                    })
                    .fail(function() {
                         console.log( "error" );
                    })
               }
          }
     }
})
function getJsonFromUrl(url) {
     if(!url) url = location.search;
     var query = url.substr(1);
     var result = {};
     query.split("&").forEach(function(part) {
       var item = part.split("=");
       result[item[0]] = decodeURIComponent(item[1]);
     });
     return result;
}
function showLoginForm() {
     jQuery("#loginform").css("height","");
     document.getElementById("user_login").classList.add("ant-input");
     document.getElementById("user_login").classList.add("user-login-input");
     document.getElementById("user_pass").classList.add("user-pass-input");
     document.getElementsByClassName("user-pass-wrap")[0].classList.add("user-pass-wrap");
     document.getElementsByClassName("submit")[0].classList.add("email-active");
     document.getElementsByClassName("forgetmenot")[0].classList.add("email-active");
     document.getElementsByClassName("wp-pwd")[0].classList.add("email-active");
     document.getElementById("user_pass").disabled = false;
     document.getElementsByClassName("mo-openid-app-icons")[0].style.display = 'none';
     document.getElementsByClassName("login-form-footer")[0].style.display = 'none';
     document.getElementsByClassName("Rectangle-242")[0].style.display = 'none';
     var x = document.getElementsByTagName("label");
     var i;
     for (i = 0; i < x.length; i++) {
          x[i].style.display = 'block';
          x[i].style.padding = '0px 50px';
     }
     document.getElementById("user_login").classList.add("ant-input")
     document.getElementById("user_pass").classList.add("ant-input")
     document.querySelector("#rememberme + label").style.display = 'inline';
     document.querySelector("#rememberme + label").style.padding = '0px';
     document.getElementById("wp-submit").classList.add("ant-btn");
     document.getElementById("wp-submit").classList.add("ant-btn-primary");
     document.getElementById("rememberme").classList.add("ant-checkbox-input");
     document.getElementById("rememberme").classList.add("button-rememberme");
     document.getElementById("wp-submit").style.width = '100%';
     document.getElementById("wp-submit").style.height = '50px';
     var a = document.createElement('a');
     a.setAttribute('id', 'lost-pass');
     var content = document.createTextNode("Lost your password?");
     a.appendChild(content);
     document.getElementsByClassName("forgetmenot")[0].appendChild(a);
     a.setAttribute('href', window.bigNinjaVoteUrl.siteURL+ '/wp-login.php?action=lostpassword');
     //Create button register
     var thisDiv = document.createElement('div');
     thisDiv.setAttribute('id', 'div-header');
     document.body.appendChild(thisDiv);

     var registerText = document.createElement('span');
     registerText.setAttribute('class', 'you-dont-have-account');
     var contentRegisterText = document.createTextNode("You don't have account?");
     registerText.appendChild(contentRegisterText);
     thisDiv.appendChild(registerText);
     var register = document.createElement('a');
     register.setAttribute('id', 'button-register');
     register.setAttribute('class', 'ant-btn');
     var content = document.createTextNode("Register");
     register.appendChild(content);
     thisDiv.appendChild(register);
     register.setAttribute('href', window.bigNinjaVoteUrl.siteURL+ '/wp-login.php?action=register');
     document.getElementById("login-header-title").innerHTML = "<a class=\"login-back\" href=\""+window.bigNinjaVoteUrl.siteURL+"/wp-login.php\"><i aria-label=\"icon: arrow-left\" class=\"anticon anticon-arrow-left\"><svg viewBox=\"64 64 896 896\" data-icon=\"arrow-left\" width=\"18px\" height=\"18px\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\" ><path d=\"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z\"></path></svg></i></a><span>Login with Email</span>";
}
