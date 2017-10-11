/*global $, document, setTimeout */
$(document).ready(function () {
    "use strict";
        
    $.prototype.parallax = function () {
        
        var x2 = 0,
            y2 = 0,
            h = 0,
            v = 0,
            elem2 = $(this),
            elem2Height = elem2.outerHeight(),
            elem2Width = elem2.outerWidth(),
            strNumH = elem2Width.toString(),
            strNumV = elem2Height.toString(),
            slicedH = strNumH.slice(0, strNumH.length - 1),
            slicedV = strNumV.slice(0, strNumV.length - 1);
        
        elem2.on('mousemove', function (e) {

            x2 = parseInt(e.clientX - elem2.offset().left, 0);
            y2 = parseInt(e.clientY - elem2.offset().top, 0);
            h = (x2 / slicedH - 5).toFixed(5);
            v = (y2 / slicedV - 5).toFixed(5);
            
            window.console.log(v);
            
            elem2.css({
                'transform' : 'rotateX(' + -v + 'deg' + ') rotateY(' + h + 'deg' + ')'
            });
            
        });
        
        // remove the animate proberty on hover 
        elem2.on('mouseover', function () {
            elem2.removeClass('animate');
        });
        
        
        elem2.on('mouseout', function () {
            // i will animate the last transform value to default      
            var lastTransform = elem2.css('transform');
                            
            // Animate the elem when mouse out                                
            elem2.css({ 'transform' : 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'});
            setTimeout(function () {
                elem2.css({ 'transform' : lastTransform});
            }, 300);
            setTimeout(function () {
                elem2.css({ 'transform' : 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'});
            }, 600);

            // set the classes 
            elem2.attr('class', 'animate'); // set the attribute class in a very simple way

        });

        return $(this);
    };
        
});