function displayGroup(className){
	document.querySelectorAll("#projectstatus tr[id^='job_']").forEach(function(job){
		job.classList.contains(className) ? job.style.display = 'table-row' : job.style.display = 'none';		
	});
	document.querySelectorAll(".subgroup-tab").forEach(function(tab){
		tab.classList.contains(className) ? tab.classList.add('active') : tab.classList.remove('active');		
	});
}
	
var rows = document.querySelectorAll("#projectstatus tr[id^='job_']");
var groups = {};
for (var i = 0; i < rows.length; i++) {
	var groupTabPrefix = "tab_";
	var group = 'Other';
	if(/\[(.*?)\]/.test(rows[i].id)){
		group = /\[(.*?)\]/.exec(rows[i].id)[1];	
	}	
	rows[i].classList.add(groupTabPrefix + group.replace(/ /g,"_"));			
	rows[i].classList.add('grouped-row');			
	groups[(groupTabPrefix + group.replace(/ /g,"_"))] = group;
}	

var table = document.querySelectorAll("#projectstatus");
Object.keys(groups).map(function(groupName) {
	var groupElement = document.createElement("span");
	groupElement.classList.add("subgroup-tab");
	groupElement.classList.add(groupName);
	groupElement.innerHTML=groups[groupName];
	groupElement.addEventListener("click", function(){ displayGroup(groupName);}, false);
	table[0].parentNode.insertBefore(groupElement, table[0]);
});

document.querySelectorAll(".subgroup-tab")[0].click();