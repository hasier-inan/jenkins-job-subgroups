function displayGroup(className) {
    document.querySelectorAll("#projectstatus tr[id^='job_']").forEach(function (job) {
        job.classList.contains(className) ? job.style.display = 'table-row' : job.style.display = 'none';
    });
    document.querySelectorAll(".subgroup-tab").forEach(function (tab) {
        tab.classList.contains(className) ? tab.classList.add('active') : tab.classList.remove('active');
    });
}

var groups = {};
document.querySelectorAll("#projectstatus tr[id^='job_']").forEach(function (row) {
    var groupTabPrefix = "tab_";
    var group = 'Other';
    if (/\((.*?)\)/.test(row.id)) {
        group = /\((.*?)\)/.exec(row.id)[1];
    }
    row.classList.add(groupTabPrefix + group.replace(/ /g, "_"));
    row.classList.add('grouped-row');
    row.querySelector(".model-link").textContent = row.querySelector(".model-link").textContent.replace(/\((.*?)\)/, "");
    groups[(groupTabPrefix + group.replace(/ /g, "_"))] = group;
});

var table = document.querySelectorAll("#projectstatus");
Object.keys(groups).map(function (groupName) {
    var groupElement = document.createElement("span");
    groupElement.classList.add("subgroup-tab");
    groupElement.classList.add(groupName);
    groupElement.innerHTML = groups[groupName];
    groupElement.addEventListener("click", function () {
        displayGroup(groupName);
    }, false);
    table[0].parentNode.insertBefore(groupElement, table[0]);
});

document.querySelectorAll(".subgroup-tab")[0].click();