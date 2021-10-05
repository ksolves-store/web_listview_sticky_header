odoo.define('ks_odoo11_web_listview_sticky_header.stick_header', function (require) {
'use strict';
    var ListView = require('web.ListRenderer');
    ListView.include({

    _freezeColumnWidths: function () {
            if(this.getParent() && this.getParent().$el && (this.getParent().$el.hasClass("o_field_one2many") !== false || this.getParent().$el.hasClass("o_field_many2many") !== false)) {
                this._super.apply(this,arguments);
            }
            else{
                var self = this;
                const table = this.el.getElementsByTagName('table')[0];

                var o_content_area = $(".o_content")[0];
                self.decorateBadgeUI();

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
    },
    on_attach_callback: function () {
        var self = this;
        self.decorateBadgeUI();
        $("div.modal-footer a").bind('click', function() {
                if($(this).prop("href").split("/.")[1] && $(this).prop("href").split("/.")[1] === "o_onboarding_container") {
                    setTimeout(function(){
                        if($(".o_content").length && (($(".o_content").offset().top+1) != $(".tableFloatingHeaderOriginal").css("top"))) {
                            $(".tableFloatingHeaderOriginal").css("top",$(".o_content").offset().top+0.50);
                        }
                    },400);
                }
        });
     },
     _renderBodyCell: function (record, node, colIndex, options) {
            var ks_td_cell = this._super.apply(this, arguments);
            if (this.fieldDecorations[node.attrs.name]){
                this._setDecorationClasses(ks_td_cell, this.fieldDecorations[node.attrs.name], record);
            }
            return ks_td_cell;
        },
        _setDecorationClasses: function ($el, decorations, record) {
            for (const [cssClass, expr] of Object.entries(decorations)) {
                $el.toggleClass(cssClass, py.PY_isTrue(py.evaluate(expr, record.evalContext)));
            }
        },

     decorateBadgeUI:function(){
            const badges = $(".o_badge_cell.o_field_cell");
            const ks_self = this;
            if(!badges){
                return;
            }
            else{
                _.each(badges,function(badge){
                    _.each(badge.classList,function(badgeClass){
                      if(badgeClass.indexOf(('text-')) != -1){
                          const newCssClass = `bg-${badgeClass.split('-')[1]}-light`
                          $(this).toggleClass(badgeClass);
                          $(this).find("span").toggleClass(newCssClass);
                      }
                    },badge);
                });

            }


        },

    });
});
