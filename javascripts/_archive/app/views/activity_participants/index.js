$.Class("ccpd.activity_participants",{
	setup:function(params) {
		if (typeof String.prototype.startsWith != 'function') {
			String.prototype.startsWith = function (str){
				return this.indexOf(str) == 0;
			};
		}
	},
	
	init: function() {
		// BUILD INITIAL DATA CONTAINERS
		this.activity = ccpd.tier2;
		this.pageData = ccpd.tier3;
		this.attendeeList = this.pageData.totalAttendeeList;
	},
	
	domReady: function(params) {
		var participants = this;
		
		// DEFINE PAGE ELEMENT VARIABLE NAMES
		this.attendeeRemover = $('.js-remove-attendees');
		this.attendeeSearch = $('.js-status-filtered');
		this.attendeeSearch.clear = $('.js-clear-attendee-search');
		this.attendeeSearch.form = $('.js-attendee-search');
		this.attendeeSearch.input = $('.js-attendee-search-typeahead');
		this.attendeeSelectedViewLink = $('.js-status-Selected');
		this.attendeeStatusChanger = $('.js-change-status');
		this.pager = $('.js-pager-simple');
		this.pager.label = $('.js-page-selector');
		this.pager.list = $('.js-pages');
		this.pager.next = $('.js-next-page');
		this.pager.page = $('.js-page');
		this.pager.prev = $('.js-prev-page');
		this.printer = $('.js-print');
		this.statusFilter = $('.js-attendees-filter li.js-attendee-status');
		this.contentContainer = $('.js-attendee-rows');
		this.checkAll = $('.js-check-all');
		
		// BUILD PARTICIPANT DOM STRUCTURE
		this.loadRegistrants();
		
		//BIND TO PAGE ELEMENTS
		this.attendeeRemover.click(function() {
			participants.removeAttendees();
		});
		
		this.attendeeSearch['clear'].click(function() {
			// SHOW ALL ATTENDESS
			participants.pageData.nStatus = 0;
			
			// RELOAD PAGE DATA
			participants.changePage();
			
			// CLEAR FILTER TEXT FIELD AND HIDE THE CLEAR DIV
			participants.attendeeSearch['input'].val('');
			participants.attendeeSearch['clear'].hide();
		});
							
		this.attendeeSearch['input'].keyup(function() {
			var input = $(this);
			var statusList = participants.attendeeList.statuses['filtered'].attendees;
			
			// DETERMINE IF THE CLEAR FILTER DIV IS SHOWN OR HIDDEN
			if(input.val().length > 0) {
				participants.attendeeSearch.clear.show();
			} else {
				participants.attendeeSearch.clear.hide();
			}
			
			// CLEAR CURRENT FILTER DOM ATTENDEE LIST
			statusList.length = 0;
			
			// CLEAR CURRENT ATTENDEE HTML LIST
			participants.contentContainer.html('');
			
			// DETERMINE IF SEARCH FILTER IS BLANK
			if(input.val().length > 0) {
				// LOOP OVER ATTENDEES
				$.each(participants.attendeeList['attendees'], function(i, item) {
					// SEE IF THE FIRST OR LAST NAME STARTS WITH THE SEARCH VALUE AND THAT TEHY ARE NOT ALREADY IN THE FILTER STATUS LIST
					if((item.FIRSTNAME.startsWith(input.val()) || item.LASTNAME.startsWith(input.val())) && !$.ListFind(statusList, item.ATTENDEEID)) {
						statusList.push(item.ATTENDEEID);
					}
				});
				
				// SET CURRENT STATUS TO FILTERED
				participants.pageData.nStatus = 'filtered';
				
				// UPDATE PAGINATOR AND RELOAD HTML
				participants.updatePaginator();
				participants.changePage();
			}
		});
		
		// VIEW CHECKMARKED ATTENDEES FILTER LINK
		this.attendeeSelectedViewLink.click(function() {
			participants.viewSelectedRows();
		});
		
		this.attendeeStatusChanger.click(function() {
			participants.updateAttendeeStatuses();
		});
		
		this.checkAll.live('click', function() {
			var checkAll = false;
			
			if($(this).attr('checked')) {
				checkAll = true;
			}
			
			participants.selectAllAttendees({
				checkStatus: checkAll
			});
		});
		
		this.pager['next'].click(function() {
			if(participants.pageData.nPageNo+1 <= participants.pageData.totalPages) {
				participants.pageData.nPageNo += 1
											  
				participants.changePage();
			}
		});
		
		this.pager['prev'].click(function() {
			if(participants.pageData.nPageNo-1 >= 1) {
				participants.pageData.nPageNo -= 1
											  
				participants.changePage();
			}
		});
		
		this.pager['page'].live('click', function() {
			participants.pageData.nPageNo = $(this).text();
			
			participants.changePage();
		});
		
		this.printer.click(function() {
			participants.printDocument();
		});
		
		this.attendeeSearch.click(function(e) {
			return false;
		});
		
		this.statusFilter.click(function() {
			// UPDATE THE CURRENT STATUS
			participants.pageData.nStatus = this.id.replace('status','');
			
			participants.changeActiveAttendeeStatus();
		});
	},
	
	activity: [],
	
	attendeeList: [],
	
	changePage: function() {
		var attendeeList = this.attendeeList.statuses[this.pageData.nStatus].attendees;
		var attendeePlaceholder = this.contentContainer;
		var checkAll = this.checkAll;
		var attendeesToLoad = this.pageData.rowsPerPage*this.pageData.nPageNo;
		
		if(this.pageData.nPageNo >= 1 && this.pageData.nPageNo <= this.pageData.totalPages) {
			// DETERMINE IF PAGER BUTTONS NEED DISABLED
			if(this.pageData.nPageNo < this.pageData.totalPages) {
				this.pager['next'].removeClass('disabled');
			} else {
				this.pager['next'].addClass('disabled');
			}
			if(this.pageData.nPageNo > 1) {
				this.pager['prev'].removeClass('disabled');
			} else {
				this.pager['prev'].addClass('disabled');
			}
		
			// UPDATE SIMPLE PAGER DROPDOWN LABEL
			this.pager['label'].text(this.pageData.nPageNo);
			
			// UPDATE COOKIE FOR CURRENT ACTIVITY PAGE NUMBER
			$.post("/UserSettings/setAttendeePage", { ActivityID: this.activity.nActivity, Page: this.pageData.nPageNo });
			
			// UPDATE STATUS FILTER TEXT LABEL
			$('.js-attendee-status-title').text(this.attendeeList.statuses[this.pageData.nStatus].name);
			
			// CLEAR THE OLD ATTENDEE LIST
			$('.js-all-attendee').detach('');
			
			// LOAD ATTENDEE DATA
			for(var i = attendeesToLoad-this.pageData.rowsPerPage; i < attendeesToLoad; i++) {
				// PREVENT ANY BAD DATA FROM BEING ADDED TO THE DOM
				if(typeof attendeeList[i] != 'undefined') {
					var attendee = this.pageData.rows[attendeeList[i]];
					
					if(typeof attendee != 'undefined') {
						attendee['row'].appendTo(attendeePlaceholder);
					}
					
					// PROVIDE PARTICIPANT ROW FUNCTIONALITY
					//attendee = new ccpd.activity_participants.participant({ $elem: attendee['row'] });
				}
			}
			
			// DETERMINE IF ALL OF THE CURRENT ATTENDEES ARE SELECTED
			if($('.js-selected-checkbox').filter(':checked').length == 15) {
				// MARK THE CHECKALL CHECKBOX CHECKED
				checkAll.attr('checked', true);
			} else {
				// UNCHECK THE CHECKALL CHECKBOX
				checkAll.attr('checked', false);
			}
		} else {
			// UPDATE STATUS FILTER TEXT LABEL
			$('.js-attendee-status-title').text(this.attendeeList.statuses[this.pageData.nStatus].name);
		}
	},
	
	// CHANGES WHICH ATTENDEES ARE SHOWN BASED ON THEIR STATUS
	changeActiveAttendeeStatus: function() {
		var statusLink = $(this).find('a');
		var countContainer = $(this).find('span');
		var participants = this;
		
		this.contentContainer.html('');
		
		// UPDATE THE ATTENDEE STATUS COOKIE FOR CURRENT ACTIVITY
		$.ajax({
			url: "/UserSettings/setAttendeeStatus", 
			type: 'post',
			data: { ActivityID: this.activity.nActivity, status: this.pageData.nStatus },
			success: function(data) {
				participants.pageData.nPageNo = 1;
				
				participants.updatePaginator();
				
				participants.changePage();
			}
		});
	},
	
	cleanStatusArrays: function(params) {
		// LOOP OVER EACH ATTENDEE STATUS TYPE ARRAY (CONTAINS ATTENDEE IDs)
		$.each(this.pageData.totalAttendeeList['statuses'], function(i, list) {
			var attendeeFound = $.inArray(params.id, list['attendees']);
			
			// REMOVE ATTENDEE REFERENCE IS FOUND IN ATTENDEE STATUS LISTS
			if(attendeeFound > -1) {
				list['attendees'].splice(attendeeFound, 1);
			}
		});
	},
	
	getParticipants: function() {
		var attendeesList = this.attendeeList;
		var participants = this;
		
		$.ajax({
			url: '/activity_participants/loadData',
			type: 'post',
			data: { key: this.activity.nActivity },
			dataType: 'json',
			async: true,
			success: function(data) {
				attendeesList.attendees = data.DATASET;
				participants.pageData.rows = data.PAYLOAD;
				
				$.each(participants.pageData.rows, function(i, item) {
					this.data['completeDate'] = formatDate(this.data['completeDate']);
					this.data['created'] = formatDate(this.data['created']);
					this.data['currStatusDate'] = formatDate(this.data['currStatusDate']);
					this.data['registerDate'] = formatDate(this.data['registerDate']);
					this.data['startDate'] = formatDate(this.data['startDate']);
					this.data['termDate'] = formatDate(this.data['termDate']);
					this.data['updated'] = formatDate(this.data['updated']);
				});
				
				// FORMATS THE DATE AND RETURNS IT AS MM/DD/YYYY
				function formatDate(date) {
					var dateSplit = date.split('T')[0].split('-');
					var dateParts = {
						'year': dateSplit[0],
						'month': dateSplit[1],
						'day': dateSplit[2]
					};
					
					return dateParts['month'] + '/' + dateParts['day'] + '/' + dateParts['year'];
				}
				
				$('body').trigger('data_loaded');
			}
		});
	},
	
	loadRegistrants: function() {
		var page;
		var participants = this;
		var status;
		var attendeesList = this.attendeeList;
		var attendeesStatusList;
		
		$('body').on('data_loaded', function() {
			// CREATE THE STATUS ARRAY
			attendeesStatusList = participants.attendeeList['statuses'] = { 
																0: { 'name': 'All', 'attendees': [] }, 
																1: { 'name': 'Complete', 'attendees': [] }, 
																2: { 'name': 'In Progress', 'attendees': [] }, 
																3: { 'name': 'Registered', 'attendees': [] }, 
																4: { 'name': 'Failed', 'attendees': [] }, 
																'selected': { 'name': 'Selected', 'attendees': [] },
																'filtered': { 'name': 'Filtered', 'attendees': [] } };
			
			// CREATE EACH PARTICIPANT ROW
			$.each(participants.pageData.rows, function(id, item) {
				var data = item.data;
				
				// ADD ATTENDEE TO THE 'ALL ATTENDEES' LIST
				attendeesStatusList[0]['attendees'].push(id);
				
				// ADD ATTENDEE TO THEIR ATTENDEE STATUS LIST
				attendeesStatusList[data.statusId]['attendees'].push(id);
				
				// SET STATUS BOOLEAN FOR TEMPLATE PURPOSES
				data['isStatus' + data.statusId] = true;
				
				// PROVIDE PARTICIPANT ROW LOGIC TO CURRENT ATTENDEE
				ccpd.tier3.rows[id] = new ccpd.activity_participants.participant({ data: data });
			});
															
			// UPDATE ATTENDEE STATUS FILTER COUNTS
			participants.updateFilterCounts();
			
			// UPDATE THE PAGINATION FEATURE TO MATCH THE TOTAL PAGES FOR CURRENT ATTENDEE LIST STATUS
			participants.updatePaginator();
			
			// UPDATE VIEWABLE ATTENDEE ROWS
			participants.changePage();
		});
		
		this.getParticipants();
	},
	
	pageData: [],
	
	printDocument: function() {
		var task = this.id.split('-')[1];
		
		switch(task) {
			case 'cme':
				// DETERMINE IF THERE ARE ATTENDEES SELECTED
				if(SelectedAttendees.length > 0) {			
					window.open("/report/CMECert?ActivityID=" + nActivity + "&ReportID=5&selectedAttendees=" + SelectedAttendees);
				} else {
					window.open("/report/CMECert?ActivityID=" + nActivity + "&ReportID=5");
				}
				break;
			
			case 'cne':
				// DETERMINE IF THERE ARE ATTENDEES SELECTED
				if(SelectedAttendees.length > 0) {			
					window.open("/report/CNECert?ActivityID=" + nActivity + "&ReportID=6&selectedAttendees=" + SelectedAttendees);
				} else {
					window.open("/report/CNECert?ActivityID=" + nActivity + "&ReportID=6");
				}
				break;
		}
	},
	
	removeAttendees: function() {
		var participants = this;
		
		// DETERMINE IF THERE ARE ATTENDEES SELECTED
		if(this.pageData.selectedRows.length > 0) {
			// DETERMINE IF THE USER MEANS TO REMOVE SELECTED ATTENDEES
			if(confirm("Are you sure you want to remove the checked attendees from this activity?")) {
				$.ajax({
					url: '/AJAX_adm_Activity/removeCheckedAttendees', 
					type: 'post',
					data: { AttendeeList: this.pageData.selectedRows, ActivityID: participants.activity.nActivity },
					dataType: 'json',
					success: function(data) {
						if(data.STATUS) {
							addMessage(data.STATUSMSG,250,6000,4000);
							
							// LOOP OVER SELECTED ATTENDEE IDs
							$.each(ccpd.tier3.totalAttendeeList.statuses['selected'].attendees, function(i, item) {
								var attendeeId = item;
								
								// REMOVE CURRENT ATTENDEEID FROM STATUS LISTS
								participants.cleanStatusArrays({
									'id': attendeeId
								});
								
								// REMOVE CURRENT ATTENDEE DOM OBJECT
								participants.pageData.rows[attendeeId].removeAttendee();
							});
								   
							participants.pageData.selectedCount = 0;
							participants.pageData.selectedRows = '';
							$('.js-attendee-status-selected-count').text(0);
							$("#CheckedCount").html("(0)");
							
							participants.changePage();
						} else {
							addError(data.STATUSMSG,250,6000,4000);
						}
					}
				});
			}
		} else {
			addError('You must select attendees to remove.',500,3000,2500);
		}
	},
	
	selectAllAttendees: function(params) {
		var participants = this;
		var selectAll = params.checkStatus;
		var attendeeList = this.attendeeList.statuses[this.pageData.nStatus].attendees;
		var attendeesToSelect = this.pageData.rowsPerPage*this.pageData.nPageNo;
		
		// LOOP OVER CURRENTLY VIEWABLE ATTENDEES
		for(var i = attendeesToSelect-15; i < attendeesToSelect; i++) {
			var participant = this.pageData.rows[attendeeList[i]];
			var row = participant.row;
			var checkBox = participant.checkBox;
			
			// DETERMINE IF THE DATA IS UNDEFINED
			if(typeof participant.id == 'string') {
				if(selectAll && !checkBox.is(':checked')) {
					// ADD CURRENT MEMBER TO SELECTEDMEMBERS LIST
					participant.addSelectedRow({
						person: participant.personId,
						attendee: participant.id
					});
					
					checkBox.attr("checked",true);
					
					// CHANGE BACKGROUND COLOR OF PERSONROW
					row.addClass('alert alert-info');
				} else if(!selectAll && checkBox.is(':checked')) {
					// ADD CURRENT MEMBER TO SELECTEDMEMBERS LIST
					participant.removeSelectedRow({
						person: participant.personId,
						attendee: participant.id
					});
					
					checkBox.attr("checked",false);
					
					// CHANGE BACKGROUND COLOR OF PERSONROW
					row.removeClass('alert alert-info');
				}
			}
		}
	},
	
	// UPDATE SELECTED ATTENDEES STATUSID
	updateAttendeeStatuses: function() {
		var participants = this;
		var updateToStatus = this.id.split('-')[2];
		
		$.ajax({
			url: "/AJAX_adm_Activity/updateAttendeeStatuses",
			type: 'post',
			data: { AttendeeList: this.pageData.selectedRows, ActivityID: this.activity.nActivity, StatusID: updateToStatus },
			dataType: 'json',
			success: function(data)  {
				if(data.STATUS) {
					addMessage(data.STATUSMSG,500,6000,4000);
					updateStats();
					clearSelectedMembers();
					
					participants.changePage();
				} else {
					addError(data.STATUSMSG,500,6000,4000);
				}
			}
		});
	},

	updateFilterCounts: function() {
		var participants = this;
		
		$.each($('.js-attendees-filter').children(), function(i, item) {
			// DETERMINE IF CURRENT LIST ITEM IS A STATUS ROW
			if($(this).hasClass('js-attendee-status')) {
				var status = this.id.split('status')[1];
				var countContainer = $(this).find('span.js-attendee-status-count');
				
				// PROVIDE STATUS COUNT
				countContainer.html('(' + participants.attendeeList.statuses[status].attendees.length + ')');
			}
		});
	},
	
	updatePaginator: function() {
		this.pageData.totalPages = Math.ceil(this.attendeeList.statuses[this.pageData.nStatus].attendees.length/this.pageData.rowsPerPage);
		
		// CLEAR CURRENT PAGES LIST
		this.pager['list'].children().remove();
		
		// CREATE NEW PAGES LIST
		for(var i=1; i<=this.pageData.totalPages; i++) {
			var pageLink = $('<a />').addClass('js-page').text(i);
			var page = $('<li />').append(pageLink).appendTo(this.pager['list']);
		}
		
		// UPDATE CURRENT PAGE NUMBER
		this.pager['label'].text(this.pageData.nPageNo);
		
		// DETERMINE IF NEXT/PREVIOUS PAGING BUTTONS NEED DISABLED
		if(this.pageData.nPageNo == 1) this.pager['prev'].addClass('disabled');
		if(this.pageData.nPageNo >= this.pageData.totalPages) this.pager['next'].addClass('disabled');
		
		this.pager['page'] = $('.js-page');
	},
	
	viewSelectedRows: function() {
		if(this.attendeeList.statuses['selected'].attendees.length > 0) {
			this.pageData.nPageNo = 1;
			this.pageData.nStatus = 'selected';
			
			this.updatePaginator();
			
			this.changePage()
		} else {
			addError('You must select participants first.',500,6000,4000);
		}
	}
}, {});

$.Class("ccpd.activity_participants.participant",{},{
	init:function(params) {
		this.parent = ccpd.activity_participants;
		this.pageData = ccpd.tier3;
		
		this.domReady(params.data);
	},
	
	addSelectedRow: function() {
		if(!$.ListFind(this.pageData.selectedRows, this.id, ',')) {
			this.pageData.selectedRows = $.ListAppend(this.pageData.selectedRows, this.id, ',');
			ccpd.tier3.totalAttendeeList.statuses['selected'].attendees.push(this.id);
			
			this.updateSelectedCount(1);
		} 
	},
	
	changeAttendeeViewableStatus: function(params) {
		var participant = this;
		
		$.ajax({
			url: "/AJAX_adm_Activity/getAttendeeDate", 
			type: 'post',
			data: { AttendeeId: this.id, type: params.type },
			dataType: 'json',
			success: function(data) {
				if(data.STATUS) {
					$("#current-attendee-date-" + participant.id).val(data.PAYLOAD.month + '/' + data.PAYLOAD.day + '/' + data.PAYLOAD.year);
					$("#current-attendee-status-" + participant.id).val(params.type);
					$("#datefill-" + participant.id).html(data.STATUSMSG);
					$("#editdatelink-" + participant.id).show();
				} else {
					addError('test',500,5000,2500);
				}
			}
		});
				
		// PLACE CHECKMARK BY ACTIVE STATUS
		$('#view-attendee-statuses-' + this.id).find('a .active-status').remove();
		params.elem.prepend('<i class="icon-ok active-status"></i> ');
	},
	
	domReady: function(params) {
		var participant = this;
		
		this.data = params;
		this.row = $(Mustache.render($('#attendee-row').html(), this.data));
		this.attendeeStatusViewChange = this.row.find('.js-view-attendee-statusdate');
		this.checkBox = this.row.find('.js-selected-checkbox');
		this.deleted = false;
		this.fakeAttendeeRemover = this.row.find('.js-delete-link');
		this.id = this.row.find('.attendeeId').val();
		this.personId = this.row.find('.personId').val();
		this.statusDateEditor = this.row.find('.js-edit-status-date');
		
		this.pageData.rows[this.id] = this;
		
		this.attendeeStatusViewChange.click(function() {
			participant.changeAttendeeViewableStatus({
				elem: $(this),
				type: this.id.split('-')[2]
			});
		});
		
		// DETERMINE IF CURRENT ROW NEEDS CHECKED
		if($.ListFind(this.pageData.selectedRows, this.id)) {
			participant.row.addClass('alert alert-info');
			participant.checkBox.attr('checked', true);
		}
		
		this.checkBox.change(function() {
			participant.selectRow();
		});
		
		this.fakeAttendeeRemover.click(function() {
			participant.deleteFakeAttendee();
		});
		
		this.statusDateEditor.click(function() {
			participant.editStatusDate();
		});
		
		this.row.isPerson();
	},
	
	pageData: [],
	parent: [],
	
	deleteFakeAttendee: function() {
		var participant = this;
		
		$.ajax({
			type:'post',
			dataType:'json',
			url:'/ajax_adm_activity/removeAttendeeByID',
			data:{
				'attendeeId': participant.id
			},
			async:false,
			success:function(data) {
				if(data.STATUS) {
					participant.row.remove();
				}
			}
		});
	},
	
	editStatusDate: function() {
		var participant = this;
		var $currAttendeeStatus = $("#current-attendee-status-" + participant.id);
		var currDateContainer = $("#CurrStatusDate-" + participant.id);
		var dtCurrDate = $.Trim($("#current-attendee-date-" + participant.id).val());
		var dtStatusMask;
		var sDate = dtCurrDate.split(' ')[0];
		var $cancelEdit = $('#CancelDate-' + participant.id);
		var $editStatusDate = $("#edit-attendee-date-" + participant.id);
		var $saveEdit = $('#SaveDate-' + participant.id);
		var $viewStatusDate = $("#view-attendee-date-" + participant.id);
		var $inputEdit = $('#EditDateField-' + participant.id);
		
		// SET CURRENT STATUS DATE VALUE IN HTML ELEMENTS
		currDateContainer.val(dtCurrDate);
		$inputEdit.val(dtCurrDate);
		
		// SHOW EDIT FORM
		$viewStatusDate.hide();
		$editStatusDate.show();
		
		$cancelEdit.click(function() {
			$editStatusDate.hide();
			$viewStatusDate.show();
			
			$cancelEdit.unbind();
			$editStatusDate.unbind();
			$saveEdit.unbind();
			$viewStatusDate.unbind();
		});
	
		$inputEdit.keydown(function(e) {
			// UPDATE THE JS VAR THAT WILL REFILL THIS
			if($.Len($(this).val()) > 0) {
				dtStatusMask = $(this).val();
			}
			
			// DETERMINE IF KEY PRESSED WAS THE ENTER KEY
			if(e.keyCode == 13) {
				saveStatusDate($inputEdit.val(), $currAttendeeStatus.val());
			}
		});
		
		$saveEdit.click(function() {
			saveStatusDate($inputEdit.val(), $currAttendeeStatus.val());
		});
		
		// SAVE FUNCTION
		function saveStatusDate(dtDate, nType) {
			// DETERMINE THERE IS A STATUS AND A DATE
			if(nType != "" && dtDate.length > 0) {
				$.ajax({
					url: '/AJAX_adm_Activity/saveAttendeeDate', 
					type: 'post',
					data: { attendeeId: participant.id, DateValue: dtDate, Type: nType },
					dataType: 'json',
					success: function(data) {
						if(data.STATUS) {
							addMessage(data.STATUSMSG,250,6000,4000);
							participant.parent.changePage();
						} else {
							addError(data.STATUSMSG,250,6000,4000);
							
							$editStatusDate.hide();
							$viewStatusDate.show();
						}
					}
				});
			} else {
				addError('You must provide full date and time.',250,6000,4000);
				$inputEdit.focus();
				$inputEdit.val(dtStatusMask);
			}
		}
	},
	
	removeAttendee: function() {
		$(this).remove();
		$(this).unbind();
		
		// REMOVE ATTENDEE FROM DOM
		delete this;
	},
	
	removeSelectedRow: function() {
		var attendeeList = this.pageData.totalAttendeeList;
		this.pageData.selectedRows = $.ListDeleteAt(this.pageData.selectedRows, $.ListFind(this.pageData.selectedRows, this.id));
		
		attendeeList.statuses['selected'].attendees.splice($.inArray(this.id, attendeeList.statuses['selected'].attendees), 1);
		
		this.updateSelectedCount(-1);
	}, 
	
	selectRow: function() {
		if(this.checkBox.attr('checked')) {
			this.row.addClass('alert alert-info');
			
			// ADD CURRENT MEMBER TO SELECTEDROWS LIST
			this.addSelectedRow();
		} else {
			this.row.removeClass('alert alert-info');
			
			// REMOVE CURRENT MEMBER FROM SELECTEDROWS LIST
			this.removeSelectedRow();
		}
	},
	
	updateSelectedCount: function(val) {
		this.pageData.selectedCount += val;
		
		if(this.pageData.selectedCount > 0) {
			$(".js-partic-actions .btn").removeClass('disabled');
		} else {
			$(".js-partic-actions .btn").addClass('disabled');
		}
		$(".js-attendee-status-selected-count").text(this.pageData.selectedCount);
	}
}, {});


(function(){
})();