// Set Operations status
(function () {
  var classByStatus = {
    operational: 'status-active',
    degraded_performance: 'status-away',
    partial_outage: 'status-away has-sign',
    major_outage: 'status-busy'
  };
  var sp = new StatusPage.page({ page : 'rmcp9k87gctd' });
  sp.components({
    success: function(data) {
      const eid_list_id = 'kb5rdx4qskc1';
      const addons_list_id = '5gcvrf1gckpp';
      const core_id ='z9tsg5vbfvw1';
      data.components.forEach(component => {
        if(component.group || component.group_id == null) {  // top level
          let anchor = document.getElementById(component.id);
          setStatus(component, anchor);
        }
        else {
          let parent = document.getElementById(component.group_id + '-content');
          if (!parent) return;
          let li = document.createElement('li');
          let anchor = document.createElement('a');
          anchor.classList.add('status');
          setStatus(component, anchor);
          anchor.appendChild(document.createTextNode(component.name));
          li.appendChild(anchor);
          parent.appendChild(li);
        }

        function setStatus(component, anchor) {
          anchor.href = component.href || "https://status.criipto.com";
          anchor.target = '_blank';
          let classesToAdd = classByStatus[component.status];
          classesToAdd.split(' ').forEach(function (classToAdd) {
            if (classToAdd.length > 0 && !anchor.classList.contains(classToAdd)) {
              anchor.classList.add(classToAdd);
            }
          });
        }
      });

      var operationalComponents = data.components.filter(component => component.status === 'operational');
      var majorOutageComponents = data.components.filter(component => component.status === 'major_outage');
      if (operationalComponents.length === data.components.length) {
        if (!document.getElementById('header-status').classList.contains(classByStatus.operational)) {
          document.getElementById('header-status').classList.add(classByStatus.operational);
        }
        if (!document.getElementById('footer-status').classList.contains(classByStatus.operational)) {
          document.getElementById('footer-status').classList.add(classByStatus.operational);
        }
      } else if (majorOutageComponents.length === data.components.length) {
        if (!document.getElementById('header-status').classList.contains(classByStatus.major_outage)) {
          document.getElementById('header-status').classList.add(classByStatus.major_outage);
        }
        if (!document.getElementById('footer-status').classList.contains(classByStatus.major_outage)) {
          document.getElementById('footer-status').classList.add(classByStatus.major_outage);
        }
      } else {
        if (!document.getElementById('header-status').classList.contains(classByStatus.degraded_performance)) {
          document.getElementById('header-status').classList.add(classByStatus.degraded_performance);
        }
        if (!document.getElementById('footer-status').classList.contains(classByStatus.degraded_performance)) {
          document.getElementById('footer-status').classList.add(classByStatus.degraded_performance);
        }
      }
    }
  })
})();

