'use strict';

var app = function () {

    var $pageWindow = $(window);
    var $pageDocument = $(document);

    var $accordionTypes = $('.accordion-types');
    var accordionLength;
    var accordionHeight = 30;
    var imagePath = 'images/';

    var appendTemplate = function (element) {
        var elementID = element.status.toLowerCase().replace(/\s/g, '-');
        $('#' + elementID + ' .accordion-body').append(
            '<div class="user-item">' +
                '<div class="user-image">' +
                    '<img src="' + imagePath + element.imageUrl + '">' +
                    '<i class="fa fa-bolt" aria-hidden="true"></i>' +
                '</div>' +
                '<div class="user-info">' +
                    '<h1 class="name">' + element.fullname + '</h1>' +
                    '<p class="username">' + element.username + '</p>' +
                    '<p class="phone">' + element.phone + '</p>' +
                    '<p class="location">' + element.city + '</p>' +
                '</div>' +
                '<div class="user-stats">' +
                    '<div class="stats-item orange-stats">' + element.orangeStat + '</div>' +
                    '<div class="stats-item blue-stats">' + element.blueStat + '</div>' +
                '</div>' +
            '</div>'
        );
    };

    var loadFakeTemplateData = function (callback) {

        $.getJSON('fakedata/template-data.json', function (response) {
            var templateData = response.result;
            accordionLength = templateData.length;
            $.each(templateData, function (index) {
                var elementID = templateData[index].toLowerCase().replace(/\s/g, '-');
                $accordionTypes.append(
                    '<div class="accordion-item" id="' + elementID + '">' +
                        '<div class="accordion-header">' +
                            '<span class="header-bullet">' +
                                '<i class="fa fa-circle" aria-hidden="true"></i>' +
                            '</span>' +
                            '<span class="header-text">' + templateData[index] + '</span>' +
                            '<span><i class="fa fa-chevron-down" aria-hidden="true"></i></span>' +
                        '</div>' +
                        '<div class="accordion-body">' +
                        '</div>' +
                    '</div>'
                );
            });
            callback();
        });
    };

    var loadFakeUserData = function () {
        // loads the data from the fake API
        $.getJSON('fakedata/user-data.json', function (response) {
            var userData = response.result;
            $.each(userData, function (index) {
                appendTemplate(userData[index]);
            });
        });
    };    

    var addRemoveClass = function (elements, className, action) {
        // add a particular class to a list of elements
        if(action === 'add') {
            elements.forEach(function (element) {
                element.addClass(className);
            });
        }
        // remove a particular class from a list of elements
        else if(action === 'remove') {
            elements.forEach(function (element) {
                element.removeClass(className);
            });
        }
    };

    var accordionClick = function (element) {
        var $thisFaChevron = $(element).find('.fa-chevron-down');
        $('.fa-chevron-down').not($thisFaChevron).removeClass('point-up');
        $thisFaChevron.toggleClass('point-up');

        var accordionIndex = $('.accordion-item').index(element);
        var windowHeight = $pageWindow.height(); 
        var accordionOffsetTop = accordionIndex * accordionHeight;

        var accordionBodyHeight =  windowHeight - ( accordionOffsetTop + accordionHeight * (accordionLength - accordionIndex) );
        var $thisaccordionBody = $(element).find('.accordion-body');
        $('.accordion-body').not($thisaccordionBody).slideUp('fast');     
        $thisaccordionBody.height(accordionBodyHeight).slideToggle('fast');
    };

    $pageDocument.ready(function () {
        loadFakeTemplateData(function () {
            loadFakeUserData();
        });
    });

    // event handlers
    $pageDocument.on('click', '.accordion-item', function () {
        accordionClick(this);
    });

    // exposing utility methods publicly
    return {
        addRemoveClass: addRemoveClass
    };
}();