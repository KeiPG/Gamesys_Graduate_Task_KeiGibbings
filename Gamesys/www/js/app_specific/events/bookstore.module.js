(function() {
	'use strict';

	angular
		.module('bookstore', [
		])
        .config(function($stateProvider) {
			$stateProvider
				.state('ebookstore', {
					cache: false,
					url: '/ebookstore',
					templateUrl: 'js/app_specific/events/bookstore.html',
                    controller: 'bookstoreCtrl as vm'
                })
            });
				
})();