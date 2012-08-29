<cfoutput>
<div class="profile editor row">
	<div class="projectBar span4">
		#includePartial(partial="/users/sublayout/guest_login_box")#
		#includePartial(partial="/users/sublayout/guest_tabs")#
	</div>
	<div class="contentBar span16">
		<div class="contentHeader">
			<i class="icon16-book-open"></i>
			<span class="pageTitle">#includeContent("pageTitle")#</span>
		</div>
		<div class="contentSubHeader">
			<span class="pageTitle">#includeContent("pageSubTitle")#</span>
		</div>
		
		#includeContent()#
	</div>
	<div class="infoBar span4">
		#includePartial(partial="/users/sublayout/guest_infobar")#
	</div>
</div>
</cfoutput>