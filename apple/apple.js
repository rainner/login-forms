/**
 * login form scripts.
 */
(function() {
  const $form = $( '.apple-form' );

  // get sanitized input values from form
  const getFormData = ( _form ) => {
    const username = _form ? String( _form._username.value || '' ).trim() : '';
    const password = _form ? String( _form._password.value || '' ).trim() : '';
    return { username, password };
  };

  // make input placeholders stay out of the way when filled
  $( 'input', $form ).on( 'blur', function( e ) {
    const _val = String( this.value || '' ).trim();
    if ( _val ) return $( this ).addClass( 'filled' );
    return $( this ).removeClass( 'filled' );
  }).trigger( 'blur' );

  // on form submit...
  $form.on( 'submit', function( e ) {
    const { username, password } = getFormData( this );

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

})();
