<cfparam name="params.Page" type="numeric" default="1" />

<cfoutput>
<div class="btn-toolbar clearfix">
	<div class="btn-group pull-left">
		<a href="##" class="btn"><i class="icon-plus-sign"></i></a>
		<a href="##" class="btn"><i class="icon-hdd"></i></a>
	</div>
	<div class="btn-group pull-left js-partic-actions">
		<a class="btn dropdown-toggle disabled" data-toggle="dropdown" href="##">SELECTED: <span id="label-status-selected">0</span></a>
		<a class="btn dropdown-toggle disabled" data-toggle="dropdown" href="##">
			Actions
			<span class="caret"></span>
		</a>
		<ul class="dropdown-menu">
			<li><a href="##" class="js-remove-attendees">Remove</a></li>
			<li class="divider"></li>
			<li class="nav-header">CHANGE STATUSES</li>
			<li><a href="##" class="js-change-status" id="change-status-1">Complete</a></li>
			<li><a href="##" class="js-change-status" id="change-status-4">Failed</a></li>
			<li><a href="##" class="js-change-status" id="change-status-2">In Progress</a></li>
			<li><a href="##" class="js-change-status" id="change-status-3">Registered</a></li>
			<li class="divider"></li>
			<li class="nav-header">CERTIFICATES</li>
			<li><a href="##" id="print-cme" class="js-print">CME Certificates</a></li>
			<li><a href="##" id="print-cne" class="js-print">Nurse Certificates</a></li>
		</ul>
	</div>
	
	<form class="form-inline pull-left mll" action="">
		<input type="text"  class="input-medium" placeholder="filter people" />	
	</form>

	<div class="btn-group pull-right pager-simple">
		<a href="/activities/adm_participants?ActivityID=13660&status=0&page=#params.page-1#" class="btn previous prev-page<cfif params.page EQ 1> disabled</cfif>"><i class="icon-chevron-left"></i></a>
		<a class="btn dropdown-toggle" data-toggle="dropdown"><span class="pageSelector">#params.page#</span> <span class="caret"></span></a>

		<ul class="dropdown-menu pages">
		</ul>
		<a href="/activities/adm_participants?ActivityID=13660&status=0&page=#params.page+1#" class="btn next next-page"><i class="icon-chevron-right"></i></a>
	</div>
	<div class="btn-group pull-right">
		<a class="btn" data-toggle="dropdown">Filter</a>
		<a class="btn attendee-status-title" data-toggle="dropdown">All</a>
		<a class="btn dropdown-toggle" data-toggle="dropdown">
			<span class="caret"></span>
		</a>
		<ul class="dropdown-menu attendees-filter">
			<li class="attendee-status js-attendee-status" id="status0"><a href="##"><span class="attendee-status-name">All</span> <span class="attendee-status-count"></span></a></li>
			<li class="divider"></li>
			<li class="attendee-status js-attendee-status" id="status1"><a href="##"><span class="attendee-status-name">Complete</span> <span class="attendee-status-count"></span></a></li>
			<li class="attendee-status js-attendee-status" id="status4"><a href="##"><span class="attendee-status-name">Failed</span> <span class="attendee-status-count"></span></a></li>
			<li class="attendee-status js-attendee-status" id="status2"><a href="##"><span class="attendee-status-name">In Progress</span> <span class="attendee-status-count"></span></a></li>
			<li class="attendee-status js-attendee-status" id="status3"><a href="##"><span class="attendee-status-name">Registered</span> <span class="attendee-status-count"></span></a></li>
			<li class="js-status-Selected" id="statusSelected"><a href="##"><span class="attendee-status-name">Selected</span> <span class="attendee-status-count">(0)</span></a></li>
		</ul>
	</div>
</div>
<div>
	<div id="RegistrantsContainer" class="js-registrants-container"></div>
	<div id="RegistrantsLoading" class="Loading js-registrants-loading"><img src="/admin/_images/ajax-loader.gif" />
	<div>Please Wait</div></div>
</div>
<div class="btn-toolbar clearfix">
    <div class="btn-group pull-right pager-simple">
            <a href="/activities/adm_participants?ActivityID=13660&status=0&page=#params.page-1#" class="btn previous prev-page"><i class="icon-chevron-left"></i></a>
            <a class="btn dropdown-toggle" data-toggle="dropdown"><span class="pageSelector">#params.page#</span> <span class="caret"></span></a>
            <ul class="dropdown-menu pages">
            </ul>
            <a href="/activities/adm_participants?ActivityID=13660&status=0&page=#params.page+1#" class="btn next next-page"><i class="icon-chevron-right"></i></a>
	</div>
</div>
</cfoutput>
