/**
 * Created by Administrator on 2017-8-3.
 */
(function ($, undefined) {
    $.fn.hdform = function (method) {
        
        if ($.fn.hdform[method]) {
            return $.fn.hdform[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === "object" || !method) {
            return initialize.apply(this, arguments);
        }
        else {
            $.error("Method " + method + " does not exist on jQuery.hdform");
        }
    };
    $.fn.hdform.Get = function () {
        var opts = $(this).data("hdform");
        if (opts && opts.BeforeGet) {
            opts.BeforeGet(opts);
        }
        var record = formValidate(false, {}, this.children(".form_container").children(".group_container").children(".group:not(.html)").find("[field]:not(.datagrid-view [field])"));
        var hdformdata = $(this).data("hdformdata") || {};
        if (record != null) {
            record = $.extend(true, {}, hdformdata, record);
        }
        if (opts && opts.AfterGet) {
            opts.AfterGet(record, opts);
        }
        return record;
    };
    $.fn.hdform.Set = function (record) {
        var opts = $(this).data("hdform");
        if (opts && opts.BeforeSet) {
            opts.BeforeSet(record, opts);
        }
        setValue(record, this.children(".form_container").children(".group_container").children(".group:not(.html)").find("[field]:not(.datagrid-view [field])"));
        $(this).data("hdformdata", record);
        if (opts && opts.AfterSet) {
            opts.AfterSet(record, opts);
        }
    };
    $.fn.hdform.Enable = function (Fields) {
        opts = this.data("hdform");
        if (opts.BeforeEnable) {
            opts.BeforeEnable(Fields);
        }

        if (Fields) {
            Fields = "(" + Fields.join(")(") + ")";
            for (var i = 0, Eles = this.find("div.group [field]"), len = Eles.length; i < len; i++) {
                var Ele = jQuery(Eles[i]);
                var Field = Ele.attr("field");
                if (Ele.attr("editable") != "editable" && Fields.indexOf("(" + Field + ")") > -1) {
                    var Type = Ele.attr("showtype");
                    switch (Type) {
                        case "combo":
                        case "combocheck":
                            {
                                Ele.combobox("enable");
                            }
                            break;
                        case "combotree":
                            {
                                Ele.combotree("enable");
                            }
                            break;
                        case "datetime":
                            {
                                Ele.removeAttr("disabled");
                            }
                            break;
                        case "upload":
                        case "gispos":
                        case "gisarea":
                            {
                                Ele.removeAttr("disabled");
                                Ele.parents("td").find("button." + Type).removeClass("disabled");
                            }
                            break;
                        default:
                            {
                                Ele.removeAttr("disabled");
                            }
                            break;
                    }
                }
            }
        }
        else {
            //不指定字段，全部清空
            for (var i = 0, Eles = this.find("div.group [field]"), len = Eles.length; i < len; i++) {
                var Ele = jQuery(Eles[i]);
                var Field = Ele.attr("field");
                var Type = Ele.attr("showtype");
                if (Ele.attr("editable") != "editable") {
                    switch (Type) {
                        case "combo":
                        case "combocheck":
                            {
                                Ele.combobox("enable");
                            }
                            break;
                        case "combotree":
                            {
                                Ele.combotree("enable");
                            }
                            break;
                        case "datetime":
                            {
                                Ele.removeAttr("disabled");
                            }
                            break;
                        default:
                            {
                                Ele.removeAttr("disabled");
                            }
                            break;
                    }
                }
            }
            this.find("button.upload").removeClass("disabled");
        }
        if (opts.AfterEnable) {
            opts.AfterEnable(Fields);
        }
        //return this;
    };
    $.fn.hdform.Disable = function (Fields) {
        opts = this.data("hdform");
        if (opts.BeforeDisable) {
            opts.BeforeDisable(Fields);
        }

        if (Fields) {
            Fields = "(" + Fields.join(")(") + ")";
            for (var i = 0, Eles = this.children(".form_container").children(".group:not(.html)").find("[field]:not(.datagrid-view [field])"), len = Eles.length; i < len; i++) {
                var Ele = jQuery(Eles[i]);
                var Field = Ele.attr("field");
                if (Fields.indexOf("(" + Field + ")") > -1) {
                    var Type = Ele.attr("showtype");
                    switch (Type) {
                        case "combo":
                        case "combocheck":
                            {
                                Ele.combobox("disable");
                            }
                            break;
                        case "combotree":
                            {
                                Ele.combotree("disable");
                            }
                            break;
                        case "datetime":
                            {
                                Ele.attr("disabled", "disabled");
                            }
                            break;
                        case "upload":
                        case "gispos":
                        case "gisarea":
                            {
                                Ele.attr("disabled", "disabled");
                                Ele.parents("td").find("button." + Type).addClass("disabled");
                            }
                            break;
                        default:
                            {
                                Ele.attr("disabled", "disabled");
                            }
                            break;
                    }
                }
            }
        }
        else {
            //不指定字段，全部清空
            for (var i = 0, Eles = this.children(".form_container").children(".group:not(.html)").find("[field]:not(.datagrid-view [field])"), len = Eles.length; i < len; i++) {
                var Ele = jQuery(Eles[i]);
                var Field = Ele.attr("field");
                var Type = Ele.attr("showtype");
                switch (Type) {
                    case "combo":
                    case "combocheck":
                        {
                            Ele.combobox("disable");
                        }
                        break;
                    case "combotree":
                        {
                            Ele.combotree("disable");
                        }
                        break;
                    case "datetime":
                        {
                            Ele.attr("disabled", "disabled");
                        }
                        break;
                    default:
                        {
                            Ele.attr("disabled", "disabled");
                        }
                        break;
                }
            }
            this.find("button.upload").addClass("disabled");
            this.find("button.gispos").addClass("disabled");
            this.find("button.gisarea").addClass("disabled");
        }
        if (opts.AfterDisable) {
            opts.AfterDisable(Fields);
        }
        //return this;
    };
    $.fn.hdform.Clear = function (Fields) {
        opts = this.data("hdform");
        if (opts.BeforeClear) {
            opts.BeforeClear(Fields);
        }
        if (Fields) {
            Fields = "(" + Fields.join(")(") + ")";
            for (var i = 0, Eles = this.children(".form_container").children(".group:not(.html)").find("[field]:not(.datagrid-view [field])"), len = Eles.length; i < len; i++) {
                var Ele = jQuery(Eles[i]);
                var Field = Ele.attr("field");
                if (Fields.indexOf("(" + Field + ")") > -1) {
                    var Type = Ele.attr("showtype");
                    switch (Type) {
                        case "combo":
                            {
                                var Items = Ele.combobox("getData");
                                if (Items.length > 0) {
                                    Ele.combobox("setValue", Items[0].value);
                                }
                                else {
                                    Ele.combobox("clear");
                                }
                            }
                            break;
                        case "combocheck":
                            {
                                var Items = Ele.combobox("getData");
                                if (Items.length > 0) {
                                    Ele.combobox("setValues", [Items[0].value]);
                                }
                                else {
                                    Ele.combobox("clear");
                                }
                            }
                            break;
                        case "combotree":
                            {
                                Ele.combotree("clear");
                            }
                            break;
                        case "datetime":
                            {
                                Ele.val("");
                            }
                            break;
                        case "checkbox":
                            {
                                //Ele.removeProp("checked");
                                Ele[0].checked = false;
                            }
                            break;
                        default:
                            {
                                Ele.val("");
                            }
                            break;
                    }
                }
            }
        }
        else {
            //不指定字段，全部清空
            for (var i = 0, Eles = this.children(".form_container").children(".group:not(.html)").find("[field]:not(.datagrid-view [field])"), len = Eles.length; i < len; i++) {
                var Ele = jQuery(Eles[i]);
                var Field = Ele.attr("field");
                var Type = Ele.attr("showtype");
                switch (Type) {
                    case "combo":
                        {
                            var Items = Ele.combobox("getData");
                            if (Items.length > 0) {
                                Ele.combobox("setValue", Items[0].value);
                            }
                            else {
                                Ele.combobox("clear");
                            }
                        }
                        break;
                    case "combocheck":
                        {
                            var Items = Ele.combobox("getData");
                            if (Items.length > 0) {

                                Ele.combobox("setValues", [Items[0].value]);
                            }
                            else {
                                Ele.combobox("clear");
                            }
                        }
                        break;
                    case "combotree":
                        {
                            Ele.combotree("clear");
                        }
                        break;
                    case "datetime":
                        {
                            Ele.val("");
                        }
                        break;
                    case "checkbox":
                        {
                            //Ele.removeProp("checked");
                            Ele[0].checked = false;
                        }
                        break;
                    default:
                        {
                            Ele.val("");
                        }
                        break;
                }
            }
        }
        if (opts.AfterClear) {
            opts.AfterClear(Fields);
        }

    };
    var defaults = $.fn.hdform.defaults = {
        Temp: template.compile(jQuery.GetTemplate(function () {
            /*

                   {{each Form as Group g}}
                   {{if Group.Buttons &&Group.Buttons.length>0 }}
                        <div class="button_container" style="clear:both;margin-top:10px;">
                            {{each Group.Buttons as Btn b}}
                            <button command="{{Btn.Cmd}}" class="{{Btn['class']}}" type="button" id="{{Btn.Id}}" title="{{Btn['Title']}}">{{#(Btn.Value||'&nbsp')}}</button>
                            {{/each}}
                        </div>
                   {{else}}
                   <div class="group_container">
                   <div group="{{Group.Code}}" class="group {{if Group.Html}}html{{/if}}">
                   {{if Group.Title&&Form.length > 1}}<div class="title"><span>{{#Group.Title}}</span></div>{{/if}}
                   {{if Group.Html }}{{#Group.Html}}
                   {{else if Group.Grid &&Group.Grid.Id }}
                        {{if Group.Grid['Buttons']&&Group.Grid['Buttons'].length>0}}
                            <div style="padding-left:30px;">
                                {{each Group.Grid.Buttons as Btn b}}
                                    <button command="{{Btn.Cmd}}" class="{{Btn['class']}}" type="button" id="{{Btn.Id}}" title="{{Btn['Title']}}">{{#(Btn.Value||'&nbsp')}}</button>
                                {{/each}}
                            </div>
                        {{/if}}
                        <table id="{{Group.Grid.Id}}"></table>
                   {{else}}

                   <table style="{{Group.Style}}">

                   {{each Group.Inputs as Row r}}
                   <tr>

                   {{each Row as Cell c}}
                   {{if Cell.Field}}
                   <td class="label" field_label="{{Cell.Field}}" rowspan="{{Cell.RowSpan}}" colspan="1">{{#Cell.Name}}</td>
                   <td class="content" field_input={{Cell.Field}} rowspan="{{Cell.RowSpan}}" colspan="{{Cell.ColSpan * 2 - 1}}">
                   <div class='wrap'>
                   {{if Cell.ShowType == "textarea"}}<textarea
                   {{else}}<input {{/if}}
                   class="{{if Cell.ShowType == "datetime"}}Wdate {{else if Cell.ShowType == "upload" || Cell.ShowType == "text" || Cell.ShowType == "gispos" || Cell.ShowType == "gisarea" }}easyui-validatebox {{/if}}default{{if Cell.Class}}{{ Cell.Class}}{{/if}}"
                   field="{{Cell.Field}}" valuetype="{{Cell.DataType}}" showtype="{{Cell.ShowType}}"
                   type="{{if Cell.ShowType == "password"}}password{{else if Cell.ShowType == "combocheck"}}combo{{else if Cell.ShowType == "checkbox"}}checkbox{{else}}text{{/if}}"
                   {{if Cell.Validate && Cell.Validate.length > 0}} validator="{{Cell.Validate}}"
                   {{else if Cell.ShowType == "datetime" && Cell.DataType == "Number"}} validator="{Valids:{regexp:['为必填项','^([0-9]+(.[0-9]+)?){{if !Cell.Required}}?{{/if}}$']},Message:'{{Cell.Name}}'}"
                   {{else if Cell.DataType == "Number"}} validator="{Valids:{regexp:['必须为数值','^[\\-\\+]?([0-9]+(.[0-9]+)?){{if !Cell.Required}}?{{/if}}$']},Message:'{{Cell.Name}}'}"
                   {{else if Cell.DataType == "Phone"}} validator="{Valids:{regexp:['必须为有效的电话号码','^((?:0?(13|15|18|14)[0-9][0-9]{8})|(?:([0-9]{3,4}\-)?[0-9]{6,8})){{if !Cell.Required}}?{{/if}}$']},Message:'{{Cell.Name}}'}"
                   {{else if Cell.DataType == "IP"}} validator="{Valids:{regexp:['必须为有效IP地址','^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){{if !Cell.Required}}?{{/if}}$']},Message:'{{Cell.Name}}'}"
                   {{else if Cell.DataType == "EMail"}} validator="{Valids:{regexp:['必须为有效的邮箱地址','^([\\w-]+@[\\w-]+\\.(com|net|org|edu|mil|tv|biz|info)){{if !Cell.Required}}?{{/if}}$']},Message:'{{Cell.Name}}'}"
                   {{else if Cell.Required}} validator="{Valids:{regexp:['为必填项','^(.|\n)+$']},Message:'{{Cell.Name}}'}"
                   {{/if}}

                   {{if Cell.Holder}} placeholder="{{Cell.Holder}}" {{/if}}
                   {{if Cell.MaxLength}} maxlength="{{Cell.MaxLength}}" {{/if}}

                   {{if Cell.ShowType == "combo" || Cell.ShowType == "combocheck" || Cell.ShowType == "combotree"}} source="{{Cell.Ext}}" style="{{Cell.Style}}"
                   {{else if Cell.ShowType == "datetime"}} onclick="new WdatePicker({skin:'default',readOnly:true,isShowToday:false,dateFmt:'{{Cell.Ext}}'})" format="{{Cell.Ext}}"  style="{{Cell.Style}}"
                   {{else if Cell.ShowType == "textarea"}} style="resize:none;{{Cell.Style||Cell.Ext}}"
                   {{else if Cell.ShowType == "text"}} style="{{Cell.Style||Cell.Ext}}"
                   {{else if Cell.ShowType == "upload" || Cell.ShowType == "text" || Cell.ShowType == "gispos" || Cell.ShowType == "gisarea"}} style="{{Cell.Style||Cell.Ext}}"{{/if}}

                   {{if Cell.Required}} require="require"{{/if}}
                   {{if Cell.Id}} id="{{Cell.Id}}"{{/if}}

                   {{if Cell.Editable === false}} editable="editable"{{/if}}

                   {{if Cell.ShowType == "textarea"}} ></textarea>
                   {{else if Cell.ShowType == "upload"}} readonly="readonly" /><button type="button" cmd="upload" class="upload">...</button>
                   {{else if Cell.ShowType == "gispos"}} readonly="readonly" /><button type="button" cmd="gispos" class="gispos">...</button>
                   {{else if Cell.ShowType == "gisarea"}} readonly="readonly" /><button type="button" cmd="gisarea" class="gisarea">...</button>
                   {{else}} />{{/if}}
                   <div class='border border-with-{{Cell.ShowType}}'>
                   {{if Cell.Unit}}<span class="unit">{{Cell.Unit}}</span>{{/if}}
                   {{if Cell.Required && Cell.ShowType != 'combo'&& Cell.ShowType != 'checkbox'}}<span class="required">*</span>{{/if}}
                   </div>
                   </div>
                   </td>
                   {{else}}
                   <td class="label blank" rowspan="{{Cell.RowSpan}}" colspan="1">{{Cell.Name}}</td>
                   <td class="content blank" rowspan="{{Cell.RowSpan}}" colspan="{{Cell.ColSpan * 2 - 1}}">
                   <div class="wrap"><span style="width:{{(Cell.ColSpan * 2 - 1)*150}}px;display: inline-block;"></span></div>
                   </td>
                   {{/if}}
                   {{/each}}

                   </tr>
                   {{/each}}
                   {{if Group.Blank}}
                   <tr style="height:{{Group.Blank}}px"><td></td></tr>
                   {{/if}}
                   </table>
                   {{/if}}
                   </div>
                   </div>
                   {{/if}}
                   {{/each}}

                   */
        })),
        Form: [],
        Grids: {},
        Binding: GBindings || [],
        BeforeRender: null,
        AfterRender: null,
        BeforeGet: null,
        AfterGet: null,
        BeforeSet: null,
        AfterSet: null,
        BeforeEnable: null,
        AfterEnable: null,
        BeforeDisable: null,
        AfterDisable: null,
        BeforeClear: null,
        AfterClear: null,
        DefaultBtns: [
            { Id: "btnOk", "class": "confirm", Cmd: "confirm", Value: "确定" },
            { Id: "btnCancel", "class": "cancel", Cmd: "cancel", Value: "取消" }
        ],
        QuickBtn: true,
        Cmds: {
            upload: function (dom, Target) {
                jQuery(jQuery("#ifm_upload")[0].contentWindow.document.getElementById("file")).change(function () {
                    if (jQuery("#ifm_upload")[0].contentWindow.document.getElementById("file").value.length > 0) {
                        jQuery("#ifm_upload")[0].contentWindow.document.forms[0].submit();
                    }
                });
                jQuery("#ifm_upload").unbind("load").load(function () {
                    if (this.contentWindow.location.pathname == "/upload") {
                        var Result = Proxy.Json.ToObject(this.contentWindow.document.body.innerHTML);
                        Target.val(Result.name);
                        this.src = this.src;
                    }
                });
                jQuery("#ifm_upload")[0].contentWindow.document.getElementById("file").click();
            },
            confirm: function (dom, e) {
                //return dom.hdform("Get");
            },
            cancel: function (dom, e) {
                dom.hdform("Clear");
            },
            gispos: null,
            gisarea: null
        }
    };
    function initialize(options) {
        var opts = $.extend(true, {}, defaults, options);
        if (jQuery("#ifm_upload").length == 0) {
            jQuery("<iframe id=\"ifm_upload\" src=\"/static/Scripts/CRUD/hUpload.htm\" style=\"display:none;\"></iframe>").appendTo(document.body);
        }
        if (opts.QuickBtn) {
            opts.Form.push({ Buttons: opts.DefaultBtns });
        }
        return this.each(function () {
            var hdform = $(this);
            if (opts.BeforeRender) {
                opts.BeforeRender(hdform);
            }

            for (var i = 0; i < opts.Form.length; i++) {
                if (opts.Form[i]['Inputs']) {
                    for (var x = 0; x < opts.Form[i]['Inputs'].length; x++) {
                        var inps = opts.Form[i]['Inputs'][x];
                        for (var j = 0; j < inps.length; j++) {
                            var input = inps[j];
                            opts.Form[i]['Inputs'][x][j] = $.extend(true, { RowSpan: 1, ColSpan: 1, DataType: "String", Ext: "", ShowType: "text", Required: true }, input);
                        }
                    }
                }
            }

            hdform.addClass("crud_framework");
            hdform.html('<div class="form_container" style="border:0px;"></div>');
            hdform.find(".form_container").html(opts.Temp({ Form: opts.Form }));

            BindCmd(hdform);
            BindComboBoxes(opts.Binding, hdform);
            for (var i = 0; i < opts.Form.length; i++) {
                if (opts.Form[i]['Grid']) {
                    var gopt = opts.Form[i]['Grid'];
                    if (gopt['Id']) {
                        var id = gopt['Id'];
                        opts.Grids[id] = $("#" + id).datagrid(gopt);
                    }
                }
            }
            hdform.data("hdform", opts);
            if (opts.AfterRender) {
                opts.AfterRender(hdform, opts);
            }
        });
    };
    function BindCmd(tar) {
        tar.find("button[cmd],button[command]").on("click", function (Evt) {
            if (!$(this).hasClass("disabled")) {
                var Target = $(this).parents("td").find("input");
                var cmd = $(this).attr("cmd") || $(this).attr("command");
                var opts = $(this).parents(".crud_framework").data("hdform");
                if (opts.Cmds[cmd]) {
                    opts.Cmds[cmd]($(this).parents(".crud_framework"), Target);
                }
            }
        });
    };
    function BindComboBoxes(Sources, Container) {
        for (var i = 0, len = Sources.length; i < len; i++) {
            Container.find("[source=" + Sources[i].Code + "]").addClass("combox-complete").each(function (idx, ele) {
                Combo = jQuery(ele);
                var Type = Combo.attr("showtype");
                var Items = Sources[i].Records;
                if (Type == "combocheck") {
                    Combo.combobox({
                        valueField: 'value',
                        textField: 'name',
                        data: Items,
                        editable: false,
                        multiple: true,
                        height: 26,
                        width: 154,
                        formatter: function (Row) { return "<div class='combocheckbox'>" + Row.name + "</div>"; }
                    });
                }
                else if (Type == "combotree") {
                    Combo.combotree({
                        lines: true,
                        height: 26,
                        data: Items,
                        onBeforeSelect: function (Node) {
                            if (Node.iconCls == "std") {
                                return false;
                            }
                        }
                    });
                }
                else {
                    if (Combo.attr("require") != "require" && Items.length > 0 && Items[0].name != "[未设置]") {
                        Items.unshift({ name: "[未设置]", value: (Combo.attr("datatype") == "Number" ? 0 : "") });
                    }
                    Combo.combobox({ valueField: 'value', textField: 'name', data: Items, editable: false, height: 26 });
                    if (Combo.attr("require") == "require" && Items.length > 0) {
                        Combo.combobox("setValue", Items[0].value);
                    }
                }
            });
        }

        Container.find("[source]").each(function (i, ele) {
            if (!$(this).hasClass("combox-complete")) {
                $(this).combobox({ valueField: 'value', textField: 'name', data: [], editable: false, height: 26 });
                //V.ShowMessage("缺少代码为“" + jQuery(ele).attr("source") + "”的绑定数据源");
            }
        });
    };
})(jQuery);