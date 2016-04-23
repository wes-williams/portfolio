$(document).ready(function (){

    // populate with icons from data
    var menuContainer = $('#menuContainer');
    $('#workDatabase').children().each(function(index, value) {

        var newIcon = $(document.createElement('a'));
        newIcon.prop('id', value.id);
        newIcon.prop('href','#');
        newIcon.prop('class','work');
        newIcon.html('<div class="icons iconSize">'+$(value).find('#dataIcon').html()+'</div>');   

        menuContainer.append(newIcon);
    });
    // add space after icons
    menuContainer.append('<div class="paddingIconSize">&nbsp;</div>');
    // recognize click of icons
    $('.work').click(function(evt) {
        showWork(evt.currentTarget.id);
    });

    // populate with icons from data
    var navMenuContainer = $('#navMenuContainer');
    $('#menuDatabase').children().each(function(index, value) {

        var newIcon = $(document.createElement('a'));
        newIcon.prop('id', value.id);
        newIcon.prop('href','#');
        newIcon.prop('class','menuWork');
        newIcon.html('<div class="icons iconSize">'+$(value).find('#dataIcon').html()+'</div>');   

        navMenuContainer.append(newIcon);
    });
    // recognize click of icons
    $('.menuWork').click(function(evt) {
        showWork(evt.currentTarget.id, true);
    });

    var resizeFunction = function (){
        var menu = $('.menu');
        var menuContainer = $('.menuContainer');
        var icons = $('.icons')
        var iconWidth = icons.width() + (parseInt(icons.css('margin'))*2) + (parseInt(icons.css('border-width'))*2)
        var iconsPerLine = Math.floor(menu.width() / iconWidth);

        var menuMargin = (menu.width() - (Math.floor(menu.width() / iconWidth) * iconWidth)) / 2
        menuContainer.css('margin-left', menuMargin );

        var stripeMenuContainer = $('.stripe').find('.menuContainer');
        var menuIcons = stripeMenuContainer.find('.icons');
        var menuIconCount = menuIcons.size();

        /* space the extra menu off the screen (would need to act like pages...)
        var menuPages = menuIconCount % iconsPerLine;
        if(menuPages > 1) {
            for(var i=1;i<=menuPages;i++) {
                $(menuIcons[i*iconsPerLine]).css('margin-left', menuMargin);
            }
        }
        */

        var menuIconSpace = menuIconCount < iconsPerLine ? iconsPerLine : menuIconCount;
        stripeMenuContainer.css('width',((iconWidth * menuIconSpace)+menuMargin) + 'px');



        if(iconsPerLine > menuIconCount) {
            var emptyWidth = iconWidth * (iconsPerLine - menuIconCount);
            menuMargin += emptyWidth / 2;
        }


        stripeMenuContainer.css('margin-left', menuMargin);  
    }

    resizeFunction();
    $(window).resize(resizeFunction);  

    var heightDiff = $('#menuContainer').height() - $(document).height();
    if(heightDiff > 0) {
        var animateTime = (heightDiff / $('.iconSize').height()) * 250;
        if(animateTime<1000) {
            animateTime = 1000;
        }

         $('#menu').animate({ scrollTop: $('#menuContainer').height() }, 0, function() {
             $('#menu').animate({ scrollTop: 0 }, animateTime, function() {
                // done
             });
         })
    }

    var stripeMenu = $('.stripe').find('.menu')
    var stripeMenuContainer = stripeMenu.find('.menuContainer');
    var widthDiff = stripeMenuContainer.width() - $(document).width();
    if(widthDiff > 0) {
        var animateTime = (widthDiff / $('.iconSize').width()) * 250;
        if(animateTime<1000) {
            animateTime = 1000;
        }

         stripeMenu.animate({ scrollLeft: stripeMenuContainer.width() }, 0, function() {
             stripeMenu.animate({ scrollLeft: 0 }, animateTime, function() {
                // done
             });
         })
    }

})

function showWork(workId,menuNav) {  

    var workContainer = menuNav ? '#navMenuContainer' : '#menuContainer';
    var work = $(workContainer).find('#'+workId);
    var database = menuNav ? '#menuDatabase' : '#workDatabase';
    var workData = $(database).find('#'+workId);

    // TODO - remove later...
    if(workData.get(0) == undefined) {
        alert('Data missing for ' + workId);
        return;
    }

    $('#workTitle').html(workData.find('#dataTitle').html()); 
    $('#workImage').html(workData.find('#dataImage').html());
    $('#workText').html(workData.find('#dataText').html());                  

    $('#workIcon').html('<i class="workIcon ' + $(work).find('.icon').attr('class').replace('icon','') + '"></i>' );

    $('#overlay').show()
    $('#fade').show()

    var prevWork = $(work).prev('.work');

    $('#prevWork').off('click');
    if(!menuNav && prevWork.get(0) != undefined) {
        $('#prevWork').css('color','white');
        $('#prevWork').click(function(e) {
            //hideWork();
            prevWork.click();
        });
    }
    else {
       $('#prevWork').css('color','black');
        $('#prevWork').click(function(e) { });
    }

    var nextWork = $(work).next('.work');

    $('#nextWork').off('click');
    if(!menuNav && nextWork.get(0) != undefined) {
        $('#nextWork').css('color','white');
        $('#nextWork').click(function(e) {
            //hideWork();
            nextWork.click();
        });
    }
    else {
        $('#nextWork').css('color','black');
        $('#nextWork').click(function(e) { });
    }

    $(document).off('keyup');
    $(document).keyup(function( event ) {

        // ignore if detailOverlay is presented.
        if($('#detailOverlay').is(":visible")) {
            return;
        }

        if ( event.which == 27 ) { // escape
            $(document).off('keyup');
            hideWork();
        }
        else if ( event.which == 37 && prevWork.get(0) != undefined) { // left arrow
            $(document).off('keyup');
            $('#prevWork').trigger("click");
        }
        else if ( event.which == 39 && nextWork.get(0) != undefined ) { // right arrow
            $(document).off('keyup');
            $('#nextWork').trigger("click");
        }
    });

}

function hideWork() {
    $('#overlay').hide();
    $('#fade').hide();
}

function largeWork(work) {
    var workImage = $(work).find('img');
    $('#detailOverlay').css('background-image', 'url(' +workImage.prop('src') + ')');
    if(workImage.get(0).naturalWidth >= workImage.get(0).naturalHeight) {
        $('#detailOverlay').css('max-width', workImage.get(0).naturalWidth);
    }
    else {
        $('#detailOverlay').css('max-height', workImage.get(0).naturalHeight);
    }
    $('#detailFade').show();
    $('#detailOverlay').show();
    $('#glassScreen').show();
    $('#glassScreen').click(function(e) {
        $('#glassScreen').hide();
        $('#detailOverlay').hide();
        $('#detailFade').hide();
    });
}
