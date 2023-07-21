(function ($) {
    'use strict';

    let defaults = {
        activeClass: 'active',
        fixed: true
    };

    let container,
        target,
        activeClass,
        fixed,
        collection = [];

    let init = function (params) {
        let options = $.extend({}, defaults, params);

        container = this;
        target = options.target;
        activeClass = options.activeClass;
        fixed = options.fixed;

        let hash = null, element = null;
        $.each(target, function () {
            (hash = this.href.split('#')[1]) !== undefined
                ? (element = container.find(`[id="${hash}"]`)).length > 0 ? collection.push({
                    link: $(this),
                    element: element
                }) : null : null;
        });
        this.unbind('scroll', eventListener).bind('scroll', eventListener);
        return this;
    };

    let eventListener = function () {
        let relativeOffsetTop = collection.length > 0 ? collection[0].element.offset().top + container.scrollTop() : 0;
        $.each(collection, function () {
            let _ot = Math.floor(this.element.offset().top + container.scrollTop() - relativeOffsetTop);
            let _st = Math.ceil(container.scrollTop());
            if (_ot <= _st && _st < _ot + Math.floor(this.element.outerHeight())) {
                if (!this.link.hasClass(activeClass)) {
                    target.removeClass(activeClass);
                    this.link.addClass(activeClass);
                }
                return false;
            } else if (fixed) {
                this.link.removeClass('active');
            }
        });
    };

    $.fn.scrollSpy = function (options) {
        if (typeof options === 'object' && typeof options.target != "undefined") {
            return init.apply(this, arguments);
        } else {
            $.error('You should use plugin with required options...');
        }
    };

})(jQuery);
