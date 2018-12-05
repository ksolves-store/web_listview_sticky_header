odoo.define('web_listview_sticky_header.stick_header', function (require) {
'use strict';
    var ListView = require('web.ListView');
    ListView.include({
        load_list: function () {
            var $this = this;
            return this._super.apply(this, arguments).done(function () {
                var o_content_area = $(".o_content")[0];
                function stick () {
                if($this.$el.parent(".o_form_field").length === 0){
                    $this.$el.find('table.o_list_view').each(function () {
                        $(this).stickyTableHeaders({scrollableArea: o_content_area, fixedOffset: 0.1});
                    });
                    }
                }
                if ($this.$el.parent(".o_form_field").length === 0) {
                    stick();
                    $(window).unbind('resize', stick).bind('resize', stick);
                }


                function fix_body(position){
                $("body").css({
                    'position': position,
                    });
                }

                if($this.$el.parents('.o_field_one2many').length===0){
                    stick();
                    fix_body("fixed");
                    $(window).unbind('resize', stick).bind('resize', stick);
                    }
                else{
                    fix_body("relative");
                    }
                $("div[class='o_sub_menu']").css("z-index",4);
                $("div[class='o_sub_menu']").css("background",'#f0eeee');

            });

        },
    })
});
