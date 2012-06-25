<!--- 
	The MIT License (MIT)

	Copyright (c) 2011 Jason Fill (@jasonfill)
	
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
	associated documentation files (the "Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
	copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the 
	following conditions:
	
	The above copyright notice and this permission notice shall be included in all copies or substantial 
	portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT 
	NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
	WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
	OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 --->
 
<style>
	textarea{width:100%; height:100px;}
</style>

<!--- Simple say hello... --->

	<cfset r = REQUEST.TwilioLib.newResponse() />
	<cfset r.Say("Hello") />
	<cfdump var="#XmlParse(r.getResponseXml())#">
	<textarea><cfoutput>#r.getResponseXml()#</cfoutput></textarea>
	
	<!--- This is the same but using chaining... --->
	<cfset r = REQUEST.TwilioLib.newResponse().Say("Hello") />
	<cfdump var="#XmlParse(r.getResponseXml())#">
	<textarea><cfoutput>#r.getResponseXml()#</cfoutput></textarea>
	
<!--- Sample incoming call for super simple phone tree... --->

	<cfset r = REQUEST.TwilioLib.newResponse() />
	
	<cfset r.say(body="Thank you for calling Acme Corp.  Please choose an option.", voice="man") />
	<cfset r.gather(numDigits="1", Action="somepage.cfm") />
	<cfset r.say(body="Press 1", voice="man", childOf="gather") />
	<cfset r.say(body="Press e", voice="man", childOf="gather") />
	
	<cfdump var="#XmlParse(r.getResponseXml())#">
	<textarea><cfoutput>#r.getResponseXml()#</cfoutput></textarea>
	
	<!--- This is the same as above but using chaining... --->
	<cfset r = REQUEST.TwilioLib.newResponse() />
	
	<cfset r.say(body="Thank you for calling Acme Corp.  Please choose an option.", voice="man") />
	<cfset r.gather(numDigits="1", Action="somepage.cfm", finishOnKey="##")
					.say(body="Press 1", voice="man", childOf="gather")
					.say(body="Press 2", voice="man", childOf="gather")
					.say(body="Press 3", voice="man", childOf="gather")
					.say(body="Press 4", voice="man", childOf="gather")
					.say(body="Press 5", voice="man", childOf="gather") />
	
	
	
	<cfdump var="#XmlParse(r.getResponseXml())#">
	<textarea><cfoutput>#r.getResponseXml()#</cfoutput></textarea>
	

	