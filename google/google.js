/**
 * Google login form scripts.
 */
(function() {
  const $form      = $( '.google-form' );
  const $heading   = $( '.google-heading', $form );
  const $welcome   = $( '.google-welcome', $form );
  const $email     = $( '.google-email', $form );
  const $password  = $( '.google-password', $form );
  if ( !$form.length ) return;

  // switch form state when email is present
  const switchState = function( email='' ) {
    if ( email ) {
      $( 'span', $welcome ).text( email );
      $welcome.removeClass( 'hidden' );
      $heading.addClass( 'hidden' );
      $email.addClass( 'hidden' );
      $password.removeClass( 'hidden' );
    } else {
      $form.trigger( 'reset' );
      $( 'input', $form ).trigger( 'blur' );
      $( 'span', $welcome ).empty();
      $welcome.addClass( 'hidden' );
      $heading.removeClass( 'hidden' );
      $email.removeClass( 'hidden' );
      $password.addClass( 'hidden' );
    }
  }

  // reset form when selected email is clicked
  $( 'div', $welcome ).on( 'click', function() {
    switchState();
  });

  // make input placeholders stay out of the way when filled
  $( 'input', $form ).on( 'blur', function( e ) {
    const _val = String( this.value || '' ).trim();
    if ( _val ) { $( this ).addClass( 'filled' ); }
    else { $( this ).removeClass( 'filled' ); }
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

  // language selector
  $( '.google-footer select' ).on( 'change', function( e ) {
    switch( this.value ) {
      case 'en': return window.location.assign( 'google-en.html' );
      case 'ar': return window.location.assign( 'google-ar.html' );
    }
  });

  // reset inputs
  switchState();

})();
