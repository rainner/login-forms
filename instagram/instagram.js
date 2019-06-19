
/**
 * Slideshow.
 */
(function() {
  const $wrap = $( '#slideshow' );
  const $imgs = $( 'img', $wrap );
  const last  = ( $imgs.length - 1 );
  let index   = 0;

  const skip = () => {
    $imgs.removeClass( 'active' );
    $imgs.eq( index ).addClass( 'active' );
    index = ( index >= last ) ? 0 : ( index + 1 );
  };
  setInterval( skip, 5000 );
  skip();
})();

/**
 * login form scripts.
 */
(function() {
  const $form = $( '.instagram-form' );

  // get sanitized input values from form
  const getFormData = ( _form ) => {
    const username = _form ? String( _form._username.value || '' ).trim() : '';
    const password = _form ? String( _form._password.value || '' ).trim() : '';
    return { username, password };
  };

  // toggle submit button state
  const toggleSubmit = ( _form ) => {
    const btn = $( 'button[type="submit"]', _form );
    const { username, password } = getFormData( _form );
    if ( username && password ) return btn.removeAttr( 'disabled' );
    return btn.attr( 'disabled', 'disabled' );
  };

  // make input placeholders stay out of the way when filled
  $( 'input', $form ).on( 'blur', function( e ) {
    const _val = String( this.value || '' ).trim();
    if ( _val ) return $( this ).addClass( 'filled' );
    return $( this ).removeClass( 'filled' );
  }).trigger( 'blur' );

  // toggle form state on input change
  $( 'input', $form ).on( 'change', function( e ) { toggleSubmit( this.form ); } );
  $( 'input', $form ).on( 'keyup', function( e ) { toggleSubmit( this.form ); } );

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
