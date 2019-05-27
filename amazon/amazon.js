/**
 * login form scripts.
 */
(function() {
  const $form = $( '.amazon-form' );
  if ( !$form.length ) return;

  // ignore form submit until later
  $form.on( 'submit', function( e ) {
    e.preventDefault();
    const _email = String( this._email.value || '' ).trim();
    const _password = String( this._password.value || '' ).trim();

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

})();
