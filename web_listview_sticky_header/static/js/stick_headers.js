odoo.define('ks_odoo11_web_listview_sticky_header.stick_header', function (require) {
'use strict';
    var ListView = require('web.ListRenderer');

    var old_render = ListView.prototype._renderView;
    ListView.prototype._renderView = function(){
        var  $self=this;
        var res = old_render.call(this);
        var o_content_area = $(".o_content")[0];
        $(".o_content").css({'overflow' : 'auto'});
        function sticky(){
            $self.$el.find("table.o_list_view").each(function () {
                    $(this).stickyTableHeaders({scrollableArea: o_content_area, fixedOffset: 0.1});
               });
           }

        function fix_body(position){
             $("body").css({
               'position': position,
            });
        }


        if(this.$el.parents('.o_field_one2many').length===0){
                sticky();
                fix_body("fixed");
                $(window).unbind('resize', sticky).bind('resize', sticky);
                 this.$el.css("overflow-x","visible");
                 this.$el.css("overflow-y","visible");
        }
        else{
            fix_body("relative");
        }

        $("div[class='o_sub_menu']").css("z-index",4);

        return res;
    }

});
