odoo.define('ks_odoo11_web_listview_sticky_header.stick_header', function (require) {
'use strict';
    var ListView = require('web.ListRenderer');
    ListView.include({

    _freezeColumnWidths: function () {
            if(this.getParent().$el.hasClass("o_field_one2many") !== false || this.getParent().$el.hasClass("o_field_many2many") !== false) {
                this._super.apply(this,arguments);
            }
            else{
                var self = this;
                const table = this.el.getElementsByTagName('table')[0];

                var o_content_area = $(".o_content")[0];

                var o_optional_columns = this.$el.find('.o_optional_columns');
                var o_optional_columns_div = this.$el.find('.o_optional_columns_dropdown');
                var origional_header = this.$el.find('.tableFloatingHeaderOriginal');

                if (o_optional_columns.length && origional_header.length && o_optional_columns_div.length) {
                    $(o_optional_columns).css('left',origional_header[0].style.width);
//                    $(o_optional_columns).css('top','0');
//                    $(o_optional_columns).css("z-index", "100");
                }

//                function getPos(el) {
//                    // yay readability
//                    for (var lx=0, ly=0;
//                        el != null;
//                        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
//                    return {x: lx,y: ly};
//                }

//                console.log(getPos(o_optional_columns[0]));
//                console.log(getPos(origional_header[0]));
//                if (o_optional_columns.length){
//                    console.log(o_optional_columns[0].style.top);
////                    console.log(o_optional_columns[0].scroll());
//                }


                function sticky(){

                    self.$el.find(".table.o_list_table").each(function () {
                        $(this).stickyTableHeaders({scrollableArea: o_content_area, fixedOffset: 0.1});
                    });
                  }

                function fix_body(position){
                     $("body").css({
                       'position': position,
                    });
                }


                if(this.$el.parents('.o_field_one2many').length === 0){
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
            }
        },

        _onToggleOptionalColumn: function (ev) {
            var self = this;
            this._super.apply(this, arguments);

            var o_optional_columns = this.$el.find('.o_optional_columns');
            var o_optional_columns_div = this.$el.find('.o_optional_columns_dropdown');
            var origional_header = this.$el.find('.tableFloatingHeaderOriginal');

            if (o_optional_columns.length && origional_header.length && o_optional_columns_div.length) {
                $(o_optional_columns).css('left',origional_header[0].style.width);
            }
        },

        _onToggleOptionalColumnDropdown: function (ev) {
            var self = this;
            this._super.apply(this, arguments);
            var o_optional_columns = this.$el.find('.o_optional_columns');
            var o_optional_columns_div = this.$el.find('.o_optional_columns_dropdown');
            var origional_header = this.$el.find('.tableFloatingHeaderOriginal');

            if (o_optional_columns.length && origional_header.length && o_optional_columns_div.length) {
                $(o_optional_columns).css('left',origional_header[0].style.width);
            }
        },

    _onCellClick: function (event) {
        // The special_click property explicitely allow events to bubble all
        // the way up to bootstrap's level rather than being stopped earlier.
        var $td = $(event.currentTarget);
        var $tr = $td.parent();
        var rowIndex = $tr.index();
        if (!this._isRecordEditable($tr.data('id')) || $(event.target).prop('special_click')) {
            return;
        }
        var fieldIndex = Math.max($tr.find('.o_field_cell').index($td), 0);
        this._selectCell(rowIndex, fieldIndex, {event: event});
    },
    setRowMode: function (recordID, mode) {
        var self = this;
        return this._super.apply(this, arguments).then(function (){
            var editMode = (mode === 'edit');
            var $row = self._getRow(recordID);
            self.currentRow = editMode ? $row.index() : null;
        });
    }
    });
});
