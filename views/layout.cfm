<!DOCTYPE html>
<html lang="en">
<head>
	<cfoutput>
	<meta charset="utf-8">
	<title>#application.config.name#</title>
	<meta name="description" content="">
	<meta name="author" content="">
	
	<!-- Le styles -->
	#stylesheetLinkTag(bundle="#application.version_token#/ccpd")#
	#javaScriptIncludeTag(bundle="#application.version_token#/ccpd")#
	
	<script src="/javascripts/app/controllers/#lcase(params.controller)#.js" type="text/javascript"></script>
	<script src="/javascripts/app/views/#lcase(params.controller)#/#params.action#.js" type="text/javascript"></script>
	<script type="text/javascript">
	/* PROOF OF CONCEPT. NEEDS MOVED, I know. */
	$.Class("ccpd.page",{
		init:function(controller,action) {
			this.controller = new ccpd[controller](action);
		}
	});
	
	(function(){
		var page = new ccpd.page('#lcase(params.controller)#','#params.action#');
	})();
	</script>
	<script src="/resources/jsloader/global.js?pagelet=#params.pagelet#&pagelet_token=#params.pagelet_token#" type="text/javascript"></script>
	<style>
	body {
	padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
	}
	</style>
	
	<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<!-- Le fav and touch icons -->
	<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico"/>
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/images/apple-touch-icon-144-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/images/apple-touch-icon-114-precomposed.png">
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/images/apple-touch-icon-72-precomposed.png">
	<link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
	</cfoutput>
</head>
<cfoutput>
<body data-pagelet="#params.pagelet#" data-pagelet_token="#params.pagelet_token#" data-controller="#lcase(params.controller)#" data-action="#lcase(params.action)#" data-version_token="#params.version_token#">
	#includePartial(partial="/header")#
	#includeContent()#
	#includePartial(partial="/footer")#

<div class="alert alert-error" style="display:none;"></div>
<div class="alert alert-success" style="display:none;"></div>
</body>
</cfoutput>
</html>