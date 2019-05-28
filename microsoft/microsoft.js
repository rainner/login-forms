/**
 * login form scripts.
 */
(function() {
  const $form      = $( '.microsoft-form' );
  const $welcome   = $( '.microsoft-welcome', $form );
  const $email     = $( '.microsoft-email', $form );
  const $password  = $( '.microsoft-password', $form );
  if ( !$form.length ) return;

  // switch form state when email is present
  const switchState = function( email='' ) {
    if ( email ) {
      $( 'span', $welcome ).text( email );
      $welcome.addClass( 'visible' );
      $email.addClass( 'hidden' );
      $password.removeClass( 'hidden' );
    } else {
      $form.trigger( 'reset' );
      $( 'input', $form ).trigger( 'blur' );
      $( 'span', $welcome ).empty();
      $welcome.removeClass( 'visible' );
      $email.removeClass( 'hidden' );
      $password.addClass( 'hidden' );
    }
  }

  // reset form when selected email is clicked
  $( 'button', $welcome ).on( 'click', function() {
    switchState();
  });

  // ignore form submit until later
  $form.on( 'submit', function( e ) {
    e.preventDefault();
    const _email = String( this._email.value || '' ).trim();
    const _password = String( this._password.value || '' ).trim();
    switchState( _email );

    // check for email
    if ( !_email ) {
      this._email.focus();
      return false;
    }
    // check for password
    if ( !_password ) {
      this._password.focus();
      return false;
    }
    // form ready to be processed
    console.log( _email, _password );
    window.location.assign( this.action || '#' );
    return true;
  });

  // reset inputs
  switchState();

})();
