odoo.define('web_listview_sticky_header.stick_header', function (require) {
'use strict';
    var ListView = require('web.ListView');
    ListView.include({
        load_list: function () {
            var $this = this;
            return this._super.apply(this, arguments).done(function () {
                var o_content_area = $(".o_content")[0];
                function stick () {
                if($this.$el.parent(".o_form_field").length===0){
                    $this.$el.find('table.o_list_view').each(function () {
                        $(this).stickyTableHeaders({scrollableArea: o_content_area, fixedOffset: 0.1});
                    });
                    }
                }
                if ($this.$el.parent(".o_form_field").length == 0) {
                    stick();
                    $(window).unbind('resize', stick).bind('resize', stick);
                }
            });
        },
    })
});
