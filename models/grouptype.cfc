<cfcomponent extends="Model">
    <cffunction name="init">
        <cfset table("ce_GroupType")>
        <cfset property(name="id", column="group_TypeId") />
        <!---<cfset setPrimaryKey(property="id") />--->
    </cffunction>
</cfcomponent>
