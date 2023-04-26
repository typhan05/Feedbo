<?php

namespace Feedbo\Page;

use Feedbo\Classes\Captcha;
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Frontend' ) ) {
	class Frontend {
		protected static $instance = null;
		public static function getInstance() {
			if ( null == self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}
		private function __construct() {
			add_shortcode( 'feedbo', array( $this, 'showDashBoard' ) );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueueScripts' ), 20 );
			add_filter( 'login_redirect', array( $this, 'redirectPreviousPage' ), 10, 3 );
			add_action( 'login_enqueue_scripts', array( $this, 'my_custom_login_stylesheet' ) );
			add_filter( 'login_headerurl', array( $this, 'custom_loginlogo_url' ) );

			add_filter( 'wp_head', array( $this, 'wp_head' ) );
			add_action( 'login_head', array( $this, 'wp_head' ) );
			add_action( 'register_form', array( $this, 'add_re_captcha_fields' ) );
			add_filter( 'registration_errors', array( $this, 'custom_registration_errors' ), 10, 3 );

			add_filter( 'login_footer', array( $this, 'wp_footer' ) );
		}

		public function add_re_captcha_fields() {
			?>
			<input type="hidden" name="recaptcha_response" id="recaptchaResponse">
			<?php
		}

		public function custom_registration_errors( $errors, $sanitized_user_login, $user_email ) {
			if ( ! Captcha::isValid( $_POST['recaptcha_response'] ) ) {
				$errors->add( 'captcha_validation_failed', __( 'Captcha validation failed.', 'feedbo' ) );
			}
			return $errors;
		}
		public function wp_head() {
			?>
			<script src="https://www.google.com/recaptcha/api.js?render=<?php echo MV_RECAPTCHA_KEY; ?>"></script>
			<script type="text/javascript">var mv_recaptcha_key = '<?php echo MV_RECAPTCHA_KEY; ?>';</script>
			<?php
		}
		public function enqueueScripts() {
			$axiosURL = site_url() . '/wp-json';
			wp_dequeue_style( 'twentytwenty-style' );
			wp_deregister_style( 'twentytwenty-style' );
			wp_enqueue_style( 'feedbo_front_end_style', MV_PLUGIN_URL . 'assets/css/feedbo_frontend_style.css', null, true );
			wp_enqueue_style( 'style_main', MV_PLUGIN_URL . 'assets/dist/css/main.css', null, true );
			wp_enqueue_style( 'hide-header-footer', MV_PLUGIN_URL . 'assets/headerfooter.css', null, true );
			wp_enqueue_script( 'js_main', MV_PLUGIN_URL . 'assets/dist/js/main.js', array( 'jquery' ), null, true );
			wp_localize_script(
				'js_main',
				'bigNinjaVoteWpdata',
				array(
					'axiosUrl'       => $axiosURL,
					'pluginUrl'      => MV_PLUGIN_URL,
					'siteUrl'        => site_url(),
					'logoutUrl'      => wp_logout_url(),
					'apiNonce'       => wp_create_nonce( 'wp_rest' ),
					'defineUrlBoard' => MV_URL_BOARD,
				)
			);
			wp_enqueue_media();
		}
		public function my_custom_login_stylesheet() {
			?>
			<script src="https://www.google.com/recaptcha/api.js?render=<?php echo MV_RECAPTCHA_KEY; ?>"></script>
			<script type="text/javascript">
				grecaptcha.ready(function () {
					grecaptcha.execute('<?php echo MV_RECAPTCHA_KEY; ?>', { action: 'submit' }).then(function (token) {
						var recaptchaResponse = document.getElementById('recaptchaResponse');
						recaptchaResponse.value = token;
					});
				});
			</script>
			<?php
			$axiosURL = site_url() . '/wp-json';
			wp_dequeue_style( 'buttons' );
			wp_deregister_style( 'buttons' );
			wp_dequeue_style( 'mo_openid_admin_settings_style' );
			wp_deregister_style( 'mo_openid_admin_settings_style' );
			wp_dequeue_style( 'mo-wp-bootstrap-social' );
			wp_deregister_style( 'mo-wp-bootstrap-social' );
			wp_dequeue_style( 'mo-wp-bootstrap-main' );
			wp_deregister_style( 'mo-wp-bootstrap-main' );
			wp_enqueue_style( 'custom-login', MV_PLUGIN_URL . 'assets/style-login.css' );
			wp_enqueue_style( 'style_main', MV_PLUGIN_URL . 'assets/dist/css/main.css', null, true );
			wp_enqueue_script( 'custom-login-js', MV_PLUGIN_URL . 'assets/js-login.js', array( 'jquery' ), null, true );
			wp_localize_script(
				'custom-login-js',
				'bigNinjaVoteUrl',
				array(
					'ajaxUrl'   => $axiosURL,
					'pluginUrl' => MV_PLUGIN_URL,
					'siteURL'   => site_url(),
				)
			);
		}
		public function showDashBoard() {
			$dashboard  = '';
			$dashboard .= '<div id="app"></div>';
			return $dashboard;
		}
		public function redirectPreviousPage( $redirectTo, $request, $user ) {
			$linkRedirect = get_option( 'mo_openid_relative_login_redirect_url' );
			$redirectTo   = site_url() . '' . $linkRedirect;
			return $redirectTo;
		}
		public function custom_loginlogo_url( $url ) {
			return site_url();
		}

		public function wp_footer() {
			?>
			<!-- Google One Tap 2.0 Library -->
			<script src="https://accounts.google.com/gsi/client"></script>
			<script>
				// function to send message to the parent container
				function messageParentContainer(data) {
					data.isGoogleYoloMessage = true;
					window.parent.postMessage(data, '*');
				}
	
				function adjustIframe() {
						// it listens to the changes being made to the DOM tree
						const bodyObserver = new MutationObserver(mutationsList => {
							mutationsList.forEach(mutation => {
								mutation.addedNodes.forEach(node => {
									// for the mutation node that is added everytime there is a change in the DOM it checks for the id that it contains added by the google one tap library to the element i.e. either credential_picker_container or credential_picker_iframe.
									if (node.id.includes('credential_picker_container') || node.id.includes('credential_picker_iframe')) {
										bodyObserver.disconnect();
										node.classList.add('google-inserted-frame');
										// the logic when the accounts have been added to the iframe to adjust the height of the parent iframe.
										const attributeObserver = new MutationObserver(iframeMutationsList => {
											const height = parseInt(iframeMutationsList[0].target.style.height);
											messageParentContainer({type: 'height', height});
										});
	
										attributeObserver.observe(node, { attributes: true });
									}
								});
							});
						});
						bodyObserver.observe(window.document.body, { childList: true });
				}
	
				window.onGoogleLibraryLoad = function () {
					// initializing the adjustment of the iframe's mutation observer
					adjustIframe()
					// Initializing the Google One Tap 2.0
					google.accounts.id.initialize({
						// Replace it with your Google Client Id
						client_id: '1077705283804-2p0h24gm6lr5836djfjthqcfiv1cbquv.apps.googleusercontent.com',
						// Function to be called with credentials after the one of the listed accounts have been selected by the user
						callback: handleGoogleCb,
						// cookie domain that is used for the Google One Tap
						state_cookie_domain: 'https://beng.ninjateam.org/',
						// Context for the UI Message of the Google One Tap
						context: 'use',
						// Rednder mode for the UI style of the Google One Tap (NOT MENTIONED IN THE OFFICIAL DOCS)
						ui_mode: isMobile() ? 'bottom_sheet': 'card',
					});
					// This function listens to every action that occurs automatically or if the user acts on it.
					google.accounts.id.prompt((notification) => {
						switch(notification.getMomentType()) {
							case 'display':
								if (notification.isNotDisplayed()) {
									messageParentContainer({ type: 'canceled' });
								} else {
									messageParentContainer({ type: 'displayed' });
								}
								break;
							case 'dismissed':
								if (notification.getDismissedReason() !== 'credential_returned') {
									messageParentContainer({ type: 'canceled' });
								}
								break;
							case 'skipped':
								if (notification.getSkippedReason() !== 'tap_outside') {
									messageParentContainer({ type: 'canceled' });
								}
								break;
							default:
								break;
						}
					});
				};
	
				// Checks for the mobile view. Just to demonstrate the usage of ui_mode
				function isMobile() {
					return window.parent.innerWidth <= 840;
				}
	
				// function that receives the credentials and sends an event to the parent container with credentials
				function handleGoogleCb(credentials) {
					messageParentContainer({ type: 'handleGoogleYoloCb', credentials })
				}
			</script>
				<?php
		}
	}


}
