!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=1)}({1:function(e,t,n){e.exports=n("DLio")},DLio:function(e,t){var n,a=0,o="",u=new Date,d=!1,i=0,r=!1,l=!0,c="key",s="key";document.getElementById("icoming_call_layout").style.display="none",window.releaseExtension=function(){$.ajaxSetup({headers:{"X-CSRF-TOKEN":jQuery('meta[name="csrf-token"]').attr("content")}});var e={campaign_id:jQuery("#campaignId").val()};$.ajax({type:"POST",url:"/mizuvoip/relext",data:e,dataType:"json",success:function(e){return e},error:function(e){console.log(e)}})},window.updateStatus=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;$.ajaxSetup({headers:{"X-CSRF-TOKEN":jQuery('meta[name="csrf-token"]').attr("content")}});var d=new Date,i={campaign_id:jQuery("#campaignId").val(),extension_id:a};null!=e?(i.agent_status=e,o!=e&&(o=e,u=new Date)):i.agent_status=o,i.status_duration=Math.floor((d.getTime()-u.getTime())/1e3),null!=t&&(i.connected_number=t),$.ajax({type:"POST",url:"/mizuvoip/updstat",data:i,dataType:"json",success:function(e){},error:function(e){console.log(e)}}),l?n=setTimeout(updateStatus,5e3):clearTimeout(n)},webphone_api.parameters.autostart=0,webphone_api.onAppStateChange((function(e){"loaded"===e?document.getElementById("events").innerHTML="EVENT, Loaded":"started"===e?(document.getElementById("btn_start").innerText="Stop",document.getElementById("btn_start").onclick=function(){Stop()},document.getElementById("events").innerHTML="EVENT, Started",updateStatus("Ready",""),updateAuxState()):"stopped"===e&&(releaseExtension(),document.getElementById("events").innerHTML="EVENT, Stopped",l=!1,updateStatus("App Stopped"))})),webphone_api.onRegStateChange((function(e){if("registered"===e)document.getElementById("events").innerHTML="EVENT, Registered.",updateStatus("Ready",""),updateAuxState();else if("unregistered"===e){switch(document.getElementById("events").innerHTML="EVENT, UnRegistered.",parseInt(i)){case 1:updateStatus("Aux Konsultasi","");break;case 2:updateStatus("Aux Supporting","");break;case 3:updateStatus("Aux CatHSTR","");break;case 4:updateStatus("Aux Toilet","");break;case 5:updateStatus("Aux Air Minum","");break;case 6:updateStatus("Aux Sholat","");break;case 7:updateStatus("Aux Lunch","");break;case 8:updateStatus("Aux Briefing","");break;case 9:updateStatus("Aux Update System","")}updateAuxState()}else"failed"===e&&(document.getElementById("events").innerHTML="ERROR, Register failed.",updateStatus("Ext Register failed",""))})),webphone_api.onCdr((function(e,t,n,a,o,u,d,i){$.ajaxSetup({headers:{"X-CSRF-TOKEN":jQuery('meta[name="csrf-token"]').attr("content")}});var r={campaign_id:jQuery("#campaignId").val(),duration:Math.floor((parseInt(a,10)+500)/1e3)};$.ajax({type:"POST",url:"/mizuvoip/handling",data:r,dataType:"json",success:function(e){console.log(e)},error:function(e){console.log(e)}})})),window.Start=function(){$.ajax({type:"POST",url:"/mizuvoip/getext",data:"_token = <?php echo csrf_token() ?>",success:function(e){null!=e?(webphone_api.setparameter("serveraddress",e.msg[0].serveraddress),webphone_api.setparameter("username",e.msg[0].name),webphone_api.setparameter("password",e.msg[0].password),a=e.msg[0].id,document.getElementById("events").innerHTML="EVENT, Initializing...",webphone_api.start(),l=!0):document.getElementById("events").innerHTML="EVENT, No Available Extension ..."}})},window.Stop=function(){webphone_api.isincall()?d=!0:(webphone_api.stop(),document.getElementById("btn_start").innerText="Start",document.getElementById("btn_start").onclick=function(){Start()})},window.Call=function(){var e=document.getElementById("destnumber").value;null==e&&(e=""),webphone_api.setparameter("destination",e),document.getElementById("destnumber").disabled=!0,webphone_api.call(e)},window.Hangup=function(){webphone_api.hangup(),document.getElementById("events").innerHTML="EVENT, Registered."},window.Hold=function(e){webphone_api.hold(e),$.ajaxSetup({headers:{"X-CSRF-TOKEN":jQuery('meta[name="csrf-token"]').attr("content")}});var t={hold_val:e,campaign_id:jQuery("#campaignId").val(),key_val:c};$.ajax({type:"POST",url:"/mizuvoip/hold",data:t,dataType:"json",success:function(t){e&&(c=t.key)},error:function(e){console.log(e)}}),e?(document.getElementById("btn_hold").innerText="un-Hold",document.getElementById("btn_hold").onclick=function(){Hold(!1)},updateStatus("Hold")):(document.getElementById("btn_hold").innerText="Hold",document.getElementById("btn_hold").onclick=function(){Hold(!0)},updateStatus("Call Connected"))},window.updateAuxState=function(){$.ajaxSetup({headers:{"X-CSRF-TOKEN":jQuery('meta[name="csrf-token"]').attr("content")}});var e={aux_val:i,campaign_id:jQuery("#campaignId").val(),key_val:s};$.ajax({type:"POST",url:"/mizuvoip/aux",data:e,dataType:"json",success:function(e){s=0!=parseInt(i)?e.key:"key"},error:function(e){console.log(e)}})},window.Aux=function(){if(i=parseInt(document.getElementById("drp_aux").selectedIndex),0!=parseInt(i))if(webphone_api.isincall())r=!0;else{for(var e=1;e<10;e++)e!=parseInt(i)&&(document.getElementById("drp_aux_"+e).disabled=!0);webphone_api.unregister()}else{webphone_api.register();for(var t=1;t<10;t++)document.getElementById("drp_aux_"+t).disabled=!1}},window.Accept=function(){document.getElementById("icoming_call_layout").style.display="none",webphone_api.accept()},window.Reject=function(){document.getElementById("icoming_call_layout").style.display="none",webphone_api.reject()},webphone_api.onCallStateChange((function(e,t,n,a,o,u){if(document.getElementById("events").innerHTML="EVENT, Call "+e,"setup"===e)document.getElementById("btn_call").innerText="Hangup",document.getElementById("btn_call").onclick=function(){Hangup()},1==t||2==t&&(document.getElementById("icoming_call_layout").style.display="block"),document.getElementById("events").innerHTML="EVENT, Call setup",updateStatus("Call Setup");else if("disconnected"===e){if(document.getElementById("btn_call").innerText="Call",document.getElementById("btn_call").onclick=function(){Call()},r){for(var l=1;l<10;l++)l!=parseInt(i)&&(document.getElementById("drp_aux_"+l).disabled=!0);webphone_api.unregister(),r=!1}d&&(webphone_api.stop(),document.getElementById("btn_start").innerText="Start",document.getElementById("btn_start").onclick=function(){Start()},d=!1),document.getElementById("icoming_call_layout").style.display="none",document.getElementById("events").innerHTML="EVENT, Call disconnected",updateStatus("Call Disconnected"),document.getElementById("destnumber").disabled=!1}else"connected"===e&&(document.getElementById("destnumber").disabled=!0,updateStatus("Call Connected",document.getElementById("destnumber").value))})),window.GetTickCount=function(){return(new Date).getTime()}}});