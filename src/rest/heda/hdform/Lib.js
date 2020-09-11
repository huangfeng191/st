/// <reference path="../../Scripts/CRUD/CRUD.View.js" />
/// <reference path="../../Scripts/CRUD/hUpload.htm" />
/// <reference path="../../Scripts/CRUD/hUpload.htm" />
/// <reference path="../../Scripts/CRUD/hUpload.htm" />
/// <reference path="../../Scripts/CRUD/hUpload.htm" />
String.prototype.trim = function() {
    return this.replace(/^\s |\s $/g, '');
}

function SingleFormatter(value, row, index, idfield, nmfield) {
    return "<a onclick=\"ToSingle('" + GetRowValue(row, idfield) + "','" + GetRowValue(row, nmfield) + "')\" style='color: #0000ff; text-decoration: underline; cursor: pointer;'>" + GetRowValue(row, nmfield) + "</a>";
}
//单点分析
function ToSingle(Id, Name) {
    var href = '/scada/analysis.html?id=' + Id;
    href += '&_title=' + encodeURIComponent(Name);
    window.top.location.hash = "#!" + href;
};

function BiguserFormatter(value, row, index, idfield, nmfield) {
    var id = GetRowValue(row, idfield);
    var name = GetRowValue(row, nmfield);
    if (name) {
        if (id) {
            return "<a onclick=\"ToSingleBiguser('" + id + "','" + name + "')\" style='color: #0000ff; text-decoration: underline; cursor: pointer;'>" + name + "</a>";
        } else {
            return name;
        }
    } else {
        return "";
    }
}

function ToSingleBiguser(Id, Name) {
    var href = '/water/analysis.html?id=' + Id;
    href += '&_title=' + encodeURIComponent(Name);
    window.top.location.hash = "#!" + href;
};
//许可证号 链接
function LicenceFormatter(value, row, index, idfield, snfield, color) {
    if (!color) {
        color = "#0000ff";
    }
    var id = GetRowValue(row, idfield);
    var sn = GetRowValue(row, snfield);
    if (sn) {
        if (id) {

            return "<a onclick=\"ShowLicence('" + id + "');\" style='color:" + color + "; text-decoration: underline; cursor: pointer;'>" + sn + "</a>";
        } else {
            return sn;
        }
    } else {
        return "";
    }
}

function GetRowValue(row, field) {
    try {
        return eval("row['" + field.replace(/\./g, "']['") + "']");
    } catch (e) { return ""; }
}

function ShowLicence(id) {
    var config = {
        Title: "许可证明细",
        Url: "/water/dlglicence.html",
        Width: 800,
        Height: 600,
        CloseButton: true
    };
    Dialog(config, { id: id }, function(Result) {
        if (Result) {}
    });
}
//时间戳转换为日期格式
function DaysFormatter(value, fmt) {
    if (value && typeof value == "number") return new Date(value * 1000).FormatString(fmt);
    else return value;
}

function Msg(msg) {
    Dialog({ Title: "提示", Type: window.top.MyDialog.Types.Message, Icon: window.top.MyDialog.Icons.Info, Message: msg });
}

function ValidFormatter(value, row, index) {
    if (value && typeof value == "number") {
        if (new Date(value * 1000) < new Date()) {
            return '<p style="color:red">' + new Date(value * 1000).FormatString('yyyy-MM-dd') + '</p>';
        } else if (new Date(value * 1000) < new Date().AddDays(30)) {
            return '<p style="color:#FDAE00;">' + new Date(value * 1000).FormatString('yyyy-MM-dd') + '</p>';
        } else {
            return new Date(value * 1000).FormatString('yyyy-MM-dd');
        }
    } else {
        return value;
    }
}

/***************************FORM**********************************/
function setField(Object, Field, Value) {
    var fieldRegexp = new RegExp("\\.|\\[|\\]\\.");
    if (fieldRegexp.test(Field)) {
        var F = Field.split(fieldRegexp)[0];
        Field = Field.replace(new RegExp("^" + F), "");
        var Cur = Object[F];
        if (!Cur) {
            if (Field.charAt(0) == "[") {
                Cur = Object[F] = [];
            } else {
                Cur = Object[F] = {};
            }
        }
        setField(Cur, Field.replace(/^(\.|\[|\]\.)/, ""), Value);
    } else {
        Object[Field] = Value;
    }
}

function getField(Object, Field) {
    var fieldRegexp = new RegExp("\\.|\\[|\\]\\.");
    if (fieldRegexp.test(Field)) {
        var F = Field.split(fieldRegexp)[0];
        var Cur = Object[F];
        if (Cur) {
            return getField(Cur, Field.replace(new RegExp("^" + F + "(\\.|\\[|\\]\\.)"), ""));
        } else {
            return null;
        }
    } else if (Object && Object.hasOwnProperty(Field)) {
        return Object[Field];
    } else {
        return '';
    }
}

//模拟CRUD表单验证
function formValidate(isUpdate, currentRow, container) {
    var Validators = {
        Result: [],
        Method: {
            length: function(Message, Min, Max) {
                if (typeof(Min) === "number" && typeof(Max) === "number" && (this.length < Min || this.length > Max)) {
                    Validators.Result.push("<span style='color:red;'>" + Message + "</span>长度必须在" + Min + "至" + Max + "之间");
                    return false;
                } else if (typeof(Min) === "number" && this.length < Min) {
                    Validators.Result.push("<span style='color:red;'>" + Message + "</span>长度不能小于" + Min);
                    return false;
                } else if (typeof(Max) === "number" && this.length > Max) {
                    Validators.Result.push("<span style='color:red;'>" + Message + "</span>长度不能大于" + Max);
                    return false;
                } else {
                    return true;
                }
            },
            range: function(Message, Min, Max) {
                if (this.length > 0 && !isNaN(Number(this))) {
                    var N = Number(this);
                    if (typeof(Min) === "number" && typeof(Max) === "number" && (N < Min || N > Max)) {
                        Validators.Result.push("<span style='color:red;'>" + Message + "</span>数值必须在" + Min + "至" + Max + "之间");
                        return false;
                    } else if (typeof(Min) === "number" && N < Min) {
                        Validators.Result.push("<span style='color:red;'>" + Message + "</span>数值不能小于" + Min);
                        return false;
                    } else if (typeof(Max) === "number" && N > Max) {
                        Validators.Result.push("<span style='color:red;'>" + Message + "</span>数值不能大于" + Max);
                        return false;
                    } else {
                        return true;
                    }
                } else if (this.length > 0) {
                    Validators.Result.push("<span style='color:red;'>" + Message + "</span>不是有效的数值格式");
                    return false;
                } else {
                    return true;
                }
            },
            digits: function(Message, Digits) {
                if (this.length > 0 && !isNaN(Number(this)) && this.indexOf(".") != -1 && this.length - this.indexOf(".") - 1 > Digits) {
                    Validators.Result.push("<span style='color:red;'>" + Message + "</span>小数位数不能大于" + Digits);
                    return false;
                } else {
                    return true;
                }
            },
            regexp: function(Message, MessageExt, Exp) {
                var Regx = new RegExp(Exp);
                if (!Regx.test(this)) {
                    Validators.Result.push("<span style='color:red;'>" + Message + "</span>" + MessageExt);
                    return false;
                } else {
                    return true;
                }
            }
        }
    };

    //初始化验证结果
    Validators.Result = [];
    var Record = (isUpdate ? currentRow : {});
    var Valid = null;
    var filedStr = "field"
    if (typeof container == "string" && container.indexOf("fieldW") > 0) {
        filedStr = "fieldW";
    }
    for (var i = 0, Eles = jQuery(container), len = Eles.length; i < len; i++) {
        var Ele = jQuery(Eles[i]);
        var Field = Ele.attr(filedStr);
        var Type = Ele.attr("showtype");
        var ValueType = Ele.attr("valuetype");
        if (Ele.attr("hidden") != "hidden" && Ele.attr("validator")) {
            Valid = eval('(' + Ele.attr("validator") + ')');
        } else {
            Valid = null;
        }

        var Value = null;
        switch (Type) {
            case "combo":
                {
                    Value = Ele.combobox("getValue");
                }
                break;
            case "combocheck":
                {
                    Value = Ele.combobox("getValues");
                }
                break;
            case "combotree":
                {
                    Value = Ele.combobox("getValue");
                }
                break;
            case "datetime":
                {
                    Value = Ele.val();
                    if (ValueType == "Number" && Value.length > 0) {
                        Value = "" + (ConvertToDate(Value, Ele.attr("format")).getTime() / 1000);
                    }
                }
                break;
            case "checkbox":
                {
                    Value = Ele[0].checked ? "1" : "0";
                }
                break;
            default:
                {
                    Value = Ele.val();
                }
                break;
        }

        //执行验证逻辑
        if (Valid) {
            var Valids = Valid.Valids;
            for (var Key in Valids) {
                var Vld = Valids[Key];
                Vld.unshift(Valid.Message);
                if (Validators.Method[Key].apply(Value, Vld)) {
                    //验证通过，移除标红和标黄
                    Ele.removeClass("sign_red").removeClass("sign_yellow");
                } else {
                    //验证失败，增加标红或标黄
                    if (Ele.attr("require") === "require") {
                        Ele.addClass("sign_red");
                    } else {
                        Ele.addClass("sign_yellow");
                    }
                }
            }
        }

        switch (ValueType) {
            case "Number":
                {
                    if (Value.length > 0 && !isNaN(Number(Value))) {
                        setField(Record, Field, Number(Value));
                    } else {
                        delete Record[Field];
                    }
                }
                break;
            case "Boolean":
                {
                    if (Value === "false" || Value === "true") {
                        if (Value == "false") {
                            Value = false;
                        } else {
                            Value = true;
                        }
                        setField(Record, Field, Value);
                    } else {
                        delete Record[Field];
                    }
                }
                break;
            case "DateTime":
            default:
                {
                    setField(Record, Field, Value);
                }
                break;
        }
    }

    if (Validators.Result && Validators.Result.length) {
        Dialog({ Title: "提示", Type: window.top.MyDialog.Types.Message, Icon: window.top.MyDialog.Icons.Info, Message: Validators.Result }, null, null);
        return null;
    } else {
        return Record;
    }
}

function setValue(Record, container) {
    for (var i = 0, Eles = jQuery(container), len = Eles.length; i < len; i++) {
        var Ele = jQuery(Eles[i]);
        var Field = Ele.attr("field");
        var Type = Ele.attr("showtype");
        var Value = getField(Record, Field);
        switch (Type) {
            case "combo":
                {
                    if (Value != null) {
                        Ele.combobox("setValue", Value);
                    } else if (Ele.attr("require") == "require") {
                        var Items = Ele.combobox("getData");
                        if (Items.length > 0) {
                            /* if (V && V.BindingDefaults && V.BindingDefaults[Ele.attr("source")])
                            {
                            Ele.combobox("setValue", V.BindingDefaults[Ele.attr("source")]);
                            }
                            else
                            {
                            Ele.combobox("setValue", Items[0].value);
                            }*/
                            Ele.combobox("setValue", Items[0].value);
                        } else {
                            Ele.combobox("clear");
                        }
                    } else {
                        Ele.combobox("clear");
                    }
                }
                break;
            case "combotree":
                {
                    if (Value != null) {
                        Ele.combotree("setValue", Value);
                    } else if (Ele.attr("require") == "require") {
                        var Items = Ele.combotree("getData");
                        //if (Items.length > 0) {
                        //    Ele.combotree("setValue", Items[0].value);
                        //}
                        //else {
                        //    Ele.combotree("clear");
                        //}
                    } else {
                        Ele.combotree("clear");
                    }
                }
                break;
            case "combocheck":
                {
                    if (Value != null) {
                        Ele.combobox("setValues", Value);
                    } else if (Ele.attr("require") == "require") {
                        var Items = Ele.combobox("getData");
                        if (Items.length > 0) {
                            /*    if (V && V.BindingDefaults && V.BindingDefaults[Ele.attr("source")])
                            {
                            Ele.combobox("setValues", V.BindingDefaults[Ele.attr("source")]);
                            }
                            else
                            {
                            Ele.combobox("setValues", [Items[0].value]);
                            }*/
                            Ele.combobox("setValues", [Items[0].value]);
                        } else {
                            Ele.combobox("clear");
                        }
                    } else {
                        Ele.combobox("clear");
                    }
                }
                break;
            case "checkbox":
                {
                    if (Value == "1") {
                        //Ele.prop("checked", "checked");
                        Ele[0].checked = true;
                    } else {
                        //Ele.removeProp("checked");
                        Ele[0].checked = false;
                    }
                }
                break;
            case "datetime":
                {
                    if (Value) {
                        if (Ele.attr("valuetype") == "Number") {
                            Ele.val(new Date(Value * 1000).FormatString(Ele.attr("format")));
                        } else {
                            Ele.val(Value);
                        }
                    } else {
                        Ele.val("");
                    }
                }
                break;
            default:
                {
                    if (Value != null) {
                        Ele.val(Value);
                    } else {
                        Ele.val("");
                    }
                }
                break;
        }
    }
}

function setDisable(container) {
    for (var i = 0, Eles = jQuery(container), len = Eles.length; i < len; i++) {
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
}

function seEnable(container) {
    for (var i = 0, Eles = jQuery(container), len = Eles.length; i < len; i++) {
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
}
/***************************FORM END**********************************/

;
(function($, undefined) {
    $.fn.hdform = function(method) {

        if ($.fn.hdform[method]) {
            return $.fn.hdform[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return initialize.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jQuery.hdform");
        }
    };
    $.fn.hdform.Get = function() {
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
    $.fn.hdform.Set = function(record) {
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
    $.fn.hdform.Enable = function(Fields) {
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
        } else {
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
    $.fn.hdform.Disable = function(Fields) {
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
        } else {
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
    $.fn.hdform.Clear = function(Fields) {
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
                                } else {
                                    Ele.combobox("clear");
                                }
                            }
                            break;
                        case "combocheck":
                            {
                                var Items = Ele.combobox("getData");
                                if (Items.length > 0) {
                                    Ele.combobox("setValues", [Items[0].value]);
                                } else {
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
        } else {
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
                            } else {
                                Ele.combobox("clear");
                            }
                        }
                        break;
                    case "combocheck":
                        {
                            var Items = Ele.combobox("getData");
                            if (Items.length > 0) {

                                Ele.combobox("setValues", [Items[0].value]);
                            } else {
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
    var FormContainer = this.FormContainer||$(".my_dialog");
    var defaults = $.fn.hdform.defaults = {
        Temp: template.compile(jQuery.GetTemplate(function() {
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
            upload: function(dom, Target) {
                jQuery(jQuery("#ifm_upload")[0].contentWindow.document.getElementById("file")).change(function() {
                    if (jQuery("#ifm_upload")[0].contentWindow.document.getElementById("file").value.length > 0) {
                        jQuery("#ifm_upload")[0].contentWindow.document.forms[0].submit();
                    }
                });
                jQuery("#ifm_upload").unbind("load").load(function() {
                    if (this.contentWindow.location.pathname == "/upload") {
                        var Result = Proxy.Json.ToObject(this.contentWindow.document.body.innerHTML);
                        Target.val(Result.name);
                        this.src = this.src;
                    }
                });
                jQuery("#ifm_upload")[0].contentWindow.document.getElementById("file").click();
            },
            confirm: function(dom, e) {
                //return dom.hdform("Get");
            },
            cancel: function(dom, e) {
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
        return this.each(function() {
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
        tar.find("button[cmd],button[command]").on("click", function(Evt) {
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
            Container.find("[source=" + Sources[i].Code + "]").addClass("combox-complete").each(function(idx, ele) {
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
                        formatter: function(Row) { return "<div class='combocheckbox'>" + Row.name + "</div>"; }
                    });
                } else if (Type == "combotree") {
                    Combo.combotree({
                        lines: true,
                        height: 26,
                        data: Items,
                        onBeforeSelect: function(Node) {
                            if (Node.iconCls == "std") {
                                return false;
                            }
                        }
                    });
                } else {
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

        Container.find("[source]").each(function(i, ele) {
            if (!$(this).hasClass("combox-complete")) {
                $(this).combobox({ valueField: 'value', textField: 'name', data: [], editable: false, height: 26 });
                //V.ShowMessage("缺少代码为“" + jQuery(ele).attr("source") + "”的绑定数据源");
            }
        });
    };
})(jQuery);