// JavaScript for student notifications page

const notifications = [
  {
    id: 1,
    type: 'internship_cycle',
    title: 'New Internship Cycle Starting Soon',
    message: 'The Summer 2024 Internship Cycle will begin in 2 weeks. Get ready to apply for exciting opportunities!',
    date: '2024-05-15',
    isRead: false,
    priority: 'high'
  },
  {
    id: 2,
    type: 'internship_cycle',
    title: 'Internship Cycle Now Open',
    message: 'The Summer 2024 Internship Cycle is now open. You can start applying for internships!',
    date: '2024-06-01',
    isRead: false,
    priority: 'high'
  },
  {
    id: 3,
    type: 'report_status',
    title: 'Internship Report Status Updated',
    message: 'Your internship report for "Software Development Internship at TechCorp" has been approved.',
    date: '2024-04-10',
    isRead: true,
    priority: 'medium'
  },
  {
    id: 4,
    type: 'report_status',
    title: 'Report Feedback Available',
    message: 'Your supervisor has provided feedback on your internship report. Please review the comments.',
    date: '2024-04-08',
    isRead: false,
    priority: 'medium'
  }
];

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function createNotificationElement(notification) {
  const notificationDiv = document.createElement('div');
  notificationDiv.className = `notification-item ${notification.isRead ? 'read' : 'unread'} ${notification.priority}`;
  
  const icon = notification.type === 'internship_cycle' ? 'fa-calendar-alt' : 'fa-file-alt';
  
  notificationDiv.innerHTML = `
    <div class="notification-icon">
      <i class="fas ${icon}"></i>
    </div>
    <div class="notification-content">
      <h3>${notification.title}</h3>
      <p>${notification.message}</p>
      <span class="notification-date">${formatDate(notification.date)}</span>
    </div>
    ${!notification.isRead ? '<div class="notification-badge"></div>' : ''}
  `;
  
  return notificationDiv;
}

function displayNotifications() {
  const notificationsList = document.getElementById('notificationsList');
  notificationsList.innerHTML = '';
  
  if (notifications.length === 0) {
    notificationsList.innerHTML = '<p class="no-notifications">No notifications available.</p>';
    return;
  }
  
  notifications.forEach(notification => {
    const notificationElement = createNotificationElement(notification);
    notificationsList.appendChild(notificationElement);
  });
}

window.onload = function() {
  displayNotifications();
};
