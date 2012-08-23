<a href="javascript://" class="btn previous js-prev-page<% if(currentPage <= 1) { %> disabled<% } %>"><i class="icon-chevron-left"></i></a>
<a class="btn dropdown-toggle js-show-page-dropdown" data-toggle="dropdown"><span class="js-page-selector"><%= currentPage %></span> <span class="caret"></span></a>
<ul class="dropdown-menu page js-pages">
	<li><span>Rows per page: <input type="text" class="span1 js-page-sizer" value="" /></span></li>
    <% for(var page = 1; page <= totalPages; page++) { %>
    <li><a href="javascript://" class="js-page" id="page-<%= page %>"><%= page %></a></li>
    <% } %>
</ul>
<a href="javascript://" class="btn next js-next-page<% if(currentPage >= totalPages) { %> disabled<% } %>"><i class="icon-chevron-right"></i></a>