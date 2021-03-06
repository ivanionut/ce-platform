<!DOCTYPE html>
<html lang="en">
<head>
	<cfoutput>
	<meta charset="utf-8">
	<title>#application.config.name#</title>
	<meta name="description" content="">
	<meta name="author" content="">
	
	<!-- Le styles -->
	#stylesheetLinkTag(bundle="ce")#
	#javaScriptIncludeTag(bundle="ce")#
	#javaScriptIncludeTag(sources="bootstrap-responsive")#
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

<body>
<cfoutput>
	#includePartial(partial="/creditinator_header")#
	#includeContent()#
	#includePartial(partial="/creditinator_footer")#
</cfoutput>
</body>
</html>