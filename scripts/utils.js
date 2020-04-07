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
      data.components.forEach(component => {
        var element = document.getElementById(component.id);
        if(!element.classList.contains(classByStatus[component.status])) {
          element.classList.add(classByStatus[component.status]);
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

function isValidEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function onSubscribe() {
  var email = document.getElementById("subscribe-email").value;
  var messageElement = document.getElementById("subscription-message");

  if(isValidEmail(email)) {
    $.post("/subscribe?email=" + email, data => {
      if(data.success) {
        messageElement.className = "success-message";
        messageElement.innerHTML = "You have successfully subscribed.";
      } else {
        messageElement.className = "error-message";
        messageElement.innerHTML = "There was an error. Pleas try again.";
      }
    }).fail(() => {
      messageElement.className = "error-message";
      messageElement.innerHTML = "There was an error. Pleas try again.";
    });
  } else {
    messageElement.className = "error-message";
    messageElement.innerHTML = "Email is not valid.";
  }
}
