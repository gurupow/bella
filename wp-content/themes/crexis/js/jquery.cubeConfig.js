(function($, window, document, undefined) {
	'use strict';

    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
        $(window).load(function() {

            var gridContainer = $('.grid-items'),
                filtersContainer = $('.portfolio-filters'),
                wrap, filtersCallback;

            //console.log( 'window load');

            gridContainer.each(function() {

                var colsBase = $(this).data('cols');

                $(this).cubeportfolio({
                    filters: '#'+$(this).data('filters'),
                    loadMore: '#loadMore-container1',
                    loadMoreAction: 'click',
                    layoutMode: 'grid',
                    defaultFilter: '*',
                    animationType: $(this).data('animation'),
                    gapHorizontal: $(this).data('gap'),
                    gapVertical: $(this).data('gap'),
                    gridAdjustment: 'responsive',
                    mediaQueries: [{
                        width: 1100,
                        cols: colsBase
                    }, {
                        width: 800,
                        cols: colsBase
                    }, {
                        width: 500,
                        cols: 2
                    }, {
                        width: 320,
                        cols: 1
                    }],
                    caption: false,
                    displayType: 'sequentially',
                    displayTypeSpeed: 80,

                    // lightbox
                    lightboxDelegate: '.cbp-image-lightbox',
                    lightboxGallery: true,
                    lightboxTitleSrc: 'data-title',
                    lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

                    // singlePage popup
                    singlePageDelegate: '.cbp-portfolio-lightbox',
                    singlePageDeeplinking: true,
                    singlePageStickyNavigation: true,
                    singlePageAnimation: 'fade',
                    singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
                    singlePageCallback: function(url, element) {
                        // to update singlePage content use the following method: this.updateSinglePage(yourContent)
                        var t = this;

                        $.get(url, function (data) {


                        }).done(function (data) {

                            var $newItems = $(data).find('.portfolio-post-content');

                            t.updateSinglePage($newItems);

                            if($(data).find('.vntd-image-slider').length > 0) {

                                var sliders = new Swiper('.vntd-image-slider', {
                                    nextButton: '.swiper-button-next',
                                    prevButton: '.swiper-button-prev',
                                    loop: true,
                                });

                            }

                        });

                    },
                });

            });


        });
    } else {
        $(document).ready(function() {

            var gridContainer = $('.grid-items'),
                filtersContainer = $('.portfolio-filters'),
                wrap, filtersCallback;

            //console.log( 'doc ready');

            gridContainer.each(function() {

                var colsBase = $(this).data('cols');

                $(this).cubeportfolio({
                    filters: '#'+$(this).data('filters'),
                    loadMore: '#loadMore-container1',
                    loadMoreAction: 'click',
                    layoutMode: 'grid',
                    defaultFilter: '*',
                    animationType: $(this).data('animation'),
                    gapHorizontal: $(this).data('gap'),
                    gapVertical: $(this).data('gap'),
                    gridAdjustment: 'responsive',
                    mediaQueries: [{
                        width: 1100,
                        cols: colsBase
                    }, {
                        width: 800,
                        cols: colsBase
                    }, {
                        width: 500,
                        cols: 2
                    }, {
                        width: 320,
                        cols: 1
                    }],
                    caption: false,
                    displayType: 'sequentially',
                    displayTypeSpeed: 80,

                    // lightbox
                    lightboxDelegate: '.cbp-image-lightbox',
                    lightboxGallery: true,
                    lightboxTitleSrc: 'data-title',
                    lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

                    // singlePage popup
                    singlePageDelegate: '.cbp-portfolio-lightbox',
                    singlePageDeeplinking: true,
                    singlePageStickyNavigation: true,
                    singlePageAnimation: 'fade',
                    singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
                    singlePageCallback: function(url, element) {
                        // to update singlePage content use the following method: this.updateSinglePage(yourContent)
                        var t = this;

                        $.get(url, function (data) {


                        }).done(function (data) {

                            var $newItems = $(data).find('.portfolio-post-content');

                            t.updateSinglePage($newItems);

                            if($(data).find('.vntd-image-slider').length > 0) {

                                var sliders = new Swiper('.vntd-image-slider', {
                                    nextButton: '.swiper-button-next',
                                    prevButton: '.swiper-button-prev',
                                    loop: true,
                                });

                            }

                        });

                    },
                });

            });


        });
    }



})(jQuery, window, document);
