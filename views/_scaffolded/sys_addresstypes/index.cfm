<h1>Listing sys_addresstypes</h1>

<cfoutput>#includePartial("showFlash")#</cfoutput>

<cfoutput>
<p>#linkTo(text="New sys_addresstype", action="new")#</p>
</cfoutput>
<cfoutput>
<table class="table table-striped table-condensed">
	<thead>
		<th>Id</th>
		<th>Name</th>
		<th>Description</th>
		<th>Code</th>
		
	</thead>
	<tbody>
		<cfloop query="sys_addresstypes">
		<tr>
			<td>#id#</td>
		<td>#Name#</td>
		<td>#Description#</td>
		<td>#Code#</td>
		
		</tr>
		</cfloop>
	</tbody>
</table>
</cfoutput>

