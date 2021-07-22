/* http://stackoverflow.com/questions/11098257/jquery-move-dom-element-inside-parent */

$.fn.moveUp = function () {
    $.each(this, function () {
        $(this).after($(this).prev());
    });
};
$.fn.moveDown = function () {
    $.each(this, function () {
        $(this).before($(this).next());
    });
};