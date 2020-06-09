odoo.define('ks_odoo11_web_listview_sticky_header.stick_header', function (require) {
'use strict';
    var ListView = require('web.ListRenderer');
    ListView.include({
        on_attach_callback: function () {
            this._super();
            var  $self=this;
//            var res = old_render.call(this);
            var o_content_area = $(".o_content")[0];
            function sticky(){
                $self.$el.find("table.o_list_table").each(function () {
                        $(this).stickyTableHeaders({scrollableArea: o_content_area, fixedOffset: 0.1});
                   });
               }

            function fix_body(position, data){
                 $("body").css({
                   'position': position,
                });
                if (data == true){
                     $("thead").css({
                   'position': 'sticky',
                    });

                    // Adding Custom CSS
                    $(".o_handle_cell").css({
                       'padding-left': '10px',
                    });
                    $(".o_required_modifier").css({
                       'padding-left': '32px',
                    });
                    $(".o_column_sortable").css({
                       'padding-left': '32px',
                    });
                }


            }


            if(this.$el.parents('.o_field_one2many').length===0){
                    sticky();
                    fix_body("fixed", true);
                    $(window).unbind('resize', sticky).bind('resize', sticky);
                    this.$el.css("overflow-x","visible");
//                    this.$el.css("position","sticky");

            }
            else{
                fix_body("relative", false);

            }

            $("div[class='o_sub_menu']").css("z-index",4);

//            return res;
        },

    });
});
