/**
 * login form scripts.
 */
(function() {
  const $form      = $( '.google-form' );
  const $heading   = $( '.google-heading', $form );
  const $welcome   = $( '.google-welcome', $form );
  const $username  = $( '.google-username', $form );
  const $password  = $( '.google-password', $form );

  // get sanitized input values from form
  const getFormData = ( _form ) => {
    const username = _form ? String( _form._username.value || '' ).trim() : '';
    const password = _form ? String( _form._password.value || '' ).trim() : '';
    return { username, password };
  };

  // switch form state when username is present
  const switchState = ( _username ) => {
    if ( _username ) {
      $( 'span', $welcome ).text( _username );
      $welcome.removeClass( 'hidden' );
      $heading.addClass( 'hidden' );
      $username.addClass( 'hidden' );
      $password.removeClass( 'hidden' );
    } else {
      $form.trigger( 'reset' );
      $( 'input', $form ).trigger( 'blur' );
      $( 'span', $welcome ).empty();
      $welcome.addClass( 'hidden' );
      $heading.removeClass( 'hidden' );
      $username.removeClass( 'hidden' );
      $password.addClass( 'hidden' );
    }
  }

  // make input placeholders stay out of the way when filled
  $( 'input', $form ).on( 'blur', function( e ) {
    const _val = String( this.value || '' ).trim();
    if ( _val ) return $( this ).addClass( 'filled' );
    return $( this ).removeClass( 'filled' );
  }).trigger( 'blur' );

  // reset form when selected username is clicked
  $( 'div', $welcome ).on( 'click', function( e ) {
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

  // language selector
  $( '.google-footer select' ).on( 'change', function( e ) {
    window.location.assign( `google-${this.value}.html` );
  });

  // reset inputs
  switchState();

})();
