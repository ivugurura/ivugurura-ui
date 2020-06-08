import React from 'react';

export const TempNotifications = () => {
  return (
    <>
      <li class='nav-item dropdown'>
        <a
          id='notifications'
          rel='nofollow'
          data-target='#'
          href='#'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
          class='nav-link'
        >
          <i class='fa fa-bell-o'></i>
          <span class='badge bg-red badge-corner'>12</span>
        </a>
        <ul aria-labelledby='notifications' class='dropdown-menu'>
          <li>
            <a rel='nofollow' href='#' class='dropdown-item'>
              <div class='notification'>
                <div class='notification-content'>
                  <i class='fa fa-envelope bg-green'></i>You have 6 new messages
                </div>
                <div class='notification-time'>
                  <small>4 minutes ago</small>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a rel='nofollow' href='#' class='dropdown-item'>
              <div class='notification'>
                <div class='notification-content'>
                  <i class='fa fa-twitter bg-blue'></i>You have 2 followers
                </div>
                <div class='notification-time'>
                  <small>4 minutes ago</small>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a rel='nofollow' href='#' class='dropdown-item'>
              <div class='notification'>
                <div class='notification-content'>
                  <i class='fa fa-upload bg-orange'></i>Server Rebooted
                </div>
                <div class='notification-time'>
                  <small>4 minutes ago</small>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a rel='nofollow' href='#' class='dropdown-item'>
              <div class='notification'>
                <div class='notification-content'>
                  <i class='fa fa-twitter bg-blue'></i>You have 2 followers
                </div>
                <div class='notification-time'>
                  <small>10 minutes ago</small>
                </div>
              </div>
            </a>
          </li>
          <li>
            <a
              rel='nofollow'
              href='#'
              class='dropdown-item all-notifications text-center'
            >
              <strong>view all notifications </strong>
            </a>
          </li>
        </ul>
      </li>
      <li class='nav-item dropdown'>
        <a
          id='messages'
          rel='nofollow'
          data-target='#'
          href='#'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
          class='nav-link'
        >
          <i class='fa fa-envelope-o'></i>
          <span class='badge bg-orange badge-corner'>10</span>
        </a>
        <ul aria-labelledby='notifications' class='dropdown-menu'>
          <li>
            <a rel='nofollow' href='#' class='dropdown-item d-flex'>
              <div class='msg-profile'>
                <img
                  src='img/avatar-1.jpg'
                  alt='...'
                  class='img-fluid rounded-circle'
                />
              </div>
              <div class='msg-body'>
                <h3 class='h5'>Jason Doe</h3>
                <span>Sent You Message</span>
              </div>
            </a>
          </li>
          <li>
            <a rel='nofollow' href='#' class='dropdown-item d-flex'>
              <div class='msg-profile'>
                <img
                  src='img/avatar-2.jpg'
                  alt='...'
                  class='img-fluid rounded-circle'
                />
              </div>
              <div class='msg-body'>
                <h3 class='h5'>Frank Williams</h3>
                <span>Sent You Message</span>
              </div>
            </a>
          </li>
          <li>
            <a rel='nofollow' href='#' class='dropdown-item d-flex'>
              <div class='msg-profile'>
                <img
                  src='img/avatar-3.jpg'
                  alt='...'
                  class='img-fluid rounded-circle'
                />
              </div>
              <div class='msg-body'>
                <h3 class='h5'>Ashley Wood</h3>
                <span>Sent You Message</span>
              </div>
            </a>
          </li>
          <li>
            <a
              rel='nofollow'
              href='#'
              class='dropdown-item all-notifications text-center'
            >
              <strong>Read all messages </strong>
            </a>
          </li>
        </ul>
      </li>
    </>
  );
};
