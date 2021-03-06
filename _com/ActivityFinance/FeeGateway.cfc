
<cfcomponent displayname="FeeGateway" output="false">
	<cffunction name="init" access="public" output="false" returntype="_com.ActivityFinance.FeeGateway">
		<cfargument name="dsn" type="string" required="true" />
		<cfset variables.dsn = arguments.dsn />
		<cfreturn this />
	</cffunction>
	
	<cffunction name="getByAttributes" access="public" output="false" returntype="query">
		<cfargument name="FeeID" type="numeric" required="false" />
		<cfargument name="ActivityID" type="numeric" required="false" />
		<cfargument name="Name" type="string" required="false" />
		<cfargument name="DisplayName" type="string" required="false" />
		<cfargument name="StartDate" type="date" required="false" />
		<cfargument name="EndDate" type="date" required="false" />
		<cfargument name="Amount" type="numeric" required="false" />
		<cfargument name="Created" type="date" required="false" />
		<cfargument name="CreatedBy" type="numeric" required="false" />
		<cfargument name="Updated" type="date" required="false" />
		<cfargument name="UpdatedBy" type="numeric" required="false" />
		<cfargument name="Deleted" type="date" required="false" />
		<cfargument name="DeletedFlag" type="string" required="false" />
		<cfargument name="orderby" type="string" required="false" />
		
		<cfset var qList = "" />		
		<cfquery name="qList" datasource="#variables.dsn#">
			SELECT
				FeeID,
				ActivityID,
				Name,
				DisplayName,
				StartDate,
				EndDate,
				Amount,
				Created,
				CreatedBy,
				Updated,
				UpdatedBy,
				Deleted,
				DeletedFlag
			FROM	ce_Activity_FinFee
			WHERE	0=0
		
		<cfif structKeyExists(arguments,"FeeID") and len(arguments.FeeID)>
			AND	FeeID = <cfqueryparam value="#arguments.FeeID#" CFSQLType="cf_sql_integer" />
		</cfif>
		<cfif structKeyExists(arguments,"ActivityID") and len(arguments.ActivityID)>
			AND	ActivityID = <cfqueryparam value="#arguments.ActivityID#" CFSQLType="cf_sql_integer" />
		</cfif>
		<cfif structKeyExists(arguments,"Name") and len(arguments.Name)>
			AND	Name = <cfqueryparam value="#arguments.Name#" CFSQLType="cf_sql_varchar" />
		</cfif>
		<cfif structKeyExists(arguments,"DisplayName") and len(arguments.DisplayName)>
			AND	DisplayName = <cfqueryparam value="#arguments.DisplayName#" CFSQLType="cf_sql_varchar" />
		</cfif>
		<cfif structKeyExists(arguments,"StartDate") and len(arguments.StartDate)>
			AND	StartDate = <cfqueryparam value="#arguments.StartDate#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"EndDate") and len(arguments.EndDate)>
			AND	EndDate = <cfqueryparam value="#arguments.EndDate#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"Amount") and len(arguments.Amount)>
			AND	Amount = <cfqueryparam value="#arguments.Amount#" CFSQLType="cf_sql_float" />
		</cfif>
		<cfif structKeyExists(arguments,"Created") and len(arguments.Created)>
			AND	Created = <cfqueryparam value="#arguments.Created#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"CreatedBy") and len(arguments.CreatedBy)>
			AND	CreatedBy = <cfqueryparam value="#arguments.CreatedBy#" CFSQLType="cf_sql_integer" />
		</cfif>
		<cfif structKeyExists(arguments,"Updated") and len(arguments.Updated)>
			AND	Updated = <cfqueryparam value="#arguments.Updated#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"UpdatedBy") and len(arguments.UpdatedBy)>
			AND	UpdatedBy = <cfqueryparam value="#arguments.UpdatedBy#" CFSQLType="cf_sql_integer" />
		</cfif>
		<cfif structKeyExists(arguments,"Deleted") and len(arguments.Deleted)>
			AND	Deleted = <cfqueryparam value="#arguments.Deleted#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"DeletedFlag") and len(arguments.DeletedFlag)>
			AND	DeletedFlag = <cfqueryparam value="#arguments.DeletedFlag#" CFSQLType="cf_sql_char" />
		</cfif>
		<cfif structKeyExists(arguments, "orderby") and len(arguments.orderBy)>
			ORDER BY #arguments.orderby#
		</cfif>
		</cfquery>
		
		<cfreturn qList />
	</cffunction>

	<cffunction name="getByViewAttributes" access="public" output="false" returntype="query">
		<cfargument name="FeeID" type="numeric" required="false" />
		<cfargument name="ActivityID" type="numeric" required="false" />
		<cfargument name="Name" type="string" required="false" />
		<cfargument name="DisplayName" type="string" required="false" />
		<cfargument name="StartDate" type="date" required="false" />
		<cfargument name="EndDate" type="date" required="false" />
		<cfargument name="Amount" type="numeric" required="false" />
		<cfargument name="Created" type="date" required="false" />
		<cfargument name="CreatedBy" type="numeric" required="false" />
		<cfargument name="Updated" type="date" required="false" />
		<cfargument name="UpdatedBy" type="numeric" required="false" />
		<cfargument name="Deleted" type="date" required="false" />
		<cfargument name="DeletedFlag" type="string" required="false" />
		<cfargument name="orderby" type="string" required="false" />
		
		<cfset var qList = "" />		
		<cfquery name="qList" datasource="#variables.dsn#">
			SELECT	aff.FeeID,
					aff.ActivityID,
					aff.Name,
					aff.DisplayName,
					aff.StartDate,
					aff.EndDate,
					aff.Amount,
					aff.Created,
					aff.CreatedBy,
					aff.Updated,
					aff.UpdatedBy,
					aff.Deleted,
					aff.DeletedFlag,
					p1.firstname AS CreatedByFName, 
					p1.lastname AS CreateByLName, 
					p2.firstname AS UpdatedByFName, 
		            p2.lastname AS UpdatedByLName
			FROM	ce_Activity_FinFee aff
			LEFT OUTER JOIN ce_Person p1 ON p1.PersonID = aff.CreatedBy
			LEFT OUTER JOIN ce_Person p2 ON p2.PersonID = aff.UpdatedBy
			WHERE	0=0
		
		<cfif structKeyExists(arguments,"FeeID") and len(arguments.FeeID)>
			AND	aff.FeeID = <cfqueryparam value="#arguments.FeeID#" CFSQLType="cf_sql_integer" />
		</cfif>
		<cfif structKeyExists(arguments,"ActivityID") and len(arguments.ActivityID)>
			AND	aff.ActivityID = <cfqueryparam value="#arguments.ActivityID#" CFSQLType="cf_sql_integer" />
		</cfif>
		<cfif structKeyExists(arguments,"Name") and len(arguments.Name)>
			AND	aff.Name = <cfqueryparam value="#arguments.Name#" CFSQLType="cf_sql_varchar" />
		</cfif>
		<cfif structKeyExists(arguments,"DisplayName") and len(arguments.DisplayName)>
			AND	aff.DisplayName = <cfqueryparam value="#arguments.DisplayName#" CFSQLType="cf_sql_varchar" />
		</cfif>
		<cfif structKeyExists(arguments,"StartDate") and len(arguments.StartDate)>
			AND	aff.StartDate = <cfqueryparam value="#arguments.StartDate#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"EndDate") and len(arguments.EndDate)>
			AND	aff.EndDate = <cfqueryparam value="#arguments.EndDate#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"Amount") and len(arguments.Amount)>
			AND	aff.Amount = <cfqueryparam value="#arguments.Amount#" CFSQLType="cf_sql_float" />
		</cfif>
		<cfif structKeyExists(arguments,"Created") and len(arguments.Created)>
			AND	aff.Created = <cfqueryparam value="#arguments.Created#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"CreatedBy") and len(arguments.CreatedBy)>
			AND	aff.CreatedBy = <cfqueryparam value="#arguments.CreatedBy#" CFSQLType="cf_sql_integer" />
		</cfif>
		<cfif structKeyExists(arguments,"Updated") and len(arguments.Updated)>
			AND	aff.Updated = <cfqueryparam value="#arguments.Updated#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"UpdatedBy") and len(arguments.UpdatedBy)>
			AND	aff.UpdatedBy = <cfqueryparam value="#arguments.UpdatedBy#" CFSQLType="cf_sql_integer" />
		</cfif>
		<cfif structKeyExists(arguments,"Deleted") and len(arguments.Deleted)>
			AND	aff.Deleted = <cfqueryparam value="#arguments.Deleted#" CFSQLType="cf_sql_timestamp" />
		</cfif>
		<cfif structKeyExists(arguments,"DeletedFlag") and len(arguments.DeletedFlag)>
			AND	aff.DeletedFlag = <cfqueryparam value="#arguments.DeletedFlag#" CFSQLType="cf_sql_char" />
		</cfif>
		<cfif structKeyExists(arguments, "orderby") and len(arguments.orderBy)>
			ORDER BY #arguments.orderby#
		</cfif>
		</cfquery>
		
		<cfreturn qList />
	</cffunction>
</cfcomponent>
