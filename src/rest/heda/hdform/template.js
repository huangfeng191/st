/**
 * Created by Administrator on 2017-8-4.
 */
/*


#id  crud_framework
	form_container
        hdform
hdform : form =[ {"Inputs":[]},{"Buttons":[]},{"Html":""}]

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
				{{if Group.Title&&Form.length > 1}}
					<div class="title"><span>{{#Group.Title}}</span></div>
				{{/if}}                   
				
				{{if Group.Html }}
					{{#Group.Html}}
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
                         //inputs 解析
						{{each Group.Inputs as Row r}}          
							<tr>                             

								{{each Row as Cell c}}
								   {{if Cell.Field}}
									   <td class="label" field_label="{{Cell.Field}}" rowspan="{{Cell.RowSpan}}" colspan="1">{{#Cell.Name}}</td>
									   <td class="content" field_input={{Cell.Field}} rowspan="{{Cell.RowSpan}}" colspan="{{Cell.ColSpan * 2 - 1}}">
											    <div class='wrap'>
													{{if Cell.ShowType == "textarea"}}
															<textarea
													{{else}}
													       <input 
													{{/if}}
    													class="{{if Cell.ShowType == "datetime"}}Wdate {{else if Cell.ShowType == "upload" || Cell.ShowType == "text" || Cell.ShowType == "gispos" || Cell.ShowType == "gisarea" }}easyui-validatebox {{/if}}default{{if Cell.Class}}{{ Cell.Class}}{{/if}}"
    													field="{{Cell.Field}}" valuetype="{{Cell.DataType}}" showtype="{{Cell.ShowType}}"
    													type="{{if Cell.ShowType == "password"}}password{{else if Cell.ShowType == "combocheck"}}combo{{else if Cell.ShowType == "checkbox"}}checkbox{{else}}text{{/if}}"
    													// 验证
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
													{{if Cell.Required && Cell.ShowType != 'combo'&& Cell.ShowType != 'checkbox'}}
														<span class="required">*</span>
													{{/if}}
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
						    <tr style="height:{{Group.Blank}}px"><td></td></tr>          //空
						{{/if}}
					</table>
				{{/if}}
			</div>
		</div>
	{{/if}}                   
{{/each}}

                   */