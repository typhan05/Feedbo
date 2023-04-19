<?php
namespace Feedbo\Helper;

defined( 'ABSPATH' ) || exit;
class Installer {
	protected static $instance = null;

	public static function getInstance() {
		if ( null == self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct() {
		$this->setupPages();
	}

	public function setupPages() {
		$pages = array(
			array(
				'post_title' => __( 'Feedbo', 'feedbo' ),
				'slug'       => 'feedbo-page',
				'page_id'    => 'feedbo-page',
				'content'    => '[feedbo]',
			),
			array(
				'post_title' => __( 'Board', 'feedbo' ),
				'slug'       => 'board',
				'page_id'    => 'board',
				'content'    => '[feedbo]',
			),
			array(
				'post_title' => __( 'Widget', 'feedbo' ),
				'slug'       => 'widget',
				'page_id'    => 'widget',
				'content'    => '[feedbo-widget]',
			),
		);

		if ( ! empty( get_option( 'feedbo_pages' ) ) ) {
			$feedboPageSettings = get_option( 'feedbo_pages' );
		} else {
			$feedboPageSettings = array();
		}

		foreach ( $pages as $page ) {
			if ( ! $this->pageExit( $page['post_title'] ) ) {
				$papeId = wp_insert_post(
					array(
						'post_title'     => $page['post_title'],
						'post_name'      => $page['slug'],
						'post_content'   => $page['content'],
						'post_status'    => 'publish',
						'post_type'      => 'page',
						'comment_status' => 'closed',
					)
				);

				$feedboPageSettings[ $page['page_id'] ] = $papeId;
			}
		}
		update_option( 'feedbo_pages', $feedboPageSettings );
	}

	public function pageExit( $postTitle ) {
		$foundPost = post_exists( $postTitle );
		return $foundPost;
	}



}
