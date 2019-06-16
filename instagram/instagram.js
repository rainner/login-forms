
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
  if ( !$form.length ) return;

  // get sanitized input values from form
  const getInputValues = ( _form ) => {
    const username = _form ? String( _form._username.value || '' ).trim() : '';
    const password = _form ? String( _form._password.value || '' ).trim() : '';
    return { username, password };
  };

  // toggle input filled state
  const toggleInput = ( _input ) => {
    const _val = _input ? String( _input.value || '' ).trim() : '';
    if ( _val ) return $( _input ).addClass( 'filled' );
    return $( _input ).removeClass( 'filled' );
  };

  // toggle submit button state
  const toggleSubmit = ( _form ) => {
    const btn = $( 'button[type="submit"]', _form );
    const { username, password } = getInputValues( _form );
    if ( username && password ) return btn.removeAttr( 'disabled' );
    return btn.attr( 'disabled', 'disabled' );
  };

  // toggle form state on input change
  $( 'input', $form ).on( 'blur', function( e ) { toggleInput( this ); } );
  $( 'input', $form ).on( 'change', function( e ) { toggleSubmit( this.form ); } );
  $( 'input', $form ).on( 'keyup', function( e ) { toggleSubmit( this.form ); } );

  // ignore form submit until later
  $form.on( 'submit', function( e ) {
    e.preventDefault();
    const { username, password } = getInputValues( this );

    // check for username
    if ( !username ) {
      this._username.focus();
      return false;
    }
    // check for password
    if ( !password ) {
      this._password.focus();
      return false;
    }
    // form ready to be processed
    console.log( username, password );
    window.location.assign( this.action || '#' );
    return true;
  });

})();
