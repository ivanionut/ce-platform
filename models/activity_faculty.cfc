<cfcomponent extends="Model">
    <cffunction name="init">
        <cfset table("Activity_Faculty")>
        <cfset property(name="id", column="FacultyID") />
        <!---<cfset setPrimaryKey(property="id") />--->
    </cffunction>
</cfcomponent>