/**
 * login form scripts.
 */
(function() {
  const $form      = $( '.microsoft-form' );
  const $welcome   = $( '.microsoft-welcome', $form );
  const $username  = $( '.microsoft-username', $form );
  const $password  = $( '.microsoft-password', $form );

  // get sanitized input values from form
  const getFormData = ( _form ) => {
    const username = _form ? String( _form._username.value || '' ).trim() : '';
    const password = _form ? String( _form._password.value || '' ).trim() : '';
    return { username, password };
  };

  // switch form state when username is present
  const switchState = function( _username ) {
    if ( _username ) {
      $( 'span', $welcome ).text( _username );
      $welcome.addClass( 'visible' );
      $username.addClass( 'hidden' );
      $password.removeClass( 'hidden' );
    } else {
      $form.trigger( 'reset' );
      $( 'input', $form ).trigger( 'blur' );
      $( 'span', $welcome ).empty();
      $welcome.removeClass( 'visible' );
      $username.removeClass( 'hidden' );
      $password.addClass( 'hidden' );
    }
  }

  // reset form when selected username is clicked
  $( 'button', $welcome ).on( 'click', function() {
    switchState();
  });

  // on form submit...
  $form.on( 'submit', function( e ) {
    const { username, password } = getFormData( this );
    switchState( username );

    // check for username
    if ( !username ) {
      e.preventDefault();
      this._username.focus();
      return false;
    }
    // check for password
    if ( !password ) {
      e.preventDefault();
      this._password.focus();
      return false;
    }
    // form ready to be processed
    return true;
  });

  // reset inputs
  switchState();

})();
