//克隆日期时间对象
Date.prototype.Clone = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
};
/*
* 输出格式化日期字符串
* Format:时间格式
*/
Date.prototype.FormatString = function (Format) {
    if (Format.length == 0) {
        Format = "yyyy-MM-dd HH:mm:ss";
    }
    Format = Format.replace(/yyyy/g, this.getFullYear());
    Format = Format.replace(/yy/g, this.getFullYear().toString().slice(2));
    var MonthStr = this.getMonth() + 1;
    if (String(MonthStr).length == 1) {
        MonthStr = "0" + MonthStr;
    }
    Format = Format.replace(/MM/g, MonthStr);
    Format = Format.replace(/M/g, this.getMonth() + 1);
    var DateStr = this.getDate();
    if (String(DateStr).length == 1) {
        DateStr = "0" + DateStr;
    }
    Format = Format.replace(/dd/g, DateStr);
    Format = Format.replace(/d/g, this.getDate());
    var HourStr = this.getHours();
    if (String(HourStr).length == 1) {
        HourStr = "0" + HourStr;
    }
    Format = Format.replace(/HH/g, HourStr);
    Format = Format.replace(/H/g, this.getHours());
    var MinuteStr = this.getMinutes();
    if (String(MinuteStr).length == 1) {
        MinuteStr = "0" + MinuteStr;
    }
    Format = Format.replace(/mm/g, MinuteStr);
    Format = Format.replace(/m/g, this.getMinutes());
    var SecondStr = this.getSeconds();
    if (String(SecondStr).length == 1) {
        SecondStr = "0" + SecondStr;
    }
    Format = Format.replace(/ss/g, SecondStr);
    Format = Format.replace(/s/g, this.getSeconds());

    var MillisecondStr = this.getMilliseconds();
    if (String(MillisecondStr).length == 1) {
        MillisecondStr = "00" + MillisecondStr;
    }
    if (String(MillisecondStr).length == 2) {
        MillisecondStr = "0" + MillisecondStr;
    }
    Format = Format.replace(/SSS/g, MillisecondStr);
    Format = Format.replace(/SS/g, this.getMilliseconds());
    Format = Format.replace(/S/g, this.getMilliseconds());
    return Format;
};