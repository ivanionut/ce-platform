function continueCopy(){var c=$("#NewActivityTitle").val();var b=$("#NewActivityType").val();var d=$("#NewGrouping").val();var e=$(".CopyChoice:checked").val();var a=0;if(b==""&&e==1){addError("Please select an activity type.",250,6000,4000);a=a+1}if(c==""){addError("Please enter an activity title.",250,6000,4000);a=a+1}if(a>0){return false}if(d==""){d=0}$.getJSON("/ajax_adm_activity/",{method:"CopyPaste",Mode:e,NewActivityTitle:c,NewActivityTypeID:b,NewGroupingID:d,ActivityID:ccpd.tier2.nActivity,ReturnFormat:"plain"},function(f){if(f.STATUS){window.location=sMyself+"Activity.Detail?ActivityID="+f.DATASET[0].ACTIVITYID+"&Message="+f.STATUSMSG}else{addError(f.STATUSMSG,250,6000,4000)}})}function cancelCopy(){}function setCurrActivityType(a){$("#NewActivityType").val(a);getGroupingList(a)}function getGroupingList(a){$("#NewGrouping").removeOption("");$("#NewGrouping").removeOption(/./);$("#NewGrouping").ajaxAddOption("/ajax_adm_activity/getgroupings",{method:"",ATID:a,returnFormat:"plain"},false,function(b){if($("#NewGrouping").val()!=""){$("#NewGrouping").val(nGrouping);$("#NewGroupingSelect").show()}else{$("#NewGrouping").val(0);$("#NewGroupingSelect").hide()}})}function updateAll(){updateStats();updateContainers();updateActivityList()}function updateStats(){}function updateActions(){}function updateContainers(){}function updateActivityList(){$.post(sMyself+"Activity.ActivityList",{ActivityID:ccpd.tier2.nActivity},function(a){$("#ActivityList").html(a)})}function updateNoteCount(){$.post("/ajax_adm_activity/getnotecount",{method:"",ActivityID:ccpd.tier2.nActivity,returnFormat:"plain"},function(b){var a=$.ListGetAt($.Trim(b),1,".");$("#NoteCount").html("("+a+")")})}$(document).ready(function(){updateContainers();updateStats();updateNoteCount();$("#StatusChanger").change(function(){var a=$(this).val();if(a==""){addError("You must select a status.",250,6000,4000);return false}$.post("/ajax_adm_activity/updateactivitystatus",{method:"",ActivityID:ccpd.tier2.nActivity,StatusID:a,returnFormat:"plain"},function(b){var c=$.trim(b);updateActions();updatePublishState();addMessage("Activity status changed successfully!",250,6000,4000)});$("#StatusIcon").attr("src","/admin/_images/icons/Status"+$(this).val()+".png")});$("#ActivityList").dialog({title:"Activity List",modal:false,autoOpen:ccpd.tier2.cActListOpen,height:ccpd.tier2.cActListHeight,width:ccpd.tier2.cActListWidth,position:[ccpd.tier2.cActListPosX,ccpd.tier2.cActListPosY],resizable:true,dragStop:function(a,b){$.post("/_com/UserSettings.cfc",{method:"setActListPos",position:b.position.left+","+b.position.top})},open:function(){updateActivityList();$("#ActivityList").show();$.post("/_com/UserSettings.cfc",{method:"setActListOpen",IsOpen:"true"});$("#ActivityDialogLink").fadeOut()},close:function(){$("#ActivityList").html("");$("#ActivityDialogLink").fadeIn();$.post("/_com/UserSettings.cfc",{method:"setActListOpen",IsOpen:"false"})},resizeStop:function(a,b){$.post("/_com/UserSettings.cfc",{method:"setActListSize",Size:b.size.width+","+b.size.height})}});$("#ActivityDialogLink").click(function(){$("#ActivityList").dialog("open")});$("#MoveDialog").dialog({title:"Move Activity",modal:true,autoOpen:false,position:[150,150],buttons:{Continue:function(){$.post("/ajax_adm_activity/",{method:"Move",FromActivityID:ccpd.tier2.nActivity,ToActivityID:$("#ToActivity").val()},function(a){window.location=sMyself+"Activity.Detail?ActivityID="+ccpd.tier2.nActivity+"&Message=Activity successfully moved."})},Cancel:function(){$("#MoveDialog").dialog("close")}},height:200,width:450,resizable:false,draggable:true,open:function(){$("#MoveDialog").show()},close:function(){}});$("#MoveLink").click(function(){$("#MoveDialog").dialog("open")});$("#CopyDialog").dialog({title:"Copy &amp; Paste Activity",modal:true,autoOpen:false,position:[200,200],overlay:{opacity:0.5,background:"black"},buttons:{Continue:function(){continueCopy()},Cancel:function(){cancelCopy();$("#CopyDialog").dialog("close")}},height:230,width:400,resizable:false,draggable:true,open:function(){$("#CopyDialog").show()},close:function(){cancelCopy()}});$("#CopyLink").click(function(){setCurrActivityType(ccpd.tier2.nActivityType);$("#CopyDialog").dialog("open");$("#NewActivityTitle").val("Copy of "+sActivityTitle);$("#NewActivityTitle").focus();$("#NewActivityTitle").select()});$(".CopyChoice").change(function(){var a=$.Replace(this.id,"CopyChoice","");if(a==2){$("#ParentActivityOptions").hide()}else{$("#ParentActivityOptions").show()}});$("#NewActivityType").bind("change",this,function(){var a=$(this).val();if(a!=""){getGroupingList(a)}else{$("#NewGroupingSelect").hide();$("#NewGrouping").val("")}});$("#NotesList").dialog({title:"Notes",modal:false,autoOpen:ccpd.tier2.cActNotesOpen,height:430,width:390,position:[ccpd.tier2.cActNotesPosX,ccpd.tier2.cActNotesPosY],resizable:false,dragStop:function(a,b){$.post("/_com/UserSettings.cfc",{method:"setActNotesPos",position:b.position.left+","+b.position.top})},open:function(){$("#NotesList").show();$("#frmNotes").attr("src",sMyself+"Activity.Notes?ActivityID="+ccpd.tier2.nActivity);$.post("/_com/UserSettings.cfc",{method:"setActNotesOpen",IsOpen:"true"});$("#NotesDialogLink").fadeOut()},close:function(){updateNoteCount();$("#NotesDialogLink").fadeIn();$("#frmNotes").attr("src","javascript://");$.post("/_com/UserSettings.cfc",{method:"setActNotesOpen",IsOpen:"false"})}});$("#NotesDialogLink").click(function(){$("#NotesList").dialog("open")});$("#OverviewList").dialog({title:"Activity Overview",modal:false,autoOpen:false,height:550,width:740,position:[100,100],resizable:true,open:function(){$.post(sMyself+"Activity.Overview",{ActivityID:ccpd.tier2.nActivity},function(a){$("#OverviewList").html(a)})},close:function(){$("#OverviewDialogLink").fadeIn();$("#OverviewList").html("")},buttons:{Print:function(){$("#OverviewList").printArea()},Close:function(){$("#OverviewList").dialog("close")}}});$("#OverviewDialogLink").click(function(){$("#OverviewList").dialog("open")});$("#DeleteActivityLink").bind("click",this,function(){var a=prompt("Do you really want to delete '"+sActivityTitle+"'?  What is the reason?","");if(a!=null&&a!=""){$.getJSON("/ajax_adm_activity/deleteactivity",{method:"",ActivityID:ccpd.tier2.nActivity,Reason:a,returnFormat:"plain"},function(b){if(b.STATUS){window.location=sMyself+"Activity.Home?Message="+b.STATUSMSG}else{addError(b.STATUSMSG,250,6000,4000)}})}else{addError("Please provide a reason.",250,6000,4000)}});$("#ProcessQueueDialog").dialog({title:"Process Queues",modal:true,autoOpen:false,overlay:{opacity:0.5,background:"black"},buttons:{Continue:function(){frmProcessQueue.addToQueue()},Cancel:function(){$("#ProcessSelect").val("");$(this).dialog("close")}},height:400,width:560,resizable:false,open:function(){$("#ProcessQueueDialog").show()}});$("#ProcessSelect").change(function(){$("#frmProcessQueue").attr("src",sMyself+"Process.AddToQueue?ActivityID="+ccpd.tier2.nActivity+"&ProcessID="+$(this).val());$("#ProcessQueueDialog").dialog("open")});$("#ProcessSelect").val("")});